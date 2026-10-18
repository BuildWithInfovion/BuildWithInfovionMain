import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Minus, MonitorPlay } from "lucide-react";
import { BrowserFrame } from "../../components/product/Frames";
import { GhostButton, GlowButton, Kicker, Reveal } from "../../components/fx/Fx";
import { AnswerBox, CtaBand, FaqList, LinkRow, PageHero, Section } from "../../components/site/Ui";
import { JMS, SITE, jmsTrial } from "../../Data/company";

const [TRIAL_HREF, TRIAL_LABEL] = jmsTrial();

const ID = `${SITE}/jewellery-management-software#software`;
const PRICE = `₹${JMS.price.toLocaleString("en-IN")}`;

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": ID,
  name: "Infovion JMS",
  alternateName: ["Infovion Jewellery Management Software", "Infovion jewellery billing software", "Infovion jewellery barcode software", "Infovion girvi software"],
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Jewellery management software",
  operatingSystem: "Any web browser (Windows, macOS, Android, iOS)",
  url: `${SITE}/jewellery-management-software`,
  ...(JMS.live ? { installUrl: JMS.signup } : {}),
  description:
    "Jewellery management software for jewellery shops in India and worldwide: billing by weight, purity, rate per gram and making charges; barcode and QR tags with scanning and stock audit; GST (CGST/SGST/IGST) or VAT invoices; old-gold exchange; girvi (gold loan) management; customer credit; reports and Tally export.",
  featureList: [
    "Jewellery billing by weight, purity and rate per gram",
    "Making charges per gram, as a percentage or per piece",
    "Barcode (Code 128) and QR jewellery tags, printed on 100×15 mm and similar tag rolls",
    "Billing by scanning tags with a USB or Bluetooth scanner or a phone camera",
    "Stock audit by scanning every tag",
    "Daily gold and silver rates by purity",
    "GST invoices with CGST and SGST or IGST; VAT for other countries",
    "HUID on tags and invoice lines",
    "Old gold exchange and split payments",
    "Girvi (gahan) register with interest to date, part-payments and release",
    "Customer credit (udhaar) ledger with payments",
    "Tally export: TallyPrime XML ledgers and vouchers",
    "Sales, girvi and stock registers for Excel",
    "Owner and staff accounts with an activity log",
  ],
  screenshot: [`${SITE}/product/jms/billing.webp`, `${SITE}/product/jms/tags.webp`, `${SITE}/product/jms/audit.webp`, `${SITE}/product/jms/invoice.webp`],
  offers: { "@type": "Offer", price: String(JMS.price), priceCurrency: "INR", description: "Per shop per year, plus GST. 30-day free trial.", url: `${SITE}/jewellery-management-software#pricing` },
  author: { "@id": `${SITE}/#organization` },
  publisher: { "@id": `${SITE}/#organization` },
  areaServed: [{ "@type": "Country", name: "India" }, { "@type": "Country", name: "United Arab Emirates" }, { "@type": "Place", name: "Worldwide" }],
};

const FEATURES = [
  {
    id: "billing",
    kicker: "Billing",
    title: "Scan, check and bill",
    body: "Scan the tag and the piece is on the bill with its weight, purity, making charge and today's rate. Adjust anything on the counter, take old gold in exchange, split the payment between cash, UPI and card, and leave a balance on the customer's account. The invoice prints on A4, A5 or an 80 mm roll, or goes to the customer as a PDF.",
    points: ["Weight × rate per gram for every line", "Making charges per gram, % or per piece", "Stone and other charges", "GST with CGST and SGST, or IGST", "HUID on every invoice line", "Discount before tax, old gold, split payments"],
    img: ["/product/jms/billing", "New bill in Infovion JMS with three scanned items, weights, rates and making charges"],
  },
  {
    id: "tags",
    kicker: "Barcode tags",
    title: "Tag every piece",
    body: "Weigh a tray of new pieces, enter the weights once, and print a barcode or QR tag for each one on a thermal tag printer or on A4 label sheets. The tag carries the tag number, weight, purity and HUID, folded back to back on a jewellery tag.",
    points: ["Jewellery tags 100 × 15, 100 × 13, 95 × 12 and 81 × 12 mm", "Stickers and A4 label sheets", "Code 128 barcode or QR code", "Works through the printer's own driver (TSC, Zebra, Argox and others)", "Test print and alignment for each printer"],
    img: ["/product/jms/tags", "Print tags screen in Infovion JMS with a preview of a jewellery barcode tag"],
    link: ["/jewellery-barcode-software", "Barcode tagging in detail"],
  },
  {
    id: "audit",
    kicker: "Stock audit",
    title: "Count the showroom in minutes",
    body: "Start an audit and scan every tag in the counters and lockers. JMS shows what has been found, what is still missing, any tag that was already sold, and tags it doesn't recognise. The result is saved for the records.",
    points: ["Scanner or phone camera", "Missing pieces listed with their location", "Sold and unknown tags flagged", "Missing list exported to Excel"],
    img: ["/product/jms/audit", "Stock audit in Infovion JMS showing items found, not yet scanned and tags with problems"],
  },
  {
    id: "girvi",
    kicker: "Girvi",
    title: "Gold loans, worked out to the day",
    body: "Record each pledge with the item, weight, purity, amount and monthly interest. JMS shows the interest to date on every pledge, accepts interest and part-principal payments, highlights pledges past their due date and prints the pledge and release receipts.",
    points: ["Simple monthly interest counted by days", "Minimum interest period if you charge one", "Interest and part-principal payments", "Release with the interest actually received", "Girvi register for Excel"],
    img: ["/product/jms/gahan", "Girvi register in Infovion JMS with active pledges, amounts and interest due"],
    link: ["/girvi-software", "More about girvi management"],
  },
  {
    id: "credit",
    kicker: "Customer credit",
    title: "Every balance, every payment",
    body: "A balance left on a bill becomes the customer's credit automatically. Older dues from the register can be added by hand. Payments are recorded by method and date, and the customer's history shows purchases, credit and girvi together.",
    points: ["Balances from bills created automatically", "Older dues added by hand", "Payments by cash, UPI, card, transfer or cheque", "Customer history in one place"],
    img: ["/product/jms/debt", "Customer credit list in Infovion JMS with amounts due"],
  },
  {
    id: "tally",
    kicker: "Accounts",
    title: "Books ready for the accountant",
    body: "For any month or financial year, download two files for TallyPrime: the ledgers, and every voucher (sales with tax, receipts, old gold, girvi loans and interest). Sales, girvi and stock registers open in Excel, and a full backup of the shop is one click.",
    points: ["TallyPrime XML: ledgers and vouchers", "Ledger names matched to the accountant's books", "Sales register with taxable value, tax, HSN and HUID", "Full backup of the shop's data"],
    img: ["/product/jms/tally-export", "Exports for accounts in Infovion JMS: Tally files, Excel registers and full backup"],
  },
];

const COMPARISON = [
  ["Pricing from weight, purity and rate per gram", false, "partial", true],
  ["Barcode tags and billing by scanning", false, "partial", true],
  ["Stock audit by scanning", false, false, true],
  ["Making charges per gram, % or per piece", false, false, true],
  ["Old-gold exchange on the same bill", false, false, true],
  ["GST invoice with CGST/SGST or IGST", false, true, true],
  ["Girvi register with interest to date", "register", false, true],
  ["Customer credit with part-payments", "register", "partial", true],
  ["Tally export", false, "partial", true],
];

const COUNTRIES = [
  ["India", "INR · GST with CGST/SGST or IGST · 24K to 14K · rates per 10 g and per kg · April financial year"],
  ["United Arab Emirates, Oman and Bahrain", "AED, OMR, BHD · VAT tax invoices · 24K, 22K, 21K, 18K · TRN on invoices"],
  ["Qatar and Kuwait", "QAR, KWD · no VAT · Gulf purities"],
  ["United Kingdom", "GBP · VAT · 9ct to 24ct, 925 silver"],
  ["United States and Canada", "USD, CAD · sales tax or GST/HST · 10K to 24K"],
  ["Singapore and Australia", "SGD, AUD · GST · 916, 999 or karat purities"],
  ["Anywhere else", "Choose the currency, tax name and rates, purities, rate unit (gram, tola, troy ounce) and financial year"],
];

const FAQ = [
  ["What is Infovion JMS?", "Infovion JMS is jewellery management software for jewellery shops. It covers billing by weight, purity and making charges, barcode tags and scanning, stock audit, GST or VAT invoices, old-gold exchange, girvi (gold loans), customer credit, reports and export to Tally. It runs in a web browser, so there is nothing to install."],
  ["How much does Infovion JMS cost?", `${PRICE} per shop per year, plus GST, after a free ${JMS.trialDays}-day trial. That includes every feature, unlimited staff accounts, invoices, tags and girvi records, and help with setup and importing your stock. For shops outside India we quote in your currency.`],
  ["Does JMS support barcode tags?", "Yes. JMS gives every piece a tag number and prints barcode (Code 128) or QR tags on thermal tag printers such as TSC, Zebra and Argox, through the printer's driver, or on A4 label sheets. Pieces are billed by scanning the tag with a USB or Bluetooth scanner or a phone camera, and the whole stock can be audited by scanning."],
  ["Which tag sizes and printers work?", "Common jewellery tag rolls of 100 × 15 mm, 100 × 13 mm, 95 × 12 mm and 81 × 12 mm, stickers of 50 × 25 and 38 × 25 mm, and A4 label sheets, plus a custom size. Any label printer with a Windows or macOS driver works, for example TSC TE244, Zebra ZD230 or Argox OS-214. A test print and alignment settings help match each printer."],
  ["Does Infovion JMS work with Tally?", "Yes. The owner downloads TallyPrime XML files for any period: the ledgers, and all vouchers including sales with tax, receipts, old gold taken in exchange, girvi loans and interest. The accountant imports them through Tally's Import menu. Ledger names can be set to match the accountant's books."],
  ["How is GST calculated on jewellery in JMS?", "GST is charged on the full value of the jewellery, that is metal, making charges and stones, less any discount shown on the invoice, and split into CGST and SGST, or charged as IGST for an inter-state sale. The default is 3%, in line with the CBIC FAQ on gems and jewellery, and the rates can be changed to what your accountant confirms."],
  ["Can JMS be used outside India?", "Yes. When you sign up, choose your country and JMS sets the currency, tax (VAT, GST or none), purities, rate units and financial year. Everything can be changed in Settings. Invoices can carry your tax registration number, such as a TRN in the UAE."],
  ["Is my shop's data kept separate and safe?", "Each shop's data is kept separate from every other shop's and is visible only to that shop's accounts. Staff accounts have limited permissions, every important change is recorded in an activity log, and the owner can download a full backup at any time. If a plan ends, the data is not deleted: the shop can still view and export it."],
  ["Can I bring my existing stock and records?", "Yes. Stock can be imported from an Excel sheet saved as CSV, and older customer dues can be entered as opening balances. Shops moving from the earlier single-shop version of JMS can have all their records moved across by our team."],
  ["Do I need to install anything?", "No. JMS runs in Chrome, Edge or Safari on a counter computer, laptop, tablet or phone, and can be added to the home screen like an app. It needs an internet connection."],
];

function FeatureBlock({ f, flip }) {
  return (
    <section id={f.id} className="relative scroll-mt-28 py-14 sm:py-16">
      <div className={`mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_1.1fr] ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <Reveal>
          <Kicker>{f.kicker}</Kicker>
          <h2 className="mt-4 font-display text-[1.9rem] font-bold leading-[1.15] tracking-tight text-white sm:text-[2.3rem]">{f.title}</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-300">{f.body}</p>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {f.points.map((p) => (
              <li key={p} className="flex gap-2.5 text-sm text-slate-200">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-300" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          {f.link && (
            <Link to={f.link[0]} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200">
              {f.link[1]} <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </Reveal>
        <Reveal delay={0.08}>
          <BrowserFrame url="jms.infovion.in">
            <img src={`${f.img[0]}-900.webp`} srcSet={`${f.img[0]}-900.webp 900w, ${f.img[0]}.webp 1800w`} sizes="(min-width: 1024px) 600px, 92vw" alt={f.img[1]} width="1800" height="1125" loading="lazy" className="block w-full" />
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
        <title>Jewellery Management Software, Billing and Girvi | Infovion JMS</title>
        <meta name="description" content={`Jewellery management software for shops in India and abroad: billing by weight and purity, barcode tags, girvi, credit, GST or VAT invoices. ${PRICE} a year.`} />
        <link rel="canonical" href={`${SITE}/jewellery-management-software`} />
        <meta property="og:title" content="Infovion JMS | Jewellery Management Software" />
        <meta property="og:description" content="Billing by weight and purity, barcode tags, stock audit, girvi, customer credit and Tally export for jewellery shops in India and worldwide." />
        <meta property="og:url" content={`${SITE}/jewellery-management-software`} />
        <meta property="og:image" content={`${SITE}/og-jms.jpg`} />
        <meta name="twitter:image" content={`${SITE}/og-jms.jpg`} />
        <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
      </Helmet>

      <PageHero
        trail={[["Products", "/products"], ["Infovion JMS", "/jewellery-management-software"]]}
        kicker="Infovion JMS"
        title="Jewellery management software"
        sub={`Billing by weight and purity, barcode tags, stock audit, girvi, customer credit and Tally export, for jewellery shops in India and worldwide. It runs in a web browser. Free for ${JMS.trialDays} days, then ${PRICE} a year per shop.`}
        aside={
          <BrowserFrame url="jms.infovion.in">
            <img src="/product/jms/billing-900.webp" srcSet="/product/jms/billing-900.webp 900w, /product/jms/billing.webp 1800w" sizes="(min-width: 1024px) 520px, 92vw" alt="New bill in Infovion JMS with scanned pieces, weights, rates and making charges" width="1800" height="1125" className="block w-full" fetchpriority="high" />
          </BrowserFrame>
        }
      >
        <GlowButton {...(JMS.live ? { href: TRIAL_HREF } : { to: TRIAL_HREF })}>
          {TRIAL_LABEL} <ArrowRight className="h-4 w-4" />
        </GlowButton>
        {JMS.live && (
          <GhostButton href={JMS.demo}>
            <MonitorPlay className="h-4 w-4" /> Open the demo shop
          </GhostButton>
        )}
      </PageHero>

      <section className="pb-4">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <nav aria-label="Features on this page" className="flex flex-wrap gap-x-6 gap-y-3 border-y border-white/10 py-5">
            {[...FEATURES.map((f) => [f.id, f.kicker]), ["worldwide", "Worldwide"], ["pricing", "Pricing"]].map(([id, label]) => (
              <a key={id} href={`#${id}`} className="text-sm text-slate-300 underline-offset-4 hover:text-white hover:underline">
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-10">
            <AnswerBox q="Overview">{FAQ[0][1]}</AnswerBox>
          </div>
        </div>
      </section>

      {FEATURES.map((f, i) => (
        <FeatureBlock key={f.id} f={f} flip={i % 2 === 1} />
      ))}

      <Section id="worldwide" kicker="Worldwide" title="Set up for your country"
        sub="Choose your country when you sign up. JMS sets the currency, tax, purities, rate units and financial year to match, and each can be changed in Settings. Confirm tax rates with your accountant.">
        <dl className="mt-10 border-t border-white/10">
          {COUNTRIES.map(([k, v]) => (
            <div key={k} className="grid gap-2 border-b border-white/10 py-4 sm:grid-cols-[18rem_1fr]">
              <dt className="font-display font-semibold text-white">{k}</dt>
              <dd className="text-[15px] text-slate-300">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-slate-400">Invoices can also carry Marathi or Hindi labels next to English, for shops whose customers prefer them.</p>
      </Section>

      <Section id="pricing" kicker="Pricing" title="One plan, everything included">
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="panel rounded-xl p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-300">Infovion JMS</p>
            <p className="mt-4 font-display text-5xl font-bold text-white">
              {PRICE}
              <span className="ml-2 text-base font-normal text-slate-400">per shop per year, plus GST</span>
            </p>
            <p className="mt-3 text-slate-300">Start with a free {JMS.trialDays}-day trial. No card needed. Your data stays yours and can be exported at any time.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <GlowButton {...(JMS.live ? { href: TRIAL_HREF } : { to: TRIAL_HREF })}>
                {TRIAL_LABEL} <ArrowRight className="h-4 w-4" />
              </GlowButton>
              {JMS.live && <GhostButton to="/contact?interest=jms">Talk to us</GhostButton>}
            </div>
            <p className="mt-5 text-sm text-slate-400">Outside India, we quote in your currency. Groups of shops and chains: ask about a group price.</p>
          </div>
          <ul className="grid content-start gap-x-8 sm:grid-cols-2">
            {[
              "Billing, invoices and customer history",
              "Barcode and QR tags, scanning, stock audit",
              "Girvi and customer credit",
              "Daily metal rates",
              "GST or VAT, HUID",
              "Tally export, Excel registers, full backup",
              "Unlimited staff accounts",
              "Unlimited invoices, tags and girvi records",
              "Help with setup and importing stock",
              "Updates and new features included",
            ].map((t) => (
              <li key={t} className="flex gap-2.5 border-b border-white/10 py-3 text-sm text-slate-200">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-300" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section kicker="Comparison" title="Compared with registers and general billing software">
        <div className="panel mt-10 overflow-x-auto rounded-xl">
          <table className="w-full min-w-[620px] text-left text-sm">
            <caption className="sr-only">Infovion JMS compared with paper registers and general billing software</caption>
            <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">Requirement</th>
                <th scope="col" className="px-5 py-3 font-semibold">Paper and calculator</th>
                <th scope="col" className="px-5 py-3 font-semibold">General billing software</th>
                <th scope="col" className="px-5 py-3 font-semibold text-white">Infovion JMS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {COMPARISON.map(([k, a, b, c]) => (
                <tr key={k}>
                  <th scope="row" className="px-5 py-3.5 font-medium text-slate-200">{k}</th>
                  {[a, b, c].map((v, i) => (
                    <td key={i} className="px-5 py-3.5">
                      {v === true ? <Check className="h-4 w-4 text-sky-300" aria-label="Yes" /> : v === false ? <Minus className="h-4 w-4 text-slate-600" aria-label="No" /> : <span className="text-xs text-slate-400">{v === "partial" ? "Partial" : "Manual register"}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section kicker="Suitable for" title="Who uses Infovion JMS">
        <div className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Jewellery retailers", "From single-counter shops to family showrooms."],
            ["Gold and silver merchants", "Billing by weight, with purity on every line."],
            ["Gold loan desks", "Pledges, interest and releases in one register."],
            ["Owners and staff", "Staff bill and tag; owners see reports and change settings."],
            ["Any device", "Counter computer, laptop, tablet or phone."],
            ["Shops with many pieces", "Tags, scanning and stock audits keep the count right."],
            ["Shops abroad", "UAE and the Gulf, UK, US and beyond, in local currency and tax."],
            ["Moving from paper or old software", "Stock imports from Excel; opening dues are entered once."],
          ].map(([t, b]) => (
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
            <p className="mt-2 text-sm leading-relaxed text-slate-400">Next on the list, based on what jewellers ask for.</p>
          </div>
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {["Custom orders with advances", "Karigar (job work) issue and receipt", "Gold savings schemes", "Multi-branch stock for chains", "Due-date reminders on WhatsApp", "RFID tag support"].map((t) => (
              <li key={t} className="flex gap-2.5 border-b border-white/10 py-3 text-sm text-slate-200">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-300" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section kicker="Further reading" title="Guides and case study" className="py-10">
        <div className="mt-8 grid border-t border-white/10 md:grid-cols-2 md:gap-x-10">
          <LinkRow to="/jewellery-barcode-software" title="Jewellery barcode software" body="Tagging, tag printers and sizes, scanning and stock audits." />
          <LinkRow to="/jewellery-billing-software" title="Jewellery billing software" body="How a jewellery bill is calculated, and how JMS calculates it." />
          <LinkRow to="/girvi-software" title="Girvi software" body="Managing a girvi register with interest, due dates and receipts." />
          <LinkRow to="/jewellery-software-uae" title="Jewellery software in the UAE" body="AED rates, 5% VAT tax invoices with TRN, and Gulf karats for Dubai and beyond." />
          <LinkRow to="/case-studies/jewellery-management-system" title="Case study" body="How JMS was developed with a jewellery shop in Maharashtra." />
        </div>
      </Section>

      <FaqList faqs={FAQ} />
      <CtaBand title="Try Infovion JMS free for 30 days" sub={JMS.live ? "Create your shop in a minute, set today's rates, add a few pieces and make a bill. Or open the demo shop to look around first." : "Tell us about your shop and we will set up your trial and help you import your stock."} primary={[TRIAL_LABEL, TRIAL_HREF]} whatsappText="Hello Infovion, I would like to know more about Infovion JMS for our jewellery shop." />
    </>
  );
}

// Landing pages

const LANDINGS = {
  "jewellery-software-uae": {
    title: "Jewellery Software in UAE & Dubai: AED, VAT, TRN | Infovion JMS",
    description: "Jewellery software for shops in Dubai and across the UAE: billing by weight and karat in AED, 5% VAT tax invoices with your TRN, barcode tags, stock audit.",
    trail: "Jewellery software UAE",
    kicker: "Infovion JMS · United Arab Emirates",
    h1: "Jewellery software for shops in the UAE",
    sub: "Bill by weight and karat in dirhams, print VAT tax invoices with your TRN, tag every piece with a barcode and count the showroom by scanning. For a gold souk counter in Deira or a mall showroom in Abu Dhabi, with nothing to install.",
    img: ["/product/jms/uae-invoice", "VAT tax invoice in AED from Infovion JMS for a Dubai jewellery shop, showing the TRN, 21K and 18K items, making charges and 5% VAT"],
    answerQ: "How is VAT charged on gold jewellery in the UAE?",
    answer: "In the UAE, a retail sale of gold or diamond jewellery is charged VAT at 5% on the full value of the piece: the metal value, the making charges and any stones. Investment-grade gold of 99% purity or more can be zero-rated, and sales between VAT-registered dealers who buy for resale fall under the reverse charge, where the buyer accounts for the VAT instead of the seller. A VAT-registered jeweller issues a tax invoice showing the shop's TRN, the date, a sequential number, the value before tax, the VAT and the total in AED. Infovion JMS works out the metal value from weight and karat, adds making and stone charges, applies 5% VAT and prints the tax invoice with your TRN.",
    sections: [
      ["Set up for UAE shops", ["Prices in AED, with rates per gram for 24K, 22K, 21K and 18K gold, 999 and 925 silver and 950 platinum", "VAT at 5% on metal, making and stones; VAT can be switched off for a bill when it does not apply", "Tax invoice with your TRN, and the customer's TRN for business buyers", "Invoices numbered 0001, 0002 and onwards, on a January to December year by default", "UAE mobile numbers, and Gulf Standard Time on every bill and report", "Tax rates, purities, invoice wording and numbering can all be changed in Settings"]],
      ["At the counter", ["Scan a tag and the piece is added with its weight, karat and today's rate", "Making charges per gram, as a percentage or as a fixed amount per piece", "Stone weight and stone charges for diamond and gem-set pieces", "Old gold taken in exchange, deducted on the same bill", "Card, cash and bank transfer on one bill, with any balance kept as customer credit", "Invoice printed on A4, A5 or an 80 mm roll, or sent as a PDF on WhatsApp"]],
      ["Not supported yet", ["Arabic or bilingual invoices", "Tax-free tags for the tourist VAT refund scheme", "Reverse-charge wording on dealer-to-dealer invoices: VAT can be switched off for the bill, but the note has to be added by hand", "Sending e-invoices through an Accredited Service Provider. The UAE e-invoicing mandate covers business-to-business invoices and applies to most jewellers from July 2027"], true],
    ],
    example: {
      caption: "Worked example: an 18.42 g, 21K bangle in Dubai",
      rows: [["Metal value", "18.42 g × AED 374.25", "AED 6,893.69"], ["Making charges", "18.42 g × AED 22", "AED 405.24"], ["Taxable value", "", "AED 7,298.93"], ["VAT 5%", "", "AED 364.95"], ["Invoice total", "", "AED 7,663.88"]],
      note: "Rates are for illustration only. Use the day's published rate for the karat sold.",
    },
    faqs: [
      ["Can Infovion JMS be used by a jewellery shop in Dubai?", "Yes. Choose the United Arab Emirates when you create your shop and JMS sets the currency to AED, VAT to 5%, the purities to 24K, 22K, 21K and 18K, and the time zone to Gulf Standard Time. The invoice is titled Tax Invoice and shows your TRN. The same applies to shops in Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain."],
      ["Is VAT charged on making charges in the UAE?", "Yes. For jewellery sold to a consumer, the making charges are part of the price of the piece, and VAT at 5% applies to them along with the metal and stones. JMS charges 5% on both by default. The rates can be changed in Settings if your tax adviser says otherwise."],
      ["Does JMS support the UAE e-invoicing system?", "Not yet. The UAE is introducing electronic invoicing in phases, mainly for business-to-business invoices, sent through an Accredited Service Provider. Businesses with revenue of AED 50 million or more start on 1 January 2027 and other in-scope businesses on 1 July 2027. JMS prints VAT tax invoices today. Please check the Ministry of Finance e-invoicing portal for the rules that apply to your shop."],
      ["How much does Infovion JMS cost in the UAE?", `${PRICE} per shop per year, roughly AED 390 at recent exchange rates, after a free ${JMS.trialDays}-day trial. Every feature, unlimited staff accounts, invoices and tags are included. We can invoice you in AED or US dollars on request.`],
      ["Which tag printers and scanners work in the UAE?", "Any thermal label printer with a Windows or macOS driver, such as TSC, Zebra or Argox models, with jewellery tag rolls of 100 × 15 mm or similar, and any USB or Bluetooth barcode scanner. A phone or tablet camera also works for occasional scans."],
      ["Where is my shop's data stored?", "Each shop's data is kept separate and is visible only to that shop's accounts. It is hosted in Singapore, the closest region offered by our cloud provider, and the owner can download a full backup at any time."],
    ],
    sources: [["UAE Ministry of Finance: eInvoicing", "https://mof.gov.ae/einvoicing"], ["UAE Federal Tax Authority", "https://tax.gov.ae"]],
  },
  "jewellery-billing-software": {
    title: "Jewellery Billing Software with GST and Old Gold | Infovion JMS",
    description: "Jewellery billing software that prices items by weight, purity, rate and making charges, adjusts old gold and produces GST invoices. Part of Infovion JMS.",
    trail: "Jewellery billing software",
    kicker: "Infovion JMS",
    h1: "Jewellery billing software",
    sub: "Scan the tag, check the weight and rate, and the bill is ready: purity, making charges, stones, discount, GST, old gold and payments calculated for you, printed on A4 or a thermal roll, or shared as a PDF.",
    img: ["/product/jms/invoice", "GST invoice from Infovion JMS with weights, rates, making charges and tax"],
    answerQ: "How is a jewellery bill calculated in India?",
    answer: "A jewellery bill starts with the metal value (net weight multiplied by the day's rate per gram for that purity), adds making charges (per gram, as a percentage or per piece) and any stone or other charges, deducts old gold taken in exchange, and applies GST. GST is 3% on the total value of the jewellery, including making charges, as stated in the CBIC FAQ on gems and jewellery. The invoice should show the weight, purity and rates for each item.",
    sections: [
      ["The calculation", ["Metal value = net weight (g) × rate per gram for the purity", "Making charges = net weight × charge per gram, a percentage of metal value, or a charge per piece", "Taxable value = metal value + making charges + stone or other charges − discount shown on the invoice", "GST = 3% of the taxable value (CGST 1.5% + SGST 1.5% within a state, or IGST 3%)", "Amount payable = taxable value + GST − old gold − payments received"]],
      ["What JMS does", ["Adds a piece by scanning its tag, with weight, purity and today's rate", "Allows rate, purity, weight and making charges to be changed on the bill", "Applies the discount before GST", "Takes old gold in exchange and splits payments by method", "Shows the CGST and SGST split and your GSTIN on the invoice", "Records any balance as customer credit", "Exports sales with tax to Tally"]],
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
      ["Can the invoice be shared digitally?", "Yes. JMS creates a PDF of the invoice that can be shared on WhatsApp or by email, or printed on A4, A5 or an 80 mm roll."],
      ["Does JMS handle old gold exchange?", "Yes. Enter the weight, purity and value of the old gold; JMS deducts it from the amount payable and shows it on the invoice."],
    ],
    sources: [["CBIC: Sectoral FAQ on Gems and Jewellery", "https://gstcouncil.gov.in/sites/default/files/2024-02/sectoral-fq-gems-jewellery.pdf"]],
  },
  "jewellery-barcode-software": {
    title: "Jewellery Barcode Software: Tags, Scanning, Audit | Infovion JMS",
    description: "Jewellery barcode software: tag every piece, print barcode or QR tags on TSC, Zebra or Argox printers, bill by scanning and audit stock by scanning.",
    trail: "Jewellery barcode software",
    kicker: "Infovion JMS",
    h1: "Jewellery barcode software",
    sub: "Give every piece its own tag, bill it with a scan, and count the whole showroom by scanning. Works with the label printers and scanners jewellers already use.",
    img: ["/product/jms/tags", "Print tags screen in Infovion JMS with a jewellery barcode tag preview"],
    answerQ: "How does barcode tagging work in a jewellery shop?",
    answer: "Each piece gets a unique tag number, printed as a barcode or QR code on a small jewellery tag together with its gross and net weight, purity and HUID. At the counter, scanning the tag adds the piece to the bill with its weight and the day's rate, which removes typing errors. Because every piece is tagged, the stock can be counted by scanning all tags: the software lists what is missing, what was already sold and any tag it does not know. Infovion JMS does all three: tagging, billing by scan and stock audit.",
    sections: [
      ["How it works in JMS", ["Weigh a tray of new pieces and enter each piece's weights once; JMS numbers them", "Print the tags: barcode or QR, with weight, purity and HUID", "At billing, scan the tag; the piece is added with today's rate and can't be sold twice", "For a stock audit, scan every tag; JMS lists missing, sold and unknown tags", "Reprint any tag from the piece's page"]],
      ["Equipment that works", ["Thermal tag printers through their own driver, e.g. TSC TE244, Zebra ZD230, Argox OS-214", "Jewellery tag rolls: 100 × 15, 100 × 13, 95 × 12 and 81 × 12 mm, or a custom size", "Stickers (50 × 25, 38 × 25 mm) and A4 label sheets on a normal printer", "USB or Bluetooth scanners: 1D for barcodes, 2D for QR codes", "Or a phone or tablet camera, from the Camera button"]],
    ],
    faqs: [
      ["Which barcode type should a jewellery shop use?", "Code 128 barcodes work with every barcode scanner and fit well on 100 × 15 mm tags. QR codes are smaller and can be read by 2D scanners and phone cameras, which suits very small tags. JMS prints either; the choice can be changed at any time."],
      ["Which tag printer should I buy?", "Any thermal label printer with a Windows or macOS driver that handles narrow labels. Popular choices in India include the TSC TE244, Zebra ZD230 and Argox OS-214, typically with a resin or wax-resin ribbon for jewellery tags. Buy the tag rolls in the size you want to use and set the same size in the printer driver."],
      ["Do I need a special scanner?", "No. Any USB or Bluetooth barcode scanner that types like a keyboard works: JMS recognises a scan anywhere on the billing and audit screens. A 2D scanner is needed for QR tags. A phone or tablet camera also works for occasional scans."],
      ["Can I keep my existing tag numbers?", "Yes. When importing stock from a spreadsheet, keep your current tag numbers in the Tag number column and JMS uses them. New pieces get the next numbers automatically, with an optional prefix."],
      ["Does JMS support RFID?", "Not yet. Barcode and QR tags are supported today; RFID is on the roadmap for larger showrooms."],
    ],
  },
  "girvi-software": {
    title: "Girvi Software for Jewellers: Gold Loan Register | Infovion JMS",
    description: "Girvi (gahan) software for jewellers: record gold loans with weight, purity, amount and interest, take part-payments, track overdue pledges, print receipts.",
    trail: "Girvi software",
    kicker: "Infovion JMS",
    h1: "Girvi software for jewellers",
    sub: "A digital girvi register that works out the interest on every pledge to the day, records interest and part-payments, and shows which pledges are past their due date.",
    img: ["/product/jms/gahan", "Girvi register in Infovion JMS"],
    answerQ: "What is girvi software?",
    answer: "Girvi software, also called gahan or gold loan software, records jewellery pledged against a loan: the customer, the item, its weight and purity, the amount lent, the interest rate, the pledge date and the due date. It tracks active, overdue and released pledges and produces receipts and reports, replacing the paper girvi register. Infovion JMS includes a girvi register alongside billing, barcode stock and customer credit.",
    sections: [
      ["Recorded for each pledge", ["Customer name, mobile number and address", "Item, weight (g) and purity", "Amount lent and monthly interest rate", "Pledge date and due date", "Notes and a sequential record number"]],
      ["Available in JMS", ["Active pledges and the total amount outstanding", "Interest to date on every pledge, counted by days", "Interest and part-principal payments", "Pledges past their due date highlighted", "Release with the interest actually received, and a receipt", "Girvi register for Excel and Tally export"]],
    ],
    faqs: [
      ["What is the difference between girvi and gahan?", "Both terms refer to jewellery pledged as security for a loan. Girvi is the term commonly used in Hindi and gahan in Marathi."],
      ["Does JMS calculate girvi interest?", "Yes. JMS shows the simple interest accrued on every pledge to date, at a monthly rate counted by days, on the principal outstanding. Part-payments of principal reduce the interest from the day they are made. A minimum interest period can be set for the shop."],
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
      <PageHero
        trail={[["Infovion JMS", "/jewellery-management-software"], [c.trail, `/${k}`]]}
        kicker={c.kicker}
        title={c.h1}
        sub={c.sub}
        aside={
          <BrowserFrame url="jms.infovion.in">
            <img src={`${c.img[0]}-900.webp`} srcSet={`${c.img[0]}-900.webp 900w, ${c.img[0]}.webp 1800w`} sizes="(min-width: 1024px) 520px, 92vw" alt={c.img[1]} width="1800" height="1125" className="block w-full" fetchpriority="high" />
          </BrowserFrame>
        }
      >
        <GlowButton {...(JMS.live ? { href: TRIAL_HREF } : { to: TRIAL_HREF })}>
          {TRIAL_LABEL} <ArrowRight className="h-4 w-4" />
        </GlowButton>
        <GhostButton to="/jewellery-management-software">Infovion JMS overview</GhostButton>
      </PageHero>

      <Section className="pt-0">
        <AnswerBox q={c.answerQ}>{c.answer}</AnswerBox>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-6 lg:grid-cols-2">
          {c.sections.map(([t, items, missing]) => (
            <div key={t} className="panel rounded-xl p-7">
              <h2 className="font-display text-xl font-semibold text-white">{t}</h2>
              <ul className="mt-5 space-y-2.5">
                {items.map((x) => (
                  <li key={x} className={`flex gap-2.5 text-[15px] ${missing ? "text-slate-300" : "text-slate-200"}`}>
                    {missing ? <Minus className="mt-1 h-4 w-4 flex-shrink-0 text-slate-500" aria-hidden="true" /> : <Check className="mt-1 h-4 w-4 flex-shrink-0 text-sky-300" aria-hidden="true" />}
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {c.example && (
          <div className="panel mt-6 overflow-hidden rounded-xl">
            <table className="w-full text-left text-sm">
              <caption className="border-b border-white/10 px-5 py-3 text-left font-display text-base font-semibold text-white">{c.example.caption}</caption>
              <tbody className="divide-y divide-white/10">
                {c.example.rows.map(([a, b, v]) => (
                  <tr key={a}>
                    <th scope="row" className="px-5 py-3 font-medium text-slate-200">{a}</th>
                    <td className="px-5 py-3 text-slate-400">{b}</td>
                    <td className="px-5 py-3 text-right font-semibold text-white">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="border-t border-white/10 px-5 py-3 text-xs text-slate-400">{c.example.note}</p>
          </div>
        )}
        {c.sources && (
          <p className="mt-4 text-xs text-slate-400">
            Source:{" "}
            {c.sources.map(([t, u], i) => (
              <React.Fragment key={u}>
                {i > 0 && " · "}
                <a href={u} target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-300">
                  {t}
                </a>
              </React.Fragment>
            ))}
          </p>
        )}
      </Section>

      <FaqList faqs={c.faqs} />
      <CtaBand title="Try Infovion JMS free for 30 days" sub={`Create your shop in a minute. After the trial, ${PRICE} a year per shop, plus GST.`} primary={[TRIAL_LABEL, TRIAL_HREF]} whatsappText="Hello Infovion, I would like to know more about Infovion JMS for our jewellery shop." />
    </>
  );
}

export const JmsBillingPage = () => <JmsLanding k="jewellery-billing-software" />;
export const GirviPage = () => <JmsLanding k="girvi-software" />;
export const BarcodePage = () => <JmsLanding k="jewellery-barcode-software" />;
export const UaePage = () => <JmsLanding k="jewellery-software-uae" />;
