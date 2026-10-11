import { cx } from "@/lib/cx";

// Static stand-in for the future WebGL "signal": a flat line with one pulse.
// Decorative only, so it is hidden from assistive technology.
export function SignalLine({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      className={cx("overflow-visible", className)}
    >
      <path
        d="M0 20 H690 L702 20 L712 4 L724 36 L736 10 L746 26 L754 20 H1200"
        fill="none"
        stroke="var(--line-strong)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M702 20 L712 4 L724 36 L736 10 L746 26 L754 20"
        fill="none"
        stroke="var(--signal)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
