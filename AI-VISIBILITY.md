# Getting Infovion recommended by ChatGPT, Gemini, Perplexity and Claude

AI assistants don't rank pages like Google; they **retrieve a few sources and repeat what those sources agree on**. Findings from the 2026 citation studies:

- ChatGPT takes most citations from **brand websites** and checks them against *independent* sources. Brands with profiles on review sites (G2, Capterra) are cited about 3× more often.
- Perplexity spreads its citations evenly across brand sites, **"best X" lists and review aggregators**, and editorial articles. Reddit and LinkedIn activity helps a lot.
- The platforms overlap on only about 11% of domains, so presence in several places matters more than any single link.
- Fresh content (under about 3 months old) gets cited more, and so do pages with concrete facts: prices, numbers, named features.
- AI crawlers mostly **don't run JavaScript**. Our pages are prerendered, so they see the full text.

So the job has two parts: (1) the website states the facts clearly (done), and (2) **the same facts appear on many independent, trusted sites**, which is what the "backlinks" below are for. No paid links or link farms: they don't help with AI, and Google penalises them.

---

## 1. Done on the website

| What | Where |
|---|---|
| `llms.txt`: a plain-text summary for AI (facts, pricing, modules, all pages, all guides), rebuilt on every deploy | https://buildwithinfovion.com/llms.txt |
| `llms-full.txt`: the same plus the full text of every guide | https://buildwithinfovion.com/llms-full.txt |
| `robots.txt` explicitly welcomes GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot and others | /robots.txt |
| Structured data: Organization (alternate names, MSME, Pune), SoftwareApplication with the real price (₹150 per student per year + GST), FAQ schema on key pages; one consistent copy instead of two conflicting ones | every page |
| Every page prerendered as full HTML | every page |
| Open-source repo `indian-school-certificates` prepared, ready to publish (see 3) | `Desktop/indian-school-certificates` |

**Keep the facts identical everywhere.** Copy names, prices and descriptions from section 4 below. AI systems trust what matches across sources.

**Cloudflare check:** in the Cloudflare dashboard → *Security → Bots*, make sure "Block AI bots" / "AI Scrapers and Crawlers" is **off**. If it's on, ChatGPT and Claude can't read the site at all.

---

## 2. Listings to create (in this order)

Each is free, takes 15–30 minutes, and gives a trusted page that links to us.

| # | Where | Why it matters for AI | Link |
|---|---|---|---|
| 1 | **Google Business Profile** (category: Software company) | Gemini and Google AI Overviews read it directly | business.google.com |
| 2 | **LinkedIn company page**: fill every field, post weekly | Perplexity cites LinkedIn heavily | already exists, complete it |
| 3 | **Capterra / GetApp / Software Advice**: one free vendor listing appears on all three | the review-site signal ChatGPT and Perplexity use for "best school ERP" questions | capterra.com/vendors |
| 4 | **G2**: free seller profile | same as above; cited heavily by Perplexity | sell.g2.com |
| 5 | **SoftwareSuggest** and **Techjockey** | the Indian software directories that rank for "school ERP India" | softwaresuggest.com, techjockey.com |
| 6 | **SaaSworthy**, **GoodFirms**, **AlternativeTo** | more independent lists | saasworthy.com, goodfirms.co, alternativeto.net |
| 7 | **Crunchbase** company profile | entity data used by many AI systems | crunchbase.com |
| 8 | **YouTube channel**: upload the product film and the 11 feature clips with full descriptions and a link | YouTube is among the most-cited sources in Gemini and AI Overviews | youtube.com |
| 9 | **Product Hunt** launch (free trial + free tools) | a one-time burst of links and mentions | producthunt.com |
| 10 | **GitHub**: publish `indian-school-certificates` (section 3) | GitHub is crawled constantly; a useful open-source tool earns real links | github.com/BuildWithInfovion |

**Reviews are the multiplier.** After listing on Capterra/G2, ask the 3–5 happiest schools (director or principal) for an honest review. A listing with no reviews barely counts; 5+ genuine reviews puts Infovion into "best school ERP in India" lists. Never write fake reviews: the sites remove them and ban the listing.

**After creating each profile**, send me the URLs. I'll add them to the website's `sameAs` structured data, which tells AI systems these profiles are all the same company.

---

## 3. GitHub: the open-source certificate tool

`C:\Users\sanka\Desktop\indian-school-certificates` is a standalone, MIT-licensed version of the free tools:
- Marathi Leaving Certificate (शाळा सोडल्याचा दाखला), TC and bonafide;
- date of birth in words in English, Marathi and Hindi.

It's tested and committed locally, not yet published. Its README links to buildwithinfovion.com.

To publish:
1. On GitHub (BuildWithInfovion account) → **New repository** → name `indian-school-certificates` → Public → no README (we have one).
2. Tell me when that's done and I'll push it, or run:
   `git remote add origin https://github.com/BuildWithInfovion/indian-school-certificates.git && git push -u origin main`
3. Repo settings → **About**:
   - Website: `https://buildwithinfovion.com/free-tools`
   - Topics: `school`, `india`, `marathi`, `certificate-generator`, `transfer-certificate`, `leaving-certificate`, `school-management`, `education`
4. Settings → Pages → deploy from `main`, which gives it a free live demo.

Then submit it, one honest pull request each, to lists where it genuinely fits:
- [awesome-opensource-school](https://github.com/zefanja/awesome-opensource-school), under "Other". Entry:
  `[Indian School Certificates](https://github.com/BuildWithInfovion/indian-school-certificates) - Leaving certificate (Marathi), transfer and bonafide certificate generator for Indian schools.`
- Any "awesome India", "awesome Marathi" or Indic-language lists that accept tools.

---

## 4. Copy to paste into every listing

**Name:** Infovion (company: Infovion Technologies) · **Product:** Infovion Academic ERP
**Website:** https://buildwithinfovion.com · **Email:** contact@buildwithinfovion.com · **Phone:** +91 91563 02024 (WhatsApp +91 93091 93613) · **Location:** Pune, Maharashtra, India
**Category:** School Management Software / School ERP / Student Information System
**Pricing:** ₹150 per student per year + GST, every module included · 30-day free trial, no card

**One line (≤ 80 chars):**
School management software for Indian K-12 schools — ₹150/student/year.

**Short (≤ 160 chars):**
Cloud school ERP for Indian schools: fees, attendance, exams, TC, transport and a parent portal. 8 role portals. ₹150/student/year. 30-day free trial.

**Long (about 120 words):**
Infovion is school management software built in Pune for Indian K-12 schools — CBSE, ICSE and State Board, English, Marathi and Hindi medium. It covers admissions, fee collection with instant receipts and defaulter lists, attendance marked by teachers on any phone, exams and report cards on the school letterhead, Transfer and Leaving Certificates with a parent-request and principal-approval workflow, school transport with live bus location, timetable, staff and salary. Eight role-based portals (Director, Principal, Operator, Accountant, Reception, Teacher, Non-teaching staff and Parent) mean each person sees only what they need, and nothing has to be installed. Parents can pay fees online straight into the school's own Razorpay account. Pricing is ₹150 per student per year with every module included, and there is a 30-day free trial.

**Key features (for "features" fields):**
Admissions & inquiries · Fee management & receipts · Online fee payments (UPI/card) · Attendance app · Exams & report cards · TC / Leaving certificate · Transport & live bus location · Timetable & substitutes · Staff & salary slips · Parent portal · 8 role-based portals · Excel import · Audit log · Two-step sign-in

---

## 5. Earned mentions (ongoing, 2–3 hours a month)

- **Quora / Reddit:** answer real questions ("best school ERP for a small school", "how to make a leaving certificate in Marathi") with genuinely useful answers; mention Infovion only where it fits and say you're the maker. Perplexity cites Reddit heavily, but sub-reddits ban obvious self-promotion.
- **Guest articles** for Indian education sites and school associations (e.g. a Marathi-medium school federation newsletter): "How we cut fee-collection time…", with a link.
- **Customer schools:** ask each school to add "School software: Infovion" with a link on their own website. Real schools linking to us are the strongest possible signal for "school ERP in Maharashtra".
- **Publish a guide every 2–3 weeks** on the blog. Fresh content is cited more, and each guide lands in llms.txt automatically.

## 6. Checking progress (monthly)

Ask ChatGPT, Gemini, Perplexity and Claude the same questions and note whether Infovion appears:
- "Best school management software in India for a small school"
- "School ERP for Marathi medium schools in Maharashtra"
- "Cheapest school ERP in India per student"
- "How to make a school leaving certificate in Marathi"
- "What is Infovion school ERP?"

Expect the first changes 4–8 weeks after the listings and reviews go live; AI indexes refresh more slowly than Google.
