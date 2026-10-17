import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, Gem, GraduationCap, Sparkles } from "lucide-react";
import { BrowserFrame } from "../../components/product/Frames";
import { GhostButton, GlowButton, Reveal } from "../../components/fx/Fx";
import { CtaBand, PageHero, Section, Breadcrumbs } from "../../components/site/Ui";
import { Aurora, Kicker } from "../../components/fx/Fx";
import { CASE_STUDIES, caseStudyBySlug } from "../../Data/caseStudies";
import { PRODUCTS, SITE } from "../../Data/company";
import { ORG_ID } from "../../lib/seo";

export function CaseStudiesIndex() {
  return (
    <div className="bg-ink">
      <Helmet>
        <title>Case Studies — Software We've Built and Run | Infovion Technologies</title>
        <meta name="description" content="Real projects by Infovion Technologies: a multi-tenant school ERP with 8 role portals, a jewellery billing and girvi system, and a website engineered for Google and AI search." />
        <link rel="canonical" href={`${SITE}/case-studies`} />
        <meta property="og:url" content={`${SITE}/case-studies`} />
      </Helmet>
      <PageHero trail={[["Case studies", "/case-studies"]]} kicker="Our work" title="Software we built —" accent="and still run."
        sub="No stock mock-ups. These are real systems in production, described honestly: the problem, what we built, and what changed." />
      <Section className="pt-4">
        <div className="grid gap-6">
          {CASE_STUDIES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.05}>
              <Link to={`/case-studies/${c.slug}`} className="group grid overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.02] transition-colors hover:border-teal-400/40 md:grid-cols-[1fr_1.2fr]">
                <div className="relative h-56 overflow-hidden md:h-full">
                  <img src={c.image[1]} alt={c.image[2]} loading="lazy" className="h-full w-full object-cover object-left-top transition duration-500 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#05070d]/60" />
                </div>
                <div className="p-7 sm:p-9">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">{c.industry}</p>
                  <h2 className="mt-3 font-display text-2xl font-extrabold leading-snug text-white group-hover:text-teal-100 sm:text-3xl">{c.title}</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-300">{c.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">{c.services.map((s) => <span key={s} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{s}</span>)}</div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300">Read the case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaBand title="Want results like these?" accent="Tell us your problem." />
    </div>
  );
}

export function CaseStudyPage() {
  const { slug } = useParams();
  const c = caseStudyBySlug(slug);
  if (!c) {
    return (
      <div className="bg-ink px-6 pb-24 pt-40 text-center">
        <Helmet><title>Case study not found — Infovion</title><meta name="robots" content="noindex" /></Helmet>
        <h1 className="font-display text-4xl font-extrabold text-white">Case study not found</h1>
        <Link to="/case-studies" className="mt-6 inline-flex items-center gap-2 text-teal-300">All case studies <ArrowRight className="h-4 w-4" /></Link>
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
    <div className="bg-ink">
      <Helmet>
        <title>{`${c.title} — Case Study | Infovion Technologies`}</title>
        <meta name="description" content={c.summary} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={c.title} />
        <meta property="og:description" content={c.summary} />
        <meta property="og:image" content={`${SITE}${c.image[0]}`} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="noise relative overflow-hidden pb-14 pt-28 sm:pt-36">
        <Aurora strong />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
          <Breadcrumbs trail={[["Case studies", "/case-studies"], [c.short, `/case-studies/${c.slug}`]]} className="mb-6" />
          <div className="rise"><Kicker>Case study · {c.industry}</Kicker></div>
          <h1 className="rise mt-6 max-w-4xl font-display text-[2.2rem] font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl">{c.title}</h1>
          <p className="rise mt-6 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">{c.summary}</p>
          <dl className="rise mt-9 grid gap-4 text-sm sm:grid-cols-3">
            <div><dt className="text-xs uppercase tracking-wider text-slate-500">Client</dt><dd className="mt-1 text-slate-200">{c.client}</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-slate-500">Services</dt><dd className="mt-1 text-slate-200">{c.services.join(" · ")}</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-slate-500">Technology</dt><dd className="mt-1 text-slate-200">{c.stack.join(", ")}</dd></div>
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <BrowserFrame url={c.slug === "infovion-website" ? "www.infovion.in" : c.slug === "school-erp-platform" ? "app.infovion.in" : "jms"}>
          <img src={c.image[0]} alt={c.image[2]} width="1800" height="1125" className="block w-full" />
        </BrowserFrame>
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/[0.06] ring-1 ring-white/[0.06] md:grid-cols-4">
          {c.facts.map(([n, l]) => (
            <div key={l} className="bg-ink px-5 py-6 text-center">
              <p className="font-display text-2xl font-extrabold text-gradient-aurora sm:text-3xl">{n}</p>
              <p className="mt-1.5 text-xs text-slate-400 sm:text-sm">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <Section kicker="The challenge" title="What needed solving">
        <div className="mt-8 max-w-3xl space-y-4 text-[16px] leading-relaxed text-slate-300">{c.challenge.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div>
      </Section>

      <Section kicker="The solution" title="What we built" className="pt-4">
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {c.solution.map(([t, b], i) => (
            <Reveal key={t} delay={(i % 2) * 0.05}>
              <div className="h-full rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6">
                <h3 className="font-display text-lg font-bold text-white">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section kicker="The outcome" title="What changed" className="pt-4">
        <ul className="mt-8 max-w-3xl space-y-3">{c.results.map((r) => <li key={r} className="flex gap-3 text-[16px] text-slate-200"><Check className="mt-1 h-5 w-5 flex-shrink-0 text-teal-300" />{r}</li>)}</ul>
        <div className="mt-8 flex flex-wrap gap-3">
          {c.links.map(([t, to], i) => i === 0 ? <GlowButton key={to} to={to}>{t} <ArrowRight className="h-4 w-4" /></GlowButton> : <GhostButton key={to} to={to}>{t}</GhostButton>)}
        </div>
      </Section>

      <Section kicker="More work" title="Other case studies" className="pt-4">
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {others.map((o) => (
            <Link key={o.slug} to={`/case-studies/${o.slug}`} className="group rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:border-teal-400/40">
              <p className="text-xs uppercase tracking-[0.16em] text-teal-300">{o.industry}</p>
              <h3 className="mt-2 font-display text-lg font-bold text-white group-hover:text-teal-100">{o.title}</h3>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300">Read <ArrowRight className="h-4 w-4" /></span>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand />
    </div>
  );
}

export function ProductsIndex() {
  const icons = { school: GraduationCap, jms: Gem };
  const imgs = { school: ["/product/dashboard-900.webp", "Infovion School ERP dashboard"], jms: ["/product/jms/dashboard-900.webp", "Infovion JMS dashboard for a jewellery store"] };
  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: PRODUCTS.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}${p.to}`, name: p.name })),
  };
  return (
    <div className="bg-ink">
      <Helmet>
        <title>Products — Infovion School ERP & Infovion JMS Jewellery Software | Infovion Technologies</title>
        <meta name="description" content="Software products by Infovion Technologies: Infovion School ERP (school management software for Indian K-12 schools) and Infovion JMS (jewellery management software for billing, girvi, udhaar and stock)." />
        <link rel="canonical" href={`${SITE}/products`} />
        <script type="application/ld+json">{JSON.stringify(list)}</script>
      </Helmet>
      <PageHero trail={[["Products", "/products"]]} kicker="Products" title="Ready-made software," accent="built for one industry each."
        sub="Our products come from working closely with schools and jewellers. Each one can also be customised for your organisation." />
      <Section className="pt-2">
        <div className="grid gap-6 lg:grid-cols-2">
          {PRODUCTS.map((p) => {
            const I = icons[p.slug];
            return (
              <Link key={p.slug} to={p.to} className="group overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.01] transition-colors hover:border-teal-400/40">
                <img src={imgs[p.slug][0]} alt={imgs[p.slug][1]} width="900" height="562" loading="lazy" className="h-60 w-full object-cover object-left-top" />
                <div className="p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300"><I className="h-5 w-5" /></span>
                    <div><h2 className="font-display text-xl font-bold text-white">{p.name}</h2><p className="text-xs uppercase tracking-[0.16em] text-slate-400">{p.short}</p></div>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-slate-300">{p.blurb}</p>
                  <p className="mt-3 text-xs text-teal-200">{p.status}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300">Explore {p.name} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="mt-6 flex flex-col items-start gap-4 rounded-3xl border border-dashed border-white/15 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 font-display text-lg font-bold text-white"><Sparkles className="h-5 w-5 text-teal-300" /> Have a product idea for your industry?</p>
            <p className="mt-1 text-sm text-slate-400">We build SaaS products from MVP to scale — with the same engineering behind our own.</p>
          </div>
          <GhostButton to="/services/saas-product-development">SaaS product development</GhostButton>
        </div>
      </Section>
      <CtaBand />
    </div>
  );
}
