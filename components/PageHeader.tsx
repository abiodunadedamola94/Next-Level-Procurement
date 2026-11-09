import Link from "next/link";

type Crumb = { label: string; href?: string };

// Ink header for inner pages: blueprint grid, waybill breadcrumb, gold square eyebrow.
// `aside` takes an artifact (a service sheet, a price card) shown to the right on desktop.
export default function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden bg-ink text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_70%_80%_at_75%_30%,#000_15%,transparent_75%)]"
      />
      <div className={`relative wrap pt-28 md:pt-40 pb-14 md:pb-24 ${aside ? "grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20 items-end" : ""}`}>
        <div className="min-w-0">
          {crumbs && (
            <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 mono-label text-muted-dark">
                {crumbs.map((c, i) => (
                  <li key={c.label} className="flex items-center gap-2">
                    {c.href ? (
                      <Link href={c.href} className="inline-block hover:text-white transition-colors py-3 -my-2">
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-white py-1">{c.label}</span>
                    )}
                    {i < crumbs.length - 1 && <span aria-hidden="true" className="text-[#8f97a3]">/</span>}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <p className="mono-label text-teal inline-flex items-center gap-2.5">
            <span aria-hidden="true" className="w-2 h-2 rounded-[2px] bg-gold" />
            {eyebrow}
          </p>
          <h1 className="mt-4 sm:mt-5 text-[clamp(38px,6vw,76px)] max-w-[14ch]">{title}</h1>
          {lead && <p className="mt-5 sm:mt-6 text-muted-dark text-[17px] sm:text-[clamp(18px,1.6vw,20px)] max-w-[34em]">{lead}</p>}
          {children && <div className="mt-8 sm:mt-9 flex flex-col sm:flex-row flex-wrap gap-3">{children}</div>}
        </div>
        {aside && <div className="min-w-0">{aside}</div>}
      </div>
    </header>
  );
}
