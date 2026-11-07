"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  animate,
  useMotionValue,
} from "framer-motion";
import { useEffect } from "react";
import { Check, Ship } from "lucide-react";

import { PrimaryLink, WhatsAppLink } from "@/components/Buttons";
import { WHATSAPP_LINK } from "@/lib/site";
import { services } from "@/lib/services";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  { label: "Sourced and supplier checked", at: 0 },
  { label: "Bought at an agreed price", at: 0.3 },
  { label: "Shipping and importation", at: 0.55 },
  { label: "Delivered to you", at: 0.97 },
];

// Hero, scroll-scored: the sample order is in transit when the page opens,
// and reaches "Delivered" as the visitor scrolls the hero away.
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // load: 0 -> 0.62 (in transit); scroll: 0.62 -> 1 (delivered)
  const load = useMotionValue(reduce ? 0.62 : 0);
  useEffect(() => {
    if (reduce) return;
    const c = animate(load, 0.62, { duration: 1.8, delay: 0.6, ease });
    return () => c.stop();
  }, [load, reduce]);

  const progress = useTransform([load, scrollYProgress], ([l, s]: number[]) =>
    Math.min(1, (l as number) + Math.max(0, (s as number) - 0.05) * 0.95),
  );
  const fill = useTransform(progress, (p) => `${p * 100}%`);
  const [p, setP] = useState(reduce ? 0.62 : 0);
  useMotionValueEvent(progress, "change", (v) => setP(v));

  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0.15]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -2]);

  const status = p >= 0.97 ? "Delivered" : p >= 0.55 ? "In transit" : p >= 0.3 ? "Bought" : "Sourcing";

  return (
    <section ref={ref} className="relative bg-ink text-white overflow-hidden" aria-labelledby="hero-title">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,#000_20%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 right-[-10%] w-[720px] h-[720px] rounded-full bg-teal/10 blur-[140px]"
      />

      <div className="relative wrap grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-20 items-center pt-36 md:pt-44 pb-24 md:pb-36 min-h-[100svh]">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="min-w-0">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mono-label text-teal inline-flex items-center gap-2.5"
          >
            <span aria-hidden="true" className="w-2 h-2 rounded-[2px] bg-gold" />
            Buying from the UK, China, Europe, Turkey and Africa
          </motion.p>

          <h1 id="hero-title" className="mt-6 text-[clamp(44px,6vw,84px)] tracking-[-0.04em] leading-[0.98]">
            {["Your dedicated", "buying team,", "from supplier", "to"].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.09, ease }}
                >
                  {line}
                  {i === 3 && <span className="text-teal"> doorstep.</span>}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease }}
            className="mt-7 text-muted-dark text-[clamp(18px,1.6vw,20px)] max-w-[33em]"
          >
            We source, buy and ship for businesses and individuals, from anywhere in the world to anywhere. You save
            time and money and get on with running your business.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <PrimaryLink href="/quote">Request a quote</PrimaryLink>
            <WhatsAppLink href={WHATSAPP_LINK}>Chat on WhatsApp</WhatsAppLink>
          </motion.div>

          <motion.ul
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-10 flex flex-wrap gap-2"
            aria-label="Services"
          >
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="inline-flex items-center min-h-10 px-4 rounded-full border border-ink-line bg-ink-2/60 text-[14px] text-muted-dark hover:text-white hover:border-teal transition-colors"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* The live artifact: a sample order, tracked */}
        <motion.div
          style={{ y: cardY, rotate: cardRotate }}
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease }}
          className="min-w-0"
        >
          <div
            className="relative rounded-[22px] border border-ink-line bg-ink-2 p-6 md:p-7 shadow-[0_40px_80px_-40px_rgba(0,0,0,.85)]"
            role="group"
            aria-label="Sample order moving through Next Level Procurement"
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="mono-label text-muted-dark">Ref NLP-2041 · Sample order</p>
                <p className="mt-2 text-[21px] font-semibold tracking-tight leading-snug">Disposable gloves, 200 cartons</p>
              </div>
              <span
                className={`mono-label !text-[11.5px] rounded-full px-2.5 py-1.5 whitespace-nowrap transition-colors duration-500 ${
                  status === "Delivered" ? "bg-teal text-ink" : "bg-gold text-ink"
                }`}
                aria-live="polite"
              >
                {status}
              </span>
            </div>

            <div className="mt-7 grid grid-cols-[auto_1fr_auto] items-center gap-4 text-[14.5px]">
              <div>
                <small className="block mono-label !text-[11px] text-muted-dark">From</small>
                <b className="font-semibold">Supplier, China</b>
              </div>
              <div className="relative h-0.5 bg-ink-line rounded" aria-hidden="true">
                <motion.i style={{ width: fill }} className="absolute inset-y-0 left-0 bg-teal rounded" />
                <motion.b
                  style={{ left: fill }}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-teal text-ink grid place-items-center shadow-[0_0_0_6px_rgba(44,186,172,.15)]"
                >
                  <Ship size={16} />
                </motion.b>
              </div>
              <div className="text-right">
                <small className="block mono-label !text-[11px] text-muted-dark">To</small>
                <b className="font-semibold">Your business, Lagos</b>
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
                    className={`grid grid-cols-[28px_1fr_auto] gap-3 items-center py-3 border-t border-ink-line text-[15px] transition-colors duration-500 ${
                      done || now ? "text-white" : "text-muted-dark"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full grid place-items-center border-[1.5px] transition-all duration-500 ${
                        done
                          ? "bg-teal border-teal text-ink"
                          : now
                            ? "border-teal shadow-[0_0_0_4px_rgba(44,186,172,.18)]"
                            : "border-ink-line"
                      }`}
                      aria-hidden="true"
                    >
                      {done ? <Check size={14} strokeWidth={2.5} /> : now ? <span className="w-2 h-2 rounded-full bg-teal" /> : null}
                    </span>
                    <span>{s.label}</span>
                    <small className="font-mono text-[12px] text-muted-dark">{done ? "Done" : now ? "Now" : "Next"}</small>
                  </li>
                );
              })}
            </ol>
            <p className="mt-4 text-[12.5px] text-muted-dark">Illustrative example of how an order moves. Scroll to deliver it.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
