/**
 * Academy session date display helpers.
 *
 * Always format in UTC so ISO `date` / `endDate` values from Sanity do not
 * shift a day in local browser or server timezones. Blog publish dates and
 * email timestamps stay outside this module — different domains.
 */

const academyFeaturedDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const academyShortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const academyCardMetaDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
});

const academyRegistrationDeadlineFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
  timeZoneName: "short",
});

/** Featured / detail / registration panel: "Tuesday, July 14, 2026". */
export function formatAcademyFeaturedDate(iso: string): string {
  return academyFeaturedDateFormatter.format(new Date(iso));
}

/** Hero next-live + webinar listing cards: "Jul 14, 2026". */
export function formatAcademyShortDate(iso: string): string {
  return academyShortDateFormatter.format(new Date(iso));
}

/** Hub / Home card meta chips: "JUL 14". */
export function formatAcademyCardMetaDate(iso: string): string {
  return academyCardMetaDateFormatter.format(new Date(iso)).toUpperCase();
}

/** Registration status copy: "Jul 14, 2026, 3:00 PM UTC". */
export function formatAcademyRegistrationDeadline(iso: string): string {
  return academyRegistrationDeadlineFormatter.format(new Date(iso));
}

/** Prefer editor override `dateLabel`, otherwise format from `date`. */
export function resolveAcademyDateLabel(
  date: string,
  dateLabel?: string,
): string {
  return dateLabel ?? formatAcademyFeaturedDate(date);
}
