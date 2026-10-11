import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import { activeSocials, site } from "@/content/site";
import { stack } from "@/content/profile";
import { absoluteUrl, siteUrl } from "@/lib/site-url";
import { SkipLink } from "@/components/layout/skip-link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
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

// Variable font with the width axis, so headlines can be expanded or
// condensed with plain CSS (`font-stretch`) instead of extra font files.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const title = `${site.name} — ${site.roles.join(" & ")}`;

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
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0e" },
    { media: "(prefers-color-scheme: light)", color: "#edeae3" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: absoluteUrl("/"),
  jobTitle: site.roles,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location.city,
    addressCountry: site.location.countryCode,
  },
  knowsAbout: stack,
  ...(activeSocials.length > 0 && { sameAs: activeSocials.map((s) => s.href) }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-fg">
        <SkipLink />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={personJsonLd} />
        <DraftNotice />
      </body>
    </html>
  );
}
