import type { Metadata } from "next";
import { Check } from "lucide-react";

import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import ProcessBeam from "@/components/home/ProcessBeam";
import FaqList from "@/components/FaqList";
import { PrimaryLink, WhatsAppLink, LineLink } from "@/components/Buttons";
import { WHATSAPP_LINK } from "@/lib/site";

export const metadata: Metadata = {
  title: "How It Works | Next Level Procurement",
  description:
    "Send us what you need, we find and check the supplier, buy at an agreed price, and coordinate shipping and delivery to you.",
  alternates: { canonical: "/how-it-works" },
};

// The quote form's own questions: what to have ready before you message.
const ready = [
  { k: "What you need", v: "The product, and a link or photo if you have one" },
  { k: "How many", v: "One item or a bulk order" },
  { k: "Buying from", v: "UK, China, Europe, Africa, or not sure" },
  { k: "Deliver to", v: "City and country" },
  { k: "Needed by", v: "A date, if you have one" },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="One message starts it. One team sees it through."
        lead="You tell us what you need. We find and check the supplier, buy at an agreed price, and coordinate shipping and delivery to you."
        crumbs={[{ label: "Home", href: "/" }, { label: "How it works" }]}
      >
        <PrimaryLink href="/quote">Start a request</PrimaryLink>
        <WhatsAppLink href={WHATSAPP_LINK}>Ask on WhatsApp</WhatsAppLink>
      </PageHeader>

      <ProcessBeam n={null} />

      <section className="section">
        <div className="wrap grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
          <Reveal className="lg:sticky lg:top-32">
            <p className="mono-label !text-[12px] text-teal-text">Before you message</p>
            <h2 className="mt-5 text-[clamp(30px,3.4vw,46px)]">Have these ready and your quote comes back faster.</h2>
            <p className="mt-5 text-muted text-[18px] max-w-[28em]">Not sure about some of them? Send what you have. We ask for the rest.</p>
            <div className="mt-8">
              <LineLink href="/quote">Open the quote form</LineLink>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[8px] border border-line bg-white overflow-hidden">
            <h3 className="mono-label !text-[12px] text-muted px-6 py-4 bg-paper border-b border-line flex justify-between font-normal tracking-[0.08em]">
              <span>Your request</span>
              <span>05 details</span>
            </h3>
            <dl>
              {ready.map((r) => (
                <div key={r.k} className="grid grid-cols-[150px_1fr_auto] gap-4 items-center px-6 py-5 border-t first:border-t-0 border-line">
                  <dt className="mono-label !text-[11px] text-muted">{r.k}</dt>
                  <dd className="text-[16.5px]">{r.v}</dd>
                  <Check size={17} className="text-teal-text" aria-hidden="true" />
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="wrap grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
          <Reveal className="lg:sticky lg:top-32">
            <p className="mono-label !text-[12px] text-teal-text">Questions</p>
            <h2 className="mt-5 text-[clamp(30px,3.4vw,46px)]">What people ask first.</h2>
            <div className="mt-8">
              <LineLink href="/faq">All questions</LineLink>
            </div>
          </Reveal>
          <FaqList limit={4} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
