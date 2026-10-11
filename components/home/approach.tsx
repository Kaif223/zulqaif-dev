import { approach } from "@/content/profile";
import { Section, SectionHeading } from "@/components/ui/section";

export function Approach({ id = "approach" }: { id?: string }) {
  return (
    <Section labelledBy={`${id}-title`} className="border-y border-line bg-surface">
      <SectionHeading
        id={`${id}-title`}
        eyebrow="Approach"
        title="How I work"
        description="A practical process that keeps scope clear and quality visible at every step."
      />
      <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
        <span
          aria-hidden="true"
          className="absolute top-5 right-[10%] left-[10%] hidden h-px bg-line lg:block"
        />
        {approach.map((step, index) => (
          <li key={step.title} data-reveal className="relative flex gap-4 lg:flex-col">
            <span
              aria-hidden="true"
              className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-bg font-mono text-sm font-medium text-ink lg:mx-auto"
            >
              {index + 1}
              {index === 0 ? <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full border-2 border-surface bg-accent" /> : null}
            </span>
            <div className="lg:text-center">
              <h3 className="text-h3 font-semibold">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-1.5 text-ink-soft">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
