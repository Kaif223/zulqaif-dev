import type { Project } from "@/content/projects";
import { cx } from "@/lib/cx";

export function StatusTag({ project }: { project: Pick<Project, "kind" | "status"> }) {
  const isConcept = project.kind === "concept";
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 whitespace-nowrap px-2 py-1 font-mono text-annotation uppercase",
        isConcept ? "border border-dashed border-signal text-signal" : "border border-line-strong text-fg",
      )}
    >
      {!isConcept ? (
        <span
          aria-hidden="true"
          className={cx("size-1.5 rounded-full", project.status === "Live" ? "bg-signal" : "bg-muted")}
        />
      ) : null}
      {project.status}
    </span>
  );
}
