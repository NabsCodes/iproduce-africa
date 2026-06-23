"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { CheckCircle2 } from "lucide-react";

import { MotionCountUp } from "@/components/shared/motion/motion-count-up";
import { MotionFade } from "@/components/shared/motion/motion-fade";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { aboutPageContent } from "@/content/about";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";
import type { ImpactStatItem } from "@/types/content";

function StatCard({
  stat,
  index,
  start,
}: {
  stat: ImpactStatItem;
  index: number;
  start: boolean;
}) {
  const reduceMotion = useReducedMotionSafe();
  const delay = index * 0.12;
  const metricValue = stat.value;
  const hasMetric = typeof metricValue === "number";

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={start ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="border-border flex min-h-[180px] flex-col rounded-xl border bg-white p-5 sm:min-h-[220px] sm:p-8"
    >
      <p className="text-fg-muted text-[10px] leading-4 font-semibold tracking-[0.16em] uppercase sm:text-[11px] sm:tracking-[0.18em]">
        {stat.label}
      </p>
      {hasMetric ? (
        <p className="text-foreground mt-auto pt-6 font-serif text-4xl leading-none font-semibold tracking-tight tabular-nums sm:pt-8 sm:text-5xl">
          <MotionCountUp value={metricValue} inView={start} delay={delay} />
          {stat.accent ? (
            <span className="text-tangerine-500">{stat.accent}</span>
          ) : null}
        </p>
      ) : (
        <div className="mt-auto pt-6 sm:pt-8">
          <CheckCircle2 className="text-tangerine-500 size-6" aria-hidden />
          <p className="text-foreground mt-4 font-serif text-xl leading-7 font-semibold sm:text-2xl sm:leading-8">
            {stat.description}
          </p>
        </div>
      )}
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
        <MotionFade className="text-center">
          <EyebrowBadge className="justify-center">
            {headerEyebrow}
          </EyebrowBadge>
          <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
            {headerTitle}
          </h2>
          <p className="text-fg-muted mx-auto mt-4 max-w-2xl text-base leading-6">
            {headerDescription}
          </p>
        </MotionFade>

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
