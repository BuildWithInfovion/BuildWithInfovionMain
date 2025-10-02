import React from "react";
import { Link } from "react-router-dom";
import { Wrench, Layout, Layers, Share2 } from "lucide-react";

const iconMap = {
  wrench: <Wrench className="w-6 h-6" aria-hidden="true" focusable="false" />,
  layout: <Layout className="w-6 h-6" aria-hidden="true" focusable="false" />,
  layers: <Layers className="w-6 h-6" aria-hidden="true" focusable="false" />,
  "share-2": (
    <Share2 className="w-6 h-6" aria-hidden="true" focusable="false" />
  ),
};

const ServiceCard = ({ icon, title, description }) => {
  return (
    <article
      className="bg-blue-600 text-white p-8 rounded-lg"
      aria-label={`Service: ${title}`}
      tabIndex={0}
    >
      <div className="bg-white text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-md">
        {iconMap[icon] || (
          <Wrench className="w-6 h-6" aria-hidden="true" focusable="false" />
        )}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="opacity-80 mb-4 text-sm">{description}</p>
      <Link
        to="/contact"
        className="font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 transition-colors duration-200"
        aria-label={`Know more about ${title} service`}
      >
        Know More &rarr;
      </Link>
    </article>
  );
};

export default ServiceCard;
