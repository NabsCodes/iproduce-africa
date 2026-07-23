import type { AcademyCategory, AcademyScheduledType } from "@/types/academy";
import type { BlogCategory } from "@/types/blog";

export type AcademyCategorySeed = AcademyCategory & {
  appliesToArticles: boolean;
  appliesToWebinars: boolean;
};

export type RawAcademyCategory = {
  id?: string | null;
  name?: string | null;
  slug?: string | null;
  tone?: string | null;
  order?: number | null;
};

export const ACADEMY_CATEGORY_SEEDS = [
  {
    id: "academyCategory.innovation",
    name: "Innovation",
    slug: "innovation",
    tone: "forest",
    order: 10,
    appliesToArticles: true,
    appliesToWebinars: false,
  },
  {
    id: "academyCategory.trade",
    name: "Trade",
    slug: "trade",
    tone: "tangerine",
    order: 20,
    appliesToArticles: true,
    appliesToWebinars: false,
  },
  {
    id: "academyCategory.smart-agriculture",
    name: "Smart Agriculture",
    slug: "smart-agriculture",
    tone: "leaf",
    order: 30,
    appliesToArticles: true,
    appliesToWebinars: false,
  },
  {
    id: "academyCategory.agribusiness",
    name: "Agribusiness",
    slug: "agribusiness",
    tone: "tangerine",
    order: 40,
    appliesToArticles: true,
    appliesToWebinars: false,
  },
  {
    id: "academyCategory.policy",
    name: "Policy",
    slug: "policy",
    tone: "forest",
    order: 50,
    appliesToArticles: true,
    appliesToWebinars: false,
  },
  {
    id: "academyCategory.market-insights",
    name: "Market Insights",
    slug: "market-insights",
    tone: "leaf",
    order: 60,
    appliesToArticles: true,
    appliesToWebinars: false,
  },
  {
    id: "academyCategory.sustainability",
    name: "Sustainability",
    slug: "sustainability",
    tone: "leaf",
    order: 70,
    appliesToArticles: true,
    appliesToWebinars: false,
  },
  {
    id: "academyCategory.community",
    name: "Community",
    slug: "community",
    tone: "forest",
    order: 80,
    appliesToArticles: true,
    appliesToWebinars: false,
  },
  {
    id: "academyCategory.webinar",
    name: "Webinar",
    slug: "webinar",
    tone: "tangerine",
    order: 10,
    appliesToArticles: false,
    appliesToWebinars: true,
  },
  {
    id: "academyCategory.training",
    name: "Training",
    slug: "training",
    tone: "tangerine",
    order: 20,
    appliesToArticles: false,
    appliesToWebinars: true,
  },
  {
    id: "academyCategory.live-qa",
    name: "Live Q&A",
    slug: "live-qa",
    tone: "leaf",
    order: 30,
    appliesToArticles: false,
    appliesToWebinars: true,
  },
  {
    id: "academyCategory.event",
    name: "Event",
    slug: "event",
    tone: "forest",
    order: 40,
    appliesToArticles: false,
    appliesToWebinars: true,
  },
] as const satisfies readonly AcademyCategorySeed[];

function seedBySlug(slug: string): AcademyCategorySeed {
  const seed = ACADEMY_CATEGORY_SEEDS.find((item) => item.slug === slug);
  if (!seed) throw new Error(`Missing Academy category seed: ${slug}`);
  return seed;
}

const seedByArticleName = new Map<string, AcademyCategorySeed>(
  ACADEMY_CATEGORY_SEEDS.filter((seed) => seed.appliesToArticles).map(
    (seed) => [seed.name, seed],
  ),
);

const seedByWebinarType = new Map<AcademyScheduledType, AcademyCategorySeed>([
  ["WEBINAR", seedBySlug("webinar")],
  ["TRAINING", seedBySlug("training")],
  ["LIVE Q&A", seedBySlug("live-qa")],
  ["EVENT", seedBySlug("event")],
]);

function isTone(
  value: string | null | undefined,
): value is AcademyCategory["tone"] {
  return value === "tangerine" || value === "leaf" || value === "forest";
}

function toPublicCategory(seed: AcademyCategorySeed): AcademyCategory {
  return {
    id: seed.id,
    name: seed.name,
    slug: seed.slug,
    tone: seed.tone,
    order: seed.order,
  };
}

export function legacyArticleCategory(
  category: BlogCategory | string | null | undefined,
): AcademyCategory {
  const seed = categorySeedForLegacyArticle(category);
  if (!seed) throw new Error(`Unknown legacy Article category: ${category}`);
  return toPublicCategory(seed);
}

export function legacyWebinarCategory(
  type: AcademyScheduledType | string | null | undefined,
): AcademyCategory {
  const seed = categorySeedForLegacyWebinar(type);
  if (!seed) throw new Error(`Unknown legacy Webinar type: ${type}`);
  return toPublicCategory(seed);
}

export function categorySeedForLegacyArticle(
  category: BlogCategory | string | null | undefined,
): AcademyCategorySeed | undefined {
  return category ? seedByArticleName.get(category) : undefined;
}

export function categorySeedForLegacyWebinar(
  type: AcademyScheduledType | string | null | undefined,
): AcademyCategorySeed | undefined {
  return type ? seedByWebinarType.get(type as AcademyScheduledType) : undefined;
}

export function normalizeAcademyCategory(
  raw: RawAcademyCategory | null | undefined,
  fallback: () => AcademyCategory,
): AcademyCategory {
  if (!raw?.id || !raw.name?.trim() || !raw.slug?.trim() || !isTone(raw.tone)) {
    return fallback();
  }

  return {
    id: raw.id,
    name: raw.name.trim(),
    slug: raw.slug.trim(),
    tone: raw.tone,
    order:
      typeof raw.order === "number" && Number.isFinite(raw.order)
        ? raw.order
        : 9999,
  };
}

export function categoriesUsedBy<T>(
  items: readonly T[],
  getCategory: (item: T) => AcademyCategory,
): AcademyCategory[] {
  const byId = new Map<string, AcademyCategory>();
  for (const item of items) {
    const category = getCategory(item);
    if (!byId.has(category.id)) byId.set(category.id, category);
  }

  return [...byId.values()].sort(
    (a, b) => a.order - b.order || a.name.localeCompare(b.name),
  );
}
