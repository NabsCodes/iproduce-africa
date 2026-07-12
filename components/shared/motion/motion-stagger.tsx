"use client";

import { motion, type Variants } from "motion/react";
import { Children, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

/**
 * Grid-of-cards entrance: parent fades, children rise in stagger.
 *
 * Cap is enforced in the primitive, not by discipline. The wrapper walks
 * its children and applies the rise variant only to the first `cap`
 * children (default 6). Anything past the cap renders without per-child
 * variants, so long grids never produce a long stagger tail.
 *
 * API is "wrap-around-the-grid": pass the same className you'd give the
 * grid container; the primitive itself becomes the grid parent and wraps
 * each child in a `motion.div` that participates as a grid item. This
 * keeps the API to one component instead of `<MotionStagger>` +
 * `<MotionStagger.Item>` (which would let callers bypass the cap).
 *
 * Layout note: each child gets wrapped in an extra `motion.div`. For
 * straight `grid-cols-*` layouts this is transparent. For grids that
 * depend on per-child positioning (e.g. `lg:col-start-2`), put the
 * positioning class on the *inner* card, not the bare child.
 */

const VIEWPORT_MARGIN_DEFAULT = "-15% 0px";
const STAGGER_GAP_SECONDS = 0.08;

type MotionStaggerProps = {
  children: ReactNode;
  /** Max children that participate in the stagger. Default 6. */
  cap?: number;
  className?: string;
  /** Delay before the first child starts. Seconds. */
  delay?: number;
  viewportMargin?: string;
} & Omit<
  ComponentPropsWithoutRef<typeof motion.div>,
  | "children"
  | "variants"
  | "initial"
  | "animate"
  | "whileInView"
  | "viewport"
  | "transition"
>;

export function MotionStagger({
  children,
  cap = 6,
  className,
  delay = 0,
  viewportMargin = VIEWPORT_MARGIN_DEFAULT,
  ...rest
}: MotionStaggerProps) {
  const reduce = useReducedMotionSafe();

  const parentVariants: Variants = reduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: STAGGER_GAP_SECONDS,
            delayChildren: delay,
          },
        },
      };

  const itemVariants: Variants = reduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const items = Children.toArray(children);

  return (
    <motion.div
      className={className}
      variants={parentVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
      {...rest}
    >
      {items.map((child, index) =>
        index < cap ? (
          <motion.div
            key={`stagger-item-${index}`}
            className="h-full"
            variants={itemVariants}
          >
            {child}
          </motion.div>
        ) : (
          child
        ),
      )}
    </motion.div>
  );
}
