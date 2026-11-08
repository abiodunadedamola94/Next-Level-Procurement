"use client";

import { motion, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useState } from "react";
import { Check, Ship } from "lucide-react";

const steps = [
  { label: "Sourced and supplier checked", at: 0 },
  { label: "Bought at an agreed price", at: 0.3 },
  { label: "Shipping and importation", at: 0.55 },
  { label: "Delivered to you", at: 0.97 },
];

// A sample order, tracked. `progress` (0..1) is scored by the page: it loads to "in transit"
// and reaches "Delivered" as the visitor scrolls. Labelled as illustrative.
export default function OrderCard({ progress, initial = 0.62 }: { progress: MotionValue<number>; initial?: number }) {
  const fill = useTransform(progress, (p) => `${p * 100}%`);
  const [p, setP] = useState(initial);
  useMotionValueEvent(progress, "change", (v) => setP(v));
  const status = p >= 0.97 ? "Delivered" : p >= 0.55 ? "In transit" : p >= 0.3 ? "Bought" : "Sourcing";

  return (
    <div
      className="relative rounded-[8px] border border-white/12 bg-ink/70 backdrop-blur-xl p-6 md:p-7 shadow-[0_40px_80px_-30px_rgba(0,0,0,.9)]"
      role="group"
      aria-label="Sample order moving through Next Level Procurement"
    >
      <div className="flex justify-between items-start gap-4">
        <div>
          <p className="mono-label !text-[11.5px] text-muted-dark">Ref NLP-2041 · Sample order</p>
          <p className="mt-2 text-[20px] font-medium tracking-tight leading-snug">Disposable gloves, 200 cartons</p>
        </div>
        <span
          className={`mono-label !text-[11px] rounded-[3px] px-2 py-1.5 whitespace-nowrap transition-colors duration-500 ${
            status === "Delivered" ? "bg-teal text-ink" : "bg-gold text-ink"
          }`}
          aria-live="polite"
        >
          {status}
        </span>
      </div>

      <div className="mt-7 grid grid-cols-[auto_1fr_auto] items-center gap-4 text-[14.5px]">
        <div>
          <small className="block mono-label !text-[10.5px] text-muted-dark">From</small>
          <b className="font-medium">Supplier, China</b>
        </div>
        <div className="relative h-px bg-white/15" aria-hidden="true">
          <motion.i style={{ width: fill }} className="absolute inset-y-0 left-0 bg-teal" />
          <motion.b
            style={{ left: fill }}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-teal text-ink grid place-items-center shadow-[0_0_0_6px_rgba(44,186,172,.15)]"
          >
            <Ship size={15} />
          </motion.b>
        </div>
        <div className="text-right">
          <small className="block mono-label !text-[10.5px] text-muted-dark">To</small>
          <b className="font-medium">Your business, Lagos</b>
        </div>
      </div>

      <ol className="mt-7">
        {steps.map((s, si) => {
          const doneAt = si < steps.length - 1 ? steps[si + 1].at : 0.97;
          const done = p >= doneAt;
          const now = !done && p >= s.at;
          return (
            <li
              key={s.label}
              className={`grid grid-cols-[28px_1fr_auto] gap-3 items-center py-3 border-t border-white/10 text-[15px] transition-colors duration-500 ${
                done || now ? "text-white" : "text-muted-dark"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full grid place-items-center border-[1.5px] transition-all duration-500 ${
                  done ? "bg-teal border-teal text-ink" : now ? "border-teal shadow-[0_0_0_4px_rgba(44,186,172,.18)]" : "border-white/20"
                }`}
                aria-hidden="true"
              >
                {done ? <Check size={14} strokeWidth={2.5} /> : now ? <span className="w-2 h-2 rounded-full bg-teal" /> : null}
              </span>
              <span>{s.label}</span>
              <small className="font-mono text-[11.5px] text-muted-dark">{done ? "Done" : now ? "Now" : "Next"}</small>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-[12.5px] text-muted-dark">Illustrative example of how an order moves. Scroll to deliver it.</p>
    </div>
  );
}
