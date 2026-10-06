import React, { Suspense, lazy } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
const About = lazy(() => import("./pages/About"));
const Features = lazy(() => import("./pages/Features"));
const Portals = lazy(() => import("./pages/Portals"));
const ForSchools = lazy(() => import("./pages/ForSchools"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const FreeTrial = lazy(() => import("./pages/FreeTrial"));
const MaharashtraPage = lazy(() => import("./pages/landing/Landing").then((m) => ({ default: m.MaharashtraPage })));
const FeesPage = lazy(() => import("./pages/landing/Landing").then((m) => ({ default: m.FeesPage })));
const AttendancePage = lazy(() => import("./pages/landing/Landing").then((m) => ({ default: m.AttendancePage })));
const TransportPage = lazy(() => import("./pages/landing/Landing").then((m) => ({ default: m.TransportPage })));
const ToolsIndex = lazy(() => import("./pages/tools/ToolPages").then((m) => ({ default: m.ToolsIndex })));
const LeavingCertificateTool = lazy(() => import("./pages/tools/ToolPages").then((m) => ({ default: m.LeavingCertificateTool })));
const TransferCertificateTool = lazy(() => import("./pages/tools/ToolPages").then((m) => ({ default: m.TransferCertificateTool })));
const BonafideCertificateTool = lazy(() => import("./pages/tools/ToolPages").then((m) => ({ default: m.BonafideCertificateTool })));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import { captureFirstTouch, track } from "./lib/analytics";

const DOMAIN = "https://buildwithinfovion.com";

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${DOMAIN}/#organization`,
      name: "Infovion Technologies",
      alternateName: ["Infovion", "Build With Infovion"],
      url: DOMAIN,
      logo: {
        "@type": "ImageObject",
        url: `${DOMAIN}/logo.png`,
        width: 512,
        height: 512,
      },
      description:
        "Infovion Technologies is a Pune-based, MSME-registered company building school management software (school ERP) for K-12 schools across India.",
      foundingLocation: { "@type": "Place", name: "Pune, Maharashtra, India" },
      knowsAbout: ["School management software", "School ERP", "Fee management for schools", "School attendance", "Transfer certificates", "Indian K-12 education"],
      email: "contact@buildwithinfovion.com",
      telephone: "+919156302024",
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
        "https://www.instagram.com/infoviontech/",
        "https://www.facebook.com/profile.php?id=61595050592821",
        "https://www.youtube.com/@Infovion_tech",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+919156302024",
          contactType: "sales",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi", "Marathi"],
        },
        {
          "@type": "ContactPoint",
          email: "contact@buildwithinfovion.com",
          contactType: "customer support",
          areaServed: "IN",
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${DOMAIN}/#software`,
      name: "Infovion Academic ERP",
      alternateName: ["Infovion", "Infovion School ERP", "Infovion School Management Software"],
      applicationCategory: "EducationApplication",
      applicationSubCategory: "School Management Software",
      operatingSystem: "Any web browser (Android, iOS, Windows, macOS)",
      url: DOMAIN,
      description:
        "School management software for K-12 schools in India. Covers admissions, attendance, examinations, fee collection, staff management, timetable, and announcements — with 8 role-specific portals for Director, Principal, Operator, Accountant, Receptionist, Teacher, Non-Teaching Staff and Parent.",
      offers: {
        "@type": "Offer",
        price: "150",
        priceCurrency: "INR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "150",
          priceCurrency: "INR",
          unitText: "per student per academic year, plus GST",
          valueAddedTaxIncluded: false,
        },
        url: `${DOMAIN}/pricing`,
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
        "Staff Management with role-based access",
        "Parent Portal with attendance, fees, results and bus tracking",
        "Weekly Timetable Management",
        "School Announcements",
        "Transfer Certificate (TC) Validation",
        "Aadhar and demographic fields for Indian compliance",
        "CBSE, ICSE, and State Board compatible",
        "Complete data privacy — each school's data is fully isolated",
        "Each user sees only what their role requires",
        "Full activity history on all changes",
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

/** Everything inside the router — shared by the browser app and the build-time prerender. */
export function AppRoutes() {
  const { pathname } = useLocation();
  React.useEffect(() => { captureFirstTouch(); }, []);
  // GA4 page views for in-app navigation (the first one is sent by the gtag snippet)
  const first = React.useRef(true);
  React.useEffect(() => {
    if (first.current) { first.current = false; return; }
    track("page_view", { page_path: pathname });
  }, [pathname]);
  const url = DOMAIN + (pathname === "/" ? "/" : pathname.replace(/\/+$/, ""));
  return (
    <>
      <Helmet>
        <title>Infovion — School Management Software for K-12 Schools in India</title>
        <meta
          name="description"
          content="School management software for K-12 schools in India. Manage admissions, attendance, exams, fees & staff with 8 role-specific portals. CBSE, ICSE & State Board ready. Free demo."
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
        <link rel="canonical" href={url || DOMAIN} />

        {/* Open Graph */}
        <meta property="og:title" content="Infovion — School Management Software for K-12 India" />
        <meta property="og:description" content="School management software for India. Admissions, attendance, exams, fees, staff — 8 role-specific portals. CBSE, ICSE & State Board. Free demo." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url || DOMAIN} />
        <meta property="og:site_name" content="Infovion" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:image" content={`${DOMAIN}/og-image.jpg`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Infovion — School Management Software India" />
        <meta name="twitter:description" content="School management software for K-12 India. Admissions, attendance, exams, fees, 8 role portals. Free demo." />
        <meta name="twitter:image" content={`${DOMAIN}/og-image.jpg`} />

        <meta name="theme-color" content="#0D9488" />

        {/* Global Schema (@graph) */}
        <script type="application/ld+json">{JSON.stringify(globalSchema)}</script>
      </Helmet>

        <ScrollToTop />
        <WhatsAppButton />
        <MainLayout>
          <Suspense fallback={<div className="min-h-screen bg-[#05070D]" />}>
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
            <Route path="/free-trial" element={<FreeTrial />} />
            <Route path="/free-tools" element={<ToolsIndex />} />
            <Route path="/school-management-software-maharashtra" element={<MaharashtraPage />} />
            <Route path="/fee-management-software-for-schools" element={<FeesPage />} />
            <Route path="/school-attendance-app" element={<AttendancePage />} />
            <Route path="/school-transport-management-software" element={<TransportPage />} />
            <Route path="/free-tools/school-leaving-certificate-marathi" element={<LeavingCertificateTool />} />
            <Route path="/free-tools/transfer-certificate" element={<TransferCertificateTool />} />
            <Route path="/free-tools/bonafide-certificate" element={<BonafideCertificateTool />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center bg-brand-cream/30">
                  <div className="text-center px-6">
                    <h1 className="text-8xl font-extrabold text-brand-cream mb-4" style={{ WebkitTextStroke: "2px #0D9488" }}>404</h1>
                    <p className="text-xl text-brand-neutral mb-8">This page doesn't exist.</p>
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 bg-brand-terra text-white px-6 py-3 rounded-full font-semibold hover:bg-[#0F766E] transition-colors"
                    >
                      Go to Homepage
                    </Link>
                  </div>
                </div>
              }
            />
          </Routes>
          </Suspense>
        </MainLayout>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppRoutes />
      </Router>
    </HelmetProvider>
  );
}

export default App;
