// Which product a URL belongs to — drives the product sub-navigation, CTAs and WhatsApp message.
const SCHOOL = [
  "/school-management-software", "/free-trial", "/free-tools", "/videos",
  "/school-management-software-maharashtra", "/fee-management-software-for-schools", "/school-attendance-app", "/school-transport-management-software",
];
const JMS = ["/jewellery-management-software", "/jewellery-billing-software", "/jewellery-barcode-software", "/girvi-software", "/jewellery-software-uae", "/money-lending-software", "/jewellery-software-with-tally"];

const under = (path, bases) => bases.some((b) => path === b || path.startsWith(`${b}/`));

/** "school" | "jms" | null */
export function productOf(pathname) {
  const p = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (under(p, SCHOOL)) return "school";
  if (under(p, JMS)) return "jms";
  return null;
}
