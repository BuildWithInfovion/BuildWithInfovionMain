# Backlinks and reach kit: Infovion JMS

What to do, in order, to get other websites, directories and people pointing at
`www.infovion.in`. The company listings (Clutch, GoodFirms, JustDial and so on) are in
[LISTINGS-KIT.md](LISTINGS-KIT.md); this file is about the jewellery product.

**Rules**

- Never buy links, link packages or "DA 50 guest posts". Google ignores them at best and penalises the site at worst.
- Use the same name, phone and email everywhere (see LISTINGS-KIT.md → NAP block).
- Add `?utm_source=<site>&utm_medium=listing` to every link you place, so Google Analytics shows which ones bring visitors.
- One real link from a jewellers' association, a CA's blog or a news site beats 50 directories. Directories come first only because they are quick.

---

## 1. Paste-ready copy for JMS listings

**Name:** Infovion JMS
**Category:** Jewelry Store Management Software / Retail POS / Point of Sale (Jewellery)
**Website:** https://www.infovion.in/jewellery-management-software
**Free trial:** https://jms.infovion.in/signup · **Demo shop:** https://jms.infovion.in/demo
**Price:** ₹9,999 per shop + GST (usual price ₹11,999), then AMC ₹3,999 a year; 30-day free trial, no card
**Deployment:** Cloud, web browser (Windows, macOS, Android, iOS); works on phones; billing keeps working offline
**Languages:** English, Hindi, Marathi, Gujarati, Tamil, Telugu, Kannada, Malayalam, Bengali, Punjabi
**Countries:** India, UAE, Saudi Arabia, Oman, Bahrain, Qatar, Kuwait, UK, USA, Canada, Singapore, Australia

**Tagline (≤ 60 chars)**
The whole jewellery shop in one app, in 10 Indian languages

**Short (≤ 160 chars)**
Jewellery shop software: billing, barcode tags, girvi, gold schemes, karigar, repairs, GSTR-1, branches and Tally, in 10 Indian languages. Works offline.

**Long (~1,200 chars)**
Infovion JMS is jewellery management software for jewellery shops in India and abroad. Bills are worked out from weight, purity, the day's rate and making charges (per gram, % or per piece), with stones, discount, old gold exchange and split payments, and printed as GST (CGST/SGST or IGST) or VAT invoices on A4, A5 or thermal rolls, or sent as a PDF on WhatsApp. Every piece gets a barcode or QR tag printed on TSC, TVS, Zebra or Argox tag printers; pieces are billed by scanning, and the whole showroom can be audited by scanning. JMS keeps a girvi (gold loan) register with interest counted by days, a customer credit (udhaar) ledger, KYC with encrypted ID numbers, and PAN and cash-limit checks on big bills. It runs 11-month gold savings schemes with receipts and redemption on the bill, custom orders with advances, karigar jobs with fine-gold balances, repairs, and old gold purchase and melting. The accountant gets TallyPrime XML, GSTR-1 files for the GST Offline Tool and the GSTR-3B summary. Owners see profit on every bill, run several branches with stock transfers, and keep billing when the internet drops. Every screen is in 10 Indian languages, weighing scales fill in weights, and add-ons cover money lending and gold release. Country presets set the currency, tax, purities and financial year for India, the UAE and the Gulf, the UK, the US and more. Made by Infovion Technologies, Pune (MSME).

**Feature tags:** Billing · Barcode and QR tags · Inventory · Stock audit · GST · GSTR-1 · VAT · Old gold · Girvi / gold loan · Gold savings scheme · Custom orders · Karigar / job work · Repairs · Multi-branch · Offline billing · Customer credit · Tally integration · Multi-user · Hindi · Marathi · Gujarati · Tamil · Telugu · Mobile

**Screenshots** (in `frontend/public/product/jms/`, use the 1800 px versions):
billing.webp · tags.webp · audit.webp · invoice.webp · gahan.webp · scheme-passbook.webp · order-detail.webp · gst-returns.webp · profit.webp · dashboard-hi.webp · dashboard-ta.webp · uae-invoice.webp
**Logo:** `frontend/public/icon-512.png` · **Cover:** `frontend/public/og-jms.jpg`

---

## 0. First: the Google Business Profile (this is what makes the phone ring)

People who search "jewellery software near me", "jewellery billing software Pune" or your name
see the Business Profile before any web page, with a Call button. It is free and it is the
biggest single step for enquiry calls.

1. At business.google.com, claim or create **Infovion Technologies** (category *Software company*; add *Computer software store* or *Software development* as extra categories). Use the exact address, phone and hours on the website.
2. **Products**: add Infovion JMS and Infovion School ERP as products with a photo, ₹9,999 starting price and the link to `/jewellery-management-software?utm_source=gbp&utm_medium=product`.
3. **Services**: list "Jewellery billing software", "Girvi software", "Gold scheme software", "Jewellery barcode software", "Jewellery software in Hindi/Marathi/Gujarati…". Google matches these words to searches.
4. **Photos**: the office, the team, a counter running JMS, a printed bill and tag. Add 2–3 new photos every month.
5. **Posts**: one a week, reusing the outreach posters (offer, festival, new feature) with the page link.
6. **Reviews**: ask every customer who is happy, right after setup, with the short review link. Reply to every review. Reviews and their words ("girvi", "barcode", "Marathi") are the strongest local ranking signal.
7. **Q&A**: add the 5 questions callers ask most, with honest answers.

Do the same for **Bing Places** (import from Google in one click) and **Apple Business Connect**.

## 0b. Real reviews also unlock stars in Google results

The JMS page carries SoftwareApplication data, but Google shows stars only with genuine
ratings. Once JMS has reviews on Capterra, G2 or Google, add an `aggregateRating` built from
those real numbers to the schema in `frontend/src/pages/jms/Jms.jsx`. Never invent ratings.

---

## 2. Where to list JMS (free), in this order

| # | Site | What to do | Link to use |
|---|------|-----------|-------------|
| 1 | **Capterra** (vendors.capterra.com) | Free vendor listing, category *Jewelry Store Management*. One listing also appears on **GetApp** and **Software Advice**. Ask 3 customers for reviews there. | `/jewellery-management-software?utm_source=capterra&utm_medium=listing` |
| 2 | **G2** (sell.g2.com) | Free product profile, same category. | `…utm_source=g2` |
| 3 | **SoftwareSuggest** | Free listing; strong in India; sends enquiries. | `…utm_source=softwaresuggest` |
| 4 | **Techjockey** | Free listing (India). | `…utm_source=techjockey` |
| 5 | **SaaSworthy** | Free listing. | `…utm_source=saasworthy` |
| 6 | **SourceForge** (business software directory) | Free listing for commercial software. | `…utm_source=sourceforge` |
| 7 | **AlternativeTo** | Add JMS as an alternative to the jewellery software jewellers already know. | `…utm_source=alternativeto` |
| 8 | **Product Hunt** | You already have a company page. Launch **JMS** as its own product on a Tuesday–Thursday, with the demo link and 4 screenshots. | `…utm_source=producthunt` |
| 9 | **IndiaMART** and **TradeIndia** | List JMS as a product with price and photos; jewellers search here. | `…utm_source=indiamart` |
| 10 | **JustDial** | The closest software category for Pune; JMS in the description. | `…utm_source=justdial` |
| 11 | **LinkedIn showcase page** | A showcase page for Infovion JMS under the company page. | `/jewellery-management-software` |
| 12 | **Crunchbase** | Free company profile; add JMS under products. Add the Crunchbase URL to `COMPANY.socials` on the site afterwards. | `/` |
| 13 | **Wikidata** | An item for *Infovion Technologies* (instance of: business; country: India; official website; founded; LinkedIn ID). Only facts with a source. Add the Wikidata URL to `COMPANY.socials` afterwards. | `/` |
| 14 | **Yellow Pages UAE** (yellowpages-uae.com) | Free listing under software companies, saying you serve UAE jewellers remotely. Only if they accept a business without a UAE address; never invent one. | `/jewellery-software-uae?utm_source=yp_uae&utm_medium=listing` |

Items 12 and 13 fill the "Knowledge Graph" gap the GEO audit found (1 of 4 profiles: LinkedIn only).
When added, put the URLs in `frontend/src/Data/company.js → COMPANY.socials` so the site's schema lists them as `sameAs`.

---

## 2b. Jewellery trade: where jewellers read and gather

| Where | What to do |
|-------|-----------|
| **Trade magazines and portals** (Indian Jeweller, Retail Jeweller India, Solitaire International, Jewellery Business Trends) | Send a short product note when a feature ships (gold schemes, 10 languages, offline billing) with 2 screenshots. Many publish "new products" and tech columns; a mention there is a strong, relevant link. |
| **Jewellers' associations** (district sarafa associations, state federations, GJC, IBJA chapters) | Offer a free 30-minute session on "GST, hallmarking and digital records for small jewellers", using the guides below. Ask to be listed as a technology partner on their website. |
| **Trade fairs** (IIJS by GJEPC, regional jewellery shows) | Visit with the demo shop on a tablet and printed brochures; exhibitors' and visitors' lists are leads. |
| **CA firms that serve jewellers** | The GSTR-1 files, Tally export and the karigar guide save them time; a CA who recommends JMS to clients is worth more than any directory. |

## 2c. The jewellery guides to share

Each one answers a question jewellers search for and ends with a link to the matching JMS page. Share them in association groups, on Quora and LinkedIn, and with trade magazines:

- `/blog/gold-savings-scheme-rules-for-jewellers`: 11-month schemes, the 365-day rule, the BUDS Act
- `/blog/karigar-fine-gold-touch-wastage-calculation`: fine gold, touch and wastage with worked examples
- `/blog/hallmarking-huid-rules-for-jewellers`: hallmarking and HUID in 2026
- `/blog/how-to-choose-jewellery-software-india`: a 20-point checklist and what software costs
- `/blog/jewellery-billing-gst-making-charges-old-gold`: 3% GST, making charges, discount and old gold
- `/blog/girvi-register-guide-for-jewellers`: girvi records and interest
- `/blog/jewellery-shop-software-hindi-guide` (Hindi) and `/blog/saraf-dukan-software-marathi-guide` (Marathi): share these in Hindi and Marathi WhatsApp groups of jewellers

Language pages for regional groups: `/jewellery-software-gujarati`, `-tamil`, `-telugu`, `-kannada`, `-malayalam`, `-bengali`, `-punjabi`, `-hindi`, `-marathi`.

## 3. The free calculators: who to send them to

Pages: `/gold-price-calculator` · `/dubai-gold-price-calculator` · `/girvi-interest-calculator`.
They are useful on their own, so people link to them without being paid. Send them to:

1. **Jewellers' associations** (district sarafa associations, state jewellers' federations): ask to add the calculators to their website's "useful links" or WhatsApp group.
2. **CA and tax bloggers** who wrote about "GST on gold jewellery" or "GST on making charges": offer the calculator as a worked example for their article.
3. **Personal finance bloggers and YouTubers** who explain "how to calculate gold jewellery price": same offer.
4. **Gold rate websites and city rate pages**: a "calculate your price" link next to the day's rate.
5. **Indian community pages in the UAE** (Facebook groups, community websites of Keralite, Gujarati and Marathi groups in Dubai and Sharjah) for the Dubai calculator, especially before Akshaya Tritiya, Dhanteras, Diwali and the Dubai Shopping Festival.

**Message (English)**

> Hello {name}, I read your article on {topic}. We made a free calculator that does exactly this sum, with making charges, 3% GST and old gold exchange, and shares the result on WhatsApp: https://www.infovion.in/gold-price-calculator
> No sign-up, no ads. If it is useful to your readers, a link from the article would help them. Happy to share any figures you need.
> Sankalp Deshpande, Infovion Technologies, Pune

**Message (Hindi, for associations)**

> नमस्ते {नाम} जी, हमने ज्वेलर्स के लिए एक मुफ़्त कैलकुलेटर बनाया है: वज़न, टंच, मजूरी, 3% GST और पुराना सोना — सब हिसाब तुरंत, और ग्राहक को WhatsApp पर भेज सकते हैं: https://www.infovion.in/gold-price-calculator
> गिरवी ब्याज के लिए: https://www.infovion.in/girvi-interest-calculator
> अगर आपके सदस्यों के काम आए तो एसोसिएशन की वेबसाइट या ग्रुप में शेयर कर दीजिए। धन्यवाद।

Keep a sheet: site · contact · date sent · reply · link live (yes/no) · URL.

---

## 4. Links you control (do these this month)

1. **"Billed with Infovion JMS" on invoices.** Every bill a shop prints or sends on WhatsApp reaches a customer. A small line at the foot of the invoice PDF and the WhatsApp message (`Billing by Infovion JMS · infovion.in/jms`), with a setting that lets a paying shop switch it off, puts your name in front of every jeweller's customers. This is a change in the JMS app (`web/src/lib/invoicePdf.js`, `whatsapp.js`); it does not exist today.
2. **Client websites.** "Website by Infovion Technologies" in the footer of every site you build.
3. **GitHub.** Publish `indian-school-certificates` (on the Desktop) and a small open-source "Tally XML voucher generator" from the JMS export code, each with a README that links to the site.
4. **YouTube descriptions.** Every JMS video links to the matching page: billing → `/jewellery-billing-software`, tags → `/jewellery-barcode-software`, girvi → `/girvi-software`, schemes → `/gold-scheme-software`, karigar → `/karigar-management-software`, GST → `/jewellery-gst-software`, UAE → `/jewellery-software-uae`. Short videos in Hindi, Marathi, Gujarati and Tamil, with the title in that language ("ज्वेलरी बिलिंग सॉफ्टवेयर"), compete with almost nobody.
5. **All social profiles** (Instagram, Facebook, YouTube, LinkedIn): the bio link goes to `/jewellery-management-software` on jewellery posts.

---

## 5. Places where people ask (answer honestly, say who you are)

AI assistants quote these sites often. One useful answer a week is enough.

- **Quora:** "best jewellery billing software in India", "how is gold jewellery price calculated", "GST on making charges", "girvi interest calculation", "jewellery software with Tally". Answer the question fully first; link the calculator or page at the end.
- **Reddit:** r/IndiaInvestments and r/personalfinanceindia gold-buying threads. Answer the sum, link the calculator only when it answers the question. Read each subreddit's rules on self-promotion first.
- **Facebook groups** of jewellers and of Indian traders in the UAE: share the calculators and short demo videos, not sales posts.

---

## 6. Expert quotes in news sites (free)

Sign up as a source on **Qwoted** and **Featured.com**. Answer requests on: GST and jewellery, gold buying, small business software in India, digitising girvi and money lending, UAE e-invoicing. One quote in a news site is a strong link and an AI-cited mention.

---

## 7. Weekly routine (2 hours)

| Day | Task |
|-----|------|
| Mon | 2 directory listings from section 2 |
| Tue | 3 outreach messages from section 3 |
| Wed | 1 Quora or Reddit answer |
| Thu | 1 short JMS video (Hindi or Marathi) with the page link |
| Fri | Search Console: Performance (new queries), Pages (new not-indexed), Links (new linking sites); ask one customer for a Google review; one Business Profile post |

After a deploy that adds pages, run `node frontend/scripts/indexnow.mjs` (tells Bing, which feeds ChatGPT search) and resubmit `sitemap.xml` in Search Console.

Check the Search Console **Links** report monthly: "Top linking sites" should grow by a few real sites each month.
