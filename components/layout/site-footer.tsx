import Link from "next/link";
import { cacheLife } from "next/cache";
import { activeSocials, site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { ArrowUp, MailIcon, socialIcons } from "@/components/ui/icons";

const pages = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Cache Components doesn't allow reading the clock during prerender, so the
// year is computed inside a cached scope and refreshed daily.
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6 lg:col-span-5">
            <p className="text-xl font-semibold tracking-tight">
              {site.wordmark}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-4 font-medium text-ink">
              {site.name} — {site.role}
            </p>
            <p className="mt-2 max-w-sm text-ink-soft">{site.footerStatement}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 lg:col-start-8">
            <h2 className="font-mono text-label text-ink-soft uppercase">Pages</h2>
            <ul className="mt-4 space-y-1">
              {pages.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="inline-flex min-h-10 items-center text-ink hover:text-accent-ink">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="font-mono text-label text-ink-soft uppercase">Connect</h2>
            <ul className="mt-4 space-y-1">
              {activeSocials.map(({ label, href }) => {
                const Icon = socialIcons[label];
                return (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="me noopener noreferrer"
                      className="inline-flex min-h-10 items-center gap-2.5 text-ink hover:text-accent-ink"
                    >
                      <Icon className="size-4" />
                      {label}
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                );
              })}
              {site.email ? (
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex min-h-10 items-center gap-2.5 text-ink hover:text-accent-ink"
                  >
                    <MailIcon className="size-4" />
                    Email
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse gap-4 border-t border-line pt-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {site.name}. {site.location.city}, {site.location.country}.
          </p>
          <a href="#top" className="inline-flex min-h-10 items-center gap-2 self-start text-ink hover:text-accent-ink sm:self-auto">
            Back to top
            <ArrowUp className="size-4" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
