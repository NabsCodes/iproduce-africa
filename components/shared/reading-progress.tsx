"use client";

import { motion, useScroll, useSpring } from "motion/react";

import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";
import { cn } from "@/lib/utils";

type ReadingProgressProps = {
  /** Pin to the bottom edge of a `relative` parent (e.g. sticky header). */
  className?: string;
};

export function ReadingProgress({ className }: ReadingProgressProps) {
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <div
      className={cn(
        "bg-grey-200 pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[3px]",
        className,
      )}
      aria-hidden
    >
      <motion.div
        className="bg-leaf-600 h-full w-full origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
