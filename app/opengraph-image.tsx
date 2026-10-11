import { site } from "@/content/site";
import { ogSize, renderOgImage } from "@/lib/og-image";

export const alt = `${site.name} — ${site.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: site.role,
    title: site.headline,
    footer: `${site.location.city}, ${site.location.country}`,
  });
}
