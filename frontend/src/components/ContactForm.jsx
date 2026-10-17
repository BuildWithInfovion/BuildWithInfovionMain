import React, { useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle, Loader2, Send } from "lucide-react";
import { firstTouch, track } from "../lib/analytics";
import { SERVICES } from "../Data/services";
import { COMPANY } from "../Data/company";

const FORMSPREE = "https://formspree.io/f/xnngvgpd";

const field =
  "w-full rounded-md border border-white/15 bg-black/30 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-sky-300/70 focus:ring-2 focus:ring-sky-300/20";
const label = "mb-1.5 block text-sm font-medium text-slate-300";

// What the visitor needs. Values are stable keys used in the email subject and analytics.
const INTERESTS = [
  ["project", "A new software project"],
  ...SERVICES.map((s) => [s.slug, s.name]),
  ["government", "Government or public sector requirement"],
  ["school", "Infovion School ERP: demonstration for a school"],
  ["jms", "Infovion JMS: demonstration for a jewellery store"],
  ["other", "Other enquiry"],
];

const BUDGETS = ["Not yet decided", "Under ₹1 lakh", "₹1 to 5 lakh", "₹5 to 15 lakh", "Above ₹15 lakh", "International project (USD or EUR)"];
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
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Please enter a valid email address.";
    const digits = form.phone.replace(/\D/g, "");
    const intl = form.phone.trim().startsWith("+") && !form.phone.trim().startsWith("+91");
    if (intl ? digits.length < 8 || digits.length > 15 : !/^[6-9]\d{9}$/.test(digits.slice(-10))) e.phone = intl ? "Please enter a valid number with the country code." : "Please enter a 10-digit mobile number, or include the country code.";
    if (isProduct && form.org.trim().length < 3) e.org = `Please enter the ${orgLabel.toLowerCase()}.`;
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
        <CheckCircle2 className="mx-auto h-12 w-12 text-sky-300" />
        <h3 className="mt-5 font-display text-2xl font-semibold text-white">Thank you for your enquiry</h3>
        <p className="mx-auto mt-3 max-w-sm text-slate-400">We will respond within one business day. For urgent matters, please call {COMPANY.phone}.</p>
        <button type="button" onClick={() => setState("idle")} className="mt-6 text-sm text-sky-300 underline underline-offset-2">Send another enquiry</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div>
        <label htmlFor="interest" className={label}>Enquiry type *</label>
        <select id="interest" className={`${field} appearance-none`} value={form.interest} onChange={set("interest")}>
          {INTERESTS.map(([k, v]) => <option key={k} value={k} className="bg-[#0b1220]">{v}</option>)}
        </select>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Name *</label>
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
          <label htmlFor="phone" className={label}>Phone *</label>
          <input id="phone" type="tel" className={field} value={form.phone} onChange={set("phone")} inputMode="tel" autoComplete="tel" placeholder="98765 43210 or +971 50 123 4567" aria-invalid={!!errors.phone} />
          {errors.phone && <p className="mt-1 text-xs text-rose-400">{errors.phone}</p>}
        </div>
        {!isProduct && (
          <div className="sm:col-span-2">
            <label htmlFor="budget" className={label}>Budget <span className="font-normal text-slate-400">(optional)</span></label>
            <select id="budget" className={`${field} appearance-none`} value={form.budget} onChange={set("budget")}>
              <option value="" className="bg-[#0b1220]">Select a range</option>
              {BUDGETS.map((b) => <option key={b} value={b} className="bg-[#0b1220]">{b}</option>)}
            </select>
          </div>
        )}
        <div className="sm:col-span-2">
          <label htmlFor="message" className={label}>{isProduct ? "Additional information" : "Project description"} <span className="font-normal text-slate-400">(optional)</span></label>
          <textarea id="message" rows={4} className={field} value={form.message} onChange={set("message")}
            placeholder={form.interest === "school" ? "Board, number of students, and the processes you would like to manage" : form.interest === "jms" ? "Number of counters, whether you offer girvi, and GST or non-GST billing" : "Objectives, intended users, timeline and any tender reference"} />
        </div>
        <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} className="hidden" aria-hidden="true" />
      </div>

      {state === "error" && (
        <div className="flex items-start gap-2 rounded-md border border-rose-400/30 bg-rose-400/[0.07] px-4 py-3 text-sm text-rose-200" role="alert">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" /> The enquiry could not be sent. Please email {COMPANY.email} or call {COMPANY.phone}.
        </div>
      )}

      <button type="submit" disabled={state === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-[#020409] transition-colors hover:bg-sky-100 disabled:opacity-60">
        {state === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending</> : <><Send className="h-4 w-4" /> {isProduct ? "Request a demonstration" : "Send enquiry"}</>}
      </button>
      <p className="text-center text-xs text-slate-400">Your details are used only to respond to this enquiry.</p>
    </form>
  );
}
