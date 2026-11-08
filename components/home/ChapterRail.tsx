"use client";

import { useEffect, useState } from "react";

// A fixed chapter index on wide screens: shows where you are in the page and jumps between chapters.
// Reads every [data-chapter] section on the page; hidden until the hero has gone.
export default function ChapterRail() {
  const [chapters, setChapters] = useState<{ id: string; label: string }[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>("[data-chapter]")];
    setChapters(els.map((e) => ({ id: e.id, label: e.dataset.chapter ?? "" })));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((e) => io.observe(e));
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Page chapters"
      className={`hidden min-[1520px]:block fixed left-4 top-1/2 -translate-y-1/2 z-30 transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <ol className="flex flex-col gap-1 rounded-[6px] bg-ink/85 backdrop-blur-xl border border-ink-line p-2">
        {chapters.map((c, i) => {
          const on = c.id === active;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={on ? "true" : undefined}
                aria-label={c.label}
                title={c.label}
                className={`group flex items-center gap-3 px-2.5 py-2 rounded-[4px] font-mono text-[11px] tracking-[0.08em] uppercase transition-colors ${
                  on ? "text-white bg-white/[0.06]" : "text-muted-dark hover:text-white"
                }`}
              >
                <span className={on ? "text-teal" : ""}>{String(i + 1).padStart(2, "0")}</span>
                <span className={`h-px transition-all duration-500 ${on ? "w-6 bg-teal" : "w-3 bg-white/25"}`} />
                <span className="hidden 2xl:inline">{c.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
