"use client";

// About journey timeline. Mobile = text only. Desktop = story image left, anchor right.
// Active year: IntersectionObserver (READING_ZONE_MARGIN). Dot easing: MilestoneRow duration-*.

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { MotionFade } from "@/components/shared/motion/motion-fade";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { aboutPageContent } from "@/content/about";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";
import { cn } from "@/lib/utils";
import type {
  AboutJourneyFocusPoint,
  AboutJourneyMilestone,
} from "@/types/about";

// How much of each milestone has to sit in view before it wins. Nudge if hand-off feels jumpy.
const READING_ZONE_MARGIN = "-28% 0px -32% 0px";
const INTERSECTION_THRESHOLDS = Array.from(
  { length: 11 },
  (_, index) => index / 10,
);
// Only used on mobile when two years are neck-and-neck. 0 is fine for most cases.
const MOBILE_ACTIVE_HYSTERESIS = 0;
// Desktop story stack only — slight lag so the photo doesn't snap with the dot.
const STORY_IMAGE_DELAY_MS = 350;

function pickBestActiveIndex(
  ratios: Map<number, number>,
  count: number,
): number {
  let bestIndex = 0;
  let bestRatio = -1;

  for (let index = 0; index < count; index += 1) {
    const ratio = ratios.get(index) ?? 0;
    if (ratio > bestRatio) {
      bestRatio = ratio;
      bestIndex = index;
    }
  }

  return bestIndex;
}

function pickActiveIndexForViewport(
  ratios: Map<number, number>,
  count: number,
  currentActive: number,
  mobile: boolean,
): number {
  const bestIndex = pickBestActiveIndex(ratios, count);

  if (!mobile || MOBILE_ACTIVE_HYSTERESIS === 0) {
    return bestIndex;
  }

  if (bestIndex === currentActive) {
    return currentActive;
  }

  const currentRatio = ratios.get(currentActive) ?? 0;
  const bestRatio = ratios.get(bestIndex) ?? 0;

  if (
    bestRatio - currentRatio < MOBILE_ACTIVE_HYSTERESIS &&
    currentRatio > 0.08
  ) {
    return currentActive;
  }

  return bestIndex;
}

function FocusPointList({
  points,
  className,
}: {
  points: readonly AboutJourneyFocusPoint[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {points.map((point) => (
        <li key={point} className="flex items-start gap-2.5 text-sm leading-6">
          <span
            className="bg-leaf-600 mt-2 size-1.5 shrink-0 rounded-full"
            aria-hidden
          />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}

function JourneyImage({
  src,
  alt,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("bg-muted relative overflow-hidden rounded-xl", className)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}

function StoryImageStack({
  milestones,
  visibleIndex,
  reduceMotion,
  className,
  imageSizes = "(max-width: 1024px) 100vw, 33vw",
}: {
  milestones: readonly AboutJourneyMilestone[];
  visibleIndex: number;
  reduceMotion: boolean;
  className?: string;
  imageSizes?: string;
}) {
  const active = milestones[visibleIndex];

  return (
    <div
      className={cn("bg-muted relative overflow-hidden rounded-xl", className)}
      aria-label={
        active
          ? `${active.year} — ${active.title}`
          : "Journey milestone illustration"
      }
    >
      {milestones.map((milestone, index) => (
        <Image
          key={milestone.year}
          src={milestone.image}
          alt={milestone.imageAlt}
          fill
          priority={index === 0}
          sizes={imageSizes}
          className={cn(
            "object-cover transition-opacity ease-in-out",
            reduceMotion ? "duration-0" : "duration-700",
            index === visibleIndex ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
    </div>
  );
}

function MilestoneFocusPanel({
  isActive,
  focusPanelLabel,
  points,
}: {
  isActive: boolean;
  focusPanelLabel: string;
  points: readonly AboutJourneyFocusPoint[];
}) {
  if (!points.length) return null;

  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows,opacity,margin] duration-700 ease-out lg:duration-500 lg:ease-in-out",
        isActive
          ? "mt-6 grid-rows-[1fr] opacity-100"
          : "mt-0 grid-rows-[0fr] opacity-0",
      )}
      aria-hidden={!isActive}
    >
      <div className="overflow-hidden">
        <div className="border-leaf-100 border-t pt-6">
          <p className="text-fg-subtle text-[11px] font-semibold tracking-[0.16em] uppercase">
            {focusPanelLabel}
          </p>
          <FocusPointList
            points={points}
            className={cn(
              "mt-4 transition-colors duration-700 ease-out lg:duration-500 lg:ease-in-out",
              isActive ? "text-foreground" : "text-fg-muted",
            )}
          />
        </div>
      </div>
    </div>
  );
}

function MilestoneRow({
  milestone,
  isActive,
  focusPanelLabel,
  registerRef,
  index,
  isLast,
}: {
  milestone: AboutJourneyMilestone;
  isActive: boolean;
  focusPanelLabel: string;
  registerRef: (index: number, node: HTMLElement | null) => void;
  index: number;
  isLast: boolean;
}) {
  return (
    <article
      ref={(node) => registerRef(index, node)}
      data-milestone-index={index}
      aria-current={isActive ? "step" : undefined}
      className={cn(
        "relative flex gap-5 sm:gap-6",
        !isLast && "pb-16 sm:pb-20 lg:pb-24",
      )}
    >
      <div className="flex flex-col items-center pt-0.5">
        <span
          aria-hidden
          className={cn(
            "inline-block size-4 shrink-0 rounded-full border-2 transition-[background-color,border-color,transform] duration-700 ease-out lg:duration-500 lg:ease-in-out",
            isActive
              ? "bg-leaf-600 border-leaf-600 scale-105 lg:scale-110"
              : "border-leaf-300 scale-100 bg-transparent",
          )}
        />
        {!isLast ? (
          <span className="bg-leaf-100 mt-3 w-[2px] flex-1" aria-hidden />
        ) : null}
      </div>

      <div className="min-w-0 flex-1 pr-1 sm:pr-2">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
          <span
            className={cn(
              "font-serif text-sm font-semibold tracking-[0.04em] transition-colors duration-700 ease-out lg:duration-500 lg:ease-in-out",
              isActive ? "text-tangerine-600" : "text-tangerine-500/70",
            )}
          >
            {milestone.year}
          </span>
          <h3
            className={cn(
              "font-serif text-lg leading-8 font-semibold transition-colors duration-700 ease-out sm:text-xl sm:leading-8 lg:duration-500 lg:ease-in-out",
              isActive ? "text-foreground" : "text-fg-muted",
            )}
          >
            {milestone.title}
          </h3>
        </div>

        <p
          className={cn(
            "mt-3 max-w-prose text-sm leading-7 transition-colors duration-700 ease-out sm:text-[15px] sm:leading-7 lg:duration-500 lg:ease-in-out",
            isActive ? "text-foreground/90" : "text-fg-muted",
          )}
        >
          {milestone.description}
        </p>

        <MilestoneFocusPanel
          isActive={isActive}
          focusPanelLabel={focusPanelLabel}
          points={milestone.focusPoints}
        />
      </div>
    </article>
  );
}

export function JourneySection() {
  const journey = aboutPageContent.journey;
  const reduceMotion = useReducedMotionSafe();
  const [activeIndex, setActiveIndex] = useState(0);
  const [storyImageIndex, setStoryImageIndex] = useState(0);
  const milestoneRefs = useRef<(HTMLElement | null)[]>([]);
  const visibilityRatios = useRef<Map<number, number>>(new Map());
  const milestoneCount = journey.milestones.length;

  const registerRef = (index: number, node: HTMLElement | null) => {
    milestoneRefs.current[index] = node;
  };

  // Left story image (desktop). Delayed crossfade only — mobile has no images here.
  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const timer = window.setTimeout(() => {
      setStoryImageIndex(activeIndex);
    }, STORY_IMAGE_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, reduceMotion]);

  const visibleStoryIndex = reduceMotion ? activeIndex : storyImageIndex;

  // Active year from scroll. Keep updates instant — debouncing broke the mobile dot fill.
  useLayoutEffect(() => {
    const nodes = milestoneRefs.current.filter(
      (node): node is HTMLElement => node !== null,
    );

    if (!nodes.length) {
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 1023px)");

    const updateActiveIndex = () => {
      setActiveIndex((current) => {
        const next = pickActiveIndexForViewport(
          visibilityRatios.current,
          milestoneCount,
          current,
          mobileQuery.matches,
        );

        return next === current ? current : next;
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(
            (entry.target as HTMLElement).dataset.milestoneIndex,
          );
          if (Number.isNaN(index)) {
            return;
          }
          visibilityRatios.current.set(index, entry.intersectionRatio);
        });

        updateActiveIndex();
      },
      {
        rootMargin: READING_ZONE_MARGIN,
        threshold: INTERSECTION_THRESHOLDS,
      },
    );

    nodes.forEach((node) => observer.observe(node));
    updateActiveIndex();

    return () => observer.disconnect();
  }, [milestoneCount]);

  return (
    <section className="bg-subtle py-16 sm:py-20 lg:py-24">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <MotionFade>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr_1fr] lg:items-start lg:gap-12 xl:gap-14">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <EyebrowBadge tone="neutral">{journey.eyebrow}</EyebrowBadge>
              <h2 className="text-foreground mt-4 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
                {journey.title}
              </h2>

              <StoryImageStack
                milestones={journey.milestones}
                visibleIndex={visibleStoryIndex}
                reduceMotion={reduceMotion}
                className="mt-8 hidden aspect-4/5 lg:block"
              />
            </div>

            <div className="min-w-0 lg:py-2">
              {journey.milestones.map((milestone, index) => (
                <MilestoneRow
                  key={milestone.year}
                  milestone={milestone}
                  index={index}
                  isLast={index === milestoneCount - 1}
                  isActive={index === activeIndex}
                  focusPanelLabel={journey.focusPanelLabel}
                  registerRef={registerRef}
                />
              ))}
            </div>

            <div className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
              <JourneyImage
                src={journey.anchorImage}
                alt={journey.anchorImageAlt}
                className="aspect-3/5 min-h-[min(100%,calc(100vh-10rem))] w-full"
              />
              <p className="text-fg-muted mt-4 text-center text-xs leading-5">
                {journey.anchorImageCaption}
              </p>
            </div>
          </div>
        </MotionFade>
      </div>
    </section>
  );
}
