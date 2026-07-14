import {
  academyNowIso,
  isUpcomingAcademyDateTime,
} from "@/lib/academy-webinars";
import type {
  AcademyRegistrationConfig,
  AcademyWebinar,
} from "@/types/academy";

export function isUpcomingSession(
  date: string,
  now = academyNowIso(),
): boolean {
  return isUpcomingAcademyDateTime(date, now);
}

export function resolveWebinarRegistration(
  webinar: AcademyWebinar,
): AcademyRegistrationConfig {
  const configured = webinar.registration ?? { mode: "open" as const };
  const now = academyNowIso();
  const isPast = !isUpcomingAcademyDateTime(webinar.date, now);

  if (configured.mode === "open" && isPast) {
    return {
      mode: "closed",
      closedLabel:
        configured.closedLabel ?? "Registration has closed for this session.",
    };
  }

  return configured;
}

export function resolveCourseRegistration(
  registration?: AcademyRegistrationConfig,
): AcademyRegistrationConfig {
  return registration ?? { mode: "interest" };
}
