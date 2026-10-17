// Structured-data helpers shared by every page (schema.org JSON-LD).
import { COMPANY, SITE, fullAddress } from "../Data/company";

export const abs = (path) => (path.startsWith("http") ? path : `${SITE}${path === "/" ? "/" : path}`);

export const ORG_ID = `${SITE}/#organization`;

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
  "@id": `${SITE}/services/${s.slug}#service`,
  name: s.name,
  serviceType: s.name,
  description: s.answer,
  url: `${SITE}/services/${s.slug}`,
  provider: { "@id": ORG_ID },
  areaServed: [{ "@type": "Country", name: "India" }, { "@type": "Place", name: "Worldwide" }],
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
    founder: { "@type": "Person", name: COMPANY.founder, jobTitle: COMPANY.founderRole },
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
    areaServed: [{ "@type": "City", name: "Pune" }, { "@type": "State", name: "Maharashtra" }, { "@type": "Country", name: "India" }, { "@type": "Place", name: "Worldwide" }],
    identifier: [{ "@type": "PropertyValue", propertyID: "Udyam Registration Number (MSME, Government of India)", value: COMPANY.udyam }],
    knowsAbout: [
      "Custom software development", "Web application development", "Website development", "Mobile app development", "Progressive web apps",
      "ERP software development", "CRM development", "SaaS product development", "UI/UX design", "AI automation", "Cloud and DevOps",
      "API integration", "MIS and dashboards", "E-governance software", "GIGW 3.0", "School management software", "Jewellery management software",
    ],
    sameAs: Object.values(COMPANY.socials).concat(COMPANY.productHunt),
    contactPoint: [
      { "@type": "ContactPoint", telephone: COMPANY.phone.replace(/\s/g, ""), contactType: "sales", areaServed: ["IN", "Worldwide"], availableLanguage: ["English", "Hindi", "Marathi"] },
      { "@type": "ContactPoint", email: COMPANY.email, contactType: "customer support", areaServed: ["IN", "Worldwide"] },
    ],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@id": `${SITE}/school-management-software#software` } },
      { "@type": "Offer", itemOffered: { "@id": `${SITE}/jewellery-management-software#software` } },
    ],
  };
};
