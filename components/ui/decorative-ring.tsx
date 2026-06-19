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

type DashedDecorativeRingProps = {
  className?: string;
};

/** Dashed circle accent used on dark panels (Stay Connected, Three Steps, etc.). */
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
