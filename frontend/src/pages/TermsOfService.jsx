import React from "react";
import { Helmet } from "react-helmet-async";
import { motion as Motion } from "framer-motion";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - BuildWithInfovion</title>
        <meta
          name="description"
          content="Read the Terms of Service for BuildWithInfovion. Understand the rules and guidelines for using our website and services."
        />
        <link rel="canonical" href="https://yourdomain.com/terms-of-service" />
      </Helmet>
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-6 py-24 sm:py-32"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Last updated: October 2, 2025
          </p>
        </div>
        <div className="mt-12 text-gray-700 dark:text-gray-300 space-y-8">
          <p>
            Please read these Terms of Service ("Terms", "Terms of Service")
            carefully before using the BuildWithInfovion website (the "Service")
            operated by BuildWithInfovion ("us", "we", or "our"). Your access to
            and use of the Service is conditioned on your acceptance of and
            compliance with these Terms.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the Service you agree to be bound by these
              Terms. If you disagree with any part of the terms then you may not
              access the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              2. Intellectual Property
            </h2>
            <p>
              The Service and its original content, features, and functionality
              are and will remain the exclusive property of BuildWithInfovion
              and its licensors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              3. Links To Other Web Sites
            </h2>
            <p>
              Our Service may contain links to third-party web sites or services
              that are not owned or controlled by BuildWithInfovion. We have no
              control over, and assume no responsibility for, the content,
              privacy policies, or practices of any third party web sites or
              services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              4. Limitation Of Liability
            </h2>
            <p>
              In no event shall BuildWithInfovion, nor its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any
              indirect, incidental, special, consequential or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              5. Changes
            </h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. We will provide notice of any changes by
              posting the new Terms on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us.
            </p>
          </section>
        </div>
      </Motion.div>
    </>
  );
};

export default TermsOfService;
