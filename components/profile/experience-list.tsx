import { education, experience } from "@/content/profile";
import { Badge } from "@/components/ui/badge";

// Experience and education cards. Fields that are still empty in
// content/profile.ts (start date, summary) are simply not rendered.
export function ExperienceList({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div data-reveal className="rounded-card border border-line bg-surface p-6 shadow-card sm:p-8">
        <Heading className="font-mono text-label text-ink-soft uppercase">Experience</Heading>
        <ul className="mt-6 space-y-6">
          {experience.map((entry) => (
            <li key={`${entry.company}-${entry.role}`}>
              <div className="flex flex-wrap items-center gap-2">
                {entry.current ? <Badge tone="accent">Current role</Badge> : null}
                {entry.start ? (
                  <span className="font-mono text-sm text-ink-soft">
                    {entry.start} — {entry.current ? "Present" : entry.end}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-h3 font-semibold">{entry.role}</p>
              <p className="text-ink-soft">
                {entry.company}
                {entry.location ? ` · ${entry.location}` : ""}
              </p>
              {entry.summary ? <p className="mt-3 text-ink-soft">{entry.summary}</p> : null}
              {entry.highlights.length > 0 ? (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-ink-soft marker:text-accent">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>

      <div data-reveal className="rounded-card border border-line bg-surface p-6 shadow-card sm:p-8">
        <Heading className="font-mono text-label text-ink-soft uppercase">Education</Heading>
        <ul className="mt-6 space-y-6">
          {education.map((entry) => (
            <li key={entry.degree}>
              <Badge>Completed {entry.completed}</Badge>
              <p className="mt-3 text-h3 font-semibold">{entry.degree}</p>
              <p className="text-ink-soft">
                {entry.institution} ({entry.institutionShort})
              </p>
              <p className="text-ink-soft">{entry.location}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
