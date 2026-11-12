import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { GhostButton, GlowButton } from "../../components/fx/Fx";
import { CtaBand, FaqList, LinkRow, PageHero, Section } from "../../components/site/Ui";
import { SERVICES, HEALTHCARE, OFFSHORE, PROCESS, serviceBySlug, servicePath } from "../../Data/services";
import { wa, SITE } from "../../Data/company";
import { showcaseBySlug, showcasePath } from "../../Data/showcase";
import { faqSchema, serviceSchema } from "../../lib/seo";

const GROUPS = [
  ["Build", "Software, applications and platforms", ["custom-software-development", "offshore-software-development-india", "on-demand-software-development", "web-development", "mobile-app-development", "erp-crm-development", "saas-product-development", "ecommerce-development"]],
  ["Design and data", "Interface design and reporting", ["ui-ux-design", "dashboards-mis-reporting"]],
  ["AI and automation", "AI agents, chatbots and connected systems", ["ai-automation", "ai-agent-development", "whatsapp-chatbot-development", "api-integration"]],
  ["Fix, secure and support", "Rescue, security, hosting and maintenance", ["vibe-coding-help", "application-security", "software-maintenance-support", "cloud-devops"]],
];

const HUB_FAQ = [
  ["What services does Infovion Technologies offer?", "Custom software development, AI automation, AI agents and WhatsApp chatbots, offshore development and maintenance for clients outside India, on-demand developers by the task, hour or month, help fixing and launching apps built with AI tools (vibe coding), application security, website and web application development, mobile application development, ERP and CRM development, SaaS product development, UI/UX design, e-commerce development, AI and business automation, cloud and DevOps, API integration, dashboards and MIS reporting, and software maintenance under annual contracts. We also deliver e-governance projects for government bodies."],
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
            <span className="stat-num font-display text-3xl font-extrabold leading-none">{String(i + 1).padStart(2, "0")}</span>
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-slate-300">{when}</span>
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
        <title>Software Development and AI Automation Services | Infovion</title>
        <meta name="description" content="Software development services from Pune, India: custom software, mobile apps, ERP and CRM, SaaS, AI agents, WhatsApp chatbots, automation and maintenance." />
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

      <Section kicker="Healthcare" title="Hospitals, hospital chains and pharma" className="py-12">
        <div className="mt-8 grid border-t border-white/10 md:grid-cols-2 md:gap-x-12">
          {HEALTHCARE.map((s) => <LinkRow key={s.slug} to={servicePath(s)} icon={s.icon} title={s.name} body={s.card} />)}
        </div>
      </Section>

      <Section kicker="Outside India" title="For clients in other countries" className="py-12">
        <div className="mt-8 grid border-t border-white/10 md:grid-cols-2 md:gap-x-12">
          {OFFSHORE.map((s) => <LinkRow key={s.slug} to={servicePath(s)} icon={s.icon} title={s.name} body={s.card} />)}
        </div>
      </Section>

      <Section kicker="Public sector" title="Government and institutional work" className="py-12">
        <div className="mt-8 grid border-t border-white/10 md:grid-cols-2 md:gap-x-12">
          <LinkRow to="/government" icon="Landmark" title="E-governance and government IT" body="Websites aligned with GIGW 3.0, citizen service portals, MIS dashboards, mobile applications and maintenance contracts, hosted in India." />
          <LinkRow to="/company-profile" icon="Building2" title="Company profile" body="Registration details, capabilities, technologies and contacts on one printable page, for tenders and vendor registration." />
        </div>
      </Section>

      <Section kicker="Free tools" title="Plan your budget before you call" className="py-12">
        <div className="mt-8 grid border-t border-white/10 md:grid-cols-2 md:gap-x-12">
          <LinkRow to="/app-development-cost-calculator" icon="Calculator" title="App development cost calculator" body="Platform, screens and features in; a budget range and timeline out." />
          <LinkRow to="/software-development-cost-calculator" icon="Calculator" title="Software development cost calculator" body="Website, web app, CRM, ERP or SaaS, by modules, roles and integrations." />
          <LinkRow to="/hire-developers-india-cost-calculator" icon="Calculator" title="Developer cost calculator" body="A dedicated developer in India against hiring in your own country." />
          <LinkRow to="/ai-automation-roi-calculator" icon="Calculator" title="AI automation ROI calculator" body="Hours saved, monthly saving and payback period." />
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

/** A titled block in the service page's reading column; its id is a target for the side navigation. */
function Block({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-display text-[1.75rem] leading-tight text-white sm:text-[2.1rem]">{title}</h2>
      <div className="mt-7">{children}</div>
    </section>
  );
}

/** Contents list that stays beside the page on wide screens and marks the section being read. */
function SideNav({ items, contactTo }) {
  const [active, setActive] = useState(items[0][0]);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver((entries) => {
      const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (seen) setActive(seen.target.id);
    }, { rootMargin: "-20% 0px -65% 0px" });
    items.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [items]);
  return (
    <aside className="hidden w-52 flex-shrink-0 lg:block">
      <nav aria-label="On this page" className="sticky top-28">
        <p className="text-sm text-slate-400">On this page</p>
        <ul className="mt-4 border-l border-white/10">
          {items.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={active === id ? "true" : undefined}
                className={`-ml-px block border-l py-2 pl-4 text-sm transition-colors ${active === id ? "border-sky-300 text-white" : "border-transparent text-slate-400 hover:text-slate-200"}`}>{label}</a>
            </li>
          ))}
        </ul>
        <GlowButton to={contactTo} className="mt-8 w-full !px-4 !py-2.5">Request a proposal</GlowButton>
      </nav>
    </aside>
  );
}

const fmtDate = (d) => new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function ServicePage({ slug: fixedSlug }) {
  const params = useParams();
  const s = serviceBySlug(fixedSlug ?? params.slug);
  if (!s) {
    return (
      <div className="px-6 pb-24 pt-40 text-center">
        <Helmet><title>Service not found | Infovion Technologies</title><meta name="robots" content="noindex" /></Helmet>
        <h1 className="font-display text-4xl font-bold text-white">Service not found</h1>
        <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-sky-300">View all services <ArrowRight className="h-4 w-4" /></Link>
      </div>
    );
  }
  const url = `${SITE}${servicePath(s)}`;
  const related = s.related.map(serviceBySlug).filter(Boolean);
  const proof = {
    "school-erp-platform": ["Case study: a multi-tenant school ERP", "The design and operation of a school management platform with eight role portals, online fee collection and more than forty backend modules.", "/case-studies/school-erp-platform"],
    "jewellery-management-system": ["Case study: billing, girvi and stock for a jewellery retailer", "Replacing paper bills and girvi registers at a jewellery store in Maharashtra with a single system.", "/case-studies/jewellery-management-system"],
    "infovion-website": ["Case study: a website engineered for search", "How www.infovion.in was built for performance, search engines and AI assistants.", "/case-studies/infovion-website"],
  }[s.proof] ?? (showcaseBySlug(s.proof) && [`Solution blueprint: ${showcaseBySlug(s.proof).title.replace(/^An? /, "")}`, showcaseBySlug(s.proof).summary, showcasePath(showcaseBySlug(s.proof)), "View the blueprint"]);
  const waText = s.waText ?? `Hello Infovion, I would like to discuss ${s.noun}.`;
  const contactTo = `/contact?service=${s.contactAs ?? s.slug}`;
  const nav = [["overview", "Overview"], ["scope", "What we deliver"], ...(s.explain ? [["detail", "In detail"]] : []), ["deliverables", "Deliverables"], ["cost", "Cost and timeline"], ["process", "Process"], ["faq", "Questions"], ["related", "Related"]];

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
        {s.updated && (
          <script type="application/ld+json">
            {JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", name: s.h1, headline: s.title, url, description: s.description, dateModified: s.updated, lastReviewed: s.updated, inLanguage: "en-IN", author: { "@id": `${SITE}/#organization` }, publisher: { "@id": `${SITE}/#organization` }, about: { "@id": `${url}#service` }, citation: s.sources?.map(([name, u]) => ({ "@type": "CreativeWork", name, url: u })) })}
          </script>
        )}
      </Helmet>

      <PageHero trail={s.trail ?? [["Services", "/services"], [s.name, servicePath(s)]]} kicker={s.kicker ?? (s.path ? "Healthcare" : "Services")} title={s.h1} sub={s.intro}>
        <GlowButton to={contactTo}>Request a proposal</GlowButton>
        <GhostButton href={wa(waText)}><MessageCircle className="h-4 w-4" /> WhatsApp</GhostButton>
      </PageHero>

      {/* The three things a buyer looks for first */}
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <dl className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-3">
          {[[s.cost.ranges[0][0], s.cost.ranges[0][1]], ["Timeline", s.cost.timeline.split(/[;.]/)[0]], ["Ownership", "Source code and accounts in your name"]].map(([k, v]) => (
            <div key={k} className="bg-[#080a0f] px-6 py-5">
              <dt className="text-sm text-slate-400">{k}</dt>
              <dd className="font-display mt-1.5 text-lg leading-snug text-white">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mx-auto mt-16 max-w-6xl gap-16 px-5 sm:px-6 lg:flex">
        <SideNav items={nav} contactTo={contactTo} />

        <div className="min-w-0 flex-1 space-y-20">
          <Block id="overview" title={s.answerQ ?? "Overview"}>
            <p className="max-w-3xl text-lg leading-relaxed text-slate-200">{s.answer}</p>
            {s.updated && <p className="mt-5 text-sm text-slate-400">Updated {fmtDate(s.updated)} by Infovion Technologies, Pune.</p>}
          </Block>

          <Block id="scope" title="What we deliver">
            <dl className="border-t border-white/10">
              {s.build.map(([t, b]) => (
                <div key={t} className="grid gap-2 border-b border-white/10 py-5 sm:grid-cols-[15rem_1fr] sm:gap-8">
                  <dt className="font-display text-[17px] text-white">{t}</dt>
                  <dd className="text-[15px] leading-relaxed text-slate-400">{b}</dd>
                </div>
              ))}
            </dl>
          </Block>

          {s.explain && (
            <div id="detail" className="scroll-mt-28 space-y-14">
              {s.explain.map(([h, body, items]) => (
                <section key={h}>
                  <h2 className="font-display text-2xl leading-tight text-white sm:text-[1.7rem]">{h}</h2>
                  {body && <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">{body}</p>}
                  {items && <ul className="mt-5 max-w-3xl border-t border-white/10">{items.map((x) => <li key={x} className="border-b border-white/10 py-3 text-[15px] leading-relaxed text-slate-300">{x}</li>)}</ul>}
                </section>
              ))}
              {s.sources && (
                <p className="text-sm text-slate-400">
                  Sources:{" "}
                  {s.sources.map(([t, u], i) => (
                    <React.Fragment key={u}>{i > 0 && ", "}<a href={u} target="_blank" rel="noopener noreferrer" className="underline decoration-white/25 underline-offset-4 hover:text-slate-200">{t}</a></React.Fragment>
                  ))}
                </p>
              )}
            </div>
          )}

          <Block id="deliverables" title="Deliverables">
            <div className="grid gap-12 md:grid-cols-2">
              <ul className="border-t border-white/10">{s.deliverables.map((d) => <li key={d} className="border-b border-white/10 py-3 text-[15px] text-slate-200">{d}</li>)}</ul>
              <div>
                <h3 className="text-sm font-medium text-slate-400">Typical clients</h3>
                <ul className="mt-3 space-y-2 text-[15px] text-slate-200">{s.fit.map((f) => <li key={f}>{f}</li>)}</ul>
                <h3 className="mt-8 text-sm font-medium text-slate-400">Technologies</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-200">{s.stack.join(", ")}</p>
              </div>
            </div>
          </Block>

          <Block id="cost" title={s.cost.title ?? `Cost of ${s.noun} in India`}>
            <p className="max-w-3xl text-[15px] leading-relaxed text-slate-400">{s.cost.sub ?? "Indicative budget ranges for the Indian market in 2026, provided for planning. Each project receives its own fixed-price proposal after an initial consultation."}</p>
            <table className="mt-7 w-full text-left">
              <caption className="sr-only">Typical budget ranges for {s.name}</caption>
              <thead><tr className="border-b border-white/15 text-sm text-slate-400"><th scope="col" className="py-3 pr-4 font-medium">Project type</th><th scope="col" className="py-3 text-right font-medium">Typical budget</th></tr></thead>
              <tbody>
                {s.cost.ranges.map(([k, v]) => <tr key={k} className="border-b border-white/10"><td className="py-4 pr-4 text-[15px] text-slate-200">{k}</td><td className="py-4 text-right font-display text-lg text-white sm:whitespace-nowrap">{v}</td></tr>)}
              </tbody>
            </table>
            <div className="mt-8 grid gap-10 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-slate-400">Timeline</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-200">{s.cost.timeline}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-400">What moves the price</h3>
                <ul className="mt-3 space-y-2 text-[15px] text-slate-200">{s.cost.drivers.map((d) => <li key={d}>{d}</li>)}</ul>
              </div>
            </div>
            <GhostButton to={contactTo} className="mt-8">Request a fixed-price proposal</GhostButton>
          </Block>

          {proof && (
            <Link to={proof[2]} className="group block rounded-2xl border border-white/10 bg-[#080a0f] p-8 transition-colors hover:border-white/25">
              <p className="text-sm text-sky-300">Related work</p>
              <h2 className="font-display mt-2 text-2xl leading-tight text-white">{proof[0]}</h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-slate-400">{proof[1]}</p>
              <span className="mt-5 inline-block text-sm font-medium text-white underline decoration-white/30 underline-offset-4 group-hover:decoration-white">{proof[3] ?? "Read the case study"}</span>
            </Link>
          )}

          <Block id="process" title="How the project is delivered">
            <ol className="border-t border-white/10">
              {PROCESS.map(([t, b, when], i) => (
                <li key={t} className="grid gap-2 border-b border-white/10 py-5 sm:grid-cols-[2.5rem_11rem_1fr] sm:gap-6">
                  <span aria-hidden="true" className="font-mono text-sm text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                  <span><span className="font-display block text-[17px] text-white">{t}</span><span className="text-sm text-slate-400">{when}</span></span>
                  <span className="text-[15px] leading-relaxed text-slate-400">{b}</span>
                </li>
              ))}
            </ol>
          </Block>

          <Block id="faq" title="Frequently asked questions">
            <Helmet><script type="application/ld+json">{JSON.stringify(faqSchema(s.faqs))}</script></Helmet>
            <div className="border-t border-white/10">
              {s.faqs.map(([q, a], i) => (
                <details key={q} open={i === 0} className="group border-b border-white/10 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-white transition-colors hover:text-sky-200">
                    <h3 className="font-display text-left text-[17px]">{q}</h3>
                    <span className="mt-0.5 text-xl leading-none text-slate-400 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="max-w-3xl pb-6 pr-8 text-[15px] leading-relaxed text-slate-300">{a}</p>
                </details>
              ))}
            </div>
          </Block>

          <Block id="related" title="Often combined with">
            <div className="border-t border-white/10">
              {related.map((r) => <LinkRow key={r.slug} to={servicePath(r)} title={r.name} body={r.card} />)}
              {s.reading?.map(([to, t, b]) => <LinkRow key={to} to={to} title={t} body={b} />)}
            </div>
          </Block>
        </div>
      </div>

      <div className="mt-20" />
      <CtaBand title={s.ctaTitle ?? `Discuss your ${s.noun.replace(/ \(AMC\)$/, "")} requirements`} primary={["Request a proposal", contactTo]} whatsappText={waText} />
    </>
  );
}
