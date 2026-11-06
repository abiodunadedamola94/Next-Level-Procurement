import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SITE_URL, SITE_NAME, MOTTO, PHONE_TEL, EMAIL } from "@/lib/site";

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
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
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
  // Google Search Console: paste the HTML-tag token here once the property is created.
  // verification: { google: "TOKEN" },
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
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
