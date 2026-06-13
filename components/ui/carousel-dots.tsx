import { cn } from "@/lib/utils";

type CarouselDotsProps = {
  total: number;
  active?: number;
  className?: string;
};

export function CarouselDots({
  total,
  active = 0,
  className,
}: CarouselDotsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={cn(
            index === active
              ? "h-3 w-11 rounded-lg bg-[var(--leaf-emphasized)]"
              : "size-2 rounded-full bg-[#dde5da]",
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}
