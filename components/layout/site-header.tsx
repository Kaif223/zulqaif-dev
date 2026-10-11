import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { NavLinks } from "@/components/layout/nav-links";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 font-mono text-annotation uppercase"
        >
          <span className="font-semibold text-fg">{site.initials}</span>
          <span aria-hidden="true" className="hidden text-muted sm:inline">
            —
          </span>
          <span className="hidden text-muted sm:inline">{site.name}</span>
          <span className="sr-only sm:hidden">{site.name}, home</span>
        </Link>
        <nav aria-label="Primary">
          <NavLinks />
        </nav>
      </Container>
    </header>
  );
}
