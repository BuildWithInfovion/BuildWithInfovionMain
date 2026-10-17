import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, FileLock2, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Timer } from "lucide-react";
import ContactForm from "../../components/ContactForm";
import { Aurora, Kicker } from "../../components/fx/Fx";
import { Breadcrumbs, FaqList } from "../../components/site/Ui";
import { COMPANY, SITE, fullAddress, wa } from "../../Data/company";

const MAP = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress())}`;

const METHODS = [
  { icon: <MessageCircle className="h-5 w-5 text-[#25D366]" />, title: "WhatsApp", value: COMPANY.whatsapp, sub: "Fastest reply", href: wa("Hi Infovion! I'd like to discuss a project.") },
  { icon: <Phone className="h-5 w-5 text-teal-300" />, title: "Call", value: COMPANY.phone, sub: COMPANY.hours, href: COMPANY.phoneHref },
  { icon: <Mail className="h-5 w-5 text-teal-300" />, title: "Email", value: COMPANY.email, sub: "Reply within one working day", href: `mailto:${COMPANY.email}` },
  { icon: <MapPin className="h-5 w-5 text-teal-300" />, title: "Office", value: "Mahalunge, Pune 411045", sub: "Meetings by appointment", href: MAP },
];

const STEPS = [
  "We reply within one working day — usually within a few hours.",
  "A free 30–45 minute call to understand what you need (or a product demo).",
  "For projects: a written scope and fixed quote, typically within 48 hours.",
  "You decide. No pressure, no lock-in — and we sign an NDA first if you want.",
];

const FAQ = [
  ["How quickly will you respond?", "Within one working day, and usually within a few hours between 9 am and 10 pm IST. WhatsApp is the fastest way to reach us."],
  ["Can we meet in person?", `Yes — in Pune by appointment, at our office in Mahalunge or at your premises. For clients elsewhere in India and abroad we meet on video calls.`],
  ["Is the first consultation free?", "Yes. The discovery call, product demos and the written quote are free, with no obligation."],
  ["Do you work with international clients?", "Yes. We work remotely with clients outside India, invoice in INR or USD, and schedule calls in your time zone."],
];

export default function Contact() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Infovion Technologies",
    url: `${SITE}/contact`,
    mainEntity: { "@id": `${SITE}/#organization` },
  };
  return (
    <div className="bg-ink">
      <Helmet>
        <title>Contact Infovion Technologies — Get a Free Quote | Software Company in Pune</title>
        <meta name="description" content={`Contact Infovion Technologies, a software development company in Pune: get a free quote for custom software, websites, apps, ERP or AI, or book a demo of Infovion School ERP or JMS. Call ${COMPANY.phone} or WhatsApp ${COMPANY.whatsapp}.`} />
        <link rel="canonical" href={`${SITE}/contact`} />
        <meta property="og:title" content="Contact Infovion Technologies" />
        <meta property="og:description" content="Free consultation and fixed quotes for software projects, and free demos of our school and jewellery software." />
        <meta property="og:url" content={`${SITE}/contact`} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="noise relative overflow-hidden pb-36 pt-28 sm:pt-36">
        <Aurora strong />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
          <Breadcrumbs trail={[["Contact", "/contact"]]} className="mb-6" />
          <Kicker>Contact</Kicker>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl">
            Tell us what you want <span className="text-gradient-aurora">to build.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            A software project, a website, a government requirement or a demo of our school or jewellery software — one form, and a real person replies.
          </p>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
            <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-teal-300" /> Reply within one working day</li>
            <li className="flex items-center gap-2"><Timer className="h-4 w-4 text-teal-300" /> Fixed quote in ~48 hours</li>
            <li className="flex items-center gap-2"><FileLock2 className="h-4 w-4 text-teal-300" /> NDA on request</li>
          </ul>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="mx-auto -mt-24 grid max-w-6xl gap-8 px-5 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div className="glass relative rounded-3xl p-6 shadow-[0_50px_140px_-50px_rgba(45,212,191,0.5)] sm:p-9">
            <h2 className="font-display text-2xl font-extrabold text-white">Send an enquiry</h2>
            <p className="mb-7 mt-1 text-sm text-slate-400">Choose what you need — the form adapts.</p>
            <ContactForm />
            <p className="mt-5 text-center text-xs text-slate-500">
              School looking to try it yourself? <Link to="/free-trial" className="text-teal-300 underline">Start a 30-day free trial</Link> of Infovion School ERP.
            </p>
          </div>

          <div className="space-y-6 lg:pt-6">
            <div className="grid grid-cols-2 gap-3">
              {METHODS.map(({ icon, title, value, sub, href }) => (
                <a key={title} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="glass group rounded-2xl p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.06]">
                  {icon}
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
                  <p className="mt-0.5 break-words text-sm font-semibold text-white">{value}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{sub}</p>
                </a>
              ))}
            </div>

            <div className="glass rounded-3xl p-7">
              <h3 className="font-display text-lg font-bold text-white">What happens next</h3>
              <ol className="mt-4 space-y-3.5">
                {STEPS.map((t, i) => (
                  <li key={t} className="flex gap-3 text-sm text-slate-300">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-400/10 text-xs font-bold text-teal-300 ring-1 ring-teal-400/30">{i + 1}</span>
                    <span className="pt-0.5">{t}</span>
                  </li>
                ))}
              </ol>
            </div>

            <address className="glass rounded-3xl p-7 not-italic">
              <h3 className="font-display text-lg font-bold text-white">{COMPANY.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{fullAddress()}</p>
              <p className="mt-2 text-sm text-slate-400">{COMPANY.hours}</p>
              <p className="mt-3 flex items-center gap-2 text-xs text-slate-400"><ShieldCheck className="h-4 w-4 text-teal-300" /> MSME — Udyam {COMPANY.udyam}</p>
              <a href={MAP} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300">Open in Google Maps <ArrowUpRight className="h-4 w-4" /></a>
            </address>
          </div>
        </div>
      </section>

      <FaqList faqs={FAQ} title="Before you" accent="get in touch" />
    </div>
  );
}
