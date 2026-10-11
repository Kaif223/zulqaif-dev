// Motion tokens for the GSAP layer. Kept in step with the CSS tokens in
// app/globals.css (--ease-out-expo ≈ GSAP "expo.out").
export const motion = {
  ease: "expo.out",
  duration: {
    quick: 0.24,
    base: 0.6,
  },
  distance: 18,
  stagger: 0.07,
  // Elements whose top is above this fraction of the viewport on load are
  // already visible, so they are never hidden or animated.
  foldThreshold: 0.92,
} as const;
