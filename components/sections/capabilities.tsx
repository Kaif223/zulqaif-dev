import { capabilities, stack } from "@/content/profile";
import { Annotation } from "@/components/ui/annotation";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

export function Capabilities() {
  return (
    <section aria-labelledby="capabilities-title" className="border-b border-line">
      <Container className="py-20 sm:py-28">
        <SectionHeader index="02" label="Capabilities" id="capabilities-title" title="Two disciplines" />

        <div className="grid gap-12 md:grid-cols-2 md:gap-6">
          {capabilities.map((group) => (
            <div key={group.track} className="border-t border-line pt-6">
              <Annotation className="text-signal">{group.track}</Annotation>
              <h3 className="mt-3 text-2xl font-medium">{group.heading}</h3>
              <ul className="mt-6 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3 text-muted">
                    <span aria-hidden="true" className="font-mono text-line-strong">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-line pt-6">
          <Annotation as="span" className="block">
            Stack
          </Annotation>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technology stack">
            {stack.map((tech) => (
              <li key={tech} className="border border-line px-3 py-1.5 font-mono text-sm">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
