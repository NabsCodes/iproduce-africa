"use client";

import type { ListingEmptyState } from "@/components/academy/listings/listing-card-grid";
import { ListingCardGrid } from "@/components/academy/listings/listing-card-grid";
import type { BlogArticle } from "@/types/blog";

type ArticleGridProps = {
  articles: readonly BlogArticle[];
  resetKey?: string;
  emptyState: ListingEmptyState;
};

export function ArticleGrid({
  articles,
  resetKey = "all",
  emptyState,
}: ArticleGridProps) {
  return (
    <ListingCardGrid
      resetKey={resetKey}
      emptyState={emptyState}
      items={articles.map((article) => ({
        key: article.slug,
        href: `/academy/blog/${article.slug}`,
        image: article.cardImage,
        imageAlt: article.cardImageAlt,
        category: article.category.name.toUpperCase(),
        categoryTone: article.category.tone,
        meta: `${article.readTimeMinutes} MIN READ`,
        title: article.title,
        description: article.excerpt,
      }))}
    />
  );
}
