import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import PreferredSourceBadge from "./PreferredSourceBadge";
import { SERVICES } from "../Data/services";
import { COMPANY, fullAddress } from "../Data/company";
import { productOf } from "../lib/sections";


const PRODUCT_LINKS = [
  ["/school-management-software", "Infovion School ERP", true],
  ["/school-management-software/features", "Features"],
  ["/school-management-software/pricing", "Pricing"],
  ["/free-trial", "Free trial"],
  ["/free-tools", "Free certificate tools"],
  ["/school-management-software-maharashtra", "For Maharashtra schools"],
  ["/fee-management-software-for-schools", "Fee management"],
  ["/school-attendance-app", "Attendance app"],
  ["/school-transport-management-software", "School transport"],
  ["/jewellery-management-software", "Infovion JMS", true],
  ["/jewellery-billing-software", "Jewellery billing software"],
  ["/girvi-software", "Girvi software"],
];

const COMPANY_LINKS = [
  ["/about", "About us"],
  ["/how-we-work", "How we work"],
  ["/case-studies", "Case studies"],
  ["/industries", "Industries"],
  ["/government", "Government"],
  ["/company-profile", "Company profile"],
  ["/blog", "Blog"],
  ["/videos", "Videos"],
  ["/contact", "Contact"],
];

const SOCIAL = [
  [COMPANY.socials.linkedin, "LinkedIn", Linkedin],
  [COMPANY.socials.instagram, "Instagram", Instagram],
  [COMPANY.socials.facebook, "Facebook", Facebook],
  [COMPANY.socials.youtube, "YouTube", Youtube],
];

// The call to action above the footer depends on which part of the site the visitor is in
const STRIPS = {
  school: ["Evaluate Infovion School ERP with your school's data", "30-day free trial. No payment details required.", ["/free-trial", "Start free trial"]],
  jms: ["See Infovion JMS with your own products and rates", "Demonstrations online or at your store in Pune.", ["/contact?interest=jms", "Book a demo"]],
  company: ["Planning a software project?", "Share your requirements. We respond within one business day.", ["/contact", "Contact us"]],
};
const NO_STRIP = ["/", "/free-trial", "/contact", "/company-profile"];

function Col({ id, title, links }) {
  return (
    <nav aria-labelledby={id}>
      <h2 id={id} className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{title}</h2>
      <ul className="space-y-2.5">
        {links.map(([to, label, strong]) => (
          <li key={to}>
            <Link to={to} className={`text-sm transition-colors hover:text-white ${strong ? "font-semibold text-slate-200" : "text-slate-400"}`}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  const { pathname } = useLocation();
  const path = pathname.replace(/(.)\/+$/, "$1");
  const strip = NO_STRIP.includes(path) || path.startsWith("/services/") ? null : STRIPS[productOf(path) ?? "company"];
  return (
    <footer className="border-t border-white/10 bg-[#020409]/95 print:hidden">
      {strip && (
        <div className="border-b border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-6 py-8 sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-lg font-semibold text-white">{strip[0]}</p>
              <p className="mt-1 text-sm text-slate-400">{strip[1]}</p>
            </div>
            <Link to={strip[2][0]} className="inline-flex flex-shrink-0 items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-[#020409] transition-colors hover:bg-sky-100">
              {strip[2][1]} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_0.9fr]">
          <div>
            <Link to="/" className="mb-6 inline-block" aria-label="Infovion Technologies, home">
              <img src="/brand/infovion-logo.webp" alt="Infovion" width="342" height="261" loading="lazy" className="h-20 w-auto" />
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-slate-400">
              Infovion Technologies is a software development company in Pune, India. We build custom software, web and mobile
              applications, ERP and SaaS platforms, and develop Infovion School ERP and Infovion JMS.
            </p>
            <address className="space-y-2.5 not-italic">
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-white"><Mail className="h-4 w-4 flex-shrink-0 text-teal-300" />{COMPANY.email}</a>
              <a href={COMPANY.phoneHref} className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-white"><Phone className="h-4 w-4 flex-shrink-0 text-teal-300" />{COMPANY.phone}</a>
              <p className="flex items-start gap-2.5 text-sm text-slate-400"><MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-300" />{fullAddress()}</p>
            </address>
            <div className="mt-6 flex gap-2.5">
              {SOCIAL.map(([href, label, I]) => (
                <a key={label} href={href} aria-label={`Infovion on ${label}`} target="_blank" rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-slate-300 transition-colors hover:border-white/30 hover:text-white">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-md border border-white/10 px-3.5 py-3">
              <img src="/msme-logo.webp" width="60" height="40" loading="lazy" alt="MSME, Ministry of Micro, Small & Medium Enterprises, Government of India" className="h-10 w-auto flex-shrink-0 rounded-lg bg-white p-1" />
              <div>
                <p className="text-xs font-semibold text-white/85">MSME registered</p>
                <p className="mt-0.5 font-mono text-[10px] text-slate-400">{COMPANY.udyam}</p>
              </div>
            </div>
          </div>

          <Col id="footer-services" title="Services" links={[...SERVICES.map((s) => [`/services/${s.slug}`, s.name]), ["/government", "E-governance"]]} />
          <Col id="footer-products" title="Products" links={PRODUCT_LINKS} />
          <div className="space-y-8">
            <Col id="footer-company" title="Company" links={COMPANY_LINKS} />
            <div className="space-y-3">
              <PreferredSourceBadge from="footer" />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-white">Privacy</Link>
            <Link to="/terms-of-service" className="hover:text-white">Terms</Link>
            <a href="/sitemap.xml" className="hover:text-white">Sitemap</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
