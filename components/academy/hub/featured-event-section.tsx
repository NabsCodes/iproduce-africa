"use client";

import { ArrowRight, CalendarDays, Clock3, MapPin, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { AcademyRegistrationAction } from "@/components/academy/registration/academy-registration-action";
import { CatalogueImage } from "@/components/shared/catalogue-image";
import { MotionFade } from "@/components/shared/motion/motion-fade";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";
import {
  academyEffectiveEndDate,
  type AcademyWebinarDisplayState,
  academyWebinarDisplayState,
  resolveValidAcademyEndDate,
} from "@/lib/academy-webinars";
import type { AcademyFeaturedEvent, AcademyWebinar } from "@/types/academy";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type EventTiming = {
  countdown: Countdown | null;
  state: AcademyWebinarDisplayState;
};

const MAX_BROWSER_TIMEOUT = 2_147_000_000;

function computeEventTiming(
  webinar: Pick<AcademyWebinar, "date" | "endDate">,
  nowMs = Date.now(),
): EventTiming {
  const now = new Date(nowMs).toISOString();
  const state = academyWebinarDisplayState(webinar, now);
  if (state !== "upcoming") return { countdown: null, state };

  const diff = Date.parse(webinar.date) - nowMs;
  if (!Number.isFinite(diff) || diff <= 0) {
    return { countdown: null, state: "elapsed" };
  }

  // `ceil` prevents a misleading all-zero countdown during the final
  // fractional second before the scheduled start.
  const totalSeconds = Math.ceil(diff / 1000);
  return {
    state,
    countdown: {
      days: Math.floor(totalSeconds / 86_400),
      hours: Math.floor((totalSeconds % 86_400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    },
  };
}

function CountdownValue({ value }: { value: number | null }) {
  const reduce = useReducedMotionSafe();
  const display = value === null ? "--" : String(value).padStart(2, "0");

  if (reduce) {
    return (
      <span className="font-serif text-2xl leading-none font-semibold tabular-nums sm:text-3xl">
        {display}
      </span>
    );
  }

  return (
    <span className="relative inline-flex h-[1em] min-w-[2ch] items-center justify-center overflow-hidden font-serif text-2xl leading-none font-semibold tabular-nums sm:text-3xl">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={display}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {display}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function CountdownCard({
  value,
  label,
}: {
  value: number | null;
  label: string;
}) {
  return (
    <div className="bg-forest-900 flex flex-col items-center justify-center rounded-lg px-2 py-3 text-white sm:px-3 sm:py-4">
      <CountdownValue value={value} />
      <span className="text-leaf-300 mt-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase sm:tracking-[0.18em]">
        {label}
      </span>
    </div>
  );
}

type FeaturedEventSectionProps = {
  featured: AcademyFeaturedEvent;
  webinar: AcademyWebinar;
  initialDisplayState: AcademyWebinarDisplayState;
};

export function FeaturedEventSection({
  featured,
  webinar,
  initialDisplayState,
}: FeaturedEventSectionProps) {
  const router = useRouter();
  const [timing, setTiming] = useState<EventTiming>({
    countdown: null,
    state: initialDisplayState,
  });
  const refreshedBoundaryRef = useRef<string | null>(null);
  const webinarDate = webinar.date;
  const webinarEndDate = webinar.endDate;
  const webinarSlug = webinar.slug;

  useEffect(() => {
    let transitionId: number | undefined;
    let retryId: number | undefined;
    let collectId: number | undefined;
    const timingInput = { date: webinarDate, endDate: webinarEndDate };
    const effectiveEnd = academyEffectiveEndDate(timingInput);
    const boundaryKey = `${webinarSlug}:${effectiveEnd}`;

    const tick = () => {
      const now = Date.now();
      const nextTiming = computeEventTiming(timingInput, now);
      setTiming(nextTiming);

      if (nextTiming.state === "upcoming") {
        const untilStart = Date.parse(webinarDate) - now;
        transitionId = window.setTimeout(
          tick,
          Math.min(1000, Math.max(25, untilStart + 25)),
        );
        return;
      }

      if (nextTiming.state === "happening") {
        const untilEnd = Date.parse(effectiveEnd) - now;
        transitionId = window.setTimeout(
          tick,
          Math.min(MAX_BROWSER_TIMEOUT, Math.max(25, untilEnd + 25)),
        );
        return;
      }

      // Time passage cannot fire a Sanity webhook. At the effective end, ask
      // for the next promoted webinar now, retry after the five-minute cache
      // window, then collect the stale-while-revalidate regeneration once.
      if (refreshedBoundaryRef.current !== boundaryKey) {
        refreshedBoundaryRef.current = boundaryKey;
        router.refresh();
        retryId = window.setTimeout(() => {
          router.refresh();
          collectId = window.setTimeout(() => router.refresh(), 30_000);
        }, 301_000);
      }
    };

    tick();

    return () => {
      if (transitionId !== undefined) window.clearTimeout(transitionId);
      if (retryId !== undefined) window.clearTimeout(retryId);
      if (collectId !== undefined) window.clearTimeout(collectId);
    };
  }, [router, webinarDate, webinarEndDate, webinarSlug]);

  const state = timing.state;
  const knownEndDate = resolveValidAcademyEndDate(
    webinar.date,
    webinar.endDate,
  );

  return (
    <section
      id="featured-event"
      className="scroll-mt-36 bg-white py-14 sm:py-16 lg:scroll-mt-40 lg:py-20"
    >
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <MotionFade>
          <EyebrowBadge>{featured.eyebrow}</EyebrowBadge>
          <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
            {featured.sectionTitle}
          </h2>
        </MotionFade>

        <MotionFade
          delay={0.16}
          yFrom={12}
          duration={0.48}
          className="border-default bg-subtle mt-10 grid overflow-hidden rounded-xl border lg:grid-cols-2"
        >
          <CatalogueImage
            src={featured.image}
            alt={featured.imageAlt}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-4/3 min-h-[280px] lg:aspect-auto lg:min-h-0"
          />

          <div className="flex flex-col gap-5 p-6 sm:gap-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="leaf">{featured.category}</Badge>
              <Badge
                variant="forest"
                className="bg-forest-900 border-transparent text-white"
              >
                {featured.format}
              </Badge>
            </div>

            <div>
              <h3 className="text-foreground font-serif text-2xl leading-tight font-semibold sm:text-3xl">
                {featured.title}
              </h3>
              <p className="text-fg-muted mt-3 text-base leading-7">
                {featured.description}
              </p>
            </div>

            <ul className="text-fg-muted flex flex-col gap-3 border-t border-b border-(--border-subtle) py-5 text-sm leading-6">
              <li className="flex items-start gap-3">
                <CalendarDays
                  className="text-fg-subtle mt-0.5 size-4 shrink-0"
                  aria-hidden
                />
                <span>{featured.dateLabel}</span>
              </li>
              {featured.location ? (
                <li className="flex items-start gap-3">
                  <MapPin
                    className="text-fg-subtle mt-0.5 size-4 shrink-0"
                    aria-hidden
                  />
                  <span>{featured.location}</span>
                </li>
              ) : null}
              {featured.speakers ? (
                <li className="flex items-start gap-3">
                  <Users
                    className="text-fg-subtle mt-0.5 size-4 shrink-0"
                    aria-hidden
                  />
                  <span>{featured.speakers}</span>
                </li>
              ) : null}
            </ul>

            {state === "happening" ? (
              <div
                className="border-leaf-100 bg-leaf-50 rounded-xl border p-4 sm:p-5"
                role="status"
                aria-live="polite"
              >
                <div className="flex items-start gap-3">
                  <span className="bg-leaf-100 text-leaf-700 flex size-10 shrink-0 items-center justify-center rounded-full">
                    <Clock3 className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-foreground font-semibold">
                      Happening now
                    </p>
                    <p className="text-fg-muted mt-1 text-sm leading-6">
                      This event is currently underway.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <AcademyRegistrationAction
                    kind="webinar"
                    webinar={webinar}
                    defaultLabel={featured.registerLabel}
                    buttonSize="sm"
                    className="self-start"
                  />
                  <ButtonLink
                    href={`/academy/webinars/${featured.slug}`}
                    variant="green-outline"
                    size="sm"
                  >
                    View session details
                    <ArrowRight className="size-4" />
                  </ButtonLink>
                </div>
              </div>
            ) : state === "elapsed" ? (
              <div
                className="border-leaf-100 bg-leaf-50 rounded-xl border p-4 sm:p-5"
                role="status"
                aria-live="polite"
              >
                <div className="flex items-start gap-3">
                  <span className="bg-leaf-100 text-leaf-700 flex size-10 shrink-0 items-center justify-center rounded-full">
                    <Clock3 className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-foreground font-semibold">
                      {knownEndDate
                        ? "This session has ended"
                        : "This session has started"}
                    </p>
                    <p className="text-fg-muted mt-1 text-sm leading-6">
                      {knownEndDate
                        ? "We’re checking for the next available session."
                        : "Registration is now closed. We’re checking for the next available session."}
                    </p>
                  </div>
                </div>

                <ButtonLink
                  href={`/academy/webinars/${featured.slug}`}
                  variant="green-outline"
                  size="sm"
                  className="mt-4"
                >
                  View session details
                  <ArrowRight className="size-4" />
                </ButtonLink>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-fg-subtle text-[11px] font-semibold tracking-[0.18em] uppercase">
                    Next session begins in
                  </p>
                  <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
                    <CountdownCard
                      value={timing.countdown?.days ?? null}
                      label="Days"
                    />
                    <CountdownCard
                      value={timing.countdown?.hours ?? null}
                      label="Hours"
                    />
                    <CountdownCard
                      value={timing.countdown?.minutes ?? null}
                      label="Minutes"
                    />
                    <CountdownCard
                      value={timing.countdown?.seconds ?? null}
                      label="Seconds"
                    />
                  </div>
                </div>

                <AcademyRegistrationAction
                  kind="webinar"
                  webinar={webinar}
                  defaultLabel={featured.registerLabel}
                  className="self-start"
                  showDetailsAction
                />
              </>
            )}
          </div>
        </MotionFade>
      </div>
    </section>
  );
}
