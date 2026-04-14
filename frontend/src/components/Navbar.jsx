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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <Motion.header
        className="fixed top-0 left-0 right-0 z-50"
        animate={{
          backgroundColor: isScrolled
            ? "rgba(255,255,255,0.88)"
            : "rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.3 }}
        style={{
          backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
          borderBottom: isScrolled
            ? "1px solid rgba(226,232,240,0.7)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 flex-shrink-0">
              <Motion.img
                src={logo}
                alt="Infovion Logo"
                className="h-9 w-auto"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Info<span className="text-blue-600">vion</span>
              </span>
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
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <Motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-blue-50 dark:bg-blue-900/30 rounded-full -z-10"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
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
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden lg:block"
              >
                <Link
                  to="/contact"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-full shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors"
                >
                  Request Demo
                </Link>
              </Motion.div>

              <Motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 lg:hidden z-50 relative"
                aria-label="Toggle menu"
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-6 flex flex-col gap-1.5">
                  <Motion.span
                    className="block h-0.5 w-full bg-gray-900 dark:bg-white rounded-full"
                    animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                  <Motion.span
                    className="block h-0.5 w-full bg-gray-900 dark:bg-white rounded-full"
                    animate={{ opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <Motion.span
                    className="block h-0.5 w-full bg-gray-900 dark:bg-white rounded-full"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-40 bg-white/97 dark:bg-gray-950/97 backdrop-blur-2xl"
          >
            <Motion.nav
              variants={{
                open: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.1 },
                },
                closed: {
                  transition: {
                    staggerChildren: 0.05,
                    staggerDirection: -1,
                  },
                },
              }}
              initial="closed"
              animate="open"
              exit="closed"
              className="h-full flex flex-col items-center justify-center gap-6"
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
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      `text-3xl font-semibold transition-colors ${
                        isActive
                          ? "text-blue-600"
                          : "text-gray-700 dark:text-gray-300"
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
                className="mt-4"
              >
                <Link
                  to="/contact"
                  className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full shadow-xl"
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
