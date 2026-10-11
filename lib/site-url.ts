// Absolute site URL used for canonical links, Open Graph, sitemap and robots.
// Order: explicit env var → Vercel production domain → local dev.
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteUrl = new URL(resolveSiteUrl());

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
