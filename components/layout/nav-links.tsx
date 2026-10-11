"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/lib/cx";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Three links fit on a 320px screen, so there is no hamburger menu:
// every destination stays one tap away and nothing is hidden behind JS.
export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-1 sm:gap-2">
      {links.map(({ href, label }) => {
        const isCurrent = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={isCurrent ? "page" : undefined}
              className={cx(
                "inline-flex min-h-11 items-center px-2 font-mono text-annotation uppercase transition-colors duration-200 sm:px-3",
                isCurrent ? "text-signal" : "text-muted hover:text-fg",
              )}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
