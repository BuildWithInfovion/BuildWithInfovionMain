import React from "react";
import { Helmet } from "react-helmet-async";
import { motion as Motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - BuildWithInfovion</title>
        <meta
          name="description"
          content="Read the Privacy Policy for BuildWithInfovion. Understand how we collect, use, and protect your data."
        />
        <link rel="canonical" href="https://yourdomain.com/privacy-policy" />
      </Helmet>
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-6 py-24 sm:py-32"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Last updated: October 2, 2025
          </p>
        </div>
        <div className="mt-12 text-gray-700 dark:text-gray-300 space-y-8">
          <p>
            BuildWithInfovion ("us", "we", or "our") operates the
            BuildWithInfovion website (the "Service"). This page informs you of
            our policies regarding the collection, use, and disclosure of
            personal data when you use our Service and the choices you have
            associated with that data.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Information Collection and Use
            </h2>
            <p>
              We collect several different types of information for various
              purposes to provide and improve our Service to you. This may
              include, but is not limited to, your email address, name, and
              usage data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Use of Data
            </h2>
            <p>
              BuildWithInfovion uses the collected data for various purposes: to
              provide and maintain the Service, to notify you about changes to
              our Service, to provide customer care and support, and to gather
              analysis or valuable information so that we can improve the
              Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Cookies Data
            </h2>
            <p>
              We use cookies and similar tracking technologies to track the
              activity on our Service and hold certain information. You can
              instruct your browser to refuse all cookies or to indicate when a
              cookie is being sent. However, if you do not accept cookies, you
              may not be able to use some portions of our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Security of Data
            </h2>
            <p>
              The security of your data is important to us, but remember that no
              method of transmission over the Internet, or method of electronic
              storage is 100% secure. While we strive to use commercially
              acceptable means to protect your Personal Data, we cannot
              guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Changes to This Privacy Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page.
              You are advised to review this Privacy Policy periodically for any
              changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us by visiting the contact page on our website.
            </p>
          </section>
        </div>
      </Motion.div>
    </>
  );
};

export default PrivacyPolicy;
