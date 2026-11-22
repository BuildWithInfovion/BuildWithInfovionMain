// The Cyvion product pages. A separate visual world from the agency site (see cyvion.css): the hero
// field acts out the product, one case builds itself as you scroll, and the ATT&CK map is drawn from
// the real rule pack. Content and structured data come from Data/cyvion.js.
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "./cyvion.css";
import "./cyvion-story.css";
import TriageField from "../../components/cyvion/TriageField";
import ScrollStory from "../../components/cyvion/ScrollStory";
import ConsoleReveal from "../../components/cyvion/ConsoleReveal";
import IntegrationRail from "../../components/cyvion/IntegrationRail";
import AudiencePicker from "../../components/cyvion/AudiencePicker";
import Coverage from "../../components/cyvion/Coverage";
import useSmoothScroll from "../../components/cyvion/useSmoothScroll";
import { CYVION, CYVION_PAGES, CYVION_SOURCES, CYVION_STATUS, cyvionPage } from "../../Data/cyvion";
import { SITE } from "../../Data/company";
import { ORG_ID, breadcrumbSchema, faqSchema } from "../../lib/seo";

const DEMO = "/contact?interest=cyvion";
const FONTS = "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap";
const STATE = { "Available now": "var(--ok)", "In validation": "var(--med)", Planned: "var(--faint)" };
const fmtDate = (d) => new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function Section({ id, title, lede, children, className = "" }) {
  return (
    <section id={id} className={`cy-sec scroll-mt-32 ${className}`}>
      <div className="cy-wrap">
        {title && <h2>{title}</h2>}
        {lede && <p className="cy-lede">{lede}</p>}
        {children}
      </div>
    </section>
  );
}

// the headline, word by word, for the entrance (the full text is still one h1 for search and screen readers)
function Headline({ text }) {
  return (
    <h1 aria-label={text}>
      {text.split(" ").map((w, i) => (
        <React.Fragment key={i}><span className="cy-h1w" aria-hidden="true"><span style={{ "--i": i }}>{w}</span></span>{" "}</React.Fragment>
      ))}
    </h1>
  );
}

export default function CyvionPage({ page }) {
  useSmoothScroll();
  const p = cyvionPage(page);
  const url = `${SITE}${p.path}`;
  const home = p.key === "home";
  const exposure = p.key === "exposure";
  const trail = home ? [["Cyvion", "/cyvion"]] : [["Cyvion", "/cyvion"], [p.nav, p.path]];
  const software = {
    "@context": "https://schema.org", "@type": "SoftwareApplication", "@id": `${SITE}/cyvion#software`,
    name: "Cyvion", alternateName: ["Cyvion by Infovion", "Vigil (former name)"], applicationCategory: "SecurityApplication",
    applicationSubCategory: "Security operations, alert triage and exposure management",
    operatingSystem: "Web browser; self-hosted on Linux", url: `${SITE}/cyvion`, description: cyvionPage("home").answer,
    featureList: cyvionPage("home").points.map(([t]) => t), publisher: { "@id": ORG_ID }, creator: { "@id": ORG_ID },
  };
  const webpage = {
    "@context": "https://schema.org", "@type": "WebPage", name: p.h1, headline: p.title, url, description: p.description,
    dateModified: CYVION.updated, lastReviewed: CYVION.updated, inLanguage: "en", about: { "@id": `${SITE}/cyvion#software` },
    author: { "@id": ORG_ID }, publisher: { "@id": ORG_ID },
    citation: p.sources.map((k) => ({ "@type": "CreativeWork", name: CYVION_SOURCES[k][0], url: CYVION_SOURCES[k][1] })),
  };

  return (
    <div className="cy" data-rv="off">
      <Helmet>
        <title>{p.title}</title>
        <meta name="description" content={p.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={p.title} />
        <meta property="og:description" content={p.description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${SITE}${p.img[0]}`} />
        <meta name="theme-color" content="#0A0F17" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTS} />
        <script type="application/ld+json">{JSON.stringify(software)}</script>
        <script type="application/ld+json">{JSON.stringify(webpage)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema(p.faqs))}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema(trail))}</script>
      </Helmet>

      {/* ---- hero: the field acts out the product ---- */}
      <header className="cy-hero" data-mode={exposure ? "exposure" : "triage"}>
        <TriageField mode={exposure ? "exposure" : "triage"} />
        <div className="cy-hero-veil" aria-hidden="true" />
        <div className="cy-wrap cy-hero-in">
          <div className="cy-hero-copy">
            <nav aria-label="Breadcrumb" className="cy-crumbs">
              <ol>
                <li><Link to="/">Infovion</Link></li>
                {trail.map(([name, path], i) => (
                  <li key={name}>/ {i < trail.length - 1 ? <Link to={path}>{name}</Link> : <span aria-current="page">{name}</span>}</li>
                ))}
              </ol>
            </nav>
            <Headline text={p.h1} />
            <p className="cy-hero-sub">{p.intro}</p>
            <div className="cy-hero-act">
              <Link className="cy-btn" to={DEMO}>Request a demo</Link>
              {CYVION.app
                ? <a className="cy-btn ghost" href={`${CYVION.app}/signup`}>Try the demo workspace</a>
                : <a className="cy-btn ghost" href="#status">What exists today</a>}
            </div>
            <p className="cy-hero-note">Early access. Built and run by Infovion Technologies, Pune.</p>
          </div>
        </div>
        {!exposure && <a className="cy-scrollcue" href="#story"><span>Scroll to watch an alert get worked</span><i /></a>}
        <p className="cy-hero-hint" aria-hidden="true">{exposure ? "Point at a host to see what the scan found" : "Point at any dot to see the event it stands for"}</p>
      </header>

      {/* ---- the answer, and who it is for ---- */}
      <Section id="overview">
        <div className="cy-intro">
          <div>
            <h2>{p.answerQ}</h2>
            <p className="answer">{p.answer}</p>
            <p className="cy-small" style={{ marginTop: 16 }}>Updated {fmtDate(CYVION.updated)}.</p>
          </div>
          <AudiencePicker />
        </div>
      </Section>

      {/* ---- how it works: pinned, scroll-scrubbed story ---- */}
      {!exposure && <div id="story"><ScrollStory /></div>}

      {/* ---- what the team sees ---- */}
      <Section id="console" title="What your team sees every morning"
        lede="Cases that need a decision at the top, everything else already closed with its reasons. This is the console's overview on the demonstration tenant.">
        <ConsoleReveal />
      </Section>

      <Section id="what" title={p.pointsTitle}>
        <dl className="cy-spec">
          {p.points.map(([t, b]) => <div key={t}><dt>{t}</dt><dd>{b}</dd></div>)}
        </dl>
      </Section>

      {/* ---- integrations: pinned horizontal rail ---- */}
      <section id="integrations" className="cy-rail-sec">
        <IntegrationRail title="Works with the tools you already run"
          lede="Keep your SIEM and EDR. Cyvion takes their alerts, plus raw activity from identity, cloud, code and endpoints, and triages all of it the same way." />
      </section>

      {p.flow && exposure && (
        <Section id="how" title={p.flowTitle}>
          <ol className="cy-pipe">{p.flow.map(([t, b]) => <li key={t}><b>{t}</b><span>{b}</span></li>)}</ol>
        </Section>
      )}

      {!exposure && (
        <Section id="coverage" title="What the rules detect"
          lede="Cyvion's own detections, mapped to MITRE ATT&CK. Alerts from your SIEM and EDR are triaged on top of these, whatever they detect.">
          <Coverage />
        </Section>
      )}

      {p.table && (
        <Section id="table" title={p.table.title} lede={p.table.sub}>
          <div className="cy-table">
            <table>
              <caption className="sr-only">{p.table.title}</caption>
              <thead><tr>{p.table.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
              <tbody>{p.table.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </Section>
      )}

      {p.guards && (
        <Section id="limits" title={p.guardsTitle}>
          <ul className="cy-limits">{p.guards.map((x) => <li key={x}>{x}</li>)}</ul>
        </Section>
      )}

      <Section id="status" title={home ? "What exists today" : "Where the product stands"}
        lede={home
          ? "Cyvion is in early access. Each part is listed in the state the product's own engineering notes give it, so you can check our claims before a call."
          : "Cyvion is in early access, with no certifications yet. Detection, triage, approvals, exposure scanning, agents and single sign-on are built and tested; the native connectors and the language-model analyst are being validated on live data."}>
        {home ? (
          <div className="cy-status">
            {CYVION_STATUS.map(([name, meaning, items]) => (
              <div key={name} style={{ "--state": STATE[name] || "var(--faint)" }}>
                <h3>{name}</h3>
                <p className="meaning">{meaning}</p>
                <ul>{items.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="cy-small" style={{ marginTop: 16 }}><Link to="/cyvion#status" style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>See the full status table</Link></p>
        )}
      </Section>

      {home && (
        <Section id="deploy" title="Two ways to run it">
          <div className="cy-deploy">
            <div>
              <h3>Inside your network</h3>
              <p>Installed on your own Linux server. Events, cases and reports stay in your environment, and internal ranges can be scanned. The choice for banks and for anyone with data residency rules.</p>
            </div>
            <div>
              <h3>Hosted by Infovion</h3>
              <p>A hosted console for evaluation and for teams without servers to spare. External scans and alert triage only; private address ranges are never scanned from a hosted instance.</p>
            </div>
          </div>
          <p className="cy-small" style={{ marginTop: 24 }}>Commercial terms are agreed with each organisation during early access.</p>
        </Section>
      )}

      <Section id="faq" title="Questions buyers ask">
        <div className="cy-faq">
          {p.faqs.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary><h3>{q}</h3><span aria-hidden="true">+</span></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section id="more" title="More on Cyvion">
        <div className="cy-more">
          {CYVION_PAGES.filter((x) => x.key !== p.key).map((x) => (
            <Link key={x.key} to={x.path}><b>{x.key === "home" ? "Cyvion overview" : x.nav}</b><span>{x.description}</span></Link>
          ))}
          <Link to="/blog/cert-in-6-hour-incident-reporting-rule"><b>Guide: the CERT-In 6-hour rule</b><span>What must be reported, how, and a readiness checklist.</span></Link>
          <Link to="/blog/what-is-an-ai-soc-analyst"><b>Guide: what is an AI SOC analyst?</b><span>How automated alert triage works and seven questions to ask a vendor.</span></Link>
          <Link to="/services/application-security"><b>Application security services</b><span>Security review and fixes for web and mobile applications, by the team that builds Cyvion.</span></Link>
        </div>
        <p className="cy-sources">
          Sources:{" "}
          {p.sources.map((k, i) => (
            <React.Fragment key={k}>{i > 0 && ", "}<a href={CYVION_SOURCES[k][1]} target="_blank" rel="noopener noreferrer">{CYVION_SOURCES[k][0]}</a></React.Fragment>
          ))}
        </p>
      </Section>

      <section className="cy-cta">
        <div className="cy-wrap">
          <h2>See Cyvion work on your own alerts</h2>
          <p>Tell us which SIEM and EDR you run and roughly how many alerts a day. We reply within one business day and arrange a demonstration on your use cases.</p>
          <div className="cy-hero-act">
            <Link className="cy-btn" to={DEMO}>Request a demo</Link>
            {CYVION.app && <a className="cy-btn ghost" href={`${CYVION.app}/signup`}>Try the demo workspace</a>}
          </div>
        </div>
      </section>
    </div>
  );
}
