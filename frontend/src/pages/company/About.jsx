import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Compass, Eye, Gem, GraduationCap, HeartHandshake, KeyRound, MapPin, ShieldCheck, Target, Wrench } from "lucide-react";
import { GhostButton, GlowButton, Reveal } from "../../components/fx/Fx";
import { AnswerBox, CtaBand, PageHero, Section } from "../../components/site/Ui";
import { COMPANY, SITE, fullAddress } from "../../Data/company";

const VALUES = [
  [Compass, "Understand the work first", "We sit with the people who will use the software — the accountant, the counter staff, the field officer — before we design a single screen."],
  [Target, "Honest scope", "We say what software can and can't fix, quote a fixed price for a clear scope, and tell you when an existing product suits you better."],
  [KeyRound, "Ownership stays with you", "Your code, your data, your accounts. No lock-in, no hostage hosting."],
  [ShieldCheck, "Secure and private by default", "Role-based access, audit logs, backups and data protection are part of every build, not upsells."],
  [Wrench, "Built to be maintained", "Proven technology, clean code and documentation, so your software keeps working for years."],
  [HeartHandshake, "Around after launch", "The same team that built it supports it — with a named person who answers."],
];

export default function About() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Infovion Technologies",
    url: `${SITE}/about`,
    mainEntity: { "@id": `${SITE}/#organization` },
  };
  return (
    <div className="bg-ink">
      <Helmet>
        <title>About Infovion Technologies — Software Company in Pune, India</title>
        <meta name="description" content="Infovion Technologies is a Pune-based software development company and MSME. We build custom software, web and mobile apps, ERP and SaaS for businesses and government, and make Infovion School ERP and Infovion JMS." />
        <link rel="canonical" href={`${SITE}/about`} />
        <meta property="og:title" content="About Infovion Technologies" />
        <meta property="og:url" content={`${SITE}/about`} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <PageHero trail={[["About", "/about"]]} kicker="About us" title="We build software that" accent="real organisations run on."
        sub="Infovion Technologies is a software development company in Pune, India. We started by building products for schools and jewellery stores — and now bring the same product-grade engineering to businesses, institutions and government.">
        <GlowButton to="/contact">Work with us <ArrowRight className="h-4 w-4" /></GlowButton>
        <GhostButton to="/case-studies">See our work</GhostButton>
      </PageHero>

      <Section className="pt-2">
        <AnswerBox q="Who is Infovion Technologies?">
          {COMPANY.name} is a Pune-based software development company registered as an MSME (Udyam {COMPANY.udyam}). It builds custom software, websites,
          mobile apps, ERP and CRM systems, SaaS products and AI automation for clients in India and abroad, and makes two products: Infovion School ERP
          (school management software) and Infovion JMS (jewellery management software). It is led by its founder, {COMPANY.founder}.
        </AnswerBox>
      </Section>

      <Section kicker="Our story" title="Products first," accent="then services.">
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-5 text-[16px] leading-relaxed text-slate-300">
            <p>Infovion began with a simple observation: the offices that keep Indian institutions running — a school's fee counter, a jeweller's billing desk — were still working from registers, calculators and spreadsheets, because the software available didn't fit how they actually work.</p>
            <p>So we built it. <Link to="/school-management-software" className="text-teal-300 underline underline-offset-2">Infovion School ERP</Link> runs admissions, fees, attendance, exams, transport and certificates for a school, with a portal for every role. <Link to="/jewellery-management-software" className="text-teal-300 underline underline-offset-2">Infovion JMS</Link> handles billing by weight and purity, gold loans and customer credit for a jewellery store.</p>
            <p>Building and running our own products taught us what most agencies learn the hard way: how to keep data separate and safe, how to make software people use without training, and how to keep it online. Today we offer that experience as a service — to businesses, startups and government bodies that need software built properly.</p>
          </div>
          <div className="space-y-4">
            {[[GraduationCap, "Infovion School ERP", "Multi-tenant school management platform", "/case-studies/school-erp-platform"], [Gem, "Infovion JMS", "Jewellery billing, girvi, udhaar and stock", "/case-studies/jewellery-management-system"]].map(([I, t, b, to]) => (
              <Link key={t} to={to} className="group flex items-center gap-4 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-5 transition-colors hover:border-teal-400/40">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-300"><I className="h-6 w-6" /></span>
                <span><span className="block font-display font-bold text-white">{t}</span><span className="block text-sm text-slate-400">{b}</span></span>
                <ArrowRight className="ml-auto h-4 w-4 text-teal-300 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section className="py-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass rounded-3xl p-7">
            <Target className="h-5 w-5 text-teal-300" />
            <h2 className="mt-4 font-display text-xl font-bold text-white">Mission</h2>
            <p className="mt-2 text-slate-300">Give every organisation — from a single store to a government department — software that fits its work, is safe with its data, and keeps running for years.</p>
          </div>
          <div className="glass rounded-3xl p-7">
            <Eye className="h-5 w-5 text-teal-300" />
            <h2 className="mt-4 font-display text-xl font-bold text-white">Vision</h2>
            <p className="mt-2 text-slate-300">To be the software partner Indian businesses and institutions trust most — known for honest scope, product-grade engineering and support that answers.</p>
          </div>
        </div>
      </Section>

      <Section kicker="Values" title="How we" accent="work with you.">
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map(([I, t, b], i) => (
            <Reveal key={t} delay={(i % 3) * 0.05}>
              <div className="h-full rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6">
                <I className="h-5 w-5 text-teal-300" />
                <h3 className="mt-4 font-display text-lg font-bold text-white">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section kicker="Company facts" title="The essentials">
        <dl className="mt-8 grid gap-px overflow-hidden rounded-3xl bg-white/[0.06] ring-1 ring-white/[0.06] sm:grid-cols-2">
          {[
            ["Legal name", COMPANY.name],
            ["Registration", `MSME — Udyam ${COMPANY.udyam}`],
            ["Founder", COMPANY.founder],
            ["Headquarters", fullAddress()],
            ["Serving", "Pune, Maharashtra, all of India and clients abroad (remote)"],
            ["Contact", `${COMPANY.email} · ${COMPANY.phone}`],
          ].map(([k, v]) => (
            <div key={k} className="bg-ink p-6">
              <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{k === "Registration" ? <BadgeCheck className="h-4 w-4 text-teal-300" /> : k === "Headquarters" ? <MapPin className="h-4 w-4 text-teal-300" /> : null}{k}</dt>
              <dd className="mt-2 text-[15px] text-white">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link to="/company-profile" className="inline-flex items-center gap-1.5 font-semibold text-teal-300">Printable company profile <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/how-we-work" className="inline-flex items-center gap-1.5 font-semibold text-teal-300">How we work <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </Section>

      <CtaBand />
    </div>
  );
}
