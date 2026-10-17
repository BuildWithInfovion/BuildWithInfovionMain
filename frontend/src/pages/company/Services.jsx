import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, Clock, IndianRupee, MessageCircle, Users } from "lucide-react";
import { GhostButton, GlowButton, Reveal } from "../../components/fx/Fx";
import { AnswerBox, CtaBand, FaqList, Icon, LinkCard, PageHero, Section } from "../../components/site/Ui";
import { SERVICES, PROCESS, serviceBySlug } from "../../Data/services";
import { wa, SITE } from "../../Data/company";
import { serviceSchema } from "../../lib/seo";

const GROUPS = [
  ["Build", "Software, apps and platforms", ["custom-software-development", "web-development", "mobile-app-development", "erp-crm-development", "saas-product-development", "ecommerce-development"]],
  ["Design & data", "Interfaces people understand, numbers people trust", ["ui-ux-design", "dashboards-mis-reporting"]],
  ["Automate & connect", "Less copy-paste, fewer mistakes", ["ai-automation", "api-integration"]],
  ["Run & support", "Keep it fast, secure and online", ["cloud-devops", "software-maintenance-support"]],
];

const HUB_FAQ = [
  ["What services does Infovion Technologies offer?", "Custom software development, website and web app development, mobile app development, ERP and CRM development, SaaS product development, UI/UX design, e-commerce development, AI and business automation, cloud and DevOps, API integration, dashboards and MIS reporting, and software maintenance (AMC). We also deliver e-governance projects for government bodies."],
  ["Which industries do you work with?", "Education, jewellery and retail, government and public sector, manufacturing and MSMEs, healthcare, real estate and service businesses, and startups. We have built and run our own software for schools and jewellery stores."],
  ["Can you take on a project another company started?", "Yes. We begin with a short paid audit of the existing code and servers, then give you a plan to finish, fix or rebuild — whichever costs you less over time."],
  ["How do we start?", "Book a free 30–45 minute call or send a short brief through the contact form. We reply within one working day and usually send a written scope and fixed quote within 48 hours of the call."],
];

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Software development services by Infovion Technologies",
  itemListElement: SERVICES.map((s, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/services/${s.slug}`, name: s.name })),
};

export function ServicesIndex() {
  return (
    <div className="bg-ink">
      <Helmet>
        <title>Software Development Services — Web, Mobile, ERP, SaaS, AI | Infovion Technologies</title>
        <meta name="description" content="All Infovion Technologies services: custom software, websites and web apps, mobile apps, ERP & CRM, SaaS products, UI/UX, e-commerce, AI automation, cloud & DevOps, API integration, dashboards and AMC. Pune, India." />
        <link rel="canonical" href={`${SITE}/services`} />
        <meta property="og:title" content="Software development services — Infovion Technologies" />
        <meta property="og:url" content={`${SITE}/services`} />
        <script type="application/ld+json">{JSON.stringify(itemList)}</script>
      </Helmet>
      <PageHero trail={[["Services", "/services"]]} kicker="Services" title="Everything you need to build," accent="launch and run software."
        sub="One team from first sketch to years of support — so nothing falls between an agency, a freelancer and a hosting company.">
        <GlowButton to="/contact">Get a free quote <ArrowRight className="h-4 w-4" /></GlowButton>
        <GhostButton href={wa("Hi Infovion! I'd like to discuss a software project.")}><MessageCircle className="h-4 w-4" /> WhatsApp us</GhostButton>
      </PageHero>

      {GROUPS.map(([g, sub, slugs]) => (
        <Section key={g} kicker={g} title={sub} className="py-14">
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {slugs.map((slug, i) => {
              const s = serviceBySlug(slug);
              return <Reveal key={slug} delay={(i % 3) * 0.04}><LinkCard to={`/services/${slug}`} icon={s.icon} title={s.name} body={s.card} cta="Explore" /></Reveal>;
            })}
          </div>
        </Section>
      ))}

      <Section kicker="Public sector" title="For government departments" accent="and PSUs" className="py-14">
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <LinkCard to="/government" icon="Landmark" title="E-governance & government IT" body="GIGW 3.0 aligned websites, citizen portals, MIS dashboards, mobile apps and AMC — accessible, secure and India-hosted." cta="See capabilities" />
          <LinkCard to="/company-profile" icon="Building2" title="Company profile" body="Registration details, capabilities, technology and contacts in one printable page for tenders and vendor registration." cta="Open profile" />
        </div>
      </Section>

      <Section kicker="Process" title="How every project runs" className="py-14">
        <ol className="mt-10 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {PROCESS.map(([t, , when], i) => (
            <li key={t} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
              <p className="font-display text-2xl font-extrabold text-white/15">0{i + 1}</p>
              <p className="mt-1 font-display font-bold text-white">{t}</p>
              <p className="mt-1 text-xs text-slate-400">{when}</p>
            </li>
          ))}
        </ol>
      </Section>

      <FaqList faqs={HUB_FAQ} />
      <CtaBand />
    </div>
  );
}

export function ServicePage() {
  const { slug } = useParams();
  const s = serviceBySlug(slug);
  if (!s) {
    return (
      <div className="bg-ink px-6 pb-24 pt-40 text-center">
        <Helmet><title>Service not found — Infovion</title><meta name="robots" content="noindex" /></Helmet>
        <h1 className="font-display text-4xl font-extrabold text-white">Service not found</h1>
        <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-teal-300">See all services <ArrowRight className="h-4 w-4" /></Link>
      </div>
    );
  }
  const url = `${SITE}/services/${s.slug}`;
  const related = s.related.map(serviceBySlug).filter(Boolean);
  const proof = {
    "school-erp-platform": ["Case study: a multi-tenant school ERP", "How we built and run a school management platform with 8 role portals, online fee payments and 40+ backend modules.", "/case-studies/school-erp-platform"],
    "jewellery-management-system": ["Case study: jewellery billing, girvi and stock", "How we replaced paper bills and girvi registers for a Pune jewellery store with one system.", "/case-studies/jewellery-management-system"],
    "infovion-website": ["Case study: a website built to be found", "How www.infovion.in was engineered for speed, Google and AI answer engines.", "/case-studies/infovion-website"],
  }[s.proof];

  return (
    <div className="bg-ink">
      <Helmet>
        <title>{s.title}</title>
        <meta name="description" content={s.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={s.title} />
        <meta property="og:description" content={s.description} />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema(s))}</script>
      </Helmet>

      <PageHero trail={[["Services", "/services"], [s.name, `/services/${s.slug}`]]} kicker={s.name} title={s.h1} accent={s.accent} sub={s.intro}>
        <GlowButton to={`/contact?service=${s.slug}`}>Get a free quote <ArrowRight className="h-4 w-4" /></GlowButton>
        <GhostButton href={wa(`Hi Infovion! I'm interested in ${s.name.toLowerCase()}.`)}><MessageCircle className="h-4 w-4" /> WhatsApp us</GhostButton>
      </PageHero>

      <section className="relative pb-6">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <AnswerBox q={`What does ${s.noun} at Infovion include?`}>{s.answer}</AnswerBox>
        </div>
      </section>

      <Section kicker="What we build" title="What we can build" accent="for you">
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.build.map(([t, b], i) => (
            <Reveal key={t} delay={(i % 3) * 0.04}>
              <div className="h-full rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300 ring-1 ring-teal-400/20"><Icon name={s.icon} /></span>
                <h3 className="mt-4 font-display text-lg font-bold text-white">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="glass h-full rounded-3xl p-7">
              <h2 className="font-display text-xl font-bold text-white">What you get</h2>
              <ul className="mt-5 space-y-2.5">{s.deliverables.map((d) => <li key={d} className="flex gap-2.5 text-[15px] text-slate-300"><Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-300" />{d}</li>)}</ul>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="glass h-full rounded-3xl p-7">
              <h2 className="flex items-center gap-2 font-display text-xl font-bold text-white"><Users className="h-5 w-5 text-teal-300" /> Who it's for</h2>
              <ul className="mt-5 flex flex-wrap gap-2">{s.fit.map((f) => <li key={f} className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-slate-200">{f}</li>)}</ul>
              <h2 className="mt-8 font-display text-xl font-bold text-white">Technology we use</h2>
              <ul className="mt-4 flex flex-wrap gap-2">{s.stack.map((t) => <li key={t} className="rounded-full bg-teal-400/10 px-3 py-1 font-mono text-xs text-teal-100">{t}</li>)}</ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section kicker="Cost & timeline" title={`How much does ${s.noun} cost in India?`}
        sub="Typical market budget ranges in India (2026), so you can plan. Your project gets its own fixed, written quote after a free discovery call.">
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="overflow-hidden rounded-3xl border border-white/[0.08]">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Typical budget ranges for {s.name} in India</caption>
              <thead className="bg-white/[0.04] text-xs uppercase tracking-wider text-slate-400"><tr><th scope="col" className="px-5 py-3 font-semibold">Project type</th><th scope="col" className="px-5 py-3 font-semibold">Typical budget</th></tr></thead>
              <tbody className="divide-y divide-white/[0.06]">
                {s.cost.ranges.map(([k, v]) => <tr key={k}><td className="px-5 py-4 text-slate-200">{k}</td><td className="px-5 py-4 font-semibold text-white">{v}</td></tr>)}
              </tbody>
            </table>
            <p className="flex items-start gap-2 border-t border-white/[0.06] bg-white/[0.02] px-5 py-4 text-sm text-slate-300"><Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-300" /><span><strong className="text-white">Timeline: </strong>{s.cost.timeline}</span></p>
          </div>
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6">
            <h3 className="flex items-center gap-2 font-display text-lg font-bold text-white"><IndianRupee className="h-5 w-5 text-teal-300" /> What changes the price</h3>
            <ul className="mt-4 space-y-2">{s.cost.drivers.map((d) => <li key={d} className="flex gap-2 text-sm text-slate-300"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal-300" />{d}</li>)}</ul>
            <Link to={`/contact?service=${s.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-300 hover:text-teal-200">Get your fixed quote <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </Section>

      {proof && (
        <Section className="py-10">
          <Link to={proof[2]} className="group flex flex-col gap-4 rounded-3xl border border-teal-400/25 bg-gradient-to-r from-teal-400/[0.08] to-indigo-400/[0.05] p-7 transition-colors hover:border-teal-300/50 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">Proof</p>
              <h2 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">{proof[0]}</h2>
              <p className="mt-1.5 max-w-2xl text-sm text-slate-300">{proof[1]}</p>
            </div>
            <span className="inline-flex flex-shrink-0 items-center gap-2 text-sm font-semibold text-teal-200">Read it <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
          </Link>
        </Section>
      )}

      <Section kicker="Process" title="How we deliver" className="py-14">
        <ol className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map(([t, b, when], i) => (
            <li key={t} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
              <div className="flex items-center justify-between"><span className="font-display text-2xl font-extrabold text-white/15">0{i + 1}</span><span className="text-[11px] font-semibold text-teal-200">{when}</span></div>
              <h3 className="mt-1 font-display font-bold text-white">{t}</h3>
              <p className="mt-1.5 text-sm text-slate-400">{b}</p>
            </li>
          ))}
        </ol>
      </Section>

      <FaqList faqs={s.faqs} title="Questions about" accent={s.noun} />

      <Section kicker="Related services" title="Often paired with" className="py-10">
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {related.map((r) => <LinkCard key={r.slug} to={`/services/${r.slug}`} icon={r.icon} title={r.name} body={r.card} cta="Explore" />)}
        </div>
      </Section>

      <CtaBand title={`Let's talk about your ${s.noun.replace(/ \(AMC\)$/, "")} project.`} accent="" primary={["Get a free quote", `/contact?service=${s.slug}`]} whatsappText={`Hi Infovion! I'm interested in ${s.name.toLowerCase()}.`} />
    </div>
  );
}
