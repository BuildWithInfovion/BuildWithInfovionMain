import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Check, MessageCircle, Minus } from "lucide-react";
import { BrowserFrame } from "../../components/product/Frames";
import { GhostButton, GlowButton, Kicker, Reveal } from "../../components/fx/Fx";
import { AnswerBox, CtaBand, FaqList, LinkRow, PageHero, Section } from "../../components/site/Ui";
import { SITE, wa } from "../../Data/company";

const DEMO = "/contact?interest=jms";
const WA_TEXT = "Hello Infovion, I would like a demonstration of Infovion JMS for our jewellery store.";
const ID = `${SITE}/jewellery-management-software#software`;

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": ID,
  name: "Infovion JMS",
  alternateName: ["Infovion Jewellery Management Software", "Infovion jewellery billing software", "Infovion girvi software"],
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Jewellery management software",
  operatingSystem: "Any web browser (Windows, macOS, Android, iOS)",
  url: `${SITE}/jewellery-management-software`,
  description: "Jewellery management software for jewellery retailers: billing by weight, purity, rate per gram and making charges, old-gold exchange, GST invoices with CGST and SGST, girvi (gold loan) management, customer credit ledger, stock by piece or weight, reports and Tally export.",
  featureList: [
    "Jewellery billing by weight, purity and rate per gram", "Making charges per gram", "Old gold exchange and advance adjustment", "GST invoices with CGST and SGST",
    "A4 invoice printing and PDF sharing", "Girvi (gahan) register with interest and due dates", "Overdue pledge alerts and release receipts",
    "Customer credit (udhaar) ledger with payment history", "Stock by piece and by weight", "Out-of-stock alerts", "Sales and girvi reports with PDF export", "Owner and staff roles",
    "HUID (hallmark unique ID) on invoice lines", "Girvi interest to date and release with interest received",
    "Tally export (TallyPrime XML: ledgers and vouchers)", "GST sales register and girvi register in Excel",
  ],
  screenshot: [`${SITE}/product/jms/dashboard.webp`, `${SITE}/product/jms/invoice.webp`, `${SITE}/product/jms/gahan.webp`, `${SITE}/product/jms/tally-export.webp`],
  author: { "@id": `${SITE}/#organization` },
  publisher: { "@id": `${SITE}/#organization` },
  areaServed: [{ "@type": "Country", name: "India" }, { "@type": "Place", name: "Worldwide" }],
};

const FEATURES = [
  {
    id: "billing", kicker: "Billing and GST invoices", title: "Accurate jewellery billing",
    body: "Select an item and JMS fills in its weight and rate. Purity, rate per gram and making charge can be adjusted on the bill. Discounts are applied before GST, GST is charged on the full value with the CGST and SGST split, and old gold or an advance is deducted from the balance.",
    points: ["Weight multiplied by rate per gram on every line", "Purity per item: 22K (916), 18K (750), 925 silver and others", "Making charges per gram", "HUID recorded on the invoice line", "Discount before GST, with CGST and SGST shown", "Printed on A4 or shared as a PDF"],
    img: ["/product/jms/invoice", "GST tax invoice in Infovion JMS with purity, weight, rate per gram, making charges and CGST/SGST", 1536, 1620],
  },
  {
    id: "girvi", kicker: "Girvi (gahan)", title: "Gold loan register",
    body: "Each pledge is recorded with the item, weight, purity, amount and interest rate. JMS shows the interest accrued on every pledge to date, highlights overdue pledges, and on release shows the principal and interest due, recording the interest actually received.",
    points: ["Interest to date on every pledge", "Release with principal and interest calculated", "Overdue pledges highlighted", "Printed pledge receipts", "Girvi reports and Excel register"],
    img: ["/product/jms/gahan", "Girvi register in Infovion JMS showing active pledges, amounts and due dates", 1800, 1125],
    link: ["/girvi-software", "More about girvi management"],
  },
  {
    id: "udhaar", kicker: "Customer credit", title: "Customer credit ledger",
    body: "When a customer pays part of a bill, the balance is recorded as customer credit (udhaar) automatically. Payments are added as they are received, by cash or UPI, and the total outstanding is always visible.",
    points: ["Balances created from bills automatically", "Manual entries for earlier dues", "Part-payments with method and date", "Total outstanding across all customers"],
    img: ["/product/jms/debt", "Customer credit ledger in Infovion JMS with balances remaining", 1800, 1125],
  },
  {
    id: "stock", kicker: "Stock", title: "Stock by piece and by weight",
    body: "Finished pieces are tracked by count and weight, and loose or bulk silver by weight. Stock is reduced as items are billed, and the dashboard shows when an item is out of stock.",
    points: ["Standard items and bulk-weight items", "Restocking with added weight", "Out-of-stock alerts on the dashboard", "Category, purity and price per gram"],
    img: ["/product/jms/inventory", "Stock management in Infovion JMS with gold and silver items by weight", 1800, 1125],
  },
  {
    id: "reports", kicker: "Reports", title: "Sales and girvi reports",
    body: "Search invoices by number, customer or date, reopen and reprint them, and download reports as PDF for the accountant.",
    points: ["Sales by date range, customer or invoice", "Reprint or re-share any invoice", "Revenue and balance totals", "PDF export"],
    img: ["/product/jms/reports", "Sales reports in Infovion JMS with invoice totals and balances", 1800, 1125],
  },
  {
    id: "tally", kicker: "Tally export", title: "Accounting export for Tally",
    body: "Select a month or financial year and download two files for import into TallyPrime: the ledgers, and all vouchers for the period, including sales with CGST and SGST, advances and credit receipts, girvi loans, releases and interest. Excel registers are included for checking totals and filing GST returns.",
    points: ["TallyPrime XML: ledgers and vouchers", "Sales vouchers with CGST and SGST", "Cash and bank receipts kept separate", "Girvi loans, releases and interest income", "GST sales register in Excel", "Ledger names matched to the accountant's books"],
    img: ["/product/jms/tally-export", "Accounting export in Infovion JMS: Tally ledgers and vouchers, sales register and girvi register", 1800, 1125],
  },
];

const COMPARISON = [
  ["Pricing from weight, purity and rate per gram", false, "partial", true],
  ["Making charges per gram", false, false, true],
  ["Old-gold exchange on the same bill", false, false, true],
  ["GST invoice with CGST and SGST", false, true, true],
  ["Girvi register with due dates", "register", false, true],
  ["Customer credit with part-payments", "register", "partial", true],
  ["Stock by weight", false, false, true],
  ["Tally export", false, "partial", true],
];

const FAQ = [
  ["What is Infovion JMS?", "Infovion JMS is jewellery management software for jewellery retailers. It covers billing by weight, purity and making charges, GST invoices, old-gold exchange, girvi (gold loans), customer credit, stock, reports and export to Tally, and runs in any web browser."],
  ["What should jewellery software include?", "Jewellery software should price each item from its weight, purity, rate per gram and making charge, handle old-gold exchange and GST correctly, and keep girvi, customer credit and stock in the same system so that nothing is entered twice. Infovion JMS is designed around these requirements. We recommend a demonstration with your own items before choosing any system."],
  ["Does Infovion JMS support GST billing?", "Yes. GST can be applied to each bill, and the invoice shows the taxable value with the CGST and SGST split and your GSTIN. Non-GST estimates are also supported."],
  ["Can girvi (gold loans) be managed in JMS?", "Yes. JMS maintains a complete girvi register with the item, weight, purity, amount, interest rate, pledge date and due date. Overdue pledges are highlighted and a receipt is printed on release."],
  ["Does Infovion JMS work with Tally?", "Yes. From Reports, the owner can export TallyPrime XML files containing the ledgers and all vouchers for the period, including sales with CGST and SGST, advances and credit receipts, girvi loans, releases and interest. The accountant imports them through Tally's Import menu. Excel sales and girvi registers are included."],
  ["How is GST calculated on jewellery in JMS?", "GST is charged on the full value of the jewellery, that is the metal value plus making charges, less any discount shown on the invoice, and split into CGST and SGST. The default rate is 3%, in line with the CBIC FAQ on gems and jewellery, and can be changed to the rate your accountant confirms."],
  ["Can HUID be recorded on the bill?", "Yes. Each invoice line has a field for the six-character hallmark unique ID, which is printed on the invoice."],
  ["Does JMS need to be installed?", "No. JMS is a cloud application that runs in a browser on a computer, tablet or phone. An internet connection is required, and data is backed up in the cloud."],
  ["How is store data protected?", "Each store has its own installation and database. Access is password-protected, staff accounts have limited permissions, and only the owner can change settings or create users."],
  ["Can JMS be used outside India?", "Yes, as a configured deployment. We set the currency, tax names and rates (such as VAT or sales tax), purity standards and invoice language for your country."],
  ["How is Infovion JMS priced?", "JMS is priced per store on an annual plan, with setup and training included. The price depends on the number of counters and modules required. Please request a demonstration for a quotation."],
];

function FeatureBlock({ f, flip }) {
  return (
    <section id={f.id} className="relative scroll-mt-28 py-14 sm:py-16">
      <div className={`mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <Reveal>
          <Kicker>{f.kicker}</Kicker>
          <h2 className="mt-4 font-display text-[1.9rem] font-bold leading-[1.15] tracking-tight text-white sm:text-[2.3rem]">{f.title}</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-300">{f.body}</p>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">{f.points.map((p) => <li key={p} className="flex gap-2.5 text-sm text-slate-200"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-300" aria-hidden="true" />{p}</li>)}</ul>
          {f.link && <Link to={f.link[0]} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200">{f.link[1]} <ArrowRight className="h-4 w-4" /></Link>}
        </Reveal>
        <Reveal delay={0.08}>
          <BrowserFrame url="jms">
            <img src={`${f.img[0]}-900.webp`} srcSet={`${f.img[0]}-900.webp 900w, ${f.img[0]}.webp ${f.img[2]}w`} sizes="(min-width: 1024px) 560px, 92vw" alt={f.img[1]} width={f.img[2]} height={f.img[3]} loading="lazy" className={`block w-full ${f.id === "billing" ? "max-h-[520px] object-cover object-top" : ""}`} />
          </BrowserFrame>
        </Reveal>
      </div>
    </section>
  );
}

export function JmsHome() {
  return (
    <>
      <Helmet>
        <title>Jewellery Management Software | Billing, GST, Girvi, Stock and Tally | Infovion JMS</title>
        <meta name="description" content="Infovion JMS is jewellery management software for jewellery retailers: billing by weight, purity and making charges, GST invoices, old-gold exchange, girvi management, customer credit, stock, reports and Tally export. Runs in any browser." />
        <link rel="canonical" href={`${SITE}/jewellery-management-software`} />
        <meta property="og:title" content="Infovion JMS | Jewellery Management Software" />
        <meta property="og:description" content="Billing by weight and purity, GST invoices, girvi, customer credit, stock and Tally export for jewellery retailers." />
        <meta property="og:url" content={`${SITE}/jewellery-management-software`} />
        <meta property="og:image" content={`${SITE}/og-jms.jpg`} />
        <meta name="twitter:image" content={`${SITE}/og-jms.jpg`} />
        <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
      </Helmet>

      <PageHero trail={[["Products", "/products"], ["Infovion JMS", "/jewellery-management-software"]]} kicker="Infovion JMS"
        title="Jewellery management software"
        sub="Billing by purity, rate per gram and making charges, GST invoices, girvi loans, customer credit, stock and Tally export in one system for jewellery retailers. Runs in a web browser, with nothing to install."
        aside={
          <BrowserFrame url="jms">
            <img src="/product/jms/dashboard-900.webp" srcSet="/product/jms/dashboard-900.webp 900w, /product/jms/dashboard.webp 1800w" sizes="(min-width: 1024px) 520px, 92vw" alt="Infovion JMS dashboard with the day's revenue, weekly and monthly sales, and out-of-stock alerts" width="1800" height="1125" className="block w-full" fetchpriority="high" />
          </BrowserFrame>
        }>
        <GlowButton to={DEMO}>Request a demonstration <ArrowRight className="h-4 w-4" /></GlowButton>
        <GhostButton href={wa(WA_TEXT)}><MessageCircle className="h-4 w-4" /> WhatsApp</GhostButton>
      </PageHero>

      <section className="pb-4">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <nav aria-label="Features on this page" className="flex flex-wrap gap-x-6 gap-y-3 border-y border-white/10 py-5">
            {FEATURES.map((f) => <a key={f.id} href={`#${f.id}`} className="text-sm text-slate-300 underline-offset-4 hover:text-white hover:underline">{f.title}</a>)}
          </nav>
          <div className="mt-10"><AnswerBox q="Overview">{FAQ[0][1]}</AnswerBox></div>
        </div>
      </section>

      {FEATURES.map((f, i) => <FeatureBlock key={f.id} f={f} flip={i % 2 === 1} />)}

      <Section kicker="Comparison" title="Compared with registers and general billing software">
        <div className="panel mt-10 overflow-x-auto rounded-xl">
          <table className="w-full min-w-[620px] text-left text-sm">
            <caption className="sr-only">Infovion JMS compared with paper registers and general billing software</caption>
            <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-400">
              <tr><th scope="col" className="px-5 py-3 font-semibold">Requirement</th><th scope="col" className="px-5 py-3 font-semibold">Paper and calculator</th><th scope="col" className="px-5 py-3 font-semibold">General billing software</th><th scope="col" className="px-5 py-3 font-semibold text-white">Infovion JMS</th></tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {COMPARISON.map(([k, a, b, c]) => (
                <tr key={k}>
                  <th scope="row" className="px-5 py-3.5 font-medium text-slate-200">{k}</th>
                  {[a, b, c].map((v, i) => (
                    <td key={i} className="px-5 py-3.5">{v === true ? <Check className="h-4 w-4 text-sky-300" aria-label="Yes" /> : v === false ? <Minus className="h-4 w-4 text-slate-600" aria-label="No" /> : <span className="text-xs text-slate-400">{v === "partial" ? "Partial" : "Manual register"}</span>}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section kicker="Suitable for" title="Who uses Infovion JMS">
        <div className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {[["Jewellery retailers", "From single-counter stores to family showrooms."], ["Gold and silver merchants", "Billing by weight, with purity recorded on every line."], ["Gold loan desks", "Pledges, interest and releases in one register."], ["Owners and staff", "Staff create bills; only the owner changes settings."], ["Any device", "Counter computer, laptop, tablet or phone."], ["Cloud backup", "Data is retained if a computer fails."], ["Private to each store", "A separate installation and database for every store."], ["International stores", "Currency, tax, purity standards and invoice language configured for your country."]].map(([t, b]) => (
            <div key={t} className="border-t border-white/15 pt-5">
              <h3 className="font-display font-semibold text-white">{t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="py-8">
        <div className="panel grid gap-8 rounded-xl p-7 sm:p-9 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold text-white">Product roadmap</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">Features currently in development, based on feedback from the stores using JMS.</p>
          </div>
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {["HUID tracked for each piece in stock", "Barcode tags and scan-to-bill", "Daily gold and silver rate board", "Due-date reminders for girvi customers", "Multi-branch stock for chains"].map((t) => <li key={t} className="flex gap-2.5 border-b border-white/10 py-3 text-sm text-slate-200"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-300" aria-hidden="true" />{t}</li>)}
          </ul>
        </div>
      </Section>

      <Section kicker="Further reading" title="Guides and case study" className="py-10">
        <div className="mt-8 grid border-t border-white/10 md:grid-cols-3 md:gap-x-10">
          <LinkRow to="/jewellery-billing-software" title="Jewellery billing software" body="How a jewellery bill is calculated, and how JMS calculates it." />
          <LinkRow to="/girvi-software" title="Girvi software" body="Managing a girvi register with interest, due dates and receipts." />
          <LinkRow to="/case-studies/jewellery-management-system" title="Case study" body="How JMS was developed with a jewellery store." />
        </div>
      </Section>

      <FaqList faqs={FAQ} />
      <CtaBand title="Request a demonstration of Infovion JMS" sub="We prepare a demonstration store with your items, rates and invoice format, and show billing, girvi and customer credit online or at your store." primary={["Request a demonstration", DEMO]} whatsappText={WA_TEXT} />
    </>
  );
}

// Landing pages

const LANDINGS = {
  "jewellery-billing-software": {
    title: "Jewellery Billing Software with GST | Making Charges, Purity and Old Gold | Infovion JMS",
    description: "Jewellery billing software that prices each item by weight, purity, rate per gram and making charges, adjusts old gold and advances, and produces GST invoices for print or PDF. Part of Infovion JMS.",
    trail: "Jewellery billing software",
    kicker: "Infovion JMS",
    h1: "Jewellery billing software",
    sub: "Weight and rate, purity, making charges, old gold, advances, discounts and GST calculated automatically, with invoices printed on A4 or shared as a PDF.",
    img: ["/product/jms/invoice", "Jewellery GST invoice generated by Infovion JMS", 1536, 1620],
    answerQ: "How is a jewellery bill calculated in India?",
    answer: "A jewellery bill starts with the metal value (net weight multiplied by the day's rate per gram for that purity), adds making charges (per gram or as a percentage) and any stone or other charges, deducts old gold taken in exchange, and applies GST. GST is 3% on the total value of the jewellery, including making charges, as stated in the CBIC FAQ on gems and jewellery. The invoice should show the weight, purity and rates for each item.",
    sections: [
      ["The calculation", [
        "Metal value = net weight (g) × rate per gram for the purity",
        "Making charges = net weight (g) × making charge per gram, or a percentage of metal value",
        "Taxable value = metal value + making charges + stone or other charges − discount shown on the invoice",
        "GST = 3% of the taxable value (CGST 1.5% + SGST 1.5% within a state)",
        "Amount payable = taxable value + GST − old gold − advance",
      ]],
      ["What JMS does", [
        "Fills in weight, purity and rate from stock",
        "Allows rate, purity and making charges to be changed on the bill",
        "Applies the discount before GST and deducts old gold and advances from the balance",
        "Shows the CGST and SGST split and your GSTIN on the invoice",
        "Records unpaid balances as customer credit",
        "Prints on A4 or creates a PDF to share",
        "Exports sales with CGST and SGST to Tally",
      ]],
    ],
    example: {
      caption: "Worked example: a 10 g, 22K chain",
      rows: [["Metal value", "10 g × ₹7,250", "₹72,500"], ["Making charges", "10 g × ₹600", "₹6,000"], ["Taxable value", "", "₹78,500"], ["GST 3% (CGST 1.5% + SGST 1.5%)", "", "₹2,355"], ["Invoice total", "", "₹80,855"]],
      note: "Rates are for illustration only. Use the day's rate for the purity sold.",
    },
    faqs: [
      ["What GST rate applies to gold jewellery?", "3% on the total transaction value of the jewellery, whether or not making charges are shown separately (CBIC sectoral FAQ on gems and jewellery). Job-work charges between businesses are taxed differently. Please confirm current rates and invoicing requirements with your accountant."],
      ["Should making charges be shown separately on the bill?", "Showing metal value and making charges separately is good practice, as customers can see what they are paying for. GST is charged on the total at the jewellery rate in either case."],
      ["Can non-GST estimates be created in JMS?", "Yes. GST can be switched off for a bill, for example when giving a customer an estimate."],
      ["Can the invoice be shared digitally?", "Yes. JMS creates an A4 PDF of the invoice that can be shared with the customer or printed."],
      ["Does JMS handle old gold exchange?", "Yes. Enter the weight and value of the old gold; JMS deducts it from the bill total and shows it on the invoice."],
    ],
    sources: [["CBIC: Sectoral FAQ on Gems and Jewellery", "https://gstcouncil.gov.in/sites/default/files/2024-02/sectoral-fq-gems-jewellery.pdf"]],
  },
  "girvi-software": {
    title: "Girvi Software for Jewellers | Gold Loan (Gahan) Management | Infovion JMS",
    description: "Girvi (gahan) software for jewellers: record each gold loan with item, weight, purity, amount, interest rate and due date, view overdue pledges, and release with a receipt. Part of Infovion JMS.",
    trail: "Girvi software",
    kicker: "Infovion JMS",
    h1: "Girvi software for jewellers",
    sub: "A digital girvi register that records the amount, interest and due date of every pledge and shows which pledges are overdue.",
    img: ["/product/jms/gahan", "Girvi register in Infovion JMS", 1800, 1125],
    answerQ: "What is girvi software?",
    answer: "Girvi software, also called gahan or gold loan software, records jewellery pledged against a loan: the customer, the item, its weight and purity, the amount lent, the interest rate, the pledge date and the due date. It tracks active, overdue and released pledges and produces receipts and reports, replacing the paper girvi register. Infovion JMS includes a girvi register alongside billing, customer credit and stock.",
    sections: [
      ["Recorded for each pledge", [
        "Customer name, mobile number and address",
        "Item, weight (g) and purity",
        "Amount lent and monthly interest rate",
        "Pledge date and due date",
        "Notes and a sequential record number",
      ]],
      ["Available in JMS", [
        "Active pledges and the total amount outstanding",
        "Overdue pledges highlighted",
        "Search by customer or item",
        "Interest to date on every pledge",
        "Release with principal and interest, with interest received recorded",
        "Girvi reports, Excel register and Tally export",
      ]],
    ],
    faqs: [
      ["What is the difference between girvi and gahan?", "Both terms refer to jewellery pledged as security for a loan. Girvi is the term commonly used in Hindi and gahan in Marathi."],
      ["Does JMS calculate girvi interest?", "Yes. JMS shows the simple interest accrued on every pledge to date, using a monthly rate counted by days, and on release shows the principal and interest due. The interest actually received is confirmed, recorded and exported to Tally as interest income. A minimum chargeable period can be configured for each store."],
      ["Is a licence required to provide gold loans?", "Money-lending in India is regulated by state money-lenders acts. Please check the licensing and record-keeping rules that apply in your state. JMS helps you maintain the required records."],
      ["Can a girvi receipt be printed?", "Yes. JMS prints a receipt with the pledge details, and a release receipt when the customer collects the item."],
    ],
  },
};

function JmsLanding({ k }) {
  const c = LANDINGS[k];
  const url = `${SITE}/${k}`;
  return (
    <>
      <Helmet>
        <title>{c.title}</title>
        <meta name="description" content={c.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={c.title} />
        <meta property="og:description" content={c.description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${SITE}/og-jms.jpg`} />
      </Helmet>
      <PageHero trail={[["Infovion JMS", "/jewellery-management-software"], [c.trail, `/${k}`]]} kicker={c.kicker} title={c.h1} sub={c.sub}
        aside={<BrowserFrame url="jms"><img src={`${c.img[0]}-900.webp`} srcSet={`${c.img[0]}-900.webp 900w, ${c.img[0]}.webp ${c.img[2]}w`} sizes="(min-width: 1024px) 520px, 92vw" alt={c.img[1]} width={c.img[2]} height={c.img[3]} className="block max-h-[460px] w-full object-cover object-top" fetchpriority="high" /></BrowserFrame>}>
        <GlowButton to={DEMO}>Request a demonstration <ArrowRight className="h-4 w-4" /></GlowButton>
        <GhostButton to="/jewellery-management-software">Infovion JMS overview</GhostButton>
      </PageHero>

      <Section className="pt-0"><AnswerBox q={c.answerQ}>{c.answer}</AnswerBox></Section>

      <Section className="pt-4">
        <div className="grid gap-6 lg:grid-cols-2">
          {c.sections.map(([t, items]) => (
            <div key={t} className="panel rounded-xl p-7">
              <h2 className="font-display text-xl font-semibold text-white">{t}</h2>
              <ul className="mt-5 space-y-2.5">{items.map((x) => <li key={x} className="flex gap-2.5 text-[15px] text-slate-200"><Check className="mt-1 h-4 w-4 flex-shrink-0 text-sky-300" aria-hidden="true" />{x}</li>)}</ul>
            </div>
          ))}
        </div>
        {c.example && (
          <div className="panel mt-6 overflow-hidden rounded-xl">
            <table className="w-full text-left text-sm">
              <caption className="border-b border-white/10 px-5 py-3 text-left font-display text-base font-semibold text-white">{c.example.caption}</caption>
              <tbody className="divide-y divide-white/10">
                {c.example.rows.map(([a, b, v]) => <tr key={a}><th scope="row" className="px-5 py-3 font-medium text-slate-200">{a}</th><td className="px-5 py-3 text-slate-400">{b}</td><td className="px-5 py-3 text-right font-semibold text-white">{v}</td></tr>)}
              </tbody>
            </table>
            <p className="border-t border-white/10 px-5 py-3 text-xs text-slate-400">{c.example.note}</p>
          </div>
        )}
        {c.sources && <p className="mt-4 text-xs text-slate-400">Source: {c.sources.map(([t, u]) => <a key={u} href={u} target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-300">{t}</a>)}</p>}
      </Section>

      <FaqList faqs={c.faqs} />
      <CtaBand title="Request a demonstration of Infovion JMS" sub="We prepare a demonstration with your items and rates and show billing, girvi and customer credit in about thirty minutes." primary={["Request a demonstration", DEMO]} whatsappText={WA_TEXT} />
    </>
  );
}

export const JmsBillingPage = () => <JmsLanding k="jewellery-billing-software" />;
export const GirviPage = () => <JmsLanding k="girvi-software" />;
