import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Copy, MessageCircle } from "lucide-react";
import { CtaBand, FaqList, LinkRow, PageHero, Section } from "../../components/site/Ui";
import { SITE, jmsTrial } from "../../Data/company";
import { track } from "../../lib/analytics";

// Free jeweller calculators. The sums follow Infovion JMS (shared/billing.js and shared/girvi.js in
// the JMS repo), so a price or girvi interest worked out here matches the bill JMS would make.

const [TRIAL_HREF, TRIAL_LABEL] = jmsTrial();
const field = "w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-sky-300/60 focus:bg-white/[0.06]";
const num = (v) => Math.max(0, Number(String(v).replace(/,/g, "")) || 0);
const r2 = (v) => Math.round(v * 100) / 100;
const karat = (p) => Number(String(p).replace("K", "")) || 24;

const MARKETS = {
  in: { currency: "INR", locale: "en-IN", symbol: "₹", purities: ["24K", "22K", "20K", "18K", "14K"], unit: 10, unitLabel: "per 10 g", tax: 3, taxLabel: "GST", roundOff: true },
  ae: { currency: "AED", locale: "en-AE", symbol: "AED", purities: ["24K", "22K", "21K", "18K"], unit: 1, unitLabel: "per gram", tax: 5, taxLabel: "VAT", roundOff: false },
};

const money = (m, v) => `${m.symbol} ${v.toLocaleString(m.locale, { minimumFractionDigits: m.roundOff ? 0 : 2, maximumFractionDigits: 2 })}`;

function toolSchema(path, name, description) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url: `${SITE}${path}`,
    description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any web browser",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    publisher: { "@id": `${SITE}/#organization` },
  };
}

function Head({ path, title, description, name }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${SITE}${path}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${SITE}${path}`} />
      <meta property="og:image" content={`${SITE}/og-jms.jpg`} />
      <script type="application/ld+json">{JSON.stringify(toolSchema(path, name, description))}</script>
    </Helmet>
  );
}

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-slate-400">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-slate-500">{hint}</span>}
    </label>
  );
}

/** The result table plus WhatsApp and copy buttons for the same lines. */
function Result({ rows, total, empty, shareTitle, tool }) {
  const [copied, setCopied] = useState(false);
  if (empty) return <div className="panel flex min-h-[16rem] items-center justify-center rounded-xl p-8 text-center text-slate-400">{empty}</div>;
  const text = [shareTitle, ...rows.filter(([, , v]) => v).map(([a, b, v]) => `${a}${b ? ` (${b})` : ""}: ${v}`), `${total[0]}: ${total[1]}`, "", `Worked out at ${SITE}${tool}`].join("\n");
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard blocked */ }
    track("calculator_copy", { tool });
  };
  return (
    <div className="panel overflow-hidden rounded-xl">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Calculation</caption>
        <tbody className="divide-y divide-white/10">
          {rows.filter(([, , v]) => v).map(([a, b, v]) => (
            <tr key={a}>
              <th scope="row" className="px-5 py-3 font-medium text-slate-200">{a}</th>
              <td className="px-5 py-3 text-slate-400">{b}</td>
              <td className="px-5 py-3 text-right font-semibold text-white">{v}</td>
            </tr>
          ))}
          <tr className="bg-white/[0.04]">
            <th scope="row" className="px-5 py-4 font-display text-base font-semibold text-white">{total[0]}</th>
            <td />
            <td className="px-5 py-4 text-right font-display text-xl font-bold text-sky-200">{total[1]}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex flex-col gap-2 border-t border-white/10 p-4 sm:flex-row">
        <a href={`https://wa.me/?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer" onClick={() => track("calculator_share", { tool })}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-200">
          <MessageCircle className="h-4 w-4" /> Share on WhatsApp
        </a>
        <button type="button" onClick={copy} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/5">
          <Copy className="h-4 w-4" /> {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

function Explainer({ title, children }) {
  return (
    <Section title={title} className="pt-4">
      <div className="mt-6 max-w-3xl space-y-4 text-[15px] leading-relaxed text-slate-300">{children}</div>
    </Section>
  );
}

function MoreTools({ current }) {
  const all = [
    ["/gold-price-calculator", "Gold jewellery price calculator (India)", "Weight, purity, making charges, 3% GST and old gold."],
    ["/dubai-gold-price-calculator", "Dubai gold price calculator", "AED rate per gram by karat, making charges and 5% VAT."],
    ["/girvi-interest-calculator", "Girvi interest calculator", "Interest on a gold loan, counted by days at a monthly rate."],
  ].filter(([to]) => to !== current);
  return (
    <Section kicker="More free tools" title="Other calculators for jewellers" className="py-10">
      <div className="mt-8 grid border-t border-white/10 md:grid-cols-2 md:gap-x-10">
        {all.map(([to, t, b]) => <LinkRow key={to} to={to} title={t} body={b} />)}
        <LinkRow to="/jewellery-billing-software" title="How a jewellery bill is calculated" body="The same sums, done for every bill in Infovion JMS." />
        <LinkRow to="/girvi-software" title="Girvi software for jewellers" body="A girvi register with interest to date, part-payments, photos and receipts." />
      </div>
    </Section>
  );
}

// ── Gold jewellery price ─────────────────────────────────────────────────────

function GoldCalculator({ market, path }) {
  const m = MARKETS[market];
  const [v, setV] = useState({ weight: "10", purity: "22K", rate: "", rateFor: "sold", makingType: "per_gram", making: "", stones: "", discount: "", tax: String(m.tax), oldWeight: "", oldPurity: "22K", oldDeduct: "" });
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));

  const K = karat(v.purity);
  const rateUnit = num(v.rate) / m.unit; // per gram, for the purity sold
  const perGram = v.rateFor === "24K" ? (rateUnit * K) / 24 : rateUnit;
  const per24 = v.rateFor === "24K" ? rateUnit : (rateUnit * 24) / K;
  const weight = num(v.weight);
  const metal = r2(weight * perGram);
  const making = r2(v.makingType === "percent" ? (metal * num(v.making)) / 100 : v.makingType === "fixed" ? num(v.making) : weight * num(v.making));
  const stones = r2(num(v.stones));
  const discount = Math.min(r2(num(v.discount)), metal + making + stones);
  const taxable = r2(metal + making + stones - discount);
  const tax = r2((taxable * num(v.tax)) / 100);
  const oldGold = r2(num(v.oldWeight) * per24 * (karat(v.oldPurity) / 24) * (1 - Math.min(100, num(v.oldDeduct)) / 100));
  const exact = taxable + tax - oldGold;
  const total = m.roundOff ? Math.round(exact) : r2(exact);
  const half = r2(tax / 2);

  const f = (x) => money(m, x);
  const rows = [
    ["Metal value", `${weight} g × ${f(r2(perGram))}/g (${v.purity})`, f(metal)],
    ["Making charges", v.makingType === "percent" ? `${num(v.making)}% of metal` : v.makingType === "fixed" ? "fixed" : `${weight} g × ${f(num(v.making))}`, making ? f(making) : ""],
    ["Stone and other charges", "", stones ? f(stones) : ""],
    ["Discount", "before tax", discount ? `− ${f(discount)}` : ""],
    ["Taxable value", "", f(taxable)],
    market === "in" && num(v.tax) ? [`GST ${num(v.tax)}%`, `CGST ${f(half)} + SGST ${f(r2(tax - half))}`, f(tax)] : [`${m.taxLabel} ${num(v.tax)}%`, "", tax ? f(tax) : ""],
    ["Old gold", oldGold ? `${num(v.oldWeight)} g ${v.oldPurity}${num(v.oldDeduct) ? `, ${num(v.oldDeduct)}% deduction` : ""}` : "", oldGold ? `− ${f(oldGold)}` : ""],
    ["Round off", "", m.roundOff && r2(total - exact) ? f(r2(total - exact)) : ""],
  ];

  return (
    <Section className="pt-0">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <form className="panel space-y-5 rounded-xl p-6 sm:p-7" onSubmit={(e) => e.preventDefault()}>
          <fieldset className="space-y-3">
            <legend className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">The piece</legend>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Net weight (grams)"><input className={field} inputMode="decimal" value={v.weight} onChange={set("weight")} /></Field>
              <Field label="Purity"><select className={field} value={v.purity} onChange={set("purity")}>{m.purities.map((p) => <option key={p} className="bg-slate-900">{p}</option>)}</select></Field>
            </div>
            <Field label={`Today's gold rate (${m.symbol} ${m.unitLabel})`} hint="Use the rate your shop or city association publishes today.">
              <input className={field} inputMode="decimal" placeholder={`Rate ${m.unitLabel}`} value={v.rate} onChange={set("rate")} />
            </Field>
            <Field label="This rate is for">
              <select className={field} value={v.rateFor} onChange={set("rateFor")}>
                <option value="sold" className="bg-slate-900">{v.purity}, the purity sold</option>
                <option value="24K" className="bg-slate-900">24K, convert to {v.purity} (× {K}/24)</option>
              </select>
            </Field>
          </fieldset>
          <fieldset className="space-y-3">
            <legend className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">Charges</legend>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Making charges">
                <select className={field} value={v.makingType} onChange={set("makingType")}>
                  <option value="per_gram" className="bg-slate-900">{m.symbol} per gram</option>
                  <option value="percent" className="bg-slate-900">% of metal value</option>
                  <option value="fixed" className="bg-slate-900">{m.symbol} for the piece</option>
                </select>
              </Field>
              <Field label={v.makingType === "percent" ? "Making %" : `Making (${m.symbol})`}><input className={field} inputMode="decimal" value={v.making} onChange={set("making")} /></Field>
              <Field label={`Stone / other (${m.symbol})`}><input className={field} inputMode="decimal" value={v.stones} onChange={set("stones")} /></Field>
              <Field label={`Discount (${m.symbol})`}><input className={field} inputMode="decimal" value={v.discount} onChange={set("discount")} /></Field>
              <Field label={`${m.taxLabel} %`}><input className={field} inputMode="decimal" value={v.tax} onChange={set("tax")} /></Field>
            </div>
          </fieldset>
          <fieldset className="space-y-3">
            <legend className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">Old gold in exchange (optional)</legend>
            <div className="grid grid-cols-3 gap-3">
              <Field label="Weight (g)"><input className={field} inputMode="decimal" value={v.oldWeight} onChange={set("oldWeight")} /></Field>
              <Field label="Purity"><select className={field} value={v.oldPurity} onChange={set("oldPurity")}>{m.purities.map((p) => <option key={p} className="bg-slate-900">{p}</option>)}</select></Field>
              <Field label="Deduction %"><input className={field} inputMode="decimal" value={v.oldDeduct} onChange={set("oldDeduct")} /></Field>
            </div>
            <p className="text-[11px] text-slate-500">Valued at today's 24K rate × purity, less the shop's deduction for melting and testing.</p>
          </fieldset>
        </form>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Result rows={rows} total={[oldGold ? "Amount payable" : "Price of the piece", f(total)]} tool={path}
            shareTitle={`Price of ${weight} g ${v.purity} gold jewellery`}
            empty={!num(v.rate) || !weight ? "Enter the weight and today's gold rate to see the price, with making charges and tax." : null} />
          <p className="mt-3 text-xs text-slate-500">For estimates only. The bill from your jeweller is final; confirm tax rates with your accountant.</p>
        </div>
      </div>
    </Section>
  );
}

export function GoldPriceCalculatorPage() {
  const path = "/gold-price-calculator";
  return (
    <>
      <Head path={path} name="Gold jewellery price calculator"
        title="Gold Price Calculator with Making Charges and GST | Infovion"
        description="Free gold jewellery price calculator: weight × today's rate by purity, making charges per gram or %, stones, discount, 3% GST and old gold exchange." />
      <PageHero trail={[["Infovion JMS", "/jewellery-management-software"], ["Gold price calculator", path]]} kicker="Free tool for jewellers and buyers"
        title="Gold jewellery price calculator"
        sub="Work out the price of a gold ornament the way a jeweller's bill does: metal value from weight and today's rate, making charges, stones, discount, 3% GST and old gold taken in exchange. Share the result on WhatsApp." />
      <GoldCalculator market="in" path={path} />
      <Explainer title="How the price of gold jewellery is calculated in India">
        <p><strong className="text-white">Metal value</strong> = net weight in grams × today's rate per gram for the purity. Rates are usually quoted per 10 g, so a 22K rate of ₹1,00,000 per 10 g is ₹10,000 a gram.</p>
        <p><strong className="text-white">Making charges</strong> are added as an amount per gram, a percentage of the metal value, or a fixed amount for the piece. Stones and other charges are added on top.</p>
        <p><strong className="text-white">GST</strong> is 3% of the full value of the jewellery, making charges included, less any discount shown on the bill (CBIC sectoral FAQ on gems and jewellery). Within a state it is split into 1.5% CGST and 1.5% SGST.</p>
        <p><strong className="text-white">Old gold</strong> taken in exchange is valued at the day's rate for its purity, less the shop's deduction, and taken off the amount payable.</p>
        <p className="text-sm text-slate-400">Source: <a className="underline hover:text-slate-300" href="https://gstcouncil.gov.in/sites/default/files/2024-02/sectoral-fq-gems-jewellery.pdf" target="_blank" rel="noopener noreferrer">CBIC: Sectoral FAQ on Gems and Jewellery</a>. A bill over ₹2 lakh needs the buyer's PAN or Form 60 (Income Tax Rule 114B).</p>
      </Explainer>
      <FaqList faqs={[
        ["How do I calculate the price of 10 grams of 22K gold jewellery?", "Multiply 10 g by today's 22K rate per gram, add the making charges (for example ₹600 a gram is ₹6,000 on 10 g) and any stone charges, take off any discount, then add 3% GST on the total. Enter the weight, rate and making charges above and the calculator does it."],
        ["Is GST charged on making charges for gold jewellery?", "Yes. For jewellery sold to a customer, GST at 3% applies to the full value, including making charges, whether or not they are shown separately on the bill."],
        ["How do I get the 22K rate from the 24K rate?", "Multiply the 24K rate by 22/24 (about 0.9167). Choose \"24K, convert\" above and the calculator does it. Many shops publish their own 22K rate, which can differ a little from this conversion."],
        ["What are normal making charges on gold jewellery?", "There is no fixed rate: making charges vary with the design, the work involved and the shop, and are usually lower on plain machine-made pieces than on handmade or detailed ones. Ask for the making charge in writing and compare shops by working it out as an amount per gram."],
        ["How is old gold valued in an exchange?", "By its weight and purity at the day's rate, often less a deduction for melting and testing losses. The value is taken off the new bill. Ask the jeweller to test the purity in front of you and show the deduction on the bill."],
      ]} />
      <MoreTools current={path} />
      <CtaBand title="Make these bills in seconds" sub="Infovion JMS works out every jewellery bill like this, prints the GST invoice and keeps the stock right. Free for 30 days." primary={[TRIAL_LABEL, TRIAL_HREF]} whatsappText="Hello Infovion, I used the gold price calculator and would like to know about Infovion JMS for our shop." />
    </>
  );
}

export function DubaiGoldCalculatorPage() {
  const path = "/dubai-gold-price-calculator";
  return (
    <>
      <Head path={path} name="Dubai gold price calculator"
        title="Dubai Gold Price Calculator: AED, Karat, VAT | Infovion"
        description="Free Dubai and UAE gold jewellery price calculator: AED rate per gram for 24K, 22K, 21K or 18K, making charges, stones, 5% VAT and old gold exchange." />
      <PageHero trail={[["Infovion JMS", "/jewellery-management-software"], ["Dubai gold price calculator", path]]} kicker="Free tool · United Arab Emirates"
        title="Dubai gold price calculator"
        sub="Work out the price of gold jewellery in the UAE: weight × the day's AED rate for the karat, making charges, stones, 5% VAT and old gold taken in exchange. For shoppers in the souk and for jewellers quoting customers." />
      <GoldCalculator market="ae" path={path} />
      <Explainer title="How gold jewellery is priced in Dubai and the UAE">
        <p><strong className="text-white">Metal value</strong> = net weight in grams × the day's rate per gram for the karat. UAE rates are published per gram for 24K, 22K, 21K and 18K gold.</p>
        <p><strong className="text-white">Making charges</strong> are added per gram or as a fixed amount for the piece, and stones are charged separately.</p>
        <p><strong className="text-white">VAT</strong> is 5% on the full value of jewellery sold to a consumer: metal, making and stones. Investment gold of 99% purity or more can be zero-rated, and dealer-to-dealer sales for resale fall under the reverse charge. Tourists can claim a VAT refund on eligible purchases at the airport.</p>
        <p className="text-sm text-slate-400">Source: <a className="underline hover:text-slate-300" href="https://tax.gov.ae" target="_blank" rel="noopener noreferrer">UAE Federal Tax Authority</a>. Rates are for illustration; use the day's published rate.</p>
      </Explainer>
      <FaqList faqs={[
        ["How is the price of gold jewellery calculated in Dubai?", "Weight in grams × the day's rate per gram for the karat, plus making charges and any stones, plus 5% VAT on the total. Enter the weight, karat, rate and making charge above and the calculator shows each part."],
        ["Is VAT charged on making charges in the UAE?", "Yes. For jewellery sold to a consumer, the making charges are part of the price and 5% VAT applies to them along with the metal and stones."],
        ["What is the difference between 22K and 21K gold?", "22K gold is about 91.6% pure and 21K about 87.5% pure, so 21K costs less per gram and is a little harder. 21K is popular in the Gulf; 22K is the usual choice of Indian buyers."],
        ["Can tourists get the VAT back on gold jewellery in Dubai?", "Visitors can claim a refund of VAT on eligible purchases from shops registered in the tax-free shopping scheme, at the airport before leaving. The refund is on the VAT, less a fee, and the rules are set by the Federal Tax Authority."],
        ["How do I convert a 24K rate to 22K, 21K or 18K?", "Multiply the 24K rate by the karat divided by 24: × 22/24 for 22K, × 21/24 for 21K and × 18/24 for 18K. Choose \"24K, convert\" above. Published rates for each karat can differ slightly from this."],
      ]} />
      <MoreTools current={path} />
      <CtaBand title="Jewellery software for UAE shops" sub="Infovion JMS bills by weight and karat in AED and prints 5% VAT tax invoices with your TRN. About AED 390 per shop, plus a yearly AMC, after a 30-day free trial." primary={[TRIAL_LABEL, TRIAL_HREF]} whatsappText="Hello Infovion, I used the Dubai gold price calculator and would like to know about Infovion JMS for our jewellery shop in the UAE." />
    </>
  );
}

// ── Girvi interest ───────────────────────────────────────────────────────────

const isoDay = (d) => d.toISOString().slice(0, 10);
const dayCount = (a, b) => Math.round((Date.UTC(...ymd(b)) - Date.UTC(...ymd(a))) / 86400000);
const ymd = (s) => { const [y, mo, d] = s.split("-").map(Number); return [y, mo - 1, d]; };

export function GirviInterestCalculatorPage() {
  const path = "/girvi-interest-calculator";
  const [v, setV] = useState({ amount: "50000", rate: "2", from: "", to: "", minDays: "0" });
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));
  // dates are filled in the browser, so the page built ahead of time doesn't carry a stale "today"
  useEffect(() => {
    const now = new Date();
    setV((s) => ({ ...s, from: isoDay(new Date(now.getTime() - 100 * 86400000)), to: isoDay(now) }));
  }, []);

  const P = num(v.amount);
  const rate = num(v.rate);
  const valid = v.from && v.to && dayCount(v.from, v.to) >= 0;
  const days = valid ? dayCount(v.from, v.to) : 0;
  const charged = Math.max(days, num(v.minDays));
  const interest = r2((P * rate * charged) / 3000);
  const m = MARKETS.in;
  const f = (x) => money(m, x);
  const rows = [
    ["Loan amount", "", f(P)],
    ["Interest rate", `${rate}% a month (${r2(rate * 12)}% a year)`, f(r2((P * rate) / 100)) + " / month"],
    ["Period", `${v.from} to ${v.to}`, `${days} days`],
    ["Days charged", charged > days ? `minimum ${num(v.minDays)} days` : "", charged > days ? `${charged} days` : ""],
    ["Interest", `${f(P)} × ${rate}% × ${charged} ÷ 30`, f(interest)],
  ];

  return (
    <>
      <Head path={path} name="Girvi interest calculator"
        title="Girvi Interest Calculator: Gold Loan Interest by Days | Infovion"
        description="Free girvi (gahan) interest calculator: enter the loan, monthly rate and dates to get simple interest counted by days, with an optional minimum period." />
      <PageHero trail={[["Infovion JMS", "/jewellery-management-software"], ["Girvi interest calculator", path]]} kicker="Free tool for jewellers and gold loan desks"
        title="Girvi interest calculator"
        sub="Simple interest on a girvi (gahan) gold loan at a monthly rate, counted by the days between the pledge and today, with an optional minimum period. The same rule Infovion JMS uses for its girvi register." />
      <Section className="pt-0">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <form className="panel space-y-4 rounded-xl p-6 sm:p-7" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Loan amount (₹)"><input className={field} inputMode="decimal" value={v.amount} onChange={set("amount")} /></Field>
              <Field label="Interest % per month"><input className={field} inputMode="decimal" value={v.rate} onChange={set("rate")} /></Field>
              <Field label="Pledge date"><input className={field} type="date" value={v.from} onChange={set("from")} /></Field>
              <Field label="Interest up to"><input className={field} type="date" value={v.to} onChange={set("to")} /></Field>
            </div>
            <Field label="Minimum interest period" hint="Many shops charge at least 15 days or one month of interest.">
              <select className={field} value={v.minDays} onChange={set("minDays")}>
                <option value="0" className="bg-slate-900">None, exact days</option>
                <option value="15" className="bg-slate-900">15 days</option>
                <option value="30" className="bg-slate-900">One month (30 days)</option>
              </select>
            </Field>
          </form>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Result rows={rows} total={["Amount to release", f(r2(P + interest))]} tool={path} shareTitle="Girvi interest"
              empty={!P || !valid ? "Enter the loan amount, the monthly rate and the dates." : null} />
            <p className="mt-3 text-xs text-slate-500">Simple interest, 30 days = one month. Part-payments lower the interest from the day they are made; JMS works that out on every pledge.</p>
          </div>
        </div>
      </Section>
      <Explainer title="How girvi interest is calculated">
        <p>Most jewellers charge <strong className="text-white">simple interest at a monthly rate</strong>: interest = loan amount × rate per month × number of days ÷ 30. At 2% a month, ₹50,000 earns ₹1,000 a month, or about ₹33.33 a day.</p>
        <p>Some shops count <strong className="text-white">whole months</strong> instead, charging a full month for any part month, and many charge a <strong className="text-white">minimum period</strong> such as 15 days or a month even when the gold is released earlier.</p>
        <p>When the customer pays back part of the loan, interest from that day is charged only on the amount still outstanding. Interest payments reduce the interest due, not the loan.</p>
        <p className="text-sm text-slate-400">Money lending in India is regulated by state money-lenders acts, which can set licences and maximum rates. Check the rules in your state.</p>
      </Explainer>
      <FaqList faqs={[
        ["How do I calculate girvi interest for 100 days?", "Multiply the loan by the monthly rate and by 100 ÷ 30. For ₹50,000 at 2% a month: 50,000 × 2% × 100 ÷ 30 = ₹3,333.33. The calculator above does this for any dates."],
        ["What does 2 rupees interest (2 टक्के) mean in girvi?", "It usually means ₹2 per ₹100 per month, that is 2% a month or 24% a year in simple interest."],
        ["Is girvi interest simple or compound?", "Girvi interest is usually simple interest on the principal outstanding. Whatever rule your shop follows, agree it with the customer in writing and print it on the receipt."],
        ["What is a minimum interest period?", "A rule that interest is charged for at least a set time, such as 15 days or one month, even if the gold is released sooner. Choose it above to see its effect."],
        ["How can a jeweller track interest on every pledge?", "With a girvi register in software. Infovion JMS shows the interest to date on every pledge, takes part-payments, highlights overdue pledges and prints pledge and release receipts."],
      ]} />
      <MoreTools current={path} />
      <CtaBand title="Every pledge's interest, worked out daily" sub="Infovion JMS keeps the girvi register with photos, part-payments, overdue alerts and receipts. Free for 30 days." primary={[TRIAL_LABEL, TRIAL_HREF]} whatsappText="Hello Infovion, I used the girvi interest calculator and would like to know about the girvi register in Infovion JMS." />
    </>
  );
}
