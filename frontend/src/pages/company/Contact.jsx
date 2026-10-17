import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ContactForm from "../../components/ContactForm";
import { Kicker } from "../../components/fx/Fx";
import { Breadcrumbs, FaqList } from "../../components/site/Ui";
import { COMPANY, SITE, fullAddress, wa } from "../../Data/company";

const MAP = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress())}`;

const METHODS = [
  ["Email", COMPANY.email, `mailto:${COMPANY.email}`],
  ["Phone", COMPANY.phone, COMPANY.phoneHref],
  ["WhatsApp", COMPANY.whatsapp, wa("Hello Infovion, I would like to discuss a project.")],
];

const STEPS = [
  "We acknowledge your enquiry within one business day.",
  "We arrange a consultation of thirty to forty-five minutes, or a product demonstration.",
  "For projects, we send a written scope and fixed-price proposal, usually within two business days.",
  "A mutual non-disclosure agreement can be signed before you share details.",
];

const FAQ = [
  ["How quickly will you respond?", "Within one business day, and usually sooner between 9 am and 10 pm IST."],
  ["Can we meet in person?", "Yes. Meetings in Pune can be arranged by appointment at our office or at your premises. For clients elsewhere in India and overseas, we meet by video call."],
  ["Is there a charge for the initial consultation?", "No. The consultation, product demonstrations and the written proposal are provided free of charge and without obligation."],
  ["Do you work with international clients?", "Yes. We work remotely with clients outside India, invoice in INR or USD, and schedule meetings in the client's time zone."],
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
    <>
      <Helmet>
        <title>Contact Infovion Technologies | Software Development Company in Pune</title>
        <meta name="description" content={`Contact Infovion Technologies, a software development company in Pune, to discuss custom software, websites, mobile applications, ERP or AI automation, or to arrange a demonstration of Infovion School ERP or JMS. Phone ${COMPANY.phone}.`} />
        <link rel="canonical" href={`${SITE}/contact`} />
        <meta property="og:title" content="Contact Infovion Technologies" />
        <meta property="og:description" content="Discuss a software project or arrange a product demonstration." />
        <meta property="og:url" content={`${SITE}/contact`} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="relative pb-20 pt-32 sm:pt-40">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div>
            <Breadcrumbs trail={[["Contact", "/contact"]]} className="mb-8" />
            <Kicker>Contact</Kicker>
            <h1 className="mt-5 font-display text-[2.4rem] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">Contact us</h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
              Tell us about your project, a government requirement, or the product you would like to see. A member of our team will respond within one business day.
            </p>

            <dl className="mt-10 border-t border-white/10">
              {METHODS.map(([t, v, href]) => (
                <div key={t} className="flex items-baseline justify-between gap-4 border-b border-white/10 py-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{t}</dt>
                  <dd><a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="text-[15px] font-medium text-white hover:text-sky-200">{v}</a></dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-4 border-b border-white/10 py-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Hours</dt>
                <dd className="text-[15px] text-white">{COMPANY.hours}</dd>
              </div>
            </dl>

            <address className="mt-8 not-italic">
              <p className="font-display font-semibold text-white">{COMPANY.name}</p>
              <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-slate-300">{fullAddress()}</p>
              <p className="mt-1.5 text-sm text-slate-400">MSME, Udyam {COMPANY.udyam}</p>
              <a href={MAP} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200">View on Google Maps <ArrowUpRight className="h-4 w-4" /></a>
            </address>

            <div className="mt-10">
              <h2 className="font-display text-lg font-semibold text-white">What happens next</h2>
              <ol className="mt-4 space-y-3">
                {STEPS.map((t, i) => (
                  <li key={t} className="flex gap-4 text-sm leading-relaxed text-slate-300">
                    <span className="font-display font-semibold text-sky-300">{String(i + 1).padStart(2, "0")}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="glass h-fit rounded-xl p-6 sm:p-9 lg:mt-14">
            <h2 className="font-display text-xl font-semibold text-white">Send an enquiry</h2>
            <p className="mb-7 mt-1 text-sm text-slate-400">Fields marked * are required.</p>
            <ContactForm />
            <p className="mt-6 text-center text-xs text-slate-400">
              For schools: you can also <Link to="/free-trial" className="text-sky-300 underline underline-offset-2">start a 30-day free trial</Link> of Infovion School ERP.
            </p>
          </div>
        </div>
      </section>

      <FaqList faqs={FAQ} />
    </>
  );
}
