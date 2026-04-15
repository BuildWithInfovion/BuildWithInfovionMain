import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

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

const DOMAIN = "https://buildwithinfovion.com";

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${DOMAIN}/#organization`,
      name: "Infovion Technologies",
      url: DOMAIN,
      logo: {
        "@type": "ImageObject",
        url: `${DOMAIN}/src/assets/logo.png`,
        width: 512,
        height: 512,
      },
      description:
        "Infovion Technologies is a Pune-based company building cloud-native Academic ERP software for K-12 schools across India.",
      email: "infovion2025@gmail.com",
      telephone: "+919309193613",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      sameAs: [
        "https://www.linkedin.com/company/112026919/",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+919309193613",
          contactType: "sales",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi", "Marathi"],
        },
        {
          "@type": "ContactPoint",
          email: "infovion2025@gmail.com",
          contactType: "customer support",
          areaServed: "IN",
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${DOMAIN}/#software`,
      name: "Infovion Academic ERP",
      applicationCategory: "EducationApplication",
      applicationSubCategory: "School Management Software",
      operatingSystem: "Web, iOS, Android",
      url: DOMAIN,
      description:
        "Cloud-based school management ERP for K-12 schools in India. Covers admissions, attendance, examinations, fee collection, staff management, timetable, and announcements — with 8 role-specific portals for Director, Principal, Teacher, Student, Parent, Accountant, Operator, and Receptionist.",
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        seller: { "@id": `${DOMAIN}/#organization` },
      },
      author: { "@id": `${DOMAIN}/#organization` },
      publisher: { "@id": `${DOMAIN}/#organization` },
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "administrator",
        audienceType: "School Administrators, Principals, Teachers, Parents",
      },
      areaServed: { "@type": "Country", name: "India" },
      inLanguage: "en-IN",
      featureList: [
        "Student Admission Management with auto admission numbers",
        "Digital Attendance Tracking with bulk marking",
        "Examination & Results Management with rank lists",
        "Fee Management with Indian fee head standards",
        "Staff Management with RBAC",
        "Student Portal and Parent Portal",
        "Weekly Timetable Management",
        "School Announcements",
        "Transfer Certificate (TC) Validation",
        "Aadhar and demographic fields for Indian compliance",
        "CBSE, ICSE, and State Board compatible",
        "Multi-Tenant Architecture with institution-level isolation",
        "Role-Based Access Control",
        "Audit Trail on all write operations",
      ],
      keywords:
        "school management software India, school ERP India, K-12 school management system, school attendance software India, fee management software schools, CBSE school software, cloud school ERP, school administration software India",
    },
    {
      "@type": "WebSite",
      "@id": `${DOMAIN}/#website`,
      url: DOMAIN,
      name: "Infovion",
      description: "School Management Software for K-12 Schools in India",
      publisher: { "@id": `${DOMAIN}/#organization` },
      inLanguage: "en-IN",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${DOMAIN}/blog?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Infovion — School Management Software for K-12 Schools in India</title>
        <meta
          name="description"
          content="Cloud-based school ERP for K-12 schools in India. Manage admissions, attendance, exams, fees & staff with 8 role-specific portals. CBSE, ICSE & State Board ready. Free demo."
        />
        <meta
          name="keywords"
          content="school management software India, school ERP India, K-12 school ERP, school management system India, cloud school management software, CBSE school software, school attendance software India, fee management software for schools, school ERP with parent portal, school administration software India, digital school management, academic ERP India, school software Pune"
        />
        <meta name="author" content="Infovion Technologies" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Pune, Maharashtra, India" />
        <meta name="google" content="notranslate" />
        <link rel="canonical" href={DOMAIN} />

        {/* Open Graph */}
        <meta property="og:title" content="Infovion — School Management Software for K-12 India" />
        <meta property="og:description" content="Cloud-based school ERP. Admissions, attendance, exams, fees, staff — 8 role-specific portals. CBSE, ICSE & State Board. Free demo." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={DOMAIN} />
        <meta property="og:site_name" content="Infovion" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:image" content={`${DOMAIN}/src/assets/logo.png`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Infovion — School Management Software India" />
        <meta name="twitter:description" content="Cloud-based K-12 school ERP for India. Admissions, attendance, exams, fees, 8 role portals. Free demo." />
        <meta name="twitter:image" content={`${DOMAIN}/src/assets/logo.png`} />

        <meta name="theme-color" content="#BE6D56" />

        {/* Global Schema (@graph) */}
        <script type="application/ld+json">{JSON.stringify(globalSchema)}</script>
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
                <div className="min-h-screen flex items-center justify-center bg-brand-cream/30">
                  <div className="text-center px-6">
                    <h1 className="text-8xl font-extrabold text-brand-cream mb-4" style={{ WebkitTextStroke: "2px #BE6D56" }}>404</h1>
                    <p className="text-xl text-brand-neutral mb-8">This page doesn't exist.</p>
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 bg-brand-terra text-white px-6 py-3 rounded-full font-semibold hover:bg-[#a85d48] transition-colors"
                    >
                      Go to Homepage
                    </Link>
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
