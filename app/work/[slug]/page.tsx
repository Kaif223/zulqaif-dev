import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdjacentProject, getProject, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site-url";
import { site } from "@/content/site";
import { Annotation } from "@/components/ui/annotation";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/json-ld";
import { StatusTag } from "@/components/status-tag";

// Every case study is known at build time, so each one is prerendered to
// static HTML. Unknown slugs fall through to notFound() at request time.
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return pageMetadata({
    title: project.kind === "concept" ? `${project.title} (concept)` : project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
    image: { url: `/work/${project.slug}/opengraph-image`, alt: project.title },
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getAdjacentProject(project.slug);
  const isConcept = project.kind === "concept";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    abstract: project.summary,
    url: absoluteUrl(`/work/${project.slug}`),
    dateCreated: project.year,
    keywords: project.stack.join(", "),
    creator: { "@type": "Person", name: site.name, url: absoluteUrl("/") },
  };

  return (
    <article>
      <div className="border-b border-line">
        <Container className="pb-14 pt-10 sm:pb-20 sm:pt-16">
          <nav aria-label="Breadcrumb" className="border-b border-line pb-3">
            <ol className="flex flex-wrap gap-2 font-mono text-annotation uppercase text-muted">
              <li>
                <Link href="/work" className="transition-colors hover:text-signal">
                  Work
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-fg">
                {project.title}
              </li>
            </ol>
          </nav>

          <div className="mt-10">
            <StatusTag project={project} />
          </div>
          <h1 className="mt-6 max-w-6xl font-display text-display-lg font-extrabold uppercase [font-stretch:118%]">
            {project.title}
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-snug text-balance sm:text-2xl">
            {project.summary}
          </p>

          {isConcept ? (
            <p
              role="note"
              className="mt-10 max-w-3xl border border-dashed border-signal p-4 font-mono text-sm leading-relaxed"
            >
              <span className="text-signal uppercase">Concept project.</span> Self-initiated and not
              client or employer work. It describes the problem and the planned approach — it does not
              claim real users, clients or results.
            </p>
          ) : null}

          <dl className="mt-12 grid gap-6 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Annotation as="dt">Role</Annotation>
              <dd className="mt-2">{project.role}</dd>
            </div>
            <div>
              <Annotation as="dt">Year</Annotation>
              <dd className="mt-2 tabular-nums">{project.year}</dd>
            </div>
            <div>
              <Annotation as="dt">Track</Annotation>
              <dd className="mt-2">{project.track}</dd>
            </div>
            <div>
              <Annotation as="dt">Stack</Annotation>
              <dd className="mt-2">{project.stack.join(" · ")}</dd>
            </div>
          </dl>

          {project.links && project.links.length > 0 ? (
            <ul className="mt-8 flex flex-wrap gap-4 font-mono text-sm">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    rel="noopener"
                    className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-signal"
                  >
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </Container>
      </div>

      <Container className="py-16 sm:py-24">
        <div className="space-y-16">
          {project.sections.map((section, index) => (
            <section
              key={section.heading}
              aria-labelledby={`section-${index}`}
              className="grid gap-4 md:grid-cols-12 md:gap-6"
            >
              <div className="md:col-span-4">
                <Annotation as="span" className="block">
                  {String(index + 1).padStart(2, "0")}
                </Annotation>
                <h2 id={`section-${index}`} className="mt-2 text-2xl font-medium">
                  {section.heading}
                </h2>
              </div>
              <div className="space-y-5 text-lg leading-relaxed text-muted md:col-span-7 md:col-start-6">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>

      {next && next.slug !== project.slug ? (
        <div className="border-t border-line">
          <Container className="py-12 sm:py-16">
            <Annotation>Next project</Annotation>
            <Link
              href={`/work/${next.slug}`}
              className="group mt-4 inline-flex items-baseline gap-4 font-display text-display-md font-bold [font-stretch:110%] transition-colors hover:text-signal"
            >
              {next.title}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 ease-out-expo group-hover:translate-x-2 motion-reduce:transition-none"
              >
                →
              </span>
            </Link>
          </Container>
        </div>
      ) : null}

      <JsonLd data={jsonLd} />
    </article>
  );
}
