import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Printer } from "lucide-react";
import { GhostButton, GlowButton } from "../../components/fx/Fx";
import { AnswerBox, CtaBand, FaqList, PageHero, Section } from "../../components/site/Ui";
import { COMPANY, SITE, credentials } from "../../Data/company";

const DELIVER = [
  ["Department websites and portals", "Bilingual, accessible websites and portals designed to the Guidelines for Indian Government Websites and Apps (GIGW 3.0), with a content management system for departmental staff."],
  ["Citizen service applications", "Online applications, approvals and certificates with status tracking, SMS and email alerts, payment gateway integration and an officer workflow."],
  ["MIS and monitoring dashboards", "Progress dashboards by scheme, district and officer, with drill-down, scheduled reports and role-based access."],
  ["Field and inspection applications", "Mobile applications for surveys, inspections and attendance, with photographs, location capture and offline data entry that synchronises when connectivity returns."],
  ["Education administration", "Our school ERP, covering admissions, fees, attendance, examinations, certificates and parent access, adaptable for government, aided and trust-run schools."],
  ["Records digitisation", "Conversion of registers and files into searchable systems with access control and audit trails."],
  ["Hosting in India", "Deployment in Indian data centres, on a MeitY-empanelled cloud, or on State Data Centre or NIC infrastructure as specified by the department."],
  ["Annual maintenance contracts", "Security updates, backups, content updates, uptime monitoring and change requests, with agreed response times."],
];

const STANDARDS = [
  ["Accessibility", "Designed and tested to WCAG 2.1 Level AA, as adopted by GIGW 3.0: keyboard access, screen reader labels, colour contrast and text resizing."],
  ["Security", "OWASP Top 10 practices, HTTPS throughout, role-based access, audit logs, hashed passwords and backups. Findings from a CERT-In empanelled security audit are resolved before go-live."],
  ["Data protection", "Designed in line with the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000: data minimisation, consent and purpose limitation."],
  ["Data residency", "Personal and government data is stored on servers located in India."],
  ["Languages", "Unicode content in English, Hindi and regional languages, rendered correctly on screen and in printed documents."],
  ["Documentation", "Software requirement specification, design documents, test reports, user manuals, training and full handover of source code."],
];

const MSE = [
  "Exemption from Earnest Money Deposit where the tender permits, under the General Financial Rules, 2017",
  "Tender documents free of cost for registered MSEs, under the Public Procurement Policy for MSEs Order, 2012",
  "Purchase preference for MSEs quoting within L1 + 15%, subject to matching the L1 price",
  "Contribution towards the 25% annual procurement target from Micro and Small Enterprises",
];

const STAGES = [
  ["Requirement study", "Meetings with the department, review of the existing process and data, and a software requirement specification."],
  ["Design and approval", "Wireframes and a prototype approved by the department before development begins."],
  ["Development and UAT", "Fortnightly reviews on a staging server and user acceptance testing by departmental officers."],
  ["Audit and go-live", "Resolution of security audit findings, data migration, training and go-live on servers in India."],
  ["Warranty and AMC", "Support during the warranty period, followed by annual maintenance with agreed response times."],
];

const FAQ = [
  ["Can Infovion Technologies undertake government IT projects?", `Yes. Infovion Technologies is a Micro and Small Enterprise registered under Udyam (${COMPANY.udyam}). We develop government websites, citizen service portals, MIS dashboards, field applications and education software, and provide annual maintenance. Our work is designed to GIGW 3.0 and WCAG 2.1 AA, with data hosted in India.`],
  ["Are your government websites GIGW 3.0 compliant?", "We design and develop to the GIGW 3.0 guidelines, including WCAG 2.1 AA accessibility, and prepare the documentation required for a Website Quality certification audit by STQC. Certification is issued by the auditing body after its own testing."],
  ["Where is the data hosted?", "On servers in India: a MeitY-empanelled cloud service provider, the State Data Centre or NIC, as the department requires."],
  ["Do MSE benefits apply to your bids?", "Where a tender extends Public Procurement Policy benefits to Micro and Small Enterprises, Infovion is eligible as a Udyam-registered MSE. These typically include EMD exemption and free tender documents. The applicable benefits depend on the terms of each tender."],
  ["Do you provide training, documentation and AMC?", "Yes. Every government project includes user manuals, training for staff and administrators, and a handover of source code and documentation. Annual maintenance with agreed response times is available after the warranty period."],
  ["Can you provide a company profile for vendor registration?", "Yes. Our company profile, with registration details, capabilities and contacts, is available as a printable page, and supporting documents are provided on request."],
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
    description: "Websites aligned with GIGW 3.0, citizen service portals, MIS dashboards, field applications, education software, hosting in India and annual maintenance for government bodies.",
  };
  return (
    <>
      <Helmet>
        <title>Government IT and E-Governance Services | GIGW 3.0 Websites | Infovion Technologies</title>
        <meta name="description" content="IT services for government departments, municipal bodies, PSUs and universities: GIGW 3.0 and WCAG 2.1 AA websites, citizen service portals, MIS dashboards, field applications and AMC. Udyam-registered MSE, Pune, India." />
        <link rel="canonical" href={`${SITE}/government`} />
        <meta property="og:title" content="Government IT and E-Governance Services | Infovion Technologies" />
        <meta property="og:url" content={`${SITE}/government`} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <PageHero trail={[["Government", "/government"]]} kicker="Government and public sector" title="IT services for government and public sector organisations"
        sub="Websites, citizen service portals, dashboards, field applications and maintenance for departments, municipal corporations, PSUs and universities. Accessible, secure, documented and hosted in India.">
        <GlowButton to="/contact?interest=government">Discuss a requirement <ArrowRight className="h-4 w-4" /></GlowButton>
        <GhostButton to="/company-profile"><Printer className="h-4 w-4" /> Company profile</GhostButton>
      </PageHero>

      <section className="pb-4">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <AnswerBox q="Overview">{FAQ[0][1]}</AnswerBox>
        </div>
      </section>

      <Section kicker="Capabilities" title="What we deliver">
        <div className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {DELIVER.map(([t, b]) => (
            <div key={t} className="border-t border-white/15 pt-5">
              <h3 className="font-display font-semibold text-white">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="Standards" title="Compliance and standards">
        <dl className="mt-10 border-t border-white/10">
          {STANDARDS.map(([t, b]) => (
            <div key={t} className="grid gap-2 border-b border-white/10 py-5 sm:grid-cols-[14rem_1fr]">
              <dt className="font-display font-semibold text-white">{t}</dt>
              <dd className="text-[15px] leading-relaxed text-slate-300">{b}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section kicker="Procurement" title="Procurement from a Micro and Small Enterprise">
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="panel rounded-xl p-7">
            <p className="text-[15px] leading-relaxed text-slate-300">Infovion Technologies is a Udyam-registered enterprise. Where a tender applies the Public Procurement Policy for Micro and Small Enterprises, the following typically apply:</p>
            <ul className="mt-5 space-y-3">{MSE.map((m) => <li key={m} className="flex gap-3 text-sm text-slate-200"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-300" aria-hidden="true" />{m}</li>)}</ul>
            <p className="mt-5 text-xs text-slate-400">Benefits apply as stated in each tender document and the policy in force on the date of the bid.</p>
          </div>
          <div className="panel rounded-xl p-7">
            <h3 className="font-display text-lg font-semibold text-white">Registration details</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div><dt className="text-slate-400">Legal name</dt><dd className="font-semibold text-white">{COMPANY.name}</dd></div>
              {creds.map(([k, v]) => <div key={k}><dt className="text-slate-400">{k}</dt><dd className="font-mono font-semibold text-white">{v}</dd></div>)}
              <div><dt className="text-slate-400">Registered office</dt><dd className="text-white">{COMPANY.address.locality}, {COMPANY.address.region} {COMPANY.address.postalCode}</dd></div>
            </dl>
            <Link to="/company-profile" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-200">Full company profile <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </Section>

      <Section kicker="Project approach" title="From requirement to handover">
        <ol className="mt-10 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-5">
          {STAGES.map(([t, b], i) => (
            <li key={t} className="bg-cell p-5">
              <p className="font-display text-sm font-semibold text-sky-300">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-2 font-display font-semibold text-white">{t}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{b}</p>
            </li>
          ))}
        </ol>
      </Section>

      <FaqList faqs={FAQ} />
      <CtaBand title="Discuss a government IT requirement" sub="Share the requirement or the tender reference. We respond with clarifications, an approach note and our company documents." primary={["Discuss a requirement", "/contact?interest=government"]} whatsappText="Hello Infovion, I would like to discuss a government IT requirement." />
    </>
  );
}
