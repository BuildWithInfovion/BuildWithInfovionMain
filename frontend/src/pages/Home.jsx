import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import {
  ArrowRight, Play, Check, ChevronDown, FileSpreadsheet, Languages, Bus, Wallet, Smartphone, History, Lock, KeyRound, Users,
  IndianRupee, CalendarCheck, ReceiptText, Sparkles, MessageCircle, ShieldCheck,
} from "lucide-react";
import { BrowserFrame, PhoneFrame, LoopVideo } from "../components/product/Frames";
import FilmPlayer from "../components/product/FilmPlayer";
import { FILM_TRANSCRIPT } from "../Data/filmTranscript";
import FeatureFilms from "../components/product/FeatureFilms";
import PortalHub from "../components/product/PortalHub";
import PriceCalculator from "../components/PriceCalculator";
import { Aurora, CountUp, GhostButton, GlowButton, Kicker, Marquee, Reveal, SectionHead, SpotlightCard, Tilt } from "../components/fx/Fx";

const WHATSAPP = "https://wa.me/919309193613?text=" + encodeURIComponent("Hi! I'd like to see Infovion for my school.");

const FAQ = [
  ["How does the 30-day free trial work?", "Fill in the short form. Your own trial school is created on the spot with a little sample data, and the sign-in details arrive in your email within a minute. You get every module for up to 50 students — no card, no commitment. If you continue, everything you entered stays."],
  ["What does it cost after the trial?", "₹150 per student per year, plus GST — every module and every portal included. A school of 600 students pays ₹90,000 a year. No setup fee; data import from your old records is included."],
  ["We have years of records in Excel and old ledgers. Can we bring them in?", "Yes. Students, staff and parents come in from Excel — even messy files; rows that can't be read are listed so nothing is silently lost. Fees paid before you joined are entered as opening balances, so parents are never asked to pay twice."],
  ["Do parents and teachers need to install an app?", "No. Infovion works in any phone browser — teachers mark attendance and parents check fees, attendance and results from the same link."],
  ["Can parents pay fees online?", "Yes, by UPI, card or net banking. Payments go straight into the school's own Razorpay account — Infovion never holds the money — and the receipt is created automatically. The school can switch online payments on or off any time."],
  ["Is our school's data safe and private?", "Each school's data is kept separate and visible only to the people the school gives access to, by role. Passwords are encrypted, two-step sign-in is available, every change is logged, and the school owns its data. We sign a Data Processing Agreement under India's DPDP Act, 2023."],
];
const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Infovion — a whole school run on one platform (4-minute product film)",
  description: "Admissions, attendance, timetable, exams and report cards, fees, the parent portal, certificates, staff salaries and principal dashboards in Infovion, school management software for Indian K-12 schools. Every screen is real.",
  thumbnailUrl: ["https://www.infovion.in/film/infovion-film-poster.webp", "https://www.infovion.in/og-image.jpg"],
  uploadDate: "2026-09-29T00:00:00+05:30",
  duration: "PT4M29S",
  contentUrl: "https://www.infovion.in/film/infovion-film-v2.mp4",
  inLanguage: "en-IN",
  publisher: { "@id": "https://www.infovion.in/#organization" },
  transcript: FILM_TRANSCRIPT,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

const CAPS = [
  "Fee collection & receipts", "UPI to the school's own account", "Attendance on any phone", "Exams & report cards", "TC / Marathi LC / Hindi TC",
  "Bonafide & ID cards", "School transport & live bus", "Parent portal", "Timetable & covers", "Staff salary", "Opening balances", "Excel import", "DPDP-ready",
];

// ── Hero ───────────────────────────────────────────────────────────────────
function FloatChip({ icon, title, sub, className, slow }) {
  const Icon = icon;
  return (
    <div className={`glass absolute z-20 hidden items-center gap-3 rounded-2xl px-4 py-3 shadow-2xl md:flex ${slow ? "float-y-slow" : "float-y"} ${className}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-300 to-cyan-500 text-[#04121a]"><Icon className="h-4 w-4" /></span>
      <span>
        <span className="block text-sm font-bold text-white">{title}</span>
        <span className="block text-[11px] text-slate-400">{sub}</span>
      </span>
    </div>
  );
}

function Hero() {
  return (
    <section className="noise relative overflow-hidden bg-ink pb-24 pt-32 sm:pt-40">
      <Aurora strong />
      <div className="relative mx-auto max-w-6xl px-5 text-center sm:px-6">
        {/* The hero text is painted straight from the prerendered HTML (CSS rise, never hidden) so it is not waiting on JavaScript */}
        <div className="rise">
          <Link to="/free-trial" className="inline-flex"><Kicker>New · Free trial, ready in 2 minutes</Kicker></Link>
        </div>
        <h1
          className="rise mx-auto mt-7 max-w-5xl font-display text-[2.7rem] font-extrabold leading-[1] tracking-tight text-white sm:text-7xl lg:text-[5.4rem]">
          Run your school.<br /><span className="text-gradient-aurora">Not spreadsheets.</span>
        </h1>
        <p
          className="rise mx-auto mt-7 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          Fees, attendance, exams, transport, certificates and a parent app — one platform built for Indian K-12 schools.
          Your office, teachers and parents on the same page, on any phone.
        </p>
        <div
          className="rise mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <GlowButton to="/free-trial" className="w-full sm:w-auto">Start your free trial <ArrowRight className="h-4 w-4" /></GlowButton>
          <GhostButton href="#film" className="w-full sm:w-auto"><Play className="h-4 w-4" fill="currentColor" /> Watch the film</GhostButton>
        </div>
        <p className="mt-5 text-xs text-slate-400">No card needed · ₹150 per student per year after the trial · <Link to="/contact" className="underline decoration-slate-600 hover:text-slate-300">or book a live demo</Link></p>
      </div>

      <div className="rise relative mx-auto mt-16 max-w-6xl px-5 sm:px-6">
        <FloatChip icon={IndianRupee} title="₹1,37,400 collected" sub="Today · 42 receipts" className="-left-2 top-16 lg:-left-10" />
        <FloatChip icon={CalendarCheck} title="Attendance 8/10 classes" sub="Marked by teachers · 9:20 am" className="-right-2 top-40 lg:-right-12" slow />
        <FloatChip icon={ReceiptText} title="Receipt sent to parent" sub="FRC-2026-00342 · UPI" className="bottom-24 -left-2 lg:-left-14" slow />
        <Tilt>
          <BrowserFrame>
            <img src="/product/dashboard.webp" srcSet="/product/dashboard-900.webp 900w, /product/dashboard.webp 1800w" sizes="(min-width: 1152px) 1100px, 94vw" alt="Infovion school dashboard: students, today's fee collection, outstanding dues and attendance" className="block w-full" width="1800" height="1125" fetchpriority="high" />
          </BrowserFrame>
        </Tilt>
        <div className="absolute -bottom-14 right-4 z-30 w-[32%] sm:right-10 sm:w-[22%] lg:-right-4 lg:w-[19%]">
          <PhoneFrame>
            <LoopVideo src="/product/parent-app.mp4" poster="/product/parent-app-poster.webp" label="The parent app: attendance and fees on a phone" />
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    [<CountUp key="a" to={8} />, "role portals, one login each"],
    [<CountUp key="b" to={12} suffix="+" />, "modules, all included"],
    [<CountUp key="c" to={50} prefix="₹" />, "per student, per year"],
    [<CountUp key="d" to={30} />, "day free trial, no card"],
  ];
  return (
    <section className="relative bg-ink pb-20 pt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Marquee items={CAPS} />
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/[0.06] ring-1 ring-white/[0.06] md:grid-cols-4">
          {items.map(([n, l]) => (
            <div key={l} className="bg-ink px-6 py-8 text-center">
              <p className="font-display text-4xl font-extrabold text-gradient-aurora sm:text-5xl">{n}</p>
              <p className="mt-2 text-sm text-slate-400">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Built for India (bento) ─────────────────────────────────────────────────
const DIFFERENT = [
  { icon: FileSpreadsheet, title: "Starts from your messy Excel", body: "Bring in students, parents and staff from the files you already have. Rows that can't be read are listed, never silently dropped.", span: "lg:col-span-2" },
  { icon: History, title: "Your old ledger, carried over", body: "Fees paid before you joined become opening balances — no parent is asked to pay twice." },
  { icon: Languages, title: "LC in Marathi. TC in Hindi.", body: "Transfer and leaving certificates in the formats your board and state expect, on one page." },
  { icon: Bus, title: "Transport, run properly", body: "Routes, stops and per-stop fares billed monthly — even when a separate operator runs the buses." },
  { icon: Smartphone, title: "Works on the phones you have", body: "No app to install. Teachers and parents use it in the browser on any phone." },
  { icon: Wallet, title: "Online fees, straight to the school", body: "Parents pay by UPI, card or net banking into the school's own Razorpay account. Infovion never holds the money — receipts appear on their own, and the office can switch it off any time.", span: "sm:col-span-2 lg:col-span-3" },
];

function BuiltForIndia() {
  return (
    <section className="relative bg-ink py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHead kicker="Built for Indian schools" title="Not a foreign ERP with a rupee sign." accent="Made for your office."
          sub="Every feature came from sitting with school offices — the clerk with the fee register, the principal chasing attendance, the parent asking for a TC." />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DIFFERENT.map((d, i) => {
            const Icon = d.icon;
            return (
              <Reveal key={d.title} delay={i * 0.05} className={d.span ?? ""}>
                <SpotlightCard className="h-full rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-7 transition-colors hover:border-teal-400/30">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-300 ring-1 ring-teal-400/20"><Icon className="h-5 w-5" /></span>
                  <h3 className="mt-5 font-display text-xl font-bold text-white">{d.title}</h3>
                  <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-slate-400">{d.body}</p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Portals ─────────────────────────────────────────────────────────────────
function Portals() {
  return (
    <section className="relative overflow-hidden bg-ink py-28">
      <Aurora />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHead kicker="Eight portals · one school" title="Everyone sees exactly" accent="what they need."
            sub="The accountant sees fees, the teacher sees their classes, the parent sees their own child — and nothing else. Each login opens to the right screen." />
          <ul className="mt-8 space-y-3">
            {[
              "Parents: today's attendance, fees due, receipts, results and the school bus",
              "Teachers: mark attendance and enter marks from their phone in seconds",
              "Director: collections, dues and which classes haven't marked attendance",
            ].map((t) => (
              <li key={t} className="flex gap-3 text-[15px] text-slate-300"><Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-300" />{t}</li>
            ))}
          </ul>
        </div>
        <Reveal><PortalHub /></Reveal>
      </div>

      <div className="relative mx-auto mt-20 grid max-w-4xl grid-cols-3 items-end gap-4 px-5 sm:gap-8 sm:px-6">
        {[
          ["/product/teacher-home.webp", "Teacher portal on a phone", "Teacher", "translate-y-6"],
          ["/product/parent-home.webp", "Parent app home screen", "Parent", ""],
          ["/product/parent-fees.webp", "Parent app fee status", "Fees", "translate-y-10"],
        ].map(([src, alt, label, off], i) => (
          <Reveal key={src} delay={i * 0.1} className={off}>
            <PhoneFrame>
              <img src={src.replace(".webp", "-360.webp")} alt={alt} loading="lazy" width="360" height="779" className="h-full w-full object-cover object-top" />
            </PhoneFrame>
            <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PricingTeaser() {
  return (
    <section className="relative bg-ink py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHead kicker="Simple pricing" title="₹150 per student," accent="per year."
            sub="One price, every module, every portal. No setup fee, no per-module charges, no surprise invoices. Data import and onboarding included." />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {["All 8 portals", "Fees, receipts & online payments", "Attendance, exams & report cards", "Transport & live bus", "Certificates & ID cards", "Onboarding & data import", "Email & WhatsApp support", "30-day free trial"].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm text-slate-300"><Check className="h-4 w-4 text-teal-300" /> {t}</li>
            ))}
          </ul>
          <Link to="/pricing" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-teal-300 hover:text-teal-200">See full pricing <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <Reveal><PriceCalculator dark /></Reveal>
      </div>
    </section>
  );
}

function Security() {
  const items = [
    [Lock, "Your data stays yours", "Each school's records are kept separate, and you can ask for a full export at any time."],
    [Users, "Access by role", "Staff see only what their role needs. Parents see only their own children."],
    [KeyRound, "Secure sign-in", "Encrypted passwords, forced change of temporary passwords, optional two-step sign-in."],
    [History, "Every change logged", "Who changed what and when — fees, marks, certificates, settings."],
  ];
  return (
    <section className="relative bg-ink py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <SectionHead kicker="Trust" title="Children's data deserves" accent="serious care."
          sub="We are your data processor under India's DPDP Act, 2023, with a signed Data Processing Agreement — and a ready privacy notice for your parents." />
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((it, i) => {
            const [Icon, t, b] = it;
            return (
              <Reveal key={t} delay={i * 0.05}>
                <SpotlightCard className="h-full rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
                  <Icon className="h-5 w-5 text-teal-300" />
                  <h3 className="mt-4 font-display font-bold text-white">{t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{b}</p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="relative bg-ink py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <SectionHead center kicker="Questions" title="What schools ask us" accent="before they start." />
        <div className="mt-12 space-y-3">
          {FAQ.map(([q, a], i) => (
            <div key={q} className={`rounded-2xl border transition-colors ${open === i ? "border-teal-400/30 bg-white/[0.04]" : "border-white/[0.07]"}`}>
              <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left">
                <span className="font-display text-[16px] font-bold text-white">{q}</span>
                <ChevronDown className={`h-5 w-5 flex-shrink-0 text-teal-300 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              <Motion.div initial={false} animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }} className="overflow-hidden">
                <p className="px-6 pb-6 text-[15px] leading-relaxed text-slate-400">{a}</p>
              </Motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-ink px-5 pb-28 sm:px-6">
      <div className="noise relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/10 px-6 py-20 text-center sm:px-16">
        <Aurora strong />
        <div className="relative">
          <Sparkles className="mx-auto h-7 w-7 text-teal-300" />
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl">
            Your school on Infovion <span className="text-gradient-aurora">in two minutes.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-slate-400">Start the free trial and your own school opens with sample data. Bring in a class, collect a fee, print a TC — no card, no contract.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GlowButton to="/free-trial" className="w-full sm:w-auto">Start your free trial <ArrowRight className="h-4 w-4" /></GlowButton>
            <GhostButton href={WHATSAPP} className="w-full sm:w-auto"><MessageCircle className="h-4 w-4" /> Ask on WhatsApp</GhostButton>
          </div>
          <p className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400"><ShieldCheck className="h-3.5 w-3.5" /> DPDP-ready · MSME registered · Made in Pune</p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-ink">
      <Helmet>
        <title>Infovion — School Management Software for Indian Schools | Free trial</title>
        <meta name="description" content="Fees and receipts, attendance, exams, transport, TC/LC certificates and a parent app — one school management platform for Indian K-12 schools. ₹150 per student per year. Start a 30-day free trial in two minutes." />
        <link rel="canonical" href="https://www.infovion.in/" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(videoSchema)}</script>
      </Helmet>

      <Hero />
      <Stats />

      <section id="film" className="relative scroll-mt-20 overflow-hidden bg-ink py-28">
        <Aurora />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
          <SectionHead kicker="The film" title="See a whole school run on Infovion" accent="in 4 minutes."
            sub="Admissions to fees to certificates — every screen in the film is real. Turn the sound on." />
          <Reveal className="mt-12"><FilmPlayer /></Reveal>
        </div>
      </section>

      <section className="relative bg-ink py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <SectionHead kicker="Feature by feature" title="Every feature," accent="its own short film."
            sub="Pick a feature to watch it — or let them play one after another." />
          <Reveal className="mt-12"><FeatureFilms /></Reveal>
        </div>
      </section>

      <BuiltForIndia />
      <Portals />
      <PricingTeaser />
      <Security />
      <Faq />
      <FinalCta />
    </div>
  );
}
