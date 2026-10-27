import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Download, FileText, Plus, Printer, Trash2 } from "lucide-react";
import { AnswerBox, CtaBand, FaqList, LinkRow, PageHero, Section } from "../../components/site/Ui";
import { SITE, jmsTrial } from "../../Data/company";
import { track } from "../../lib/analytics";
import { billHtml, girviHtml, girviTerms, karigarHtml, oldGoldHtml, printHtml, uaeInvoiceHtml } from "../../lib/jewelleryFormats";

// Free jewellery formats: fill in the shop once, see the A4 page as you type, print it or save it as
// a PDF, print a blank pad with the shop's name, or download the same format as an Excel sheet
// (built by scripts/formats-xlsx.py into public/formats/). Nothing leaves the browser.

const [TRIAL_HREF, TRIAL_LABEL] = jmsTrial();
const SHOP_KEY = "infovion-jms-format-shop";
const field = "w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-slate-500 outline-none transition focus:border-sky-300/60 focus:bg-white/[0.06]";
const opt = "bg-slate-900";

const FORMATS = {
  "jewellery-bill-format": {
    kind: "bill",
    name: "Jewellery GST bill format",
    title: "Jewellery Bill Format with GST: Free PDF and Excel | Infovion",
    description: "Free jewellery GST bill format: your shop name and GSTIN, HSN, HUID, weight, rate, making charges, 3% GST, old gold and amount in words. Print, PDF or Excel.",
    h1: "Jewellery bill format with GST",
    sub: "A GST tax invoice for a jewellery shop, worked out as you type: weight × rate, making charges, stones, discount, 3% GST split into CGST and SGST (or IGST), old gold and advance, and the amount in words. Print it, save it as a PDF, print a blank pad with your shop's name, or download it for Excel.",
    answerQ: "What should a jewellery GST bill contain?",
    answer: "A jewellery tax invoice in India shows the shop's name, address and GSTIN; a serial invoice number and date; the customer's name, and their GSTIN if registered (with address and state when the value is ₹50,000 or more); for each piece its description, HSN code (7113 for jewellery), HUID, purity, gross and net weight, rate per gram, making and stone charges and value; the taxable value after discount; CGST and SGST at 1.5% each, or IGST at 3%; the total in figures and words; and a signature. Old gold and advances are deducted after GST.",
    how: [
      "Enter your shop's name, address, phone and GSTIN once; they are remembered on this device.",
      "Fill the invoice number and date, the customer, and the place of supply (your state, or the customer's state for an inter-state sale).",
      "Add each piece: description, HSN (7113 for gold, silver and diamond jewellery), HUID, purity, gross and net weight, today's rate per gram and the making charge.",
      "Choose how making is charged: per gram, as a % of the metal value, or per piece.",
      "Add a discount (it is taken off before GST), and old gold or an advance (taken off after GST).",
      "Print, save as PDF, or download the Excel sheet. To keep blank pads, use Print blank: your shop's name is printed and the rest is left empty.",
    ],
    faqs: [
      ["Is GST charged on making charges on a jewellery bill?", "Yes. GST is 3% of the full value of the jewellery, making charges included, whether or not the making is shown separately (CBIC sectoral FAQ on gems and jewellery). Show the metal value and making as a break-up of the piece's value rather than as separate items taxed at different rates."],
      ["Which HSN code goes on a jewellery bill?", "7113 for articles of jewellery of precious metal (gold, silver, platinum, with or without stones), 7114 for goldsmiths' and silversmiths' wares, and 7117 for imitation jewellery. A business with turnover up to ₹5 crore must show at least 4 digits on B2B invoices; above ₹5 crore, 6 digits on every invoice."],
      ["Is old gold deducted before or after GST?", "After. GST is charged on the value of the new jewellery; the old gold's value is then taken off the amount the customer pays, as a payment. This format does it that way."],
      ["Does the bill need the customer's PAN?", "For a sale over ₹2 lakh, yes: Income Tax Rule 114B requires the buyer's PAN, or Form 60 if they have none. Cash of ₹2 lakh or more for one bill cannot be accepted (section 269ST)."],
      ["Is the HUID needed on the bill?", "Hallmarked jewellery carries a six-character HUID, and BIS advises buyers to take a bill that lists the hallmarked pieces. Writing the HUID on each line lets the customer check it in the BIS CARE app."],
      ["Can I use this format in Hindi or Marathi?", "Yes. Choose English + हिन्दी or English + मराठी and every label prints in both languages."],
    ],
    links: [["/gst-on-gold-jewellery", "GST on gold jewellery", "Rates on gold, silver, diamonds, making charges, job work and repairs."], ["/hsn-code-for-jewellery", "HSN codes for jewellery", "7113, 7114, 7117 and the rest of chapter 71, with GST rates."], ["/blog/jewellery-billing-gst-making-charges-old-gold", "Guide: the jewellery GST bill", "A worked example with discount, old gold and advance."], ["/gold-price-calculator", "Gold price calculator", "The same sum for one piece, shared on WhatsApp."]],
  },
  "jewellery-estimate-format": {
    kind: "estimate",
    name: "Jewellery estimate format",
    title: "Jewellery Estimate Format: Free Printable and Excel | Infovion",
    description: "Free jewellery estimate (quotation) format with your shop's name: weight, today's rate, making charges and estimated GST. Print, save as PDF or download Excel.",
    h1: "Jewellery estimate format",
    sub: "A clear written estimate for a customer who is still deciding or has placed an order: weight, today's rate, making charges, stones and the estimated GST, with the date the rate applies to. Print it, save it as a PDF, or download it for Excel.",
    answerQ: "What is a jewellery estimate?",
    answer: "A jewellery estimate, or quotation, tells the customer what a piece will cost at today's rate: weight × rate per gram for the purity, plus making and stone charges, with GST shown as an estimate. It is not a tax invoice and carries no GSTIN or invoice number, and it should say the date the rate applies to, because the final bill is made at the rate on the day of purchase or as booked on the order.",
    how: [
      "Enter your shop's details once.",
      "Write the customer's name and mobile and the estimate number and date.",
      "Add each piece with its expected net weight, purity, today's rate and making charge.",
      "Keep GST on to show the customer the full expected price, or switch it off for a metal-and-making estimate.",
      "Print or share the PDF. If the customer books, record the advance and the booked rate on the order.",
    ],
    faqs: [
      ["Is an estimate the same as a kacha bill?", "No. An estimate tells the customer the expected price before they buy. A sale has to be billed on a tax invoice; an estimate cannot replace it."],
      ["Should the estimate include GST?", "It is clearer for the customer to see the full expected price, so show GST at 3% as an estimate. Switch it off if you only want to quote metal and making."],
      ["Can the rate be held for the customer?", "That is your shop's decision. If you agree to hold the rate, write it on the customer's order with the advance taken; Infovion JMS keeps a booked rate on the order and bills at it on delivery."],
    ],
    links: [["/jewellery-bill-format", "Jewellery GST bill format", "The tax invoice for when the customer buys."], ["/karigar-management-software", "Orders and karigar", "Orders with advances and booked rates in Infovion JMS."], ["/gold-price-calculator", "Gold price calculator", "Price one piece and share it on WhatsApp."]],
  },
  "girvi-receipt-format": {
    kind: "girvi",
    name: "Girvi receipt format",
    title: "Girvi Receipt Format (Gahan Pavti): Free PDF and Excel | Infovion",
    description: "Free girvi (gahan) receipt format: pledger, ID, ornaments with weight and purity, loan, interest rate, due date, terms and a release slip. Hindi, Marathi, English.",
    h1: "Girvi receipt format",
    sub: "A girvi (gahan) pledge receipt with your shop's name: the pledger and their ID, each ornament with its weight and purity, the loan in figures and words, the monthly interest and due date, the terms, and a release slip at the bottom. In English, English + हिन्दी or English + मराठी.",
    answerQ: "What should a girvi receipt contain?",
    answer: "A girvi receipt records a running pledge number and date; the pledger's name, father's or husband's name, address, mobile and ID proof; each ornament with its pieces, gross and net weight and purity; the amount lent, in figures and words; the monthly interest rate and how part months are counted; the due date; the terms on which the ornaments are returned; and both signatures. A release slip records the date, principal, interest and the pledger's signature for receiving the ornaments back.",
    how: [
      "Enter your shop's details once, including your money-lending licence number if your state requires one.",
      "Fill the girvi number and date, the due date, and the pledger with their ID proof.",
      "List each ornament with its pieces, gross and net weight and purity, as checked in front of the pledger.",
      "Enter the loan amount and the monthly interest rate, and choose whether interest is counted by days or in full months, and any minimum period.",
      "Read the terms and change them to match your shop's practice and your state's money-lending law.",
      "Print two copies: one for the pledger, one for your register. Fill the release slip when the ornaments are returned.",
    ],
    faqs: [
      ["How is girvi interest calculated?", "Usually as simple interest at a monthly rate: loan × rate × days ÷ 30. ₹50,000 at 2% a month for 100 days is ₹3,333.33. Some shops count full months instead, and many charge a minimum period; write your rule on the receipt."],
      ["What is the difference between girvi and gahan?", "None: both mean jewellery pledged against a loan. Girvi is the usual word in Hindi, gahan in Marathi."],
      ["Does a jeweller need a licence for girvi?", "Lending money as a business is regulated by state money-lenders acts, such as the Maharashtra Money-Lending (Regulation) Act, 2014, which usually require a licence, prescribed registers and receipts, and cap interest. Check your state's rules."],
      ["Should the receipt have a photo of the ornaments?", "It helps in any dispute. Infovion JMS prints the ornament photo on the pledge receipt; with a paper receipt, staple a photo to your copy."],
    ],
    links: [["/girvi-interest-calculator", "Girvi interest calculator", "Interest by days, with a minimum period."], ["/blog/girvi-register-guide-for-jewellers", "Guide: the girvi register", "What to record, interest examples and the law."], ["/girvi-software", "Girvi software", "The girvi register in Infovion JMS, with interest to date."]],
  },
  "old-gold-purchase-voucher-format": {
    kind: "oldGold",
    name: "Old gold purchase voucher format",
    title: "Old Gold Purchase Bill Format: Free Voucher, PDF, Excel | Infovion",
    description: "Free old gold purchase voucher for jewellers: seller and ID, gross and less weight, tested touch, fine gold, 24K rate, deduction, amount paid and the seller's declaration.",
    h1: "Old gold purchase voucher format",
    sub: "For buying old gold from a customer: the seller and their ID, each piece's gross weight, stones and dirt deducted, the tested touch and fine weight, the 24K rate, your deduction, the amount paid in words, and the seller's declaration that the gold is theirs.",
    answerQ: "How is old gold valued when a jeweller buys it?",
    answer: "The jeweller weighs each piece, deducts stones and dirt to get the net weight, tests the purity (touch) and works out the fine gold: net weight × touch ÷ 100. The fine gold is valued at the day's 24K rate per gram, and the shop's deduction for melting and testing losses is taken off. A purchase voucher records the seller and their ID, the weights, touch, fine gold, rate, deduction and the amount paid, with the seller's signed declaration that they own the gold.",
    how: [
      "Enter your shop's details once.",
      "Fill the voucher number and date, the seller with their ID proof, and their PAN for a large purchase.",
      "For each piece, enter the gross weight, the less weight (stones, dirt) and the tested touch %; the fine weight and value follow.",
      "Enter today's 24K rate per gram and your deduction %.",
      "Have the seller read and sign the declaration, and pay by the method shown.",
    ],
    faqs: [
      ["Is GST payable when a jeweller buys old gold from a customer?", "A registered jeweller buying old gold from an individual who is not registered pays no GST on the purchase: reverse charge on purchases from unregistered persons applies since February 2019 only to categories the government notifies, and old gold is not one of them. See our page on GST on old gold."],
      ["How do I work out fine gold from touch?", "Fine gold = net weight × touch ÷ 100. 20 g at 91.6 touch is 18.32 g of fine gold."],
      ["Why take the seller's ID?", "To know who sold the gold if it is ever questioned, to meet the KYC your bank or the law asks for, and to apply the PAN and cash rules on large amounts."],
    ],
    links: [["/gst-on-old-gold", "GST on old gold", "Exchange, purchase from customers and the margin scheme."], ["/gold-price-calculator", "Gold price calculator", "Old gold exchange on a new bill."], ["/blog/karigar-fine-gold-touch-wastage-calculation", "Fine gold and touch", "Worked examples of fine gold, touch and wastage."]],
  },
  "karigar-issue-slip-format": {
    kind: "karigar",
    name: "Karigar issue and receipt slip",
    title: "Karigar Slip Format: Gold Issue and Receipt, Fine Gold | Infovion",
    description: "Free karigar slip format: gold issued with weight, touch and fine gold, work received with wastage, fine gold credited, balance with the karigar and labour payable.",
    h1: "Karigar issue and receipt slip format",
    sub: "One slip for every job given to a karigar: the gold issued in weight, touch and fine gold, the work received back with the agreed wastage, the fine gold credited, the balance still with the karigar, and the labour payable.",
    answerQ: "How is a karigar's fine gold balance worked out?",
    answer: "Gold issued to a karigar is counted as fine gold: weight × touch ÷ 100. When the work comes back, the fine gold in it is its weight × touch ÷ 100, and the agreed wastage is added as a percentage of that. The fine gold still with the karigar is the fine gold issued less the fine gold credited. Labour is paid in money, usually per gram of the finished work.",
    how: [
      "Enter your shop's details once.",
      "Fill the slip number, date, karigar, the order or design and the due date.",
      "Under Metal issued, list the gold given: weight and touch.",
      "When the work comes back, list it with its pieces, weight, touch and the agreed wastage %.",
      "Enter the labour per gram; the slip shows the fine gold balance and the labour payable.",
      "Both sign, and the karigar keeps a copy.",
    ],
    faqs: [
      ["What touch is 22K gold?", "91.6. 18K is 75 and 14K is 58.5. 24K fine gold is usually 99.5 or 99.9."],
      ["Is wastage added to the weight or the touch?", "Either can be agreed. This slip adds wastage as a percentage of the fine gold in the work; some workshops add extra touch instead (94.6 for 22K work with 3 points of wastage), which comes to the same idea. Write down which one you use."],
      ["Is GST payable on karigar labour?", "A registered karigar doing job work on your gold charges GST at 5% on the job charges, and you can take credit for it (CBIC sectoral FAQ on gems and jewellery). Confirm your case with your CA."],
    ],
    links: [["/blog/karigar-fine-gold-touch-wastage-calculation", "Guide: fine gold, touch and wastage", "Worked examples for karigar accounts."], ["/karigar-management-software", "Orders and karigar software", "Karigar jobs and fine-gold balances in Infovion JMS."]],
  },
  "uae-jewellery-tax-invoice-format": {
    kind: "uae",
    name: "UAE jewellery tax invoice format",
    title: "UAE Jewellery Tax Invoice Format: AED, 5% VAT, TRN | Infovion",
    description: "Free UAE VAT tax invoice for jewellery shops: TRN, AED rate per gram by karat, making, stones, 5% VAT, reverse charge for dealers, amount in words. Print or Excel.",
    h1: "UAE jewellery tax invoice format",
    sub: "A VAT tax invoice for jewellery shops in Dubai and across the UAE: your TRN, the customer's TRN for business buyers, each piece by karat, weight and AED rate per gram, making and stones, 5% VAT on the full value, old gold, and the amount in words. With a reverse-charge option for sales to registered dealers.",
    answerQ: "What must a UAE tax invoice for jewellery show?",
    answer: "A UAE tax invoice shows the words Tax Invoice; the supplier's name, address and TRN; the customer's name and address, and their TRN if they are VAT-registered; a sequential invoice number; the date of issue and the date of supply if different; a description, quantity and price of each item; the VAT rate and amounts in AED; any discount; and the total payable. Retail jewellery carries 5% VAT on metal, making and stones. A sale of gold or jewellery to a registered dealer who buys it for resale falls under the reverse charge, and the invoice says so.",
    how: [
      "Enter your shop's name, address and TRN once.",
      "Fill the invoice number and dates, the customer and, for a business buyer, their TRN.",
      "Add each piece with its karat, net weight, the day's AED rate per gram for that karat, making charge and stones.",
      "Tick Reverse charge only for a sale to a VAT-registered dealer who buys for resale and has given you their declaration.",
      "Print, save as PDF, or download the Excel sheet.",
    ],
    faqs: [
      ["Is VAT charged on making charges in the UAE?", "Yes. For jewellery sold to a consumer, VAT at 5% applies to the full value of the piece: metal, making and stones."],
      ["When does the reverse charge apply to gold and jewellery?", "Since February 2025, Cabinet Decision No. 127 of 2024 applies the reverse charge to supplies of gold, silver, platinum, palladium, diamonds, pearls and other precious stones, and of jewellery whose precious content outweighs its other components, between VAT-registered businesses where the buyer intends to resell them or use them to make such goods. The seller charges no VAT and keeps the buyer's declaration; the buyer accounts for the VAT."],
      ["Does the invoice have to be in Arabic?", "Many UAE shops issue tax invoices in English, and this format also carries the Arabic for Tax Invoice in its title. The Federal Tax Authority can ask for an Arabic translation of records, so check with your tax agent if you need a fully bilingual invoice."],
      ["Does this format meet the UAE e-invoicing rules?", "No. E-invoicing will require invoices to be sent as structured data through an Accredited Service Provider, from 1 January 2027 for businesses with revenue of AED 50 million or more and from 1 July 2027 for others. A printed or PDF invoice is not an e-invoice."],
    ],
    links: [["/uae-vat-on-gold", "UAE VAT on gold and jewellery", "5% VAT, zero-rated investment gold, reverse charge and e-invoicing."], ["/dubai-gold-price-calculator", "Dubai gold price calculator", "AED rate by karat, making and 5% VAT."], ["/jewellery-software-uae", "Jewellery software for the UAE", "Infovion JMS in AED, with VAT tax invoices and your TRN."]],
    uae: true,
  },
};

const FORMAT_LIST = Object.entries(FORMATS).map(([slug, f]) => [`/${slug}`, f.name, f.description]);

const today = () => new Date().toISOString().slice(0, 10);
const plusDays = (n) => new Date(Date.now() + n * 86400000).toISOString().slice(0, 10);

const START = {
  bill: { v: { number: "INV-0001", state: "Maharashtra (27)", makingType: "gram", payment: "Cash / UPI", discount: "", oldValue: "", oldDesc: "", advance: "" }, rows: [{ desc: "Gold chain", hsn: "7113", huid: "", purity: "22K", gross: "10.250", net: "10.000", rate: "7250", making: "600", other: "" }] },
  estimate: { v: { number: "EST-0001", makingType: "gram", payment: "", discount: "" }, rows: [{ desc: "Gold bangles (pair)", hsn: "", huid: "", purity: "22K", gross: "", net: "24.000", rate: "7250", making: "550", other: "" }] },
  girvi: { v: { number: "G-0001", amount: "50000", rate: "2", interestRule: "days", minDays: "15" }, rows: [{ desc: "Gold chain", pcs: "1", gross: "12.400", net: "12.100", purity: "22K" }] },
  oldGold: { v: { number: "OG-0001", rate24: "7900", deduction: "2", payment: "Bank transfer" }, rows: [{ desc: "Old bangles", gross: "20.400", less: "0.400", touch: "91.6" }] },
  karigar: { v: { number: "K-0001", labourPerGram: "350" }, issue: [{ desc: "Fine gold bar", wt: "50.000", touch: "99.5" }, { desc: "Old gold (melted)", wt: "20.000", touch: "91.6" }], receipt: [{ desc: "22K chains", pcs: "6", wt: "72.000", touch: "91.6", wastage: "3" }] },
  uae: { v: { number: "0001", makingType: "gram", payment: "Card", discount: "", oldValue: "", oldDesc: "", reverseCharge: false }, rows: [{ desc: "Bangle", karat: "21K", net: "18.420", rate: "374.25", making: "22", other: "" }] },
};

const COLUMNS = {
  bill: [["desc", "Description", "text", "sm:col-span-2"], ["hsn", "HSN", "text"], ["huid", "HUID", "text"], ["purity", "Purity", "text"], ["gross", "Gross wt (g)", "num"], ["net", "Net wt (g)", "num"], ["rate", "Rate / g (₹)", "num"], ["making", "Making", "num"], ["other", "Stone / other (₹)", "num"]],
  girvi: [["desc", "Ornament", "text", "sm:col-span-2"], ["pcs", "Pieces", "num"], ["gross", "Gross wt (g)", "num"], ["net", "Net wt (g)", "num"], ["purity", "Purity", "text"]],
  oldGold: [["desc", "Description", "text", "sm:col-span-2"], ["gross", "Gross wt (g)", "num"], ["less", "Less wt (g)", "num"], ["touch", "Touch %", "num"]],
  issue: [["desc", "Metal issued", "text", "sm:col-span-2"], ["wt", "Weight (g)", "num"], ["touch", "Touch %", "num"]],
  receipt: [["desc", "Work received", "text", "sm:col-span-2"], ["pcs", "Pieces", "num"], ["wt", "Weight (g)", "num"], ["touch", "Touch %", "num"], ["wastage", "Wastage %", "num"]],
  uae: [["desc", "Description", "text", "sm:col-span-2"], ["karat", "Karat", "text"], ["net", "Net wt (g)", "num"], ["rate", "Rate / g (AED)", "num"], ["making", "Making (AED)", "num"], ["other", "Stones / other (AED)", "num"]],
};
COLUMNS.estimate = COLUMNS.bill.filter(([k]) => k !== "hsn");

function Field({ label, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs text-slate-400">{label}</span>
      {children}
    </label>
  );
}

function Legend({ children, note }) {
  return <legend className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">{children}{note && <span className="ml-1 normal-case tracking-normal text-slate-500">{note}</span>}</legend>;
}

/** Editable item rows, one card per row so they fit a phone. */
function Rows({ cols, rows, setRows, blankRow, label }) {
  const set = (i, k) => (e) => setRows(rows.map((r, j) => (j === i ? { ...r, [k]: e.target.value } : r)));
  return (
    <div className="space-y-3">
      {rows.map((r, i) => (
        <div key={i} className="rounded-lg border border-white/10 p-3">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
            <span>{label} {i + 1}</span>
            {rows.length > 1 && (
              <button type="button" onClick={() => setRows(rows.filter((_, j) => j !== i))} className="inline-flex items-center gap-1 text-slate-400 hover:text-rose-300" aria-label={`Remove ${label.toLowerCase()} ${i + 1}`}>
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {cols.map(([k, l, type, span]) => (
              <Field key={k} label={l} className={span || ""}>
                <input className={field} inputMode={type === "num" ? "decimal" : undefined} value={r[k] ?? ""} onChange={set(i, k)} />
              </Field>
            ))}
          </div>
        </div>
      ))}
      {rows.length < 12 && (
        <button type="button" onClick={() => setRows([...rows, { ...blankRow }])} className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-sky-200">
          <Plus className="h-4 w-4" /> Add {label.toLowerCase()}
        </button>
      )}
    </div>
  );
}

function FormatTool({ slug }) {
  const f = FORMATS[slug];
  const start = START[f.kind];
  const [lang, setLang] = useState("en");
  const [shop, setShop] = useState({});
  const [v, setV] = useState(start.v);
  const [rows, setRows] = useState(start.rows || []);
  const [issue, setIssue] = useState(start.issue || []);
  const [receipt, setReceipt] = useState(start.receipt || []);
  const [terms, setTerms] = useState(null); // null = the standard terms, in the chosen language

  // Shop details are remembered in this browser only; dates are filled in the browser so the page
  // built ahead of time never carries a stale date.
  useEffect(() => {
    try { setShop(JSON.parse(localStorage.getItem(SHOP_KEY) || "{}")); } catch { /* storage unavailable */ }
    setV((s) => ({ ...s, date: today(), ...(f.kind === "girvi" ? { due: plusDays(365) } : {}), ...(f.kind === "karigar" ? { due: plusDays(10) } : {}) }));
  }, [f.kind]);
  const saveShop = (k) => (e) => {
    const next = { ...shop, [k]: e.target.value };
    setShop(next);
    try { localStorage.setItem(SHOP_KEY, JSON.stringify(next)); } catch { /* storage unavailable */ }
  };
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const shownTerms = terms ?? girviTerms(lang, v).join("\n");
  const make = (isBlank) => {
    const a = { shop: { ...shop, taxId: f.kind === "girvi" ? shop.licence : shop.taxId }, v, rows, lang, isBlank };
    if (f.kind === "bill") return billHtml(a);
    if (f.kind === "estimate") return billHtml({ ...a, estimate: true });
    if (f.kind === "girvi") return girviHtml({ ...a, terms: shownTerms.split("\n").map((x) => x.trim()).filter(Boolean) });
    if (f.kind === "oldGold") return oldGoldHtml(a);
    if (f.kind === "karigar") return karigarHtml({ ...a, issue, receipt });
    return uaeInvoiceHtml(a);
  };
  const html = useMemo(() => make(false), [shop, v, rows, issue, receipt, lang, shownTerms]); // eslint-disable-line react-hooks/exhaustive-deps

  const print = (isBlank) => {
    printHtml(isBlank ? make(true) : html);
    track(isBlank ? "format_print_blank" : "format_print", { format: slug });
  };

  const taxLabel = f.uae ? "TRN" : "GSTIN";
  const blankRow = Object.fromEntries((COLUMNS[f.kind] || []).map(([k]) => [k, f.kind === "bill" && k === "hsn" ? "7113" : ""]));

  return (
    <Section className="pt-0">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <form className="panel space-y-6 rounded-xl p-5 sm:p-7" onSubmit={(e) => e.preventDefault()}>
          {!f.uae && (
            <div className="flex flex-wrap gap-2" role="group" aria-label="Language of the labels">
              {[["en", "English"], ["hi", "English + हिन्दी"], ["mr", "English + मराठी"]].map(([k, t]) => (
                <button key={k} type="button" onClick={() => setLang(k)} aria-pressed={lang === k}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1 ${lang === k ? "bg-sky-400/15 text-sky-200 ring-sky-300/40" : "text-slate-400 ring-white/10 hover:text-white"}`}>{t}</button>
              ))}
            </div>
          )}

          <fieldset className="space-y-2.5">
            <Legend note="(remembered on this device)">Your shop</Legend>
            <input aria-label="Shop name" className={field} placeholder="Shop name" value={shop.name || ""} onChange={saveShop("name")} />
            <input aria-label="Address" className={field} placeholder="Address" value={shop.address || ""} onChange={saveShop("address")} />
            <div className="grid grid-cols-2 gap-2.5">
              <input aria-label="Phone" className={field} placeholder="Phone" value={shop.phone || ""} onChange={saveShop("phone")} />
              {f.kind === "girvi"
                ? <input aria-label="Money-lending licence number" className={field} placeholder="Licence no." value={shop.licence || ""} onChange={saveShop("licence")} />
                : <input aria-label={`Shop ${taxLabel}`} className={field} placeholder={taxLabel} value={shop.taxId || ""} onChange={saveShop("taxId")} />}
            </div>
            <input aria-label="Another line, such as email or BIS registration" className={field} placeholder="Another line (email, BIS registration…)" value={shop.extra || ""} onChange={saveShop("extra")} />
          </fieldset>

          <fieldset className="space-y-2.5">
            <Legend>{f.kind === "karigar" ? "Job" : f.kind === "oldGold" ? "Seller" : f.kind === "girvi" ? "Pledger" : "Customer"}</Legend>
            <div className="grid grid-cols-2 gap-2.5">
              <Field label="Number"><input className={field} value={v.number || ""} onChange={set("number")} /></Field>
              <Field label="Date"><input className={field} type="date" value={v.date || ""} onChange={set("date")} /></Field>
              {f.kind === "karigar" ? (
                <>
                  <Field label="Karigar"><input className={field} value={v.karigar || ""} onChange={set("karigar")} /></Field>
                  <Field label="Mobile"><input className={field} inputMode="tel" value={v.mobile || ""} onChange={set("mobile")} /></Field>
                  <Field label="Order / design"><input className={field} value={v.order || ""} onChange={set("order")} /></Field>
                  <Field label="Due date"><input className={field} type="date" value={v.due || ""} onChange={set("due")} /></Field>
                  <Field label="Work to be made" className="col-span-2"><input className={field} value={v.work || ""} onChange={set("work")} placeholder="e.g. 6 chains, 22K, 12 g each" /></Field>
                </>
              ) : (
                <>
                  <Field label="Name" className="col-span-2"><input className={field} value={v.customer || ""} onChange={set("customer")} /></Field>
                  {f.kind === "girvi" && <Field label="Father's or husband's name" className="col-span-2"><input className={field} value={v.relation || ""} onChange={set("relation")} /></Field>}
                  <Field label="Address" className="col-span-2"><input className={field} value={v.address || ""} onChange={set("address")} /></Field>
                  <Field label="Mobile"><input className={field} inputMode="tel" value={v.mobile || ""} onChange={set("mobile")} /></Field>
                  {f.kind === "bill" && <Field label="Customer GSTIN"><input className={field} value={v.gstin || ""} onChange={set("gstin")} /></Field>}
                  {f.kind === "uae" && <Field label="Customer TRN"><input className={field} value={v.trn || ""} onChange={set("trn")} /></Field>}
                  {(f.kind === "girvi" || f.kind === "oldGold") && <Field label="ID proof and number"><input className={field} value={v.idProof || ""} onChange={set("idProof")} placeholder="Aadhaar XXXX 1234" /></Field>}
                  {(f.kind === "bill" || f.kind === "oldGold") && <Field label="PAN (bills over ₹2 lakh)"><input className={field} value={v.pan || ""} onChange={set("pan")} /></Field>}
                  {f.kind === "bill" && <Field label="Place of supply"><input className={field} value={v.state || ""} onChange={set("state")} /></Field>}
                  {f.kind === "girvi" && <Field label="Due date"><input className={field} type="date" value={v.due || ""} onChange={set("due")} /></Field>}
                  {f.kind === "uae" && <Field label="Date of supply (if different)"><input className={field} type="date" value={v.supplyDate || ""} onChange={set("supplyDate")} /></Field>}
                  {["bill", "oldGold", "uae"].includes(f.kind) && <Field label="Payment"><input className={field} value={v.payment || ""} onChange={set("payment")} /></Field>}
                </>
              )}
            </div>
          </fieldset>

          {f.kind === "karigar" ? (
            <>
              <fieldset><Legend>Metal issued</Legend><Rows cols={COLUMNS.issue} rows={issue} setRows={setIssue} blankRow={{ desc: "", wt: "", touch: "" }} label="Issue" /></fieldset>
              <fieldset><Legend>Work received</Legend><Rows cols={COLUMNS.receipt} rows={receipt} setRows={setReceipt} blankRow={{ desc: "", pcs: "", wt: "", touch: "", wastage: "" }} label="Receipt" /></fieldset>
              <Field label="Labour per gram of work received (₹)"><input className={field} inputMode="decimal" value={v.labourPerGram || ""} onChange={set("labourPerGram")} /></Field>
            </>
          ) : (
            <fieldset>
              <Legend>{f.kind === "girvi" ? "Ornaments pledged" : "Items"}</Legend>
              {["bill", "estimate", "uae"].includes(f.kind) && (
                <Field label="Making charges entered as" className="mb-3">
                  <select className={field} value={v.makingType} onChange={set("makingType")}>
                    <option value="gram" className={opt}>{f.uae ? "AED" : "₹"} per gram</option>
                    {!f.uae && <option value="percent" className={opt}>% of the metal value</option>}
                    <option value="piece" className={opt}>{f.uae ? "AED" : "₹"} for the piece</option>
                  </select>
                </Field>
              )}
              <Rows cols={COLUMNS[f.kind]} rows={rows} setRows={setRows} blankRow={blankRow} label={f.kind === "girvi" ? "Ornament" : "Item"} />
            </fieldset>
          )}

          {(f.kind === "bill" || f.kind === "estimate" || f.uae) && (
            <fieldset className="space-y-2.5">
              <Legend>Totals</Legend>
              <div className="grid grid-cols-2 gap-2.5">
                <Field label={`Discount (${f.uae ? "AED" : "₹"}, before ${f.uae ? "VAT" : "GST"})`}><input className={field} inputMode="decimal" value={v.discount || ""} onChange={set("discount")} /></Field>
                {f.kind !== "estimate" && <Field label={`Old gold value (${f.uae ? "AED" : "₹"})`}><input className={field} inputMode="decimal" value={v.oldValue || ""} onChange={set("oldValue")} /></Field>}
                {f.kind !== "estimate" && <Field label="Old gold details" className="col-span-2"><input className={field} value={v.oldDesc || ""} onChange={set("oldDesc")} placeholder={f.uae ? "e.g. 8.500 g, 21K" : "e.g. 4.000 g, 22K, tested 91.6"} /></Field>}
                {f.kind === "bill" && <Field label="Advance paid (₹)"><input className={field} inputMode="decimal" value={v.advance || ""} onChange={set("advance")} /></Field>}
              </div>
              {f.kind === "bill" && (
                <label className="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" checked={!!v.interState} onChange={set("interState")} /> Inter-state sale: charge IGST 3% instead of CGST + SGST</label>
              )}
              {f.kind === "estimate" && (
                <label className="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" checked={!v.noTax} onChange={(e) => setV((s) => ({ ...s, noTax: !e.target.checked }))} /> Show estimated GST at 3%</label>
              )}
              {f.uae && (
                <label className="flex items-start gap-2 text-sm text-slate-300"><input type="checkbox" className="mt-1" checked={!!v.reverseCharge} onChange={set("reverseCharge")} /> Reverse charge: sale to a VAT-registered dealer buying for resale (no VAT charged; the buyer accounts for it)</label>
              )}
            </fieldset>
          )}

          {f.kind === "girvi" && (
            <fieldset className="space-y-2.5">
              <Legend>Loan and interest</Legend>
              <div className="grid grid-cols-2 gap-2.5">
                <Field label="Loan amount (₹)"><input className={field} inputMode="decimal" value={v.amount || ""} onChange={set("amount")} /></Field>
                <Field label="Interest % a month"><input className={field} inputMode="decimal" value={v.rate || ""} onChange={set("rate")} /></Field>
                <Field label="Interest counted">
                  <select className={field} value={v.interestRule} onChange={(e) => { setTerms(null); set("interestRule")(e); }}>
                    <option value="days" className={opt}>By days (30 days = 1 month)</option>
                    <option value="months" className={opt}>In full months</option>
                  </select>
                </Field>
                <Field label="Minimum period">
                  <select className={field} value={v.minDays} onChange={(e) => { setTerms(null); set("minDays")(e); }}>
                    <option value="0" className={opt}>None</option>
                    <option value="15" className={opt}>15 days</option>
                    <option value="30" className={opt}>One month</option>
                  </select>
                </Field>
              </div>
              <Field label="Terms printed on the receipt (one per line)">
                <textarea className={`${field} min-h-[9rem]`} value={shownTerms} onChange={(e) => setTerms(e.target.value)} />
              </Field>
              {terms !== null && <button type="button" onClick={() => setTerms(null)} className="text-xs font-semibold text-sky-300 hover:text-sky-200">Reset to the standard terms</button>}
            </fieldset>
          )}

          {f.kind === "oldGold" && (
            <fieldset className="grid grid-cols-2 gap-2.5">
              <Field label="Today's 24K rate per gram (₹)"><input className={field} inputMode="decimal" value={v.rate24 || ""} onChange={set("rate24")} /></Field>
              <Field label="Deduction %"><input className={field} inputMode="decimal" value={v.deduction || ""} onChange={set("deduction")} /></Field>
            </fieldset>
          )}
          <p className="text-xs text-slate-500">Everything stays in your browser. Nothing you type is sent to us.</p>
        </form>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-xl bg-white ring-1 ring-white/10">
            <iframe title={`${f.name} preview`} srcDoc={html} className="h-[620px] w-full sm:h-[780px]" />
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <button type="button" onClick={() => print(false)} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-200">
              <Printer className="h-4 w-4" /> Print / PDF
            </button>
            <button type="button" onClick={() => print(true)} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/5">
              <FileText className="h-4 w-4" /> Print blank
            </button>
            <a href={`/formats/${slug}.xlsx`} download onClick={() => track("format_excel", { format: slug })} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/5">
              <Download className="h-4 w-4" /> Excel
            </a>
          </div>
          <p className="mt-3 text-xs text-slate-500">Print blank keeps your shop's name and leaves the rest empty, for pads. In the print window, choose Save as PDF to keep a copy. Figures for illustration; confirm tax rates with your accountant.</p>
        </div>
      </div>
    </Section>
  );
}

function formatSchema(path, f) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: f.name,
    url: `${SITE}${path}`,
    description: f.description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any web browser",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: f.uae ? "AED" : "INR" },
    publisher: { "@id": `${SITE}/#organization` },
  };
}

export function FormatPage({ slug }) {
  const f = FORMATS[slug];
  const path = `/${slug}`;
  return (
    <>
      <Helmet>
        <title>{f.title}</title>
        <meta name="description" content={f.description} />
        <link rel="canonical" href={`${SITE}${path}`} />
        <meta property="og:title" content={f.title} />
        <meta property="og:description" content={f.description} />
        <meta property="og:url" content={`${SITE}${path}`} />
        <meta property="og:image" content={`${SITE}/og-jms.jpg`} />
        <script type="application/ld+json">{JSON.stringify(formatSchema(path, f))}</script>
      </Helmet>
      <PageHero trail={[["Infovion JMS", "/jewellery-management-software"], ["Free formats", "/jewellery-bill-formats"], [f.name, path]]} kicker={f.uae ? "Free format · United Arab Emirates" : "Free format · no sign-up"} title={f.h1} sub={f.sub} />
      <Section className="pb-8 pt-0">
        <AnswerBox q={f.answerQ}>{f.answer}</AnswerBox>
      </Section>
      <FormatTool slug={slug} />
      <Section title={`How to fill the ${f.name.charAt(0).toLowerCase()}${f.name.slice(1)}`} className="pt-4">
        <ol className="mt-6 max-w-3xl space-y-3">
          {f.how.map((t, i) => (
            <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-slate-300">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sky-400/15 text-xs font-bold text-sky-300">{i + 1}</span>{t}
            </li>
          ))}
        </ol>
      </Section>
      <FaqList faqs={f.faqs} />
      <Section kicker="Related" title="More for jewellers" className="py-10">
        <div className="mt-8 grid border-t border-white/10 md:grid-cols-2 md:gap-x-10">
          {f.links.map(([to, t, b]) => <LinkRow key={to} to={to} title={t} body={b} />)}
          <LinkRow to="/jewellery-bill-formats" title="All free jewellery formats" body="Bill, estimate, girvi receipt, old gold voucher, karigar slip and UAE tax invoice." />
        </div>
      </Section>
      <CtaBand title="Stop writing bills by hand" sub="Infovion JMS makes these bills, girvi receipts, vouchers and karigar slips from your stock and records, and keeps every balance right. Book a free demo call." primary={[TRIAL_LABEL, TRIAL_HREF]} whatsappText={`Hello Infovion, I used the free ${f.name.toLowerCase()} and would like to know about Infovion JMS for our shop.`} />
    </>
  );
}

const HUB_FAQ = [
  ["Are these jewellery bill formats free?", "Yes. Fill them in and print, save as PDF or download the Excel sheet. There is no sign-up, and nothing you type leaves your browser."],
  ["Can I print my shop's name on blank bill pads?", "Yes. Enter your shop's details and choose Print blank: the shop's name, address and GSTIN are printed and the rest of the format is left empty."],
  ["Do the Excel formats calculate the totals?", "Yes. Each sheet has formulas for the line amounts, GST or VAT, fine gold and totals, and is set up to print on one A4 page."],
  ["Are the formats in Hindi and Marathi?", "The Indian formats print in English, English + हिन्दी or English + मराठी. The UAE tax invoice is in English with the Arabic title."],
  ["Is a printed bill enough for GST?", "A printed tax invoice with the details required by Rule 46 of the CGST Rules is fine for a shop below the e-invoicing limit. A business whose turnover is above the e-invoice limit must also report B2B invoices to the IRP and print the IRN and QR code."],
];

export function FormatsHub() {
  const path = "/jewellery-bill-formats";
  return (
    <>
      <Helmet>
        <title>Free Jewellery Bill Formats: GST Bill, Girvi Receipt, Excel | Infovion</title>
        <meta name="description" content="Free jewellery shop formats: GST bill, estimate, girvi receipt, old gold purchase voucher, karigar slip and UAE VAT invoice. Print, PDF or Excel; Hindi and Marathi." />
        <link rel="canonical" href={`${SITE}${path}`} />
        <meta property="og:title" content="Free jewellery bill formats" />
        <meta property="og:url" content={`${SITE}${path}`} />
        <meta property="og:image" content={`${SITE}/og-jms.jpg`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Free jewellery bill formats",
          url: `${SITE}${path}`,
          hasPart: FORMAT_LIST.map(([to, name]) => ({ "@type": "WebApplication", name, url: `${SITE}${to}` })),
          publisher: { "@id": `${SITE}/#organization` },
        })}</script>
      </Helmet>
      <PageHero trail={[["Infovion JMS", "/jewellery-management-software"], ["Free formats", path]]} kicker="Free formats for jewellers"
        title="Free jewellery bill formats"
        sub="The documents a jewellery shop writes every day, with your shop's name on them and the sums done for you. Fill them in, print or save as PDF, print blank pads, or download them for Excel. In English, Hindi and Marathi, plus a UAE VAT invoice." />
      <Section className="pt-0">
        <AnswerBox q="Which formats does a jewellery shop need?">
          A jewellery shop needs a GST tax invoice for every sale, an estimate for customers who are deciding or ordering, a girvi receipt and register if it lends against ornaments, a purchase voucher when it buys old gold from customers, and an issue and receipt slip for gold given to karigars. Each one records weights, purity and amounts that someone may question later, so the same details should be written the same way every time.
        </AnswerBox>
        <div className="mt-10 grid border-t border-white/10 md:grid-cols-2 md:gap-x-10">
          {FORMAT_LIST.map(([to, name, body]) => <LinkRow key={to} to={to} title={name} body={body} />)}
        </div>
      </Section>
      <FaqList faqs={HUB_FAQ} />
      <Section kicker="More free tools" title="Calculators and guides" className="py-10">
        <div className="mt-8 grid border-t border-white/10 md:grid-cols-2 md:gap-x-10">
          <LinkRow to="/gold-price-calculator" title="Gold price calculator" body="Weight, purity, making charges, 3% GST and old gold." />
          <LinkRow to="/dubai-gold-price-calculator" title="Dubai gold price calculator" body="AED rate by karat, making charges and 5% VAT." />
          <LinkRow to="/girvi-interest-calculator" title="Girvi interest calculator" body="Interest on a gold loan, counted by days." />
          <LinkRow to="/jewellery-software-comparison" title="Jewellery software compared" body="Infovion JMS, TallyPrime, Vyapar and Marg, from each one's own pages." />
          <LinkRow to="/gst-on-gold-jewellery" title="GST on gold jewellery" body="Rates on jewellery, making charges, job work and repairs." />
          <LinkRow to="/hsn-code-for-jewellery" title="HSN codes for jewellery" body="Chapter 71 codes with their GST rates." />
        </div>
      </Section>
      <CtaBand title="Bills, receipts and slips without the paperwork" sub="Infovion JMS makes every one of these from your stock and records, prints it on A4 or a thermal roll, and keeps the registers. Book a free demo call." primary={[TRIAL_LABEL, TRIAL_HREF]} whatsappText="Hello Infovion, I used the free jewellery bill formats and would like to know about Infovion JMS." />
    </>
  );
}
