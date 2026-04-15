import React from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Instagram, Linkedin, Twitter, Mail, MapPin } from "lucide-react";
import logo from "/src/assets/logo.png";

const productLinks = [
  { to: "/features",    label: "Features" },
  { to: "/portals",     label: "Role Portals" },
  { to: "/for-schools", label: "For Schools" },
  { to: "/pricing",     label: "Pricing" },
];

const companyLinks = [
  { to: "/about",             label: "About" },
  { to: "/blog",              label: "Blog" },
  { to: "/contact",           label: "Contact" },
  { to: "/privacy-policy",    label: "Privacy Policy" },
  { to: "/terms-of-service",  label: "Terms of Service" },
];

const socialLinks = [
  { href: "https://www.linkedin.com/company/112026919/", label: "LinkedIn",    icon: <Linkedin /> },
  { href: "#",                                           label: "Twitter (X)", icon: <Twitter /> },
  { href: "#",                                           label: "Instagram",   icon: <Instagram /> },
];

const FooterLink = ({ to, label }) => (
  <li>
    <Motion.div whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>
      <Link
        to={to}
        className="text-sm text-brand-neutral hover:text-brand-accent transition-colors"
      >
        {label}
      </Link>
    </Motion.div>
  </li>
);

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-brand-brown/40">
      {/* CTA strip */}
      <div className="bg-brand-terra/10 border-b border-brand-terra/20">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-white">Ready to modernize your school?</p>
            <p className="text-sm text-brand-neutral mt-0.5">Free demo · No setup fee · No contract</p>
          </div>
          <Motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-brand-terra text-white px-6 py-3 rounded-full font-semibold text-sm shadow-lg shadow-brand-terra/25 hover:bg-[#a85d48] transition-colors flex-shrink-0"
            >
              Schedule a Free Demo →
            </Link>
          </Motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img src={logo} alt="Infovion Logo" className="h-12 w-auto" />
              <div className="flex flex-col leading-none">
                <span className="text-xl font-bold text-white">
                  Info<span className="text-brand-accent">vion</span>
                </span>
                <span className="text-[10px] text-brand-neutral tracking-widest uppercase">
                  Academic ERP
                </span>
              </div>
            </Link>
            <p className="text-sm text-brand-neutral leading-relaxed mb-5">
              Cloud-based school management ERP for K-12 schools in India.
              Built ground-up for Indian school operations.
            </p>
            <div className="space-y-2">
              <a
                href="mailto:infovion2025@gmail.com"
                className="flex items-center gap-2 text-sm text-brand-neutral hover:text-brand-accent transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                infovion2025@gmail.com
              </a>
              <div className="flex items-center gap-2 text-sm text-brand-neutral">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                Pune, Maharashtra, India
              </div>
            </div>
          </div>

          {/* Product */}
          <nav aria-labelledby="footer-product">
            <h4 id="footer-product" className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Product
            </h4>
            <ul className="space-y-3">
              {productLinks.map((l) => <FooterLink key={l.to} {...l} />)}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-labelledby="footer-company">
            <h4 id="footer-company" className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((l) => <FooterLink key={l.to} {...l} />)}
            </ul>
          </nav>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Follow Us
            </h4>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((link) => (
                <Motion.a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-neutral hover:text-brand-accent transition-colors"
                  whileHover={{ scale: 1.2, y: -2 }}
                >
                  {React.cloneElement(link.icon, { className: "w-5 h-5", "aria-hidden": "true" })}
                </Motion.a>
              ))}
            </div>
            {/* Board badges */}
            <div className="space-y-2">
              <p className="text-xs text-brand-neutral uppercase tracking-wider">Compatible with</p>
              <div className="flex flex-wrap gap-2">
                {["CBSE", "ICSE", "State Board"].map((b) => (
                  <span key={b} className="text-xs px-2.5 py-1 rounded-full border border-brand-brown text-brand-neutral">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-brand-brown/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-brand-neutral/60">
            © {new Date().getFullYear()} Infovion Technologies. All rights reserved.
          </p>
          <p className="text-sm text-brand-neutral/60">
            Built for K-12 India · K–12 School Management ERP
          </p>
        </div>
      </div>
    </footer>
  );
}
