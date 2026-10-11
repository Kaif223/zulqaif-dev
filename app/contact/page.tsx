import { activeSocials, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { MailIcon, MapPinIcon, socialIcons } from "@/components/ui/icons";
import { LocalTime } from "@/components/local-time";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${site.name} about freelance frontend projects or full-time and contract roles.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
      <SectionHeading
        as="h1"
        id="contact-title"
        eyebrow="Contact"
        title="Let's build something useful together."
        description="Tell me about your project or role. I work with product teams, startups and clients — in Pakistan and internationally."
      />

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <aside aria-labelledby="contact-methods-title" className="space-y-4 lg:col-span-5">
          <div className="rounded-card border border-line bg-surface p-6 shadow-card">
            <h2 id="contact-methods-title" className="font-mono text-label text-ink-soft uppercase">
              Reach me directly
            </h2>
            <ul className="mt-4 space-y-2">
              {site.email ? (
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex min-h-12 items-center gap-3 rounded-xl px-3 hover:bg-subtle"
                  >
                    <MailIcon className="size-5 text-accent-ink" />
                    <span className="break-all">{site.email}</span>
                  </a>
                </li>
              ) : null}
              {activeSocials.map(({ label, href, handle }) => {
                const Icon = socialIcons[label];
                return (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="me noopener noreferrer"
                      className="flex min-h-12 items-center gap-3 rounded-xl px-3 hover:bg-subtle"
                    >
                      <Icon className="size-5" />
                      <span>
                        <span className="font-medium text-ink">{label}</span>
                        <span className="block text-sm text-ink-soft">{handle}</span>
                      </span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-card border border-line bg-surface p-6 shadow-card">
            <h2 className="font-mono text-label text-ink-soft uppercase">Location</h2>
            <p className="mt-3 inline-flex items-center gap-2 text-ink">
              <MapPinIcon className="size-5 text-accent-ink" />
              {site.location.city}, {site.location.country}
            </p>
            <p className="mt-1 pl-7 text-sm text-ink-soft">
              Local time <LocalTime />
            </p>
          </div>
        </aside>

        <section
          aria-labelledby="enquiry-title"
          className="rounded-card border border-line bg-surface p-6 shadow-card sm:p-8 lg:col-span-7"
        >
          <h2 id="enquiry-title" className="text-h3 font-semibold">
            Project enquiry
          </h2>
          <p className="mt-1 text-ink-soft">
            {site.email
              ? "Submitting opens a ready-to-send email in your own mail app — this site doesn't store or send anything."
              : "Email delivery isn't set up on this site yet, so this form can't send a message. It will tell you where to reach me instead."}
          </p>
          <ContactForm email={site.email} linkedInUrl={activeSocials.find((s) => s.label === "LinkedIn")?.href} />
        </section>
      </div>
    </Container>
  );
}
