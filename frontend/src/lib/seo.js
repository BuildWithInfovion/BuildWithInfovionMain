// Structured-data helpers shared by every page (schema.org JSON-LD).
import { COMPANY, SITE, fullAddress } from "../Data/company";

export const abs = (path) => (path.startsWith("http") ? path : `${SITE}${path === "/" ? "/" : path}`);

export const ORG_ID = `${SITE}/#organization`;
export const FOUNDER_ID = `${SITE}/about#founder`;

/** [["Services", "/services"], ["Web development", "/services/web-development"]] → BreadcrumbList */
export const breadcrumbSchema = (trail) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [["Home", "/"], ...trail].map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: abs(path),
  })),
});

/** [[question, answer], …] → FAQPage */
export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
});

export const serviceSchema = (s) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE}${s.path ?? `/services/${s.slug}`}#service`,
  name: s.name,
  serviceType: s.name,
  description: s.answer,
  url: `${SITE}${s.path ?? `/services/${s.slug}`}`,
  provider: { "@id": ORG_ID },
  areaServed: s.countries ? s.countries.map((name) => ({ "@type": "Country", name })) : [{ "@type": "Country", name: "India" }, { "@type": "Place", name: "Worldwide" }],
  audience: { "@type": "BusinessAudience", audienceType: s.fit.join(", ") },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: `${s.name} — what we build`,
    itemListElement: s.build.map(([name, description]) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name, description } })),
  },
});

// The company, sitewide: an Organization that is also a local ProfessionalService (address, hours, geo).
export const organizationNode = () => {
  const a = COMPANY.address;
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: COMPANY.name,
    alternateName: ["Infovion", "Infovion Tech"],
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/icon-512.png`, width: 512, height: 512 },
    image: `${SITE}/og-image.jpg`,
    description:
      "Infovion Technologies is a software development company in Pune, India. It builds custom software, websites and web apps, mobile apps, ERP and CRM systems, SaaS products and AI automation for businesses and government, and makes two products: Infovion School ERP (school management software) and Infovion JMS (jewellery management software).",
    slogan: "We build the software your business runs on.",
    founder: { "@type": "Person", "@id": FOUNDER_ID, name: COMPANY.founder, jobTitle: COMPANY.founderRole, worksFor: { "@id": ORG_ID }, url: `${SITE}/about`, knowsAbout: ["Custom software development", "School management software", "Jewellery management software", "AI automation"] },
    foundingLocation: { "@type": "Place", name: "Pune, Maharashtra, India" },
    email: COMPANY.email,
    telephone: COMPANY.phone.replace(/\s/g, ""),
    priceRange: "₹₹",
    currenciesAccepted: "INR, USD",
    paymentAccepted: "Bank transfer, UPI",
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: a.locality,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.countryCode,
    },
    geo: { "@type": "GeoCoordinates", latitude: COMPANY.geo.lat, longitude: COMPANY.geo.lng },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress())}`,
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: COMPANY.hoursSpec.days, opens: COMPANY.hoursSpec.opens, closes: COMPANY.hoursSpec.closes }],
    areaServed: [
      { "@type": "City", name: "Pune" }, { "@type": "State", name: "Maharashtra" }, { "@type": "Country", name: "India" },
      ...["United States", "United Kingdom", "United Arab Emirates", "Saudi Arabia", "Australia", "New Zealand", "Canada", "Germany", "Netherlands", "Ireland", "Singapore"].map((name) => ({ "@type": "Country", name })),
      { "@type": "Place", name: "Worldwide" },
    ],
    identifier: [{ "@type": "PropertyValue", propertyID: "Udyam Registration Number (MSME, Government of India)", value: COMPANY.udyam }],
    knowsAbout: [
      "Custom software development", "Web application development", "Website development", "Mobile app development", "Progressive web apps",
      "ERP software development", "CRM development", "SaaS product development", "MVP development", "UI/UX design", "AI automation", "AI agent development", "Retrieval-augmented generation (RAG)", "WhatsApp Business API chatbots", "AI invoice processing", "Cloud and DevOps",
      "API integration", "MIS and dashboards", "E-governance software", "GIGW 3.0", "School management software", "Jewellery management software",
      "Software maintenance and AMC", "On-demand software development", "Application security", "OWASP Top 10", "DPDP Act compliance", "Fixing apps built with AI coding tools (vibe coding)",
      "Offshore software development", "IT outsourcing to India", "Dedicated developers", "White-label development", "GDPR standard contractual clauses", "Arabic RTL applications", "ZATCA e-invoicing integration",
      "Stone crusher and quarry ERP", "Real estate CRM", "Healthcare software development", "Hospital management systems", "ABDM integration", "HL7 FHIR", "WCAG 2.2 accessibility audits", "Pharmaceutical software", "21 CFR Part 11",
    ],
    sameAs: Object.values(COMPANY.socials).concat(COMPANY.productHunt),
    contactPoint: [
      { "@type": "ContactPoint", telephone: COMPANY.phone.replace(/\s/g, ""), contactType: "sales", areaServed: ["IN", "Worldwide"], availableLanguage: ["English", "Hindi", "Marathi"] },
      { "@type": "ContactPoint", email: COMPANY.email, contactType: "customer support", areaServed: ["IN", "Worldwide"] },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        name: "WhatsApp (international clients)",
        telephone: COMPANY.whatsapp.replace(/\s/g, ""),
        url: `https://wa.me/${COMPANY.whatsappNumber}`,
        areaServed: ["US", "GB", "AE", "SA", "AU", "NZ", "CA", "DE", "NL", "IE", "SG", "IN"],
        availableLanguage: ["English", "Hindi", "Marathi"],
        hoursAvailable: { "@type": "OpeningHoursSpecification", dayOfWeek: COMPANY.hoursSpec.days, opens: COMPANY.hoursSpec.opens, closes: COMPANY.hoursSpec.closes, description: "India Standard Time (UTC+5:30)" },
      },
    ],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@id": `${SITE}/school-management-software#software` } },
      { "@type": "Offer", itemOffered: { "@id": `${SITE}/jewellery-management-software#software` } },
    ],
  };
};
