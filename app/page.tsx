import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ProjectList } from "@/components/project-list";
import { Hero } from "@/components/sections/hero";
import { Capabilities } from "@/components/sections/capabilities";
import { Principles } from "@/components/sections/principles";

const homeMetadata = pageMetadata({
  title: site.roles.join(" & "),
  description: site.description,
  path: "/",
});

export const metadata: Metadata = {
  ...homeMetadata,
  // The home page uses the full title instead of the "%s — Name" template.
  title: { absolute: `${site.name} — ${site.roles.join(" & ")}` },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <section id="work" aria-labelledby="work-title" className="border-b border-line">
        <Container className="py-20 sm:py-28">
          <SectionHeader
            index="01"
            label="Work"
            id="work-title"
            title="Selected work"
            aside={`(${String(projects.length).padStart(2, "0")})`}
          />
          <ProjectList projects={projects} />
          <div className="mt-10">
            <ArrowLink href="/work" variant="secondary">
              All work
            </ArrowLink>
          </div>
        </Container>
      </section>
      <Capabilities />
      <Principles />
    </>
  );
}
