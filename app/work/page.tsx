import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/page-intro";
import { ProjectList } from "@/components/project-list";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Selected product frontend and creative development work by Muhammad Zulqaif, with self-initiated concepts clearly labeled.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageIntro index="01" label="Work" title="Work">
        <p>
          Real projects first. Self-initiated concepts are marked{" "}
          <span className="font-mono text-base text-signal uppercase">Concept</span> — they show how
          I think, not work for a client or employer.
        </p>
      </PageIntro>
      <Container className="py-16 sm:py-24">
        <ProjectList projects={projects} headingLevel="h2" />
      </Container>
    </>
  );
}
