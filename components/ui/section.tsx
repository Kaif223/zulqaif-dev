import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { Container } from "@/components/ui/container";

type SectionProps = {
  id?: string;
  labelledBy: string;
  className?: string;
  children: ReactNode;
};

// Consistent vertical rhythm for every page section.
export function Section({ id, labelledBy, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cx("py-16 sm:py-20 lg:py-24", className)}>
      <Container>{children}</Container>
    </section>
  );
}

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  as?: "h1" | "h2";
};

export function SectionHeading({ id, eyebrow, title, description, action, as = "h2" }: SectionHeadingProps) {
  const Heading = as;
  return (
    <div
      data-reveal
      className="mb-10 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between"
    >
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading
          id={id}
          className={cx(
            "mt-3 font-semibold text-ink",
            as === "h1" ? "text-h1" : "text-h2",
          )}
        >
          {title}
        </Heading>
        {description ? <p className="mt-4 text-ink-soft sm:text-lg">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

// Small technical label: mono, accent-ink (5.1:1), sparing use only.
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cx(
        "inline-flex items-center gap-2 font-mono text-label font-medium text-accent-ink uppercase",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
      {children}
    </p>
  );
}
