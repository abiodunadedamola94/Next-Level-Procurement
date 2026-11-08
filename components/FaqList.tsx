"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/faq";

// Accordion of questions. Each answer is a real region tied to its button.
export default function FaqList({ limit, dark = false }: { limit?: number; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  const list = limit ? faqs.slice(0, limit) : faqs;
  const line = dark ? "border-ink-line" : "border-line";
  return (
    <ul className={`border-t ${line}`}>
      {list.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q} className={`border-b ${line}`}>
            <h3 className="font-normal">
              <button
                type="button"
                id={`faq-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full grid grid-cols-[40px_1fr_auto] gap-3 items-center py-6 text-left text-[clamp(18px,1.6vw,21px)] tracking-tight"
              >
                <span className={`mono-label !text-[11px] ${dark ? "text-muted-dark" : "text-muted"}`}>{String(i + 1).padStart(2, "0")}</span>
                {f.q}
                <span
                  aria-hidden="true"
                  className={`grid place-items-center w-8 h-8 rounded-full border transition-all duration-300 ${
                    isOpen ? "rotate-45 bg-teal border-teal text-ink" : dark ? "border-ink-line" : "border-line"
                  }`}
                >
                  <Plus size={15} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className={`pl-[52px] pr-12 pb-7 text-[17px] max-w-[46em] ${dark ? "text-muted-dark" : "text-muted"}`}>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
