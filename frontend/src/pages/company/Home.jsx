import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight, BadgeCheck, Check, FileLock2, Gem, GraduationCap, Handshake, KeyRound, Landmark, MapPin, MessageCircle, Receipt,
  ShieldCheck, Sparkles, Timer, Workflow,
} from "lucide-react";
import { BrowserFrame } from "../../components/product/Frames";
import { Aurora, GhostButton, GlowButton, Kicker, Reveal, SpotlightCard, Tilt } from "../../components/fx/Fx";
import { AnswerBox, CtaBand, FaqList, Icon, LinkCard, Section } from "../../components/site/Ui";
import { SERVICES, PROCESS, ENGAGEMENT } from "../../Data/services";
import { COMPANY, TECH } from "../../Data/company";

const FAQ = [
  ["What does Infovion Technologies do?", "Infovion Technologies is a software development company in Pune, India. We build custom software, websites and web applications, mobile apps, ERP and CRM systems, SaaS products, dashboards and AI automation for businesses, institutions and government bodies — and we make two products of our own: Infovion School ERP and Infovion JMS jewellery management software."],
  ["Do you work with clients outside Pune and outside India?", "Yes. We work remotely with clients across India and abroad, with regular video calls, a shared project board and a staging link you can open any time. Our working hours (IST) overlap with the Gulf, UK and Europe, and we schedule calls for US time zones."],
  ["How much does custom software development cost?", "In India, a focused business tool typically costs ₹1.5–4 lakh and a multi-module business system ₹4–15 lakh; websites start from about ₹25,000. Infovion gives a fixed written quote after a free discovery call, so you know the full cost before work starts."],
  ["Who owns the source code?", "You do. On final payment, the complete source code, database and the hosting and app-store accounts are in your name, and the agreement says so."],
  ["Do you sign an NDA?", "Yes. We sign a mutual non-disclosure agreement before you share any business details."],
  ["Do you provide support after launch?", "Every project includes 30 days of free support after launch. After that you can choose a monthly or yearly maintenance plan (AMC) covering fixes, updates, backups, monitoring and small improvements."],
  ["Can Infovion work on government projects?", "Yes. Infovion Technologies is an MSME registered under Udyam (UDYAM-MH-26-1125911). We build GIGW 3.0 and WCAG 2.1 AA aligned websites, e-governance portals, MIS dashboards and mobile apps, with data hosted in India."],
];

function Hero() {
  return (
    <section className="noise relative overflow-hidden bg-ink pb-20 pt-28 sm:pt-36">
      <Aurora strong />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <div className="rise"><Kicker>Software development company · Pune, India</Kicker></div>
          <h1 className="rise mt-7 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[4.1rem]">
            We build the software <span className="text-gradient-aurora">your business runs on.</span>
          </h1>
          <p className="rise mt-7 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Custom software, web and mobile apps, ERP, SaaS and AI automation — designed, built and supported by one accountable team.
            We don't only build for clients — our own products are in use at a school and a jewellery store.
          </p>
          <div className="rise mt-9 flex flex-col gap-3 sm:flex-row">
            <GlowButton to="/contact" className="w-full sm:w-auto">Get a free quote <ArrowRight className="h-4 w-4" /></GlowButton>
            <GhostButton to="/case-studies" className="w-full sm:w-auto">See our work</GhostButton>
          </div>
          <ul className="rise mt-8 grid max-w-xl grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-slate-300">
            {[["Fixed quote within 48 hours", Timer], ["You own the source code", KeyRound], ["NDA before you share details", FileLock2], ["MSME (Udyam) registered", BadgeCheck]].map(([t, I]) => (
              <li key={t} className="flex items-center gap-2"><I className="h-4 w-4 flex-shrink-0 text-teal-300" aria-hidden="true" />{t}</li>
            ))}
          </ul>
        </div>

        <div className="rise relative">
          <Tilt max={5}>
            <BrowserFrame url="app.infovion.in">
              <img src="/product/dashboard-900.webp" srcSet="/product/dashboard-900.webp 900w, /product/dashboard.webp 1800w" sizes="(min-width: 1024px) 560px, 92vw" alt="Infovion School ERP dashboard built by Infovion Technologies: students, fee collection, dues and attendance" width="1800" height="1125" className="block w-full" fetchpriority="high" />
            </BrowserFrame>
          </Tilt>
          <div className="absolute -bottom-10 -left-4 w-[52%] sm:-left-10">
            <BrowserFrame url="jms · invoice">
              <img src="/product/jms/invoice-900.webp" alt="GST tax invoice from Infovion JMS jewellery software with purity, weight, rate per gram and making charges" width="900" height="949" loading="lazy" className="block max-h-[260px] w-full object-cover object-top" />
            </BrowserFrame>
          </div>
          <div className="glass float-y absolute -right-2 top-6 hidden items-center gap-3 rounded-2xl px-4 py-3 shadow-2xl md:flex lg:-right-8">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-300 to-cyan-500 text-[#04121a]"><Sparkles className="h-4 w-4" /></span>
            <span><span className="block text-sm font-bold text-white">2 products in production</span><span className="block text-[11px] text-slate-400">Built, run and supported by us</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Proof() {
  const items = [
    ["12", "services, one accountable team"],
    ["40+", "backend modules in our school ERP"],
    ["8", "role-based portals shipped"],
    ["48 h", "to a fixed, written quote"],
  ];
  return (
    <section className="relative bg-ink pb-8 pt-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/[0.06] ring-1 ring-white/[0.06] md:grid-cols-4">
          {items.map(([n, l]) => (
            <div key={l} className="bg-ink px-6 py-7 text-center">
              <p className="font-display text-3xl font-extrabold text-gradient-aurora sm:text-4xl">{n}</p>
              <p className="mt-2 text-sm text-slate-400">{l}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <AnswerBox q="Who is Infovion Technologies?">
            Infovion Technologies is a Pune-based software development company and MSME (Udyam registration {COMPANY.udyam}).
            We design and build custom software, websites, mobile apps, ERP and SaaS products for businesses in India and abroad, and we
            make <Link to="/school-management-software" className="text-teal-300 underline underline-offset-2">Infovion School ERP</Link> and{" "}
            <Link to="/jewellery-management-software" className="text-teal-300 underline underline-offset-2">Infovion JMS</Link>, software in use at a school and a jewellery store.
          </AnswerBox>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <Section id="services" kicker="What we build" title="Software for every part" accent="of your business."
      sub="From a single internal tool to a complete platform — pick a service to see what we deliver, how long it takes and what it typically costs.">
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.slug} delay={(i % 3) * 0.04}>
            <LinkCard to={`/services/${s.slug}`} icon={s.icon} title={s.name} body={s.card} cta="Explore" />
          </Reveal>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-teal-300 hover:text-teal-200">All services <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </Section>
  );
}

function Products() {
  const P = [
    {
      icon: GraduationCap, name: "Infovion School ERP", tag: "School management software", to: "/school-management-software", cs: "/case-studies/school-erp-platform",
      img: ["/product/dashboard-900.webp", "School ERP dashboard"],
      points: ["Multi-tenant SaaS: every school's data kept separate", "8 role portals — director to parent", "Fees with UPI to the school's own account", "Attendance, exams, transport, certificates"],
      stack: "Next.js · NestJS · PostgreSQL · Prisma",
    },
    {
      icon: Gem, name: "Infovion JMS", tag: "Jewellery management software", to: "/jewellery-management-software", cs: "/case-studies/jewellery-management-system",
      img: ["/product/jms/gahan-900.webp", "JMS gahan (gold loan) register"],
      points: ["Billing by weight, purity and making charges", "GST invoices with CGST/SGST, shared as PDF on WhatsApp", "Girvi (gold loans) with interest to date", "Tally export so the CA gets the books in two clicks"],
      stack: "React · Express · MongoDB · jsPDF",
    },
  ];
  return (
    <Section kicker="Proof, not promises" title="We build products" accent="and run them in production."
      sub="Most agencies show mock-ups. We show software real people use — built with the same engineering we bring to your project.">
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {P.map((p, i) => {
          const I = p.icon;
          return (
            <Reveal key={p.name} delay={i * 0.08}>
              <SpotlightCard className="h-full overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.01]">
                <div className="relative h-56 overflow-hidden border-b border-white/[0.06] sm:h-64">
                  <img src={p.img[0]} alt={p.img[1]} width="900" height="562" loading="lazy" className="h-full w-full object-cover object-left-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-transparent to-transparent" />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300 ring-1 ring-teal-400/20"><I className="h-5 w-5" /></span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">{p.name}</h3>
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{p.tag}</p>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2">
                    {p.points.map((t) => <li key={t} className="flex gap-2 text-sm text-slate-300"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-300" />{t}</li>)}
                  </ul>
                  <p className="mt-5 font-mono text-xs text-slate-500">{p.stack}</p>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <Link to={p.to} className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300 hover:text-teal-200">See the product <ArrowRight className="h-4 w-4" /></Link>
                    <Link to={p.cs} className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-300 hover:text-white">Read the case study <ArrowRight className="h-4 w-4" /></Link>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function Industries() {
  const L = [
    ["GraduationCap", "Education", "/school-management-software"],
    ["Gem", "Jewellery & gold", "/jewellery-management-software"],
    ["Landmark", "Government & PSUs", "/government"],
    ["Store", "Retail & distribution", "/industries#retail"],
    ["Factory", "Manufacturing & MSMEs", "/industries#manufacturing"],
    ["HeartPulse", "Healthcare & clinics", "/industries#healthcare"],
    ["Building2", "Real estate & services", "/industries#services"],
    ["Rocket", "Startups", "/industries#startups"],
  ];
  return (
    <Section kicker="Industries" title="Built with people" accent="who know the work."
      sub="We spend time in your office, store or department before we write code. That is how our school and jewellery software got built — and how yours will.">
      <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
        {L.map(([icon, t, to], i) => (
          <Reveal key={t} delay={(i % 4) * 0.04}>
            <Link to={to} className="group flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-teal-400/40">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-teal-300"><Icon name={icon} /></span>
              <span className="text-sm font-semibold text-white">{t}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Process() {
  return (
    <Section kicker="How we work" title="A clear process," accent="no surprises."
      sub="You see working software every two weeks, and you know the cost before we start.">
      <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PROCESS.map(([t, b, when], i) => (
          <Reveal as="li" key={t} delay={(i % 3) * 0.05} className="relative rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6">
            <div className="flex items-center justify-between">
              <span className="font-display text-4xl font-extrabold text-white/10">0{i + 1}</span>
              <span className="rounded-full bg-teal-400/10 px-3 py-1 text-[11px] font-semibold text-teal-200">{when}</span>
            </div>
            <h3 className="mt-3 font-display text-lg font-bold text-white">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{b}</p>
          </Reveal>
        ))}
      </ol>
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {ENGAGEMENT.map(([t, b, pts], i) => (
          <Reveal key={t} delay={i * 0.05}>
            <div className="glass h-full rounded-3xl p-6">
              <Handshake className="h-5 w-5 text-teal-300" />
              <h3 className="mt-4 font-display text-lg font-bold text-white">{t}</h3>
              <p className="mt-1.5 text-sm text-slate-400">{b}</p>
              <ul className="mt-4 space-y-1.5">{pts.map((p) => <li key={p} className="flex gap-2 text-sm text-slate-300"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-300" />{p}</li>)}</ul>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link to="/how-we-work" className="inline-flex items-center gap-2 text-sm font-semibold text-teal-300 hover:text-teal-200">How we work, in detail <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </Section>
  );
}

function Stack() {
  return (
    <Section kicker="Technology" title="Modern, proven" accent="and maintainable."
      sub="We choose boring, well-supported technology so your software is easy to host, hire for and keep running for years.">
      <div className="mt-12 grid gap-3 md:grid-cols-2">
        {TECH.map(([group, items]) => (
          <div key={group} className="flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:flex-row sm:items-center">
            <p className="w-32 flex-shrink-0 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{group}</p>
            <div className="flex flex-wrap gap-2">{items.map((t) => <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-200">{t}</span>)}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Government() {
  return (
    <section className="px-5 py-12 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-amber-200/15 bg-gradient-to-br from-[#0d1424] to-[#05070d] p-8 sm:p-12">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-amber-200/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-200"><Landmark className="h-3.5 w-3.5" /> Government & public sector</p>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl">E-governance software built to <span className="text-amber-200">government standards.</span></h2>
            <p className="mt-4 max-w-xl text-slate-300">Websites, citizen-service portals, MIS dashboards, mobile apps and annual maintenance for departments, municipal bodies, PSUs and universities — accessible, secure and hosted in India.</p>
            <Link to="/government" className="mt-7 inline-flex items-center gap-2 rounded-full bg-amber-200 px-6 py-3 text-sm font-bold text-[#1a1405] transition hover:bg-amber-100">Government capabilities <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <ul className="grid grid-cols-2 gap-3 text-sm">
            {["GIGW 3.0 aligned", "WCAG 2.1 AA accessibility", "CERT-In security practices", "DPDP Act, 2023 aware", "Data hosted in India", "MSE (Udyam) registered"].map((t) => (
              <li key={t} className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-slate-200"><ShieldCheck className="h-4 w-4 flex-shrink-0 text-amber-200" />{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Why() {
  const W = [
    [Workflow, "Product-grade engineering", "We run multi-tenant SaaS in production — backups, monitoring, security and uptime are habits, not extras."],
    [Receipt, "Fixed, written quotes", "A clear scope and a fixed price before work starts. Changes are quoted before they're made."],
    [KeyRound, "Your code, your accounts", "Source code, database, domain and cloud accounts are in your name from day one."],
    [Timer, "Working software every 2 weeks", "A staging link you can open any time, and a demo at the end of every sprint."],
    [MessageCircle, "People who answer", "A named contact on WhatsApp, email and phone — not a ticket queue."],
    [MapPin, "Pune-based, India-wide, remote-ready", "Meet us in Pune, or work with us from anywhere in India or abroad."],
  ];
  return (
    <Section kicker="Why Infovion" title="A small team," accent="seriously accountable.">
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {W.map(([I, t, b], i) => (
          <Reveal key={t} delay={(i % 3) * 0.05}>
            <SpotlightCard className="h-full rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6">
              <I className="h-5 w-5 text-teal-300" />
              <h3 className="mt-4 font-display text-lg font-bold text-white">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{b}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default function Home() {
  return (
    <div className="bg-ink">
      <Helmet>
        <title>Infovion Technologies — Software Development Company in Pune, India</title>
        <meta name="description" content="Infovion Technologies is a Pune-based software development company: custom software, websites and web apps, mobile apps, ERP and CRM, SaaS products and AI automation. Fixed quotes, you own the code. Makers of Infovion School ERP and JMS." />
        <link rel="canonical" href="https://www.infovion.in/" />
        <meta property="og:title" content="Infovion Technologies — Software Development Company in Pune" />
        <meta property="og:description" content="Custom software, web & mobile apps, ERP, SaaS and AI automation — built, run and supported by one accountable team in Pune, India." />
        <meta property="og:url" content="https://www.infovion.in/" />
      </Helmet>
      <Hero />
      <Proof />
      <Services />
      <Products />
      <Industries />
      <Process />
      <Stack />
      <Government />
      <Why />
      <FaqList faqs={FAQ} title="Questions clients ask" accent="before they start." />
      <CtaBand whatsappText={`Hi ${COMPANY.brand}! I'd like to discuss a software project.`} />
    </div>
  );
}

