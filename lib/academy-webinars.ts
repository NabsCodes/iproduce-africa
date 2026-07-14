import type { AcademyWebinar } from "@/types/academy";

export type AcademyWebinarDisplayState = "upcoming" | "happening" | "elapsed";

export function academyNowIso(): string {
  return new Date().toISOString();
}

export function isUpcomingAcademyDateTime(
  date: string,
  now = academyNowIso(),
): boolean {
  const scheduledAt = Date.parse(date);
  const currentTime = Date.parse(now);

  return (
    Number.isFinite(scheduledAt) &&
    Number.isFinite(currentTime) &&
    scheduledAt >= currentTime
  );
}

export function resolveValidAcademyEndDate(
  startDate: string,
  endDate?: string,
): string | undefined {
  if (!endDate) return undefined;

  const start = Date.parse(startDate);
  const end = Date.parse(endDate);

  return Number.isFinite(start) && Number.isFinite(end) && end > start
    ? endDate
    : undefined;
}

/**
 * One canonical retention boundary: a valid end time when supplied, otherwise
 * the required start time. Invalid direct API writes fall back to the start
 * rather than creating a nonsensical live window.
 */
export function academyEffectiveEndDate(
  webinar: Pick<AcademyWebinar, "date" | "endDate">,
): string {
  return (
    resolveValidAcademyEndDate(webinar.date, webinar.endDate) ?? webinar.date
  );
}

export function academyWebinarDisplayState(
  webinar: Pick<AcademyWebinar, "date" | "endDate">,
  now = academyNowIso(),
): AcademyWebinarDisplayState {
  const start = Date.parse(webinar.date);
  const currentTime = Date.parse(now);

  if (!Number.isFinite(start) || !Number.isFinite(currentTime)) {
    return "elapsed";
  }

  if (currentTime < start) return "upcoming";

  const endDate = resolveValidAcademyEndDate(webinar.date, webinar.endDate);
  if (endDate && currentTime <= Date.parse(endDate)) return "happening";

  return "elapsed";
}

export function isAcademyWebinarPromotable(
  webinar: Pick<AcademyWebinar, "date" | "endDate">,
  now = academyNowIso(),
): boolean {
  const effectiveEnd = Date.parse(academyEffectiveEndDate(webinar));
  const currentTime = Date.parse(now);

  return (
    Number.isFinite(effectiveEnd) &&
    Number.isFinite(currentTime) &&
    effectiveEnd >= currentTime
  );
}

/**
 * Canonical promotion/listing rule: retain happening and upcoming webinars by
 * effective end, then order by start time and slug. A happening event started
 * earlier, so it naturally holds the promoted slot until its end passes.
 */
export function selectPromotableWebinars(
  webinars: readonly AcademyWebinar[],
  options: { now?: string; limit?: number } = {},
): AcademyWebinar[] {
  const now = options.now ?? academyNowIso();
  const promotable = webinars
    .filter((webinar) => isAcademyWebinarPromotable(webinar, now))
    .sort((a, b) => {
      const dateOrder = a.date.localeCompare(b.date);
      return dateOrder || a.slug.localeCompare(b.slug);
    });

  return options.limit === undefined
    ? promotable
    : promotable.slice(0, options.limit);
}
