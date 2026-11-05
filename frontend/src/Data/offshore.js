// Pages for clients outside India: one per market, in the SERVICES shape (rendered by
// pages/company/Services.jsx) with `path`, `trail`, `kicker`, `waText` and `contactAs`.
// Each page carries what is specific to that market (working-hour overlap with IST, the data
// protection rules that apply to sending data to India, currency, usual integrations), so none is
// a copy of another. Prices are Infovion's indicative USD prices; AED and SAR are pegged to the
// USD, so their figures are exact conversions. Re-check the legal facts before changing `updated`.

const UPDATED = "2026-11-05";
const HUB = "/services/offshore-software-development-india";
const HUB_NAME = "Outsourcing to India";
const TRAIL = (name, path) => [[HUB_NAME, HUB], [name, path]];

// Infovion's working hours are 9 am to 10 pm IST, every day (Data/company.js)
const IST_HOURS = "Our team works 9 am to 10 pm India time (IST, UTC+5:30, no daylight saving), seven days a week.";

const USD = [["Hourly development", "$12 – 25 an hour"], ["Dedicated full-time developer", "$900 – 1,800 a month"], ["Web app or MVP, fixed price", "$3,000 – 15,000"], ["Maintenance (AMC)", "From $150 a month"]];
const USD_DRIVERS = ["Skills needed: front end, back end, mobile or DevOps", "Size and condition of any existing code", "User roles, screens and integrations", "Hours of live overlap you want each day"];
const TIMELINE = "A first call within two business days; a small project starts within a week, a dedicated developer within one to two weeks.";

const COMMON_BUILD = (extra) => [
  ["Dedicated developers", "A full-time developer or a small team on your product, priced monthly, with priorities you set each sprint."],
  ["Fixed-price projects", "Web apps, mobile apps, portals and internal tools, scoped in writing and priced before work starts."],
  ["Maintenance and takeover", "Bug fixes, updates, backups and small changes for software built by you, another vendor or with AI tools."],
  ["White-label development", "Development under your agency's name, with an NDA and no contact with your clients unless you want it."],
  ...extra,
];

const COMMON_START = ["Send a short brief, or access to your existing code", "A video call at a time that suits your time zone", "A written scope and fixed price, or a monthly plan, within two business days", "A small paid first milestone, so you can judge the work before committing more"];

const SMALL_TEAM = "We are a small MSME team in Pune, not a 500-person outsourcing firm: you talk directly to the people writing your code, decisions are quick, and the budget suits startups and small and mid-size businesses. If you need dozens of developers at once, 24-hour staffing or certifications such as ISO 27001 or SOC 2, which we do not hold, a large IT services firm is the better choice.";

const READING = [[HUB, "Outsourcing to India: the full guide", "Prices, contracts, IP and how to start."], ["/services/on-demand-software-development", "On-demand developers", "By the task, hour or month."], ["/services/software-maintenance-support", "Software maintenance and AMC", "Fixes, updates and takeovers."], ["/services/vibe-coding-help", "Help with AI-built apps", "Review, security and launch."]];

const base = (slug, name, extra) => ({
  slug,
  path: `/${slug}`,
  trail: TRAIL(name, `/${slug}`),
  kicker: HUB_NAME,
  contactAs: "offshore-software-development-india",
  icon: "Globe",
  updated: UPDATED,
  stack: ["React", "Next.js", "Node.js", "NestJS", "React Native", "Laravel / PHP", "PostgreSQL", "MySQL", "MongoDB", "AWS", "Vercel", "Supabase"],
  related: ["offshore-software-development-india", "on-demand-software-development", "software-maintenance-support"],
  reading: READING,
  proof: "school-erp-platform",
  ...extra,
});

export const OFFSHORE = [
  base("offshore-software-development-usa", "For US companies", {
    name: "Offshore Software Development for US Companies",
    nav: "USA",
    noun: "offshore software development for a US company",
    ctaTitle: "Hire developers in India for your US business",
    waText: "Hello Infovion, I'm in the USA and would like to discuss a software project.",
    card: "Developers in India for US startups, agencies and businesses: from $12 an hour, morning calls on East Coast time, USD invoices.",
    title: "Offshore Software Development India for US Companies | Infovion",
    description: "Outsource software development from the USA to India: developers from $12/hour or $900/month, East Coast morning calls, USD invoices, NDA and IP assignment.",
    h1: "Offshore software development in India for US companies",
    countries: ["United States"],
    answerQ: "How much does it cost a US company to outsource software development to India?",
    answer: "With Infovion Technologies, a software company in Pune, India, US clients pay about $12 to $25 an hour for development, $900 to $1,800 a month for a dedicated full-time developer, and typically $3,000 to $15,000 for a web app or MVP at a fixed price; maintenance starts from about $150 a month. Invoices are in USD by international wire transfer, with no Indian tax added. The team works 9 am to 10 pm IST, which overlaps US East Coast mornings until about 11:30 am EST (12:30 pm EDT). Contact: WhatsApp +91 93091 93613, call +91 91563 02024, or contact@infovion.in.",
    intro: "US startups, agencies and small businesses hire us when local developer rates do not fit the budget: a dedicated developer for less than a month of a US contractor's fees, morning calls on your time, and code in your GitHub from day one.",
    build: COMMON_BUILD([
      ["US integrations", "Stripe, QuickBooks, Twilio, SendGrid, Shopify, HubSpot and Salesforce, plus the US payment and tax flows your app needs."],
      ["AI-built app rescue", "Apps built with Lovable, Bolt, v0, Replit, Cursor or Claude Code reviewed, secured and launched."],
    ]),
    explain: [
      ["Working hours with the US", null, [IST_HOURS, "East Coast: we are 9½ hours ahead in summer (EDT) and 10½ in winter (EST); our day overlaps yours from 9 am to about 12:30 pm EDT / 11:30 am EST", "Central: overlap from 8 am to about 11:30 am CDT", "West Coast: 12½ to 13½ hours apart; work happens while you sleep, with a written update in your morning and calls around 8 am PT or in your evening", "A daily standup in your morning is the usual rhythm"]],
      ["Contracts, data and payment", null, ["Mutual NDA before you share anything", "Your US-form agreement or ours; IP assigned to your company on payment", "Code in your GitHub or GitLab, hosting in your AWS, Vercel or other accounts", "Invoices in USD by international wire transfer; no Indian GST on exported services", "There is no single federal US privacy law: tell us which state laws (such as California's CCPA) or sector rules (such as HIPAA for health data) apply, and we work to your security requirements and sign the agreements your compliance team needs"]],
      ["Is a small Indian team right for you?", SMALL_TEAM],
      ["How to start", null, COMMON_START],
    ],
    deliverables: ["Written scope and price in USD", "Mutual NDA and IP assignment", "Code in your repository from day one", "Daily written update in your morning", "Staging link to review every two weeks", "Documentation and handover, or an ongoing AMC"],
    fit: ["US startups building an MVP", "Small businesses priced out by local agencies", "US agencies that need white-label developers", "Companies whose software needs a maintenance team", "Founders whose AI-built app needs real developers"],
    cost: { title: "Cost for US companies (USD)", sub: "Infovion's indicative prices for 2026, invoiced in US dollars. Every project gets its own written quote after a first call.", ranges: USD, drivers: USD_DRIVERS, timeline: TIMELINE },
    faqs: [
      ["How much does it cost to hire a developer in India from the USA?", "With Infovion, about $12 to $25 an hour, or $900 to $1,800 a month for a dedicated full-time developer, invoiced in USD."],
      ["How do you handle the time difference with the US?", "Our day (9 am to 10 pm IST) overlaps US East Coast mornings until about 11:30 am EST or 12:30 pm EDT, so a daily standup fits in your morning. For the West Coast, work moves overnight with a written update each morning."],
      ["How do US clients pay?", "By international wire transfer in USD against milestone invoices for projects, or monthly for dedicated developers and maintenance. No Indian GST is charged on services exported to the US."],
      ["Will you sign our NDA and assign the IP to us?", "Yes. We sign a mutual NDA before you share anything, and the contract assigns all intellectual property to your company on payment."],
      ["Can you work with health or financial data under US rules?", "We work to your security requirements and sign the agreements your compliance team requires. We do not hold SOC 2 or similar certifications; if your buyers require them, tell us at the start."],
      ["How do I contact you from the US?", "WhatsApp +91 93091 93613 (free over the internet), call +91 91563 02024, or email contact@infovion.in. We reply within one business day, usually the same day."],
    ],
  }),

  base("offshore-software-development-uk", "For UK businesses", {
    name: "Offshore Software Development for UK Businesses",
    nav: "UK",
    noun: "offshore software development for a UK business",
    ctaTitle: "Developers in India for your UK business",
    waText: "Hello Infovion, I'm in the UK and would like to discuss a software project.",
    card: "Developers in India for UK businesses and agencies: most of your working day overlaps, USD invoices, UK GDPR transfer terms.",
    title: "Offshore Software Development India for UK Businesses | Infovion",
    description: "Outsource software development from the UK to India: developers from $12/hour, the UK working day overlaps, UK GDPR transfer terms, NDA and IP assignment.",
    h1: "Offshore software development in India for UK businesses",
    countries: ["United Kingdom"],
    answerQ: "How much does it cost a UK business to outsource software development to India?",
    answer: "With Infovion Technologies in Pune, India, UK clients pay about $12 to $25 an hour for development, $900 to $1,800 a month for a dedicated full-time developer, and typically $3,000 to $15,000 for a web app or MVP at a fixed price, invoiced in US dollars; maintenance starts from about $150 a month. India is 4½ hours ahead of the UK in summer and 5½ in winter, and the team works 9 am to 10 pm IST, which covers the UK working day from 9 am to 4:30 pm GMT or 5:30 pm BST. Where personal data goes to India, transfers are covered by the ICO's International Data Transfer Agreement or the UK Addendum. Contact: WhatsApp +91 93091 93613 or contact@infovion.in.",
    intro: "UK agencies and businesses outsource to us for the overlap as much as the price: our day covers almost all of yours, so questions get answered the same day and calls happen in normal office hours.",
    build: COMMON_BUILD([
      ["UK integrations", "Xero, Sage, Stripe, GoCardless, Open Banking providers, Twilio and HubSpot."],
      ["Accessibility", "Websites and apps built and tested to WCAG 2.2 AA, the standard UK public sector bodies must meet."],
    ]),
    explain: [
      ["Working hours with the UK", null, [IST_HOURS, "India is 4½ hours ahead of the UK in summer (BST) and 5½ in winter (GMT)", "Our day covers the UK working day: 4:30 am to 5:30 pm BST, or 3:30 am to 4:30 pm GMT", "Calls at any normal UK office time; replies the same working day", "Morning stand-ups at 9 or 10 am UK time are easy"]],
      ["UK GDPR and sending data to India", null, ["The UK GDPR and the Data Protection Act 2018 apply to your customers' personal data", "India has no UK approval for transfers (the Data (Use and Access) Act 2025 replaced adequacy decisions with transfer regulations from February 2026), so transfers need appropriate safeguards", "We sign the ICO's International Data Transfer Agreement (IDTA) or the UK Addendum to the EU clauses, plus a data processing agreement", "Where we do not need personal data, we work on anonymised or test data only"]],
      ["Is a small Indian team right for you?", SMALL_TEAM],
      ["How to start", null, COMMON_START],
    ],
    sources: [["UK Data (Use and Access) Act 2025, Schedule 7 (transfers)", "https://www.legislation.gov.uk/ukpga/2025/18/schedule/7"]],
    deliverables: ["Written scope and price", "Mutual NDA, IP assignment, IDTA or UK Addendum where personal data is involved", "Code in your repository from day one", "Calls in UK office hours", "Staging link to review every two weeks", "Documentation and handover, or an ongoing AMC"],
    fit: ["UK digital agencies needing white-label developers", "Startups building an MVP on a seed budget", "SMEs whose local quotes are out of reach", "Businesses whose previous developer has left", "Charities and membership organisations"],
    cost: { title: "Cost for UK businesses", sub: "Infovion's indicative prices for 2026, invoiced in US dollars by international transfer. Every project gets its own written quote after a first call.", ranges: USD, drivers: USD_DRIVERS, timeline: TIMELINE },
    faqs: [
      ["What is the time difference between the UK and India?", "India is 4½ hours ahead of the UK during British Summer Time and 5½ hours ahead in winter. With our 9 am to 10 pm IST day, we cover the full UK working day."],
      ["Can personal data of UK customers be sent to India?", "Yes, with appropriate safeguards, because India has no UK approval for transfers. We sign the ICO's International Data Transfer Agreement or the UK Addendum, with a data processing agreement, and use test data where personal data is not needed."],
      ["How much does it cost to outsource to India from the UK?", "With Infovion, about $12 to $25 an hour or $900 to $1,800 a month for a dedicated developer, invoiced in US dollars."],
      ["Do you do white-label work for UK agencies?", "Yes, under an NDA and your agency's name. We never contact your clients unless you ask us to."],
      ["How do I contact you from the UK?", "WhatsApp +91 93091 93613, call +91 91563 02024, or email contact@infovion.in. Most of your working day is within our hours."],
    ],
  }),

  base("offshore-software-development-dubai-uae", "For Dubai and the UAE", {
    name: "Software Development for Dubai and the UAE",
    nav: "Dubai and UAE",
    noun: "software development for a UAE business",
    ctaTitle: "Software developers 1½ hours from Dubai",
    waText: "Hello Infovion, I'm in the UAE and would like to discuss a software project.",
    card: "Developers in India for Dubai, Abu Dhabi and Sharjah businesses: 1½ hours apart, AED pricing, Arabic RTL, 5% VAT invoices.",
    title: "Dubai & UAE Software Development, Offshore in India | Infovion",
    description: "Software development for Dubai and UAE businesses from India: 1½ hours apart, from AED 45/hour, Arabic RTL apps, 5% VAT invoicing, UAE PDPL-aware data handling.",
    h1: "Software development for Dubai and UAE businesses, from India",
    countries: ["United Arab Emirates"],
    answerQ: "How much does software development cost for a UAE business working with an Indian company?",
    answer: "With Infovion Technologies in Pune, India, UAE businesses pay about AED 45 to 90 an hour ($12 to $25), AED 3,300 to 6,600 a month for a dedicated full-time developer, and typically AED 11,000 to 55,000 for a web app or MVP at a fixed price; maintenance starts from about AED 550 a month. India is only 1½ hours ahead of the UAE, so the whole UAE working day overlaps. Infovion builds Arabic and English (RTL) apps, 5% VAT tax invoices and integrations with UAE payment gateways, and its own jewellery software supports AED pricing, Gulf karats and VAT invoices. Contact: WhatsApp +91 93091 93613 or contact@infovion.in.",
    intro: "For a Dubai business, an Indian team is closer than most people think: 1½ hours apart, the same working day, a short flight away, and a fraction of local agency rates. We build for the UAE market: Arabic and English, AED, VAT.",
    build: COMMON_BUILD([
      ["Arabic and English apps", "Right-to-left (RTL) layouts, Arabic fonts and bilingual content for web and mobile."],
      ["UAE billing and VAT", "5% VAT tax invoices with TRN, AED pricing, and integrations with Network International, Telr, PayTabs or Stripe."],
    ]),
    explain: [
      ["Working hours with the UAE", null, [IST_HOURS, "India is 1½ hours ahead of the UAE all year (neither country changes its clocks)", "Our day runs 7:30 am to 8:30 pm UAE time: the whole UAE working day overlaps", "Saturday and Sunday calls are possible too", "Pune to Dubai is about a three-hour flight for an in-person workshop"]],
      ["UAE data protection and e-invoicing", null, ["Mainland companies: the Personal Data Protection Law (Federal Decree-Law No. 45 of 2021)", "DIFC and ADGM have their own data protection laws; tell us where you are licensed", "Hosting can stay in the UAE (AWS, Azure or Oracle regions in the UAE) while we develop from India", "UAE e-invoicing starts with large businesses from 1 January 2027; we can build to the published structured-invoice formats"]],
      ["What we already know about UAE business", "Our own product, Infovion JMS, supports AED pricing, 24K, 22K, 21K and 18K gold rates and 5% VAT tax invoices with TRN for UAE jewellery shops, and our UAE VAT guide covers the 2025 reverse-charge rules for precious metals. We understand how UAE businesses invoice, price and pay."],
      ["How to start", null, COMMON_START],
    ],
    sources: [["UAE Ministry of Finance: eInvoicing", "https://mof.gov.ae/einvoicing"], ["UAE Federal Tax Authority", "https://tax.gov.ae"]],
    deliverables: ["Written scope and price in AED or USD", "Mutual NDA and IP assignment", "Arabic and English screens where needed", "Code in your repository, hosting in your UAE or global accounts", "Staging link to review every two weeks", "Documentation and handover, or an ongoing AMC"],
    fit: ["Dubai, Abu Dhabi and Sharjah SMEs", "Trading, retail and jewellery businesses", "Free-zone startups building an MVP", "UAE agencies needing white-label developers", "Indian-owned businesses in the UAE"],
    cost: { title: "Cost for UAE businesses (AED)", sub: "Infovion's indicative prices for 2026. The dirham is pegged to the US dollar, so these are exact conversions of our USD prices. Every project gets its own written quote.", ranges: [["Hourly development", "AED 45 – 90 an hour"], ["Dedicated full-time developer", "AED 3,300 – 6,600 a month"], ["Web app or MVP, fixed price", "AED 11,000 – 55,000"], ["Maintenance (AMC)", "From AED 550 a month"]], drivers: USD_DRIVERS, timeline: TIMELINE },
    faqs: [
      ["Is it cheaper to hire developers in India than in Dubai?", "Usually much cheaper. With Infovion, a dedicated full-time developer is about AED 3,300 to 6,600 a month, and hourly work about AED 45 to 90, with the same working day since India is only 1½ hours ahead."],
      ["Can you build Arabic apps?", "Yes: right-to-left Arabic layouts, Arabic fonts and bilingual Arabic and English content, for web and mobile."],
      ["Can our data stay in the UAE?", "Yes. Hosting and databases can be in UAE cloud regions under your accounts while we develop from India, with access controlled by you."],
      ["Do you understand UAE VAT invoicing?", "Yes. Our jewellery software already prints 5% VAT tax invoices with TRN in AED, and we have written a guide to UAE VAT on gold including the 2025 reverse charge."],
      ["How do I contact you from Dubai?", "WhatsApp +91 93091 93613, call +91 91563 02024, or email contact@infovion.in. Our working day runs 7:30 am to 8:30 pm UAE time."],
    ],
    reading: [["/jewellery-software-uae", "Jewellery software for the UAE", "Infovion JMS in AED with VAT invoices."], ["/uae-vat-on-gold", "UAE VAT on gold", "5%, zero-rated gold and the reverse charge."], ...READING],
  }),

  base("offshore-software-development-saudi-arabia", "For Saudi Arabia", {
    name: "Software Development for Saudi Arabia",
    nav: "Saudi Arabia",
    noun: "software development for a Saudi business",
    ctaTitle: "Software developers for your Saudi business",
    waText: "Hello Infovion, I'm in Saudi Arabia and would like to discuss a software project.",
    card: "Developers in India for Saudi businesses: 2½ hours apart, SAR pricing, Arabic RTL, ZATCA e-invoicing and PDPL-aware data handling.",
    title: "Software Development for Saudi Arabia from India | Infovion",
    description: "Software development for Saudi businesses from India: 2½ hours apart, from SAR 45/hour, Arabic RTL apps, ZATCA e-invoicing, PDPL-aware data handling.",
    h1: "Software development for Saudi Arabia, from India",
    countries: ["Saudi Arabia"],
    answerQ: "How much does software development cost for a Saudi business working with an Indian company?",
    answer: "With Infovion Technologies in Pune, India, Saudi businesses pay about SAR 45 to 95 an hour ($12 to $25), SAR 3,400 to 6,750 a month for a dedicated full-time developer, and typically SAR 11,000 to 56,000 for a web app or MVP at a fixed price; maintenance starts from about SAR 560 a month. India is 2½ hours ahead of Saudi Arabia, so the whole Saudi working day overlaps. Infovion builds Arabic and English (RTL) apps and integrations with ZATCA's e-invoicing (Fatoora) platform, and works with Saudi PDPL requirements, fully enforced since 14 September 2024. Contact: WhatsApp +91 93091 93613 or contact@infovion.in.",
    intro: "Saudi businesses are digitising fast, and local developers are expensive and in demand. We give you a dedicated team 2½ hours away, building Arabic-first apps and the ZATCA integrations your finance team needs.",
    build: COMMON_BUILD([
      ["Arabic and English apps", "Right-to-left (RTL) layouts, Arabic fonts and bilingual content for web and mobile."],
      ["ZATCA e-invoicing", "Integration of your billing or ERP with ZATCA's Fatoora platform: XML invoices, QR codes and clearance or reporting."],
    ]),
    explain: [
      ["Working hours with Saudi Arabia", null, [IST_HOURS, "India is 2½ hours ahead of Saudi Arabia all year", "Our day runs 6:30 am to 7:30 pm Saudi time: the whole working day overlaps", "Calls on Sundays, a Saudi working day, are fine"]],
      ["Saudi data protection", null, ["The Personal Data Protection Law (PDPL), administered by SDAIA, has been fully enforceable since 14 September 2024", "Sending personal data outside the Kingdom is governed by SDAIA's transfer regulation, which can require safeguards and a risk assessment", "Hosting and databases can stay in Saudi cloud regions under your accounts while we develop from India", "Where personal data is not needed, we work on test data only"]],
      ["Is a small Indian team right for you?", SMALL_TEAM],
      ["How to start", null, COMMON_START],
    ],
    sources: [["Clyde & Co: Saudi PDPL becomes enforceable (September 2024)", "https://www.clydeco.com/en/insights/2024/09/saudi-arabia-s-personal-data-protection-law-become"], ["ZATCA: e-invoicing", "https://zatca.gov.sa/en/E-Invoicing/Pages/default.aspx"]],
    deliverables: ["Written scope and price in SAR or USD", "Mutual NDA and IP assignment", "Arabic and English screens where needed", "Code in your repository, hosting in your accounts", "Staging link to review every two weeks", "Documentation and handover, or an ongoing AMC"],
    fit: ["Saudi SMEs and family businesses", "Startups building an MVP", "Retail, trading and distribution companies", "Saudi agencies needing white-label developers", "Businesses integrating with ZATCA"],
    cost: { title: "Cost for Saudi businesses (SAR)", sub: "Infovion's indicative prices for 2026. The riyal is pegged to the US dollar, so these are exact conversions of our USD prices. Every project gets its own written quote.", ranges: [["Hourly development", "SAR 45 – 95 an hour"], ["Dedicated full-time developer", "SAR 3,400 – 6,750 a month"], ["Web app or MVP, fixed price", "SAR 11,000 – 56,000"], ["Maintenance (AMC)", "From SAR 560 a month"]], drivers: USD_DRIVERS, timeline: TIMELINE },
    faqs: [
      ["What is the time difference between Saudi Arabia and India?", "India is 2½ hours ahead of Saudi Arabia all year. Our 9 am to 10 pm IST day runs 6:30 am to 7:30 pm in Riyadh, covering the full working day."],
      ["Can you integrate with ZATCA e-invoicing?", "Yes. We integrate billing and ERP systems with ZATCA's Fatoora platform: structured XML invoices, QR codes, and clearance or reporting as your wave requires."],
      ["Does the Saudi PDPL allow development from India?", "Yes, with care. The PDPL has been enforceable since 14 September 2024, and transfers of personal data outside the Kingdom follow SDAIA's transfer regulation. Keeping data hosted in Saudi Arabia and giving us test data avoids most transfers; your legal adviser confirms what applies."],
      ["How much does a developer in India cost for a Saudi company?", "With Infovion, about SAR 3,400 to 6,750 a month for a dedicated full-time developer, or SAR 45 to 95 an hour."],
      ["How do I contact you from Saudi Arabia?", "WhatsApp +91 93091 93613, call +91 91563 02024, or email contact@infovion.in."],
    ],
  }),

  base("offshore-software-development-australia", "For Australia", {
    name: "Offshore Software Development for Australia",
    nav: "Australia",
    noun: "offshore software development for an Australian business",
    ctaTitle: "Developers in India for your Australian business",
    waText: "Hello Infovion, I'm in Australia and would like to discuss a software project.",
    card: "Developers in India for Australian businesses: your afternoons are our mornings, USD invoices, Privacy Act-aware data handling.",
    title: "Offshore Software Development India for Australia | Infovion",
    description: "Outsource software development from Australia to India: developers from US$12/hour, your afternoons overlap our day, Privacy Act-aware handling, NDA and IP.",
    h1: "Offshore software development in India for Australian businesses",
    countries: ["Australia", "New Zealand"],
    answerQ: "How much does it cost an Australian business to outsource software development to India?",
    answer: "With Infovion Technologies in Pune, India, Australian clients pay about US$12 to 25 an hour for development, US$900 to 1,800 a month for a dedicated full-time developer, and typically US$3,000 to 15,000 for a web app or MVP at a fixed price, invoiced in US dollars; maintenance starts from about US$150 a month. India is 4½ to 5½ hours behind Sydney and 2½ hours behind Perth, so our day overlaps Sydney afternoons from about 1:30 or 2:30 pm and most of the Perth working day. Contact: WhatsApp +91 93091 93613 or contact@infovion.in.",
    intro: "Australian businesses get a team that starts work during your lunch and keeps going after you log off, at a fraction of local rates. Brief us in the afternoon; see progress the next morning.",
    build: COMMON_BUILD([
      ["Australian integrations", "Xero, MYOB, Stripe, Square, Afterpay and Australia Post, plus 10% GST invoicing."],
      ["AI-built app rescue", "Apps built with Lovable, Bolt, v0, Replit, Cursor or Claude Code reviewed, secured and launched."],
    ]),
    explain: [
      ["Working hours with Australia", null, [IST_HOURS, "Sydney and Melbourne are 4½ hours ahead of India (AEST) or 5½ (AEDT, in summer)", "Our day overlaps theirs from about 1:30 pm (AEST) or 2:30 pm (AEDT) to the end of the working day", "Perth is 2½ hours ahead: overlap from 11:30 am", "New Zealand is 6½ to 7½ hours ahead: overlap in the late afternoon", "Brief us after lunch; work continues in your evening"]],
      ["Privacy and contracts", null, ["The Privacy Act 1988 and Australian Privacy Principle 8 apply when personal information is disclosed overseas", "We sign a data processing agreement and work on test data where personal data is not needed", "Hosting can stay in Australian cloud regions under your accounts", "Mutual NDA, and IP assigned to your company on payment"]],
      ["Is a small Indian team right for you?", SMALL_TEAM],
      ["How to start", null, COMMON_START],
    ],
    deliverables: ["Written scope and price", "Mutual NDA and IP assignment", "Code in your repository from day one", "Afternoon calls in your time zone", "Staging link to review every two weeks", "Documentation and handover, or an ongoing AMC"],
    fit: ["Australian startups building an MVP", "SMEs whose local quotes are out of budget", "Agencies needing white-label developers", "Businesses whose developer has left", "New Zealand businesses too"],
    cost: { title: "Cost for Australian businesses (USD)", sub: "Infovion's indicative prices for 2026, invoiced in US dollars by international transfer. Every project gets its own written quote after a first call.", ranges: USD, drivers: USD_DRIVERS, timeline: TIMELINE },
    faqs: [
      ["What is the time difference between Sydney and India?", "Sydney is 4½ hours ahead of India in winter (AEST) and 5½ hours ahead in summer (AEDT). Our day overlaps Sydney afternoons, from about 1:30 or 2:30 pm."],
      ["How much does outsourcing to India cost from Australia?", "With Infovion, about US$12 to 25 an hour, or US$900 to 1,800 a month for a dedicated developer, invoiced in US dollars."],
      ["How is Australian customers' personal data protected?", "Under the Privacy Act 1988 and APP 8, you remain accountable for personal information disclosed overseas. We sign a data processing agreement, keep data hosted in Australia where you prefer, and use test data where we can."],
      ["How do I contact you from Australia?", "WhatsApp +91 93091 93613, call +91 91563 02024, or email contact@infovion.in."],
    ],
  }),

  base("offshore-software-development-canada", "For Canada", {
    name: "Offshore Software Development for Canada",
    nav: "Canada",
    noun: "offshore software development for a Canadian business",
    ctaTitle: "Developers in India for your Canadian business",
    waText: "Hello Infovion, I'm in Canada and would like to discuss a software project.",
    card: "Developers in India for Canadian businesses: Toronto mornings overlap, USD invoices, PIPEDA and Quebec Law 25-aware data handling.",
    title: "Offshore Software Development India for Canada | Infovion",
    description: "Outsource software development from Canada to India: developers from $12 USD/hour, Toronto morning calls, PIPEDA-aware data handling, English and French apps.",
    h1: "Offshore software development in India for Canadian businesses",
    countries: ["Canada"],
    answerQ: "How much does it cost a Canadian business to outsource software development to India?",
    answer: "With Infovion Technologies in Pune, India, Canadian clients pay about US$12 to 25 an hour for development, US$900 to 1,800 a month for a dedicated full-time developer, and typically US$3,000 to 15,000 for a web app or MVP at a fixed price, invoiced in US dollars; maintenance starts from about US$150 a month. The team's 9 am to 10 pm IST day overlaps Toronto and Montreal mornings until about 11:30 am EST or 12:30 pm EDT. Infovion builds English and French apps and handles personal data under PIPEDA and, for Quebec, Law 25. Contact: WhatsApp +91 93091 93613 or contact@infovion.in.",
    intro: "Canadian startups and businesses hire us for developers they can afford, morning calls on Eastern time, and apps that work in English and French.",
    build: COMMON_BUILD([
      ["Canadian integrations", "Stripe, Moneris, Interac, QuickBooks Online and Wave, plus GST, HST and PST invoicing."],
      ["English and French apps", "Bilingual interfaces and content, as Canadian and Quebec customers expect."],
    ]),
    explain: [
      ["Working hours with Canada", null, [IST_HOURS, "Toronto, Ottawa and Montreal: India is 9½ hours ahead in summer and 10½ in winter; our day overlaps yours until about 12:30 pm EDT / 11:30 am EST", "Vancouver: 12½ to 13½ hours apart; work moves overnight with a written update in your morning", "A daily standup in your morning is the usual rhythm"]],
      ["Privacy and contracts", null, ["PIPEDA applies to personal information handled in the course of commercial activity, including when it is processed outside Canada", "Quebec's Law 25 adds a privacy impact assessment before personal information leaves Quebec", "We sign a data processing agreement and use test data where personal data is not needed", "Hosting can stay in Canadian cloud regions under your accounts"]],
      ["Is a small Indian team right for you?", SMALL_TEAM],
      ["How to start", null, COMMON_START],
    ],
    deliverables: ["Written scope and price", "Mutual NDA and IP assignment", "Code in your repository from day one", "Daily written update in your morning", "Staging link to review every two weeks", "Documentation and handover, or an ongoing AMC"],
    fit: ["Canadian startups building an MVP", "SMEs priced out by local agencies", "Agencies needing white-label developers", "Businesses needing English and French apps", "Companies whose developer has left"],
    cost: { title: "Cost for Canadian businesses (USD)", sub: "Infovion's indicative prices for 2026, invoiced in US dollars by international transfer. Every project gets its own written quote after a first call.", ranges: USD, drivers: USD_DRIVERS, timeline: TIMELINE },
    faqs: [
      ["What is the time difference between Toronto and India?", "India is 9½ hours ahead of Toronto in summer (EDT) and 10½ in winter (EST). Our day overlaps Toronto mornings until about 12:30 pm EDT or 11:30 am EST."],
      ["How much does it cost to hire Indian developers from Canada?", "With Infovion, about US$12 to 25 an hour, or US$900 to 1,800 a month for a dedicated developer, invoiced in US dollars."],
      ["Can you build apps in English and French?", "Yes, with bilingual interfaces and content, and layouts that allow for the longer French text."],
      ["How do I contact you from Canada?", "WhatsApp +91 93091 93613, call +91 91563 02024, or email contact@infovion.in."],
    ],
  }),

  base("offshore-software-development-europe", "For Europe", {
    name: "Offshore Software Development for European Companies",
    nav: "Europe",
    noun: "offshore software development for a European company",
    ctaTitle: "Developers in India for your European business",
    waText: "Hello Infovion, I'm in Europe and would like to discuss a software project.",
    card: "Developers in India for companies in Germany, the Netherlands, Ireland and across the EU: your whole working day overlaps, GDPR standard contractual clauses.",
    title: "Offshore Software Development India for Europe (GDPR) | Infovion",
    description: "Outsource software development from Europe to India: developers from $12/hour, the whole CET working day overlaps, GDPR standard contractual clauses, WCAG 2.2.",
    h1: "Offshore software development in India for European companies",
    countries: ["Germany", "Netherlands", "Ireland", "France", "Spain", "Italy", "Belgium", "Sweden", "Denmark", "Poland", "Switzerland", "Austria"],
    answerQ: "How much does it cost a European company to outsource software development to India?",
    answer: "With Infovion Technologies in Pune, India, European clients pay about $12 to $25 an hour for development, $900 to $1,800 a month for a dedicated full-time developer, and typically $3,000 to $15,000 for a web app or MVP at a fixed price, invoiced in US dollars; maintenance starts from about $150 a month. India is 3½ hours ahead of Central European Summer Time and 4½ ahead in winter, so the team's 9 am to 10 pm IST day covers the whole CET working day. India has no EU adequacy decision, so personal data transfers are covered by the European Commission's standard contractual clauses. Contact: WhatsApp +91 93091 93613 or contact@infovion.in.",
    intro: "For a European company, India is the offshore location whose day contains yours: we start before you do and finish after you. Add GDPR-ready contracts, apps tested to WCAG 2.2 for the European Accessibility Act, and rates far below local ones.",
    build: COMMON_BUILD([
      ["European integrations", "Stripe, Adyen, Mollie, SEPA payments, DATEV and Exact exports, and multi-language, multi-currency shops."],
      ["Accessibility for the EAA", "Websites and apps tested to WCAG 2.2 AA, which covers the WCAG 2.1 AA level in EN 301 549, the standard used to meet the European Accessibility Act (applies since 28 June 2025)."],
    ]),
    explain: [
      ["Working hours with Europe", null, [IST_HOURS, "Central Europe (Berlin, Amsterdam, Paris): India is 3½ hours ahead in summer and 4½ in winter; our day runs 5:30 am to 6:30 pm CEST, covering your whole working day", "Ireland and Portugal: 4½ to 5½ hours apart; our day covers yours until 4:30 or 5:30 pm", "Eastern Europe: 2½ to 3½ hours apart"]],
      ["GDPR and sending data to India", null, ["The GDPR applies to your customers' personal data", "India has no EU adequacy decision, so transfers use the European Commission's standard contractual clauses (SCCs), with a transfer impact assessment", "We sign the SCCs and a data processing agreement under Article 28", "Hosting can stay in EU cloud regions under your accounts; we work on test data where personal data is not needed"]],
      ["Is a small Indian team right for you?", SMALL_TEAM],
      ["How to start", null, COMMON_START],
    ],
    sources: [["European Commission: standard contractual clauses", "https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en"], ["W3C: WCAG 2.2", "https://www.w3.org/TR/WCAG22/"]],
    deliverables: ["Written scope and price", "Mutual NDA, IP assignment, SCCs and a data processing agreement", "Code in your repository from day one", "Calls in your office hours", "Staging link to review every two weeks", "Documentation and handover, or an ongoing AMC"],
    fit: ["European startups building an MVP", "Mittelstand and SMEs with a development backlog", "Agencies needing white-label developers", "Companies preparing for the European Accessibility Act", "Businesses whose developer has left"],
    cost: { title: "Cost for European companies", sub: "Infovion's indicative prices for 2026, invoiced in US dollars by international transfer. Every project gets its own written quote after a first call.", ranges: USD, drivers: USD_DRIVERS, timeline: TIMELINE },
    faqs: [
      ["What is the time difference between Central Europe and India?", "India is 3½ hours ahead of Central European Summer Time and 4½ hours ahead in winter. Our 9 am to 10 pm IST day covers the whole CET working day."],
      ["Is outsourcing to India GDPR compliant?", "It can be. India has no EU adequacy decision, so personal data transfers use the European Commission's standard contractual clauses with a transfer impact assessment. We sign the SCCs and a data processing agreement, and use test data where personal data is not needed."],
      ["How much does a developer in India cost for a European company?", "With Infovion, about $12 to $25 an hour, or $900 to $1,800 a month for a dedicated full-time developer, invoiced in US dollars."],
      ["Can you make our website comply with the European Accessibility Act?", "Yes. We audit and fix websites and apps to WCAG 2.2 AA, which covers the WCAG 2.1 AA level that EN 301 549, the standard used to meet the Act, refers to. The Act applies since 28 June 2025."],
      ["How do I contact you from Europe?", "WhatsApp +91 93091 93613, call +91 91563 02024, or email contact@infovion.in. Your whole working day is within our hours."],
    ],
    reading: [["/wcag-accessibility-audit", "WCAG accessibility audit", "Audits and fixes for the European Accessibility Act."], ...READING],
  }),
];
