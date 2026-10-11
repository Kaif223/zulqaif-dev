import { capabilities } from "@/content/profile";
import { Section, SectionHeading } from "@/components/ui/section";

export function Capabilities({ id = "capabilities" }: { id?: string }) {
  return (
    <Section labelledBy={`${id}-title`}>
      <SectionHeading
        id={`${id}-title`}
        eyebrow="Capabilities"
        title="What I can help with"
        description="The work I do day to day — from first component to production build."
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability, index) => (
          <li
            key={capability.title}
            data-reveal
            className="rounded-card border border-line bg-surface p-6 shadow-card"
          >
            <span aria-hidden="true" className="font-mono text-label text-accent-ink">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-h3 font-semibold">{capability.title}</h3>
            <p className="mt-2 text-ink-soft">{capability.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
