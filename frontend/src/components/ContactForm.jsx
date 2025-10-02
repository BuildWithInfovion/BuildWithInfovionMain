import React, { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertTriangle } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formMessage, setFormMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (formMessage.text) {
      const timer = setTimeout(
        () => setFormMessage({ text: "", type: "" }),
        5000
      );
      return () => clearTimeout(timer);
    }
  }, [formMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage({ text: "", type: "" });

    try {
      const response = await fetch("https://formspree.io/f/xnngvgpd", {
        // <-- PASTE YOUR FORMSPREE URL HERE
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormMessage({
          text: "Thank you for your message! We will get back to you shortly.",
          type: "success",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error("Form submission failed.");
      }
    } catch (error) {
      console.error("Form submission error:", error); // <-- Add this line
      setFormMessage({
        text: "Something went wrong. Please try again later.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-2 border-gray-300/50 dark:border-gray-700/50 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 transition-colors duration-300 focus:outline-none focus:ring-0 focus:border-blue-500";

  return (
    <form id="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            autoComplete="name"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            autoComplete="email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>
      </div>
      <div className="mt-6">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Phone <span className="text-gray-400">(Optional)</span>
        </label>
        <input
          autoComplete="tel"
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={inputClasses}
        />
      </div>
      <div className="mt-6">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          How can we help? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
          className={inputClasses}
        ></textarea>
      </div>
      <div className="mt-6">
        <Motion.button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
          {!isSubmitting && <Send className="w-5 h-5" />}
        </Motion.button>
      </div>
      <AnimatePresence>
        {formMessage.text && (
          <Motion.div
            className={`mt-4 p-3 rounded-lg flex items-center gap-3 text-sm font-semibold ${
              formMessage.type === "success"
                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {formMessage.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertTriangle className="w-5 h-5" />
            )}
            {formMessage.text}
          </Motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default ContactForm;
