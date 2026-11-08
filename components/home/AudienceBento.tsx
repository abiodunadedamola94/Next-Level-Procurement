import Link from "next/link";
import { ArrowUpRight, Store, Boxes, ShoppingCart, Plane } from "lucide-react";
import Reveal from "@/components/Reveal";
import { audiences } from "@/lib/audiences";

const icons = [Store, Boxes, ShoppingCart, Plane];
// Bento: two wide cards and two tall ones, each carrying an example order tag.
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export default function AudienceBento({ n = "05" }: { n?: string | null }) {
  return (
    <section id="who-we-serve" data-chapter="Who we serve" className="section" aria-labelledby="serve-title">
      <div className="wrap">
        <Reveal className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-end mb-14">
          <div>
            <p className="mono-label !text-[12px] text-muted flex items-center gap-4">
              {n && <span className="text-teal-text">{n}</span>} Who we serve
            </p>
            <h2 id="serve-title" className="mt-6 text-[clamp(36px,4.6vw,64px)]">One item or a container load.</h2>
          </div>
          <p className="text-muted text-[19px] max-w-[30em] lg:pb-2">
            Individuals, small businesses, retailers, wholesalers and e-commerce businesses. Pick the one that sounds like
            you.
          </p>
        </Reveal>
        <ul className="grid lg:grid-cols-12 gap-4">
          {audiences.map((a, i) => {
            const Icon = icons[i];
            const dark = i === 0 || i === 3;
            return (
              <Reveal as="li" key={a.slug} delay={i * 0.06} className={spans[i]}>
                <Link
                  href={`/for/${a.slug}`}
                  className={`group relative flex flex-col h-full min-h-[300px] rounded-[8px] p-7 md:p-9 overflow-hidden border transition-colors duration-500 ${
                    dark ? "bg-ink text-white border-ink hover:border-teal/60" : "bg-white border-line hover:border-text"
                  }`}
                >
                  {dark && <span aria-hidden="true" className="absolute inset-0 grid-lines opacity-20 [mask-image:radial-gradient(60%_70%_at_100%_100%,#000,transparent_75%)]" />}
                  <span className="relative flex items-start justify-between">
                    <span className={`grid place-items-center w-11 h-11 rounded-[6px] ${dark ? "bg-ink-3 text-gold" : "bg-gold-soft text-gold-text"}`}>
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <ArrowUpRight size={20} aria-hidden="true" className={`transition-transform duration-300 group-hover:rotate-45 ${dark ? "text-teal" : "text-teal-text"}`} />
                  </span>
                  <span className="relative mt-8 block text-[clamp(24px,2.2vw,30px)] tracking-[-0.03em] leading-tight">{a.title}</span>
                  <span className={`relative mt-3 block text-[16px] max-w-[30em] ${dark ? "text-muted-dark" : "text-muted"}`}>{a.short}</span>
                  {/* Example order tag */}
                  <span
                    className={`relative mt-auto pt-8 grid grid-cols-[auto_1fr_auto] items-center gap-3 font-mono text-[12px] tracking-[0.04em] ${
                      dark ? "text-muted-dark" : "text-muted"
                    }`}
                  >
                    <span className={`px-2 py-1 rounded-[3px] border ${dark ? "border-ink-line" : "border-line"}`}>{a.example.from}</span>
                    <span className="relative h-px border-t border-dashed border-current opacity-60">
                      <span className={`absolute -top-[3px] left-0 w-1.5 h-1.5 rounded-full transition-[left] duration-700 group-hover:left-[calc(100%-6px)] ${dark ? "bg-teal" : "bg-teal-text"}`} />
                    </span>
                    <span className={`px-2 py-1 rounded-[3px] border ${dark ? "border-ink-line" : "border-line"}`}>{a.example.to}</span>
                    <span className="col-span-3 normal-case">
                      e.g. {a.example.what}, {a.example.qty} <span className="opacity-70">· example</span>
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
