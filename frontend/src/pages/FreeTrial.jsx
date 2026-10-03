import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Check, CheckCircle2, Clock, CreditCard, Database, Headphones, Loader2, MessageCircle } from "lucide-react";
import { PhoneFrame, LoopVideo } from "../components/product/Frames";

// Same inbox as the demo form (Formspree). Each request arrives with the subject "Free trial request".
const FORM_ENDPOINT = "https://formspree.io/f/xnngvgpd";
const WHATSAPP = "https://wa.me/919309193613?text=" + encodeURIComponent("Hi! I'd like to start the 30-day free trial for my school.");

const INCLUDED = [
  "Every module: fees, attendance, exams, transport, certificates",
  "All 9 portals, including the parent app",
  "Up to 50 students and 10 staff logins",
  "Sample data, or bring in a class or two from Excel",
  "A guided walkthrough for your office team",
];

const STEPS = [
  [Clock, "We set up your trial school", "Usually the same day — you get the sign-in details on email and WhatsApp."],
  [Headphones, "We walk your office through it", "A 20-minute call: collecting a fee, marking attendance, printing a TC."],
  [Database, "Keep everything if you continue", "Upgrade any time — the students and fees you entered stay as they are."],
];

const field =
  "w-full rounded-xl border border-brand-cream bg-white px-4 py-3 text-sm text-brand-darker placeholder-brand-neutral/60 transition-colors focus:border-brand-terra focus:outline-none focus:ring-2 focus:ring-brand-terra/15";
const label = "mb-1.5 block text-sm font-medium text-brand-brown";

export default function FreeTrial() {
  const [form, setForm] = useState({
    name: "", role: "", schoolName: "", city: "", board: "", students: "", phone: "", email: "", consent: false,
  });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle"); // idle | sending | done | error

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Your name";
    if (!form.role) e.role = "Choose your role";
    if (form.schoolName.trim().length < 3) e.schoolName = "Your school's name";
    if (!form.city.trim()) e.city = "City";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, "").slice(-10))) e.phone = "A 10-digit mobile number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "A valid email";
    if (!form.consent) e.consent = "Please tick to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setState("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Free trial request — ${form.schoolName} (${form.city})`,
          type: "free_trial",
          name: form.name.trim(), role: form.role, schoolName: form.schoolName.trim(), city: form.city.trim(),
          board: form.board, students: form.students, phone: form.phone.trim(), email: form.email.trim(),
        }),
      });
      if (!res.ok) throw new Error("failed");
      setState("done");
      if (typeof window.gtag === "function") window.gtag("event", "generate_lead", { form: "free_trial" });
    } catch {
      setState("error");
    }
  };

  return (
    <>
      <Helmet>
        <title>Start a 30-day free trial — Infovion School Management Software</title>
        <meta name="description" content="Try Infovion with your own school for 30 days: fees, attendance, exams, transport, certificates and the parent app. No card needed. Set up the same day." />
        <link rel="canonical" href="https://buildwithinfovion.com/free-trial" />
      </Helmet>

      <section className="relative overflow-hidden bg-[#161412] pt-32 pb-28 sm:pt-40">
        <div className="pointer-events-none absolute left-1/2 top-[-20%] h-[640px] w-[1000px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(190,109,86,0.35), transparent)" }} />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent">30-day free trial</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl sm:text-6xl font-extrabold leading-[1.03] tracking-tight text-white">
            Try Infovion with <span className="font-serif font-normal italic text-brand-accent2">your own school.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/60">
            Not a sales demo — your own trial school to use for 30 days. No card, no contract. If it fits, you continue; if not, you walk away.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
            <li className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-brand-accent" /> No card needed</li>
            <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-brand-accent" /> Ready the same day</li>
            <li className="flex items-center gap-2"><Database className="h-4 w-4 text-brand-accent" /> Your data carries over</li>
          </ul>
        </div>
      </section>

      <section className="relative bg-brand-muted pb-24">
        <div className="mx-auto -mt-16 grid max-w-6xl gap-8 px-5 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          {/* Form */}
          <div className="relative rounded-3xl bg-white p-6 shadow-card ring-1 ring-brand-cream sm:p-9">
            {state === "done" ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-brand-terra" />
                <h2 className="mt-5 font-display text-2xl font-extrabold text-brand-darker">Request received — thank you!</h2>
                <p className="mx-auto mt-3 max-w-md text-brand-brown/80">
                  We'll set up the trial for <strong>{form.schoolName}</strong> and send the sign-in details to {form.email} and on WhatsApp — usually the same day.
                </p>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white">
                  <MessageCircle className="h-4 w-4" /> Message us on WhatsApp
                </a>
                <p className="mt-6 text-sm"><Link to="/" className="text-brand-terra underline">Back to the home page</Link></p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="space-y-5">
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-brand-darker">Start your free trial</h2>
                  <p className="mt-1 text-sm text-brand-neutral">Takes a minute. We reply the same day.</p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={label}>Your name *</label>
                    <input id="name" className={field} value={form.name} onChange={set("name")} autoComplete="name" placeholder="e.g. Rajesh Kulkarni" />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="role" className={label}>Your role *</label>
                    <select id="role" className={field} value={form.role} onChange={set("role")}>
                      <option value="">Select…</option>
                      {["Director / Trustee", "Principal", "School administrator", "Accountant", "Teacher", "Other"].map((r) => <option key={r}>{r}</option>)}
                    </select>
                    {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="schoolName" className={label}>School name *</label>
                    <input id="schoolName" className={field} value={form.schoolName} onChange={set("schoolName")} autoComplete="organization" placeholder="e.g. Gyan Ganga Vidyalaya" />
                    {errors.schoolName && <p className="mt-1 text-xs text-red-600">{errors.schoolName}</p>}
                  </div>
                  <div>
                    <label htmlFor="city" className={label}>City *</label>
                    <input id="city" className={field} value={form.city} onChange={set("city")} autoComplete="address-level2" placeholder="e.g. Pune" />
                    {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="board" className={label}>Board</label>
                    <select id="board" className={field} value={form.board} onChange={set("board")}>
                      <option value="">Select…</option>
                      {["CBSE", "ICSE / ISC", "State Board", "IB / Cambridge", "Other"].map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="students" className={label}>Number of students</label>
                    <select id="students" className={field} value={form.students} onChange={set("students")}>
                      <option value="">Select…</option>
                      {["Under 300", "300 – 700", "700 – 1,500", "1,500 – 3,000", "More than 3,000"].map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="phone" className={label}>Mobile / WhatsApp *</label>
                    <input id="phone" className={field} value={form.phone} onChange={set("phone")} inputMode="tel" autoComplete="tel" placeholder="98765 43210" />
                    {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className={label}>Email *</label>
                    <input id="email" type="email" className={field} value={form.email} onChange={set("email")} autoComplete="email" placeholder="office@yourschool.edu.in" />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                  </div>
                </div>
                <label className="flex items-start gap-3 text-sm text-brand-brown/80">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[#BE6D56]" checked={form.consent} onChange={set("consent")} />
                  <span>Infovion may contact me by phone, WhatsApp and email about this trial. See our <Link to="/privacy-policy" className="text-brand-terra underline">privacy policy</Link>.</span>
                </label>
                {errors.consent && <p className="-mt-3 text-xs text-red-600">{errors.consent}</p>}
                {state === "error" && (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    Something went wrong sending the form. Please <a href={WHATSAPP} className="underline" target="_blank" rel="noopener noreferrer">WhatsApp us</a> or call +91 93091 93613.
                  </p>
                )}
                <button type="submit" disabled={state === "sending"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-terra px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-brand-terra2 disabled:opacity-60">
                  {state === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : "Start my 30-day free trial"}
                </button>
                <p className="text-center text-xs text-brand-neutral">
                  Prefer to talk first? <Link to="/contact" className="text-brand-terra underline">Book a live demo</Link> or <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-brand-terra underline">WhatsApp us</a>.
                </p>
              </form>
            )}
          </div>

          {/* What you get */}
          <div className="space-y-6 lg:pt-6">
            <div className="rounded-3xl bg-white p-7 ring-1 ring-brand-cream">
              <h3 className="font-display text-lg font-bold text-brand-darker">What's in the trial</h3>
              <ul className="mt-4 space-y-2.5">
                {INCLUDED.map((t) => (
                  <li key={t} className="flex gap-2.5 text-sm text-brand-brown"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-terra" />{t}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-brand-neutral">Online fee payments are switched on when you subscribe. After the trial: ₹50 per student per year + GST.</p>
            </div>
            <ol className="space-y-4">
              {STEPS.map((step, i) => { const [Icon, t, b] = step; return (
                <li key={t} className="flex gap-4">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-darker font-display text-sm font-bold text-white">{i + 1}</span>
                  <div>
                    <p className="flex items-center gap-2 font-semibold text-brand-darker"><Icon className="h-4 w-4 text-brand-terra" />{t}</p>
                    <p className="mt-0.5 text-sm text-brand-brown/80">{b}</p>
                  </div>
                </li>
              ); })}
            </ol>
            <div className="hidden lg:flex justify-center pt-4">
              <div className="w-[210px] -rotate-2">
                <PhoneFrame>
                  <LoopVideo src="/product/parent-app.mp4" poster="/product/parent-app-poster.webp" label="The parent app" />
                </PhoneFrame>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
