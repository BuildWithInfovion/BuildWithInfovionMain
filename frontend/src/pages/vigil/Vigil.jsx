import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { GhostButton, GlowButton } from "../../components/fx/Fx";
import { CtaBand, LinkRow, PageHero } from "../../components/site/Ui";
import { Block, SideNav } from "../company/Services";
import { VIGIL, VIGIL_PAGES, VIGIL_SOURCES, VIGIL_STATUS, vigilPage } from "../../Data/vigil";
import { SITE } from "../../Data/company";
import { ORG_ID, faqSchema } from "../../lib/seo";

const DEMO = "/contact?interest=vigil";
const fmtDate = (d) => new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function Status() {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 lg:grid-cols-3">
      {VIGIL_STATUS.map(([name, meaning, items]) => (
        <div key={name} className="bg-[#080a0f] p-6">
          <h3 className="font-display text-lg text-white">{name}</h3>
          <p className="mt-1 text-sm text-slate-400">{meaning}</p>
          <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-slate-300">{items.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}

export default function VigilPage({ page }) {
  const p = vigilPage(page);
  const url = `${SITE}${p.path}`;
  const home = p.key === "home";
  const nav = [
    ["overview", "Overview"], ["what", p.pointsTitle],
    ...(p.flow ? [["how", p.flowTitle]] : []),
    ...(p.table ? [["table", home ? "Comparison" : p.key === "banks" ? "Obligations" : p.key === "exposure" ? "CTEM stages" : "Vendor questions"]] : []),
    ...(p.guards ? [["limits", "Limits"]] : []),
    ["status", home ? "What exists today" : "Status"],
    ...(home ? [["deploy", "Deployment"]] : []),
    ["faq", "Questions"], ["more", "More on Vigil"],
  ];
  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE}/vigil#software`,
    name: "Vigil",
    alternateName: "Vigil by Infovion",
    applicationCategory: "SecurityApplication",
    applicationSubCategory: "Security operations, alert triage and exposure management",
    operatingSystem: "Web browser; self-hosted on Linux",
    url: `${SITE}/vigil`,
    description: vigilPage("home").answer,
    featureList: vigilPage("home").points.map(([t]) => t),
    publisher: { "@id": ORG_ID },
    creator: { "@id": ORG_ID },
  };
  const webpage = {
    "@context": "https://schema.org", "@type": "WebPage", name: p.h1, headline: p.title, url, description: p.description,
    dateModified: VIGIL.updated, lastReviewed: VIGIL.updated, inLanguage: "en", about: { "@id": `${SITE}/vigil#software` },
    author: { "@id": ORG_ID }, publisher: { "@id": ORG_ID },
    citation: p.sources.map((k) => ({ "@type": "CreativeWork", name: VIGIL_SOURCES[k][0], url: VIGIL_SOURCES[k][1] })),
  };

  return (
    <>
      <Helmet>
        <title>{p.title}</title>
        <meta name="description" content={p.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={p.title} />
        <meta property="og:description" content={p.description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${SITE}${p.img[0]}`} />
        <script type="application/ld+json">{JSON.stringify(software)}</script>
        <script type="application/ld+json">{JSON.stringify(webpage)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema(p.faqs))}</script>
      </Helmet>

      <PageHero trail={home ? [["Vigil", "/vigil"]] : [["Vigil", "/vigil"], [p.nav, p.path]]} kicker="Vigil, in early access" title={p.h1} sub={p.intro}>
        <GlowButton to={DEMO}>Request a demo</GlowButton>
        {VIGIL.app
          ? <GhostButton href={VIGIL.app}>Open the console</GhostButton>
          : <GhostButton to={home ? "#status" : "/vigil#status"}>What exists today</GhostButton>}
      </PageHero>

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <figure className="overflow-hidden rounded-xl border border-white/10 shadow-[0_60px_140px_-60px_rgba(56,182,255,0.5)]">
          <img src={p.img[0]} srcSet={`${p.img[1]} 900w, ${p.img[0]} 1800w`} sizes="(min-width: 1152px) 1104px, 92vw" alt={p.img[2]} width="1800" height="1125" fetchpriority="high" decoding="async" className="block w-full" />
        </figure>
        <p className="mt-3 text-sm text-slate-400">The Vigil console with its demonstration tenant. Names and addresses are sample data.</p>
      </div>

      <div className="mx-auto mt-16 max-w-6xl gap-16 px-5 sm:px-6 lg:flex">
        <SideNav items={nav} contactTo={DEMO} cta="Request a demo" />

        <div className="min-w-0 flex-1 space-y-20">
          <Block id="overview" title={p.answerQ}>
            <p className="max-w-3xl text-lg leading-relaxed text-slate-200">{p.answer}</p>
            <p className="mt-5 text-sm text-slate-400">Updated {fmtDate(VIGIL.updated)} by Infovion Technologies, Pune.</p>
          </Block>

          <Block id="what" title={p.pointsTitle}>
            <dl className="border-t border-white/10">
              {p.points.map(([t, b]) => (
                <div key={t} className="grid gap-2 border-b border-white/10 py-5 sm:grid-cols-[15rem_1fr] sm:gap-8">
                  <dt className="font-display text-[17px] text-white">{t}</dt>
                  <dd className="text-[15px] leading-relaxed text-slate-400">{b}</dd>
                </div>
              ))}
            </dl>
          </Block>

          {p.flow && (
            <Block id="how" title={p.flowTitle}>
              <ol className="border-t border-white/10">
                {p.flow.map(([t, b], i) => (
                  <li key={t} className="grid gap-2 border-b border-white/10 py-4 sm:grid-cols-[2.5rem_9rem_1fr] sm:gap-6">
                    <span aria-hidden="true" className="font-mono text-sm text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-[17px] text-white">{t}</span>
                    <span className="text-[15px] leading-relaxed text-slate-400">{b}</span>
                  </li>
                ))}
              </ol>
            </Block>
          )}

          {p.table && (
            <Block id="table" title={p.table.title}>
              <p className="max-w-3xl text-[15px] leading-relaxed text-slate-400">{p.table.sub}</p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[34rem] text-left">
                  <caption className="sr-only">{p.table.title}</caption>
                  <thead><tr className="border-b border-white/15 text-sm text-slate-400">{p.table.head.map((h) => <th key={h} scope="col" className="py-3 pr-6 font-medium">{h}</th>)}</tr></thead>
                  <tbody>
                    {p.table.rows.map((r) => (
                      <tr key={r[0]} className="border-b border-white/10 align-top">
                        {r.map((c, i) => <td key={i} className={`py-4 pr-6 text-[15px] leading-relaxed ${i === 0 ? "text-white" : "text-slate-300"}`}>{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Block>
          )}

          {p.guards && (
            <Block id="limits" title={p.guardsTitle}>
              <ul className="max-w-3xl border-t border-white/10">{p.guards.map((x) => <li key={x} className="border-b border-white/10 py-3.5 text-[15px] leading-relaxed text-slate-300">{x}</li>)}</ul>
            </Block>
          )}

          <Block id="status" title={home ? "What exists today" : "Where the product stands"}>
            {home ? (
              <>
                <p className="mb-7 max-w-3xl text-[15px] leading-relaxed text-slate-400">Vigil is in early access. This is the state of each part, kept in step with the product's own engineering notes, so you can check our claims before a call.</p>
                <Status />
              </>
            ) : (
              <p className="max-w-3xl text-base leading-relaxed text-slate-300">
                Vigil is in early access, with no certifications yet. The playbook engine, detection pipeline and exposure scanning are built and tested; the language-model analyst and some connectors are still being validated.{" "}
                <Link to="/vigil#status" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">See the full status table</Link>.
              </p>
            )}
          </Block>

          {home && (
            <Block id="deploy" title="Two ways to run it">
              <div className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-2">
                <div className="bg-[#080a0f] p-7">
                  <h3 className="font-display text-lg text-white">Inside your network</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-400">Installed on your own servers. Events, cases and reports stay in your environment, and internal ranges can be scanned. The choice for banks and for anyone with data residency rules.</p>
                </div>
                <div className="bg-[#080a0f] p-7">
                  <h3 className="font-display text-lg text-white">Hosted by Infovion</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-400">A hosted console for evaluation and for teams without servers to spare. External scans and alert triage only; private address ranges are never scanned from a hosted instance.</p>
                </div>
              </div>
              <p className="mt-5 text-[15px] text-slate-400">Commercial terms are agreed with each organisation during early access.</p>
            </Block>
          )}

          <Block id="faq" title="Questions buyers ask">
            <div className="border-t border-white/10">
              {p.faqs.map(([q, a], i) => (
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

          <Block id="more" title="More on Vigil">
            <div className="border-t border-white/10">
              {VIGIL_PAGES.filter((x) => x.key !== p.key).map((x) => <LinkRow key={x.key} to={x.path} title={x.key === "home" ? "Vigil overview" : x.nav} body={x.description} />)}
              <LinkRow to="/blog/cert-in-6-hour-incident-reporting-rule" title="Guide: the CERT-In 6-hour rule" body="What must be reported, how, and a readiness checklist." />
              <LinkRow to="/blog/what-is-an-ai-soc-analyst" title="Guide: what is an AI SOC analyst?" body="How automated alert triage works and seven questions to ask a vendor." />
              <LinkRow to="/services/application-security" title="Application security services" body="Security review and fixes for web and mobile applications, by the team that builds Vigil." />
            </div>
            <p className="mt-6 text-sm text-slate-400">
              Sources:{" "}
              {p.sources.map((k, i) => (
                <React.Fragment key={k}>{i > 0 && ", "}<a href={VIGIL_SOURCES[k][1]} target="_blank" rel="noopener noreferrer" className="underline decoration-white/25 underline-offset-4 hover:text-slate-200">{VIGIL_SOURCES[k][0]}</a></React.Fragment>
              ))}
            </p>
          </Block>
        </div>
      </div>

      <div className="mt-20" />
      <CtaBand title="See Vigil work on your own alerts" sub="Tell us which SIEM and EDR you run and roughly how many alerts a day. We reply within one business day and arrange a demonstration." primary={["Request a demo", DEMO]} whatsappText="Hello Infovion, I would like a demonstration of Vigil." />
    </>
  );
}
