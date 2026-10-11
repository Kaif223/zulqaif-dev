import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { SiteNav } from "@/components/layout/site-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/75">
      <Container className="relative flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-3 rounded-full pr-2"
          aria-label={`${site.name} — home`}
        >
          <span className="text-xl font-semibold tracking-tight text-ink">
            {site.wordmark}
            <span className="text-accent">.</span>
          </span>
          <span className="hidden text-sm text-ink-soft lg:inline">{site.name}</span>
        </Link>
        <SiteNav />
      </Container>
    </header>
  );
}
