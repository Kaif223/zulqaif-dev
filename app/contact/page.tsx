import { activeSocials, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Annotation } from "@/components/ui/annotation";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/page-intro";
import { LocalTime } from "@/components/local-time";
import { ContactBrief } from "@/components/contact-brief";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Get in touch with ${site.name} about full-time frontend roles or freelance projects.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro index="03" label="Contact" title="Let's talk">
        <p>
          Hiring for a frontend or creative developer role, or planning a project? Send a short brief —
          I read every message.
        </p>
      </PageIntro>

      <Container className="grid gap-14 py-16 sm:py-24 md:grid-cols-12 md:gap-6">
        <aside className="space-y-8 md:col-span-4" aria-label="Contact details">
          <div>
            <Annotation>Email</Annotation>
            {site.email ? (
              <a
                href={`mailto:${site.email}`}
                className="mt-2 inline-block break-all text-xl underline decoration-line-strong underline-offset-4 transition-colors hover:text-signal"
              >
                {site.email}
              </a>
            ) : (
              <p className="mt-2 text-muted">Email address coming soon.</p>
            )}
          </div>
          <div>
            <Annotation>Local time</Annotation>
            <p className="mt-2 font-mono">
              <LocalTime />
            </p>
            <p className="mt-1 text-sm text-muted">
              {site.location.city}, {site.location.country}
            </p>
          </div>
          {activeSocials.length > 0 ? (
            <div>
              <Annotation>Elsewhere</Annotation>
              <ul className="mt-2 space-y-1">
                {activeSocials.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      rel="me noopener"
                      className="transition-colors hover:text-signal"
                    >
                      {social.label} <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>

        <section aria-labelledby="brief-title" className="md:col-span-7 md:col-start-6">
          <h2 id="brief-title" className="text-2xl font-medium">
            Write a brief
          </h2>
          <p className="mt-2 text-muted">
            This opens a pre-filled email in your mail app. Nothing is sent or stored by this site.
          </p>
          <ContactBrief email={site.email} />
        </section>
      </Container>
    </>
  );
}
