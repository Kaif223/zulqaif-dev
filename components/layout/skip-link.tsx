// First focusable element on every page: lets keyboard users jump past the header.
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only z-50 bg-signal px-4 py-3 font-mono text-sm uppercase text-on-signal focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Skip to content
    </a>
  );
}
