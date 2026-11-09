import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import Reveal from "./Reveal";
import { starterKit } from "@/lib/services";
import { STARTERKIT_LINK } from "@/lib/site";

// Gold band for the one product she sells directly. The main button goes straight to the Payhip shop;
// the second link opens our page with the full contents list.
export default function StarterKitBand({ compact = false }: { compact?: boolean }) {
  return (
    <Reveal className={compact ? "" : "wrap"}>
      <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center rounded-[8px] border border-[#e8d9b4] bg-gold-soft p-7 md:p-10">
        <span className="w-16 h-16 rounded-2xl bg-ink text-gold grid place-items-center" aria-hidden="true">
          <BookOpen size={30} />
        </span>
        <div className="min-w-0">
          <p className="mono-label text-gold-text">Guide · PDF · {starterKit.price}</p>
          <p className="mt-2 text-[clamp(24px,2.6vw,34px)] font-semibold tracking-tight leading-tight">
            Want to source from China yourself?
          </p>
          <p className="mt-2 text-muted text-[17px] max-w-[40em]">
            Our {starterKit.title} provides practical, step-by-step guidance to help you get started.
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2">
          <a
            href={STARTERKIT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group btn bg-ink text-white hover:bg-ink-3"
          >
            Get the StarterKit
            <ArrowUpRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <Link href="/starter-kit" className="inline-flex items-center min-h-11 px-1 text-[15px] font-semibold text-text underline underline-offset-4 hover:text-gold-text">
            See what is inside
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
