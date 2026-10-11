import Link from "next/link";
import type { Project } from "@/content/projects";
import { Annotation } from "@/components/ui/annotation";
import { StatusTag } from "@/components/status-tag";

// Each row is one link (the title). A stretched ::after makes the whole row
// clickable while keeping the link's accessible name short: just the title.
export function ProjectList({
  projects,
  headingLevel = "h3",
}: {
  projects: Project[];
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <ol className="border-b border-line">
      {projects.map((project, index) => (
        <li
          key={project.slug}
          className="group relative grid grid-cols-[2.25rem_1fr] gap-x-3 gap-y-3 border-t border-line py-7 sm:grid-cols-[3rem_1fr_9rem_4rem_8.5rem] sm:items-baseline sm:gap-x-6 sm:py-9"
        >
          <Annotation as="span" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </Annotation>

          <div className="min-w-0">
            <Heading className="font-display text-display-md font-bold [font-stretch:110%]">
              <Link
                href={`/work/${project.slug}`}
                className="transition-colors duration-200 after:absolute after:inset-0 group-hover:text-signal"
              >
                {project.title}
              </Link>
            </Heading>
            <p className="mt-3 max-w-2xl text-muted">{project.summary}</p>
          </div>

          <dl className="col-start-2 flex flex-wrap items-center gap-x-4 gap-y-2 sm:contents">
            <div className="sm:contents">
              <dt className="sr-only">Track</dt>
              <Annotation as="dd">{project.track}</Annotation>
            </div>
            <div className="sm:contents">
              <dt className="sr-only">Year</dt>
              <Annotation as="dd" className="tabular-nums">
                {project.year}
              </Annotation>
            </div>
            <div className="sm:contents">
              <dt className="sr-only">Status</dt>
              <dd className="sm:justify-self-end">
                <StatusTag project={project} />
              </dd>
            </div>
          </dl>
        </li>
      ))}
    </ol>
  );
}
