/**
 * Rich, per-town landing-page content for the service-area pages.
 *
 * Kept separate from areas.ts (map coordinates + drive times) so the geographic
 * data stays clean and the marketing copy has room to breathe.
 *
 * The business is based in BLOUNTSTOWN, Calhoun County, and every page is framed
 * from there: distances are from Blountstown, and the pitch is honest to the
 * tier — Calhoun is home (weekly), the surrounding counties are regular
 * scheduled routes, and the farther towns are the bigger jobs and hauls that
 * justify the drive. Real local geography (rivers, highways, county seats,
 * named parks) keeps each page genuinely distinct rather than a doorway clone.
 *
 * SEO shape, from the keyword plan: primary target per page is
 * "lawn care <Town> FL"; junk removal is featured because "junk removal near
 * me" is one of the highest-demand terms in this market; the FAQ answers the
 * cost and coverage questions people actually search.
 *
 * A town has a page only if it has an entry here — that is the gate
 * `areasWithPages` reads.
 */

export interface AreaHighlight {
  title: string;
  body: string;
}
export interface AreaFaq {
  q: string;
  a: string;
}
export interface AreaContent {
  tagline: string;
  intro: string[];
  landmarks: string[];
  highlights: AreaHighlight[];
  faqs: AreaFaq[];
  nearby: string[];
}

export const areaContent: Record<string, AreaContent> = {
  // ============================================================
  // Core — Calhoun County (home). Weekly routes, no travel charge.
  // ============================================================
  blountstown: {
    tagline:
      "Full-service lawn care, tree work, and junk removal — based right here in Blountstown, out across Calhoun County every day.",
    intro: [
      "Blountstown is home. Faith Lawn Care is based right here on the Apalachicola River in Calhoun County, which means when you call, you're getting the local crew — not an outfit dispatched from Panama City or Tallahassee. Our trucks are somewhere in and around town most days, so a Blountstown yard rarely waits, and when a limb comes down or a rental has to be cleared in a hurry, we can usually get to you fast.",
      "We handle the whole property, not just the grass. One crew mows and edges, shapes the hedges, freshens the beds, takes down the dead or storm-leaning tree, pressure-washes the drive, and hauls off every bit of it when we go. Blountstown and the rest of the river country took real tree damage from Hurricane Michael, and years on we still get called out to pines and hardwoods that have been quietly leaning ever since — that's worth a look before the next big wind decides it for you.",
      "The junk-removal side is as busy as the lawn side. Between rental turnovers, downsizing, shed and barn cleanouts, and storm debris, a lot of our Blountstown calls are hauling jobs — appliances, old furniture, brush piles, the stuff the county pickup won't take. We load it from wherever it sits, and anything that can be donated or scrapped, we route it that way.",
    ],
    landmarks: [
      "Apalachicola River",
      "Downtown Blountstown",
      "Highway 20 & Highway 71",
      "Sam Atkins Park",
      "Calhoun County seat",
      "TnT Hideaway area",
    ],
    highlights: [
      { title: "We're based here", body: "Right in Blountstown — local number, local crew, and a truck that's usually nearby when you need something done fast." },
      { title: "One crew, the whole yard", body: "Mowing, beds, hedges, tree work, pressure washing, and hauling — the same people, so nobody points at the other guy." },
      { title: "Storm & tree specialists", body: "Calhoun County still has Michael leaners everywhere. We take down what's dead or shifted and haul every piece off." },
    ],
    faqs: [
      { q: "How much does lawn mowing cost in Blountstown?", a: "It depends on the lot — a small in-town yard is a different job from acreage out on the county roads — but we give a firm per-visit price before we start, and there's no charge for the estimate. Call or text 850-209-8982 and we'll come look." },
      { q: "Do you do junk removal and hauling in Blountstown?", a: "Yes — it's half of what we do. Appliances, furniture, mattresses, shed and barn cleanouts, rental turnovers, and storm debris. We load it from wherever it sits and route whatever we can to donation or scrap instead of the landfill." },
      { q: "Can you come out this week?", a: "Usually, yes. Blountstown is home base, so we're nearby most days and can often fit an urgent mow, cleanup, or haul in faster than anyone coming from out of town. Storm cleanup gets prioritized." },
    ],
    nearby: ["altha", "bristol", "marianna"],
  },

  altha: {
    tagline:
      "Lawn care, tree work, and junk removal in Altha — just up Highway 71 from home base in Blountstown, on our weekly Calhoun County route.",
    intro: [
      "Altha sits about twelve minutes north of us on Highway 71, in the north end of Calhoun County along the Chipola River. It's home county, so it's on our weekly route — no travel charge, no minimum job size, and we're through here constantly.",
      "It's agricultural country up here, so acreage, road frontage, and field edges are common. We handle the rough ground and the finish cut from the same crew, so you don't need a bush-hog outfit for the pasture and a separate mower for the yard. The wooded and riverside lots also need real tree and limb work, especially after a storm.",
      "And out where the county pickup won't take much, the junk-removal side earns its keep — cleanouts, old equipment, construction debris, and downed limbs, loaded from wherever they sit and hauled off. One local crew, the whole property.",
    ],
    landmarks: [
      "Highway 71 corridor",
      "Chipola River",
      "Downtown Altha",
      "North Calhoun County",
      "Farm & river country",
      "Just north of Blountstown",
    ],
    highlights: [
      { title: "Home-county weekly", body: "Twelve minutes from home base in Blountstown — Altha is on our weekly Calhoun route, no travel charge, no minimum job." },
      { title: "Acreage & finish work", body: "Bush-hogging pasture and field edges plus a clean finish cut on the yard, from the same crew in one visit." },
      { title: "Tree work & hauling", body: "Limb and tree work on the wooded, riverside lots, plus cleanouts and debris loaded and hauled off." },
    ],
    faqs: [
      { q: "Do you charge extra to come to Altha?", a: "No. Altha is home county — twelve minutes up Highway 71 from Blountstown — so it's on our weekly route with no travel surcharge and no minimum job size." },
      { q: "Can you mow acreage in Altha?", a: "Yes. Much of the work here is acreage — bush-hogging rough ground and field edges plus a clean finish cut on the yard, all one crew, one visit." },
      { q: "Do you haul off junk and debris in Altha?", a: "We do — cleanouts, old equipment, construction debris, and storm limbs, loaded from wherever they sit and hauled off." },
    ],
    nearby: ["blountstown", "marianna", "bristol"],
  },

  // ============================================================
  // Primary — surrounding counties we run to regularly.
  // ============================================================
  bristol: {
    tagline:
      "Lawn care, land clearing, tree work, and junk hauling in Bristol — just across the river from home base, in wooded Liberty County.",
    intro: [
      "Bristol is only about fifteen minutes east of us across the Apalachicola River — the county seat of Liberty County, near Torreya State Park. It's one of our closest towns, and a regular part of the route, so it's easy to schedule and no special trip.",
      "Liberty is heavily wooded country, and the work reflects it: limb and canopy clearing, storm debris, and properties where the line between yard and treeline has to be held back every season or the woods start taking it back. We keep that line cut, take down what's dead or leaning, and haul every piece off.",
      "The junk-removal side matters even more out in the trees — there's rarely an easy way to lose old appliances, construction debris, a shed's worth of accumulated junk, or a storm's worth of downed timber. We bring the truck and take it with us. Standing mows, beds, and hedges are all on the table too; it just helps to plan them onto the days we're already running to Liberty County.",
    ],
    landmarks: [
      "Apalachicola River",
      "Torreya State Park",
      "Downtown Bristol",
      "Highway 20 & Highway 12",
      "Liberty County seat",
      "Just east of Blountstown",
    ],
    highlights: [
      { title: "One of our closest", body: "Fifteen minutes east across the river from home base in Blountstown — Bristol is a regular, easy-to-schedule stop." },
      { title: "Clearing & tree work", body: "Limb and canopy clearing, land clearing, and removals — holding the treeline back season after season, everything hauled off." },
      { title: "We haul it out", body: "This far into the trees there's no easy way to lose appliances, debris, or downed timber. We bring the truck and take it all." },
    ],
    faqs: [
      { q: "Do you serve Bristol?", a: "Yes — Bristol is one of our closest towns, about fifteen minutes east of Blountstown across the Apalachicola River, and a regular part of our route." },
      { q: "Do you do land clearing and tree removal in Bristol?", a: "That's much of our Liberty County work: limb and canopy clearing, brush and land clearing, storm cleanup, and full tree removal, with everything hauled off. Anything near a power line is a utility call and we'll say so." },
      { q: "Can you haul off junk and debris in Bristol?", a: "Absolutely — old appliances, construction debris, shed cleanouts, and downed limbs all leave with us. Out in the trees, hauling it yourself is the hard part, so let us handle it." },
    ],
    nearby: ["blountstown", "hosford", "altha"],
  },

  alford: {
    tagline:
      "Lawn care and junk removal in Alford — Jackson County near Compass Lake, on our regular route north from Blountstown.",
    intro: [
      "Alford sits in south Jackson County near Compass Lake in the Hills, just off I-10, about a half-hour north of home base in Blountstown. It's part of our regular route, so getting on the schedule is easy.",
      "The lake-and-hills side of Alford brings its own quirks. Ground near the water holds moisture longer, grows harder, and pushes weeds that drier yards never see, and the rolling lots mean edging and trimming matter as much as the cut. For the seasonal and second homes around Compass Lake, we're a good fit — we keep the place cut, edged, and cleared on a schedule so it's ready when you arrive, and clean up after storms.",
      "The full range is on the table: mowing, beds and mulch, hedges, tree work, pressure washing, and junk removal. One crew handles all of it, and whatever we clear leaves with us.",
    ],
    landmarks: [
      "Compass Lake in the Hills",
      "I-10 Exit 130",
      "Highway 231 corridor",
      "Round Lake area",
      "Downtown Alford",
      "South Jackson County",
    ],
    highlights: [
      { title: "Lake-and-hills know-how", body: "Ground near Compass Lake grows harder and holds water. We treat and price for that, not a flat approach." },
      { title: "Second-home ready", body: "We keep a Compass Lake place cut, edged, and storm-cleared on a schedule, so it's ready whenever you arrive." },
      { title: "On the regular route", body: "About a half-hour north of Blountstown and on our regular run — easy to get on the schedule." },
    ],
    faqs: [
      { q: "Do you service Compass Lake properties in Alford?", a: "Yes — lake and near-water lots are regular Alford work. They grow harder and hold more water than a dry in-town yard, so we schedule and treat them accordingly." },
      { q: "Can you maintain a seasonal place in Alford?", a: "That's one of the best things to hand us. We keep it cut, edged, and cleared on a schedule and clean up after storms, so the place is ready when you get there." },
      { q: "Do you offer junk removal in Alford?", a: "We do — cleanouts, appliances, furniture, brush, and storm debris, loaded wherever they sit and hauled off." },
    ],
    nearby: ["marianna", "cottondale", "blountstown"],
  },

  hosford: {
    tagline:
      "Land clearing, tree work, and junk hauling in Hosford — deep Liberty County on the edge of the Apalachicola National Forest.",
    intro: [
      "Hosford is a small community in Liberty County on Highway 20, on the edge of the Apalachicola National Forest, about a half-hour southeast of home base in Blountstown. This is deep-woods country, and the work is mostly the heavy end — clearing, tree work, cleanups, and hauling.",
      "Out where the treeline is always advancing, keeping the line between yard and forest cut back is real, recurring work, and one we're set up for. The bigger jobs are the best fit: land and brush clearing, tree and limb removal, full property cleanups, and haul-offs where we bring the truck and take everything.",
      "The hauling is a big reason to call — this far into the forest there's no easy way to get rid of old appliances, construction debris, a shed's worth of junk, or a storm's worth of downed timber. We haul it, so you don't handle it twice.",
    ],
    landmarks: [
      "Apalachicola National Forest",
      "Highway 20 & Highway 65",
      "Downtown Hosford",
      "Liberty County",
      "Telogia vicinity",
      "Deep-woods country",
    ],
    highlights: [
      { title: "Big-job country", body: "Land clearing, tree removal, full cleanups, and haul-offs — the heavy work is what we set up for out here." },
      { title: "Holding the treeline", body: "On the edge of the national forest the woods keep advancing. We cut the line between yard and forest back, season after season." },
      { title: "We haul it out", body: "This deep in the trees there's no easy way to lose appliances, debris, or downed timber. We bring the truck and take it all." },
    ],
    faqs: [
      { q: "Do you travel to Hosford?", a: "Yes — Hosford is about a half-hour southeast of Blountstown in Liberty County, and a regular scheduled run. Larger jobs are the easiest to book here." },
      { q: "Do you do land clearing and tree removal in Hosford?", a: "That's most of our Hosford work — brush and land clearing, limb and tree removal, and storm cleanup, with everything hauled off. Anything near a power line is a utility call." },
      { q: "Can you haul off debris this far out?", a: "Absolutely — it's one of the best reasons to call us in Hosford. Appliances, construction debris, cleanouts, and downed timber all leave with us." },
    ],
    nearby: ["bristol", "blountstown", "crawfordville"],
  },

  chattahoochee: {
    tagline:
      "Lawn care, tree work, and junk removal in Chattahoochee — on the Apalachicola River at Lake Seminole, a regular run for us.",
    intro: [
      "Chattahoochee sits where the Apalachicola River meets Lake Seminole and the Jim Woodruff Dam, on US-90 in Gadsden County — about a half-hour from home base in Blountstown and a regular part of our route.",
      "The riverside and lake-adjacent ground here holds moisture, grows harder, and pushes weeds like dollarweed that drier yards never see. We treat and schedule for that rather than running an in-town playbook on the shoreline. The tree work matters especially near the river, where storms leave leaners and blow-down that need to come down and be hauled, not piled.",
      "It's full-service for us — mowing, beds and hedges, seasonal cleanups, tree work, pressure washing, and the whole junk-removal side. Rental cleanouts, appliances, construction debris, and shoreline storm mess all load onto the truck and leave with us. Want a standing schedule? It's close enough that we can usually make it work.",
    ],
    landmarks: [
      "Apalachicola River",
      "Lake Seminole",
      "Jim Woodruff Dam",
      "US-90 through town",
      "River Landing area",
      "Gadsden County",
    ],
    highlights: [
      { title: "A regular run", body: "About a half-hour from Blountstown on the river — Chattahoochee is a regular, easy-to-schedule stop." },
      { title: "We know riverfront", body: "Ground along the river and Lake Seminole grows harder and holds water. We treat and schedule for that, not a flat approach." },
      { title: "Tree work & hauling", body: "Storm leaners and shoreline blow-down get taken down and hauled — not raked into a pile for you." },
    ],
    faqs: [
      { q: "Do you serve Chattahoochee?", a: "Yes, regularly — it's about a half-hour from Blountstown on US-90 at the river, and a standing part of our route." },
      { q: "Do you handle riverfront and lake lots in Chattahoochee?", a: "Yes. Ground along the Apalachicola River and Lake Seminole grows harder and holds more water than an in-town yard, so we treat and schedule it accordingly, and haul off the debris a shoreline collects." },
      { q: "Can I get a regular mowing schedule in Chattahoochee?", a: "Usually, yes — it's close enough that we can often fit a standing weekly or bi-weekly cut in. Ask when you call and we'll set it up." },
    ],
    nearby: ["marianna", "sneads", "quincy"],
  },

  "grand-ridge": {
    tagline:
      "Lawn care and junk removal in Grand Ridge — Jackson County on US-90, on our regular run north from Blountstown.",
    intro: [
      "Grand Ridge sits on US-90 in east Jackson County, between Marianna and Sneads, about a half-hour north of home base in Blountstown and on a route we run regularly.",
      "It's a straightforward small-town mix and we cover all of it: residential yards that want a dependable cut, church grounds, rentals between tenants, and commercial lots that just need to look kept. The properties toward the river basin can hold water and grow harder, so we adjust the schedule and the mowing height to match.",
      "Because we're set up for the whole property, a Grand Ridge job doesn't need three phone numbers — we mow and edge, cut back overgrown hedges, take down the dead or leaning tree, pressure-wash the drive, and haul off whatever's piled up. Rental cleanouts, appliances, construction leftovers, and storm brush all leave with us.",
    ],
    landmarks: [
      "US-90 corridor",
      "Downtown Grand Ridge",
      "Blue Springs area",
      "Highway 69 junction",
      "East Jackson County",
      "Between Marianna and Sneads",
    ],
    highlights: [
      { title: "On the regular run", body: "Grand Ridge is on our regular route north on US-90 — an easy stop between Marianna and Sneads." },
      { title: "The whole property", body: "Grass, hedges, tree work, pressure washing, and hauling — one crew, so nobody points at the other guy." },
      { title: "Rentals & cleanouts", body: "Turn a rental between tenants: mow, cut back overgrowth, and haul the last tenant's junk in one visit." },
    ],
    faqs: [
      { q: "Do you serve Grand Ridge?", a: "Yes — Grand Ridge is on our regular US-90 route, about a half-hour north of Blountstown between Marianna and Sneads." },
      { q: "Can you turn a rental property in Grand Ridge?", a: "Yes — mow, cut back overgrowth, haul off whatever the last tenant left, and pressure-wash before a showing, all from one crew and one invoice." },
      { q: "How much does mowing cost in Grand Ridge?", a: "It depends on the lot, but we give a firm per-visit price after a quick look, with no charge for the estimate. Call or text 850-209-8982." },
    ],
    nearby: ["sneads", "marianna", "chattahoochee"],
  },

  marianna: {
    tagline:
      "Full-service lawn care, tree work, and junk removal in Marianna — the Jackson County seat, and one of our biggest markets.",
    intro: [
      "Marianna is the Jackson County seat, about thirty-five minutes north of home base in Blountstown, and one of the biggest markets we serve. It's a regular, scheduled part of our route, and there's plenty of work up here to keep us coming.",
      "The older neighborhoods around downtown and off Lafayette Street carry a lot of mature water oak and laurel oak — beautiful shade, and constant drop, so those yards need a heavier leaf schedule in fall and, sooner or later, an honest look at whether a limb belongs over the roof. Out toward the newer subdivisions off Highway 71 and 90, most lawns are centipede over builder-graded sand, which is exactly why we see so much centipede decline here: the sod goes in, gets fed like St. Augustine, and yellows by year three. Getting the feeding and mowing height right for centipede is half the battle.",
      "We handle the whole property with one crew — mowing, landscaping, hedges, tree work, pressure washing — and the junk-removal side is busier than folks expect: rental turnovers, cleanouts, appliances, and storm debris, all loaded and hauled off. Marianna near the Chipola River and Florida Caverns is beautiful country, and we keep it looking that way.",
    ],
    landmarks: [
      "Downtown & Lafayette Street",
      "Florida Caverns State Park",
      "Chipola River",
      "Highway 71 corridor",
      "US-90 & US-231",
      "Jackson County seat",
    ],
    highlights: [
      { title: "One of our biggest markets", body: "Marianna is a regular scheduled route for us — plenty of Jackson County work keeps us coming up here." },
      { title: "Centipede done right", body: "Most Marianna lawns are centipede over sand. We get the feeding and mowing height right so they don't slide into decline." },
      { title: "One crew, the whole yard", body: "Mowing, beds, hedges, tree work, pressure washing, and hauling — handled together, not spread across four contractors." },
    ],
    faqs: [
      { q: "Do you serve Marianna?", a: "Yes — Marianna is one of our biggest markets, about thirty-five minutes north of Blountstown, and a regular scheduled part of our route. There's plenty of Jackson County work that keeps us coming." },
      { q: "How much does lawn mowing cost in Marianna?", a: "It depends on lot size and how much trimming and edging there is, but we give a firm per-visit price after seeing the property, with no charge for the estimate. Call or text 850-209-8982." },
      { q: "Do you do junk removal in Marianna?", a: "Yes — rental turnovers, cleanouts, appliances, furniture, and storm debris. We load it wherever it sits and route whatever we can to donation or scrap." },
    ],
    nearby: ["grand-ridge", "cottondale", "sneads"],
  },

  sneads: {
    tagline:
      "Lawn care, tree work, and junk removal in Sneads and out toward Lake Seminole — waterfront and in-town lots both.",
    intro: [
      "Sneads sits in east Jackson County up against Lake Seminole and the Jim Woodruff Dam, about thirty-five minutes north of home base in Blountstown. The properties down toward the water are a genuinely different job from an in-town lot, and we schedule and price for the difference.",
      "Waterfront and near-water ground stays wetter, grows harder, and pushes weeds that drier yards never see — dollarweed especially, which is a drainage signal as much as a weed problem. Lake lots also collect debris that has to be hauled, not just raked into a pile. If you've got a lake place you only reach on weekends, that's exactly what we're built for: we keep it cut, edged, and cleared so it's ready when you are.",
      "In town, Sneads is an honest small-town route — residential yards, church grounds, rentals, and the occasional commercial lot — and the junk-removal side rounds it out with cleanouts, appliances, and storm mess loaded and hauled off.",
    ],
    landmarks: [
      "Lake Seminole",
      "Three Rivers State Park",
      "Jim Woodruff Dam",
      "US-90 through town",
      "River Road area",
      "East Jackson County",
    ],
    highlights: [
      { title: "We know waterfront", body: "Lake Seminole lots grow harder and wetter and push different weeds. We price and treat for that, not an in-town playbook." },
      { title: "Weekend-place ready", body: "Got a lake place you only reach on weekends? We keep it cut, cleared, and ready — and haul off what the water and wind leave behind." },
      { title: "Cleanups & hauling", body: "Storm debris and shoreline blow-down get loaded and taken off, not raked into a pile for you to deal with later." },
    ],
    faqs: [
      { q: "Do you service lake properties around Lake Seminole?", a: "Yes — waterfront lots off Lake Seminole are regular Sneads work. They grow harder and hold more water than an in-town yard, so we schedule and treat them accordingly, and haul off the debris a shoreline collects." },
      { q: "Can you maintain a weekend place in Sneads?", a: "That's one of the best things to hand us. We keep the yard cut, edged, and cleared on a schedule so the place is ready when you get there, and we clean up after storms." },
      { q: "How much does yard cleanup and hauling cost in Sneads?", a: "It depends on how much there is and where it sits, but we give a firm price after a quick look, with no charge for the estimate. Call or text 850-209-8982." },
    ],
    nearby: ["grand-ridge", "chattahoochee", "marianna"],
  },

  quincy: {
    tagline:
      "Lawn care, tree work, and junk removal in Quincy — historic Gadsden County, on our regular run east.",
    intro: [
      "Quincy is the historic seat of Gadsden County, east toward Tallahassee, about forty-five minutes from home base in Blountstown — the old tobacco-and-Coca-Cola town with the beautiful courthouse square and a canopy of big shade trees. It's a regular scheduled part of our route.",
      "Those big old shade trees are where a lot of our Quincy work lives: limb and canopy work over the historic homes, storm cleanup, and removals of trees that have gotten too big or too close. That's careful work near roofs and lines, done right and hauled off. Full property cleanups, brush clearing, larger mowing, and pressure washing round it out.",
      "The junk-removal side is a main reason folks here call — cleanouts, appliances, debris, and full clear-outs, loaded from wherever they sit and hauled off. One local crew for the whole property.",
    ],
    landmarks: [
      "Historic courthouse square",
      "Canopy shade trees",
      "US-90 corridor",
      "Gadsden County seat",
      "Pat Thomas Parkway",
      "Toward Tallahassee",
    ],
    highlights: [
      { title: "Tree & canopy work", body: "Limb work and removals around Quincy's big historic shade trees — careful work near roofs, every piece hauled off." },
      { title: "Regular route east", body: "About forty-five minutes east of Blountstown and a scheduled part of our run — easy to book." },
      { title: "Cleanouts & hauling", body: "Cleanouts, appliances, debris, and full clear-outs, loaded from wherever they sit and hauled off." },
    ],
    faqs: [
      { q: "Do you serve Quincy?", a: "Yes — Quincy is about forty-five minutes east of Blountstown in Gadsden County, and a regular scheduled part of our route." },
      { q: "Can you do tree removal in Quincy?", a: "Yes — limb and canopy work and removals around the big historic shade trees, done carefully near roofs and lines, with everything hauled off. Anything on a power line is a utility call." },
      { q: "Do you offer junk removal and cleanouts in Quincy?", a: "We do — cleanouts, appliances, debris, and full clear-outs, loaded from wherever they sit and hauled off. It's one of the main reasons folks here call." },
    ],
    nearby: ["chattahoochee", "havana", "marianna"],
  },

  "port-st-joe": {
    tagline:
      "Lawn care, tree work, and junk removal in Port St. Joe — the Gulf coast, closer to us in Blountstown than most folks think.",
    intro: [
      "Port St. Joe sits on St. Joseph Bay in Gulf County, down on the coast toward Cape San Blas — and from home base in Blountstown it's only about forty-five minutes straight down, closer than a lot of the towns to our north. That makes it a regular part of our route, not a special trip.",
      "It's full-service for us here: mowing and edging, beds and hedges, seasonal cleanups, tree and limb work, pressure washing, and the whole junk-removal side. Storm cleanup is a recurring reason to call this close to the Gulf, and the salt-air properties keep the tree and pressure-washing work steady.",
      "The hauling side is a main draw — rental and storm cleanouts, old appliances and furniture, construction debris, and the yard mess the coast collects. We load it from wherever it sits and take it with us. Want a standing schedule for a coastal place? Ask — from Blountstown, it's well within reach.",
    ],
    landmarks: [
      "St. Joseph Bay",
      "Cape San Blas nearby",
      "Gulf County",
      "Highway 98 corridor",
      "Gulf coast",
      "South of Blountstown",
    ],
    highlights: [
      { title: "Closer than you'd think", body: "About forty-five minutes south of home base in Blountstown — nearer than several of our northern towns, and a regular run." },
      { title: "Coastal tree & storm work", body: "Storm cleanup and salt-air tree and limb work, done carefully and hauled off." },
      { title: "Cleanouts & hauling", body: "Rental and storm cleanouts, appliances, furniture, and debris, loaded from wherever they sit and hauled off." },
    ],
    faqs: [
      { q: "Do you serve Port St. Joe?", a: "Yes, regularly — from Blountstown it's only about forty-five minutes straight down the coast, closer than several of our northern towns, so it's a standing part of our route." },
      { q: "Can I get regular service for a coastal place in Port St. Joe?", a: "You can — it's well within reach from home base. We keep it cut, edged, and storm-cleared on a schedule so it's ready when you are. Ask when you call." },
      { q: "Do you do junk removal in Port St. Joe?", a: "We do — rental and storm cleanouts, appliances, furniture, and construction debris, loaded and hauled off." },
    ],
    nearby: ["blountstown", "apalachicola", "panama-city"],
  },

  "panama-city": {
    tagline:
      "Lawn care, tree work, storm cleanup, and junk removal in Panama City — the Gulf coast, a regular run south from Blountstown.",
    intro: [
      "Panama City is on the Gulf coast in Bay County, about fifty minutes south of home base in Blountstown — a regular part of our route, and after everything the coast has been through since Hurricane Michael, a lot of the work down here is cleanup and hauling.",
      "We handle the full range: mowing and edging, beds and hedges, tree and limb removal, pressure washing, and seasonal cleanups. Michael left a lot of damaged and leaning trees along the coast, and some are still standing — that's careful work near homes and lines, done right and hauled off.",
      "The junk-removal side is a main reason to call: rental and storm cleanouts, old appliances and furniture, construction and remodel debris, and yard-and-lot storm mess. We load it from wherever it sits and take it with us. For a real project — a cleanout, a haul, tree work, a big cleanup — Panama City is well within our regular reach.",
    ],
    landmarks: [
      "Gulf coast",
      "Bay County",
      "US-231 & Highway 77",
      "St. Andrews vicinity",
      "Panama City Beach nearby",
      "South of Blountstown",
    ],
    highlights: [
      { title: "A regular run", body: "About fifty minutes south of home base in Blountstown, and a standing part of our route to the coast." },
      { title: "Storm tree work", body: "Michael left leaners and damaged trees along the coast. We take down what's dangerous and haul every piece off." },
      { title: "Cleanouts & hauling", body: "Rental and storm cleanouts, appliances, furniture, and debris, loaded from wherever they sit and hauled off." },
    ],
    faqs: [
      { q: "Do you serve Panama City?", a: "Yes — Panama City is about fifty minutes south of Blountstown on the coast, and a regular part of our route. Cleanups, hauling, and tree work are especially common." },
      { q: "Can you take down storm-damaged trees in Panama City?", a: "Yes — leaning and damaged trees, plenty still around from Michael, taken down carefully and hauled off. Anything on a power line is a utility call." },
      { q: "Do you do junk removal in Panama City?", a: "We do — rental and storm cleanouts, appliances, furniture, and construction debris, loaded and hauled off." },
    ],
    nearby: ["port-st-joe", "blountstown", "chipley"],
  },

  apalachicola: {
    tagline:
      "Lawn care, tree work, and junk removal in Apalachicola — the historic Gulf coast, a regular run south from Blountstown.",
    intro: [
      "Apalachicola is the historic oyster-and-fishing town on the Gulf in Franklin County, where the Apalachicola River meets the bay — about fifty-five minutes straight down the river country from home base in Blountstown, and a regular part of our route.",
      "The historic homes and shaded, salt-air properties bring steady tree and limb work — careful removals and storm cleanup near old structures — along with mowing, beds, hedges, brush clearing, and pressure washing. It's the full range, and one local crew handles all of it.",
      "The junk-removal side is a main reason folks here call: rental and estate cleanouts, old appliances and furniture, construction and remodel debris, and the storm mess the coast gathers. We load it from wherever it sits and take it with us, donating or scrapping whatever we reasonably can.",
    ],
    landmarks: [
      "Historic downtown",
      "Apalachicola River & Bay",
      "Franklin County",
      "Highway 98 corridor",
      "Gulf coast",
      "Down the river from Blountstown",
    ],
    highlights: [
      { title: "A regular coastal run", body: "About fifty-five minutes down the river country from home base in Blountstown — a standing part of our route." },
      { title: "Careful tree work", body: "Removals and storm cleanup around the historic homes and salt-air properties — done carefully, hauled off." },
      { title: "Cleanouts & hauling", body: "Rental and estate cleanouts, appliances, furniture, and debris, loaded from wherever they sit and hauled off." },
    ],
    faqs: [
      { q: "Do you serve Apalachicola?", a: "Yes — Apalachicola is about fifty-five minutes down the river country from Blountstown on the coast, and a regular part of our route." },
      { q: "Can you do tree work near the historic homes?", a: "Yes — careful removals and storm cleanup around old structures, plus brush clearing, all hauled off. Anything on a power line is a utility call." },
      { q: "Do you do junk removal in Apalachicola?", a: "We do — rental and estate cleanouts, appliances, furniture, and construction debris, loaded from wherever they sit and hauled off." },
    ],
    nearby: ["port-st-joe", "blountstown", "bristol"],
  },

  // ============================================================
  // Extended — farther out. Bigger jobs, hauls, and tree work.
  // ============================================================
  cottondale: {
    tagline:
      "Lawn care, acreage mowing, and junk removal in Cottondale — Jackson County on US-90, one of our regular runs north.",
    intro: [
      "Cottondale sits on US-90 in Jackson County right off I-10, about forty-five minutes north of home base in Blountstown. It's beyond our home county, but a regular part of the Jackson County work we run north for.",
      "A lot of Cottondale work is acreage — larger home lots, open ground, and long road frontage that needs bush-hogging as much as a finish cut. We're set up for both, from the same crew in one visit, so you don't need a separate outfit for the rough ground.",
      "The bigger jobs are the easiest to schedule up here — cleanups, tree work, and hauling — and the junk-removal side is a main draw: shed and equipment cleanouts, brush piles, construction leftovers, and storm debris, loaded and hauled off. If you want a standing mow, ask, and we'll fold you into a Jackson County day.",
    ],
    landmarks: [
      "US-90 corridor",
      "I-10 Exit 136",
      "Downtown Cottondale",
      "Orange Hill",
      "Jackson County",
      "North of Blountstown",
    ],
    highlights: [
      { title: "Acreage & finish work", body: "Bush-hogging rough ground and long road frontage plus a clean finish cut on the yard — same crew, one visit." },
      { title: "On the Jackson run", body: "About forty-five minutes north of Blountstown and a regular part of the Jackson County work we run for." },
      { title: "Cleanouts & hauling", body: "Shed and equipment cleanouts, brush piles, and storm debris — loaded and hauled off in the same trip." },
    ],
    faqs: [
      { q: "Do you serve Cottondale?", a: "Yes — Cottondale is about forty-five minutes north of Blountstown on US-90, and a regular part of the Jackson County work we run for. Larger jobs and standing routes are easiest to schedule." },
      { q: "Can you mow acreage in Cottondale?", a: "Yes — bush-hogging rough ground and long road frontage plus a clean finish cut on the yard, from the same crew in one visit." },
      { q: "Do you haul off junk and brush in Cottondale?", a: "We do — shed and equipment cleanouts, brush piles, construction leftovers, and storm debris, loaded from wherever they sit and hauled off." },
    ],
    nearby: ["marianna", "alford", "chipley"],
  },

  greenwood: {
    tagline:
      "Lawn care, tree work, and junk removal in Greenwood — historic Jackson County, on our runs north for the bigger work.",
    intro: [
      "Greenwood is one of the oldest towns in Jackson County, up Highway 71 about forty-five minutes north of home base in Blountstown. It's part of the Jackson County work we run north for, with the larger jobs and grouped routes the easiest to schedule.",
      "The old part of Greenwood is full of mature shade trees and established yards that need a careful hand — cut and edged clean, hedges shaped, beds kept, and the big limbs watched, since an old oak over a porch is worth an honest look before a storm. Out on the surrounding acreage we bush-hog rough ground and finish the yard from the same crew.",
      "And the junk-removal side folds right in on a Jackson County day — shed cleanouts, old equipment, brush, and storm limbs, loaded and hauled off. Ask about a standing schedule and we'll often make it work.",
    ],
    landmarks: [
      "Historic Greenwood",
      "Highway 71 corridor",
      "Blue Springs Road area",
      "Great Oaks vicinity",
      "North Jackson County",
      "North of Marianna",
    ],
    highlights: [
      { title: "Old yards, careful work", body: "Established Greenwood yards with big shade trees get a steady hand — cut, edged, and watched for problem limbs." },
      { title: "On the Jackson run", body: "Part of the Jackson County work we run north for — larger jobs and grouped routes are easiest to schedule." },
      { title: "Haul it while we're here", body: "Shed cleanouts, old equipment, brush, and storm debris load onto the truck and leave with us." },
    ],
    faqs: [
      { q: "Do you serve Greenwood?", a: "Yes — Greenwood is part of the Jackson County work we run north for, about forty-five minutes from Blountstown. Larger jobs and grouped routes are easiest to schedule; ask about a standing mow and we'll often make it work." },
      { q: "Can you handle acreage and rough ground around Greenwood?", a: "Yes — bush-hogging rough ground and long road frontage plus a clean finish cut on the yard, all from the same crew." },
      { q: "Do you do junk removal in Greenwood?", a: "We do — cleanouts, appliances, old equipment, brush, and storm debris, loaded and hauled off." },
    ],
    nearby: ["marianna", "malone", "bascom"],
  },

  chipley: {
    tagline:
      "Lawn care, landscaping, and junk removal in Chipley — Washington County on US-90, on our runs west for the bigger work.",
    intro: [
      "Chipley is the seat of Washington County, out west on US-90 and I-10, about forty-five minutes from home base in Blountstown — home to Falling Waters State Park. It's a regular part of the work we run west for, with grouped routes and larger jobs easiest to schedule.",
      "We do the full range: mowing with clean edges, bed and mulch work, hedge trimming, seasonal cleanups, fertilization timed to the Panhandle calendar, tree work, pressure washing, and the whole junk-removal side. One crew, the entire property.",
      "The junk and hauling piece is a main draw — rental turnovers, downsizing, shed and garage cleanouts, construction leftovers, and storm debris, loaded and hauled off. If you want a dependable standing schedule around Washington County, ask — depending on how the route fills, we can usually make Chipley work.",
    ],
    landmarks: [
      "Falling Waters State Park",
      "US-90 & I-10",
      "Downtown Chipley",
      "Highway 77 corridor",
      "Washington County seat",
      "West of Blountstown",
    ],
    highlights: [
      { title: "On the western run", body: "About forty-five minutes from Blountstown on US-90 — a regular part of the work we run west for." },
      { title: "The full range", body: "Mowing, beds, hedges, fertilization on the Panhandle calendar, tree work, pressure washing, and hauling — one crew." },
      { title: "Standing schedules possible", body: "Want dependable weekly or bi-weekly service? Ask about the Chipley route — depending on how it fills, we can usually make it work." },
    ],
    faqs: [
      { q: "Do you cover Chipley and Washington County?", a: "Yes — Chipley is about forty-five minutes from Blountstown on US-90, and a regular part of the work we run west for. Grouped routes and larger jobs are easiest to schedule." },
      { q: "Can I get a regular mowing schedule in Chipley?", a: "Usually — depending on how the route fills, we can often fit Chipley in for a standing weekly or bi-weekly cut. Ask when you call." },
      { q: "Do you offer junk removal in Chipley?", a: "We do — cleanouts, appliances, furniture, construction debris, and storm mess, loaded wherever they sit and hauled off." },
    ],
    nearby: ["cottondale", "bonifay", "marianna"],
  },

  graceville: {
    tagline:
      "Lawn care and junk removal in Graceville — Jackson County near the Alabama line, on our runs north for the bigger work.",
    intro: [
      "Graceville is up in the northwest corner of Jackson County near the Alabama line, about fifty minutes north of home base in Blountstown — home to The Baptist College of Florida. It's part of the Jackson County work we run north for, with rentals, commercial lots, and larger jobs the easiest to schedule.",
      "That rental and commercial work is where being a one-crew, do-it-all outfit pays off: a property manager can hand us a unit that needs the yard mowed, the overgrown hedges cut back, the old tenant's junk hauled off, and the whole thing pressure-washed before a showing — one call, one crew, one invoice.",
      "For homeowners it's the same on a smaller scale — grass, beds, a threatening limb, and the brush pile behind the shed, handled together. And the junk-removal side is a main draw, loaded and hauled off in the same trip.",
    ],
    landmarks: [
      "The Baptist College of Florida",
      "Downtown Graceville",
      "Highway 2 & Highway 77",
      "Alabama state line",
      "Northwest Jackson County",
      "North of Marianna",
    ],
    highlights: [
      { title: "Rentals & commercial", body: "One crew mows, cuts back overgrowth, hauls the old tenant's junk, and pressure-washes before a showing — one invoice." },
      { title: "On the Jackson run", body: "Part of the Jackson County work we run north for — larger jobs and grouped routes are easiest to schedule." },
      { title: "Whole-yard service", body: "Grass, beds, a threatening limb, and the brush pile behind the shed — handled together and hauled off." },
    ],
    faqs: [
      { q: "Do you serve Graceville, near the Alabama line?", a: "Yes — Graceville is part of the Jackson County work we run north for, about fifty minutes from Blountstown, right up to the Alabama line. Larger jobs and standing routes are easiest to schedule; if you're not sure you're in range, call and ask." },
      { q: "Do you handle rental turnovers and commercial lots in Graceville?", a: "That's a lot of our Graceville work — mow, cut back overgrowth, haul off whatever the last tenant left, and pressure-wash before a showing, one crew and one invoice." },
      { q: "Is there a minimum job size?", a: "No. A single small yard, a one-time cleanup, or a standing route are all fine, and estimates are always free." },
    ],
    nearby: ["marianna", "cottondale", "jacob-city"],
  },

  "jacob-city": {
    tagline:
      "Lawn care and junk removal in Jacob City — a small, close-knit Jackson County town, on our runs north for the bigger work.",
    intro: [
      "Jacob City is a small town in northwest Jackson County near Campbellton, about fifty minutes north of home base in Blountstown. It's part of the Jackson County work we run north for, and in a town this size, dependability is the whole thing.",
      "Faith Lawn Care is local, we answer our own phone, and we show up when we say we will — no national call center, no crew that suddenly stops coming. We handle the full property so you're not chasing separate help for every job: mowing and edging, hedges, beds, a threatening limb, pressure washing, and hauling.",
      "The junk-removal side matters as much as the grass — rental cleanouts, old appliances, a shed to empty, or storm brush, loaded wherever they sit and hauled off. Larger jobs and grouped routes are easiest to schedule; ask about a standing mow and we'll often make it work.",
    ],
    landmarks: [
      "Downtown Jacob City",
      "Campbellton vicinity",
      "Northwest Jackson County",
      "Highway 2 area",
      "County roads",
      "Near the Alabama line",
    ],
    highlights: [
      { title: "Local and dependable", body: "We answer our own phone and show up when we say we will — the reliability a small town actually wants." },
      { title: "One crew, one call", body: "Grass, hedges, a problem limb, pressure washing, and hauling — handled together, not spread across four contractors." },
      { title: "On the Jackson run", body: "Part of the Jackson County work we run north for — larger jobs and grouped routes are easiest to schedule." },
    ],
    faqs: [
      { q: "Do you serve Jacob City?", a: "Yes — Jacob City is part of the Jackson County work we run north for, about fifty minutes from Blountstown. Larger jobs and grouped routes are easiest to schedule; ask about a standing mow and we'll often make it work." },
      { q: "Is there a minimum job size?", a: "No. A single small yard, a one-time cleanup, or a standing route all work, and the estimate is free either way." },
      { q: "Do you do junk removal in Jacob City?", a: "We do — cleanouts, appliances, a shed to empty, and storm brush, loaded wherever they sit and hauled off." },
    ],
    nearby: ["graceville", "campbellton", "malone"],
  },

  bascom: {
    tagline:
      "Lawn care, bush-hogging, and junk removal in Bascom — north Jackson County farm country, on our runs north for the bigger work.",
    intro: [
      "Bascom is up in the north end of Jackson County near the Georgia line, in real farm country — peanuts, cotton, and open ground — about fifty-five minutes north of home base in Blountstown. It's part of the Jackson County work we run north for.",
      "A lot of Bascom work is measured in acres: big lots, long road frontage, pasture and field edges that need bush-hogging as much as the yard needs a clean cut. We handle both from the same crew, so the rough ground and the finish work don't take two companies.",
      "The trade-off of open country is nowhere convenient to put what piles up — old equipment, a barn cleanout, construction debris, or a storm's worth of limbs. That's the hauling we do, and we bring the truck to wherever it sits. Larger jobs are easiest to schedule up here.",
    ],
    landmarks: [
      "Farm & peanut country",
      "Highway 2 corridor",
      "Georgia state line",
      "Downtown Bascom",
      "North Jackson County",
      "Near Malone",
    ],
    highlights: [
      { title: "Built for acreage", body: "Bush-hogging pasture and field edges plus a clean finish cut on the yard — one crew, one visit." },
      { title: "Barn & shed cleanouts", body: "Open country has no easy way to lose old equipment and debris. We bring the truck and haul it all off." },
      { title: "On the Jackson run", body: "Part of the Jackson County work we run north for — the larger jobs are easiest to schedule." },
    ],
    faqs: [
      { q: "Do you come out to Bascom?", a: "Yes — Bascom is part of the north-Jackson-County work we run for, about fifty-five minutes from Blountstown. Larger jobs and grouped routes are easiest to schedule." },
      { q: "Can you bush-hog acreage in Bascom?", a: "That's much of our Bascom work — bush-hogging rough ground, pasture edges, and long road frontage, plus a clean finish cut on the yard." },
      { q: "Do you haul off old equipment and debris?", a: "We do — barn and shed cleanouts, old equipment, construction debris, and storm limbs, loaded and hauled off." },
    ],
    nearby: ["malone", "greenwood", "campbellton"],
  },

  havana: {
    tagline:
      "Tree work, cleanups, and junk removal in Havana — north Gadsden County, on our runs east for the bigger jobs.",
    intro: [
      "Havana sits in the north end of Gadsden County near the Georgia line, just above Tallahassee — the well-known antiques-and-arts town — about fifty-five minutes east of home base in Blountstown. It's part of the work we run east for, with the bigger jobs the best fit.",
      "The shaded, established properties around Havana bring a lot of tree and limb work: canopy thinning, storm cleanup, and removals of trees that have outgrown their spot. It's careful work near old homes, and we haul every piece off. Full property cleanups, brush and land clearing, and larger mowing round it out.",
      "The junk-removal side is a main reason folks here call — cleanouts, appliances, debris, and full clear-outs, loaded from wherever they sit and hauled off. For a standing weekly mow this far out, a local crew is usually the better fit, and we'll say so; for a real project, we're a good call.",
    ],
    landmarks: [
      "Antiques district",
      "North Gadsden County",
      "Highway 27 corridor",
      "Georgia state line",
      "Near Tallahassee",
      "East of Blountstown",
    ],
    highlights: [
      { title: "Tree & canopy work", body: "Canopy thinning, storm cleanup, and removals around Havana's shaded, established properties — every piece hauled off." },
      { title: "Big cleanups & clearing", body: "Full property cleanups, brush and land clearing, and larger mowing — the projects worth the run east." },
      { title: "Straight talk", body: "For a weekly mow this far out, a local crew is usually better, and we'll say so. We focus our Havana runs on the bigger jobs." },
    ],
    faqs: [
      { q: "Do you travel to Havana?", a: "For the larger jobs, yes — tree work, cleanups, clearing, and hauling, about fifty-five minutes east in north Gadsden County. Describe the job and we'll tell you honestly whether we can get to it." },
      { q: "Can you do tree and limb work in Havana?", a: "Yes — canopy thinning, storm cleanup, and removals around the established properties, done carefully near homes, with everything hauled off." },
      { q: "Do you do junk removal in Havana?", a: "We do — cleanouts, appliances, debris, and full clear-outs, loaded wherever they sit and hauled off." },
    ],
    nearby: ["quincy", "chattahoochee", "tallahassee"],
  },

  malone: {
    tagline:
      "Lawn care, bush-hogging, and junk removal in Malone — north Jackson County farm country near the Georgia line.",
    intro: [
      "Malone sits in the north end of Jackson County near the Georgia line, out in peanut and cotton country, about an hour north of home base in Blountstown. It's part of the Jackson County work we run north for.",
      "This is open, agricultural country: big lots, long road frontage, pasture and field edges that need bush-hogging as much as the yard needs a clean cut. We handle both from the same crew, so the rough ground and the finish work don't take two outfits.",
      "The other thing about farm country is nowhere convenient to put what piles up — old equipment, a barn cleanout, construction debris, or a storm's worth of limbs. That's the hauling we do, brought to wherever it sits. Larger jobs are easiest to schedule up here.",
    ],
    landmarks: [
      "Peanut & cotton country",
      "Highway 2 & Highway 71",
      "Georgia state line",
      "Downtown Malone",
      "North Jackson County",
      "Near Bascom",
    ],
    highlights: [
      { title: "Acreage specialists", body: "Bush-hogging pasture and field edges plus a clean finish cut — one crew, one visit." },
      { title: "Barn & farm cleanouts", body: "Old equipment, debris, and storm limbs have nowhere easy to go out here. We bring the truck and haul it off." },
      { title: "On the Jackson run", body: "Part of the north-Jackson-County work we run for — the larger jobs are easiest to schedule." },
    ],
    faqs: [
      { q: "Do you travel to Malone?", a: "Yes — Malone is part of the north-Jackson-County work we run for, about an hour from Blountstown near the Georgia line. Larger jobs and grouped routes are easiest to schedule." },
      { q: "Can you bush-hog and mow acreage in Malone?", a: "That's much of the work up here — bush-hogging rough ground, pasture edges, and long road frontage, plus a clean finish cut on the yard." },
      { q: "Do you haul off farm junk and debris?", a: "We do — barn cleanouts, old equipment, construction debris, and storm limbs, loaded and hauled off." },
    ],
    nearby: ["bascom", "campbellton", "greenwood"],
  },

  campbellton: {
    tagline:
      "Lawn care and junk removal in Campbellton — one of Jackson County's oldest towns, near the Alabama line.",
    intro: [
      "Campbellton is one of the oldest towns in Jackson County, up near the Alabama line about an hour north of home base in Blountstown. It's part of the Jackson County work we run north for, with the larger jobs and grouped routes easiest to schedule.",
      "It's agricultural country up here, and we're set up for it — bush-hogging rough ground and long road frontage as readily as a clean finish cut, plus the tree work and clearing that open, wooded-edge property always seems to need.",
      "Because we cover the whole property with one crew, a Campbellton place doesn't need a different company for every job — mow and edge, cut back overgrowth, take down the dead pine before it finds the barn, pressure-wash, and haul off whatever's accumulated. The junk-removal side is a main draw, donated or scrapped where we reasonably can.",
    ],
    landmarks: [
      "Historic Campbellton",
      "Highway 2 & Highway 231",
      "Alabama state line",
      "Northwest Jackson County",
      "Farm country",
      "Near Jacob City",
    ],
    highlights: [
      { title: "Acreage & tree work", body: "Bush-hogging, finish mowing, clearing, and taking down the dead pine before it finds the barn — all one crew." },
      { title: "On the Jackson run", body: "Part of the north-Jackson-County work we run for near the Alabama line — larger jobs are easiest to schedule." },
      { title: "We haul it off", body: "Rental cleanouts, old appliances, barn clear-outs, and storm debris load onto the truck and leave with us." },
    ],
    faqs: [
      { q: "Do you serve Campbellton?", a: "Yes — Campbellton is part of the Jackson County work we run north for, about an hour from Blountstown near the Alabama line. Larger jobs and grouped routes are easiest to schedule." },
      { q: "Can you handle acreage and tree work in Campbellton?", a: "Yes — bush-hogging and finish mowing plus clearing and removing dead or leaning trees, with everything hauled off." },
      { q: "Do you offer junk removal in Campbellton?", a: "We do — rental cleanouts, appliances, barn and shed clear-outs, and storm debris, loaded and hauled off." },
    ],
    nearby: ["jacob-city", "malone", "graceville"],
  },

  bonifay: {
    tagline:
      "Lawn care, cleanups, and junk removal in Bonifay — Holmes County on US-90, on our runs west for the bigger work.",
    intro: [
      "Bonifay is the seat of Holmes County, out west on US-90 and I-10, about an hour from home base in Blountstown — the Northwest Florida Championship Rodeo town. It's part of the work we run west for, with the fuller jobs the best fit.",
      "The good fits are seasonal and one-time cleanups, tree and limb work, larger mowing and acreage, pressure washing, and the whole junk-removal side. When you've got a real project rather than a quick pass, Bonifay is well within where we run.",
      "That hauling side is a main reason folks call — rental turnovers, old appliances and furniture, construction debris, and storm brush, loaded from wherever they sit and hauled off. If you want dependable standing service around Holmes County, ask, and depending on the route we can often make it work.",
    ],
    landmarks: [
      "US-90 & I-10",
      "Downtown Bonifay",
      "Northwest Florida Rodeo grounds",
      "Highway 79 corridor",
      "Holmes County seat",
      "West of Blountstown",
    ],
    highlights: [
      { title: "Worth-the-run work", body: "Cleanups, tree work, larger mowing, and hauling — the fuller jobs are the best fit in Bonifay, and within our reach." },
      { title: "Junk & hauling", body: "Rental turnovers, appliances, construction debris, and storm brush, loaded from wherever they sit and hauled off." },
      { title: "Standing schedules possible", body: "Want regular service in Holmes County? Ask — depending on the route, we can often make Bonifay work." },
    ],
    faqs: [
      { q: "Do you travel to Bonifay?", a: "Yes — Bonifay is about an hour west of Blountstown on US-90 and I-10, part of the work we run west for. Larger jobs and hauls are easiest to schedule, and standing service is sometimes possible too." },
      { q: "Do you offer junk removal in Bonifay?", a: "We do — cleanouts, appliances, furniture, construction debris, and storm brush, loaded and hauled off." },
      { q: "Can you do a one-time cleanup in Bonifay?", a: "Yes — seasonal and one-time cleanups, tree and limb work, and full property clear-ups, with everything hauled off. Free estimate, no obligation." },
    ],
    nearby: ["chipley", "cottondale", "graceville"],
  },

  tallahassee: {
    tagline:
      "Junk removal, hauling, tree work, and big cleanups in Tallahassee — the projects we'll make the run east for.",
    intro: [
      "Tallahassee is the state capital, east on I-10, about an hour from home base in Blountstown — canopy roads, live oaks, and Spanish moss. It's outside our regular routes, and we'll be honest about that: Tallahassee isn't weekly-mow territory for a Calhoun County crew. What we do make the drive for is the bigger, one-time work.",
      "Junk removal and hauling leads the list: rental and estate cleanouts, old appliances and furniture, construction and remodel debris, and storm cleanup. A whole-house or whole-property clear-out is exactly the kind of job worth the trip, and we load it from wherever it sits. Those famous live oaks also mean tree work — big-limb removal and storm cleanup near homes and lines, done right and hauled off.",
      "For a standing weekly lawn in Tallahassee, a local crew is the right call and we'll say so plainly. But for a real cleanout, a haul, a tree job, or a big cleanup, call and describe it — we'll tell you straight whether we can get to it.",
    ],
    landmarks: [
      "Canopy roads & live oaks",
      "I-10 corridor",
      "Leon County",
      "Downtown Tallahassee",
      "Lake Jackson vicinity",
      "State capital",
    ],
    highlights: [
      { title: "Cleanouts & hauling", body: "Whole-house and whole-property clear-outs, appliances, furniture, and debris — the big jobs we'll make the run east for." },
      { title: "Live-oak tree work", body: "Big-limb removal and storm cleanup around Tallahassee's oaks — careful work near homes, every piece hauled off." },
      { title: "We'll be straight", body: "For a weekly mow, a Tallahassee-local crew is right, and we'll say so. We focus our trips here on the bigger jobs." },
    ],
    faqs: [
      { q: "Do you work in Tallahassee?", a: "For the larger jobs, yes — cleanouts, hauling, tree work, and big cleanups, about an hour east on I-10. Weekly lawn service in Tallahassee isn't our lane, but a real project that justifies the drive often is. Call and describe it." },
      { q: "Do you do junk removal in Tallahassee?", a: "That's the main thing we make the trip for — rental and estate cleanouts, appliances, furniture, and construction debris, loaded from wherever they sit and hauled off." },
      { q: "Can you do tree work in Tallahassee?", a: "Yes — big-limb removal and storm cleanup around the live oaks, done carefully near homes and lines, with everything hauled off. Anything on a power line is a utility call." },
    ],
    nearby: ["quincy", "havana", "crawfordville"],
  },

  dothan: {
    tagline:
      "Junk removal, hauling, tree work, and cleanups in Dothan, AL — the larger jobs we'll cross the state line for.",
    intro: [
      "Dothan is the big town just north of the Florida line in Houston County, Alabama — the Peanut Capital — about an hour and five minutes from home base in Blountstown. We're a Florida Panhandle company, so Dothan isn't weekly-mow territory for us, and we'll be straight about that. What we cross the line for is the bigger work.",
      "Junk removal and hauling is the heart of it: rental and estate cleanouts, old appliances and furniture, construction and remodel debris, and storm cleanup. If you've got a garage, a house, or a rental full of stuff to clear, that's the kind of job we'll make the drive for, loaded from wherever it sits. Tree and limb removal, land and brush clearing, and full one-time cleanups round it out.",
      "For a standing weekly lawn, you're honestly better with someone based in Dothan, and we'll tell you so. But for a real cleanout, haul, or clearing job, call and describe it — we'll give you a straight answer on whether we can get to it.",
    ],
    landmarks: [
      "Houston County, Alabama",
      "US-231 corridor",
      "Ross Clark Circle",
      "Florida state line",
      "Peanut Capital",
      "North of the Panhandle",
    ],
    highlights: [
      { title: "Cleanouts & hauling", body: "Rental and estate cleanouts, appliances, furniture, and construction debris — the big clear-outs we'll cross the line for." },
      { title: "Tree work & clearing", body: "Tree and limb removal, brush and land clearing, and full one-time cleanups — projects worth the drive." },
      { title: "Straight answers", body: "For a weekly mow you're better with someone in Dothan, and we'll say so. For a real haul or clearing job, we'll tell you if we can get there." },
    ],
    faqs: [
      { q: "Do you work in Dothan, Alabama?", a: "For the larger jobs, yes — cleanouts, hauling, tree work, and clearing, about an hour north across the line. Weekly lawn service in Dothan isn't our lane, but a real project that justifies the drive often is. Call and describe it." },
      { q: "Do you do junk removal in Dothan?", a: "That's the main thing we cross the line for — rental and estate cleanouts, appliances, furniture, and construction debris, loaded from wherever they sit and hauled off." },
      { q: "Will you do weekly mowing in Dothan?", a: "Honestly, for a standing weekly mow you're better with a Dothan-based crew, and we'll tell you that. We focus our Dothan trips on the bigger cleanout, hauling, and tree jobs." },
    ],
    nearby: ["marianna", "malone", "campbellton"],
  },

  crawfordville: {
    tagline:
      "Cleanups, tree work, and junk removal in Crawfordville — Wakulla County south of Tallahassee, the bigger jobs worth the run.",
    intro: [
      "Crawfordville is the seat of Wakulla County, south of Tallahassee near Wakulla Springs and the St. Marks country, about an hour and five minutes from home base in Blountstown. It's at the edge of where we run, so we save Crawfordville trips for the work that justifies the drive.",
      "This is pine-flatwoods and spring country, and the fits are the heavier jobs: land and brush clearing, tree and limb removal, full one-time property cleanups, and the junk-removal side — cleanouts, appliances, debris, and storm mess loaded from wherever it sits. Where the treeline is always close, keeping the line between yard and woods cut back is real, recurring work we're set up for.",
      "For a standing weekly lawn this far out, a Crawfordville-local crew is honestly the better fit, and we'll tell you so. But for a cleanout, a haul, a clearing job, or a big cleanup, call and describe it and we'll give you a straight answer.",
    ],
    landmarks: [
      "Wakulla Springs vicinity",
      "St. Marks country",
      "US-319 corridor",
      "Wakulla County seat",
      "Pine flatwoods",
      "South of Tallahassee",
    ],
    highlights: [
      { title: "Clearing & tree work", body: "Land and brush clearing and tree removal in the pine-flatwoods country — the heavy work worth the drive." },
      { title: "Cleanouts & hauling", body: "Cleanouts, appliances, debris, and storm mess loaded from wherever they sit and hauled off." },
      { title: "Straight answers", body: "For a weekly mow, a Crawfordville-local crew is better and we'll say so. We focus our runs here on the bigger jobs." },
    ],
    faqs: [
      { q: "Do you travel to Crawfordville?", a: "For the larger jobs, yes — clearing, tree work, cleanups, and hauling, about an hour out in Wakulla County. Weekly mowing that far isn't our lane; describe a real project and we'll tell you straight." },
      { q: "Do you do land clearing in Crawfordville?", a: "Yes — brush and land clearing and tree and limb removal in the pine-flatwoods country, with everything hauled off. Anything on a power line is a utility call." },
      { q: "Do you offer junk removal in Crawfordville?", a: "We do — cleanouts, appliances, debris, and storm mess, loaded from wherever they sit and hauled off." },
    ],
    nearby: ["tallahassee", "hosford", "quincy"],
  },

  "defuniak-springs": {
    tagline:
      "Cleanups, tree work, and junk removal in DeFuniak Springs — Walton County, the bigger jobs worth the drive west.",
    intro: [
      "DeFuniak Springs is the seat of Walton County, west on US-90 and I-10, about an hour and fifteen minutes from home base in Blountstown — built around the near-perfect round spring lake and the historic Chautauqua district. It's beyond our regular routes, so we save DeFuniak trips for the work that justifies the drive.",
      "Junk removal and hauling is the heart of what we'll come out for: rental and estate cleanouts, old appliances and furniture, construction and remodel debris, and storm cleanup. If there's a real clear-out to do, that's the kind of job we'll make the trip for, loaded from wherever it sits. Tree and limb removal, land and brush clearing, and full one-time cleanups round out the fits.",
      "For a standing weekly lawn this far west, you're genuinely better with a DeFuniak-local crew, and we'll tell you that. But for a cleanout, a haul, tree work, or a big cleanup, describe it when you call and we'll give you a straight answer.",
    ],
    landmarks: [
      "Round Lake DeFuniak",
      "Chautauqua district",
      "US-90 & I-10",
      "Walton County seat",
      "Highway 331 corridor",
      "West of the Panhandle",
    ],
    highlights: [
      { title: "Cleanouts & hauling", body: "Rental and estate cleanouts, appliances, furniture, and construction debris — the big clear-outs we'll make the west run for." },
      { title: "Tree work & clearing", body: "Tree and limb removal, brush and land clearing, and full one-time cleanups — projects worth the drive." },
      { title: "Honest about distance", body: "For a weekly mow, a DeFuniak-local crew is better and we'll say so. We focus our trips here on the bigger jobs and hauls." },
    ],
    faqs: [
      { q: "Do you serve DeFuniak Springs?", a: "For the larger jobs, yes — cleanouts, hauling, tree work, and clearing, about an hour and fifteen minutes west. Weekly lawn service that far out isn't our lane; call and describe a real project and we'll tell you straight." },
      { q: "Do you do junk removal in DeFuniak Springs?", a: "That's the main thing we make the trip for — rental and estate cleanouts, appliances, furniture, and construction debris, loaded and hauled off." },
      { q: "Will you do weekly mowing in DeFuniak Springs?", a: "Honestly, for a standing weekly mow you're better with a local crew, and we'll tell you that. We focus our DeFuniak runs on the bigger cleanout, hauling, and tree jobs." },
    ],
    nearby: ["bonifay", "chipley", "panama-city"],
  },
};

export function getAreaContent(slug: string): AreaContent | undefined {
  return areaContent[slug];
}

/** Slugs that have a full landing page. Drives areasWithPages + the map links. */
export const areaPageSlugs = new Set(Object.keys(areaContent));
