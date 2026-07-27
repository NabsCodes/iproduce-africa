"use client";

import { ArticleGrid } from "@/components/academy/blog/article-grid";
import {
  ALL_CATEGORIES,
  CategoryFilterBar,
} from "@/components/academy/blog/category-filter-bar";
import { blogListing } from "@/content/blog";
import { useListingFilter } from "@/hooks/use-listing-filter";
import { cn } from "@/lib/utils";
import type { AcademyCategory } from "@/types/academy";
import type { BlogArticle } from "@/types/blog";

type BlogListingBodyProps = {
  categories: readonly AcademyCategory[];
  articles: readonly BlogArticle[];
  hasFeatured: boolean;
};

export function BlogListingBody({
  categories,
  articles,
  hasFeatured,
}: BlogListingBodyProps) {
  const { activeFilter, setActiveFilter, filtered, resetKey } =
    useListingFilter({
      items: articles,
      allValue: ALL_CATEGORIES,
      getFilterValue: (article) => article.category.slug,
      sort: (a, b) => b.publishedAt.localeCompare(a.publishedAt),
    });

  return (
    <section
      className={cn("bg-white", !hasFeatured && "pt-14 sm:pt-16 lg:pt-20")}
    >
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="mb-10 sm:mb-12">
          <CategoryFilterBar
            categories={categories}
            value={activeFilter}
            onChange={setActiveFilter}
          />
        </div>

        <ArticleGrid
          key={resetKey}
          resetKey={resetKey}
          articles={filtered}
          emptyState={{
            ...blogListing.filterEmptyState,
            onCtaClick: () => setActiveFilter(ALL_CATEGORIES),
          }}
        />
      </div>
    </section>
  );
}
