// Which product a URL belongs to — drives the product sub-navigation, CTAs and WhatsApp message.
const SCHOOL = [
  "/school-management-software", "/free-trial", "/free-tools", "/videos",
  "/school-management-software-maharashtra", "/fee-management-software-for-schools", "/school-attendance-app", "/school-transport-management-software",
];
const JMS = ["/jewellery-management-software", "/jewellery-billing-software", "/jewellery-barcode-software", "/girvi-software", "/jewellery-software-uae", "/money-lending-software", "/jewellery-software-with-tally", "/gold-price-calculator", "/dubai-gold-price-calculator", "/girvi-interest-calculator", "/infovion-jms-features", "/gold-scheme-software", "/karigar-management-software", "/jewellery-gst-software", "/multi-branch-jewellery-software", "/offline-jewellery-billing-software", "/jewellery-software-in-indian-languages", "/jewellery-software-hindi", "/jewellery-software-marathi", "/jewellery-software-gujarati", "/jewellery-software-tamil", "/jewellery-software-telugu", "/jewellery-software-kannada", "/jewellery-software-malayalam", "/jewellery-software-bengali", "/jewellery-software-punjabi", "/jewellery-bill-formats", "/jewellery-bill-format", "/jewellery-estimate-format", "/girvi-receipt-format", "/old-gold-purchase-voucher-format", "/karigar-issue-slip-format", "/uae-jewellery-tax-invoice-format", "/gst-on-gold-jewellery", "/hsn-code-for-jewellery", "/gst-on-old-gold", "/uae-vat-on-gold", "/jewellery-software-comparison", "/tally-for-jewellers", "/vyapar-vs-infovion-jms", "/marg-vs-infovion-jms"];

const under = (path, bases) => bases.some((b) => path === b || path.startsWith(`${b}/`));

/** "school" | "jms" | null */
export function productOf(pathname) {
  const p = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (under(p, SCHOOL)) return "school";
  if (under(p, JMS)) return "jms";
  return null;
}
