"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { PartnerLogo } from "@/components/shared/partner-logo";
import type { Partner } from "@/content/partners";
import { partnersList } from "@/content/partners";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";
import {
  buildVoicesLogoGrid,
  getVoicesLogoWindowCount,
  VOICES_LOGO_GRID_TARGET,
} from "@/lib/partners/voices-logo-grid";
import { cn } from "@/lib/utils";

const ROTATE_INTERVAL_MS = 10_000;

type VoicesLogoGridProps = {
  partners?: readonly Partner[];
  className?: string;
};

function LogoCell({
  logo,
  className,
}: {
  logo: ReturnType<typeof buildVoicesLogoGrid>[number];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-grey-200 flex aspect-5/3 min-w-0 items-center justify-center rounded-md border bg-white p-4 sm:p-5",
        className,
      )}
    >
      <PartnerLogo
        partner={logo}
        className="max-h-10 w-auto max-w-full opacity-80 transition hover:opacity-100 sm:max-h-14"
      />
    </div>
  );
}

export function VoicesLogoGrid({
  partners = partnersList,
  className,
}: VoicesLogoGridProps) {
  const reducedMotion = useReducedMotionSafe();
  const windowCount = getVoicesLogoWindowCount(partners.length);
  const shouldRotate = windowCount > 1 && !reducedMotion;
  const [windowIndex, setWindowIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!shouldRotate || paused) {
      return;
    }

    const timer = window.setInterval(() => {
      setWindowIndex((current) => (current + 1) % windowCount);
    }, ROTATE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [paused, shouldRotate, windowCount]);

  const cells = buildVoicesLogoGrid(partners, { windowIndex });
  const mobileCells = cells.slice(0, 6);
  const desktopCells = cells.slice(6, VOICES_LOGO_GRID_TARGET);

  return (
    <div
      className={cn("min-w-0", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={windowIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3"
        >
          {mobileCells.map((logo) => (
            <LogoCell key={logo.cellId} logo={logo} />
          ))}
          {desktopCells.map((logo) => (
            <LogoCell
              key={logo.cellId}
              logo={logo}
              className="hidden sm:flex"
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
