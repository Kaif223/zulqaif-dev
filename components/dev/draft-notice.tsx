import { site } from "@/content/site";
import { experience } from "@/content/profile";

// Development-only checklist of content that still needs real values.
// Renders nothing in production builds.
export function DraftNotice() {
  if (process.env.NODE_ENV === "production") return null;

  const missing = [
    !site.email && "Contact email (content/site.ts)",
    ...site.socials.filter((s) => !s.href).map((s) => `${s.label} URL (content/site.ts)`),
    !site.resumePath && "CV / résumé PDF (content/site.ts)",
    experience.length === 0 && "Work experience (content/profile.ts)",
  ].filter((item): item is string => Boolean(item));

  if (missing.length === 0) return null;

  return (
    <aside
      aria-label="Missing content (development only)"
      className="fixed bottom-3 left-3 z-50 max-w-xs border border-dashed border-signal bg-bg/95 p-3 font-mono text-xs shadow-lg"
    >
      <p className="font-semibold uppercase text-signal">Dev · content to add</p>
      <ul className="mt-2 list-disc space-y-0.5 pl-4 text-muted">
        {missing.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
