import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

// --- START: Added Imports ---
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ScrollToTop from "./components/ScrollToTop"; // Recommended for better navigation
// --- END: Added Imports ---

function App() {
  const primaryDomain = "https://buildwithinfovion.in";

  return (
    <HelmetProvider>
      <Helmet>
        <title>BuildWithInfovion - Professional Digital Solutions Agency</title>
        <meta
          name="description"
          content="BuildWithInfovion is a full-service digital solutions agency specializing in web development, mobile apps, ERP solutions, and AI automation in Pune, Maharashtra."
        />
        {/* ✅ REMOVED: <meta name="keywords"> - This tag is generally obsolete for SEO. */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="BuildWithInfovion" />
        <meta name="robots" content="index, follow" />

        {/* ✅ FIXED: Updated placeholder domain to primary domain (.in) */}
        <link rel="canonical" href={primaryDomain} />

        {/* Open Graph Meta Tags (For Social Sharing) */}
        <meta
          property="og:title"
          content="BuildWithInfovion - Professional Digital Solutions Agency"
        />
        <meta
          property="og:description"
          content="Full-service digital solutions including web development, mobile apps, ERP systems, and AI automation in Pune, India."
        />
        <meta property="og:type" content="website" />
        {/* ✅ FIXED: Updated placeholder URL */}
        <meta property="og:url" content={primaryDomain} />
        <meta property="og:site_name" content="BuildWithInfovion" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="BuildWithInfovion - Digital Solutions Agency"
        />
        <meta
          name="twitter:description"
          content="Professional web development, mobile apps, and digital solutions in Pune, Maharashtra."
        />

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />

        {/* ✅ OPTIMIZED: Structured Data - Changed to LocalBusiness for better local ranking signals */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness", // Changed from Organization to LocalBusiness
            name: "BuildWithInfovion",
            url: primaryDomain, // ✅ FIXED: Used primary domain variable
            logo: `${primaryDomain}/logo.png`, // ✅ FIXED: Used primary domain variable
            image: `${primaryDomain}/representation-users-experience-interface-design.jpg`, // Added a primary image based on your assets
            description:
              "BuildWithInfovion is a leading digital solutions agency in Pune, India. We offer expert Web Development, UI/UX Design, Mobile Apps, and AI/ERP solutions for businesses across India.",
            telephone: "+91-91563-02024", // Added to the main object for prominence
            address: {
              "@type": "PostalAddress",
              streetAddress: "Mumbai-Bengaluru Highway",
              addressLocality: "Pune",
              addressRegion: "Maharashtra",
              postalCode: "411041",
              addressCountry: "India",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-91563-02024",
              contactType: "customer service",
              availableLanguage: "English",
            },
            sameAs: [
              "https://wa.me/9767102002",
              // Add other social media links (LinkedIn, Facebook, etc.) here
            ],
            // Removed less relevant fields like foundingDate and numberOfEmployees for brevity and focus
            areaServed: {
              "@type": "Country",
              name: "India",
            },
            serviceType: [
              "Web Development",
              "Mobile App Development",
              "UI/UX Design",
              "ERP Solutions",
              "Digital Marketing",
              "AI Automation",
            ],
          })}
        </script>
      </Helmet>

      <Router>
        {/* This component ensures navigation scrolls to the top of the page */}
        <ScrollToTop />
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />

            {/* --- START: Added Legal Page Routes --- */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            {/* --- END: Added Legal Page Routes --- */}

            {/* Catch-all route for 404 - Good for user experience */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-gray-900 mb-4">
                      404
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">Page not found</p>
                    <a
                      href="/"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Go Home
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </MainLayout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
