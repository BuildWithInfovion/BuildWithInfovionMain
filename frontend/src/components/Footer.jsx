import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Facebook, Instagram, Youtube, Linkedin, Mail, MapPin, ArrowUpRight, Phone } from "lucide-react";
import PreferredSourceBadge from "./PreferredSourceBadge";
const logo = "/logo-112.webp";

const productLinks = [
  { to: "/features",    label: "Features" },
  { to: "/portals",     label: "Role Portals" },
  { to: "/for-schools", label: "For Schools" },
  { to: "/pricing",     label: "Pricing" },
  { to: "/free-trial",  label: "Free trial" },
  { to: "/free-tools/school-leaving-certificate-marathi", label: "Leaving Certificate (Marathi)" },
  { to: "/free-tools/transfer-certificate", label: "TC generator" },
  { to: "/free-tools/bonafide-certificate", label: "Bonafide generator" },
];

const companyLinks = [
  { to: "/about",            label: "About Us" },
  { to: "/blog",             label: "Blog" },
  { to: "/contact",          label: "Contact" },
  { to: "/school-management-software-maharashtra", label: "For Maharashtra schools" },
  { to: "/fee-management-software-for-schools", label: "Fee management" },
  { to: "/school-attendance-app", label: "Attendance app" },
  { to: "/school-transport-management-software", label: "School transport" },
  { to: "/privacy-policy",   label: "Privacy Policy" },
  { to: "/terms-of-service", label: "Terms of Service" },
];

const socialLinks = [
  { href: "https://www.linkedin.com/company/112026919/", label: "LinkedIn",    icon: <Linkedin className="w-4 h-4" /> },
  { href: "https://www.instagram.com/infoviontech/", label: "Instagram", icon: <Instagram className="w-4 h-4" /> },
  { href: "https://www.facebook.com/profile.php?id=61595050592821", label: "Facebook", icon: <Facebook className="w-4 h-4" /> },
  { href: "https://www.youtube.com/@Infovion_tech", label: "YouTube", icon: <Youtube className="w-4 h-4" /> },
];

const FooterLink = ({ to, label }) => (
  <li>
    <Motion.div whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>
      <Link to={to} className="text-sm text-slate-300 hover:text-brand-accent transition-colors duration-200 flex items-center gap-1 group">
        <span className="w-3 h-px bg-brand-neutral/30 group-hover:bg-brand-accent/60 transition-colors duration-200 flex-shrink-0" />
        {label}
      </Link>
    </Motion.div>
  </li>
);

export default function Footer() {
  // The home and trial pages end with their own call to action
  const { pathname } = useLocation();
  const showStrip = !["/", "/free-trial"].includes(pathname.replace(/(.)\/+$/, "$1"));
  return (
    <footer className="bg-brand-darker">

      {/* ── CTA STRIP ──────────────────────────────────────────────────────── */}
      {showStrip && <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0D9488 0%, #1E293B 100%)" }}
      >
        <div className="absolute inset-0 dot-grid-dark opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(255,255,255,0.06)" }} />
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-5 relative z-10">
          <div>
            <p className="font-bold text-white text-lg">Try Infovion with your own school</p>
            <p className="text-brand-cream/70 text-sm mt-0.5">30 days free · No card needed · Set up the same day</p>
          </div>
          <Motion.div whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.96 }} className="flex-shrink-0">
            <Link
              to="/free-trial"
              className="inline-flex items-center gap-2 bg-white text-brand-terra px-6 py-3 rounded-full font-bold text-sm shadow-lg shadow-black/20 hover:bg-brand-cream transition-colors"
            >
              Start your free trial <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Motion.div>
        </div>
      </div>}

      {/* ── MAIN FOOTER ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-14">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <img src={logo} alt="Infovion" width="44" height="44" loading="lazy" className="h-11 w-auto group-hover:opacity-90 transition-opacity" />
              <div className="flex flex-col leading-none">
                <span className="text-xl font-extrabold text-white tracking-tight">
                  Info<span className="text-brand-accent">vion</span>
                </span>
                <span className="text-[9px] text-slate-400 tracking-[0.2em] uppercase mt-0.5">
                  School Management
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              The complete school management platform for K-12 schools in India.
              Built from the ground up for the way Indian schools actually work.
            </p>

            <div className="space-y-2.5">
              <a
                href="mailto:contact@buildwithinfovion.com"
                className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-brand-accent transition-colors group"
              >
                <span className="w-7 h-7 rounded-lg bg-brand-brown/30 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-terra/20 transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                </span>
                contact@buildwithinfovion.com
              </a>
              <div className="flex items-center gap-2.5 text-sm text-slate-300">
                <span className="w-7 h-7 rounded-lg bg-brand-brown/30 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </span>
                Pune, Maharashtra, India
              </div>
            </div>
          </div>

          {/* Product Links */}
          <nav aria-labelledby="footer-product">
            <h2 id="footer-product" className="text-xs font-bold text-slate-300 uppercase tracking-[0.18em] mb-6">
              Product
            </h2>
            <ul className="space-y-3">
              {productLinks.map((l) => <FooterLink key={l.to} {...l} />)}
            </ul>
          </nav>

          {/* Company Links */}
          <nav aria-labelledby="footer-company">
            <h2 id="footer-company" className="text-xs font-bold text-slate-300 uppercase tracking-[0.18em] mb-6">
              Company
            </h2>
            <ul className="space-y-3">
              {companyLinks.map((l) => <FooterLink key={l.to} {...l} />)}
            </ul>
          </nav>

          {/* Social + Boards */}
          <div>
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-[0.18em] mb-6">
              Follow Us
            </h2>
            <div className="flex gap-2.5 mb-8">
              {socialLinks.map((link) => (
                <Motion.a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-brand-brown/30 text-slate-300 hover:bg-brand-terra/25 hover:text-brand-accent flex items-center justify-center transition-all duration-200"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                >
                  {link.icon}
                </Motion.a>
              ))}
            </div>
            <PreferredSourceBadge from="footer" className="-mt-4 mb-8" />

            {/* Board compatibility */}
            <div className="space-y-3">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Supports</p>
              <div className="flex flex-wrap gap-2">
                {["CBSE", "ICSE", "State Board"].map((b) => (
                  <span key={b} className="text-xs px-3 py-1.5 rounded-full border border-brand-brown/60 text-slate-400 font-medium">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* MSME Certification */}
            <div className="mt-5 space-y-2.5">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Certified By</p>
              <div className="flex items-center gap-3 bg-white/[0.06] rounded-xl px-3.5 py-3 border border-brand-brown/30">
                <img
                  src="/msme-logo.webp"
                  width="60"
                  height="40"
                  loading="lazy"
                  alt="MSME Certified — Ministry of Micro, Small & Medium Enterprises, Government of India"
                  className="h-11 w-auto flex-shrink-0 rounded-lg bg-white p-1"
                />
                <div>
                  <p className="text-xs font-semibold text-white/80">MSME Certified</p>
                  <p className="text-[10px] text-slate-400 leading-snug mt-0.5">Ministry of MSME<br />Government of India</p>
                </div>
              </div>
            </div>

            {/* Quick contact */}
            <div className="mt-6 p-4 rounded-xl border border-brand-brown/40 bg-brand-brown/10">
              <p className="text-xs text-slate-400 mb-2 font-medium">Questions? Write to us</p>
              <a href="mailto:contact@buildwithinfovion.com" className="text-xs text-brand-accent/80 hover:text-brand-accent transition-colors">
                contact@buildwithinfovion.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-brand-brown/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Infovion Technologies. All rights reserved.
          </p>
          <p className="text-sm text-slate-400">
            School Management Software · Built for India · K-12
          </p>
        </div>
      </div>
    </footer>
  );
}
