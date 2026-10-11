import Link from "next/link";
import type { Project } from "@/content/projects";
import { Badge, ConceptBadge } from "@/components/ui/badge";
import { ArrowRight } from "@/components/ui/icons";
import { ProjectCover } from "@/components/work/project-cover";

type ProjectCardProps = {
  project: Project;
  headingLevel?: "h2" | "h3";
};

// The title is the only link; a stretched ::after makes the whole card
// clickable while keeping the accessible name short (just the title).
export function ProjectCard({ project, headingLevel = "h3" }: ProjectCardProps) {
  const Heading = headingLevel;
  const isConcept = project.kind === "concept";

  return (
    <article
      data-reveal
      className="group relative flex h-full flex-col rounded-card border border-line bg-surface p-2.5 shadow-card transition-[translate,box-shadow,border-color] duration-300 ease-out-expo hover:-translate-y-1 hover:border-line-strong/40 hover:shadow-card-hover focus-within:shadow-card-hover motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-inner border border-line/70 bg-subtle">
        <div className="size-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          <ProjectCover project={project} sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-3 pt-5 pb-3 sm:px-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{project.category}</Badge>
          {isConcept ? <ConceptBadge /> : <Badge tone="outline">{project.context}</Badge>}
        </div>

        <Heading className="mt-4 text-h3 font-semibold text-ink">
          <Link
            href={`/work/${project.slug}`}
            className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent-ink"
          >
            {project.title}
          </Link>
        </Heading>
        <p className="mt-2 line-clamp-3 text-ink-soft">{project.summary}</p>

        <ul aria-label="Technologies" className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <li key={tech} className="rounded-md bg-subtle px-2 py-0.5 font-mono text-xs text-ink-soft">
              {tech}
            </li>
          ))}
          {project.stack.length > 4 ? (
            <li className="px-1 py-0.5 font-mono text-xs text-ink-soft">+{project.stack.length - 4}</li>
          ) : null}
        </ul>

        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-ink"
        >
          {isConcept ? "Read the concept" : "Read case study"}
          <ArrowRight className="size-4 text-accent-ink transition-transform duration-300 ease-out-expo group-hover:translate-x-1 motion-reduce:transition-none" />
        </span>
      </div>
    </article>
  );
}
