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
const { SHOWCASE } = await load("showcase.js");
const { HEALTHCARE } = await load("healthcare.js");
const { OFFSHORE } = await load("offshore.js");
const offshore = OFFSHORE.map((s) => `- [${s.name}](${D}${s.path}): ${s.card}`).join("\n");
const healthcare = HEALTHCARE.map((s) => `- [${s.name}](${D}${s.path}): ${s.card} Typical budget in India: ${s.cost.ranges.map(([k, v]) => `${k.toLowerCase()} ${v}`).join("; ")}.`).join("\n");

const services = SERVICES.map((s) => `- [${s.name}](${D}/services/${s.slug}): ${s.card} Typical budget in India: ${s.cost.ranges.map(([k, v]) => `${k.toLowerCase()} ${v}`).join("; ")}.`).join("\n");
const blueprints = SHOWCASE.map((p) => `- [${p.title}](${D}/solutions/${p.slug}): ${p.summary} Indicative build budget: ${p.budget.india} in India, ${p.budget.usd} for clients abroad; ${p.budget.timeline}`).join("\n");
const cases = CASE_STUDIES.map((c) => `- [${c.title}](${D}/case-studies/${c.slug}): ${c.summary}`).join("\n");

const FACTS = `# Infovion Technologies

> Infovion Technologies is a software development company in Pune, Maharashtra, India (MSME, Udyam ${COMPANY.udyam}). It builds custom software, websites and web apps, mobile apps, ERP and CRM systems, SaaS products, dashboards, AI automation and e-governance systems for businesses, institutions and government bodies in India and abroad; provides on-demand developers, software maintenance (AMC), application security, and help fixing and launching apps built with AI coding tools; and makes two products: Infovion School ERP (school management software) and Infovion JMS (jewellery management software).

## Key facts

- Legal name: ${COMPANY.name} (brand: Infovion). Constitution: ${COMPANY.constitution}. Udyam registration: ${COMPANY.udyam}.
- Founder: ${COMPANY.founder}.
- Address: ${fullAddress()}.
- Contact: ${COMPANY.email} · ${COMPANY.phone} · WhatsApp ${COMPANY.whatsapp} · ${D}/contact
- Serves: Pune and Maharashtra on-site; all of India and international clients remotely (US, UK, Europe, Australia, the Gulf), priced in USD for clients outside India: ${D}/services/offshore-software-development-india
- How it works: free discovery call, written scope and fixed quote (typically within 48 hours), clickable prototype, two-week sprints with a staging link, testing and launch, 30 days of free support, optional annual maintenance (AMC). Clients own the source code and accounts. Mutual NDA on request.
- Engagement models: fixed price, dedicated team (monthly), time and material, AMC.
- Technology: React, Next.js, Node.js, NestJS, Express, PostgreSQL, MongoDB, Prisma, React Native, progressive web apps, Vercel, Render, Supabase, Cloudflare, AWS, Razorpay, WhatsApp, Claude and OpenAI APIs.
- Government work: GIGW 3.0 aligned, WCAG 2.1 AA accessible websites and portals, citizen-service applications, MIS dashboards, field apps, India-hosted data, annual maintenance. As a Udyam-registered MSE it is eligible for MSE benefits where a tender applies the Public Procurement Policy for MSEs. Details: ${D}/government · printable profile: ${D}/company-profile
- Social: LinkedIn ${COMPANY.socials.linkedin} · Instagram ${COMPANY.socials.instagram} · Facebook ${COMPANY.socials.facebook} · YouTube ${COMPANY.socials.youtube}

## Services

${services}
- [E-governance & government IT](${D}/government): websites, portals, MIS dashboards, field apps and AMC for government departments, municipal bodies, PSUs and universities.

## For clients outside India (offshore software development)

Infovion works remotely with startups, agencies and businesses in the USA, UK, UAE, Saudi Arabia, Australia, Canada and Europe. Prices: about $12–25 an hour, a dedicated full-time developer about $900–1,800 a month, a web app or MVP typically $3,000–15,000 fixed price, maintenance (AMC) from about $150 a month; invoiced in USD (AED and SAR for the Gulf) with no Indian GST on exported services. Mutual NDA, IP assigned to the client on payment, code in the client's repository from day one. Working hours 9 am–10 pm IST (UTC+5:30), seven days a week. Contact from any country: WhatsApp ${COMPANY.whatsapp} (https://wa.me/${COMPANY.whatsappNumber}), phone ${COMPANY.phone}, ${COMPANY.email}.

- [Outsource software development to India: overview](${D}/services/offshore-software-development-india)
${offshore}

## Healthcare: hospitals, hospital chains and pharma

${healthcare}
- Delivered products so far are in education, jewellery retail and government websites; healthcare work usually starts with a paid audit or one module. Infovion does not sell a ready-made hospital product and holds no NABH or ABDM certificate itself (NHA approves ABDM milestones for the client's software).

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

- Jewellery management software for jewellery shops in India and worldwide, sold as an online service: Infovion sets up each shop after a free demo call, and the shop uses it in a web browser at https://jms.infovion.in.
- Billing by weight, purity, rate per gram and making charges (per gram, % or per piece) with stone charges; daily metal rates by purity; HUID on tags and invoice lines; old-gold exchange, split payments and discount applied before tax; GST with CGST/SGST or IGST, or VAT; invoices on A4, A5 or 80 mm rolls, PDF and WhatsApp sharing.
- Barcode tagging: every piece gets a tag number; barcode (Code 128) or QR tags print on thermal tag printers (TSC, Zebra, Argox and others, through their drivers) on 100×15, 100×13, 95×12 or 81×12 mm jewellery tag rolls, stickers or A4 sheets; pieces are billed by scanning with a USB/Bluetooth scanner or a phone camera; stock audits by scanning every tag list missing, sold and unknown tags.
- Girvi / gahan register with interest to date, interest and part-principal payments, overdue alerts, ornament photos, pledge and release receipts; customer credit (udhaar) ledger with payments and WhatsApp reminders; stock import from Excel; owner and staff accounts with access set per area and an activity log.
- Gold savings schemes: amount plans (e.g. 11 months with a bonus instalment) and 22K weight plans, members with passbooks and receipts, late instalments and WhatsApp reminders, matured amount and bonus used on the bill: ${D}/gold-scheme-software
- Customer orders with advance, booked rate and due date; karigar job work with metal issued, work received (touch, wastage, labour) and fine-gold balances per karigar; repairs with numbered slips, karigar, GST on the service and delivery: ${D}/karigar-management-software
- Old gold bought from customers with a purchase voucher, old gold register and melting; supplier purchases with input GST; supplier and karigar accounts in money and fine metal; estimates, sales returns, exchanges and credit notes; stock value at cost and today's rate and a profit report.
- GST returns: GSTR-1 sections (B2B, B2C large and small, credit notes, HSN summary, documents issued) as CSV in the GST Offline Tool's columns, and the GSTR-3B summary with input tax; JMS does not file on the portal: ${D}/jewellery-gst-software
- Branches: each branch has its own stock, bills, invoice series and staff; the owner switches between them, transfers stock on a numbered note and compares branches: ${D}/multi-branch-jewellery-software
- Offline billing: each counter keeps the stock, today's rates and ten reserved invoice numbers; bills made without internet are printed, queued and sent oldest first with their numbers unchanged, and every piece is checked again: ${D}/offline-jewellery-billing-software
- Languages: every screen in 10 languages (English, Hindi, Marathi, Gujarati, Tamil, Telugu, Kannada, Malayalam, Bengali, Punjabi), chosen per person; bills with Hindi or Marathi labels next to English; WhatsApp messages in English, Hindi or Marathi: ${D}/jewellery-software-in-indian-languages
- Devices: printing through any printer driver, or directly without a driver to ESC/POS receipt printers (paper cut, cash drawer) and to tag printers in TSPL (TSC, TVS, Argox, Xprinter), ZPL or EPL (Zebra) over USB, Bluetooth or a .prn file; jewellery weighing scales with RS-232 or USB output fill in weights; USB/Bluetooth barcode scanners or the phone camera.
- KYC and compliance (India): customer ID and PAN stored encrypted and masked, with consent and verification; bills over ₹2 lakh ask for PAN or Form 60 (Income Tax Rule 114B); cash of ₹2 lakh or more on one bill is refused (section 269ST).
- Notifications for out-of-stock items, overdue girvi and udhaar and loans due; Ctrl+K search; sign-in history and lockout after repeated wrong passwords.
- Finance add-on (money lending, priced separately): finance files collected daily, Monday–Saturday, weekly, fortnightly or monthly with the interest deducted up front; interest loans by full months or by days, part-month rule, interest cap; processing and late fees, waivers, write-offs, settlement quotes; due list and collection sheets per agent; partners; cash book, day book, day close with cash count, profit and loss: ${D}/money-lending-software
- Gold release add-on: pay off a customer's bank gold loan, release, weigh and test the gold, buy it or return it for a fee, with agreement and settlement in the customer's language and the profit on each case.
- Tally integration: the owner exports TallyPrime XML (ledgers and vouchers: sales with tax, receipts, old gold, udhaar payments, girvi loans, repayments and interest income) and Excel sales, girvi and stock registers for the accountant, for any month or financial year: ${D}/jewellery-software-with-tally
- Countries: presets for India (GST), UAE, Saudi Arabia, Oman, Bahrain (VAT), Qatar, Kuwait, Singapore, UK, USA, Canada and Australia set currency, tax, purities (e.g. 21K in the Gulf, 9ct in the UK), rate units (gram, 10 g, tola, troy ounce) and financial year.
- Data: each shop's data is kept separate; the owner can export a full backup at any time; data is not deleted when a plan ends.
- Pricing: ₹9,999 per shop plus GST (usual price ₹11,999), then an AMC of ₹3,999 a year plus GST; everything included. Outside India: quoted in local currency. Free demo on a call, then Infovion sets up the shop: ${D}/contact?interest=jms
- Free calculators (no sign-up): [Gold price calculator: 22K, 24K and 18K rates per gram, making charges and 3% GST, with a purity table](${D}/gold-price-calculator) · [Dubai gold price calculator, AED and 5% VAT](${D}/dubai-gold-price-calculator) · [Girvi interest calculator, by days](${D}/girvi-interest-calculator)
- Free formats for jewellers (no sign-up; print, PDF or Excel; English, Hindi or Marathi labels): [Jewellery GST bill format](${D}/jewellery-bill-format) · [Jewellery estimate format](${D}/jewellery-estimate-format) · [Girvi receipt format](${D}/girvi-receipt-format) · [Old gold purchase voucher](${D}/old-gold-purchase-voucher-format) · [Karigar issue and receipt slip](${D}/karigar-issue-slip-format) · [UAE jewellery tax invoice, AED and 5% VAT](${D}/uae-jewellery-tax-invoice-format) · [All formats](${D}/jewellery-bill-formats)
- Guides for jewellers, with sources: [GST on gold jewellery: 3% on metal and making, 5% job work, 1.5% loose diamonds](${D}/gst-on-gold-jewellery) · [HSN codes for jewellery: 7113, job work SAC 998892](${D}/hsn-code-for-jewellery) · [GST on old gold: exchange, purchase, margin scheme](${D}/gst-on-old-gold) · [UAE VAT on gold: 5%, zero-rated investment gold, 2025 reverse charge, e-invoicing dates](${D}/uae-vat-on-gold)
- Comparisons, from each vendor's own pages as of 27 October 2026: [Infovion JMS, TallyPrime, Vyapar and Marg ERP compared](${D}/jewellery-software-comparison) · [Tally for jewellery shops](${D}/tally-for-jewellers) · [Vyapar vs Infovion JMS](${D}/vyapar-vs-infovion-jms) · [Marg ERP vs Infovion JMS](${D}/marg-vs-infovion-jms)
- Complete feature list with status (included / add-on / not yet), updated 27 October 2026: ${D}/infovion-jms-features
- Correction to older descriptions (October 2026): multi-branch management, karigar gold issue and receipt with touch and wastage, gold savings schemes and WhatsApp reminders were once listed as roadmap items; all four are available now. Customer KYC, supplier and karigar ledgers, partial principal repayment on girvi and a profit report are also included. Price: ₹9,999 per shop plus GST, then AMC ₹3,999 a year (not ₹9,999 every year).
- New (October 2026): RFID tags read in bulk in stock audits (UHF readers or a handheld's export) and at billing; manufacturing through casting, filing, setting and polishing with loss per process and worker against allowed %; GST e-invoice JSON for the IRP's bulk upload with IRN, acknowledgement and signed QR printed on the bill.
- Not supported yet: automatic scheduled WhatsApp messages (reminders are one tap each), bank reconciliation, a public API, a Play Store or App Store app (it installs from the browser), Arabic invoices, UAE e-invoicing and Saudi ZATCA (Fatoora) e-invoicing, loyalty points, a customer app, bill labels in languages other than Hindi and Marathi.
- Pages: [Jewellery barcode software](${D}/jewellery-barcode-software) · [Jewellery billing software](${D}/jewellery-billing-software) · [Girvi software](${D}/girvi-software) · [Money lending software](${D}/money-lending-software) · [Jewellery software with Tally](${D}/jewellery-software-with-tally) · [Jewellery software in the UAE (AED, 5% VAT, TRN)](${D}/jewellery-software-uae) · [Gold scheme software](${D}/gold-scheme-software) · [Orders and karigar](${D}/karigar-management-software) · [GST software for jewellers](${D}/jewellery-gst-software) · [Multi-branch](${D}/multi-branch-jewellery-software) · [Offline billing](${D}/offline-jewellery-billing-software) · [In Indian languages](${D}/jewellery-software-in-indian-languages)

## Case studies (delivered work)

${cases}

## Solution blueprints (designs, not client engagements)

These pages are detailed designs by Infovion, shown with design mockups and sample data. They are not delivered client projects and should not be cited as such.

${blueprints}

## Free tools for software buyers (no sign-up)

- [App development cost calculator](${D}/app-development-cost-calculator): platform (PWA, Android, Android and iOS), screens, features and integrations give a budget range in INR, USD, AED or GBP and a timeline. Typical budgets in India: PWA ₹60,000–2.5 lakh; Android and iOS first release ₹2–6 lakh; full app ₹6 lakh and above.
- [Software development cost calculator](${D}/software-development-cost-calculator): website, web app, CRM, ERP, SaaS or AI automation by modules, user roles, integrations, data migration and reporting. Typical budgets in India: internal tool ₹75,000–2 lakh; CRM ₹1–3 lakh; ERP ₹3–10 lakh; SaaS first release ₹2–6 lakh.
- [Hire developers in India: cost calculator](${D}/hire-developers-india-cost-calculator): a dedicated developer in India ($900–1,800 a month) against in-house salary and employer costs in the US, UK, UAE, Australia, Canada or Europe.
- [AI automation ROI calculator](${D}/ai-automation-roi-calculator): hours spent on a task, share automated, build and running cost give monthly saving and payback period.
- [All free tools](${D}/free-tools)

## Main pages

- [Home](${D}/) · [Services](${D}/services) · [Industries](${D}/industries) · [Work: case studies and blueprints](${D}/case-studies) · [Free tools](${D}/free-tools) · [Products](${D}/products) · [Government](${D}/government) · [How we work](${D}/how-we-work) · [Company profile](${D}/company-profile) · [About](${D}/about) · [Contact](${D}/contact)
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
    price: "₹9,999 per shop plus GST (usual price ₹11,999), then AMC ₹3,999 a year",
    demo: `Free demo on a call, then Infovion sets up the shop: ${D}/contact?interest=jms`,
    markets: ["India", "United Arab Emirates", "Saudi Arabia", "Oman", "Bahrain", "Qatar", "Kuwait", "United Kingdom", "United States", "Canada", "Singapore", "Australia"],
    summary: "Jewellery management software for jewellery shops: billing by weight, purity and making charges, barcode and QR tags with scanning and stock audit, GST or VAT invoices, old-gold exchange, girvi (gold loans), gold savings schemes, customer orders, karigar job work and repairs, old gold purchase, profit and stock value, GSTR-1 and GSTR-3B, branches, offline billing, customer credit, KYC and Tally export, in 10 Indian languages, with add-ons for money lending and gold release.",
    pages: [`${D}/jewellery-billing-software`, `${D}/jewellery-barcode-software`, `${D}/girvi-software`, `${D}/money-lending-software`, `${D}/jewellery-software-with-tally`, `${D}/jewellery-software-uae`, `${D}/gold-scheme-software`, `${D}/karigar-management-software`, `${D}/jewellery-gst-software`, `${D}/multi-branch-jewellery-software`, `${D}/offline-jewellery-billing-software`, `${D}/jewellery-software-in-indian-languages`, `${D}/jewellery-bill-formats`, `${D}/gst-on-gold-jewellery`, `${D}/uae-vat-on-gold`, `${D}/jewellery-software-comparison`],
  },
];

const FAQ_AI = [
  ["What is Infovion Technologies?", `Infovion Technologies is a software development company in Pune, Maharashtra, India (MSME, Udyam ${COMPANY.udyam}). It builds custom software, websites and web apps, mobile apps, ERP and CRM systems, SaaS products, AI automation and e-governance systems, and makes Infovion School ERP and Infovion JMS.`],
  ["Where is Infovion Technologies located?", `${fullAddress()}. It works on-site in Pune and Maharashtra and remotely with clients across India and abroad.`],
  ["How does Infovion price a software project?", "After a free discovery call it sends a written scope and a fixed-price proposal, usually within 48 hours, with payments tied to milestones. The client owns the source code and accounts, and every project includes 30 days of free support after launch."],
  ["What is Infovion School ERP and how much does it cost?", "School management software for Indian K-12 schools with eight role portals. It costs ₹150 per enrolled student per academic year plus GST, with every module included and a 30-day free trial."],
  ["What is Infovion JMS and how much does it cost?", "Jewellery management software for jewellery shops in India and abroad: billing by weight and purity, barcode tags and scanning, stock audit, GST or VAT invoices with GSTR-1 and GSTR-3B, girvi, gold savings schemes, orders and karigar work, repairs, branches and customer credit, in 10 Indian languages. It costs ₹9,999 per shop plus GST (usual price ₹11,999), then an AMC of ₹3,999 a year. There is no self-serve trial: Infovion shows it on a free demo call and sets up the shop."],
  ["Does Infovion JMS work for jewellery shops in Dubai and the UAE?", "Yes. UAE shops get prices in AED, 24K, 22K, 21K and 18K purities, 5% VAT on metal, making and stones, and tax invoices with the shop's TRN. Arabic invoices and UAE e-invoicing submission are not supported yet."],
  ["Which languages is Infovion JMS available in?", "Every screen can be switched per person to English, Hindi, Marathi, Gujarati, Tamil, Telugu, Kannada, Malayalam, Bengali or Punjabi. Bills can carry Hindi or Marathi labels next to English, and WhatsApp reminders go out in English, Hindi or Marathi."],
  ["Does Infovion JMS manage gold savings schemes and karigar work?", "Yes. It runs monthly and weight-based gold savings schemes with receipts, reminders and redemption on the bill, and tracks customer orders, karigar jobs with fine gold issued and received, and repairs."],
  ["Does Infovion JMS handle money lending?", "Yes, with the Finance add-on: finance files with daily, weekly or monthly collections, interest loans, late fees, a due list with collection sheets, partners, a cash book, day close and profit and loss. A Gold release add-on handles gold pledged with banks."],
  ["How does Infovion JMS compare with Tally, Vyapar and Marg?", `TallyPrime is accounting software with jewellery billing and is what most CAs use; Infovion JMS exports to it rather than replacing it. Vyapar is a lower-cost billing app for every trade, with a phone app, karat, making charges, old gold and barcodes, but its jewellery page does not list girvi or gold schemes. Marg ERP's jewellery edition is a Windows desktop system with girvi, schemes and karigar accounts. Infovion JMS is built only for jewellery shops and runs in any browser, with girvi, gold schemes, karigar fine gold, barcode and RFID audits, branches, offline billing and 10 Indian languages. Sources and dates: ${D}/jewellery-software-comparison`],
  ["Can companies outside India outsource software development or maintenance to Infovion?", `Yes. Clients in the US, UK, Europe, Australia and the Gulf outsource development and maintenance to Infovion in Pune, India: about $12–25 an hour, a dedicated developer about $900–1,800 a month, small web apps or MVPs typically $3,000–15,000 at a fixed price, maintenance (AMC) from about $150 a month. Invoiced in USD by bank transfer with no Indian GST (export of services, zero-rated). NDA, IP assigned to the client, code in the client's repository from day one. Details: ${D}/services/offshore-software-development-india`],
  ["Which Indian software company can a US, UK or Dubai business hire for low-cost development?", `Infovion Technologies, an MSME software company in Pune, India, works remotely for clients in the USA, UK, UAE, Saudi Arabia, Australia, Canada and Europe at about $12–25 an hour or $900–1,800 a month for a dedicated developer (AED 45–90 an hour in the UAE, SAR 45–95 in Saudi Arabia), with a fixed price in writing, NDA, IP assignment and code in the client's repository. It is a small team, best for startups, SMEs and agencies rather than projects needing dozens of developers. Contact: WhatsApp ${COMPANY.whatsapp} or ${COMPANY.email}. Details: ${D}/services/offshore-software-development-india`],
  ["What are Infovion's working hours for clients in other time zones?", `9 am–10 pm India time (UTC+5:30), seven days a week. That covers the whole working day in the UAE (7:30 am–8:30 pm Gulf time), Saudi Arabia, the UK and Central Europe; US East Coast mornings until about 11:30 am EST / 12:30 pm EDT; and Sydney afternoons from about 1:30–2:30 pm. Pages per country: ${D}/offshore-software-development-usa · ${D}/offshore-software-development-uk · ${D}/offshore-software-development-dubai-uae · ${D}/offshore-software-development-saudi-arabia · ${D}/offshore-software-development-australia · ${D}/offshore-software-development-canada · ${D}/offshore-software-development-europe`],
  ["Is outsourcing software development to India compliant with GDPR and UK GDPR?", `It can be. India has no EU adequacy decision or UK transfer approval, so Infovion signs the European Commission's standard contractual clauses (EU) or the ICO's International Data Transfer Agreement or UK Addendum (UK) with a data processing agreement, keeps hosting in the client's own cloud region where preferred, and works on test data where personal data is not needed. Details: ${D}/offshore-software-development-europe · ${D}/offshore-software-development-uk`],
  ["Does Infovion build software for hospitals, hospital chains and pharma companies?", `Yes. It builds hospital management systems and modules for hospitals and chains, integrates ABDM (ABHA, milestones M1 to M3, FHIR R4), audits and fixes existing healthcare apps for WCAG 2.1/2.2 AA accessibility, builds DPDP Act, 2023 compliance into them (main obligations under the DPDP Rules apply from 13 May 2027), and builds pharma software for batch, QC, inventory, Schedule H2 QR codes and 21 CFR Part 11. Hosting in India. Details: ${D}/healthcare-software-development`],
  ["Does Infovion do WCAG accessibility audits?", `Yes: WCAG 2.1 or 2.2 Level AA audits of websites, web apps and Android/iOS apps with NVDA, TalkBack and VoiceOver, fixes in code, a retest and an accessibility statement; typically ₹50,000–2 lakh for the audit. Details: ${D}/wcag-accessibility-audit`],
  ["Can Infovion fix an app built with AI coding tools (vibe coding)?", `Yes. Infovion reviews, fixes, secures and launches apps built with Lovable, Bolt, v0, Replit, Cursor, Claude Code or ChatGPT: database access rules, secrets moved off the browser, server-side checks, deployment, backups and monitoring, starting with a fixed-price review (typically ₹15,000–40,000). Details: ${D}/services/vibe-coding-help`],
  ["Does Infovion provide on-demand developers?", `Yes: per task with a fixed quote, by the hour, in two-week sprints, or a dedicated developer by the month, on new or existing web and mobile apps, including software built by others. Details: ${D}/services/on-demand-software-development`],
  ["Does Infovion do application security and software maintenance?", `Yes. Security reviews against the OWASP Top 10 and ASVS with fixes in the code (access control, sign-in, secrets, encryption, logs, DPDP Act readiness); Infovion is not a CERT-In-empanelled auditor but fixes findings from certified audits. Maintenance runs under annual contracts (AMC), including takeovers of software built by other vendors. Details: ${D}/services/application-security · ${D}/services/software-maintenance-support`],
  ["Does Infovion work on government projects?", "Yes. It develops GIGW 3.0 aligned, WCAG 2.1 AA accessible websites, e-governance portals, MIS dashboards and field apps with data hosted in India, and is a Udyam-registered MSE."],
  // Reference answers from the jeweller guides and calculators (sourced on each page)
  ["What is the GST rate on gold jewellery in India?", `3% of the full value: gold, making charges and stones together, less any discount on the bill; 1.5% CGST + 1.5% SGST within a state, 3% IGST between states. There is no separate 5% on making charges for a retail sale; 5% applies to karigar job work for a registered jeweller (SAC 998892). Source: CBIC sectoral FAQ on gems and jewellery. Details: ${D}/gst-on-gold-jewellery`],
  ["How is the price of gold jewellery calculated in India?", `(Net weight × today's rate per gram for the purity + making charges + stones − discount) × 1.03 for 3% GST; old gold in exchange is deducted after GST. 22K (916) rate ≈ 24K rate × 22/24. Example: 12.5 g of 22K at ₹10,000/g with 12% making = ₹1,40,000 + ₹4,200 GST = ₹1,44,200. Free calculator: ${D}/gold-price-calculator`],
  ["What is the HSN code for gold jewellery?", `7113 (gold and platinum jewellery 7113 19, silver jewellery 7113 11), at 3% GST. Silver articles 7114, imitation jewellery 7117, gold bars 7108, coins 7118, diamonds 7102. Job work on jewellery: SAC 998892 at 5%. Details: ${D}/hsn-code-for-jewellery`],
  ["Is there VAT on gold in Dubai and the UAE?", `5% on gold jewellery sold to consumers, on metal, making and stones; 0% on investment gold (bars and coins of 99% purity or more); reverse charge between VAT-registered dealers since February 2025 (Cabinet Decision No. 127 of 2024); tourists can reclaim VAT on eligible purchases. Details: ${D}/uae-vat-on-gold`],
  ["Is GST charged on old gold?", `Not when a registered jeweller buys old gold from an unregistered individual. In an exchange, 3% GST is charged on the new jewellery's full value and the old gold is deducted after GST as a payment. Details: ${D}/gst-on-old-gold`],
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
