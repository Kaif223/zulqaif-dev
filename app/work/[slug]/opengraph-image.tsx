import { getProject, projects } from "@/content/projects";
import { ogSize, renderOgImage } from "@/lib/og-image";

export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  return renderOgImage({
    eyebrow: project ? `Case study · ${project.category}` : "Case study",
    title: project?.title ?? "Work",
    footer: project ? `${project.stack.slice(0, 3).join(" · ")} · ${project.year}` : "Work",
    concept: project?.kind === "concept",
  });
}
