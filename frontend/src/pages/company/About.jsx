import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { GhostButton, GlowButton } from "../../components/fx/Fx";
import { CtaBand, LinkRow, PageHero, Section } from "../../components/site/Ui";
import { COMPANY, SITE, fullAddress } from "../../Data/company";

const PRINCIPLES = [
  ["Understand the work first", "Before designing a screen, we spend time with the people who will use the system: accountants, counter staff, teachers, field officers."],
  ["Realistic scope", "We are clear about what software can and cannot solve, quote a fixed price for a defined scope, and recommend an existing product when it is the better option."],
  ["Client ownership", "Clients own their code, data and accounts. We do not use proprietary hosting or licensing to retain clients."],
  ["Security and privacy", "Role-based access, audit logs, backups and data protection are included in every system as standard."],
  ["Maintainability", "Established technologies, readable code and complete documentation, so that systems remain dependable for years."],
  ["Continuity", "The team that builds a system also supports it, with a named contact after launch."],
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
    <>
      <Helmet>
        <title>About Infovion Technologies | Software Company in Pune</title>
        <meta name="description" content="Infovion Technologies is a software development company and registered MSME in Pune, India, and the maker of Infovion School ERP and Infovion JMS." />
        <link rel="canonical" href={`${SITE}/about`} />
        <meta property="og:title" content="About Infovion Technologies" />
        <meta property="og:url" content={`${SITE}/about`} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <PageHero trail={[["About", "/about"]]} kicker="About us" title="About Infovion Technologies"
        sub={`${COMPANY.name} is a software development company based in Pune, India, and a registered MSME. We work with businesses, institutions and government bodies in India and overseas, and we develop two products of our own for schools and jewellery retailers.`}>
        <GlowButton to="/contact">Contact us <ArrowRight className="h-4 w-4" /></GlowButton>
        <GhostButton to="/case-studies">Our work</GhostButton>
      </PageHero>

      <Section kicker="Background" title="How the company started" className="pt-0">
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.25fr_1fr]">
          <div className="space-y-5 text-[16px] leading-relaxed text-slate-300">
            <p>Infovion started from a practical observation. The offices that keep many Indian organisations running, such as a school fee counter or a jeweller's billing desk, were still relying on registers, calculators and spreadsheets, because the software available did not reflect how they actually work.</p>
            <p>We built software for them. <Link to="/school-management-software" className="text-sky-300 underline underline-offset-2">Infovion School ERP</Link> manages admissions, fees, attendance, examinations, transport and certificates, with a portal for each role in the school. <Link to="/jewellery-management-software" className="text-sky-300 underline underline-offset-2">Infovion JMS</Link> manages billing by weight and purity, girvi loans, customer credit, stock and accounting exports for jewellery retailers.</p>
            <p>Operating these products in production has given us practical experience in data isolation, security, usability for non-technical staff and system reliability. We now apply that experience to client projects for businesses, startups and public sector organisations.</p>
          </div>
          <div className="border-t border-white/10">
            <LinkRow to="/case-studies/school-erp-platform" icon="GraduationCap" title="Infovion School ERP" body="Multi-tenant school management platform" />
            <LinkRow to="/case-studies/jewellery-management-system" icon="Gem" title="Infovion JMS" body="Billing, girvi, customer credit and stock for jewellery retailers" />
          </div>
        </div>
      </Section>

      <Section className="py-8">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="panel rounded-xl p-7">
            <h2 className="font-display text-xl font-semibold text-white">Mission</h2>
            <p className="mt-3 leading-relaxed text-slate-300">To provide organisations of every size, from a single store to a government department, with software that suits their work, protects their data and remains dependable for years.</p>
          </div>
          <div className="panel rounded-xl p-7">
            <h2 className="font-display text-xl font-semibold text-white">Vision</h2>
            <p className="mt-3 leading-relaxed text-slate-300">To be a trusted technology partner for businesses and institutions in India and abroad, recognised for realistic commitments, sound engineering and dependable support.</p>
          </div>
        </div>
      </Section>

      <Section kicker="Principles" title="How we work with clients">
        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map(([t, b]) => (
            <div key={t} className="border-t border-white/15 pt-5">
              <h3 className="font-display text-[17px] font-semibold text-white">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="Company information" title="Key facts">
        <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
          {[
            ["Legal name", COMPANY.name],
            ["Registration", `MSME, Udyam ${COMPANY.udyam}`],
            ["Founder", COMPANY.founder],
            ["Registered office", fullAddress()],
            ["Service area", "Pune, Maharashtra, across India, and international clients remotely"],
            ["Contact", `${COMPANY.email} · ${COMPANY.phone}`],
          ].map(([k, v]) => (
            <div key={k} className="bg-cell p-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{k}</dt>
              <dd className="mt-2 text-[15px] text-white">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex flex-wrap gap-6 text-sm">
          <Link to="/company-profile" className="inline-flex items-center gap-1.5 font-semibold text-sky-300 hover:text-sky-200">Company profile (printable) <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/how-we-work" className="inline-flex items-center gap-1.5 font-semibold text-sky-300 hover:text-sky-200">How we work <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
