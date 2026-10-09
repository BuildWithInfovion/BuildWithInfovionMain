import React from "react";
import { track } from "../lib/analytics";

// From Product Hunt → your launch → "Place an embed on your site" (the post_id in the embed code).
export const PH_POST_ID = "1271947";
const PH_URL = "https://www.producthunt.com/products/infovion";

/**
 * Product Hunt's official "Find us on Product Hunt" badge (live upvote count).
 * Renders nothing until PH_POST_ID is set, so it can never show a broken image.
 */
export default function ProductHuntBadge({ from, className = "" }) {
  if (!PH_POST_ID) return null;
  const href = `${PH_URL}?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-infovion`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("producthunt_badge_click", { from })}
      className={`inline-block rounded-xl transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300 ${className}`}
    >
      <img
        src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=${PH_POST_ID}&theme=dark`}
        alt="Infovion - Run your whole school from one app, ₹150/student/year | Product Hunt"
        width="250"
        height="54"
        loading="lazy"
        className="block h-[54px] w-[250px]"
      />
    </a>
  );
}
