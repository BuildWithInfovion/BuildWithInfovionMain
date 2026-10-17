// Structured data for Infovion School ERP — used on the school product pages (not sitewide any more).
import { SITE } from "./company";

export const schoolSoftwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE}/school-management-software#software`,
  name: "Infovion School ERP",
  alternateName: ["Infovion Academic ERP", "Infovion", "Infovion School Management Software"],
  applicationCategory: "EducationApplication",
  applicationSubCategory: "School Management Software",
  operatingSystem: "Any web browser (Android, iOS, Windows, macOS)",
  url: `${SITE}/school-management-software`,
  description:
    "School management software for K-12 schools in India. Covers admissions, attendance, examinations, fee collection with online payments, transport, certificates, staff and salary, timetable and announcements — with 8 role-specific portals for Director, Principal, Operator, Accountant, Receptionist, Teacher, Non-Teaching Staff and Parent.",
  offers: {
    "@type": "Offer",
    price: "150",
    priceCurrency: "INR",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "150",
      priceCurrency: "INR",
      unitText: "per student per academic year, plus GST",
      valueAddedTaxIncluded: false,
    },
    url: `${SITE}/school-management-software/pricing`,
    availability: "https://schema.org/InStock",
    seller: { "@id": `${SITE}/#organization` },
  },
  author: { "@id": `${SITE}/#organization` },
  publisher: { "@id": `${SITE}/#organization` },
  audience: { "@type": "EducationalAudience", educationalRole: "administrator", audienceType: "School administrators, principals, teachers, parents" },
  areaServed: { "@type": "Country", name: "India" },
  inLanguage: "en-IN",
  featureList: [
    "Student admissions with automatic admission numbers",
    "Attendance marked by teachers on any phone",
    "Examinations, marks entry, report cards and rank lists",
    "Fee management with instalments, concessions, receipts and opening balances",
    "Online fee payments by UPI, card and net banking into the school's own Razorpay account",
    "School transport: routes, stops, fares, bus attendance and live bus location",
    "Transfer, leaving, bonafide and character certificates and ID cards",
    "Staff records, attendance, leave and salary slips",
    "Parent portal with attendance, fees, results and bus tracking",
    "Weekly timetable and school calendar",
    "8 role-based portals; each school's data kept separate; full audit log",
  ],
};
