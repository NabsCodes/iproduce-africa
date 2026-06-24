"use client";

import { TrackCardGrid } from "@/components/academy/track-card-grid";
import type { BlogArticle } from "@/types/blog";

type ArticleGridProps = {
  articles: readonly BlogArticle[];
};

export function ArticleGrid({ articles }: ArticleGridProps) {
  return (
    <TrackCardGrid
      resetKey={articles.map((article) => article.slug).join(",")}
      emptyLabel="No articles in this category yet."
      items={articles.map((article) => ({
        key: article.slug,
        href: `/academy/blog/${article.slug}`,
        image: article.cardImage,
        imageAlt: article.cardImageAlt,
        category: article.category.toUpperCase(),
        categoryTone: "tangerine",
        meta: `${article.readTimeMinutes} MIN READ`,
        title: article.title,
        description: article.excerpt,
      }))}
    />
  );
}
