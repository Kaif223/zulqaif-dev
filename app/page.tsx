import type { Metadata } from "next";
import { featuredProjects } from "@/content/projects";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { Hero } from "@/components/home/hero";
import { Capabilities } from "@/components/home/capabilities";
import { Approach } from "@/components/home/approach";
import { ProjectCard } from "@/components/work/project-card";
import { ExperienceList } from "@/components/profile/experience-list";
import { ContactCta } from "@/components/contact-cta";

export const metadata: Metadata = {
  ...pageMetadata({
    title: site.role,
    description: site.description,
    path: "/",
  }),
  // The home page uses the full title instead of the "%s — Name" template.
  title: { absolute: `${site.name} — ${site.role}` },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section id="work" labelledBy="work-title" className="pt-6! sm:pt-8! lg:pt-10!">
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          title="Recent projects"
          description="Real projects from my GitHub, each with a case study — plus a clearly labelled concept."
          action={
            <ButtonLink href="/work" variant="secondary">
              All work
            </ButtonLink>
          }
        />
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Capabilities />
      <Approach />

      <Section labelledBy="experience-title">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience"
          title="Experience & education"
          action={
            <ButtonLink href="/about" variant="secondary">
              More about me
            </ButtonLink>
          }
        />
        <ExperienceList />
      </Section>

      <ContactCta />
    </>
  );
}
