"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle } from "lucide-react";
import Script from "next/script";

import { waLink, EMAIL } from "@/lib/site";
import { services } from "@/lib/services";

type Fields = {
  service: string;
  what: string;
  quantity: string;
  from: string;
  to: string;
  by: string;
  name: string;
  phone: string;
  email: string;
};

const empty: Fields = { service: "", what: "", quantity: "", from: "", to: "", by: "", name: "", phone: "", email: "" };
// The copy that reaches her inbox (MoCreative's site-enquiry function, Supabase). It never blocks WhatsApp.
const ENQUIRY_URL = "https://wphdwifayyfbvgmymoia.supabase.co/functions/v1/site-enquiry";
const sources = ["UK", "China", "Europe", "Africa", "Not sure"];

const input =
  "w-full bg-white border border-line px-4 text-[16px] text-text placeholder:text-[#6b7380] min-h-[52px] transition-[border-color,box-shadow] focus:outline-none focus:border-text focus:ring-4 focus:ring-teal/25 rounded-[4px] aria-[invalid=true]:border-[#b42318]";
const label = "block text-[15px] font-semibold text-text mb-2";
const optional = <span className="font-normal text-muted"> (optional)</span>;

function Group({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="group-sep border-t border-line pt-7 first:border-t-0 first:pt-0">
      <fieldset className="border-0 p-0 m-0 min-w-0">
        <legend className="mono-label text-muted mb-5 flex gap-3 p-0">
          <span className="text-teal-text">{n}</span>
          {title}
        </legend>
        <div className="space-y-5">{children}</div>
      </fieldset>
    </div>
  );
}

export default function QuoteForm() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);
  const params = useSearchParams();

  // Carry over what the visitor already typed (hero, closing band) or the market page they came from.
  useEffect(() => {
    const what = params.get("what") ?? "";
    const from = params.get("from") ?? "";
    const service = params.get("service") ?? "";
    if (what || from || service)
      setF((prev) => ({
        ...prev,
        what: what || prev.what,
        from: sources.includes(from) ? from : prev.from,
        service: services.some((s) => s.title === service) ? service : prev.service,
      }));
  }, [params]);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: typeof errors = {};
    if (!f.what.trim()) err.what = "Tell us what you need.";
    if (!f.to.trim()) err.to = "Tell us where it should be delivered.";
    if (!f.name.trim()) err.name = "Tell us your name.";
    if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) err.email = "Check the email address.";
    else if (!f.phone.trim() && !f.email.trim()) err.phone = "Give us a WhatsApp number or an email so we can reply.";
    setErrors(err);
    if (Object.keys(err).length) {
      document.getElementById(`q-${Object.keys(err)[0]}`)?.focus();
      return;
    }
    const lines = [
      "Hello Next Level Procurement, I'd like a quote.",
      f.service && `Service: ${f.service}`,
      `What I need: ${f.what}`,
      f.quantity && `How many: ${f.quantity}`,
      f.from && `Buying from: ${f.from}`,
      `Deliver to: ${f.to}`,
      f.by && `Needed by: ${f.by}`,
      `Name: ${f.name}`,
      f.phone && `My number: ${f.phone}`,
      f.email && `My email: ${f.email}`,
    ].filter(Boolean);
    // Email copy first. Fire and forget: keepalive lets it finish while WhatsApp takes over.
    const trap = (document.getElementById("q-website") as HTMLInputElement | null)?.value ?? "";
    try {
      fetch(ENQUIRY_URL, {
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ k: "nextlevelprocurement", website: trap, f: { ...f, page: window.location.pathname } }),
      }).catch(() => {});
    } catch {}
    window.open(waLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    // Site counter (MoCreative kit): records that a quote was sent. Nothing typed goes with it.
    (window as unknown as { mcCount?: (e: string) => void }).mcCount?.("finish");
    setSent(true);
  };

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`q-${k}-err`} className="mt-2 text-[14px] font-medium text-[#b42318]" role="alert">
        {errors[k]}
      </p>
    ) : null;

  return (
    <>
    {/* Counts form seen, started and sent, by day. No cookie, nothing about the visitor. */}
    <Script src="/count.js" data-site="nextlevelprocurement" data-form="#form" data-manual="" strategy="afterInteractive" />
    <form id="form" onSubmit={submit} noValidate className="relative rounded-[8px] bg-white border border-line p-6 md:p-10 space-y-7 scroll-mt-28">
      <Group n="01" title="What you need">
        <div>
          <label htmlFor="q-service" className={label}>Service{optional}</label>
          <select id="q-service" value={f.service} onChange={set("service")} className={input}>
            <option value="">Choose one</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>{s.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="q-what" className={label}>What do you need?</label>
          <input id="q-what" value={f.what} onChange={set("what")} className={input} placeholder="e.g. disposable gloves, phone accessories" aria-invalid={!!errors.what} aria-describedby={errors.what ? "q-what-err" : undefined} />
          {err("what")}
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="q-quantity" className={label}>How many?{optional}</label>
            <input id="q-quantity" value={f.quantity} onChange={set("quantity")} className={input} placeholder="e.g. 200 cartons" />
          </div>
          <div>
            <label htmlFor="q-from" className={label}>Buying from{optional}</label>
            <select id="q-from" value={f.from} onChange={set("from")} className={input}>
              <option value="">Choose one</option>
              {sources.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </Group>

      <Group n="02" title="Where it goes">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="q-to" className={label}>Deliver to</label>
            <input id="q-to" value={f.to} onChange={set("to")} className={input} placeholder="City and country" autoComplete="address-level2" aria-invalid={!!errors.to} aria-describedby={errors.to ? "q-to-err" : undefined} />
            {err("to")}
          </div>
          <div>
            <label htmlFor="q-by" className={label}>Needed by{optional}</label>
            <input id="q-by" type="date" value={f.by} onChange={set("by")} className={input} />
          </div>
        </div>
      </Group>

      <Group n="03" title="Who you are">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="q-name" className={label}>Your name</label>
            <input id="q-name" value={f.name} onChange={set("name")} className={input} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "q-name-err" : undefined} />
            {err("name")}
          </div>
        </div>
        <p id="q-contact-hint" className="text-[14.5px] text-muted">How should we reply? Give us at least one.</p>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="q-phone" className={label}>WhatsApp number</label>
            <input id="q-phone" type="tel" value={f.phone} onChange={set("phone")} className={input} autoComplete="tel" inputMode="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "q-contact-hint q-phone-err" : "q-contact-hint"} />
            {err("phone")}
          </div>
          <div>
            <label htmlFor="q-email" className={label}>Email</label>
            <input id="q-email" type="email" value={f.email} onChange={set("email")} className={input} autoComplete="email" inputMode="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "q-contact-hint q-email-err" : "q-contact-hint"} />
            {err("email")}
          </div>
        </div>
        {/* Hidden from people; a bot that fills it is ignored. */}
        <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
          <label htmlFor="q-website">Leave this empty</label>
          <input id="q-website" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>
      </Group>

      <div className="pt-2">
        <button type="submit" className="btn w-full bg-ink text-white hover:bg-ink-3 min-h-14 text-[17px]">
          <MessageCircle size={19} aria-hidden="true" /> Send request
        </button>
        <p className="mt-4 text-[14.5px] text-muted" aria-live="polite">
          {sent
            ? "We have your request by email. WhatsApp should now be open with it written out too: press send there for the quickest reply."
            : "We get your request by email straight away, and WhatsApp opens with it written out so you can send it there too."}{" "}
          Questions first?{" "}
          <a href={`mailto:${EMAIL}`} className="text-teal-text underline underline-offset-4 hover:text-text">
            {EMAIL}
          </a>
        </p>
      </div>
    </form>
    </>
  );
}
