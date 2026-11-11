import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Copy, MessageCircle } from "lucide-react";
import { CtaBand, FaqList, LinkRow, PageHero, Section } from "../../components/site/Ui";
import { SITE, wa } from "../../Data/company";
import { track } from "../../lib/analytics";

// Free planning calculators for people buying software: app cost, software cost, the cost of a
// developer in India against hiring at home, and the payback of an automation.
// The rupee figures follow the ranges published on the service pages (Data/services.js); keep the
// two in step. Results are planning ranges, not quotes, and every page says so.

const UPDATED = "2026-11-11";
const field = "w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-sky-300/60 focus:bg-white/[0.06]";
const num = (v) => Math.max(0, Number(String(v).replace(/,/g, "")) || 0);
const opt = "bg-slate-900";

// Approximate planning rates, rupees per unit. The dirham is pegged to the US dollar.
const CUR = {
  INR: { label: "₹ Indian rupee", per: 1 },
  USD: { label: "$ US dollar", per: 88, sym: "$" },
  AED: { label: "AED UAE dirham", per: 24, sym: "AED " },
  GBP: { label: "£ Pound sterling", per: 116, sym: "£" },
};
const inr = (v) => v >= 1e7 ? `₹${(v / 1e7).toFixed(2).replace(/\.?0+$/, "")} crore` : v >= 1e5 ? `₹${(v / 1e5).toFixed(1).replace(/\.0$/, "")} lakh` : `₹${Math.round(v).toLocaleString("en-IN")}`;
const money = (cur, rupees) => {
  if (cur === "INR") return inr(Math.round(rupees / 5000) * 5000);
  const v = rupees / CUR[cur].per;
  return `${CUR[cur].sym}${(Math.round(v / 50) * 50).toLocaleString("en-US")}`;
};
const range = (cur, total) => `${money(cur, total * 0.85)} – ${money(cur, total * 1.25)}`;
const weeks = (total) => { const w = Math.max(3, Math.round(total / 65000)); return `${w} – ${w + Math.max(2, Math.ceil(w * 0.3))} weeks`; };

function Head({ path, title, description, name }) {
  const schema = {
    "@context": "https://schema.org", "@type": "WebApplication", name, url: `${SITE}${path}`, description,
    applicationCategory: "BusinessApplication", operatingSystem: "Any web browser", isAccessibleForFree: true, dateModified: UPDATED, inLanguage: "en-IN",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" }, publisher: { "@id": `${SITE}/#organization` },
  };
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${SITE}${path}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${SITE}${path}`} />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-slate-400">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] leading-snug text-slate-400">{hint}</span>}
    </label>
  );
}

function Group({ title, children }) {
  return (
    <fieldset className="space-y-3">
      <legend className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">{title}</legend>
      {children}
    </fieldset>
  );
}

function Select({ value, onChange, options }) {
  return <select className={field} value={value} onChange={onChange}>{options.map(([v, l]) => <option key={v} value={v} className={opt}>{l}</option>)}</select>;
}

function Checks({ options, value, toggle, price }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map(([k, label, cost]) => (
        <label key={k} className={`flex cursor-pointer items-start gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition ${value.includes(k) ? "border-sky-300/50 bg-sky-300/[0.07] text-white" : "border-white/10 text-slate-300 hover:border-white/25"}`}>
          <input type="checkbox" className="mt-0.5 h-4 w-4 flex-shrink-0 accent-sky-300" checked={value.includes(k)} onChange={() => toggle(k)} />
          <span className="flex-1 leading-snug">{label}<span className="block text-[11px] text-slate-400">+ {price(cost)}</span></span>
        </label>
      ))}
    </div>
  );
}

/** The estimate: headline range, the lines behind it, and ways to send it on. */
function Estimate({ tool, headline, big, sub, rows, shareTitle, contactTo, note }) {
  const [copied, setCopied] = useState(false);
  const text = [shareTitle, ...rows.map(([a, v]) => `${a}: ${v}`), `${headline}: ${big}`, sub, "", `Worked out at ${SITE}${tool}`].filter((x) => x !== undefined).join("\n");
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard blocked */ }
    track("calculator_copy", { tool });
  };
  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      <div className="panel overflow-hidden rounded-xl">
        <div className="border-b border-white/10 bg-white/[0.03] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{headline}</p>
          <p className="mt-2 font-display text-[1.7rem] font-bold leading-tight text-sky-200 sm:text-4xl" aria-live="polite">{big}</p>
          {sub && <p className="mt-2 text-sm text-slate-300">{sub}</p>}
        </div>
        <table className="w-full text-left text-sm">
          <caption className="sr-only">How the estimate is made up</caption>
          <tbody className="divide-y divide-white/10">
            {rows.map(([a, v]) => (
              <tr key={a}><th scope="row" className="px-6 py-3 font-medium text-slate-300">{a}</th><td className="whitespace-nowrap px-6 py-3 text-right font-semibold text-white">{v}</td></tr>
            ))}
          </tbody>
        </table>
        <div className="space-y-2 border-t border-white/10 p-4">
          <a href={wa(`Hello Infovion, I used your calculator and would like an exact quote.\n\n${text}`)} target="_blank" rel="noopener noreferrer" onClick={() => track("calculator_lead", { tool })}
            className="flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-sky-100">
            <MessageCircle className="h-4 w-4" /> Get an exact quote on WhatsApp
          </a>
          <div className="grid grid-cols-2 gap-2">
            <Link to={contactTo} className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/5">Email a brief <ArrowRight className="h-4 w-4" /></Link>
            <button type="button" onClick={copy} className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/5"><Copy className="h-4 w-4" /> {copied ? "Copied" : "Copy"}</button>
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-slate-400">{note ?? "A planning range from Infovion's 2026 prices, not a quote. A written fixed price follows a first call, usually within two business days."}</p>
    </div>
  );
}

function Explainer({ title, children }) {
  return (
    <Section title={title} className="pt-4">
      <div className="mt-6 max-w-3xl space-y-4 text-[15px] leading-relaxed text-slate-300">{children}</div>
      <p className="mt-5 text-xs text-slate-400">Updated {new Date(`${UPDATED}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })} by Infovion Technologies, a software development company in Pune, India.</p>
    </Section>
  );
}

function RangeTable({ caption, head, rows }) {
  return (
    <Section className="pt-0">
      <div className="panel max-w-3xl overflow-hidden rounded-xl">
        <table className="w-full text-left text-sm">
          <caption className="border-b border-white/10 px-5 py-3 text-left font-display text-base font-semibold text-white">{caption}</caption>
          <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-400"><tr>{head.map((h) => <th key={h} scope="col" className="px-5 py-3 font-semibold">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i} className={`px-5 py-3.5 ${i === 0 ? "text-slate-200" : "font-semibold text-white"}`}>{c}</td>)}</tr>)}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

const SOFTWARE_TOOLS = [
  ["/app-development-cost-calculator", "App development cost calculator", "Android, iOS or PWA: pick the features, get a budget range and timeline."],
  ["/software-development-cost-calculator", "Software development cost calculator", "Website, web app, CRM, ERP or SaaS: cost by modules, roles and integrations."],
  ["/hire-developers-india-cost-calculator", "Hire developers in India: cost calculator", "A dedicated developer in India against hiring in the US, UK, UAE or Australia."],
  ["/ai-automation-roi-calculator", "AI automation ROI calculator", "Hours saved, monthly saving and payback period for an automation."],
];

function MoreTools({ current }) {
  return (
    <Section kicker="More free tools" title="Other planning calculators" className="py-10">
      <div className="mt-8 grid border-t border-white/10 md:grid-cols-2 md:gap-x-10">
        {SOFTWARE_TOOLS.filter(([to]) => to !== current).map(([to, t, b]) => <LinkRow key={to} to={to} title={t} body={b} />)}
        <LinkRow to="/free-tools" title="All free tools" body="Calculators and formats for software buyers, jewellers and schools." />
      </div>
    </Section>
  );
}

const useToggle = (initial) => {
  const [list, setList] = useState(initial);
  return [list, (k) => setList((l) => (l.includes(k) ? l.filter((x) => x !== k) : [...l, k]))];
};

// ── App development cost ─────────────────────────────────────────────────────

const PLATFORMS = {
  pwa: ["Progressive web app (installs from a link)", 120000, 5000],
  android: ["Android app", 220000, 5500],
  both: ["Android and iOS, one codebase (React Native)", 280000, 6000],
  native: ["Android and iOS, separate native apps", 520000, 11000],
};
const APP_FEATURES = [
  ["login", "Sign-in, OTP and user profiles", 30000],
  ["payments", "Online payments (UPI, cards)", 45000],
  ["push", "Push notifications", 20000],
  ["admin", "Admin panel on the web", 80000],
  ["booking", "Booking or scheduling", 60000],
  ["catalogue", "Product catalogue, cart and orders", 90000],
  ["chat", "In-app chat", 80000],
  ["maps", "Maps and live GPS tracking", 70000],
  ["offline", "Offline use with sync", 90000],
  ["ai", "AI feature (assistant, search, document reading)", 120000],
  ["lang", "Second language (Hindi, Arabic and others)", 35000],
  ["video", "Video or audio calls", 110000],
];
const DESIGN = { standard: ["Clean standard design", 0], custom: ["Custom brand design", 0.15], premium: ["Premium design with animation", 0.3] };

function AppCalculator({ path }) {
  const [cur, setCur] = useState("INR");
  const [platform, setPlatform] = useState("both");
  const [screens, setScreens] = useState("20");
  const [design, setDesign] = useState("custom");
  const [integrations, setIntegrations] = useState("1");
  const [features, toggle] = useToggle(["login", "push", "admin"]);

  const [pName, base, perScreen] = PLATFORMS[platform];
  const screenCost = num(screens) * perScreen;
  const featureCost = APP_FEATURES.filter(([k]) => features.includes(k)).reduce((s, [, , c]) => s + c, 0);
  const integCost = num(integrations) * 40000;
  const subtotal = base + screenCost + featureCost + integCost;
  const designCost = subtotal * DESIGN[design][1];
  const total = subtotal + designCost;
  const m = (v) => money(cur, v);

  return (
    <Section className="pt-0">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
        <form className="panel space-y-6 rounded-xl p-6 sm:p-7" onSubmit={(e) => e.preventDefault()}>
          <Group title="The app">
            <Field label="Platform"><Select value={platform} onChange={(e) => setPlatform(e.target.value)} options={Object.entries(PLATFORMS).map(([k, [l]]) => [k, l])} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Number of screens" hint="A simple app has 10 to 15; a marketplace 40 or more."><input className={field} inputMode="numeric" value={screens} onChange={(e) => setScreens(e.target.value)} /></Field>
              <Field label="Design"><Select value={design} onChange={(e) => setDesign(e.target.value)} options={Object.entries(DESIGN).map(([k, [l]]) => [k, l])} /></Field>
              <Field label="Third-party integrations" hint="CRM, ERP, SMS, WhatsApp, courier and similar."><input className={field} inputMode="numeric" value={integrations} onChange={(e) => setIntegrations(e.target.value)} /></Field>
              <Field label="Show the estimate in"><Select value={cur} onChange={(e) => setCur(e.target.value)} options={Object.entries(CUR).map(([k, c]) => [k, c.label])} /></Field>
            </div>
          </Group>
          <Group title="Features">
            <Checks options={APP_FEATURES} value={features} toggle={toggle} price={m} />
          </Group>
        </form>
        <Estimate tool={path} headline="Estimated app development cost" big={range(cur, total)} sub={`Timeline: about ${weeks(total)} to a first release`} contactTo="/contact?service=mobile-app-development"
          shareTitle="App development estimate (Infovion Technologies)"
          rows={[
            [pName.split(" (")[0].split(",")[0], m(base)],
            [`${num(screens)} screens`, m(screenCost)],
            [`${features.length} feature${features.length === 1 ? "" : "s"}`, m(featureCost)],
            [`${num(integrations)} integration${num(integrations) === 1 ? "" : "s"}`, m(integCost)],
            [DESIGN[design][0], designCost ? m(designCost) : "Included"],
            ["Testing, store publishing, 30 days of support", "Included"],
          ]} />
      </div>
    </Section>
  );
}

const APP_FAQ = [
  ["How much does it cost to develop an app in India in 2026?", "With Infovion Technologies, an installable progressive web app typically costs ₹1.5 lakh to ₹5 lakh, a first release for Android and iOS from one codebase ₹4 lakh to ₹12 lakh, and a full-featured app with an admin panel and integrations ₹12 lakh and above. The calculator above adds up platform, screens, features, integrations and design to give a range for your own app."],
  ["What decides the cost of a mobile app?", "Five things: the platform (a PWA, one codebase for Android and iOS, or two native apps), the number of screens and user types, features such as payments, chat, maps and offline use, integrations with other systems, and the level of design. The backend and admin panel are often half the work."],
  ["Is it cheaper to build one app for Android and iOS together?", "Yes. A cross-platform app built with a framework such as React Native shares most of its code between Android and iOS, so it costs noticeably less to build and maintain than two separate native apps. Native apps are worth the extra cost for heavy graphics or deep device features."],
  ["How long does it take to build an app?", "A first release usually takes six to ten weeks, and a full application three to five months. The calculator estimates a timeline from the size of the build. Work is delivered every two weeks, so you can test early."],
  ["How much does an app cost to maintain each year?", "Plan for 15 to 25 percent of the build cost a year for an annual maintenance contract: operating system updates, store policy changes, security patches, fixes and small improvements. Hosting and third-party services are billed at cost."],
  ["Do you quote in dollars for clients outside India?", "Yes. Clients outside India are invoiced in USD with no Indian GST, since the work is an export of services. Choose USD, AED or GBP in the calculator to see the same estimate at an approximate exchange rate."],
  ["Is the estimate a fixed price?", "No. It is a planning range. After a first call we send a written scope and a fixed price, usually within two business days."],
];

export function AppCostCalculatorPage() {
  const path = "/app-development-cost-calculator";
  return (
    <>
      <Head path={path} name="App development cost calculator"
        title="App Development Cost Calculator India (2026) | Infovion"
        description="Free app development cost calculator: choose Android, iOS or PWA, screens and features, and get a budget range in INR, USD, AED or GBP with a timeline." />
      <PageHero trail={[["Free tools", "/free-tools"], ["App cost calculator", path]]} kicker="Free tool"
        title="App development cost calculator"
        sub="How much will your app cost to build in India? Choose the platform, the number of screens and the features you need. The estimate updates as you go, in rupees, dollars, dirhams or pounds, with a timeline." />
      <AppCalculator path={path} />
      <Explainer title="How app development cost is calculated">
        <p className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-white"><strong>App cost = platform base + screens + features + integrations + design.</strong> Testing, publishing to the stores and thirty days of support are included in every Infovion project.</p>
        <p><strong className="text-white">Platform.</strong> A progressive web app installs from a link and is the least expensive. One codebase for Android and iOS (React Native) covers both stores. Two separate native apps cost the most and suit graphics-heavy or hardware-heavy products.</p>
        <p><strong className="text-white">Screens and user types.</strong> Each screen is designed, built, connected to the server and tested. An app with customers, staff and administrators has three sets of screens.</p>
        <p><strong className="text-white">Features.</strong> Sign-in, payments and notifications are small. Chat, live tracking, offline sync, calls and AI features are larger, because most of their work is on the server.</p>
        <p><strong className="text-white">What the estimate leaves out.</strong> Google Play and Apple developer accounts (in your name), hosting, SMS and WhatsApp charges, and maintenance after the first thirty days.</p>
      </Explainer>
      <RangeTable caption="Typical app development budgets in India, 2026" head={["Type of app", "Typical budget", "Timeline"]} rows={[
        ["Progressive web app", "₹1.5 – 5 lakh", "4 – 8 weeks"],
        ["Android and iOS first release (MVP)", "₹4 – 12 lakh", "6 – 10 weeks"],
        ["Full app with admin panel and integrations", "₹12 lakh and above", "3 – 5 months"],
        ["Annual maintenance (AMC)", "15 – 25% of build cost a year", "Ongoing"],
      ]} />
      <FaqList faqs={APP_FAQ} />
      <MoreTools current={path} />
      <CtaBand title="Want a fixed price for your app?" primary={["Request a proposal", "/contact?service=mobile-app-development"]} whatsappText="Hello Infovion, I would like a quote for a mobile app." />
    </>
  );
}

// ── Software development cost ────────────────────────────────────────────────

const KINDS = {
  website: ["Business website", 30000, 3000, "pages"],
  webapp: ["Web application or internal tool", 120000, 40000, "modules"],
  crm: ["CRM or lead management", 150000, 40000, "modules"],
  erp: ["ERP (inventory, sales, purchase, accounts)", 350000, 55000, "modules"],
  saas: ["SaaS product (multi-tenant MVP)", 500000, 55000, "modules"],
  store: ["Custom online store or B2B portal", 250000, 40000, "modules"],
  ai: ["AI assistant or automation", 120000, 45000, "workflows"],
};
const MIGRATION = { none: ["No existing data", 0], sheets: ["From spreadsheets", 30000], system: ["From an existing system", 90000] };
const MOBILE = { none: ["No mobile app", 0], pwa: ["Installable PWA", 120000], both: ["Android and iOS apps", 350000] };
const REPORTS = { basic: ["Standard reports", 0], dash: ["Management dashboards", 60000], mis: ["Advanced MIS and scheduled reports", 150000] };

function SoftwareCalculator({ path }) {
  const [v, setV] = useState({ cur: "INR", kind: "erp", units: "5", roles: "4", integrations: "2", migration: "sheets", mobile: "none", reports: "dash" });
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));
  const [kName, base, perUnit, unitName] = KINDS[v.kind];
  const unitCost = num(v.units) * perUnit;
  const roleCost = v.kind === "website" ? 0 : Math.max(0, num(v.roles) - 2) * 25000;
  const integCost = num(v.integrations) * 40000;
  const total = base + unitCost + roleCost + integCost + MIGRATION[v.migration][1] + MOBILE[v.mobile][1] + REPORTS[v.reports][1];
  const m = (x) => money(v.cur, x);
  const pick = (map) => Object.entries(map).map(([k, [l]]) => [k, l]);

  return (
    <Section className="pt-0">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
        <form className="panel space-y-6 rounded-xl p-6 sm:p-7" onSubmit={(e) => e.preventDefault()}>
          <Group title="What you are building">
            <Field label="Type of software"><Select value={v.kind} onChange={set("kind")} options={pick(KINDS)} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label={`Number of ${unitName}`} hint={unitName === "modules" ? "For example: sales, purchase, stock, accounts, HR." : unitName === "pages" ? "Home, about, services, contact and so on." : "Each task automated end to end."}><input className={field} inputMode="numeric" value={v.units} onChange={set("units")} /></Field>
              <Field label="User roles" hint="Owner, manager, staff, customer…"><input className={field} inputMode="numeric" value={v.roles} onChange={set("roles")} disabled={v.kind === "website"} /></Field>
            </div>
          </Group>
          <Group title="Around it">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Integrations" hint="Payments, GST e-invoice, Tally, WhatsApp, SMS."><input className={field} inputMode="numeric" value={v.integrations} onChange={set("integrations")} /></Field>
              <Field label="Data migration"><Select value={v.migration} onChange={set("migration")} options={pick(MIGRATION)} /></Field>
              <Field label="Mobile app"><Select value={v.mobile} onChange={set("mobile")} options={pick(MOBILE)} /></Field>
              <Field label="Reporting"><Select value={v.reports} onChange={set("reports")} options={pick(REPORTS)} /></Field>
            </div>
            <Field label="Show the estimate in"><Select value={v.cur} onChange={set("cur")} options={Object.entries(CUR).map(([k, c]) => [k, c.label])} /></Field>
          </Group>
        </form>
        <Estimate tool={path} headline="Estimated software development cost" big={range(v.cur, total)} sub={`Timeline: about ${weeks(total)}, delivered every two weeks`} contactTo="/contact?service=custom-software-development"
          shareTitle="Software development estimate (Infovion Technologies)"
          rows={[
            [kName.split(" (")[0], m(base)],
            [`${num(v.units)} ${unitName}`, m(unitCost)],
            [`${num(v.roles)} user roles`, roleCost ? m(roleCost) : "Included"],
            [`${num(v.integrations)} integration${num(v.integrations) === 1 ? "" : "s"}`, m(integCost)],
            [MIGRATION[v.migration][0], MIGRATION[v.migration][1] ? m(MIGRATION[v.migration][1]) : "—"],
            [MOBILE[v.mobile][0], MOBILE[v.mobile][1] ? m(MOBILE[v.mobile][1]) : "—"],
            [REPORTS[v.reports][0], REPORTS[v.reports][1] ? m(REPORTS[v.reports][1]) : "Included"],
            ["Source code, training, 30 days of support", "Included"],
          ]} />
      </div>
    </Section>
  );
}

const SOFTWARE_FAQ = [
  ["How much does custom software development cost in India?", "With Infovion Technologies, a single internal tool or module typically costs ₹1.5 lakh to ₹4 lakh, a business system with four to eight modules ₹4 lakh to ₹15 lakh, and a multi-role platform with portals and integrations ₹15 lakh and above. A five-page business website starts at about ₹25,000. The calculator above gives a range for your own scope."],
  ["How much does ERP software development cost?", "A custom ERP covering three to six departments typically costs ₹5 lakh to ₹20 lakh in India, and a multi-branch ERP with integrations ₹20 lakh and above. Cost follows the number of modules, user roles, branches, integrations such as GST e-invoicing and Tally, and the data to be migrated."],
  ["How much does CRM software development cost in India?", "A focused CRM or lead management system typically costs ₹1.5 lakh to ₹5 lakh, depending on lead sources, pipeline stages, automation such as WhatsApp follow-ups, and reporting. There is no per-user licence on custom software."],
  ["What is the hourly rate for software development in India?", "Infovion charges about ₹800 to ₹2,000 an hour for clients in India and about $12 to $25 an hour for clients abroad. Most projects are fixed-price by milestone, so the hourly rate matters mainly for small changes and support."],
  ["Why do quotes for the same software differ so much?", "Because they often price different things. Check whether each quote includes design, testing, data migration, deployment, source code ownership, documentation and support after launch. A written scope with acceptance criteria makes quotes comparable."],
  ["Is custom software cheaper than a subscription product?", "A product is cheaper when your process is standard. Custom software costs more up front and carries no per-user fee, so it tends to cost less over three to five years for larger teams, and it fits processes a product cannot."],
  ["Is the estimate a fixed price?", "No. It is a planning range. After a first call we send a written scope and a fixed price, usually within two business days."],
];

export function SoftwareCostCalculatorPage() {
  const path = "/software-development-cost-calculator";
  return (
    <>
      <Head path={path} name="Software development cost calculator"
        title="Software Development Cost Calculator India: ERP, CRM | Infovion"
        description="Free software development cost calculator for India: website, web app, CRM, ERP or SaaS. Enter modules, roles and integrations for a budget range and timeline." />
      <PageHero trail={[["Free tools", "/free-tools"], ["Software cost calculator", path]]} kicker="Free tool"
        title="Software development cost calculator"
        sub="Estimate the cost of custom software in India: a website, web application, CRM, ERP, SaaS product or AI automation. Enter the modules, user roles and integrations, and see a budget range and timeline in rupees, dollars, dirhams or pounds." />
      <SoftwareCalculator path={path} />
      <Explainer title="How custom software is priced">
        <p className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-white"><strong>Software cost = base system + modules + user roles + integrations + data migration + mobile app + reporting.</strong> Each part is effort: screens to design, logic to build and cases to test.</p>
        <p><strong className="text-white">Modules</strong> are the biggest driver. Sales, purchase, stock, accounts, production and HR are each a module with its own screens, rules and reports.</p>
        <p><strong className="text-white">User roles</strong> multiply the work: an owner, a manager, counter staff and a customer each see different screens and are allowed different actions.</p>
        <p><strong className="text-white">Integrations</strong> such as payment gateways, GST e-invoicing, Tally, WhatsApp and SMS take one to two weeks each, including testing with the provider's sandbox.</p>
        <p><strong className="text-white">Data migration</strong> from spreadsheets is quick; from an older system it needs mapping, cleaning and a trial run before go-live.</p>
        <p>For the detail behind these figures, read <Link to="/blog/custom-software-development-cost-india" className="text-sky-300 underline hover:text-sky-200">custom software development cost in India</Link>.</p>
      </Explainer>
      <RangeTable caption="Typical software development budgets in India, 2026" head={["Type of software", "Typical budget", "Timeline"]} rows={[
        ["Business website (five pages)", "₹25,000 – 75,000", "2 – 3 weeks"],
        ["Single internal tool or module", "₹1.5 – 4 lakh", "4 – 8 weeks"],
        ["CRM or lead management system", "₹1.5 – 5 lakh", "6 – 10 weeks"],
        ["Business system with 4 – 8 modules", "₹4 – 15 lakh", "3 – 5 months"],
        ["ERP covering 3 – 6 departments", "₹5 – 20 lakh", "3 – 6 months"],
        ["SaaS first release", "₹6 – 20 lakh", "8 – 14 weeks"],
      ]} />
      <FaqList faqs={SOFTWARE_FAQ} />
      <MoreTools current={path} />
      <CtaBand title="Want a fixed price for your software?" primary={["Request a proposal", "/contact?service=custom-software-development"]} />
    </>
  );
}

// ── A developer in India against hiring at home ──────────────────────────────

// Annual salary defaults: the US figure is the Bureau of Labor Statistics median for software
// developers (May 2024); the others are round examples for the visitor to replace. `usd` is an
// approximate exchange rate, editable on the page (the dirham is pegged at 3.6725 to the dollar).
const COUNTRIES = {
  us: ["United States", "$", 133000, 1],
  uk: ["United Kingdom", "£", 60000, 1.3],
  ae: ["United Arab Emirates", "AED ", 240000, 0.2723],
  au: ["Australia", "A$", 120000, 0.65],
  ca: ["Canada", "C$", 100000, 0.72],
  eu: ["Germany / Eurozone", "€", 70000, 1.1],
};
const LEVELS = { junior: ["Junior developer (1 – 3 years)", 900], mid: ["Mid-level developer (3 – 6 years)", 1400], senior: ["Senior developer or lead (6+ years)", 1800] };

function DeveloperCalculator({ path }) {
  const [country, setCountry] = useState("us");
  const [v, setV] = useState({ salary: "133000", overhead: "25", fx: "1", level: "mid", people: "1", months: "12" });
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));
  const pickCountry = (e) => {
    const c = e.target.value;
    setCountry(c);
    setV((s) => ({ ...s, salary: String(COUNTRIES[c][2]), fx: String(COUNTRIES[c][3]) }));
  };
  const [cName, sym] = COUNTRIES[country];
  const fx = num(v.fx) || 1;
  const people = Math.max(1, num(v.people));
  const months = Math.max(1, num(v.months));
  const local = num(v.salary) * (1 + num(v.overhead) / 100) * people * (months / 12);
  const india = (LEVELS[v.level][1] * people * months) / fx; // in the local currency
  const saving = local - india;
  const pct = local ? Math.round((saving / local) * 100) : 0;
  const f = (x) => `${sym}${Math.round(x).toLocaleString("en-US")}`;

  return (
    <Section className="pt-0">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
        <form className="panel space-y-6 rounded-xl p-6 sm:p-7" onSubmit={(e) => e.preventDefault()}>
          <Group title="Hiring at home">
            <Field label="Your country"><Select value={country} onChange={pickCountry} options={Object.entries(COUNTRIES).map(([k, [l]]) => [k, l])} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label={`Annual salary (${sym.trim()})`} hint="The US default is the BLS median for software developers, May 2024. Other defaults are round examples: enter your own figure."><input className={field} inputMode="decimal" value={v.salary} onChange={set("salary")} /></Field>
              <Field label="Employer costs on top (%)" hint="Benefits, payroll taxes, equipment, office and recruitment."><input className={field} inputMode="decimal" value={v.overhead} onChange={set("overhead")} /></Field>
            </div>
          </Group>
          <Group title="A dedicated developer in India">
            <Field label="Experience level" hint="Infovion's 2026 monthly rates: $900, $1,400 and $1,800, full-time, all-inclusive."><Select value={v.level} onChange={set("level")} options={Object.entries(LEVELS).map(([k, [l, r]]) => [k, `${l}: $${r.toLocaleString("en-US")} a month`])} /></Field>
            <div className="grid grid-cols-3 gap-3">
              <Field label="Developers"><input className={field} inputMode="numeric" value={v.people} onChange={set("people")} /></Field>
              <Field label="Months"><input className={field} inputMode="numeric" value={v.months} onChange={set("months")} /></Field>
              <Field label={`US$ per 1 ${sym.trim()}`} hint="Approximate; edit to today's rate."><input className={field} inputMode="decimal" value={v.fx} onChange={set("fx")} disabled={country === "us"} /></Field>
            </div>
          </Group>
        </form>
        <Estimate tool={path} headline={saving >= 0 ? "Estimated saving" : "Extra cost"} big={`${f(Math.abs(saving))}${saving >= 0 ? ` (${pct}%)` : ""}`} sub={`Over ${months} month${months === 1 ? "" : "s"} for ${people} developer${people === 1 ? "" : "s"}, ${cName}`} contactTo="/contact?service=offshore-software-development-india"
          shareTitle="Developer cost comparison (Infovion Technologies)"
          note="A comparison for planning, built from the figures you enter. It leaves out your own time managing a remote developer and any tax in your country. Rates are confirmed in a written proposal."
          rows={[
            [`In-house in ${cName}: salary`, f(num(v.salary) * people * (months / 12))],
            [`Employer costs at ${num(v.overhead)}%`, f(num(v.salary) * (num(v.overhead) / 100) * people * (months / 12))],
            ["In-house total", f(local)],
            [`Dedicated developer${people === 1 ? "" : "s"} in India`, `${f(india)} ($${(LEVELS[v.level][1] * people * months).toLocaleString("en-US")})`],
          ]} />
      </div>
    </Section>
  );
}

const DEV_FAQ = [
  ["How much does it cost to hire a developer in India?", "Through Infovion Technologies, a dedicated full-time developer in India costs about $900 to $1,800 a month depending on experience, or $12 to $25 an hour for part-time and task work. The fee is all-inclusive: salary, equipment, office, management and paid leave are on our side."],
  ["How much can a company save by hiring developers in India?", "It depends on local salaries. In the United States the median software developer salary was about $133,000 a year in May 2024 (Bureau of Labor Statistics), before benefits and payroll taxes; a mid-level dedicated developer in India at $1,400 a month is $16,800 a year. Enter your own salary figure above for your country."],
  ["What is a dedicated developer?", "A developer who works full-time on your product only, takes priorities from you each sprint and joins your calls and tools, while being employed and managed by the outsourcing company. You pay a monthly fee and can stop at the end of any month."],
  ["Do clients outside India pay GST?", "No. Software services supplied to a client outside India and paid for in foreign currency are an export of services, zero-rated under section 16 of the IGST Act, so the invoice carries no Indian GST."],
  ["When is hiring in India not cheaper?", "When the work needs someone in your office, when nobody on your side can give clear priorities and review work, or when the project is so small that a fixed-price quote is simpler. A dedicated developer pays off for steady work over three months or more."],
  ["Who owns the code written by a dedicated developer?", "You do. Code goes into your repository from the first day and the contract assigns the intellectual property to you on payment. A mutual NDA is signed before any information is shared."],
];

export function DeveloperCostCalculatorPage() {
  const path = "/hire-developers-india-cost-calculator";
  return (
    <>
      <Head path={path} name="Hire developers in India: cost calculator"
        title="Hire Developers in India: Cost Calculator vs In-House | Infovion"
        description="Compare the cost of a dedicated developer in India ($900 to $1,800 a month) with hiring in the US, UK, UAE, Australia, Canada or Europe. Free calculator." />
      <PageHero trail={[["Free tools", "/free-tools"], ["Developer cost calculator", path]]} kicker="Free tool for companies outside India"
        title="Hire developers in India: cost calculator"
        sub="Compare a dedicated full-time developer in India with hiring in your own country. Enter the local salary and employer costs, choose the experience level and the number of months, and see the difference." />
      <DeveloperCalculator path={path} />
      <Explainer title="What a developer really costs">
        <p className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-white"><strong>In-house cost = salary × (1 + employer costs) × months ÷ 12.</strong> A dedicated developer in India is a flat monthly fee with nothing added.</p>
        <p><strong className="text-white">Employer costs</strong> are everything on top of salary: health insurance and benefits, payroll taxes or social charges, pension contributions, equipment, office space and the recruiter's fee. Twenty-five percent is a cautious starting figure; in parts of Europe it is higher.</p>
        <p><strong className="text-white">In the UAE</strong> add the visa, health insurance and end-of-service gratuity, which is 21 days' basic pay per year for the first five years.</p>
        <p><strong className="text-white">The trade-offs</strong> are time zone, communication and your own time spent managing the work. Agree overlap hours, a daily written update and a fortnightly demo, and start with a small paid milestone.</p>
        <p>More detail: <Link to="/blog/cost-of-hiring-developers-india-vs-usa-uk-uae" className="text-sky-300 underline hover:text-sky-200">a developer in India against the US, UK and UAE</Link> and <Link to="/services/offshore-software-development-india" className="text-sky-300 underline hover:text-sky-200">outsourcing software development to India</Link>.</p>
      </Explainer>
      <RangeTable caption="Infovion's rates for clients outside India, 2026" head={["Engagement", "Price (USD)"]} rows={[
        ["Hourly development", "$12 – 25 an hour"],
        ["Dedicated full-time developer", "$900 – 1,800 a month"],
        ["Web app or MVP, fixed price", "$3,000 – 15,000"],
        ["Software maintenance (AMC)", "From $150 a month"],
      ]} />
      <FaqList faqs={DEV_FAQ} />
      <MoreTools current={path} />
      <CtaBand title="Hire a dedicated developer in India" sub="Send a short brief. We reply within one business day and arrange a call in your time zone." primary={["Request a proposal", "/contact?service=offshore-software-development-india"]} whatsappText="Hello Infovion, I would like to hire a dedicated developer." />
    </>
  );
}

// ── AI automation: saving and payback ────────────────────────────────────────

const ROI_CUR = { INR: ["₹", "en-IN"], USD: ["$", "en-US"], AED: ["AED ", "en-US"], GBP: ["£", "en-GB"] };

function RoiCalculator({ path }) {
  const [v, setV] = useState({ cur: "INR", people: "3", hours: "12", rate: "250", share: "60", build: "300000", running: "8000" });
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));
  const [sym, locale] = ROI_CUR[v.cur];
  const f = (x) => `${x < 0 ? "− " : ""}${sym}${Math.abs(Math.round(x)).toLocaleString(locale)}`;
  const hoursMonth = num(v.people) * num(v.hours) * (52 / 12);
  const saved = hoursMonth * Math.min(100, num(v.share)) / 100;
  const gross = saved * num(v.rate);
  const net = gross - num(v.running);
  const payback = net > 0 ? num(v.build) / net : null;
  const year = net * 12 - num(v.build);
  const roi = num(v.build) ? Math.round((year / num(v.build)) * 100) : 0;

  return (
    <Section className="pt-0">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
        <form className="panel space-y-6 rounded-xl p-6 sm:p-7" onSubmit={(e) => e.preventDefault()}>
          <Group title="The task today">
            <div className="grid grid-cols-2 gap-3">
              <Field label="People who do this task"><input className={field} inputMode="numeric" value={v.people} onChange={set("people")} /></Field>
              <Field label="Hours each spends on it per week"><input className={field} inputMode="decimal" value={v.hours} onChange={set("hours")} /></Field>
              <Field label="Currency"><Select value={v.cur} onChange={set("cur")} options={Object.keys(ROI_CUR).map((k) => [k, k])} /></Field>
              <Field label={`Cost of one hour (${sym.trim()})`} hint="Monthly cost to the company ÷ about 190 working hours."><input className={field} inputMode="decimal" value={v.rate} onChange={set("rate")} /></Field>
            </div>
          </Group>
          <Group title="The automation">
            <Field label="Share of the task that can be automated (%)" hint="Be cautious: 50 to 70% is common, because exceptions still need a person. A proof of concept measures the real figure."><input className={field} inputMode="decimal" value={v.share} onChange={set("share")} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label={`Cost to build (${sym.trim()})`}><input className={field} inputMode="decimal" value={v.build} onChange={set("build")} /></Field>
              <Field label={`Running cost per month (${sym.trim()})`} hint="Model usage, messages, hosting, maintenance."><input className={field} inputMode="decimal" value={v.running} onChange={set("running")} /></Field>
            </div>
          </Group>
        </form>
        <Estimate tool={path} headline="Payback period" big={payback === null ? "Does not pay back" : payback < 1 ? "Under 1 month" : `${payback.toFixed(1)} months`} sub={`First-year return: ${f(year)}${num(v.build) ? ` (${roi}% ROI)` : ""}`} contactTo="/contact?service=ai-automation"
          shareTitle="AI automation ROI estimate (Infovion Technologies)"
          note="Arithmetic on the figures you enter, for planning. Time saved turns into money only when the hours are used for other work; a proof of concept on your own data gives the real automation share."
          rows={[
            ["Hours spent on the task per month", Math.round(hoursMonth).toLocaleString(locale)],
            ["Hours saved per month", Math.round(saved).toLocaleString(locale)],
            ["Value of time saved per month", f(gross)],
            ["Running cost per month", f(-num(v.running))],
            ["Net saving per month", f(net)],
            ["Net saving over three years", f(net * 36 - num(v.build))],
          ]} />
      </div>
    </Section>
  );
}

const ROI_FAQ = [
  ["How do you calculate the ROI of AI automation?", "Work out the hours spent on the task each month, multiply by the share that can be automated and by the cost of an hour to get the monthly saving, then subtract the running cost. Payback period is the build cost divided by that net monthly saving. First-year ROI is twelve months of net saving minus the build cost, divided by the build cost."],
  ["How much does AI automation cost in India?", "With Infovion Technologies, an assessment and proof of concept typically costs ₹50,000 to ₹1.5 lakh, and a production assistant or document-extraction pipeline ₹1.5 lakh to ₹6 lakh, plus a usage-based running cost that is estimated in advance."],
  ["Which business tasks give the best return from automation?", "Tasks that are frequent, rule-based and done by several people: entering invoices, answering the same customer questions, following up leads, preparing daily reports, and copying data between systems. Rare or judgement-heavy tasks usually do not pay back."],
  ["What is a realistic share of a task to automate?", "For clean, structured work 70 to 90 percent is possible. For documents and conversations, 50 to 70 percent is a sensible planning figure, with exceptions passed to a person. Measure it in a proof of concept before committing to the build."],
  ["What running costs should I expect?", "Language model usage per document or conversation, WhatsApp or SMS message charges where used, hosting, and maintenance. For a small business these usually total a few thousand rupees a month, and they scale with volume."],
  ["Does automation replace staff?", "In most small and mid-sized businesses it removes repetitive work rather than roles: the same people handle more volume and the exceptions that need judgement. The saving in this calculator is real only if the freed hours are put to other use."],
];

export function AutomationRoiCalculatorPage() {
  const path = "/ai-automation-roi-calculator";
  return (
    <>
      <Head path={path} name="AI automation ROI calculator"
        title="AI Automation ROI Calculator: Savings and Payback | Infovion"
        description="Free AI automation ROI calculator: enter the hours spent on a task, the share to automate, build and running cost, and see monthly savings and payback period." />
      <PageHero trail={[["Free tools", "/free-tools"], ["AI automation ROI calculator", path]]} kicker="Free tool"
        title="AI automation ROI calculator"
        sub="Is a task worth automating? Enter how many people do it and for how long, what an hour costs, and what the automation would cost to build and run. See the hours saved, the monthly saving and how soon it pays back." />
      <RoiCalculator path={path} />
      <Explainer title="How to work out whether an automation pays back">
        <p className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-white"><strong>Payback period = build cost ÷ (hours saved per month × cost of an hour − running cost per month).</strong></p>
        <p><strong className="text-white">1. Measure the task.</strong> Count the people who do it and the hours each spends in a normal week. Ask them; managers usually underestimate.</p>
        <p><strong className="text-white">2. Price an hour.</strong> Take the monthly cost of the person to the company, salary plus employer contributions, and divide by about 190 working hours.</p>
        <p><strong className="text-white">3. Be cautious about the share.</strong> Automation handles the routine cases; unclear documents, unusual requests and approvals still reach a person.</p>
        <p><strong className="text-white">4. Include running costs.</strong> Model usage, message charges, hosting and maintenance continue every month.</p>
        <p>A payback under twelve months is usually worth a proof of concept. See what we automate under <Link to="/services/ai-automation" className="text-sky-300 underline hover:text-sky-200">AI and business automation</Link> and <Link to="/services/ai-agent-development" className="text-sky-300 underline hover:text-sky-200">AI agent development</Link>.</p>
      </Explainer>
      <RangeTable caption="Typical AI automation budgets in India, 2026" head={["Project", "Typical budget", "Timeline"]} rows={[
        ["Assessment and proof of concept", "₹50,000 – 1.5 lakh", "2 – 3 weeks"],
        ["WhatsApp assistant or chatbot", "₹40,000 – 5 lakh", "2 – 8 weeks"],
        ["Document extraction pipeline", "₹1.5 – 6 lakh", "4 – 8 weeks"],
        ["AI agent with tools and integrations", "₹2 – 8 lakh", "6 – 10 weeks"],
      ]} />
      <FaqList faqs={ROI_FAQ} />
      <MoreTools current={path} />
      <CtaBand title="Have a task worth automating?" sub="Describe the task and its volume. We reply within one business day and, where it makes sense, propose a proof of concept on your own data." primary={["Request a proposal", "/contact?service=ai-automation"]} whatsappText="Hello Infovion, I would like to discuss automating a task with AI." />
    </>
  );
}
