# Infovion website — growth playbook

The site now does three things automatically:
- Every page is **pre-rendered to real HTML**, so Google and link previews see it.
- **Free tools** (LC / TC / bonafide) bring school offices in from Google.
- Every trial lead says **where the visitor came from**.

The steps below are the ones only you can do.

## Week 1 — get Google to re-read the site (most important)

Google still shows the old agency description of buildwithinfovion.com ("Web Development, UI/UX & AI Solutions Agency"). Until that changes, almost no school will find you.

1. **Google Search Console** → https://search.google.com/search-console
   - Add the property `buildwithinfovion.com` (Domain property, verified by DNS TXT record at your domain registrar).
   - **Sitemaps** → submit `https://buildwithinfovion.com/sitemap.xml`. It now lists ~28 pages and is regenerated on every deploy.
   - **URL inspection** → request indexing for these pages, one by one:
     - `/`
     - `/free-tools/school-leaving-certificate-marathi`
     - `/free-tools/transfer-certificate`
     - `/school-management-software-maharashtra`
     - `/fee-management-software-for-schools`
     - `/pricing`
     - `/free-trial`
   - **Removals** → if old agency pages (old blog posts about dashboards, web development, etc.) still show, request removal of those URLs.
2. **Google Business Profile** → https://business.google.com
   - "Infovion — School Management Software", category *Software company*, Pune.
   - Add the website, phone, WhatsApp, photos (screenshots + the film poster) and the trial link.
   - Ask every live school for a review. Reviews on this profile are the strongest local trust signal you can get.
3. **Google Analytics** (already installed: G-LYYQHTH0MP)
   - Admin → Events → mark `generate_lead` and `sign_up` as **key events**.
   - Other events now sent: `whatsapp_click`, `film_play`, `tool_print`, `tool_cta`.
4. **YouTube**
   - Upload the 4-minute film (`brag.mp4`) as "Infovion — School Management Software for Indian Schools".
   - Put the trial link first in the description: `https://buildwithinfovion.com/free-trial?utm_source=youtube`.
   - Upload the 11 feature clips as Shorts.

## Track every channel

Add `?utm_source=…&utm_campaign=…` to every link you share. The trial lead email shows it under "Came from".

| Where | Link |
|---|---|
| WhatsApp broadcast | `https://buildwithinfovion.com/free-trial?utm_source=whatsapp&utm_campaign=oct-broadcast` |
| Visiting card / brochure QR | `https://buildwithinfovion.com/free-trial?utm_source=print&utm_campaign=visiting-card` |
| Referral by a school | `https://buildwithinfovion.com/free-trial?ref=SCHOOLCODE` |
| Instagram / Facebook bio | `https://buildwithinfovion.com/?utm_source=instagram` |

## Outreach that works for school software in India

**Timing.** January–April is when schools decide on next year's software. October–December is for building the list and booking demos.

**Free tools first, product second.** Send school offices the free LC / TC generator. It is useful to them on day one, and the certificate footer points back to Infovion.

**WhatsApp message (Marathi):**
> नमस्कार सर/मॅडम, शाळा सोडल्याचा दाखला मराठीत काही सेकंदात तयार करण्यासाठी आमचं मोफत टूल वापरून पहा — जन्मतारीख अक्षरी आपोआप लिहिली जाते: https://buildwithinfovion.com/free-tools/school-leaving-certificate-marathi?utm_source=whatsapp
> संपूर्ण शाळेची फी, हजेरी, दाखले आणि पालक पोर्टल एकाच ठिकाणी हवं असेल तर 30 दिवस मोफत वापरून पहा. — इन्फोव्हियन, पुणे

**WhatsApp message (English):**
> Hello Sir/Ma'am, a free tool your office can use today — make a Transfer Certificate or Leaving Certificate in seconds: https://buildwithinfovion.com/free-tools?utm_source=whatsapp
> If you'd like fees, attendance, certificates and a parent app in one system, try Infovion free for 30 days (₹50 per student per year after).

**Referral offer (suggested — your decision):** "Refer a school that subscribes, get 2 months free." Schools trust other schools more than ads.

**Where else to list Infovion (free listings):**
- SoftwareSuggest
- Techjockey
- Capterra / GetApp (India)
- Justdial (Pune, "school software")
- IndiaMART

**Associations and events:**
- district-level school principals' associations;
- the Independent English Schools Association (IESA) and Maharashtra English School Trustees Association (MESTA);
- local education fairs.

A 10-minute demo at an association meeting reaches 30 schools at once.

## Content calendar (one post every 2 weeks)

Write each post for a search that a school office actually types:

1. "Bonafide certificate format for school in Marathi" (link to the bonafide tool)
2. "How to fill the General Register (जनरल रजिस्टर) correctly"
3. "School fee receipt format and what it must contain"
4. "Caste certificate / LC mistakes that delay admissions"
5. "How to collect school fees by UPI without a payment gateway headache"
6. "DPDP Act 2023: what schools must do with student data"
7. "RTE 25% admissions: managing records and reimbursements"
8. "School bus safety checklist for Maharashtra schools"

## What to watch every Monday

- **Search Console:** impressions and clicks per page (are the tools and landing pages showing up?).
- **Analytics:** `sign_up` (trials), `generate_lead` (demos), `tool_print`, `whatsapp_click`.
- **Console:** trial schools → how many signed in and collected a fee or printed a certificate. Call every trial within a day; a walkthrough is what converts.
