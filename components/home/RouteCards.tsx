"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { routes } from "@/lib/routes";

// A carousel of the markets: drag or swipe on touch, arrow buttons on desktop.
// Each card is a waybill tag: the market code in outline, the route underneath.
export default function RouteCards({ light = false }: { light?: boolean }) {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [progress, setProgress] = useState(0);

  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    const room = el.scrollWidth - el.clientWidth;
    setProgress(room > 0 ? el.scrollLeft / room : 0);
  };
  useEffect(update, []);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 16), behavior: "smooth" });
  };

  const btn = `w-11 h-11 grid place-items-center rounded-[4px] border transition-colors disabled:opacity-30 disabled:cursor-default ${
    light ? "border-line text-text hover:border-text" : "border-ink-line text-white hover:border-teal"
  }`;

  return (
    <div className="mt-12 sm:mt-16">
      <div className="flex items-end justify-between gap-6 mb-6">
        <p className={`mono-label !text-[12px] ${light ? "text-muted" : "text-muted-dark"}`}>Buy from · {String(routes.length).padStart(2, "0")} markets</p>
        <div className="hidden md:flex gap-2">
          <button type="button" className={btn} onClick={() => step(-1)} disabled={edge.start} aria-label="Previous markets">
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button type="button" className={btn} onClick={() => step(1)} disabled={edge.end} aria-label="Next markets">
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
      <ul
        ref={track}
        onScroll={update}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-5 px-5 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {routes.map((r, i) => (
          <li key={r.slug} className="snap-start shrink-0 w-[82%] sm:w-[46%] lg:w-[calc((100%-48px)/4)]">
            <Link
              href={`/routes/${r.slug}`}
              className={`group relative flex flex-col h-full min-h-[248px] sm:min-h-[300px] rounded-[8px] border p-6 overflow-hidden transition-colors duration-500 ${
                light ? "bg-white border-line hover:border-text" : "bg-ink-2 border-ink-line hover:border-teal/60"
              }`}
            >
              <span aria-hidden="true" className="absolute top-0 left-0 h-[2px] w-0 bg-teal transition-[width] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-full" />
              <span className="flex items-center justify-between mono-label !text-[11px]">
                <span className={light ? "text-muted" : "text-muted-dark"}>0{i + 1} · Origin</span>
                <ArrowUpRight size={18} aria-hidden="true" className={`transition-transform duration-300 group-hover:rotate-45 ${light ? "text-teal-text" : "text-teal"}`} />
              </span>
              <span
                aria-hidden="true"
                className={`mt-5 sm:mt-6 font-mono font-medium text-[56px] sm:text-[64px] leading-none tracking-[-0.04em] text-transparent transition-colors duration-500 ${
                  light ? "[-webkit-text-stroke:1px_#b9c0c6] group-hover:text-ink" : "[-webkit-text-stroke:1px_#4a505c] group-hover:text-gold"
                }`}
              >
                {r.code}
              </span>
              <span className="mt-auto pt-6 sm:pt-8">
                <span className="block text-[22px] tracking-tight">Buy from {r.name}</span>
                <span className={`block mt-2 text-[15px] leading-snug ${light ? "text-muted" : "text-muted-dark"}`}>{r.short}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {/* Where you are in the carousel: shown where the arrow buttons are not */}
      <div aria-hidden="true" className={`md:hidden mt-5 h-0.5 rounded-full overflow-hidden ${light ? "bg-line" : "bg-ink-line"}`}>
        <div
          className={`h-full w-1/3 rounded-full ${light ? "bg-teal-text" : "bg-teal"}`}
          style={{ transform: `translateX(${progress * 200}%)` }}
        />
      </div>
    </div>
  );
}
