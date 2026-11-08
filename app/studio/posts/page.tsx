"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, ExternalLink, RotateCcw, CalendarX, Sparkles, X } from "lucide-react";
import { useStudio } from "@/components/studio/store";
import PostRow, { metaLine } from "@/components/studio/PostRow";
import { Empty, Label, StatusPill, btn } from "@/components/studio/ui";
import type { Post, Status } from "@/lib/studio/types";

const TABS: { key: string; label: string; match: Status[] }[] = [
  { key: "waiting", label: "Waiting for you", match: ["review"] },
  { key: "progress", label: "In progress", match: ["changes", "drafting", "idea"] },
  { key: "scheduled", label: "Scheduled", match: ["scheduled"] },
  { key: "live", label: "Live", match: ["published"] },
  { key: "declined", label: "Declined", match: ["declined"] },
];

const EMPTY: Record<string, [string, string]> = {
  waiting: ["Nothing waiting for you", "New drafts arrive on your posting day. We tell you on WhatsApp and by email."],
  progress: ["Nothing being written", "Ask for a post from the Search page, or wait for the weekly suggestions."],
  scheduled: ["Nothing scheduled", "When you approve a post for later, it waits here until it goes live."],
  live: ["No posts live yet", "Approved posts appear here once they are on your blog."],
  declined: ["Nothing declined", "Posts you say no to are kept here, so you can bring one back."],
};

function Panel({ p, onClose }: { p: Post; onClose: () => void }) {
  const { restore, cancelSchedule, simulateNewVersion, toast } = useStudio();
  const toConfirm = p.checks.filter((c) => c.state === "confirm");
  return (
    <aside aria-label="Post details" className="studio-rise rounded-[12px] border border-line bg-white p-6 sticky top-6">
      <div className="flex items-start justify-between gap-3">
        <StatusPill status={p.status} />
        <button onClick={onClose} aria-label="Close details" className="grid place-items-center w-11 h-11 -mt-2 -mr-3 rounded-full hover:bg-black/[0.05]">
          <X size={18} aria-hidden="true" />
        </button>
      </div>
      <h2 className="mt-3 text-[22px] font-semibold leading-snug tracking-tight">{p.title}</h2>
      <p className="mt-2 text-[15px] text-muted">{p.summary}</p>
      <dl className="mt-5 divide-y divide-line border-y border-line text-[14.5px]">
        <div className="flex justify-between gap-4 py-3"><dt className="text-muted">Status</dt><dd className="text-right">{metaLine(p)}</dd></div>
        <div className="flex justify-between gap-4 py-3"><dt className="text-muted">Version</dt><dd>{p.version}{p.editedBy === "her" ? " · your edit" : ""}</dd></div>
        {p.signal && p.signal.impressions > 0 && (
          <div className="py-3">
            <dt className="text-muted flex items-center gap-1.5"><Search size={14} aria-hidden="true" /> Why this post</dt>
            <dd className="mt-1.5">“{p.signal.query}”: {p.signal.impressions.toLocaleString("en-GB")} searches in 28 days. {p.signal.note}</dd>
          </div>
        )}
        {p.status === "review" && (
          <div className="flex justify-between gap-4 py-3"><dt className="text-muted">Checks</dt><dd className={toConfirm.length ? "text-gold-text font-medium" : ""}>{toConfirm.length ? `${toConfirm.length} fact to confirm` : "All passed"}</dd></div>
        )}
        {p.changeNote && p.status === "changes" && (
          <div className="py-3"><dt className="text-muted">You asked</dt><dd className="mt-1.5">“{p.changeNote}”</dd></div>
        )}
      </dl>
      <div className="mt-5 grid gap-2">
        {(p.status === "review" || p.status === "scheduled" || p.status === "published" || p.status === "changes") && (
          <Link href={`/studio/posts/${p.id}`} className={p.status === "review" ? btn.approve : btn.ghost}>
            {p.status === "review" ? "Read and approve" : "Open"} <ArrowRight size={17} aria-hidden="true" />
          </Link>
        )}
        {p.status === "scheduled" && (
          <button onClick={() => { cancelSchedule(p.id); toast({ text: "Taken off the schedule. It is back in Waiting for you." }); }} className={btn.ghost}>
            <CalendarX size={17} aria-hidden="true" /> Take off the schedule
          </button>
        )}
        {p.status === "published" && (
          <a href={p.real ? `/blog/${p.slug}` : "/blog"} target="_blank" rel="noopener noreferrer" className={btn.quiet}>
            <ExternalLink size={17} aria-hidden="true" /> View on your blog
          </a>
        )}
        {p.status === "declined" && (
          <button onClick={() => { restore(p.id); toast({ text: "Brought back. It is in Waiting for you." }); }} className={btn.ghost}>
            <RotateCcw size={17} aria-hidden="true" /> Bring it back
          </button>
        )}
        {p.status === "changes" && (
          <button onClick={() => { simulateNewVersion(p.id); toast({ text: "New version arrived (prototype). It is in Waiting for you." }); }} className={btn.quiet}>
            <Sparkles size={17} aria-hidden="true" /> Show the new version arriving <span className="font-normal text-muted">(prototype)</span>
          </button>
        )}
      </div>
    </aside>
  );
}

export default function Posts() {
  const { state } = useStudio();
  const [tab, setTab] = useState("waiting");
  const [open, setOpen] = useState<string | null>(null);
  const counts = useMemo(() => Object.fromEntries(TABS.map((t) => [t.key, state.posts.filter((p) => t.match.includes(p.status)).length])), [state.posts]);
  const list = state.posts
    .filter((p) => TABS.find((t) => t.key === tab)!.match.includes(p.status))
    .sort((a, b) => (tab === "waiting" ? (a.readyAt ?? "").localeCompare(b.readyAt ?? "") : (b.readyAt ?? b.createdAt).localeCompare(a.readyAt ?? a.createdAt)));
  const selected = open ? state.posts.find((p) => p.id === open && list.includes(p)) : undefined;

  return (
    <div>
      <h1 className="text-[32px] md:text-[44px]">Posts</h1>
      <p className="mt-3 text-[17px] text-muted max-w-[44em]">Every post, from idea to live. Nothing goes on your blog until you approve it.</p>

      <div role="tablist" aria-label="Filter posts" className="mt-6 -mx-4 px-4 md:mx-0 md:px-0 flex gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => { setTab(t.key); setOpen(null); }}
            className={`shrink-0 inline-flex items-center gap-2 rounded-full border px-4 min-h-11 text-[14.5px] transition-colors ${tab === t.key ? "bg-ink text-white border-ink" : "bg-white border-line text-text hover:border-text"}`}
          >
            {t.label}
            <span className={`tabular-nums text-[13px] ${tab === t.key ? "text-[#b9c0c9]" : "text-muted"}`}>{counts[t.key]}</span>
          </button>
        ))}
      </div>

      <div className="mt-6">
        {list.length === 0 ? (
          <Empty title={EMPTY[tab][0]} body={EMPTY[tab][1]} action={tab === "progress" ? <Link href="/studio/search" className={btn.ghost}>Go to Search</Link> : undefined} />
        ) : (
          <>
            {/* Phones and tablets: a list */}
            <div className="lg:hidden space-y-3">
              {list.map((p) => <PostRow key={p.id} p={p} />)}
            </div>
            {/* Desktop: one table, details beside it */}
            <div className={`hidden lg:grid gap-6 items-start ${selected ? "grid-cols-[1fr_380px]" : "grid-cols-1"}`}>
              <div className="rounded-[12px] border border-line bg-white overflow-hidden">
                <table className="w-full text-left text-[14.5px]">
                  <thead className="bg-paper">
                    <tr>
                      <th scope="col" className="px-5 py-3 font-medium text-muted">Post</th>
                      <th scope="col" className="px-4 py-3 font-medium text-muted">Status</th>
                      <th scope="col" className="px-4 py-3 font-medium text-muted">When</th>
                      <th scope="col" className="px-4 py-3 font-medium text-muted text-right">Searches</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {list.map((p) => (
                      <tr
                        key={p.id}
                        onClick={() => setOpen(p.id === open ? null : p.id)}
                        className={`cursor-pointer transition-colors ${p.id === open ? "bg-teal-soft/60" : "hover:bg-paper"}`}
                      >
                        <td className="px-5 py-4">
                          <button onClick={(e) => { e.stopPropagation(); setOpen(p.id === open ? null : p.id); }} aria-expanded={p.id === open} className="text-left font-semibold leading-snug hover:underline underline-offset-4">
                            {p.title}
                          </button>
                          {p.signal && p.signal.impressions > 0 && <p className="mt-1 text-[13px] text-muted truncate max-w-[42ch]">“{p.signal.query}”</p>}
                        </td>
                        <td className="px-4 py-4"><StatusPill status={p.status} /></td>
                        <td className="px-4 py-4 text-muted whitespace-nowrap">{metaLine(p)}</td>
                        <td className="px-4 py-4 text-right tabular-nums">{p.signal?.impressions ? p.signal.impressions.toLocaleString("en-GB") : "–"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {selected && <Panel p={selected} onClose={() => setOpen(null)} />}
            </div>
            {!selected && <Label className="hidden lg:block mt-3 normal-case tracking-normal font-sans !text-[13.5px]">Click a row to see its details.</Label>}
          </>
        )}
      </div>
    </div>
  );
}
