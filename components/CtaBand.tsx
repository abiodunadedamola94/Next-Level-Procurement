import { PrimaryLink, WhatsAppLink } from "./Buttons";
import { WHATSAPP_LINK, MOTTO } from "@/lib/site";

export default function CtaBand({
  title = "Ready to buy smarter?",
  text = "Tell us what you need. We reply on WhatsApp.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="section-padding bg-navy-dark border-t border-border">
      <div className="container mx-auto max-w-3xl text-center">
        <p className="text-teal font-semibold text-xs uppercase tracking-[0.2em] mb-4">{MOTTO}</p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">{title}</h2>
        <p className="text-muted-foreground mb-8">{text}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PrimaryLink href="/quote">Request a quote</PrimaryLink>
          <WhatsAppLink href={WHATSAPP_LINK}>Chat on WhatsApp</WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
