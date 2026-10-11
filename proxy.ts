import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/content/projects";

// With Cache Components, /work/[slug] streams its shell before the page can
// call notFound(), so unknown slugs would get a "soft 404" (status 200 +
// noindex). Checking the slug here, before rendering starts, returns a real
// 404 status while still showing the app's not-found page.
const knownSlugs = new Set(projects.map((project) => project.slug));

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !knownSlugs.has(slug)) {
    return NextResponse.rewrite(new URL("/_unknown-case-study", request.url));
  }
}

export const config = {
  matcher: "/work/:slug",
};
