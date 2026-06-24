import type {
  AcademyRegistrationConfig,
  AcademyWebinar,
} from "@/types/academy";

function sessionDateKey(date: string) {
  return date.slice(0, 10);
}

export function isUpcomingSession(
  date: string,
  today = new Date().toISOString().slice(0, 10),
): boolean {
  return sessionDateKey(date) >= today;
}

export function resolveWebinarRegistration(
  webinar: AcademyWebinar,
): AcademyRegistrationConfig {
  const configured = webinar.registration ?? { mode: "open" as const };
  const today = new Date().toISOString().slice(0, 10);
  const isPast = sessionDateKey(webinar.date) < today;

  if (configured.mode === "open" && isPast) {
    return {
      mode: "closed",
      closedLabel: configured.closedLabel ?? "This session has ended.",
    };
  }

  return configured;
}

export function resolveCourseRegistration(
  registration?: AcademyRegistrationConfig,
): AcademyRegistrationConfig {
  return registration ?? { mode: "interest" };
}
