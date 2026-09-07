/**
 * Service-area coverage, anchored on Marianna.
 *
 * Coordinates are real (WGS84) because the interactive coverage map on
 * /service-areas projects them directly — it is a true map of where the crews
 * go, not a decorative diagram. Drive times are approximate from Marianna and
 * are what decides the tier.
 *
 * Tiers:
 *   core     — Jackson County. Regular routes; we are here every week.
 *   primary  — Calhoun + Liberty. Scheduled routes, slightly longer lead time.
 *   extended — inside roughly two hours. Larger jobs and hauls; call to confirm.
 */

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
  /**
   * Genuinely town-specific copy. A town only gets its own page when there is
   * something real to say about it — otherwise it is listed on the index and
   * nothing more. Near-identical pages per town are doorway pages, and they
   * get treated as such.
   */
  localNote?: string[];
}

export const HUB_SLUG = "marianna";

export const areas: Area[] = [
  // ---- Core: Jackson County ----
  {
    slug: "marianna",
    name: "Marianna",
    county: "Jackson County",
    state: "FL",
    lat: 30.7741,
    lng: -85.2269,
    driveMinutes: 0,
    tier: "core",
    localNote: [
      "Marianna is home base, so this is where we are most days and where we can usually fit an urgent job in fastest.",
      "The older neighborhoods around downtown and off Lafayette Street carry a lot of mature water oak and laurel oak. They shade beautifully and they drop constantly — those yards need a heavier leaf schedule in fall and, sooner or later, an honest look at whether a limb is over the roof.",
      "Newer subdivisions out toward Highway 71 and 90 are mostly centipede laid over builder-graded sand. That combination is why we see so much centipede decline here: the sod goes down, gets fed like St. Augustine, and starts yellowing by year three.",
    ],
  },
  {
    slug: "greenwood",
    name: "Greenwood",
    county: "Jackson County",
    state: "FL",
    lat: 30.8663,
    lng: -85.1524,
    driveMinutes: 12,
    tier: "core",
  },
  {
    slug: "cottondale",
    name: "Cottondale",
    county: "Jackson County",
    state: "FL",
    lat: 30.7974,
    lng: -85.3777,
    driveMinutes: 15,
    tier: "core",
    localNote: [
      "Cottondale sits fifteen minutes west on 90, and it is a regular stop on our Jackson County route — no travel surcharge, no minimum acreage.",
      "A lot of what we mow out here is measured in acres rather than square feet: larger lots, open ground, and long road frontage that needs bush-hogging as much as it needs a finish cut. We are set up for both.",
    ],
  },
  {
    slug: "alford",
    name: "Alford",
    county: "Jackson County",
    state: "FL",
    lat: 30.6963,
    lng: -85.3891,
    driveMinutes: 15,
    tier: "core",
  },
  {
    slug: "grand-ridge",
    name: "Grand Ridge",
    county: "Jackson County",
    state: "FL",
    lat: 30.7135,
    lng: -84.9955,
    driveMinutes: 15,
    tier: "core",
  },
  {
    slug: "sneads",
    name: "Sneads",
    county: "Jackson County",
    state: "FL",
    lat: 30.708,
    lng: -84.9258,
    driveMinutes: 20,
    tier: "core",
    localNote: [
      "Sneads is twenty minutes east, and the properties down toward Lake Seminole are a different job from an in-town lot.",
      "Waterfront and near-water ground stays wetter, grows harder, and pushes weeds that drier yards never see — dollarweed especially, which is a drainage signal more than a weed problem. Shoreline lots also collect storm debris that has to be hauled rather than piled.",
    ],
  },
  {
    slug: "bascom",
    name: "Bascom",
    county: "Jackson County",
    state: "FL",
    lat: 30.9327,
    lng: -85.1194,
    driveMinutes: 20,
    tier: "core",
  },
  {
    slug: "jacob-city",
    name: "Jacob City",
    county: "Jackson County",
    state: "FL",
    lat: 30.8341,
    lng: -85.3488,
    driveMinutes: 20,
    tier: "core",
  },
  {
    slug: "malone",
    name: "Malone",
    county: "Jackson County",
    state: "FL",
    lat: 30.9552,
    lng: -85.1616,
    driveMinutes: 25,
    tier: "core",
  },
  {
    slug: "campbellton",
    name: "Campbellton",
    county: "Jackson County",
    state: "FL",
    lat: 30.9524,
    lng: -85.3966,
    driveMinutes: 25,
    tier: "core",
  },
  {
    slug: "graceville",
    name: "Graceville",
    county: "Jackson County",
    state: "FL",
    lat: 30.9563,
    lng: -85.5169,
    driveMinutes: 30,
    tier: "core",
    localNote: [
      "Graceville is the northwest corner of our core area, half an hour from Marianna and close enough to the Alabama line that we take calls from just over it.",
      "We cover the mix you would expect in a small town: residential yards, church grounds, rental property between tenants, and the commercial lots along the main drag that need a dependable cut rather than a landscaping project.",
    ],
  },

  // ---- Primary: Calhoun + Liberty ----
  {
    slug: "altha",
    name: "Altha",
    county: "Calhoun County",
    state: "FL",
    lat: 30.5713,
    lng: -85.1291,
    driveMinutes: 25,
    tier: "primary",
  },
  {
    slug: "blountstown",
    name: "Blountstown",
    county: "Calhoun County",
    state: "FL",
    lat: 30.4438,
    lng: -85.0466,
    driveMinutes: 35,
    tier: "primary",
    localNote: [
      "Blountstown is our anchor in Calhoun County, about thirty-five minutes south of Marianna on 71.",
      "Because it is a scheduled run rather than a daily one, we group Calhoun work onto the same days. That is worth knowing if you want a weekly mow — tell us early and we will put you on the rotation instead of fitting you in.",
      "This stretch took real tree damage from Michael, and we still get called out to trees that have been quietly leaning ever since.",
    ],
  },
  {
    slug: "bristol",
    name: "Bristol",
    county: "Liberty County",
    state: "FL",
    lat: 30.4319,
    lng: -84.9766,
    driveMinutes: 45,
    tier: "primary",
    localNote: [
      "Bristol is the county seat of Liberty County and the far edge of our regular routes, about forty-five minutes out.",
      "Liberty is heavily wooded country, and the work reflects it: more limb and canopy clearing, more storm debris, more properties where the line between yard and treeline needs holding back every season.",
      "Larger jobs — cleanouts, hauls, tree work, full cleanups — are the easiest to schedule here, since it is worth the run.",
    ],
  },
  {
    slug: "hosford",
    name: "Hosford",
    county: "Liberty County",
    state: "FL",
    lat: 30.3893,
    lng: -84.8113,
    driveMinutes: 55,
    tier: "primary",
  },

  // ---- Extended: roughly two hours ----
  {
    slug: "chipley",
    name: "Chipley",
    county: "Washington County",
    state: "FL",
    lat: 30.781,
    lng: -85.5386,
    driveMinutes: 30,
    tier: "extended",
    localNote: [
      "Chipley is only about thirty minutes west on Highway 90 — closer than several towns we treat as core — so in practice we are out here often.",
      "If you are in or around Washington County and want a regular mowing schedule rather than one-off work, ask. Depending on how the route fills, we can usually make it work.",
    ],
  },
  {
    slug: "chattahoochee",
    name: "Chattahoochee",
    county: "Gadsden County",
    state: "FL",
    lat: 30.7038,
    lng: -84.8438,
    driveMinutes: 30,
    tier: "extended",
  },
  {
    slug: "bonifay",
    name: "Bonifay",
    county: "Holmes County",
    state: "FL",
    lat: 30.7913,
    lng: -85.6794,
    driveMinutes: 40,
    tier: "extended",
  },
  {
    slug: "dothan",
    name: "Dothan",
    county: "Houston County",
    state: "AL",
    lat: 31.2232,
    lng: -85.3905,
    driveMinutes: 45,
    tier: "extended",
  },
  {
    slug: "quincy",
    name: "Quincy",
    county: "Gadsden County",
    state: "FL",
    lat: 30.5871,
    lng: -84.5833,
    driveMinutes: 50,
    tier: "extended",
  },
  {
    slug: "havana",
    name: "Havana",
    county: "Gadsden County",
    state: "FL",
    lat: 30.6238,
    lng: -84.4141,
    driveMinutes: 55,
    tier: "extended",
  },
  {
    slug: "defuniak-springs",
    name: "DeFuniak Springs",
    county: "Walton County",
    state: "FL",
    lat: 30.7207,
    lng: -86.1152,
    driveMinutes: 70,
    tier: "extended",
  },
  {
    slug: "tallahassee",
    name: "Tallahassee",
    county: "Leon County",
    state: "FL",
    lat: 30.4383,
    lng: -84.2807,
    driveMinutes: 70,
    tier: "extended",
  },
  {
    slug: "panama-city",
    name: "Panama City",
    county: "Bay County",
    state: "FL",
    lat: 30.1588,
    lng: -85.6602,
    driveMinutes: 75,
    tier: "extended",
  },
  {
    slug: "crawfordville",
    name: "Crawfordville",
    county: "Wakulla County",
    state: "FL",
    lat: 30.1758,
    lng: -84.3752,
    driveMinutes: 85,
    tier: "extended",
  },
  {
    slug: "port-st-joe",
    name: "Port St. Joe",
    county: "Gulf County",
    state: "FL",
    lat: 29.813,
    lng: -85.2999,
    driveMinutes: 90,
    tier: "extended",
  },
  {
    slug: "apalachicola",
    name: "Apalachicola",
    county: "Franklin County",
    state: "FL",
    lat: 29.7263,
    lng: -84.9855,
    driveMinutes: 95,
    tier: "extended",
  },
];

export const tierLabels: Record<AreaTier, string> = {
  core: "Jackson County",
  primary: "Calhoun & Liberty",
  extended: "Within ~2 hours",
};

export const tierBlurbs: Record<AreaTier, string> = {
  core: "Our home county. Regular weekly routes — no travel charge, no minimum job size.",
  primary: "Scheduled routes on set days. Tell us early and we will add you to the rotation.",
  extended: "Larger jobs, hauls, and tree work. Give us a call and we will tell you straight if we can get there.",
};

/** Towns that earn their own page — the ones with something real to say. */
export const areasWithPages = areas.filter((a) => a.localNote && a.localNote.length > 0);

export const hub = areas.find((a) => a.slug === HUB_SLUG)!;

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}

export function areasByTier(tier: AreaTier): Area[] {
  return areas.filter((a) => a.tier === tier).sort((a, b) => a.driveMinutes - b.driveMinutes);
}

/** The counties we name in copy and in the areaServed JSON-LD. */
export const countiesServed = [
  "Jackson County",
  "Calhoun County",
  "Liberty County",
  "Washington County",
  "Gadsden County",
  "Holmes County",
];
