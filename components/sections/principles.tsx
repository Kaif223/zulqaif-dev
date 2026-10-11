import { principles } from "@/content/profile";
import { Annotation } from "@/components/ui/annotation";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

export function Principles({ showAboutLink = true }: { showAboutLink?: boolean }) {
  return (
    <section aria-labelledby="principles-title">
      <Container className="py-20 sm:py-28">
        <SectionHeader index="03" label="Principles" id="principles-title" title="How I work" />
        <ol className="grid gap-px border border-line bg-line sm:grid-cols-2">
          {principles.map((principle, index) => (
            <li key={principle.title} className="bg-bg p-6 sm:p-8">
              <Annotation as="span" aria-hidden="true">
                P/{String(index + 1).padStart(2, "0")}
              </Annotation>
              <h3 className="mt-4 text-2xl font-medium">{principle.title}</h3>
              <p className="mt-2 text-muted">{principle.body}</p>
            </li>
          ))}
        </ol>
        {showAboutLink ? (
          <div className="mt-10">
            <ArrowLink href="/about" variant="secondary">
              More about me
            </ArrowLink>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
