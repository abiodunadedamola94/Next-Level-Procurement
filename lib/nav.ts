// The site map: every top-level menu opens to its own pages.
// Pattern: grouped mega menu (labelled columns + one feature card), borrowed as a pattern only.
import { services, starterKit } from "@/lib/services";
import { routes } from "@/lib/routes";
import { audiences } from "@/lib/audiences";

export type NavItem = { label: string; href: string; desc?: string; code?: string };
export type NavGroup = { title: string; items: NavItem[] };
export type NavFeature = { eyebrow: string; title: string; text: string; href: string; cta: string; kind: "kit" | "map" | "quote" };
export type NavMenu = { label: string; href: string; groups: NavGroup[]; feature: NavFeature };

export const navMenus = (showBlog: boolean): NavMenu[] => [
  {
    label: "Services",
    href: "/services",
    groups: [
      {
        title: "What we do",
        items: [
          ...services.map((s, i) => ({ label: s.title, href: `/services/${s.slug}`, desc: s.short, code: `0${i + 1}` })),
          { label: "All services", href: "/services", desc: "The three areas side by side.", code: "→" },
        ],
      },
    ],
    feature: {
      eyebrow: "Guide · PDF · $20",
      title: starterKit.title,
      text: "The plain-English guide to importing from China yourself.",
      href: "/starter-kit",
      cta: "See the StarterKit",
      kind: "kit",
    },
  },
  {
    label: "Where we buy",
    href: "/routes",
    groups: [
      {
        title: "Buy from",
        items: routes.map((r) => ({ label: r.name === "the UK" ? "The UK" : r.name, href: `/routes/${r.slug}`, desc: r.short, code: r.code })),
      },
    ],
    feature: {
      eyebrow: "Delivered to",
      title: "The UK, Nigeria and beyond",
      text: "From anywhere in the world to anywhere.",
      href: "/routes",
      cta: "See every route",
      kind: "map",
    },
  },
  {
    label: "Who we serve",
    href: "/for",
    groups: [
      {
        title: "Built for",
        items: audiences.map((a, i) => ({ label: a.title, href: `/for/${a.slug}`, desc: a.short, code: `0${i + 1}` })),
      },
    ],
    feature: {
      eyebrow: "Not sure where you fit?",
      title: "Tell us what you need",
      text: "One item or a container. We reply with a quote.",
      href: "/quote",
      cta: "Request a quote",
      kind: "quote",
    },
  },
  {
    label: "How it works",
    href: "/how-it-works",
    groups: [
      {
        title: "Working with us",
        items: [
          { label: "The process", href: "/how-it-works", desc: "Four steps from your request to delivery." },
          { label: "Questions", href: "/faq", desc: "What people ask before they order." },
          { label: "Request a quote", href: "/quote", desc: "Tell us what you need, we reply." },
        ],
      },
      {
        title: "Learn",
        items: [
          { label: "Made in China Importation StarterKit", href: "/starter-kit", desc: "Our $20 PDF guide to importing from China." },
          ...(showBlog ? [{ label: "Guides", href: "/blog", desc: "Sourcing and importing, explained simply." }] : []),
        ],
      },
    ],
    feature: {
      eyebrow: "Step 01",
      title: "It starts with one message",
      text: "Send what you need on WhatsApp or the quote form.",
      href: "/quote",
      cta: "Start a request",
      kind: "quote",
    },
  },
  {
    label: "Company",
    href: "/about",
    groups: [
      {
        title: "Next Level Procurement",
        items: [
          { label: "About us", href: "/about", desc: "Who we are and how we work." },
          { label: "Our values", href: "/about#values", desc: "Trust, diligence and integrity." },
          { label: "Reviews", href: "/reviews", desc: "What customers say, from Trustpilot." },
          { label: "Contact", href: "/contact", desc: "WhatsApp, phone and email." },
        ],
      },
    ],
    feature: {
      eyebrow: "Our motto",
      title: "Smarter Buying, Delivering Value.",
      text: "A structured procurement ecosystem built on trust.",
      href: "/about",
      cta: "Read about us",
      kind: "quote",
    },
  },
];
