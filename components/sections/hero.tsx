import { site } from "@/content/site";
import { Annotation } from "@/components/ui/annotation";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { SignalLine } from "@/components/signal-line";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-line">
      <Container className="pb-14 pt-8 sm:pb-20 sm:pt-12">
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-2">
          <Annotation as="span">[00] Index</Annotation>
          <Annotation as="span">
            {site.location.coordinates} · {site.location.city}, {site.location.countryCode}
          </Annotation>
          <Annotation as="span" className="flex items-center gap-2 text-fg">
            <span aria-hidden="true" className="size-2 rounded-full bg-signal" />
            {site.availability}
          </Annotation>
        </div>

        {/* The WebGL hero will render behind this heading in a later phase.
            The heading stays real HTML so it remains the LCP element. */}
        <h1
          id="hero-title"
          className="mt-14 font-display text-display-hero font-extrabold uppercase [font-stretch:125%] sm:mt-20"
        >
          <span className="block">Muhammad</span>
          <span className="block">Zulqaif</span>
          <span className="sr-only">, product frontend and creative developer</span>
        </h1>

        <SignalLine className="mt-8 h-8 w-full sm:mt-12 sm:h-10" />

        <div className="mt-8 grid gap-6 md:grid-cols-12">
          <ul className="space-y-1 md:col-span-4" aria-label="Roles">
            {site.roles.map((role) => (
              <li key={role}>
                <Annotation as="span" className="text-fg">
                  {role}
                </Annotation>
              </li>
            ))}
          </ul>
          <div className="md:col-span-7 md:col-start-6">
            <p className="max-w-2xl text-xl leading-snug text-balance sm:text-2xl">{site.tagline}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ArrowLink href="#work" arrow="down">
                Selected work
              </ArrowLink>
              <ArrowLink href="/contact" variant="secondary">
                Get in touch
              </ArrowLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
