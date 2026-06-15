import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const eyebrowPillVariants = cva(
  "inline-flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-sm",
  {
    variants: {
      tone: {
        leaf: "bg-leaf-50/95 text-leaf-600",
        tangerine: "bg-tangerine-50/95 text-tangerine-700",
      },
      size: {
        sm: "px-3.5 py-1.5",
        md: "px-4 py-2",
      },
    },
    defaultVariants: {
      tone: "leaf",
      size: "md",
    },
  },
);

const dotVariants = cva("shrink-0 rounded-full", {
  variants: {
    tone: {
      leaf: "bg-leaf-600",
      tangerine: "bg-tangerine-500",
    },
    size: {
      sm: "size-1.5",
      md: "size-2",
    },
  },
  defaultVariants: {
    tone: "leaf",
    size: "md",
  },
});

type EyebrowPillProps = VariantProps<typeof eyebrowPillVariants> & {
  children: ReactNode;
  className?: string;
};

export function EyebrowPill({
  children,
  className,
  tone,
  size,
}: EyebrowPillProps) {
  return (
    <div className={cn(eyebrowPillVariants({ tone, size }), className)}>
      <span aria-hidden className={dotVariants({ tone, size })} />
      <span className="text-xs font-semibold tracking-[0.04em] uppercase sm:text-sm">
        {children}
      </span>
    </div>
  );
}
