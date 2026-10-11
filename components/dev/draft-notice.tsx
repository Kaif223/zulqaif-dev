import { site } from "@/content/site";
import { experience } from "@/content/profile";
import { projects } from "@/content/projects";

// Development-only checklist of content that still needs your input.
// Renders nothing in production builds.
export function DraftNotice() {
  if (process.env.NODE_ENV === "production") return null;

  const missing = [
    !site.email && "Contact email — content/site.ts",
    !site.resumePath && "CV PDF — content/site.ts",
    ...experience.flatMap((entry) => [
      !entry.start && `${entry.company}: start date — content/profile.ts`,
      !entry.summary && `${entry.company}: role summary — content/profile.ts`,
    ]),
    ...projects.map((project) => project.reviewNote),
    !process.env.NEXT_PUBLIC_SITE_URL && "NEXT_PUBLIC_SITE_URL (production domain) — see README",
  ].filter((item): item is string => Boolean(item));

  if (missing.length === 0) return null;

  return (
    <details className="fixed bottom-3 left-3 z-50 max-w-xs rounded-xl border border-dashed border-accent-ink bg-surface/95 p-3 text-xs shadow-card-hover backdrop-blur">
      <summary className="cursor-pointer font-semibold text-accent-ink">
        Dev · {missing.length} content items to add
      </summary>
      <ul className="mt-2 list-disc space-y-1 pl-4 text-ink-soft">
        {missing.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </details>
  );
}
