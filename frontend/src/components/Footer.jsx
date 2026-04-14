import React from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Instagram, Linkedin, Twitter, Github, Mail } from "lucide-react";
import logo from "/src/assets/logo.png";

const Footer = () => {
  const productLinks = [
    { to: "/features", label: "Features" },
    { to: "/portals", label: "Role Portals" },
    { to: "/for-schools", label: "For Schools" },
    { to: "/pricing", label: "Pricing" },
  ];

  const companyLinks = [
    { to: "/about", label: "About" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
    { to: "/privacy-policy", label: "Privacy Policy" },
    { to: "/terms-of-service", label: "Terms of Service" },
  ];

  const socialLinks = [
    { href: "#", label: "LinkedIn", icon: <Linkedin /> },
    { href: "#", label: "Twitter (X)", icon: <Twitter /> },
    {
      href: "https://github.com/BuildWithInfovion/BuildWithInfovionMain",
      label: "GitHub",
      icon: <Github />,
    },
    { href: "#", label: "Instagram", icon: <Instagram /> },
  ];

  return (
    <Motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Infovion Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Info<span className="text-blue-600">vion</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
              Cloud-based school management ERP for K-12 schools in India.
              Built ground-up for Indian school operations.
            </p>
            <a
              href="mailto:sankalp7456@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              <Mail className="w-4 h-4" />
              sankalp7456@gmail.com
            </a>
          </div>

          {/* Product */}
          <nav aria-labelledby="footer-product">
            <h4
              id="footer-product"
              className="font-semibold text-gray-900 dark:text-white mb-4"
            >
              Product
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.to}>
                  <Motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Link
                      to={link.to}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </Motion.div>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-labelledby="footer-company">
            <h4
              id="footer-company"
              className="font-semibold text-gray-900 dark:text-white mb-4"
            >
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Link
                      to={link.to}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </Motion.div>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social + Demo CTA */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
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
                  className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.2, y: -2 }}
                >
                  {React.cloneElement(link.icon, {
                    className: "w-5 h-5",
                    "aria-hidden": "true",
                  })}
                </Motion.a>
              ))}
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Ready to modernize your school?
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Free demo. No setup fee. No contract.
              </p>
              <Link
                to="/contact"
                className="inline-block text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Schedule a free demo →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Infovion Technologies. All rights
            reserved.
          </p>
          <p className="text-sm text-gray-400">
            Built for K-12 schools in India · CBSE · ICSE · State Board
          </p>
        </div>
      </div>
    </Motion.footer>
  );
};

export default Footer;
