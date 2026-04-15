import React, { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertTriangle } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    schoolName: "",
    message: "",
  });
  const [formMessage, setFormMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (formMessage.text) {
      const timer = setTimeout(() => setFormMessage({ text: "", type: "" }), 5000);
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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormMessage({
          text: "Thanks! We'll reach out within 2 hours to schedule your demo.",
          type: "success",
        });
        setFormData({ name: "", email: "", phone: "", schoolName: "", message: "" });
      } else {
        throw new Error("Submission failed.");
      }
    } catch (error) {
      setFormMessage({
        text: "Something went wrong. Please WhatsApp or call us directly.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full bg-white border border-brand-cream rounded-xl px-4 py-3 text-brand-dark placeholder-brand-neutral/60 text-sm transition-colors duration-200 focus:outline-none focus:border-brand-terra focus:ring-1 focus:ring-brand-terra/20";

  const labelClasses = "block text-sm font-medium text-brand-brown mb-1.5";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Your Name <span className="text-brand-terra">*</span>
          </label>
          <input
            autoComplete="name"
            type="text"
            id="name"
            name="name"
            placeholder="e.g. Rajesh Sharma"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="schoolName" className={labelClasses}>
            School Name <span className="text-brand-terra">*</span>
          </label>
          <input
            type="text"
            id="schoolName"
            name="schoolName"
            placeholder="e.g. St. Mary's High School"
            value={formData.schoolName}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email <span className="text-brand-terra">*</span>
          </label>
          <input
            autoComplete="email"
            type="email"
            id="email"
            name="email"
            placeholder="you@school.com"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone / WhatsApp <span className="text-brand-terra">*</span>
          </label>
          <input
            autoComplete="tel"
            type="tel"
            id="phone"
            name="phone"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Tell us about your school <span className="text-brand-neutral font-normal">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          placeholder="Board (CBSE/ICSE/State), number of students, current pain points..."
          value={formData.message}
          onChange={handleChange}
          className={inputClasses}
        />
      </div>

      <Motion.button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-brand-terra text-white py-3.5 px-6 rounded-full font-semibold text-sm shadow-lg shadow-brand-terra/25 hover:bg-[#a85d48] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: 0.97 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Request Free Demo"}
        {!isSubmitting && <Send className="w-4 h-4" />}
      </Motion.button>

      <AnimatePresence>
        {formMessage.text && (
          <Motion.div
            className={`p-4 rounded-xl flex items-start gap-3 text-sm font-medium ${
              formMessage.type === "success"
                ? "bg-brand-terra/10 text-brand-terra border border-brand-terra/20"
                : "bg-red-50 text-red-600 border border-red-100"
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {formMessage.type === "success" ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            )}
            {formMessage.text}
          </Motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default ContactForm;
