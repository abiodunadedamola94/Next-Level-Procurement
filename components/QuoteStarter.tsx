"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

// The first question of the quote, asked where the visitor already is.
// Submitting carries the answer to /quote, where the rest of the form is waiting.
export default function QuoteStarter({ id = "starter", dark = true }: { id?: string; dark?: boolean }) {
  const [what, setWhat] = useState("");
  const router = useRouter();
  const go = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(what.trim() ? `/quote?what=${encodeURIComponent(what.trim())}#form` : "/quote#form");
  };
  return (
    <form onSubmit={go} className="w-full max-w-[560px]" aria-label="Start a quote">
      <label htmlFor={id} className={`block mono-label !text-[11.5px] mb-2.5 ${dark ? "text-muted-dark" : "text-muted"}`}>
        What do you need bought?
      </label>
      <div
        className={`flex flex-col sm:flex-row gap-2 sm:gap-0 sm:p-1.5 sm:rounded-[6px] sm:border ${
          dark ? "sm:border-white/15 sm:bg-ink/60 sm:backdrop-blur-xl" : "sm:border-line sm:bg-white"
        }`}
      >
        <input
          id={id}
          value={what}
          onChange={(e) => setWhat(e.target.value)}
          placeholder="e.g. 200 cartons of disposable gloves"
          autoComplete="off"
          className={`flex-1 min-w-0 min-h-[52px] px-4 rounded-[4px] text-[16px] focus:outline-none sm:border-0 border ${
            dark
              ? "bg-ink/60 sm:bg-transparent text-white placeholder:text-[#8a929e] border-white/15 focus:ring-2 focus:ring-teal/50"
              : "bg-white sm:bg-transparent text-text placeholder:text-[#6b7380] border-line focus:ring-2 focus:ring-teal/40"
          }`}
        />
        <button type="submit" className={`btn group ${dark ? "bg-teal text-ink hover:bg-teal-hover" : "bg-ink text-white hover:bg-ink-3"}`}>
          Get a quote
          <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-[3px]" />
        </button>
      </div>
    </form>
  );
}
