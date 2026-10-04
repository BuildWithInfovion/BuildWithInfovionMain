import React from "react";
import { track } from "../lib/analytics";

const URL = "https://www.google.com/preferences/source?q=buildwithinfovion.com";

/**
 * Google's official "Add as a preferred source on Google" badge. Readers who
 * choose us see Infovion's articles more often in their own Top Stories,
 * AI Overviews and AI Mode results.
 */
export default function PreferredSourceBadge({ from, className = "" }) {
  return (
    <a
      href={URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("preferred_source_click", { from })}
      className={`inline-block rounded-xl transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300 ${className}`}
    >
      <img
        src="/google-preferred-source.webp"
        alt="Add Infovion as a preferred source on Google"
        width="169"
        height="53"
        loading="lazy"
        className="block h-[53px] w-auto"
      />
    </a>
  );
}
