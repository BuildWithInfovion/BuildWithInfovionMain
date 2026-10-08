import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, Loader2, Send } from "lucide-react";
import { firstTouch, track } from "../lib/analytics";

const FORMSPREE = "https://formspree.io/f/xnngvgpd";

const field =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-teal-400/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-teal-400/10";
const label = "mb-1.5 block text-sm font-medium text-slate-300";

const EMPTY = { name: "", schoolName: "", email: "", phone: "", message: "", website: "" };

/** Demo request form (dark theme, same look as the free-trial form). */
export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle"); // idle | sending | done | error

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Your name";
    if (form.schoolName.trim().length < 3) e.schoolName = "Your school's name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "A valid email";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, "").slice(-10))) e.phone = "A 10-digit mobile number";
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
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ _subject: `Demo request — ${data.schoolName}`, ...data, source: firstTouch() }),
      });
      if (!res.ok) throw new Error("failed");
      track("generate_lead", { form: "demo" });
      setState("done");
      setForm(EMPTY);
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="py-10 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-teal-300" />
        <h3 className="mt-5 font-display text-2xl font-extrabold text-white">Thank you — we'll call you soon</h3>
        <p className="mx-auto mt-3 max-w-sm text-slate-400">We'll reach out within 2 hours (9 am – 10 pm) to fix a demo time that suits you.</p>
        <button type="button" onClick={() => setState("idle")} className="mt-6 text-sm text-teal-300 underline">Send another request</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Your name *</label>
          <input id="name" className={field} value={form.name} onChange={set("name")} autoComplete="name" placeholder="e.g. Rajesh Kulkarni" />
          {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="schoolName" className={label}>School name *</label>
          <input id="schoolName" className={field} value={form.schoolName} onChange={set("schoolName")} autoComplete="organization" placeholder="e.g. Gyan Ganga Vidyalaya" />
          {errors.schoolName && <p className="mt-1 text-xs text-rose-400">{errors.schoolName}</p>}
        </div>
        <div>
          <label htmlFor="email" className={label}>Email *</label>
          <input id="email" type="email" className={field} value={form.email} onChange={set("email")} autoComplete="email" placeholder="office@yourschool.edu.in" />
          {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={label}>Mobile / WhatsApp *</label>
          <input id="phone" type="tel" className={field} value={form.phone} onChange={set("phone")} inputMode="tel" autoComplete="tel" placeholder="98765 43210" />
          {errors.phone && <p className="mt-1 text-xs text-rose-400">{errors.phone}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={label}>Tell us about your school <span className="font-normal text-slate-500">(optional)</span></label>
          <textarea id="message" rows={4} className={field} value={form.message} onChange={set("message")} placeholder="Board, number of students, what's hardest in your office today…" />
        </div>
        <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} className="hidden" aria-hidden="true" />
      </div>

      {state === "error" && (
        <div className="flex items-start gap-2 rounded-xl border border-rose-400/30 bg-rose-400/[0.07] px-4 py-3 text-sm text-rose-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" /> Something went wrong. Please WhatsApp +91 93091 93613 or call +91 91563 02024.
        </div>
      )}

      <button type="submit" disabled={state === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 px-6 py-4 text-sm font-bold text-[#04121a] shadow-[0_0_50px_-10px_rgba(45,212,191,0.8)] transition hover:brightness-110 disabled:opacity-60">
        {state === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <><Send className="h-4 w-4" /> Book my free demo</>}
      </button>
    </form>
  );
}
