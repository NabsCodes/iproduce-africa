/**
 * Pre-Sanity blog catalogue seed snapshot.
 * Runtime must not import this file — use content/blog.ts for chrome.
 */
import { placeholderImages } from "@/lib/placeholder-images";
import type { BlogArticle, BlogAuthor } from "@/types/blog";

/** Exported so the Sanity migration script can key deterministic author IDs off these map keys. */
export const authors = {
  amara: { name: "Amara Okafor", role: "Trade & Policy Analyst" },
  kofi: { name: "Kofi Mensah", role: "AgriTech Editor" },
  fatima: { name: "Fatima Yusuf", role: "Sustainability Lead" },
  james: { name: "James Ndlovu", role: "Agribusiness Finance" },
  zainab: { name: "Zainab Diallo", role: "Policy Research" },
  lisa: { name: "Lisa van der Merwe", role: "Market Intelligence" },
  daniel: { name: "Daniel Mwangi", role: "Livestock Programmes" },
  chioma: { name: "Chioma Eze", role: "Community Programmes" },
  samuel: { name: "Samuel Boateng", role: "Value Chain Specialist" },
  aisha: { name: "Aisha Rahman", role: "Innovation Desk" },
} as const satisfies Record<string, BlogAuthor>;

/**
 * Editorial article catalogue — static placeholder until Sanity.
 * Mix of briefs (~3–5 min), standard pieces (~6–9 min), and one
 * long-form flagship (~14 min) for layout / reading-progress QA.
 */
export const blogArticles: readonly BlogArticle[] = [
  {
    slug: "unlocking-intra-african-trade",
    title:
      "Unlocking Intra-African Trade Opportunities for Agribusiness Growth",
    category: "Trade",
    readTimeMinutes: 14,
    publishedAt: "2026-06-18",
    author: authors.amara,
    cardImage: placeholderImages.news.two,
    cardImageAlt: "Agritech technician working with farming equipment",
    heroImage: placeholderImages.valueChains.horticulture,
    heroImageAlt: "Young maize seedlings growing in cultivated soil",
    excerpt:
      "AfCFTA is moving from policy headline to operating reality. Here is what cross-border agribusinesses need to know about corridors, compliance, and where demand is actually growing.",
    body: [
      {
        kind: "paragraph",
        text: "For years, intra-African agricultural trade was discussed as a future opportunity — a promise tied to continental integration and infrastructure investment. In 2026, the conversation has shifted. Agribusinesses in Ghana, Kenya, Nigeria, Senegal, and South Africa are no longer asking whether regional trade matters; they are asking which corridors are workable this season, which standards will be checked at the border, and which buyers will pay on time.",
      },
      {
        kind: "paragraph",
        text: "The African Continental Free Trade Area (AfCFTA) has not removed every barrier overnight. Non-tariff frictions, documentation gaps, and uneven customs capacity still shape outcomes on the ground. But for businesses willing to prepare properly, regional trade is now a practical growth lever — not a conference talking point.",
      },
      {
        kind: "blockquote",
        text: "Regional trade rewards operators who treat compliance and logistics as product features — not back-office afterthoughts.",
      },
      { kind: "heading2", text: "Why Intra-African Trade Matters Now" },
      {
        kind: "paragraph",
        text: "Africa imports a significant share of its food and agricultural inputs, even as the continent holds some of the world's most productive land and fastest-growing urban consumer markets. That imbalance is not only a policy problem; it is a business opportunity for processors, aggregators, and value-chain operators who can move product reliably across borders.",
      },
      {
        kind: "list_unordered",
        items: [
          "Urban food demand is rising faster in African cities than in many traditional export destinations",
          "Regional buyers often prefer shorter supply chains and fresher product windows",
          "AfCFTA preferential treatment is active on listed agricultural goods between ratified states",
          "Cross-border payment rails are improving, reducing one of the oldest trade frictions",
          "Regional specialization allows countries to trade on comparative advantage rather than self-sufficiency alone",
        ],
      },
      {
        kind: "paragraph",
        text: "The businesses gaining ground are not necessarily the largest. They are the ones that treat regional trade as an operating discipline: documented quality, predictable logistics, and buyer relationships that survive a delayed truck or a changed inspection routine.",
      },
      { kind: "heading2", text: "What AfCFTA Changes in Practice" },
      {
        kind: "paragraph",
        text: "AfCFTA is often described in treaty language, but agribusiness leaders need operational clarity. Three provisions matter most for day-to-day trade decisions this year.",
      },
      {
        kind: "list_ordered",
        items: [
          {
            title: "Preferential tariffs on listed products",
            body: "Selected agricultural goods moving between ratified member states can access reduced tariff treatment when rules-of-origin requirements are met. The savings vary by product and corridor, but they are large enough to change unit economics on bulk staples and processed foods.",
          },
          {
            title: "Simplified trade regimes for smaller consignments",
            body: "Cross-border traders moving lower volumes — a critical segment in horticulture and grains — have access to simplified procedures in several corridors. This does not eliminate paperwork, but it reduces cost and time when used correctly.",
          },
          {
            title: "Payment infrastructure improvements",
            body: "The Pan-African Payment and Settlement System continues to expand use cases for cross-border settlement. For agribusinesses tired of dollar intermediation and delayed transfers, this is one of the most under-discussed enablers in the stack.",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "None of this replaces the need for market intelligence. Tariff preference is useless if your product fails a phytosanitary check. Payment rails do not help if your buyer's procurement team changes specification mid-season. The policy layer creates possibility; execution determines outcome.",
      },
      { kind: "heading2", text: "Corridors Where Activity Is Picking Up" },
      {
        kind: "callout",
        title: "Editor's note",
        text: "Corridor rankings shift with policy updates and logistics disruptions. Treat this list as a starting point for buyer interviews, not a permanent map.",
      },
      {
        kind: "paragraph",
        text: "Trade potential is not evenly distributed. The corridors below are seeing the most agribusiness movement in early 2026, based on buyer demand, logistics maturity, and policy implementation progress.",
      },
      {
        kind: "list_unordered",
        items: [
          "West Africa coastal corridor (Senegal–Côte d'Ivoire–Ghana): processed foods and horticulture",
          "East Africa regional market (Kenya–Uganda–Tanzania–Rwanda): grains, dairy, and fresh produce",
          "Southern Africa linkages (South Africa–Zambia–Zimbabwe): staples, poultry inputs, and horticulture",
          "Gulf-facing export lanes from East Africa: avocados, herbs, and specialty vegetables",
          "North Africa re-export nodes connecting sub-Saharan supply to Mediterranean buyers",
        ],
      },
      {
        kind: "paragraph",
        text: "Corridor selection should follow buyer evidence, not map aesthetics. The most common mistake is choosing a destination because it is geographically close, then discovering that close markets have incompatible standards or informal payment risk.",
      },
      { kind: "heading2", text: "Opportunities by Business Model" },
      {
        kind: "paragraph",
        text: "Regional trade rewards different models differently. A cooperative exporting dried mango faces different constraints than a processor selling fortified cereal across two customs unions.",
      },
      {
        kind: "list_ordered",
        items: [
          {
            title: "Aggregators and cooperatives",
            body: "Can win on volume and consistency if quality grading and traceability are standardized before product reaches the border. Regional buyers increasingly reject 'variable batches' even when prices are competitive.",
          },
          {
            title: "Processors and packagers",
            body: "Benefit from shelf-stable formats that tolerate longer routes. Value-added products often clear higher margins than raw commodity exports, especially when branding and labeling meet destination requirements.",
          },
          {
            title: "Input suppliers and service providers",
            body: "Cross-border demand for certified seed, feed, and cold-chain services is rising as production clusters professionalize. Service businesses can scale regionally faster than producers tied to land and seasonality.",
          },
          {
            title: "Digital marketplaces and B2B platforms",
            body: "Reduce search costs for buyers and sellers, but only survive when they solve trust — payment assurance, dispute resolution, and delivery accountability — not just listing volume.",
          },
        ],
      },
      { kind: "heading2", text: "Compliance: The Part That Stops Most Deals" },
      {
        kind: "paragraph",
        text: "Tariff reduction gets attention; compliance gets shipments released. Agribusinesses expanding regionally should budget time and expertise for the following areas before the first truck departs.",
      },
      {
        kind: "list_unordered",
        items: [
          "Rules-of-origin documentation and product classification",
          "Sanitary and phytosanitary certificates aligned to destination requirements",
          "Labeling, language, and allergen declarations for processed foods",
          "Packaging standards and palletization rules for retail buyers",
          "Insurance, inspection, and dispute clauses in off-take agreements",
          "Foreign exchange and settlement terms matched to delivery milestones",
        ],
      },
      {
        kind: "paragraph",
        text: "A practical rule from operators in the field: if your compliance folder is thinner than your marketing deck, you are not ready to scale cross-border volume.",
      },
      { kind: "heading2", text: "A 90-Day Regional Market Entry Checklist" },
      {
        kind: "paragraph",
        text: "Businesses that treat market entry as a project — not a single sales trip — tend to survive the first season. The checklist below is a condensed version of what iProduce Academy facilitators use in trade-readiness workshops.",
      },
      {
        kind: "list_ordered",
        items: [
          {
            title: "Days 1–30: Validate demand",
            body: "Interview at least five potential buyers. Confirm specification, payment terms, and seasonality. Do not rely on one enthusiastic contact.",
          },
          {
            title: "Days 15–45: Map compliance",
            body: "Work with a customs broker or trade advisor to document every certificate, label rule, and inspection step for your product category.",
          },
          {
            title: "Days 30–60: Run a pilot shipment",
            body: "Move a small consignment before committing full volume. Measure spoilage, delays, and documentation friction in real conditions.",
          },
          {
            title: "Days 45–75: Fix unit economics",
            body: "Recalculate margin after logistics, insurance, rejection risk, and working-capital cost. Many 'profitable' routes fail at this step.",
          },
          {
            title: "Days 60–90: Formalize the relationship",
            body: "Sign off-take or framework supply terms with delivery milestones, quality thresholds, and payment triggers both sides can audit.",
          },
        ],
      },
      {
        kind: "heading2",
        text: "What We Are Seeing in the iProduce Community",
      },
      {
        kind: "paragraph",
        text: "Across our community programmes, three patterns separate businesses that sustain regional trade from those that try once and stop.",
      },
      {
        kind: "list_unordered",
        items: [
          "They invest in one corridor deeply before expanding to a second",
          "They keep a named operations owner for documentation and logistics, not just sales",
          "They treat buyer feedback after the first shipment as product development data",
        ],
      },
      {
        kind: "paragraph",
        text: "Regional trade is not a hack for weak domestic demand. It works best when domestic operations are already stable — quality systems in place, production predictable, and leadership willing to learn customs reality as carefully as agronomy.",
      },
      { kind: "heading2", text: "Where to Go From Here" },
      {
        kind: "paragraph",
        text: "Intra-African agribusiness trade in 2026 is neither frictionless nor theoretical. It is a competitive arena where preparation beats optimism. Businesses that combine market validation, compliance discipline, and corridor focus can access demand that simply did not exist at this scale a decade ago.",
      },
      {
        kind: "paragraph",
        text: "If you are evaluating a regional move this year, start with one product, one corridor, and one pilot shipment. The continent's trade architecture is finally catching up to its production potential — but the businesses that benefit will be the ones that treat cross-border growth as operations, not aspiration.",
      },
    ],
  },
  {
    slug: "agritech-reshaping-african-farms",
    title: "How AgriTech Is Reshaping African Farms in 2026",
    category: "Innovation",
    readTimeMinutes: 8,
    publishedAt: "2026-06-10",
    author: authors.kofi,
    cardImage: placeholderImages.news.one,
    cardImageAlt: "Hand holding green crops in a fertile field",
    excerpt:
      "USSD advisories, plot-level sensors, and mobile payments are no longer pilot projects. They are changing yield, input timing, and market access for smallholders at scale.",
    body: [
      {
        kind: "paragraph",
        text: "The AgriTech story in Africa has matured. The headline era — drones on demo plots, blockchain traceability slides, and app launches with no offline fallback — is giving way to something more durable: tools that work on low bandwidth, survive a bad season, and integrate with how farmers already buy inputs and sell produce.",
      },
      {
        kind: "paragraph",
        text: "That shift matters for agribusiness strategy. Technology adoption is no longer a branding exercise; it is becoming a baseline expectation in certain value chains, especially where buyers demand traceability or where input costs make precision worth the investment.",
      },
      { kind: "heading2", text: "Tools That Are Actually Scaling" },
      {
        kind: "list_unordered",
        items: [
          "USSD and SMS advisory tied to local weather and planting calendars",
          "Low-cost soil moisture sensors with payback inside two seasons",
          "Mobile-money rails for input credit and produce settlement",
          "Buyer-facing marketplaces with offline agent networks",
          "Satellite and drone imagery for plot monitoring at cooperative level",
        ],
      },
      {
        kind: "paragraph",
        text: "The common thread is accessibility. A feature-phone advisory service reaches more farmers today than a smartphone-only platform with superior UX but narrow distribution.",
      },
      { kind: "heading2", text: "Where Adoption Is Highest" },
      {
        kind: "paragraph",
        text: "Adoption clusters where three conditions overlap: existing extension networks, reliable mobile coverage (even if intermittent), and a commercial buyer willing to reward consistency. Without the third, farmers may use free tools but rarely pay for premium features.",
      },
      {
        kind: "paragraph",
        text: "Horticulture and dairy value chains show the fastest uptake because quality variance is costly and buyers can observe differences quickly. Staple grain systems move slower unless tied to input financing or warehouse receipt programs.",
      },
      { kind: "heading2", text: "Implications for Agribusiness Leaders" },
      {
        kind: "list_ordered",
        items: [
          {
            title: "Digitize the trust layer first",
            body: "Payments, delivery confirmation, and quality records create more immediate value than advanced analytics dashboards farmers never open.",
          },
          {
            title: "Design for intermittent connectivity",
            body: "Offline capture, agent-assisted onboarding, and USSD fallbacks remain essential in most production zones.",
          },
          {
            title: "Bundle tech with market access",
            body: "Farmers adopt faster when a tool is tied to a buyer, input discount, or insurance product — not when it is sold as software alone.",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "AgriTech is not replacing agronomy or relationships. It is compressing information lag — the gap between what happened in the field and what decision-makers know in time to act.",
      },
    ],
  },
  {
    slug: "climate-smart-practices-that-pay-off",
    title: "Climate-Smart Practices That Pay Off on Small Farms",
    category: "Smart Agriculture",
    readTimeMinutes: 5,
    publishedAt: "2026-05-28",
    author: authors.fatima,
    cardImage: placeholderImages.news.three,
    cardImageAlt: "Colourful market stall with fresh produce",
    excerpt:
      "Five low-capital practices that improve resilience and margin within a single growing season — without waiting for subsidy programmes.",
    body: [
      {
        kind: "paragraph",
        text: "Climate-smart agriculture is often presented as a funding category. On small farms, it is better understood as a set of practices that reduce variance — in moisture, pest pressure, and input waste — while keeping capital requirements low.",
      },
      { kind: "heading2", text: "Five Practices Worth Adopting First" },
      {
        kind: "list_ordered",
        items: [
          {
            title: "Conservation tillage",
            body: "Reduce ploughing to protect soil structure and retain moisture through dry spells.",
          },
          {
            title: "Cover cropping",
            body: "Plant fast-growing legumes between cash-crop cycles to fix nitrogen and limit erosion on exposed slopes.",
          },
          {
            title: "Integrated pest management",
            body: "Combine rotation, biological controls, and targeted spraying to cut pesticide spend without sacrificing yield.",
          },
          {
            title: "Mulching",
            body: "Use crop residue to suppress weeds and reduce irrigation frequency on high-value beds.",
          },
          {
            title: "Drought-tolerant varieties",
            body: "Swap a portion of area to varieties bred for your region's rainfall trend — not last decade's average.",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "None require new machinery. Combined, they compound: farms that adopt two or three together typically see more stable yields than farms that rotate single interventions season by season.",
      },
      { kind: "heading2", text: "How to Prioritize on a Tight Budget" },
      {
        kind: "paragraph",
        text: "Start with the practice that addresses your biggest source of loss. If moisture is the constraint, mulching and conservation tillage come first. If pest damage dominates margins, invest in IPM before buying sensor hardware you will not use daily.",
      },
    ],
  },
  {
    slug: "financing-pathways-for-agribusiness",
    title: "Financing Pathways for Growing Agribusinesses",
    category: "Agribusiness",
    readTimeMinutes: 9,
    publishedAt: "2026-05-20",
    author: authors.james,
    cardImage: placeholderImages.academySpotlight.workshop,
    cardImageAlt: "Workshop discussion around a table",
    excerpt:
      "Grants, blended finance, revenue-based facilities, and working-capital lines — matched to stage, cashflow shape, and collateral reality.",
    body: [
      {
        kind: "paragraph",
        text: "Capital is rarely the only constraint for African agribusinesses. The harder problem is fit: bank debt wants collateral and predictable cashflow; equity wants control and hyper-growth; grants want reporting discipline and aligned impact metrics. Choosing the wrong instrument costs more than being under-funded.",
      },
      { kind: "heading2", text: "Main Pathways by Stage" },
      {
        kind: "list_unordered",
        items: [
          "Development grants for pilots, R&D, and farmer outreach programmes",
          "Blended finance combining concessional and commercial tranches",
          "Revenue-based financing for businesses with recurring buyer contracts",
          "Inventory and input financing tied to warehouse receipts or buyer guarantees",
          "Growth equity for processors and aggregators with proven unit economics",
        ],
      },
      { kind: "heading2", text: "What Funders Actually Screen For" },
      {
        kind: "paragraph",
        text: "Across instruments, three signals predict whether a conversation progresses: clear unit economics per product line, evidence of repeat purchases (not one-off tenders), and a leadership team that has operated through at least one full agricultural cycle including a bad season.",
      },
      {
        kind: "paragraph",
        text: "Financial models that only show best-case yield years are a red flag. Sophisticated funders expect stress scenarios — price drops, logistics delays, and input cost spikes — and want to see how the business survives them.",
      },
      { kind: "heading2", text: "Common Mistakes Before You Apply" },
      {
        kind: "list_ordered",
        items: [
          {
            title: "Raising equity too early",
            body: "Dilution before product-market fit is expensive. Many agribusinesses should optimize working capital and buyer terms first.",
          },
          {
            title: "Mismatching tenor to crop cycle",
            body: "Short-term debt for long-maturity tree crops or multi-year processing assets creates refinancing risk every season.",
          },
          {
            title: "Under-budgeting diligence cost",
            body: "Legal, audit, and environmental documentation take time. Applications fail when founders underestimate preparation load.",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "The best financing conversations start with a specific use of funds — input stock for a signed off-take, cold storage for a measured spoilage problem — not a generic 'growth capital' request.",
      },
    ],
  },
  {
    slug: "afcfta-policy-roadmap",
    title: "Reading the AfCFTA Policy Roadmap for 2026",
    category: "Policy",
    readTimeMinutes: 7,
    publishedAt: "2026-05-12",
    author: authors.zainab,
    cardImage: placeholderImages.academySpotlight.presentation,
    cardImageAlt: "Conference presentation with seated audience",
    excerpt:
      "Tariff schedules, rules of origin, and dispute mechanisms are live. Here is what policy shifts actually mean for traders this year.",
    body: [
      {
        kind: "paragraph",
        text: "AfCFTA is no longer waiting on ratification headlines. Rules of origin, tariff schedules, and dispute processes are being tested in real shipments — which means policy literacy is now an operational skill for export managers and cooperative leaders, not just government affairs teams.",
      },
      { kind: "heading2", text: "Provisions in Active Use" },
      {
        kind: "list_unordered",
        items: [
          "Preferential tariffs on listed agricultural products between ratified states",
          "Simplified trade procedures for qualifying small-scale consignments",
          "Mutual recognition pilots for phytosanitary certificates in selected corridors",
          "Expanded use of regional payment settlement infrastructure",
        ],
      },
      { kind: "heading2", text: "Where Friction Remains" },
      {
        kind: "paragraph",
        text: "Rules-of-origin compliance and non-tariff barriers still dominate day-to-day delays. Customs procedures vary between posts on the same corridor; standards harmonization is uneven across product categories.",
      },
      {
        kind: "paragraph",
        text: "Businesses should assume paperwork inconsistency and build buffer time into delivery contracts. Policy direction is positive; border implementation is still heterogeneous.",
      },
      { kind: "heading2", text: "What to Monitor This Year" },
      {
        kind: "list_ordered",
        items: [
          {
            title: "Annex updates on sensitive agricultural lines",
            body: "Tariff phase-down schedules can change negotiating outcomes for staple crops and processed foods.",
          },
          {
            title: "Regional customs coordination pilots",
            body: "Corridors with joint inspection trials can reduce clearance time materially — if your route is included.",
          },
          {
            title: "Digital certificate adoption",
            body: "Electronic phytosanitary and origin documentation reduces loss and fraud risk when accepted by both sides.",
          },
        ],
      },
    ],
  },
  {
    slug: "horticulture-export-markets-2026",
    title: "Horticulture Export Markets to Watch in 2026",
    category: "Market Insights",
    readTimeMinutes: 3,
    publishedAt: "2026-05-06",
    author: authors.lisa,
    cardImage: placeholderImages.valueChains.horticulture,
    cardImageAlt: "Field of leafy green vegetables",
    excerpt:
      "A short market brief: buyer shifts in the Gulf and EU, and three crops outperforming on margin this season.",
    body: [
      {
        kind: "paragraph",
        text: "Horticulture remains one of the highest-margin agricultural export categories for African producers, but buyer requirements are tightening faster than many suppliers adapt.",
      },
      { kind: "heading2", text: "Buyer-Side Shifts" },
      {
        kind: "list_unordered",
        items: [
          "Gulf retailers diversifying supplier bases away from single-origin dependence",
          "EU buyers tightening MRL thresholds on herbs and leafy greens",
          "Intra-African urban demand growing faster than export demand in several corridors",
        ],
      },
      { kind: "heading2", text: "Crops Outperforming on Margin" },
      {
        kind: "paragraph",
        text: "Baby vegetables, specialty herbs, and selected tropical fruits (passion fruit, dragon fruit) are showing stronger margin growth than headline crops — partly on under-supply, partly on stabilized air-freight pricing on key lanes.",
      },
    ],
  },
  {
    slug: "regenerative-livestock-systems",
    title: "Regenerative Livestock Systems for African Drylands",
    category: "Sustainability",
    readTimeMinutes: 8,
    publishedAt: "2026-04-28",
    author: authors.daniel,
    cardImage: placeholderImages.valueChains.livestock,
    cardImageAlt: "Cattle grazing in open dryland",
    excerpt:
      "Rotational grazing, mixed-species herds, and water-point design that restores rangeland while improving herd condition.",
    body: [
      {
        kind: "paragraph",
        text: "Most African rangeland degradation is not a mystery — it follows predictable patterns of continuous grazing, drought stress, and the collapse of traditional rotation systems. Regenerative livestock management reintroduces rest, movement, and species diversity without requiring expensive feedlot conversion.",
      },
      { kind: "heading2", text: "Practices That Work at Smallholder Scale" },
      {
        kind: "list_unordered",
        items: [
          "Planned rotational grazing with 28–60 day rest periods depending on rainfall zone",
          "Multi-species herds to distribute grazing pressure across plant communities",
          "Strategic water-point placement to control movement patterns",
          "Selective bush thinning where encroachment suppresses grass recovery",
        ],
      },
      { kind: "heading2", text: "Economics and Timeline" },
      {
        kind: "paragraph",
        text: "Restored rangeland supports more animals per hectare in better body condition, with fewer veterinary interventions. Most operators report measurable gain by year three, with earlier wins on mortality and trekking distance.",
      },
      {
        kind: "paragraph",
        text: "The upfront cost is management discipline, not infrastructure. Farms that document carrying capacity and stick to rotation plans outperform those that invest in fencing but graze continuously.",
      },
    ],
  },
  {
    slug: "youth-cooperatives-success-patterns",
    title: "What Successful Youth Cooperatives Have in Common",
    category: "Community",
    readTimeMinutes: 6,
    publishedAt: "2026-04-18",
    author: authors.chioma,
    cardImage: placeholderImages.about.journey.cohort,
    cardImageAlt: "Cohort group seated together",
    excerpt:
      "Four patterns from cooperatives that scaled past the pilot phase — and why most stall within three years.",
    body: [
      {
        kind: "paragraph",
        text: "Youth agribusiness cooperatives have multiplied across the continent. Most stall within three years. The ones that survive share a small set of structural choices that are boring, repeatable, and rarely all present at once.",
      },
      { kind: "heading2", text: "Patterns That Predict Survival" },
      {
        kind: "list_ordered",
        items: [
          {
            title: "Single value-chain focus",
            body: "Successful groups build depth in one crop or activity instead of chasing every opportunity in the programme brochure.",
          },
          {
            title: "Paid operational leadership",
            body: "Volunteer-only management burns out within 18 months. Sustainable cooperatives fund at least one coordinator role.",
          },
          {
            title: "Anchor buyer or off-take agreement",
            body: "Production-first models fail when markets shift. Market-first models survive because planting decisions follow confirmed demand.",
          },
          {
            title: "Mentorship with operating experience",
            body: "Alumni networks and partner agribusinesses that answer practical questions — not motivational talks — keep tactical quality high.",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "None of these patterns are surprising. What is striking is how reliably their combination predicts which cooperatives are still operating five years after launch.",
      },
    ],
  },
  {
    slug: "cold-chain-economics-for-fresh-produce",
    title: "Cold Chain Economics for Fresh Produce Exporters",
    category: "Market Insights",
    readTimeMinutes: 11,
    publishedAt: "2026-04-08",
    author: authors.samuel,
    cardImage: placeholderImages.valueChains.fruits,
    cardImageAlt: "Crates of fresh fruit at a market",
    excerpt:
      "A practical guide to when pre-cooling, reefer transport, and humidity control pay back — and when simpler handling wins.",
    body: [
      {
        kind: "paragraph",
        text: "Cold-chain investment is often framed as binary: go fully refrigerated or accept high spoilage. The economics are more nuanced. The right depth depends on product perishability, route duration, buyer specification, and rejection risk — not budget alone.",
      },
      { kind: "heading2", text: "Where Cold Spend Pays Back Fastest" },
      {
        kind: "list_unordered",
        items: [
          "Farm-gate pre-cooling for leafy greens and soft berries",
          "Reefer transport on routes exceeding 36 hours door-to-door",
          "Humidity-controlled storage when shelf-life targets exceed seven days",
          "Temperature-monitored air freight for high-margin niche exports",
        ],
      },
      {
        kind: "paragraph",
        text: "In each case, the ROI driver is rejection rate and price recovery — not technology for its own sake. If your buyer accepts field heat under a discount schedule, full pre-cooling may be unnecessary.",
      },
      { kind: "heading2", text: "Where Restraint Beats Over-Investment" },
      {
        kind: "paragraph",
        text: "Root crops and hardy fruits on short domestic routes often capture most spoilage gains from shaded handling, night harvesting, and disciplined first-mile timing — at a fraction of reefer cost.",
      },
      { kind: "heading2", text: "Building a Cold-Chain Business Case" },
      {
        kind: "table",
        caption:
          "Illustrative payback windows by intervention (placeholder data for layout QA).",
        headers: ["Intervention", "Typical payback", "Best fit"],
        rows: [
          ["Farm-gate pre-cooling", "1–2 seasons", "Leafy greens, berries"],
          ["Reefer on 36h+ routes", "2–4 seasons", "Regional export lanes"],
          [
            "Humidity-controlled storage",
            "3–5 seasons",
            "7+ day shelf-life SKUs",
          ],
        ],
      },
      {
        kind: "list_ordered",
        items: [
          {
            title: "Measure baseline loss",
            body: "Track spoilage and rejection by stage — field, packhouse, transit, arrival — before capital expenditure.",
          },
          {
            title: "Price the route, not the asset",
            body: "Leased reefer capacity on proven lanes often beats owned assets on experimental export markets.",
          },
          {
            title: "Contract quality thresholds",
            body: "Align temperature requirements with buyer SLAs so you are not over-specifying beyond what is paid for.",
          },
          {
            title: "Phase investment by SKU",
            body: "Apply cold depth first to the SKUs with highest margin erosion from heat, not across the entire catalogue.",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "The exporters winning on freshness in 2026 treat cold chain as a margin tool with a spreadsheet — not a facility tour with no unit economics behind it.",
      },
    ],
  },
  {
    slug: "ai-soil-mapping-pilots",
    title: "AI Soil Mapping Pilots Across Three Countries",
    category: "Innovation",
    readTimeMinutes: 4,
    publishedAt: "2026-03-25",
    author: authors.aisha,
    cardImage: placeholderImages.academySpotlight.market,
    cardImageAlt: "Outdoor market trading scene",
    excerpt:
      "Satellite layers, ground-truth sampling, and SMS recommendations — early signals on whether smallholders act on the output.",
    body: [
      {
        kind: "paragraph",
        text: "AI-assisted soil mapping is moving from research to field pilots. Three programmes in East and West Africa are worth watching for methodology, accuracy, and — most importantly — adoption.",
      },
      { kind: "heading2", text: "Shared Pilot Design" },
      {
        kind: "list_unordered",
        items: [
          "Sentinel-2 imagery as the spatial base layer",
          "Ground sampling at calibration points to anchor model accuracy",
          "Plot-level fertilizer recommendations via SMS or USSD",
          "Extension-officer validation loops to refine outputs",
        ],
      },
      { kind: "heading2", text: "Early Lesson" },
      {
        kind: "paragraph",
        text: "Model accuracy is approaching useful ranges on key nutrients, but adoption depends on extension trust. Without an officer willing to stand behind a recommendation, the SMS arrives and little changes in the field.",
      },
    ],
  },
];
