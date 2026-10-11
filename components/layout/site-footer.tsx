import Link from "next/link";
import { activeSocials, site } from "@/content/site";
import { Annotation } from "@/components/ui/annotation";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { LocalTime } from "@/components/local-time";

const sitemap = [
  { href: "/", label: "Index" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <Container className="py-16 sm:py-24">
        <Annotation>[∞] Next step</Annotation>
        <p className="mt-6 max-w-5xl font-display text-display-lg font-extrabold uppercase [font-stretch:118%]">
          Let&apos;s build something precise.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <ArrowLink href="/contact">Start a conversation</ArrowLink>
          {site.email ? (
            <a
              href={`mailto:${site.email}`}
              className="font-mono text-sm text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:text-signal"
            >
              {site.email}
            </a>
          ) : null}
        </div>

        <div className="mt-16 grid gap-10 border-t border-line pt-8 sm:grid-cols-3">
          <div>
            <Annotation as="span" className="block">
              Based in
            </Annotation>
            <p className="mt-3 font-mono text-sm">
              {site.location.city}, {site.location.country}
              <br />
              <LocalTime />
            </p>
          </div>
          <nav aria-label="Footer">
            <Annotation as="span" className="block">
              Sitemap
            </Annotation>
            <ul className="mt-3 space-y-1 font-mono text-sm">
              {sitemap.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-signal">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {activeSocials.length > 0 ? (
            <div>
              <Annotation as="span" className="block">
                Elsewhere
              </Annotation>
              <ul className="mt-3 space-y-1 font-mono text-sm">
                {activeSocials.map(({ href, label }) => (
                  <li key={href}>
                    <a href={href} rel="me noopener" className="transition-colors hover:text-signal">
                      {label} <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="mt-16 flex flex-wrap justify-between gap-4">
          <Annotation as="span">© {site.name}</Annotation>
          <Annotation as="span">{site.location.coordinates}</Annotation>
        </div>
      </Container>
    </footer>
  );
}
