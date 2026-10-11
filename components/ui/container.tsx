import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

// Content width ~1240px, gutters 20px (phones) → 32px (tablet and up).
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cx("mx-auto w-full max-w-[77.5rem] px-5 sm:px-8", className)} {...props} />
  );
}
