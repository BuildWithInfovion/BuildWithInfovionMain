import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "../../components/fx/Fx";
import { CtaBand, FaqList, Icon, PageHero, Section } from "../../components/site/Ui";
import { SITE } from "../../Data/company";

// Each industry: what goes wrong without software, what we build, and where to go next.
const INDUSTRIES = [
  {
    id: "education", icon: "GraduationCap", name: "Education", tagline: "Schools, colleges, coaching institutes and trusts",
    pains: ["Fee registers that never match the bank", "Attendance on paper, reports at month-end", "Parents calling the office for every detail"],
    build: ["School ERP with role portals for every staff member", "Online admissions and fee payments", "Parent apps, certificates and report cards"],
    links: [["Infovion School ERP", "/school-management-software"], ["Free certificate tools", "/free-tools"]],
  },
  {
    id: "jewellery", icon: "Gem", name: "Jewellery & gold", tagline: "Jewellery stores, wholesalers and gold-loan businesses",
    pains: ["Bills worked out on a calculator piece by piece", "Girvi pledges tracked in notebooks", "Stock by weight that never reconciles"],
    build: ["Billing by weight, purity and making charges", "Girvi (gold loan) registers with interest", "Udhaar ledgers, stock and reports"],
    links: [["Infovion JMS", "/jewellery-management-software"], ["Girvi software", "/girvi-software"]],
  },
  {
    id: "government", icon: "Landmark", name: "Government & public sector", tagline: "Departments, municipal bodies, PSUs, universities",
    pains: ["Websites that fail accessibility audits", "Progress data collected in Excel by email", "Citizens queueing for simple applications"],
    build: ["GIGW 3.0 aligned websites and portals", "MIS dashboards and field inspection apps", "Citizen-service applications with tracking"],
    links: [["Government capabilities", "/government"], ["Company profile", "/company-profile"]],
  },
  {
    id: "retail", icon: "Store", name: "Retail & distribution", tagline: "Shops, chains, wholesalers and distributors",
    pains: ["Stock that differs across shop, godown and website", "Dealer orders taken on WhatsApp and re-typed", "Credit to customers tracked by memory"],
    build: ["Billing and inventory across locations", "B2B ordering portals for dealers", "Online stores synced with stock"],
    links: [["E-commerce development", "/services/ecommerce-development"], ["ERP & CRM", "/services/erp-crm-development"]],
  },
  {
    id: "manufacturing", icon: "Factory", name: "Manufacturing & MSMEs", tagline: "Factories, job workers and engineering firms",
    pains: ["Job work and wastage tracked on paper", "Orders, production and dispatch in separate sheets", "Owners waiting for month-end numbers"],
    build: ["Production, job-work and dispatch tracking", "Purchase, sales and GST e-invoicing", "Owner dashboards on the phone"],
    links: [["ERP development", "/services/erp-crm-development"], ["Dashboards & MIS", "/services/dashboards-mis-reporting"]],
  },
  {
    id: "healthcare", icon: "HeartPulse", name: "Healthcare & clinics", tagline: "Clinics, diagnostic centres, pharmacies and wellness businesses",
    pains: ["Appointments by phone with no reminders", "Patient history scattered across files", "Billing and reports done by hand"],
    build: ["Appointment booking with WhatsApp reminders", "Patient records with role-based access", "Billing, inventory and reports"],
    links: [["Custom software", "/services/custom-software-development"], ["Mobile apps", "/services/mobile-app-development"]],
  },
  {
    id: "services", icon: "Building2", name: "Real estate & service businesses", tagline: "Builders, brokers, agencies, consultants and field-service firms",
    pains: ["Leads from many portals with no follow-up", "Site visits and field work tracked by calls", "Quotes, invoices and payments in different tools"],
    build: ["CRM with lead capture and follow-up reminders", "Field-staff apps with photos and GPS", "Quotation, invoicing and payment links"],
    links: [["CRM development", "/services/erp-crm-development"], ["API integration", "/services/api-integration"]],
  },
  {
    id: "startups", icon: "Rocket", name: "Startups & founders", tagline: "First-time founders and domain experts with a product idea",
    pains: ["An idea, but no technical co-founder", "Agencies that build and disappear", "MVPs that can't scale past the first customers"],
    build: ["Clickable prototypes to test with users", "MVPs in 8–14 weeks", "Multi-tenant SaaS with billing and onboarding"],
    links: [["SaaS product development", "/services/saas-product-development"], ["UI/UX design", "/services/ui-ux-design"]],
  },
];

const FAQ = [
  ["Do you only work with these industries?", "No. These are the industries where we have the deepest experience or ready-made products. The way we work — study the process first, then build — applies to any business."],
  ["Do you have ready-made software for my industry?", "For schools (Infovion School ERP) and jewellery stores (Infovion JMS), yes. For other industries we build custom software, often reusing proven modules such as billing, inventory, CRM, approvals and dashboards to keep cost down."],
  ["Can you customise your products for our organisation?", "Yes. Both products can be extended with custom modules, integrations and reports for larger organisations, groups and government bodies."],
];

export default function Industries() {
  return (
    <div className="bg-ink">
      <Helmet>
        <title>Industries We Build Software For — Education, Jewellery, Government, Retail | Infovion</title>
        <meta name="description" content="Industry software by Infovion Technologies for education, jewellery and gold, government and public sector, retail and distribution, manufacturing, healthcare, real estate and startups." />
        <link rel="canonical" href={`${SITE}/industries`} />
        <meta property="og:url" content={`${SITE}/industries`} />
      </Helmet>
      <PageHero trail={[["Industries", "/industries"]]} kicker="Industries" title="Software that understands" accent="how your industry works."
        sub="We learn the work before we write the code — the clerk with the fee register, the jeweller with the girvi book, the officer compiling the monthly report." />

      <Section className="pt-2">
        <nav aria-label="Industries on this page" className="flex flex-wrap gap-2">
          {INDUSTRIES.map((x) => <a key={x.id} href={`#${x.id}`} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-200 hover:border-teal-400/40">{x.name}</a>)}
        </nav>
        <div className="mt-10 space-y-6">
          {INDUSTRIES.map((x) => (
            <Reveal key={x.id}>
              <article id={x.id} className="scroll-mt-28 rounded-[2rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-7 sm:p-9">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-300 ring-1 ring-teal-400/20"><Icon name={x.icon} className="h-6 w-6" /></span>
                  <div>
                    <h2 className="font-display text-2xl font-extrabold text-white">{x.name}</h2>
                    <p className="text-sm text-slate-400">{x.tagline}</p>
                  </div>
                </div>
                <div className="mt-7 grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">The usual problems</h3>
                    <ul className="mt-3 space-y-2">{x.pains.map((p) => <li key={p} className="flex gap-2 text-[15px] text-slate-300"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-300/70" />{p}</li>)}</ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">What we build</h3>
                    <ul className="mt-3 space-y-2">{x.build.map((p) => <li key={p} className="flex gap-2 text-[15px] text-slate-200"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-300" />{p}</li>)}</ul>
                  </div>
                </div>
                <div className="mt-7 flex flex-wrap gap-4">
                  {x.links.map(([t, to]) => <Link key={to} to={to} className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300 hover:text-teal-200">{t} <ArrowRight className="h-4 w-4" /></Link>)}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
      <FaqList faqs={FAQ} />
      <CtaBand />
    </div>
  );
}
