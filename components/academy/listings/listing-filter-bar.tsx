"use client";

import { Button } from "@/components/ui/button";
import type { AcademyCategory } from "@/types/academy";

export const ALL_LISTING_FILTER = "All" as const;

type ListingFilterBarProps = {
  options: readonly (AcademyCategory | string)[];
  value: string;
  onChange: (next: string) => void;
  ariaLabel: string;
};

export function ListingFilterBar({
  options,
  value,
  onChange,
  ariaLabel,
}: ListingFilterBarProps) {
  const filters = [
    { slug: ALL_LISTING_FILTER, name: ALL_LISTING_FILTER },
    ...options.map((option) =>
      typeof option === "string"
        ? { slug: option, name: option }
        : { slug: option.slug, name: option.name },
    ),
  ];

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="-mx-4 flex w-full scrollbar-none flex-nowrap items-center gap-2 overflow-x-auto px-4 [-ms-overflow-style:none] sm:mx-0 sm:flex-wrap sm:gap-2.5 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
    >
      {filters.map((option) => {
        const isActive = option.slug === value;

        return (
          <Button
            key={option.slug}
            type="button"
            variant={isActive ? "green" : "ghost"}
            size="xs"
            aria-pressed={isActive}
            onClick={() => onChange(option.slug)}
            className="rounded-full"
          >
            {option.name}
          </Button>
        );
      })}
    </div>
  );
}
