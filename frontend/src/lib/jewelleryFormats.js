// Free jewellery formats: GST bill, estimate, girvi receipt, old gold purchase voucher, karigar slip
// and a UAE VAT tax invoice, as printable one-page A4 documents. The sums follow Infovion JMS
// (shared/billing.js in the JMS repo) and the calculators on this site, so a bill made here
// matches the one JMS would print. Everything runs in the browser; nothing is uploaded.
import { dateFigures } from "./words";

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export const num = (v) => Math.max(0, Number(String(v ?? "").replace(/,/g, "")) || 0);
const r2 = (v) => Math.round(v * 100) / 100;
const r3 = (v) => Math.round(v * 1000) / 1000;

// ── Amounts in words ─────────────────────────────────────────────────────────

const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const below100 = (n) => (n < 20 ? ONES[n] : `${TENS[Math.floor(n / 10)]}${n % 10 ? `-${ONES[n % 10]}` : ""}`);
const below1000 = (n) => [n >= 100 ? `${ONES[Math.floor(n / 100)]} Hundred` : "", n % 100 ? below100(n % 100) : ""].filter(Boolean).join(" ");

/** 80855 → "Eighty Thousand Eight Hundred Fifty-Five" (Indian system: thousand, lakh, crore). */
function indianWords(n) {
  if (!n) return "Zero";
  const parts = [];
  const crore = Math.floor(n / 1e7);
  if (crore) parts.push(`${indianWords(crore)} Crore`);
  n %= 1e7;
  const lakh = Math.floor(n / 1e5);
  if (lakh) parts.push(`${below100(lakh)} Lakh`);
  n %= 1e5;
  const thousand = Math.floor(n / 1000);
  if (thousand) parts.push(`${below100(thousand)} Thousand`);
  n %= 1000;
  if (n) parts.push(below1000(n));
  return parts.join(" ");
}

/** International system, for dirhams: thousand, million. */
function intlWords(n) {
  if (!n) return "Zero";
  const parts = [];
  const million = Math.floor(n / 1e6);
  if (million) parts.push(`${intlWords(million)} Million`);
  n %= 1e6;
  const thousand = Math.floor(n / 1000);
  if (thousand) parts.push(`${below1000(thousand)} Thousand`);
  n %= 1000;
  if (n) parts.push(below1000(n));
  return parts.join(" ");
}

export function rupeesInWords(v) {
  const rupees = Math.floor(r2(v));
  const paise = Math.round((r2(v) - rupees) * 100);
  return `Rupees ${indianWords(rupees)}${paise ? ` and ${below100(paise)} Paise` : ""} Only`;
}

export function dirhamsInWords(v) {
  const aed = Math.floor(r2(v));
  const fils = Math.round((r2(v) - aed) * 100);
  return `UAE Dirhams ${intlWords(aed)}${fils ? ` and ${below100(fils)} Fils` : ""} Only`;
}

// ── Labels: English, Hindi, Marathi ──────────────────────────────────────────

const T = {
  taxInvoice: ["Tax Invoice", "कर बीजक", "कर बीजक"],
  estimate: ["Estimate", "अनुमान पत्र", "अंदाजपत्रक"],
  girviReceipt: ["Girvi (Pledge) Receipt", "गिरवी रसीद", "गहाण पावती"],
  oldGold: ["Old Gold Purchase Voucher", "पुराना सोना खरीद वाउचर", "जुने सोने खरेदी पावती"],
  karigarSlip: ["Karigar Issue and Receipt Slip", "कारीगर जारी / प्राप्ति पर्ची", "कारागीर जावक / आवक चिठ्ठी"],
  no: ["No.", "क्र.", "क्र."],
  date: ["Date", "दिनांक", "दिनांक"],
  customer: ["Customer", "ग्राहक", "ग्राहक"],
  name: ["Name", "नाम", "नाव"],
  mobile: ["Mobile", "मोबाइल", "मोबाईल"],
  address: ["Address", "पता", "पत्ता"],
  pan: ["PAN", "पैन", "पॅन"],
  state: ["State", "राज्य", "राज्य"],
  sr: ["Sr.", "क्र.", "अ.क्र."],
  description: ["Description", "विवरण", "तपशील"],
  purity: ["Purity", "शुद्धता", "शुद्धता"],
  pcs: ["Pcs", "नग", "नग"],
  grossWt: ["Gross wt (g)", "कुल वज़न (ग्रा.)", "एकूण वजन (ग्रॅ.)"],
  netWt: ["Net wt (g)", "नेट वज़न (ग्रा.)", "निव्वळ वजन (ग्रॅ.)"],
  rate: ["Rate / g", "भाव / ग्रा.", "भाव / ग्रॅ."],
  metal: ["Metal value", "धातु मूल्य", "धातू मूल्य"],
  making: ["Making", "मजदूरी", "घडणावळ"],
  stone: ["Stone / other", "नग / अन्य", "खडे / इतर"],
  amount: ["Amount", "राशि", "रक्कम"],
  total: ["Total", "योग", "एकूण"],
  discount: ["Less: discount", "घटाएँ: छूट", "वजा: सूट"],
  taxable: ["Taxable value", "कर योग्य मूल्य", "करपात्र मूल्य"],
  invoiceTotal: ["Invoice total", "बीजक कुल", "बीजक एकूण"],
  estimateTotal: ["Estimated total", "अनुमानित कुल", "अंदाजे एकूण"],
  lessOld: ["Less: old gold", "घटाएँ: पुराना सोना", "वजा: जुने सोने"],
  lessAdvance: ["Less: advance paid", "घटाएँ: अग्रिम", "वजा: आगाऊ रक्कम"],
  roundOff: ["Round off", "राउंड ऑफ", "राउंड ऑफ"],
  oldGoldIn: ["Old gold taken", "पुराना सोना लिया", "जुने सोने घेतले"],
  placeOfSupply: ["Place of supply", "आपूर्ति का स्थान", "पुरवठ्याचे ठिकाण"],
  payable: ["Balance payable", "शेष देय राशि", "देय बाकी"],
  inWords: ["Amount in words", "राशि शब्दों में", "अक्षरी रक्कम"],
  payment: ["Payment", "भुगतान", "पेमेंट"],
  customerSign: ["Customer's signature", "ग्राहक के हस्ताक्षर", "ग्राहकाची सही"],
  authSign: ["Authorised signatory", "अधिकृत हस्ताक्षर", "अधिकृत सही"],
  certify: ["Certified that the particulars given above are true and correct.", "प्रमाणित किया जाता है कि ऊपर दिया गया विवरण सत्य एवं सही है।", "वरील तपशील खरा व बरोबर असल्याचे प्रमाणित करण्यात येते."],
  huidNote: ["Check the HUID of hallmarked jewellery in the BIS CARE app.", "हॉलमार्क गहनों का HUID BIS CARE ऐप में जाँचें।", "हॉलमार्क दागिन्यांचा HUID BIS CARE ॲपमध्ये तपासा."],
  estimateNote: ["This is an estimate, not a tax invoice. The final bill is made at the rate on the day of purchase.", "यह अनुमान पत्र है, कर बीजक नहीं। अंतिम बिल खरीद के दिन के भाव पर बनेगा।", "हे अंदाजपत्रक आहे, कर बीजक नाही. अंतिम बिल खरेदीच्या दिवशीच्या भावाने होईल."],
  validTill: ["Rate valid on", "भाव मान्य दिनांक", "भाव ग्राह्य दिनांक"],
  pledgeNo: ["Girvi no.", "गिरवी क्र.", "गहाण क्र."],
  relation: ["S/o, D/o or W/o", "पिता / पति का नाम", "वडील / पतीचे नाव"],
  idProof: ["ID proof and number", "पहचान पत्र व क्रमांक", "ओळखपत्र व क्रमांक"],
  ornaments: ["Ornaments pledged", "गिरवी रखे गहने", "गहाण ठेवलेले दागिने"],
  loan: ["Loan amount", "ऋण राशि", "कर्ज रक्कम"],
  interestRate: ["Interest", "ब्याज", "व्याज"],
  perMonth: ["% a month", "% प्रति माह", "% दरमहा"],
  dueDate: ["Due date", "देय तिथि", "मुदत दिनांक"],
  terms: ["Terms", "शर्तें", "अटी"],
  release: ["Release", "छुड़ाई", "सोडवणूक"],
  principal: ["Principal", "मूलधन", "मुद्दल"],
  interestPaid: ["Interest", "ब्याज", "व्याज"],
  totalReceived: ["Total received", "कुल प्राप्त", "एकूण मिळाले"],
  releaseDate: ["Release date", "छुड़ाई दिनांक", "सोडवणूक दिनांक"],
  receivedBack: ["I have received my ornaments back in full.", "मुझे मेरे गहने पूरे वापस मिल गए हैं।", "मला माझे दागिने पूर्ण परत मिळाले आहेत."],
  pledgerSign: ["Pledger's signature", "गिरवीकर्ता के हस्ताक्षर", "गहाणदाराची सही"],
  seller: ["Seller", "विक्रेता", "विक्रेता"],
  lessWt: ["Less wt (g)", "घटाव (ग्रा.)", "घट (ग्रॅ.)"],
  touch: ["Touch %", "टंच %", "टंच %"],
  fineWt: ["Fine wt (g)", "फाइन वज़न (ग्रा.)", "फाइन वजन (ग्रॅ.)"],
  fineRate: ["Rate / g (24K)", "भाव / ग्रा. (24K)", "भाव / ग्रॅ. (24K)"],
  value: ["Value", "मूल्य", "मूल्य"],
  deduction: ["Less: deduction", "घटाएँ: कटौती", "वजा: घट"],
  amountPaid: ["Amount paid", "भुगतान राशि", "दिलेली रक्कम"],
  sellerDecl: [
    "I declare that I am the lawful owner of the gold sold above, that it is not stolen or pledged anywhere, and that I have received the amount above in full.",
    "मैं घोषणा करता/करती हूँ कि ऊपर बेचा गया सोना मेरी वैध संपत्ति है, यह चोरी का या कहीं गिरवी रखा हुआ नहीं है, और मुझे ऊपर लिखी पूरी राशि प्राप्त हो गई है।",
    "मी जाहीर करतो/करते की वर विकलेले सोने माझ्या कायदेशीर मालकीचे आहे, ते चोरीचे किंवा कुठेही गहाण ठेवलेले नाही, आणि वर लिहिलेली पूर्ण रक्कम मला मिळाली आहे.",
  ],
  sellerSign: ["Seller's signature", "विक्रेता के हस्ताक्षर", "विक्रेत्याची सही"],
  karigar: ["Karigar", "कारीगर", "कारागीर"],
  order: ["Order / design", "ऑर्डर / डिज़ाइन", "ऑर्डर / डिझाइन"],
  issued: ["Metal issued", "जारी धातु", "दिलेला धातू (जावक)"],
  received: ["Work received", "प्राप्त माल", "मिळालेला माल (आवक)"],
  wastage: ["Wastage %", "छीजत %", "घट %"],
  fineCredit: ["Fine credited (g)", "फाइन जमा (ग्रा.)", "फाइन जमा (ग्रॅ.)"],
  labour: ["Labour", "मजदूरी", "मजुरी"],
  fineIssued: ["Fine issued", "जारी फाइन", "दिलेले फाइन"],
  balance: ["Fine balance with karigar (g)", "कारीगर के पास फाइन बाकी (ग्रा.)", "कारागिराकडे फाइन बाकी (ग्रॅ.)"],
  labourDue: ["Labour payable", "देय मजदूरी", "देय मजुरी"],
  karigarSign: ["Karigar's signature", "कारीगर के हस्ताक्षर", "कारागिराची सही"],
  work: ["Work to be made", "बनाने का काम", "करायचे काम"],
};
const IDX = { en: 0, hi: 1, mr: 2 };

/** "Tax Invoice / कर बीजक" for a bilingual bill, "Tax Invoice" in English. */
const tl = (key, lang, sep = " / ") => {
  const [en, ...rest] = T[key];
  const loc = rest[IDX[lang] - 1];
  return lang === "en" || !loc ? en : `${en}${sep}${loc}`;
};
/** A table heading: English, with the other language underneath. */
const th = (key, lang) => {
  const [en, ...rest] = T[key];
  const loc = rest[IDX[lang] - 1];
  return lang === "en" || !loc ? esc(en) : `${esc(en)}<br><span class="loc">${esc(loc)}</span>`;
};
const tx = (key, lang) => T[key][IDX[lang]] || T[key][0];

// ── Girvi terms (editable on the page) ───────────────────────────────────────

export function girviTerms(lang, v) {
  const rule = v.interestRule === "months";
  const min = num(v.minDays);
  const terms = {
    en: [
      `Interest is simple interest at the rate above on the amount outstanding, counted ${rule ? "in full months, a part month counting as a full month" : "by days, 30 days being one month"}.`,
      min ? `Interest for at least ${min} days is charged, even if the ornaments are released earlier.` : "",
      "The ornaments are returned only to the pledger, or a person they authorise in writing, against this receipt, on payment of the loan and interest.",
      "Weights and purity were checked at the counter in the pledger's presence.",
      "If the loan is not repaid by the due date, the shop will give notice and act only as the state money-lending law allows.",
    ],
    hi: [
      `ब्याज बकाया राशि पर ऊपर लिखी दर से साधारण ब्याज है, ${rule ? "पूरे महीनों में गिना जाता है, महीने का कोई भी हिस्सा पूरा महीना माना जाएगा" : "दिनों के हिसाब से गिना जाता है, 30 दिन एक महीना"}।`,
      min ? `गहने पहले छुड़ाने पर भी कम से कम ${min} दिन का ब्याज लगेगा।` : "",
      "गहने केवल गिरवीकर्ता को, या उनके द्वारा लिखित रूप से अधिकृत व्यक्ति को, इस रसीद पर, ऋण और ब्याज चुकाने पर लौटाए जाएँगे।",
      "वज़न और शुद्धता गिरवीकर्ता के सामने काउंटर पर जाँची गई है।",
      "देय तिथि तक ऋण न चुकाने पर दुकान सूचना देगी और केवल राज्य के साहूकारी कानून के अनुसार कार्रवाई करेगी।",
    ],
    mr: [
      `व्याज थकीत रकमेवर वरील दराने साधे व्याज आहे, ${rule ? "पूर्ण महिन्यांत मोजले जाते, महिन्याचा कोणताही भाग पूर्ण महिना धरला जाईल" : "दिवसांनुसार मोजले जाते, 30 दिवस म्हणजे एक महिना"}.`,
      min ? `दागिने आधी सोडवले तरी किमान ${min} दिवसांचे व्याज आकारले जाईल.` : "",
      "दागिने फक्त गहाणदाराला, किंवा त्यांनी लेखी अधिकार दिलेल्या व्यक्तीला, या पावतीवर, कर्ज व व्याज भरल्यावर परत दिले जातील.",
      "वजन व शुद्धता गहाणदारासमोर काउंटरवर तपासली आहे.",
      "मुदतीत कर्ज न फेडल्यास दुकान नोटीस देईल आणि फक्त राज्याच्या सावकारी कायद्यानुसार कारवाई करेल.",
    ],
  };
  return terms[lang].filter(Boolean);
}

// ── Calculations ─────────────────────────────────────────────────────────────

/** Bill and estimate lines: metal = net × rate; making per gram, % of metal or per piece. */
export function billLine(row, makingType) {
  const net = num(row.net);
  const metal = r2(net * num(row.rate));
  const making = r2(makingType === "percent" ? (metal * num(row.making)) / 100 : makingType === "piece" ? num(row.making) * Math.max(1, num(row.pcs) || 1) : net * num(row.making));
  const other = r2(num(row.other));
  return { net, metal, making, other, amount: r2(metal + making + other) };
}

export function billTotals(rows, v, { taxRate = 3, roundOff = true, split = true } = {}) {
  const lines = rows.map((r) => billLine(r, v.makingType));
  const total = r2(lines.reduce((a, l) => a + l.amount, 0));
  const discount = Math.min(r2(num(v.discount)), total);
  const taxable = r2(total - discount);
  const rate = v.noTax ? 0 : num(v.taxRate ?? taxRate);
  const tax = r2((taxable * rate) / 100);
  const half = r2(tax / 2);
  const invoice = r2(taxable + tax);
  const old = r2(num(v.oldValue));
  const advance = r2(num(v.advance));
  const exact = r2(invoice - old - advance);
  const payable = roundOff ? Math.round(exact) : exact;
  return { lines, total, discount, taxable, rate, tax, cgst: split && !v.interState ? half : 0, sgst: split && !v.interState ? r2(tax - half) : 0, igst: split && v.interState ? tax : 0, invoice, old, advance, round: r2(payable - exact), payable };
}

/** Old gold bought: fine = (gross − less) × touch ÷ 100; value = fine × 24K rate, less the deduction %. */
export function oldGoldLine(row, rate24) {
  const net = Math.max(0, r3(num(row.gross) - num(row.less)));
  const fine = r3((net * num(row.touch)) / 100);
  return { net, fine, value: r2(fine * num(rate24)) };
}

export function oldGoldTotals(rows, v) {
  const lines = rows.map((r) => oldGoldLine(r, v.rate24));
  const fine = r3(lines.reduce((a, l) => a + l.fine, 0));
  const value = r2(lines.reduce((a, l) => a + l.value, 0));
  const deduction = r2((value * Math.min(100, num(v.deduction))) / 100);
  const exact = r2(value - deduction);
  const paid = Math.round(exact);
  return { lines, fine, value, deduction, round: r2(paid - exact), paid };
}

/** Karigar: fine issued = wt × touch ÷ 100; fine credited = wt × touch ÷ 100 × (1 + wastage %). */
export function karigarTotals(issue, receipt, v) {
  const iss = issue.map((r) => ({ fine: r3((num(r.wt) * num(r.touch)) / 100) }));
  const rec = receipt.map((r) => {
    const fine = (num(r.wt) * num(r.touch)) / 100;
    return { fine: r3(fine * (1 + num(r.wastage) / 100)), labour: r2(num(r.wt) * num(v.labourPerGram)) };
  });
  const fineIssued = r3(iss.reduce((a, l) => a + l.fine, 0));
  const fineCredited = r3(rec.reduce((a, l) => a + l.fine, 0));
  return { iss, rec, fineIssued, fineCredited, balance: r3(fineIssued - fineCredited), labour: r2(rec.reduce((a, l) => a + l.labour, 0)) };
}

// ── Layout ───────────────────────────────────────────────────────────────────

const money = (v, ae) => (ae ? Number(v).toLocaleString("en-AE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : Number(v).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
const g3 = (v) => (v ? Number(v).toFixed(3) : "");
const show = (v, f) => (v ? f(v) : "");
const BLANK_ROWS = 8;

function css(lang) {
  const font = lang === "ae" ? "'Noto Sans','Noto Sans Arabic',Arial,sans-serif" : "'Noto Sans','Noto Sans Devanagari',Arial,sans-serif";
  return `@page{size:A4;margin:10mm}
*{box-sizing:border-box}
body{margin:0;font-family:${font};color:#111;font-size:11.5px;line-height:1.35}
.page{border:1.5px solid #222;padding:7mm 7mm 9mm;min-height:275mm;position:relative}
.head{display:flex;justify-content:space-between;gap:16px;border-bottom:1.5px solid #222;padding-bottom:6px}
.head h2{margin:0;font-size:20px;letter-spacing:.2px}
.head .meta{font-size:10.5px;color:#222;margin-top:2px;white-space:pre-line}
.head .tax{text-align:right;font-size:10.5px;white-space:nowrap}
.title{text-align:center;margin:8px 0 6px}
.title h1{display:inline-block;margin:0;font-size:16px;border:1.2px solid #222;padding:3px 16px;border-radius:3px;letter-spacing:.3px}
.grid{display:grid;grid-template-columns:1.4fr 1fr;gap:0;border:1px solid #444;margin-bottom:6px}
.grid>div{padding:5px 7px}.grid>div+div{border-left:1px solid #444}
.kv{display:flex;gap:6px;margin:1.5px 0}.kv b{font-weight:600}.kv .k{color:#333;min-width:92px}
table{width:100%;border-collapse:collapse}
.items th{background:#f1f1f1;font-weight:600;font-size:10px;border:1px solid #444;padding:3px 4px;text-align:center;vertical-align:bottom}
.items td{border-left:1px solid #444;border-right:1px solid #444;padding:4px;font-size:11px;vertical-align:top}
.items tbody tr:last-child td{border-bottom:1px solid #444}
.items td.r{text-align:right;white-space:nowrap}.items td.c{text-align:center}
.items tr.blank td{height:22px}
.loc{font-weight:400;font-size:9.5px;color:#333}
.sum{display:grid;grid-template-columns:1.25fr 1fr;gap:10px;margin-top:6px}
.tot td{padding:2.5px 5px;border-bottom:1px dotted #999}.tot td.r{text-align:right;white-space:nowrap}
.tot tr.strong td{font-weight:700;font-size:12.5px;border-top:1.2px solid #222;border-bottom:1.2px solid #222}
.box{border:1px solid #444;padding:5px 7px}
.words{margin-top:6px;border:1px solid #444;padding:5px 7px}
.note{font-size:10px;color:#222;margin-top:5px}
.terms{font-size:10px;margin:4px 0 0 16px;padding:0}.terms li{margin:1.5px 0}
.sigs{display:flex;justify-content:space-between;margin-top:34px;text-align:center;font-size:11px}
.sig{min-width:170px}.sig .line{border-top:1px solid #222;margin-bottom:3px}
.cut{border-top:1.5px dashed #666;margin:12px 0 8px;text-align:center;font-size:9.5px;color:#555}
.sub{font-weight:700;margin:8px 0 4px;font-size:12px}
.brand{position:absolute;bottom:2.5mm;left:0;right:0;text-align:center;font-size:8px;color:#999;font-family:Arial,sans-serif}
.rtl{font-family:'Noto Sans Arabic',Arial,sans-serif;font-weight:600}`;
}

const FONTS = `<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;600&display=swap" rel="stylesheet">`;

function doc(title, lang, body) {
  return `<!doctype html><html lang="${lang === "ae" ? "en" : lang === "en" ? "en-IN" : lang}"><head><meta charset="utf-8"><title>${esc(title)}</title>${FONTS}<style>${css(lang)}</style></head><body><div class="page">${body}<div class="brand">Format from infovion.in/jewellery-bill-formats · Infovion JMS makes these bills, receipts and slips automatically.</div></div></body></html>`;
}

function shopHead(shop, taxLabel) {
  const meta = [shop.address, shop.phone ? `Phone: ${shop.phone}` : "", shop.extra].filter(Boolean).map(esc).join("\n");
  return `<div class="head"><div><h2>${esc(shop.name || "Your shop name")}</h2><div class="meta">${meta || "Address · Phone"}</div></div>
<div class="tax">${shop.taxId ? `${esc(taxLabel)}: <b>${esc(shop.taxId)}</b>` : `${esc(taxLabel)}: ____________`}</div></div>`;
}

const kv = (k, v) => `<div class="kv"><span class="k">${k}</span><b>${esc(v) || "&nbsp;"}</b></div>`;
const blank = (cols) => Array.from({ length: BLANK_ROWS }, () => `<tr class="blank">${"<td></td>".repeat(cols)}</tr>`).join("");
const sigs = (left, right) => `<div class="sigs"><div class="sig"><div class="line"></div>${left}</div><div class="sig"><div class="line"></div>${right}</div></div>`;
const totRow = (label, value, strong) => `<tr${strong ? ' class="strong"' : ""}><td>${label}</td><td class="r">${value}</td></tr>`;

// ── India: GST bill and estimate ─────────────────────────────────────────────

export function billHtml({ shop, v, rows, lang = "en", estimate = false, isBlank = false }) {
  const t = billTotals(isBlank ? [] : rows, isBlank ? {} : v, { taxRate: 3 });
  const showTax = !estimate || !v.noTax;
  const makingHead = { gram: "/ g", percent: "%", piece: "/ pc" }[v.makingType === "percent" ? "percent" : v.makingType === "piece" ? "piece" : "gram"];
  const head = `<tr><th>${th("sr", lang)}</th><th>${th("description", lang)}</th>${estimate ? "" : "<th>HSN</th>"}<th>HUID</th><th>${th("purity", lang)}</th><th>${th("grossWt", lang)}</th><th>${th("netWt", lang)}</th><th>${th("rate", lang)}</th><th>${th("making", lang)} ${makingHead}</th><th>${th("stone", lang)}</th><th>${th("amount", lang)} (₹)</th></tr>`;
  const cols = estimate ? 10 : 11;
  const body = isBlank || !rows.some((r) => r.desc || num(r.net))
    ? blank(cols)
    : rows.map((r, i) => {
        const l = t.lines[i];
        return `<tr><td class="c">${i + 1}</td><td>${esc(r.desc)}</td>${estimate ? "" : `<td class="c">${esc(r.hsn)}</td>`}<td class="c">${esc(r.huid)}</td><td class="c">${esc(r.purity)}</td><td class="r">${g3(num(r.gross))}</td><td class="r">${g3(l.net)}</td><td class="r">${show(num(r.rate), money)}</td><td class="r">${show(num(r.making), (x) => (v.makingType === "percent" ? `${x}%` : money(x)))}</td><td class="r">${show(l.other, money)}</td><td class="r">${money(l.amount)}</td></tr>`;
      }).join("");
  const val = (x) => (isBlank ? "" : money(x));
  const taxRows = !showTax ? "" : v.interState
    ? totRow(`IGST ${isBlank ? "3" : t.rate}%`, val(t.igst))
    : totRow(`CGST ${isBlank ? "1.5" : t.rate / 2}%`, val(t.cgst)) + totRow(`SGST ${isBlank ? "1.5" : t.rate / 2}%`, val(t.sgst));
  const totals = [
    totRow(tx("total", lang), val(t.total)),
    isBlank || t.discount ? totRow(tx("discount", lang), isBlank ? "" : `− ${money(t.discount)}`) : "",
    totRow(tx("taxable", lang), val(t.taxable)),
    taxRows,
    totRow(tx(estimate ? "estimateTotal" : "invoiceTotal", lang), val(t.invoice), true),
    isBlank || t.old ? totRow(tx("lessOld", lang), isBlank ? "" : `− ${money(t.old)}`) : "",
    isBlank || t.advance ? totRow(tx("lessAdvance", lang), isBlank ? "" : `− ${money(t.advance)}`) : "",
    isBlank || t.round ? totRow(tx("roundOff", lang), isBlank ? "" : money(t.round)) : "",
    totRow(tx("payable", lang), isBlank ? "" : `₹ ${money(t.payable)}`, true),
  ].join("");
  const oldLine = !isBlank && (v.oldDesc || t.old) ? kv(esc(tl("oldGoldIn", lang)), v.oldDesc) : "";
  const left = `<div class="box">
${kv(esc(tx("payment", lang)), isBlank ? "" : v.payment)}
${oldLine}
<div class="note">${esc(tx(estimate ? "estimateNote" : "certify", lang))}</div>
<div class="note">${esc(tx("huidNote", lang))}</div></div>`;
  const title = tl(estimate ? "estimate" : "taxInvoice", lang);
  const party = `<div class="grid"><div>
${kv(`${tl("customer", lang)}`, isBlank ? "" : v.customer)}
${kv(tl("address", lang), isBlank ? "" : v.address)}
${kv(tl("mobile", lang), isBlank ? "" : v.mobile)}
${estimate ? "" : kv("GSTIN", isBlank ? "" : v.gstin)}
${estimate ? "" : kv(tl("pan", lang), isBlank ? "" : v.pan)}
</div><div>
${kv(`${estimate ? tl("estimate", lang) : tl("taxInvoice", lang)} ${tx("no", lang)}`, isBlank ? "" : v.number)}
${kv(tl("date", lang), isBlank ? "" : dateFigures(v.date))}
${estimate ? kv(tl("validTill", lang), isBlank ? "" : dateFigures(v.date)) : kv(tl("placeOfSupply", lang), isBlank ? "" : v.state)}
</div></div>`;
  return doc(`${tl(estimate ? "estimate" : "taxInvoice", "en")} ${isBlank ? "" : v.number || ""}`, lang, `${shopHead(shop, "GSTIN")}
<div class="title"><h1>${esc(title)}</h1></div>
${party}
<table class="items"><thead>${head}</thead><tbody>${body}</tbody></table>
<div class="sum">${left}<table class="tot"><tbody>${totals}</tbody></table></div>
<div class="words"><b>${esc(tl("inWords", lang))}:</b> ${isBlank ? "" : esc(rupeesInWords(t.payable))}</div>
${sigs(esc(tx("customerSign", lang)), `${esc(shop.name ? `For ${shop.name}` : "")}<br>${esc(tx("authSign", lang))}`)}`);
}

// ── India: girvi receipt ─────────────────────────────────────────────────────

export function girviHtml({ shop, v, rows, lang = "en", isBlank = false, terms }) {
  const has = !isBlank && rows.some((r) => r.desc || num(r.net));
  const head = `<tr><th>${th("sr", lang)}</th><th>${th("description", lang)}</th><th>${th("pcs", lang)}</th><th>${th("grossWt", lang)}</th><th>${th("netWt", lang)}</th><th>${th("purity", lang)}</th></tr>`;
  const body = has
    ? rows.map((r, i) => `<tr><td class="c">${i + 1}</td><td>${esc(r.desc)}</td><td class="c">${esc(r.pcs)}</td><td class="r">${g3(num(r.gross))}</td><td class="r">${g3(num(r.net))}</td><td class="c">${esc(r.purity)}</td></tr>`).join("")
    : Array.from({ length: 5 }, () => `<tr class="blank">${"<td></td>".repeat(6)}</tr>`).join("");
  const totalNet = r3(rows.reduce((a, r) => a + num(r.net), 0));
  const loan = num(v.amount);
  const monthly = r2((loan * num(v.rate)) / 100);
  const val = (x) => (isBlank ? "" : x);
  return doc(`${tl("girviReceipt", "en")} ${isBlank ? "" : v.number || ""}`, lang, `${shopHead(shop, "Licence no.")}
<div class="title"><h1>${esc(tl("girviReceipt", lang))}</h1></div>
<div class="grid"><div>
${kv(tl("name", lang), val(v.customer))}
${kv(tl("relation", lang), val(v.relation))}
${kv(tl("address", lang), val(v.address))}
${kv(tl("mobile", lang), val(v.mobile))}
${kv(tl("idProof", lang), val(v.idProof))}
</div><div>
${kv(tl("pledgeNo", lang), val(v.number))}
${kv(tl("date", lang), val(dateFigures(v.date)))}
${kv(tl("dueDate", lang), val(dateFigures(v.due)))}
${kv(tl("loan", lang), isBlank ? "" : `₹ ${money(loan)}`)}
${kv(tl("interestRate", lang), isBlank ? "" : `${num(v.rate)}${tx("perMonth", lang)} (₹ ${money(monthly)})`)}
</div></div>
<div class="sub">${esc(tl("ornaments", lang))}</div>
<table class="items"><thead>${head}</thead><tbody>${body}${has ? `<tr><td></td><td><b>${esc(tx("total", lang))}</b></td><td></td><td></td><td class="r"><b>${g3(totalNet)}</b></td><td></td></tr>` : ""}</tbody></table>
<div class="words"><b>${esc(tl("inWords", lang))} (${esc(tx("loan", lang))}):</b> ${isBlank ? "" : esc(rupeesInWords(loan))}</div>
<div class="sub">${esc(tl("terms", lang))}</div>
<ol class="terms">${(terms || []).map((x) => `<li>${esc(x)}</li>`).join("")}</ol>
${sigs(esc(tx("pledgerSign", lang)), `${esc(shop.name ? `For ${shop.name}` : "")}<br>${esc(tx("authSign", lang))}`)}
<div class="cut">✂ ${esc(tl("release", lang))}</div>
<div class="grid"><div>
${kv(tl("releaseDate", lang), "")}
${kv(tl("principal", lang), "")}
${kv(tl("interestPaid", lang), "")}
${kv(tl("totalReceived", lang), "")}
</div><div><div class="note" style="margin-top:0">${esc(tx("receivedBack", lang))}</div></div></div>
${sigs(esc(tx("pledgerSign", lang)), esc(tx("authSign", lang)))}`);
}

// ── India: old gold purchase voucher ─────────────────────────────────────────

export function oldGoldHtml({ shop, v, rows, lang = "en", isBlank = false }) {
  const t = oldGoldTotals(isBlank ? [] : rows, isBlank ? {} : v);
  const has = !isBlank && rows.some((r) => r.desc || num(r.gross));
  const head = `<tr><th>${th("sr", lang)}</th><th>${th("description", lang)}</th><th>${th("grossWt", lang)}</th><th>${th("lessWt", lang)}</th><th>${th("netWt", lang)}</th><th>${th("touch", lang)}</th><th>${th("fineWt", lang)}</th><th>${th("value", lang)} (₹)</th></tr>`;
  const body = has
    ? rows.map((r, i) => { const l = t.lines[i]; return `<tr><td class="c">${i + 1}</td><td>${esc(r.desc)}</td><td class="r">${g3(num(r.gross))}</td><td class="r">${g3(num(r.less))}</td><td class="r">${g3(l.net)}</td><td class="c">${esc(r.touch)}</td><td class="r">${g3(l.fine)}</td><td class="r">${money(l.value)}</td></tr>`; }).join("")
    : blank(8);
  const val = (x) => (isBlank ? "" : x);
  const totals = [
    totRow(`${tx("fineWt", lang)}`, isBlank ? "" : `${g3(t.fine)} g`),
    totRow(`${tx("fineRate", lang)}`, isBlank ? "" : `₹ ${money(num(v.rate24))}`),
    totRow(tx("value", lang), val(money(t.value))),
    totRow(`${tx("deduction", lang)}${!isBlank && num(v.deduction) ? ` ${num(v.deduction)}%` : ""}`, isBlank ? "" : `− ${money(t.deduction)}`),
    isBlank || t.round ? totRow(tx("roundOff", lang), isBlank ? "" : money(t.round)) : "",
    totRow(tx("amountPaid", lang), isBlank ? "" : `₹ ${money(t.paid)}`, true),
  ].join("");
  return doc(`${tl("oldGold", "en")} ${isBlank ? "" : v.number || ""}`, lang, `${shopHead(shop, "GSTIN")}
<div class="title"><h1>${esc(tl("oldGold", lang))}</h1></div>
<div class="grid"><div>
${kv(tl("seller", lang), val(v.customer))}
${kv(tl("address", lang), val(v.address))}
${kv(tl("mobile", lang), val(v.mobile))}
${kv(tl("idProof", lang), val(v.idProof))}
${kv(tl("pan", lang), val(v.pan))}
</div><div>
${kv(`${tl("no", lang)}`, val(v.number))}
${kv(tl("date", lang), val(dateFigures(v.date)))}
${kv(tl("payment", lang), val(v.payment))}
</div></div>
<table class="items"><thead>${head}</thead><tbody>${body}</tbody></table>
<div class="sum"><div class="box"><div class="note" style="margin-top:0">${esc(tx("sellerDecl", lang))}</div></div><table class="tot"><tbody>${totals}</tbody></table></div>
<div class="words"><b>${esc(tl("inWords", lang))}:</b> ${isBlank ? "" : esc(rupeesInWords(t.paid))}</div>
${sigs(esc(tx("sellerSign", lang)), `${esc(shop.name ? `For ${shop.name}` : "")}<br>${esc(tx("authSign", lang))}`)}`);
}

// ── India: karigar issue and receipt slip ────────────────────────────────────

export function karigarHtml({ shop, v, issue, receipt, lang = "en", isBlank = false }) {
  const t = karigarTotals(isBlank ? [] : issue, isBlank ? [] : receipt, isBlank ? {} : v);
  const hasI = !isBlank && issue.some((r) => r.desc || num(r.wt));
  const hasR = !isBlank && receipt.some((r) => r.desc || num(r.wt));
  const iHead = `<tr><th>${th("sr", lang)}</th><th>${th("description", lang)}</th><th>${th("grossWt", lang)}</th><th>${th("touch", lang)}</th><th>${th("fineWt", lang)}</th></tr>`;
  const rHead = `<tr><th>${th("sr", lang)}</th><th>${th("description", lang)}</th><th>${th("pcs", lang)}</th><th>${th("grossWt", lang)}</th><th>${th("touch", lang)}</th><th>${th("wastage", lang)}</th><th>${th("fineCredit", lang)}</th></tr>`;
  const iBody = hasI ? issue.map((r, i) => `<tr><td class="c">${i + 1}</td><td>${esc(r.desc)}</td><td class="r">${g3(num(r.wt))}</td><td class="c">${esc(r.touch)}</td><td class="r">${g3(t.iss[i].fine)}</td></tr>`).join("") : Array.from({ length: 4 }, () => `<tr class="blank">${"<td></td>".repeat(5)}</tr>`).join("");
  const rBody = hasR ? receipt.map((r, i) => `<tr><td class="c">${i + 1}</td><td>${esc(r.desc)}</td><td class="c">${esc(r.pcs)}</td><td class="r">${g3(num(r.wt))}</td><td class="c">${esc(r.touch)}</td><td class="c">${esc(r.wastage)}</td><td class="r">${g3(t.rec[i].fine)}</td></tr>`).join("") : Array.from({ length: 4 }, () => `<tr class="blank">${"<td></td>".repeat(7)}</tr>`).join("");
  const val = (x) => (isBlank ? "" : x);
  return doc(`${tl("karigarSlip", "en")} ${isBlank ? "" : v.number || ""}`, lang, `${shopHead(shop, "GSTIN")}
<div class="title"><h1>${esc(tl("karigarSlip", lang))}</h1></div>
<div class="grid"><div>
${kv(tl("karigar", lang), val(v.karigar))}
${kv(tl("mobile", lang), val(v.mobile))}
${kv(tl("order", lang), val(v.order))}
${kv(tl("work", lang), val(v.work))}
</div><div>
${kv(tl("no", lang), val(v.number))}
${kv(tl("date", lang), val(dateFigures(v.date)))}
${kv(tl("dueDate", lang), val(dateFigures(v.due)))}
</div></div>
<div class="sub">${esc(tl("issued", lang))}</div>
<table class="items"><thead>${iHead}</thead><tbody>${iBody}</tbody></table>
<div class="sub">${esc(tl("received", lang))}</div>
<table class="items"><thead>${rHead}</thead><tbody>${rBody}</tbody></table>
<div class="sum"><div class="box"><div class="note" style="margin-top:0">${lang === "en" ? "Fine credited = weight × touch ÷ 100, plus the agreed wastage as a % of it." : lang === "hi" ? "फाइन जमा = वज़न × टंच ÷ 100, और उस पर तय छीजत %।" : "फाइन जमा = वजन × टंच ÷ 100, आणि त्यावर ठरलेली घट %."}</div></div>
<table class="tot"><tbody>
${totRow(`${tx("fineIssued", lang)} (g)`, val(g3(t.fineIssued)))}
${totRow(tx("fineCredit", lang), val(g3(t.fineCredited)))}
${totRow(tx("balance", lang), val(g3(t.balance)), true)}
${totRow(`${tx("labourDue", lang)}${!isBlank && num(v.labourPerGram) ? ` (₹ ${num(v.labourPerGram)} / g)` : ""}`, isBlank ? "" : `₹ ${money(t.labour)}`)}
</tbody></table></div>
${sigs(esc(tx("karigarSign", lang)), `${esc(shop.name ? `For ${shop.name}` : "")}<br>${esc(tx("authSign", lang))}`)}`);
}

// ── UAE: VAT tax invoice ─────────────────────────────────────────────────────

/** UAE jewellery lines: metal = weight × rate per gram for the karat; making per gram or per piece. */
export function uaeTotals(rows, v) {
  const lines = rows.map((r) => {
    const net = num(r.net);
    const metal = r2(net * num(r.rate));
    const making = r2(v.makingType === "piece" ? num(r.making) : net * num(r.making));
    const other = r2(num(r.other));
    return { net, metal, making, other, amount: r2(metal + making + other) };
  });
  const net = r2(lines.reduce((a, l) => a + l.amount, 0));
  const discount = Math.min(r2(num(v.discount)), net);
  const taxable = r2(net - discount);
  const vat = v.reverseCharge ? 0 : r2((taxable * 5) / 100);
  const gross = r2(taxable + vat);
  const old = r2(num(v.oldValue));
  return { lines, net, discount, taxable, vat, gross, old, payable: r2(gross - old) };
}

export function uaeInvoiceHtml({ shop, v, rows, isBlank = false }) {
  const t = uaeTotals(isBlank ? [] : rows, isBlank ? {} : v);
  const has = !isBlank && rows.some((r) => r.desc || num(r.net));
  const head = `<tr><th>Sr.</th><th>Description</th><th>Karat</th><th>Net wt (g)</th><th>Rate / g</th><th>Making${v.makingType === "piece" ? " / pc" : " / g"}</th><th>Stones / other</th><th>VAT %</th><th>Amount excl. VAT (AED)</th></tr>`;
  const body = has
    ? rows.map((r, i) => { const l = t.lines[i]; return `<tr><td class="c">${i + 1}</td><td>${esc(r.desc)}</td><td class="c">${esc(r.karat)}</td><td class="r">${g3(l.net)}</td><td class="r">${show(num(r.rate), (x) => money(x, true))}</td><td class="r">${show(num(r.making), (x) => money(x, true))}</td><td class="r">${show(l.other, (x) => money(x, true))}</td><td class="c">${v.reverseCharge ? "RC" : "5%"}</td><td class="r">${money(l.amount, true)}</td></tr>`; }).join("")
    : blank(9);
  const val = (x) => (isBlank ? "" : money(x, true));
  const totals = [
    totRow("Total excl. VAT", val(t.net)),
    isBlank || t.discount ? totRow("Less: discount", isBlank ? "" : `− ${money(t.discount, true)}`) : "",
    totRow("Taxable amount (AED)", val(t.taxable)),
    totRow(v.reverseCharge ? "VAT (reverse charge)" : "VAT 5% (AED)", val(t.vat)),
    totRow("Total incl. VAT (AED)", val(t.gross), true),
    isBlank || t.old ? totRow("Less: old gold", isBlank ? "" : `− ${money(t.old, true)}`) : "",
    totRow("Balance payable (AED)", isBlank ? "" : `AED ${money(t.payable, true)}`, true),
  ].join("");
  const val2 = (x) => (isBlank ? "" : x);
  return doc(`Tax Invoice ${isBlank ? "" : v.number || ""}`, "ae", `${shopHead(shop, "TRN")}
<div class="title"><h1>Tax Invoice <span class="rtl">· فاتورة ضريبية</span></h1></div>
<div class="grid"><div>
${kv("Customer", val2(v.customer))}
${kv("Address", val2(v.address))}
${kv("Mobile", val2(v.mobile))}
${kv("Customer TRN", val2(v.trn))}
</div><div>
${kv("Invoice no.", val2(v.number))}
${kv("Invoice date", val2(dateFigures(v.date)))}
${kv("Date of supply", val2(v.supplyDate ? dateFigures(v.supplyDate) : dateFigures(v.date)))}
${kv("Payment", val2(v.payment))}
</div></div>
<table class="items"><thead>${head}</thead><tbody>${body}</tbody></table>
<div class="sum"><div class="box">
${!isBlank && v.oldDesc ? kv("Old gold", v.oldDesc) : ""}
${v.reverseCharge ? '<div class="note" style="margin-top:0"><b>Reverse charge applies.</b> The recipient is liable to account for the VAT on this supply (Cabinet Decision No. 127 of 2024 on precious metals and stones).</div>' : '<div class="note" style="margin-top:0">Amounts in UAE dirhams (AED). VAT at 5% on the full value of the jewellery: metal, making and stones.</div>'}
</div><table class="tot"><tbody>${totals}</tbody></table></div>
<div class="words"><b>Amount in words:</b> ${isBlank ? "" : esc(dirhamsInWords(t.payable))}</div>
${sigs("Customer's signature", `${esc(shop.name ? `For ${shop.name}` : "")}<br>Authorised signatory`)}`);
}

export function printHtml(html) {
  const w = window.open("", "_blank");
  if (!w) return false;
  w.document.open();
  w.document.write(html + "<script>window.onload=()=>setTimeout(()=>window.print(),400)</scr" + "ipt>");
  w.document.close();
  return true;
}
