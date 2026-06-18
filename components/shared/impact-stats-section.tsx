"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { aboutPageContent } from "@/content/about";
import type { ImpactStatItem } from "@/types/content";

const numberFormatter = new Intl.NumberFormat("en-US");

/** Larger numbers count for a touch longer so the motion reads as deliberate. */
function durationFor(value: number) {
  if (value >= 1000) return 2.4;
  if (value >= 100) return 2;
  return 1.7;
}

function StatCard({
  stat,
  index,
  start,
}: {
  stat: ImpactStatItem;
  index: number;
  start: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const formatted = useTransform(count, (latest) =>
    numberFormatter.format(Math.round(latest)),
  );

  const delay = index * 0.12;

  useEffect(() => {
    if (!start) return;

    if (reduceMotion) {
      count.set(stat.value);
      return;
    }

    const controls = animate(count, stat.value, {
      duration: durationFor(stat.value),
      delay,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [start, reduceMotion, stat.value, count, delay]);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={start ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="border-border rounded-xl border bg-white p-6 sm:p-8"
    >
      <p className="text-fg-muted text-[11px] font-semibold tracking-[0.18em] uppercase">
        {stat.label}
      </p>
      <p className="text-foreground mt-6 font-serif text-5xl leading-none font-semibold tracking-tight tabular-nums sm:mt-8 sm:text-6xl">
        <motion.span>{formatted}</motion.span>
        {stat.accent ? (
          <span className="text-tangerine-500">{stat.accent}</span>
        ) : null}
      </p>
    </motion.div>
  );
}

type ImpactStatsSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: readonly ImpactStatItem[];
};

export function ImpactStatsSection({
  eyebrow,
  title,
  description,
  items,
}: ImpactStatsSectionProps = {}) {
  const fallback = aboutPageContent.impactStats;
  const headerEyebrow = eyebrow ?? fallback.eyebrow;
  const headerTitle = title ?? fallback.title;
  const headerDescription = description ?? fallback.description;
  const stats = items ?? fallback.items;

  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "-15% 0px" });

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="text-center">
          <EyebrowBadge className="justify-center">
            {headerEyebrow}
          </EyebrowBadge>
          <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
            {headerTitle}
          </h2>
          <p className="text-fg-muted mx-auto mt-4 max-w-2xl text-base leading-6">
            {headerDescription}
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:mt-12 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              start={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
