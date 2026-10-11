import type { CSSProperties } from "react";
import { activeSocials, site } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MapPinIcon, socialIcons } from "@/components/ui/icons";
import { LocalTime } from "@/components/local-time";
import { HeroVisual } from "@/components/hero/hero-visual";
import { SignalFieldFallback } from "@/components/hero/signal-field-fallback";

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

// Everything except the 3D visual is server-rendered HTML. The entrance is
// pure CSS, so it plays on first paint without waiting for JavaScript.
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden">
      <Container className="grid items-center gap-10 pt-10 pb-14 sm:pt-14 sm:pb-16 lg:grid-cols-12 lg:gap-12 lg:pt-16 lg:pb-20">
        <div className="lg:col-span-7">
          {site.availability ? (
            <p className="inline-flex animate-enter items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-ink-soft shadow-card motion-reduce:animate-none">
              <span aria-hidden="true" className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-50 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {site.availability}
            </p>
          ) : null}

          <h1 id="hero-title" className="mt-6 animate-rise motion-reduce:animate-none" style={delay(60)}>
            <span className="block text-lg font-medium text-ink-soft">{site.name}</span>
            <span className="mt-3 block text-hero font-semibold text-ink">{site.headline}</span>
          </h1>

          <p
            className="mt-6 max-w-xl animate-enter text-lg text-ink-soft motion-reduce:animate-none"
            style={delay(140)}
          >
            {site.intro}
          </p>

          <div className="mt-8 flex animate-enter flex-wrap gap-3 motion-reduce:animate-none" style={delay(220)}>
            <ButtonLink href="/#work">View projects</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact me
            </ButtonLink>
          </div>

          <div
            className="mt-10 flex animate-enter flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6 text-sm text-ink-soft motion-reduce:animate-none"
            style={delay(300)}
          >
            <p className="inline-flex items-center gap-2">
              <MapPinIcon className="size-4 text-accent-ink" />
              {site.location.city}, {site.location.country}
              <span aria-hidden="true">·</span>
              <LocalTime />
            </p>
            <ul className="flex items-center gap-1" aria-label="Profiles">
              {activeSocials.map(({ label, href }) => {
                const Icon = socialIcons[label];
                return (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="me noopener noreferrer"
                      className="inline-flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-subtle"
                    >
                      <Icon className="size-[1.125rem]" />
                      <span className="sr-only">{label} (opens in a new tab)</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="animate-enter motion-reduce:animate-none lg:col-span-5" style={delay(180)}>
          <HeroVisual fallback={<SignalFieldFallback />} />
        </div>
      </Container>
    </section>
  );
}
