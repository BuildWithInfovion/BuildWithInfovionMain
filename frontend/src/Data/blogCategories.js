export const CATEGORY_LABEL = {
  development: "Software development",
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
const AUDIENCE = { development: "business", government: "government", jewellery: "jms" };
export const audienceOf = (category) => AUDIENCE[category] ?? "school";

export const CTA = {
  school: { title: "See it working in your own school", body: "Infovion School ERP's free trial opens with sample data in two minutes. No card, no contract.", to: "/free-trial", label: "Start your free trial" },
  jms: { title: "Billing, barcode tags, girvi and Tally export in one place", body: "Try Infovion JMS free for 30 days, or open the demo shop to look around.", to: "/jewellery-management-software", label: "See Infovion JMS" },
  business: { title: "Planning a software project?", body: "Tell us what you want to build — you'll get a clear plan and a fixed quote, usually within 48 hours.", to: "/contact", label: "Get a free quote" },
  government: { title: "Planning a portal, app or dashboard?", body: "Share your requirement or tender reference — we respond with an approach note and our documents.", to: "/contact?interest=government", label: "Discuss a requirement" },
};
