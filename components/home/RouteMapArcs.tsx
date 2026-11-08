"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";

export type Place = { id: string; label: string; kind: "source" | "dest" | "both"; x: number; y: number };
export type Arc = { from: string; to: string };

const ease = [0.22, 1, 0.36, 1] as const;

const markets = [
  { code: "GB", name: "United Kingdom", what: "Personal shopping and sourcing" },
  { code: "CN", name: "China", what: "Sourcing and importation" },
  { code: "EU", name: "Europe", what: "Sourcing and importation" },
  { code: "TR", name: "Turkey", what: "Sourcing" },
  { code: "AF", name: "Africa", what: "Sourcing" },
];

const destinations = ["The UK", "Nigeria", "Other destinations: ask us"];

function arcPath(a: Place, b: Place) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const lift = Math.min(18, len * 0.32);
  // perpendicular, always bending upwards on the map
  let nx = -dy / len;
  let ny = dx / len;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  return `M ${a.x} ${a.y} Q ${mx + nx * lift} ${my + ny * lift} ${b.x} ${b.y}`;
}

export default function RouteMapArcs({
  width,
  height,
  dataUri,
  places,
  arcs,
  after,
  n = "04",
}: {
  after?: React.ReactNode;
  n?: string | null;
  width: number;
  height: number;
  dataUri: string;
  places: Place[];
  arcs: Arc[];
}) {
  const reduce = useReducedMotion();
  const byId = Object.fromEntries(places.map((p) => [p.id, p]));

  return (
    <section id="where-we-buy" data-chapter="Where we buy" className="section bg-ink text-white relative overflow-hidden" aria-labelledby="map-title">
      <div className="wrap">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
          <Reveal className="max-w-[720px]">
            <p className="mono-label !text-[12px] text-muted-dark flex items-center gap-4">{n && <span className="text-teal">{n}</span>} Where we buy</p>
            <h2 id="map-title" className="mt-6 text-[clamp(36px,4.6vw,64px)]">
              From anywhere in the world, to anywhere.
            </h2>
            <p className="mt-5 text-muted-dark text-[19px] max-w-[34em]">
              We source from the UK, China, Europe, Turkey, Africa and other markets, and deliver to the UK, Nigeria and
              other destinations.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex gap-6 mono-label !text-[11.5px] text-muted-dark">
            <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full border-2 border-teal" />Where we buy</span>
            <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-gold" />Where it goes</span>
          </Reveal>
        </div>

        <div className="relative mt-14" style={{ aspectRatio: `${width} / ${height}` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={dataUri} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full select-none pointer-events-none" />
          <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 w-full h-full" aria-hidden="true">
            <defs>
              <linearGradient id="arc-grad" x1="0" x2="1">
                <stop offset="0%" stopColor="#2cbaac" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#2cbaac" stopOpacity="1" />
                <stop offset="100%" stopColor="#c9962e" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            {arcs.map((a, i) => {
              const d = arcPath(byId[a.from], byId[a.to]);
              return (
                <g key={`${a.from}-${a.to}`}>
                  <motion.path
                    d={d}
                    fill="none"
                    stroke="url(#arc-grad)"
                    strokeWidth={0.32}
                    strokeLinecap="round"
                    initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                    transition={{ duration: 1.6, delay: 0.2 + i * 0.18, ease }}
                  />
                  {!reduce && (
                    <circle r={0.55} fill="#2cbaac">
                      <animateMotion dur={`${4.5 + i * 0.6}s`} begin={`${1.6 + i * 0.25}s`} repeatCount="indefinite" path={d} />
                    </circle>
                  )}
                </g>
              );
            })}
            {places.map((p) => (
              <g key={p.id}>
                {!reduce && (
                  <circle cx={p.x} cy={p.y} r={1} fill="none" stroke={p.kind === "source" ? "#2cbaac" : "#c9962e"} strokeWidth={0.2}>
                    <animate attributeName="r" from="0.8" to="3.4" dur="2.6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.9" to="0" dur="2.6s" repeatCount="indefinite" />
                  </circle>
                )}
                {p.kind === "source" ? (
                  <circle cx={p.x} cy={p.y} r={0.75} fill="#121317" stroke="#2cbaac" strokeWidth={0.38} />
                ) : (
                  <circle cx={p.x} cy={p.y} r={0.95} fill="#c9962e" stroke={p.kind === "both" ? "#2cbaac" : "none"} strokeWidth={0.38} />
                )}
              </g>
            ))}
          </svg>
          {places.map((p) => (
            <span
              key={p.id}
              aria-hidden="true"
              className="absolute hidden md:block mono-label !text-[11px] text-white/85 whitespace-nowrap -translate-x-1/2 mt-3 px-2 py-1 rounded-md bg-ink/80 border border-ink-line"
              style={{ left: `${(p.x / width) * 100}%`, top: `${(p.y / height) * 100}%` }}
            >
              {p.label}
            </span>
          ))}
        </div>

        {/* Hop table: the same information as text, readable on any screen */}
        <div className="mt-14 grid lg:grid-cols-[1.4fr_1fr] gap-4">
          <Reveal className="rounded-[8px] border border-ink-line bg-ink-2 overflow-hidden">
            <p className="mono-label !text-[11.5px] text-muted-dark px-6 py-4 border-b border-ink-line flex justify-between">
              <span>Where we buy</span>
              <span>What we do there</span>
            </p>
            <ul>
              {markets.map((m, i) => (
                <li key={m.code} className="grid grid-cols-[36px_1fr] sm:grid-cols-[36px_1fr_auto] gap-x-4 gap-y-0.5 items-center px-6 py-4 border-t first:border-t-0 border-ink-line">
                  <span className="mono-label !text-[11px] text-[#7b8390]">0{i + 1}</span>
                  <span className="font-semibold flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full border-2 border-teal shrink-0" aria-hidden="true" />
                    {m.name}
                  </span>
                  <span className="col-start-2 sm:col-start-3 text-muted-dark text-[15px]">{m.what}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[8px] border border-ink-line bg-ink-2 overflow-hidden flex flex-col">
            <p className="mono-label !text-[11.5px] text-muted-dark px-6 py-4 border-b border-ink-line">Where it goes</p>
            <ul className="flex-1">
              {destinations.map((d) => (
                <li key={d} className="flex items-center gap-3 px-6 py-4 border-t first:border-t-0 border-ink-line font-semibold">
                  <span className="w-2 h-2 rounded-full bg-gold shrink-0" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
            <p className="px-6 py-4 text-[13px] text-muted-dark border-t border-ink-line">Routes on the map are examples.</p>
          </Reveal>
        </div>
        {after}
      </div>
    </section>
  );
}
