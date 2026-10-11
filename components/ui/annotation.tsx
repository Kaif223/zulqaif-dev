import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

// The small monospaced labels that give "Signal" its technical-drawing feel.
export function Annotation({
  className,
  as: Tag = "p",
  ...props
}: ComponentProps<"p"> & { as?: "p" | "span" | "div" | "dt" | "dd" }) {
  return (
    <Tag
      className={cx("font-mono text-annotation uppercase text-muted", className)}
      {...props}
    />
  );
}
