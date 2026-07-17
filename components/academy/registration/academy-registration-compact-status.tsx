"use client";

import { useWebinarRegistrationState } from "@/hooks/use-webinar-registration-state";
import type { AcademyWebinar } from "@/types/academy";

export function AcademyRegistrationCompactStatus({
  webinar,
}: {
  webinar: AcademyWebinar;
}) {
  const state = useWebinarRegistrationState(webinar);
  return <>{state.compactLabel}</>;
}
