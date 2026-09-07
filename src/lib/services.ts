/**
 * The service catalogue — one source of truth behind the homepage grid, the
 * /services index, every /services/<slug> detail page, the quote form's
 * service picker, and the Service JSON-LD.
 *
 * Copy is written for Jackson/Calhoun/Liberty County properties specifically:
 * the grasses that actually grow in Panhandle sand, the pests that actually eat
 * them, and the storm debris that actually shows up every summer. Generic lawn
 * copy ranks nowhere and converts worse.
 */

export interface Service {
  slug: string;
  /** Card + nav label. */
  name: string;
  /** Full H1 on the detail page, when it needs more words than the label. */
  heading?: string;
  /** lucide-astro icon component name. */
  icon: string;
  /** One-line blurb for cards. */
  blurb: string;
  /** Lead paragraph on the detail page. */
  summary: string;
  /** Bullet list — what the crew actually does on site. */
  includes: string[];
  /** Body paragraphs for the detail page. */
  body: string[];
  /** Shown on the homepage grid. */
  featured?: boolean;
  seoTitle: string;
  seoDescription: string;
}

export const services: Service[] = [
  {
    slug: "lawn-mowing",
    name: "Mowing & Lawn Maintenance",
    heading: "Lawn Mowing & Maintenance",
    icon: "Tractor",
    blurb:
      "Weekly or bi-weekly cuts with clean edges, trimmed borders, and every clipping blown off your drive.",
    summary:
      "The service most of our customers start with: a lawn that stays cut, edged, and tidy on a schedule you never have to think about. We mow residential yards, acreage, churches, rentals, and commercial lots across Calhoun, Liberty, and Jackson counties.",
    includes: [
      "Mow on a set weekly or bi-weekly rotation",
      "String-trim around trees, fence lines, posts, and foundations",
      "Hard-edge driveways, sidewalks, and curbs",
      "Blow clippings off all hard surfaces before we leave",
      "Deck height adjusted by season and grass type",
      "Bagging or mulching, your preference",
    ],
    body: [
      "Panhandle lawns are mostly centipede, bahia, and St. Augustine, and each one wants a different cutting height. Centipede scalps easily and sulks for weeks if you take it too low; St. Augustine needs to stay tall enough to shade its own runners; bahia throws seed heads fast in summer and looks unkempt three days after a low cut. We set deck height per lawn and per season instead of running one height across every yard on the route.",
      "From April through September, growth here outruns a bi-weekly schedule — especially the week after an afternoon storm. Most customers move to weekly for the summer and back to bi-weekly once things slow in October. We will tell you honestly which one your yard needs rather than selling you the bigger plan.",
      "Acreage is welcome. A good bit of what we mow is measured in acres, not square feet, and we are equipped for open ground as well as tight residential lots.",
    ],
    featured: true,
    seoTitle: "Lawn Mowing in Blountstown, FL | Faith Lawn Care",
    seoDescription:
      "Weekly and bi-weekly lawn mowing in Blountstown and across Calhoun, Liberty, and Jackson counties. Edged, trimmed, and blown clean every visit.",
  },
  {
    slug: "landscaping-design",
    name: "Landscaping Design",
    icon: "DraftingCompass",
    blurb:
      "A plan for the whole yard — beds, borders, and plants chosen to survive Panhandle heat and sand.",
    summary:
      "If you know your yard needs something but cannot picture what, this is where we start. We walk the property with you, work out what the space is actually for, and lay out a plan you can build all at once or a piece at a time.",
    includes: [
      "On-site walkthrough and measurements",
      "Bed layout, borders, and focal points",
      "Plant selection matched to sun, drainage, and zone 8b winters",
      "Phased plan so the work can be spread across budgets",
      "Coordination with any construction, irrigation, or mulch work",
    ],
    body: [
      "The single most common mistake we undo is plants that were never going to make it here. Nursery stock sold three states north goes in the ground, looks good through spring, then cooks in July or drowns in a wet week. We pick for what this region actually does: long humid heat, sandy fast-draining soil, and the occasional hard freeze that reaches Calhoun County when it misses the coast.",
      "Design also means deciding what you are not going to plant. Beds that wrap the whole house look generous on paper and become a maintenance bill forever. We would rather give you two beds you love than six you resent.",
      "There is no charge to come look and talk it through.",
    ],
    seoTitle: "Landscape Design in Blountstown, FL | Faith Lawn Care",
    seoDescription:
      "Landscape design for Jackson, Calhoun, and Liberty county properties — bed layout and plants chosen for Panhandle heat, sand, and zone 8b winters.",
  },
  {
    slug: "landscape-construction",
    name: "Landscape Construction",
    icon: "Shovel",
    blurb:
      "Building the plan — beds, edging, stone, drainage, and grading that holds up.",
    summary:
      "The build side of the yard. We install what a design calls for and fix the structural problems underneath it, from bed edging and stonework to regrading ground that has been holding water against your foundation.",
    includes: [
      "Bed construction, edging, and borders",
      "Stone, gravel, and hardscape features",
      "Grading and drainage correction",
      "Sod installation",
      "Tree and shrub planting",
      "Soil amendment and bed prep",
    ],
    body: [
      "Most yard problems in this part of Florida are water problems. Sand drains fast until it hits the clay layer, and then it does not — so you get a yard that is bone dry in one corner and stays soggy in another for three days after a storm. Planting into that without fixing the grade just kills more expensive plants.",
      "We would rather move dirt first and plant second. It is less satisfying on day one and it is the reason the work is still standing in year five.",
    ],
    seoTitle: "Landscape Construction, Blountstown FL | Faith Lawn Care",
    seoDescription:
      "Bed construction, edging, stonework, sod, grading, and drainage correction across Calhoun, Liberty, and Jackson counties. Call or text 850-209-8982.",
  },
  {
    slug: "seasonal-cleanups",
    name: "Seasonal Cleanups",
    icon: "Leaf",
    blurb:
      "Spring and fall resets — leaves, limbs, beds, and everything winter or a storm left behind.",
    summary:
      "A full property reset, usually done twice a year. We clear what has piled up, cut back what needs cutting back, and hand the yard over ready for the next season instead of fighting last one.",
    includes: [
      "Leaf and pine straw removal",
      "Storm limb and debris cleanup",
      "Bed weeding and cutback",
      "Ornamental grass and perennial trimming",
      "Gutter-line and fence-line clearing",
      "All debris hauled away — nothing left at the curb",
    ],
    body: [
      "Fall cleanup here is mostly pine straw and oak leaf, and it matters more than people think: a thick mat left over a centipede lawn through winter smothers it, and you find out in April when it greens up in patches.",
      "Spring cleanup is the one that pays for itself. Getting beds cleared and cut back before the first real growth week means the whole season starts ahead instead of behind.",
      "After a summer storm we run cleanup as its own call — see junk and debris removal below.",
    ],
    featured: true,
    seoTitle: "Yard Cleanups in Blountstown, FL | Faith Lawn Care",
    seoDescription:
      "Seasonal yard cleanups across Calhoun, Liberty, and Jackson counties — leaves, pine straw, storm limbs, and bed cutback, all hauled away. Call 850-209-8982.",
  },
  {
    slug: "lawn-restoration",
    name: "Lawn Restoration",
    icon: "Sprout",
    blurb:
      "Bringing back a lawn that has thinned, washed out, or been taken over.",
    summary:
      "For yards past the point where mowing helps. We work out what actually killed it — shade, drainage, chinch bugs, compaction, or years of the wrong mowing height — fix that first, then rebuild turf coverage.",
    includes: [
      "Diagnosis of the underlying cause, not just the symptom",
      "Soil compaction relief and amendment",
      "Sod installation or seeding, matched to the existing grass",
      "Bare-patch and washout repair",
      "Grading where water is the real problem",
      "Follow-up schedule while the new turf establishes",
    ],
    body: [
      "Almost every dead lawn we are called out to has a cause that will kill the replacement too. Laying fresh sod over compacted ground, or into a low spot that holds water, buys about one season. The diagnosis is the valuable half of this service.",
      "Chinch bugs are the usual culprit in St. Augustine here, and they get blamed for drought damage they did not cause — and vice versa. The two look similar from the porch and need opposite responses. We check before we treat.",
    ],
    seoTitle: "Lawn Restoration in Blountstown, FL | Faith Lawn Care",
    seoDescription:
      "Lawn restoration across Calhoun, Liberty, and Jackson counties — we diagnose what killed it, fix the cause, then rebuild the turf. Call or text 850-209-8982.",
  },
  {
    slug: "fertilization-weed-control",
    name: "Fertilization & Weed Control",
    icon: "SprayCan",
    blurb:
      "A feeding and weed program timed to the Panhandle calendar, not a national one.",
    summary:
      "Scheduled fertilization and weed treatment built around what your grass type needs and when our season actually turns — which is weeks off from the label on a bag bought at a big-box store.",
    includes: [
      "Grass-type-appropriate feeding schedule",
      "Pre-emergent timed to soil temperature, not the calendar",
      "Broadleaf and sedge treatment",
      "Dollarweed, crabgrass, and nutsedge control",
      "Spot treatment between full applications",
      "Honest advice on what a lawn does and does not need",
    ],
    body: [
      "Centipede is the trap here. It is the most common lawn grass in this county and it wants far less nitrogen than the others — feed it on a St. Augustine schedule and you get 'centipede decline,' a slow yellowing collapse that people mistake for needing even more fertilizer. Grass type has to drive the program.",
      "Pre-emergent only works inside a window, and the window is set by soil temperature. Put it down late and you have paid for a product that cannot do the one thing it does. That timing shifts a couple weeks year to year, which is why a set-and-forget bag schedule underperforms.",
      "Dollarweed is the tell for a drainage problem. If we are treating it every visit, we will say so and point at the actual cause instead of selling you another round.",
    ],
    featured: true,
    seoTitle: "Lawn Fertilization in Blountstown, FL | Faith Lawn Care",
    seoDescription:
      "Fertilization and weed control for centipede, St. Augustine, and bahia lawns across Calhoun, Liberty, and Jackson counties, timed to our season.",
  },
  {
    slug: "mulch-application",
    name: "Mulch Application",
    icon: "Layers",
    blurb:
      "Fresh mulch or pine straw, laid at the depth that actually suppresses weeds.",
    summary:
      "Bed refresh with mulch or pine straw — cleaned out, edged, and laid to a depth that holds moisture and keeps weeds down through the summer.",
    includes: [
      "Old mulch cleared or turned as appropriate",
      "Beds weeded and re-edged first",
      "Pine straw, pine bark, hardwood, or dyed mulch",
      "Laid 2–3 inches deep, pulled back off trunks and stems",
      "Cleanup of all overspill",
    ],
    body: [
      "Depth is the whole job. Under two inches and weeds come straight through, so you pay again in six weeks. Piled against trunks — the volcano you see around so many yard trees — and you trap moisture against the bark and invite rot.",
      "Pine straw is the regional default for good reason: it is cheap here, it stays put on a slope better than bark, and it suits the acid-loving plants most of these yards already have. Bark mulch lasts longer and looks sharper up close. We will price both.",
    ],
    seoTitle: "Mulch & Pine Straw, Blountstown FL | Faith Lawn Care",
    seoDescription:
      "Mulch and pine straw installation across Calhoun, Liberty, and Jackson counties — beds weeded and edged first, laid at proper depth. Call 850-209-8982.",
  },
  {
    slug: "hedge-trimming",
    name: "Hedge Trimming",
    icon: "Scissors",
    blurb:
      "Shrubs and hedges shaped clean, cut at the season that will not cost you next year's bloom.",
    summary:
      "Trimming and shaping for hedges, shrubs, and ornamentals — timed so flowering plants still bloom and cuts heal before the weather turns.",
    includes: [
      "Hedge shaping and height reduction",
      "Shrub and ornamental trimming",
      "Deadwood and crossing-branch removal",
      "Overgrowth cut back off walks, drives, and windows",
      "All clippings hauled off",
    ],
    body: [
      "Timing decides whether you get flowers. Azaleas set next spring's buds within weeks of finishing this spring's bloom — shear them in fall and you have cut off the entire show before it started. We prune spring bloomers right after they finish and save the hard cuts for the ones that can take it.",
      "For badly overgrown hedges, taking it all in one pass often kills the plant. We usually stage a heavy reduction across two seasons so it comes back full rather than bare and woody.",
    ],
    seoTitle: "Hedge & Shrub Trimming in Blountstown, FL | Faith Lawn Care",
    seoDescription:
      "Hedge trimming and shrub shaping in Calhoun, Liberty, and Jackson counties — pruned in the right season so bloomers still bloom. Call or text 850-209-8982.",
  },
  {
    slug: "irrigation",
    name: "Irrigation",
    icon: "Droplets",
    blurb:
      "Sprinkler repair, adjustment, and scheduling so water reaches grass instead of pavement.",
    summary:
      "Irrigation troubleshooting, repair, and seasonal adjustment. Most of what we find is a system that works fine mechanically and is set to water at exactly the wrong time, in the wrong amount.",
    includes: [
      "Zone-by-zone inspection and coverage check",
      "Broken and clogged head replacement",
      "Spray pattern adjustment — off the driveway, onto the lawn",
      "Controller scheduling by season",
      "Leak and line-break repair",
      "Rain sensor check",
    ],
    body: [
      "The most common setting we correct is short daily watering. It grows a shallow root system that cannot survive one hot week without the system running, so the lawn becomes dependent and then dies fast the moment something breaks. Deep and infrequent — roughly an inch a week in two soakings — is what builds a lawn that can take a Panhandle August.",
      "Watering in the evening is the other one. Grass that goes into a humid Florida night wet is grass that grows fungus. Early morning is the window.",
      "In sand, water moves down and out fast. Runtimes that are right for clay soil elsewhere overshoot here — much of it drains past the roots before the grass can use it.",
    ],
    seoTitle: "Sprinkler Repair in Blountstown, FL | Faith Lawn Care",
    seoDescription:
      "Irrigation repair, head replacement, and seasonal scheduling across Calhoun, Liberty, and Jackson counties. Stop watering the driveway. Call 850-209-8982.",
  },
  {
    slug: "tree-removal",
    name: "Tree Removal",
    icon: "TreePine",
    blurb:
      "Taking down what is dead, leaning, or too close to the house — and hauling every piece out.",
    summary:
      "Removal of dead, damaged, storm-leaning, and badly placed trees, plus limb work and full debris haul-off. If a tree is threatening a roof or a line, call — do not wait for the next storm to decide it for you.",
    includes: [
      "Dead, dying, and storm-damaged tree removal",
      "Limb removal and canopy clearing off roofs",
      "Storm-leaning tree assessment",
      "Full debris haul-off",
      "Stump handling discussed per job",
    ],
    body: [
      "After every named storm that tracks through this county we get calls about trees that have been leaning for years. A tree that shifted in a storm has usually broken roots on one side, and it will not straighten out — the next strong wind finishes it, and where it lands is not up to you.",
      "Water oaks and laurel oaks are the ones to watch here. They grow fast, they are everywhere around Blountstown, and they get structurally hollow far earlier than a live oak while still looking healthy in full leaf.",
      "Anything near a power line is a utility call, not ours, and we will tell you that plainly rather than take the job.",
    ],
    seoTitle: "Tree Removal in Blountstown, FL | Faith Lawn Care",
    seoDescription:
      "Tree and limb removal across Calhoun, Liberty, and Jackson counties — dead, leaning, and storm-damaged trees taken down and hauled off. Call 850-209-8982.",
  },
  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    icon: "WavesHorizontal",
    blurb:
      "Driveways, walks, siding, decks, and fence — the green and black washed off at safe pressure.",
    summary:
      "Exterior cleaning for concrete, siding, decking, fence, and roofs. Panhandle humidity grows algae and mildew on every north-facing surface, and it comes off far easier than most people expect.",
    includes: [
      "Driveways, sidewalks, and patios",
      "House siding — vinyl, brick, and stucco",
      "Decks, porches, and fencing",
      "Soft washing for roofs and painted surfaces",
      "Gutter exteriors",
      "Pre-sale and pre-paint prep",
    ],
    body: [
      "Pressure is not the answer to everything, and this is where a lot of damage gets done. Vinyl siding, shingles, older mortar, and painted wood all fail under the pressure that concrete needs. Those get soft washing — low pressure plus the right cleaner doing the work — while the driveway gets the surface cleaner.",
      "Black streaks on a north roof are algae, not dirt, and blasting a shingle roof strips the granules that make it a roof. That one is soft wash only, every time.",
      "A washed driveway is the single cheapest thing you can do to a house before it goes on the market.",
    ],
    featured: true,
    seoTitle: "Pressure Washing in Blountstown, FL | Faith Lawn Care",
    seoDescription:
      "Pressure washing and soft washing for driveways, siding, decks, and roofs across Calhoun, Liberty, and Jackson counties. Call or text 850-209-8982.",
  },
  {
    slug: "junk-removal",
    name: "Trash & Junk Removal",
    heading: "Trash & Junk Removal",
    icon: "Truck",
    blurb:
      "Hauling off what the county will not take — appliances, furniture, storm debris, whole cleanouts.",
    summary:
      "Full-service junk hauling for everything curbside pickup refuses. Single items, garage and shed cleanouts, rental turnovers, estate clearouts, and storm debris. We load it — you do not have to move it to the curb.",
    includes: [
      "Appliances, furniture, and mattresses",
      "Garage, shed, barn, and attic cleanouts",
      "Rental turnover and eviction cleanouts",
      "Estate and downsizing clearouts",
      "Storm debris and fallen limbs",
      "Construction and remodel debris",
      "Loading included — no need to drag it out yourself",
    ],
    body: [
      "This is the half of the business people do not expect a lawn company to do, and it is often the more urgent call. A tenant leaves a house full of furniture, a shed finally has to be emptied, a storm fills the yard — and none of it fits in a county pickup.",
      "We load from wherever it sits. Back of the property, up in an attic, behind a barn: the point of hiring it out is not having to handle it twice.",
      "Anything that can be donated or scrapped, we route that way rather than straight to a landfill.",
    ],
    featured: true,
    seoTitle: "Junk Removal & Hauling in Blountstown, FL | Faith Lawn Care",
    seoDescription:
      "Junk removal and hauling across Calhoun, Liberty, and Jackson counties — appliances, furniture, cleanouts, and storm debris. We load it. Call 850-209-8982.",
  },
];

export const featuredServices = services.filter((s) => s.featured);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
