// Reference pages (GST, HSN, old gold, UAE VAT) and comparisons, in the same shape as the JMS
// landing pages in pages/jms/Jms.jsx, plus `tables` and `updated`. Every rate and every claim about
// another product carries its source on the page; competitor facts are from each vendor's own pages
// as checked on the `updated` date. Re-check them before changing that date.
import { JMS } from "./company.js";

const PRICE = `₹${JMS.price.toLocaleString("en-IN")}`;
const AMC = `₹${JMS.amc.toLocaleString("en-IN")}`;

const CBIC_FAQ = ["CBIC: Sectoral FAQ on Gems and Jewellery", "https://gstcouncil.gov.in/sites/default/files/2024-02/sectoral-fq-gems-jewellery.pdf"];
const GJC_FAQ = ["GJC: GST FAQs for the gems and jewellery industry", "https://www.gjc.org.in/pdf/gst/FAQs_GJI_updated_GJF.pdf"];
const CBIC_TAX = ["CBIC tax information portal (GST Acts, Rules and rate notifications)", "https://taxinformation.cbic.gov.in/"];
const TALLY_JEWELLERY = ["TallyPrime: jewellery billing software", "https://tallysolutions.com/billing-software/jewellery"];
const TALLY_COST = ["TallyPrime: total cost of ownership in India (updated July 2026)", "https://tallysolutions.com/business-guides/tallyprime-total-cost-of-ownership-india/"];
const VYAPAR_JEWELLERY = ["Vyapar: billing software for jewellery shops", "https://vyaparapp.in/free/billing-software-for-retail-shop/jewellery-shop"];
const MARG_JEWELLERY = ["Marg ERP: jewellery software", "https://margcompusoft.com/jewellery-software.html"];
const MARG_LISTING = ["Techjockey: Marg Jewellery Software (editions and prices)", "https://www.techjockey.com/detail/marg-jewellery-software"];

const CHECKED = "Checked against each vendor's own pages on 27 October 2026. Features change; confirm on a demo before you buy.";
const DISCLOSURE = "Written by Infovion Technologies, the makers of Infovion JMS. We describe other products only from their own published pages, link every source, and say where another product is the better fit.";

const NS = "Not stated on its jewellery page";

export const JMS_GUIDES = {
  // ── GST ──────────────────────────────────────────────────────────────────
  "gst-on-gold-jewellery": {
    title: "GST on Gold Jewellery: 3% Rate, Making Charges (2026)",
    description: "GST on gold, silver and diamond jewellery in 2026: 3% on the full value including making charges, 5% on job work, 1.5% on loose diamonds, with worked examples.",
    trail: "GST on gold jewellery",
    kicker: "Guide for jewellers · GST",
    h1: "GST on gold jewellery",
    sub: "The GST rates a jewellery shop deals with, where making charges fit, what karigars and repairs are charged, and how old gold and discounts change the bill. With the source for every rate.",
    updated: "2026-10-27",
    answerQ: "What is the GST rate on gold jewellery?",
    answer: "GST on gold jewellery in India is 3% of the full value of the piece: the gold, the making charges and any stones, less a discount shown on the bill. Within a state it is split into 1.5% CGST and 1.5% SGST; for a sale to another state it is 3% IGST. Making charges on ready jewellery are not taxed separately at 5%: the CBIC's sectoral FAQ says GST is 3% of the total value whether or not the making charge is shown separately. The 5% rate applies to job work that a karigar does for a registered jeweller. The jewellery rates were not changed by the GST rate revision of 22 September 2025.",
    tables: [
      {
        caption: "GST rates for jewellers (October 2026)",
        head: ["Supply", "HSN / SAC", "GST"],
        rows: [
          ["Gold, silver or platinum jewellery, plain or set with stones", "7113", "3%"],
          ["Silver articles and other goldsmiths' and silversmiths' wares", "7114", "3%"],
          ["Gold and silver bars, biscuits and coins", "7108, 7106, 7118", "3%"],
          ["Imitation jewellery", "7117", "3%"],
          ["Cut and polished diamonds, loose", "7102", "1.5%"],
          ["Rough diamonds", "7102", "0.25%"],
          ["Job work on jewellery for a registered jeweller (karigar's labour)", "9988", "5%"],
          ["Job work on diamonds", "9988", "1.5%"],
          ["Re-making a customer's own old jewellery (labour)", "9988", "18% per the GJC FAQ; confirm with your CA"],
        ],
        note: "Rates as notified under the CGST Act and the rate notifications on the CBIC portal. Diamond rates: cut and polished diamonds have been at 1.5% since July 2022. Confirm the rate for your exact supply with your accountant.",
      },
    ],
    sections: [
      ["On the customer's bill", ["3% on metal + making + stones, as one value", "Discount shown on the bill is taken off before GST (CGST Act, section 15(3))", "Old gold given in exchange is deducted after GST, from the amount payable", "Show making as a break-up of the piece's value, not as a separate line at another rate", "HSN 7113 on each line; HUID for hallmarked pieces", "PAN or Form 60 for a bill over ₹2 lakh (Income Tax Rule 114B)"]],
      ["Karigars and job work", ["A registered karigar charges 5% on the job charges only; the jeweller takes credit for it (CBIC FAQ, question 8)", "Job work on diamonds is 1.5%", "An unregistered karigar charges no GST. The reverse charge on supplies from unregistered persons applies since 1 February 2019 only to categories the government notifies (CGST Act, section 9(4))", "Keep a karigar's issue and receipt record in fine gold, with weight, touch and wastage"]],
      ["Repairs and re-making", ["Gold added in a repair is goods, at 3%", "Repair labour is a service. Advisers commonly apply the general repair-services rate of 18%; the trade council's FAQ treats repair labour shown separately at 5%. Ask your CA which applies to you", "Re-making a customer's own old jewellery: the GJC FAQ says it is not job work, because the customer is unregistered, and puts the labour at 18%"]],
      ["Composition scheme", ["A jeweller with turnover up to ₹1.5 crore may opt for composition and pay 1% of turnover", "A composition dealer issues a bill of supply, cannot collect GST from customers and cannot take input tax credit", "No inter-state sales under composition", "Compare it with the regular scheme with your CA: with 3% GST and credit on purchases, composition often saves little for jewellers"]],
      ["What JMS does", ["3% GST split as CGST and SGST, or IGST, on every bill", "Discount before tax, old gold and advances after tax", "HSN and HUID on every line", "GSTR-1 files for the GST Offline Tool and the GSTR-3B summary", "Repair bills with GST on the service, at the rate you set", "E-invoice JSON with the IRN and QR printed on the bill, for shops above the e-invoice limit"]],
    ],
    example: {
      caption: "Worked example: a 10 g, 22K chain with discount and old gold",
      rows: [["Metal value", "10 g × ₹7,250", "₹72,500"], ["Making charges", "10 g × ₹600", "₹6,000"], ["Less: discount", "", "− ₹500"], ["Taxable value", "", "₹78,000"], ["CGST 1.5% + SGST 1.5%", "3% of ₹78,000", "₹2,340"], ["Invoice value", "", "₹80,340"], ["Less: old gold, 4 g", "valued at the counter", "− ₹26,000"], ["Balance payable", "", "₹54,340"]],
      note: "Rates are for illustration only. GST is charged on the new jewellery's full value; the old gold is a payment towards it.",
    },
    faqs: [
      ["What is the GST rate on gold jewellery in 2026?", "3% of the full value of the jewellery, including making charges and stones. The GST rate changes of 22 September 2025 did not change it."],
      ["Is GST on making charges 5%?", "Not on a retail sale of ready jewellery. GST is 3% on the total value, making included, whether or not the making is shown separately. The 5% rate is for job work done for a registered jeweller."],
      ["What is the GST on silver jewellery?", "3%, the same as gold jewellery. Silver articles such as utensils (HSN 7114) are also 3%."],
      ["What is the GST on diamond jewellery?", "3% on the full value of the piece, including the diamonds, the metal and the making. Loose cut and polished diamonds are 1.5%, and rough diamonds 0.25%."],
      ["What is the GST on gold coins and bars?", "3%."],
      ["Is GST charged on the old gold in an exchange?", "GST is charged on the full value of the new jewellery. The old gold's value is then taken off what the customer pays. The old gold itself, bought from a customer who is not registered, carries no GST."],
      ["Do jewellers need an e-way bill?", "Goods of HSN chapter 71, including jewellery, are exempt from e-way bills under Rule 138(14), except for movement within Kerala. Imitation jewellery (7117) needs one."],
    ],
    sources: [CBIC_FAQ, GJC_FAQ, CBIC_TAX],
    links: [["/hsn-code-for-jewellery", "HSN codes for jewellery", "Chapter 71 codes and how many digits to print."], ["/gst-on-old-gold", "GST on old gold", "Exchange, purchase from customers and the margin scheme."], ["/jewellery-bill-format", "Free jewellery GST bill format", "Print, PDF or Excel, with the 3% GST worked out."], ["/jewellery-gst-software", "GST software for jewellers", "GSTR-1 and GSTR-3B from your bills in Infovion JMS."]],
    whatsappText: "Hello Infovion, I read your GST guide for jewellers and would like to know about Infovion JMS.",
  },

  "hsn-code-for-jewellery": {
    title: "HSN Code for Jewellery: Gold, Silver, Diamond, GST Rates",
    description: "HSN codes for jewellery: 7113 gold and silver jewellery, 7114 silver articles, 7117 imitation jewellery, 7108 gold, 7106 silver, 7102 diamonds, with GST rates and digits.",
    trail: "HSN codes for jewellery",
    kicker: "Guide for jewellers · GST",
    h1: "HSN codes for jewellery",
    sub: "The HSN codes jewellers print on bills and report in GSTR-1, from chapter 71 of the customs tariff, with the GST rate for each and the rule on how many digits to show.",
    updated: "2026-10-27",
    answerQ: "What is the HSN code for gold jewellery?",
    answer: "The HSN code for gold jewellery is 7113, articles of jewellery of precious metal; gold and platinum jewellery is 7113 19 and silver jewellery 7113 11, whether plain or set with stones. Silver articles and other goldsmiths' wares are 7114, imitation jewellery is 7117, gold bars are 7108, silver bars 7106 and diamonds 7102. Jewellery under 7113 and 7114 carries 3% GST. A business with turnover up to ₹5 crore must print at least 4 digits of the HSN on B2B invoices; above ₹5 crore, 6 digits on every invoice.",
    tables: [
      {
        caption: "HSN codes for jewellers (chapter 71)",
        head: ["HSN", "Covers", "GST"],
        rows: [
          ["7113 11", "Jewellery of silver, plain or set with stones", "3%"],
          ["7113 19", "Jewellery of gold, platinum or other precious metal", "3%"],
          ["7113 20", "Jewellery of base metal clad with precious metal", "3%"],
          ["7114 11", "Silver articles: utensils, idols, plates (silversmiths' wares)", "3%"],
          ["7114 19", "Goldsmiths' wares of other precious metal", "3%"],
          ["7117", "Imitation jewellery", "3%"],
          ["7108 12, 7108 13", "Gold, unwrought (bars, biscuits) or semi-manufactured", "3%"],
          ["7106 91, 7106 92", "Silver, unwrought or semi-manufactured", "3%"],
          ["7110", "Platinum, unwrought or semi-manufactured", "3%"],
          ["7118", "Coins", "3%"],
          ["7102 31, 7102 39", "Diamonds, non-industrial: rough (0.25%), cut and polished (1.5%)", "0.25% / 1.5%"],
          ["SAC 9988", "Job work on jewellery for a registered jeweller", "5%"],
        ],
        note: "Six-digit headings are from the Harmonized System used in India's customs tariff; the eight-digit tariff items under them are on the CBIC portal. Rates as of October 2026.",
      },
      {
        caption: "How many HSN digits to print",
        head: ["Turnover in the previous year", "B2B invoices", "B2C invoices"],
        rows: [["Up to ₹5 crore", "4 digits (e.g. 7113)", "Optional"], ["Above ₹5 crore", "6 digits (e.g. 711319)", "6 digits"]],
        note: "Notification 78/2020-Central Tax, from 1 April 2021. The same digits go in the HSN summary of GSTR-1 (Table 12).",
      },
    ],
    sections: [
      ["On the bill", ["One HSN per line, matching the item: 7113 for jewellery, 7114 for silver articles", "Repair labour and job work carry a SAC code (services), not an HSN", "A bill mixing jewellery and silver articles shows each line's own code"]],
      ["In GSTR-1", ["The HSN summary (Table 12) lists each code with its quantity, value and tax", "B2B and B2C supplies are reported separately in the HSN summary", "Infovion JMS fills the HSN summary from the HSN on each bill line"]],
    ],
    faqs: [
      ["What is the HSN code for silver jewellery?", "7113 11. Silver articles such as plates, glasses and idols are 7114 11. Both are at 3% GST."],
      ["What is the HSN code for imitation jewellery?", "7117, with GST at 3%. Unlike gold and silver jewellery, imitation jewellery needs an e-way bill when moved above the limit."],
      ["What is the HSN code for diamond jewellery?", "7113: diamond-studded gold or platinum jewellery is classed as jewellery of precious metal (7113 19), at 3% on the full value. Loose diamonds are 7102."],
      ["What is the HSN code for gold coins?", "7118 for coins and 7108 for bars and biscuits, both at 3% GST."],
      ["How many digits of HSN must a jeweller print?", "With turnover up to ₹5 crore in the previous year, at least 4 digits on B2B invoices; above ₹5 crore, 6 digits on all invoices."],
    ],
    sources: [CBIC_TAX, CBIC_FAQ],
    links: [["/gst-on-gold-jewellery", "GST on gold jewellery", "3%, making charges, job work, repairs and composition."], ["/jewellery-bill-format", "Free jewellery GST bill format", "With HSN and HUID on every line."], ["/jewellery-gst-software", "GSTR-1 and GSTR-3B", "The HSN summary filled from your bills in Infovion JMS."]],
    whatsappText: "Hello Infovion, I read your HSN guide for jewellers and would like to know about Infovion JMS.",
  },

  "gst-on-old-gold": {
    title: "GST on Old Gold: Exchange, Buying from Customers, Margin",
    description: "GST on old gold in India: in an exchange GST is on the new jewellery's full value; buying old gold from a customer carries no GST; resale under the margin scheme.",
    trail: "GST on old gold",
    kicker: "Guide for jewellers · GST",
    h1: "GST on old gold",
    sub: "How GST works when a customer exchanges old gold for new jewellery, when a jeweller buys old gold outright, and when used jewellery is sold again as it is or melted down. Plus the income tax rules on paying for it.",
    updated: "2026-10-27",
    answerQ: "Is GST charged on old gold?",
    answer: "In an exchange, GST at 3% is charged on the full value of the new jewellery, and the old gold's value is taken off what the customer pays, as a payment. When a registered jeweller buys old gold from an individual who is not registered, no GST is payable on the purchase: the reverse charge on supplies from unregistered persons applies since February 2019 only to categories the government notifies, and old gold is not among them. If used jewellery is sold again as it is, without input tax credit, GST can be paid on the margin under Rule 32(5) of the CGST Rules; melted gold made into new jewellery is taxed at 3% on its full value.",
    sections: [
      ["Exchange: old gold for new jewellery", ["GST is on the open market value of the new jewellery (GJC FAQ, query 5)", "The old gold is valued by weight and tested purity, less the shop's deduction", "Its value is deducted after GST, like a payment", "Record the old gold's weight, purity and value on the bill"]],
      ["Buying old gold from a customer", ["No GST on a purchase from an unregistered individual", "No input tax credit either, because no GST was paid", "Give a purchase voucher with the seller's ID, the weights, touch, fine gold and amount", "A purchase from a registered dealer comes with 3% GST, which you can claim as credit"]],
      ["Selling it again", ["Melted and made into new jewellery: 3% GST on the new jewellery's full value", "Sold as it is, only cleaned and polished, without input tax credit: GST can be paid on the margin (selling price less purchase price) under Rule 32(5)", "The Karnataka AAR allowed the margin scheme for used jewellery sold after cleaning and polishing (Aadhya Gold, 2021) but refused it for gold melted into lumps (White Gold Bullion, 2023)", "Advance rulings bind only the applicant; take your CA's view before using the margin scheme"]],
      ["Paying for old gold: income tax", ["A purchase above ₹2 lakh in one transaction needs the seller's PAN or Form 60 (Rule 114B)", "Do not pay ₹2 lakh or more in cash to one person for one deal: section 269ST bars the receipt", "Cash payments above ₹10,000 to one person in a day can be disallowed as an expense (section 40A(3)); pay by bank transfer or UPI"]],
    ],
    example: {
      caption: "Worked example: 20.4 g of old bangles bought from a customer",
      rows: [["Gross weight", "", "20.400 g"], ["Less: stones and dirt", "", "0.400 g"], ["Net weight", "", "20.000 g"], ["Fine gold", "20.000 g × 91.6 touch ÷ 100", "18.320 g"], ["Value", "18.320 g × ₹7,900 (24K)", "₹1,44,728"], ["Less: deduction 2%", "", "− ₹2,894.56"], ["Paid to the customer", "rounded", "₹1,41,833"]],
      note: "Rates for illustration. No GST on a purchase from an individual. Pay by bank transfer, as the amount is above ₹10,000; the seller's PAN is needed only above ₹2 lakh.",
    },
    faqs: [
      ["Is GST charged when I exchange old gold for new jewellery?", "Yes, on the new jewellery: 3% of its full value. The old gold reduces what you pay; it does not reduce the value on which GST is charged."],
      ["Does a jeweller pay GST on old gold bought from customers?", "No, when the seller is an individual who is not registered. The reverse charge does not apply to such purchases since February 2019."],
      ["What is the margin scheme for old jewellery?", "Rule 32(5) of the CGST Rules lets a dealer in second-hand goods who has not taken input tax credit pay GST on the difference between the selling and purchase price. It suits used jewellery resold as it is; it does not apply once the gold is melted or made into something new."],
      ["Can a jeweller pay cash for old gold?", "Keep cash to ₹10,000 or less per person per day, or the payment may be disallowed as an expense under section 40A(3), and never ₹2 lakh or more for one deal, which section 269ST bars the seller from receiving. Pay larger amounts by bank transfer or UPI."],
      ["Do I need the seller's PAN?", "For a purchase above ₹2 lakh in one transaction, yes: PAN, or Form 60 if the seller has none (Rule 114B)."],
    ],
    sources: [GJC_FAQ, CBIC_TAX, ["GST Council: advance rulings (Karnataka AAR, KAR/ADRG/35/2021)", "https://www.gstcouncil.gov.in/authority-for-advance-ruling"]],
    links: [["/old-gold-purchase-voucher-format", "Free old gold purchase voucher", "Touch, fine gold, deduction and the seller's declaration."], ["/gst-on-gold-jewellery", "GST on gold jewellery", "All the rates a jeweller deals with."], ["/gold-price-calculator", "Gold price calculator", "A new piece with old gold taken in exchange."]],
    whatsappText: "Hello Infovion, I read your guide on GST on old gold and would like to know about Infovion JMS.",
  },

  // ── UAE ──────────────────────────────────────────────────────────────────
  "uae-vat-on-gold": {
    title: "UAE VAT on Gold and Jewellery: 5%, 0%, Reverse Charge",
    description: "VAT on gold in the UAE: 5% on jewellery including making, 0% on investment gold of 99% purity, reverse charge between dealers since 2025, tax invoices and e-invoicing.",
    trail: "UAE VAT on gold",
    kicker: "Guide for UAE jewellers · VAT",
    h1: "UAE VAT on gold and jewellery",
    sub: "What a jewellery shop in Dubai, Abu Dhabi or Sharjah charges on gold, what is zero-rated, how the reverse charge between dealers works since 2025, what the tax invoice must show, and when e-invoicing starts.",
    updated: "2026-10-27",
    answerQ: "What is the VAT on gold jewellery in the UAE?",
    answer: "Gold jewellery sold to a consumer in the UAE carries VAT at 5% on its full value: the metal, the making charges and any stones. Investment precious metals, meaning gold, silver and platinum of 99% purity or more in a form traded on global bullion markets, are zero-rated. Between VAT-registered businesses, supplies of gold and other precious metals and stones, and of jewellery whose precious content is worth more than its other components, fall under the reverse charge when the buyer intends to resell them or use them in production: the seller charges no VAT and the buyer accounts for it. This wider reverse charge came in with Cabinet Decision No. 127 of 2024 in February 2025.",
    tables: [
      {
        caption: "VAT on gold and jewellery in the UAE",
        head: ["Supply", "VAT", "Who accounts for it"],
        rows: [
          ["Jewellery sold to a consumer (metal, making, stones)", "5%", "The jeweller, on the tax invoice"],
          ["Investment gold, silver or platinum, 99% purity or more, tradeable on bullion markets", "0%", "Zero-rated; the jeweller keeps its input tax credit"],
          ["Gold, precious metals, stones or jewellery sold to a VAT-registered dealer for resale or production", "5%, reverse charge", "The buyer, in their own VAT return; the seller keeps the buyer's declaration"],
          ["Jewellery bought by a tourist under the tax-free shopping scheme", "5%, refundable", "Refunded to the tourist at departure, less a fee"],
        ],
        note: "Federal Decree-Law No. 8 of 2017 on VAT, its Executive Regulation, and Cabinet Decision No. 127 of 2024 (which replaced Cabinet Decision No. 25 of 2018). The FTA explains the reverse charge in public clarification VATP043.",
      },
    ],
    sections: [
      ["The reverse charge since February 2025", ["Covers gold, silver, platinum and palladium; natural and synthetic diamonds, pearls, rubies, sapphires and emeralds", "And jewellery made of them, where the precious component is worth more than the other components", "Applies when both sides are VAT-registered and the buyer will resell the goods or use them to make such goods", "The buyer gives the seller a written declaration before the supply; the seller keeps it", "The invoice shows no VAT and states that the reverse charge applies"]],
      ["What a tax invoice shows", ["The words Tax Invoice", "Your name, address and TRN; the customer's, with their TRN if registered", "A sequential invoice number, the date of issue, and the date of supply if different", "Each item with its description, quantity and price", "The VAT rate and amount in AED, any discount, and the total payable", "A statement when the reverse charge applies"]],
      ["E-invoicing: the dates", ["Ministerial Decisions No. 243 and 244 of 2025 set up the e-invoicing system", "Pilot from 1 July 2026, by invitation", "Businesses with revenue of AED 50 million or more: from 1 January 2027", "All other businesses in scope: from 1 July 2027", "Government entities: from 1 October 2027", "Invoices go as structured data through an Accredited Service Provider (ASP); a PDF is not an e-invoice"]],
      ["Cash and AML rules for jewellers", ["Dealers in precious metals and stones are covered by the UAE's anti-money-laundering rules", "A cash transaction, or linked transactions, of AED 55,000 or more needs customer due diligence and a Dealers in Precious Metals and Stones Report (DPMSR) on goAML", "Suspicious transactions are reported on goAML whatever the amount", "Check the current rules with the Ministry of Economy and Tourism, your supervisor for mainland and commercial free zone shops"]],
      ["What Infovion JMS does in the UAE", ["Bills in AED with rates per gram for 24K, 22K, 21K and 18K", "5% VAT on metal, making and stones; VAT can be switched off for a reverse-charge bill", "Tax invoice with your TRN and the customer's TRN", "Customer ID stored encrypted, and the payment method on every bill"]],
      ["Not in Infovion JMS yet", ["Arabic or bilingual invoices", "Reverse-charge wording printed automatically: it is added by hand", "UAE e-invoicing through an Accredited Service Provider", "DPMSR reports for goAML"], true],
    ],
    example: {
      caption: "Worked example: an 18.42 g, 21K bangle in Dubai",
      rows: [["Metal value", "18.42 g × AED 374.25", "AED 6,893.69"], ["Making charges", "18.42 g × AED 22", "AED 405.24"], ["Taxable amount", "", "AED 7,298.93"], ["VAT 5%", "", "AED 364.95"], ["Invoice total", "", "AED 7,663.88"]],
      note: "Rates are for illustration only. Sold to a registered dealer for resale under the reverse charge, the same invoice would show no VAT and total AED 7,298.93.",
    },
    faqs: [
      ["Is VAT charged on gold in Dubai?", "Yes, 5% on gold jewellery sold to consumers, on the full value including making and stones. Investment gold of 99% purity or more is zero-rated."],
      ["Is VAT charged on making charges in the UAE?", "Yes. For jewellery sold to a consumer, the making charges are part of the price, and 5% VAT applies to them along with the metal and stones."],
      ["What changed for gold dealers in 2025?", "Cabinet Decision No. 127 of 2024, in force since February 2025, extended the reverse charge from gold and diamonds to silver, platinum, palladium, pearls, rubies, sapphires and emeralds, and to jewellery whose precious content dominates, for supplies between registered businesses for resale or production."],
      ["Can tourists get the VAT back on jewellery?", "Yes, on eligible purchases from shops registered in the tax-free shopping scheme, claimed when leaving the UAE, less a fee."],
      ["When does e-invoicing start for jewellery shops?", "1 January 2027 for businesses with revenue of AED 50 million or more, and 1 July 2027 for other businesses in scope, after a pilot from July 2026."],
      ["Does Infovion JMS support UAE e-invoicing?", "Not yet. It prints VAT tax invoices with your TRN today. Sending invoices through an Accredited Service Provider is not supported."],
    ],
    sources: [["UAE Federal Tax Authority", "https://tax.gov.ae"], ["UAE Ministry of Finance: eInvoicing", "https://mof.gov.ae/einvoicing"], ["PwC: Cabinet Decision on the reverse charge for precious metals and stones", "https://www.pwc.com/m1/en/services/tax/me-tax-legal-news/2025/uae-new-cabinet-decision.html"], ["EY: UAE Ministerial Decisions on e-invoicing", "https://taxnews.ey.com/news/2025-1964-uae-ministry-of-finance-publishes-ministerial-decisions-on-e-invoicing"], ["UAE Financial Intelligence Unit (goAML)", "https://www.uaefiu.gov.ae"]],
    links: [["/uae-jewellery-tax-invoice-format", "Free UAE jewellery tax invoice", "TRN, AED, 5% VAT and a reverse-charge option."], ["/dubai-gold-price-calculator", "Dubai gold price calculator", "AED rate by karat, making and 5% VAT."], ["/jewellery-software-uae", "Jewellery software for the UAE", "Infovion JMS in AED with VAT tax invoices."]],
    cta: "Book a free demo call and we set up your shop for the United Arab Emirates: AED, 5% VAT and Gulf karats. About AED 390 per shop, then a yearly AMC.",
    whatsappText: "Hello Infovion, I read your UAE VAT guide and would like to know about Infovion JMS for our jewellery shop in the UAE.",
  },

  // ── Comparisons ──────────────────────────────────────────────────────────
  "jewellery-software-comparison": {
    title: "Jewellery Software Compared: JMS, Tally, Vyapar, Marg (2026)",
    description: "An honest comparison of jewellery software in India: Infovion JMS, TallyPrime, Vyapar and Marg ERP on girvi, schemes, karigar, tags, GST, devices and price.",
    trail: "Jewellery software compared",
    kicker: "Comparison · updated 27 October 2026",
    h1: "Jewellery software in India, compared",
    sub: "Infovion JMS, TallyPrime, Vyapar and Marg ERP side by side on what a jewellery shop actually does: billing by weight, tags, old gold, girvi, gold schemes, karigar work, GST and price. With the source for every claim, and where another product is the better choice.",
    updated: "2026-10-27",
    disclosure: DISCLOSURE,
    answerQ: "Which jewellery software is best in India?",
    answer: "It depends on what the shop does. TallyPrime is the strongest for accounting and is what most CAs use, with jewellery billing by weight, purity and making charges. Vyapar is the cheapest way to get GST billing with karat, making charges, barcodes and a phone app. Marg ERP's jewellery edition is a Windows system with girvi, schemes and karigar accounts. Infovion JMS is built only for jewellery shops: girvi with interest by days, gold schemes, karigar fine gold with touch and wastage, barcode and RFID stock audits, branches, offline billing and 10 Indian languages, in a browser, for ₹9,999 once plus a yearly AMC, with a Tally export for the CA.",
    tables: [
      {
        caption: "Jewellery features as each vendor describes them (October 2026)",
        head: ["", "Infovion JMS", "TallyPrime", "Vyapar", "Marg ERP 9+ Jewellery"],
        rows: [
          ["Made for", "Jewellery shops only", "Accounting for every trade, with jewellery billing", "Billing for small shops of every trade, with a jewellery page", "Billing and accounts for many trades, with a jewellery edition"],
          ["Billing by weight, purity and making charges", "Yes: per gram, % or per piece", "Yes: fixed, %, per gram or per piece", "Yes: karat per item; making fixed or % per category", "Listed"],
          ["Barcode tags and billing by scan", "Yes, with stock audit by scanning", "Tracks pieces by tag number; barcodes not stated", "Yes", "Yes"],
          ["RFID", "Yes: bulk reading in stock audits", NS, NS, "Yes"],
          ["Old gold exchange", "Yes, plus old gold purchase and melting", NS, "Yes", "Yes"],
          ["Girvi (gold loans)", "Yes: interest by days, part-payments, photos", NS, NS, "Yes (mortgage)"],
          ["Gold savings schemes", "Yes: amount and weight plans, bonus, redemption on the bill", "Customer advances", NS, "Yes (kitty and monthly schemes)"],
          ["Karigar work", "Yes: fine gold, touch, wastage, balances", "Yes: metal issued to and received from karigars", "Yes: material issued, wastage and labour", "Yes"],
          ["HUID on the invoice", "Yes", NS, "Yes", "Hallmark tracking (listing)"],
          ["GST returns", "GSTR-1 files and GSTR-3B summary; your CA files", "Yes, with full GST accounting", "GSTR-1 and GSTR-3B reports", "GST listed"],
          ["Full accounting", "No: exports to TallyPrime", "Yes", "Yes", "Yes"],
          ["Runs on", "Any browser, phone or computer; installs as an app; bills offline", "Windows; cloud access as an add-on", "Windows, Mac, Android and iOS; works offline", "Windows desktop"],
          ["Price (plus GST)", `${PRICE} once per shop, then ${AMC} a year`, "Silver ₹22,500 once (or ₹8,100 a year), then ₹4,500 a year; Gold ₹67,500", "Desktop Gold ₹308 a month, Platinum ₹833 a month, billed yearly; mobile plan free", "Editions listed at ₹10,300 to ₹26,000; ask Marg"],
        ],
        note: CHECKED,
      },
    ],
    sections: [
      ["Choose TallyPrime if", ["Your CA keeps your books in Tally and you want one system", "You need full accounting: ledgers, bank, payroll, audits", "Your counter work is simple billing, with no girvi or schemes", "Many jewellers bill in a jewellery app and send the books to Tally"]],
      ["Choose Vyapar if", ["You want the lowest price, or a free mobile plan", "You want an app from the Play Store or App Store", "You mainly need GST billing with karat, making charges and barcodes"]],
      ["Choose Marg ERP if", ["You want a Windows desktop system with accounting built in", "You want a local Marg dealer to install and support it"]],
      ["Choose Infovion JMS if", ["Girvi, gold schemes or karigar fine-gold accounts are a big part of your business", "You tag every piece and want stock audits by scanning, or RFID", "You have branches, or staff who work best in Hindi, Marathi, Gujarati, Tamil or another Indian language", "You want it on any phone or computer, billing even when the internet drops, with nothing to install", "You want a one-time price with a yearly AMC, and Tally files for your CA"]],
      ["What Infovion JMS does not do", ["Full double-entry accounting: it exports to TallyPrime instead", "An app in the Play Store or App Store: it installs from the browser", "Fully automatic WhatsApp messages: reminders are one tap each", "Bank reconciliation, a public API and loyalty points"], true],
    ],
    faqs: [
      ["Which is the best jewellery software in India?", "There is no single best: TallyPrime suits shops whose priority is accounting, Vyapar suits shops that want low-cost billing on a phone, and Infovion JMS suits shops that run girvi, gold schemes, karigar work and tagged stock. Ask each vendor for a demo with your own bill."],
      ["Can I use jewellery software and Tally together?", "Yes, and many jewellers do. Infovion JMS exports TallyPrime XML (ledgers and vouchers for sales, receipts, old gold and girvi) that the CA imports in two steps."],
      ["Is there free jewellery software?", "Vyapar has a free mobile plan. Infovion offers free jewellery bill formats, a girvi receipt format and calculators, but JMS itself is paid."],
      ["How much does jewellery software cost in India?", `From free mobile billing apps to one-time licences of ₹10,000 to ₹70,000 and custom systems costing lakhs. Infovion JMS is ${PRICE} per shop plus GST, then ${AMC} a year.`],
    ],
    sources: [TALLY_JEWELLERY, TALLY_COST, VYAPAR_JEWELLERY, MARG_JEWELLERY, MARG_LISTING],
    links: [["/tally-for-jewellers", "Tally for jewellery shops", "What TallyPrime does for jewellers, and how JMS works with it."], ["/vyapar-vs-infovion-jms", "Vyapar vs Infovion JMS", "Low-cost billing or a full jewellery shop system."], ["/marg-vs-infovion-jms", "Marg ERP vs Infovion JMS", "Windows desktop or browser on any device."], ["/infovion-jms-features", "Every Infovion JMS feature", "Included, add-on and not yet, with dates."], ["/blog/how-to-choose-jewellery-software-india", "How to choose jewellery software", "A 20-point checklist for demos."]],
  },

  "tally-for-jewellers": {
    title: "Tally for Jewellery Shops: What TallyPrime Does and Doesn't",
    description: "Can Tally run a jewellery shop? What TallyPrime's jewellery billing covers, what it doesn't list (girvi, schemes, old gold, HUID), its price, and using it with JMS.",
    trail: "Tally for jewellers",
    kicker: "Comparison · updated 27 October 2026",
    h1: "Tally for jewellery shops",
    sub: "Most jewellers' CAs keep the books in TallyPrime. Here is what TallyPrime offers a jewellery shop, what its jewellery page does not mention, and how a jewellery app and Tally work together.",
    updated: "2026-10-27",
    disclosure: DISCLOSURE,
    answerQ: "Can Tally be used for a jewellery shop?",
    answer: "Yes. TallyPrime can bill jewellery by weight and purity, add making charges as a fixed amount, a percentage, per gram or per piece, track each piece by tag number, and record metal issued to and received from karigars, all inside full GST accounting. Its jewellery page does not mention girvi, gold savings schemes, old gold exchange, barcode tags or HUID. Many jewellers therefore bill at the counter in jewellery software and send the month's entries to Tally for the CA. Infovion JMS does exactly that with a TallyPrime XML export.",
    tables: [
      {
        caption: "TallyPrime and Infovion JMS for a jewellery shop",
        head: ["", "TallyPrime", "Infovion JMS", "Used together"],
        rows: [
          ["Billing by weight, purity and making", "Yes", "Yes", "Bill in JMS"],
          ["Barcode tags, scanning and stock audit", "Tag numbers; barcodes not stated", "Yes, and RFID", "Tag and audit in JMS"],
          ["Old gold exchange and purchase", NS, "Yes", "JMS sends old gold entries to Tally"],
          ["Girvi with interest", NS, "Yes", "JMS sends girvi loans and interest to Tally"],
          ["Gold savings schemes", "Customer advances", "Yes", "Run in JMS"],
          ["Karigar metal and fine gold", "Yes", "Yes, with touch and wastage", "Either"],
          ["Ledgers, bank, GST accounts, audit", "Yes", "No", "Kept in Tally"],
          ["GST returns", "Yes", "GSTR-1 files and GSTR-3B summary", "Filed from Tally or by the CA"],
          ["Price (plus GST)", "Silver ₹22,500 once, or ₹8,100 a year; TSS ₹4,500 a year", `${PRICE} once per shop, then ${AMC} a year`, "Both"],
        ],
        note: CHECKED,
      },
    ],
    sections: [
      ["Tally alone is enough when", ["Your sales are mostly ready pieces billed by weight", "You do not lend against gold or run savings schemes", "Your accountant enters the bills, or you bill in Tally yourself"]],
      ["A jewellery app helps when", ["Staff bill at the counter by scanning tags", "You run girvi, gold schemes, orders, repairs or karigar jobs", "You need stock audits, branches, or screens in an Indian language", "Your CA works in another town on their own copy of Tally"]],
      ["How JMS and Tally work together", ["Bill, tag and run girvi in JMS through the month", "Download two TallyPrime files: masters (ledgers), then vouchers", "The CA imports them from Gateway of Tally → Import", "Ledger names in JMS match the CA's existing ledgers, so nothing is duplicated", "Sales with GST, receipts, old gold, udhaar payments, girvi loans and interest all arrive"]],
    ],
    faqs: [
      ["Does Tally have girvi management?", "TallyPrime's jewellery page does not list girvi. Tally partners sell add-ons for some trades; ask your Tally partner. Infovion JMS has a girvi register and sends girvi loans and interest to Tally."],
      ["How much does TallyPrime cost?", "Silver (single user) is ₹22,500 once or ₹8,100 a year; Gold (multi-user) is ₹67,500 once. The yearly TSS renewal is ₹4,500 for Silver and ₹13,500 for Gold. All plus 18% GST, per Tally's own pages in October 2026."],
      ["Can Infovion JMS replace Tally?", "Not for accounting: JMS does not keep double-entry books. It replaces the counter work and the jewellery registers, and exports to Tally."],
      ["Does the Tally export work with Tally ERP 9?", "The files are made for TallyPrime's XML import. If your accountant still uses Tally ERP 9, try a one-month import on a test company first."],
    ],
    sources: [TALLY_JEWELLERY, TALLY_COST],
    links: [["/jewellery-software-with-tally", "Jewellery software with Tally export", "What goes into the TallyPrime files and how they are imported."], ["/jewellery-software-comparison", "Jewellery software compared", "JMS, TallyPrime, Vyapar and Marg side by side."], ["/gst-on-gold-jewellery", "GST on gold jewellery", "Rates and examples for the accounts."]],
  },

  "vyapar-vs-infovion-jms": {
    title: "Vyapar vs Infovion JMS for Jewellery Shops (2026)",
    description: "Vyapar or Infovion JMS for a jewellery shop? Billing, tags, old gold, girvi, gold schemes, karigar, devices and price compared from each product's own pages.",
    trail: "Vyapar vs Infovion JMS",
    kicker: "Comparison · updated 27 October 2026",
    h1: "Vyapar vs Infovion JMS for jewellery shops",
    sub: "Vyapar is a low-cost billing app for every kind of shop, with a jewellery page. Infovion JMS is built only for jewellery shops. Here is where each one fits.",
    updated: "2026-10-27",
    disclosure: DISCLOSURE,
    answerQ: "Is Vyapar or Infovion JMS better for a jewellery shop?",
    answer: "Vyapar is better if you want the lowest price, an app from the Play Store or App Store, and mainly GST billing: its jewellery page lists karat on each item, making charges, old gold exchange, barcodes, karigar job orders, HUID on the invoice and GSTR reports, from ₹308 a month on desktop. Infovion JMS is better if girvi, gold savings schemes, karigar fine gold, stock audits by scanning or RFID, branches or Indian-language screens matter to you: Vyapar's jewellery page does not mention girvi or schemes. JMS costs ₹9,999 once per shop plus a yearly AMC.",
    tables: [
      {
        caption: "Vyapar and Infovion JMS for jewellers",
        head: ["", "Vyapar", "Infovion JMS"],
        rows: [
          ["Made for", "Billing and accounts for small shops of every trade", "Jewellery shops only"],
          ["Karat or purity on each item", "Yes", "Yes, with daily rates by purity"],
          ["Making charges", "Fixed or % per category", "Per gram, % or per piece, per item"],
          ["Weight from a scale", "Yes", "Yes, RS-232 or USB scales"],
          ["Barcode tags", "Yes", "Yes, plus stock audit by scanning and RFID"],
          ["Old gold exchange", "Yes", "Yes, plus purchase vouchers and melting"],
          ["Girvi (gold loans)", NS, "Yes: interest by days, part-payments, overdue list"],
          ["Gold savings schemes", NS, "Yes: amount and weight plans, bonus, redemption"],
          ["Karigar work", "Job orders with material, wastage and labour", "Jobs with fine gold, touch, wastage and balances"],
          ["HUID on the invoice", "Yes", "Yes"],
          ["GST returns", "GSTR-1 and GSTR-3B reports", "GSTR-1 files for the Offline Tool, GSTR-3B summary, e-invoice JSON"],
          ["Tally", "Import/export in the Platinum plan", "TallyPrime XML export in every plan"],
          ["Devices", "Windows, Mac, Android, iOS; offline", "Any browser; installs as an app; offline billing"],
          ["Indian languages", NS, "10, chosen per person"],
          ["Price (plus GST)", "Desktop Gold ₹308 a month, Platinum ₹833 a month, billed yearly; mobile plan free", `${PRICE} once per shop, then ${AMC} a year`],
        ],
        note: CHECKED,
      },
    ],
    sections: [
      ["Choose Vyapar if", ["Price matters most, or a free mobile plan is enough", "You want an app-store app", "You sell ready pieces and need simple GST billing"]],
      ["Choose Infovion JMS if", ["You lend against gold or run monthly gold schemes", "You give work to karigars and keep their fine gold", "You want every piece tagged and the showroom audited by scanning", "You have branches, or staff who prefer an Indian language"]],
    ],
    faqs: [
      ["Does Vyapar have girvi?", "Vyapar's jewellery page does not mention girvi or gold loans. Infovion JMS has a girvi register with interest by days, part-payments, ornament photos and receipts."],
      ["Is Vyapar cheaper than Infovion JMS?", `Over the first year, usually yes: Vyapar's desktop Gold plan is ₹308 a month billed yearly, and its mobile plan is free. JMS is ${PRICE} once, then ${AMC} a year, with every feature included.`],
      ["Can I move from Vyapar to Infovion JMS?", "Yes. Export your items to Excel, and we import them into JMS, keeping your tag numbers. Customer dues are entered as opening balances."],
    ],
    sources: [VYAPAR_JEWELLERY],
    links: [["/jewellery-software-comparison", "Jewellery software compared", "JMS, TallyPrime, Vyapar and Marg side by side."], ["/girvi-software", "Girvi software", "The girvi register in Infovion JMS."], ["/gold-scheme-software", "Gold scheme software", "11-month and weight plans in Infovion JMS."]],
  },

  "marg-vs-infovion-jms": {
    title: "Marg ERP vs Infovion JMS for Jewellery Shops (2026)",
    description: "Marg ERP jewellery edition or Infovion JMS? Girvi, schemes, karigar, barcode and RFID, devices and price compared from each product's own pages, October 2026.",
    trail: "Marg vs Infovion JMS",
    kicker: "Comparison · updated 27 October 2026",
    h1: "Marg ERP vs Infovion JMS for jewellery shops",
    sub: "Both cover the jewellery counter, girvi, schemes and karigars. The real differences are how they run, Windows desktop or any browser, and how they are bought and supported.",
    updated: "2026-10-27",
    disclosure: DISCLOSURE,
    answerQ: "Is Marg ERP or Infovion JMS better for a jewellery shop?",
    answer: "Both cover jewellery billing, barcode and RFID tags, old gold exchange, girvi, schemes and karigar accounts, according to Marg's own jewellery pages. Marg ERP 9+ is a Windows desktop system with accounting built in, sold and supported through Marg dealers. Infovion JMS runs in any browser on a phone, tablet or computer, keeps billing when the internet drops, has every screen in 10 Indian languages and branches with stock transfer, and leaves full accounting to TallyPrime through an export. JMS is ₹9,999 once per shop plus a yearly AMC.",
    tables: [
      {
        caption: "Marg ERP 9+ Jewellery and Infovion JMS",
        head: ["", "Marg ERP 9+ Jewellery", "Infovion JMS"],
        rows: [
          ["Runs on", "Windows desktop", "Any browser on phone, tablet or computer; installs as an app"],
          ["Without internet", "Desktop software", "Each counter keeps billing offline and sends the bills later"],
          ["Barcode and RFID", "Yes", "Yes, with stock audit by scanning"],
          ["Old gold exchange", "Yes", "Yes, plus purchase vouchers and melting"],
          ["Girvi", "Yes (mortgage)", "Yes: interest by days, part-payments, photos"],
          ["Schemes", "Kitty and monthly schemes", "Amount and weight plans, bonus, redemption on the bill"],
          ["Karigar", "Karigar accounts and job work", "Jobs with fine gold, touch, wastage and balances; manufacturing by process"],
          ["Accounting", "Built in", "Exports to TallyPrime"],
          ["Indian languages", NS, "10, chosen per person"],
          ["Price (plus taxes)", "Editions listed at ₹10,300 to ₹26,000; ask Marg", `${PRICE} once per shop, then ${AMC} a year`],
        ],
        note: CHECKED,
      },
    ],
    sections: [
      ["Choose Marg ERP if", ["You want accounting and the counter in one Windows program", "You prefer a local dealer who installs and supports it in person"]],
      ["Choose Infovion JMS if", ["You want to bill and check the shop from a phone or any computer", "You have branches, or staff who work in an Indian language", "Your CA already uses TallyPrime", "You want one fixed price with every feature included"]],
    ],
    faqs: [
      ["Does Marg have girvi and schemes?", "Marg's jewellery pages list a girvi (mortgage) module and kitty and monthly schemes. Infovion JMS has both too."],
      ["Is Marg ERP cloud software?", "Marg ERP 9+ is desktop software for Windows; listings mention cloud options. Ask Marg what is included in your edition. Infovion JMS runs in the browser and needs no installation."],
      ["Can I move from Marg to Infovion JMS?", "Yes. Export your stock to Excel and we import it into JMS with your tag numbers; customer dues are entered as opening balances."],
    ],
    sources: [MARG_JEWELLERY, MARG_LISTING],
    links: [["/jewellery-software-comparison", "Jewellery software compared", "JMS, TallyPrime, Vyapar and Marg side by side."], ["/offline-jewellery-billing-software", "Offline billing", "How a JMS counter bills without internet."], ["/multi-branch-jewellery-software", "Branches", "Stock, bills and staff per branch."]],
  },
};
