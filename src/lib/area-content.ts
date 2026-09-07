/**
 * Rich, per-town landing-page content for the service-area pages.
 *
 * Kept separate from areas.ts (which holds map coordinates and drive times) so
 * the geographic data stays clean and the marketing copy has room to breathe.
 *
 * A town gets a page ONLY if it has an entry here — that is the gate
 * `areasWithPages` reads. Every entry is genuinely town-specific: real local
 * geography (highways, rivers, the county seat, named parks), the grasses and
 * problems particular to that spot, and an honest description of how we serve
 * it. Seven near-identical pages with the name swapped would be a doorway
 * cluster; these are not that.
 *
 * SEO shape, from the keyword plan:
 *   - primary target per page is "lawn care <Town> FL" (transactional, local)
 *   - junk removal is featured, not buried — "junk removal near me" is one of
 *     the highest-demand terms in this market and the clearest differentiator
 *   - the FAQ answers the cost and coverage questions people actually search
 *   - real landmarks and the county name anchor local relevance for the
 *     "<service> near me" queries, which are won by proximity + on-page town
 *     signals, never by stuffing "near me" into the copy
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
  /** Hero sub-line under the H1. One sentence, warm, names the work. */
  tagline: string;
  /** The narrative — "what it's like to work here". 4–6 paragraphs. */
  intro: string[];
  /** Real local reference points, shown as a "we cover" chip row. */
  landmarks: string[];
  /** Three reasons to book, framed for this town. */
  highlights: AreaHighlight[];
  /** Town-flavoured FAQ, merged with a couple of universal ones on the page. */
  faqs: AreaFaq[];
  /** Nearby town slugs, for internal links. */
  nearby: string[];
}

export const areaContent: Record<string, AreaContent> = {
  marianna: {
    tagline:
      "Mowing, landscaping, tree work, pressure washing, and junk removal — right here at home in Marianna, usually the same week you call.",
    intro: [
      "Marianna is home base for Faith Lawn Care, and it shows in how fast we can get to you. Our trucks are somewhere in Jackson County almost every day, so a Marianna yard rarely waits long — and when a limb comes down or a rental has to be cleared out in a hurry, we can usually work you in when the bigger companies out of Panama City or Dothan can't.",
      "We handle the whole property, not just the grass. One local crew mows and edges, shapes the hedges, freshens the beds with mulch or pine straw, takes down the dead water oak leaning over your carport, pressure-washes the driveway, and hauls off every bit of it when we go. If you've been juggling three different phone numbers to keep one yard looking right, that's the part people are most relieved to hand over.",
      "The older streets around downtown and off Lafayette Street are full of mature water oak and laurel oak. They give you beautiful shade and they drop constantly, so those yards need a heavier leaf schedule in fall — and, sooner or later, an honest look at whether a limb belongs over the roof. We'll tell you straight rather than sell you a removal you don't need yet.",
      "Out toward the newer subdivisions off Highway 71 and 90, most lawns are centipede laid over builder-graded sand. That combination is exactly why we see so much centipede decline in Marianna: the sod goes in, gets fed on a St. Augustine schedule, and starts yellowing by year three. Getting the feeding and the mowing height right for centipede is half of keeping those yards green.",
      "And the junk removal side is busier than people expect. Between rental turnovers, downsizing, shed and barn cleanouts, and storm debris, a lot of Marianna calls are about hauling — appliances, old furniture, brush piles, the stuff the county pickup won't take. We load it from wherever it sits; you don't have to drag it to the curb.",
    ],
    landmarks: [
      "Downtown & Lafayette Street",
      "Florida Caverns State Park area",
      "Chipola River",
      "Highway 71 corridor",
      "US-90 & US-231",
      "Indian Springs",
    ],
    highlights: [
      {
        title: "We're actually here",
        body: "Based in Marianna, not a call center three counties away. Local number, local crew, and a truck that's usually nearby when you need something done quickly.",
      },
      {
        title: "One crew, the whole yard",
        body: "Mowing, beds, hedges, tree work, pressure washing, and hauling — handled by the same people, so nobody points at the other guy.",
      },
      {
        title: "Free estimate, firm price",
        body: "We come look, tell you a number, and stick to it. No contracts, no minimum lot size, and nothing left at the curb when we leave.",
      },
    ],
    faqs: [
      {
        q: "How much does lawn mowing cost in Marianna?",
        a: "It depends on the lot — a quarter-acre in town is a different job from two acres off Highway 71 — but most in-town Marianna yards fall into a predictable range, and we give you a firm per-visit price before we start. There's no charge for the estimate. Call or text 850-209-8982 and we'll come look.",
      },
      {
        q: "Do you do junk removal and hauling in Marianna?",
        a: "Yes — it's half of what we do. Appliances, furniture, mattresses, garage and shed cleanouts, rental turnovers, and storm debris. We load it from wherever it sits, no need to move it to the curb, and anything that can be donated or scrapped we route that way instead of straight to the landfill.",
      },
      {
        q: "Can you come out this week?",
        a: "Usually, yes. Marianna is home base, so we're nearby most days and can often fit in an urgent mow, cleanup, or haul faster than anyone coming from out of town. Storm cleanup gets prioritized.",
      },
    ],
    nearby: ["cottondale", "sneads", "graceville"],
  },

  cottondale: {
    tagline:
      "Full-service lawn care and junk removal in Cottondale — a regular stop on our Jackson County route, acreage and in-town lots alike.",
    intro: [
      "Cottondale sits about fifteen minutes west of Marianna on US-90, right off the I-10 interchange, and it's a standing stop on our weekly Jackson County route. That means no travel surcharge and no minimum acreage to get on the schedule — a small in-town yard is just as welcome as a big one.",
      "A good bit of what we mow around Cottondale is measured in acres rather than square feet: larger home lots, open pasture edges, and long road frontage that needs bush-hogging as much as it needs a clean finish cut. We're set up for both, so you don't have to hire a finish mower for the yard and a separate outfit for the rough ground.",
      "The bigger properties out here also generate the kind of work a push-mower company can't touch — fence lines that need clearing, brush that's crept in from the treeline, storm limbs after a summer blow, and the occasional dead pine that needs to come down before it finds the barn roof. That's all in a day's work for our crew.",
      "And because we're already running junk and debris hauling across the county, a Cottondale cleanout is easy to fold in — old equipment, a shed full of who-knows-what, construction leftovers, or a trailer load of brush. We bring the truck, we load it, and it leaves with us.",
      "If you want a dependable every-week or every-other-week mow rather than one-off work, Cottondale is one of the easiest places for us to lock in, since we're passing through anyway. Get on the rotation and you stop having to think about it.",
    ],
    landmarks: [
      "US-90 corridor",
      "I-10 Exit 136",
      "Downtown Cottondale",
      "Sills Road area",
      "Orange Hill",
      "Jackson County line",
    ],
    highlights: [
      {
        title: "On the weekly route",
        body: "We pass through Cottondale on our regular Jackson County run, so there's no travel charge and no minimum lot size to get on the schedule.",
      },
      {
        title: "Acreage and finish work",
        body: "Bush-hogging the rough ground and a clean finish cut on the yard — from the same crew, in the same visit.",
      },
      {
        title: "Haul it while we're here",
        body: "Shed cleanouts, old equipment, brush piles, storm debris. If we're already in Cottondale, adding a haul is simple.",
      },
    ],
    faqs: [
      {
        q: "Do you charge extra to come out to Cottondale?",
        a: "No. Cottondale is on our regular Jackson County route, so there's no travel surcharge and no minimum job size. In-town lots and acreage are both welcome.",
      },
      {
        q: "Can you mow larger or acreage properties in Cottondale?",
        a: "Yes. A lot of what we do out here is acreage — bush-hogging rough ground and long road frontage plus a clean finish cut on the yard, handled by the same crew in one visit.",
      },
      {
        q: "Do you haul off junk and brush in Cottondale?",
        a: "We do. Shed and equipment cleanouts, construction leftovers, brush piles, and storm debris — we bring the truck and load it, and it goes with us.",
      },
    ],
    nearby: ["marianna", "chipley", "graceville"],
  },

  sneads: {
    tagline:
      "Lawn care, tree work, and junk removal in Sneads and out toward Lake Seminole — waterfront yards and in-town lots both.",
    intro: [
      "Sneads sits about twenty minutes east of Marianna, right up against Lake Seminole and the Jim Woodruff Dam, and the properties down toward the water are a genuinely different job from an in-town lot. We know the difference and we price and schedule for it.",
      "Waterfront and near-water ground stays wetter, grows harder, and pushes weeds that drier yards never see. Dollarweed is the big one out here, and it's worth understanding: it's a drainage signal as much as a weed problem, so if we're treating it every visit we'll tell you what's actually causing it instead of just selling you another round of spray.",
      "Lake lots also collect debris — limbs, blow-down, and the general mess a shoreline gathers after a storm — and that has to be hauled, not just raked into a pile. Between the tree work, the cleanups, and the hauling, a lot of our Sneads calls are about getting a place cleared and back in shape rather than a standing weekly mow, though we do plenty of those too.",
      "In town, Sneads is a straightforward, honest small-town route: residential yards, church grounds, rentals between tenants, and the occasional commercial lot that just needs a dependable cut. We treat all of it with the same standard we run at home in Marianna.",
      "If you've got a lake place you only get to on weekends, this is exactly the kind of property we're built for — we keep it cut, edged, and cleared so it's ready when you are, and we haul off whatever the water and wind left behind.",
    ],
    landmarks: [
      "Lake Seminole",
      "Three Rivers State Park",
      "Jim Woodruff Dam",
      "US-90 through town",
      "River Road area",
      "Sneads Park",
    ],
    highlights: [
      {
        title: "We know waterfront",
        body: "Lake Seminole lots grow harder and wetter and push different weeds. We price and treat for that instead of running an in-town playbook on the shoreline.",
      },
      {
        title: "Weekend-place ready",
        body: "Got a lake place you only reach on weekends? We keep it cut, cleared, and ready — and haul off what the water and wind leave behind.",
      },
      {
        title: "Cleanups and hauling",
        body: "Storm debris and shoreline blow-down get loaded and taken off, not raked into a pile for you to deal with later.",
      },
    ],
    faqs: [
      {
        q: "Do you service lake properties around Lake Seminole?",
        a: "Yes — waterfront lots off Lake Seminole are some of our regular Sneads work. They grow harder and hold more water than an in-town yard, so we schedule and treat them accordingly, and we haul off the debris a shoreline collects.",
      },
      {
        q: "Can you maintain a weekend or seasonal place in Sneads?",
        a: "That's one of the best things to hand us. We keep the yard cut, edged, and cleared on a schedule so the place is ready when you get there, and we clean up after storms so you're not arriving to a mess.",
      },
      {
        q: "How much does yard cleanup and hauling cost in Sneads?",
        a: "It depends on how much there is and where it sits, but we give a firm price after a quick look, with no charge for the estimate. Call or text 850-209-8982 and describe the property — we'll give you a real number.",
      },
    ],
    nearby: ["marianna", "cottondale", "blountstown"],
  },

  graceville: {
    tagline:
      "Dependable lawn care and junk removal in Graceville — residential, church grounds, rentals, and commercial lots near the Alabama line.",
    intro: [
      "Graceville is the northwest corner of our core service area, about half an hour from Marianna and close enough to the Alabama state line that we take calls from just over it. Even at that distance it's still Jackson County, so it's a regular part of our route rather than an out-of-the-way trip.",
      "It's a proper small-town mix out here, and we cover all of it: residential yards that want a clean, dependable weekly cut, the grounds around the churches and The Baptist College of Florida, rental property that needs turning between tenants, and the commercial lots along the main drag that just need to look kept without a whole landscaping project.",
      "That rental and commercial work is where being a one-crew, do-it-all outfit pays off. A property manager can hand us a unit that needs the yard mowed, the overgrown hedges cut back, the old tenant's junk hauled off, and the whole thing pressure-washed before a showing — one call, one crew, one invoice, instead of chasing four different contractors.",
      "For homeowners, it's the same appeal on a smaller scale: we keep the grass cut and edged, freshen the beds, take down the limb that's been threatening the fence, and haul off the brush pile that's been growing behind the shed all year. You get your Saturdays back.",
      "If you're right on the county or state line and not sure whether you're in range, just ask — Graceville is well inside where we run, and we regularly work the roads around it.",
    ],
    landmarks: [
      "The Baptist College of Florida",
      "Downtown Graceville",
      "Highway 2 & Highway 77",
      "Alabama state line",
      "Prosperity area",
      "Compass Lake vicinity",
    ],
    highlights: [
      {
        title: "Rentals & commercial",
        body: "One crew mows, trims, hauls the old tenant's junk, and pressure-washes before a showing. One call, one invoice — a property manager's easiest vendor.",
      },
      {
        title: "Still on the route",
        body: "Graceville is the far corner of our home county, but it's still Jackson County and still a regular stop — not an out-of-the-way special trip.",
      },
      {
        title: "Whole-yard service",
        body: "Grass, beds, hedges, a threatening limb, and the brush pile behind the shed — handled together so your weekends are yours again.",
      },
    ],
    faqs: [
      {
        q: "Do you serve Graceville and the area near the Alabama line?",
        a: "Yes. Graceville is part of our core Jackson County route, and we take calls right up to — and just across — the Alabama line. If you're not sure whether you're in range, call and ask; we run the roads around Graceville regularly.",
      },
      {
        q: "Do you handle rental turnovers and commercial lots in Graceville?",
        a: "That's a lot of our Graceville work. We'll mow, cut back overgrowth, haul off whatever the last tenant left, and pressure-wash before a showing — one crew and one invoice instead of several contractors.",
      },
      {
        q: "Is there a minimum job size?",
        a: "No. A single small yard, a one-time cleanup, or a standing weekly cut are all fine, and estimates are always free.",
      },
    ],
    nearby: ["marianna", "cottondale", "chipley"],
  },

  blountstown: {
    tagline:
      "Lawn care, tree work, and junk removal in Blountstown — our anchor in Calhoun County, on a set schedule you can count on.",
    intro: [
      "Blountstown is our anchor in Calhoun County, about thirty-five minutes south of Marianna down Highway 71, right on the Apalachicola River. We run Calhoun work on scheduled days rather than daily drop-ins, which is actually good news if you want dependable service — you get a set rotation instead of being squeezed in whenever there's a gap.",
      "The single most useful thing to know about booking us in Blountstown: tell us early. Because we group Calhoun County jobs onto the same days, a little notice means we put you on the regular rotation and you never have to think about it again. Wait until the grass is knee-high and we'll still come, but a standing spot is easier on everyone.",
      "This part of the river country took real tree damage from Hurricane Michael, and years on we still get called out to pines and hardwoods that have been quietly leaning ever since. If you've got a tree that shifted in a storm and never looked right again, that's worth a look before the next big wind decides it for you — a leaning tree has usually broken roots on one side and won't straighten out on its own.",
      "Beyond the tree work, Blountstown gets the full range: weekly and bi-weekly mowing, bed and hedge work, seasonal cleanups, pressure washing, and the hauling side — appliances, cleanouts, and storm debris that the county pickup won't touch. Because it's a bit of a drive, the larger jobs are the easiest to schedule and the best value, but we run plenty of standing mows down here too.",
      "One crew covers all of it, so a Blountstown property doesn't need three different companies to stay in shape — just the one that already comes to Calhoun County every week.",
    ],
    landmarks: [
      "Apalachicola River",
      "Downtown Blountstown",
      "Highway 20 & Highway 71",
      "Sam Atkins Park",
      "TnT Hideaway area",
      "Calhoun County line",
    ],
    highlights: [
      {
        title: "A real schedule",
        body: "Calhoun County runs on set days, so you get a dependable rotation instead of being squeezed in. Tell us early and we lock in your spot.",
      },
      {
        title: "Storm & tree specialists",
        body: "Blountstown took heavy tree damage from Michael and still has leaners. We take down what's dead or shifted and haul every piece off.",
      },
      {
        title: "Worth-the-drive value",
        body: "Larger jobs — cleanups, hauls, tree work — are the easiest to schedule and the best value out here, but we run standing mows too.",
      },
    ],
    faqs: [
      {
        q: "Do you really come all the way to Blountstown?",
        a: "Yes — Blountstown is our anchor in Calhoun County and a regular scheduled run, about thirty-five minutes down Highway 71. We group Calhoun jobs onto set days, so the more notice you give us, the easier it is to put you on the rotation.",
      },
      {
        q: "Can you take down storm-damaged or leaning trees in Blountstown?",
        a: "That's some of our most common Blountstown work. A lot of trees here have been leaning since Hurricane Michael. If one shifted in a storm it usually has broken roots and won't recover — we'll assess it honestly, take down what needs to come down, and haul off every piece.",
      },
      {
        q: "How do I get on your regular schedule in Blountstown?",
        a: "Call or text 850-209-8982 and ask for the Calhoun rotation. Because we run set days down here, a standing weekly or bi-weekly spot is easy to set up once you're on the list.",
      },
    ],
    nearby: ["bristol", "marianna", "cottondale"],
  },

  bristol: {
    tagline:
      "Lawn care, land clearing, tree work, and junk hauling in Bristol and Liberty County — the wooded end of our territory, where the big jobs live.",
    intro: [
      "Bristol is the county seat of Liberty County and the far edge of our regular routes, about forty-five minutes from Marianna near the Apalachicola River and Torreya State Park. Liberty is heavily wooded country, and the work down here reflects it — this is where the bigger, more serious jobs tend to be.",
      "That means more limb and canopy clearing, more storm debris, and more properties where the line between yard and treeline has to be held back every single season or the woods start taking it back. If you own ground out here, you already know the treeline is always advancing; keeping it in check is a big part of what we do in Bristol.",
      "Because it's a longer run for us, the larger jobs are the easiest to schedule and the best fit: full property cleanups, land and brush clearing, tree removal, and haul-offs where we bring the truck and take everything with us. When a job justifies the drive, it's absolutely worth ours — and we'd rather set up one solid day of real work than a quick pass.",
      "That said, we don't only do the heavy stuff. Standing mows, bed and hedge work, and the general upkeep of a home lot are all on the table in Bristol; it just helps to plan them onto the days we're already running to Liberty County so we can keep the price right.",
      "And the junk-removal side matters more out here than most places — when you're this far into the trees, there's rarely an easy way to get rid of old appliances, construction debris, a shed's worth of accumulated junk, or a storm's worth of downed limbs. We haul it. That's the whole point of hiring it out: you don't handle it twice.",
    ],
    landmarks: [
      "Apalachicola River",
      "Torreya State Park",
      "Downtown Bristol",
      "Highway 20 & Highway 12",
      "Liberty County seat",
      "Sumatra Road area",
    ],
    highlights: [
      {
        title: "Built for the big jobs",
        body: "Land clearing, tree removal, full cleanups, and haul-offs — the serious work that justifies the drive is exactly what we set up for in Bristol.",
      },
      {
        title: "Holding back the treeline",
        body: "In Liberty County the woods are always advancing. We keep the line between yard and forest cut back season after season.",
      },
      {
        title: "We haul it all off",
        body: "This far into the trees there's no easy way to lose old appliances, debris, or downed limbs. We bring the truck and take every piece with us.",
      },
    ],
    faqs: [
      {
        q: "Do you travel to Bristol and Liberty County?",
        a: "Yes. Bristol is the far edge of our regular routes — about forty-five minutes out — and we run it on scheduled days. Larger jobs are the easiest to book here, and they're well worth the drive for us.",
      },
      {
        q: "Do you do land clearing and tree removal in Bristol?",
        a: "That's much of our Liberty County work: limb and canopy clearing, brush and land clearing, storm cleanup, and full tree removal — with everything hauled off when we're done. Anything near a power line is a utility call, and we'll tell you that plainly.",
      },
      {
        q: "Can you haul off junk and debris out here?",
        a: "Absolutely — and it's one of the best reasons to call us in Bristol. Old appliances, construction debris, shed cleanouts, and downed limbs all leave with us. When you're this far into the trees, hauling it out yourself is the hard part, so let us handle it.",
      },
    ],
    nearby: ["blountstown", "marianna", "chipley"],
  },

  chipley: {
    tagline:
      "Lawn care, landscaping, and junk removal in Chipley — close enough to Marianna that we're out here often, on US-90 in Washington County.",
    intro: [
      "Chipley is only about thirty minutes west of Marianna on Highway 90 — closer, in driving time, than several towns we treat as core — so in practice we're out here often. It's the seat of Washington County, home to Falling Waters State Park, and an easy, regular part of where we run.",
      "That closeness matters when you're deciding who to call. A Chipley yard doesn't have to wait on an outfit coming from Panama City or hope somebody local has an opening — we're already passing through on the US-90 corridor, and we can usually work you in without much lead time.",
      "We do the full range in Chipley: weekly and bi-weekly mowing with clean edges, bed and mulch work, hedge trimming, seasonal cleanups, fertilization and weed control timed to the Panhandle calendar rather than a bag off a big-box shelf, tree work, pressure washing, and the whole junk-removal side. One crew, the entire property.",
      "The junk and hauling piece is worth calling out here the same as everywhere: rental turnovers, downsizing, shed and garage cleanouts, construction leftovers, and storm debris. We load it from wherever it sits and take it with us, and anything that can be donated or scrapped we route that way rather than straight to the landfill.",
      "If you're anywhere in or around Washington County and want a dependable standing schedule instead of chasing down one-off help every few weeks, just ask. Depending on how the route fills, we can almost always make Chipley work.",
    ],
    landmarks: [
      "Falling Waters State Park",
      "US-90 & I-10",
      "Downtown Chipley",
      "Highway 77 corridor",
      "Washington County seat",
      "Sunny Hills vicinity",
    ],
    highlights: [
      {
        title: "Closer than you'd think",
        body: "Thirty minutes from Marianna on US-90 — nearer than several of our core towns — so a Chipley job rarely waits long for us to get to it.",
      },
      {
        title: "The full range",
        body: "Mowing, beds, hedges, fertilization on the Panhandle calendar, tree work, pressure washing, and hauling — the whole property, one crew.",
      },
      {
        title: "Standing schedules welcome",
        body: "Want dependable weekly or bi-weekly service instead of one-off help? Ask about the Chipley route — we can almost always make it fit.",
      },
    ],
    faqs: [
      {
        q: "Do you cover Chipley and Washington County?",
        a: "Yes, regularly. Chipley is only about thirty minutes from Marianna on US-90 — closer than several of our core towns — so we're out this way often and can usually get to you without much lead time.",
      },
      {
        q: "Can I get a regular mowing schedule in Chipley?",
        a: "You can. Depending on how the route fills we can almost always fit Chipley in for a standing weekly or bi-weekly cut. Ask when you call and we'll set it up rather than leaving you to chase one-off help.",
      },
      {
        q: "Do you offer junk removal in Chipley?",
        a: "We do — cleanouts, appliances, furniture, construction debris, and storm mess. We load it wherever it sits and haul it off, and donate or scrap whatever we reasonably can.",
      },
    ],
    nearby: ["cottondale", "marianna", "graceville"],
  },
};

export function getAreaContent(slug: string): AreaContent | undefined {
  return areaContent[slug];
}

/** Slugs that have a full landing page. Drives areasWithPages + the map links. */
export const areaPageSlugs = new Set(Object.keys(areaContent));
