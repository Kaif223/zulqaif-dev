// First focusable element on every page: lets keyboard users jump past the header.
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only z-50 rounded-full bg-ink px-5 py-3 text-sm font-medium text-surface focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      Skip to content
    </a>
  );
}
