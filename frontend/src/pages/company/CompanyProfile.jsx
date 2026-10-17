/* global __BUILD_DATE__ */
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Mail, Printer } from "lucide-react";
import { Breadcrumbs } from "../../components/site/Ui";
import { COMPANY, PRODUCTS, SITE, TECH, credentials, fullAddress } from "../../Data/company";
import { SERVICES } from "../../Data/services";
import { CASE_STUDIES } from "../../Data/caseStudies";

// A capability statement for tenders, vendor registration and B2B buyers.
// On screen it is a paper document; printed (or saved as PDF) only the document is output.
const asOf = new Date(`${__BUILD_DATE__}T00:00:00`).toLocaleDateString("en-IN", { month: "long", year: "numeric" });

function H({ n, children }) {
  return <h2 className="mt-9 border-b-2 border-slate-900 pb-1.5 font-display text-[15px] font-extrabold uppercase tracking-[0.08em] text-slate-900"><span className="text-teal-700">{n}.</span> {children}</h2>;
}

export default function CompanyProfile() {
  const rows = [
    ["Legal name", COMPANY.name],
    ["Brand", COMPANY.brand],
    ["Constitution", COMPANY.constitution],
    ...credentials(),
    ["Registered office", fullAddress()],
    ["Authorised contact", `${COMPANY.founder}, ${COMPANY.founderRole}`],
    ["Phone", `${COMPANY.phone} (WhatsApp ${COMPANY.whatsapp})`],
    ["Email", COMPANY.email],
    ["Website", "www.infovion.in"],
  ];
  return (
    <div className="bg-ink pb-24 pt-28 print:bg-white print:p-0 sm:pt-32">
      <Helmet>
        <title>Company Profile — Infovion Technologies, Pune (MSME, Udyam Registered)</title>
        <meta name="description" content={`Company profile of Infovion Technologies, Pune: registration details (Udyam ${COMPANY.udyam}), software development services, products, technology, compliance and contacts — printable for tenders and vendor registration.`} />
        <link rel="canonical" href={`${SITE}/company-profile`} />
        <meta property="og:url" content={`${SITE}/company-profile`} />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "AboutPage", name: "Infovion Technologies — company profile", url: `${SITE}/company-profile`, about: { "@id": `${SITE}/#organization` } })}</script>
      </Helmet>

      <div className="mx-auto max-w-4xl px-5 print:max-w-none print:px-0 sm:px-6">
        <div className="print:hidden">
          <Breadcrumbs trail={[["Company profile", "/company-profile"]]} className="mb-6" />
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-300">Printable capability statement for tenders, vendor registration and procurement.</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 px-5 py-2.5 text-sm font-bold text-[#04121a]">
                <Printer className="h-4 w-4" /> Print / save as PDF
              </button>
              <a href={`mailto:${COMPANY.email}?subject=${encodeURIComponent("Request for company documents")}`} className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold text-white"><Mail className="h-4 w-4" /> Request documents</a>
            </div>
          </div>
        </div>

        <article className="rounded-2xl bg-white px-6 py-9 text-[14px] leading-relaxed text-slate-800 shadow-2xl print:rounded-none print:p-0 print:shadow-none sm:px-12 sm:py-12">
          <header className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <img src="/icon-192.png" alt="Infovion logo" width="64" height="64" className="h-16 w-16 rounded-xl" />
              <div>
                <h1 className="font-display text-2xl font-extrabold text-slate-900">{COMPANY.name}</h1>
                <p className="text-sm text-slate-600">Software development · Products · E-governance</p>
              </div>
            </div>
            <div className="text-left text-xs text-slate-500 sm:text-right">
              <p className="font-bold uppercase tracking-[0.14em] text-slate-700">Company profile</p>
              <p>{asOf}</p>
            </div>
          </header>

          <H n="1">Company at a glance</H>
          <table className="mt-3 w-full border-collapse text-left">
            <tbody>
              {rows.map(([k, v]) => (
                <tr key={k} className="border-b border-slate-100 align-top">
                  <th scope="row" className="w-48 py-2 pr-4 font-semibold text-slate-600">{k}</th>
                  <td className="py-2 text-slate-900">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4">
            Infovion Technologies is a Pune-based software development company. We design, build and support custom software, web and mobile
            applications, ERP and SaaS platforms and e-governance systems, and we make two software products used in production — a school
            management platform and a jewellery management system.
          </p>

          <H n="2">Core services</H>
          <ul className="mt-3 grid gap-x-8 gap-y-1.5 sm:grid-cols-2 print:grid-cols-2">
            {SERVICES.map((s) => <li key={s.slug}><strong className="text-slate-900">{s.name}</strong> — {s.card}</li>)}
            <li><strong className="text-slate-900">E-governance</strong> — GIGW 3.0 aligned websites, citizen portals, MIS dashboards, field apps and AMC.</li>
          </ul>

          <H n="3">Products</H>
          <ul className="mt-3 space-y-1.5">
            {PRODUCTS.map((p) => <li key={p.slug}><strong className="text-slate-900">{p.name}</strong> ({p.short}) — {p.blurb} <em className="text-slate-500">{p.status}.</em></li>)}
          </ul>

          <H n="4">Relevant work</H>
          <ul className="mt-3 space-y-1.5">
            {CASE_STUDIES.map((c) => <li key={c.slug}><strong className="text-slate-900">{c.title}</strong> — {c.client}. {c.stack.slice(0, 5).join(", ")}.</li>)}
          </ul>

          <H n="5">Technology</H>
          <table className="mt-3 w-full border-collapse text-left">
            <tbody>
              {TECH.map(([g, items]) => (
                <tr key={g} className="border-b border-slate-100 align-top">
                  <th scope="row" className="w-48 py-1.5 pr-4 font-semibold text-slate-600">{g}</th>
                  <td className="py-1.5">{items.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <H n="6">Quality, security & compliance</H>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>Web accessibility to WCAG 2.1 Level AA; government websites designed to GIGW 3.0.</li>
            <li>Secure development: OWASP Top 10 practices, HTTPS, role-based access, encrypted passwords, audit logs, code review in Git.</li>
            <li>Data protection by design under India's DPDP Act, 2023 and IT Act, 2000; data hosted in India where required.</li>
            <li>Backups with tested restores, uptime monitoring and documented deployment.</li>
          </ul>

          <H n="7">Delivery & support</H>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>Process: discovery → written scope and fixed quote → prototype → two-week sprints with staging demos → testing and acceptance → launch and training.</li>
            <li>Engagement models: fixed price, dedicated team, time and material, annual maintenance contract (AMC).</li>
            <li>Deliverables include source code, documentation, user manuals and training; 30 days of free support after launch.</li>
            <li>Clients served on-site in Pune and remotely across India and abroad.</li>
          </ul>

          <footer className="mt-10 border-t border-slate-200 pt-5 text-xs text-slate-500">
            {COMPANY.name} · {fullAddress()} · {COMPANY.email} · {COMPANY.phone} · www.infovion.in
          </footer>
        </article>

        <p className="mt-6 text-center text-sm text-slate-400 print:hidden">
          Need something specific for a tender? <Link to="/contact?interest=government" className="text-teal-300 underline">Contact us</Link> — we respond with documents and clarifications.
        </p>
      </div>
    </div>
  );
}
