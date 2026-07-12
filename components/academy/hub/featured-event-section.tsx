"use client";

import { CalendarDays, MapPin, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { AcademyRegistrationAction } from "@/components/academy/registration/academy-registration-action";
import { CatalogueImage } from "@/components/shared/catalogue-image";
import { MotionFade } from "@/components/shared/motion/motion-fade";
import { Badge } from "@/components/ui/badge";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";
import type { AcademyFeaturedEvent, AcademyWebinar } from "@/types/academy";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const ZERO_COUNTDOWN: Countdown = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function computeCountdown(targetIso: string): Countdown {
  const diff = new Date(targetIso).getTime() - Date.now();
  if (Number.isNaN(diff) || diff <= 0) return ZERO_COUNTDOWN;

  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function CountdownValue({ value }: { value: number }) {
  const reduce = useReducedMotionSafe();
  const display = String(value).padStart(2, "0");

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

function CountdownCard({ value, label }: { value: number; label: string }) {
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
};

export function FeaturedEventSection({
  featured,
  webinar,
}: FeaturedEventSectionProps) {
  const [countdown, setCountdown] = useState<Countdown>(ZERO_COUNTDOWN);

  useEffect(() => {
    const tick = () => setCountdown(computeCountdown(featured.date));
    tick();
    const intervalId = window.setInterval(tick, 1000);
    return () => {
      window.clearInterval(intervalId);
    };
  }, [featured.date]);

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
              <li className="flex items-start gap-3">
                <MapPin
                  className="text-fg-subtle mt-0.5 size-4 shrink-0"
                  aria-hidden
                />
                <span>{featured.location}</span>
              </li>
              <li className="flex items-start gap-3">
                <Users
                  className="text-fg-subtle mt-0.5 size-4 shrink-0"
                  aria-hidden
                />
                <span>{featured.speakers}</span>
              </li>
            </ul>

            <div>
              <p className="text-fg-subtle text-[11px] font-semibold tracking-[0.18em] uppercase">
                Next event begins in
              </p>
              <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
                <CountdownCard value={countdown.days} label="Days" />
                <CountdownCard value={countdown.hours} label="Hours" />
                <CountdownCard value={countdown.minutes} label="Minutes" />
                <CountdownCard value={countdown.seconds} label="Seconds" />
              </div>
            </div>

            <AcademyRegistrationAction
              kind="webinar"
              webinar={webinar}
              defaultLabel={featured.registerLabel}
              className="self-start"
            />
          </div>
        </MotionFade>
      </div>
    </section>
  );
}
