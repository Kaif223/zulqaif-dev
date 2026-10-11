import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjectNeighbours, projects, type Project } from "@/content/projects";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site-url";
import { Badge, ConceptBadge } from "@/components/ui/badge";
import { ExternalButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { JsonLd } from "@/components/json-ld";
import { ProjectCover } from "@/components/work/project-cover";
import { ContactCta } from "@/components/contact-cta";

// Every case study is known at build time and prerendered to static HTML.
// Unknown slugs get a real 404 from proxy.ts before rendering starts.
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

  const { previous, next } = getProjectNeighbours(project.slug);
  const isConcept = project.kind === "concept";

  const sections = [
    { id: "motivation", title: isConcept ? "Motivation" : "Problem & motivation", items: project.motivation, list: false },
    { id: "role", title: isConcept ? "Scope of the concept" : "My role & contributions", items: project.contributions, list: true },
    { id: "implementation", title: isConcept ? "Planned approach" : "Design & implementation", items: project.implementation, list: true },
    { id: "decisions", title: "Challenges & decisions", items: project.decisions, list: true },
    ...(project.results && project.results.length > 0
      ? [{ id: "results", title: "Results", items: project.results, list: true }]
      : []),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    abstract: project.summary,
    url: absoluteUrl(`/work/${project.slug}`),
    dateCreated: project.year,
    keywords: project.stack.join(", "),
    creator: { "@type": "Person", name: site.name, url: absoluteUrl("/") },
    ...(project.links.repo && { codeRepository: project.links.repo }),
  };

  return (
    <>
      <article>
        <Container className="pt-8 sm:pt-12">
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink"
          >
            <ArrowLeft className="size-4" />
            All work
          </Link>

          <header className="mt-6 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{project.category}</Badge>
                {isConcept ? <ConceptBadge /> : <Badge tone="outline">{project.context}</Badge>}
              </div>
              <h1 className="mt-5 text-h1 font-semibold">{project.title}</h1>
              <p className="mt-5 max-w-3xl text-lg text-ink-soft sm:text-xl">{project.summary}</p>

              {isConcept ? (
                <p
                  role="note"
                  className="mt-6 max-w-3xl rounded-xl border border-dashed border-accent-ink/50 bg-accent-soft px-4 py-3 text-sm text-ink"
                >
                  <strong className="font-semibold text-accent-ink">Independent concept.</strong> This is a
                  self-initiated exploration, not a client engagement. It has not been built or shipped, and
                  it makes no claims about users or results.
                </p>
              ) : null}

              {project.links.live || project.links.repo ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.links.live ? (
                    <ExternalButtonLink href={project.links.live}>Visit live site</ExternalButtonLink>
                  ) : null}
                  {project.links.repo ? (
                    <ExternalButtonLink href={project.links.repo} variant="secondary">
                      View source on GitHub
                    </ExternalButtonLink>
                  ) : null}
                </div>
              ) : null}
            </div>

            <dl className="grid h-fit gap-5 rounded-card border border-line bg-surface p-6 shadow-card sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
              <MetaItem label="Role">{project.role}</MetaItem>
              <MetaItem label="Type">
                {project.category} · {project.context}
              </MetaItem>
              <MetaItem label="Year">{project.year}</MetaItem>
              <MetaItem label="Stack">
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li key={tech} className="rounded-md bg-subtle px-2 py-0.5 font-mono text-xs text-ink-soft">
                      {tech}
                    </li>
                  ))}
                </ul>
              </MetaItem>
            </dl>
          </header>

          <div className="mt-12 overflow-hidden rounded-card border border-line bg-surface p-2 shadow-card sm:mt-16">
            <div className="relative aspect-[16/10] overflow-hidden rounded-inner bg-subtle">
              <ProjectCover project={project} sizes="(min-width: 1240px) 1200px, 100vw" priority />
            </div>
          </div>
        </Container>

        <Container className="py-16 sm:py-20">
          <div className="space-y-14 sm:space-y-16">
            {sections.map((section) => (
              <CaseSection key={section.id} {...section} />
            ))}
          </div>

          {project.gallery && project.gallery.length > 0 ? (
            <section aria-labelledby="gallery-title" className="mt-16 grid gap-6 lg:grid-cols-12">
              <h2 id="gallery-title" className="text-h3 font-semibold lg:col-span-4">
                Screens
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
                {project.gallery.map((image) => (
                  <figure key={image.src} data-reveal>
                    <div className="overflow-hidden rounded-card border border-line bg-surface p-2 shadow-card">
                      <Image
                        src={image.src}
                        width={image.width}
                        height={image.height}
                        alt={image.alt}
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                        className="h-auto w-full rounded-inner"
                      />
                    </div>
                    {image.caption ? (
                      <figcaption className="mt-3 text-sm text-ink-soft">{image.caption}</figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          <nav aria-label="More projects" className="mt-20 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
            {previous ? <NeighbourLink project={previous} direction="previous" /> : <span className="hidden sm:block" />}
            {next ? <NeighbourLink project={next} direction="next" /> : null}
          </nav>
        </Container>

        <JsonLd data={jsonLd} />
      </article>
      <ContactCta />
    </>
  );
}

function MetaItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-label text-ink-soft uppercase">{label}</dt>
      <dd className="mt-1.5 text-ink">{children}</dd>
    </div>
  );
}

function CaseSection({ id, title, items, list }: { id: string; title: string; items: string[]; list: boolean }) {
  return (
    <section aria-labelledby={id} data-reveal className="grid gap-4 lg:grid-cols-12 lg:gap-6">
      <h2 id={id} className="text-h3 font-semibold lg:col-span-4">
        {title}
      </h2>
      <div className="lg:col-span-8">
        {list ? (
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item} className="flex gap-3 text-ink-soft">
                <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="space-y-4 text-lg text-ink-soft">
            {items.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function NeighbourLink({ project, direction }: { project: Project; direction: "previous" | "next" }) {
  const isNext = direction === "next";
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group flex flex-col gap-1 rounded-card border border-line bg-surface p-5 shadow-card transition-shadow hover:shadow-card-hover ${isNext ? "sm:items-end sm:text-right" : ""}`}
    >
      <span className="inline-flex items-center gap-1.5 text-sm text-ink-soft">
        {isNext ? null : <ArrowLeft className="size-4" />}
        {isNext ? "Next project" : "Previous project"}
        {isNext ? <ArrowRight className="size-4" /> : null}
      </span>
      <span className="font-semibold text-ink group-hover:text-accent-ink">{project.title}</span>
    </Link>
  );
}
