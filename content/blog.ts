import { placeholderImages } from "@/lib/placeholder-images";
import type { AcademyArticle, AcademyRelatedItem } from "@/types/academy";
import type { BlogArticle, BlogCategory, BlogPageContent } from "@/types/blog";

export const BLOG_CATEGORIES = [
  "Innovation",
  "Trade",
  "Smart Agriculture",
  "Agribusiness",
  "Policy",
  "Market Insights",
  "Sustainability",
  "Community",
] as const satisfies readonly BlogCategory[];

/** Re-export for consumers that import categories from content. */
export const blogCategories = BLOG_CATEGORIES;

function toHubArticleCategory(
  category: BlogCategory,
): AcademyArticle["category"] {
  const normalized = category.toUpperCase();
  if (normalized === "TRADE") return "TRADE";
  if (normalized === "SMART AGRICULTURE") return "SMART AGRICULTURE";
  return "INNOVATION";
}

export function getBlogHeroImage(article: BlogArticle): {
  src: string;
  alt: string;
} {
  return {
    src: article.heroImage ?? article.cardImage,
    alt: article.heroImageAlt ?? article.cardImageAlt,
  };
}

// PLACEHOLDER — replace with real editorial content once available.
const articles: readonly BlogArticle[] = [
  {
    slug: "unlocking-intra-african-trade",
    title:
      "Unlocking Intra-African Trade Opportunities for Agribusiness Growth",
    category: "Trade",
    readTimeMinutes: 5,
    publishedAt: "2026-06-12",
    cardImage: placeholderImages.news.two,
    cardImageAlt: "Agritech technician working with farming equipment",
    heroImage: placeholderImages.valueChains.horticulture,
    heroImageAlt: "Young maize seedlings growing in cultivated soil",
    excerpt:
      "Discover how regional trade is opening new markets and creating opportunities for agribusinesses across Africa.",
    body: [
      {
        kind: "paragraph",
        text: "Agriculture remains one of Africa's most important economic sectors, employing millions of people and contributing significantly to livelihoods across the continent. Yet, many agribusinesses still operate within local markets despite increasing opportunities for regional expansion.",
      },
      {
        kind: "paragraph",
        text: "The African Continental Free Trade Area (AfCFTA) presents a transformative opportunity for agribusinesses to reach new customers, diversify revenue streams, and participate more actively in regional value chains.",
      },
      { kind: "heading2", text: "Why Intra-African Trade Matters" },
      {
        kind: "paragraph",
        text: "Trade between African countries has the potential to:",
      },
      {
        kind: "list_unordered",
        items: [
          "Increase market access for agricultural products",
          "Strengthen regional value chains",
          "Improve competitiveness and productivity",
          "Create employment opportunities",
          "Encourage innovation and investment across the sector",
        ],
      },
      {
        kind: "paragraph",
        text: "By lowering barriers and promoting regional cooperation, intra-African trade can unlock significant opportunities for agribusinesses of all sizes.",
      },
      { kind: "heading2", text: "Opportunities for Agribusinesses" },
      {
        kind: "list_ordered",
        items: [
          {
            title: "Access to Larger Markets",
            body: "Businesses can expand beyond domestic demand and serve new consumers across multiple African countries.",
          },
          {
            title: "Diversification of Revenue Streams",
            body: "Entering new markets reduces dependency on a single customer base and creates opportunities for growth.",
          },
          {
            title: "Stronger Value Chain Collaboration",
            body: "Cross-border partnerships can improve sourcing, processing, logistics, and market distribution.",
          },
          {
            title: "Increased Investment Opportunities",
            body: "Growing regional markets often attract investors seeking scalable and innovative agricultural enterprises.",
          },
        ],
      },
      { kind: "heading2", text: "Key Considerations for Market Entry" },
      {
        kind: "paragraph",
        text: "While opportunities are significant, successful expansion requires preparation.",
      },
      {
        kind: "paragraph",
        text: "Agribusinesses should consider:",
      },
      {
        kind: "list_unordered",
        items: [
          "Market demand and consumer preferences",
          "Product quality requirements",
          "Sanitary and phytosanitary standards",
          "Packaging and labelling requirements",
          "Distribution and logistics strategies",
          "Regulatory and documentation requirements",
        ],
      },
      {
        kind: "paragraph",
        text: "Understanding these factors can help businesses make informed decisions and reduce potential barriers to entry.",
      },
    ],
  },
  {
    slug: "agritech-reshaping-african-farms",
    title: "How AgriTech Is Reshaping African Farms",
    category: "Innovation",
    readTimeMinutes: 5,
    publishedAt: "2026-06-08",
    cardImage: placeholderImages.news.one,
    cardImageAlt: "Hand holding green crops in a fertile field",
    excerpt:
      "From mobile advisory to precision sensors — the tools changing how the continent farms.",
    body: [
      {
        kind: "paragraph",
        text: "Smallholder farmers across Africa are quietly adopting a wave of low-cost digital tools that change what's possible on a small plot — and the results are starting to show in yields, in market access, and in resilience.",
      },
      { kind: "heading2", text: "The Tools Making the Biggest Difference" },
      {
        kind: "list_unordered",
        items: [
          "Mobile advisory services delivering localised weather and crop guidance",
          "Precision sensors for soil moisture and nutrient management",
          "Mobile-money rails replacing cash for inputs and produce sales",
          "Marketplace apps connecting farmers directly to buyers",
          "Drone and satellite imagery for plot-level monitoring",
        ],
      },
      {
        kind: "paragraph",
        text: "What unites these tools isn't sophistication — it's affordability and accessibility. A USSD-only advisory service works on a feature phone; a soil sensor pays for itself in two seasons.",
      },
      { kind: "heading2", text: "What Adoption Looks Like in Practice" },
      {
        kind: "paragraph",
        text: "Adoption is highest where extension services already exist and lowest where connectivity is poorest. The pattern matters for any agribusiness deciding where to invest: digital tools amplify existing strengths rather than replace them.",
      },
    ],
  },
  {
    slug: "climate-smart-practices-that-pay-off",
    title: "Climate-Smart Practices That Pay Off",
    category: "Smart Agriculture",
    readTimeMinutes: 6,
    publishedAt: "2026-06-04",
    cardImage: placeholderImages.news.three,
    cardImageAlt: "Colourful market stall with fresh produce",
    excerpt:
      "Low-cost techniques that build resilience while improving farm profitability.",
    body: [
      {
        kind: "paragraph",
        text: "Climate-smart agriculture sounds expensive. It doesn't have to be. The most reliable improvements in resilience come from a handful of cheap practices that pay back within a single season.",
      },
      { kind: "heading2", text: "Five Practices Worth Adopting" },
      {
        kind: "list_ordered",
        items: [
          {
            title: "Conservation Tillage",
            body: "Reduce or eliminate ploughing to protect soil structure and retain moisture.",
          },
          {
            title: "Cover Cropping",
            body: "Plant fast-growing legumes between cash-crop cycles to fix nitrogen and prevent erosion.",
          },
          {
            title: "Integrated Pest Management",
            body: "Combine biological controls, crop rotation and targeted spraying to reduce pesticide spend.",
          },
          {
            title: "Mulching",
            body: "Cover soil with crop residue to suppress weeds and reduce irrigation needs.",
          },
          {
            title: "Selective Drought-Tolerant Varieties",
            body: "Swap a portion of the planting area to varieties bred for the region's climate trajectory.",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "None of these require new equipment. All of them compound — adopting two or three together produces more than the sum of each individually.",
      },
    ],
  },
  {
    slug: "financing-pathways-for-agribusiness",
    title: "Financing Pathways for Growing Agribusinesses",
    category: "Agribusiness",
    readTimeMinutes: 6,
    publishedAt: "2026-05-28",
    cardImage: placeholderImages.academySpotlight.workshop,
    cardImageAlt: "Workshop discussion around a table",
    excerpt:
      "Grants, blended finance, and revenue-based options for agribusinesses ready to scale beyond bootstrapping.",
    body: [
      {
        kind: "paragraph",
        text: "Capital is rarely the binding constraint for African agribusinesses — but the right shape of capital often is. Bank loans want collateral; equity wants control; grants want reporting. Matching the financing instrument to the business model is half the work.",
      },
      { kind: "heading2", text: "The Main Pathways" },
      {
        kind: "list_unordered",
        items: [
          "Development-finance grants for proof-of-concept and pilots",
          "Blended-finance facilities combining concessional and commercial capital",
          "Revenue-based financing for businesses with predictable cashflows",
          "Working-capital facilities for input financing",
          "Equity investment for high-growth processors and aggregators",
        ],
      },
      { kind: "heading2", text: "What Funders Actually Look For" },
      {
        kind: "paragraph",
        text: "Across instruments, three things matter most: a clear unit economics story, evidence of repeat customers, and a team that has run the operation through one full agricultural cycle. Without those, the source of capital matters less than the conversation never happening.",
      },
    ],
  },
  {
    slug: "afcfta-policy-roadmap",
    title: "Reading the AfCFTA Policy Roadmap for 2026",
    category: "Policy",
    readTimeMinutes: 7,
    publishedAt: "2026-05-20",
    cardImage: placeholderImages.academySpotlight.presentation,
    cardImageAlt: "Conference presentation with seated audience",
    excerpt:
      "A concise read of where AfCFTA implementation actually lands this year, and what it means for cross-border traders.",
    body: [
      {
        kind: "paragraph",
        text: "The AfCFTA is no longer a treaty waiting to be ratified; it's a working trade regime with rules of origin, tariff schedules, and a dispute mechanism being tested in real cases. For agribusinesses, the practical question has shifted from 'when will this matter' to 'which provisions matter for me, this quarter.'",
      },
      { kind: "heading2", text: "What's Active Now" },
      {
        kind: "list_unordered",
        items: [
          "Preferential tariffs on listed agricultural products between ratified states",
          "Simplified trade regimes for small-scale cross-border traders",
          "Mutual recognition of phytosanitary certificates in selected corridors",
          "The Pan-African Payment and Settlement System for cross-border payments",
        ],
      },
      { kind: "heading2", text: "Where Friction Remains" },
      {
        kind: "paragraph",
        text: "Rules-of-origin compliance and non-tariff barriers (customs procedures, standards harmonisation) remain the day-to-day pain points. Businesses making cross-border moves should budget time for paperwork and expect inconsistency between border posts even within the same corridor.",
      },
    ],
  },
  {
    slug: "horticulture-export-markets-2026",
    title: "Horticulture Export Markets to Watch in 2026",
    category: "Market Insights",
    readTimeMinutes: 5,
    publishedAt: "2026-05-14",
    cardImage: placeholderImages.valueChains.horticulture,
    cardImageAlt: "Field of leafy green vegetables",
    excerpt:
      "Where buyer demand is shifting, which standards are tightening, and which crops are quietly outperforming.",
    body: [
      {
        kind: "paragraph",
        text: "Horticulture continues to be one of the highest-margin agricultural categories for African exporters, but the buyer landscape is shifting faster than most market reports suggest.",
      },
      { kind: "heading2", text: "Buyer-Side Shifts" },
      {
        kind: "list_unordered",
        items: [
          "Gulf supermarkets actively diversifying away from single-source suppliers",
          "EU buyers tightening Maximum Residue Levels on selected herbs and leafy greens",
          "Intra-African urban demand growing faster than export demand in several corridors",
          "Premium organic-certified demand growing in North America for African vanilla and macadamia",
        ],
      },
      { kind: "heading2", text: "Crops Quietly Outperforming" },
      {
        kind: "paragraph",
        text: "Avocado and macadamia remain the headline stories, but baby vegetables, herbs, and selected tropical fruits (passion fruit, lychee, dragon fruit) are showing the strongest margin growth — partly because they're under-supplied and partly because air-freight cost has stabilised.",
      },
    ],
  },
  {
    slug: "regenerative-livestock-systems",
    title: "Regenerative Livestock Systems for African Drylands",
    category: "Sustainability",
    readTimeMinutes: 6,
    publishedAt: "2026-05-06",
    cardImage: placeholderImages.valueChains.livestock,
    cardImageAlt: "Cattle grazing in open dryland",
    excerpt:
      "Rotational grazing and mixed-species systems that restore degraded rangeland while improving herd health.",
    body: [
      {
        kind: "paragraph",
        text: "Most African rangeland has been degraded by some combination of overgrazing, drought, and the collapse of traditional rotation practices. The regenerative response isn't new technology — it's the disciplined re-introduction of rotation, rest periods, and mixed-species grazing.",
      },
      { kind: "heading2", text: "What Works at Smallholder Scale" },
      {
        kind: "list_unordered",
        items: [
          "Planned rotational grazing with defined rest periods (28–60 days depending on rainfall)",
          "Multi-species herds (cattle + small ruminants) to spread grazing pressure across plant communities",
          "Permanent water-point infrastructure to control grazing distribution",
          "Selective bush thinning to restore grass-tree balance",
        ],
      },
      {
        kind: "paragraph",
        text: "The economic case is straightforward: restored rangeland carries more animals per hectare, in better body condition, with fewer veterinary inputs. Most of the gain shows up by year three.",
      },
    ],
  },
  {
    slug: "youth-cooperatives-success-patterns",
    title: "What Successful Youth Cooperatives Have in Common",
    category: "Community",
    readTimeMinutes: 5,
    publishedAt: "2026-04-28",
    cardImage: placeholderImages.about.journey.cohort,
    cardImageAlt: "Cohort group seated together",
    excerpt:
      "Patterns from five years of community-led agribusiness cooperatives that actually scaled past their pilot phase.",
    body: [
      {
        kind: "paragraph",
        text: "Youth agribusiness cooperatives have proliferated across Africa — but most stall within three years. Looking at the ones that didn't, four patterns repeat.",
      },
      { kind: "heading2", text: "Patterns from Cooperatives That Scaled" },
      {
        kind: "list_ordered",
        items: [
          {
            title: "Concentrated Around One Value Chain",
            body: "The successful ones picked a single crop or activity and built depth, rather than spreading thin across many opportunities.",
          },
          {
            title: "Salaried Operational Leadership",
            body: "Volunteer leadership burned out within 18 months. The cooperatives that lasted paid at least one full-time coordinator.",
          },
          {
            title: "Anchor Buyer or Off-take Agreement",
            body: "Production-first models failed; market-first models survived. Knowing who's buying before planting changes everything.",
          },
          {
            title: "External Mentorship Pipeline",
            body: "Sustained access to mentors with operational experience — usually an alumni network or a partnering agribusiness — kept tactical decisions sharp.",
          },
        ],
      },
      {
        kind: "paragraph",
        text: "None of these are surprising. What's striking is how rarely all four show up together — and how reliably their joint presence predicts which cooperatives are still operating five years on.",
      },
    ],
  },
  {
    slug: "cold-chain-economics-for-fresh-produce",
    title: "Cold Chain Economics for Fresh Produce Exporters",
    category: "Market Insights",
    readTimeMinutes: 6,
    publishedAt: "2026-04-20",
    cardImage: placeholderImages.valueChains.fruits,
    cardImageAlt: "Crates of fresh fruit at a market",
    excerpt:
      "When pre-cooling, reefer transport, and humidity control actually pay back — and when they don't.",
    body: [
      {
        kind: "paragraph",
        text: "Cold-chain investment is often framed as a binary choice: invest fully or don't bother. The economics are more nuanced — the right cold-chain depth depends on the product, the destination, and the route, not just the budget.",
      },
      { kind: "heading2", text: "Where the Spend Pays Back Fastest" },
      {
        kind: "list_unordered",
        items: [
          "Pre-cooling at the farm gate for highly perishable produce (leafy greens, soft berries)",
          "Reefer transport for routes exceeding 36 hours",
          "Humidity-controlled storage for products with a >7-day shelf-life target",
          "Temperature-monitored air freight for high-margin niche exports",
        ],
      },
      { kind: "heading2", text: "Where Restraint Beats Over-Investment" },
      {
        kind: "paragraph",
        text: "For root crops and hardy fruits moving short distances, the cold-chain premium often doesn't pencil. A clean, ventilated, shaded handling shed plus disciplined harvest-to-market timing can capture 80% of the spoilage gain at 10% of the cost.",
      },
    ],
  },
  {
    slug: "ai-soil-mapping-pilots",
    title: "AI Soil Mapping Pilots Across Three Countries",
    category: "Innovation",
    readTimeMinutes: 5,
    publishedAt: "2026-04-12",
    cardImage: placeholderImages.academySpotlight.market,
    cardImageAlt: "Outdoor market trading scene",
    excerpt:
      "Three early-stage soil-mapping pilots using satellite + on-ground sampling to deliver plot-level recommendations.",
    body: [
      {
        kind: "paragraph",
        text: "AI-assisted soil mapping is moving from research papers to operational pilots. Three current programmes are worth watching — for the methodology, for the lessons, and for the early signals on whether smallholders actually use the outputs.",
      },
      { kind: "heading2", text: "What the Pilots Have in Common" },
      {
        kind: "list_unordered",
        items: [
          "Satellite imagery as the spatial base layer (Sentinel-2 in all three)",
          "On-ground soil sampling at calibration points to anchor model accuracy",
          "Plot-level fertiliser recommendations delivered via SMS or USSD",
          "Extension-officer feedback loops to validate and refine recommendations",
        ],
      },
      { kind: "heading2", text: "Early Lessons" },
      {
        kind: "paragraph",
        text: "Accuracy is high enough to be useful (within ±15% on key nutrients). Adoption depends entirely on whether extension officers trust the system enough to recommend acting on it. Without that trust, the SMS arrives and nothing changes.",
      },
    ],
  },
];

export const blogContent: BlogPageContent = {
  hero: {
    eyebrow: "Blog & Insights",
    title: "Ideas Shaping African Agribusiness",
    description:
      "Explore trends, perspectives, and practical insights driving innovation and growth across Africa's agricultural ecosystem.",
  },
  newsletter: {
    eyebrow: "Stay Informed",
    description:
      "Receive the latest insights, industry trends, and inspiration from across Africa's agribusiness ecosystem.",
    inputLabel: "Email address",
    inputPlaceholder: "Your email address",
    submitLabel: "Subscribe (coming soon)",
    comingSoonMessage:
      "Newsletter signup is coming soon. Thanks for your interest.",
  },
  shareControls: {
    heading: "Share Article",
    copyConfirmation: "Link copied to clipboard",
  },
  relatedSection: {
    eyebrow: "Keep reading",
    title: "More from the blog",
    description:
      "Explore related insights and perspectives shaping African agribusiness.",
    viewAllLabel: "All articles",
    viewAllHref: "/academy/blog",
  },
  featuredArticleSlug: "unlocking-intra-african-trade",
  articles,
  cta: {
    eyebrow: "Be part of the future",
    title: "Let's Build the Future of Agriculture Together",
    description:
      "Join a growing network of organisations committed to innovation, capacity building, and sustainable growth across Africa.",
    ctas: [
      {
        label: "Partner with us",
        href: "/partners#partnership-enquiry",
        variant: "green",
        icon: "handshake",
      },
    ],
  },
};

export function articleToRelatedItem(article: BlogArticle): AcademyRelatedItem {
  return {
    key: article.slug,
    href: `/academy/blog/${article.slug}`,
    image: article.cardImage,
    imageAlt: article.cardImageAlt,
    category: article.category.toUpperCase(),
    categoryTone: "tangerine",
    meta: `${article.readTimeMinutes} MIN READ`,
    title: article.title,
    description: article.excerpt,
  };
}

export function getBlogHubPreviewItems(limit: number): AcademyArticle[] {
  return blogContent.articles.slice(0, limit).map((article) => ({
    category: toHubArticleCategory(article.category),
    readTime: `${article.readTimeMinutes} min read`,
    title: article.title,
    description: article.excerpt,
    image: article.cardImage,
    slug: article.slug,
  }));
}

export function getRelatedArticles(excludeSlug: string, limit = 3) {
  const current = blogContent.articles.find(
    (article) => article.slug === excludeSlug,
  );
  const others = blogContent.articles.filter(
    (article) => article.slug !== excludeSlug,
  );
  const sameCategory = current
    ? others.filter((article) => article.category === current.category)
    : [];
  const rest = current
    ? others.filter((article) => article.category !== current.category)
    : others;

  return [...sameCategory, ...rest].slice(0, limit).map(articleToRelatedItem);
}

export function getArticle(slug: string): BlogArticle | undefined {
  return blogContent.articles.find((article) => article.slug === slug);
}
