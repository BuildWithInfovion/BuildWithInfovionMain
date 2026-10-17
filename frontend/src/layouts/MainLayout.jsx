import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BrandBackground from "../components/site/BrandBackground";

const MainLayout = ({ children }) => {
  return (
    <div className="relative flex min-h-screen flex-col text-slate-300" lang="en">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:p-2 focus:text-black"
      >
        Skip to main content
      </a>

      {/* The brand animation fills the window behind every page */}
      <BrandBackground />

      <Navbar />

      <main id="main-content" tabIndex={-1} className="relative z-10 flex-grow">
        {children}
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
