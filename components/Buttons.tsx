import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

// Waybill buttons: a squared tag with a mono label and the arrow in its own cell.
// `tone` says what the button sits on:
// ink   -> teal primary (7.7:1 with ink text), ghost with a light border
// paper -> ink primary, ghost with a line border (teal fill is kept for ink)
type Tone = "ink" | "paper";

const styles = {
  primary: {
    ink: "btn bg-teal text-ink hover:bg-teal-hover",
    paper: "btn bg-ink text-white hover:bg-ink-3",
  },
  ghost: {
    ink: "btn border-[#3a3e48] text-white hover:border-teal hover:bg-white/[0.04]",
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

export function ArrowCell({ tone = "ink" }: { tone?: Tone }) {
  return (
    <span
      aria-hidden="true"
      className={`grid place-items-center w-7 h-7 -mr-2.5 rounded-[3px] overflow-hidden ${tone === "ink" ? "bg-ink/10" : "bg-white/10"}`}
    >
      <ArrowRight size={15} className="transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-[3px]" />
    </span>
  );
}

export function PrimaryLink({ href, children, tone = "ink", className = "" }: Props) {
  return (
    <Anchor href={href} className={`${styles.primary[tone]} group ${className}`}>
      {children}
      <ArrowCell tone={tone} />
    </Anchor>
  );
}

export function WhatsAppLink({ href, children, tone = "ink", className = "" }: Props) {
  return (
    <Anchor href={href} className={`${styles.ghost[tone]} ${className}`}>
      <MessageCircle size={17} aria-hidden="true" />
      {children}
    </Anchor>
  );
}

export function GhostLink({ href, children, tone = "ink", className = "" }: Props) {
  return (
    <Anchor href={href} className={`${styles.ghost[tone]} group ${className}`}>
      {children}
      <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-[3px]" />
    </Anchor>
  );
}

// A label over a hairline with a circled arrow that turns on hover.
export function LineLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 py-2 border-b mono-label !text-[12px] transition-colors ${
        dark ? "border-white/25 text-white hover:border-teal" : "border-text/25 text-text hover:border-teal-text"
      }`}
    >
      {children}
      <span
        aria-hidden="true"
        className={`grid place-items-center w-6 h-6 rounded-full ${dark ? "bg-white text-ink" : "bg-ink text-white"}`}
      >
        <ArrowRight size={12} className="-rotate-45 transition-transform duration-300 group-hover:rotate-0" />
      </span>
    </Link>
  );
}
