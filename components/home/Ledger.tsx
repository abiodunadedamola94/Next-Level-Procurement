"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, BadgePercent, ScanSearch, Route } from "lucide-react";
import Reveal from "@/components/Reveal";

// The challenges are hers, from her About text (6 Nov 2026):
// trustworthy suppliers, costs, product quality, timely delivery.
const rows = [
  {
    topic: "Suppliers",
    alone: "Unknown sellers found online",
    with: "Trusted suppliers in the UK, China, Europe, Turkey and Africa",
    icon: ShieldCheck,
  },
  {
    topic: "Cost",
    alone: "Paying the first price you are quoted",
    with: "Quality products at competitive prices, negotiated for you",
    icon: BadgePercent,
  },
  {
    topic: "Quality",
    alone: "Hoping the goods match the photos",
    with: "Quality inspection before your order ships",
    icon: ScanSearch,
  },
  {
    topic: "Delivery",
    alone: "Arranging shipping yourself and chasing updates",
    with: "Order tracking, shipping coordination and delivery support",
    icon: Route,
  },
];

export default function Ledger() {
  const reduce = useReducedMotion();
  return (
    <section className="section" aria-labelledby="problem-title">
      <div className="wrap">
        <Reveal className="max-w-[760px]">
          <p className="mono-label text-teal-text">The problem</p>
          <h2 id="problem-title" className="mt-5 text-[clamp(36px,4.6vw,60px)]">
            Buying across borders shouldn&apos;t feel like a gamble.
          </h2>
          <p className="mt-5 text-muted text-[19px] max-w-[36em]">
            Finding trustworthy suppliers, managing costs, keeping quality and getting it delivered on time. We act as
            your dedicated buying team, so you don&apos;t have to do it alone.
          </p>
        </Reveal>

        <div className="mt-16 rounded-[22px] border border-line bg-white overflow-hidden" role="table" aria-label="Doing it alone compared with Next Level">
          <div role="row" className="hidden md:grid grid-cols-[180px_1fr_1fr] bg-paper border-b border-line">
            <span role="columnheader" className="mono-label !text-[12px] text-muted px-6 py-4">What it involves</span>
            <span role="columnheader" className="mono-label !text-[12px] text-muted px-6 py-4">Doing it alone</span>
            <span role="columnheader" className="mono-label !text-[12px] text-teal-text px-6 py-4">With Next Level</span>
          </div>
          {rows.map((r, i) => {
            const Icon = r.icon;
            return (
              <div role="row" key={r.topic} className="grid md:grid-cols-[180px_1fr_1fr] border-t first:border-t-0 md:first-of-type:border-t-0 border-line">
                <span role="cell" className="px-6 pt-5 md:py-6 font-semibold text-[15px] flex items-center gap-3">
                  <span className="mono-label !text-[11px] text-muted">0{i + 1}</span>
                  {r.topic}
                </span>
                <span role="cell" className="px-6 py-3 md:py-6 text-muted flex gap-3 items-start">
                  <span aria-hidden="true" className="shrink-0 w-3.5 h-0.5 bg-[#b8bfc9] mt-3" />
                  {r.alone}
                </span>
                <span role="cell" className="relative px-6 pb-5 pt-3 md:py-6 flex gap-3 items-start">
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 bg-teal-soft origin-left"
                    initial={reduce ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                    transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <Icon size={18} className="relative text-teal-text shrink-0 mt-1" aria-hidden="true" />
                  <span className="relative">{r.with}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
