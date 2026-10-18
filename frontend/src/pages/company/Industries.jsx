import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "../../components/fx/Fx";
import { CtaBand, FaqList, Icon, PageHero, Section } from "../../components/site/Ui";
import { SITE } from "../../Data/company";

// Each industry: the operational challenges we see, the systems we deliver, and related pages.
const INDUSTRIES = [
  {
    id: "education", icon: "GraduationCap", name: "Education", tagline: "Schools, colleges, coaching institutes and educational trusts",
    pains: ["Fee records that do not reconcile with bank statements", "Attendance kept on paper and compiled at month-end", "Front-office time spent answering routine parent queries"],
    build: ["School ERP with a portal for each staff role", "Online admissions and fee collection", "Parent access, certificates and report cards"],
    links: [["Infovion School ERP", "/school-management-software"], ["Free certificate tools", "/free-tools"]],
  },
  {
    id: "jewellery", icon: "Gem", name: "Jewellery and bullion", tagline: "Jewellery retailers, wholesalers and gold loan businesses",
    pains: ["Bills calculated item by item on a calculator", "Girvi pledges recorded in registers", "Stock by weight that is difficult to reconcile"],
    build: ["Billing by weight, purity and making charges", "Girvi registers with interest calculation", "Customer credit ledgers, stock and accounting exports"],
    links: [["Infovion JMS", "/jewellery-management-software"], ["Girvi software", "/girvi-software"]],
  },
  {
    id: "government", icon: "Landmark", name: "Government and public sector", tagline: "Departments, municipal bodies, PSUs and universities",
    pains: ["Websites that do not meet accessibility guidelines", "Progress data collected by email in spreadsheets", "Citizen applications that require office visits"],
    build: ["Websites and portals aligned with GIGW 3.0", "MIS dashboards and field inspection applications", "Citizen service applications with status tracking"],
    links: [["Government capabilities", "/government"], ["Company profile", "/company-profile"]],
  },
  {
    id: "retail", icon: "Store", name: "Retail and distribution", tagline: "Retail stores, chains, wholesalers and distributors",
    pains: ["Stock levels that differ between store, warehouse and website", "Dealer orders received on messaging apps and re-entered", "Customer credit tracked informally"],
    build: ["Billing and inventory across locations", "Ordering portals for dealers and distributors", "Online stores synchronised with inventory"],
    links: [["E-commerce development", "/services/ecommerce-development"], ["ERP and CRM", "/services/erp-crm-development"]],
  },
  {
    id: "manufacturing", icon: "Factory", name: "Manufacturing", tagline: "Manufacturers, job workers and engineering firms",
    pains: ["Job work and wastage recorded on paper", "Orders, production and dispatch maintained in separate spreadsheets", "Management figures available only at month-end"],
    build: ["Production, job work and dispatch tracking", "Purchase, sales and GST e-invoicing", "Management dashboards on mobile"],
    links: [["ERP development", "/services/erp-crm-development"], ["Dashboards and MIS", "/services/dashboards-mis-reporting"]],
  },
  {
    id: "healthcare", icon: "HeartPulse", name: "Healthcare", tagline: "Clinics, diagnostic centres, pharmacies and wellness providers",
    pains: ["Appointments booked by phone without reminders", "Patient history spread across paper files", "Manual billing and reporting"],
    build: ["Appointment booking with automated reminders", "Patient records with role-based access", "Billing, inventory and reporting"],
    links: [["Custom software", "/services/custom-software-development"], ["Mobile applications", "/services/mobile-app-development"]],
  },
  {
    id: "services", icon: "Building2", name: "Real estate and professional services", tagline: "Developers, brokers, agencies, consultancies and field service firms",
    pains: ["Leads from several portals without structured follow-up", "Site visits and field work coordinated by phone", "Quotations, invoices and payments in separate tools"],
    build: ["CRM with lead capture and follow-up scheduling", "Field staff applications with photographs and location", "Quotations, invoicing and payment links"],
    links: [["CRM development", "/services/erp-crm-development"], ["API integration", "/services/api-integration"]],
  },
  {
    id: "startups", icon: "Rocket", name: "Startups", tagline: "Founders and domain specialists developing a new product",
    pains: ["No in-house technical team", "Previous vendors unavailable after delivery", "Early versions that do not scale beyond initial customers"],
    build: ["Clickable prototypes for user testing", "Minimum viable products in eight to fourteen weeks", "Multi-tenant SaaS with billing and onboarding"],
    links: [["SaaS product development", "/services/saas-product-development"], ["UI/UX design", "/services/ui-ux-design"]],
  },
];

const FAQ = [
  ["Do you work only in these industries?", "No. These are the sectors in which we have the most experience or an existing product. Our approach of studying the process before designing the system applies to any organisation."],
  ["Do you have ready-made software for my industry?", "For schools we offer Infovion School ERP, and for jewellery retailers Infovion JMS. For other sectors we develop custom software, reusing proven modules such as billing, inventory, CRM, approvals and dashboards where appropriate to reduce cost."],
  ["Can your products be customised for our organisation?", "Yes. Both products can be extended with custom modules, integrations and reports for larger organisations, groups of institutions and government bodies."],
];

export default function Industries() {
  return (
    <>
      <Helmet>
        <title>Industries We Build Software For | Infovion Technologies</title>
        <meta name="description" content="Software for schools, jewellers, government, retail, manufacturing, healthcare, real estate, professional services and startups, by Infovion Technologies." />
        <link rel="canonical" href={`${SITE}/industries`} />
        <meta property="og:url" content={`${SITE}/industries`} />
      </Helmet>
      <PageHero trail={[["Industries", "/industries"]]} kicker="Industries" title="Industries we serve"
        sub="We begin each engagement by studying how the work is done today, with the people who do it. The sections below describe the challenges we most often see in each sector and the systems we deliver." />

      <Section className="pt-0">
        <nav aria-label="Industries on this page" className="flex flex-wrap gap-x-6 gap-y-3 border-b border-white/10 pb-6">
          {INDUSTRIES.map((x) => <a key={x.id} href={`#${x.id}`} className="text-sm text-slate-300 underline-offset-4 hover:text-white hover:underline">{x.name}</a>)}
        </nav>
        <div className="mt-6">
          {INDUSTRIES.map((x) => (
            <Reveal key={x.id}>
              <article id={x.id} className="grid scroll-mt-28 gap-8 border-b border-white/10 py-10 lg:grid-cols-[0.9fr_1fr_1fr]">
                <div>
                  <Icon name={x.icon} className="h-6 w-6 text-sky-300" />
                  <h2 className="mt-4 font-display text-2xl font-bold text-white">{x.name}</h2>
                  <p className="mt-1.5 text-sm text-slate-400">{x.tagline}</p>
                  <div className="mt-5 flex flex-col gap-2">
                    {x.links.map(([t, to]) => <Link key={to} to={to} className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200">{t} <ArrowRight className="h-4 w-4" /></Link>)}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Common challenges</h3>
                  <ul className="mt-4 space-y-2.5">{x.pains.map((p) => <li key={p} className="flex gap-2.5 text-[15px] leading-relaxed text-slate-300"><span className="mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-slate-400" />{p}</li>)}</ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">What we deliver</h3>
                  <ul className="mt-4 space-y-2.5">{x.build.map((p) => <li key={p} className="flex gap-2.5 text-[15px] leading-relaxed text-slate-200"><Check className="mt-1 h-4 w-4 flex-shrink-0 text-sky-300" aria-hidden="true" />{p}</li>)}</ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
      <FaqList faqs={FAQ} />
      <CtaBand />
    </>
  );
}
