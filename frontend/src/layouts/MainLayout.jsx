import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div
      className="bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300 min-h-screen flex flex-col"
      lang="en"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                   focus:bg-blue-600 focus:text-white p-2 rounded z-50"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-grow pt-6">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
