import type { Metadata } from "next";

import PageHeader from "@/components/PageHeader";
import QuoteForm from "@/components/QuoteForm";
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, WHATSAPP_LINK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Quote | Next Level Procurement",
  description:
    "Tell us what you need, how many and where it should go. Your request opens on WhatsApp, ready to send.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <>
      <PageHeader
        eyebrow="Request a quote"
        title="Tell us what you need"
        lead="A few short questions. Your answers open in WhatsApp, ready to send to us."
        crumbs={[{ label: "Home", href: "/" }, { label: "Request a quote" }]}
      />
      <section className="section-padding pt-12! md:pt-16!">
        <div className="container mx-auto max-w-5xl grid lg:grid-cols-[1.5fr_1fr] gap-10">
          <QuoteForm />
          <aside className="space-y-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h2 className="font-heading font-semibold text-foreground mb-3">What happens next</h2>
              <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                <li>You send the message on WhatsApp.</li>
                <li>We ask anything we need to know.</li>
                <li>We send you a quote.</li>
              </ol>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card text-sm space-y-2">
              <h2 className="font-heading font-semibold text-foreground mb-3">Other ways to reach us</h2>
              <p><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-teal hover:text-teal-light">WhatsApp {PHONE_DISPLAY}</a></p>
              <p><a href={`tel:${PHONE_TEL}`} className="text-muted-foreground hover:text-teal">Call {PHONE_DISPLAY}</a></p>
              <p><a href={`mailto:${EMAIL}`} className="text-muted-foreground hover:text-teal break-all">{EMAIL}</a></p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
