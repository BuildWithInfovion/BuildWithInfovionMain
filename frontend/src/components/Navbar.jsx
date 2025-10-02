import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import logo from "/src/assets/logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  return (
    <>
      {/* --- Main Header Container --- */}
      <Motion.header
        className={`fixed top-0 left-0 right-0 z-50`}
        animate={{
          backgroundColor: isScrolled
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(255, 255, 255, 0)",
        }}
        transition={{ duration: 0.3 }}
        style={{
          backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
          borderBottom: isScrolled
            ? "1px solid rgba(230, 230, 230, 0.5)"
            : "1px solid rgba(230, 230, 230, 0)",
        }}
        // Apply dark mode styles directly for better transition handling
        data-theme={isScrolled ? "scrolled" : "top"}
      >
        <style>{`
          [data-theme="scrolled"] {
            @apply dark:bg-gray-900/70 dark:border-gray-700/50;
          }
          [data-theme="top"] {
            @apply dark:bg-transparent dark:border-transparent;
          }
        `}</style>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* --- Logo and Brand Name (Always Visible) --- */}
            <NavLink
              to="/"
              className="group flex-shrink-0 flex items-center gap-3"
            >
              <Motion.img
                src={logo}
                alt="BuildWithInfovion Logo"
                className="h-10 w-auto"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors">
                Build<span className="text-blue-600">WithInfovion</span>
              </span>
            </NavLink>

            {/* --- Desktop Navigation (Hidden on Mobile) --- */}
            <nav className="hidden lg:flex items-center relative">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  // FIX: Increased text contrast for better visibility
                  className={`relative px-4 py-2 text-sm font-medium transition-colors z-10 ${
                    location.pathname === link.to
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {location.pathname === link.to && (
                    <Motion.div
                      layoutId="desktop-active-pill"
                      className="absolute inset-0 bg-white/70 dark:bg-gray-700/50 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* --- CTA and Mobile Toggle --- */}
            <div className="flex items-center gap-4">
              <Motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden lg:block"
              >
                <NavLink
                  to="/contact"
                  className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                >
                  Let's Talk
                </NavLink>
              </Motion.div>

              {/* Mobile Menu Button */}
              <Motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 z-50 lg:hidden"
                aria-label="Toggle Menu"
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <Motion.span
                    className="block h-0.5 w-full bg-gray-900 dark:bg-white"
                    animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 4.5 : 0 }}
                  />
                  <Motion.span
                    className="block h-0.5 w-full bg-gray-900 dark:bg-white my-1.5"
                    animate={{ opacity: isOpen ? 0 : 1 }}
                  />
                  <Motion.span
                    className="block h-0.5 w-full bg-gray-900 dark:bg-white"
                    animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -4.5 : 0 }}
                  />
                </div>
              </Motion.button>
            </div>
          </div>
        </div>
      </Motion.header>

      {/* --- MOBILE FULL-SCREEN MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-2xl"
          >
            <Motion.nav
              variants={{
                open: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.2 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
              initial="closed"
              animate="open"
              exit="closed"
              className="h-full flex flex-col items-center justify-center gap-4"
            >
              {navLinks.map((link) => (
                <Motion.div
                  key={link.to}
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: 20, opacity: 0 },
                  }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `text-3xl font-semibold transition-colors ${
                        isActive
                          ? "text-blue-600"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </Motion.div>
              ))}
              <Motion.div
                variants={{
                  open: { y: 0, opacity: 1 },
                  closed: { y: 20, opacity: 0 },
                }}
                className="mt-8"
              >
                <NavLink
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full shadow-lg"
                >
                  Let's Talk
                </NavLink>
              </Motion.div>
            </Motion.nav>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
