"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ArrowRight, Check } from "lucide-react";

import { services } from "@/lib/services";

// Stacking panels: each service pins, and shrinks a little as the next slides over it.
// Each panel carries an artifact of that service rather than a stock picture where we have none.

function PurchasingArt() {
  return (
    <div className="relative h-full min-h-[280px] rounded-[6px] overflow-hidden">
      <Image src="/photos/ship.webp" alt="A container ship at sea, loaded with shipping containers" fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
      <div className="absolute left-4 right-4 bottom-4 rounded-xl bg-ink/85 backdrop-blur border border-ink-line p-4 text-white">
        <div className="flex justify-between mono-label !text-[11px] text-muted-dark">
          <span>China → UK · Example</span>
          <span className="text-teal">Sea freight</span>
        </div>
        <div className="mt-3 h-0.5 bg-ink-line rounded relative">
          <span className="absolute inset-y-0 left-0 w-[48%] bg-teal rounded" />
        </div>
      </div>
    </div>
  );
}

function ShoppingArt() {
  return (
    <div className="h-full min-h-[280px] rounded-[6px] bg-paper border border-line grid place-items-center p-6">
      <div className="w-full max-w-[340px] rounded-xl bg-white border border-line shadow-[0_24px_48px_-28px_rgba(18,19,23,.35)] rotate-[-2deg] overflow-hidden">
        <div className="h-2 bg-gold" />
        <div className="p-5 font-mono text-[12.5px] text-text">
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
            {[3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 2, 1, 1, 2, 3, 1, 2, 1, 3, 1, 1, 2].map((w, i) => (
              <span key={i} className="bg-ink" style={{ width: w * 2 }} />
            ))}
          </div>
          <p className="mt-2 tracking-[0.2em] text-[11px] text-muted">NLP 0000 2041 UK</p>
        </div>
      </div>
    </div>
  );
}

function ConsumablesArt() {
  const items = ["Bin bags", "Microfibre cloths", "Disposable gloves", "Disposable napkins"];
  return (
    <div className="relative h-full min-h-[280px] rounded-[6px] overflow-hidden">
      <Image src="/photos/warehouse.webp" alt="A forklift moving a pallet of boxed goods in a warehouse" fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
      <div className="absolute inset-0 bg-ink/45" />
      <div className="absolute left-4 right-4 bottom-4 rounded-xl bg-white text-text overflow-hidden">
        <p className="mono-label !text-[11px] text-muted px-4 py-2.5 bg-paper border-b border-line flex justify-between">
          <span>Supply list</span>
          <span>In stock to order</span>
        </p>
        {items.map((it) => (
          <p key={it} className="flex items-center justify-between px-4 py-2 border-t first-of-type:border-t-0 border-line text-[14px]">
            {it}
            <Check size={15} className="text-teal-text" aria-hidden="true" />
          </p>
        ))}
      </div>
    </div>
  );
}

const art = [PurchasingArt, ShoppingArt, ConsumablesArt];
const tones = [
  { card: "bg-ink text-white border-ink-line", label: "text-teal", muted: "text-muted-dark", chip: "border-ink-line text-muted-dark", link: "text-teal" },
  { card: "bg-white text-text border-line", label: "text-teal-text", muted: "text-muted", chip: "border-line text-muted", link: "text-teal-text" },
  { card: "bg-ink-2 text-white border-ink-line", label: "text-teal", muted: "text-muted-dark", chip: "border-ink-line text-muted-dark", link: "text-teal" },
];

function Panel({ i, progress, total }: { i: number; progress: MotionValue<number>; total: number }) {
  const reduce = useReducedMotion();
  const s = services[i];
  const t = tones[i];
  const Art = art[i];
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, reduce ? 1 : 1 - (total - 1 - i) * 0.04]);

  return (
    <div className="lg:sticky lg:h-[calc(100svh-120px)] lg:max-h-[640px]" style={{ top: `${104 + i * 28}px` }}>
      <motion.article
        style={{ scale }}
        className={`origin-top h-full rounded-[8px] border ${t.card} p-6 md:p-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 shadow-[0_-24px_60px_-40px_rgba(18,19,23,.5)]`}
      >
        <div className="flex flex-col min-w-0">
          <p className={`mono-label ${t.label} flex justify-between`}>
            <span>Service {String(i + 1).padStart(2, "0")}</span>
            <span className={t.muted}>
              {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </p>
          <h3 className="mt-5 text-[clamp(30px,3.6vw,48px)]">{s.title}</h3>
          <p className={`mt-4 text-[18px] ${t.muted} max-w-[30em]`}>{s.short}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {s.includes.slice(0, 4).map((it) => (
              <li key={it} className={`text-[14px] rounded-full border px-3.5 py-1.5 ${t.chip}`}>
                {it}
              </li>
            ))}
          </ul>
          <Link
            href={`/services/${s.slug}`}
            className={`group mt-auto pt-8 inline-flex items-center gap-2 font-semibold ${t.link} min-h-11`}
          >
            See how it works
            <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            <span className="sr-only">: {s.title}</span>
          </Link>
        </div>
        <div className="min-w-0">
          <Art />
        </div>
      </motion.article>
    </div>
  );
}

export default function ServiceStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className="relative flex flex-col gap-6 lg:gap-[18vh] lg:pb-[6vh]">
      {services.map((s, i) => (
        <Panel key={s.slug} i={i} progress={scrollYProgress} total={services.length} />
      ))}
    </div>
  );
}
