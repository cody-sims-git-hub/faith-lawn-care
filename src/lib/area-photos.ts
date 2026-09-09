/**
 * The pool of lawn photographs sprinkled onto the service-area landing pages.
 *
 * The location pages were text-only; a single photograph per page gives them
 * visual weight without touching the town-specific copy that keeps each page
 * genuinely distinct. Every town is assigned one photo from this pool by
 * `pickAreaPhoto`, deterministically and stably across builds, but evenly
 * spread so no single image is overused across the page set.
 *
 * These are the company's OWN photos, so the alt text and captions describe the
 * work honestly and never claim a specific town — one photo is reused across
 * several pages and must not pretend to be any one place. Deliberately kept OUT
 * of this pool: the homepage hero (front-lawn-green) stays unique to the front
 * page, lawn-brick-house already carries the home/about/gallery, and the
 * before/after and pressure-washing pairs read as pairs only on the gallery.
 * When the client sends more photos, add them to `src/assets/`, import them
 * here, and push an entry onto `areaPhotos`; the rotation widens on its own.
 */
import crewBlowing from "~/assets/crew-blowing-clippings.jpg";
import mobileHomeLawn from "~/assets/mobile-home-lawn.jpg";
import farmhouseAcreage from "~/assets/farmhouse-acreage-after.jpg";
import roadsideLawn from "~/assets/roadside-lawn-mowed.jpg";
import ranchHouseLawn from "~/assets/ranch-house-lawn.jpg";
import streetLawnStriped from "~/assets/street-lawn-striped.jpg";
import type { ImageMetadata } from "astro";
import { areaPageSlugs } from "./area-content";

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
    image: farmhouseAcreage,
    alt: "A wide rural acreage lawn mowed clean around a farmhouse, cut back from the treeline",
    caption: "Acreage knocked down and cleaned up",
  },
  {
    image: roadsideLawn,
    alt: "A roadside lot in the Florida Panhandle freshly mowed level from the highway shoulder back toward the home",
    caption: "Roadside lot, cut to the road's edge",
  },
  {
    image: ranchHouseLawn,
    alt: "A wide open lawn freshly mowed in front of a ranch-style Panhandle home, cut clean around the beds and trees",
    caption: "Open yard mowed around the beds",
  },
  {
    image: streetLawnStriped,
    alt: "A neighborhood front lawn cut in clean stripes along the sidewalk on a shaded Florida Panhandle street",
    caption: "Striped clean along the sidewalk",
  },
];

// Round-robin over the alphabetically-sorted town slugs, so the pool spreads as
// evenly as the count allows (no image on more pages than any other) and the
// assignment is stable build to build. A pure per-slug hash clustered these
// particular slugs badly (one photo on six pages, another on one).
const orderedSlugs = [...areaPageSlugs].sort();

/** Deterministically pick one photo for a town, evenly spread across the pool. */
export function pickAreaPhoto(slug: string): AreaPhoto {
  const idx = orderedSlugs.indexOf(slug);
  if (idx >= 0) return areaPhotos[idx % areaPhotos.length];
  // Fallback for a slug not in the page set (shouldn't happen): djb2 hash.
  let hash = 5381;
  for (const ch of slug) hash = ((hash * 33) ^ ch.charCodeAt(0)) >>> 0;
  return areaPhotos[hash % areaPhotos.length];
}
