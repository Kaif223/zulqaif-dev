"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";
import { ButtonLink } from "@/components/ui/button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

// Desktop links + "Let's talk" CTA, and a disclosure-style mobile menu:
// a button with aria-expanded/aria-controls that toggles a panel. Escape and
// clicks outside close it; it also closes after navigating.
export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the menu when the route changes (adjusting state during render,
  // the React-recommended alternative to an effect for this case).
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
        setOpen(false);
      }
    }
    const desktop = window.matchMedia("(min-width: 48rem)");
    function onDesktop(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  return (
    <>
      <nav aria-label="Primary" className="hidden md:block">
        <ul className="flex items-center gap-1">
          {links.map(({ href, label }) => {
            const active = isActive(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "relative inline-flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] transition-colors duration-200",
                    active ? "font-medium text-ink" : "text-ink-soft hover:bg-subtle hover:text-ink",
                  )}
                >
                  {label}
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent"
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex items-center gap-2">
        <ButtonLink href="/contact" size="sm" className="hidden sm:inline-flex">
          Let&apos;s talk
        </ButtonLink>
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium text-ink shadow-card md:hidden"
        >
          {open ? <CloseIcon className="size-4" /> : <MenuIcon className="size-4" />}
          {open ? "Close" : "Menu"}
          <span className="sr-only"> navigation menu</span>
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className={cx(
          "absolute inset-x-3 top-[calc(100%+0.5rem)] rounded-card border border-line bg-surface p-3 shadow-card-hover md:hidden",
          "transition-[opacity,transform,visibility] duration-200 ease-out-expo motion-reduce:transition-none",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
        )}
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {links.map(({ href, label }) => {
              const active = isActive(pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cx(
                      "flex min-h-12 items-center justify-between rounded-xl px-4 text-lg transition-colors",
                      active ? "bg-subtle font-medium text-ink" : "text-ink-soft hover:bg-subtle hover:text-ink",
                    )}
                  >
                    {label}
                    {active ? <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ButtonLink href="/contact" className="mt-3 w-full" onClick={() => setOpen(false)}>
            Let&apos;s talk
          </ButtonLink>
        </nav>
      </div>
    </>
  );
}
