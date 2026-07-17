"use client";

import { useEffect, useState } from "react";

import { resolveWebinarRegistrationState } from "@/lib/academy-registration";
import type { AcademyWebinar } from "@/types/academy";

const MAX_BROWSER_TIMEOUT = 2_147_000_000;

export function useWebinarRegistrationState(
  webinar: AcademyWebinar,
  defaultLabel?: string,
) {
  const [, setClockRevision] = useState(0);
  const state = resolveWebinarRegistrationState(webinar, { defaultLabel });

  useEffect(() => {
    if (!state.nextBoundary) return;
    const boundaryMs = Date.parse(state.nextBoundary);
    if (!Number.isFinite(boundaryMs)) return;

    let timeoutId: number | undefined;
    const scheduleBoundaryCheck = () => {
      const remaining = boundaryMs - Date.now();
      timeoutId = window.setTimeout(
        () => {
          if (Date.now() >= boundaryMs) {
            setClockRevision((revision) => revision + 1);
            return;
          }
          scheduleBoundaryCheck();
        },
        Math.max(25, Math.min(remaining + 25, MAX_BROWSER_TIMEOUT)),
      );
    };

    scheduleBoundaryCheck();
    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [state.nextBoundary]);

  return state;
}
