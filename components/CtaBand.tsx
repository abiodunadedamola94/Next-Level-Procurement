import { MessageCircle } from "lucide-react";
import Reveal from "./Reveal";
import Cinematic from "./Cinematic";
import QuoteStarter from "./QuoteStarter";
import { WHATSAPP_LINK, MOTTO } from "@/lib/site";

// The closing split: the ask on the left, a cinematic scene on the right.
// Starts the quote in place, so the next page already knows what is needed.
export default function CtaBand({
  title,
  em,
  text = "Tell us what you need. We reply on WhatsApp with a quote.",
  photo = "/photos/containers.webp",
}: {
  title?: string;
  em?: string;
  text?: string;
  photo?: string;
}) {
  return (
    <section className="bg-ink text-white relative overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[640px]">
        <div className="relative flex items-center">
          <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-25 [mask-image:radial-gradient(70%_70%_at_0%_100%,#000,transparent_75%)]" />
          <Reveal className="relative w-full px-5 sm:px-10 lg:pl-[max(20px,calc((100vw-1200px)/2))] lg:pr-16 py-24">
            <p className="mono-label !text-[12px] text-teal inline-flex items-center gap-2.5">
              <span aria-hidden="true" className="w-2 h-2 rounded-[2px] bg-gold" />
              {MOTTO}
            </p>
            <h2 className="mt-6 text-[clamp(38px,4.6vw,64px)] max-w-[12em]">
              {title ?? "Let us worry about the buying and deliveries."}{" "}
              <span className="text-teal">{em ?? (title ? "" : "You run your business.")}</span>
            </h2>
            <p className="mt-6 text-muted-dark text-[19px] max-w-[30em]">{text}</p>
            <div className="mt-10">
              <QuoteStarter id="cta-starter" />
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-[15px] text-teal hover:text-teal-hover hover:underline underline-offset-4 py-1"
              >
                <MessageCircle size={16} aria-hidden="true" /> Or chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
        <div className="relative min-h-[340px] lg:min-h-0">
          <Cinematic src={photo} />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink via-ink/20 to-transparent lg:from-ink/90" />
          <div aria-hidden="true" className="absolute bottom-6 right-6 left-6 lg:left-auto flex flex-wrap justify-end gap-2">
            {["Sourced", "Bought", "Shipped", "Delivered"].map((s, i) => (
              <span key={s} className={`mono-label !text-[10.5px] rounded-[3px] px-2 py-1 ${i === 3 ? "bg-teal text-ink" : "bg-ink/80 text-white border border-white/15"}`}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
