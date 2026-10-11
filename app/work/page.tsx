import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { ProjectCard } from "@/components/work/project-card";
import { ContactCta } from "@/components/contact-cta";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Projects and case studies by Muhammad Zulqaif — real work from GitHub, with self-initiated concepts clearly labelled.",
  path: "/work",
});

const realProjects = projects.filter((project) => project.kind === "real");
const conceptProjects = projects.filter((project) => project.kind === "concept");

// No category filters: with this many projects they would add clicks, not
// clarity. The real/concept split is the distinction that matters.
export default function WorkPage() {
  return (
    <>
      <Container className="pt-12 sm:pt-16 lg:pt-20">
        <SectionHeading
          as="h1"
          id="work-page-title"
          eyebrow="Work"
          title="Projects & case studies"
          description="Real projects first — each links to its source and a write-up of what I built and why. Concepts follow, clearly labelled as self-initiated explorations."
        />
      </Container>

      <Section labelledBy="projects-title" className="pt-4!">
        <h2 id="projects-title" className="mb-6 text-h3 font-semibold">
          Projects <span className="font-normal text-ink-soft">({realProjects.length})</span>
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {realProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      {conceptProjects.length > 0 ? (
        <Section labelledBy="concepts-title" className="pt-0!">
          <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 id="concepts-title" className="text-h3 font-semibold">
              Concepts <span className="font-normal text-ink-soft">({conceptProjects.length})</span>
            </h2>
            <p className="text-sm text-ink-soft">Self-initiated explorations — not client work.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {conceptProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Section>
      ) : null}

      <ContactCta />
    </>
  );
}
