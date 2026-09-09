/**
 * The pool of lawn photographs sprinkled onto the service-area landing pages.
 *
 * The location pages were text-only; a single photograph per page gives them
 * visual weight without touching the town-specific copy that keeps each page
 * genuinely distinct. Every town is assigned one photo deterministically from
 * this pool (see `pickAreaPhoto`), so the choice is stable across builds — no
 * layout shift, no per-request randomness — but varies from town to town.
 *
 * These are the company's OWN photos, so the alt text and captions describe the
 * work honestly and never claim a specific town — one photo is reused across
 * several pages and must not pretend to be any one place. The homepage hero
 * (hero-lawn) and the before/after pair are deliberately kept OUT of this pool:
 * the hero stays unique to the front page, and the before/after reads as a pair
 * only on the gallery. When the client sends more photos, add them to
 * `src/assets/`, import them here, and push an entry onto `areaPhotos`; the
 * rotation widens on its own with no page edits.
 */
import lawnBrickHouse from "~/assets/lawn-brick-house.jpg";
import mobileHomeLawn from "~/assets/mobile-home-lawn.jpg";
import frontLawnGreen from "~/assets/front-lawn-green.jpg";
import farmhouseAcreage from "~/assets/farmhouse-acreage-after.jpg";
import crewBlowing from "~/assets/crew-blowing-clippings.jpg";
import type { ImageMetadata } from "astro";

export interface AreaPhoto {
  image: ImageMetadata;
  /** Generic, town-agnostic alt — the same photo is reused across pages. */
  alt: string;
  /** Short caption rendered under the photo. */
  caption: string;
}

export const areaPhotos: AreaPhoto[] = [
  {
    image: crewBlowing,
    alt: "A Faith Lawn Care crew member clearing grass clippings off the walk with a backpack blower after a fresh mow",
    caption: "Every visit ends with the clippings blown off",
  },
  {
    image: mobileHomeLawn,
    alt: "A freshly mowed green lawn around a manufactured home in the Florida Panhandle, trimmed to the treeline",
    caption: "Full property mow, cut to the treeline",
  },
  {
    image: frontLawnGreen,
    alt: "A thick, freshly cut and edged front lawn running out to the driveway of a Panhandle home",
    caption: "Edged clean along the walk and drive",
  },
  {
    image: farmhouseAcreage,
    alt: "A wide rural acreage lawn mowed clean around a farmhouse, cut back from the treeline",
    caption: "Acreage knocked down and cleaned up",
  },
  {
    image: lawnBrickHouse,
    alt: "A large striped residential lawn freshly cut in front of a brick house in the Florida Panhandle",
    caption: "A residential yard on the weekly route",
  },
];

/**
 * Deterministically pick a photo for a town from its slug. A djb2 hash keeps the
 * same town on the same photo every build (no layout shift, no per-request
 * randomness) while spreading the pool evenly — a plain character sum clusters
 * neighbouring slugs onto the same image.
 */
export function pickAreaPhoto(slug: string): AreaPhoto {
  let hash = 5381;
  for (const ch of slug) hash = ((hash * 33) ^ ch.charCodeAt(0)) >>> 0;
  return areaPhotos[hash % areaPhotos.length];
}
