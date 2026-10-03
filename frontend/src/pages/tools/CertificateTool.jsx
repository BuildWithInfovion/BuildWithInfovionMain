import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronDown, Printer, Sparkles } from "lucide-react";
import { motion as Motion } from "framer-motion";
import { SCHOOL_FIELDS, TOOLS, certificateHtml, printHtml } from "../../lib/certificates";
import { Aurora, GlowButton, Kicker } from "../../components/fx/Fx";
import { track } from "../../lib/analytics";

const SCHOOL_KEY = "infovion-tool-school";
const loadSchool = () => {
  try { return JSON.parse(localStorage.getItem(SCHOOL_KEY) || "{}"); } catch { return {}; }
};

const field = "w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-teal-400/60 focus:bg-white/[0.06]";

/**
 * A free certificate generator (Leaving Certificate, TC, bonafide): fill the
 * form, see the A4 preview live, print or save as PDF. Nothing is uploaded.
 */
export default function CertificateTool({ toolKey, seo }) {
  const tool = TOOLS[toolKey];
  const [lang, setLang] = useState(tool.lang);
  const [school, setSchool] = useState({});
  const [values, setValues] = useState(() => Object.fromEntries(tool.fields.filter((f) => f.default).map((f) => [f.key, f.default])));
  const [printed, setPrinted] = useState(false);
  const [open, setOpen] = useState(0);

  // remembered school details (browser only)
  useEffect(() => { setSchool(loadSchool()); }, []);
  useEffect(() => {
    try { localStorage.setItem(SCHOOL_KEY, JSON.stringify(school)); } catch { /* storage unavailable */ }
  }, [school]);

  const html = useMemo(() => certificateHtml(tool, values, school, lang), [tool, values, school, lang]);
  const setV = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));
  const setS = (k) => (e) => setSchool((s) => ({ ...s, [k]: e.target.value }));
  const lbl = (f) => (lang === "en" || !f.mr ? f.label : `${f.mr} · ${f.label}`);

  const doPrint = () => {
    printHtml(html);
    setPrinted(true);
    track("tool_print", { tool: tool.slug });
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: seo.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: seo.h1,
    url: `https://buildwithinfovion.com/free-tools/${tool.slug}`,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any (web browser)",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    publisher: { "@type": "Organization", name: "Infovion" },
  };

  return (
    <div className="bg-ink">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={`https://buildwithinfovion.com/free-tools/${tool.slug}`} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(appSchema)}</script>
      </Helmet>

      <section className="noise relative overflow-hidden pb-14 pt-32 sm:pt-36">
        <Aurora />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
          <Link to="/free-tools" className="text-xs text-slate-500 hover:text-slate-300">← Free tools for schools</Link>
          <div className="mt-4"><Kicker>Free tool · no sign-up</Kicker></div>
          <h1 className="mt-5 max-w-4xl font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl">{seo.h1}</h1>
          <p className="mt-4 max-w-3xl text-base text-slate-400 sm:text-lg">{seo.intro}</p>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* form */}
          <div className="glass space-y-6 rounded-3xl p-5 sm:p-7">
            {tool.bilingualOption && (
              <div className="flex flex-wrap gap-2">
                {[["mr", "मराठी"], ["mr-en", "मराठी + English"], ["en", "English"]].map(([k, t]) => (
                  <button key={k} type="button" onClick={() => setLang(k)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1 ${lang === k ? "bg-teal-400/15 text-teal-200 ring-teal-400/40" : "text-slate-400 ring-white/10 hover:text-white"}`}>{t}</button>
                ))}
              </div>
            )}
            <fieldset className="space-y-3">
              <legend className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">School details <span className="normal-case tracking-normal text-slate-500">(remembered on this device)</span></legend>
              {SCHOOL_FIELDS.map((f) => (
                <input key={f.key} aria-label={f.label} className={field} placeholder={`${lang !== "en" && f.mr ? `${f.mr} · ` : ""}${f.label} — ${f.placeholder}`} value={school[f.key] || ""} onChange={setS(f.key)} />
              ))}
            </fieldset>
            <fieldset className="space-y-3">
              <legend className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">Certificate</legend>
              <div className="grid grid-cols-2 gap-3">
                <input aria-label="Certificate number" className={field} placeholder="Certificate no." value={values.certNo || ""} onChange={setV("certNo")} />
                <input aria-label="Register number" className={field} placeholder={tool.grLabel.en} value={values.grNo || ""} onChange={setV("grNo")} />
              </div>
              {tool.fields.filter((f) => !f.computed).map((f) => (
                <label key={f.key} className="block">
                  <span className="mb-1 block text-xs text-slate-400">{lbl(f)}{f.required ? " *" : ""}</span>
                  <input className={field} type={f.type === "date" ? "date" : "text"} placeholder={f.placeholder || ""} value={values[f.key] || ""} onChange={setV(f.key)} />
                </label>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <label className="block"><span className="mb-1 block text-xs text-slate-400">Place</span><input className={field} value={values.place || ""} onChange={setV("place")} placeholder="Pune" /></label>
                <label className="block"><span className="mb-1 block text-xs text-slate-400">Date of issue</span><input className={field} type="date" value={values.issueDate || ""} onChange={setV("issueDate")} /></label>
              </div>
            </fieldset>
            <p className="text-xs text-slate-500">Everything stays in your browser — nothing is uploaded or stored by us.</p>
          </div>

          {/* preview */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_40px_120px_-40px_rgba(45,212,191,0.5)] ring-1 ring-white/10">
              <iframe title="Certificate preview" srcDoc={html} className="h-[640px] w-full sm:h-[760px]" />
            </div>
            <button type="button" onClick={doPrint}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 px-6 py-3.5 text-sm font-bold text-[#04121a] hover:brightness-110">
              <Printer className="h-4 w-4" /> Print / Save as PDF
            </button>
            {printed && (
              <Motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass mt-4 rounded-2xl p-5">
                <p className="flex items-center gap-2 font-semibold text-white"><Sparkles className="h-4 w-4 text-teal-300" /> Issuing these for every student?</p>
                <p className="mt-1 text-sm text-slate-400">Infovion fills certificates from your student records automatically — numbers, dates in words, signatures and your letterhead — in one click.</p>
                <Link to="/free-trial" onClick={() => track("tool_cta", { tool: tool.slug })} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300">Try Infovion free for 30 days <ArrowRight className="h-4 w-4" /></Link>
              </Motion.div>
            )}
          </div>
        </div>
      </section>

      {/* helpful content (and what ranks) */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-3xl space-y-12 px-5 sm:px-6">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">{seo.howTitle}</h2>
            <ol className="mt-5 space-y-3">
              {seo.how.map((t, i) => (
                <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-slate-300">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-400/15 text-xs font-bold text-teal-300">{i + 1}</span>{t}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">Questions</h2>
            <div className="mt-5 space-y-3">
              {seo.faq.map(([q, a], i) => (
                <div key={q} className={`rounded-2xl border ${open === i ? "border-teal-400/30 bg-white/[0.04]" : "border-white/[0.07]"}`}>
                  <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                    <span className="font-semibold text-white">{q}</span>
                    <ChevronDown className={`h-5 w-5 flex-shrink-0 text-teal-300 transition-transform ${open === i ? "rotate-180" : ""}`} />
                  </button>
                  {open === i && <p className="px-5 pb-5 text-[15px] leading-relaxed text-slate-400">{a}</p>}
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-3xl p-7 text-center">
            <h2 className="font-display text-2xl font-extrabold text-white">Stop typing certificates by hand</h2>
            <p className="mx-auto mt-2 max-w-xl text-slate-400">
              {tool.letter
                ? "In Infovion, bonafide and character certificates and ID cards print straight from student records — one student or a whole class at a time."
                : `In Infovion, the ${tool.titleEn || tool.title} comes straight from the student's record — parents apply online, the principal approves, and every certificate issued is kept in a register.`}
            </p>
            <ul className="mx-auto mt-5 grid max-w-lg gap-2 text-left text-sm text-slate-300 sm:grid-cols-2">
              {["Filled from student records", "Dates in words, automatically", "Your letterhead, seal & signature", tool.letter ? "One student or a whole class" : "Register of every certificate"].map((t) => (
                <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-300" /> {t}</li>
              ))}
            </ul>
            <div className="mt-7 flex justify-center"><GlowButton to="/free-trial">Start your free trial <ArrowRight className="h-4 w-4" /></GlowButton></div>
          </div>
        </div>
      </section>
    </div>
  );
}
