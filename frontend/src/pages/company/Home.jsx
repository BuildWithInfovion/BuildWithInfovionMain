import React, { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion as Motion, useScroll, useTransform } from "framer-motion";
import { GhostButton, GlowButton, Tilt } from "../../components/fx/Fx";
import { CtaBand, FaqList, Section } from "../../components/site/Ui";
import Stage from "../../components/home/Stage";
import Bento from "../../components/home/Bento";
import WorkRail from "../../components/home/WorkRail";
import Reach from "../../components/home/Reach";
import { SERVICES, PROCESS, ENGAGEMENT } from "../../Data/services";
import { TECH } from "../../Data/company";

const FAQ = [
  ["What does Infovion Technologies do?", "Infovion Technologies is a software development company based in Pune, India. We build custom software, websites and web applications, mobile applications, ERP and CRM systems, SaaS products, dashboards, AI agents, WhatsApp chatbots and business automation for businesses, institutions and government bodies. We also develop two products of our own: Infovion School ERP and Infovion JMS, a jewellery management system."],
  ["Do you work with clients outside Pune and outside India?", "Yes. Most of our engagements are delivered remotely, with scheduled video reviews, a shared project board and a staging environment the client can access at any time. Our working hours overlap with the Gulf, the United Kingdom and Europe, and we schedule calls for clients in the Americas."],
  ["How is a project priced?", "After an initial consultation we send a written scope and a fixed-price proposal, with payments linked to milestones. As a guide, focused business tools in India typically cost ₹75,000 to 2 lakh and multi-module systems ₹2.5 to 8 lakh. Websites start at about ₹15,000."],
  ["Who owns the source code?", "The client. On final payment the complete source code, database, domain and hosting accounts are transferred to you, and the agreement states this explicitly."],
  ["Do you sign a non-disclosure agreement?", "Yes. We sign a mutual NDA before any business information is shared."],
  ["Do you build AI agents and automation?", "Yes. We build AI agents for customer support and lead qualification, WhatsApp chatbots on the official Business API, invoice and document extraction posted to Tally or an ERP, and workflow automation. Each project starts with a proof of concept on your own data, typically ₹50,000 to ₹1.5 lakh."],
  ["How much does it cost to build an app or software in India?", "An installable progressive web app typically costs ₹60,000 to 2.5 lakh, an Android and iOS first release ₹2 to 6 lakh, a CRM ₹1 to 3 lakh and an ERP ₹3 to 10 lakh. Our free app and software cost calculators give a range for your own scope."],
  ["What support do you provide after launch?", "Every project includes thirty days of support after go-live. After that, clients can choose a monthly or annual maintenance contract covering fixes, updates, backups, monitoring and minor enhancements."],
  ["Do you take up government and public sector work?", "Yes. Infovion Technologies is a Udyam-registered MSME. We develop websites aligned with GIGW 3.0 and WCAG 2.1 AA, e-governance portals, MIS dashboards and mobile applications, with data hosted in India."],
];

const COMMITMENTS = [
  ["Fixed-price proposals", "A written scope and price before work begins. Any change in scope is estimated and approved before it is carried out."],
  ["Client-owned code and accounts", "Source code, database, domain and cloud accounts are held in the client's name."],
  ["Fortnightly releases", "Working software on a staging environment every two weeks, reviewed with your team."],
  ["A named point of contact", "One project lead who is reachable by phone, email and WhatsApp throughout the engagement."],
  ["Security as standard", "Role-based access, encrypted connections, audit logs and automated backups in every system we deliver."],
  ["Support after launch", "Thirty days of support included, with maintenance contracts available thereafter."],
];

const INDUSTRIES = [
  ["GraduationCap", "Education", "/school-management-software"],
  ["Gem", "Jewellery and bullion", "/jewellery-management-software"],
  ["Landmark", "Government and PSUs", "/government"],
  ["Store", "Retail and distribution", "/industries#retail"],
  ["Factory", "Manufacturing", "/industries#manufacturing"],
  ["HeartPulse", "Healthcare", "/healthcare-software-development"],
  ["Truck", "Mining and construction materials", "/industries#mining"],
  ["Building2", "Real estate and services", "/industries#services"],
];

const TOOLS = [
  ["/app-development-cost-calculator", "App development cost calculator", "Platform, screens and features in; a budget range and timeline out."],
  ["/software-development-cost-calculator", "Software development cost calculator", "Website, web app, CRM, ERP or SaaS, by modules, roles and integrations."],
  ["/hire-developers-india-cost-calculator", "Developer cost calculator", "A dedicated developer in India against hiring in the US, UK, UAE or Australia."],
  ["/ai-automation-roi-calculator", "AI automation ROI calculator", "Hours saved, monthly saving and payback period for an automation."],
];

const HEADLINE = ["Custom software for", "businesses, institutions", "and government"];

function Hero() {
  return (
    // The brand animation sits behind the page: on phones the logo occupies the upper third of the
    // screen, so the copy starts below it; on wider screens the copy sits to the left of the logo.
    <section className="relative pt-[38svh] md:pt-44">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        <h1 className="font-display max-w-3xl text-[2.5rem] leading-[1.02] text-white sm:text-6xl lg:text-[4.6rem]">
          {HEADLINE.map((l, i) => <span key={l} className="line"><span style={{ "--i": i }}>{l}{i < HEADLINE.length - 1 ? " " : ""}</span></span>)}
        </h1>
        <p className="fade-up mt-7 max-w-xl text-lg leading-relaxed text-slate-300" style={{ "--d": "350ms" }}>
          We plan, build and support web applications, mobile apps, ERP systems, AI agents and automation. One team in Pune, working with
          clients across India and abroad, at a fixed price agreed in writing.
        </p>
        <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--d": "450ms" }}>
          <GlowButton to="/contact" className="w-full sm:w-auto">Discuss a project</GlowButton>
          <GhostButton to="/case-studies" className="w-full sm:w-auto">See our work</GhostButton>
        </div>
      </div>
      <div className="fade-up" style={{ "--d": "600ms" }}><Stage /></div>
    </section>
  );
}

// Very large outlined words that slide sideways as the page moves: what we build, at a glance
function Kinetic() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const a = useTransform(scrollYProgress, [0, 1], ["2%", "-28%"]);
  const b = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);
  const row = "whitespace-nowrap font-display text-[15vw] font-semibold leading-[0.95] tracking-[-0.05em] lg:text-[9.5rem]";
  return (
    <div ref={ref} aria-hidden="true" className="overflow-hidden py-20 sm:py-28">
      <Motion.p style={{ x: a }} className={`${row} text-white`}>Web apps <span className="text-outline">Mobile apps</span> ERP <span className="text-outline">SaaS</span></Motion.p>
      <Motion.p style={{ x: b }} className={`${row} text-outline`}>AI agents <span className="text-white">Automation</span> Dashboards <span className="text-white">Support</span></Motion.p>
    </div>
  );
}

function Capabilities() {
  return (
    <section id="services" className="relative scroll-mt-24 pb-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <p className="kicker-pill">Services</p>
        <h2 className="font-display mt-4 max-w-3xl text-[2rem] leading-[1.08] text-white sm:text-5xl">What we build, <span className="text-gradient-aurora">shown running.</span></h2>
        <Bento />
        <h3 className="mt-16 text-sm font-medium text-slate-400">Every service</h3>
        <ul className="mt-5 grid gap-x-10 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <li key={s.slug} className="border-b border-white/10">
              <Link to={`/services/${s.slug}`} className="group flex items-center justify-between gap-4 py-4 text-[15px] text-slate-200 transition-colors hover:text-white">
                {s.name}
                <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-slate-600 transition-colors group-hover:text-sky-300" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const PRODUCTS = [
  {
    name: "Infovion School ERP", tag: "School management software", to: "/school-management-software", cs: "/case-studies/school-erp-platform",
    img: ["/product/dashboard-900.webp", "Infovion School ERP dashboard showing students, fee collection, dues and attendance"],
    body: "A multi-tenant platform for K-12 schools covering admissions, fees, attendance, examinations, transport, certificates and parent communication, with separate portals for eight roles.",
    points: ["Fee collection by UPI directly to the school's account", "Report cards, certificates and receipts generated as PDF", "Parent and staff mobile access"],
  },
  {
    name: "Infovion JMS", tag: "Jewellery management software", to: "/jewellery-management-software", cs: "/case-studies/jewellery-management-system",
    img: ["/product/jms/billing-900.webp", "New bill in Infovion JMS with scanned pieces, weights, rates and making charges"],
    body: "Software for jewellery shops in India and abroad: billing by weight and purity, barcode tags and scanning, stock audit, girvi loans, customer credit and GST or VAT invoices. Free demo on a call.",
    points: ["Barcode tags, billing by scan and stock audit", "Girvi register with interest calculated to date", "Tally export for the accountant"],
  },
];

function Products() {
  return (
    <Section kicker="Our products" title="Software we build" accent="and operate ourselves."
      sub="Alongside client work, we develop two products that are in daily use. They are maintained by the same team and to the same standards as our client projects.">
      <div className="mt-14 space-y-20">
        {PRODUCTS.map((p, i) => (
          <article key={p.name} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Tilt max={4} className={i % 2 ? "lg:order-2" : ""}>
              <div className="overflow-hidden rounded-xl border border-white/10 shadow-[0_40px_100px_-50px_rgba(56,182,255,0.45)]">
                <img src={p.img[0]} alt={p.img[1]} width="900" height="562" loading="lazy" decoding="async" className="block w-full" />
              </div>
            </Tilt>
            <div>
              <p className="text-sm text-slate-400">{p.tag}</p>
              <h3 className="font-display mt-2 text-3xl text-white sm:text-4xl">{p.name}</h3>
              <p className="mt-4 text-base leading-relaxed text-slate-300">{p.body}</p>
              <ul className="mt-6 border-t border-white/10">
                {p.points.map((t) => <li key={t} className="border-b border-white/10 py-3 text-[15px] text-slate-200">{t}</li>)}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <GhostButton to={p.to}>Product overview</GhostButton>
                <Link to={p.cs} className="inline-flex items-center px-3 text-sm font-medium text-slate-300 underline decoration-white/25 underline-offset-4 hover:text-white">Case study</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

// The six stages are a real sequence, so they are numbered. A line down the side fills as the
// visitor moves through them.
function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="kicker-pill">How we work</p>
          <h2 className="font-display mt-4 text-[2rem] leading-[1.08] text-white sm:text-5xl">Cost and timeline agreed <span className="text-gradient-aurora">before a line is written.</span></h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300">You review working software at the end of every two-week sprint, on a link you can open at any time.</p>
          <GhostButton to="/how-we-work" className="mt-8">How we work</GhostButton>
        </div>
        <ol ref={ref} className="relative">
          <span aria-hidden="true" className="absolute bottom-2 left-[0.6rem] top-2 w-px bg-white/10" />
          <Motion.span aria-hidden="true" style={{ scaleY: scrollYProgress, transformOrigin: "50% 0%" }} className="absolute bottom-2 left-[0.6rem] top-2 w-px bg-sky-300" />
          {PROCESS.map(([t, b, when], i) => (
            <li key={t} className="relative pb-10 pl-12 last:pb-0">
              <span aria-hidden="true" className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-[#05060a] font-mono text-[10px] text-slate-300">{i + 1}</span>
              <p className="flex flex-wrap items-baseline justify-between gap-x-4">
                <span className="font-display text-xl text-white">{t}</span>
                <span className="font-mono text-xs text-slate-400">{when}</span>
              </p>
              <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-slate-400">{b}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="mx-auto mt-20 max-w-6xl px-5 sm:px-6">
        <h3 className="text-sm font-medium text-slate-400">Engagement models</h3>
        <div className="mt-5 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 lg:grid-cols-3">
          {ENGAGEMENT.map(([t, b, pts]) => (
            <div key={t} className="bg-[#080a0f] p-7">
              <h4 className="font-display text-lg text-white">{t}</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{b}</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-300">{pts.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Commitments() {
  return (
    <Section kicker="Working with Infovion" title="What clients can expect" accent="from us.">
      <dl className="mt-12 grid gap-x-16 border-t border-white/10 md:grid-cols-2">
        {COMMITMENTS.map(([t, b]) => (
          <div key={t} className="grid gap-2 border-b border-white/10 py-6 sm:grid-cols-[13rem_1fr] sm:gap-6">
            <dt className="font-display text-[17px] text-white">{t}</dt>
            <dd className="text-sm leading-relaxed text-slate-400">{b}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function Sectors() {
  return (
    <Section kicker="Industries" title="Sectors we work in"
      sub="Our engineers spend time with the people who will use the software before design begins. Our two products came out of that work with schools and jewellery retailers.">
      <ul className="mt-10 flex flex-wrap gap-2.5">
        {INDUSTRIES.map(([, t, to]) => (
          <li key={t}><Link to={to} className="inline-block rounded-full border border-white/12 px-5 py-2.5 text-[15px] text-slate-200 transition-colors hover:border-white/40 hover:text-white">{t}</Link></li>
        ))}
      </ul>
    </Section>
  );
}

function Tools() {
  return (
    <Section kicker="Free tools" title="Work out your budget" accent="in two minutes."
      sub="Free calculators built on our own 2026 prices. No sign-up; share the result on WhatsApp or send it to us for an exact quote.">
      <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-2">
        {TOOLS.map(([to, t, b]) => (
          <Link key={to} to={to} className="group bg-[#080a0f] p-7 transition-colors hover:bg-[#0c0f16]">
            <span className="flex items-start justify-between gap-4">
              <span className="font-display text-lg text-white">{t}</span>
              <ArrowUpRight className="mt-1 h-4 w-4 flex-shrink-0 text-slate-600 transition-colors group-hover:text-sky-300" aria-hidden="true" />
            </span>
            <span className="mt-2 block text-sm leading-relaxed text-slate-400">{b}</span>
          </Link>
        ))}
      </div>
      <Link to="/free-tools" className="mt-7 inline-block text-sm font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">All free tools, including gold calculators and school certificates</Link>
    </Section>
  );
}

function Government() {
  return (
    <section className="px-5 py-12 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 rounded-2xl border border-white/10 bg-[#080a0f] p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <p className="kicker-pill">Government and public sector</p>
          <h2 className="font-display mt-4 text-[1.9rem] leading-[1.1] text-white sm:text-4xl">Digital services for departments, local bodies and PSUs</h2>
          <p className="mt-4 max-w-xl text-slate-300">
            Websites, citizen service portals, MIS dashboards, mobile applications and annual maintenance contracts, developed to the
            accessibility, security and data residency requirements of public sector work.
          </p>
          <GhostButton to="/government" className="mt-8">Government capabilities</GhostButton>
        </div>
        <ul className="grid gap-x-8 sm:grid-cols-2">
          {["GIGW 3.0 aligned", "WCAG 2.1 AA accessibility", "CERT-In security practices", "DPDP Act, 2023 compliance", "Data hosted in India", "MSE registered (Udyam)"].map((t) => (
            <li key={t} className="border-b border-white/10 py-3.5 text-sm text-slate-200">{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <Section kicker="Technology" title="Technologies we use"
      sub="We work with established, well-supported technologies, so the systems we deliver are straightforward to host, maintain and staff in the years after launch.">
      <dl className="mt-10 border-t border-white/10">
        {TECH.map(([group, items]) => (
          <div key={group} className="grid gap-2 border-b border-white/10 py-4 sm:grid-cols-[10rem_1fr] sm:items-baseline">
            <dt className="text-sm text-slate-400">{group}</dt>
            <dd className="text-[15px] text-slate-200">{items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Software Development & AI Automation Company, Pune | Infovion</title>
        <meta name="description" content="Infovion Technologies, Pune: custom software, mobile apps, ERP, SaaS, AI agents and automation for clients in India and abroad, at a fixed price agreed upfront." />
        <link rel="canonical" href="https://www.infovion.in/" />
        <meta property="og:title" content="Infovion Technologies | Software Development Company in Pune, India" />
        <meta property="og:description" content="Custom software, web and mobile applications, ERP, SaaS, AI agents and automation for businesses, institutions and government. Pune, India." />
        <meta property="og:url" content="https://www.infovion.in/" />
      </Helmet>
      <Hero />
      <Kinetic />
      <Capabilities />
      <WorkRail />
      <Products />
      <Reach />
      <Process />
      <Commitments />
      <Tools />
      <Sectors />
      <Government />
      <Stack />
      <FaqList faqs={FAQ} />
      <CtaBand />
    </>
  );
}
