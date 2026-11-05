export const CATEGORY_LABEL = {
  development: "Software development",
  outsourcing: "Outsourcing to India",
  healthcare: "Healthcare IT",
  jewellery: "Jewellery business",
  government: "Government IT",
  attendance: "Attendance",
  fees: "Fees",
  portals: "Portals",
  admissions: "Admissions",
  operations: "Running a school",
  technology: "Technology",
  company: "Infovion",
};

// Who an article is for decides the call to action under it
const AUDIENCE = { development: "business", outsourcing: "offshore", healthcare: "healthcare", government: "government", jewellery: "jms" };
export const audienceOf = (category) => AUDIENCE[category] ?? "school";

export const CTA = {
  school: { title: "See it working in your own school", body: "Infovion School ERP's free trial opens with sample data in two minutes. No card, no contract.", to: "/free-trial", label: "Start your free trial" },
  jms: { title: "Billing, tags, girvi, gold schemes and karigar in one place", body: "Infovion JMS runs the whole jewellery shop, in 10 Indian languages. See it on a free 15-minute demo call, in your language.", to: "/jewellery-management-software", label: "See Infovion JMS" },
  business: { title: "Planning a software project?", body: "Tell us what you want to build — you'll get a clear plan and a fixed quote, usually within 48 hours.", to: "/contact", label: "Get a free quote" },
  offshore: { title: "Outsourcing to India?", body: "Developers from $12 an hour or $900 a month, a fixed price in writing, your code and IP. WhatsApp +91 93091 93613 from any country.", to: "/services/offshore-software-development-india", label: "See prices and how it works" },
  healthcare: { title: "Improving a hospital application?", body: "Start with an audit of accessibility, DPDP readiness and security, then fix what matters most. We reply within one business day.", to: "/healthcare-software-development", label: "Healthcare software services" },
  government: { title: "Planning a portal, app or dashboard?", body: "Share your requirement or tender reference — we respond with an approach note and our documents.", to: "/contact?interest=government", label: "Discuss a requirement" },
};
