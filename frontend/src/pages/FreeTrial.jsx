import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Check, CheckCircle2, Clock, CreditCard, Database, Loader2, Mail, MessageCircle, Sparkles } from "lucide-react";
import { PhoneFrame, LoopVideo } from "../components/product/Frames";
import { Aurora, Kicker } from "../components/fx/Fx";
import { firstTouch, track } from "../lib/analytics";

const API = (import.meta.env.VITE_API_URL || "https://api.infovion.in").replace(/\/+$/, "");
const APP = "https://app.infovion.in";
// Backup only: if our API can't be reached, the request still reaches us by email
const FORMSPREE = "https://formspree.io/f/xnngvgpd";
const WHATSAPP = "https://wa.me/919309193613?text=" + encodeURIComponent("Hi! I'd like to start the 30-day free trial for my school.");

const INCLUDED = [
  "Every module: fees, attendance, exams, transport, certificates",
  "All 8 portals, including the parent portal",
  "Up to 50 students — sample data already loaded",
  "Bring in a class from Excel whenever you're ready",
  "A guided walkthrough for your office, if you'd like one",
];

const field =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-teal-400/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-teal-400/10";
const label = "mb-1.5 block text-sm font-medium text-slate-300";

/** Read name/email from a Google ID token for display (the server verifies it). */
function decodeJwt(token) {
  try {
    const part = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(decodeURIComponent(escape(atob(part))));
  } catch {
    return null;
  }
}

function GoogleButton({ onCredential }) {
  const ref = useRef(null);
  const [clientId, setClientId] = useState(null);
  useEffect(() => {
    fetch(`${API}/auth/google/config`).then((r) => (r.ok ? r.json() : null)).then((c) => c?.clientId && setClientId(c.clientId)).catch(() => {});
  }, []);
  useEffect(() => {
    if (!clientId || !ref.current) return undefined;
    const render = () => {
      if (!window.google?.accounts?.id || !ref.current) return;
      window.google.accounts.id.initialize({ client_id: clientId, callback: (r) => onCredential(r.credential), ux_mode: "popup" });
      window.google.accounts.id.renderButton(ref.current, { theme: "filled_black", size: "large", shape: "pill", text: "continue_with", width: 300 });
    };
    if (window.google?.accounts?.id) { render(); return undefined; }
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.onload = render;
    document.head.appendChild(s);
    return undefined;
  }, [clientId, onCredential]);
  if (!clientId) return null;
  return (
    <div className="space-y-3">
      <div ref={ref} className="flex justify-center" />
      <div className="flex items-center gap-3 text-xs text-slate-500"><span className="h-px flex-1 bg-white/10" />or fill in the form<span className="h-px flex-1 bg-white/10" /></div>
    </div>
  );
}

export default function FreeTrial() {
  const [form, setForm] = useState({ name: "", role: "", schoolName: "", city: "", board: "", students: "", phone: "", email: "", consent: false, website: "" });
  const [google, setGoogle] = useState(null); // { credential, email, name }
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle"); // idle | sending | done | exists | error
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const onGoogle = React.useCallback((credential) => {
    const p = decodeJwt(credential);
    if (!p?.email) return;
    setGoogle({ credential, email: p.email, name: p.name });
    setForm((f) => ({ ...f, email: p.email, name: f.name || p.name || "" }));
  }, []);

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Your name";
    if (!form.role) e.role = "Choose your role";
    if (form.schoolName.trim().length < 3) e.schoolName = "Your school's name";
    if (form.city.trim().length < 2) e.city = "City";
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
    setMessage("");
    const body = {
      name: form.name.trim(), role: form.role, schoolName: form.schoolName.trim(), city: form.city.trim(), board: form.board,
      students: form.students, phone: form.phone.trim(), email: form.email.trim(), consent: true, website: form.website,
      source: firstTouch() || undefined,
      ...(google ? { googleCredential: google.credential } : {}),
    };
    try {
      const res = await fetch(`${API}/public/trials`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json().catch(() => null);
      if (res.ok) {
        setResult(data);
        setState("done");
        track("sign_up", { method: google ? "google" : "form" });
        track("generate_lead", { form: "free_trial" });
        return;
      }
      if (res.status === 409) { setState("exists"); setMessage(data?.message ?? ""); return; }
      if (res.status >= 500 || res.status === 404) throw new Error("server");
      const m = data?.message;
      setMessage(Array.isArray(m) ? m.join(" · ") : m || "Please check the form and try again.");
      setState("error");
    } catch {
      // Our API is unreachable: make sure the request still reaches the team
      try {
        const rest = { ...body };
        delete rest.googleCredential;
        const fb = await fetch(FORMSPREE, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ _subject: `Free trial request (manual) — ${body.schoolName}`, ...rest }) });
        if (!fb.ok) throw new Error("fallback");
        setResult({ manual: true, email: body.email });
        setState("done");
      } catch {
        setMessage("We couldn't reach our servers. Please WhatsApp us on +91 93091 93613 and we'll set it up right away.");
        setState("error");
      }
    }
  };

  return (
    <div className="bg-ink">
      <Helmet>
        <title>Start a 30-day free trial — Infovion School Management Software</title>
        <meta name="description" content="Your own Infovion trial school in two minutes: fees, attendance, exams, transport, certificates and the parent portal. Sign-in details by email. No card needed." />
        <link rel="canonical" href="https://infovion.in/free-trial" />
      </Helmet>

      <section className="noise relative overflow-hidden pb-36 pt-32 sm:pt-40">
        <Aurora strong />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
          <Kicker>30-day free trial</Kicker>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl">
            Your own school on Infovion, <span className="text-gradient-aurora">in two minutes.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-400">
            Fill in the form and your trial school is created on the spot — with sample students, fees and attendance already in it.
            The sign-in details arrive in your inbox.
          </p>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
            <li className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-teal-300" /> No card needed</li>
            <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-teal-300" /> Ready in minutes</li>
            <li className="flex items-center gap-2"><Database className="h-4 w-4 text-teal-300" /> Your data carries over</li>
          </ul>
        </div>
      </section>

      <section className="relative pb-28">
        <div className="mx-auto -mt-24 grid max-w-6xl gap-8 px-5 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div className="glass relative rounded-3xl p-6 shadow-[0_50px_140px_-50px_rgba(45,212,191,0.5)] sm:p-9">
            {state === "done" ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-16 w-16 text-teal-300" />
                {result?.manual ? (
                  <>
                    <h2 className="mt-5 font-display text-2xl font-extrabold text-white">Request received</h2>
                    <p className="mx-auto mt-3 max-w-md text-slate-400">Our team will set up your trial and email the sign-in details to <strong className="text-white">{result.email}</strong> shortly.</p>
                  </>
                ) : (
                  <>
                    <h2 className="mt-5 font-display text-2xl font-extrabold text-white">Your trial school is ready!</h2>
                    <p className="mx-auto mt-3 max-w-md text-slate-400">
                      We've emailed your sign-in details to <strong className="text-white">{result?.email}</strong>. Check your inbox (and the spam folder, just in case).
                    </p>
                    <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left text-sm">
                      <p className="flex justify-between text-slate-400">School code <span className="font-mono font-bold tracking-wider text-white">{result?.schoolCode}</span></p>
                      <p className="mt-2 flex justify-between text-slate-400">Trial ends <span className="text-white">{result?.endsOn ? new Date(result.endsOn).toLocaleDateString("en-IN", { dateStyle: "medium" }) : "in 30 days"}</span></p>
                    </div>
                    <a href={result?.loginUrl || APP} className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 px-7 py-3.5 text-sm font-bold text-[#04121a]">
                      <Mail className="h-4 w-4" /> Open Infovion <ArrowRight className="h-4 w-4" />
                    </a>
                  </>
                )}
                <p className="mt-6 text-sm text-slate-400">Want a walkthrough? <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-teal-300 underline">WhatsApp us</a></p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="space-y-5">
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-white">Start your free trial</h2>
                  <p className="mt-1 text-sm text-slate-400">Takes a minute. Everything stays if you continue.</p>
                </div>

                {google ? (
                  <div className="flex items-center justify-between rounded-xl border border-teal-400/30 bg-teal-400/[0.06] px-4 py-3 text-sm">
                    <span className="text-slate-300"><Check className="mr-1.5 inline h-4 w-4 text-teal-300" />Signed in with Google as <strong className="text-white">{google.email}</strong></span>
                    <button type="button" onClick={() => { setGoogle(null); setForm((f) => ({ ...f, email: "" })); }} className="text-xs text-slate-400 underline">change</button>
                  </div>
                ) : (
                  <GoogleButton onCredential={onGoogle} />
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={label}>Your name *</label>
                    <input id="name" className={field} value={form.name} onChange={set("name")} autoComplete="name" placeholder="e.g. Rajesh Kulkarni" />
                    {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="role" className={label}>Your role *</label>
                    <select id="role" className={field} value={form.role} onChange={set("role")}>
                      <option value="" className="bg-[#0b1220]">Select…</option>
                      {["Director / Trustee", "Principal", "School administrator", "Accountant", "Teacher", "Other"].map((r) => <option key={r} className="bg-[#0b1220]">{r}</option>)}
                    </select>
                    {errors.role && <p className="mt-1 text-xs text-rose-400">{errors.role}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="schoolName" className={label}>School name *</label>
                    <input id="schoolName" className={field} value={form.schoolName} onChange={set("schoolName")} autoComplete="organization" placeholder="e.g. Gyan Ganga Vidyalaya" />
                    {errors.schoolName && <p className="mt-1 text-xs text-rose-400">{errors.schoolName}</p>}
                  </div>
                  <div>
                    <label htmlFor="city" className={label}>City *</label>
                    <input id="city" className={field} value={form.city} onChange={set("city")} autoComplete="address-level2" placeholder="e.g. Pune" />
                    {errors.city && <p className="mt-1 text-xs text-rose-400">{errors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="board" className={label}>Board</label>
                    <select id="board" className={field} value={form.board} onChange={set("board")}>
                      <option value="" className="bg-[#0b1220]">Select…</option>
                      {["CBSE", "ICSE / ISC", "State Board", "IB / Cambridge", "Other"].map((b) => <option key={b} className="bg-[#0b1220]">{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="students" className={label}>Number of students</label>
                    <select id="students" className={field} value={form.students} onChange={set("students")}>
                      <option value="" className="bg-[#0b1220]">Select…</option>
                      {["Under 300", "300 – 700", "700 – 1,500", "1,500 – 3,000", "More than 3,000"].map((b) => <option key={b} className="bg-[#0b1220]">{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="phone" className={label}>Mobile / WhatsApp *</label>
                    <input id="phone" className={field} value={form.phone} onChange={set("phone")} inputMode="tel" autoComplete="tel" placeholder="98765 43210" />
                    {errors.phone && <p className="mt-1 text-xs text-rose-400">{errors.phone}</p>}
                  </div>
                  {!google && (
                    <div className="sm:col-span-2">
                      <label htmlFor="email" className={label}>Email * <span className="font-normal text-slate-500">— your sign-in details go here</span></label>
                      <input id="email" type="email" className={field} value={form.email} onChange={set("email")} autoComplete="email" placeholder="office@yourschool.edu.in" />
                      {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
                    </div>
                  )}
                  <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} className="hidden" aria-hidden="true" />
                </div>

                <label className="flex items-start gap-3 text-sm text-slate-400">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[#2dd4bf]" checked={form.consent} onChange={set("consent")} />
                  <span>Infovion may contact me by phone, WhatsApp and email about this trial. See our <Link to="/privacy-policy" className="text-teal-300 underline">privacy policy</Link>.</span>
                </label>
                {errors.consent && <p className="-mt-3 text-xs text-rose-400">{errors.consent}</p>}

                {state === "exists" && (
                  <div className="rounded-xl border border-amber-400/30 bg-amber-400/[0.07] px-4 py-3 text-sm text-amber-100">
                    {message} <a href={APP} className="font-semibold underline">Sign in</a>
                  </div>
                )}
                {state === "error" && <div className="rounded-xl border border-rose-400/30 bg-rose-400/[0.07] px-4 py-3 text-sm text-rose-200">{message}</div>}

                <button type="submit" disabled={state === "sending"}
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 px-6 py-4 text-sm font-bold text-[#04121a] shadow-[0_0_50px_-10px_rgba(45,212,191,0.8)] transition hover:brightness-110 disabled:opacity-60">
                  {state === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating your school…</> : <><Sparkles className="h-4 w-4" /> Create my trial school</>}
                </button>
                <p className="text-center text-xs text-slate-500">
                  Prefer to talk first? <Link to="/contact" className="text-teal-300 underline">Book a live demo</Link> or <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-teal-300 underline">WhatsApp us</a>.
                </p>
              </form>
            )}
          </div>

          <div className="space-y-6 lg:pt-6">
            <div className="glass rounded-3xl p-7">
              <h3 className="font-display text-lg font-bold text-white">What's in the trial</h3>
              <ul className="mt-4 space-y-2.5">
                {INCLUDED.map((t) => (
                  <li key={t} className="flex gap-2.5 text-sm text-slate-300"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-300" />{t}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-500">Online fee payments switch on when you subscribe. After the trial: ₹150 per student per year + GST.</p>
            </div>
            <div className="hidden justify-center pt-2 lg:flex">
              <div className="w-[220px] -rotate-3">
                <PhoneFrame>
                  <LoopVideo src="/product/parent-app.mp4" poster="/product/parent-app-poster.webp" label="The parent portal" />
                </PhoneFrame>
              </div>
            </div>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="glass flex items-center gap-3 rounded-2xl p-4 text-sm text-slate-300 hover:bg-white/[0.06]">
              <MessageCircle className="h-5 w-5 text-[#25D366]" /> Questions first? WhatsApp +91 93091 93613
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
