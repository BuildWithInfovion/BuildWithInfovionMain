import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import logo from "/src/assets/logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/portals", label: "Portals" },
  { to: "/for-schools", label: "For Schools" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
            ? "rgba(51, 49, 46, 0.96)"
            : "rgba(51, 49, 46, 0.85)",
        }}
        transition={{ duration: 0.3 }}
        style={{
          backdropFilter: "blur(20px)",
          borderBottom: isScrolled
            ? "1px solid rgba(209, 171, 131, 0.12)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">

            {/* Logo — bigger, more prominent */}
            <NavLink to="/" className="flex items-center gap-3 flex-shrink-0 group">
              <Motion.img
                src={logo}
                alt="Infovion Logo"
                className="h-14 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-bold text-white tracking-tight">
                  Info<span className="text-brand-accent">vion</span>
                </span>
                <span className="text-[10px] text-brand-neutral tracking-widest uppercase">
                  Academic ERP
                </span>
              </div>
            </NavLink>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-medium rounded-full transition-colors z-10 ${
                      isActive
                        ? "text-brand-accent"
                        : "text-gray-300 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <Motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-brand-accent/15 rounded-full -z-10"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
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
              <Motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="hidden lg:block"
              >
                <Link
                  to="/contact"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-brand-terra rounded-full shadow-lg shadow-brand-terra/30 hover:bg-[#a85d48] transition-colors"
                >
                  Request Demo
                </Link>
              </Motion.div>

              {/* Hamburger */}
              <Motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 lg:hidden z-50 relative"
                aria-label="Toggle menu"
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-6 flex flex-col gap-1.5">
                  <Motion.span
                    className="block h-0.5 w-full bg-white rounded-full"
                    animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                  <Motion.span
                    className="block h-0.5 w-full bg-white rounded-full"
                    animate={{ opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <Motion.span
                    className="block h-0.5 w-full bg-white rounded-full"
                    animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
                    transition={{ duration: 0.2 }}
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
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="lg:hidden fixed inset-0 z-40 bg-brand-dark"
          >
            {/* Subtle bg orb */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-brand-terra/10 blur-3xl pointer-events-none" />

            <Motion.nav
              variants={{
                open:   { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
              }}
              initial="closed"
              animate="open"
              exit="closed"
              className="h-full flex flex-col items-center justify-center gap-5"
            >
              {navLinks.map((link) => (
                <Motion.div
                  key={link.to}
                  variants={{ open: { y: 0, opacity: 1 }, closed: { y: 24, opacity: 0 } }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      `text-3xl font-bold transition-colors ${
                        isActive ? "text-brand-accent" : "text-white/80 hover:text-white"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </Motion.div>
              ))}
              <Motion.div
                variants={{ open: { y: 0, opacity: 1 }, closed: { y: 24, opacity: 0 } }}
                className="mt-6"
              >
                <Link
                  to="/contact"
                  className="px-8 py-4 text-lg font-bold text-white bg-brand-terra rounded-full shadow-lg"
                >
                  Request Demo
                </Link>
              </Motion.div>
            </Motion.nav>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
