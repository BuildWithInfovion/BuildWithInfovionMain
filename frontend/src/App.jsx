import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Features from "./pages/Features";
import Portals from "./pages/Portals";
import ForSchools from "./pages/ForSchools";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  const primaryDomain = "https://buildwithinfovion.com";

  return (
    <HelmetProvider>
      <Helmet>
        <title>Infovion — School Management Software for K-12 Schools in India</title>
        <meta
          name="description"
          content="Infovion is a cloud-based school ERP built for K-12 schools in India. Manage admissions, attendance, exams, fees, and staff — one platform, 8 role-specific portals. Built for CBSE, ICSE & State Board schools."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Infovion Technologies" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={primaryDomain} />

        <meta property="og:title" content="Infovion — School Management Software for K-12 India" />
        <meta property="og:description" content="Cloud-based school ERP. Admissions, attendance, exams, fees, staff — all in one platform with 8 role-specific portals. Built for India." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={primaryDomain} />
        <meta property="og:site_name" content="Infovion" />
        <meta property="og:locale" content="en_IN" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Infovion — School Management Software India" />
        <meta name="twitter:description" content="Cloud-based K-12 school ERP. Admissions, attendance, exams, fees, 8 role portals. Built for India." />
        <meta name="theme-color" content="#2563eb" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Infovion Academic ERP",
            applicationCategory: "EducationApplication",
            operatingSystem: "Web",
            url: primaryDomain,
            logo: `${primaryDomain}/logo.png`,
            description:
              "Cloud-based school management ERP for K-12 schools in India. Manages admissions, attendance, examinations, fee collection, and staff — with 8 role-specific portals for Director, Principal, Teacher, Student, Parent, Accountant, Operator, and Receptionist.",
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
            author: {
              "@type": "Organization",
              name: "Infovion Technologies",
              url: primaryDomain,
              contactPoint: {
                "@type": "ContactPoint",
                email: "infovion2025@gmail.com",
                contactType: "sales",
              },
            },
            audience: {
              "@type": "EducationalAudience",
              educationalRole: "administrator",
            },
            areaServed: { "@type": "Country", name: "India" },
            featureList: [
              "Admission Management",
              "Student Management",
              "Attendance Tracking",
              "Examination & Results",
              "Fee Management",
              "Staff Management",
              "Timetable",
              "Announcements",
              "Role-Based Access Control",
              "Multi-Tenant Architecture",
              "Parent Portal",
              "Student Portal",
            ],
          })}
        </script>
      </Helmet>

      <Router>
        <ScrollToTop />
        <WhatsAppButton />
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/portals" element={<Portals />} />
            <Route path="/for-schools" element={<ForSchools />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Page not found</p>
                    <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
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
