# zulqaif-dev

Personal developer portfolio showcasing software engineering projects, interactive web experiences, and frontend development skills.

Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (type-checks and prerenders every page)
npm run lint
```

## Editing content

All personal content lives in `content/` — no component changes needed:

| File | What it holds |
| --- | --- |
| `content/site.ts` | Name, roles, location, email, social links, CV path |
| `content/profile.ts` | Bio, experience, principles, capabilities, stack |
| `content/projects.ts` | Case studies (`kind: "concept"` for self-initiated concepts) |

While `npm run dev` is running, a panel in the bottom-left corner lists content that is still missing. It never renders in production.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Absolute site URL for canonical links, Open Graph, sitemap and robots. On Vercel the production domain is used automatically when this is unset. |

## Structure

```
app/          routes, metadata, sitemap, robots, manifest, OG images
components/   layout, sections and UI primitives (Server Components by default)
content/      editable site content
lib/          helpers (metadata, site URL, OG image renderer)
proxy.ts      returns a real 404 for unknown /work/* slugs
```
