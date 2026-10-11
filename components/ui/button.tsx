import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "@/lib/cx";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "inverse-outline";
type Size = "md" | "sm";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out-expo active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100";

const variants: Record<Variant, string> = {
  // ink on accent = 5.7:1
  primary: "bg-accent text-ink hover:bg-ink hover:text-surface shadow-[inset_0_-1px_0_rgb(0_0_0/0.08)]",
  secondary: "border border-line bg-surface text-ink shadow-card hover:border-line-strong",
  ghost: "text-ink hover:bg-subtle",
  inverse: "bg-accent text-ink hover:bg-surface",
  "inverse-outline": "border border-night-soft/60 text-surface hover:border-surface",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-6 text-[0.9375rem]",
  sm: "min-h-10 px-4 text-sm",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cx(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  icon?: "arrow" | "external" | "none";
  children: ReactNode;
};

// Internal navigation styled as a button. External links use ExternalButtonLink.
export function ButtonLink({
  variant,
  size,
  icon = "arrow",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...props}>
      {children}
      <ButtonIcon icon={icon} />
    </Link>
  );
}

export function ExternalButtonLink({
  variant,
  size,
  icon = "external",
  className,
  children,
  ...props
}: ComponentProps<"a"> & { variant?: Variant; size?: Size; icon?: "arrow" | "external" | "none" }) {
  return (
    <a
      className={buttonClasses({ variant, size, className })}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
      <ButtonIcon icon={icon} />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function ButtonIcon({ icon }: { icon: "arrow" | "external" | "none" }) {
  if (icon === "none") return null;
  const Icon = icon === "arrow" ? ArrowRight : ArrowUpRight;
  return (
    <Icon className="size-4 shrink-0 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 motion-reduce:transition-none" />
  );
}
