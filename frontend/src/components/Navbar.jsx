import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { ArrowRight, ChevronDown, Gem, GraduationCap, Landmark, Sparkles } from "lucide-react";
import { SERVICES } from "../Data/services";
import { COMPANY, PRODUCTS } from "../Data/company";
import { productOf } from "../lib/sections";
import { Icon } from "./site/Ui";

const logo = "/logo-112.webp";

// Pages that still have a light top: the bar must be solid there
const LIGHT_PAGES = ["/privacy-policy", "/terms-of-service"];

const COMPANY_LINKS = [
  ["/about", "About us", "Who we are and how we work"],
  ["/how-we-work", "How we work", "Process, engagement models, guarantees"],
  ["/case-studies", "Case studies", "Software we built and run"],
  ["/government", "Government", "E-governance & public sector"],
  ["/company-profile", "Company profile", "Printable, for tenders & vendors"],
  ["/blog", "Blog & guides", "Practical articles and how-tos"],
  ["/contact", "Contact", "Get a free quote"],
];

// Second bar shown inside each product's pages
const SUBNAV = {
  school: {
    name: "Infovion School ERP", icon: GraduationCap, home: "/school-management-software",
    links: [["/school-management-software", "Overview"], ["/school-management-software/features", "Features"], ["/school-management-software/portals", "Portals"], ["/school-management-software/pricing", "Pricing"], ["/free-tools", "Free tools"], ["/videos", "Videos"]],
    cta: ["/free-trial", "Start free trial"],
  },
  jms: {
    name: "Infovion JMS", icon: Gem, home: "/jewellery-management-software",
    links: [["/jewellery-management-software", "Overview"], ["/jewellery-billing-software", "Billing & GST"], ["/girvi-software", "Girvi"], ["/case-studies/jewellery-management-system", "Case study"]],
    cta: ["/contact?interest=jms", "Book a demo"],
  },
};

const MENUS = ["services", "products", "company"];

function Dropdown({ id, open, children, className = "" }) {
  return (
    <AnimatePresence>
      {open && (
        <Motion.div
          id={`menu-${id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.18 }}
          className={`absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 rounded-3xl border border-white/10 bg-[#0a0f1c]/[0.98] p-5 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl ${className}`}
        >
          {children}
        </Motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);
  const location = useLocation();
  const navRef = useRef(null);
  const closeTimer = useRef(null);

  const section = productOf(location.pathname);
  const sub = section ? SUBNAV[section] : null;
  const cta = sub ? sub.cta : ["/contact", "Get a free quote"];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => { setIsOpen(false); setMenu(null); }, [location.pathname]);

  // Close menus on Escape or a click outside
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setMenu(null); setIsOpen(false); } };
    const onClick = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setMenu(null); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, []);

  const onLight = LIGHT_PAGES.some((p) => location.pathname === p || location.pathname.startsWith(`${p}/`));
  const solid = isScrolled || onLight || !!menu;

  const hoverOpen = (m) => { clearTimeout(closeTimer.current); setMenu(m); };
  const hoverClose = () => { clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setMenu(null), 160); };

  const trigger = (m, label) => (
    <button
      type="button"
      aria-expanded={menu === m}
      aria-controls={`menu-${m}`}
      onClick={() => setMenu(menu === m ? null : m)}
      className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${menu === m ? "text-white" : "text-gray-300/90 hover:text-white"}`}
    >
      {label}
      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${menu === m ? "rotate-180" : ""}`} aria-hidden="true" />
    </button>
  );

  const navLink = (to, label) => (
    <NavLink to={to} className={({ isActive }) => `rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${isActive ? "text-brand-accent" : "text-gray-300/90 hover:text-white"}`}>
      {label}
    </NavLink>
  );

  return (
    <>
      <header
        ref={navRef}
        className="fixed left-0 right-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 print:hidden"
        style={{
          backgroundColor: onLight || menu ? "rgba(5,7,13,0.97)" : isScrolled ? "rgba(5,7,13,0.85)" : "rgba(5,7,13,0.35)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: solid ? "1px solid rgba(94,234,212,0.14)" : "1px solid transparent",
          boxShadow: solid ? "0 4px 32px rgba(0,0,0,0.28)" : "none",
        }}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="flex h-[72px] items-center justify-between gap-4">
            <Link to="/" className="group flex flex-shrink-0 items-center gap-3" aria-label="Infovion Technologies — home">
              <img src={logo} alt="" width="48" height="48" className="h-11 w-auto transition-transform group-hover:scale-105 sm:h-12" />
              <span className="flex flex-col leading-none">
                <span className="text-[21px] font-extrabold leading-none tracking-tight text-white">Info<span className="text-brand-accent">vion</span></span>
                <span className="mt-1 text-[9px] uppercase tracking-[0.24em] text-slate-400">Technologies</span>
              </span>
            </Link>

            <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
              <div className="relative" onMouseEnter={() => hoverOpen("services")} onMouseLeave={hoverClose}>
                {trigger("services", "Services")}
                <Dropdown id="services" open={menu === "services"} className="w-[760px]">
                  <div className="grid grid-cols-2 gap-1">
                    {SERVICES.map((s) => (
                      <Link key={s.slug} to={`/services/${s.slug}`} className="group flex gap-3 rounded-2xl p-3 transition-colors hover:bg-white/[0.05] focus-visible:bg-white/[0.05]">
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300"><Icon name={s.icon} className="h-4 w-4" /></span>
                        <span>
                          <span className="block text-sm font-semibold text-white group-hover:text-teal-200">{s.name}</span>
                          <span className="mt-0.5 line-clamp-1 block text-xs text-slate-400">{s.card}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-white/[0.07] pt-4">
                    <Link to="/government" className="inline-flex items-center gap-2 text-sm font-semibold text-amber-200 hover:text-amber-100"><Landmark className="h-4 w-4" /> Government & e-governance</Link>
                    <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300 hover:text-teal-200">All services <ArrowRight className="h-4 w-4" /></Link>
                  </div>
                </Dropdown>
              </div>

              <div className="relative" onMouseEnter={() => hoverOpen("products")} onMouseLeave={hoverClose}>
                {trigger("products", "Products")}
                <Dropdown id="products" open={menu === "products"} className="w-[460px]">
                  <div className="space-y-1">
                    {PRODUCTS.map((p) => {
                      const I = p.slug === "school" ? GraduationCap : Gem;
                      return (
                        <Link key={p.slug} to={p.to} className="group flex gap-4 rounded-2xl p-3.5 transition-colors hover:bg-white/[0.05]">
                          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-300"><I className="h-5 w-5" /></span>
                          <span>
                            <span className="block font-semibold text-white group-hover:text-teal-200">{p.name}</span>
                            <span className="block text-xs uppercase tracking-[0.14em] text-slate-500">{p.short}</span>
                            <span className="mt-1 block text-xs leading-relaxed text-slate-400">{p.status}</span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="mt-3 border-t border-white/[0.07] pt-3">
                    <Link to="/products" className="inline-flex items-center gap-1.5 px-3 text-sm font-semibold text-teal-300 hover:text-teal-200">All products <ArrowRight className="h-4 w-4" /></Link>
                  </div>
                </Dropdown>
              </div>

              {navLink("/industries", "Industries")}
              {navLink("/case-studies", "Work")}

              <div className="relative" onMouseEnter={() => hoverOpen("company")} onMouseLeave={hoverClose}>
                {trigger("company", "Company")}
                <Dropdown id="company" open={menu === "company"} className="w-[340px]">
                  {COMPANY_LINKS.map(([to, t, d]) => (
                    <Link key={to} to={to} className="block rounded-2xl px-3.5 py-2.5 transition-colors hover:bg-white/[0.05]">
                      <span className="block text-sm font-semibold text-white">{t}</span>
                      <span className="block text-xs text-slate-400">{d}</span>
                    </Link>
                  ))}
                </Dropdown>
              </div>
            </nav>

            <div className="flex items-center gap-2">
              <Link to={cta[0]} className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 px-5 py-2.5 text-sm font-bold text-[#04121a] shadow-[0_0_30px_-6px_rgba(45,212,191,0.8)] transition hover:brightness-110 sm:inline-flex">
                <Sparkles className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                {cta[1]}
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-50 rounded-lg p-2.5 transition-colors hover:bg-white/10 lg:hidden"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <span className="flex w-6 flex-col gap-[5px]" aria-hidden="true">
                  <span className={`block h-[2px] w-full rounded-full bg-white transition-transform duration-200 ${isOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                  <span className={`block h-[2px] w-full rounded-full bg-white transition-opacity duration-200 ${isOpen ? "opacity-0" : ""}`} />
                  <span className={`block h-[2px] w-full rounded-full bg-white transition-transform duration-200 ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
                </span>
              </button>
            </div>
          </div>
        </div>

        {sub && (
          <div className="border-t border-white/[0.06] bg-[#05070d]/70">
            <div className="mx-auto flex h-10 max-w-7xl items-center gap-4 px-5 sm:px-6">
              <Link to={sub.home} className="flex flex-shrink-0 items-center gap-2 text-xs font-bold text-white">
                <sub.icon className="h-4 w-4 text-teal-300" aria-hidden="true" /> <span className="hidden sm:inline">{sub.name}</span>
              </Link>
              <nav aria-label={`${sub.name} pages`} className="no-scrollbar flex flex-1 items-center gap-1 overflow-x-auto">
                {sub.links.map(([to, label]) => (
                  <NavLink key={to} to={to} end className={({ isActive }) => `whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition-colors ${isActive ? "bg-teal-400/10 text-teal-200" : "text-slate-300 hover:text-white"}`}>{label}</NavLink>
                ))}
              </nav>
              <Link to={sub.cta[0]} className="hidden flex-shrink-0 text-xs font-semibold text-teal-300 hover:text-teal-200 md:inline">{sub.cta[1]} →</Link>
            </div>
          </div>
        )}
      </header>

      <AnimatePresence>
        {isOpen && (
          <Motion.div
            id="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-[#070b14] lg:hidden"
          >
            <nav aria-label="Mobile" className="px-5 pb-16 pt-24">
              {MENUS.map((m) => (
                <div key={m} className="border-b border-white/[0.07]">
                  <button type="button" onClick={() => setMobileSection(mobileSection === m ? null : m)} aria-expanded={mobileSection === m}
                    className="flex w-full items-center justify-between py-4 text-left font-display text-xl font-extrabold capitalize text-white">
                    {m}
                    <ChevronDown className={`h-5 w-5 text-teal-300 transition-transform ${mobileSection === m ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                  {mobileSection === m && (
                    <div className="space-y-1 pb-4">
                      {m === "services" && [...SERVICES.map((s) => [`/services/${s.slug}`, s.name]), ["/government", "Government & e-governance"], ["/services", "All services →"]].map(([to, t]) => (
                        <Link key={to} to={to} className="block rounded-xl px-3 py-2.5 text-[15px] text-slate-200 active:bg-white/10">{t}</Link>
                      ))}
                      {m === "products" && [...PRODUCTS.map((p) => [p.to, `${p.name} — ${p.short}`]), ["/products", "All products →"]].map(([to, t]) => (
                        <Link key={to} to={to} className="block rounded-xl px-3 py-2.5 text-[15px] text-slate-200 active:bg-white/10">{t}</Link>
                      ))}
                      {m === "company" && COMPANY_LINKS.map(([to, t]) => (
                        <Link key={to} to={to} className="block rounded-xl px-3 py-2.5 text-[15px] text-slate-200 active:bg-white/10">{t}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {[["/industries", "Industries"], ["/case-studies", "Work"]].map(([to, t]) => (
                <Link key={to} to={to} className="block border-b border-white/[0.07] py-4 font-display text-xl font-extrabold text-white">{t}</Link>
              ))}
              <div className="mt-8 flex flex-col gap-3">
                <Link to={cta[0]} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 px-8 py-4 text-base font-bold text-[#04121a]">
                  <Sparkles className="h-5 w-5" aria-hidden="true" /> {cta[1]}
                </Link>
                <a href={COMPANY.phoneHref} className="text-center text-sm font-semibold text-slate-300">Call {COMPANY.phone}</a>
              </div>
            </nav>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
