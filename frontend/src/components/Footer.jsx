import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import PreferredSourceBadge from "./PreferredSourceBadge";
import ProductHuntBadge from "./ProductHuntBadge";
import { SERVICES } from "../Data/services";
import { COMPANY, fullAddress } from "../Data/company";
import { productOf } from "../lib/sections";

const logo = "/logo-112.webp";

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
  school: ["Try Infovion School ERP with your own school", "30 days free · No card needed · Set up the same day", ["/free-trial", "Start your free trial"]],
  jms: ["See Infovion JMS with your own items", "Free demo · Online or at your store in Pune", ["/contact?interest=jms", "Book a free demo"]],
  company: ["Have a software project in mind?", "Free consultation · Fixed quote in about 48 hours · You own the code", ["/contact", "Get a free quote"]],
};
const NO_STRIP = ["/", "/free-trial", "/contact", "/company-profile"];

function Col({ id, title, links }) {
  return (
    <nav aria-labelledby={id}>
      <h2 id={id} className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-slate-300">{title}</h2>
      <ul className="space-y-2.5">
        {links.map(([to, label, strong]) => (
          <li key={to}>
            <Link to={to} className={`text-sm transition-colors hover:text-brand-accent ${strong ? "font-semibold text-white" : "text-slate-400"}`}>{label}</Link>
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
    <footer className="bg-brand-darker print:hidden">
      {strip && (
        <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0D9488 0%, #1E293B 100%)" }}>
          <div className="pointer-events-none absolute inset-0 dot-grid-dark opacity-20" />
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-8 sm:flex-row">
            <div>
              <p className="text-lg font-bold text-white">{strip[0]}</p>
              <p className="mt-0.5 text-sm text-brand-cream/80">{strip[1]}</p>
            </div>
            <Link to={strip[2][0]} className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-terra2 shadow-lg shadow-black/20 transition-colors hover:bg-brand-cream">
              {strip[2][1]} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_0.9fr]">
          <div>
            <Link to="/" className="mb-5 flex items-center gap-3">
              <img src={logo} alt="" width="44" height="44" loading="lazy" className="h-11 w-auto" />
              <span className="flex flex-col leading-none">
                <span className="text-xl font-extrabold tracking-tight text-white">Info<span className="text-brand-accent">vion</span></span>
                <span className="mt-1 text-[9px] uppercase tracking-[0.24em] text-slate-400">Technologies</span>
              </span>
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-slate-300">
              Software development company in Pune, India — custom software, web and mobile apps, ERP, SaaS and AI automation,
              and the makers of Infovion School ERP and Infovion JMS.
            </p>
            <address className="space-y-2.5 not-italic">
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-brand-accent"><Mail className="h-4 w-4 flex-shrink-0 text-teal-300" />{COMPANY.email}</a>
              <a href={COMPANY.phoneHref} className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-brand-accent"><Phone className="h-4 w-4 flex-shrink-0 text-teal-300" />{COMPANY.phone}</a>
              <p className="flex items-start gap-2.5 text-sm text-slate-400"><MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-300" />{fullAddress()}</p>
            </address>
            <div className="mt-6 flex gap-2.5">
              {SOCIAL.map(([href, label, I]) => (
                <a key={label} href={href} aria-label={`Infovion on ${label}`} target="_blank" rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-brown/40 text-slate-300 transition-colors hover:bg-brand-terra/25 hover:text-brand-accent">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-brand-brown/40 bg-white/[0.04] px-3.5 py-3">
              <img src="/msme-logo.webp" width="60" height="40" loading="lazy" alt="MSME — Ministry of Micro, Small & Medium Enterprises, Government of India" className="h-10 w-auto flex-shrink-0 rounded-lg bg-white p-1" />
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
              <ProductHuntBadge from="footer" />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-brand-brown/30 pt-6 text-sm text-slate-400 sm:flex-row">
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
