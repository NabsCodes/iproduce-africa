"use client";

import { Button } from "@/components/ui/button";

export const ALL_CATEGORIES = "All" as const;

type CategoryFilterBarProps = {
  categories: readonly string[];
  value: string;
  onChange: (next: string) => void;
};

export function CategoryFilterBar({
  categories,
  value,
  onChange,
}: CategoryFilterBarProps) {
  const options = [ALL_CATEGORIES, ...categories];

  return (
    <div
      role="group"
      aria-label="Filter articles by category"
      className="-mx-4 flex w-full scrollbar-none flex-nowrap items-center gap-2 overflow-x-auto px-4 [-ms-overflow-style:none] sm:mx-0 sm:flex-wrap sm:gap-2.5 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
    >
      {options.map((category) => {
        const isActive = category === value;

        return (
          <Button
            key={category}
            type="button"
            variant={isActive ? "green" : "ghost"}
            size="xs"
            aria-pressed={isActive}
            onClick={() => onChange(category)}
            className="rounded-full"
          >
            {category}
          </Button>
        );
      })}
    </div>
  );
}
