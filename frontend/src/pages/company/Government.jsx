import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Accessibility, ArrowRight, BadgeCheck, BarChart3, ClipboardCheck, Database, FileText, Globe, GraduationCap, Languages, Lock,
  Printer, Server, ShieldCheck, Smartphone, Wrench,
} from "lucide-react";
import { GhostButton, GlowButton, Reveal } from "../../components/fx/Fx";
import { AnswerBox, CtaBand, FaqList, PageHero, Section } from "../../components/site/Ui";
import { COMPANY, SITE, credentials } from "../../Data/company";

const DELIVER = [
  [Globe, "Department websites & portals", "Bilingual, accessible websites and portals designed to the Guidelines for Indian Government Websites and Apps (GIGW 3.0), with a content management system your staff can use."],
  [ClipboardCheck, "Citizen-service applications", "Online applications, approvals and certificates with status tracking, SMS/email alerts, payment gateway integration and an officer workflow behind them."],
  [BarChart3, "MIS & monitoring dashboards", "Scheme-wise, district-wise and officer-wise progress dashboards with drill-down, scheduled reports and role-based access."],
  [Smartphone, "Field & inspection apps", "Mobile apps for surveys, inspections and attendance — with photos, GPS and offline capture that syncs when the network returns."],
  [GraduationCap, "Education administration", "Our school ERP — admissions, fees, attendance, exams, certificates and parent access — adaptable for government, aided and trust-run schools."],
  [FileText, "Records digitisation & documents", "Digitise registers and files into searchable systems with access control and audit trails."],
  [Server, "Hosting in India", "Deployment on Indian data centres, a MeitY-empanelled cloud, or the State Data Centre / NIC infrastructure your department specifies."],
  [Wrench, "Annual maintenance (AMC)", "Security updates, backups, content updates, uptime monitoring and change requests with agreed response times."],
];

const STANDARDS = [
  [Accessibility, "Accessibility", "Designed and tested to WCAG 2.1 Level AA, which GIGW 3.0 adopts — keyboard access, screen-reader labels, contrast, text resizing."],
  [ShieldCheck, "Security", "OWASP Top 10 practices, HTTPS everywhere, role-based access, audit logs, encrypted passwords and backups; we fix findings from a CERT-In empanelled security audit before go-live."],
  [Lock, "Data protection", "Built with India's Digital Personal Data Protection Act, 2023 and the IT Act, 2000 in mind: minimum data collection, consent and purpose limits."],
  [Database, "Data residency", "Personal and government data stays on servers in India."],
  [Languages, "Languages", "Unicode content in English, Hindi and regional languages with correct fonts on screen and in printed documents."],
  [FileText, "Documentation", "Requirement specification, design documents, test reports, user manuals, training and a complete handover of source code."],
];

const MSE = [
  "Exemption from paying Earnest Money Deposit (EMD) where the tender allows it, under the General Financial Rules, 2017",
  "Tender documents free of cost for registered MSEs, as provided in the Public Procurement Policy for MSEs Order, 2012",
  "Purchase preference for MSEs quoting within the L1 + 15% band, subject to matching the L1 price",
  "Counts towards the 25% annual procurement target from Micro and Small Enterprises",
];

const FAQ = [
  ["Can Infovion Technologies work on government IT projects?", `Yes. Infovion Technologies is a Micro and Small Enterprise registered under Udyam (${COMPANY.udyam}). We build government websites, citizen-service portals, MIS dashboards, field apps and education software, and provide annual maintenance — designed to GIGW 3.0 and WCAG 2.1 AA, with data hosted in India.`],
  ["Are your government websites GIGW 3.0 compliant?", "We design and build to the GIGW 3.0 guidelines, including WCAG 2.1 AA accessibility, and prepare the documentation needed for a Website Quality certification audit by STQC. Final certification is issued by the auditing body after its own testing."],
  ["Where is the data hosted?", "On servers in India — a MeitY-empanelled cloud service provider, the State Data Centre or NIC, as your department requires."],
  ["Do MSE benefits apply when you bid?", "Where a tender extends Public Procurement Policy benefits to Micro and Small Enterprises, Infovion is eligible as a Udyam-registered MSE — typically EMD exemption and free tender documents. The exact benefits always depend on the terms of each tender."],
  ["Do you provide training, documentation and AMC?", "Yes. Every government project includes user manuals, training for staff and administrators, and a handover of source code and documentation. Annual maintenance with agreed response times is available after the warranty period."],
  ["Can you provide a company profile for vendor registration?", "Yes — our company profile with registration details, capabilities and contacts is on one printable page, and we send supporting documents on request."],
];

export default function Government() {
  const creds = credentials();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "E-governance and government IT services",
    serviceType: "E-governance software development",
    provider: { "@id": `${SITE}/#organization` },
    areaServed: { "@type": "Country", name: "India" },
    audience: { "@type": "Audience", audienceType: "Government departments, municipal corporations, PSUs, universities" },
    description: "GIGW 3.0 aligned websites, citizen-service portals, MIS dashboards, field apps, education software, hosting in India and annual maintenance for government bodies.",
  };
  return (
    <div className="bg-ink">
      <Helmet>
        <title>Government IT & E-Governance Software Company | GIGW 3.0 Websites — Infovion</title>
        <meta name="description" content="IT services for government departments, municipal bodies, PSUs and universities: GIGW 3.0 & WCAG 2.1 AA websites, citizen portals, MIS dashboards, field apps and AMC. Udyam-registered MSE, Pune, India." />
        <link rel="canonical" href={`${SITE}/government`} />
        <meta property="og:title" content="Government IT & e-governance — Infovion Technologies" />
        <meta property="og:url" content={`${SITE}/government`} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <PageHero trail={[["Government", "/government"]]} kicker="Government & public sector" title="E-governance software," accent="built to government standards."
        sub="Websites, citizen-service portals, dashboards, field apps and maintenance for departments, municipal corporations, PSUs and universities — accessible, secure, documented and hosted in India.">
        <GlowButton to="/contact?interest=government">Discuss a requirement <ArrowRight className="h-4 w-4" /></GlowButton>
        <GhostButton to="/company-profile"><Printer className="h-4 w-4" /> Company profile</GhostButton>
      </PageHero>

      <section className="pb-4">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <AnswerBox q="Can Infovion Technologies take up government IT work?">{FAQ[0][1]}</AnswerBox>
        </div>
      </section>

      <Section kicker="What we deliver" title="Software for public service," accent="end to end.">
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DELIVER.map(([I, t, b], i) => (
            <Reveal key={t} delay={(i % 4) * 0.04}>
              <div className="h-full rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6">
                <I className="h-5 w-5 text-amber-200" />
                <h3 className="mt-4 font-display font-bold text-white">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section kicker="Standards" title="Compliance is designed in," accent="not added later.">
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {STANDARDS.map(([I, t, b]) => (
            <div key={t} className="glass h-full rounded-3xl p-6">
              <I className="h-5 w-5 text-teal-300" />
              <h3 className="mt-4 font-display text-lg font-bold text-white">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="Procurement" title="Buying from a" accent="Micro & Small Enterprise">
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7">
            <p className="text-[15px] leading-relaxed text-slate-300">Infovion Technologies is a Udyam-registered enterprise. Where a tender applies the Public Procurement Policy for Micro and Small Enterprises, buyers can typically expect:</p>
            <ul className="mt-5 space-y-3">{MSE.map((m) => <li key={m} className="flex gap-3 text-sm text-slate-200"><BadgeCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-200" />{m}</li>)}</ul>
            <p className="mt-5 text-xs text-slate-500">Benefits apply as stated in each tender document and the policy in force on the bid date.</p>
          </div>
          <div className="rounded-3xl border border-amber-200/20 bg-amber-200/[0.04] p-7">
            <h3 className="font-display text-lg font-bold text-white">Registration details</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div><dt className="text-slate-400">Legal name</dt><dd className="font-semibold text-white">{COMPANY.name}</dd></div>
              {creds.map(([k, v]) => <div key={k}><dt className="text-slate-400">{k}</dt><dd className="font-mono font-semibold text-white">{v}</dd></div>)}
              <div><dt className="text-slate-400">Registered office</dt><dd className="text-white">{COMPANY.address.locality}, {COMPANY.address.region} {COMPANY.address.postalCode}</dd></div>
            </dl>
            <Link to="/company-profile" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-200 hover:text-amber-100">Full company profile <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </Section>

      <Section kicker="How we work with departments" title="From requirement" accent="to handover.">
        <ol className="mt-10 grid gap-3 md:grid-cols-5">
          {[["Requirement study", "Meetings with the department, existing process and data review, SRS document."], ["Design & approval", "Wireframes and prototype approved by the department before development."], ["Development & UAT", "Fortnightly demos on a staging server; user acceptance testing by your officers."], ["Audit & go-live", "Security audit fixes, data migration, training and go-live on India-hosted servers."], ["Warranty & AMC", "Warranty support, then annual maintenance with agreed response times."]].map(([t, b], i) => (
            <li key={t} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
              <p className="font-display text-2xl font-extrabold text-white/15">0{i + 1}</p>
              <p className="mt-1 font-display font-bold text-white">{t}</p>
              <p className="mt-1.5 text-sm text-slate-400">{b}</p>
            </li>
          ))}
        </ol>
      </Section>

      <FaqList faqs={FAQ} title="Questions from" accent="government buyers" />
      <CtaBand title="Planning a portal, app or dashboard?" accent="Let's scope it." sub="Share the requirement or the tender reference. We respond with clarifications, an approach note and our documents." primary={["Discuss a requirement", "/contact?interest=government"]} whatsappText="Hello Infovion, I'd like to discuss a government IT requirement." />
    </div>
  );
}

