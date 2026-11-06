"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

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
};

const empty: Fields = { service: "", what: "", quantity: "", from: "", to: "", by: "", name: "", phone: "" };
const sources = ["UK", "China", "Europe", "Turkey", "Africa", "Not sure"];

const input =
  "w-full rounded-lg bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/30 min-h-12";
const label = "block text-sm font-medium text-foreground mb-2";

export default function QuoteForm() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: typeof errors = {};
    if (!f.what.trim()) err.what = "Tell us what you need.";
    if (!f.to.trim()) err.to = "Tell us where it should be delivered.";
    if (!f.name.trim()) err.name = "Tell us your name.";
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
    ].filter(Boolean);
    window.open(waLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`q-${k}-err`} className="mt-2 text-sm text-red-300" role="alert">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={submit} noValidate className="p-6 md:p-8 rounded-xl bg-card border border-border space-y-5">
      <div>
        <label htmlFor="q-service" className={label}>Service</label>
        <select id="q-service" value={f.service} onChange={set("service")} className={input}>
          <option value="">Choose one (optional)</option>
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
          <label htmlFor="q-quantity" className={label}>How many? <span className="text-muted-foreground font-normal">(optional)</span></label>
          <input id="q-quantity" value={f.quantity} onChange={set("quantity")} className={input} placeholder="e.g. 200 cartons" />
        </div>
        <div>
          <label htmlFor="q-from" className={label}>Buying from <span className="text-muted-foreground font-normal">(optional)</span></label>
          <select id="q-from" value={f.from} onChange={set("from")} className={input}>
            <option value="">Choose one</option>
            {sources.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="q-to" className={label}>Deliver to</label>
          <input id="q-to" value={f.to} onChange={set("to")} className={input} placeholder="City and country" autoComplete="address-level2" aria-invalid={!!errors.to} aria-describedby={errors.to ? "q-to-err" : undefined} />
          {err("to")}
        </div>
        <div>
          <label htmlFor="q-by" className={label}>Needed by <span className="text-muted-foreground font-normal">(optional)</span></label>
          <input id="q-by" type="date" value={f.by} onChange={set("by")} className={input} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="q-name" className={label}>Your name</label>
          <input id="q-name" value={f.name} onChange={set("name")} className={input} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "q-name-err" : undefined} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="q-phone" className={label}>WhatsApp number <span className="text-muted-foreground font-normal">(optional)</span></label>
          <input id="q-phone" type="tel" value={f.phone} onChange={set("phone")} className={input} autoComplete="tel" inputMode="tel" />
        </div>
      </div>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-7 py-4 rounded-lg transition-all hover:shadow-lg hover:shadow-teal/20 glow-teal"
      >
        <MessageCircle size={18} /> Send on WhatsApp
      </button>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        {sent
          ? "WhatsApp should now be open with your request written out. Press send there and we'll reply."
          : "This opens WhatsApp with your answers written out. Nothing is stored on this website."}{" "}
        Prefer email? <a href={`mailto:${EMAIL}`} className="text-teal hover:text-teal-light">{EMAIL}</a>
      </p>
    </form>
  );
}
