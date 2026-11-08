import type { Metadata } from "next";

import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import FaqList from "@/components/FaqList";
import { PrimaryLink, WhatsAppLink } from "@/components/Buttons";
import { faqs } from "@/lib/faq";
import { WHATSAPP_LINK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Questions | Next Level Procurement",
  description: "How to get a quote, where we buy from and deliver to, small orders, quality inspection and the StarterKit.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <PageHeader
        eyebrow="Questions"
        title="Questions, answered plainly."
        lead="Anything not here, ask us on WhatsApp. Prices depend on the order, so they come in your quote."
        crumbs={[{ label: "Home", href: "/" }, { label: "How it works", href: "/how-it-works" }, { label: "Questions" }]}
      >
        <PrimaryLink href="/quote">Request a quote</PrimaryLink>
        <WhatsAppLink href={WHATSAPP_LINK}>Ask on WhatsApp</WhatsAppLink>
      </PageHeader>
      <section className="section">
        <div className="wrap max-w-[960px]">
          <FaqList />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
