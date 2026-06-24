"use client";

import { ArticleGrid } from "@/components/academy/blog/article-grid";
import {
  ALL_CATEGORIES,
  CategoryFilterBar,
} from "@/components/academy/blog/category-filter-bar";
import { useListingFilter } from "@/hooks/use-listing-filter";
import type { BlogArticle } from "@/types/blog";

type BlogListingBodyProps = {
  categories: readonly string[];
  articles: readonly BlogArticle[];
};

export function BlogListingBody({
  categories,
  articles,
}: BlogListingBodyProps) {
  const { activeFilter, setActiveFilter, filtered, resetKey } =
    useListingFilter({
      items: articles,
      allValue: ALL_CATEGORIES,
      getFilterValue: (article) => article.category,
      sort: (a, b) => b.publishedAt.localeCompare(a.publishedAt),
    });

  return (
    <section className="bg-white">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="mb-10 sm:mb-12">
          <CategoryFilterBar
            categories={categories}
            value={activeFilter}
            onChange={setActiveFilter}
          />
        </div>

        <ArticleGrid key={resetKey} articles={filtered} />
      </div>
    </section>
  );
}
