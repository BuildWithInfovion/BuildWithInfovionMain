# Government IT tenders — readiness checklist for Infovion Technologies

Goal: be able to bid for (and win) small and mid-size government IT work — websites, portals, MIS dashboards, apps, AMC — within 6–12 months, starting with low-value work where MSE benefits apply and experience requirements are light.

> Rules change and every tender has its own eligibility clauses. Use this as a preparation list, read each tender document fully, and get your CA to confirm tax and financial items.

---

## 1. Registrations and documents (do these first)

| # | Item | Status (Oct 2026) | Why it matters / notes |
|---|------|-------------------|------------------------|
| 1 | **Udyam (MSME) registration** | ✅ UDYAM-MH-26-1125911 | MSE benefits: EMD exemption, free tender documents, purchase preference (Public Procurement Policy for MSEs Order, 2012; GFR 2017). Make sure the NIC codes cover software development / IT services. |
| 2 | **PAN** of the business/proprietor | ✅ (verify) | Every bid. |
| 3 | **GST registration (GSTIN)** | ❌ not on record | Practically mandatory for government buyers and GeM; needed to issue tax invoices. Highest priority. |
| 4 | **Current bank account** in the business name + cancelled cheque | ? | Payments and bid security refunds. |
| 5 | **Class 3 Digital Signature Certificate (DSC)** — signing + encryption | ❌ | Required to submit bids on CPPP (eprocure.gov.in) and state portals like MahaTenders. Get it from a licensed CA (eMudhra, Capricorn, etc.). |
| 6 | **GeM seller registration** (gem.gov.in) | ❌ | Central government buyers must use GeM for goods and services listed there, and many state bodies do too. Register as a service provider and list your services (website development, software development, AMC). Check gem.gov.in for the current document list for a proprietorship. |
| 7 | **CPPP bidder enrolment** (eprocure.gov.in) | ❌ | Central open tenders. Needs DSC. |
| 8 | **MahaTenders enrolment** (mahatenders.gov.in) | ❌ | Maharashtra government, municipal corporations, zilla parishads. Needs DSC; small annual fee. |
| 9 | **Company profile / capability statement** | ✅ www.infovion.in/company-profile (print to PDF) | Attach to every bid and vendor registration. Update `src/Data/company.js` when GSTIN/GeM IDs exist — they appear automatically. |
| 10 | **Work completion certificates** from clients | ❌ ask now | Ask the school and the jeweller for a signed certificate on letterhead: work done, period, value, satisfaction. Tenders score "similar work". |
| 11 | **CA-certified turnover statement + ITRs** (last 3 years where available) | ? | Financial eligibility. Startups with < 3 years attach what exists. |
| 12 | **Solvency / bank reference letter** | later | Some tenders ask; issued by your bank. |
| 13 | **NSIC registration** (Single Point Registration) | optional | Udyam already gives MSE status; some older tenders still mention NSIC for EMD exemption. |
| 14 | **Private Limited / LLP conversion** | planned (fundraising) | Needed for DPIIT Startup India recognition, which can relax prior turnover/experience criteria in public procurement where the tender allows it. Proprietorships are not eligible for DPIIT. |
| 15 | **ISO 9001:2015** (quality) | later | Often asked for software tenders; cost ~₹25–60k via an accredited body. Do it once you start bidding regularly. |
| 16 | **ISO/IEC 27001** (information security) | later | Asked for portals handling citizen data. Heavier; plan after ISO 9001. |
| 17 | **CMMI Level 3** | much later | Only for large tenders; expensive. Don't chase it early. |

## 2. Technical capability evidence (have it ready)

- **GIGW 3.0 / WCAG 2.1 AA**: keep a short accessibility test report template (axe/Lighthouse + manual keyboard and screen-reader checks). The site's `/government` page describes the approach.
- **Security**: a relationship with one **CERT-In empanelled security auditor** (list on cert-in.org.in) — government websites need a security audit certificate before go-live; quote it inside your bid.
- **Hosting**: know your options and prices for NIC / State Data Centre hosting and a **MeitY-empanelled cloud** (most large clouds have Indian regions that are empanelled).
- **Standard documents** (make templates once): SRS, design document, test plan/report, user manual, training plan, SLA/AMC terms, handover checklist, Website Quality Manual (for STQC).
- **Sample work**: the school ERP (multi-role portal, payments), JMS (billing, registers, exports), www.infovion.in (performance, accessibility, SEO). Record a 3-minute walkthrough video of each for technical presentations.

## 3. Where to find tenders

- **GeM**: Bids section and custom bids — filter "website", "software development", "web portal", "AMC".
- **CPPP**: eprocure.gov.in → Active Tenders → search by keyword.
- **Maharashtra**: mahatenders.gov.in (organisation-wise: municipal corporations, ZPs, universities, MAHAIT).
- **Others**: individual PSU portals, universities, smart-city SPVs (Pune Smart City), district collector offices.
- Optional paid aggregators (TendersInfo, Tender247, BidAssist) send daily keyword alerts — useful once you bid weekly.

## 4. A sensible starting strategy

1. **Bid small first**: websites and AMC for municipal councils, ZP schools, colleges, cooperative banks and societies, and GeM custom bids under ₹5–10 lakh. Experience and turnover rules are lighter, and MSE benefits apply.
2. **Partner up**: offer development as a subcontractor to established system integrators who win larger tenders; their completion certificates for your module still count as experience.
3. **Education first**: you already run school software — government/aided school administration, scholarship tracking and education department MIS are the natural fit.
4. **Price carefully**: L1 (lowest price) usually wins; know your cost, include AMC, security audit, hosting and travel, and never bid below cost to "get in".
5. **Read the corrigenda**: clarifications and changes are published separately; pre-bid meetings are where you ask for MSE relaxations.

## 5. What to update on the website as you progress

`src/Data/company.js` → fill `gstin`, `gemSellerId`, `cpppId`, `startupIndia`, `iso` — they then appear on `/government`, `/company-profile` and in the structured data automatically. Add every government project as a case study (with the department's permission).
