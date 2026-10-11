import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { activeSocials, site } from "@/content/site";
import { education, experience, stack } from "@/content/profile";
import { absoluteUrl, siteUrl } from "@/lib/site-url";
import { SkipLink } from "@/components/layout/skip-link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MotionLoader } from "@/components/motion/motion-loader";
import { JsonLd } from "@/components/json-ld";
import { DraftNotice } from "@/components/dev/draft-notice";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f8f8f5",
};

const currentRole = experience.find((entry) => entry.current);

// Only facts from content/ — no ratings, reviews or invented claims.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: absoluteUrl("/"),
  jobTitle: site.role,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location.city,
    addressCountry: site.location.countryCode,
  },
  knowsAbout: stack,
  ...(currentRole && {
    worksFor: { "@type": "Organization", name: currentRole.company },
  }),
  alumniOf: education.map((entry) => ({ "@type": "CollegeOrUniversity", name: entry.institution })),
  ...(activeSocials.length > 0 && { sameAs: activeSocials.map((social) => social.href) }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body id="top" className="flex min-h-full flex-col bg-bg text-ink">
        <SkipLink />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <MotionLoader />
        <JsonLd data={personJsonLd} />
        <DraftNotice />
      </body>
    </html>
  );
}
