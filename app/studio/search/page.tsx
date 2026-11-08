"use client";

import { useState } from "react";
import { Sparkles, Check, PlugZap, Info } from "lucide-react";
import { useStudio } from "@/components/studio/store";
import { SampleTag, Stat } from "@/components/studio/ui";
import { sampleQueries, sampleTrend } from "@/lib/studio/sample-search";

// The Search Console pull: what people searched before they found (or did not find) her site.
// The engine pulls this weekly from her verified property; here it is sample data.

function Trend() {
  const max = Math.max(...sampleTrend);
  return (
    <figure className="rounded-[10px] border border-line bg-white p-5">
      <figcaption className="flex items-center justify-between gap-3 text-[14px] text-muted">
        <span>Clicks from Google, by week (12 weeks)</span>
        <SampleTag />
      </figcaption>
      <div className="mt-4 flex items-end gap-1.5 h-28" role="img" aria-label={`Weekly clicks rose from ${sampleTrend[0]} to ${sampleTrend[sampleTrend.length - 1]} over 12 weeks.`}>
        {sampleTrend.map((v, i) => (
          <div key={i} className={`flex-1 rounded-t-[3px] ${i === sampleTrend.length - 1 ? "bg-teal-text" : "bg-[#c9d6d4]"}`} style={{ height: `${(v / max) * 100}%` }} />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[12px] text-muted"><span>12 weeks ago</span><span>This week: {sampleTrend[sampleTrend.length - 1]}</span></div>
    </figure>
  );
}

export default function SearchPage() {
  const { state, suggestPost, toast } = useStudio();
  const [range, setRange] = useState("28");
  const asked = new Set(state.posts.map((p) => p.signal?.query));
  const rows = [...sampleQueries].sort((a, b) => b.impressions - a.impressions);
  const clicks = rows.reduce((a, r) => a + r.clicks, 0);
  const impressions = rows.reduce((a, r) => a + r.impressions, 0);

  return (
    <div>
      <h1 className="text-[32px] md:text-[44px]">Search</h1>
      <p className="mt-3 text-[17px] text-muted max-w-[44em]">What people typed into Google before they found your site, or didn&apos;t. The best posts answer these.</p>

      <div className="mt-6 rounded-[10px] border border-[#d9bf86] bg-gold-soft p-4 flex gap-3 text-[15px]">
        <PlugZap size={20} className="text-gold-text shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="font-semibold">Google Search Console: being connected</p>
          <p className="mt-1 text-text/80">Your site was added to Search Console on 8 Nov 2026. Real numbers start to show in 2 to 14 days. Until then, everything on this page is sample data.</p>
        </div>
      </div>

      <div role="tablist" aria-label="Date range" className="mt-6 inline-flex rounded-full border border-line bg-white p-1">
        {[["7", "7 days"], ["28", "28 days"], ["90", "3 months"]].map(([k, l]) => (
          <button key={k} role="tab" aria-selected={range === k} onClick={() => setRange(k)} className={`rounded-full px-4 min-h-10 text-[14px] ${range === k ? "bg-ink text-white" : "text-text hover:bg-paper"}`}>{l}</button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label="Clicks" value={clicks} hint="People who came to your site" />
        <Stat label="Searches seen" value={impressions.toLocaleString("en-GB")} hint="Times you showed in results" />
        <Stat label="Click rate" value={`${((clicks / impressions) * 100).toFixed(1)}%`} hint="Clicks ÷ searches seen" />
        <Stat label="Average place" value={`#${Math.round(rows.reduce((a, r) => a + r.position * r.impressions, 0) / impressions)}`} hint="Page one is #1 to #10" />
      </div>

      <div className="mt-6 grid lg:grid-cols-[1fr_1.4fr] gap-6 items-start">
        <Trend />
        <section aria-labelledby="q-title" className="rounded-[10px] border border-line bg-white overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-5 pt-5">
            <h2 id="q-title" className="text-[18px] font-semibold tracking-tight">Search terms</h2>
            <SampleTag />
          </div>
          <p className="px-5 mt-1 text-[14px] text-muted flex gap-1.5"><Info size={15} className="mt-0.5 shrink-0" aria-hidden="true" /> “No page yet” means people search it and nothing on your site answers it.</p>
          <ul className="mt-3 divide-y divide-line">
            {rows.map((r) => {
              const done = asked.has(r.query);
              return (
                <li key={r.query} className="px-5 py-3.5 flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-[15.5px] font-medium">“{r.query}”</p>
                    <p className="mt-0.5 text-[13px] text-muted tabular-nums">
                      {r.impressions.toLocaleString("en-GB")} seen · {r.clicks} {r.clicks === 1 ? "click" : "clicks"} · place #{Math.round(r.position)} ·{" "}
                      {r.page ? <span>answered by {r.page}</span> : <span className="text-gold-text font-medium">No page yet</span>}
                    </p>
                  </div>
                  {!r.page && (
                    done ? (
                      <span className="shrink-0 inline-flex items-center gap-1.5 text-[14px] text-teal-text font-medium min-h-11 px-2"><Check size={16} aria-hidden="true" /> Asked for</span>
                    ) : (
                      <button onClick={() => { suggestPost(r.query); toast({ text: "Asked for. It appears in Posts as “Being written”." }); }} className="shrink-0 inline-flex items-center gap-1.5 rounded-[6px] border border-line bg-white px-3 min-h-11 text-[14px] font-semibold hover:border-text">
                        <Sparkles size={15} aria-hidden="true" /> Ask for a post
                      </button>
                    )
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
