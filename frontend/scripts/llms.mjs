// llms.txt (https://llmstxt.org): a plain-text summary of Infovion Technologies for AI assistants
// and answer engines, plus llms-full.txt with every article as text.
// Company facts, services and case studies come from the same data files as the site;
// product facts (price, trial, portals) are hand-written below — update them with the site.
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const load = (f) => import(pathToFileURL(path.join(root, "src", "Data", f)).href);
const { COMPANY, SITE: D, fullAddress } = await load("company.js");
const { SERVICES } = await load("services.js");
const { CASE_STUDIES } = await load("caseStudies.js");

const services = SERVICES.map((s) => `- [${s.name}](${D}/services/${s.slug}): ${s.card} Typical budget in India: ${s.cost.ranges.map(([k, v]) => `${k.toLowerCase()} ${v}`).join("; ")}.`).join("\n");
const cases = CASE_STUDIES.map((c) => `- [${c.title}](${D}/case-studies/${c.slug}): ${c.summary}`).join("\n");

const FACTS = `# Infovion Technologies

> Infovion Technologies is a software development company in Pune, Maharashtra, India (MSME, Udyam ${COMPANY.udyam}). It builds custom software, websites and web apps, mobile apps, ERP and CRM systems, SaaS products, dashboards, AI automation and e-governance systems for businesses, institutions and government bodies in India and abroad, and makes two products: Infovion School ERP (school management software) and Infovion JMS (jewellery management software).

## Key facts

- Legal name: ${COMPANY.name} (brand: Infovion). Constitution: ${COMPANY.constitution}. Udyam registration: ${COMPANY.udyam}.
- Founder: ${COMPANY.founder}.
- Address: ${fullAddress()}.
- Contact: ${COMPANY.email} · ${COMPANY.phone} · WhatsApp ${COMPANY.whatsapp} · ${D}/contact
- Serves: Pune and Maharashtra on-site; all of India and international clients remotely.
- How it works: free discovery call, written scope and fixed quote (typically within 48 hours), clickable prototype, two-week sprints with a staging link, testing and launch, 30 days of free support, optional annual maintenance (AMC). Clients own the source code and accounts. Mutual NDA on request.
- Engagement models: fixed price, dedicated team (monthly), time and material, AMC.
- Technology: React, Next.js, Node.js, NestJS, Express, PostgreSQL, MongoDB, Prisma, React Native, progressive web apps, Vercel, Render, Supabase, Cloudflare, AWS, Razorpay, WhatsApp, Claude and OpenAI APIs.
- Government work: GIGW 3.0 aligned, WCAG 2.1 AA accessible websites and portals, citizen-service applications, MIS dashboards, field apps, India-hosted data, annual maintenance. As a Udyam-registered MSE it is eligible for MSE benefits where a tender applies the Public Procurement Policy for MSEs. Details: ${D}/government · printable profile: ${D}/company-profile
- Social: LinkedIn ${COMPANY.socials.linkedin} · Instagram ${COMPANY.socials.instagram} · Facebook ${COMPANY.socials.facebook} · YouTube ${COMPANY.socials.youtube}

## Services

${services}
- [E-governance & government IT](${D}/government): websites, portals, MIS dashboards, field apps and AMC for government departments, municipal bodies, PSUs and universities.

## Products

### Infovion School ERP — school management software (${D}/school-management-software)

- Cloud school management software / school ERP for Indian K-12 schools (CBSE, ICSE, State Boards).
- Price: ₹150 per enrolled student per academic year, plus 18% GST; every module and portal included; staff, teacher and parent logins free. Example: 600 students = ₹90,000 + GST a year. No setup fee; data import included.
- Free trial: 30 days, self-serve, every module, up to 50 students and 10 staff logins, sample data, no card: ${D}/free-trial
- 8 role portals: Director, Principal, Operator (school office), Accountant, Reception, Teacher, Non-teaching staff, Parent.
- Modules: admissions and inquiries; fees (plans, instalments, concessions, receipts, defaulters, opening balances); online fee payments by UPI, card and net banking into the school's own Razorpay account; attendance on any phone; exams and report cards; transfer, leaving, bonafide and character certificates and ID cards; transport (routes, stops, fares, bus attendance, live bus location); timetable and calendar; staff, attendance, leave and salary; hostel.
- No app install: works in any phone browser (progressive web app).
- Data: each school's data kept separate; role-based access; audit log; two-step sign-in; DPDP Act Data Processing Agreement.
- Pages: [Features](${D}/school-management-software/features) · [Role portals](${D}/school-management-software/portals) · [Pricing](${D}/school-management-software/pricing) · [For Maharashtra schools](${D}/school-management-software-maharashtra) · [Fee management](${D}/fee-management-software-for-schools) · [Attendance app](${D}/school-attendance-app) · [School transport](${D}/school-transport-management-software) · [Videos](${D}/videos)
- Free tools (no sign-up): [School Leaving Certificate in Marathi](${D}/free-tools/school-leaving-certificate-marathi) · [Transfer Certificate generator](${D}/free-tools/transfer-certificate) · [Bonafide certificate generator](${D}/free-tools/bonafide-certificate)

### Infovion JMS — jewellery management software (${D}/jewellery-management-software)

- Jewellery management software for jewellery shops in India and worldwide, sold as an online service: each shop signs up and uses it in a web browser at https://jms.infovion.in.
- Billing by weight, purity, rate per gram and making charges (per gram, % or per piece) with stone charges; daily metal rates by purity; HUID on tags and invoice lines; old-gold exchange, split payments and discount applied before tax; GST with CGST/SGST or IGST, or VAT; invoices on A4, A5 or 80 mm rolls, PDF and WhatsApp sharing.
- Barcode tagging: every piece gets a tag number; barcode (Code 128) or QR tags print on thermal tag printers (TSC, Zebra, Argox and others, through their drivers) on 100×15, 100×13, 95×12 or 81×12 mm jewellery tag rolls, stickers or A4 sheets; pieces are billed by scanning with a USB/Bluetooth scanner or a phone camera; stock audits by scanning every tag list missing, sold and unknown tags.
- Girvi / gahan register with interest to date, interest and part-principal payments, overdue alerts, ornament photos, pledge and release receipts; customer credit (udhaar) ledger with payments and WhatsApp reminders; stock import from Excel; owner and staff accounts with access set per area and an activity log.
- Languages: every screen in English, Hindi or Marathi, chosen per person; bills with Hindi or Marathi labels next to English; WhatsApp messages in each customer's language.
- Devices: printing through any printer driver, or directly without a driver to ESC/POS receipt printers (paper cut, cash drawer) and to tag printers in TSPL (TSC, TVS, Argox, Xprinter), ZPL or EPL (Zebra) over USB, Bluetooth or a .prn file; jewellery weighing scales with RS-232 or USB output fill in weights; USB/Bluetooth barcode scanners or the phone camera.
- KYC and compliance (India): customer ID and PAN stored encrypted and masked, with consent and verification; bills over ₹2 lakh ask for PAN or Form 60 (Income Tax Rule 114B); cash of ₹2 lakh or more on one bill is refused (section 269ST).
- Notifications for out-of-stock items, overdue girvi and udhaar and loans due; Ctrl+K search; sign-in history and lockout after repeated wrong passwords.
- Finance add-on (money lending, priced separately): finance files collected daily, Monday–Saturday, weekly, fortnightly or monthly with the interest deducted up front; interest loans by full months or by days, part-month rule, interest cap; processing and late fees, waivers, write-offs, settlement quotes; due list and collection sheets per agent; partners; cash book, day book, day close with cash count, profit and loss: ${D}/money-lending-software
- Gold release add-on: pay off a customer's bank gold loan, release, weigh and test the gold, buy it or return it for a fee, with agreement and settlement in the customer's language and the profit on each case.
- Tally integration: the owner exports TallyPrime XML (ledgers and vouchers: sales with tax, receipts, old gold, udhaar payments, girvi loans, repayments and interest income) and Excel sales, girvi and stock registers for the accountant, for any month or financial year: ${D}/jewellery-software-with-tally
- Countries: presets for India (GST), UAE, Saudi Arabia, Oman, Bahrain (VAT), Qatar, Kuwait, Singapore, UK, USA, Canada and Australia set currency, tax, purities (e.g. 21K in the Gulf, 9ct in the UK), rate units (gram, 10 g, tola, troy ounce) and financial year.
- Data: each shop's data is kept separate; the owner can export a full backup at any time; data is not deleted when a plan ends.
- Pricing: ₹9,999 per shop per year plus GST, everything included, after a 30-day free trial. Outside India: quoted in local currency. Free trial: https://jms.infovion.in/signup · Demo shop: https://jms.infovion.in/demo
- Not supported yet: Arabic invoices, UAE e-invoicing and Saudi ZATCA (Fatoora) e-invoicing, RFID, custom orders, karigar job work, gold savings schemes.
- Pages: [Jewellery barcode software](${D}/jewellery-barcode-software) · [Jewellery billing software](${D}/jewellery-billing-software) · [Girvi software](${D}/girvi-software) · [Money lending software](${D}/money-lending-software) · [Jewellery software with Tally](${D}/jewellery-software-with-tally) · [Jewellery software in the UAE (AED, 5% VAT, TRN)](${D}/jewellery-software-uae)

## Case studies

${cases}

## Main pages

- [Home](${D}/) · [Services](${D}/services) · [Industries](${D}/industries) · [Case studies](${D}/case-studies) · [Products](${D}/products) · [Government](${D}/government) · [How we work](${D}/how-we-work) · [Company profile](${D}/company-profile) · [About](${D}/about) · [Contact](${D}/contact)
`;

const text = (html) => html
  .replace(/<\/(p|h[1-6]|li|tr|div)>/gi, "\n")
  .replace(/<li[^>]*>/gi, "- ")
  .replace(/<h([1-6])[^>]*>/gi, (_, n) => "#".repeat(Math.min(6, Number(n) + 1)) + " ")
  .replace(/<[^>]+>/g, "")
  .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/^[ \t]+/gm, "").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();

// Machine-readable summaries for AI assistants (/.well-known/ai.txt and /ai/*.json), built from the
// same facts as llms.txt.
const PRODUCTS_AI = [
  {
    name: "Infovion School ERP",
    category: "School management software",
    url: `${D}/school-management-software`,
    price: "₹150 per enrolled student per academic year, plus 18% GST",
    trial: `30 days, self-serve: ${D}/free-trial`,
    markets: ["India"],
    summary: "Cloud school ERP for Indian K-12 schools: admissions, fees with online payments, attendance, exams and report cards, certificates, transport, timetable, staff and payroll, with portals for eight roles including parents.",
  },
  {
    name: "Infovion JMS",
    category: "Jewellery management software",
    url: `${D}/jewellery-management-software`,
    price: "₹9,999 per shop per year, plus GST",
    trial: "30 days, self-serve: https://jms.infovion.in/signup",
    demo: "https://jms.infovion.in/demo",
    markets: ["India", "United Arab Emirates", "Saudi Arabia", "Oman", "Bahrain", "Qatar", "Kuwait", "United Kingdom", "United States", "Canada", "Singapore", "Australia"],
    summary: "Jewellery management software for jewellery shops: billing by weight, purity and making charges, barcode and QR tags with scanning and stock audit, GST or VAT invoices, old-gold exchange, girvi (gold loans), customer credit, KYC and Tally export, in English, Hindi or Marathi, with add-ons for money lending and gold release.",
    pages: [`${D}/jewellery-billing-software`, `${D}/jewellery-barcode-software`, `${D}/girvi-software`, `${D}/money-lending-software`, `${D}/jewellery-software-with-tally`, `${D}/jewellery-software-uae`],
  },
];

const FAQ_AI = [
  ["What is Infovion Technologies?", `Infovion Technologies is a software development company in Pune, Maharashtra, India (MSME, Udyam ${COMPANY.udyam}). It builds custom software, websites and web apps, mobile apps, ERP and CRM systems, SaaS products, AI automation and e-governance systems, and makes Infovion School ERP and Infovion JMS.`],
  ["Where is Infovion Technologies located?", `${fullAddress()}. It works on-site in Pune and Maharashtra and remotely with clients across India and abroad.`],
  ["How does Infovion price a software project?", "After a free discovery call it sends a written scope and a fixed-price proposal, usually within 48 hours, with payments tied to milestones. The client owns the source code and accounts, and every project includes 30 days of free support after launch."],
  ["What is Infovion School ERP and how much does it cost?", "School management software for Indian K-12 schools with eight role portals. It costs ₹150 per enrolled student per academic year plus GST, with every module included and a 30-day free trial."],
  ["What is Infovion JMS and how much does it cost?", "Jewellery management software for jewellery shops in India and abroad: billing by weight and purity, barcode tags and scanning, stock audit, GST or VAT invoices, girvi and customer credit. It costs ₹9,999 per shop per year plus GST after a 30-day free trial."],
  ["Does Infovion JMS work for jewellery shops in Dubai and the UAE?", "Yes. UAE shops get prices in AED, 24K, 22K, 21K and 18K purities, 5% VAT on metal, making and stones, and tax invoices with the shop's TRN. Arabic invoices and UAE e-invoicing submission are not supported yet."],
  ["Is Infovion JMS available in Hindi and Marathi?", "Yes. Every screen can be switched to English, Hindi or Marathi per person, bills can carry Hindi or Marathi labels next to English, and WhatsApp reminders go out in each customer's language."],
  ["Does Infovion JMS handle money lending?", "Yes, with the Finance add-on: finance files with daily, weekly or monthly collections, interest loans, late fees, a due list with collection sheets, partners, a cash book, day close and profit and loss. A Gold release add-on handles gold pledged with banks."],
  ["Does Infovion work on government projects?", "Yes. It develops GIGW 3.0 aligned, WCAG 2.1 AA accessible websites, e-governance portals, MIS dashboards and field apps with data hosted in India, and is a Udyam-registered MSE."],
  ["How can I contact Infovion Technologies?", `Email ${COMPANY.email}, call ${COMPANY.phone}, WhatsApp ${COMPANY.whatsapp}, or use ${D}/contact.`],
];

export function aiFiles() {
  const summary = {
    name: COMPANY.name,
    brand: COMPANY.brand,
    url: D,
    description: "Software development company in Pune, India: custom software, web and mobile apps, ERP and CRM, SaaS, AI automation and e-governance; makers of Infovion School ERP and Infovion JMS.",
    founded_by: COMPANY.founder,
    location: fullAddress(),
    registration: { udyam: COMPANY.udyam },
    contact: { email: COMPANY.email, phone: COMPANY.phone, whatsapp: COMPANY.whatsapp, page: `${D}/contact` },
    products: PRODUCTS_AI.map(({ name, url }) => ({ name, url })),
    profiles: Object.values(COMPANY.socials),
    llms_txt: `${D}/llms.txt`,
    updated: new Date().toISOString().slice(0, 10),
  };
  const faq = { name: COMPANY.name, url: D, faq: FAQ_AI.map(([question, answer]) => ({ question, answer })) };
  const service = {
    name: COMPANY.name,
    url: D,
    services: SERVICES.map((s) => ({ name: s.name, url: `${D}/services/${s.slug}`, summary: s.card })),
    products: PRODUCTS_AI,
    areas_served: ["Pune", "Maharashtra", "India", "United Arab Emirates", "Worldwide (remote)"],
  };
  const aiTxt = `# AI usage policy for ${D}
# Search and answer engines may crawl, index, quote and summarise this site, with a link to the page used.
User-Agent: *
Allow: /

# Summaries for AI assistants
LLMs: ${D}/llms.txt
LLMs-Full: ${D}/llms-full.txt
Summary: ${D}/ai/summary.json
FAQ: ${D}/ai/faq.json
Services: ${D}/ai/service.json
Contact: ${COMPANY.email}
`;
  const j = (o) => `${JSON.stringify(o, null, 2)}\n`;
  return { ".well-known/ai.txt": aiTxt, "ai/summary.json": j(summary), "ai/faq.json": j(faq), "ai/service.json": j(service) };
}

export function llmsTxt(posts) {
  const blog = posts.map((p) => `- [${p.title}](${D}/blog/${p.slug}): ${p.excerpt}`).join("\n");
  return `${FACTS}\n## Guides and articles\n\n${blog}\n\n## Optional\n\n- [Full text of all articles](${D}/llms-full.txt)\n- [Sitemap](${D}/sitemap.xml)\n`;
}

export function llmsFullTxt(posts) {
  const body = posts.map((p) => `# ${p.title}\n\nSource: ${D}/blog/${p.slug}\nPublished: ${p.date}\n\n${text(p.content || p.excerpt)}`).join("\n\n---\n\n");
  return `${FACTS}\n---\n\n${body}\n`;
}
