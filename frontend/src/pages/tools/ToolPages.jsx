import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import CertificateTool from "./CertificateTool";
import { CtaBand, FaqList, LinkRow, PageHero, Section } from "../../components/site/Ui";
import { SITE } from "../../Data/company";

export function LeavingCertificateTool() {
  return (
    <CertificateTool
      toolKey="lc"
      seo={{
        title: "School Leaving Certificate (शाळा सोडल्याचा दाखला) Generator",
        description: "Free school leaving certificate (शाळा सोडल्याचा दाखला) generator in Marathi or English, with date of birth in words. Print or save as PDF.",
        h1: "शाळा सोडल्याचा दाखला — free Marathi Leaving Certificate generator",
        intro: "Fill in the student's details from the General Register and get a one-page Maharashtra School Leaving Certificate in Marathi, Marathi + English, or English — with the date of birth written in words for you. Print it or save it as a PDF. Free, no sign-up.",
        howTitle: "How to fill a school leaving certificate (LC)",
        how: [
          "Copy the student's details exactly as written in the school's General Register (जनरल रजिस्टर) — the LC must match it.",
          "Enter the date of birth in figures; the date in words (अक्षरी) is written automatically.",
          "Fill the date of admission with the class, the class the student was studying in, and the date of leaving.",
          "Write progress (प्रगती) and conduct (वर्तणूक) — commonly चांगली / समाधानकारक.",
          "Give the reason for leaving, e.g. पालकांच्या विनंतीवरून or स्थलांतर.",
          "Print on the school letterhead, sign by the class teacher, clerk and headmaster, and put the school seal.",
        ],
        faq: [
          ["What is a school leaving certificate (शाळा सोडल्याचा दाखला)?", "It is the certificate a Maharashtra school issues when a student leaves. The next school needs it for admission, and it is also used later as proof of date of birth, caste and education. Its details must match the school's General Register."],
          ["Is this format valid for Maharashtra State Board schools?", "It follows the entries commonly used on Maharashtra leaving certificates: G.R. number, Aadhaar, mother's name, nationality, mother tongue, religion, caste and sub-caste, place and date of birth (in figures and words), previous school, admission date, progress, conduct, date and reason of leaving, and remarks. Check it against your school's own register before issuing."],
          ["Can I make the LC in Marathi and English together?", "Yes. Choose “मराठी + English” and every entry shows both labels."],
          ["Is the student data stored anywhere?", "No. Everything stays in your browser. Only your school's name and address are remembered on this device, to save typing next time."],
          ["Can the leaving certificate be generated automatically?", "Yes — in Infovion the LC is filled from the student's record, parents can apply online, the principal approves it, and every LC issued is kept in a register."],
        ],
      }}
    />
  );
}

export function TransferCertificateTool() {
  return (
    <CertificateTool
      toolKey="tc"
      seo={{
        title: "Transfer Certificate (TC) Format and Free Generator | Infovion",
        description: "Free transfer certificate (TC) generator in the format CBSE and English-medium schools use, with date of birth in words. Print or save as PDF.",
        h1: "Free Transfer Certificate (TC) generator for schools",
        intro: "Make a one-page school Transfer Certificate in the standard format — date of birth in words is written for you, then print it on your letterhead or save it as a PDF. Free, no sign-up, nothing uploaded.",
        howTitle: "How to fill a school transfer certificate",
        how: [
          "Take the details from the admission register — the TC must match the school's records.",
          "Enter the date of birth in figures; it's written in words automatically.",
          "Fill the class last studied, the last examination with its result, and whether the student is promoted.",
          "Add the month up to which fees are paid and the working days / days present.",
          "Write general conduct and the reason for leaving.",
          "Print, get it signed by the class teacher, office and principal, and stamp it.",
        ],
        faq: [
          ["What does a school TC contain?", "Student and parents' names, nationality and category, date of birth in figures and words, first admission date and class, class last studied, last examination and result, subjects, promotion, fees paid up to, working days and attendance, conduct, dates of application and issue, and reason for leaving."],
          ["Is this the CBSE TC format?", "It follows the entries CBSE-affiliated and other English-medium schools commonly use. Your board may require extra entries — add them under remarks, or check your board's latest circular."],
          ["Can I save the TC as a PDF?", "Yes. Click “Print / Save as PDF” and choose “Save as PDF” as the printer."],
          ["Do you keep the student's data?", "No. The certificate is made in your browser and nothing is sent to us."],
          ["How do schools issue TCs without typing?", "In Infovion, the TC is filled from the student's record, the request goes from parent to principal to office for approval, and the student moves to former students automatically."],
        ],
      }}
    />
  );
}

export function BonafideCertificateTool() {
  return (
    <CertificateTool
      toolKey="bonafide"
      seo={{
        title: "Bonafide Certificate Format and Free Generator | Infovion",
        description: "Free bonafide certificate generator for schools: enter the student's name, class and purpose, then print on your letterhead or save as PDF.",
        h1: "Free bonafide certificate generator for school students",
        intro: "Parents ask for bonafide certificates for bank accounts, scholarships, passports and bus passes. Fill in a few details and print a clean one-page bonafide certificate — free, no sign-up.",
        howTitle: "How to write a bonafide certificate",
        how: [
          "Enter the student's full name and the parent's name as in school records.",
          "Add the class & division and the academic year.",
          "Optionally add the date of birth — it's written in words automatically.",
          "Mention the purpose (bank account, scholarship, passport, travel concession…).",
          "Print on the letterhead, sign and stamp.",
        ],
        faq: [
          ["What is a bonafide certificate?", "A letter from the school confirming that the student is currently enrolled, in which class and year — used for bank accounts, scholarships, passports and concessions."],
          ["Who signs a bonafide certificate?", "Usually the principal or headmaster, with the school seal."],
          ["Is the data stored?", "No. Everything stays in your browser."],
          ["Can bonafides be printed in bulk?", "In Infovion, bonafide and character certificates and ID cards print straight from student records — one or a whole class at a time."],
        ],
      }}
    />
  );
}

const SOFTWARE_TOOLS = [
  ["/app-development-cost-calculator", "App development cost calculator", "Android, iOS or PWA: choose screens and features, get a budget range in INR, USD, AED or GBP and a timeline."],
  ["/software-development-cost-calculator", "Software development cost calculator", "Website, web app, CRM, ERP or SaaS: cost by modules, user roles, integrations and data migration."],
  ["/hire-developers-india-cost-calculator", "Hire developers in India: cost calculator", "A dedicated developer in India against in-house hiring in the US, UK, UAE, Australia, Canada or Europe."],
  ["/ai-automation-roi-calculator", "AI automation ROI calculator", "Hours saved, monthly saving and payback period for automating a task."],
];
const JEWELLERY_TOOLS = [
  ["/gold-price-calculator", "Gold price calculator (India)", "22K, 24K and 18K rate per gram, making charges, 3% GST and old gold exchange."],
  ["/dubai-gold-price-calculator", "Dubai gold price calculator", "AED rate per gram by karat, making charges and 5% VAT."],
  ["/girvi-interest-calculator", "Girvi interest calculator", "Interest on a gold loan, counted by days at a monthly rate."],
  ["/jewellery-bill-format", "Jewellery GST bill format", "A gold jewellery bill with GST: fill in, print, save as PDF or download in Excel."],
  ["/girvi-receipt-format", "Girvi receipt format", "Pledge receipt with ornament details, amount, interest rate and due date."],
  ["/jewellery-bill-formats", "All jewellery formats", "Estimate, old gold purchase voucher, karigar slip and UAE tax invoice."],
];
const SCHOOL_TOOLS = [
  ["/free-tools/school-leaving-certificate-marathi", "शाळा सोडल्याचा दाखला (Leaving Certificate)", "Maharashtra LC in Marathi, Marathi + English or English, with date of birth in words."],
  ["/free-tools/transfer-certificate", "Transfer Certificate (TC)", "The standard one-page school TC, ready to print on your letterhead."],
  ["/free-tools/bonafide-certificate", "Bonafide certificate", "For bank accounts, scholarships, passports and concessions."],
];

const HUB_FAQ = [
  ["Are these tools free?", "Yes. Every calculator, format and certificate generator on this page is free to use, with no sign-up and no limit."],
  ["Is anything I type stored or uploaded?", "No. The tools run in your browser. Nothing you enter is sent to Infovion unless you choose to share a result with us on WhatsApp or through the contact form."],
  ["How accurate are the cost calculators?", "They give planning ranges built from Infovion's published 2026 prices for India, the same ranges shown on our service pages. A fixed price needs a short call and a written scope, which we usually send within two business days."],
  ["Who makes these tools?", "Infovion Technologies, a software development company in Pune, India, and the maker of Infovion School ERP and Infovion JMS jewellery software. The jewellery tools use the same sums as Infovion JMS."],
];

export function ToolsIndex() {
  const all = [...SOFTWARE_TOOLS, ...JEWELLERY_TOOLS, ...SCHOOL_TOOLS];
  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free tools by Infovion Technologies",
    itemListElement: all.map(([to, name], i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}${to}`, name })),
  };
  const group = (kicker, title, sub, tools, icon) => (
    <Section kicker={kicker} title={title} sub={sub} className="py-12">
      <div className="mt-8 grid border-t border-white/10 md:grid-cols-2 md:gap-x-12">
        {tools.map(([to, t, b]) => <LinkRow key={to} to={to} icon={icon} title={t} body={b} />)}
      </div>
    </Section>
  );
  return (
    <>
      <Helmet>
        <title>Free Tools: App Cost, Gold Price, School Certificates | Infovion</title>
        <meta name="description" content="Free online tools: app and software development cost calculators, developer cost and AI ROI calculators, gold price calculator, jewellery bill formats, school TC." />
        <link rel="canonical" href={`${SITE}/free-tools`} />
        <meta property="og:title" content="Free tools by Infovion Technologies" />
        <meta property="og:url" content={`${SITE}/free-tools`} />
        <script type="application/ld+json">{JSON.stringify(list)}</script>
      </Helmet>
      <PageHero trail={[["Free tools", "/free-tools"]]} kicker="Free tools" title="Free calculators, formats and certificate makers"
        sub="Tools we built for the people we work with: businesses planning software, jewellers and school offices. No sign-up, nothing uploaded, and every result can be printed, copied or shared on WhatsApp." />

      {group("Software and apps", "Cost calculators for software buyers", "Work out a budget before you ask for quotes. The figures follow our published 2026 prices.", SOFTWARE_TOOLS, "Calculator")}
      {group("Jewellery", "Gold calculators and bill formats", "For jewellers, pawnbrokers and their customers, in India and the Gulf.", JEWELLERY_TOOLS, "Gem")}
      {group("Schools", "Certificate generators for school offices", "The certificates parents ask for every day, in the right format, in seconds.", SCHOOL_TOOLS, "GraduationCap")}

      <Section className="py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="text-[15px] leading-relaxed text-slate-300">
            <h2 className="font-display text-2xl font-bold text-white">Which certificate does a parent need?</h2>
            <p className="mt-4"><strong className="text-white">School Leaving Certificate (LC, शाळा सोडल्याचा दाखला):</strong> issued when a student leaves the school, in the format Maharashtra schools use. The next school asks for it at admission. <Link to="/free-tools/school-leaving-certificate-marathi" className="text-sky-300 underline">Make one in Marathi</Link>.</p>
            <p className="mt-4"><strong className="text-white">Transfer Certificate (TC):</strong> the leaving document most CBSE, ICSE and other state schools issue, with the student's class, conduct and dues status. <Link to="/free-tools/transfer-certificate" className="text-sky-300 underline">Make a transfer certificate</Link>.</p>
            <p className="mt-4"><strong className="text-white">Bonafide certificate:</strong> confirms that the student is currently studying at the school. Parents ask for it for scholarships, bank accounts, passports and concessions. <Link to="/free-tools/bonafide-certificate" className="text-sky-300 underline">Make a bonafide certificate</Link>.</p>
          </div>
          <div className="text-[15px] leading-relaxed text-slate-300">
            <h2 className="font-display text-2xl font-bold text-white">How the tools work</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5">
              <li>Open the tool you need and fill in the details; the result updates as you type.</li>
              <li>Calculators show how the figure is made up, line by line.</li>
              <li>Print, save as PDF, copy, or share the result on WhatsApp.</li>
            </ol>
            <p className="mt-4">Everything happens in your browser: nothing is uploaded to us, and no sign-up is needed. The cost calculators give planning ranges, not quotes; for a fixed price, <Link to="/contact" className="text-sky-300 underline">send us a short brief</Link>.</p>
          </div>
        </div>
      </Section>

      <FaqList faqs={HUB_FAQ} />
      <CtaBand title="Need software built for your business?" />
    </>
  );
}
