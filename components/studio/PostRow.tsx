"use client";

import Link from "next/link";
import { ChevronRight, Search, AlertCircle, CalendarClock } from "lucide-react";
import type { Post } from "@/lib/studio/types";
import { StatusPill } from "./ui";
import { waitingDays, when } from "./store";

export function metaLine(p: Post) {
  if (p.status === "review") {
    const d = waitingDays(p);
    return d === 0 ? "Arrived today" : `Waiting ${d} day${d > 1 ? "s" : ""}`;
  }
  if (p.status === "scheduled" && p.scheduledFor) return `Goes live ${when(p.scheduledFor)}`;
  if (p.status === "published" && p.publishedAt) return `Live since ${when(p.publishedAt).split(" · ")[0]}`;
  if (p.status === "changes") return "New version on its way";
  if (p.status === "declined") return p.declinedReason ?? "Declined";
  if (p.status === "drafting") return "Being written now";
  return "Suggested from search";
}

// One post, as a tappable row. Used on Today and on phones in Posts.
export default function PostRow({ p, href }: { p: Post; href?: string }) {
  const toConfirm = p.checks.filter((c) => c.state === "confirm").length;
  const link = href ?? `/studio/posts/${p.id}`;
  return (
    <Link href={link} className="group flex items-start gap-4 rounded-[10px] border border-line bg-white p-4 md:p-5 hover:border-text transition-colors">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill status={p.status} />
          {p.version > 1 && <span className="text-[12.5px] text-muted">Version {p.version}</span>}
        </div>
        <p className="mt-2.5 text-[17px] font-semibold leading-snug tracking-tight">{p.title}</p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13.5px] text-muted">
          <span className="inline-flex items-center gap-1.5">
            {p.status === "scheduled" ? <CalendarClock size={14} aria-hidden="true" /> : null}
            {metaLine(p)}
          </span>
          {p.signal && p.signal.impressions > 0 && (
            <span className="inline-flex items-center gap-1.5 min-w-0">
              <Search size={14} aria-hidden="true" className="shrink-0" />
              <span className="truncate">“{p.signal.query}”</span>
            </span>
          )}
          {p.status === "review" && toConfirm > 0 && (
            <span className="inline-flex items-center gap-1.5 text-gold-text font-medium">
              <AlertCircle size={14} aria-hidden="true" />
              {toConfirm} fact to confirm
            </span>
          )}
        </div>
      </div>
      <ChevronRight size={20} aria-hidden="true" className="mt-1 shrink-0 text-muted group-hover:text-text group-hover:translate-x-0.5 transition-transform" />
    </Link>
  );
}
