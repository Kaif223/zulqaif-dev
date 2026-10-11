"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Color, Plane, Raycaster, Vector2, Vector3, type ShaderMaterial } from "three";
import {
  FIELD,
  FIELD_TIERS,
  fragmentShader,
  vertexShader,
  type FieldTier,
} from "@/lib/signal-field";

type PointerState = { ndc: Vector2; strength: number };

type SignalFieldCanvasProps = {
  tier: FieldTier;
  onReady: () => void;
  onFail: () => void;
};

// The interactive WebGL field. Loaded lazily (its own chunk) by HeroVisual.
export default function SignalFieldCanvas({ tier, onReady, onFail }: SignalFieldCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<PointerState>({ ndc: new Vector2(4, 4), strength: 0 });
  const [active, setActive] = useState(true);

  // Pause rendering when the canvas is off-screen or the tab is hidden.
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    let inView = true;
    const update = () => setActive(inView && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  // Track the pointer relative to the canvas, even slightly outside it, so
  // the field reacts as the cursor approaches. Values are written into a
  // ref (no React re-render per move).
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    function onPointerMove(event: PointerEvent) {
      const rect = element!.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      pointer.current.ndc.set(x, y);
      const outside = Math.max(Math.abs(x), Math.abs(y));
      pointer.current.strength = outside <= 1 ? 1 : Math.max(0, 1 - (outside - 1) * 2);
    }
    function onPointerLeave() {
      pointer.current.strength = 0;
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  const config = FIELD_TIERS[tier];

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Canvas
        dpr={[1, config.maxDpr]}
        frameloop={active ? "always" : "demand"}
        camera={{ position: [...FIELD.camera.position], fov: FIELD.camera.fov, near: 0.1, far: 30 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        onCreated={({ gl, camera }) => {
          camera.lookAt(...FIELD.camera.target);
          gl.domElement.addEventListener("webglcontextlost", (event) => {
            event.preventDefault();
            onFail();
          });
          onReady();
        }}
        aria-hidden="true"
      >
        <Field tier={tier} pointer={pointer} />
      </Canvas>
    </div>
  );
}

function Field({ tier, pointer }: { tier: FieldTier; pointer: RefObject<PointerState> }) {
  const { cols, rows, pointSize } = FIELD_TIERS[tier];
  const setDpr = useThree((state) => state.setDpr);

  const positions = useMemo(() => {
    const array = new Float32Array(cols * rows * 3);
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        array[i++] = (c / (cols - 1) - 0.5) * FIELD.width;
        array[i++] = 0;
        array[i++] = (r / (rows - 1) - 0.5) * FIELD.depth;
      }
    }
    return array;
  }, [cols, rows]);

  // Initial uniform values. Per-frame updates go through the material ref
  // (React treats memoized values as immutable; refs are meant to mutate).
  const uniforms = useMemo(
    () => ({
      uTime: { value: 1.4 },
      uPointer: { value: new Vector2(10, 10) },
      uPointerStrength: { value: 0 },
      uSize: { value: pointSize },
      uPixelRatio: { value: 1 },
      uHalf: { value: new Vector2(FIELD.width / 2, FIELD.depth / 2) },
      uInk: { value: new Color(FIELD.colors.ink) },
      uAccent: { value: new Color(FIELD.colors.accent) },
    }),
    [pointSize],
  );

  // Scratch objects allocated once — nothing is allocated per frame.
  const scratch = useMemo(
    () => ({
      raycaster: new Raycaster(),
      plane: new Plane(new Vector3(0, 1, 0), 0),
      hit: new Vector3(),
      target: new Vector2(10, 10),
    }),
    [],
  );
  const material = useRef<ShaderMaterial>(null);
  const perf = useRef({ frames: 0, elapsed: 0, lowered: false });

  useFrame((state, delta) => {
    if (!material.current) return;
    const u = material.current.uniforms;
    const dt = Math.min(delta, 0.05);
    u.uTime.value += dt;
    u.uPixelRatio.value = state.gl.getPixelRatio();

    const { ndc, strength } = pointer.current;
    scratch.raycaster.setFromCamera(ndc, state.camera);
    if (scratch.raycaster.ray.intersectPlane(scratch.plane, scratch.hit)) {
      scratch.target.set(scratch.hit.x, scratch.hit.z);
    }
    const follow = 1 - Math.exp(-dt * 6);
    u.uPointer.value.lerp(scratch.target, follow);
    u.uPointerStrength.value += (strength - u.uPointerStrength.value) * (1 - Math.exp(-dt * 3));

    // Adaptive quality: if the first ~2 seconds average under ~40fps, drop
    // to 1x pixel ratio once.
    const p = perf.current;
    if (!p.lowered) {
      p.frames += 1;
      p.elapsed += delta;
      if (p.frames === 120) {
        if (p.elapsed / p.frames > 1 / 40) {
          setDpr(1);
          p.lowered = true;
        }
        p.frames = 0;
        p.elapsed = 0;
      }
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}
