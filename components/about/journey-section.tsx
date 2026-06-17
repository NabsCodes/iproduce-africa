"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import {
  aboutPageContent,
  type AboutJourneyMilestone,
  type AboutJourneyStat,
} from "@/content/about";
import { cn } from "@/lib/utils";

function MilestoneRow({
  milestone,
  isActive,
  registerRef,
  index,
}: {
  milestone: AboutJourneyMilestone;
  isActive: boolean;
  registerRef: (index: number, node: HTMLDivElement | null) => void;
  index: number;
}) {
  return (
    <div
      ref={(node) => registerRef(index, node)}
      className="relative flex gap-5 pb-12 last:pb-0 sm:gap-6 lg:pb-14"
    >
      <div className="flex flex-col items-center">
        <span
          aria-hidden
          className={cn(
            "mt-1 inline-block size-4 shrink-0 rounded-full border-2 transition-colors duration-300",
            isActive
              ? "bg-leaf-600 border-leaf-600"
              : "border-leaf-300 bg-transparent",
          )}
        />
        <span className="bg-leaf-100 mt-2 w-[2px] flex-1" aria-hidden />
      </div>

      <div className="flex-1 pb-2">
        <div className="flex items-baseline gap-3">
          <span className="text-tangerine-600 font-serif text-sm font-semibold tracking-[0.04em]">
            {milestone.year}
          </span>
          <h3 className="text-foreground font-serif text-lg leading-7 font-semibold sm:text-xl">
            {milestone.title}
          </h3>
        </div>
        <p className="text-fg-muted mt-2 text-sm leading-6 sm:text-[15px]">
          {milestone.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2 lg:hidden">
          {milestone.stats.map((stat) => (
            <li
              key={stat.label}
              className="border-default inline-flex items-baseline gap-1.5 rounded-full border bg-white px-3 py-1"
            >
              <span className="text-foreground font-serif text-sm font-semibold tabular-nums">
                {stat.value}
              </span>
              <span className="text-fg-muted text-[11px] font-medium tracking-wide uppercase">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StickyImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="bg-muted relative aspect-4/5 overflow-hidden rounded-xl">
      <AnimatePresence initial={false}>
        <motion.div
          key={src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function StickyStatsCard({
  year,
  stats,
}: {
  year: string;
  stats: readonly AboutJourneyStat[];
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={year}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="border-default relative overflow-hidden rounded-xl border bg-white p-7"
      >
        <div className="flex items-center gap-3">
          <span className="bg-tangerine-500 h-px w-9" aria-hidden />
          <span className="text-tangerine-600 font-serif text-sm font-semibold tracking-[0.08em]">
            {year}
          </span>
        </div>

        <ul className="mt-6 divide-y divide-(--border-subtle)">
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="flex items-baseline justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <span className="text-fg-subtle text-[11px] font-semibold tracking-[0.16em] uppercase">
                {stat.label}
              </span>
              <span className="text-foreground font-serif text-3xl leading-none font-semibold tracking-tight tabular-nums sm:text-4xl">
                {stat.value}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </AnimatePresence>
  );
}

export function JourneySection() {
  const journey = aboutPageContent.journey;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = journey.milestones[activeIndex];
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);

  const registerRef = (index: number, node: HTMLDivElement | null) => {
    milestoneRefs.current[index] = node;
  };

  useEffect(() => {
    const handleScroll = () => {
      const readingLine = window.innerHeight * 0.45;
      let candidate = 0;

      milestoneRefs.current.forEach((node, index) => {
        if (!node) return;
        const { top } = node.getBoundingClientRect();
        if (top <= readingLine) candidate = index;
      });

      setActiveIndex((prev) => (prev === candidate ? prev : candidate));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="bg-subtle py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr_1fr] lg:gap-10">
          <div className="lg:sticky lg:top-34 lg:self-start">
            <EyebrowBadge>{journey.eyebrow}</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
              {journey.title}
            </h2>

            <div className="mt-8 hidden lg:block">
              <StickyImage src={active.leftImage} alt={active.title} />
            </div>
          </div>

          <div>
            {journey.milestones.map((milestone, index) => (
              <MilestoneRow
                key={milestone.year}
                milestone={milestone}
                index={index}
                isActive={index === activeIndex}
                registerRef={registerRef}
              />
            ))}
          </div>

          <div className="hidden lg:sticky lg:top-34 lg:block lg:self-start">
            <StickyStatsCard year={active.year} stats={active.stats} />
          </div>
        </div>
      </div>
    </section>
  );
}
