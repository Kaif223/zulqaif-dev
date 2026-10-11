// Shared description of the hero "signal field": a grid of points on a
// plane, displaced by layered sine waves. Used by the WebGL shader and by the
// server-rendered SVG fallback, so both show the same composition.

export const FIELD = {
  width: 7,
  depth: 5,
  camera: { position: [0, 2.5, 4.1] as const, target: [0, -0.45, 0] as const, fov: 40 },
  colors: { ink: "#171717", accent: "#f26522" },
};

export const FIELD_TIERS = {
  high: { cols: 112, rows: 72, pointSize: 10, maxDpr: 1.75 },
  low: { cols: 72, rows: 46, pointSize: 13, maxDpr: 1.25 },
} as const;

export type FieldTier = keyof typeof FIELD_TIERS;

// Same height function as the vertex shader (without the pointer ripple).
export function fieldHeight(x: number, z: number, t: number) {
  return (
    Math.sin(x * 0.9 + t * 0.55) * 0.22 +
    Math.sin(z * 1.6 - t * 0.4 + x * 0.35) * 0.12 +
    Math.sin((x - z) * 2.4 + t * 0.8) * 0.04
  );
}

export const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uPointerStrength;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec2 uHalf;

  varying float vHeight;
  varying float vFade;
  varying float vGlow;

  void main() {
    vec3 p = position;
    float t = uTime;

    float h = sin(p.x * 0.9 + t * 0.55) * 0.22
            + sin(p.z * 1.6 - t * 0.4 + p.x * 0.35) * 0.12
            + sin((p.x - p.z) * 2.4 + t * 0.8) * 0.04;

    float d = distance(p.xz, uPointer);
    float ripple = exp(-d * d * 2.2) * uPointerStrength;
    h += ripple * 0.42 + sin(d * 7.0 - t * 3.0) * 0.03 * ripple;

    p.y += h;
    vHeight = h;
    vGlow = ripple;

    vec2 edge = abs(position.xz) / uHalf;
    vFade = (1.0 - smoothstep(0.62, 1.0, edge.x)) * (1.0 - smoothstep(0.5, 1.0, edge.y));

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (1.0 + h * 0.6) / -mv.z;
  }
`;

export const fragmentShader = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uAccent;

  varying float vHeight;
  varying float vFade;
  varying float vGlow;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float disc = smoothstep(0.5, 0.3, d);
    float accent = clamp(max(smoothstep(0.14, 0.32, vHeight), vGlow * 0.9), 0.0, 1.0);
    vec3 color = mix(uInk, uAccent, accent);
    float alpha = disc * vFade * mix(0.3, 0.95, accent);
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(color, alpha);
  }
`;

// --- Static projection for the SVG fallback -------------------------------

type Vec3 = [number, number, number];
const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const normalize = (a: Vec3): Vec3 => {
  const length = Math.hypot(...a);
  return [a[0] / length, a[1] / length, a[2] / length];
};

export type FallbackDot = { x: number; y: number; r: number; accent: boolean; opacity: number };

// Projects a coarse version of the field at a fixed moment into a square
// viewBox (0–100), using the same camera as the WebGL scene.
export function projectFallbackField(cols = 34, rows = 20, t = 1.4): FallbackDot[] {
  const eye = [...FIELD.camera.position] as Vec3;
  const target = [...FIELD.camera.target] as Vec3;
  const forward = normalize(sub(target, eye));
  const right = normalize(cross(forward, [0, 1, 0]));
  const up = cross(right, forward);
  const focal = 1 / Math.tan(((FIELD.camera.fov / 2) * Math.PI) / 180);
  const halfW = FIELD.width / 2;
  const halfD = FIELD.depth / 2;
  const smooth = (a: number, b: number, v: number) => {
    const k = Math.min(1, Math.max(0, (v - a) / (b - a)));
    return k * k * (3 - 2 * k);
  };

  const dots: FallbackDot[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = (c / (cols - 1) - 0.5) * FIELD.width;
      const z = (r / (rows - 1) - 0.5) * FIELD.depth;
      const h = fieldHeight(x, z, t);
      const v = sub([x, h, z], eye);
      const depth = dot(v, forward);
      const sx = 50 + (dot(v, right) / depth) * focal * 50;
      const sy = 50 - (dot(v, up) / depth) * focal * 50;
      const fade = (1 - smooth(0.62, 1, Math.abs(x) / halfW)) * (1 - smooth(0.5, 1, Math.abs(z) / halfD));
      const accent = h > 0.2;
      const opacity = fade * (accent ? 0.9 : 0.32);
      if (opacity < 0.04) continue;
      dots.push({
        x: Math.round(sx * 10) / 10,
        y: Math.round(sy * 10) / 10,
        r: Math.round(((0.42 * (1 + h * 0.6)) / depth) * 4 * 100) / 100,
        accent,
        opacity: Math.round(opacity * 100) / 100,
      });
    }
  }
  return dots;
}
