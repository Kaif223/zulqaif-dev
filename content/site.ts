// Site identity and verified links — the single source of truth for personal
// details. Everything rendered about you (header, footer, metadata, JSON-LD,
// contact page) reads from here.
//
// Empty strings mean "not provided yet": the UI hides that element, and the
// development-only <DraftNotice /> lists it while `npm run dev` is running.

export type SocialLink = {
  label: "GitHub" | "LinkedIn";
  href: string;
  handle: string;
};

export const site = {
  name: "Muhammad Zulqaif",
  shortName: "Zulqaif",
  wordmark: "MZ",
  role: "Frontend Developer",
  headline: "Frontend developer building thoughtful digital experiences.",
  intro:
    "I build fast, accessible web interfaces with React, Next.js and TypeScript — responsive product UI, API-driven features and the details that make software feel good to use.",
  description:
    "Muhammad Zulqaif is a frontend developer in Faisalabad, Pakistan, building responsive, accessible web interfaces with React, Next.js, TypeScript and Tailwind CSS.",
  footerStatement:
    "Building useful, well-crafted interfaces for product teams, startups and clients — from first layout to production.",
  location: {
    city: "Faisalabad",
    country: "Pakistan",
    countryCode: "PK",
    timeZone: "Asia/Karachi",
    timeZoneLabel: "PKT · UTC+5",
  },

  // Shown as a small indicator in the hero. Set to "" to hide it.
  availability: "Open to freelance projects and new roles",

  // TODO(content): add a public contact email. Until then the contact form
  // explains that email isn't configured and points to LinkedIn instead.
  email: "",
  // TODO(content): add a CV, e.g. /public/muhammad-zulqaif-cv.pdf → "/muhammad-zulqaif-cv.pdf".
  resumePath: "",

  // Verified: github.com/Kaif223 resolves to this profile (name "Zulqaif").
  // LinkedIn resolves, but serves a sign-in check to automated requests, so
  // the profile content itself could not be inspected.
  socials: [
    { label: "GitHub", href: "https://github.com/Kaif223", handle: "@Kaif223" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/muhammad-zulqaif-105253344/",
      handle: "muhammad-zulqaif",
    },
  ] as SocialLink[],
};

export const activeSocials = site.socials.filter((social) => social.href);
export const linkedIn = site.socials.find((social) => social.label === "LinkedIn");
