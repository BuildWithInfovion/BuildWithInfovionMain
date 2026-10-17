import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { BrowserFrame } from "../../components/product/Frames";
import { GhostButton, GlowButton, Kicker, Reveal } from "../../components/fx/Fx";
import { Breadcrumbs, CtaBand, LinkRow, PageHero, Section } from "../../components/site/Ui";
import { CASE_STUDIES, caseStudyBySlug } from "../../Data/caseStudies";
import { PRODUCTS, SITE } from "../../Data/company";
import { ORG_ID } from "../../lib/seo";

export function CaseStudiesIndex() {
  return (
    <>
      <Helmet>
        <title>Case Studies | Infovion Technologies</title>
        <meta name="description" content="Projects delivered by Infovion Technologies: a multi-tenant school ERP with eight role portals, a billing and girvi system for a jewellery retailer, and a company website engineered for search and AI assistants." />
        <link rel="canonical" href={`${SITE}/case-studies`} />
        <meta property="og:url" content={`${SITE}/case-studies`} />
      </Helmet>
      <PageHero trail={[["Case studies", "/case-studies"]]} kicker="Case studies" title="Selected work"
        sub="Systems we have designed, built and continue to operate. Each case study describes the requirement, the solution and the outcome." />
      <Section className="pt-0">
        <div className="grid gap-6">
          {CASE_STUDIES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.05}>
              <Link to={`/case-studies/${c.slug}`} className="panel group grid overflow-hidden rounded-xl transition-colors hover:border-sky-300/40 md:grid-cols-[1fr_1.2fr]">
                <div className="h-56 overflow-hidden border-b border-white/10 md:h-full md:border-b-0 md:border-r">
                  <img src={c.image[1]} alt={c.image[2]} loading="lazy" className="h-full w-full object-cover object-left-top transition duration-500 group-hover:scale-[1.02]" />
                </div>
                <div className="p-7 sm:p-9">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">{c.industry}</p>
                  <h2 className="mt-3 font-display text-2xl font-bold leading-snug text-white sm:text-[1.7rem]">{c.title}</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-300">{c.summary}</p>
                  <p className="mt-5 text-sm text-slate-400">{c.services.join(" · ")}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white">Read the case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}

export function CaseStudyPage() {
  const { slug } = useParams();
  const c = caseStudyBySlug(slug);
  if (!c) {
    return (
      <div className="px-6 pb-24 pt-40 text-center">
        <Helmet><title>Case study not found | Infovion Technologies</title><meta name="robots" content="noindex" /></Helmet>
        <h1 className="font-display text-4xl font-bold text-white">Case study not found</h1>
        <Link to="/case-studies" className="mt-6 inline-flex items-center gap-2 text-sky-300">All case studies <ArrowRight className="h-4 w-4" /></Link>
      </div>
    );
  }
  const url = `${SITE}/case-studies/${c.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.summary,
    image: [`${SITE}${c.image[0]}`],
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: url,
    about: c.services.map((s) => ({ "@type": "Thing", name: s })),
  };
  const others = CASE_STUDIES.filter((x) => x.slug !== c.slug);
  return (
    <>
      <Helmet>
        <title>{`${c.title} | Case Study | Infovion Technologies`}</title>
        <meta name="description" content={c.summary} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={c.title} />
        <meta property="og:description" content={c.summary} />
        <meta property="og:image" content={`${SITE}${c.image[0]}`} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="relative pb-14 pt-32 sm:pt-40">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Breadcrumbs trail={[["Case studies", "/case-studies"], [c.short, `/case-studies/${c.slug}`]]} className="mb-8" />
          <div className="rise"><Kicker>Case study · {c.industry}</Kicker></div>
          <h1 className="rise mt-5 max-w-4xl font-display text-[2.2rem] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">{c.title}</h1>
          <p className="rise mt-6 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">{c.summary}</p>
          <dl className="rise mt-10 grid gap-6 border-t border-white/10 pt-6 text-sm sm:grid-cols-3">
            <div><dt className="text-xs uppercase tracking-wider text-slate-400">Client</dt><dd className="mt-1.5 text-slate-200">{c.client}</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-slate-400">Services</dt><dd className="mt-1.5 text-slate-200">{c.services.join(", ")}</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-slate-400">Technology</dt><dd className="mt-1.5 text-slate-200">{c.stack.join(", ")}</dd></div>
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <BrowserFrame url={c.slug === "infovion-website" ? "www.infovion.in" : c.slug === "school-erp-platform" ? "app.infovion.in" : "jms"}>
          <img src={c.image[0]} alt={c.image[2]} width="1800" height="1125" className="block w-full" />
        </BrowserFrame>
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-4">
          {c.facts.map(([n, l]) => (
            <div key={l} className="bg-cell px-5 py-6">
              <dt className="sr-only">{l}</dt>
              <dd className="font-display text-2xl font-bold text-white sm:text-3xl">{n}</dd>
              <dd className="mt-1.5 text-xs leading-relaxed text-slate-400 sm:text-sm">{l}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Section kicker="Requirement" title="The challenge">
        <div className="mt-8 max-w-3xl space-y-4 text-[16px] leading-relaxed text-slate-300">{c.challenge.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div>
      </Section>

      <Section kicker="Solution" title="What we built" className="pt-4">
        <div className="mt-10 grid gap-x-10 gap-y-9 md:grid-cols-2">
          {c.solution.map(([t, b]) => (
            <div key={t} className="border-t border-white/15 pt-5">
              <h3 className="font-display text-[17px] font-semibold text-white">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="Outcome" title="Results" className="pt-4">
        <ul className="mt-8 max-w-3xl space-y-3">{c.results.map((r) => <li key={r} className="flex gap-3 text-[16px] leading-relaxed text-slate-200"><Check className="mt-1 h-4 w-4 flex-shrink-0 text-sky-300" aria-hidden="true" />{r}</li>)}</ul>
        <div className="mt-9 flex flex-wrap gap-3">
          {c.links.map(([t, to], i) => i === 0 ? <GlowButton key={to} to={to}>{t} <ArrowRight className="h-4 w-4" /></GlowButton> : <GhostButton key={to} to={to}>{t}</GhostButton>)}
        </div>
      </Section>

      <Section kicker="More work" title="Other case studies" className="pt-4">
        <div className="mt-8 grid border-t border-white/10 md:grid-cols-2 md:gap-x-12">
          {others.map((o) => <LinkRow key={o.slug} to={`/case-studies/${o.slug}`} title={o.title} body={o.industry} />)}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}

export function ProductsIndex() {
  const imgs = { school: ["/product/dashboard-900.webp", "Infovion School ERP dashboard"], jms: ["/product/jms/dashboard-900.webp", "Infovion JMS dashboard for a jewellery store"] };
  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: PRODUCTS.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}${p.to}`, name: p.name })),
  };
  return (
    <>
      <Helmet>
        <title>Products | Infovion School ERP and Infovion JMS | Infovion Technologies</title>
        <meta name="description" content="Software products by Infovion Technologies: Infovion School ERP, school management software for K-12 schools, and Infovion JMS, jewellery management software for billing, girvi, customer credit, stock and Tally export." />
        <link rel="canonical" href={`${SITE}/products`} />
        <script type="application/ld+json">{JSON.stringify(list)}</script>
      </Helmet>
      <PageHero trail={[["Products", "/products"]]} kicker="Products" title="Our products"
        sub="Two software products developed with schools and jewellery retailers. Both are in daily use and can be customised for larger organisations." />
      <Section className="pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          {PRODUCTS.map((p) => (
            <Link key={p.slug} to={p.to} className="panel group flex flex-col overflow-hidden rounded-xl transition-colors hover:border-sky-300/40">
              <img src={imgs[p.slug][0]} alt={imgs[p.slug][1]} width="900" height="562" loading="lazy" className="h-60 w-full border-b border-white/10 object-cover object-left-top" />
              <div className="flex flex-1 flex-col p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">{p.short}</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-white">{p.name}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-300">{p.blurb}</p>
                <p className="mt-4 text-sm text-slate-400">{p.status}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-white">Product overview <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-col items-start gap-4 rounded-xl border border-white/10 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold text-white">Developing a software product?</p>
            <p className="mt-1 text-sm text-slate-400">We design and build SaaS products from first version to scale, using the same engineering practices as our own products.</p>
          </div>
          <GhostButton to="/services/saas-product-development">SaaS product development</GhostButton>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
