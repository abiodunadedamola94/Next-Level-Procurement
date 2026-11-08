"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useStudio } from "@/components/studio/store";
import PostRow from "@/components/studio/PostRow";
import { Empty, Label, SampleTag, Stat, btn } from "@/components/studio/ui";
import { sampleQueries } from "@/lib/studio/sample-search";

export default function Today() {
  const { state, suggestPost, toast } = useStudio();
  const posts = state.posts;
  const waiting = posts.filter((p) => p.status === "review");
  const scheduled = posts.filter((p) => p.status === "scheduled");
  const inProgress = posts.filter((p) => p.status === "changes" || p.status === "drafting");
  const monthAgo = Date.now() - 30 * 86400000;
  const liveThisMonth = posts.filter((p) => p.status === "published" && p.publishedAt && new Date(p.publishedAt).getTime() > monthAgo).length;
  const asked = new Set(posts.map((p) => p.signal?.query));
  const ideas = sampleQueries.filter((q) => !q.page && q.impressions >= 250 && !asked.has(q.query)).slice(0, 2);
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div>
      <h1 className="text-[32px] md:text-[44px]">{greet}, Dorcas</h1>
      <p className="mt-3 text-[17px] text-muted max-w-[40em]">
        {waiting.length === 0
          ? "Nothing is waiting for you. The next draft arrives on your posting day."
          : `${waiting.length} post${waiting.length > 1 ? "s are" : " is"} waiting for you. Each takes about two minutes to read and approve.`}
      </p>

      <div className="mt-7 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label="Waiting for you" value={waiting.length} tone={waiting.length ? "gold" : undefined} hint={waiting.length ? "Oldest first below" : "All caught up"} />
        <Stat label="Live this month" value={liveThisMonth} hint="Posts on your blog" />
        <Stat label="Search clicks, 28 days" value="79" hint={<><span>Up 12%</span><SampleTag /></>} />
        <Stat label="Quote forms sent, 30 days" value="14" hint={<><span>From the site</span><SampleTag /></>} />
      </div>

      <div className="mt-10 grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-8 items-start">
        <section aria-labelledby="t-wait">
          <div className="flex items-end justify-between gap-4">
            <h2 id="t-wait" className="text-[22px] font-semibold tracking-tight">Waiting for you</h2>
            {waiting.length > 0 && (
              <Link href="/studio/posts" className="text-[14.5px] font-semibold text-teal-text hover:text-text inline-flex items-center gap-1.5 min-h-11">
                All posts <ArrowRight size={15} aria-hidden="true" />
              </Link>
            )}
          </div>
          <div className="mt-4 space-y-3">
            {waiting.length === 0 ? (
              <Empty title="You're all caught up" body="When a new draft is ready we tell you on WhatsApp and by email, and it appears here." />
            ) : (
              [...waiting].sort((a, b) => (a.readyAt ?? "").localeCompare(b.readyAt ?? "")).map((p) => <PostRow key={p.id} p={p} />)
            )}
          </div>
        </section>

        <div className="space-y-10">
          <section aria-labelledby="t-next">
            <h2 id="t-next" className="text-[18px] font-semibold tracking-tight">Coming up</h2>
            <div className="mt-3 space-y-3">
              {scheduled.length === 0 && inProgress.length === 0 ? (
                <p className="text-[15px] text-muted">Nothing scheduled.</p>
              ) : (
                [...scheduled, ...inProgress].map((p) => <PostRow key={p.id} p={p} />)
              )}
            </div>
          </section>

          <section aria-labelledby="t-ideas" className="rounded-[10px] bg-ink text-white p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 id="t-ideas" className="text-[18px] font-semibold tracking-tight">People are searching for</h2>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-muted-dark border border-dashed border-ink-line rounded-[4px] px-1.5 py-0.5">Sample</span>
            </div>
            <p className="mt-1.5 text-[14px] text-[#b9c0c9]">From Google, last 28 days. Your site has no page on these yet.</p>
            <ul className="mt-4 divide-y divide-ink-line">
              {ideas.length === 0 && <li className="py-3 text-[14.5px] text-[#b9c0c9]">You have asked for every suggestion. New ones come with the weekly search check.</li>}
              {ideas.map((q) => (
                <li key={q.query} className="py-3 flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-[15.5px] text-white">“{q.query}”</p>
                    <p className="text-[13px] text-muted-dark tabular-nums">{q.impressions.toLocaleString("en-GB")} searches seen · {q.clicks} {q.clicks === 1 ? "click" : "clicks"}</p>
                  </div>
                  <button
                    onClick={() => { suggestPost(q.query); toast({ text: "Asked for. It appears in Posts as “Being written”." }); }}
                    className="shrink-0 inline-flex items-center gap-1.5 rounded-[6px] bg-teal text-ink px-3 min-h-11 text-[14px] font-semibold hover:bg-teal-hover"
                  >
                    <Sparkles size={15} aria-hidden="true" /> Ask for a post
                  </button>
                </li>
              ))}
            </ul>
            <Link href="/studio/search" className={`${btn.quiet} !text-white hover:!bg-white/[0.06] w-full mt-2 !min-h-11`}>
              See all search terms <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
