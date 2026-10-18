/* global __BUILD_DATE__ */
import React, { Suspense, lazy } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/company/Home";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import { captureFirstTouch, track } from "./lib/analytics";
import { organizationNode } from "./lib/seo";
import { SITE, JMS } from "./Data/company";
import { productOf } from "./lib/sections";

// Company
const Services = lazy(() => import("./pages/company/Services").then((m) => ({ default: m.ServicesIndex })));
const ServicePage = lazy(() => import("./pages/company/Services").then((m) => ({ default: m.ServicePage })));
const Industries = lazy(() => import("./pages/company/Industries"));
const CaseStudies = lazy(() => import("./pages/company/CaseStudies").then((m) => ({ default: m.CaseStudiesIndex })));
const CaseStudy = lazy(() => import("./pages/company/CaseStudies").then((m) => ({ default: m.CaseStudyPage })));
const Products = lazy(() => import("./pages/company/CaseStudies").then((m) => ({ default: m.ProductsIndex })));
const Government = lazy(() => import("./pages/company/Government"));
const HowWeWork = lazy(() => import("./pages/company/HowWeWork"));
const CompanyProfile = lazy(() => import("./pages/company/CompanyProfile"));
const About = lazy(() => import("./pages/company/About"));
const Contact = lazy(() => import("./pages/company/Contact"));
// School ERP
const SchoolHome = lazy(() => import("./pages/school/SchoolHome"));
const Features = lazy(() => import("./pages/school/Features"));
const Portals = lazy(() => import("./pages/school/Portals"));
const Pricing = lazy(() => import("./pages/school/Pricing"));
const FreeTrial = lazy(() => import("./pages/FreeTrial"));
const MaharashtraPage = lazy(() => import("./pages/landing/Landing").then((m) => ({ default: m.MaharashtraPage })));
const FeesPage = lazy(() => import("./pages/landing/Landing").then((m) => ({ default: m.FeesPage })));
const AttendancePage = lazy(() => import("./pages/landing/Landing").then((m) => ({ default: m.AttendancePage })));
const TransportPage = lazy(() => import("./pages/landing/Landing").then((m) => ({ default: m.TransportPage })));
const ToolsIndex = lazy(() => import("./pages/tools/ToolPages").then((m) => ({ default: m.ToolsIndex })));
const LeavingCertificateTool = lazy(() => import("./pages/tools/ToolPages").then((m) => ({ default: m.LeavingCertificateTool })));
const TransferCertificateTool = lazy(() => import("./pages/tools/ToolPages").then((m) => ({ default: m.TransferCertificateTool })));
const BonafideCertificateTool = lazy(() => import("./pages/tools/ToolPages").then((m) => ({ default: m.BonafideCertificateTool })));
const VideosIndex = lazy(() => import("./pages/Videos").then((m) => ({ default: m.VideosIndex })));
const VideoWatch = lazy(() => import("./pages/Videos").then((m) => ({ default: m.VideoWatch })));
// Jewellery (JMS)
const JmsHome = lazy(() => import("./pages/jms/Jms").then((m) => ({ default: m.JmsHome })));
const JmsBilling = lazy(() => import("./pages/jms/Jms").then((m) => ({ default: m.JmsBillingPage })));
const Girvi = lazy(() => import("./pages/jms/Jms").then((m) => ({ default: m.GirviPage })));
const JmsBarcode = lazy(() => import("./pages/jms/Jms").then((m) => ({ default: m.BarcodePage })));
const JmsUae = lazy(() => import("./pages/jms/Jms").then((m) => ({ default: m.UaePage })));
// Content & legal
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));

// Once the first page has loaded, fetch the code for the other pages in idle time, so moving
// between pages never waits on the network (skipped when the visitor has Data Saver on)
const PAGE_MODULES = [
  () => import("./pages/company/Services"),
  () => import("./pages/company/CaseStudies"),
  () => import("./pages/company/Industries"),
  () => import("./pages/company/Government"),
  () => import("./pages/company/HowWeWork"),
  () => import("./pages/company/About"),
  () => import("./pages/company/Contact"),
  () => import("./pages/company/CompanyProfile"),
  () => import("./pages/school/SchoolHome"),
  () => import("./pages/school/Features"),
  () => import("./pages/school/Pricing"),
  () => import("./pages/jms/Jms"),
  () => import("./pages/landing/Landing"),
  () => import("./pages/Blog"),
];
if (typeof window !== "undefined" && !navigator.connection?.saveData) {
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 200));
  const prefetch = () => {
    const next = PAGE_MODULES.shift();
    if (next) idle(() => next().catch(() => {}).finally(prefetch));
  };
  window.addEventListener("load", () => setTimeout(prefetch, 2500), { once: true });
}

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    organizationNode(),
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      dateModified: __BUILD_DATE__,
      name: "Infovion Technologies",
      alternateName: "Infovion",
      description: "Software development company in Pune, India — custom software, web and mobile apps, ERP, SaaS, AI automation, e-governance — and the makers of Infovion School ERP and Infovion JMS.",
      publisher: { "@id": `${SITE}/#organization` },
      inLanguage: "en-IN",
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE}/blog?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <Helmet>
        <title>Page not found | Infovion Technologies</title>
        <meta name="description" content="This page does not exist. Visit Infovion Technologies for software development services, Infovion School ERP and Infovion JMS." />
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="text-center">
        <h1 className="font-display text-8xl font-extrabold text-white/10">404</h1>
        <p className="mt-2 text-xl text-slate-300">This page doesn't exist.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 px-6 py-3 font-semibold text-[#04121a]">Go to the homepage</Link>
          <Link to="/services" className="rounded-full glass px-6 py-3 font-semibold text-white">Our services</Link>
          <Link to="/school-management-software" className="rounded-full glass px-6 py-3 font-semibold text-white">School ERP</Link>
        </div>
      </div>
    </div>
  );
}

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
  // On the jewellery pages, wake the JMS server (free hosting sleeps when idle) so the demo and
  // sign-up open quickly when the visitor clicks through
  const jmsPage = productOf(pathname) === "jms";
  React.useEffect(() => {
    if (!jmsPage || !JMS.live || window.__jmsWarm) return;
    window.__jmsWarm = true;
    fetch(`${JMS.api}/health`, { mode: "no-cors", cache: "no-store" }).catch(() => {});
  }, [jmsPage]);
  const url = SITE + (pathname === "/" ? "/" : pathname.replace(/\/+$/, ""));
  // Link previews (WhatsApp, LinkedIn…) show the image of the part of the site being shared
  const ogImage = `${SITE}/${{ school: "og-school.jpg", jms: "og-jms.jpg" }[productOf(pathname)] ?? "og-image.jpg"}`;
  return (
    <>
      <Helmet>
        <title>Infovion Technologies — Software Development Company in Pune, India</title>
        <meta name="description" content="Infovion Technologies is a software development company in Pune, India: custom software, websites and web apps, mobile apps, ERP and CRM, SaaS, AI automation and e-governance. Makers of Infovion School ERP and Infovion JMS." />
        <meta name="author" content="Infovion Technologies" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Pune, Maharashtra, India" />
        <meta name="geo.position" content="18.5793;73.7535" />
        <meta name="ICBM" content="18.5793, 73.7535" />
        <meta name="google" content="notranslate" />
        <link rel="canonical" href={url} />

        <meta property="og:title" content="Infovion Technologies — Software Development Company in Pune" />
        <meta property="og:description" content="Custom software, web & mobile apps, ERP, SaaS and AI automation — built, run and supported by one accountable team in Pune, India." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="Infovion Technologies" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Infovion Technologies — Software Development Company in Pune" />
        <meta name="twitter:description" content="Custom software, web & mobile apps, ERP, SaaS and AI automation from Pune, India. Makers of Infovion School ERP and JMS." />
        <meta name="twitter:image" content={ogImage} />

        <meta name="theme-color" content="#05070D" />
        <script type="application/ld+json">{JSON.stringify(globalSchema)}</script>
      </Helmet>

      <ScrollToTop />
      <WhatsAppButton />
      <MainLayout>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudy />} />
            <Route path="/products" element={<Products />} />
            <Route path="/government" element={<Government />} />
            <Route path="/how-we-work" element={<HowWeWork />} />
            <Route path="/company-profile" element={<CompanyProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/school-management-software" element={<SchoolHome />} />
            <Route path="/school-management-software/features" element={<Features />} />
            <Route path="/school-management-software/portals" element={<Portals />} />
            <Route path="/school-management-software/pricing" element={<Pricing />} />
            <Route path="/free-trial" element={<FreeTrial />} />
            <Route path="/free-tools" element={<ToolsIndex />} />
            <Route path="/school-management-software-maharashtra" element={<MaharashtraPage />} />
            <Route path="/fee-management-software-for-schools" element={<FeesPage />} />
            <Route path="/school-attendance-app" element={<AttendancePage />} />
            <Route path="/school-transport-management-software" element={<TransportPage />} />
            <Route path="/free-tools/school-leaving-certificate-marathi" element={<LeavingCertificateTool />} />
            <Route path="/free-tools/transfer-certificate" element={<TransferCertificateTool />} />
            <Route path="/free-tools/bonafide-certificate" element={<BonafideCertificateTool />} />
            <Route path="/videos" element={<VideosIndex />} />
            <Route path="/videos/:slug" element={<VideoWatch />} />

            <Route path="/jewellery-management-software" element={<JmsHome />} />
            <Route path="/jewellery-billing-software" element={<JmsBilling />} />
            <Route path="/girvi-software" element={<Girvi />} />
            <Route path="/jewellery-barcode-software" element={<JmsBarcode />} />
            <Route path="/jewellery-software-uae" element={<JmsUae />} />

            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
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
