import { linkedIn, site } from "@/content/site";
import { ButtonLink, ExternalButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

// The one intentional dark surface on the site: a closing call to action.
export function ContactCta({ id = "contact-cta" }: { id?: string }) {
  return (
    <section aria-labelledby={`${id}-title`} className="py-16 sm:py-20 lg:py-24">
      <Container>
        <div
          data-reveal
          className="relative overflow-hidden rounded-[1.75rem] bg-night px-6 py-12 text-surface sm:px-12 sm:py-16 lg:px-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full border border-night-line"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full border border-night-line"
          />
          <div className="relative max-w-2xl">
            <p className="inline-flex items-center gap-2 font-mono text-label font-medium text-accent uppercase">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              Next step
            </p>
            <h2 id={`${id}-title`} className="mt-4 text-h2 font-semibold text-surface">
              Have a project or a role in mind?
            </h2>
            <p className="mt-4 text-lg text-night-soft">
              {site.availability
                ? "I'm open to freelance work and new opportunities with product teams, startups and clients worldwide. Tell me what you're building."
                : "Tell me about your project or role — I'm happy to talk it through."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="inverse">
                Start a conversation
              </ButtonLink>
              {site.email ? (
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-12 items-center rounded-full border border-night-soft/60 px-6 text-[0.9375rem] font-medium text-surface transition-colors hover:border-surface"
                >
                  {site.email}
                </a>
              ) : linkedIn ? (
                <ExternalButtonLink href={linkedIn.href} variant="inverse-outline">
                  Message on LinkedIn
                </ExternalButtonLink>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
