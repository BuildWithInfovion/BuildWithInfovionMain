import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { GhostButton, GlowButton, Reveal } from "../../components/fx/Fx";
import { AnswerBox, CtaBand, FaqList, Icon, LinkRow, PageHero, Section } from "../../components/site/Ui";
import { SERVICES, PROCESS, serviceBySlug } from "../../Data/services";
import { wa, SITE } from "../../Data/company";
import { serviceSchema } from "../../lib/seo";

const GROUPS = [
  ["Build", "Software, applications and platforms", ["custom-software-development", "web-development", "mobile-app-development", "erp-crm-development", "saas-product-development", "ecommerce-development"]],
  ["Design and data", "Interface design and reporting", ["ui-ux-design", "dashboards-mis-reporting"]],
  ["Automation and integration", "Connecting systems and reducing manual work", ["ai-automation", "api-integration"]],
  ["Operations and support", "Hosting, monitoring and maintenance", ["cloud-devops", "software-maintenance-support"]],
];

const HUB_FAQ = [
  ["What services does Infovion Technologies offer?", "Custom software development, website and web application development, mobile application development, ERP and CRM development, SaaS product development, UI/UX design, e-commerce development, AI and business automation, cloud and DevOps, API integration, dashboards and MIS reporting, and software maintenance under annual contracts. We also deliver e-governance projects for government bodies."],
  ["Which industries do you work with?", "Education, jewellery and retail, government and the public sector, manufacturing, healthcare, real estate and professional services, and startups. Our own products serve schools and jewellery retailers."],
  ["Can you take over a project started by another vendor?", "Yes. We begin with a short paid audit of the existing code and infrastructure, then recommend whether to complete, repair or rebuild the system, based on the lower long-term cost."],
  ["How does an engagement begin?", "With a consultation of thirty to forty-five minutes, or a short brief sent through the contact form. We respond within one business day and usually send a written scope and fixed-price proposal within two business days of the consultation."],
];

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Software development services by Infovion Technologies",
  itemListElement: SERVICES.map((s, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/services/${s.slug}`, name: s.name })),
};

function ProcessSteps({ detailed = false }) {
  return (
    <ol className="mt-10 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
      {PROCESS.map(([t, b, when], i) => (
        <li key={t} className="bg-cell p-6">
          <p className="flex items-baseline justify-between gap-4">
            <span className="font-display text-sm font-semibold text-sky-300">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-xs text-slate-400">{when}</span>
          </p>
          <h3 className="mt-3 font-display text-base font-semibold text-white">{t}</h3>
          {detailed && <p className="mt-2 text-sm leading-relaxed text-slate-400">{b}</p>}
        </li>
      ))}
    </ol>
  );
}

export function ServicesIndex() {
  return (
    <>
      <Helmet>
        <title>Software Development Services | Web, Mobile, ERP, SaaS and AI | Infovion Technologies</title>
        <meta name="description" content="Software development services from Infovion Technologies: custom software, websites and web applications, mobile apps, ERP and CRM, SaaS products, UI/UX design, e-commerce, AI automation, cloud and DevOps, API integration, dashboards and maintenance. Pune, India." />
        <link rel="canonical" href={`${SITE}/services`} />
        <meta property="og:title" content="Software Development Services | Infovion Technologies" />
        <meta property="og:url" content={`${SITE}/services`} />
        <script type="application/ld+json">{JSON.stringify(itemList)}</script>
      </Helmet>
      <PageHero trail={[["Services", "/services"]]} kicker="Services" title="Software development services"
        sub="Infovion Technologies provides design, development, integration and support services for web, mobile and enterprise software. A single team is responsible for each engagement, from requirements through to maintenance.">
        <GlowButton to="/contact">Discuss a project <ArrowRight className="h-4 w-4" /></GlowButton>
        <GhostButton href={wa("Hello Infovion, I would like to discuss a software project.")}><MessageCircle className="h-4 w-4" /> WhatsApp</GhostButton>
      </PageHero>

      {GROUPS.map(([g, sub, slugs]) => (
        <Section key={g} kicker={g} title={sub} className="py-12">
          <div className="mt-8 grid border-t border-white/10 md:grid-cols-2 md:gap-x-12">
            {slugs.map((slug) => {
              const s = serviceBySlug(slug);
              return <LinkRow key={slug} to={`/services/${slug}`} icon={s.icon} title={s.name} body={s.card} />;
            })}
          </div>
        </Section>
      ))}

      <Section kicker="Public sector" title="Government and institutional work" className="py-12">
        <div className="mt-8 grid border-t border-white/10 md:grid-cols-2 md:gap-x-12">
          <LinkRow to="/government" icon="Landmark" title="E-governance and government IT" body="Websites aligned with GIGW 3.0, citizen service portals, MIS dashboards, mobile applications and maintenance contracts, hosted in India." />
          <LinkRow to="/company-profile" icon="Building2" title="Company profile" body="Registration details, capabilities, technologies and contacts on one printable page, for tenders and vendor registration." />
        </div>
      </Section>

      <Section kicker="Process" title="How engagements are run" className="py-12">
        <ProcessSteps />
      </Section>

      <FaqList faqs={HUB_FAQ} />
      <CtaBand />
    </>
  );
}

export function ServicePage() {
  const { slug } = useParams();
  const s = serviceBySlug(slug);
  if (!s) {
    return (
      <div className="px-6 pb-24 pt-40 text-center">
        <Helmet><title>Service not found | Infovion Technologies</title><meta name="robots" content="noindex" /></Helmet>
        <h1 className="font-display text-4xl font-bold text-white">Service not found</h1>
        <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-sky-300">View all services <ArrowRight className="h-4 w-4" /></Link>
      </div>
    );
  }
  const url = `${SITE}/services/${s.slug}`;
  const related = s.related.map(serviceBySlug).filter(Boolean);
  const proof = {
    "school-erp-platform": ["Case study: a multi-tenant school ERP", "The design and operation of a school management platform with eight role portals, online fee collection and more than forty backend modules.", "/case-studies/school-erp-platform"],
    "jewellery-management-system": ["Case study: billing, girvi and stock for a jewellery retailer", "Replacing paper bills and girvi registers at a jewellery store in Maharashtra with a single system.", "/case-studies/jewellery-management-system"],
    "infovion-website": ["Case study: a website engineered for search", "How www.infovion.in was built for performance, search engines and AI assistants.", "/case-studies/infovion-website"],
  }[s.proof];
  const waText = `Hello Infovion, I would like to discuss ${s.noun}.`;

  return (
    <>
      <Helmet>
        <title>{s.title}</title>
        <meta name="description" content={s.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={s.title} />
        <meta property="og:description" content={s.description} />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema(s))}</script>
      </Helmet>

      <PageHero trail={[["Services", "/services"], [s.name, `/services/${s.slug}`]]} kicker="Services" title={s.h1} sub={s.intro}>
        <GlowButton to={`/contact?service=${s.slug}`}>Request a proposal <ArrowRight className="h-4 w-4" /></GlowButton>
        <GhostButton href={wa(waText)}><MessageCircle className="h-4 w-4" /> WhatsApp</GhostButton>
      </PageHero>

      <section className="relative pb-4">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <AnswerBox q="Overview">{s.answer}</AnswerBox>
        </div>
      </section>

      <Section kicker="Scope" title="What we deliver">
        <div className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {s.build.map(([t, b]) => (
            <div key={t} className="border-t border-white/15 pt-5">
              <h3 className="font-display text-[17px] font-semibold text-white">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="panel h-full rounded-xl p-7">
              <h2 className="font-display text-xl font-semibold text-white">Deliverables</h2>
              <ul className="mt-5 space-y-2.5">{s.deliverables.map((d) => <li key={d} className="flex gap-2.5 text-[15px] text-slate-300"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-300" aria-hidden="true" />{d}</li>)}</ul>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="panel h-full rounded-xl p-7">
              <h2 className="font-display text-xl font-semibold text-white">Typical clients</h2>
              <ul className="mt-5 space-y-2.5">{s.fit.map((f) => <li key={f} className="flex gap-2.5 text-[15px] text-slate-300"><Icon name={s.icon} className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-300" />{f}</li>)}</ul>
              <h2 className="mt-8 font-display text-xl font-semibold text-white">Technologies</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-300">{s.stack.join(", ")}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section kicker="Cost and timeline" title={`Cost of ${s.noun} in India`}
        sub="Indicative budget ranges for the Indian market in 2026, provided for planning. Each project receives its own fixed-price proposal after an initial consultation.">
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="panel overflow-hidden rounded-xl">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Typical budget ranges for {s.name} in India</caption>
              <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-400"><tr><th scope="col" className="px-5 py-3 font-semibold">Project type</th><th scope="col" className="px-5 py-3 font-semibold">Typical budget</th></tr></thead>
              <tbody className="divide-y divide-white/10">
                {s.cost.ranges.map(([k, v]) => <tr key={k}><td className="px-5 py-4 text-slate-200">{k}</td><td className="whitespace-nowrap px-5 py-4 font-semibold text-white">{v}</td></tr>)}
              </tbody>
            </table>
            <p className="border-t border-white/10 px-5 py-4 text-sm text-slate-300"><strong className="font-semibold text-white">Timeline. </strong>{s.cost.timeline}</p>
          </div>
          <div className="panel rounded-xl p-6">
            <h3 className="font-display text-lg font-semibold text-white">Factors that affect cost</h3>
            <ul className="mt-4 space-y-2">{s.cost.drivers.map((d) => <li key={d} className="flex gap-2.5 text-sm text-slate-300"><span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-sky-300" />{d}</li>)}</ul>
            <Link to={`/contact?service=${s.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-200">Request a fixed-price proposal <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </Section>

      {proof && (
        <Section className="py-8">
          <Link to={proof[2]} className="panel group flex flex-col gap-4 rounded-xl p-7 transition-colors hover:border-sky-300/40 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Related work</p>
              <h2 className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">{proof[0]}</h2>
              <p className="mt-1.5 max-w-2xl text-sm text-slate-300">{proof[1]}</p>
            </div>
            <span className="inline-flex flex-shrink-0 items-center gap-2 text-sm font-semibold text-white">Read the case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
          </Link>
        </Section>
      )}

      <Section kicker="Process" title="How the project is delivered" className="py-12">
        <ProcessSteps detailed />
      </Section>

      <FaqList faqs={s.faqs} />

      <Section kicker="Related services" title="Services often combined with this one" className="py-10">
        <div className="mt-8 grid border-t border-white/10 md:grid-cols-3 md:gap-x-10">
          {related.map((r) => <LinkRow key={r.slug} to={`/services/${r.slug}`} icon={r.icon} title={r.name} body={r.card} />)}
        </div>
      </Section>

      <CtaBand title={`Discuss your ${s.noun.replace(/ \(AMC\)$/, "")} requirements`} primary={["Request a proposal", `/contact?service=${s.slug}`]} whatsappText={waText} />
    </>
  );
}
