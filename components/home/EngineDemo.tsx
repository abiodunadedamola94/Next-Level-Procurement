"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Check,
  ClipboardCheck,
  MapPin,
  MessageCircle,
  Package,
  Plane,
  Search,
  Ship,
  Truck,
  X,
} from "lucide-react";

import { WHATSAPP_LINK } from "@/lib/site";

// A quick, clickable picture of how working with Next Level Procurement goes, drawn like a
// logistics dashboard. Sample data only, labelled as such on screen: there is no account to sign
// in to. Pattern borrowed from Flexport's hero demo (a product window below the headline);
// nothing of theirs is copied. Money and delivery times are never shown, because none are promised.

type View = "track" | "quote" | "sourcing" | "shipments" | "inventory";
const ease = [0.22, 1, 0.36, 1] as const;

const tabs: { view: View; label: string }[] = [
  { view: "track", label: "Overview" },
  { view: "quote", label: "Orders" },
  { view: "sourcing", label: "Sourcing" },
  { view: "shipments", label: "Shipments" },
  { view: "inventory", label: "Inventory" },
];

const groups: { title: string; count: string; dot: string; note: string; links: { view: View; label: string; Icon: typeof Ship }[] }[] = [
  { title: "Orders", count: "12", dot: "bg-gold", note: "2 quotes wait for your yes", links: [
    { view: "track", label: "Track an order", Icon: MapPin },
    { view: "quote", label: "Approve a quote", Icon: ClipboardCheck },
  ] },
  { title: "Sourcing", count: "5", dot: "bg-teal", note: "3 supplier prices in", links: [{ view: "sourcing", label: "Sourcing requests", Icon: Search }] },
  { title: "Shipments", count: "4", dot: "bg-[#d64545]", note: "1 held at customs", links: [{ view: "shipments", label: "Shipments by stage", Icon: BarChart3 }] },
  { title: "Inventory", count: "38", dot: "bg-[#d64545]", note: "2 items running low", links: [{ view: "inventory", label: "Stock levels", Icon: Boxes }] },
];

const tour: { view: View; text: string }[] = [
  { view: "track", text: "Follow one order from the supplier to your door, stage by stage." },
  { view: "quote", text: "We check suppliers first. You choose, and only then do we buy." },
  { view: "sourcing", text: "Every request you send, and where each one stands." },
  { view: "shipments", text: "Sea, air and road shipments, grouped by where they are now." },
  { view: "inventory", text: "Running low? Reorder opens a quote with the item filled in." },
];

/* ---------- views ---------- */

function TrackView() {
  const reduce = useReducedMotion();
  const steps = ["Sourced and supplier checked", "Bought at an agreed price", "Shipping and importation", "Delivered to you"];
  const now = 2;
  return (
    <div>
      <p className="mono-label !text-[11px] text-muted">Ref NLP-2041 · Sample order</p>
      <h3 className="mt-2 text-[22px] font-medium tracking-tight">Disposable gloves, 200 cartons</h3>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-5">
        <div>
          <p className="mono-label !text-[10.5px] text-muted">From</p>
          <p className="text-[15px]">Supplier, China</p>
        </div>
        <div className="relative h-px bg-line col-span-2 order-last sm:order-none sm:col-span-1" aria-hidden="true">
          <motion.div
            className="absolute inset-y-0 left-0 bg-teal-text"
            initial={{ width: reduce ? "62%" : "0%" }}
            animate={{ width: "62%" }}
            transition={{ duration: 1.6, ease }}
          />
          <motion.span
            className="absolute -top-[11px] grid place-items-center w-6 h-6 rounded-full bg-teal-text text-white"
            initial={{ left: reduce ? "calc(62% - 12px)" : "-12px" }}
            animate={{ left: "calc(62% - 12px)" }}
            transition={{ duration: 1.6, ease }}
          >
            <Ship size={13} />
          </motion.span>
        </div>
        <div className="text-right">
          <p className="mono-label !text-[10.5px] text-muted">To</p>
          <p className="text-[15px]">Your business, Lagos</p>
        </div>
      </div>
      <ol className="mt-8 grid gap-0">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-3 py-3 border-t border-line text-[15px]">
            <span
              className={`grid place-items-center w-6 h-6 rounded-full shrink-0 ${
                i < now ? "bg-teal-text text-white" : i === now ? "border-2 border-teal-text" : "border border-line"
              }`}
              aria-hidden="true"
            >
              {i < now && <Check size={13} />}
            </span>
            <span className={i <= now ? "" : "text-muted"}>{s}</span>
            <span className="ml-auto mono-label !text-[10.5px] text-muted">{i < now ? "Done" : i === now ? "Now" : "Next"}</span>
          </li>
        ))}
      </ol>
      <div className="mt-6 rounded-[6px] bg-paper p-4 sm:p-5">
        <p className="mono-label !text-[10.5px] text-muted">Latest updates from your buyer</p>
        <ul className="mt-3 grid gap-2.5 text-[14px]">
          <li className="flex gap-3"><span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-teal-text shrink-0" aria-hidden="true" />Booked on a vessel. We sent you the shipping papers.</li>
          <li className="flex gap-3"><span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-line shrink-0" aria-hidden="true" /><span className="text-muted">Supplier confirmed the goods were packed and ready.</span></li>
        </ul>
      </div>
    </div>
  );
}

function QuoteView() {
  const [pick, setPick] = useState(0);
  const [approved, setApproved] = useState(false);
  const options = [
    { name: "Supplier A, Guangzhou", checks: ["Factory checked", "Samples approved"], ok: true },
    { name: "Supplier B, Istanbul", checks: ["Factory checked", "Samples approved"], ok: true },
    { name: "Supplier C, Birmingham", checks: ["Factory checked", "Samples on the way"], ok: false },
  ];
  return (
    <div>
      <p className="mono-label !text-[11px] text-muted">Quote NLP-Q-118 · Sample</p>
      <h3 className="mt-2 text-[22px] font-medium tracking-tight">Office chairs, 40 units</h3>
      <p className="mt-2 text-[14.5px] text-muted">Three suppliers checked. Pick one and we buy at the agreed price.</p>
      <div role="radiogroup" aria-label="Choose a supplier" className="mt-5 grid gap-2">
        {options.map((o, i) => (
          <button
            key={o.name}
            type="button"
            role="radio"
            aria-checked={pick === i}
            onClick={() => {
              setPick(i);
              setApproved(false);
            }}
            className={`flex items-center gap-4 text-left rounded-[6px] border px-4 py-3 transition-colors ${
              pick === i ? "border-teal-text bg-teal-soft" : "border-line hover:border-text"
            }`}
          >
            <span className={`w-4 h-4 rounded-full border-2 shrink-0 ${pick === i ? "border-teal-text bg-teal-text" : "border-line"}`} aria-hidden="true" />
            <span className="flex-1 min-w-0">
              <span className="block text-[15px] font-medium">{o.name}</span>
              <span className="block text-[13px] text-muted">{o.checks.join(" · ")}</span>
            </span>
            <span className={`mono-label !text-[10px] px-2 py-1 rounded-[3px] ${o.ok ? "bg-teal-soft text-teal-text" : "bg-gold-soft text-gold-text"}`}>
              {o.ok ? "Ready" : "Waiting"}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => setApproved(true)} className="btn bg-ink text-white hover:bg-ink-3 min-h-11 !text-[12px]">
          Approve this supplier
        </button>
        <AnimatePresence>
          {approved && (
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[14px] text-teal-text flex items-center gap-1.5" role="status">
              <Check size={15} aria-hidden="true" /> Approved. Next, we buy and book the shipment.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SourcingView() {
  const rows = [
    { item: "LED bulbs, 500 units", from: "China", status: "3 supplier prices in", tone: "teal" },
    { item: "Ankara fabric, 60 rolls", from: "Africa", status: "Samples on the way", tone: "gold" },
    { item: "Phone accessories, mixed", from: "China", status: "Finding suppliers", tone: "muted" },
    { item: "Baby formula, 120 tins", from: "UK", status: "Bought", tone: "teal" },
    { item: "Kitchen towels, 80 packs", from: "Turkey", status: "Finding suppliers", tone: "muted" },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      <p className="mono-label !text-[11px] text-muted">5 requests · Sample</p>
      <h3 className="mt-2 text-[22px] font-medium tracking-tight">Sourcing requests</h3>
      <ul className="mt-5 border-b border-line">
        {rows.map((r, i) => (
          <li key={r.item} className="border-t border-line">
            <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="w-full flex items-center gap-4 py-3 text-left hover:text-teal-text transition-colors">
              <span className="mono-label !text-[10.5px] text-muted w-14 shrink-0">{r.from}</span>
              <span className="flex-1 min-w-0 text-[15px]">{r.item}</span>
              <span
                className={`mono-label !text-[10px] px-2 py-1 rounded-[3px] whitespace-nowrap ${
                  r.tone === "teal" ? "bg-teal-soft text-teal-text" : r.tone === "gold" ? "bg-gold-soft text-gold-text" : "bg-paper text-muted"
                }`}
              >
                {r.status}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease }}
                  className="overflow-hidden text-[14px] text-muted pl-[72px] pb-3"
                >
                  {r.status === "Bought"
                    ? "Paid for at the agreed price. Shipping is being booked."
                    : r.status === "Finding suppliers"
                      ? "We are asking suppliers in this market. You hear from us as soon as prices are in."
                      : r.status === "Samples on the way"
                        ? "Samples are on their way to be checked before you choose."
                        : "Prices are in from checked suppliers. Open the quote to choose."}
                </motion.p>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ShipmentsView() {
  const all = [
    { stage: "Collected from supplier", sea: 0, air: 1, road: 0 },
    { stage: "At sea", sea: 2, air: 0, road: 0 },
    { stage: "In the air", sea: 0, air: 1, road: 0 },
    { stage: "Held at customs", sea: 1, air: 0, road: 0, alert: true },
    { stage: "Out for delivery", sea: 0, air: 0, road: 1 },
  ];
  const [mode, setMode] = useState<"all" | "sea" | "air" | "road">("all");
  const count = (r: (typeof all)[number]) => (mode === "all" ? r.sea + r.air + r.road : r[mode]);
  const max = 3;
  const modes = [
    { key: "all", label: "All", Icon: BarChart3 },
    { key: "sea", label: "Sea", Icon: Ship },
    { key: "air", label: "Air", Icon: Plane },
    { key: "road", label: "Road", Icon: Truck },
  ] as const;
  return (
    <div>
      <p className="mono-label !text-[11px] text-muted">5 shipments · Sample</p>
      <h3 className="mt-2 text-[22px] font-medium tracking-tight">Shipments by stage</h3>
      <div role="radiogroup" aria-label="Filter by mode" className="mt-4 flex flex-wrap gap-1.5">
        {modes.map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={mode === key}
            onClick={() => setMode(key)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 min-h-9 text-[13px] transition-colors ${
              mode === key ? "border-teal-text bg-teal-soft text-teal-text" : "border-line text-muted hover:text-text"
            }`}
          >
            <Icon size={13} aria-hidden="true" /> {label}
          </button>
        ))}
      </div>
      <dl className="mt-6 grid gap-3.5">
        {all.map((r) => {
          const n = count(r);
          return (
            <div key={r.stage} className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] items-center gap-4">
              <dt className="text-[13.5px] text-muted text-right">{r.stage}</dt>
              <dd className="flex items-center gap-2.5">
                <motion.span
                  className={`block h-6 rounded-[3px] ${r.alert ? "bg-[#b42318]" : "bg-teal-text"}`}
                  initial={false}
                  animate={{ width: `${Math.max(n ? 6 : 0.6, (n / max) * 100) * 0.85}%` }}
                  transition={{ duration: 0.6, ease }}
                />
                <span className="font-mono text-[13px]">{n}</span>
              </dd>
            </div>
          );
        })}
      </dl>
      <p className="mt-5 text-[13px] text-muted">Held at customs means papers are being checked. We handle it and tell you what is needed.</p>
    </div>
  );
}

function InventoryView() {
  const items = [
    { item: "Nitrile gloves, cartons", qty: 6, of: 40 },
    { item: "Hand sanitiser, 5 litre", qty: 3, of: 24 },
    { item: "Printer paper A4, boxes", qty: 31, of: 40 },
    { item: "Bin liners, rolls", qty: 22, of: 30 },
    { item: "Face masks, boxes", qty: 18, of: 24 },
  ];
  return (
    <div>
      <p className="mono-label !text-[11px] text-muted">38 items · Sample</p>
      <h3 className="mt-2 text-[22px] font-medium tracking-tight">Stock levels</h3>
      <ul className="mt-5 border-b border-line">
        {items.map((it) => {
          const low = it.qty / it.of < 0.25;
          return (
            <li key={it.item} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_140px_auto] items-center gap-x-4 gap-y-2 py-3 border-t border-line">
              <span className="text-[15px]">
                {it.item}
                {low && <span className="ml-2 mono-label !text-[10px] px-1.5 py-0.5 rounded-[3px] bg-[#fde8e6] text-[#b42318]">Low</span>}
              </span>
              <span className="hidden sm:flex items-center gap-2" aria-hidden="true">
                <span className="flex-1 h-1.5 rounded-full bg-paper overflow-hidden">
                  <span className={`block h-full ${low ? "bg-[#b42318]" : "bg-teal-text"}`} style={{ width: `${(it.qty / it.of) * 100}%` }} />
                </span>
              </span>
              <span className="flex items-center gap-3 justify-end">
                <span className="font-mono text-[13px] text-muted w-12 text-right">{it.qty}/{it.of}</span>
                {low ? (
                  <Link
                    href={`/quote?what=${encodeURIComponent(`Reorder: ${it.item}`)}#form`}
                    className="inline-flex items-center gap-1 text-[13px] font-medium text-teal-text hover:underline underline-offset-4 min-h-9"
                  >
                    Reorder <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                ) : (
                  <span className="text-[13px] text-muted min-h-9 inline-flex items-center">In stock</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const views: Record<View, () => React.ReactElement> = {
  track: TrackView,
  quote: QuoteView,
  sourcing: SourcingView,
  shipments: ShipmentsView,
  inventory: InventoryView,
};

/* ---------- the window ---------- */

export default function EngineDemo() {
  const [view, setView] = useState<View>("track");
  const [step, setStep] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const Current = views[view];

  const stage = useRef<HTMLDivElement>(null);
  const goStep = (n: number | null) => {
    setStep(n);
    if (n === null) return;
    setView(tour[n].view);
    // The tour starts from a link under the panel: bring the step into view.
    const el = stage.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    else if (el && el.getBoundingClientRect().top > window.innerHeight * 0.6) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const go = (v: View) => {
    setStep(null);
    setView(v);
  };

  return (
    <div>
      <div className="rounded-[12px] border border-white/15 bg-white/[0.06] p-1.5 sm:p-2 backdrop-blur-xl shadow-[0_40px_120px_-40px_rgba(0,0,0,.85)]">
        <div className="rounded-[8px] overflow-hidden bg-white text-text">
          {/* App bar */}
          <div className="bg-ink text-white flex items-center gap-4 px-4 sm:px-5 h-14">
            <Image src="/logo-nlp.png" alt="" width={720} height={240} className="h-6 w-auto shrink-0" />
            <div className="hidden md:flex items-center gap-2 rounded-[5px] border border-ink-line px-3 h-9 w-56 text-[13px] text-muted-dark" aria-hidden="true">
              <Search size={14} /> Search orders
            </div>
            <div role="tablist" aria-label="Demo sections" className="flex-1 min-w-0 flex items-center gap-1 overflow-x-auto [scrollbar-width:none]">
              {tabs.map((t) => (
                <button
                  key={t.view}
                  type="button"
                  role="tab"
                  aria-selected={view === t.view}
                  onClick={() => go(t.view)}
                  className={`shrink-0 px-2.5 min-h-9 rounded-[4px] text-[13.5px] transition-colors ${
                    view === t.view ? "bg-ink-3 text-white" : "text-muted-dark hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <span className="hidden sm:inline-flex shrink-0 mono-label !text-[10px] rounded-[3px] border border-gold/50 text-gold px-2 py-1">Demo · sample data</span>
          </div>

          {/* Greeting */}
          <div className="flex flex-wrap items-end justify-between gap-4 px-5 sm:px-8 pt-6 pb-5">
            <div>
              <p className="text-[24px] sm:text-[28px] font-medium tracking-tight">Your buying, at a glance</p>
              <p className="mt-1 text-[14.5px] text-muted">
                <span className="text-gold-text font-medium">2 quotes</span> wait for your yes and{" "}
                <span className="text-teal-text font-medium">1 order</span> arrives today.
              </p>
            </div>
            <div className="flex gap-2">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn border-line bg-white text-text hover:border-text min-h-10 px-3.5 !text-[11.5px]">
                <MessageCircle size={14} aria-hidden="true" /> Ask us
              </a>
              <Link href="/quote" className="btn bg-ink text-white hover:bg-ink-3 min-h-10 px-3.5 !text-[11.5px]">
                Get a quote
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-[250px_1fr] border-t border-line">
            {/* Left: totals and shortcuts */}
            <nav aria-label="Demo shortcuts" className="lg:border-r border-line px-5 sm:px-8 lg:px-6 py-5 flex lg:block gap-6 overflow-x-auto [scrollbar-width:none]">
              {groups.map((g) => (
                <div key={g.title} className="shrink-0 lg:mb-6 last:mb-0 min-w-[180px] lg:min-w-0">
                  <p className="text-[15px] font-semibold">{g.title}</p>
                  <p className="font-mono text-[30px] leading-tight tracking-tight">{g.count}</p>
                  <p className="flex items-center gap-2 text-[13px] text-muted">
                    <span className={`w-2 h-2 rounded-full ${g.dot}`} aria-hidden="true" /> {g.note}
                  </p>
                  <ul className="mt-2">
                    {g.links.map(({ view: v, label, Icon }) => (
                      <li key={label}>
                        <button
                          type="button"
                          onClick={() => go(v)}
                          aria-current={view === v ? "true" : undefined}
                          className={`flex w-full items-center gap-2 rounded-[4px] px-2 -mx-2 min-h-8 text-[13.5px] transition-colors ${
                            view === v ? "text-teal-text bg-teal-soft" : "hover:text-teal-text"
                          }`}
                        >
                          <Icon size={14} aria-hidden="true" /> {label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            {/* Right: the selected view */}
            <div ref={stage} className="relative scroll-mt-28 px-5 sm:px-8 py-6 min-h-[440px]">
              <AnimatePresence>
                {step !== null && (
                  <motion.div
                    key="tour"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease }}
                    role="dialog"
                    aria-label={`Tour, step ${step + 1} of ${tour.length}`}
                    className="relative mb-5 sm:mb-0 sm:absolute z-10 sm:top-4 sm:right-4 sm:w-[300px] rounded-[8px] bg-ink text-white p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,.6)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="mono-label !text-[10.5px] text-teal">Tour · {step + 1} of {tour.length}</p>
                      <button type="button" onClick={() => goStep(null)} aria-label="End tour" className="-mt-1 -mr-1 grid place-items-center w-8 h-8 text-muted-dark hover:text-white">
                        <X size={15} />
                      </button>
                    </div>
                    <p className="mt-2 text-[15px] leading-snug">{tour[step].text}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <button type="button" disabled={step === 0} onClick={() => goStep(step - 1)} className="text-[13px] text-muted-dark hover:text-white disabled:opacity-40 min-h-9">
                        Back
                      </button>
                      {step < tour.length - 1 ? (
                        <button type="button" onClick={() => goStep(step + 1)} className="btn bg-teal text-ink hover:bg-teal-hover min-h-9 px-3 !text-[11.5px]">
                          Next
                        </button>
                      ) : (
                        <Link href="/quote" className="btn bg-teal text-ink hover:bg-teal-hover min-h-9 px-3 !text-[11.5px]">
                          Start a real quote
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={view}
                  initial={reduce ? false : { opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25, ease }}
                >
                  <Current />
                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="mono-label !text-[12px] text-[#b9c0c9]">
          Click to explore or{" "}
          <button type="button" onClick={() => goStep(0)} className="underline underline-offset-4 decoration-1 text-white hover:text-teal inline-flex items-center gap-1.5 min-h-9">
            <Package size={13} aria-hidden="true" /> take a tour
          </button>
        </p>
        <p className="text-[13.5px] text-[#b9c0c9] max-w-[46em]">
          An illustration with sample data, to show how working with us goes. There is no account to sign in to: we keep you updated directly.
        </p>
      </div>
    </div>
  );
}
