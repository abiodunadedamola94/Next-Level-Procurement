"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

import Cinematic from "@/components/Cinematic";
import { LineLink } from "@/components/Buttons";
import { services } from "@/lib/services";

const ease = [0.22, 1, 0.36, 1] as const;

function Label({ children }: { children: React.ReactNode }) {
  return <span className="mono-label !text-[10.5px] rounded-[3px] bg-white text-text px-2 py-1">{children}</span>;
}

// What each service looks like in motion. Examples are marked as examples.
function Media({ i }: { i: number }) {
  if (i === 0)
    return (
      <>
        <Cinematic src="/photos/containers.webp" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        <div className="absolute left-5 right-5 bottom-5 md:left-8 md:right-auto md:bottom-8 md:w-[320px] rounded-[6px] bg-white text-text overflow-hidden shadow-[0_30px_60px_-30px_rgba(0,0,0,.8)]">
          <p className="mono-label !text-[10.5px] text-muted px-4 py-2.5 bg-paper border-b border-line flex justify-between">
            <span>Supplier check</span>
            <span>Example</span>
          </p>
          {["Supplier found and vetted", "Price negotiated", "Quality inspected", "Shipping booked"].map((t) => (
            <p key={t} className="flex items-center justify-between px-4 py-2.5 border-t first-of-type:border-t-0 border-line text-[14px]">
              {t}
              <Check size={15} className="text-teal-text" aria-hidden="true" />
            </p>
          ))}
        </div>
        <div className="absolute top-5 left-5 md:top-8 md:left-8 flex gap-2">
          <Label>China → UK</Label>
          <Label>China → Lagos</Label>
        </div>
      </>
    );
  if (i === 1)
    return (
      <>
        <Cinematic src="/photos/ship.webp" position="30% 50%" />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 grid place-items-center p-6">
          <div className="w-full max-w-[340px] rounded-[6px] bg-white text-text shadow-[0_40px_80px_-30px_rgba(0,0,0,.85)] rotate-[-3deg] overflow-hidden">
            <div className="h-1.5 bg-gold" />
            <div className="p-5 font-mono text-[12.5px]">
              <div className="flex justify-between text-muted uppercase tracking-[0.08em] text-[11px]">
                <span>Parcel label</span>
                <span>Example</span>
              </div>
              <div className="mt-4 grid grid-cols-[52px_1fr] gap-y-2 gap-x-3">
                <span className="text-muted">FROM</span>
                <span>UK store, London</span>
                <span className="text-muted">TO</span>
                <span>You, abroad</span>
                <span className="text-muted">ITEMS</span>
                <span>1 or many, your choice</span>
              </div>
              <div className="mt-5 flex gap-[3px] h-10 items-stretch" aria-hidden="true">
                {[3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 2, 1, 1, 2, 3, 1, 2, 1, 3, 1, 1, 2].map((w, k) => (
                  <span key={k} className="bg-ink" style={{ width: w * 2 }} />
                ))}
              </div>
              <p className="mt-2 tracking-[0.2em] text-[11px] text-muted">NLP 0000 2041 UK</p>
            </div>
          </div>
        </div>
      </>
    );
  return (
    <>
      <Cinematic src="/photos/warehouse.webp" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
      <div className="absolute left-5 right-5 bottom-5 md:left-8 md:right-auto md:bottom-8 md:w-[320px] rounded-[6px] bg-white text-text overflow-hidden">
        <p className="mono-label !text-[10.5px] text-muted px-4 py-2.5 bg-paper border-b border-line flex justify-between">
          <span>Supply list</span>
          <span>Example</span>
        </p>
        {["Bin bags", "Microfibre cloths", "Disposable gloves", "Disposable napkins"].map((t) => (
          <p key={t} className="flex items-center justify-between px-4 py-2.5 border-t first-of-type:border-t-0 border-line text-[14px]">
            {t}
            <Check size={15} className="text-teal-text" aria-hidden="true" />
          </p>
        ))}
      </div>
    </>
  );
}

function Block({ i, onActive }: { i: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);
  const s = services[i];
  return (
    <div ref={ref} className="lg:min-h-[78vh] flex flex-col justify-center py-10 lg:py-0 border-t border-line first:border-t-0 lg:border-t-0">
      <div className="lg:hidden relative aspect-[4/3] rounded-[8px] overflow-hidden mb-8 bg-ink">
        <Media i={i} />
      </div>
      <p className="mono-label !text-[12px] text-muted">
        <span className="text-teal-text">0{i + 1}</span> / 03
      </p>
      <h3 className="mt-4 text-[clamp(30px,3.2vw,44px)] font-normal tracking-[-0.035em] leading-[1.05]">{s.title}</h3>
      <p className="mt-5 text-[18px] text-muted max-w-[30em]">{s.intro[0]}</p>
      <ul className="mt-7 border-t border-line">
        {s.includes.slice(0, 4).map((it) => (
          <li key={it} className="flex items-start gap-3 py-3 border-b border-line text-[16px]">
            <Check size={17} aria-hidden="true" className="text-teal-text mt-1 shrink-0" />
            {it}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap items-center gap-6">
        <Link href={`/services/${s.slug}`} className="btn bg-ink text-white hover:bg-ink-3 group">
          {s.ctaLabel}
          <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-[3px]" />
        </Link>
        <LineLink href={`/services/${s.slug}`}>Read more</LineLink>
      </div>
    </div>
  );
}

// Split screen: the words scroll on the left while the scene on the right changes with them.
export default function ServiceSplit() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  return (
    <section id="services" data-chapter="Services" className="section bg-white" aria-labelledby="services-title">
      <div className="wrap">
        <div className="max-w-[760px] mb-8 lg:mb-14">
          <p className="mono-label !text-[12px] text-muted flex items-center gap-4">
            <span className="text-teal-text">03</span> Services
          </p>
          <h2 id="services-title" className="mt-6 text-[clamp(36px,4.6vw,64px)]">Three ways we buy for you.</h2>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-20">
          <div>
            {services.map((s, i) => (
              <Block key={s.slug} i={i} onActive={setActive} />
            ))}
          </div>
          <div className="hidden lg:block">
            <div className="sticky top-[12vh] h-[76vh] rounded-[8px] overflow-hidden bg-ink">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04, clipPath: "inset(12% 0% 0% 0%)" }}
                  animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease }}
                  className="absolute inset-0"
                >
                  <Media i={active} />
                </motion.div>
              </AnimatePresence>
              <div className="absolute top-6 right-6 flex gap-1.5" aria-hidden="true">
                {services.map((s, i) => (
                  <span key={s.slug} className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-teal" : "w-3 bg-white/40"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
