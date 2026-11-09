"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { MessageCircle, Search, Ship, PackageCheck, Check } from "lucide-react";
import Reveal from "@/components/Reveal";

// Timeline with a beam that fills as you scroll. Each step carries a small,
// honest artifact of what happens at that point (examples, labelled as such).
const steps = [
  {
    n: "01",
    title: "Tell us what you need",
    text: "Send us a message on WhatsApp or fill in the quote form: what you need, how many and where it should go.",
    icon: MessageCircle,
    artifact: (
      <div className="rounded-2xl bg-[#e7f6ee] border border-[#cfe9db] p-4 max-w-[340px] text-[14.5px] text-[#1f3a2c] shadow-sm">
        <p>Hello Next Level Procurement, I&apos;d like a quote.</p>
        <p className="mt-1">What I need: disposable gloves</p>
        <p>How many: 200 cartons</p>
        <p>Deliver to: Lagos</p>
        <p className="mt-2 text-right font-mono text-[11px] text-[#4b6b5a]">Example message</p>
      </div>
    ),
  },
  {
    n: "02",
    title: "We source and buy",
    text: "We find the right product from trusted suppliers at a competitive price, check the quality and buy it for you.",
    icon: Search,
    artifact: (
      <div className="rounded-2xl bg-white border border-line overflow-hidden max-w-[380px] text-[14.5px]">
        {[
          ["Supplier checked", "Done"],
          ["Price agreed", "Done"],
          ["Quality inspected", "Done"],
        ].map(([a, b]) => (
          <div key={a} className="flex justify-between items-center px-4 py-3 border-t first:border-t-0 border-line">
            <span>{a}</span>
            <span className="inline-flex items-center gap-1.5 text-teal-text font-semibold">
              <Check size={15} aria-hidden="true" /> {b}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    n: "03",
    title: "We ship it",
    text: "We coordinate the shipping and importation, by road, sea or air, and keep you updated along the way.",
    icon: Ship,
    artifact: (
      <div className="rounded-2xl bg-ink text-white p-4 max-w-[380px]">
        <div className="flex justify-between mono-label !text-[11px] text-muted-dark">
          <span>China → Lagos</span>
          <span className="text-gold">In transit</span>
        </div>
        <div className="mt-4 h-0.5 bg-ink-line rounded relative">
          <span className="absolute inset-y-0 left-0 w-[64%] bg-teal rounded" />
          <span className="absolute left-[64%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-teal shadow-[0_0_0_5px_rgba(44,186,172,.18)]" />
        </div>
        <p className="mt-4 text-[13px] text-muted-dark">Example update</p>
      </div>
    ),
  },
  {
    n: "04",
    title: "It reaches you",
    text: "Delivery support until your order arrives, whether it is one item for you or stock for your business.",
    icon: PackageCheck,
    artifact: (
      <div className="inline-flex items-center gap-3 rounded-full border-2 border-teal-text text-teal-text px-5 py-2.5 -rotate-3 font-mono uppercase tracking-[0.12em] text-[13px] font-medium">
        <PackageCheck size={18} aria-hidden="true" /> Delivered
      </div>
    ),
  },
];

export default function ProcessBeam({ n = "06" }: { n?: string | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 65%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section className="section bg-white" id="how" data-chapter="How it works" aria-labelledby="how-title">
      <div className="wrap">
        <Reveal className="max-w-[760px]">
          <p className="mono-label !text-[12px] text-muted flex items-center gap-4">{n && <span className="text-teal-text">{n}</span>} How it works</p>
          <h2 id="how-title" className="mt-6 text-[clamp(36px,4.6vw,64px)]">Four steps. One team owns all of them.</h2>
          <p className="mt-5 text-muted text-[17px] sm:text-[19px] max-w-[36em]">
            From your first message to the day it arrives, you know where your order is and who is looking after it.
          </p>
        </Reveal>

        <div ref={ref} className="relative mt-12 sm:mt-20">
          {/* the beam */}
          <div aria-hidden="true" className="absolute left-[27px] md:left-[calc(30%+27px)] top-2 bottom-2 w-0.5 bg-line">
            <motion.div
              style={{ scaleY: reduce ? 1 : scaleY }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-teal via-teal-text to-gold"
            />
          </div>

          <ol className="space-y-16 md:space-y-32">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.n} className="relative grid md:grid-cols-[30%_1fr] gap-4 md:gap-0">
                  <div className="md:sticky md:top-32 self-start md:pr-10 pl-[76px] md:pl-0 min-h-14 flex flex-col justify-center md:block">
                    <p className="mono-label text-muted">Step {s.n}</p>
                    <h3 className="mt-2 text-[clamp(26px,2.6vw,34px)]">{s.title}</h3>
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute left-0 md:left-[30%] top-0 w-14 h-14 rounded-2xl bg-ink text-teal grid place-items-center z-10"
                  >
                    <Icon size={24} />
                  </span>
                  <Reveal className="pl-[76px] md:pl-28">
                    <p className="text-[17px] sm:text-[19px] text-muted max-w-[30em]">{s.text}</p>
                    <div className="mt-5 sm:mt-7">{s.artifact}</div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
