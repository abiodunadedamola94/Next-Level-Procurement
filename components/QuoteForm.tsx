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
  "w-full rounded-xl bg-white border border-line px-4 text-[16px] text-text placeholder:text-[#6b7380] min-h-[52px] transition-[border-color,box-shadow] focus:outline-none focus:border-text focus:ring-4 focus:ring-teal/25 aria-[invalid=true]:border-[#b42318]";
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
      <p id={`q-${k}-err`} className="mt-2 text-[14px] font-medium text-[#b42318]" role="alert">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={submit} noValidate className="rounded-[22px] bg-white border border-line p-6 md:p-10 space-y-7">
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
          <div>
            <label htmlFor="q-phone" className={label}>WhatsApp number{optional}</label>
            <input id="q-phone" type="tel" value={f.phone} onChange={set("phone")} className={input} autoComplete="tel" inputMode="tel" />
          </div>
        </div>
      </Group>

      <div className="pt-2">
        <button type="submit" className="btn w-full bg-ink text-white hover:bg-ink-3 min-h-14 text-[17px]">
          <MessageCircle size={19} aria-hidden="true" /> Send on WhatsApp
        </button>
        <p className="mt-4 text-[14.5px] text-muted" aria-live="polite">
          {sent
            ? "WhatsApp should now be open with your request written out. Press send there and we'll reply."
            : "This opens WhatsApp with your answers written out. Nothing is stored on this website."}{" "}
          Prefer email?{" "}
          <a href={`mailto:${EMAIL}`} className="text-teal-text underline underline-offset-4 hover:text-text">
            {EMAIL}
          </a>
        </p>
      </div>
    </form>
  );
}
