import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

// Pill buttons. `tone` says what the button sits on:
// ink   -> teal primary (7.7:1 with ink text), ghost with a light border
// paper -> ink primary, ghost with a line border (teal fill is kept for ink)
type Tone = "ink" | "paper";

const styles = {
  primary: {
    ink: "btn bg-teal text-ink hover:bg-teal-hover",
    paper: "btn bg-ink text-white hover:bg-ink-3",
  },
  ghost: {
    ink: "btn border-[#3a3e48] text-white hover:border-teal",
    paper: "btn border-line bg-white text-text hover:border-text",
  },
};

function Anchor({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  return href.startsWith("http") ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

type Props = { href: string; children: React.ReactNode; tone?: Tone; className?: string };

export function PrimaryLink({ href, children, tone = "ink", className = "" }: Props) {
  return (
    <Anchor href={href} className={`${styles.primary[tone]} group ${className}`}>
      {children}
      <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5" />
    </Anchor>
  );
}

export function WhatsAppLink({ href, children, tone = "ink", className = "" }: Props) {
  return (
    <Anchor href={href} className={`${styles.ghost[tone]} ${className}`}>
      <MessageCircle size={18} aria-hidden="true" />
      {children}
    </Anchor>
  );
}

export function GhostLink({ href, children, tone = "ink", className = "" }: Props) {
  return (
    <Anchor href={href} className={`${styles.ghost[tone]} ${className}`}>
      {children}
    </Anchor>
  );
}
