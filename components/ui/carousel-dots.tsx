import { cn } from "@/lib/utils";

type CarouselDotsTone = "leaf" | "tangerine";

type CarouselDotsProps = {
  total: number;
  active?: number;
  onSelect?: (index: number) => void;
  className?: string;
  tone?: CarouselDotsTone;
};

const activeToneClass: Record<CarouselDotsTone, string> = {
  leaf: "bg-leaf-emphasized",
  tangerine: "bg-tangerine-500",
};

const focusToneClass: Record<CarouselDotsTone, string> = {
  leaf: "focus-visible:outline-leaf-emphasized",
  tangerine: "focus-visible:outline-tangerine-500",
};

export function CarouselDots({
  total,
  active = 0,
  onSelect,
  className,
  tone = "leaf",
}: CarouselDotsProps) {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      aria-label={onSelect ? "Choose carousel page" : undefined}
    >
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === active;
        const indicatorClassName = cn(
          "block h-2 rounded-full transition-[width,background-color] duration-300 ease-out",
          isActive ? cn(activeToneClass[tone], "w-10") : "w-2 bg-[#dde5da]",
        );

        if (!onSelect) {
          return (
            <span key={index} className={indicatorClassName} aria-hidden />
          );
        }

        return (
          <button
            key={index}
            type="button"
            className={cn(
              "flex min-h-6 min-w-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2",
              focusToneClass[tone],
            )}
            aria-label={`Go to carousel page ${index + 1}`}
            aria-current={isActive ? "true" : undefined}
            onClick={() => onSelect(index)}
          >
            <span className={indicatorClassName} aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
