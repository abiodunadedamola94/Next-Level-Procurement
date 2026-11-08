import type { Metadata } from "next";
import { Suspense } from "react";
import { MessageCircle, Phone, Mail } from "lucide-react";

import PageHeader from "@/components/PageHeader";
import QuoteForm from "@/components/QuoteForm";
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, WHATSAPP_LINK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Quote | Next Level Procurement",
  description:
    "Tell us what you need, how many and where it should go. Your request opens on WhatsApp, ready to send.",
  alternates: { canonical: "/quote" },
};

const next = [
  "You send the message on WhatsApp.",
  "We ask anything we need to know.",
  "We send you a quote.",
];

export default function QuotePage() {
  return (
    <>
      <PageHeader
        eyebrow="Request a quote"
        title="Tell us what you need"
        lead="Three short groups of questions. Your answers open in WhatsApp, ready to send to us."
        crumbs={[{ label: "Home", href: "/" }, { label: "Request a quote" }]}
      />
      <section className="py-[clamp(48px,6vw,96px)]">
        <div className="wrap grid lg:grid-cols-[1.55fr_1fr] gap-8 lg:gap-12 items-start">
          <Suspense fallback={<div className="min-h-[600px] rounded-[8px] bg-white border border-line" />}>
            <QuoteForm />
          </Suspense>
          <aside className="space-y-4 lg:sticky lg:top-28">
            <div className="rounded-[8px] bg-ink text-white p-7">
              <h2 className="mono-label text-teal">What happens next</h2>
              <ol className="mt-5">
                {next.map((n, i) => (
                  <li key={n} className="grid grid-cols-[36px_1fr] gap-3 py-3.5 border-t first:border-t-0 border-ink-line">
                    <span className="mono-label !text-[11px] text-muted-dark pt-1">0{i + 1}</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-[8px] bg-white border border-line p-7">
              <h2 className="mono-label text-muted">Other ways to reach us</h2>
              <ul className="mt-4 text-[15.5px]">
                <li>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 font-semibold text-teal-text hover:text-text">
                    <MessageCircle size={18} aria-hidden="true" /> WhatsApp {PHONE_DISPLAY}
                  </a>
                </li>
                <li className="border-t border-line">
                  <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-3 py-3 hover:text-teal-text">
                    <Phone size={18} aria-hidden="true" /> Call {PHONE_DISPLAY}
                  </a>
                </li>
                <li className="border-t border-line">
                  <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 py-3 hover:text-teal-text break-all">
                    <Mail size={18} aria-hidden="true" className="shrink-0" /> {EMAIL}
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
