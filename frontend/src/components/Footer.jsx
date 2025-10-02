import React from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Instagram, Linkedin, Twitter, Github } from "lucide-react";
import logo from "/src/assets/logo.png"; // <-- 1. Import your logo

const Footer = () => {
  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  const legalLinks = [
    { to: "/privacy-policy", label: "Privacy Policy" },
    { to: "/terms-of-service", label: "Terms of Service" },
  ];

  const socialLinks = [
    { href: "#", label: "LinkedIn profile", icon: <Linkedin /> },
    { href: "#", label: "Twitter (X) profile", icon: <Twitter /> },
    { href: "#", label: "GitHub profile", icon: <Github /> },
    { href: "#", label: "Instagram profile", icon: <Instagram /> },
  ];

  return (
    <Motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Branding Section */}
          <section
            aria-labelledby="footer-branding"
            className="col-span-2 md:col-span-1"
          >
            {/* 2. Added the logo image here */}
            <div className="flex items-center gap-3 mb-2">
              <img
                src={logo}
                alt="BuildWithInfovion Logo"
                className="h-10 w-auto"
              />
              <h3
                id="footer-branding"
                className="text-xl font-bold text-gray-900 dark:text-white"
              >
                Build<span className="text-blue-600">WithInfovion</span>
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Building digital experiences that drive results.
            </p>
          </section>

          {/* Quick Links Navigation */}
          <nav aria-labelledby="footer-quick-links">
            <h4
              id="footer-quick-links"
              className="font-semibold text-lg text-gray-900 dark:text-white"
            >
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Motion.div whileHover={{ x: 4 }}>
                    <Link
                      to={link.to}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    >
                      {link.label}
                    </Link>
                  </Motion.div>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal Links Navigation */}
          <nav aria-labelledby="footer-legal-links">
            <h4
              id="footer-legal-links"
              className="font-semibold text-lg text-gray-900 dark:text-white"
            >
              Legal
            </h4>
            <ul className="mt-4 space-y-2">
              {legalLinks.map((link) => (
                <li key={link.to}>
                  <Motion.div whileHover={{ x: 4 }}>
                    <Link
                      to={link.to}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    >
                      {link.label}
                    </Link>
                  </Motion.div>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Media Section */}
          <section aria-labelledby="footer-follow">
            <h4
              id="footer-follow"
              className="font-semibold text-lg text-gray-900 dark:text-white"
            >
              Follow Us
            </h4>
            <div className="flex mt-4 space-x-4">
              {socialLinks.map((link) => (
                <Motion.a
                  key={link.label}
                  href={link.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                >
                  {React.cloneElement(link.icon, {
                    className: "w-6 h-6",
                    "aria-hidden": "true",
                  })}
                </Motion.a>
              ))}
            </div>
          </section>
        </div>
        <div className="mt-12 border-t border-gray-200/50 dark:border-gray-700/50 pt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} BuildWithInfovion. All Rights
          Reserved.
        </div>
      </div>
    </Motion.footer>
  );
};

export default Footer;
