"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect } from "react";

/**
 * Number that counts up from 0 to `value` once `inView` flips true.
 * Renders a `motion.span` so it composes cleanly inside a serif `<p>`
 * (the original consumer is the impact-stats hero numbers).
 *
 * Respects `prefers-reduced-motion` — sets the final value instantly
 * with no animation. Uses the raw `useReducedMotion` (not the SSR-safe
 * wrapper) because count-up only fires once `inView` is true, which
 * only happens client-side post-mount.
 */

const defaultFormatter = new Intl.NumberFormat("en-US");

/** Larger numbers count a touch longer so the motion reads as deliberate. */
function durationFor(value: number) {
  if (value >= 1000) return 2.4;
  if (value >= 100) return 2;
  return 1.7;
}

type MotionCountUpProps = {
  value: number;
  inView: boolean;
  delay?: number;
  /** Custom formatter for the displayed integer. */
  format?: (n: number) => string;
};

export function MotionCountUp({
  value,
  inView,
  delay = 0,
  format,
}: MotionCountUpProps) {
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const formatFn =
    format ?? ((n: number) => defaultFormatter.format(Math.round(n)));
  const display = useTransform(count, formatFn);

  useEffect(() => {
    if (!inView) return;

    if (reduceMotion) {
      count.set(value);
      return;
    }

    const controls = animate(count, value, {
      duration: durationFor(value),
      delay,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [inView, reduceMotion, value, count, delay]);

  return <motion.span>{display}</motion.span>;
}
