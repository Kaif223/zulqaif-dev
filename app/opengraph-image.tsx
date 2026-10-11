import { site } from "@/content/site";
import { ogSize, renderOgImage } from "@/lib/og-image";

export const alt = `${site.name} — ${site.roles.join(" & ")}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "[00] Index",
    title: site.name,
    footer: site.roles.join(" · "),
  });
}
