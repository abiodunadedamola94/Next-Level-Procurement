import { X, Check } from "lucide-react";
import Reveal from "@/components/Reveal";

// Two cards side by side: what buying alone looks like, and what changes with a buying team.
// The four challenges are hers (About text): suppliers, cost, quality, delivery.
const rows = [
  { topic: "Suppliers", alone: "Unknown sellers found online", with: "Trusted suppliers in the UK, China, Europe and Africa" },
  { topic: "Cost", alone: "Paying the first price you are quoted", with: "Quality products at competitive prices, negotiated for you" },
  { topic: "Quality", alone: "Hoping the goods match the photos", with: "Quality inspection before your order ships" },
  { topic: "Delivery", alone: "Arranging shipping yourself and chasing updates", with: "Order tracking, shipping coordination and delivery support" },
];

export default function ProblemPair() {
  return (
    <section id="why" data-chapter="Why us" className="section" aria-labelledby="why-title">
      <div className="wrap">
        <Reveal className="grid lg:grid-cols-[1fr_1fr] gap-6 lg:gap-20 items-end mb-10 lg:mb-20">
          <div>
            <p className="mono-label !text-[12px] text-muted flex items-center gap-4">
              <span className="text-teal-text">02</span> Why a buying team
            </p>
            <h2 id="why-title" className="mt-6 text-[clamp(36px,4.6vw,64px)]">
              Buying abroad is four problems at once.
            </h2>
          </div>
          <p className="text-muted text-[17px] sm:text-[19px] max-w-[30em] lg:pb-2">
            Finding trustworthy suppliers, managing costs, maintaining product quality and ensuring timely delivery. We
            take all four off your desk.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-4">
          <Reveal className="rounded-[8px] border border-line bg-white p-6 md:p-10">
            <p className="mono-label !text-[12px] text-muted">Buying it yourself</p>
            <ul className="mt-4 sm:mt-6">
              {rows.map((r) => (
                <li key={r.topic} className="grid grid-cols-[1fr_auto] sm:grid-cols-[92px_1fr_auto] gap-x-4 gap-y-1 items-start py-4 sm:py-5 border-t border-line">
                  <span className="col-span-2 sm:col-span-1 mono-label !text-[11px] text-muted sm:pt-1">{r.topic}</span>
                  <span className="text-[16px] sm:text-[17px] text-muted">{r.alone}</span>
                  <X size={18} aria-hidden="true" className="text-[#b42318] mt-1" />
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.12} className="relative rounded-[8px] bg-ink text-white p-6 md:p-10 overflow-hidden">
            <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-25 [mask-image:radial-gradient(70%_60%_at_100%_0%,#000,transparent_75%)]" />
            <p className="relative mono-label !text-[12px] text-teal">With Next Level Procurement</p>
            <ul className="relative mt-6">
              {rows.map((r) => (
                <li key={r.topic} className="grid grid-cols-[1fr_auto] sm:grid-cols-[92px_1fr_auto] gap-x-4 gap-y-1 items-start py-4 sm:py-5 border-t border-ink-line">
                  <span className="col-span-2 sm:col-span-1 mono-label !text-[11px] text-muted-dark sm:pt-1">{r.topic}</span>
                  <span className="text-[16px] sm:text-[17px]">{r.with}</span>
                  <Check size={18} aria-hidden="true" className="text-teal mt-1" />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
