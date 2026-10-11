// Biography, experience, education, capabilities and approach.
// Only verified facts belong here. Fields marked TODO(content) are rendered
// only once they have a value, and are listed by <DraftNotice /> in dev.

export type ExperienceEntry = {
  role: string;
  company: string;
  current: boolean;
  // TODO(content): e.g. "Mar 2026" — hidden until provided.
  start: string;
  end?: string;
  location?: string;
  // TODO(content): one sentence on what you own in this role.
  summary: string;
  highlights: string[];
};

export type EducationEntry = {
  degree: string;
  institution: string;
  institutionShort: string;
  location: string;
  completed: string;
};

export const bio = [
  "I'm Muhammad Zulqaif, a frontend developer based in Faisalabad, Pakistan. I work with React, Next.js and TypeScript to build responsive interfaces that are clear to use and solid underneath.",
  "I care about the parts of frontend work that users feel but rarely notice: layouts that hold up on every screen, keyboard and screen-reader support, fast loading, and code that stays easy to change.",
];

export const focus =
  "Product-focused frontend engineering: turning designs and requirements into accessible, responsive and maintainable interfaces — with motion and interactive details where they genuinely help.";

export const experience: ExperienceEntry[] = [
  {
    role: "Frontend Developer",
    company: "Genius Mind Zone",
    current: true,
    start: "",
    summary: "",
    highlights: [],
  },
];

export const education: EducationEntry[] = [
  {
    degree: "BS Computer Science",
    institution: "Government College University Faisalabad",
    institutionShort: "GCUF",
    location: "Faisalabad, Pakistan",
    completed: "2026",
  },
];

export const capabilities = [
  {
    title: "Frontend engineering",
    description:
      "Component architecture, typed data flows and state that stays predictable as features grow.",
  },
  {
    title: "React & Next.js",
    description:
      "App Router, Server Components, routing, metadata and static rendering with React 19 and Next.js.",
  },
  {
    title: "Responsive UI",
    description:
      "Layouts built mobile-first with Tailwind CSS and checked at every breakpoint from 320px upward.",
  },
  {
    title: "API integration",
    description:
      "Connecting interfaces to REST APIs with clear loading, empty and error states.",
  },
  {
    title: "Design to code",
    description:
      "Translating designs into faithful, reusable components with consistent spacing, type and tokens.",
  },
  {
    title: "Performance & accessibility",
    description:
      "Semantic HTML, keyboard support, contrast-checked colour and lean client-side JavaScript.",
  },
];

export const approach = [
  {
    title: "Understand",
    description: "Clarify goals, users, constraints and what “done” means before writing code.",
  },
  {
    title: "Design & build",
    description: "Implement the interface as reusable, responsive components that follow the design.",
  },
  {
    title: "Integrate",
    description: "Wire up data and APIs with real loading, empty and error states.",
  },
  {
    title: "Test",
    description: "Check behaviour across screen sizes, keyboard use, edge cases and build output.",
  },
  {
    title: "Refine & deliver",
    description: "Polish details, document what matters and ship a version that is easy to maintain.",
  },
];

// The technologies you named as your main stack.
export const stack = [
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "REST APIs",
  "Responsive UI",
];
