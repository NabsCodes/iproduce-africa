import { cn } from "@/lib/utils";

type DecorativeRingProps = {
  className?: string;
  strokeWidth?: number;
};

export function DecorativeRing({
  className,
  strokeWidth = 4,
}: DecorativeRingProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      className={cn("pointer-events-none absolute", className)}
    >
      <circle
        cx="50"
        cy="50"
        r={50 - strokeWidth / 2}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

export const darkPanelDashedRingClass =
  "-top-28 -right-24 size-[260px] sm:-top-40 sm:-right-28 sm:size-[380px] lg:-top-52 lg:-right-24 lg:size-[500px]";

type DashedDecorativeRingProps = {
  className?: string;
};

export function DashedDecorativeRing({ className }: DashedDecorativeRingProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full border-2 border-dashed border-white/15",
        className,
      )}
    />
  );
}
