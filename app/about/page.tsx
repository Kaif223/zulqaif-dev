import { activeSocials, site } from "@/content/site";
import { bio, experience } from "@/content/profile";
import { pageMetadata } from "@/lib/metadata";
import { Annotation } from "@/components/ui/annotation";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { PageIntro } from "@/components/page-intro";
import { Capabilities } from "@/components/sections/capabilities";
import { Principles } from "@/components/sections/principles";

export const metadata = pageMetadata({
  title: "About",
  description: `About ${site.name}: a product frontend and creative developer based in ${site.location.city}, ${site.location.country}.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageIntro index="02" label="About" title="About" />

      <div className="border-b border-line">
        <Container className="grid gap-10 py-16 sm:py-24 md:grid-cols-12 md:gap-6">
          <dl className="space-y-6 md:col-span-4">
            <div>
              <Annotation as="dt">Based in</Annotation>
              <dd className="mt-2">
                {site.location.city}, {site.location.country}
                <span className="block font-mono text-sm text-muted">
                  {site.location.timeZoneLabel}
                </span>
              </dd>
            </div>
            <div>
              <Annotation as="dt">Roles</Annotation>
              <dd className="mt-2">{site.roles.join(" · ")}</dd>
            </div>
            <div>
              <Annotation as="dt">Availability</Annotation>
              <dd className="mt-2">{site.availability}</dd>
            </div>
          </dl>
          <div className="space-y-6 text-xl leading-relaxed md:col-span-7 md:col-start-6">
            {bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {site.resumePath || activeSocials.length > 0 ? (
              <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-4 font-mono text-sm">
                {site.resumePath ? (
                  <li>
                    <a
                      href={site.resumePath}
                      className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-signal"
                    >
                      Download CV (PDF)
                    </a>
                  </li>
                ) : null}
                {activeSocials.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      rel="me noopener"
                      className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-signal"
                    >
                      {social.label} <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Container>
      </div>

      {experience.length > 0 ? (
        <section aria-labelledby="experience-title" className="border-b border-line">
          <Container className="py-20 sm:py-28">
            <SectionHeader index="01" label="Experience" id="experience-title" title="Experience" />
            <ol className="border-b border-line">
              {experience.map((entry) => (
                <li
                  key={`${entry.company}-${entry.period}`}
                  className="grid gap-3 border-t border-line py-8 md:grid-cols-12 md:gap-6"
                >
                  <Annotation className="tabular-nums md:col-span-3">{entry.period}</Annotation>
                  <div className="md:col-span-8 md:col-start-5">
                    <h3 className="text-2xl font-medium">
                      {entry.role} <span className="text-muted">— {entry.company}</span>
                    </h3>
                    {entry.location ? (
                      <p className="mt-1 font-mono text-sm text-muted">{entry.location}</p>
                    ) : null}
                    <p className="mt-4 text-muted">{entry.summary}</p>
                    {entry.highlights && entry.highlights.length > 0 ? (
                      <ul className="mt-4 space-y-2 text-muted">
                        {entry.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-3">
                            <span aria-hidden="true" className="font-mono text-line-strong">
                              —
                            </span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      ) : null}

      <Capabilities />
      <Principles showAboutLink={false} />
    </>
  );
}
