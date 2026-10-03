import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, MessageCircle, X } from "lucide-react";
import PriceCalculator from "../components/PriceCalculator";
import { Aurora } from "../components/fx/Fx";

const WHATSAPP = "https://wa.me/919309193613?text=" + encodeURIComponent("Hi! I have a question about Infovion pricing for my school.");

const INCLUDED = [
  ["Students & admissions", "Admissions, inquiries, student directory, promotions, former students"],
  ["Fees", "Fee plans, instalments, concessions, receipts, dues, daily reports, opening balances"],
  ["Online fee payments", "UPI, cards and net banking into the school's own Razorpay account"],
  ["Attendance", "Teacher marking on phone, daily and monthly registers, defaulter lists"],
  ["Exams & report cards", "Exams, marks entry, results and report cards"],
  ["Transport", "Routes, stops, fares, bus attendance, live bus location, vehicle documents"],
  ["Certificates", "TC / LC (English, Marathi, Hindi), bonafide, character certificate, ID cards"],
  ["Staff", "Staff records, staff attendance, leave and salaries"],
  ["All 8 portals", "Director, Principal, Operator, Accountant, Reception, Teacher, Non-teaching staff, Parent"],
  ["Onboarding", "Set-up, data import from Excel, training for your office, email & WhatsApp support"],
];

const NOT = ["Setup or installation fee", "Per-module or per-user charges", "Charges for parent or teacher logins", "Long lock-in contracts"];

const FAQ = [
  ["How is the price calculated?", "₹50 for each student enrolled, per academic year, plus 18% GST. Staff, teachers and parent logins are free. A school with 600 students pays ₹30,000 + GST for the year."],
  ["Is there a free trial?", "Yes — 30 days with your own trial school, every module, up to 50 students and 10 staff logins. No card needed. If you continue, the data you entered stays."],
  ["What if our student count changes during the year?", "You subscribe for an estimated number of students. New admissions during the year are billed pro rata; we don't charge back for students who leave mid-year."],
  ["How do we pay?", "By bank transfer or UPI against a GST invoice, once a year. Payment is due within 15 days of the invoice."],
  ["Is there a contract?", "The subscription is yearly and renews each year unless you tell us otherwise. There's no multi-year lock-in."],
  ["What happens to our data if we leave?", "It's your school's data. We give you a full export of students, attendance, exams and fees before the account is closed."],
  ["Who pays the online payment charges?", "Online payments go through the school's own Razorpay account, so Razorpay's standard fee (about 2%) is deducted by Razorpay from each payment. Infovion adds nothing on top."],
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function Pricing() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <Helmet>
        <title>Pricing — ₹50 per student per year | Infovion School Management Software</title>
        <meta name="description" content="Simple pricing for Indian schools: ₹50 per student per year + GST, every module and portal included. No setup fee. 30-day free trial." />
        <link rel="canonical" href="https://buildwithinfovion.com/pricing" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="noise relative overflow-hidden bg-ink pt-32 pb-40 sm:pt-40">
        <Aurora strong />
        <div className="pointer-events-none absolute left-1/2 top-[-20%] h-[640px] w-[1000px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(20,184,166,0.35), transparent)" }} />
        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent">Pricing</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.03] tracking-tight text-white sm:text-6xl">
            One price. <span className="text-gradient-aurora">Everything included.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/60">
            Pay for the students you teach — not for modules, logins or set-up. Every school gets the whole product.
          </p>
        </div>
      </section>

      <section className="bg-ink pb-24">
        <div className="mx-auto -mt-28 grid max-w-6xl gap-6 px-5 sm:px-6 lg:grid-cols-2">
          <Motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="relative glass rounded-3xl p-8 shadow-[0_50px_140px_-50px_rgba(45,212,191,0.5)] sm:p-10">
            <p className="text-sm font-semibold text-teal-300">Infovion School</p>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-6xl font-extrabold tracking-tight text-white">₹50</span>
              <span className="text-slate-400">per student / year</span>
            </p>
            <p className="mt-1 text-sm text-slate-400">+ 18% GST · billed yearly · staff & parent logins free</p>
            <Link to="/free-trial"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 px-6 py-4 text-sm font-bold text-[#04121a] hover:brightness-110">
              Start a 30-day free trial <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="mt-3 block text-center text-sm font-semibold text-slate-300 hover:text-teal-200">or book a live demo</Link>
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">You never pay for</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {NOT.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-slate-300"><X className="h-4 w-4 text-teal-300" />{t}</li>
                ))}
              </ul>
            </div>
          </Motion.div>
          <Motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <PriceCalculator dark />
          </Motion.div>
        </div>

        <div className="mx-auto mt-20 max-w-6xl px-5 sm:px-6">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Everything that's <span className="text-gradient-aurora">included</span>
          </h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-3xl bg-white/[0.06] ring-1 ring-white/[0.06] sm:grid-cols-2">
            {INCLUDED.map(([t, d]) => (
              <div key={t} className="flex gap-4 bg-ink p-6">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-300" />
                <div>
                  <p className="font-display font-bold text-white">{t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <h2 className="text-center font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Pricing <span className="text-gradient-aurora">questions</span>
          </h2>
          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {FAQ.map(([q, a], i) => (
              <div key={q}>
                <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left">
                  <span className="font-display text-[17px] font-bold text-white">{q}</span>
                  <ChevronDown className={`h-5 w-5 flex-shrink-0 text-teal-300 transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                <Motion.div initial={false} animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }} className="overflow-hidden">
                  <p className="pb-6 pr-10 text-[15px] leading-relaxed text-slate-400">{a}</p>
                </Motion.div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-slate-300">More than 3,000 students, several branches, or a trust with many schools?</p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 font-semibold text-teal-300">
              <MessageCircle className="h-4 w-4" /> Talk to us about group pricing
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
