import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type BadgeProps = {
  tone?: "neutral" | "accent" | "outline";
  children: ReactNode;
  className?: string;
};

const tones = {
  neutral: "bg-subtle text-ink-soft",
  // accent-ink on accent-soft = 4.9:1
  accent: "bg-accent-soft text-accent-ink",
  outline: "border border-line text-ink-soft",
};

export function Badge({ tone = "neutral", children, className }: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

// Concept label: text + dashed border, so it doesn't rely on colour alone.
export function ConceptBadge({ className }: { className?: string }) {
  return (
    <Badge tone="accent" className={cx("border border-dashed border-accent-ink/50", className)}>
      Concept project
    </Badge>
  );
}
