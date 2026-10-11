import Image from "next/image";
import type { Project } from "@/content/projects";
import { cx } from "@/lib/cx";
import { ProjectArt } from "@/components/work/project-art";

type ProjectCoverProps = {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function ProjectCover({ project, sizes, priority, className }: ProjectCoverProps) {
  const { cover } = project;
  if (cover.type === "image") {
    return (
      <Image
        src={cover.src}
        width={cover.width}
        height={cover.height}
        alt={cover.alt}
        sizes={sizes}
        priority={priority}
        className={cx("size-full object-cover object-top", className)}
      />
    );
  }
  return <ProjectArt variant={cover.variant} />;
}
