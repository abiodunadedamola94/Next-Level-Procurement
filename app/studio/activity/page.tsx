"use client";

import Link from "next/link";
import { useStudio, ago } from "@/components/studio/store";

// Every decision, with who made it and when. Nothing is deleted from this list.
export default function Activity() {
  const { state } = useStudio();
  const title = (id?: string) => state.posts.find((p) => p.id === id)?.title;
  const groups = new Map<string, typeof state.activity>();
  for (const e of state.activity) {
    const k = new Date(e.at).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
    groups.set(k, [...(groups.get(k) ?? []), e]);
  }
  return (
    <div className="max-w-[820px]">
      <h1 className="text-[32px] md:text-[44px]">Activity</h1>
      <p className="mt-3 text-[17px] text-muted">Every draft, decision and publish, with who did it. This record is never edited or deleted.</p>
      <div className="mt-8 space-y-8">
        {[...groups.entries()].map(([day, events]) => (
          <section key={day} aria-label={day}>
            <h2 className="mono-label !text-[11.5px] text-muted">{day}</h2>
            <ol className="mt-3 rounded-[10px] border border-line bg-white divide-y divide-line">
              {events.map((e) => (
                <li key={e.id} className="flex gap-3 px-4 py-3.5">
                  <span aria-hidden="true" className={`mt-2 w-2 h-2 rounded-full shrink-0 ${e.who === "Dorcas" ? "bg-gold" : e.who === "MoCreative" ? "bg-ink" : "bg-teal-text"}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px]"><span className="font-semibold">{e.who === "Dorcas" ? "You" : e.who}</span> · {e.text}</p>
                    {e.postId && title(e.postId) && (
                      <Link href={`/studio/posts/${e.postId}`} className="mt-0.5 block text-[14px] text-teal-text hover:text-text underline-offset-4 hover:underline truncate">{title(e.postId)}</Link>
                    )}
                  </div>
                  <time dateTime={e.at} className="shrink-0 text-[13px] text-muted">{ago(e.at)}</time>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
