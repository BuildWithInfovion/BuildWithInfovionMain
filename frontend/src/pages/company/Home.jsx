import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Landmark } from "lucide-react";
import { CountUp, GhostButton, GlowButton, Kicker, Marquee, Reveal } from "../../components/fx/Fx";
import { CtaBand, FaqList, Icon, LinkRow, Section } from "../../components/site/Ui";
import { SERVICES, PROCESS, ENGAGEMENT } from "../../Data/services";
import { TECH } from "../../Data/company";
import { SolutionCards } from "./Solutions";
import { SHOWCASE } from "../../Data/showcase";

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

const HEADLINE = ["Custom", "software", "for", "businesses,", "institutions", "and"];

function Hero() {
  return (
    // The brand animation sits behind the page: on phones the logo occupies the upper third of the
    // screen, so the copy starts below it; on wider screens the copy sits to the left of the logo.
    <section className="hero-grid relative flex min-h-[100svh] flex-col pb-12 pt-[38svh] md:justify-center md:pb-24 md:pt-32">
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6">
        <div className="max-w-xl lg:max-w-2xl">
          <div className="rise"><Kicker live>Software and AI company · Pune, India</Kicker></div>
          <h1 className="mt-6 font-display text-[2.15rem] font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.9rem]">
            {HEADLINE.map((w, i) => <React.Fragment key={w}><span className="word" style={{ "--i": i }}>{w}</span>{" "}</React.Fragment>)}
            <span className="word text-gradient-aurora" style={{ "--i": HEADLINE.length }}>government</span>
          </h1>
          <p className="rise mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            We plan, build and support web applications, mobile apps, ERP systems, AI agents and automation. One team in Pune works with clients
            across India and abroad, at a fixed price agreed in writing.
            <span className="hidden sm:inline"> Our own products, Infovion School ERP and Infovion JMS, are in daily use in schools and jewellery shops.</span>
          </p>
          <div className="rise mt-9 flex flex-col gap-3 sm:flex-row">
            <GlowButton to="/contact" className="w-full sm:w-auto">Discuss a project <ArrowRight className="h-4 w-4" /></GlowButton>
            <GhostButton to="/case-studies" className="w-full sm:w-auto">See our work</GhostButton>
          </div>
          <ul className="rise mt-9 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-slate-300">
            {["Fixed price, in writing", "You own the source code", "MSME registered"].map((t) => (
              <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-sky-300" aria-hidden="true" />{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// Figures from our own products, counted on screen. The technology strip repeats the list under
// "Technologies we use", so it is hidden from assistive technology.
const STATS = [
  [2, "products in daily use", "School ERP and jewellery software"],
  [176, "application screens", "designed and built for Infovion School ERP"],
  [41, "backend modules", "running in one multi-tenant platform"],
  [10, "Indian languages", "on every screen of Infovion JMS"],
];

function Facts() {
  return (
    <section className="relative border-y border-white/10 bg-[rgba(2,4,9,0.72)]">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 px-5 sm:px-6 lg:grid-cols-4">
        {STATS.map(([n, t, d], i) => (
          <div key={t} className={`flex flex-col-reverse justify-end py-8 ${i % 2 ? "pl-5" : "pr-5"} lg:px-7 ${i ? "lg:border-l lg:border-white/10" : "lg:pl-0"} ${i > 1 ? "border-t border-white/10 lg:border-t-0" : ""}`}>
            <dt className="mt-2 text-sm text-slate-400"><span className="block font-display text-[15px] font-semibold text-white">{t}</span>{d}</dt>
            <dd className="stat-num font-display text-5xl font-extrabold leading-none tracking-tight sm:text-6xl"><CountUp to={n} /></dd>
          </div>
        ))}
      </dl>
      <div aria-hidden="true" className="border-t border-white/10 py-5">
        <Marquee items={TECH.flatMap(([, items]) => items.slice(0, 2))} />
      </div>
    </section>
  );
}

function Services() {
  return (
    <Section id="services" glow kicker="Services" title="What we" accent="do"
      sub="We take on complete projects as well as individual workstreams, from a single internal tool to a multi-role platform with mobile applications and integrations.">
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <Link key={s.slug} to={`/services/${s.slug}`} className="panel group flex h-full gap-4 rounded-2xl p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300 sm:flex-col sm:gap-0 sm:p-6">
            <span className="flex items-start justify-between">
              <span className="icon-chip"><Icon name={s.icon} className="h-5 w-5" /></span>
              <ArrowUpRight className="hidden h-5 w-5 text-slate-400 transition duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-300 sm:block" aria-hidden="true" />
            </span>
            <span className="block">
              <span className="block font-display text-base font-semibold text-white group-hover:text-sky-100 sm:mt-5 sm:text-[17px]">{s.name}</span>
              <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-slate-400 sm:mt-2 sm:line-clamp-none">{s.card}</span>
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

function Products() {
  const P = [
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
  return (
    <Section glow kicker="Our products" title="Software we build and" accent="operate"
      sub="Alongside client work, we develop two products that are in daily use. They are maintained by the same team and to the same standards as our client projects.">
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {P.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06}>
            <article className="panel lift group flex h-full flex-col overflow-hidden rounded-2xl">
              <div className="h-52 overflow-hidden border-b border-white/10 sm:h-60">
                <img src={p.img[0]} alt={p.img[1]} width="900" height="562" loading="lazy" decoding="async" className="h-full w-full object-cover object-left-top transition duration-[1200ms] ease-out group-hover:scale-[1.04]" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">{p.tag}</p>
                <h3 className="mt-2 font-display text-2xl font-bold text-white">{p.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-300">{p.body}</p>
                <ul className="mt-5 space-y-2">
                  {p.points.map((t) => <li key={t} className="flex gap-2.5 text-sm text-slate-300"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-300" aria-hidden="true" />{t}</li>)}
                </ul>
                <div className="mt-auto flex flex-wrap gap-6 pt-7">
                  <Link to={p.to} className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-sky-200">Product overview <ArrowRight className="h-4 w-4" /></Link>
                  <Link to={p.cs} className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-white">Case study <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Showcase() {
  return (
    <Section id="work" glow kicker="Solutions" title="Systems we design and" accent="build"
      sub="Six blueprints, each worked through to modules, data flow, technology, budget and timeline: AI agents on WhatsApp and in support, invoice automation, a hospital system, a stone crusher ERP and a real estate CRM.">
      <div className="mt-12"><SolutionCards items={SHOWCASE} /></div>
      <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
        <span>Screens are design mockups with sample data.</span>
        <Link to="/case-studies" className="inline-flex items-center gap-1.5 font-semibold text-sky-300 hover:text-sky-200">Case studies of delivered work <ArrowRight className="h-4 w-4" /></Link>
      </p>
    </Section>
  );
}

const TOOLS = [
  ["/app-development-cost-calculator", "App development cost calculator", "Platform, screens and features in; a budget range and timeline out."],
  ["/software-development-cost-calculator", "Software development cost calculator", "Website, web app, CRM, ERP or SaaS, by modules, roles and integrations."],
  ["/hire-developers-india-cost-calculator", "Developer cost calculator", "A dedicated developer in India against hiring in the US, UK, UAE or Australia."],
  ["/ai-automation-roi-calculator", "AI automation ROI calculator", "Hours saved, monthly saving and payback period for an automation."],
];

function Tools() {
  return (
    <Section kicker="Free tools" title="Work out your budget in" accent="two minutes"
      sub="Free calculators built on our own 2026 prices. No sign-up; share the result on WhatsApp or send it to us for an exact quote.">
      <div className="mt-10 grid border-t border-white/10 md:grid-cols-2 md:gap-x-12">
        {TOOLS.map(([to, t, b]) => <LinkRow key={to} to={to} icon="Calculator" title={t} body={b} />)}
      </div>
      <Link to="/free-tools" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-200">All free tools, including gold calculators and school certificates <ArrowRight className="h-4 w-4" /></Link>
    </Section>
  );
}

function Industries() {
  return (
    <Section glow kicker="Industries" title="Sectors we" accent="work in"
      sub="Our engineers spend time with the people who will use the software before design begins. Our two products came out of that work with schools and jewellery retailers.">
      <ul className="mt-10 grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4">
        {INDUSTRIES.map(([icon, t, to]) => (
          <li key={t} className="border-b border-white/10">
            <Link to={to} className="row-link group flex items-center gap-3 py-5 text-white transition-[padding,color] duration-500 hover:pl-2 hover:text-sky-200">
              <Icon name={icon} className="h-5 w-5 flex-shrink-0 text-sky-300" />
              <span className="flex-1 text-[15px] font-medium">{t}</span>
              <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-sky-300" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Process() {
  return (
    <Section glow kicker="How we work" title="Our delivery" accent="process"
      sub="Cost and timeline are agreed before development starts, and you review working software at the end of every two-week sprint.">
      <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
        {PROCESS.map(([t, b, when], i) => (
          <li key={t} className="bg-cell p-6 sm:p-7">
            <p className="flex items-baseline justify-between gap-4">
              <span className="stat-num font-display text-3xl font-extrabold leading-none">{String(i + 1).padStart(2, "0")}</span>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-slate-300">{when}</span>
            </p>
            <h3 className="mt-3 font-display text-lg font-semibold text-white">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{b}</p>
          </li>
        ))}
      </ol>

      <h3 className="mt-16 font-display text-xl font-semibold text-white">Engagement models</h3>
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {ENGAGEMENT.map(([t, b, pts], i) => (
          <Reveal key={t} delay={i * 0.05}>
            <div className="panel lift h-full rounded-2xl p-6">
              <h4 className="font-display text-lg font-semibold text-white">{t}</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{b}</p>
              <ul className="mt-4 space-y-1.5">{pts.map((p) => <li key={p} className="flex gap-2.5 text-sm text-slate-300"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-300" aria-hidden="true" />{p}</li>)}</ul>
            </div>
          </Reveal>
        ))}
      </div>
      <Link to="/how-we-work" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-200">Read more about how we work <ArrowRight className="h-4 w-4" /></Link>
    </Section>
  );
}

function Commitments() {
  return (
    <Section glow kicker="Working with Infovion" title="What clients can" accent="expect from us">
      <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {COMMITMENTS.map(([t, b], i) => (
          <div key={t} className="relative border-t border-white/15 pt-5">
            <span aria-hidden="true" className="absolute -top-px left-0 h-px w-14 bg-gradient-to-r from-sky-300 to-violet-300" />
            <p aria-hidden="true" className="mb-2 font-display text-xs font-semibold tracking-[0.2em] text-sky-300">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="font-display text-[17px] font-semibold text-white">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{b}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Government() {
  return (
    <section className="px-5 py-12 sm:px-6">
      <div className="mesh mx-auto grid max-w-6xl gap-10 rounded-3xl border border-white/10 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <Kicker>Government and public sector</Kicker>
          <h2 className="heading-sheen mt-5 font-display text-[1.9rem] font-bold leading-[1.15] tracking-tight text-white sm:text-[2.2rem]">Digital services for departments, local bodies and PSUs</h2>
          <p className="mt-4 max-w-xl text-slate-300">
            Websites, citizen service portals, MIS dashboards, mobile applications and annual maintenance contracts, developed to the
            accessibility, security and data residency requirements of public sector work.
          </p>
          <GhostButton to="/government" className="mt-8"><Landmark className="h-4 w-4" /> Government capabilities</GhostButton>
        </div>
        <ul className="grid gap-x-6 sm:grid-cols-2">
          {["GIGW 3.0 aligned", "WCAG 2.1 AA accessibility", "CERT-In security practices", "DPDP Act, 2023 compliance", "Data hosted in India", "MSE registered (Udyam)"].map((t) => (
            <li key={t} className="flex items-center gap-2.5 border-b border-white/10 py-3.5 text-sm text-slate-200"><Check className="h-4 w-4 flex-shrink-0 text-sky-300" aria-hidden="true" />{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <Section glow kicker="Technology" title="Technologies we" accent="use"
      sub="We work with established, well-supported technologies, so the systems we deliver are straightforward to host, maintain and staff in the years after launch.">
      <dl className="mt-10 border-t border-white/10">
        {TECH.map(([group, items]) => (
          <div key={group} className="grid gap-2 border-b border-white/10 py-4 sm:grid-cols-[10rem_1fr] sm:items-baseline">
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{group}</dt>
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
      <Facts />
      <Services />
      <Showcase />
      <Products />
      <Tools />
      <Industries />
      <Process />
      <Commitments />
      <Government />
      <Stack />
      <FaqList faqs={FAQ} />
      <CtaBand />
    </>
  );
}
