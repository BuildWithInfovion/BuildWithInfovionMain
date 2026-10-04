// llms.txt (https://llmstxt.org): a plain-text summary of Infovion for AI assistants
// and answer engines, plus llms-full.txt with every blog article as text.
// Facts here must match the site (pricing, trial, portals) — update both together.

const D = "https://buildwithinfovion.com";

const FACTS = `# Infovion

> Infovion (Infovion Technologies, Pune, India) makes Infovion Academic ERP: cloud school management software for Indian K-12 schools — admissions, fees and receipts, attendance, exams and report cards, TC/LC certificates, transport, timetable, staff and salary — with 8 role-based portals and a parent portal that works in any phone browser. Price: ₹50 per student per year + GST, every module included. 30-day free trial.

## Key facts

- Company: Infovion Technologies, Pune, Maharashtra, India. MSME registered (Government of India).
- Product: Infovion Academic ERP — school management software / school ERP for K-12 schools (nursery to class 12).
- Boards and mediums: CBSE, ICSE and State Boards; English, Marathi and Hindi medium schools.
- Price: ₹50 per enrolled student per academic year, plus 18% GST. Staff, teacher and parent logins are free. Example: 600 students = ₹30,000 + GST a year. No setup fee; data import included.
- Free trial: 30 days, self-serve, every module, up to 50 students and 10 staff logins, sample data preloaded, no card needed: ${D}/free-trial
- Portals (8): Director, Principal, Operator (school office), Accountant, Reception, Teacher, Non-teaching staff, Parent. Each role sees only what it needs.
- No app install: teachers and parents use any phone browser.
- Online fee payments: parents pay by UPI, card or net banking into the school's own Razorpay account; Infovion never holds the money and adds no fee.
- Data: each school's data is kept separate; role-based access, encrypted passwords, optional two-step sign-in, audit log of every change; full data export on request.
- Contact: contact@buildwithinfovion.com · +91 91563 02024 (WhatsApp +91 93091 93613) · ${D}/contact
- Social: LinkedIn https://www.linkedin.com/company/112026919/ · Instagram https://www.instagram.com/infoviontech/ · Facebook https://www.facebook.com/profile.php?id=61595050592821

## Modules

- Admissions and inquiries: inquiry pipeline, admission form, automatic admission and roll numbers, Excel import of students, parents and staff.
- Fees: class-wise fee plans and instalments, concessions, cash/UPI/cheque/DD/NEFT receipts, defaulters list, daily collection, opening balances.
- Attendance: teachers mark on a phone; live progress for the office; monthly registers; staff attendance and leave.
- Exams: subject-wise marks entry, report cards on the school letterhead, results for parents.
- Certificates: Transfer/Leaving Certificate (English, Marathi, Hindi formats) with parent request → principal approval → issue; bonafide and character certificates; ID cards.
- Transport: routes, stops, per-stop fares billed monthly, bus attendance, live bus location for parents, vehicle and driver documents.
- Timetable and calendar: weekly timetable, substitute covers, school calendar, announcements.
- Staff and salary: staff records, salary structures, monthly salary slips.

## Main pages

- [Home](${D}/): overview, product film, FAQ
- [Features](${D}/features): every module in detail
- [Role portals](${D}/portals): what each of the 8 portals does
- [Pricing](${D}/pricing): ₹50 per student per year, pricing FAQ
- [Free trial](${D}/free-trial): start a 30-day trial school
- [School management software for Maharashtra](${D}/school-management-software-maharashtra): Marathi-medium and state-board schools
- [Fee management software for schools](${D}/fee-management-software-for-schools)
- [School attendance app](${D}/school-attendance-app)
- [School transport management software](${D}/school-transport-management-software)
- [For schools](${D}/for-schools)
- [About Infovion](${D}/about)
- [Contact / book a demo](${D}/contact)

## Free tools (no sign-up)

- [School Leaving Certificate in Marathi (शाळा सोडल्याचा दाखला)](${D}/free-tools/school-leaving-certificate-marathi): fill, preview and print an LC with date of birth in words
- [Transfer Certificate (TC) generator](${D}/free-tools/transfer-certificate)
- [Bonafide certificate generator](${D}/free-tools/bonafide-certificate)
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
  return `${FACTS}\n## Guides for school owners and principals\n\n${blog}\n\n## Optional\n\n- [Full text of all guides](${D}/llms-full.txt)\n- [Sitemap](${D}/sitemap.xml)\n`;
}

export function llmsFullTxt(posts) {
  const body = posts.map((p) => `# ${p.title}\n\nSource: ${D}/blog/${p.slug}\nPublished: ${p.date}\n\n${text(p.content || p.excerpt)}`).join("\n\n---\n\n");
  return `${FACTS}\n---\n\n${body}\n`;
}
