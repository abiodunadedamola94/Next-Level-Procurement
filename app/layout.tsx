import { themeScript } from "@/components/ThemeToggle";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SITE_URL, SITE_NAME, MOTTO, PHONE_TEL, EMAIL } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import SmoothScroll from "@/components/SmoothScroll";
import { allPosts } from "@/lib/blog";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "Next Level Procurement | Sourcing and UK Personal Shopping";
const DESCRIPTION =
  "Your dedicated buying team. Purchasing and sourcing from anywhere to anywhere, including China importation; personal shopping from the UK for clients abroad; and consumables supply for businesses and individuals.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s" },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/hero-bg.jpg", width: 1920, height: 1080, alt: SITE_NAME }],
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/hero-bg.jpg"],
  },
  // Search Console / Bing: the domain is verified by a DNS TXT record on Vercel DNS. If an
  // HTML-tag token is ever needed instead, set GOOGLE_SITE_VERIFICATION or BING_SITE_VERIFICATION
  // in the Vercel project's environment variables; no code change needed.
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  slogan: MOTTO,
  email: EMAIL,
  telephone: PHONE_TEL,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: PHONE_TEL,
      email: EMAIL,
      availableLanguage: ["English"],
    },
  ],
  knowsAbout: [
    "Purchasing and sourcing",
    "Importation from China",
    "Personal shopping from the UK",
    "Consumables supply",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Sets data-theme before first paint so the page never flashes the wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationJsonLd} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:bg-teal focus:text-ink focus:px-4 focus:py-2 focus:rounded-full"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Navbar showBlog={allPosts().length > 0} />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
