/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          dark:    "#2C2A27",
          darker:  "#1E1C1A",
          brown:   "#5A4A48",
          terra:   "#BE6D56",
          terra2:  "#A85D48",
          neutral: "#9C928C",
          cream:   "#E3DDDB",
          cream2:  "#F0ECEB",
          accent:  "#D1AB83",
          accent2: "#E8C99A",
          muted:   "#F7F4F3",
          gold:    "#C9943A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "dot-warm":     "radial-gradient(circle, #9C928C 1px, transparent 1px)",
        "dot-fine":     "radial-gradient(circle, rgba(156,146,140,0.20) 1px, transparent 1px)",
        "grad-terra":   "linear-gradient(135deg, #BE6D56 0%, #D1AB83 100%)",
        "grad-dark":    "linear-gradient(135deg, #2C2A27 0%, #5A4A48 100%)",
        "grad-hero":    "linear-gradient(135deg, #2C2A27 0%, #4A3A38 50%, #2C2A27 100%)",
        "grad-warm":    "linear-gradient(135deg, #BE6D56 0%, #A85D48 100%)",
        "grad-section": "linear-gradient(180deg, #F7F4F3 0%, #E3DDDB 100%)",
      },
      backgroundSize: {
        "dot-sm": "24px 24px",
        "dot-md": "32px 32px",
        "dot-lg": "48px 48px",
      },
      boxShadow: {
        "terra-sm":  "0 2px 12px rgba(190,109,86,0.18)",
        "terra-md":  "0 4px 24px rgba(190,109,86,0.25)",
        "terra-lg":  "0 8px 48px rgba(190,109,86,0.32)",
        "terra-xl":  "0 16px 64px rgba(190,109,86,0.38)",
        "dark-sm":   "0 2px 16px rgba(44,42,39,0.20)",
        "dark-md":   "0 8px 32px rgba(44,42,39,0.28)",
        "card":      "0 1px 3px rgba(44,42,39,0.08), 0 4px 16px rgba(44,42,39,0.06)",
        "card-hover":"0 8px 32px rgba(44,42,39,0.14), 0 2px 8px rgba(44,42,39,0.08)",
        "premium":   "0 0 0 1px rgba(209,171,131,0.2), 0 8px 40px rgba(190,109,86,0.15)",
        "premium-hover": "0 0 0 1px rgba(209,171,131,0.4), 0 16px 56px rgba(190,109,86,0.22)",
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
          "0%, 100%": { boxShadow: "0 0 20px rgba(190,109,86,0.3)" },
          "50%":      { boxShadow: "0 0 40px rgba(190,109,86,0.6)" },
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
