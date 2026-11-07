import { PrimaryLink, WhatsAppLink } from "./Buttons";
import Reveal from "./Reveal";
import { WHATSAPP_LINK, MOTTO } from "@/lib/site";

// The closing ink panel used at the foot of most pages.
export default function CtaBand({
  title,
  em,
  text = "Tell us what you need. We reply on WhatsApp.",
}: {
  title?: string;
  em?: string;
  text?: string;
}) {
  return (
    <section className="section bg-ink text-white text-center relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-lines opacity-30 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,#000_10%,transparent_70%)]"
      />
      <Reveal className="relative wrap">
        <p className="mono-label text-teal inline-flex items-center gap-2.5">
          <span aria-hidden="true" className="w-2 h-2 rounded-[2px] bg-gold" />
          {MOTTO}
        </p>
        <h2 className="mt-6 text-[clamp(40px,5.6vw,72px)] max-w-[14em] mx-auto">
          {title ?? "Let us worry about the buying and deliveries."}{" "}
          <span className="text-teal">{em ?? (title ? "" : "You run your business.")}</span>
        </h2>
        <p className="mt-6 text-muted-dark text-[19px] max-w-[34em] mx-auto">{text}</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <PrimaryLink href="/quote">Request a quote</PrimaryLink>
          <WhatsAppLink href={WHATSAPP_LINK}>Chat on WhatsApp</WhatsAppLink>
        </div>
      </Reveal>
    </section>
  );
}
