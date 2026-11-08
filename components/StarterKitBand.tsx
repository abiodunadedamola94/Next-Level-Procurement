import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import Reveal from "./Reveal";
import { starterKit } from "@/lib/services";

// Gold band for the one product she sells directly.
export default function StarterKitBand({ compact = false }: { compact?: boolean }) {
  return (
    <Reveal className={compact ? "" : "wrap"}>
      <Link
        href="/starter-kit"
        className="group grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center rounded-[8px] border border-[#e8d9b4] bg-gold-soft p-7 md:p-10 hover:border-gold transition-colors"
      >
        <span className="w-16 h-16 rounded-2xl bg-ink text-gold grid place-items-center" aria-hidden="true">
          <GraduationCap size={30} />
        </span>
        <span className="min-w-0">
          <span className="mono-label text-gold-text block">Training · {starterKit.price}</span>
          <span className="block mt-2 text-[clamp(24px,2.6vw,34px)] font-semibold tracking-tight leading-tight">
            Want to import from China yourself?
          </span>
          <span className="block mt-2 text-muted text-[17px]">
            The {starterKit.title} is our training on how to import from China.
          </span>
        </span>
        <span className="btn bg-ink text-white group-hover:bg-ink-3 justify-self-start md:justify-self-end">
          See the StarterKit
          <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </Reveal>
  );
}
