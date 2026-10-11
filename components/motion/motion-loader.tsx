"use client";

import dynamic from "next/dynamic";

// GSAP + ScrollTrigger live in their own chunk, fetched after hydration, so
// they never delay first paint or the initial JavaScript.
const MotionRoot = dynamic(() => import("@/components/motion/motion-root"), { ssr: false });

export function MotionLoader() {
  return <MotionRoot />;
}
