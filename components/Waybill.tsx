import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getService } from "@/lib/services";

// A waybill-style summary card for page headers: rows of label / value, then the services that apply.
export function Waybill({
  title,
  meta,
  rows,
  note,
}: {
  title: string;
  meta: string;
  rows: { k: string; v: string }[];
  note?: string;
}) {
  return (
    <div className="rounded-[8px] border border-ink-line bg-ink-2 overflow-hidden shadow-[0_40px_80px_-40px_rgba(0,0,0,.85)]">
      <div className="h-1 bg-gold" aria-hidden="true" />
      <div className="p-6 md:p-7">
        <div className="flex justify-between mono-label !text-[11px] text-muted-dark">
          <span>{meta}</span>
          <span>Next Level Procurement</span>
        </div>
        <p className="mt-3 text-[21px] tracking-tight">{title}</p>
        <dl className="mt-5 font-mono text-[13px]">
          {rows.map((r) => (
            <div key={r.k} className="grid grid-cols-[92px_1fr] gap-3 py-2.5 border-t border-ink-line">
              <dt className="text-muted-dark uppercase tracking-[0.08em] text-[11px] pt-0.5">{r.k}</dt>
              <dd className="text-white">{r.v}</dd>
            </div>
          ))}
        </dl>
        {note && <p className="mt-4 text-[12.5px] text-muted-dark">{note}</p>}
      </div>
    </div>
  );
}

// Cards for the services that apply to a route or an audience.
export function ServiceCards({ slugs }: { slugs: string[] }) {
  return (
    <ul className="grid md:grid-cols-2 gap-4">
      {slugs.map((slug, i) => {
        const s = getService(slug);
        if (!s) return null;
        return (
          <li key={slug}>
            <Link href={`/services/${s.slug}`} className="group flex flex-col h-full rounded-[8px] border border-line bg-white p-7 hover:border-text transition-colors">
              <span className="flex items-center justify-between mono-label !text-[11px] text-muted">
                0{i + 1} · Service
                <ArrowUpRight size={18} aria-hidden="true" className="text-teal-text transition-transform duration-300 group-hover:rotate-45" />
              </span>
              <span className="mt-6 text-[24px] tracking-[-0.03em] leading-tight">{s.title}</span>
              <span className="mt-2 text-[16px] text-muted">{s.short}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
