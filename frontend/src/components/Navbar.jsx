import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import logo from "/src/assets/logo.png";

const navLinks = [
  { to: "/",          label: "Home" },
  { to: "/features",  label: "Features" },
  { to: "/portals",   label: "Portals" },
  { to: "/for-schools", label: "For Schools" },
  { to: "/pricing",   label: "Pricing" },
  { to: "/blog",      label: "Blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen]       = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  return (
    <>
      <Motion.header
        className="fixed top-0 left-0 right-0 z-50"
        animate={{
          backgroundColor: isScrolled
            ? "rgba(44, 42, 39, 0.97)"
            : "rgba(44, 42, 39, 0.82)",
        }}
        transition={{ duration: 0.35 }}
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: isScrolled
            ? "1px solid rgba(209, 171, 131, 0.14)"
            : "1px solid transparent",
          boxShadow: isScrolled
            ? "0 4px 32px rgba(0,0,0,0.28)"
            : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 flex-shrink-0 group">
              <Motion.img
                src={logo}
                alt="Infovion"
                className="h-12 w-auto"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.25 }}
              />
              <div className="flex flex-col leading-none">
                <span className="text-[22px] font-extrabold text-white tracking-tight leading-none">
                  Info<span className="text-brand-accent">vion</span>
                </span>
                <span className="text-[9px] text-brand-neutral/70 tracking-[0.2em] uppercase mt-0.5">
                  School Management
                </span>
              </div>
            </NavLink>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 z-10 ${
                      isActive
                        ? "text-brand-accent"
                        : "text-gray-300/90 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <Motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-brand-accent/12 rounded-full -z-10"
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                      )}
                      {link.label}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              {/* Demo CTA — desktop */}
              <Motion.div
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="hidden lg:block"
              >
                <Link
                  to="/contact"
                  className="relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-full overflow-hidden group"
                  style={{
                    background: "linear-gradient(135deg, #BE6D56 0%, #A85D48 100%)",
                    boxShadow: "0 4px 18px rgba(190,109,86,0.38), inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}
                >
                  {/* Shine sweep on hover */}
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"
                  />
                  <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                  Free Demo
                </Link>
              </Motion.div>

              {/* Hamburger */}
              <Motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 lg:hidden z-50 relative rounded-lg hover:bg-white/8 transition-colors"
                aria-label="Toggle menu"
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-6 flex flex-col gap-[5px]">
                  <Motion.span
                    className="block h-[2px] w-full bg-white rounded-full"
                    animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }}
                    transition={{ duration: 0.22 }}
                  />
                  <Motion.span
                    className="block h-[2px] w-full bg-white rounded-full"
                    animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.18 }}
                  />
                  <Motion.span
                    className="block h-[2px] w-full bg-white rounded-full"
                    animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }}
                    transition={{ duration: 0.22 }}
                  />
                </div>
              </Motion.button>
            </div>
          </div>
        </div>
      </Motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.32, ease: [0.33, 1, 0.68, 1] }}
            className="lg:hidden fixed inset-0 z-40"
            style={{ background: "linear-gradient(145deg, #2C2A27 0%, #4A3835 100%)" }}
          >
            {/* BG orb */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(190,109,86,0.14)" }} />
            <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(209,171,131,0.08)" }} />
            <div className="absolute inset-0 dot-grid-dark opacity-30" />

            <Motion.nav
              variants={{
                open:   { transition: { staggerChildren: 0.07, delayChildren: 0.14 } },
                closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              }}
              initial="closed"
              animate="open"
              exit="closed"
              className="h-full flex flex-col items-center justify-center gap-4 relative z-10"
            >
              {navLinks.map((link) => (
                <Motion.div
                  key={link.to}
                  variants={{ open: { y: 0, opacity: 1 }, closed: { y: 20, opacity: 0 } }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      `text-3xl font-extrabold tracking-tight transition-colors ${
                        isActive ? "text-brand-accent" : "text-white/80 hover:text-white"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </Motion.div>
              ))}

              <Motion.div
                variants={{ open: { y: 0, opacity: 1 }, closed: { y: 20, opacity: 0 } }}
                className="mt-8"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-white rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #BE6D56 0%, #A85D48 100%)",
                    boxShadow: "0 8px 32px rgba(190,109,86,0.4)",
                  }}
                >
                  <Sparkles className="w-5 h-5" />
                  Book a Free Demo
                </Link>
              </Motion.div>

              <Motion.p
                variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
                className="text-brand-neutral/50 text-xs mt-4"
              >
                infovion2025@gmail.com
              </Motion.p>
            </Motion.nav>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
