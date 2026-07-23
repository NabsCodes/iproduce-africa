import { describe, expect, it } from "vitest";

import {
  ACADEMY_CATEGORY_SEEDS,
  categoriesUsedBy,
  legacyArticleCategory,
  legacyWebinarCategory,
  normalizeAcademyCategory,
} from "@/lib/academy-categories";
import { searchAcademy } from "@/lib/academy-search";
import type { BlogArticle } from "@/types/blog";

describe("Academy categories", () => {
  it("keeps deterministic seed IDs and independent catalogue switches", () => {
    expect(ACADEMY_CATEGORY_SEEDS).toHaveLength(12);
    expect(
      new Set(ACADEMY_CATEGORY_SEEDS.map((category) => category.id)).size,
    ).toBe(12);
    expect(
      ACADEMY_CATEGORY_SEEDS.find(
        (category) => category.id === "academyCategory.innovation",
      ),
    ).toMatchObject({
      appliesToArticles: true,
      appliesToWebinars: false,
    });
    expect(
      ACADEMY_CATEGORY_SEEDS.find(
        (category) => category.id === "academyCategory.webinar",
      ),
    ).toMatchObject({
      appliesToArticles: false,
      appliesToWebinars: true,
    });
  });

  it("prefers a valid reference and evaluates the legacy fallback lazily", () => {
    const resolved = normalizeAcademyCategory(
      {
        id: "academyCategory.client-category",
        name: "Client Category",
        slug: "client-category",
        tone: "leaf",
        order: 15,
      },
      () => {
        throw new Error("fallback must not run");
      },
    );

    expect(resolved).toEqual({
      id: "academyCategory.client-category",
      name: "Client Category",
      slug: "client-category",
      tone: "leaf",
      order: 15,
    });
  });

  it("maps every legacy Article category and Webinar type", () => {
    expect(legacyArticleCategory("Market Insights")).toMatchObject({
      id: "academyCategory.market-insights",
      tone: "leaf",
    });
    expect(legacyWebinarCategory("LIVE Q&A")).toMatchObject({
      id: "academyCategory.live-qa",
      tone: "leaf",
    });
  });

  it("returns only represented categories in display order", () => {
    const items = [
      { category: legacyArticleCategory("Community") },
      { category: legacyArticleCategory("Innovation") },
      { category: legacyArticleCategory("Community") },
    ];

    expect(
      categoriesUsedBy(items, (item) => item.category).map(
        (category) => category.slug,
      ),
    ).toEqual(["innovation", "community"]);
  });

  it("uses the Article category's real tone in Academy search results", () => {
    const article: BlogArticle = {
      slug: "market-brief",
      title: "Market brief",
      category: legacyArticleCategory("Trade"),
      author: { name: "iProduce Africa" },
      readTimeMinutes: 4,
      publishedAt: "2026-07-23T09:00:00.000Z",
      cardImage: "/images/market-brief.jpg",
      cardImageAlt: "Market activity",
      excerpt: "A practical trade update.",
      body: [],
    };

    const [result] = searchAcademy("trade", {
      webinars: [],
      courses: [],
      articles: [article],
    });

    expect(result).toMatchObject({
      category: "TRADE",
      categoryTone: "tangerine",
    });
  });
});
