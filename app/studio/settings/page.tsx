"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, MessageCircle, Mail, Globe, Search, Plus, X, RotateCcw, FlaskConical } from "lucide-react";
import { useStudio } from "@/components/studio/store";
import { btn } from "@/components/studio/ui";

function Toggle({ id, label, hint, on, onChange, locked }: { id: string; label: string; hint?: string; on: boolean; onChange?: (v: boolean) => void; locked?: boolean }) {
  return (
    <div className="flex items-start gap-4 py-4">
      <div className="flex-1">
        <label htmlFor={id} className="text-[15.5px] font-medium flex items-center gap-2">{locked && <Lock size={14} aria-hidden="true" className="text-muted" />}{label}</label>
        {hint && <p className="mt-0.5 text-[14px] text-muted">{hint}</p>}
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={on}
        disabled={locked}
        onClick={() => onChange?.(!on)}
        className={`relative shrink-0 w-[52px] h-8 rounded-full transition-colors disabled:cursor-not-allowed ${on ? "bg-teal-text" : "bg-[#c7ccd3]"} ${locked ? "opacity-70" : ""}`}
      >
        <span className={`absolute left-0 top-1 w-6 h-6 rounded-full bg-white shadow transition-transform ${on ? "translate-x-[24px]" : "translate-x-1"}`} />
        <span className="sr-only">{on ? "On" : "Off"}</span>
      </button>
    </div>
  );
}

function Card({ title, children, id }: { title: string; children: React.ReactNode; id: string }) {
  return (
    <section aria-labelledby={id} className="rounded-[12px] border border-line bg-white px-5 py-2">
      <h2 id={id} className="pt-4 text-[18px] font-semibold tracking-tight">{title}</h2>
      <div className="divide-y divide-line">{children}</div>
    </section>
  );
}

const sel = "border border-line rounded-[6px] px-3 min-h-11 bg-white text-[15px] focus:outline-none focus:border-text focus:ring-4 focus:ring-teal/25";

export default function SettingsPage() {
  const { state, updateSettings, reset, toast } = useStudio();
  const router = useRouter();
  const st = state.settings;
  const [rule, setRule] = useState("");

  return (
    <div className="max-w-[760px]">
      <h1 className="text-[32px] md:text-[44px]">Settings</h1>
      <p className="mt-3 text-[17px] text-muted">How we tell you about drafts, how often you post, and the rules every post follows.</p>

      <div className="mt-8 space-y-5">
        <Card title="Tell me when a draft is ready" id="s-notify">
          <Toggle id="n-wa" label="On WhatsApp" hint="A short message with a link to read it." on={st.notifyWhatsApp} onChange={(v) => updateSettings({ notifyWhatsApp: v })} />
          <Toggle id="n-em" label="By email" hint="To link@nextlevelprocurements.com" on={st.notifyEmail} onChange={(v) => updateSettings({ notifyEmail: v })} />
          <div className="flex items-start gap-4 py-4">
            <div className="flex-1">
              <label htmlFor="n-rem" className="text-[15.5px] font-medium">Remind me if I haven&apos;t looked</label>
              <p className="mt-0.5 text-[14px] text-muted">One reminder only. We never chase twice.</p>
            </div>
            <select id="n-rem" value={st.reminderAfterDays} onChange={(e) => updateSettings({ reminderAfterDays: Number(e.target.value) })} className={sel}>
              <option value={0}>Never</option><option value={1}>After 1 day</option><option value={2}>After 2 days</option><option value={3}>After 3 days</option>
            </select>
          </div>
          <Toggle id="n-week" label="Monday summary" hint="What went live, what people searched, what is next." on={st.weeklySummary} onChange={(v) => updateSettings({ weeklySummary: v })} />
        </Card>

        <Card title="Approval" id="s-approve">
          <Toggle id="a-lock" label="Nothing publishes without your approval" hint="Built in. It cannot be switched off, by you or by us." on locked />
          <div className="py-4 text-[15px]">
            <p className="font-medium">Who can do what</p>
            <ul className="mt-2 space-y-2">
              <li><span className="block">Dorcas</span><span className="block text-[14px] text-muted">link@nextlevelprocurements.com</span><span className="block text-teal-text font-medium">Approves and publishes</span></li>
              <li><span className="block">MoCreative Concept</span><span className="block text-muted">Writes and checks drafts. Cannot publish.</span></li>
            </ul>
          </div>
        </Card>

        <Card title="Posting rhythm" id="s-rhythm">
          <div className="py-4 grid sm:grid-cols-3 gap-3">
            <label className="text-[14px] text-muted">How often
              <select value={st.rhythm} onChange={(e) => updateSettings({ rhythm: e.target.value as typeof st.rhythm })} className={`${sel} mt-1.5 w-full text-text`}>
                <option value="1-week">One post a week</option><option value="2-week">One every two weeks</option><option value="1-month">One a month</option>
              </select>
            </label>
            <label className="text-[14px] text-muted">Posting day
              <select value={st.publishDay} onChange={(e) => updateSettings({ publishDay: e.target.value })} className={`${sel} mt-1.5 w-full text-text`}>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => <option key={d}>{d}</option>)}
              </select>
            </label>
            <label className="text-[14px] text-muted">Time (UK)
              <input type="time" value={st.publishTime} onChange={(e) => updateSettings({ publishTime: e.target.value })} className={`${sel} mt-1.5 w-full text-text`} />
            </label>
          </div>
          <p className="py-3 text-[14px] text-muted">Drafts reach you two days before the posting day, so there is time to read them.</p>
        </Card>

        <Card title="House rules for every post" id="s-rules">
          <ul className="py-3 space-y-1">
            {st.houseRules.map((r) => (
              <li key={r} className="flex items-center gap-3 text-[15px] min-h-11">
                <span className="flex-1">{r}</span>
                <button onClick={() => updateSettings({ houseRules: st.houseRules.filter((x) => x !== r) })} aria-label={`Remove rule: ${r}`} className="grid place-items-center w-11 h-11 rounded-full text-muted hover:text-text hover:bg-black/[0.04]"><X size={16} aria-hidden="true" /></button>
              </li>
            ))}
          </ul>
          <form onSubmit={(e) => { e.preventDefault(); if (!rule.trim()) return; updateSettings({ houseRules: [...st.houseRules, rule.trim()] }); setRule(""); toast({ text: "Rule added. Every new draft is checked against it." }); }} className="py-4 flex gap-2">
            <label htmlFor="r-new" className="sr-only">New rule</label>
            <input id="r-new" value={rule} onChange={(e) => setRule(e.target.value)} placeholder="e.g. Always say we deliver to the UK and Nigeria" className={`${sel} flex-1 min-w-0`} />
            <button className={`${btn.ghost} !min-h-11 shrink-0`}><Plus size={16} aria-hidden="true" /> Add</button>
          </form>
        </Card>

        <Card title="Connected" id="s-conn">
          <div className="flex items-center gap-3 py-4 text-[15px]"><Globe size={18} aria-hidden="true" /><span className="flex-1">nextlevelprocurements.com</span><span className="text-teal-text font-medium">Connected</span></div>
          <div className="flex items-center gap-3 py-4 text-[15px]"><Search size={18} aria-hidden="true" /><span className="flex-1">Google Search Console</span><span className="text-gold-text font-medium">Verifying</span></div>
          <div className="flex items-center gap-3 py-4 text-[15px]"><MessageCircle size={18} aria-hidden="true" /><span className="flex-1">WhatsApp alerts to +44 7346 485225</span><span className="text-muted">Paid engine</span></div>
          <div className="flex items-center gap-3 py-4 text-[15px]"><Mail size={18} aria-hidden="true" /><span className="flex-1">Email alerts to link@</span><span className="text-muted">Paid engine</span></div>
        </Card>

        <section aria-labelledby="s-proto" className="rounded-[12px] border border-dashed border-[#b8bec7] px-5 py-4">
          <h2 id="s-proto" className="text-[16px] font-semibold flex items-center gap-2"><FlaskConical size={17} aria-hidden="true" /> Prototype controls</h2>
          <p className="mt-1 text-[14px] text-muted">For trying the screens. These are not in the real studio.</p>
          <Toggle id="p-fail" label="Make the next publish fail" hint="Shows what you see if the website does not answer." on={st.failNextPublish} onChange={(v) => updateSettings({ failNextPublish: v })} />
          <div className="flex flex-wrap gap-2 pb-2">
            <button onClick={() => { reset(); toast({ text: "Sample data reset." }); router.push("/studio"); }} className={btn.ghost}><RotateCcw size={16} aria-hidden="true" /> Reset sample data</button>
          </div>
        </section>
      </div>
    </div>
  );
}
