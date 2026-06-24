"use client";

import { useMemo, useState } from "react";

import { ArticleGrid } from "@/components/academy/blog/article-grid";
import {
  ALL_CATEGORIES,
  CategoryFilterBar,
} from "@/components/academy/blog/category-filter-bar";
import type { BlogArticle } from "@/types/blog";

type BlogListingBodyProps = {
  categories: readonly string[];
  articles: readonly BlogArticle[];
};

export function BlogListingBody({
  categories,
  articles,
}: BlogListingBodyProps) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORIES);

  const sorted = useMemo(
    () =>
      [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    [articles],
  );

  const filtered = useMemo(
    () =>
      activeCategory === ALL_CATEGORIES
        ? sorted
        : sorted.filter((article) => article.category === activeCategory),
    [sorted, activeCategory],
  );

  return (
    <section className="bg-white">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="mb-10 sm:mb-12">
          <CategoryFilterBar
            categories={categories}
            value={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        <ArticleGrid key={activeCategory} articles={filtered} />
      </div>
    </section>
  );
}
