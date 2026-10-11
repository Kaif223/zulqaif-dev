// Single source of truth for personal details. Everything rendered about you
// (header, footer, metadata, JSON-LD, contact page) reads from here.
//
// Empty strings are treated as "not provided yet": the UI hides the related
// element, and <DraftNotice /> lists it while you run `npm run dev`.

export type SocialLink = {
  label: string;
  href: string;
};

export const site = {
  name: "Muhammad Zulqaif",
  shortName: "Zulqaif",
  initials: "MZ",
  roles: ["Product Frontend Developer", "Creative Developer"],
  tagline:
    "I build fast, accessible product interfaces — and interactive experiences people remember.",
  description:
    "Muhammad Zulqaif is a product frontend and creative developer in Faisalabad, Pakistan, building fast, accessible interfaces and interactive web experiences.",
  location: {
    city: "Faisalabad",
    country: "Pakistan",
    countryCode: "PK",
    timeZone: "Asia/Karachi",
    timeZoneLabel: "PKT · UTC+5",
    coordinates: "31.42°N 73.08°E",
  },
  availability: "Open to full-time roles and freelance projects",

  // TODO(content): public contact email, e.g. a personal or custom-domain address.
  email: "",
  // TODO(content): add GitHub and LinkedIn profile URLs.
  socials: [
    { label: "GitHub", href: "" },
    { label: "LinkedIn", href: "" },
  ] as SocialLink[],
  // TODO(content): drop a PDF in /public (e.g. /public/muhammad-zulqaif-cv.pdf) and set its path.
  resumePath: "",
};

export const activeSocials = site.socials.filter((social) => social.href);
