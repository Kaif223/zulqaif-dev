// About-page content. Only real experience belongs here.

export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  location?: string;
  summary: string;
  highlights?: string[];
};

// TODO(content): add your real roles, most recent first. The Experience
// section stays hidden until this list has at least one entry. Example shape:
// {
//   role: "Frontend Developer",
//   company: "Company name",
//   period: "2024 — Present",
//   location: "Remote",
//   summary: "One sentence on what you owned.",
//   highlights: ["A concrete outcome", "Another concrete outcome"],
// },
export const experience: ExperienceEntry[] = [];

// TODO(content): replace with your own story — where you started, what you
// build now and what you want to build next. Keep it to two short paragraphs.
export const bio: string[] = [
  "I'm Muhammad Zulqaif, a frontend developer based in Faisalabad, Pakistan. I work across two disciplines that usually live apart.",
  "As a product frontend developer I care about the interfaces people use every day: clear state, keyboard-first interaction, and pages that load fast on real devices. As a creative developer I build the moments people remember — motion, real-time graphics and interaction with a reason to exist.",
];

export const principles = [
  {
    title: "Fast by default",
    body: "Performance is a feature you design for, not a fix you apply at the end.",
  },
  {
    title: "Accessible by default",
    body: "If it doesn't work with a keyboard or a screen reader, it isn't finished.",
  },
  {
    title: "Motion with a reason",
    body: "Animation should explain, guide or delight — never block the content.",
  },
  {
    title: "Details are the work",
    body: "Spacing, states and edge cases are where good interfaces separate from average ones.",
  },
];

// TODO(content): keep only what you can talk about confidently in an interview.
export const capabilities = [
  {
    track: "Product Frontend",
    heading: "Interfaces people use every day",
    items: [
      "Component architecture and design systems",
      "Accessible, keyboard-first UI",
      "Performance and Core Web Vitals",
      "Typed data flows with TypeScript",
    ],
  },
  {
    track: "Creative Development",
    heading: "Moments people remember",
    items: [
      "Scroll and page-transition motion",
      "Real-time 3D and shaders with WebGL",
      "Generative and interactive visuals",
      "Progressive enhancement and fallbacks",
    ],
  },
];

export const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "GSAP",
  "Three.js",
  "WebGL / GLSL",
];
