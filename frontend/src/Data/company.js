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
    blurb: "Fees, attendance, examinations, transport, certificates and parent access for K-12 schools, with portals for eight roles. ₹150 per student per year.",
    status: "In production, with a 30-day free trial",
  },
  {
    slug: "jms",
    name: "Infovion JMS",
    short: "Jewellery management software",
    to: "/jewellery-management-software",
    blurb: "Billing by weight and purity, barcode tags, girvi, gold savings schemes, orders and karigar, repairs, GSTR-1 and GSTR-3B, branches and Tally export, in 10 Indian languages, for jewellery shops in India and abroad.",
    status: "Available to every jewellery shop, with a 30-day free trial",
  },
];

// Infovion JMS runs as its own web app; the website links to sign-up and the demo there.
// Set live to true once https://jms.infovion.in is deployed: until then the trial buttons go to
// the contact form and the demo link is hidden.
export const JMS = {
  live: true,
  app: "https://jms.infovion.in",
  api: "https://jms-api.infovion.in",
  signup: "https://jms.infovion.in/signup",
  demo: "https://jms.infovion.in/demo",
  login: "https://jms.infovion.in/login",
  price: 9999, // ₹ per shop per year, plus GST
  trialDays: 30,
};

/** [href, label] for the JMS free-trial button. */
export const jmsTrial = () => (JMS.live ? [JMS.signup, "Start free trial"] : ["/contact?interest=jms", "Request a free trial"]);

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
