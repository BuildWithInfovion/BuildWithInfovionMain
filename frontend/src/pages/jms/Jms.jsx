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
const MRP = `₹${JMS.mrp.toLocaleString("en-IN")}`;
const AMC = `₹${JMS.amc.toLocaleString("en-IN")}`;

const SUB = "Billing by weight and purity, barcode tags, girvi, gold savings schemes, orders and karigar, repairs, GST returns and Tally export, for one shop or several branches. In 10 Indian languages, in a web browser, and billing carries on when the internet drops.";

/** The usual price struck through, then the price: "₹11,999 ₹9,999". */
const Price = () => (
  <>
    <s className="text-slate-400 decoration-rose-400 decoration-2">{MRP}</s> <strong className="font-semibold text-white">{PRICE}</strong>
  </>
);

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": ID,
  name: "Infovion JMS",
  alternateName: ["Infovion Jewellery Management Software", "Infovion jewellery billing software", "Infovion jewellery barcode software", "Infovion girvi software", "Infovion gold scheme software", "Infovion karigar management software", "Infovion money lending software"],
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Jewellery management software",
  operatingSystem: "Any web browser (Windows, macOS, Android, iOS)",
  url: `${SITE}/jewellery-management-software`,
  ...(JMS.live ? { installUrl: JMS.signup } : {}),
  description:
    "Jewellery management software for jewellery shops in India and worldwide: billing by weight, purity, rate per gram and making charges; barcode and QR tags with scanning and stock audit; GST (CGST/SGST/IGST) or VAT invoices with GSTR-1 and GSTR-3B; old-gold purchase and exchange; girvi (gold loan) management; gold savings schemes; customer orders, repairs and karigar job work; supplier purchases; stock value and profit; customer credit and KYC; Tally export; branches with stock transfer; billing that keeps working offline; screens in 10 Indian languages; add-ons for money lending and gold release.",
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
    "GST returns: GSTR-1 files for the GST Offline Tool and a GSTR-3B summary",
    "Gold savings schemes: monthly instalments, bonus month, weight plans, redemption on the bill",
    "Customer orders with advances, booked rates and delivery dates",
    "Karigar job work: metal issued, work received and fine-gold balances",
    "Repairs with job slips, karigar, charges and delivery",
    "Old gold bought from customers, the old gold register and melting",
    "Purchases from suppliers with supplier and karigar accounts",
    "Estimates (quotations), sales returns, exchanges and GST credit notes",
    "Stock value at cost and today's rate, margin on every bill and a profit report",
    "Branches: separate stock and bills per branch, stock transfers, branches side by side",
    "Billing without internet: bills saved on the device and sent when back online",
    "Sales, girvi and stock registers for Excel",
    "Owner and staff accounts with an activity log",
    "Screens in 10 languages: English, Hindi, Marathi, Gujarati, Tamil, Telugu, Kannada, Malayalam, Bengali and Punjabi",
    "Bill labels in Hindi or Marathi next to English; WhatsApp messages in English, Hindi or Marathi",
    "Direct printing to thermal receipt printers (ESC/POS) and tag printers (TSPL, ZPL, EPL) without a driver",
    "Weighing scale readings over RS-232 or USB",
    "Customer KYC with encrypted ID numbers and documents; PAN and cash-limit checks on large bills",
    "Notifications for out-of-stock items, overdue girvi and udhaar",
    "Finance add-on: finance files, interest loans, collections, cash book, day close, profit and loss",
    "Gold release add-on: release pledged gold from a bank loan, test, buy or return it",
  ],
  screenshot: [`${SITE}/product/jms/billing.webp`, `${SITE}/product/jms/tags.webp`, `${SITE}/product/jms/audit.webp`, `${SITE}/product/jms/invoice.webp`, `${SITE}/product/jms/scheme-passbook.webp`, `${SITE}/product/jms/order-detail.webp`, `${SITE}/product/jms/gst-returns.webp`],
  offers: { "@type": "Offer", price: String(JMS.price), priceCurrency: "INR", description: `Per shop, plus GST, then an AMC of ${AMC} a year. 30-day free trial.`, url: `${SITE}/jewellery-management-software#pricing` },
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
  {
    id: "gst",
    kicker: "GST returns",
    title: "GSTR-1 and GSTR-3B, ready every month",
    body: "Pick the month and JMS works out the GSTR-3B summary and the GSTR-1 sections from your invoices, credit notes, repair bills and purchase bills. Each GSTR-1 section downloads in the GST Offline Tool's own columns, so your CA imports it instead of typing it.",
    points: ["GSTR-3B: outward supplies, inter-state to unregistered, input tax", "GSTR-1: B2B, B2C large and small, credit notes, HSN summary, documents issued", "Input tax from purchase bills with GST", "Any month, any time"],
    img: ["/product/jms/gst-returns", "GST returns in Infovion JMS: the GSTR-3B summary and GSTR-1 files for the GST Offline Tool"],
    link: ["/jewellery-gst-software", "GST returns for jewellers"],
  },
  {
    id: "schemes",
    kicker: "Gold savings schemes",
    title: "11-month schemes without the passbook register",
    body: "Make your plans once: the monthly instalment, how many months, and the bonus. Join a customer, take each instalment with a receipt, and see at a glance who is late, who has matured and how much of your customers' money you hold. When the scheme matures, the amount and the bonus go straight onto the bill.",
    points: ["Amount plans and 22K weight plans", "Bonus as an instalment or a percentage", "Late instalments flagged, reminders on WhatsApp", "Passbook with every instalment", "Redeemed on a bill, or closed early with a deduction"],
    img: ["/product/jms/scheme-passbook", "A gold savings scheme passbook in Infovion JMS with eight of eleven instalments paid"],
    link: ["/gold-scheme-software", "Gold scheme software in detail"],
  },
  {
    id: "orders",
    kicker: "Orders and karigar",
    title: "Every custom order, from advance to delivery",
    body: "Book an order with the customer's advance and, if they want it, today's rate locked in. Send it to the karigar as a job with the fine gold issued, follow it to ready, and deliver it on an ordinary bill that uses the advance as payment. The karigar's account shows the fine gold still with them.",
    points: ["Advance and booked rate on the order", "Job to the karigar with metal issued", "Fine-gold balance for every karigar", "Ready and delivery dates, with WhatsApp updates", "Advance adjusted on the final bill"],
    img: ["/product/jms/order-detail", "A customer order in Infovion JMS with the advance, booked rate and the karigar job"],
    link: ["/karigar-management-software", "Orders and karigar in detail"],
  },
  {
    id: "repairs",
    kicker: "Repairs",
    title: "Repairs tracked like orders",
    body: "Take a piece in for repair with a numbered slip, its weight and the work to be done. Send it to a karigar or do it in the shop, mark it ready, and deliver it with a repair bill that carries GST on the service. Nothing gets lost between the counter and the workshop.",
    points: ["Repair slip with weight and the work", "With the karigar, ready or delivered", "Advance and balance on delivery", "GST on repair charges (SAC)"],
    img: ["/product/jms/repairs", "Repairs list in Infovion JMS with pieces with the karigar and ready to deliver"],
  },
  {
    id: "old-gold",
    kicker: "Old gold and purchases",
    title: "Old gold bought, melted and accounted for",
    body: "Buy old gold from a walk-in customer with its weight, tested purity and deduction, pay them and print the voucher. The old gold register shows what is in hand, and a melting batch sent to the refiner comes back as fine gold. Supplier bills and karigar accounts are kept in money and in fine metal.",
    points: ["Purchase voucher with KYC and PAN checks", "Old gold register and melting batches", "Supplier bills with input GST", "Supplier and karigar accounts in money and fine gold"],
    img: ["/product/jms/old-gold", "Old gold bought from customers in Infovion JMS with fine weight and amount paid"],
  },
  {
    id: "profit",
    kicker: "Profit and stock value",
    title: "Know what you made on every bill",
    body: "JMS records what each piece cost you, so the profit report shows the margin on every bill and the stock report values what is on the counters at cost and at today's rate. Owners see it; staff don't.",
    points: ["Margin on every invoice line", "Stock value at cost and at today's rate", "Profit by day, by bill or by category", "Only the owner can see costs"],
    img: ["/product/jms/profit", "Profit report in Infovion JMS with sales, cost and margin on each bill"],
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
  ["GSTR-1 and GSTR-3B from your bills", false, "partial", true],
  ["Gold savings schemes with bonus and redemption", "register", false, true],
  ["Custom orders and karigar job work", "register", false, true],
  ["Repairs with slips and delivery", "register", false, true],
  ["Branches with stock transfer", false, "partial", true],
  ["Billing when the internet is down", true, "partial", true],
  ["Screens in 10 Indian languages", false, "partial", true],
  ["PAN and cash-limit checks on big bills", false, false, true],
];

const MORE = [
  ["10 Indian languages", "Every screen in English, Hindi, Marathi, Gujarati, Tamil, Telugu, Kannada, Malayalam, Bengali or Punjabi — each person picks their own. Bills can carry Hindi or Marathi labels next to English, and WhatsApp messages go out in English, Hindi or Marathi."],
  ["Works without internet", "If the connection drops at the counter, keep billing from the stock and rates the counter keeps ready. Each counter holds ten invoice numbers from your series; the bills print, wait on the device and are sent, numbers and times unchanged, the moment you are back online."],
  ["Branches", "Open a branch with its own stock, bills, number series and staff. Move stock between branches with a transfer note, and see every branch's sales side by side."],
  ["Printers, scales and scanners", "Bills through any printer driver, or straight to an ESC/POS receipt printer with paper cut and cash drawer. Tags to TSC, TVS, Argox, Zebra and other tag printers in TSPL, ZPL or EPL. Weights straight from the jewellery scale."],
  ["KYC and big bills", "Customer ID and PAN stored encrypted and shown masked, with consent and verification. A bill over ₹2 lakh asks for PAN or Form 60, and cash of ₹2 lakh or more on one bill is refused."],
  ["Notifications", "A bell for out-of-stock items, girvi and udhaar past their due date, and loans due today, with a WhatsApp reminder in one tap."],
  ["Search and dashboard", "Ctrl+K finds any tag, customer, invoice or pledge. The dashboard shows today's sales, money received and what needs attention."],
  ["Security", "Each shop's data kept apart, staff access set per area, sign-in history, sign out of other devices, lockout after repeated wrong passwords."],
];

const ADDONS = [
  ["Money lending (Finance)", "Finance files collected daily, weekly or monthly, interest loans with your own interest rules, a due list with collection sheets per agent, partners, a cash book, day close and profit and loss.", "/money-lending-software"],
  ["Gold release and buying", "Pay off a customer's bank gold loan, take the gold out, weigh and test it, then buy it or hand it back for a fee. Agreement and settlement printed in the customer's language, and the real profit on each case.", "/money-lending-software#gold-release"],
];

const COUNTRIES = [
  ["India", "INR · GST with CGST/SGST or IGST · 24K to 14K · rates per 10 g and per kg · April financial year"],
  ["United Arab Emirates, Oman and Bahrain", "AED, OMR, BHD · VAT tax invoices · 24K, 22K, 21K, 18K · TRN on invoices"],
  ["Saudi Arabia", "SAR · 15% VAT · Gulf purities · ZATCA (Fatoora) e-invoicing is not supported yet"],
  ["Qatar and Kuwait", "QAR, KWD · no VAT · Gulf purities"],
  ["United Kingdom", "GBP · VAT · 9ct to 24ct, 925 silver"],
  ["United States and Canada", "USD, CAD · sales tax or GST/HST · 10K to 24K"],
  ["Singapore and Australia", "SGD, AUD · GST · 916, 999 or karat purities"],
  ["Anywhere else", "Choose the currency, tax name and rates, purities, rate unit (gram, tola, troy ounce) and financial year"],
];

const FAQ = [
  ["What is Infovion JMS?", "Infovion JMS is jewellery management software for jewellery shops. It covers billing by weight, purity and making charges, barcode tags and scanning, stock audit, GST or VAT invoices with GSTR-1 and GSTR-3B, old gold bought and exchanged, girvi (gold loans), gold savings schemes, custom orders, karigar job work and repairs, customer credit, profit and stock value, branches, reports and export to Tally. It runs in a web browser in 10 Indian languages, keeps billing when the internet drops, and has nothing to install."],
  ["How much does Infovion JMS cost?", `${PRICE} per shop (usual price ${MRP}), plus GST, after a free ${JMS.trialDays}-day trial, and then an AMC of ${AMC} a year. That includes every feature, unlimited staff accounts, invoices, tags and girvi records, and help with setup and importing your stock. For shops outside India we quote in your currency.`],
  ["Does JMS support barcode tags?", "Yes. JMS gives every piece a tag number and prints barcode (Code 128) or QR tags on thermal tag printers such as TSC, Zebra and Argox, through the printer's driver, or on A4 label sheets. Pieces are billed by scanning the tag with a USB or Bluetooth scanner or a phone camera, and the whole stock can be audited by scanning."],
  ["Which tag sizes and printers work?", "Common jewellery tag rolls of 100 × 15 mm, 100 × 13 mm, 95 × 12 mm and 81 × 12 mm, stickers of 50 × 25 and 38 × 25 mm, and A4 label sheets, plus a custom size. Any label printer with a Windows or macOS driver works, for example TSC TE244, Zebra ZD230 or Argox OS-214. A test print and alignment settings help match each printer."],
  ["Does Infovion JMS work with Tally?", "Yes. The owner downloads TallyPrime XML files for any period: the ledgers, and all vouchers including sales with tax, receipts, old gold taken in exchange, girvi loans and interest. The accountant imports them through Tally's Import menu. Ledger names can be set to match the accountant's books."],
  ["How is GST calculated on jewellery in JMS?", "GST is charged on the full value of the jewellery, that is metal, making charges and stones, less any discount shown on the invoice, and split into CGST and SGST, or charged as IGST for an inter-state sale. The default is 3%, in line with the CBIC FAQ on gems and jewellery, and the rates can be changed to what your accountant confirms."],
  ["Can JMS be used outside India?", "Yes. When you sign up, choose your country and JMS sets the currency, tax (VAT, GST or none), purities, rate units and financial year. Everything can be changed in Settings. Invoices can carry your tax registration number, such as a TRN in the UAE."],
  ["Is my shop's data kept separate and safe?", "Each shop's data is kept separate from every other shop's and is visible only to that shop's accounts. Staff accounts have limited permissions, every important change is recorded in an activity log, and the owner can download a full backup at any time. If a plan ends, the data is not deleted: the shop can still view and export it."],
  ["Does JMS manage gold savings schemes?", "Yes. Set up your plans (for example ₹5,000 a month for 11 months with the 12th month as bonus, or a 22K weight plan where each instalment buys gold at the day's rate), join customers, take instalments with receipts, and see who is late or has matured. On maturity the amount and bonus are used straight on the bill."],
  ["Can JMS handle custom orders and karigar work?", "Yes. An order records the customer's advance, an optional booked rate and the due date. It can be sent to a karigar as a job with fine gold issued, marked ready, and delivered on a bill that uses the advance. Each karigar's account shows the fine gold still with them. Repairs work the same way with numbered slips."],
  ["Does JMS make GSTR-1 and GSTR-3B?", "JMS works out the GSTR-3B summary and creates the GSTR-1 sections (B2B, B2C large and small, credit notes, HSN summary and documents issued) for any month, as files in the GST Offline Tool's columns. Your CA checks them and files the return; JMS does not file on the GST portal."],
  ["Can one owner run several branches?", "Yes. Each branch keeps its own stock, bills, invoice series and staff. The owner moves between branches from the menu, sends stock from one branch to another with a transfer note, and sees branches side by side in Reports. A branch in another state needs its own GSTIN."],
  ["Can I bring my existing stock and records?", "Yes. Stock can be imported from an Excel sheet saved as CSV, and older customer dues can be entered as opening balances. Shops moving from the earlier single-shop version of JMS can have all their records moved across by our team."],
  ["Do I need to install anything?", "No. JMS runs in Chrome, Edge or Safari on a counter computer, laptop, tablet or phone, and can be added to the home screen like an app. If the internet drops, billing carries on from the stock and rates the counter keeps ready, and the bills are sent when the connection is back."],
  ["Which languages is JMS available in?", "Ten: English, Hindi, Marathi, Gujarati, Tamil, Telugu, Kannada, Malayalam, Bengali and Punjabi. Each person picks their language on the sign-in page or in the menu, and every screen changes. Bills can carry Hindi or Marathi labels next to English, and WhatsApp reminders go out in English, Hindi or Marathi."],
  ["Which printers and weighing scales work with JMS?", "Any printer with a Windows or macOS driver works through the print window. Without a driver, JMS prints directly to ESC/POS thermal receipt printers (with paper cut and cash drawer) and to tag printers in TSPL (TSC, TVS, Argox, Xprinter), ZPL or EPL (Zebra) from Chrome or Edge. Jewellery scales with an RS-232 or USB output, such as Essae, Citizen, Atom, Contech, Shimadzu, A&D and Sartorius, fill in weights with one click."],
  ["Does JMS ask for PAN on big jewellery bills?", "Yes, for shops in India. When a bill goes over ₹2 lakh, JMS asks for the customer's PAN or a signed Form 60 (Income Tax Rule 114B) and keeps the PAN on the customer's record. It refuses cash of ₹2 lakh or more for one bill (section 269ST) and asks for the rest by UPI, card, bank transfer or cheque. The limits can be changed in Settings."],
  ["Can JMS manage money lending as well as the shop?", "Yes, with the Finance add-on: finance files collected in daily, weekly or monthly instalments, interest loans with monthly or daily interest, late fees, waivers, a due list, partners, a cash book, day close and profit and loss. Infovion switches it on for your shop."],
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
        <title>Jewellery Software: Billing, Girvi, Gold Schemes | Infovion JMS</title>
        <meta name="description" content={`Jewellery shop software: billing, barcode tags, girvi, gold schemes, orders and karigar, GSTR-1, branches, 10 Indian languages. From ${PRICE}.`} />
        <link rel="canonical" href={`${SITE}/jewellery-management-software`} />
        <meta property="og:title" content="Infovion JMS | Jewellery Management Software" />
        <meta property="og:description" content="Billing by weight and purity, barcode tags, girvi, gold savings schemes, orders and karigar, repairs, GSTR-1 and GSTR-3B, branches and offline billing, in 10 Indian languages." />
        <meta property="og:url" content={`${SITE}/jewellery-management-software`} />
        <meta property="og:image" content={`${SITE}/og-jms.jpg`} />
        <meta name="twitter:image" content={`${SITE}/og-jms.jpg`} />
        <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
      </Helmet>

      <PageHero
        trail={[["Products", "/products"], ["Infovion JMS", "/jewellery-management-software"]]}
        kicker="Infovion JMS"
        title="Jewellery management software"
        sub={<>{SUB} Free for {JMS.trialDays} days, then <Price /> per shop, plus an AMC of {AMC} a year.</>}
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
            {[...FEATURES.map((f) => [f.id, f.kicker]), ["more", "Languages and devices"], ["add-ons", "Add-ons"], ["worldwide", "Worldwide"], ["pricing", "Pricing"]].map(([id, label]) => (
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

      <Section id="more" kicker="Also in JMS" title="Your language, your printers, your rules">
        <div className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {MORE.map(([t, b]) => (
            <div key={t} className="border-t border-white/15 pt-5">
              <h3 className="font-display font-semibold text-white">{t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="add-ons" kicker="Add-ons" title="Money lending and gold release"
        sub="Many jewellers also lend money or buy gold that customers have pledged with a bank. These add-ons keep that business in the same app, with its own books. Infovion switches them on for your shop.">
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {ADDONS.map(([t, b, to]) => (
            <div key={t} className="panel rounded-xl p-7">
              <h3 className="font-display text-xl font-semibold text-white">{t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-300">{b}</p>
              <Link to={to} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200">
                How it works <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </Section>

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
            <p className="mt-4 flex items-center gap-3">
              <s className="font-display text-2xl font-semibold text-slate-400 decoration-rose-400 decoration-2">{MRP}</s>
              <span className="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">Save ₹{(JMS.mrp - JMS.price).toLocaleString("en-IN")}</span>
            </p>
            <p className="mt-1 font-display text-5xl font-bold text-white">
              {PRICE}
              <span className="ml-2 text-base font-normal text-slate-400">plus GST</span>
            </p>
            <p className="mt-2 text-sm text-slate-300">Then an AMC of <strong className="font-semibold text-white">{AMC} a year</strong>, plus GST, for support, updates and new features.</p>
            <p className="mt-3 text-slate-300">Start with a free {JMS.trialDays}-day trial. No card needed. Your data stays yours and can be exported at any time.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <GlowButton {...(JMS.live ? { href: TRIAL_HREF } : { to: TRIAL_HREF })}>
                {TRIAL_LABEL} <ArrowRight className="h-4 w-4" />
              </GlowButton>
              {JMS.live && <GhostButton to="/contact?interest=jms">Talk to us</GhostButton>}
            </div>
            <p className="mt-5 text-sm text-slate-400">Outside India, we quote in your currency. Groups of shops and branches: ask about a group price. The money lending and gold release add-ons are priced separately.</p>
          </div>
          <ul className="grid content-start gap-x-8 sm:grid-cols-2">
            {[
              "Billing, invoices and customer history",
              "Barcode and QR tags, scanning, stock audit",
              "Girvi and customer credit",
              "Gold savings schemes",
              "Orders, karigar jobs and repairs",
              "Old gold, purchases and supplier accounts",
              "Daily metal rates",
              "GST or VAT, HUID, GSTR-1 and GSTR-3B",
              "Profit and stock value",
              "Tally export, Excel registers, full backup",
              "Billing when the internet is down",
              "Unlimited staff accounts",
              "Unlimited invoices, tags and girvi records",
              "Screens in 10 Indian languages",
              "Customer KYC and notifications",
              "Help with setup and importing stock",
              "Support on WhatsApp and phone",
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
            ["Jewellers who also lend", "Finance files, interest loans and collections, with the Finance add-on."],
            ["Owners and staff", "Staff bill and tag; owners see reports and change settings."],
            ["Any device", "Counter computer, laptop, tablet or phone."],
            ["Staff in every state", "Screens in 10 Indian languages, so each person works in the one they read best."],
            ["Shops with many pieces", "Tags, scanning and stock audits keep the count right."],
            ["Shops that make to order", "Orders, karigar jobs and repairs, with fine gold tracked."],
            ["Shops with branches", "Stock, bills and staff per branch, with transfers between them."],
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
            <h2 className="font-display text-2xl font-semibold text-white">New in JMS</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">Recently added, at the request of jewellers, and included in every plan.</p>
            <h3 className="mt-7 font-display text-lg font-semibold text-white">Next on the list</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-400">
              {["RFID tags for large showrooms", "Automatic WhatsApp Business messages", "GST e-invoice and e-way bill", "Loyalty points", "An app for your customers", "Diamond certificates on tags"].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <Minus className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-500" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <ul className="grid content-start gap-x-8 sm:grid-cols-2">
            {["Gold savings schemes", "Custom orders with advances", "Karigar job work and fine gold", "Repairs with job slips", "Old gold purchase and melting", "Supplier purchases", "GSTR-1 and GSTR-3B", "Profit and stock value", "Branches and stock transfer", "Billing without internet", "10 Indian languages", "Estimates, returns and exchanges"].map((t) => (
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
          <LinkRow to="/gold-scheme-software" title="Gold scheme software" body="11-month savings schemes, weight plans, bonus and redemption on the bill." />
          <LinkRow to="/karigar-management-software" title="Orders and karigar software" body="Custom orders, karigar jobs with fine gold issued, and repairs." />
          <LinkRow to="/jewellery-gst-software" title="GST software for jewellers" body="3% GST invoices, GSTR-1 files for the Offline Tool and the GSTR-3B summary." />
          <LinkRow to="/multi-branch-jewellery-software" title="Multi-branch jewellery software" body="Stock, bills and staff per branch, with transfers and side-by-side reports." />
          <LinkRow to="/offline-jewellery-billing-software" title="Offline jewellery billing" body="How the counter keeps billing when the internet drops." />
          <LinkRow to="/jewellery-software-in-indian-languages" title="Jewellery software in Indian languages" body="Hindi, Marathi, Gujarati, Tamil, Telugu, Kannada, Malayalam, Bengali and Punjabi." />
          <LinkRow to="/money-lending-software" title="Money lending software" body="Finance files, interest loans, collections and the cash book, plus gold release." />
          <LinkRow to="/jewellery-software-with-tally" title="Jewellery software with Tally" body="What goes into the TallyPrime files, and how your accountant imports them." />
          <LinkRow to="/gold-price-calculator" title="Free gold price calculator" body="Weight, purity, making charges, 3% GST and old gold, shared on WhatsApp." />
          <LinkRow to="/girvi-interest-calculator" title="Free girvi interest calculator" body="Interest on a gold loan counted by days, with a minimum period." />
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
    title: "Jewellery & Gold Software Dubai, UAE: AED, VAT | Infovion JMS",
    description: "Jewellery and gold shop software for Dubai and the UAE: jewelry billing by weight and karat in AED, 5% VAT invoices with TRN, barcode tags, stock audit.",
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
      ["How much does Infovion JMS cost in the UAE?", `${PRICE} per shop, roughly AED 390 at recent exchange rates, after a free ${JMS.trialDays}-day trial, then an AMC of ${AMC} a year. Every feature, unlimited staff accounts, invoices and tags are included. We can invoice you in AED or US dollars on request.`],
      ["Which tag printers and scanners work in the UAE?", "Any thermal label printer with a Windows or macOS driver, such as TSC, Zebra or Argox models, with jewellery tag rolls of 100 × 15 mm or similar, and any USB or Bluetooth barcode scanner. A phone or tablet camera also works for occasional scans."],
      ["Where is my shop's data stored?", "Each shop's data is kept separate and is visible only to that shop's accounts. It is hosted in Singapore, the closest region offered by our cloud provider, and the owner can download a full backup at any time."],
    ],
    sources: [["UAE Ministry of Finance: eInvoicing", "https://mof.gov.ae/einvoicing"], ["UAE Federal Tax Authority", "https://tax.gov.ae"]],
    cta: `Create your shop in a minute and choose the United Arab Emirates: AED, 5% VAT and Gulf karats are set for you. After the trial, about AED 390 per shop, then a yearly AMC.`,
    whatsappText: "Hello Infovion, I would like to know more about Infovion JMS for our jewellery shop in the UAE.",
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
      ["Rules for big bills", ["A bill over ₹2 lakh asks for the customer's PAN or a signed Form 60 (Income Tax Rule 114B)", "A PAN entered once is kept, encrypted, on the customer's record", "Cash of ₹2 lakh or more on one bill is refused (section 269ST); the rest goes by UPI, card, transfer or cheque", "Both limits can be changed or switched off in Settings"]],
      ["Print and share", ["A4, A5, Letter, 80 mm or 58 mm paper, with margin and text size settings", "Through the printer's driver, or straight to an ESC/POS thermal printer with paper cut and cash drawer", "Bill labels in English, or with Hindi or Marathi next to English", "PDF of the invoice on WhatsApp, in the customer's language", "Reprint any invoice from the sales list"]],
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
      ["Is PAN mandatory for buying jewellery above ₹2 lakh?", "Yes. Under Income Tax Rule 114B, a sale of goods of more than ₹2 lakh in one transaction needs the buyer's PAN, or Form 60 if the buyer has no PAN, whatever the mode of payment. JMS asks for it as soon as the bill total reaches the limit."],
      ["How much cash can a jeweller accept for one bill?", "Less than ₹2 lakh. Section 269ST of the Income Tax Act bars receiving ₹2 lakh or more in cash from one person in a day, for one transaction, or for one event. JMS refuses cash at that level and asks for the balance by UPI, card, bank transfer or cheque."],
      ["Can bills be printed in Hindi or Marathi?", "Yes. Bills can carry Hindi or Marathi labels next to English. The JMS screens themselves can be switched to any of 10 Indian languages, including Gujarati, Tamil, Telugu, Kannada, Malayalam, Bengali and Punjabi."],
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
      ["Equipment that works", ["Thermal tag printers through their own driver, e.g. TSC TE244, TVS, Zebra ZD230, Argox OS-214, Godex, Honeywell", "Jewellery tag rolls: 100 × 15, 100 × 13, 95 × 12 and 81 × 12 mm, or a custom size", "Stickers (50 × 25, 38 × 25 mm) and A4 label sheets on a normal printer", "USB or Bluetooth scanners: 1D for barcodes, 2D for QR codes", "Or a phone or tablet camera, from the Camera button"]],
      ["Printing without a driver", ["Tags sent straight to the printer in TSPL (TSC, TVS, Argox, Xprinter, Gainscha, HPRT), ZPL or EPL (Zebra)", "Over a USB or Bluetooth COM port, USB on Android, Mac or Linux, Bluetooth Low Energy, or a saved .prn file", "Print head DPI, darkness, speed and gap set once per printer", "Alignment test and sample tag before a full roll"]],
      ["Tag layout controls", ["Move the print right or down in millimetres", "Size correction when a driver shrinks the tag", "1 to 4 labels across the roll", "Upside-down feed", "Layout saved as the default for every counter"]],
      ["Weighing scale", ["Jewellery balances with RS-232 or USB output: Essae, Citizen, Atom, Contech, Shimadzu, A&D, Sartorius and others", "A Scale button beside every weight on stock, tagging and girvi forms", "Takes the first stable reading and converts mg, ct, kg, tola and oz to grams", "Works in Chrome or Edge on a computer"]],
    ],
    faqs: [
      ["Which barcode type should a jewellery shop use?", "Code 128 barcodes work with every barcode scanner and fit well on 100 × 15 mm tags. QR codes are smaller and can be read by 2D scanners and phone cameras, which suits very small tags. JMS prints either; the choice can be changed at any time."],
      ["Which tag printer should I buy?", "Any thermal label printer with a Windows or macOS driver that handles narrow labels. Popular choices in India include the TSC TE244, Zebra ZD230 and Argox OS-214, typically with a resin or wax-resin ribbon for jewellery tags. Buy the tag rolls in the size you want to use and set the same size in the printer driver."],
      ["Do I need a special scanner?", "No. Any USB or Bluetooth barcode scanner that types like a keyboard works: JMS recognises a scan anywhere on the billing and audit screens. A 2D scanner is needed for QR tags. A phone or tablet camera also works for occasional scans."],
      ["Can I keep my existing tag numbers?", "Yes. When importing stock from a spreadsheet, keep your current tag numbers in the Tag number column and JMS uses them. New pieces get the next numbers automatically, with an optional prefix."],
      ["Does JMS support RFID?", "Not yet. Barcode and QR tags are supported today; RFID is on the roadmap for larger showrooms."],
      ["My tag printer has no driver. Can JMS still print?", "Yes. In Chrome or Edge, JMS can send tags straight to the printer in its own language: TSPL for TSC, TVS, Argox, Xprinter, Gainscha and HPRT, ZPL or EPL for Zebra. It connects over a USB or Bluetooth COM port, over USB on Android, Mac or Linux, or by Bluetooth Low Energy, and can also save a .prn file."],
      ["Can JMS read weights from my jewellery scale?", "Yes. Scales with an RS-232 or USB output connect in Chrome or Edge on a computer. Press Scale beside a weight on the stock, tagging or girvi form and JMS fills in the first stable reading in grams."],
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
      ["Photos and KYC", ["Photo of the pledged ornament, printed on the receipt", "Customer ID and PAN stored encrypted and shown masked", "Customer consent recorded, ID marked as verified", "KYC and ornament photos can be made compulsory for girvi"]],
      ["Reminders", ["A notification when a pledge passes its due date", "WhatsApp reminder to the customer in their own language", "Due date extended in one step", "Weight from the jewellery scale with one click"]],
    ],
    faqs: [
      ["What is the difference between girvi and gahan?", "Both terms refer to jewellery pledged as security for a loan. Girvi is the term commonly used in Hindi and gahan in Marathi."],
      ["Does JMS calculate girvi interest?", "Yes. JMS shows the simple interest accrued on every pledge to date, at a monthly rate counted by days, on the principal outstanding. Part-payments of principal reduce the interest from the day they are made. A minimum interest period can be set for the shop."],
      ["Is a licence required to provide gold loans?", "Money-lending in India is regulated by state money-lenders acts. Please check the licensing and record-keeping rules that apply in your state. JMS helps you maintain the required records."],
      ["Can a girvi receipt be printed?", "Yes. JMS prints a receipt with the pledge details and a photo of the ornament, and a release receipt when the customer collects the item."],
      ["Can I also run money lending or gold release in JMS?", "Yes. The Finance add-on handles finance files and interest loans with collections and a cash book, and the Gold release add-on handles gold that customers have pledged with a bank. See the money lending page for details."],
    ],
  },
  "money-lending-software": {
    title: "Money Lending Software for Jewellers and Finance | Infovion JMS",
    description: "Money lending software: finance files with daily or weekly collections, interest loans, late fees, due list, partners, cash book, day close and profit and loss.",
    trail: "Money lending software",
    kicker: "Infovion JMS · Finance add-on",
    h1: "Money lending software",
    sub: "Finance files collected by the day or week, interest loans with your own interest rules, a due list for each collection agent, and books that close every evening. Next to the jewellery shop, or on its own.",
    answerQ: "What does money lending software do?",
    answer: "Money lending software keeps a lender's loan book: who was given how much and on what terms, every collection and fee with a receipt, what each borrower still owes, which instalments are overdue, and the lender's cash and profit. The Finance add-on of Infovion JMS handles two kinds of loan, finance files (a fixed amount collected back in instalments, with the interest deducted when the money is given) and interest loans (interest every month on the principal outstanding, with the principal repaid later), and keeps a cash book, a day close and a profit and loss statement from the same entries.",
    sections: [
      ["Finance files", ["File amount, amount handed over, and the interest deducted up front", "Collection every day, Monday to Saturday, every week, every 2 weeks or every month", "Instalment plan with arrears and missed instalments", "Collections count towards the deducted interest first, then the principal", "Or no schedule: collect by a date"]],
      ["Interest loans", ["Rate per month or per year, simple interest", "Counted in full months or by days", "Your rule for a part month: none, full, half up to 15 days, or by days", "Optional cap on total interest as a % of the principal", "Top-ups on the same loan; principal due at maturity on a fixed tenure"]],
      ["Collections and charges", ["Due list by agent or line, with a printable collection sheet", "WhatsApp reminders in the borrower's language", "Processing fees, late fees from your own rule, waivers and write-offs", "Settle a loan in one go from a quote", "Numbered receipts, statements and a no-dues certificate", "Wrong entries voided with a reason, never deleted"]],
      ["Books", ["One cash book across sales, udhaar, girvi, loans, partners and the day book, on the cash or bank side", "Day book for income, expenses, capital, drawings and cash ↔ bank transfers", "Day close with a note-by-note cash count, and the day locked", "Profit and loss: interest, fees, expenses, bad debts and partners' share", "Partners who put in capital and share profit", "Books locked up to a date; exports for Excel"]],
      ["Gold release and buying", ["For gold a customer has pledged with a bank or gold loan company", "Nine steps from enquiry and bank payoff to release, testing, settlement and resale", "Buy the gold, or release only and charge a service fee", "Fine gold (24K) worked out from net weight and purity", "Agreement and settlement printed in the customer's language", "Actual profit on every case, and every rupee in the cash book"]],
      ["Not included", ["Loans are not in the Tally export yet: use the Excel exports", "No online payment collection from borrowers", "The add-on does not check whether you need a money-lending licence; it keeps the records and your licence number"], true],
    ],
    example: {
      caption: "Worked example: a finance file of ₹20,000",
      rows: [["File amount (collected back)", "", "₹20,000"], ["Interest deducted up front", "", "₹3,000"], ["Cash handed over", "", "₹17,000"], ["Daily collection", "100 days × ₹200", "₹20,000"], ["Interest earned when fully collected", "", "₹3,000"]],
      note: "Figures for illustration. The first ₹3,000 collected counts towards the interest, then the principal.",
    },
    faqs: [
      ["What is the difference between a finance file and an interest loan?", "A finance file is a fixed amount collected back in instalments, such as ₹200 a day for 100 days on a ₹20,000 file, with the interest deducted from the money handed over. An interest loan earns interest every month on the principal outstanding, and the principal is repaid later in one go or in parts. JMS handles both, with their own statements and receipts."],
      ["How does JMS calculate interest on a loan?", "Simple interest, at a rate per month or per year. Interest can be counted in full months, on the principal at the start of each month, or by days. You choose what happens when the principal is repaid part-way through a month, and can set a cap on total interest as a percentage of the principal. Each new loan copies the rules from Settings, so later changes never alter running loans."],
      ["Can each collection agent get their own list?", "Yes. Every loan can be given an agent or line. The due list filters by agent and prints a collection sheet with each borrower's instalment and arrears."],
      ["Can money lending be used without the jewellery shop?", "Yes. The Finance add-on keeps its own books and can be the only part a business uses, but it runs inside JMS, so the shop account is the starting point. Talk to us to have it switched on."],
      ["Is a licence needed to lend money?", "In India, money lending is regulated by state money-lenders acts, and the rules on licences, interest limits and records differ by state. Please check what applies in your state. JMS keeps the records, receipts and statements, and the interest cap can be set to match a legal limit."],
      ["What is gold release and buying?", "Some customers have their gold pledged with a bank or gold loan company and want to sell it. The jeweller pays off the loan, takes the gold out, weighs and tests it, and either buys it, paying the customer what is left after the loan and charges, or hands it back for repayment and a service fee. JMS tracks each case through nine steps and shows the real profit."],
    ],
    cta: "Ask us to switch on the Finance or Gold release add-on in your JMS shop, or open the demo shop to see loans, schedules and the cash book.",
    whatsappText: "Hello Infovion, I would like to know more about the money lending (Finance) add-on in Infovion JMS.",
  },
  "jewellery-software-with-tally": {
    title: "Jewellery Software with Tally Export (TallyPrime) | Infovion JMS",
    description: "Jewellery software with TallyPrime export: ledgers and vouchers for sales with GST, receipts, old gold, udhaar and girvi, imported by your accountant in 2 steps.",
    trail: "Jewellery software with Tally",
    kicker: "Infovion JMS",
    h1: "Jewellery software with Tally export",
    sub: "Bill in JMS through the month. At month end, download two TallyPrime files and your accountant imports every sale, receipt, old gold purchase and girvi entry, under the ledger names they already use.",
    img: ["/product/jms/tally-export", "Exports for accounts in Infovion JMS: Tally files, Excel registers and full backup"],
    answerQ: "How does jewellery software send data to Tally?",
    answer: "Most jewellery software sends data to Tally as XML files that TallyPrime imports. Infovion JMS creates two files for any period: first the masters (ledgers for customers, sales, tax, cash, bank, old gold and girvi), then the vouchers (sales with GST or VAT, receipts, old gold taken in exchange as a journal, girvi loans given as payments, and girvi interest and repayments as receipts). The accountant imports the masters, then the transactions, from Gateway of Tally → Import. Ledger names are set in JMS to match the accountant's books.",
    sections: [
      ["What goes into Tally", ["Sales vouchers: taxable value after discount, CGST and SGST or IGST (or VAT), and round off", "Receipts taken at billing, by cash or bank", "Old gold taken in exchange, as a journal entry", "Udhaar payments from customers, including opening dues", "Girvi loans given, as payments", "Girvi interest and principal repaid, as receipts"]],
      ["How the accountant imports it", ["In JMS: Reports and exports → Tally, choose the period", "Download 1. Masters, then 2. Vouchers", "In TallyPrime: Gateway of Tally → Import → Masters, then Import → Transactions", "Voucher numbers follow the JMS invoice and girvi numbers", "Each voucher's narration lists the customer, items and weights, and any discount"]],
      ["Ledger names you can set", ["Sales - Jewellery", "Output CGST, Output SGST, Output IGST or Output VAT", "Cash, Bank, Round Off", "Old Gold Purchase", "Girvi Loans Given, Interest on Girvi", "Tally company name"]],
      ["Also for the accountant", ["Sales register for Excel with taxable value, tax, HSN and HUID", "Girvi and stock registers", "Full backup of the shop's data", "Finance add-on loans: Excel exports (not yet in the Tally files)"]],
    ],
    faqs: [
      ["Does Infovion JMS work with Tally?", "Yes. JMS exports TallyPrime XML: the ledgers (masters) and all vouchers for the period, covering sales with tax, receipts, old gold, udhaar payments, girvi loans, interest and repayments. The accountant imports them from Gateway of Tally → Import."],
      ["Does it work with Tally ERP 9?", "The files are made for TallyPrime's XML import. If your accountant still uses Tally ERP 9, try a one-month import on a test company first."],
      ["Will the import create duplicate ledgers?", "No, as long as the ledger names in JMS Settings → Tally match the accountant's existing ledgers. Set them once; every later export uses the same names. Customer ledgers are named with the customer's name and mobile number."],
      ["How often should I export to Tally?", "Monthly is usual, before GST returns. Any date range can be exported, so a quarter or a full financial year also works. Import each period once."],
      ["Is it a live sync?", "No. JMS creates files that the accountant imports, which also works when the accountant is in another town and has their own copy of Tally."],
    ],
  },
  "gold-scheme-software": {
    title: "Gold Scheme Software for Jewellers: 11-Month Plans | Infovion JMS",
    description: "Gold savings scheme software for jewellers: 11-month plans, bonus month, 22K weight plans, instalment receipts, late reminders and redemption on the bill.",
    trail: "Gold scheme software",
    kicker: "Infovion JMS",
    h1: "Gold scheme software for jewellers",
    sub: "Run your 11-month gold savings schemes without the passbook register: every instalment with a receipt, late payers flagged, and the matured amount and bonus used straight on the bill.",
    img: ["/product/jms/scheme-passbook", "A gold savings scheme passbook in Infovion JMS with eight of eleven instalments paid"],
    answerQ: "What is a jewellery gold savings scheme?",
    answer: "A gold savings scheme, also called a monthly jewellery purchase plan, lets a customer pay a fixed amount every month, usually for 11 months. The jeweller adds a bonus, often the 12th instalment or a share of it, and at maturity the customer buys jewellery for the total. In a weight plan, each instalment buys gold at the day's rate and the customer collects the grams saved. Infovion JMS keeps every plan, member, instalment and receipt, flags late payments, and uses the matured amount and bonus on the customer's bill.",
    sections: [
      ["Plans you set up", ["Amount plans, for example ₹5,000 a month for 11 months", "Weight plans, where each instalment buys 22K gold at the day's rate", "Bonus as a number of instalments, as a percentage, or none", "Grace days before an instalment counts as late", "As many plans as you run, each with its own name"]],
      ["Every member", ["Joined with a scheme number, start date and nominee", "Instalments taken by cash, UPI, card or bank, each with a receipt", "Passbook of every instalment, printed or shared on WhatsApp", "Late members listed, with a WhatsApp reminder in one tap", "Matured schemes waiting to be redeemed"]],
      ["At maturity", ["Amount and bonus applied on the customer's bill as payment", "Weight plans: the grams saved, valued at the day's rate", "Closed early, with your deduction and the refund recorded", "Total of customers' money you hold, on the schemes list"]],
      ["Check with your adviser", ["Rules on jewellery schemes and deposits differ, and a scheme that only buys jewellery is treated differently from a deposit. JMS keeps the records; please check what applies to your shop"], true],
    ],
    example: {
      caption: "Worked example: ₹5,000 a month for 11 months, 12th month as bonus",
      rows: [["Paid by the customer", "11 × ₹5,000", "₹55,000"], ["Jeweller's bonus", "1 instalment", "₹5,000"], ["Available on the bill at maturity", "", "₹60,000"]],
      note: "Figures for illustration. Bonus and rules are set by each jeweller.",
    },
    faqs: [
      ["Can JMS run an 11-month gold scheme?", "Yes. Make a plan with the monthly amount, the number of instalments and the bonus. Each customer who joins gets a scheme number and a passbook, and JMS knows when the scheme matures."],
      ["Does JMS support gold weight schemes?", "Yes. In a weight plan each instalment buys gold at that day's rate, and the passbook shows the grams saved. At maturity the grams are valued at the day's rate and used on the bill."],
      ["How are late instalments followed up?", "Members whose instalment is overdue are listed on the schemes page and on the dashboard, and a WhatsApp reminder can be sent in one tap."],
      ["How is the scheme used when the customer buys?", "On the bill, choose the customer's matured scheme as a payment. The amount and the bonus are taken off the bill, and the scheme is closed."],
      ["Can a customer close a scheme early?", "Yes. JMS works out the amount paid less the deduction you set for early closure, and records the refund or the purchase."],
    ],
    links: [["/karigar-management-software", "Orders and karigar", "Custom orders with advances, karigar jobs and repairs."], ["/jewellery-billing-software", "Jewellery billing", "How the bill is calculated and paid, including schemes."]],
    whatsappText: "Hello Infovion, I would like to know more about gold savings schemes in Infovion JMS.",
  },
  "karigar-management-software": {
    title: "Karigar & Order Management Software for Jewellers | Infovion JMS",
    description: "Jewellery order and karigar software: customer orders with advance and booked rate, karigar jobs with fine gold issued and received, repairs with job slips.",
    trail: "Orders and karigar",
    kicker: "Infovion JMS",
    h1: "Order and karigar management software",
    sub: "Every custom order from advance to delivery, every job with the karigar and the fine gold in their hands, and every repair with a numbered slip. Nothing lost between the counter and the workshop.",
    img: ["/product/jms/order-detail", "A customer order in Infovion JMS with the advance, booked rate and the karigar job"],
    answerQ: "How do jewellers track karigar work?",
    answer: "A jeweller who gives work to a karigar (goldsmith) issues metal, usually counted as fine gold, and receives finished pieces with an allowance for wastage. The balance of fine gold with each karigar has to be tracked, along with the labour owed. Infovion JMS records customer orders with their advances, sends them to a karigar as jobs with the metal issued, receives the work back, and keeps each karigar's account in money and in fine gold.",
    sections: [
      ["Customer orders", ["Order number, design, weight and purity wanted, and due date", "Advance taken in cash, UPI, card or bank, with a receipt", "Today's rate booked for the customer, if agreed", "Booked, in work, ready, delivered or cancelled, with WhatsApp updates", "Delivered on an ordinary bill that uses the advance"]],
      ["Karigar jobs", ["Job sent with the metal issued, in gross and fine weight", "Linked to the customer's order, or made for stock", "Work received with weight, touch, wastage and labour", "Each karigar's account in money and in fine gold", "Open jobs and overdue jobs at a glance"]],
      ["Repairs", ["Repair slip with the piece, its weight and the work", "In the shop or with a karigar", "Advance on intake, balance on delivery", "GST on the repair charge as a service", "Ready and delivered lists, so nothing is forgotten"]],
      ["Purchases and suppliers", ["Supplier bills with input GST", "Supplier and karigar accounts kept in money and fine metal", "Old gold bought from customers, and melting batches"]],
    ],
    faqs: [
      ["Does JMS keep the karigar's fine gold balance?", "Yes. Metal issued on a job is recorded in gross and fine weight. When work comes back, the fine gold in the pieces and the wastage allowed are set against it, and the karigar's account shows what is still with them."],
      ["Can a customer's advance be adjusted on the final bill?", "Yes. When the order is delivered, the bill picks up the advance as a payment, so the customer pays only the balance."],
      ["Can I book the gold rate for an order?", "Yes. The order can keep the day's rate, so the customer is billed at that rate when the piece is delivered."],
      ["Are repairs charged with GST?", "Repair charges are a service and carry GST at the rate your accountant confirms. JMS prints a repair bill with the SAC code and the tax."],
      ["Do customers get updates on WhatsApp?", "Yes. A message can be sent when the order or repair is ready, in English, Hindi or Marathi."],
    ],
    links: [["/gold-scheme-software", "Gold scheme software", "Monthly schemes with bonus and redemption on the bill."], ["/jewellery-gst-software", "GST for jewellers", "GSTR-1 and GSTR-3B from bills, repairs and purchases."]],
    whatsappText: "Hello Infovion, I would like to know more about orders and karigar management in Infovion JMS.",
  },
  "jewellery-gst-software": {
    title: "Jewellery GST Software: 3% GST, GSTR-1, GSTR-3B | Infovion JMS",
    description: "GST software for jewellers: 3% GST invoices with HUID, GSTR-1 files for the GST Offline Tool, GSTR-3B summary, credit notes, HSN summary and input tax.",
    trail: "GST software for jewellers",
    kicker: "Infovion JMS",
    h1: "GST software for jewellers",
    sub: "GST invoices at the counter, and at month end the GSTR-3B summary and the GSTR-1 files your CA needs, worked out from your invoices, credit notes, repair bills and purchase bills.",
    img: ["/product/jms/gst-returns", "GST returns in Infovion JMS: the GSTR-3B summary and GSTR-1 files for the GST Offline Tool"],
    answerQ: "Which GST returns does a jeweller file?",
    answer: "A GST-registered jeweller usually files GSTR-1, the details of outward supplies (B2B invoices, B2C sales, credit notes, an HSN summary and the documents issued), and GSTR-3B, the summary return where the tax is paid after input tax credit. Gold jewellery carries GST at 3%, and job work and repair services are taxed as services. Infovion JMS creates the GSTR-1 sections as files in the GST Offline Tool's columns and works out the GSTR-3B figures for any month, so the accountant checks and files instead of typing.",
    sections: [
      ["GSTR-1", ["B2B invoices to registered buyers, with their GSTIN", "B2C large (inter-state, over the limit) and B2C small", "Credit notes for returns", "HSN summary with quantity, value and tax", "Documents issued, with number ranges", "Each section as a CSV in the GST Offline Tool's columns"]],
      ["GSTR-3B", ["Outward taxable supplies with IGST, CGST and SGST", "Inter-state supplies to unregistered persons, by state", "Input tax from purchase bills entered in JMS", "Any month, as often as you like"]],
      ["At the counter", ["3% GST split as CGST and SGST, or IGST for another state", "HSN on every line and HUID on hallmarked pieces", "PAN or Form 60 above ₹2 lakh, and the cash limit", "Sales returns as credit notes; estimates without GST"]],
      ["Not done by JMS", ["Filing on the GST portal: your CA uploads the files and files the return", "E-invoices (IRN) and e-way bills, which are on the roadmap"], true],
    ],
    faqs: [
      ["Does JMS file GST returns?", "No. JMS prepares the GSTR-1 files and the GSTR-3B figures. Your CA checks them, imports the files in the GST Offline Tool or enters the figures on the portal, and files the return."],
      ["What GST rate applies to gold jewellery?", "3% on the total value of the jewellery, including making charges (CBIC sectoral FAQ on gems and jewellery). Confirm current rates with your accountant; JMS lets you set them."],
      ["Are purchases and input tax included?", "Yes. Purchase bills entered in JMS with GST are counted as input tax in the GSTR-3B summary."],
      ["Does JMS make e-invoices?", "Not yet. E-invoicing applies to businesses above the turnover limit; JMS prints GST tax invoices today, and e-invoice and e-way bill support is on the roadmap."],
      ["Can I still send my data to Tally?", "Yes. The Tally export carries sales with tax, receipts, old gold and girvi entries for any period."],
    ],
    sources: [["CBIC: Sectoral FAQ on Gems and Jewellery", "https://gstcouncil.gov.in/sites/default/files/2024-02/sectoral-fq-gems-jewellery.pdf"]],
    links: [["/jewellery-billing-software", "Jewellery billing", "How a jewellery bill and its GST are calculated."], ["/jewellery-software-with-tally", "Tally export", "Ledgers and vouchers for TallyPrime."]],
  },
  "multi-branch-jewellery-software": {
    title: "Multi-Branch Jewellery Software: Stock Transfer | Infovion JMS",
    description: "Jewellery software for shops with branches: stock, bills, invoice series and staff per branch, stock transfer notes between branches and reports side by side.",
    trail: "Multi-branch",
    kicker: "Infovion JMS",
    h1: "Jewellery software for shops with branches",
    sub: "Each branch keeps its own stock, bills, invoice series and staff. The owner moves between branches from the menu, sends stock across with a transfer note and sees every branch side by side.",
    answerQ: "How does multi-branch jewellery software work?",
    answer: "In multi-branch jewellery software, each showroom has its own stock, bills and invoice numbers, while the owner sees all of them in one account. Pieces moved from one branch to another go on a transfer note, so each branch's stock stays right, and reports compare the branches. In Infovion JMS, staff are given access to their own branch, the owner switches between branches from the menu, and a branch in another state can use its own GSTIN.",
    sections: [
      ["Per branch", ["Stock, tags and stock audits", "Bills with the branch's own invoice series", "Girvi, schemes, orders and repairs", "Staff accounts limited to their branch", "Address and GSTIN on the branch's invoices"]],
      ["For the owner", ["Move between branches from the menu", "Stock transfer note when pieces move", "Sales and money received for every branch side by side", "Rates, settings and staff managed in one place"]],
    ],
    faqs: [
      ["Can staff see other branches?", "No. Staff accounts work in the branch they are given. The owner can see and switch between all branches."],
      ["How is stock moved between branches?", "The owner chooses the pieces and the branch, and JMS moves them from one branch's stock to the other's on a numbered transfer note, with their weights and cost."],
      ["Does each branch need its own GSTIN?", "A branch in another state needs its own GST registration. Branches in the same state normally share one GSTIN; your accountant can confirm."],
      ["How is a group of shops priced?", "Ask us about a group price for shops with several branches."],
    ],
    links: [["/offline-jewellery-billing-software", "Offline billing", "How each counter keeps billing when the internet drops."], ["/jewellery-barcode-software", "Barcode tags", "Tags, scanning and stock audits in every branch."]],
    whatsappText: "Hello Infovion, I would like to know more about Infovion JMS for our jewellery shop with branches.",
  },
  "offline-jewellery-billing-software": {
    title: "Offline Jewellery Billing Software, No Internet | Infovion JMS",
    description: "Jewellery billing that keeps working when the internet drops: bills made from the stock and rates the counter keeps, printed, and sent when back online.",
    trail: "Offline billing",
    kicker: "Infovion JMS",
    h1: "Jewellery billing that works without internet",
    sub: "A dropped connection should not stop a sale. Each JMS counter keeps today's stock, rates and a few invoice numbers ready, so the bill is made, printed and sent the moment the internet is back.",
    answerQ: "Can online jewellery software bill without internet?",
    answer: "Yes, if it keeps what billing needs on the counter. While online, each Infovion JMS counter keeps a copy of the stock, today's rates and ten invoice numbers reserved from the shop's series. If the connection drops, bills are made from that copy, printed and queued on the device. When the connection returns they are sent oldest first, keeping their invoice number and time, and the server checks every piece again, so a piece sold meanwhile at another counter is reported, not sold twice.",
    sections: [
      ["Offline at the counter", ["Scan tags and bill from the kept stock and today's rates", "Up to ten bills per counter, each with its own invoice number", "Bill printed as usual", "A banner shows bills waiting to be sent"]],
      ["Back online", ["Bills sent oldest first, numbers and times unchanged", "Sending twice saves the bill once", "Every piece checked again on the server", "Any bill that cannot be saved is shown for the owner to fix"]],
      ["Needs the internet", ["Girvi, schemes, orders and stock changes", "Reports and exports", "Sharing invoices on WhatsApp"], true],
    ],
    faqs: [
      ["What happens to invoice numbers when billing offline?", "Each counter keeps ten numbers from the shop's series while online. Offline bills use them in order, so the series has no gaps or duplicates when the bills are sent."],
      ["What if the same piece is sold at two counters?", "When the offline bill is sent, the server checks every piece again. If a piece was already sold at another counter, the bill is reported for the owner to fix instead of selling the piece twice."],
      ["Does JMS open without internet?", "Yes. Once JMS has been opened on a device, it opens again without a connection, and the billing screen uses the kept stock and rates."],
      ["Do I need to install software for this?", "No. It works in Chrome, Edge or Safari, and JMS can be added to the home screen like an app."],
    ],
    links: [["/multi-branch-jewellery-software", "Branches", "Stock, bills and staff per branch."], ["/jewellery-billing-software", "Jewellery billing", "The bill calculation, printing and sharing."]],
  },
  "jewellery-software-in-indian-languages": {
    title: "Jewellery Software in Hindi, Tamil & 8 More | Infovion JMS",
    description: "Jewellery shop software in 10 Indian languages: Hindi, Marathi, Gujarati, Tamil, Telugu, Kannada, Malayalam, Bengali, Punjabi and English, chosen per person.",
    trail: "Indian languages",
    kicker: "Infovion JMS",
    h1: "Jewellery software in 10 Indian languages",
    sub: "Billing, girvi, schemes, stock, udhaar, orders and repairs in the language your staff read best. Each person picks their own, so the owner can work in English and the counter in Gujarati or Tamil.",
    img: ["/product/jms/dashboard-gu", "The Infovion JMS dashboard in Gujarati"],
    answerQ: "Is jewellery software available in regional languages?",
    answer: "Infovion JMS shows every screen, menu and message in English, Hindi, Marathi, Gujarati, Tamil, Telugu, Kannada, Malayalam, Bengali or Punjabi. Each person chooses their language on the sign-in page or in the menu, and it changes only for them. Printed bills are in English and can carry Hindi or Marathi labels next to English, and WhatsApp reminders go out in English, Hindi or Marathi.",
    sections: [
      ["In every language", ["All screens: billing, stock, tags, girvi, schemes, orders, repairs, udhaar, reports and settings", "Numbers and dates in the Indian format", "Each person's own choice, kept on their account", "Switch at any time from the menu"]],
      ["Bills and messages", ["Bills in English, with optional Hindi or Marathi labels next to English", "WhatsApp messages in English, Hindi or Marathi", "Customer names typed in any script"]],
      ["Not yet", ["Bill labels in the other eight languages", "WhatsApp messages in languages other than English, Hindi and Marathi"], true],
    ],
    faqs: [
      ["Can different staff use different languages?", "Yes. The language belongs to each person, so one counter can work in Tamil and the owner's laptop in English on the same shop."],
      ["Are the bills printed in my language?", "Bills are printed in English and can carry Hindi or Marathi labels next to English. Bill labels in other Indian languages are planned."],
      ["How do I change the language?", "On the sign-in page, or from the menu at any time. Every screen changes at once."],
    ],
    links: "langs",
  },
};

// One page per Indian language: [slug, name, native name, code, menu words, region, girvi word, bill labels]
const LANGS = [
  ["hindi", "Hindi", "हिन्दी", "hi", ["नया बिल", "गिरवी", "बचत योजनाएँ", "स्टॉक", "उधार", "ऑर्डर", "रिपेयर"], "Uttar Pradesh, Madhya Pradesh, Rajasthan, Bihar, Delhi and across north India", "girvi (गिरवी)", true],
  ["marathi", "Marathi", "मराठी", "mr", ["नवीन बिल", "गहाण", "बचत योजना", "स्टॉक", "उधारी", "ऑर्डर", "दुरुस्ती"], "Maharashtra, from Pune and Mumbai to Nagpur and Kolhapur", "gahan (गहाण)", true],
  ["gujarati", "Gujarati", "ગુજરાતી", "gu", ["નવું બિલ", "ગીરવી", "બચત યોજનાઓ", "સ્ટૉક", "ઉધાર", "ઑર્ડર", "રિપેર"], "Gujarat, from Ahmedabad and Surat to Rajkot and Vadodara", "girvi (ગીરવી)"],
  ["tamil", "Tamil", "தமிழ்", "ta", ["புதிய பில்", "அடகு", "சேமிப்புத் திட்டங்கள்", "ஸ்டாக்", "கடன் (உதார்)", "ஆர்டர்கள்", "பழுதுபார்ப்புகள்"], "Tamil Nadu, from Chennai to Coimbatore, Madurai and Tiruchirappalli", "adagu (அடகு)"],
  ["telugu", "Telugu", "తెలుగు", "te", ["కొత్త బిల్లు", "తాకట్టు", "పొదుపు పథకాలు", "స్టాక్", "అప్పు (ఉధార్)", "ఆర్డర్లు", "రిపేర్లు"], "Andhra Pradesh and Telangana, from Hyderabad to Vijayawada and Visakhapatnam", "takattu (తాకట్టు)"],
  ["kannada", "Kannada", "ಕನ್ನಡ", "kn", ["ಹೊಸ ಬಿಲ್", "ಗಿರವಿ", "ಉಳಿತಾಯ ಯೋಜನೆಗಳು", "ಸ್ಟಾಕ್", "ಸಾಲ (ಉಧಾರಿ)", "ಆರ್ಡರ್‌ಗಳು", "ರಿಪೇರಿಗಳು"], "Karnataka, from Bengaluru to Mysuru, Hubballi and Mangaluru", "girvi (ಗಿರವಿ)"],
  ["malayalam", "Malayalam", "മലയാളം", "ml", ["പുതിയ ബിൽ", "പണയം", "സമ്പാദ്യ പദ്ധതികൾ", "സ്റ്റോക്ക്", "കടം (ഉധാർ)", "ഓർഡറുകൾ", "റിപ്പയറുകൾ"], "Kerala, from Thrissur and Kochi to Kozhikode and Thiruvananthapuram", "panayam (പണയം)"],
  ["bengali", "Bengali", "বাংলা", "bn", ["নতুন বিল", "বন্ধক", "সঞ্চয় প্রকল্প", "স্টক", "ধার (উধার)", "অর্ডার", "মেরামত"], "West Bengal, from Kolkata to Siliguri and Durgapur, and Tripura", "bandhak (বন্ধক)"],
  ["punjabi", "Punjabi", "ਪੰਜਾਬੀ", "pa", ["ਨਵਾਂ ਬਿੱਲ", "ਗਿਰਵੀ", "ਬਚਤ ਸਕੀਮਾਂ", "ਸਟਾਕ", "ਉਧਾਰ", "ਆਰਡਰ", "ਮੁਰੰਮਤਾਂ"], "Punjab, from Ludhiana and Amritsar to Jalandhar and Patiala", "girvi (ਗਿਰਵੀ)"],
];
const MENU_EN = ["New bill", "Girvi", "Savings schemes", "Stock", "Udhaar", "Orders", "Repairs"];

for (const [slug, name, native, code, menu, region, girvi, labels] of LANGS) {
  LANDINGS[`jewellery-software-${slug}`] = {
    title: `Jewellery Software in ${name}: Billing & Girvi | Infovion JMS`,
    description: `Jewellery shop software in ${name} (${native}): billing, girvi, gold schemes, stock, udhaar, orders and repairs, every screen in ${name}. 30-day free trial.`,
    trail: `In ${name}`,
    kicker: `Infovion JMS · ${native}`,
    h1: `Jewellery software in ${name}`,
    sub: `Every screen of Infovion JMS in ${name}: billing, ${girvi.split(" ")[0]}, gold savings schemes, stock, udhaar, orders and repairs. For jewellery shops in ${region}.`,
    img: [`/product/jms/dashboard-${code}`, `The Infovion JMS dashboard in ${name} (${native})`],
    answerQ: `Is there jewellery shop software in ${name}?`,
    answer: `Yes. Infovion JMS can show every screen, menu and message in ${name} (${native}). Each person picks ${name} on the sign-in page or in the menu, so the counter staff can work in ${name} while the owner keeps English. Billing by weight and purity, barcode tags, ${girvi}, gold schemes, udhaar, orders, karigar jobs and repairs all work in ${name}. ${labels ? `Bills can carry ${name} labels next to English, and WhatsApp reminders can go out in ${name}.` : "Printed bills are in English, with optional Hindi or Marathi labels, and WhatsApp reminders go out in English, Hindi or Marathi."}`,
    sections: [
      [`The menu in ${name}`, menu.map((w, i) => `${w}: ${MENU_EN[i]}`)],
      ["Everything in the app", ["Billing by weight, purity and making charges, with GST", "Barcode tags, scanning and stock audits", "Girvi with interest to the day", "Gold savings schemes and instalments", "Customer orders, karigar jobs and repairs", "Reports, GSTR-1 and GSTR-3B, Tally export"]],
      labels
        ? ["Bills and messages", [`Bill labels in ${name} next to English`, `WhatsApp reminders in ${name}`, "Customer names typed in any script"]]
        : ["Not yet in " + name, ["Bill labels: bills print in English, with optional Hindi or Marathi labels", `WhatsApp messages: sent in English, Hindi or Marathi`], true],
    ],
    faqs: [
      [`Can my staff use JMS in ${name}?`, `Yes. Each person chooses ${name} on the sign-in page or from the menu, and every screen changes at once. Others on the same shop can keep English or another language.`],
      [`Are bills printed in ${name}?`, labels ? `Bills are printed in English and can carry ${name} labels next to English, set once in Settings.` : `Not yet. Bills are printed in English and can carry Hindi or Marathi labels next to English. ${name} labels on bills are planned.`],
      ["How much does it cost?", `${PRICE} per shop, plus GST, after a free ${JMS.trialDays}-day trial, then an AMC of ${AMC} a year. Every language and feature is included.`],
    ],
    links: "langs",
    whatsappText: `Hello Infovion, I would like to know more about Infovion JMS in ${name} for our jewellery shop.`,
  };
}

const LANG_LINKS = [["/jewellery-software-in-indian-languages", "All 10 languages", "Every screen in the language your staff read best."], ...LANGS.map(([slug, name, native]) => [`/jewellery-software-${slug}`, `Jewellery software in ${name}`, `${native}: billing, girvi, schemes and stock in ${name}.`])];

function JmsLanding({ k }) {
  const c = LANDINGS[k];
  const url = `${SITE}/${k}`;
  const links = c.links === "langs" ? LANG_LINKS.filter(([to]) => to !== `/${k}`) : c.links;
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
        aside={c.img && (
          <BrowserFrame url="jms.infovion.in">
            <img src={`${c.img[0]}-900.webp`} srcSet={`${c.img[0]}-900.webp 900w, ${c.img[0]}.webp 1800w`} sizes="(min-width: 1024px) 520px, 92vw" alt={c.img[1]} width="1800" height="1125" className="block w-full" fetchpriority="high" />
          </BrowserFrame>
        )}
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

      {links && (
        <Section kicker="Related" title={c.links === "langs" ? "Infovion JMS in other languages" : "More about Infovion JMS"} className="py-10">
          <div className="mt-8 grid border-t border-white/10 md:grid-cols-2 md:gap-x-10">
            {links.map(([to, title, body]) => (
              <LinkRow key={to} to={to} title={title} body={body} />
            ))}
          </div>
        </Section>
      )}

      <FaqList faqs={c.faqs} />
      <CtaBand title="Try Infovion JMS free for 30 days" sub={c.cta ?? <>Create your shop in a minute. After the trial, <Price /> per shop plus GST, then an AMC of {AMC} a year.</>} primary={[TRIAL_LABEL, TRIAL_HREF]} whatsappText={c.whatsappText ?? "Hello Infovion, I would like to know more about Infovion JMS for our jewellery shop."} />
    </>
  );
}

export const JmsBillingPage = () => <JmsLanding k="jewellery-billing-software" />;
export const GirviPage = () => <JmsLanding k="girvi-software" />;
export const BarcodePage = () => <JmsLanding k="jewellery-barcode-software" />;
export const UaePage = () => <JmsLanding k="jewellery-software-uae" />;
export const MoneyLendingPage = () => <JmsLanding k="money-lending-software" />;
export const TallyPage = () => <JmsLanding k="jewellery-software-with-tally" />;
export const SchemePage = () => <JmsLanding k="gold-scheme-software" />;
export const KarigarPage = () => <JmsLanding k="karigar-management-software" />;
export const GstPage = () => <JmsLanding k="jewellery-gst-software" />;
export const BranchesPage = () => <JmsLanding k="multi-branch-jewellery-software" />;
export const OfflinePage = () => <JmsLanding k="offline-jewellery-billing-software" />;
export const LanguagesPage = () => <JmsLanding k="jewellery-software-in-indian-languages" />;
/** The page for one Indian language, by its slug (hindi, tamil...). */
export const LanguagePage = ({ lang }) => <JmsLanding k={`jewellery-software-${lang}`} />;