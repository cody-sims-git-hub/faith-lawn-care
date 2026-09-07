/**
 * Service-area coverage, anchored on Marianna.
 *
 * Coordinates are real (WGS84) because the interactive coverage map on
 * /service-areas projects them directly — it is a true map of where the crews
 * go, not a decorative diagram. Drive times are approximate from Marianna and
 * are what decides the tier.
 *
 * The business is based in Blountstown, Calhoun County, and the whole model is
 * centered there — drive times are measured from Blountstown and the tiers
 * radiate out from it.
 *
 * Tiers:
 *   core     — Calhoun County. Home turf; regular weekly routes.
 *   primary  — the surrounding counties we run to regularly (Liberty, Jackson,
 *              Gadsden, and the near Gulf coast). Scheduled routes.
 *   extended — farther out. Larger jobs, hauls, and tree work; call to confirm.
 *
 * Which towns get their own landing page is decided in area-content.ts — a town
 * has a page only if it has a rich, genuinely town-specific entry there. That
 * keeps the map data (this file) separate from the marketing copy and stops the
 * page set from drifting out of sync with the content.
 */

import { areaPageSlugs } from "./area-content";

export type AreaTier = "core" | "primary" | "extended";

export interface Area {
  slug: string;
  name: string;
  county: string;
  state: "FL" | "AL" | "GA";
  lat: number;
  lng: number;
  /** Approximate drive time from Marianna, in minutes. */
  driveMinutes: number;
  tier: AreaTier;
}

export const HUB_SLUG = "blountstown";

// driveMinutes are approximate driving times from Blountstown, Calhoun County.
export const areas: Area[] = [
  // ---- Core: Calhoun County (home) ----
  { slug: "blountstown", name: "Blountstown", county: "Calhoun County", state: "FL", lat: 30.4438, lng: -85.0466, driveMinutes: 0, tier: "core" },
  { slug: "altha", name: "Altha", county: "Calhoun County", state: "FL", lat: 30.5713, lng: -85.1291, driveMinutes: 12, tier: "core" },

  // ---- Primary: the surrounding counties we run to regularly ----
  { slug: "bristol", name: "Bristol", county: "Liberty County", state: "FL", lat: 30.4319, lng: -84.9766, driveMinutes: 15, tier: "primary" },
  { slug: "alford", name: "Alford", county: "Jackson County", state: "FL", lat: 30.6963, lng: -85.3891, driveMinutes: 28, tier: "primary" },
  { slug: "hosford", name: "Hosford", county: "Liberty County", state: "FL", lat: 30.3893, lng: -84.8113, driveMinutes: 30, tier: "primary" },
  { slug: "chattahoochee", name: "Chattahoochee", county: "Gadsden County", state: "FL", lat: 30.7038, lng: -84.8438, driveMinutes: 32, tier: "primary" },
  { slug: "grand-ridge", name: "Grand Ridge", county: "Jackson County", state: "FL", lat: 30.7135, lng: -84.9955, driveMinutes: 32, tier: "primary" },
  { slug: "marianna", name: "Marianna", county: "Jackson County", state: "FL", lat: 30.7741, lng: -85.2269, driveMinutes: 35, tier: "primary" },
  { slug: "sneads", name: "Sneads", county: "Jackson County", state: "FL", lat: 30.708, lng: -84.9258, driveMinutes: 35, tier: "primary" },
  { slug: "quincy", name: "Quincy", county: "Gadsden County", state: "FL", lat: 30.5871, lng: -84.5833, driveMinutes: 45, tier: "primary" },
  { slug: "port-st-joe", name: "Port St. Joe", county: "Gulf County", state: "FL", lat: 29.813, lng: -85.2999, driveMinutes: 45, tier: "primary" },
  { slug: "panama-city", name: "Panama City", county: "Bay County", state: "FL", lat: 30.1588, lng: -85.6602, driveMinutes: 50, tier: "primary" },
  { slug: "apalachicola", name: "Apalachicola", county: "Franklin County", state: "FL", lat: 29.7263, lng: -84.9855, driveMinutes: 55, tier: "primary" },

  // ---- Extended: farther out — bigger jobs, hauls, tree work ----
  { slug: "cottondale", name: "Cottondale", county: "Jackson County", state: "FL", lat: 30.7974, lng: -85.3777, driveMinutes: 42, tier: "extended" },
  { slug: "greenwood", name: "Greenwood", county: "Jackson County", state: "FL", lat: 30.8663, lng: -85.1524, driveMinutes: 45, tier: "extended" },
  { slug: "chipley", name: "Chipley", county: "Washington County", state: "FL", lat: 30.781, lng: -85.5386, driveMinutes: 45, tier: "extended" },
  { slug: "graceville", name: "Graceville", county: "Jackson County", state: "FL", lat: 30.9563, lng: -85.5169, driveMinutes: 52, tier: "extended" },
  { slug: "jacob-city", name: "Jacob City", county: "Jackson County", state: "FL", lat: 30.8341, lng: -85.3488, driveMinutes: 52, tier: "extended" },
  { slug: "bascom", name: "Bascom", county: "Jackson County", state: "FL", lat: 30.9327, lng: -85.1194, driveMinutes: 55, tier: "extended" },
  { slug: "havana", name: "Havana", county: "Gadsden County", state: "FL", lat: 30.6238, lng: -84.4141, driveMinutes: 55, tier: "extended" },
  { slug: "malone", name: "Malone", county: "Jackson County", state: "FL", lat: 30.9552, lng: -85.1616, driveMinutes: 58, tier: "extended" },
  { slug: "campbellton", name: "Campbellton", county: "Jackson County", state: "FL", lat: 30.9524, lng: -85.3966, driveMinutes: 58, tier: "extended" },
  { slug: "bonifay", name: "Bonifay", county: "Holmes County", state: "FL", lat: 30.7913, lng: -85.6794, driveMinutes: 58, tier: "extended" },
  { slug: "tallahassee", name: "Tallahassee", county: "Leon County", state: "FL", lat: 30.4383, lng: -84.2807, driveMinutes: 60, tier: "extended" },
  { slug: "dothan", name: "Dothan", county: "Houston County", state: "AL", lat: 31.2232, lng: -85.3905, driveMinutes: 65, tier: "extended" },
  { slug: "crawfordville", name: "Crawfordville", county: "Wakulla County", state: "FL", lat: 30.1758, lng: -84.3752, driveMinutes: 65, tier: "extended" },
  { slug: "defuniak-springs", name: "DeFuniak Springs", county: "Walton County", state: "FL", lat: 30.7207, lng: -86.1152, driveMinutes: 75, tier: "extended" },
];

export const tierLabels: Record<AreaTier, string> = {
  core: "Calhoun County",
  primary: "Surrounding counties",
  extended: "Farther out",
};

export const tierBlurbs: Record<AreaTier, string> = {
  core: "Home county. Regular weekly routes — no travel charge, no minimum job size.",
  primary: "The counties around us we run to regularly. Scheduled routes — tell us early for a standing spot.",
  extended: "Larger jobs, hauls, and tree work. Give us a call and we will tell you straight if we can get there.",
};

/** Does this town have its own landing page (i.e. rich content in area-content)? */
export function hasAreaPage(slug: string): boolean {
  return areaPageSlugs.has(slug);
}

/** Towns that earn their own page — the ones with rich, town-specific content. */
export const areasWithPages = areas.filter((a) => areaPageSlugs.has(a.slug));

export const hub = areas.find((a) => a.slug === HUB_SLUG)!;

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}

export function areasByTier(tier: AreaTier): Area[] {
  return areas.filter((a) => a.tier === tier).sort((a, b) => a.driveMinutes - b.driveMinutes);
}

/** The counties we name in copy and in the areaServed JSON-LD — home first. */
export const countiesServed = [
  "Calhoun County",
  "Liberty County",
  "Jackson County",
  "Gadsden County",
  "Gulf County",
  "Bay County",
  "Franklin County",
];
