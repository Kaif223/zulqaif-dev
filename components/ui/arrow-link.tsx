import Link from "next/link";
import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

type ArrowLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary";
  arrow?: "right" | "down";
};

const variants = {
  primary: "bg-signal text-on-signal hover:bg-fg hover:text-bg",
  secondary: "border border-line-strong text-fg hover:border-fg",
};

export function ArrowLink({
  variant = "primary",
  arrow = "right",
  className,
  children,
  ...props
}: ArrowLinkProps) {
  return (
    <Link
      className={cx(
        "group inline-flex min-h-12 items-center gap-3 px-5 font-mono text-sm uppercase tracking-wider",
        "transition-colors duration-200",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
      <span
        aria-hidden="true"
        className={cx(
          "inline-block transition-transform duration-300 ease-out-expo motion-reduce:transition-none",
          arrow === "right" ? "group-hover:translate-x-1" : "group-hover:translate-y-1",
        )}
      >
        {arrow === "right" ? "→" : "↓"}
      </span>
    </Link>
  );
}
