"use client";

import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Scroll reveals for any element marked `data-reveal`.
//
// Safety rules:
// - Only elements that start *below the fold* are ever hidden, so nothing
//   the visitor can already see flickers or waits for JavaScript.
// - If this file never loads, nothing is hidden: content is visible by default.
// - Reduced motion: gsap.matchMedia skips the whole setup.
// - Opacity only (no visibility: hidden), so hidden-but-focusable content
//   still works; focusing inside an unrevealed element reveals it at once.
// - useGSAP reverts every tween and ScrollTrigger on unmount and on each
//   route change (revertOnUpdate), then sets up again for the new page.
export default function MotionRoot() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const fold = window.innerHeight * motion.foldThreshold;
        const targets = gsap.utils
          .toArray<HTMLElement>("[data-reveal]")
          .filter((element) => element.getBoundingClientRect().top > fold);

        if (targets.length === 0) return;

        gsap.set(targets, { opacity: 0, y: motion.distance });

        ScrollTrigger.batch(targets, {
          start: "top 94%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: motion.duration.base,
              ease: motion.ease,
              stagger: motion.stagger,
              overwrite: true,
            }),
        });

        function onFocusIn(event: FocusEvent) {
          const host = (event.target as Element | null)?.closest?.("[data-reveal]");
          if (host instanceof HTMLElement && targets.includes(host)) {
            gsap.to(host, { opacity: 1, y: 0, duration: motion.duration.quick, overwrite: true });
          }
        }
        document.addEventListener("focusin", onFocusIn);

        // Web fonts can change element heights after load; recalculate.
        document.fonts?.ready.then(() => ScrollTrigger.refresh());

        return () => document.removeEventListener("focusin", onFocusIn);
      });
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
