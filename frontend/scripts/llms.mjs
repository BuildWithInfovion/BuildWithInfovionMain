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

- Jewellery management software for jewellery stores: billing by weight, purity, rate per gram and making charges; HUID on invoice lines; old-gold exchange, advance and discount (applied before GST); GST on the full value incl. making charges with the CGST/SGST split; A4 printing and PDF sharing on WhatsApp; girvi / gahan (gold loan) register with interest to date, overdue alerts, receipts and release with interest received; udhaar (customer credit) ledger with part-payments by cash, UPI, card or bank; stock by piece and by weight; sales and girvi reports; owner and staff logins.
- Tally integration: the owner exports TallyPrime XML (ledgers and vouchers — sales with CGST/SGST, receipts, girvi loans, releases and interest income) and Excel GST sales and girvi registers for the CA, for any month or financial year.
- Runs in any web browser; each store has its own installation and database.
- Outside India: deployed as a customised installation with local currency, tax (VAT/sales tax), purity standards and invoice language.
- Pricing: yearly plan per store with setup and training; quoted after a demo. Demo: ${D}/contact?interest=jms
- Pages: [Jewellery billing software](${D}/jewellery-billing-software) · [Girvi software](${D}/girvi-software)

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

export function llmsTxt(posts) {
  const blog = posts.map((p) => `- [${p.title}](${D}/blog/${p.slug}): ${p.excerpt}`).join("\n");
  return `${FACTS}\n## Guides and articles\n\n${blog}\n\n## Optional\n\n- [Full text of all articles](${D}/llms-full.txt)\n- [Sitemap](${D}/sitemap.xml)\n`;
}

export function llmsFullTxt(posts) {
  const body = posts.map((p) => `# ${p.title}\n\nSource: ${D}/blog/${p.slug}\nPublished: ${p.date}\n\n${text(p.content || p.excerpt)}`).join("\n\n---\n\n");
  return `${FACTS}\n---\n\n${body}\n`;
}
