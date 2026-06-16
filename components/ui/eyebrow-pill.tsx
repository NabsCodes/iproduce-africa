import type { ReactNode } from "react";
import { cva } from "class-variance-authority";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

type EyebrowPillProps = {
  children: ReactNode;
  className?: string;
  tone?: "leaf" | "tangerine";
  size?: "sm" | "md";
};

export function EyebrowPill({
  children,
  className,
  tone = "leaf",
  size = "md",
}: EyebrowPillProps) {
  return (
    <Badge
      variant={tone === "tangerine" ? "pill-tangerine" : "pill-leaf"}
      className={cn(
        "max-w-fit gap-2",
        size === "sm" && "px-3.5 py-1.5",
        className,
      )}
    >
      <span aria-hidden className={dotVariants({ tone, size })} />
      {children}
    </Badge>
  );
}
