import type { ReactNode } from "react";
import { Annotation } from "@/components/ui/annotation";

type SectionHeaderProps = {
  index: string;
  label: string;
  id: string;
  title: ReactNode;
  aside?: ReactNode;
};

// Numbered section heading: "[01] Selected work" with a hairline rule.
export function SectionHeader({ index, label, id, title, aside }: SectionHeaderProps) {
  return (
    <div className="mb-10 sm:mb-14">
      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
        <Annotation as="span">
          [{index}] {label}
        </Annotation>
        {aside ? <Annotation as="span">{aside}</Annotation> : null}
      </div>
      <h2
        id={id}
        className="mt-6 font-display text-display-lg font-extrabold uppercase [font-stretch:118%]"
      >
        {title}
      </h2>
    </div>
  );
}
