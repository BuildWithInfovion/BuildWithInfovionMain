import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight, BadgeIndianRupee, BookOpen, BookOpenCheck, Check, CloudCog, Coins, FileText, Globe2, HandCoins, Lock, MessageCircle, PackageSearch,
  Printer, Receipt, Scale, ShieldCheck, Smartphone, Sparkles, Store, Users, X,
} from "lucide-react";
import { BrowserFrame } from "../../components/product/Frames";
import { GhostButton, GlowButton, Reveal } from "../../components/fx/Fx";
import { AnswerBox, CtaBand, FaqList, PageHero, Section } from "../../components/site/Ui";
import { SITE, wa } from "../../Data/company";

const DEMO = "/contact?interest=jms";
const WA = wa("Hi! I'd like a demo of Infovion JMS for my jewellery store.");
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
  description: "Jewellery management software for jewellery stores: billing by weight, purity, rate per gram and making charges, old-gold exchange, GST invoices with CGST/SGST, girvi (gold loan) management, udhaar (customer credit) ledger, stock by piece or weight, and sales reports.",
  featureList: [
    "Jewellery billing by weight, purity and rate per gram", "Making charges per gram", "Old gold exchange and advance adjustment", "GST invoices with CGST and SGST",
    "A4 invoice printing and PDF sharing on WhatsApp", "Girvi / gahan (gold loan) register with interest and due dates", "Overdue pledge alerts and release receipts",
    "Udhaar (customer credit) ledger with payment history", "Stock by piece and by weight (bulk silver)", "Out-of-stock alerts", "Sales and girvi reports with PDF export", "Owner and staff roles",
    "HUID (hallmark unique ID) on invoice lines", "Girvi interest to date and release with interest received",
    "Tally export for the CA (TallyPrime XML: ledgers and vouchers)", "GST sales register and girvi register in Excel",
  ],
  screenshot: [`${SITE}/product/jms/dashboard.webp`, `${SITE}/product/jms/invoice.webp`, `${SITE}/product/jms/gahan.webp`, `${SITE}/product/jms/tally-export.webp`],
  author: { "@id": `${SITE}/#organization` },
  publisher: { "@id": `${SITE}/#organization` },
  areaServed: [{ "@type": "Country", name: "India" }, { "@type": "Place", name: "Worldwide" }],
};

const FEATURES = [
  {
    id: "billing", icon: Receipt, kicker: "Billing & GST invoices", title: "A correct jewellery bill", accent: "in under a minute.",
    body: "Pick the piece and JMS fills in its weight and rate. Adjust purity, rate per gram and making charge per gram on the bill; the discount comes off before GST, GST is charged on the full value with the CGST/SGST split, and old gold or an advance comes off the balance.",
    points: ["Weight × rate per gram for every line", "Purity per item: 22K (916), 18K (750), 925 silver…", "Making charges per gram", "HUID recorded on the invoice line", "Discount before GST, CGST/SGST shown", "Print on A4 or send as a PDF on WhatsApp"],
    img: ["/product/jms/invoice", "GST tax invoice in Infovion JMS with purity, weight, rate per gram, making charges and CGST/SGST", 1536, 1620],
  },
  {
    id: "girvi", icon: HandCoins, kicker: "Girvi / gahan", title: "Every gold loan,", accent: "tracked to the day.",
    body: "Record each pledge with the item, weight, purity, amount and interest rate. JMS shows the interest built up on every pledge to date, highlights what is overdue, and on release shows principal plus interest — and records the interest you actually received.",
    points: ["Interest to date on every pledge", "Release dialog: principal + interest to collect", "Overdue pledges highlighted", "Printed pledge receipts", "Girvi reports and Excel register"],
    img: ["/product/jms/gahan", "Girvi (gahan) register in Infovion JMS showing active pledges, amounts and due dates", 1800, 1125],
    link: ["/girvi-software", "More about girvi software"],
  },
  {
    id: "udhaar", icon: BookOpen, kicker: "Udhaar ledger", title: "Know who owes what —", accent: "without the diary.",
    body: "When a customer pays part of a bill, the balance becomes an udhaar record automatically. Add payments as they come in, by cash or UPI, and see the total outstanding at a glance.",
    points: ["Balances created from bills automatically", "Manual entries for older dues", "Part-payments with method and date", "Total due across all customers"],
    img: ["/product/jms/debt", "Udhaar (customer credit) ledger in Infovion JMS with amounts remaining", 1800, 1125],
  },
  {
    id: "stock", icon: PackageSearch, kicker: "Stock", title: "Stock by piece", accent: "and by weight.",
    body: "Track finished pieces by count and weight, and loose or bulk silver by weight alone. Stock reduces as you bill, and the dashboard warns you when something runs out.",
    points: ["Standard items and bulk-weight items", "Restock with added weight", "Out-of-stock alerts on the dashboard", "Category, purity and price per gram"],
    img: ["/product/jms/inventory", "Stock management in Infovion JMS with gold and silver items by weight", 1800, 1125],
  },
  {
    id: "reports", icon: FileText, kicker: "Reports", title: "Sales and pledges,", accent: "for any period.",
    body: "Search every invoice by number, customer or date, reopen and reprint it, and download reports as PDF for your accountant.",
    points: ["Sales by date range, customer or invoice", "Reprint or re-share any invoice", "Revenue and balance totals", "PDF export"],
    img: ["/product/jms/reports", "Sales reports in Infovion JMS with invoice totals and balances", 1800, 1125],
  },
  {
    id: "tally", icon: BookOpenCheck, kicker: "Tally export for your CA", title: "Your books, ready for Tally —", accent: "in two clicks.",
    body: "Pick a month or the financial year and download two files your CA imports straight into TallyPrime: the ledgers, and every voucher — sales with CGST/SGST, advances and udhaar receipts, girvi loans, releases and interest. Plus Excel registers for checking totals and filing GST returns.",
    points: ["TallyPrime XML: ledgers + vouchers", "Sales vouchers with CGST/SGST split", "Cash vs bank receipts kept separate", "Girvi loans, releases and interest income", "GST sales register in Excel", "Ledger names match your CA's books"],
    img: ["/product/jms/tally-export", "Export for your CA in Infovion JMS: Tally ledgers and vouchers, sales register and girvi register", 1800, 1125],
  },
];

const FAQ = [
  ["What is Infovion JMS?", "Infovion JMS is jewellery management software for jewellery stores. It handles billing by weight, purity and making charges, GST invoices, old-gold exchange, girvi (gold loans), udhaar (customer credit), stock and reports, and runs in any web browser."],
  ["Which is the best software for a jewellery shop?", "The right jewellery software prices each piece from its weight, purity, rate per gram and making charge; handles old-gold exchange and GST correctly; and keeps girvi, udhaar and stock in the same system so nothing is entered twice. Infovion JMS is built around exactly these jobs. Ask for a demo with your own items before you decide on any software."],
  ["Does Infovion JMS support GST billing?", "Yes. GST can be switched on for each bill, and the invoice shows the taxable value with the CGST and SGST split and your GSTIN. Non-GST estimates are also supported."],
  ["Can I manage girvi (gold loans) in JMS?", "Yes. JMS keeps a full girvi register — item, weight, purity, amount, interest rate, pledge date and due date — highlights overdue pledges, and prints a receipt on release."],
  ["Does Infovion JMS work with Tally?", "Yes. From Reports → Export for your CA, the owner downloads TallyPrime XML files — the ledgers, and all vouchers for the period (sales with CGST/SGST, advances and udhaar receipts, girvi loans, releases and interest) — which the CA imports through Tally's Import menu. Excel sales and girvi registers are included for checking totals and GST returns."],
  ["How is GST calculated on jewellery in JMS?", "GST is charged on the full value of the jewellery — metal value plus making charges, less any discount shown on the invoice — and split into CGST and SGST. The default is 3%, as the CBIC's FAQ on gems and jewellery states; the rates can be set to whatever your CA confirms."],
  ["Can I record HUID on the bill?", "Yes. Each invoice line has a HUID field for the piece's six-character hallmark unique ID, and it is printed on the invoice."],
  ["Do I need to install anything?", "No. JMS is a cloud web application that runs in any browser on a computer, tablet or phone. You need an internet connection; your data is backed up in the cloud."],
  ["Is my data safe?", "Each store has its own installation and database. Access is password-protected, staff accounts have limited rights, and only the owner can change settings or create users."],
  ["Can JMS be used outside India?", "Yes, as a customised deployment: we configure the currency, tax names and rates (such as VAT or sales tax), purity standards and invoice language for your country. Talk to us about your market."],
  ["How much does jewellery software cost?", "Simple GST billing apps can cost under ₹1,000 a year, while full jewellery ERPs cost much more. Infovion JMS is priced per store on a yearly plan, with setup and training included — book a demo and we'll quote for your counters and modules."],
];

function FeatureBlock({ f, flip }) {
  const I = f.icon;
  return (
    <section id={f.id} className="relative scroll-mt-28 py-16">
      <div className={`mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-amber-200/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-200"><I className="h-3.5 w-3.5" /> {f.kicker}</p>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl">{f.title} <span className="text-gradient-aurora">{f.accent}</span></h2>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-300">{f.body}</p>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">{f.points.map((p) => <li key={p} className="flex gap-2 text-sm text-slate-200"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-200" />{p}</li>)}</ul>
          {f.link && <Link to={f.link[0]} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300 hover:text-teal-200">{f.link[1]} <ArrowRight className="h-4 w-4" /></Link>}
        </Reveal>
        <Reveal delay={0.08}>
          <BrowserFrame url="jms · your store">
            <img src={`${f.img[0]}-900.webp`} srcSet={`${f.img[0]}-900.webp 900w, ${f.img[0]}.webp ${f.img[2]}w`} sizes="(min-width: 1024px) 560px, 92vw" alt={f.img[1]} width={f.img[2]} height={f.img[3]} loading="lazy" className={`block w-full ${f.id === "billing" ? "max-h-[520px] object-cover object-top" : ""}`} />
          </BrowserFrame>
        </Reveal>
      </div>
    </section>
  );
}

export function JmsHome() {
  return (
    <div className="bg-ink">
      <Helmet>
        <title>Jewellery Management Software — Billing, GST, Girvi & Stock | Infovion JMS</title>
        <meta name="description" content="Infovion JMS is jewellery management software for jewellery stores: billing by weight, purity and making charges, GST invoices, old-gold exchange, girvi (gold loan) management, udhaar ledger, stock and reports. Runs in any browser. Book a free demo." />
        <link rel="canonical" href={`${SITE}/jewellery-management-software`} />
        <meta property="og:title" content="Infovion JMS — jewellery management software" />
        <meta property="og:description" content="Billing by weight and purity, GST invoices, girvi, udhaar and stock — one simple system for jewellery stores." />
        <meta property="og:url" content={`${SITE}/jewellery-management-software`} />
        <meta property="og:image" content={`${SITE}/og-jms.jpg`} />
        <meta name="twitter:image" content={`${SITE}/og-jms.jpg`} />
        <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
      </Helmet>

      <PageHero trail={[["Products", "/products"], ["Infovion JMS", "/jewellery-management-software"]]} kicker="Infovion JMS · Jewellery management software"
        title="Jewellery software that bills by weight," accent="not by guesswork."
        sub="Billing with purity, rate per gram and making charges, GST invoices, girvi (gold loans), udhaar and stock — one simple system for jewellery stores. Runs in any browser; nothing to install."
        aside={
          <BrowserFrame url="jms · dashboard">
            <img src="/product/jms/dashboard-900.webp" srcSet="/product/jms/dashboard-900.webp 900w, /product/jms/dashboard.webp 1800w" sizes="(min-width: 1024px) 520px, 92vw" alt="Infovion JMS dashboard with today's revenue, sales this week and month, and out-of-stock alerts" width="1800" height="1125" className="block w-full" fetchpriority="high" />
          </BrowserFrame>
        }>
        <GlowButton to={DEMO}>Book a free demo <ArrowRight className="h-4 w-4" /></GlowButton>
        <GhostButton href={WA}><MessageCircle className="h-4 w-4" /> WhatsApp us</GhostButton>
      </PageHero>

      <section className="pb-4">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <ul className="flex flex-wrap gap-2">
            {["Billing by weight & purity", "Making charges", "Old gold exchange", "GST invoices", "HUID", "WhatsApp PDF", "Girvi / gahan", "Udhaar ledger", "Stock by weight", "Tally export"].map((t) => (
              <li key={t}><a href={`#${t.includes("Girvi") ? "girvi" : t.includes("Udhaar") ? "udhaar" : t.includes("Stock") ? "stock" : t.includes("Tally") ? "tally" : "billing"}`} className="block rounded-full border border-amber-200/20 bg-amber-200/[0.04] px-4 py-2 text-sm text-amber-50 hover:border-amber-200/50">{t}</a></li>
            ))}
          </ul>
          <div className="mt-10"><AnswerBox q="What is Infovion JMS?">{FAQ[0][1]}</AnswerBox></div>
        </div>
      </section>

      {FEATURES.map((f, i) => <FeatureBlock key={f.id} f={f} flip={i % 2 === 1} />)}

      <Section kicker="Why jewellers switch" title="Generic billing apps" accent="weren't built for gold.">
        <div className="mt-10 overflow-x-auto rounded-3xl border border-white/[0.08]">
          <table className="w-full min-w-[620px] text-left text-sm">
            <caption className="sr-only">Infovion JMS compared with paper registers and generic billing apps</caption>
            <thead className="bg-white/[0.04] text-xs uppercase tracking-wider text-slate-400">
              <tr><th scope="col" className="px-5 py-3">What you need</th><th scope="col" className="px-5 py-3">Paper & calculator</th><th scope="col" className="px-5 py-3">Generic billing app</th><th scope="col" className="px-5 py-3 text-amber-200">Infovion JMS</th></tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {[
                ["Price from weight, purity & rate per gram", false, "partial", true],
                ["Making charges per gram", false, false, true],
                ["Old-gold exchange on the same bill", false, false, true],
                ["GST invoice with CGST/SGST", false, true, true],
                ["Girvi register with due dates", "notebook", false, true],
                ["Udhaar with part-payments", "diary", "partial", true],
                ["Stock by weight", false, false, true],
                ["Tally export for the CA", false, "partial", true],
              ].map(([k, a, b, c]) => (
                <tr key={k}>
                  <th scope="row" className="px-5 py-3.5 font-medium text-slate-200">{k}</th>
                  {[a, b, c].map((v, i) => (
                    <td key={i} className="px-5 py-3.5">{v === true ? <Check className="h-5 w-5 text-teal-300" aria-label="Yes" /> : v === false ? <X className="h-5 w-5 text-slate-600" aria-label="No" /> : <span className="text-xs text-slate-400">{v}</span>}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section kicker="Built for" title="Made for the way" accent="jewellers work.">
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[[Store, "Retail jewellery stores", "Single counters to busy family showrooms."], [Coins, "Gold & silver merchants", "Billing by weight with purity on every line."], [HandCoins, "Girvi / gold-loan desks", "Pledges, interest and releases in one register."], [Users, "Owner + staff", "Staff bill; only the owner changes settings."]].map(([I, t, b]) => (
            <div key={t} className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6"><I className="h-5 w-5 text-amber-200" /><h3 className="mt-4 font-display font-bold text-white">{t}</h3><p className="mt-1.5 text-sm text-slate-400">{b}</p></div>
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[[Smartphone, "Any device", "Counter PC, laptop, tablet or the owner's phone."], [CloudCog, "Cloud backed up", "No data lost when a computer fails."], [Lock, "Private to your store", "Your own installation and database."]].map(([I, t, b]) => (
            <div key={t} className="glass flex gap-4 rounded-2xl p-5"><I className="h-5 w-5 flex-shrink-0 text-teal-300" /><div><p className="font-semibold text-white">{t}</p><p className="text-sm text-slate-400">{b}</p></div></div>
          ))}
        </div>
      </Section>

      <Section className="py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-indigo-400/[0.07] to-transparent p-7">
            <Globe2 className="h-6 w-6 text-indigo-300" />
            <h2 className="mt-4 font-display text-2xl font-bold text-white">Jewellery store outside India?</h2>
            <p className="mt-2 text-slate-300">We deploy JMS for your market — your currency, your tax (VAT or sales tax), karat and fineness standards, and invoices in your language. Gulf, UK, US and beyond: tell us how your store bills today.</p>
            <Link to={DEMO} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-200">Talk to us about your market <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7">
            <Sparkles className="h-6 w-6 text-amber-200" />
            <h2 className="mt-4 font-display text-2xl font-bold text-white">Coming next</h2>
            <ul className="mt-3 space-y-2 text-slate-300">
              {["HUID tracked per piece in stock (tag-level)", "Barcode tags and scan-to-bill", "Daily gold & silver rate board", "Due-date reminders for girvi customers", "Multi-branch stock for chains"].map((t) => <li key={t} className="flex gap-2 text-sm"><Scale className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-200" />{t}</li>)}
            </ul>
          </div>
        </div>
      </Section>

      <Section kicker="Guides" title="Learn more" className="py-10">
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[["/jewellery-billing-software", "Jewellery billing software", "How a jewellery bill is calculated — and how JMS does it for you.", Printer], ["/girvi-software", "Girvi (gold loan) software", "Run your girvi register with interest, due dates and receipts.", HandCoins], ["/case-studies/jewellery-management-system", "Case study", "How JMS was built with a jewellery store.", BadgeIndianRupee]].map(([to, t, b, I]) => (
            <Link key={to} to={to} className="group rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:border-amber-200/40">
              <I className="h-5 w-5 text-amber-200" /><h3 className="mt-4 font-display font-bold text-white">{t}</h3><p className="mt-1.5 text-sm text-slate-400">{b}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300">Read <ArrowRight className="h-4 w-4" /></span>
            </Link>
          ))}
        </div>
      </Section>

      <FaqList faqs={FAQ} title="Jewellery software" accent="questions" />
      <CtaBand title="See JMS with your own items." accent="Free demo." sub="We set up a demo store with your products, rates and invoice format, and walk you through billing, girvi and udhaar — online or at your store in Pune." primary={["Book a free demo", DEMO]} whatsappText="Hi! I'd like a demo of Infovion JMS for my jewellery store." />
    </div>
  );
}

// ── Landing pages ────────────────────────────────────────────────────────────

const LANDINGS = {
  "jewellery-billing-software": {
    title: "Jewellery Billing Software with GST — Making Charges, Purity & Old Gold | Infovion JMS",
    description: "Jewellery billing software that prices every piece by weight, purity, rate per gram and making charges, adjusts old gold and advances, and prints GST invoices or sends them on WhatsApp. Book a free demo.",
    trail: "Jewellery billing software",
    kicker: "Jewellery billing software",
    h1: "Jewellery billing software", accent: "that gets every bill right.",
    sub: "Weight × rate, purity, making charges, old gold, advance, discount and GST — calculated for you, printed on A4 or sent to the customer on WhatsApp.",
    img: ["/product/jms/invoice", "Jewellery GST invoice generated by Infovion JMS", 1536, 1620],
    answerQ: "How is a jewellery bill calculated in India?",
    answer: "A jewellery bill starts with the metal value (net weight × the day's rate per gram for that purity), adds making charges (per gram or as a percentage) and stone or other charges, subtracts any old gold taken in exchange, and applies GST — 3% on the total value of the jewellery, including making charges, as the CBIC's FAQ on gems and jewellery states. The invoice should show the weight, purity and rates for each item.",
    sections: [
      ["The formula", [
        "Metal value = net weight (g) × rate per gram for the purity",
        "Making charges = net weight (g) × making charge per gram (or a % of metal value)",
        "Taxable value = metal value + making charges + stone/other charges − discount shown on the invoice",
        "GST = 3% of the taxable value (CGST 1.5% + SGST 1.5% within a state)",
        "Amount payable = taxable value + GST − old gold − advance",
      ]],
      ["What JMS does for you", [
        "Fills in weight, purity and rate from your stock",
        "Lets you change rate, purity and making charges on the bill",
        "Applies the discount before GST and deducts old gold and advance from the balance",
        "Shows the CGST/SGST split and your GSTIN on the invoice",
        "Turns unpaid balances into udhaar records",
        "Prints on A4 or shares a PDF on WhatsApp",
        "Exports sales with CGST/SGST to Tally for your CA",
      ]],
    ],
    example: {
      caption: "Worked example: a 10 g, 22K chain",
      rows: [["Metal value", "10 g × ₹7,250", "₹72,500"], ["Making charges", "10 g × ₹600", "₹6,000"], ["Taxable value", "", "₹78,500"], ["GST 3% (CGST 1.5% + SGST 1.5%)", "", "₹2,355"], ["Invoice total", "", "₹80,855"]],
      note: "Rates are for illustration only. Use the day's rate for the purity sold.",
    },
    faqs: [
      ["What GST rate applies to gold jewellery?", "3% on the total transaction value of the jewellery, whether or not making charges are shown separately (CBIC sectoral FAQ on gems and jewellery). Job-work charges between businesses are taxed differently. Confirm current rates and your invoicing with your CA."],
      ["Should making charges be shown separately on the bill?", "Showing metal value and making charges separately is good practice — customers can see exactly what they pay for — but GST is charged on the total at the jewellery rate either way."],
      ["Can I make non-GST estimates in JMS?", "Yes. GST can be switched off for a bill, for example when giving a customer an estimate."],
      ["Can I send the invoice on WhatsApp?", "Yes. JMS creates an A4 PDF of the invoice that you can share on WhatsApp in one tap, or print."],
      ["Does JMS handle old gold exchange?", "Yes. Enter the old gold weight and its value; JMS deducts it from the bill total and shows it on the invoice."],
    ],
    sources: [["CBIC — Sectoral FAQ: Gems and Jewellery", "https://gstcouncil.gov.in/sites/default/files/2024-02/sectoral-fq-gems-jewellery.pdf"]],
  },
  "girvi-software": {
    title: "Girvi Software for Jewellers — Gold Loan (Gahan) Management | Infovion JMS",
    description: "Girvi (gahan) software for jewellers: record every gold loan with item, weight, purity, amount, interest rate and due date; see overdue pledges; release with a receipt; girvi reports. Part of Infovion JMS.",
    trail: "Girvi software",
    kicker: "Girvi / gahan software",
    h1: "Girvi software for jewellers —", accent: "every pledge, on time.",
    sub: "Replace the girvi notebook with a register that knows every pledge's amount, interest and due date, and tells you which are overdue.",
    img: ["/product/jms/gahan", "Girvi (gahan) register in Infovion JMS", 1800, 1125],
    answerQ: "What is girvi software?",
    answer: "Girvi software (also called gahan or gold loan software) records jewellery pledged against a loan: the customer, the item, its weight and purity, the amount given, the interest rate, the pledge date and the due date. It tracks active, overdue and released pledges and produces receipts and reports, replacing the paper girvi register. Infovion JMS includes a girvi register alongside billing, udhaar and stock.",
    sections: [
      ["What JMS records for each pledge", [
        "Customer name, mobile and address",
        "Item, weight (g) and purity",
        "Amount given and monthly interest rate",
        "Pledge date and due date",
        "Notes, and a running record number",
      ]],
      ["What you can see and do", [
        "Active pledges and the total amount out",
        "Overdue pledges highlighted in red",
        "Search by customer or item name",
        "Interest to date on every pledge",
        "Release with principal + interest, interest received recorded",
        "Girvi reports, Excel register and Tally export",
      ]],
    ],
    faqs: [
      ["What is the difference between girvi and gahan?", "They mean the same thing — jewellery pledged as security for a loan. 'Girvi' is common in Hindi-speaking regions and 'gahan' in Marathi."],
      ["Does JMS calculate girvi interest?", "Yes. JMS shows the simple interest built up on every pledge to date (monthly rate, counted by days) and, on release, the principal plus interest to collect. You confirm the interest actually received, and it is recorded and exported to Tally as interest income. A minimum chargeable period can be set for your store."],
      ["Do I need a licence to give gold loans?", "Money-lending is regulated by state money-lenders acts in India. Check the licence and record-keeping rules that apply in your state; JMS helps you keep the records."],
      ["Can I print a girvi receipt?", "Yes. JMS prints a receipt with the pledge details, and a release receipt when the customer takes the item back."],
    ],
  },
};

function JmsLanding({ k }) {
  const c = LANDINGS[k];
  const url = `${SITE}/${k}`;
  return (
    <div className="bg-ink">
      <Helmet>
        <title>{c.title}</title>
        <meta name="description" content={c.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={c.title} />
        <meta property="og:description" content={c.description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${SITE}/og-jms.jpg`} />
      </Helmet>
      <PageHero trail={[["Infovion JMS", "/jewellery-management-software"], [c.trail, `/${k}`]]} kicker={c.kicker} title={c.h1} accent={c.accent} sub={c.sub}
        aside={<BrowserFrame url="jms · your store"><img src={`${c.img[0]}-900.webp`} srcSet={`${c.img[0]}-900.webp 900w, ${c.img[0]}.webp ${c.img[2]}w`} sizes="(min-width: 1024px) 520px, 92vw" alt={c.img[1]} width={c.img[2]} height={c.img[3]} className="block max-h-[460px] w-full object-cover object-top" fetchpriority="high" /></BrowserFrame>}>
        <GlowButton to={DEMO}>Book a free demo <ArrowRight className="h-4 w-4" /></GlowButton>
        <GhostButton to="/jewellery-management-software">See all of JMS</GhostButton>
      </PageHero>

      <Section className="pt-2"><AnswerBox q={c.answerQ}>{c.answer}</AnswerBox></Section>

      <Section className="pt-4">
        <div className="grid gap-6 lg:grid-cols-2">
          {c.sections.map(([t, items]) => (
            <div key={t} className="glass rounded-3xl p-7">
              <h2 className="font-display text-xl font-bold text-white">{t}</h2>
              <ul className="mt-5 space-y-2.5">{items.map((x) => <li key={x} className="flex gap-2.5 text-[15px] text-slate-200"><ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-200" />{x}</li>)}</ul>
            </div>
          ))}
        </div>
        {c.example && (
          <div className="mt-6 overflow-hidden rounded-3xl border border-white/[0.08]">
            <table className="w-full text-left text-sm">
              <caption className="bg-white/[0.04] px-5 py-3 text-left font-display text-base font-bold text-white">{c.example.caption}</caption>
              <tbody className="divide-y divide-white/[0.06]">
                {c.example.rows.map(([a, b, v]) => <tr key={a}><th scope="row" className="px-5 py-3 font-medium text-slate-200">{a}</th><td className="px-5 py-3 text-slate-400">{b}</td><td className="px-5 py-3 text-right font-semibold text-white">{v}</td></tr>)}
              </tbody>
            </table>
            <p className="border-t border-white/[0.06] px-5 py-3 text-xs text-slate-500">{c.example.note}</p>
          </div>
        )}
        {c.sources && <p className="mt-4 text-xs text-slate-500">Source: {c.sources.map(([t, u]) => <a key={u} href={u} target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-300">{t}</a>)}</p>}
      </Section>

      <FaqList faqs={c.faqs} />
      <CtaBand title="Try it with your own items." accent="Free demo." sub="We set up a demo with your products and rates and show you billing, girvi and udhaar in 30 minutes." primary={["Book a free demo", DEMO]} whatsappText="Hi! I'd like a demo of Infovion JMS for my jewellery store." />
    </div>
  );
}

export const JmsBillingPage = () => <JmsLanding k="jewellery-billing-software" />;
export const GirviPage = () => <JmsLanding k="girvi-software" />;
