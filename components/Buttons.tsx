import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

const primary =
  "inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-7 py-3.5 rounded-lg transition-all hover:shadow-lg hover:shadow-teal/20 glow-teal";
const secondary =
  "inline-flex items-center justify-center gap-2 border border-border text-foreground hover:border-teal/50 hover:text-teal font-semibold px-7 py-3.5 rounded-lg transition-all bg-secondary/30";

export function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={primary}>
      {children} <ArrowRight size={18} />
    </a>
  ) : (
    <Link href={href} className={primary}>
      {children} <ArrowRight size={18} />
    </Link>
  );
}

export function WhatsAppLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={secondary}>
      <MessageCircle size={18} /> {children}
    </a>
  );
}
