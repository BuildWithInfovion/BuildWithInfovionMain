import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import Mock from "../../components/site/Mock";
import { GhostButton, GlowButton, Kicker, Reveal } from "../../components/fx/Fx";
import { Breadcrumbs, CtaBand, FaqList, LinkRow, Section } from "../../components/site/Ui";
import { SHOWCASE, showcaseBySlug, showcasePath } from "../../Data/showcase";
import { SITE, wa } from "../../Data/company";
import { ORG_ID } from "../../lib/seo";

const UPDATED = "2026-11-11";

/** Cards for the blueprints: on the work page, the homepage and at the foot of each blueprint. */
export function SolutionCards({ items = SHOWCASE, cols = "lg:grid-cols-3" }) {
  return (
    <div className={`grid gap-6 sm:grid-cols-2 ${cols}`}>
      {items.map((p, i) => (
        <Reveal key={p.slug} delay={(i % 3) * 0.05}>
          <Link to={showcasePath(p)} className="panel group flex h-full flex-col overflow-hidden rounded-xl transition-colors hover:border-sky-300/40">
            <div className="h-56 overflow-hidden border-b border-white/10"><Mock project={p} compact /></div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-300">{p.industry}</p>
              <h3 className="mt-2.5 font-display text-lg font-semibold leading-snug text-white group-hover:text-sky-100">{p.title}</h3>
              <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-slate-400">{p.summary}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-white">View the blueprint <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

export default function SolutionPage() {
  const { slug } = useParams();
  const p = showcaseBySlug(slug);
  if (!p) {
    return (
      <div className="px-6 pb-24 pt-40 text-center">
        <Helmet><title>Page not found | Infovion Technologies</title><meta name="robots" content="noindex" /></Helmet>
        <h1 className="font-display text-4xl font-bold text-white">Solution not found</h1>
        <Link to="/case-studies" className="mt-6 inline-flex items-center gap-2 text-sky-300">All work <ArrowRight className="h-4 w-4" /></Link>
      </div>
    );
  }
  const url = `${SITE}${showcasePath(p)}`;
  const waText = `Hello Infovion, I saw your ${p.short} blueprint and would like to discuss a similar system.`;
  const contactTo = `/contact?service=${p.service}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: p.title,
    description: p.description,
    url,
    mainEntityOfPage: url,
    dateModified: UPDATED,
    inLanguage: "en-IN",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    about: [p.short, ...p.modules.map(([t]) => t)].map((name) => ({ "@type": "Thing", name })),
  };
  const others = SHOWCASE.filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    <>
      <Helmet>
        <title>{p.seoTitle}</title>
        <meta name="description" content={p.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={p.title} />
        <meta property="og:description" content={p.description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="relative pb-12 pt-32 sm:pt-40">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Breadcrumbs trail={[["Work", "/case-studies"], [p.short, showcasePath(p)]]} className="mb-8" />
          <div className="rise"><Kicker>Solution blueprint · {p.industry}</Kicker></div>
          <h1 className="rise mt-5 max-w-4xl font-display text-[2.2rem] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">{p.title}</h1>
          <p className="rise mt-6 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">{p.summary}</p>
          <div className="rise mt-9 flex flex-col gap-3 sm:flex-row">
            <GlowButton to={contactTo}>Get this built for you <ArrowRight className="h-4 w-4" /></GlowButton>
            <GhostButton href={wa(waText)}><MessageCircle className="h-4 w-4" /> WhatsApp</GhostButton>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Mock project={p} />
        <p className="mt-3 text-center text-xs text-slate-500">Design mockup with sample data. This is a solution blueprint by Infovion Technologies, not a client engagement.</p>
        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-4">
          {p.facts.map(([n, l]) => (
            <div key={l} className="bg-cell px-5 py-6">
              <dd className="font-display text-2xl font-bold text-white sm:text-[1.7rem]">{n}</dd>
              <dt className="mt-1.5 text-xs leading-relaxed text-slate-400 sm:text-sm">{l}</dt>
            </div>
          ))}
        </dl>
      </div>

      <Section kicker="The situation" title="The problem this solves">
        <div className="mt-8 max-w-3xl space-y-4 text-[16px] leading-relaxed text-slate-300">{p.problem.map((t) => <p key={t.slice(0, 32)}>{t}</p>)}</div>
      </Section>

      <Section kicker="The system" title="What it includes" className="pt-4">
        <div className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {p.modules.map(([t, b]) => (
            <div key={t} className="border-t border-white/15 pt-5">
              <h3 className="font-display text-[17px] font-semibold text-white">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="How it works" title="From input to outcome" className="pt-4">
        <ol className="mt-10 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {p.flow.map(([t, b], i) => (
            <li key={t} className="bg-cell p-5">
              <span className="font-display text-sm font-semibold text-sky-300">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2.5 font-display text-base font-semibold text-white">{t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{b}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="panel h-full rounded-xl p-7">
              <h2 className="font-display text-xl font-semibold text-white">What the design is built to achieve</h2>
              <ul className="mt-5 space-y-3">{p.targets.map((t) => <li key={t} className="flex gap-2.5 text-[15px] leading-relaxed text-slate-300"><Check className="mt-1 h-4 w-4 flex-shrink-0 text-sky-300" aria-hidden="true" />{t}</li>)}</ul>
              <h2 className="mt-8 font-display text-xl font-semibold text-white">Technology</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-300">{p.stack.join(", ")}</p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="panel h-full overflow-hidden rounded-xl">
              <h2 className="px-7 pt-7 font-display text-xl font-semibold text-white">Budget and timeline</h2>
              <table className="mt-5 w-full text-left text-sm">
                <caption className="sr-only">Indicative budget and timeline for {p.short}</caption>
                <tbody className="divide-y divide-white/10 border-y border-white/10">
                  <tr><th scope="row" className="px-7 py-4 font-medium text-slate-300">Build, clients in India</th><td className="whitespace-nowrap px-7 py-4 text-right font-semibold text-white">{p.budget.india}</td></tr>
                  <tr><th scope="row" className="px-7 py-4 font-medium text-slate-300">Build, clients outside India</th><td className="whitespace-nowrap px-7 py-4 text-right font-semibold text-white">{p.budget.usd}</td></tr>
                </tbody>
              </table>
              <div className="space-y-3 p-7 text-sm leading-relaxed text-slate-300">
                <p><strong className="font-semibold text-white">Timeline. </strong>{p.budget.timeline}</p>
                <p><strong className="font-semibold text-white">Running cost. </strong>{p.budget.running}</p>
                <p className="text-xs text-slate-500">Indicative planning ranges for 2026. Every project receives its own fixed-price proposal after a first call. Source code and accounts belong to the client.</p>
                <Link to={contactTo} className="inline-flex items-center gap-2 pt-1 text-sm font-semibold text-sky-300 hover:text-sky-200">Request a fixed-price proposal <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <FaqList faqs={p.faqs} />

      <Section kicker="Related" title="Services behind this blueprint" className="py-10">
        <div className="mt-8 grid border-t border-white/10 md:grid-cols-3 md:gap-x-10">
          {p.links.map(([t, to]) => <LinkRow key={to} to={to} icon={p.icon} title={t} body="Scope, deliverables, cost and FAQs." />)}
        </div>
      </Section>

      <Section kicker="More blueprints" title="Other systems we have designed" className="pt-4">
        <div className="mt-10"><SolutionCards items={others} /></div>
        <p className="mt-8 text-sm text-slate-400">Looking for delivered work? <Link to="/case-studies" className="font-semibold text-sky-300 hover:text-sky-200">Read the case studies</Link> on our school ERP, jewellery software and website.</p>
      </Section>

      <CtaBand title="Planning a system like this?" sub="Tell us how the work is done today. We reply within one business day with questions, an approach and a fixed-price proposal where the scope allows." primary={["Request a proposal", contactTo]} whatsappText={waText} />
    </>
  );
}
