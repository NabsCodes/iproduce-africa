"use client";

import { motion, type Variants } from "motion/react";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

/**
 * Section entrance: fade + small rise as the element scrolls into view.
 * Fires once per session per element (no re-trigger on scroll back).
 *
 * Lives at the client boundary: sections that import this can stay server
 * components — the boundary is the motion primitive, not the section.
 *
 * Behaviour:
 * - 360ms ease-out, matches the site's transition rhythm.
 * - Triggers when the element is ~15% into the viewport (matches the
 *   trigger margin used by `ImpactStatsSection`).
 * - Under reduced motion, variants become no-ops — the element renders in
 *   its final state immediately with no animation.
 */

const VIEWPORT_MARGIN_DEFAULT = "-15% 0px";

type MotionFadeAs = "div" | "section" | "article" | "header" | "footer" | "li";

type MotionFadeProps<T extends MotionFadeAs = "div"> = {
  children: ReactNode;
  as?: T;
  delay?: number;
  /** When set, entrance also scales from this value (e.g. 0.98). Opacity + y rise still apply. */
  scaleFrom?: number;
  /** Vertical offset before entrance. Default 16px. */
  yFrom?: number;
  /** Entrance duration in seconds. Default 0.36. Use ~0.48 for single featured panels. */
  duration?: number;
  viewportMargin?: string;
} & Omit<ComponentPropsWithoutRef<T>, "children">;

export function MotionFade<T extends MotionFadeAs = "div">({
  children,
  as,
  delay = 0,
  scaleFrom,
  yFrom = 16,
  duration = 0.36,
  viewportMargin = VIEWPORT_MARGIN_DEFAULT,
  ...rest
}: MotionFadeProps<T>) {
  const reduce = useReducedMotionSafe();

  const variants: Variants = reduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: {
          opacity: 0,
          y: yFrom,
          ...(scaleFrom !== undefined ? { scale: scaleFrom } : {}),
        },
        visible: {
          opacity: 1,
          y: 0,
          ...(scaleFrom !== undefined ? { scale: 1 } : {}),
        },
      };

  const Tag = (motion[(as ?? "div") as keyof typeof motion] ??
    motion.div) as ElementType;

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
      variants={variants}
      transition={{
        duration: reduce ? 0 : duration,
        ease: [0.22, 1, 0.36, 1],
        delay: reduce ? 0 : delay,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
