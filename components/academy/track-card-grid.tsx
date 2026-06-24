"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import {
  ContentCard,
  type ContentCardTone,
} from "@/components/shared/content-card";
import { MotionStagger } from "@/components/shared/motion/motion-stagger";
import { Button } from "@/components/ui/button";

const INITIAL_VISIBLE = 9;
const PAGE_SIZE = 6;

export type TrackCardGridItem = {
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

type TrackCardGridProps = {
  items: readonly TrackCardGridItem[];
  /** Re-mount to reset pagination — e.g. pass active filter value. */
  resetKey?: string;
  emptyLabel?: string;
};

export function TrackCardGrid({
  items,
  resetKey = "all",
  emptyLabel = "No items to show yet.",
}: TrackCardGridProps) {
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
        <p className="text-fg-muted py-10 text-sm">{emptyLabel}</p>
      )}

      {hasMore ? (
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={() =>
            setVisibleCount((current) =>
              Math.min(current + PAGE_SIZE, items.length),
            )
          }
          className="mt-10 px-6 sm:mt-12"
        >
          View More
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
