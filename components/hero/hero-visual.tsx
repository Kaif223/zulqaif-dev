"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";
import { cx } from "@/lib/cx";
import type { FieldTier } from "@/lib/signal-field";

// Three.js + React Three Fiber are only downloaded when WebGL will be used.
const SignalFieldCanvas = dynamic(() => import("@/components/hero/signal-field-canvas"), {
  ssr: false,
  loading: () => null,
});

type NetworkInformation = { saveData?: boolean; effectiveType?: string };
type NavigatorHints = Navigator & { connection?: NetworkInformation; deviceMemory?: number };

// Decides whether to run WebGL at all, and at what quality.
function detectCapability(): { webgl: boolean; tier: FieldTier } {
  const off = { webgl: false, tier: "low" as const };
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return off;

  const nav = navigator as NavigatorHints;
  if (nav.connection?.saveData || /(^|-)2g$/.test(nav.connection?.effectiveType ?? "")) return off;

  try {
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2") ?? probe.getContext("webgl");
    if (!gl) return off;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    return off;
  }

  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  const touch = window.matchMedia("(pointer: coarse)").matches;
  return { webgl: true, tier: cores <= 4 || memory <= 4 || touch ? "low" : "high" };
}

function whenIdle(callback: () => void) {
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(callback, { timeout: 2000 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(callback, 600);
  return () => clearTimeout(id);
}

class CanvasErrorBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// Hero visual: the static fallback renders on the server and is always
// there; the WebGL canvas mounts on idle (after first paint and hydration),
// fades in over the fallback once it has rendered, and is removed again on
// any failure.
export function HeroVisual({ fallback }: { fallback: ReactNode }) {
  const [tier, setTier] = useState<FieldTier | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const { webgl, tier } = detectCapability();
    if (!webgl) return;
    return whenIdle(() => setTier(tier));
  }, []);

  // If the visitor switches on reduced motion while the page is open,
  // drop back to the still image.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      if (query.matches) setFailed(true);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const showCanvas = tier !== null && !failed;
  const live = showCanvas && ready;

  return (
    <div
      aria-hidden="true"
      className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-card sm:aspect-[16/11] lg:aspect-square xl:aspect-[7/6]"
    >
      <div
        className={cx(
          "absolute inset-0 transition-opacity duration-700 ease-out-expo",
          live ? "opacity-0" : "opacity-100",
        )}
      >
        {fallback}
      </div>

      {showCanvas ? (
        <div
          className={cx(
            "absolute inset-0 transition-opacity duration-1000 ease-out-expo",
            live ? "opacity-100" : "opacity-0",
          )}
        >
          <CanvasErrorBoundary onError={() => setFailed(true)}>
            <SignalFieldCanvas tier={tier} onReady={() => setReady(true)} onFail={() => setFailed(true)} />
          </CanvasErrorBoundary>
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between font-mono text-label text-ink-soft uppercase">
        <span className="rounded-full border border-line bg-surface/80 px-2.5 py-1 backdrop-blur-sm">
          signal.field
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-line bg-surface/80 px-2.5 py-1 backdrop-blur-sm">
          <span className={cx("size-1.5 rounded-full", live ? "bg-accent" : "bg-line-strong")} />
          {live ? "Live · WebGL" : "Still"}
        </span>
      </div>
    </div>
  );
}
