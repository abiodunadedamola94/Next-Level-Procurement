import type { Metadata } from "next";
import Link from "next/link";

import PageHeader from "@/components/PageHeader";
import { EMAIL, PHONE_DISPLAY, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy | Next Level Procurement",
  description: "What this website collects, why, and how to reach us about your information.",
  alternates: { canonical: "/privacy" },
};

// Written from what the site actually does (checked 8 Nov 2026): the quote form emails her inbox (site-enquiry, kept 12 months) and opens WhatsApp
// with a copy; the theme choice stays in the browser; analytics is Vercel's
// cookieless page counter. Update this page if any of that changes.
const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "Who we are",
    body: (
      <p>
        {SITE_NAME} is a buying, sourcing and personal shopping service. You can reach us by email at{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or by phone and WhatsApp on {PHONE_DISPLAY}.
      </p>
    ),
  },
  {
    title: "What you send us",
    body: (
      <>
        <p>
          The quote form asks what you need, how many, where from, where to, by when, your name, and a WhatsApp number or email so
          we can reply. When you press send, two things happen: your answers come to our inbox by email, and your phone or computer
          opens WhatsApp with the same message written out, which you can send there too. We keep a copy of each request for 12
          months and then delete it. Nothing about your device is kept with it.
        </p>
        <p>
          If you email, call or message us, we see what you send and your contact details. We use them only to answer you, to
          give you a price and to carry out the order you ask for.
        </p>
      </>
    ),
  },
  {
    title: "What the website records",
    body: (
      <>
        <p>
          We count visits with Vercel Web Analytics, which records pages viewed, the referring site, and the country and device
          type. It does not use cookies and does not identify you.
        </p>
        <p>
          On the quote page we also count, by day, how many times the form was seen, started and sent. The count holds no
          cookie, no device address and nothing you type.
        </p>
        <p>
          If you choose a light or dark theme, the choice is saved in your own browser so the site remembers it. It is not sent to us.
        </p>
      </>
    ),
  },
  {
    title: "Who else sees it",
    body: (
      <p>
        Messages you send through WhatsApp are handled by WhatsApp, and email by our email provider. Quote requests are passed to our
        inbox and stored by our website partner, MoCreative Concept, using Supabase and Resend. When we buy or ship for you,
        we pass on only what a supplier or carrier needs to fill the order, such as a delivery name and address. We do not sell
        your information.
      </p>
    ),
  },
  {
    title: "How long we keep it",
    body: (
      <p>
        Quote requests sent through the website are deleted after 12 months. We keep order messages and records for as long as we
        need them to deliver your order and keep proper business records.
      </p>
    ),
  },
  {
    title: "Your choices",
    body: (
      <p>
        You can ask us what we hold about you, ask us to correct it, or ask us to delete it, by emailing{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="Your information"
        lead="What this website collects, why, and how to reach us about it."
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
      />
      <section className="section">
        <div className="wrap max-w-[72ch]">
          <p className="mono-label text-muted">Last updated 8 November 2026</p>
          <div className="prose-nlp mt-8">
            {sections.map((s) => (
              <section key={s.title}>
                <h2>{s.title}</h2>
                {s.body}
              </section>
            ))}
            <p>
              Questions about anything on this page? <Link href="/contact">Contact us</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
