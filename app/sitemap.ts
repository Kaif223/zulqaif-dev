import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/work", "/about", "/contact"].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const caseStudies = projects.map((project) => ({
    url: absoluteUrl(`/work/${project.slug}`),
    changeFrequency: "yearly" as const,
    priority: project.kind === "concept" ? 0.5 : 0.7,
  }));

  return [...pages, ...caseStudies];
}
