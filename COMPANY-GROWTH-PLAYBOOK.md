# Infovion Technologies — company growth playbook (from October 2026)

The site is now three businesses under one brand:

| Line | Who buys | How they find us | What they need to see | Conversion |
|------|----------|------------------|-----------------------|------------|
| **Software services** (custom software, web, apps, ERP, SaaS, AI) | SME owners, startup founders, institutions, overseas SMBs | Google ("software development company in pune"), directories (Clutch, GoodFirms), LinkedIn, referrals | Real work, fixed quotes, code ownership, a person who answers | `/contact` form, WhatsApp, call |
| **Infovion School ERP** | School directors/principals in India | School-ERP searches, outreach, free tools, YouTube | Product film, price ₹150/student, free trial | `/free-trial`, demo |
| **Infovion JMS** | Jewellery store owners (India first; Gulf later) | "jewellery billing software", "girvi software", word of mouth among jewellers, CAs | Billing that's right, girvi, **Tally export**, demo with their items | `/contact?interest=jms`, WhatsApp |

Government work is a fourth, slower channel that runs on paperwork (see `GOV-TENDER-READINESS.md`).

**Rule for every page and post:** only claim what is true today. Two products in production, one school, one jeweller — that is credible. Inflated numbers are not, and buyers (and AI engines) check.

---

## 1. Keyword map (what each page targets)

Built from Google Autocomplete (India) on 17 Oct 2026. Volumes are not public without a paid tool; these are the phrasings people actually type.

| Page | Primary query | Secondary / long-tail |
|------|---------------|------------------------|
| `/` | software development company in pune | IT company in Pune, custom software development company India |
| `/services/custom-software-development` | custom software development company in pune | custom software development company in india, business software development |
| `/services/web-development` | website development company in pune | website design company in pune, web app development company, ecommerce website development company in pune |
| `/services/mobile-app-development` | mobile app development company in pune | app development companies in pune, PWA development |
| `/services/erp-crm-development` | erp software development company in pune | crm software development company in pune, custom crm development india |
| `/services/saas-product-development` | saas development company india | software product development companies in pune, MVP development |
| `/services/ai-automation` | ai automation company in india | AI chatbot development, document extraction |
| `/services/software-maintenance-support` | software AMC services | website maintenance services pune |
| `/government` | government website development | GIGW website development, e-governance software company, government website development tenders |
| `/jewellery-management-software` | jewellery software | jewellery software in india, jewellery management software, jewelry store management software |
| `/jewellery-billing-software` | jewellery billing software | jewellery billing software price, jewellery GST billing, jewellery accounting software |
| `/girvi-software` | girvi software | jewellery girvi software, gold loan software, gahan software |
| `/school-management-software` | school management software | school management software in india, school ERP |

**Next pages worth adding (in this order):** `/jewellery-software-with-tally` (Tally integration is a real buying trigger), `/software-development-company-mumbai` + Nashik/Nagpur city pages only once there is something city-specific to say, `/services/website-development-for-schools` (cross-sell the school base), a Dubai/UAE page for JMS once one Gulf store is live.

---

## 2. The first 30 days

**Week 1 — Google and Bing know the new site**
1. Search Console → re-login (the stored token was missing on 17 Oct) → Sitemaps → resubmit `https://www.infovion.in/sitemap.xml`.
2. URL Inspection → *Request indexing* for: `/`, `/services`, `/services/custom-software-development`, `/services/web-development`, `/services/mobile-app-development`, `/services/erp-crm-development`, `/jewellery-management-software`, `/jewellery-billing-software`, `/girvi-software`, `/government`, `/company-profile`, `/case-studies`. (About 10 a day is the limit.)
3. Bing Webmaster Tools → *Import from Google Search Console* (2 minutes) — Bing also feeds ChatGPT search and Copilot.
4. Update profile links everywhere to the right section: school posts → `www.infovion.in/school`, jewellery posts → `www.infovion.in/jms`, everything else → `www.infovion.in`.

**Week 2 — Google Business Profile (the biggest local lever)**
- Create/claim "Infovion Technologies". Primary category **Software company**; additional: *Website designer*, *Computer consultant*, *Internet marketing service* only if you sell it.
- Service-area business (hide the home address if you don't want visitors), areas: Pune, Pimpri-Chinchwad, Maharashtra, India.
- Paste the description and services from `LISTINGS-KIT.md`; add 10+ photos (product screens, team at work, office/meeting).
- Ask the school and the jeweller for a Google review this month — with the link from GBP's *Ask for reviews*. Two genuine reviews beat any number of directory listings.

**Weeks 3–4 — listings and proof**
- Create the free profiles in `LISTINGS-KIT.md` (Clutch, GoodFirms, DesignRush, TechBehemoths, Sortlist, Crunchbase, LinkedIn page update, JustDial, IndiaMART, Sulekha). Same name, address, phone everywhere (NAP consistency).
- Ask both clients for (a) a short written testimonial with name and role, (b) permission to name them in the case studies, (c) a signed **work completion certificate** on their letterhead — tenders ask for exactly this.
- When a testimonial arrives, add it to `src/Data/caseStudies.js` and the home page; it fixes the biggest gap the GEO audit flags (no social proof).

---

## 3. Backlinks that are worth the time

Ranked by value for a new domain. Avoid paid link packages and PBNs — they get sites demoted.

1. **Client sites** — a "Website/Software by Infovion Technologies" credit line in the footer of every site you build (agree it in the contract). The school's and the jeweller's systems already show "Powered by Infovion".
2. **Directories with editorial review** — Clutch (reviews needed), GoodFirms, DesignRush, TechBehemoths, Sortlist, The Manifest (via Clutch). Each needs a complete profile, portfolio items and ideally one review.
3. **Software listing sites for the products** — School ERP: Capterra/GetApp (Gartner), SoftwareSuggest, Techjockey, G2. JMS: SoftwareSuggest, Techjockey, Capterra (category "Jewelry Store Software").
4. **Open source** — publish `indian-school-certificates` (already built locally on 4 Oct) on GitHub with a link back; a small open-source "Tally XML voucher generator for Node.js" from the JMS export code would attract developer links.
5. **Local business ecosystem** — MCCIA (Pune chamber) member directory, Pune startup lists, TiE Pune, your college alumni pages, MSME/NSIC directories once registered.
6. **Expert quotes** — answer journalist requests on Qwoted / Featured.com about "software for small businesses in India", "GST for jewellers" etc. One quote in a news site is worth fifty directories.
7. **Guest articles** — jewellery trade publications (e.g., the GJEPC/retail-jeweller press) on "GST and girvi records for small jewellers"; school-leader publications on fee digitisation.
8. **YouTube** — the product films already exist; add `www.infovion.in/...` links in every description (school films → `/school`, JMS demo video when recorded → `/jms`).

Track every link in a simple sheet: date, site, URL, anchor, status. Expect results in 3–6 months — SEO for a domain registered on 7 Oct 2026 is a slow build.

---

## 4. Content plan (one article every week for 12 weeks)

Each article answers one real question, links to one service or product page, and cites its sources.

| Week | Article | Links to |
|------|---------|----------|
| 1 | How to write a software requirements brief (with template) | /services/custom-software-development |
| 2 | Jewellery software with Tally: what your CA actually needs | /jewellery-management-software |
| 3 | Website maintenance: what it covers and what it should cost | /services/software-maintenance-support |
| 4 | HUID hallmarking explained for jewellery buyers and sellers | /jewellery-billing-software |
| 5 | Progressive web app vs native app: a decision checklist | /services/mobile-app-development |
| 6 | MSME procurement benefits explained for government buyers | /government |
| 7 | How much does an ERP cost for a manufacturing MSME in India | /services/erp-crm-development |
| 8 | GST e-invoicing for small businesses: does it apply to you? | /services/api-integration |
| 9 | WhatsApp Business API vs WhatsApp Business app for businesses | /services/api-integration |
| 10 | Old gold exchange: how to record it correctly | /jewellery-billing-software |
| 11 | AI for small businesses: 5 automations that pay back in a month | /services/ai-automation |
| 12 | Case study #4 — your next client project | /case-studies |

Add new articles to `src/Data/blogCompany.js`; covers are generated with the same template as the October posts.

---

## 5. Getting service clients (not just traffic)

- **LinkedIn, 3 posts a week**: one build story (screens from the school ERP / JMS), one lesson (what software costs, why projects fail), one offer (free 30-minute software audit). Founder's personal profile outperforms the company page.
- **Referral partners**: CAs (they see every client's mess — JMS Tally export is the opening), web designers who can't build backends, hardware/POS dealers, Tally partners.
- **Productised offers** are easier to sell than "custom software": *School website (CBSE disclosure-ready) — fixed price*, *Shop billing + Tally export — fixed price*, *Software rescue audit — ₹25,000*, *Website + SEO setup — fixed price*.
- **Upwork/Contra** only with a niche profile (React/Node SaaS, ERP for Indian SMEs); never race to the bottom on price.
- Reply to every enquiry within an hour during the day — speed wins most small-business deals.

---

## 6. Infovion JMS — go-to-market

1. **Merge JMS v2 first** (branch `product/jms-v2`): it fixes a password-reset security hole and GST on making charges. Read the PR checklist; get the store's CA to confirm GST and try the Tally import on a test company.
2. **Price it** (suggestion, decide yourself): ₹9,999–14,999 per store per year for a single counter including hosting, setup and training; +₹3,000–5,000 per extra counter; one-time data entry/migration charged separately. Generic billing apps cost ₹1–5k a year but don't do girvi, making charges or Tally — the price must be justified in the demo.
3. **Demo kit**: deploy a separate demo copy of JMS (its own database, e.g. `jms_demo`) at `jms-demo.infovion.in`, fill it with `npm run seed:demo` (JMS README → "Demo store for sales"), and show it live on a phone in every pitch.
4. **Channels**: local jewellers' associations (sarafa associations in every district), the existing client as a reference (ask for a 30-second video), CAs who handle jewellers, Instagram reels showing the girvi register and the Tally export.
5. **Next features that sell**: barcode tags + scan-to-bill, daily rate board, girvi due-date WhatsApp reminders, multi-branch stock. Build only after 3–5 paying stores ask.
6. **Worldwide**: the Gulf (Dubai, Sharjah) gold souks are the natural next market — JMS needs a VAT mode, AED currency and English/Arabic invoices. Do it with the first paying Gulf store, not before.

---

## 7. What to watch every Monday (15 minutes)

| Metric | Where | First target (Jan 2027) |
|--------|-------|-------------------------|
| Indexed pages | Search Console → Pages | 70+ of 75 |
| Impressions / clicks by page | Search Console → Performance | 1,000 impressions/week |
| Enquiries by interest (project, school, jms, government) | Formspree inbox + GA4 `generate_lead` | 5 qualified enquiries/month |
| Google reviews | Business Profile | 5 |
| Referring domains | Search Console → Links | 15 |
| AI mentions | Ask ChatGPT/Perplexity "software development company in Pune", "jewellery billing software with girvi" monthly | Infovion mentioned once |

GEO audit (geo-optimizer): 80/100 on 17 Oct 2026. Re-run monthly: `geo audit --url https://www.infovion.in`.
