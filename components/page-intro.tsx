import type { ReactNode } from "react";
import { Annotation } from "@/components/ui/annotation";
import { Container } from "@/components/ui/container";

type PageIntroProps = {
  index: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
};

// Shared top-of-page block for inner pages: annotation, H1, intro copy.
export function PageIntro({ index, label, title, children }: PageIntroProps) {
  return (
    <div className="border-b border-line">
      <Container className="pb-14 pt-10 sm:pb-20 sm:pt-16">
        <Annotation className="border-b border-line pb-3">
          [{index}] {label}
        </Annotation>
        <h1 className="mt-10 font-display text-display-xl font-extrabold uppercase [font-stretch:125%]">
          {title}
        </h1>
        {children ? (
          <div className="mt-8 max-w-2xl text-xl leading-snug text-balance text-muted sm:text-2xl">
            {children}
          </div>
        ) : null}
      </Container>
    </div>
  );
}
