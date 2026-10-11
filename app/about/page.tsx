import type { ReactNode } from "react";
import { activeSocials, site } from "@/content/site";
import { bio, education, experience, focus, stack } from "@/content/profile";
import { pageMetadata } from "@/lib/metadata";
import { ExternalButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { socialIcons } from "@/components/ui/icons";
import { Capabilities } from "@/components/home/capabilities";
import { Approach } from "@/components/home/approach";
import { ExperienceList } from "@/components/profile/experience-list";
import { ContactCta } from "@/components/contact-cta";

export const metadata = pageMetadata({
  title: "About",
  description: `About ${site.name}: a frontend developer in ${site.location.city}, ${site.location.country}, working with React, Next.js and TypeScript.`,
  path: "/about",
});

const currentRole = experience.find((entry) => entry.current);
const degree = education[0];

export default function AboutPage() {
  return (
    <>
      <Container className="pt-12 sm:pt-16 lg:pt-20">
        <SectionHeading
          as="h1"
          id="about-title"
          eyebrow="About"
          title="Frontend developer focused on clear, dependable interfaces."
        />

        <div className="grid gap-10 pb-16 sm:pb-20 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-5 text-lg text-ink-soft lg:col-span-7">
            {bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="rounded-card border border-line bg-surface p-6 shadow-card">
              <h2 className="font-mono text-label text-accent-ink uppercase">Focus</h2>
              <p className="mt-2 text-ink">{focus}</p>
            </div>
          </div>

          <aside aria-label="Quick facts" className="lg:col-span-5">
            <dl className="divide-y divide-line rounded-card border border-line bg-surface shadow-card">
              <Fact label="Based in">
                {site.location.city}, {site.location.country}
                <span className="block text-sm text-ink-soft">{site.location.timeZoneLabel}</span>
              </Fact>
              {currentRole ? (
                <Fact label="Current role">
                  {currentRole.role}
                  <span className="block text-sm text-ink-soft">{currentRole.company}</span>
                </Fact>
              ) : null}
              {degree ? (
                <Fact label="Education">
                  {degree.degree}
                  <span className="block text-sm text-ink-soft">
                    {degree.institutionShort} · completed {degree.completed}
                  </span>
                </Fact>
              ) : null}
              <Fact label="Profiles">
                <ul className="flex flex-wrap gap-2">
                  {activeSocials.map(({ label, href }) => {
                    const Icon = socialIcons[label];
                    return (
                      <li key={href}>
                        <a
                          href={href}
                          target="_blank"
                          rel="me noopener noreferrer"
                          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line px-3.5 text-sm hover:border-line-strong"
                        >
                          <Icon className="size-4" />
                          {label}
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </Fact>
            </dl>
            {site.resumePath ? (
              <ExternalButtonLink href={site.resumePath} className="mt-4 w-full" icon="arrow">
                Download CV (PDF)
              </ExternalButtonLink>
            ) : null}
          </aside>
        </div>
      </Container>

      <Section labelledBy="about-experience-title" className="border-t border-line">
        <SectionHeading id="about-experience-title" eyebrow="Background" title="Experience & education" />
        <ExperienceList />
      </Section>

      <Capabilities id="about-capabilities" />

      <Section labelledBy="toolkit-title" className="pt-0!">
        <div data-reveal className="rounded-card border border-line bg-surface p-6 shadow-card sm:p-8">
          <h2 id="toolkit-title" className="font-mono text-label text-ink-soft uppercase">
            Main technologies
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <li key={tech} className="rounded-full border border-line bg-bg px-3.5 py-1.5 text-sm text-ink">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Approach id="about-approach" />
      <ContactCta id="about-contact" />
    </>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 px-6 py-5 sm:grid-cols-[8rem_1fr] sm:gap-4">
      <dt className="font-mono text-label text-ink-soft uppercase sm:pt-1">{label}</dt>
      <dd className="text-ink">{children}</dd>
    </div>
  );
}
