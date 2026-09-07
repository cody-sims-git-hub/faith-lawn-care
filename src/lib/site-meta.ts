/**
 * Site-wide identity and NAP (name / address / phone).
 *
 * This is the single source of truth for anything that appears in more than one
 * place — canonical URLs, JSON-LD, the header CTA, the footer, tap-to-call
 * links. Change it here, not in a template.
 */

export const SITE_URL = "https://faithlawncarellc.com";
export const SITE_NAME = "Faith Lawn Care";
export const LEGAL_NAME = "Faith Lawn Care LLC";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/** Human-readable phone, as it appears on the truck and the flyers. */
export const PHONE_DISPLAY = "850-209-8982";
/** E.164, for tel: and sms: hrefs and for schema.org. */
export const PHONE_E164 = "+18502098982";

export const TEL_HREF = `tel:${PHONE_E164}`;
export const SMS_HREF = `sms:${PHONE_E164}`;

/**
 * The business is mobile — crews travel to the property — so there is no
 * storefront address to publish. `areaServed` in the JSON-LD carries the
 * coverage instead, and the base city anchors local relevance.
 */
export const BASE_CITY = "Marianna";
export const BASE_STATE = "Florida";
export const BASE_STATE_CODE = "FL";
export const BASE_COUNTY = "Jackson County";

/** Approximate centroid of Marianna, FL — used for the geo JSON-LD only. */
export const GEO = { lat: 30.774, lng: -85.2269 };

export const FACEBOOK_URL = "https://www.facebook.com/groups/778218776391066";

/** Field crews work daylight hours; the phone is answered well past them. */
export const HOURS = [
  { days: "Monday – Friday", open: "7:00 AM", close: "6:00 PM" },
  { days: "Saturday", open: "8:00 AM", close: "4:00 PM" },
  { days: "Sunday", open: "Closed", close: "" },
] as const;

/** schema.org openingHours, kept next to the display copy so they can't drift. */
export const HOURS_SPEC = [
  { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "18:00" },
  { days: ["Saturday"], opens: "08:00", closes: "16:00" },
] as const;

export interface Seo {
  /** Full <title> for the page. */
  title: string;
  /** Meta + OG/Twitter description. */
  description: string;
  /** Route path (e.g. "/about") used for the canonical og:url. */
  path?: string;
}
