import React, { useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle, Loader2, Send } from "lucide-react";
import { firstTouch, track } from "../lib/analytics";
import { SERVICES } from "../Data/services";
import { COMPANY } from "../Data/company";

const FORMSPREE = "https://formspree.io/f/xnngvgpd";

const field =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-teal-400/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-teal-400/10";
const label = "mb-1.5 block text-sm font-medium text-slate-300";

// What the visitor needs. Values are stable keys used in the email subject and analytics.
const INTERESTS = [
  ["project", "A new software project"],
  ...SERVICES.map((s) => [s.slug, s.name]),
  ["government", "Government / public sector requirement"],
  ["school", "Infovion School ERP — demo for my school"],
  ["jms", "Infovion JMS — demo for my jewellery store"],
  ["other", "Something else"],
];

const BUDGETS = ["Not sure yet", "Under ₹1 lakh", "₹1 – 5 lakh", "₹5 – 15 lakh", "₹15 lakh+", "International project (USD/EUR)"];
const ORG_LABEL = { school: ["School name", "e.g. Gyan Ganga Vidyalaya"], jms: ["Store name", "e.g. Shree Jewellers"], government: ["Department / organisation", "e.g. Municipal Corporation"] };

const EMPTY = { name: "", org: "", email: "", phone: "", interest: "project", budget: "", message: "", website: "" };

/** One enquiry form for every lead — projects, product demos and government requirements. */
export default function ContactForm({ defaultInterest }) {
  const [form, setForm] = useState({ ...EMPTY, interest: defaultInterest || "project" });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle"); // idle | sending | done | error

  // Preselect from the URL: /contact?service=web-development or ?interest=school
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const pick = q.get("service") || q.get("interest");
    if (pick && INTERESTS.some(([k]) => k === pick)) setForm((f) => ({ ...f, interest: pick }));
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const isProduct = form.interest === "school" || form.interest === "jms";
  const [orgLabel, orgPh] = ORG_LABEL[form.interest] ?? ["Company / organisation", "e.g. Patil Traders Pvt Ltd"];

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "A valid email";
    const digits = form.phone.replace(/\D/g, "");
    const intl = form.phone.trim().startsWith("+") && !form.phone.trim().startsWith("+91");
    if (intl ? digits.length < 8 || digits.length > 15 : !/^[6-9]\d{9}$/.test(digits.slice(-10))) e.phone = intl ? "A valid phone number with country code" : "A 10-digit mobile number (or +country code)";
    if (isProduct && form.org.trim().length < 3) e.org = orgLabel;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (form.website) { setState("done"); return; } // bot trap
    if (!validate()) return;
    setState("sending");
    try {
      const { website: _bot, ...data } = form;
      const what = INTERESTS.find(([k]) => k === data.interest)?.[1] ?? data.interest;
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ _subject: `New enquiry — ${what} — ${data.org || data.name}`, ...data, interest: what, page: window.location.pathname, source: firstTouch() }),
      });
      if (!res.ok) throw new Error("failed");
      track("generate_lead", { form: "enquiry", interest: data.interest });
      setState("done");
      setForm({ ...EMPTY, interest: data.interest });
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="py-10 text-center" role="status">
        <CheckCircle2 className="mx-auto h-14 w-14 text-teal-300" />
        <h3 className="mt-5 font-display text-2xl font-extrabold text-white">Thank you — we'll be in touch soon</h3>
        <p className="mx-auto mt-3 max-w-sm text-slate-400">We reply within one working day, usually much sooner. For anything urgent, WhatsApp {COMPANY.whatsapp}.</p>
        <button type="button" onClick={() => setState("idle")} className="mt-6 text-sm text-teal-300 underline">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div>
        <label htmlFor="interest" className={label}>What do you need? *</label>
        <select id="interest" className={`${field} appearance-none`} value={form.interest} onChange={set("interest")}>
          {INTERESTS.map(([k, v]) => <option key={k} value={k} className="bg-[#0b1220]">{v}</option>)}
        </select>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Your name *</label>
          <input id="name" className={field} value={form.name} onChange={set("name")} autoComplete="name" placeholder="e.g. Rajesh Kulkarni" aria-invalid={!!errors.name} />
          {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="org" className={label}>{orgLabel}{isProduct ? " *" : ""}</label>
          <input id="org" className={field} value={form.org} onChange={set("org")} autoComplete="organization" placeholder={orgPh} aria-invalid={!!errors.org} />
          {errors.org && <p className="mt-1 text-xs text-rose-400">{errors.org}</p>}
        </div>
        <div>
          <label htmlFor="email" className={label}>Email *</label>
          <input id="email" type="email" className={field} value={form.email} onChange={set("email")} autoComplete="email" placeholder="you@company.com" aria-invalid={!!errors.email} />
          {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={label}>Phone / WhatsApp *</label>
          <input id="phone" type="tel" className={field} value={form.phone} onChange={set("phone")} inputMode="tel" autoComplete="tel" placeholder="98765 43210 or +971 50 123 4567" aria-invalid={!!errors.phone} />
          {errors.phone && <p className="mt-1 text-xs text-rose-400">{errors.phone}</p>}
        </div>
        {!isProduct && (
          <div className="sm:col-span-2">
            <label htmlFor="budget" className={label}>Budget <span className="font-normal text-slate-500">(optional)</span></label>
            <select id="budget" className={`${field} appearance-none`} value={form.budget} onChange={set("budget")}>
              <option value="" className="bg-[#0b1220]">Choose a range</option>
              {BUDGETS.map((b) => <option key={b} value={b} className="bg-[#0b1220]">{b}</option>)}
            </select>
          </div>
        )}
        <div className="sm:col-span-2">
          <label htmlFor="message" className={label}>{isProduct ? "Anything we should know?" : "Tell us about the project"} <span className="font-normal text-slate-500">(optional)</span></label>
          <textarea id="message" rows={4} className={field} value={form.message} onChange={set("message")}
            placeholder={form.interest === "school" ? "Board, number of students, what's hardest in your office today…" : form.interest === "jms" ? "Number of counters, do you do girvi, GST or non-GST billing…" : "What should the software do, who will use it, any deadline or tender reference…"} />
        </div>
        <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} className="hidden" aria-hidden="true" />
      </div>

      {state === "error" && (
        <div className="flex items-start gap-2 rounded-xl border border-rose-400/30 bg-rose-400/[0.07] px-4 py-3 text-sm text-rose-200" role="alert">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" /> Something went wrong. Please WhatsApp {COMPANY.whatsapp}, call {COMPANY.phone} or email {COMPANY.email}.
        </div>
      )}

      <button type="submit" disabled={state === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 px-6 py-4 text-sm font-bold text-[#04121a] shadow-[0_0_50px_-10px_rgba(45,212,191,0.8)] transition hover:brightness-110 disabled:opacity-60">
        {state === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <><Send className="h-4 w-4" /> {isProduct ? "Book my free demo" : "Send my enquiry"}</>}
      </button>
      <p className="text-center text-xs text-slate-500">We never share your details. Reply within one working day.</p>
    </form>
  );
}
