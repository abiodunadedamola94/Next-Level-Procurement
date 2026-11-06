import Link from "next/link";

type Crumb = { label: string; href?: string };

export default function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-border bg-background">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 rounded-full bg-teal/5 blur-[100px]" />
      <div className="relative container mx-auto max-w-5xl px-4 md:px-8 pt-32 md:pt-40 pb-14 md:pb-20">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-foreground transition-colors">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-foreground/80">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <span aria-hidden="true">/</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="text-teal font-semibold text-xs uppercase tracking-[0.2em] mb-4">{eyebrow}</p>
        <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-foreground leading-[1.1] tracking-tight max-w-3xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed max-w-2xl">{lead}</p>
        )}
        {children && <div className="mt-8 flex flex-col sm:flex-row gap-4">{children}</div>}
      </div>
    </header>
  );
}
