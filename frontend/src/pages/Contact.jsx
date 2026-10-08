import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Sparkles, Video } from "lucide-react";
import ContactForm from "../components/ContactForm";
import { Aurora, Kicker } from "../components/fx/Fx";

const WHATSAPP = "https://wa.me/919309193613?text=" + encodeURIComponent("Hi! I'd like to book a demo of Infovion for my school.");

const contactMethods = [
  { icon: <MessageCircle className="h-5 w-5 text-[#25D366]" />, title: "WhatsApp", value: "+91 93091 93613", sub: "Fastest reply", href: WHATSAPP },
  { icon: <Phone className="h-5 w-5 text-teal-300" />, title: "Call us", value: "+91 91563 02024", sub: "Mon – Sun, 9 am – 10 pm", href: "tel:+919156302024" },
  { icon: <Mail className="h-5 w-5 text-teal-300" />, title: "Email", value: "contact@infovion.in", sub: "Reply within 2 hours", href: "mailto:contact@infovion.in" },
  { icon: <MapPin className="h-5 w-5 text-teal-300" />, title: "Based in", value: "Pune, Maharashtra", sub: "Serving schools across India", href: "https://www.google.com/maps/search/?api=1&query=Pune,Maharashtra" },
];

const steps = [
  "We call you within 2 hours to fix a time that suits you.",
  "A 30–45 minute live walkthrough, set up for your board, classes and fee structure.",
  "You see every module and portal working with real-looking data.",
  "No pressure, no contract. Start a free trial whenever you're ready.",
];

const faqs = [
  { q: "How long does the demo take?", a: "About 30–45 minutes. We walk through every module and portal with your school's specifics — class structure, fee heads and board — so you see exactly how Infovion would work for you." },
  { q: "Is there any cost for the demo?", a: "No. The demo is free, with no commitment, card or contract." },
  { q: "How soon can our school go live?", a: "Most schools are set up in a single session. The guided setup creates your institution, academic year, classes and subjects for you — no IT team needed." },
  { q: "Does Infovion work for ICSE and State Board schools?", a: "Yes. Subjects, fee heads, TC formats and roll numbers follow Indian board conventions — CBSE, ICSE and State Boards." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Contact() {
  return (
    <div className="bg-ink">
      <Helmet>
        <title>Book a free demo — Infovion School Management Software | Pune</title>
        <meta name="description" content="Book a free 30–45 minute demo of Infovion school management software. We walk through fees, attendance, exams, certificates and the parent portal for your school. Call, WhatsApp or fill in the form." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.infovion.in/contact" />
        <meta property="og:title" content="Book a free demo of Infovion" />
        <meta property="og:description" content="A live walkthrough of Infovion school management software, set up for your school. Free, no commitment." />
        <meta property="og:url" content="https://www.infovion.in/contact" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="noise relative overflow-hidden pb-36 pt-32 sm:pt-40">
        <Aurora strong />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
          <Kicker>Free live demo</Kicker>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl">
            See Infovion run <span className="text-gradient-aurora">your school.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-400">
            A 30–45 minute walkthrough of every module and portal, set up around your board, classes and fees. Free, with no commitment.
          </p>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
            <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-teal-300" /> We call back within 2 hours</li>
            <li className="flex items-center gap-2"><Video className="h-4 w-4 text-teal-300" /> Online or at your school (Pune)</li>
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-teal-300" /> No contract</li>
          </ul>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto -mt-24 grid max-w-6xl gap-8 px-5 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div className="glass relative rounded-3xl p-6 shadow-[0_50px_140px_-50px_rgba(45,212,191,0.5)] sm:p-9">
            <h2 className="font-display text-2xl font-extrabold text-white">Book your demo</h2>
            <p className="mb-7 mt-1 text-sm text-slate-400">Tell us where to reach you — we'll call to fix a time.</p>
            <ContactForm />
            <p className="mt-5 text-center text-xs text-slate-500">
              Rather try it yourself? <Link to="/free-trial" className="text-teal-300 underline">Start a 30-day free trial</Link> — ready in two minutes.
            </p>
          </div>

          <div className="space-y-6 lg:pt-6">
            <div className="grid grid-cols-2 gap-3">
              {contactMethods.map(({ icon, title, value, sub, href }) => (
                <a key={title} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="glass group rounded-2xl p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.06]">
                  {icon}
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
                  <p className="mt-0.5 break-words text-sm font-semibold text-white">{value}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{sub}</p>
                </a>
              ))}
            </div>

            <div className="glass rounded-3xl p-7">
              <h3 className="font-display text-lg font-bold text-white">What happens next</h3>
              <ol className="mt-4 space-y-3.5">
                {steps.map((t, i) => (
                  <li key={t} className="flex gap-3 text-sm text-slate-300">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-400/10 text-xs font-bold text-teal-300 ring-1 ring-teal-400/30">{i + 1}</span>
                    <span className="pt-0.5">{t}</span>
                  </li>
                ))}
              </ol>
            </div>

            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 rounded-2xl bg-[#25D366] px-5 py-4 text-sm font-bold text-[#04121a] transition hover:brightness-110">
              <span className="flex items-center gap-2"><MessageCircle className="h-5 w-5" /> Prefer WhatsApp? Message us now</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="relative pb-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <div className="text-center">
            <Kicker>Questions</Kicker>
            <h2 className="mt-5 font-display text-3xl font-extrabold text-white sm:text-4xl">Quick answers</h2>
          </div>
          <div className="mt-10 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="glass group rounded-2xl px-6 py-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-white">
                  {f.q}
                  <span className="text-lg leading-none text-teal-300 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-slate-400">
            <Sparkles className="mr-1.5 inline h-4 w-4 text-teal-300" />
            ₹150 per student per year, every module included. <Link to="/pricing" className="text-teal-300 underline">See pricing</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
