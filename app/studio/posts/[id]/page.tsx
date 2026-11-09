"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft, Search, CheckCircle2, AlertCircle, MessageSquarePlus, MoreHorizontal, PencilLine, Ban, Link2,
  CalendarClock, Send, ExternalLink, RotateCcw, Sparkles, Trash2, ChevronDown, PartyPopper, ArrowRight,
} from "lucide-react";
import { useStudio, when, waitingDays } from "@/components/studio/store";
import { Label, SampleTag, Sheet, StatusPill, btn } from "@/components/studio/ui";
import type { Post } from "@/lib/studio/types";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function nextSlot(day: string, time: string, skip = 0) {
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  const target = DAYS.indexOf(day);
  let add = (target - d.getDay() + 7) % 7;
  if (add === 0 && d.getTime() <= Date.now()) add = 7;
  d.setDate(d.getDate() + add + skip * 7);
  return d.toISOString();
}
const tomorrow9 = () => { const d = new Date(); d.setDate(d.getDate() + 1); d.setHours(9, 0, 0, 0); return d.toISOString(); };
const fmt = (iso: string) => new Date(iso).toLocaleString("en-GB", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

const CHANGE_CHIPS = ["Too long", "Too short", "A fact is wrong", "Change the title", "Add an example", "Sounds too formal"];
const DECLINE_REASONS = ["Not right for my customers", "We already cover this", "Not now, maybe later", "Something else"];

export default function Review() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const s = useStudio();
  const p = s.post(id);
  const [sheet, setSheet] = useState<null | "approve" | "changes" | "decline" | "more" | "comment">(null);
  const [commentBlock, setCommentBlock] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [done, setDone] = useState<null | { kind: "published" | "scheduled"; at?: string }>(null);

  if (!p) {
    return (
      <div className="max-w-[560px]">
        <Link href="/studio/posts" className="inline-flex items-center gap-2 text-[15px] text-muted hover:text-text min-h-11"><ArrowLeft size={17} aria-hidden="true" /> Posts</Link>
        <h1 className="mt-4 text-[30px]">This post isn&apos;t here</h1>
        <p className="mt-3 text-muted">It may have been reset with the sample data. Go back to Posts to see what is waiting.</p>
      </div>
    );
  }

  if (done) return <Done p={p} kind={done.kind} at={done.at} onBack={() => setDone(null)} />;
  if (editing) return <Editor p={p} onClose={() => setEditing(false)} />;

  const toConfirm = p.checks.filter((c) => c.state === "confirm");
  const passed = p.checks.filter((c) => c.state !== "confirm");
  const general = p.comments.filter((c) => !c.blockId);

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10 items-start">
      <div className="min-w-0">
        <Link href="/studio/posts" className="inline-flex items-center gap-2 text-[15px] text-muted hover:text-text min-h-11 -ml-1">
          <ArrowLeft size={17} aria-hidden="true" /> Posts
        </Link>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <StatusPill status={p.status} />
          <span className="text-[13.5px] text-muted">
            Version {p.version}{p.editedBy === "her" ? " · your edit" : p.editedBy === "engine" ? " · rewritten for you" : ""}
            {p.status === "review" && ` · ${waitingDays(p) === 0 ? "arrived today" : `waiting ${waitingDays(p)} day${waitingDays(p) > 1 ? "s" : ""}`}`}
            {p.status === "scheduled" && p.scheduledFor && ` · goes live ${fmt(p.scheduledFor)}`}
          </span>
        </div>
        <h1 className="mt-3 text-[28px] md:text-[40px] leading-[1.08]">{p.title}</h1>
        <p className="mt-3 text-[17px] text-muted max-w-[40em]">{p.summary}</p>

        {p.whatChanged && p.status === "review" && (
          <div className="mt-6 rounded-[10px] border border-[#a7ddd6] bg-teal-soft p-4">
            <p className="text-[15px] font-semibold text-teal-text">What changed in version {p.version}</p>
            <ul className="mt-2 space-y-1.5 text-[15px]">
              {p.whatChanged.map((w) => <li key={w} className="flex gap-2"><CheckCircle2 size={16} className="text-teal-text mt-1 shrink-0" aria-hidden="true" />{w}</li>)}
            </ul>
          </div>
        )}
        {p.status === "changes" && (
          <div className="mt-6 rounded-[10px] border border-line bg-white p-4">
            <p className="text-[15px] font-semibold">You asked for changes</p>
            <p className="mt-1 text-[15px] text-muted">“{p.changeNote}”. A new version comes back here and we tell you on WhatsApp.</p>
            <button onClick={() => { s.simulateNewVersion(p.id); s.toast({ text: "New version arrived (prototype)." }); }} className={`${btn.quiet} mt-2 -ml-3`}>
              <Sparkles size={16} aria-hidden="true" /> Show the new version arriving <span className="font-normal text-muted">(prototype)</span>
            </button>
          </div>
        )}
        {p.status === "declined" && (
          <div className="mt-6 rounded-[10px] border border-line bg-white p-4">
            <p className="text-[15px] font-semibold">You declined this post</p>
            <p className="mt-1 text-[15px] text-muted">{p.declinedReason}. It is kept here in case you change your mind.</p>
          </div>
        )}

        {/* Why this post */}
        {p.signal && p.signal.impressions > 0 && (
          <section aria-labelledby="why" className="mt-8 rounded-[10px] bg-ink text-white p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 id="why" className="text-[16px] font-semibold flex items-center gap-2"><Search size={16} className="text-teal" aria-hidden="true" /> Why this post</h2>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-muted-dark border border-dashed border-ink-line rounded-[4px] px-1.5 py-0.5">Sample numbers</span>
            </div>
            <p className="mt-3 text-[17px]">People searched “{p.signal.query}”</p>
            <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[["Searches seen", p.signal.impressions.toLocaleString("en-GB")], ["Clicks to you", String(p.signal.clicks)], ["Your place", p.signal.position ? `#${Math.round(p.signal.position)}` : "–"]].map(([k, v]) => (
                <div key={k} className="rounded-[8px] bg-white/[0.05] border border-ink-line py-3">
                  <dd className="text-[22px] font-medium tabular-nums">{v}</dd>
                  <dt className="mt-0.5 text-[12px] text-muted-dark">{k}</dt>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-[14.5px] text-[#c6ccd4]">{p.signal.note} Last 28 days, from Google.</p>
          </section>
        )}

        {/* Checks */}
        {p.status === "review" && p.checks.length > 0 && (
          <section aria-labelledby="checks" className="mt-8">
            <h2 id="checks" className="text-[19px] font-semibold tracking-tight">Before you approve</h2>
            <div className="mt-3 space-y-3">
              {toConfirm.map((c) => (
                <div key={c.id} className="rounded-[10px] border border-[#d9bf86] bg-gold-soft p-4">
                  <p className="flex gap-2 text-[15.5px] font-semibold"><AlertCircle size={18} className="text-gold-text mt-0.5 shrink-0" aria-hidden="true" />{c.label.replace(/^Confirm: (.)/, (_, x: string) => "Please check: " + x.toUpperCase())}</p>
                  <p className="mt-1.5 text-[15px] ml-[26px]">{c.detail}</p>
                  <div className="mt-3 ml-[26px] flex flex-wrap gap-2">
                    <button onClick={() => { s.confirmCheck(p.id, c.id); s.toast({ text: "Confirmed." }); }} className={`${btn.ghost} !min-h-11`}>Yes, that&apos;s right</button>
                    <button onClick={() => { setCommentBlock(null); setSheet("changes"); }} className={`${btn.quiet} !min-h-11`}>No, it needs fixing</button>
                  </div>
                </div>
              ))}
              <details className="group rounded-[10px] border border-line bg-white">
                <summary className="flex items-center gap-2 px-4 min-h-12 cursor-pointer list-none text-[15px]">
                  <CheckCircle2 size={18} className="text-teal-text" aria-hidden="true" />
                  <span className="flex-1">{passed.length} checks passed</span>
                  <ChevronDown size={18} className="text-muted transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <ul className="px-4 pb-4 space-y-2.5 text-[14.5px]">
                  {passed.map((c) => (
                    <li key={c.id} className="flex gap-2"><CheckCircle2 size={16} className="text-teal-text mt-0.5 shrink-0" aria-hidden="true" /><span><span className="font-medium">{c.state === "confirmed" ? c.label.replace(/^Confirm: /, "You confirmed: ") : c.label}</span><span className="block text-muted">{c.detail}</span></span></li>
                  ))}
                </ul>
              </details>
            </div>
          </section>
        )}

        {/* Preview */}
        {p.blocks.length > 0 && p.status !== "drafting" && p.status !== "idea" && (
          <section aria-labelledby="preview" className="mt-8">
            <div className="flex items-end justify-between gap-4">
              <h2 id="preview" className="text-[19px] font-semibold tracking-tight">The post</h2>
              {p.status === "review" && <p className="text-[13.5px] text-muted text-right">Tap a paragraph to comment on it</p>}
            </div>
            <article className="mt-3 rounded-[12px] border border-line bg-white px-5 py-6 md:px-8 md:py-8">
              <p className="mono-label !text-[11px] text-muted">How it will look on your blog</p>
              <h3 className="mt-3 text-[26px] md:text-[32px] font-normal tracking-[-0.03em] leading-[1.1]">{p.title}</h3>
              <div className="prose-nlp mt-6">
                {p.blocks.map((b, i) => {
                  const cs = p.comments.filter((c) => c.blockId === b.id);
                  return (
                    <div key={b.id} className={`relative -mx-3 px-3 rounded-[6px] ${i === 0 ? "" : b.md.trimStart().startsWith("#") ? "mt-8" : "mt-3"} ${cs.length ? "bg-gold-soft/70 shadow-[inset_3px_0_0_var(--color-gold)]" : ""}`}>
                      {p.status === "review" ? (
                        <div
                          role="button"
                          tabIndex={0}
                          aria-label="Comment on this part"
                          onClick={(e) => { if ((e.target as HTMLElement).closest("a")) e.preventDefault(); setCommentBlock(b.id); setSheet("comment"); }}
                          onKeyDown={(e) => { if (e.key === "Enter") { setCommentBlock(b.id); setSheet("comment"); } }}
                          className="cursor-pointer rounded-[6px] hover:bg-paper focus-visible:bg-paper -mx-3 px-3 py-1 transition-colors [&>*]:!my-0 [&>*+*]:!mt-3"
                          dangerouslySetInnerHTML={{ __html: b.html }}
                        />
                      ) : (
                        <div className="[&>*]:!my-0 [&>*+*]:!mt-3" dangerouslySetInnerHTML={{ __html: b.html }} />
                      )}
                      {cs.map((c) => (
                        <p key={c.id} className="not-prose flex items-start gap-2 text-[14px] text-text bg-white border border-[#d9bf86] rounded-[6px] px-3 py-2 mt-2 mb-3">
                          <MessageSquarePlus size={15} className="text-gold-text mt-0.5 shrink-0" aria-hidden="true" />
                          <span className="flex-1">{c.text}</span>
                          <button onClick={() => s.removeComment(p.id, c.id)} aria-label="Remove comment" className="grid place-items-center w-8 h-8 -m-1.5 rounded-full hover:bg-black/[0.05]"><Trash2 size={14} aria-hidden="true" /></button>
                        </p>
                      ))}
                    </div>
                  );
                })}
              </div>
            </article>
            {general.length > 0 && (
              <ul className="mt-3 space-y-2">
                {general.map((c) => (
                  <li key={c.id} className="flex items-start gap-2 text-[14.5px] bg-white border border-line rounded-[8px] px-3 py-2.5">
                    <MessageSquarePlus size={15} className="text-gold-text mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="flex-1">{c.text}</span>
                    <button onClick={() => s.removeComment(p.id, c.id)} aria-label="Remove comment" className="grid place-items-center w-8 h-8 -m-1.5 rounded-full hover:bg-black/[0.05]"><Trash2 size={14} aria-hidden="true" /></button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
        {(p.status === "drafting" || p.status === "idea") && (
          <div className="mt-8 rounded-[10px] border border-dashed border-line bg-white p-6 text-center">
            <p className="text-[17px] font-semibold">Being written</p>
            <p className="mt-2 text-muted text-[15px]">The draft arrives here, usually within two working days. We tell you on WhatsApp when it is ready.</p>
          </div>
        )}
      </div>

      {/* Decision: sticky card on desktop, bar above the tabs on a phone */}
      <Decision p={p} open={(k) => setSheet(k)} toConfirm={toConfirm.length} />

      <ApproveSheet p={p} open={sheet === "approve"} onClose={() => setSheet(null)} onDone={(kind, at) => { setSheet(null); setDone({ kind, at }); }} />
      <ChangesSheet p={p} open={sheet === "changes"} onClose={() => setSheet(null)} />
      <CommentSheet p={p} blockId={commentBlock} open={sheet === "comment"} onClose={() => setSheet(null)} />
      <DeclineSheet p={p} open={sheet === "decline"} onClose={() => setSheet(null)} onDone={() => { setSheet(null); router.push("/studio/posts"); }} />
      <Sheet open={sheet === "more"} onClose={() => setSheet(null)} title="More">
        <div className="grid gap-1 -mx-2">
          <button onClick={() => { setSheet(null); setEditing(true); }} className="flex items-center gap-3 rounded-[8px] px-3 min-h-14 text-left text-[16px] hover:bg-paper"><PencilLine size={19} aria-hidden="true" /> Edit the text yourself</button>
          <button onClick={() => { setCommentBlock(null); setSheet("comment"); }} className="flex items-center gap-3 rounded-[8px] px-3 min-h-14 text-left text-[16px] hover:bg-paper"><MessageSquarePlus size={19} aria-hidden="true" /> Add a general comment</button>
          <button
            onClick={() => {
              const url = `${location.origin}/studio/posts/${p.id}`;
              navigator.clipboard?.writeText(url).catch(() => {});
              setSheet(null);
              s.toast({ text: "Preview link copied. People you add can read it; only you can approve." });
            }}
            className="flex items-center gap-3 rounded-[8px] px-3 min-h-14 text-left text-[16px] hover:bg-paper"
          >
            <Link2 size={19} aria-hidden="true" /> Copy a link to show someone
          </button>
          <button onClick={() => setSheet("decline")} className="flex items-center gap-3 rounded-[8px] px-3 min-h-14 text-left text-[16px] text-[#b42318] hover:bg-[#fdf1ef]"><Ban size={19} aria-hidden="true" /> Decline this post</button>
        </div>
      </Sheet>
    </div>
  );
}

function Decision({ p, open, toConfirm }: { p: Post; open: (k: "approve" | "changes" | "more" | "decline") => void; toConfirm: number }) {
  const s = useStudio();
  const commentCount = p.comments.length;
  let body: React.ReactNode = null;
  if (p.status === "review") {
    body = (
      <>
        <div className="flex gap-2">
          <button onClick={() => open("more")} aria-label="More: edit, comment, share, decline" className={`${btn.ghost} !px-0 w-12 shrink-0`}><MoreHorizontal size={20} aria-hidden="true" /></button>
          <button onClick={() => open("changes")} className={`${btn.ghost} flex-1 !px-3 whitespace-nowrap`}>
            Ask for changes{commentCount > 0 && <span className="ml-1 min-w-6 h-6 px-1.5 grid place-items-center rounded-full bg-gold text-ink text-[12.5px] tabular-nums">{commentCount}</span>}
          </button>
          <button onClick={() => open("approve")} className={`${btn.approve} flex-1 !px-3 whitespace-nowrap`}>Approve</button>
        </div>
      </>
    );
  } else if (p.status === "scheduled") {
    body = (
      <div className="flex gap-2">
        <button onClick={() => { s.cancelSchedule(p.id); s.toast({ text: "Taken off the schedule." }); }} className={`${btn.ghost} flex-1`}><RotateCcw size={17} aria-hidden="true" /> Unschedule</button>
        <button onClick={() => open("approve")} className={`${btn.approve} flex-1`}>Publish now</button>
      </div>
    );
  } else if (p.status === "published") {
    body = <a href={p.real ? `/blog/${p.slug}` : "/blog"} target="_blank" rel="noopener noreferrer" className={`${btn.ghost} w-full`}><ExternalLink size={17} aria-hidden="true" /> View on your blog</a>;
  } else if (p.status === "declined") {
    body = <button onClick={() => { s.restore(p.id); s.toast({ text: "Brought back for review." }); }} className={`${btn.ghost} w-full`}><RotateCcw size={17} aria-hidden="true" /> Bring it back</button>;
  }
  if (!body) return null;
  return (
    <>
      <div className="hidden lg:block sticky top-8 mt-[52px] rounded-[12px] border border-line bg-white p-5">
        <Label>Your decision</Label>
        <p className="mt-2 text-[15px] text-muted">
          {p.status === "review"
            ? toConfirm
              ? `Confirm ${toConfirm} fact first, or approve to confirm it.`
              : "Everything checks out. Read it once, then decide."
            : p.status === "scheduled" ? `Goes live ${fmt(p.scheduledFor!)}.` : p.status === "published" ? `Live since ${fmt(p.publishedAt!)}.` : "Declined."}
        </p>
        <div className="mt-4">{body}</div>
        {p.status === "review" && <p className="mt-3 text-[13px] text-muted">Nothing goes live without this button. You can undo for 10 seconds after.</p>}
      </div>
      <div className="lg:hidden fixed inset-x-0 bottom-[64px] z-30 bg-white/95 backdrop-blur border-t border-line px-4 py-3">{body}</div>
      <div className="lg:hidden h-24" aria-hidden="true" />
    </>
  );
}

function ApproveSheet({ p, open, onClose, onDone }: { p: Post; open: boolean; onClose: () => void; onDone: (k: "published" | "scheduled", at?: string) => void }) {
  const s = useStudio();
  const slot1 = useMemo(() => nextSlot(s.state.settings.publishDay, s.state.settings.publishTime), [s.state.settings]);
  const slot2 = useMemo(() => nextSlot(s.state.settings.publishDay, s.state.settings.publishTime, 1), [s.state.settings]);
  const [mode, setMode] = useState<"now" | "later">(p.status === "scheduled" ? "now" : "now");
  const [slot, setSlot] = useState<string>(slot1);
  const [custom, setCustom] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const unconfirmed = p.checks.filter((c) => c.state === "confirm");
  const at = slot === "custom" ? (custom ? new Date(custom).toISOString() : "") : slot;

  const go = async () => {
    setBusy(true);
    setError("");
    await new Promise((r) => setTimeout(r, 700));
    unconfirmed.forEach((c) => s.confirmCheck(p.id, c.id));
    const res = s.approve(p.id, mode === "now" ? "now" : at);
    setBusy(false);
    if (!res.ok) return setError(res.error ?? "Something went wrong. Nothing was published.");
    s.toast({ text: mode === "now" ? "Published." : `Scheduled for ${fmt(at)}.`, action: { label: "Undo", run: () => s.undoApprove(p.id) } });
    onDone(mode === "now" ? "published" : "scheduled", mode === "now" ? undefined : at);
  };

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Approve this post"
      footer={
        <button onClick={go} disabled={busy || (mode === "later" && !at)} className={`${btn.approve} w-full`}>
          {busy ? "Publishing…" : mode === "now" ? <><Send size={17} aria-hidden="true" /> {error ? "Try again" : "Publish now"}</> : <><CalendarClock size={17} aria-hidden="true" /> {at ? `Schedule for ${fmt(at)}` : "Pick a time"}</>}
        </button>
      }
    >
      <fieldset>
        <legend className="text-[15px] font-semibold mb-3">When should it go live?</legend>
        <div className="grid grid-cols-2 gap-2">
          {(["now", "later"] as const).map((m) => (
            <label key={m} className={`flex items-center gap-2.5 rounded-[8px] border px-3 min-h-14 cursor-pointer text-[15.5px] ${mode === m ? "border-teal-text bg-teal-soft" : "border-line"}`}>
              <input type="radio" name="when" checked={mode === m} onChange={() => setMode(m)} className="accent-[#0f6b63] w-4 h-4" />
              {m === "now" ? "Now" : "Later"}
            </label>
          ))}
        </div>
      </fieldset>
      {mode === "later" && (
        <fieldset className="mt-5">
          <legend className="text-[15px] font-semibold mb-3">Pick a time</legend>
          <div className="grid gap-2">
            {[[slot1, `Your posting day: ${fmt(slot1)}`], [slot2, fmt(slot2)], [tomorrow9(), `Tomorrow: ${fmt(tomorrow9())}`]].map(([v, l]) => (
              <label key={v} className={`flex items-center gap-2.5 rounded-[8px] border px-3 min-h-12 cursor-pointer text-[15px] ${slot === v ? "border-teal-text bg-teal-soft" : "border-line"}`}>
                <input type="radio" name="slot" checked={slot === v} onChange={() => setSlot(v)} className="accent-[#0f6b63] w-4 h-4" /> {l}
              </label>
            ))}
            <label className={`flex flex-wrap items-center gap-2.5 rounded-[8px] border px-3 py-2 min-h-12 cursor-pointer text-[15px] ${slot === "custom" ? "border-teal-text bg-teal-soft" : "border-line"}`}>
              <input type="radio" name="slot" checked={slot === "custom"} onChange={() => setSlot("custom")} className="accent-[#0f6b63] w-4 h-4" /> Another time
              {slot === "custom" && <input type="datetime-local" aria-label="Date and time" value={custom} onChange={(e) => setCustom(e.target.value)} className="ml-auto border border-line rounded-[6px] px-2 min-h-11 bg-white text-[15px]" />}
            </label>
          </div>
        </fieldset>
      )}
      <div className="mt-5 rounded-[8px] bg-paper p-4 text-[14.5px]">
        <p className="font-semibold">What happens</p>
        <ul className="mt-2 space-y-1.5 text-muted">
          <li>It goes on your blog at <span className="text-text break-all">/blog/{p.slug}</span>, without the Draft label.</li>
          <li>Google is told about it (sitemap and an indexing request).</li>
          <li>You can undo for 10 seconds, or take it down later from Posts.</li>
        </ul>
      </div>
      {unconfirmed.length > 0 && (
        <p className="mt-4 flex gap-2 text-[14.5px] text-gold-text">
          <AlertCircle size={17} className="shrink-0 mt-0.5" aria-hidden="true" />
          Approving also confirms: {unconfirmed.map((c) => c.label.replace(/^Confirm: /, "")).join("; ")}.
        </p>
      )}
      {error && (
        <div role="alert" className="mt-4 rounded-[8px] border border-[#e7b4ae] bg-[#fdf1ef] p-4 text-[14.5px] text-[#7a1a12]">
          <p className="font-semibold">Not published</p>
          <p className="mt-1">{error}</p>
        </div>
      )}
    </Sheet>
  );
}

function ChangesSheet({ p, open, onClose }: { p: Post; open: boolean; onClose: () => void }) {
  const s = useStudio();
  const [chips, setChips] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const n = p.comments.length;
  const can = chips.length > 0 || note.trim() || n > 0;
  const send = () => {
    const text = [chips.join(", "), note.trim(), n ? `${n} comment${n > 1 ? "s" : ""} on the text` : ""].filter(Boolean).join(". ");
    s.requestChanges(p.id, text);
    s.toast({ text: "Sent. The new version comes back here." });
    setChips([]); setNote("");
    onClose();
  };
  return (
    <Sheet open={open} onClose={onClose} title="Ask for changes" footer={<button onClick={send} disabled={!can} className={`${btn.primary} w-full`}><Send size={17} aria-hidden="true" /> Send to the writer</button>}>
      <fieldset>
        <legend className="text-[15px] font-semibold mb-3">What&apos;s wrong? Pick any</legend>
        <div className="flex flex-wrap gap-2">
          {CHANGE_CHIPS.map((c) => {
            const on = chips.includes(c);
            return (
              <button key={c} type="button" aria-pressed={on} onClick={() => setChips(on ? chips.filter((x) => x !== c) : [...chips, c])} className={`rounded-full border px-3.5 min-h-11 text-[14.5px] ${on ? "bg-ink text-white border-ink" : "bg-white border-line hover:border-text"}`}>
                {c}
              </button>
            );
          })}
        </div>
      </fieldset>
      <label htmlFor="ch-note" className="block text-[15px] font-semibold mt-5 mb-2">Anything else? <span className="font-normal text-muted">(optional)</span></label>
      <textarea id="ch-note" value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="e.g. Add an example with a small order" className="w-full border border-line rounded-[6px] px-3 py-2.5 text-[16px] focus:outline-none focus:border-text focus:ring-4 focus:ring-teal/25" />
      {n > 0 && <p className="mt-3 text-[14px] text-muted">Your {n} comment{n > 1 ? "s" : ""} on the text go with it.</p>}
    </Sheet>
  );
}

function CommentSheet({ p, blockId, open, onClose }: { p: Post; blockId: string | null; open: boolean; onClose: () => void }) {
  const s = useStudio();
  const [text, setText] = useState("");
  const block = p.blocks.find((b) => b.id === blockId);
  const quote = block ? block.md.replace(/[#*_\[\]()>-]/g, "").replace(/\s+/g, " ").trim().slice(0, 140) : "";
  const add = () => { s.addComment(p.id, blockId, text.trim()); setText(""); onClose(); s.toast({ text: "Comment added. It goes with “Ask for changes”." }); };
  return (
    <Sheet open={open} onClose={onClose} title={block ? "Comment on this part" : "Add a comment"} footer={<button onClick={add} disabled={!text.trim()} className={`${btn.primary} w-full`}>Add comment</button>}>
      {block && <blockquote className="border-l-2 border-gold pl-3 text-[15px] text-muted">{quote}{quote.length >= 140 ? "…" : ""}</blockquote>}
      <label htmlFor="cm-text" className="block text-[15px] font-semibold mt-4 mb-2">Your comment</label>
      <textarea id="cm-text" value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="e.g. We don't do this for every order" className="w-full border border-line rounded-[6px] px-3 py-2.5 text-[16px] focus:outline-none focus:border-text focus:ring-4 focus:ring-teal/25" />
    </Sheet>
  );
}

function DeclineSheet({ p, open, onClose, onDone }: { p: Post; open: boolean; onClose: () => void; onDone: () => void }) {
  const s = useStudio();
  const [reason, setReason] = useState("");
  return (
    <Sheet open={open} onClose={onClose} title="Decline this post" footer={<button onClick={() => { s.decline(p.id, reason); s.toast({ text: "Declined. It is kept under Declined." }); onDone(); }} disabled={!reason} className={`${btn.danger} w-full`}><Ban size={17} aria-hidden="true" /> Decline post</button>}>
      <p className="text-[15px] text-muted">It won&apos;t be published. You can bring it back later. Your reason helps us suggest better topics.</p>
      <fieldset className="mt-4">
        <legend className="text-[15px] font-semibold mb-3">Why?</legend>
        <div className="grid gap-2">
          {DECLINE_REASONS.map((r) => (
            <label key={r} className={`flex items-center gap-2.5 rounded-[8px] border px-3 min-h-12 cursor-pointer text-[15px] ${reason === r ? "border-text bg-paper" : "border-line"}`}>
              <input type="radio" name="reason" checked={reason === r} onChange={() => setReason(r)} className="w-4 h-4 accent-[#121317]" /> {r}
            </label>
          ))}
        </div>
      </fieldset>
    </Sheet>
  );
}

function Editor({ p, onClose }: { p: Post; onClose: () => void }) {
  const s = useStudio();
  const [title, setTitle] = useState(p.title);
  const [blocks, setBlocks] = useState(p.blocks.map((b) => ({ id: b.id, md: b.md })));
  const changed = title !== p.title || blocks.some((b, i) => b.md !== p.blocks[i]?.md);
  const save = () => { s.saveEdit(p.id, title.trim() || p.title, blocks); s.toast({ text: `Saved as version ${p.version + 1}. Read it once more, then approve.` }); onClose(); };
  return (
    <div className="max-w-[760px]">
      <button onClick={onClose} className="inline-flex items-center gap-2 text-[15px] text-muted hover:text-text min-h-11 -ml-1"><ArrowLeft size={17} aria-hidden="true" /> Back without saving</button>
      <h1 className="mt-3 text-[28px] md:text-[36px]">Edit the text</h1>
      <p className="mt-2 text-[15.5px] text-muted">Change any part. Your edit becomes version {p.version + 1}; the writer&apos;s version is kept in Activity.</p>
      <label htmlFor="ed-title" className="block text-[15px] font-semibold mt-6 mb-2">Title</label>
      <input id="ed-title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-line rounded-[6px] px-3 min-h-12 text-[17px] bg-white focus:outline-none focus:border-text focus:ring-4 focus:ring-teal/25" />
      <p className="text-[15px] font-semibold mt-6 mb-2">The post, part by part</p>
      <div className="space-y-3">
        {blocks.map((b, i) => (
          <textarea
            key={b.id}
            aria-label={`Part ${i + 1}`}
            value={b.md}
            onChange={(e) => setBlocks(blocks.map((x) => (x.id === b.id ? { ...x, md: e.target.value } : x)))}
            rows={Math.max(2, Math.ceil(b.md.length / 60) + b.md.split("\n").length - 1)}
            className="w-full border border-line rounded-[6px] px-3 py-2.5 text-[16px] leading-relaxed bg-white focus:outline-none focus:border-text focus:ring-4 focus:ring-teal/25 font-sans"
          />
        ))}
      </div>
      <p className="mt-3 text-[13.5px] text-muted">## starts a heading, - starts a list item, **words** make bold. Empty a part to remove it.</p>
      <div className="fixed lg:static inset-x-0 bottom-[64px] z-30 bg-white/95 lg:bg-transparent backdrop-blur lg:backdrop-blur-none border-t lg:border-0 border-line px-4 lg:px-0 py-3 lg:mt-6 flex gap-2">
        <button onClick={onClose} className={`${btn.ghost} flex-1 lg:flex-none`}>Cancel</button>
        <button onClick={save} disabled={!changed} className={`${btn.primary} flex-1 lg:flex-none`}>Save changes</button>
      </div>
      <div className="lg:hidden h-24" aria-hidden="true" />
    </div>
  );
}

function Done({ p, kind, at, onBack }: { p: Post; kind: "published" | "scheduled"; at?: string; onBack: () => void }) {
  const { state } = useStudio();
  if (p.status === "review")
    return (
      <div className="max-w-[560px] mx-auto text-center pt-6 md:pt-16">
        <span className="mx-auto grid place-items-center w-16 h-16 rounded-full bg-paper border border-line"><RotateCcw size={26} aria-hidden="true" /></span>
        <h1 className="mt-6 text-[32px] md:text-[40px]">Undone</h1>
        <p className="mt-3 text-[17px] text-muted">Nothing went live. “{p.title}” is waiting for you again.</p>
        <button onClick={onBack} className={`${btn.primary} mt-8 w-full`}>Back to the post</button>
      </div>
    );
  const next = state.posts.filter((x) => x.status === "review" && x.id !== p.id).sort((a, b) => (a.readyAt ?? "").localeCompare(b.readyAt ?? ""))[0];
  return (
    <div className="max-w-[560px] mx-auto text-center pt-6 md:pt-16">
      <span className="mx-auto grid place-items-center w-16 h-16 rounded-full bg-teal-soft text-teal-text studio-rise">
        {kind === "published" ? <PartyPopper size={28} aria-hidden="true" /> : <CalendarClock size={28} aria-hidden="true" />}
      </span>
      <h1 className="mt-6 text-[32px] md:text-[40px]">{kind === "published" ? "It's live" : "Scheduled"}</h1>
      <p className="mt-3 text-[17px] text-muted">
        {kind === "published" ? `“${p.title}” is on your blog and Google has been told.` : `“${p.title}” goes live ${at ? fmt(at) : "at the time you chose"}. You can change that in Posts.`}
      </p>
      <p className="mt-2 text-[13.5px] text-muted">Prototype: on the real site this would change the blog. Here nothing changed.</p>
      <div className="mt-8 grid gap-2">
        {next ? (
          <Link href={`/studio/posts/${next.id}`} className={btn.approve}>Next waiting: {next.title.length > 34 ? next.title.slice(0, 34) + "…" : next.title} <ArrowRight size={17} aria-hidden="true" /></Link>
        ) : (
          <Link href="/studio" className={btn.primary}>All caught up. Back to Today</Link>
        )}
        {kind === "published" && <a href={p.real ? `/blog/${p.slug}` : "/blog"} target="_blank" rel="noopener noreferrer" className={btn.ghost}><ExternalLink size={17} aria-hidden="true" /> {p.real ? "See the draft on your blog" : "See it on your blog"}</a>}
        <Link href="/studio/posts" className={btn.quiet}>Back to Posts</Link>
      </div>
    </div>
  );
}
