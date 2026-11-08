"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { marked } from "marked";
import type { ActivityEvent, Block, Post, Settings, StudioState } from "@/lib/studio/types";

// The prototype keeps its state in this browser only (localStorage), so anyone can try every flow
// and nothing reaches the website. "Reset sample data" in Settings puts it back as it started.

const KEY = "nlp-studio-v1";
const uid = () => Math.random().toString(36).slice(2, 9);
const now = () => new Date().toISOString();

export type Toast = { id: string; text: string; tone?: "ok" | "error"; action?: { label: string; run: () => void } };

type Ctx = {
  state: StudioState;
  ready: boolean;
  post: (id: string) => Post | undefined;
  toasts: Toast[];
  toast: (t: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
  signIn: () => void;
  signOut: () => void;
  approve: (id: string, when: "now" | string) => { ok: boolean; error?: string };
  cancelSchedule: (id: string) => void;
  undoApprove: (id: string) => void;
  requestChanges: (id: string, note: string) => void;
  simulateNewVersion: (id: string) => void;
  saveEdit: (id: string, title: string, blocks: { id: string; md: string }[]) => void;
  decline: (id: string, reason: string) => void;
  restore: (id: string) => void;
  addComment: (id: string, blockId: string | null, text: string) => void;
  removeComment: (id: string, commentId: string) => void;
  confirmCheck: (id: string, checkId: string) => void;
  suggestPost: (query: string) => string;
  updateSettings: (patch: Partial<Settings>) => void;
  reset: () => void;
};

const StudioCtx = createContext<Ctx | null>(null);

export function useStudio() {
  const c = useContext(StudioCtx);
  if (!c) throw new Error("useStudio outside StudioProvider");
  return c;
}

const render = (md: string) => marked.parse(md, { async: false }) as string;

export function StudioProvider({ seed, children }: { seed: StudioState; children: React.ReactNode }) {
  const [state, setState] = useState<StudioState>(seed);
  const [ready, setReady] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const seedRef = useRef(seed);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setState(JSON.parse(saved));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {}
  }, [state, ready]);

  const dismiss = useCallback((id: string) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const toast = useCallback(
    (t: Omit<Toast, "id">) => {
      const id = uid();
      setToasts((all) => [...all.slice(-2), { ...t, id }]);
      setTimeout(() => dismiss(id), t.action ? 10000 : 5000);
    },
    [dismiss],
  );

  const log = (s: StudioState, e: Omit<ActivityEvent, "id" | "at">): StudioState => ({
    ...s,
    activity: [{ ...e, id: uid(), at: now() }, ...s.activity],
  });
  const patch = (s: StudioState, id: string, p: Partial<Post> | ((x: Post) => Partial<Post>)): StudioState => ({
    ...s,
    posts: s.posts.map((x) => (x.id === id ? { ...x, ...(typeof p === "function" ? p(x) : p) } : x)),
  });

  const value = useMemo<Ctx>(() => {
    const post = (id: string) => state.posts.find((p) => p.id === id);
    return {
      state,
      ready,
      post,
      toasts,
      toast,
      dismiss,
      signIn: () => setState((s) => ({ ...s, signedIn: true })),
      signOut: () => setState((s) => ({ ...s, signedIn: false })),
      approve: (id, when) => {
        if (when === "now" && state.settings.failNextPublish) {
          setState((s) => log({ ...s, settings: { ...s.settings, failNextPublish: false } }, { who: "Content engine", postId: id, text: "Publish failed: the website did not answer. Nothing changed on the site." }));
          return { ok: false, error: "The website did not answer, so nothing was published. Your approval is saved. Try again in a minute." };
        }
        setState((s) =>
          log(
            patch(s, id, when === "now" ? { status: "published", publishedAt: now(), scheduledFor: undefined } : { status: "scheduled", scheduledFor: when }),
            { who: "Dorcas", postId: id, text: when === "now" ? "Approved and published" : `Approved and scheduled for ${new Date(when).toLocaleString("en-GB", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}` },
          ),
        );
        return { ok: true };
      },
      undoApprove: (id) =>
        setState((s) => log(patch(s, id, { status: "review", publishedAt: undefined, scheduledFor: undefined }), { who: "Dorcas", postId: id, text: "Undid the approval within 10 seconds. Nothing stayed live." })),
      cancelSchedule: (id) => setState((s) => log(patch(s, id, { status: "review", scheduledFor: undefined }), { who: "Dorcas", postId: id, text: "Took it off the schedule" })),
      requestChanges: (id, note) =>
        setState((s) => log(patch(s, id, { status: "changes", changeNote: note }), { who: "Dorcas", postId: id, text: `Asked for changes: “${note}”` })),
      simulateNewVersion: (id) =>
        setState((s) =>
          log(
            patch(s, id, (p) => ({
              status: "review",
              version: p.version + 1,
              editedBy: "engine",
              readyAt: now(),
              whatChanged: [
                p.changeNote ? `Your note: “${p.changeNote}”` : "Your notes on the last version",
                ...p.comments.map((c) => `Your comment: “${c.text}”`),
                "Shorter: about a third fewer words",
              ].slice(0, 4),
              comments: [],
            })),
            { who: "Content engine", postId: id, text: "New version ready for you" },
          ),
        ),
      saveEdit: (id, title, blocks) =>
        setState((s) =>
          log(
            patch(s, id, (p) => ({
              title,
              version: p.version + 1,
              editedBy: "her",
              blocks: blocks.filter((b) => b.md.trim()).map((b): Block => ({ id: b.id, md: b.md, html: render(b.md) })),
            })),
            { who: "Dorcas", postId: id, text: "Edited the text" },
          ),
        ),
      decline: (id, reason) =>
        setState((s) => log(patch(s, id, { status: "declined", declinedReason: reason }), { who: "Dorcas", postId: id, text: `Declined: ${reason}` })),
      restore: (id) => setState((s) => log(patch(s, id, { status: "review", declinedReason: undefined }), { who: "Dorcas", postId: id, text: "Brought back for review" })),
      addComment: (id, blockId, text) =>
        setState((s) => patch(s, id, (p) => ({ comments: [...p.comments, { id: uid(), blockId, text, at: now() }] }))),
      removeComment: (id, commentId) => setState((s) => patch(s, id, (p) => ({ comments: p.comments.filter((c) => c.id !== commentId) }))),
      confirmCheck: (id, checkId) =>
        setState((s) =>
          log(
            patch(s, id, (p) => ({ checks: p.checks.map((c) => (c.id === checkId ? { ...c, state: "confirmed" } : c)) })),
            { who: "Dorcas", postId: id, text: "Confirmed a fact in the draft" },
          ),
        ),
      suggestPost: (query) => {
        const id = `idea-${uid()}`;
        const title = query.charAt(0).toUpperCase() + query.slice(1);
        setState((s) =>
          log(
            {
              ...s,
              posts: [
                {
                  id,
                  slug: id,
                  title,
                  summary: "You asked for this from search data. Being written now.",
                  status: "drafting",
                  version: 1,
                  blocks: [],
                  checks: [],
                  comments: [],
                  createdAt: now(),
                  signal: { query, impressions: 0, clicks: 0, position: 0, note: "Requested by you from the Search page." },
                },
                ...s.posts,
              ],
            },
            { who: "Dorcas", postId: id, text: `Asked for a post on “${query}”` },
          ),
        );
        return id;
      },
      updateSettings: (p) => setState((s) => ({ ...s, settings: { ...s.settings, ...p } })),
      reset: () => {
        try {
          localStorage.removeItem(KEY);
        } catch {}
        setState({ ...seedRef.current, signedIn: true });
      },
    };
  }, [state, ready, toasts, toast, dismiss]);

  return <StudioCtx.Provider value={value}>{children}</StudioCtx.Provider>;
}

// Shared helpers for the screens
export const waitingDays = (p: Post) => (p.readyAt ? Math.max(0, Math.floor((Date.now() - new Date(p.readyAt).getTime()) / 86400000)) : 0);

export const when = (iso: string) => {
  const d = new Date(iso);
  const days = Math.round((d.getTime() - Date.now()) / 86400000);
  const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  if (Math.abs(days) < 1 && d.getDate() === new Date().getDate()) return `Today ${time}`;
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }) + ` · ${time}`;
};

export const ago = (iso: string) => {
  const m = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} h ago`;
  const d = Math.round(h / 24);
  return d === 1 ? "yesterday" : `${d} days ago`;
};
