// Case studies. Order here is the order on the site.
//
// `kind: "concept"` marks self-initiated work that is not client or employer
// work. Concepts always render with a visible "Concept" label and a note, so
// they can never be mistaken for shipped work.
//
// TODO(content): add your real, authorized projects above the concepts.

export type ProjectSection = {
  heading: string;
  body: string[];
};

export type Project = {
  slug: string;
  title: string;
  kind: "real" | "concept";
  status: "Live" | "In progress" | "Concept";
  track: "Product" | "Creative" | "Product + Creative";
  year: string;
  role: string;
  summary: string;
  stack: string[];
  links?: { label: string; href: string }[];
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "signal-portfolio",
    title: "Signal — personal portfolio",
    kind: "real",
    status: "In progress",
    track: "Product + Creative",
    year: "2026",
    role: "Design & engineering",
    summary:
      "The site you are on. A portfolio built in public, in phases: a fast, accessible static foundation first, then motion and a real-time WebGL hero on top.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4"],
    sections: [
      {
        heading: "Goal",
        body: [
          "Show two skill sets in one place: the discipline of product frontend work and the craft of creative development — without one undermining the other.",
        ],
      },
      {
        heading: "Constraints",
        body: [
          "Award-style portfolios often score well on motion and poorly on accessibility and semantics. This site treats that gap as the brief: every effect has to sit on top of a page that already works without it.",
          "Content renders on the server. JavaScript is shipped only where interaction needs it — currently the local-time clock, active navigation state and the contact brief.",
        ],
      },
      {
        heading: "Decisions",
        body: [
          "Static first. Phase one ships every page with zero animation libraries, so the baseline is fast, indexable and usable with a keyboard or screen reader.",
          "One typeface family per job: Archivo's variable width axis for display type, Geist for interface text, Geist Mono for annotations. Expressive typography costs no extra JavaScript.",
          "Colour tokens are checked against WCAG contrast ratios in both light and dark themes, and the site follows the visitor's system theme instead of forcing one.",
        ],
      },
      {
        heading: "What's next",
        body: [
          "A GSAP motion layer with a reduced-motion path, then a procedural WebGL hero that loads after the content and falls back to a still frame on low-power devices.",
        ],
      },
    ],
  },
  {
    slug: "ledger-data-grid",
    title: "Ledger — accessible data grid",
    kind: "concept",
    status: "Concept",
    track: "Product",
    year: "2026",
    role: "Concept · design & engineering",
    summary:
      "A concept for a data-dense table that stays fully usable from the keyboard and with a screen reader, even with thousands of rows.",
    stack: ["React", "TypeScript", "ARIA grid pattern", "Virtualization"],
    sections: [
      {
        heading: "Problem",
        body: [
          "Dashboards lean on large tables, and large tables are where accessibility usually breaks: focus gets lost on re-render, virtualized rows disappear for assistive technology, and filters reset on navigation.",
        ],
      },
      {
        heading: "Planned approach",
        body: [
          "Follow the WAI-ARIA grid pattern with roving tabindex, so arrow keys move between cells and Tab leaves the grid in one step.",
          "Virtualize rows while exposing the true row count and row index to assistive technology.",
          "Keep sort, filter and density state in the URL, so views are shareable and survive a refresh.",
        ],
      },
      {
        heading: "What this concept is for",
        body: [
          "To demonstrate the product-side thinking behind interfaces people use every day: state design, keyboard models and performance under load.",
        ],
      },
    ],
  },
  {
    slug: "monsoon-generative-visual",
    title: "Monsoon — generative weather visual",
    kind: "concept",
    status: "Concept",
    track: "Creative",
    year: "2026",
    role: "Concept · creative development",
    summary:
      "A concept for a real-time WebGL piece that turns live weather in Faisalabad into a slowly shifting field of light.",
    stack: ["WebGL", "GLSL", "Three.js"],
    sections: [
      {
        heading: "Idea",
        body: [
          "Map temperature, humidity and wind to colour, density and flow in a procedural shader, so the same page looks different in June heat than in a monsoon evening.",
        ],
      },
      {
        heading: "Planned approach",
        body: [
          "Everything is generated in code — no pre-rendered video and no heavy 3D models — so the piece stays small and resolution-independent.",
          "Detect device capability up front, lower resolution when frame rate drops, and render a single still frame when the visitor prefers reduced motion.",
        ],
      },
      {
        heading: "What this concept is for",
        body: [
          "To demonstrate creative development with engineering discipline: an expressive visual with a performance budget and an accessible fallback.",
        ],
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
