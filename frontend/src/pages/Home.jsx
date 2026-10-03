import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion as Motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, Play, Check, ChevronDown, FileSpreadsheet, Languages, Bus, Wallet, Smartphone, History,
  ShieldCheck, Lock, KeyRound, ScrollText, Users, BadgeCheck, MessageCircle, Sparkles,
} from "lucide-react";
import { BrowserFrame, PhoneFrame, LoopVideo } from "../components/product/Frames";
import TourVideo from "../components/product/TourVideo";
import ProductTabs from "../components/product/ProductTabs";
import PriceCalculator from "../components/PriceCalculator";

const WHATSAPP = "https://wa.me/919309193613?text=" + encodeURIComponent("Hi! I'd like to see Infovion for my school.");

const FAQ = [
  {
    q: "How does the 30-day free trial work?",
    a: "Tell us your school's name and we set up a trial school for you — usually the same day. You get every module with up to 50 students and 10 staff logins, so you can try fees, attendance, certificates and the parent app with real data. No card, no commitment. If you continue, everything you entered carries over.",
  },
  {
    q: "What does it cost after the trial?",
    a: "₹50 per student per year, plus GST — every module and every portal included. A school of 600 students pays ₹30,000 a year. There is no setup fee, and data import from your old records is included.",
  },
  {
    q: "We have years of records in Excel and old ledgers. Can we bring them in?",
    a: "Yes. Students, staff and parents come in from Excel — even messy files; anything that can't be read is listed so nothing is silently lost. Fees already paid before you joined are entered as opening balances, so parents are never asked to pay twice.",
  },
  {
    q: "Do parents and teachers need to install an app?",
    a: "No. Infovion works in any phone browser — teachers mark attendance and parents check fees, attendance and results from the same link. It can also be added to the home screen like an app.",
  },
  {
    q: "Can parents pay fees online?",
    a: "Yes, by UPI, card or net banking. Payments go straight into the school's own Razorpay account — Infovion never holds the money — and the receipt is created automatically. The school can switch online payments on or off at any time.",
  },
  {
    q: "Is our school's data safe and private?",
    a: "Each school's data is kept separate and is only visible to the people the school gives access to, by role. Passwords are encrypted, two-step sign-in is available, every change is logged, and the school owns its data — ask for a full export at any time. We sign a Data Processing Agreement under India's DPDP Act, 2023.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] } }),
};

function Eyebrow({ children, light = false }) {
  return (
    <p className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${light ? "text-brand-accent" : "text-brand-terra"}`}>
      <span className={`h-px w-6 ${light ? "bg-brand-accent/60" : "bg-brand-terra/60"}`} />
      {children}
    </p>
  );
}

function SectionTitle({ eyebrow, title, accent, sub, light = false, center = false }) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className={`mt-4 font-display text-3xl sm:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight ${light ? "text-white" : "text-brand-darker"}`}>
        {title} {accent && <span className={`font-serif italic font-normal ${light ? "text-brand-accent2" : "text-brand-terra"}`}>{accent}</span>}
      </h2>
      {sub && <p className={`mt-4 max-w-2xl ${center ? "mx-auto" : ""} text-base sm:text-lg leading-relaxed ${light ? "text-white/60" : "text-brand-brown/80"}`}>{sub}</p>}
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const tilt = useTransform(scrollY, [0, 500], [reduce ? 0 : 14, 0]);
  const lift = useTransform(scrollY, [0, 500], [0, reduce ? 0 : -40]);

  return (
    <section className="relative overflow-hidden bg-[#161412] pt-32 sm:pt-40 pb-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-18%] h-[720px] w-[1100px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(190,109,86,0.38), rgba(209,171,131,0.10) 55%, transparent)" }} />
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)", backgroundSize: "64px 64px", maskImage: "radial-gradient(ellipse at 50% 20%, black 20%, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse at 50% 20%, black 20%, transparent 70%)" }} />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 text-center">
        <Motion.div variants={fade} initial="hidden" animate="show">
          <Link to="/free-trial" className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white/80 ring-1 ring-white/10 hover:bg-white/10">
            <span className="rounded-full bg-brand-terra px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">New</span>
            30-day free trial — set up the same day <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Motion.div>

        <Motion.h1 variants={fade} custom={0.08} initial="hidden" animate="show"
          className="mx-auto mt-7 max-w-4xl font-display text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.6rem] font-extrabold tracking-tight text-white">
          Run your school.<br />
          <span className="font-serif font-normal italic text-brand-accent2">Not spreadsheets.</span>
        </Motion.h1>

        <Motion.p variants={fade} custom={0.16} initial="hidden" animate="show"
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-white/65">
          Fees and receipts, attendance, exams, transport and certificates — with a parent app, in one system built for
          Indian K-12 schools. Your office, teachers and parents on the same page, on any phone.
        </Motion.p>

        <Motion.div variants={fade} custom={0.24} initial="hidden" animate="show" className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/free-trial"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-brand-terra px-7 py-4 text-sm font-bold text-white shadow-terra-lg transition-all hover:bg-brand-terra2 hover:-translate-y-0.5">
            Start your free trial <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a href="#tour"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white/[0.06] px-7 py-4 text-sm font-semibold text-white ring-1 ring-white/15 transition-colors hover:bg-white/10">
            <Play className="h-4 w-4" fill="currentColor" /> Watch the tour
          </a>
        </Motion.div>
        <Motion.p variants={fade} custom={0.3} initial="hidden" animate="show" className="mt-4 text-xs text-white/40">
          No card needed · ₹50 per student per year after the trial · <Link to="/contact" className="underline decoration-white/30 hover:text-white/70">or book a live demo</Link>
        </Motion.p>
      </div>

      <div className="relative mx-auto mt-14 sm:mt-16 max-w-6xl px-5 sm:px-6" style={{ perspective: 1600 }}>
        <Motion.div style={{ rotateX: tilt, y: lift, transformOrigin: "50% 0%" }}
          initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}>
          <BrowserFrame dark>
            <img src="/product/dashboard.webp" alt="Infovion school dashboard showing students, today's fee collection, outstanding dues and attendance"
              className="block w-full" width="1800" height="1125" fetchpriority="high" />
          </BrowserFrame>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 40, rotate: 4 }} animate={{ opacity: 1, y: 0, rotate: 2 }} transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -bottom-10 right-2 sm:right-8 lg:-right-6 w-[34%] sm:w-[25%] lg:w-[21%]">
          <PhoneFrame>
            <LoopVideo src="/product/parent-app.mp4" poster="/product/parent-app-poster.webp" label="The parent app: attendance and fees on a phone" />
          </PhoneFrame>
          <p className="mt-3 hidden sm:block text-center text-[11px] font-medium text-white/45">The parent app</p>
        </Motion.div>
      </div>
    </section>
  );
}

// ── Trust strip ───────────────────────────────────────────────────────────────
function TrustStrip() {
  const items = [
    [BadgeCheck, "MSME registered, made in Pune"],
    [ScrollText, "CBSE, ICSE & State Boards"],
    [Languages, "Certificates in English, मराठी & हिंदी"],
    [ShieldCheck, "DPDP Act–ready agreements"],
    [Wallet, "UPI fees to the school's own account"],
  ];
  return (
    <section className="border-b border-brand-cream bg-white pt-20 pb-8">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6">
        {items.map((item) => {
          const [Icon, t] = item;
          return (
            <li key={t} className="flex items-center gap-2 text-sm font-medium text-brand-brown/80">
              <Icon className="h-4 w-4 text-brand-terra" /> {t}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// ── Built for Indian schools ─────────────────────────────────────────────────
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
    <section className="bg-brand-muted py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionTitle eyebrow="Built for how Indian schools work" title="Not a foreign ERP with a rupee sign." accent="Made for your school office."
          sub="Every feature came from sitting with school offices — the clerk with the fee register, the principal chasing attendance, the parent asking for a TC." />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DIFFERENT.map((d, i) => {
            const Icon = d.icon;
            return (
              <Motion.div key={d.title} variants={fade} custom={i * 0.05} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
                className={`group relative overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-brand-cream transition-shadow hover:shadow-card-hover ${d.span ?? ""}`}>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-terra/10 text-brand-terra">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-brand-darker">{d.title}</h3>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-brand-brown/80">{d.body}</p>
                <div className="pointer-events-none absolute -right-16 -bottom-16 h-44 w-44 rounded-full bg-brand-accent/10 blur-2xl opacity-60 transition-opacity group-hover:opacity-100" />
              </Motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Everyone gets their own portal ────────────────────────────────────────────
const ROLES = ["Director", "Principal", "Operator", "Accountant", "Reception", "Teacher", "Non-teaching staff", "Parent", "Student"];

function Portals() {
  return (
    <section className="relative overflow-hidden bg-[#161412] py-24 sm:py-28">
      <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(190,109,86,0.35), transparent)" }} />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionTitle light eyebrow="Nine portals, one school" title="Everyone sees exactly" accent="what they need."
            sub="The accountant sees fees, the teacher sees their classes, the parent sees their own child — and nothing else. Each login opens to the right screen." />
          <ul className="mt-8 flex flex-wrap gap-2">
            {ROLES.map((r) => (
              <li key={r} className="rounded-full bg-white/[0.06] px-3.5 py-1.5 text-sm text-white/80 ring-1 ring-white/10">{r}</li>
            ))}
          </ul>
          <ul className="mt-8 space-y-3">
            {[
              "Parents: today's attendance, fees due, receipts, results and the school bus",
              "Teachers: mark attendance and enter marks from their phone in seconds",
              "Director: collections, dues and which classes haven't marked attendance",
            ].map((t) => (
              <li key={t} className="flex gap-3 text-[15px] text-white/70"><Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-accent" />{t}</li>
            ))}
          </ul>
          <Link to="/portals" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-brand-accent2">
            What each portal can do <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative mx-auto flex w-full max-w-[520px] items-end justify-center gap-4 pb-12 sm:gap-5">
          {[
            ["/product/teacher-home.webp", "Teacher portal on a phone", "Teacher", "translate-y-8"],
            ["/product/parent-home.webp", "Parent app home screen", "Parent", ""],
            ["/product/parent-fees.webp", "Parent app fee status", "Fees", "translate-y-12"],
          ].map(([src, alt, label, off]) => (
            <Motion.div key={src} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className={`w-1/3 ${off}`}>
              <PhoneFrame>
                <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover object-top" />
              </PhoneFrame>
              <p className="mt-3 text-center text-xs font-medium text-white/45">{label}</p>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Trust & security ──────────────────────────────────────────────────────────
function Security() {
  const items = [
    [Lock, "Your data stays yours", "Each school's records are kept separate, and you can ask for a full export at any time."],
    [Users, "Access by role", "Staff see only what their role needs. Parents see only their own children."],
    [KeyRound, "Secure sign-in", "Encrypted passwords, forced change of temporary passwords, optional two-step sign-in."],
    [History, "Every change logged", "Who changed what and when — fees, marks, certificates, settings."],
  ];
  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <SectionTitle eyebrow="Trust" title="Children's data deserves" accent="serious care."
            sub="We act as your data processor under India's DPDP Act, 2023, with a signed Data Processing Agreement — and a ready privacy notice for your parents." />
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => {
              const [Icon, t, b] = item;
              return (
                <div key={t} className="rounded-2xl border border-brand-cream p-6">
                  <Icon className="h-5 w-5 text-brand-terra" />
                  <h3 className="mt-4 font-display font-bold text-brand-darker">{t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-brand-brown/80">{b}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────────────
function PricingTeaser() {
  return (
    <section className="bg-brand-muted py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionTitle eyebrow="Simple pricing" title="₹50 per student," accent="per year."
            sub="One price, every module, every portal. No setup fee, no per-module charges, no surprise invoices. Data import and onboarding included." />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {["All 9 portals", "Fees, receipts & online payments", "Attendance, exams & report cards", "Transport & bus tracking", "Certificates & ID cards", "Onboarding & data import", "Email & WhatsApp support", "30-day free trial"].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm text-brand-brown"><Check className="h-4 w-4 text-brand-terra" /> {t}</li>
            ))}
          </ul>
          <Link to="/pricing" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-terra hover:text-brand-terra2">
            See full pricing <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <PriceCalculator />
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <SectionTitle center eyebrow="Questions" title="What schools ask us" accent="before they start." />
        <div className="mt-12 divide-y divide-brand-cream border-y border-brand-cream">
          {FAQ.map((f, i) => (
            <div key={f.q}>
              <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-6 py-5 text-left">
                <span className="font-display text-[17px] font-bold text-brand-darker">{f.q}</span>
                <ChevronDown className={`h-5 w-5 flex-shrink-0 text-brand-terra transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              <Motion.div initial={false} animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }} className="overflow-hidden">
                <p className="pb-6 pr-10 text-[15px] leading-relaxed text-brand-brown/85">{f.a}</p>
              </Motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Final call to action ──────────────────────────────────────────────────────
function FinalCta() {
  return (
    <section className="bg-white px-5 pb-24 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#161412] px-6 py-16 text-center sm:px-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-70"
          style={{ background: "radial-gradient(60% 80% at 50% 0%, rgba(190,109,86,0.45), transparent 70%)" }} />
        <div className="relative">
          <Sparkles className="mx-auto h-6 w-6 text-brand-accent" />
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight text-white">
            Try it with your own school <span className="font-serif font-normal italic text-brand-accent2">for 30 days.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/60">
            We set up your trial school, help you bring in a class or two, and show your office around. If it isn't right for you, you walk away — no card, no contract.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/free-trial" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-brand-terra px-7 py-4 text-sm font-bold text-white shadow-terra-lg hover:bg-brand-terra2">
              Start your free trial <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white/[0.06] px-7 py-4 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/10">
              <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Infovion — School Management Software for Indian Schools | 30-day free trial</title>
        <meta name="description" content="Fees and receipts, attendance, exams, transport, TC/LC certificates and a parent app — one school management system for Indian K-12 schools. ₹50 per student per year. Start a 30-day free trial." />
        <link rel="canonical" href="https://buildwithinfovion.com/" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Hero />
      <TrustStrip />

      <section id="tour" className="scroll-mt-20 bg-[#161412] py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <SectionTitle light eyebrow="See it in action" title="A normal school morning," accent="in 48 seconds."
            sub="A real screen recording of a demo school — collecting a fee, checking attendance, transport and the director's view. Click a chapter to jump." />
          <div className="mt-12"><TourVideo /></div>
        </div>
      </section>

      <section className="bg-[#fbf9f8] py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <SectionTitle eyebrow="The product" title="Everything your office does," accent="in one place."
            sub="Real screens, not mock-ups. Pick an area to see how it works." />
          <div className="mt-12"><ProductTabs /></div>
        </div>
      </section>

      <BuiltForIndia />
      <Portals />
      <PricingTeaser />
      <Security />
      <Faq />
      <FinalCta />
    </>
  );
}
