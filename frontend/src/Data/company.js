// One source of truth for company facts. Footer, contact page, company profile,
// structured data and llms.txt all read from here — change a fact once.
// Leave a credential empty ("") until it is real: empty values are not shown anywhere.

export const SITE = "https://www.infovion.in";

export const COMPANY = {
  brand: "Infovion",
  name: "Infovion Technologies",
  tagline: "Software development company in Pune, India",
  founder: "Sankalp Deshpande",
  founderRole: "Founder",
  constitution: "Proprietorship (MSME)",
  udyam: "UDYAM-MH-26-1125911",
  // Fill in as each registration is completed — they appear on /company-profile and /government automatically.
  gstin: "",
  gemSellerId: "",
  cpppId: "",
  startupIndia: "",
  iso: [],
  email: "contact@infovion.in",
  phone: "+91 91563 02024",
  phoneHref: "tel:+919156302024",
  whatsapp: "+91 93091 93613",
  whatsappNumber: "919309193613",
  address: {
    street: "1306/T3, Godrej Green Vistas, Tower 3, Nande–Balewadi Road, Mahalunge",
    locality: "Pune",
    region: "Maharashtra",
    regionCode: "MH",
    postalCode: "411045",
    country: "India",
    countryCode: "IN",
  },
  geo: { lat: 18.5793, lng: 73.7535 },
  hours: "Mon – Sun, 9 am – 10 pm IST",
  hoursSpec: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "09:00", closes: "22:00" },
  socials: {
    linkedin: "https://www.linkedin.com/company/112026919/",
    instagram: "https://www.instagram.com/infoviontech/",
    facebook: "https://www.facebook.com/profile.php?id=61595050592821",
    youtube: "https://www.youtube.com/@Infovion_tech",
  },
  productHunt: "https://www.producthunt.com/products/infovion",
};

export const wa = (text) => `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const fullAddress = () => {
  const a = COMPANY.address;
  return `${a.street}, ${a.locality}, ${a.region} ${a.postalCode}, ${a.country}`;
};

/** The registrations that exist today, as label/value pairs (empty ones are skipped). */
export const credentials = () =>
  [
    ["Udyam (MSME) registration", COMPANY.udyam],
    ["GSTIN", COMPANY.gstin],
    ["GeM seller ID", COMPANY.gemSellerId],
    ["CPPP (eprocure.gov.in) ID", COMPANY.cpppId],
    ["Startup India (DPIIT)", COMPANY.startupIndia],
    ...COMPANY.iso.map((c) => ["Certification", c]),
  ].filter(([, v]) => v);

export const PRODUCTS = [
  {
    slug: "school",
    name: "Infovion School ERP",
    short: "School management software",
    to: "/school-management-software",
    blurb: "Fees, attendance, exams, transport, certificates and a parent app for Indian K-12 schools — 8 role-based portals, ₹150 per student per year.",
    status: "Live in production · 30-day free trial",
  },
  {
    slug: "jms",
    name: "Infovion JMS",
    short: "Jewellery management software",
    to: "/jewellery-management-software",
    blurb: "Billing by weight and purity, making charges, old-gold exchange, GST invoices, girvi (gold loans), udhaar, stock and a Tally export for the CA — for jewellery stores.",
    status: "In use at a jewellery store in Maharashtra",
  },
];

// The technologies we work with every day (only list what we actually ship with).
export const TECH = [
  ["Frontend", ["React", "Next.js", "Vite", "Tailwind CSS", "TypeScript"]],
  ["Backend", ["Node.js", "NestJS", "Express", "REST APIs", "Cron jobs & queues"]],
  ["Mobile", ["Progressive Web Apps", "React Native", "Web push notifications"]],
  ["Data", ["PostgreSQL", "MongoDB", "Prisma", "SQLite", "Excel import / export"]],
  ["Cloud", ["Vercel", "Render", "Supabase", "Cloudflare", "AWS"]],
  ["Integrations", ["Razorpay", "WhatsApp", "Email (Resend)", "Google APIs", "PDF & print"]],
  ["AI", ["Claude & OpenAI APIs", "Document extraction", "Chat assistants", "Workflow automation"]],
  ["Quality", ["Git & code review", "Automated tests", "CI/CD pipelines", "Uptime & error monitoring"]],
];
