/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          dark:    "#0B1220",
          darker:  "#05070D",
          brown:   "#1E293B",
          terra:   "#0D9488",
          terra2:  "#0F766E",
          neutral: "#64748B",
          cream:   "#E2E8F0",
          cream2:  "#F1F5F9",
          accent:  "#5EEAD4",
          accent2: "#99F6E4",
          muted:   "#F8FAFC",
          gold:    "#22D3EE",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
      },
      backgroundImage: {
        "dot-warm":     "radial-gradient(circle, #64748B 1px, transparent 1px)",
        "dot-fine":     "radial-gradient(circle, rgba(100,116,139,0.20) 1px, transparent 1px)",
        "grad-terra":   "linear-gradient(135deg, #0D9488 0%, #5EEAD4 100%)",
        "grad-dark":    "linear-gradient(135deg, #0B1220 0%, #1E293B 100%)",
        "grad-hero":    "linear-gradient(135deg, #0B1220 0%, #111A2E 50%, #0B1220 100%)",
        "grad-warm":    "linear-gradient(135deg, #0D9488 0%, #0F766E 100%)",
        "grad-section": "linear-gradient(180deg, #F8FAFC 0%, #E2E8F0 100%)",
      },
      backgroundSize: {
        "dot-sm": "24px 24px",
        "dot-md": "32px 32px",
        "dot-lg": "48px 48px",
      },
      boxShadow: {
        "terra-sm":  "0 2px 12px rgba(20,184,166,0.18)",
        "terra-md":  "0 4px 24px rgba(20,184,166,0.25)",
        "terra-lg":  "0 8px 48px rgba(20,184,166,0.32)",
        "terra-xl":  "0 16px 64px rgba(20,184,166,0.38)",
        "dark-sm":   "0 2px 16px rgba(11,18,32,0.20)",
        "dark-md":   "0 8px 32px rgba(11,18,32,0.28)",
        "card":      "0 1px 3px rgba(11,18,32,0.08), 0 4px 16px rgba(11,18,32,0.06)",
        "card-hover":"0 8px 32px rgba(11,18,32,0.14), 0 2px 8px rgba(11,18,32,0.08)",
        "premium":   "0 0 0 1px rgba(94,234,212,0.2), 0 8px 40px rgba(20,184,166,0.15)",
        "premium-hover": "0 0 0 1px rgba(94,234,212,0.4), 0 16px 56px rgba(20,184,166,0.22)",
        "inner-top": "inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      animation: {
        "float-slow":   "floatSlow 24s ease-in-out infinite",
        "float-med":    "floatMed 18s ease-in-out infinite",
        "float-fast":   "floatFast 12s ease-in-out infinite",
        "pulse-soft":   "pulseSoft 4s ease-in-out infinite",
        "shimmer":      "shimmer 2.2s linear infinite",
        "slide-up":     "slideUp 0.6s cubic-bezier(0.33,1,0.68,1) forwards",
        "fade-in":      "fadeIn 0.5s ease forwards",
        "gradient-x":   "gradientX 4s ease infinite",
        "spin-slow":    "spin 8s linear infinite",
        "bounce-soft":  "bounceSoft 2s ease-in-out infinite",
        "glow-pulse":   "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%":      { transform: "translate(60px, -50px)" },
        },
        floatMed: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%":      { transform: "translate(-50px, 60px)" },
        },
        floatFast: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%":      { transform: "translate(30px, -30px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4" },
          "50%":      { opacity: "0.8" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(8px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(20,184,166,0.3)" },
          "50%":      { boxShadow: "0 0 40px rgba(20,184,166,0.6)" },
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.33, 1, 0.68, 1)",
      },
    },
  },
  plugins: [],
};
