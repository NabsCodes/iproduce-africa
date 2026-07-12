"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { CatalogueEmptyState } from "@/components/shared/catalogue-empty-state";
import {
  ContentCard,
  type ContentCardTone,
} from "@/components/shared/content-card";
import { MotionStagger } from "@/components/shared/motion/motion-stagger";
import { Button } from "@/components/ui/button";
import type { CatalogueEmptyStateContent } from "@/types/content";

const INITIAL_VISIBLE = 5;
const PAGE_SIZE = 6;

export type ListingCardGridItem = {
  key: string;
  href: string;
  image: string;
  imageAlt?: string;
  category: string;
  categoryTone?: ContentCardTone;
  meta?: string;
  title: string;
  description?: string;
};

export type ListingEmptyState = CatalogueEmptyStateContent & {
  onCtaClick?: () => void;
};

type ListingCardGridProps = {
  items: readonly ListingCardGridItem[];
  /** Re-mount to reset pagination — e.g. pass active filter value. */
  resetKey?: string;
  emptyState: ListingEmptyState;
};

export function ListingCardGrid({
  items,
  resetKey = "all",
  emptyState,
}: ListingCardGridProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const visible = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <div className="flex flex-col items-center">
      {visible.length > 0 ? (
        <MotionStagger
          key={resetKey}
          className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {visible.map((item) => (
            <ContentCard
              key={item.key}
              image={item.image}
              imageAlt={item.imageAlt}
              href={item.href}
              category={item.category}
              categoryTone={item.categoryTone}
              meta={item.meta}
              title={item.title}
              description={item.description}
              className="bg-subtle"
            />
          ))}
        </MotionStagger>
      ) : (
        <CatalogueEmptyState
          className="w-full"
          icon={emptyState.icon}
          title={emptyState.title}
          description={emptyState.description}
          ctaLabel={emptyState.ctaLabel}
          ctaHref={emptyState.ctaHref}
          onCtaClick={emptyState.onCtaClick}
        />
      )}

      {hasMore ? (
        <Button
          type="button"
          variant="neutral-outline"
          size="md"
          onClick={() =>
            setVisibleCount((current) =>
              Math.min(current + PAGE_SIZE, items.length),
            )
          }
          className="mt-10 px-6 sm:mt-12"
        >
          Load more
          <ChevronDown className="size-4" />
        </Button>
      ) : null}

      {items.length > 0 ? (
        <p className="text-fg-subtle mt-4 text-xs sm:text-sm">
          Showing {visible.length} of {items.length}{" "}
          {items.length === 1 ? "item" : "items"}
        </p>
      ) : null}
    </div>
  );
}
