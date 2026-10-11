// Work and case studies. Order here is the order on the site.
//
// Real projects are taken from public repositories on github.com/Kaif223;
// every statement below comes from that repository's README or code. No
// results/metrics are listed because none are documented — add `results`
// only when you have real evidence.
//
// `kind: "concept"` marks self-initiated concepts. They always render with a
// visible "Concept project" label and a note that they are not client work.

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

export type ProjectCover =
  | ({ type: "image" } & ProjectImage)
  | { type: "art"; variant: "phone" | "list" | "grid" | "wave" | "field" };

export type Project = {
  slug: string;
  title: string;
  category: string;
  kind: "real" | "concept";
  context: string;
  year: string;
  featured: boolean;
  summary: string;
  stack: string[];
  links: { live?: string; repo?: string };
  cover: ProjectCover;
  gallery?: ProjectImage[];
  role: string;
  motivation: string[];
  contributions: string[];
  implementation: string[];
  decisions: string[];
  results?: string[];
  // Shown in the dev-only DraftNotice until removed.
  reviewNote?: string;
};

export const projects: Project[] = [
  {
    slug: "carepulse-website",
    title: "CarePulse website",
    category: "Marketing website",
    kind: "real",
    context: "Live website",
    year: "2026",
    featured: true,
    summary:
      "The public marketing site for CarePulse, a pharmacy and retail management platform — a statically prerendered Next.js 16 site that recreates the real product UI instead of using stock imagery.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "GSAP", "Motion", "Vitest", "Playwright"],
    links: {
      live: "https://carepulse-pharmacy.vercel.app",
      repo: "https://github.com/Kaif223/carepulse-website",
    },
    cover: {
      type: "image",
      src: "/work/carepulse/desktop.webp",
      width: 1440,
      height: 900,
      alt: "CarePulse website hero: the headline “Run the counter, the shelf and the books from one system” above a recreated product dashboard.",
    },
    gallery: [
      {
        src: "/work/carepulse/mobile.webp",
        width: 585,
        height: 1266,
        alt: "The CarePulse website on a phone: stacked headline, introduction and call-to-action buttons.",
        caption: "Mobile layout of the live site.",
      },
    ],
    role: "Frontend development",
    motivation: [
      "CarePulse covers point of sale, earliest-expiry-first (FEFO) batch dispensing, customer credit ledgers and cash-drawer reconciliation across one or several branches. The website had to explain that clearly to pharmacy and retail owners — and accurately.",
      "Every capability on the page is checked against the application itself, so the site never promises something the product doesn't do.",
    ],
    contributions: [
      "Built the site with the Next.js 16 App Router, React 19 and TypeScript, prerendered as static pages.",
      "Recreated product screens — dashboard, point of sale, FEFO demo, ledger, cash shift, reports and transfers — as components using the app's development sample data, each marked “sample data”.",
      "Organised motion by purpose: CSS keyframes for the hero, GSAP ScrollTrigger for two pinned chapters, and Motion for state-driven demos.",
      "Added unit tests with Vitest and Testing Library, and Playwright end-to-end tests across desktop, tablet and mobile.",
    ],
    implementation: [
      "The hero animates with pure CSS, so nothing above the fold waits for JavaScript to hydrate.",
      "GSAP is only downloaded on screens at least 1024px wide without a reduced-motion preference — phones never load it. Its scenes run inside gsap.matchMedia and are reverted on unmount, resize or a preference change.",
      "The build validates its environment: it refuses to run without a valid public site URL and at least one real contact path. Preview deployments are served noindex with a disallow-all robots.txt.",
      "The FEFO demo runs a TypeScript port of the API's allocation logic, with tests that include the README's worked example.",
    ],
    decisions: [
      "No stock photography, Lottie or 3D. Recreating the actual product UI explains more than decoration would.",
      "A “product truth” unit test fails the build if the copy picks up fake social proof, buzzwords or compliance claims, or if the structured data gains offers, ratings or reviews.",
      "The FAQ states plainly which features — offline mode and FBR e-invoicing — are not in the current version.",
    ],
    reviewNote: "CarePulse: confirm your role and that this project may be shown publicly.",
  },
  {
    slug: "fitfuse",
    title: "FitFuse",
    category: "Mobile app",
    kind: "real",
    context: "Independent project",
    year: "2026",
    featured: true,
    summary:
      "A React Native and Expo app for cataloguing clothes, getting weather-based outfit suggestions and scanning an outfit photo for AI-matched suggestions from your own wardrobe.",
    stack: ["React Native", "Expo", "Expo Router", "Redux Toolkit", "Supabase", "Groq API", "OpenWeather API"],
    links: { repo: "https://github.com/Kaif223/fitfuse" },
    cover: { type: "art", variant: "phone" },
    role: "Design and development",
    motivation: [
      "Help people make better use of the clothes they already own: suggest outfits from their own closet based on the weather, and turn a photo of an outfit into matching suggestions.",
    ],
    contributions: [
      "Built the Expo client with file-based routing across five areas: Today, Closet, Scan, Feed and Profile.",
      "Integrated Supabase for authentication, Postgres and file storage, with row-level security enforcing access control.",
      "Connected Groq's vision model to analyse outfit photos and return a strict JSON response.",
      "Added live weather by city through the OpenWeather API, and a social feed with posts, likes, comments and follows.",
    ],
    implementation: [
      "A backend-less architecture: the Expo client talks directly to Supabase, and a Postgres trigger creates the profile row on sign-up.",
      "Two separate suggestion engines. The Today tab uses local logic that maps temperature bands to season tags — no AI call. The Scan tab sends the photo and wardrobe list to Groq, adding weather to the prompt when the profile has a city.",
      "State is managed with Redux Toolkit; navigation uses Expo Router.",
    ],
    decisions: [
      "Keeping everyday suggestions local makes them instant, free and reliable. AI is reserved for the photo scan, where it adds something local rules can't.",
      "The README documents the architecture openly, including legacy code that is no longer wired up.",
    ],
    reviewNote: "FitFuse: confirm the role line, and add screenshots if you have them.",
  },
  {
    slug: "portfolio",
    title: "Personal portfolio",
    category: "Website",
    kind: "real",
    context: "This website",
    year: "2026",
    featured: true,
    summary:
      "The site you're on: a light, accessible portfolio built with Next.js 16 and React 19, with a restrained GSAP motion layer and a lazily loaded WebGL hero that falls back to a static visual.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "GSAP", "Three.js", "React Three Fiber"],
    links: { repo: "https://github.com/Kaif223/zulqaif-dev" },
    cover: { type: "art", variant: "field" },
    role: "Design and development",
    motivation: [
      "Present real work clearly to hiring managers and clients, and demonstrate frontend craft in the site itself — without letting effects get in the way of the content.",
    ],
    contributions: [
      "Designed a light-first design system with contrast-checked colour tokens, fluid type and consistent spacing.",
      "Built every page with Server Components by default, keeping client-side JavaScript to the pieces that need it.",
      "Wrote the WebGL signal field as a custom shader in React Three Fiber, with device tiers and a static fallback.",
    ],
    implementation: [
      "The hero entrance is pure CSS, so it plays before any JavaScript loads. GSAP and ScrollTrigger load afterwards and only animate content below the fold.",
      "The 3D scene is loaded on idle in its own chunk, pauses when it is off-screen or the tab is hidden, and is skipped entirely for reduced motion, Data Saver or missing WebGL support.",
      "Content lives in typed data files, so projects and profile details can change without touching components.",
    ],
    decisions: [
      "The brand orange fails WCAG contrast as small text, so it is used for fills and indicators, with a darker shade for orange text.",
      "No experimental “lab” section yet — an empty route would only add noise.",
    ],
  },
  {
    slug: "ledger-data-grid",
    title: "Ledger — accessible data grid",
    category: "Product UI",
    kind: "concept",
    context: "Concept project",
    year: "2026",
    featured: true,
    summary:
      "A concept for a data-dense table that stays fully usable from the keyboard and with a screen reader, even with thousands of rows.",
    stack: ["React", "TypeScript", "ARIA grid pattern", "Virtualization"],
    links: {},
    cover: { type: "art", variant: "grid" },
    role: "Independent concept — planned design and engineering",
    motivation: [
      "Dashboards rely on large tables, and large tables are where accessibility usually breaks: focus is lost on re-render, virtualized rows disappear for assistive technology, and filters reset on navigation.",
    ],
    contributions: [
      "Defined the keyboard model, state model and rendering strategy described below. This concept has not been built or shipped.",
    ],
    implementation: [
      "Follow the WAI-ARIA grid pattern with a roving tabindex, so arrow keys move between cells and Tab leaves the grid in one step.",
      "Virtualize rows while exposing the true row count and row index to assistive technology.",
      "Keep sort, filter and density in the URL, so views are shareable and survive a refresh.",
    ],
    decisions: [
      "Accessibility is treated as part of the data model — row indexes and counts are first-class state — rather than added afterwards.",
    ],
  },
  {
    slug: "redux-todo",
    title: "Redux Todo",
    category: "Web app",
    kind: "real",
    context: "Learning project",
    year: "2026",
    featured: false,
    summary:
      "A todo app built as a React learning project, then migrated from component state to Redux Toolkit — with search, filters, pagination, dark mode and localStorage persistence.",
    stack: ["React 19", "Redux Toolkit", "React Router 7", "SCSS"],
    links: { repo: "https://github.com/Kaif223/redux-todo-app" },
    cover: { type: "art", variant: "list" },
    role: "Development (learning project)",
    motivation: [
      "Learn state management properly by building the same app twice: first with useState and localStorage, then with a centralized Redux Toolkit store.",
    ],
    contributions: [
      "Built add, edit and delete flows with name, email, phone and date fields, plus pending/completed status toggling.",
      "Added real-time search by title, status filters and pagination with 5, 10 or 15 items per page.",
      "Added a dark mode toggle and localStorage persistence with a loading state while stored data hydrates.",
    ],
    implementation: [
      "Migrated to createSlice, useSelector and useDispatch, and moved the selected item for edit routing from localStorage into Redux state.",
      "Routing uses React Router 7; styles are written in SCSS.",
    ],
    decisions: [
      "The first, plain-React implementation is kept in comments so both approaches can be compared.",
    ],
  },
  {
    slug: "monsoon-generative-visual",
    title: "Monsoon — generative weather visual",
    category: "Creative development",
    kind: "concept",
    context: "Concept project",
    year: "2026",
    featured: false,
    summary:
      "A concept for a real-time WebGL piece that turns live weather in Faisalabad into a slowly shifting field of light.",
    stack: ["WebGL", "GLSL", "Three.js"],
    links: {},
    cover: { type: "art", variant: "wave" },
    role: "Independent concept — planned creative development",
    motivation: [
      "Map temperature, humidity and wind to colour, density and flow, so the same page looks different in June heat than on a monsoon evening.",
    ],
    contributions: [
      "Defined the visual mapping and performance plan described below. This concept has not been built or shipped.",
    ],
    implementation: [
      "Generate everything in a shader — no pre-rendered video or heavy models — so the piece stays small and resolution-independent.",
      "Detect device capability up front, lower resolution when the frame rate drops, and show a still frame for reduced motion.",
    ],
    decisions: [
      "An expressive visual still needs a performance budget and an accessible fallback.",
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectNeighbours(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    previous: index > 0 ? projects[index - 1] : undefined,
    next: index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}
