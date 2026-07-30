import { formatAcademyRegistrationDeadline } from "@/lib/academy-dates";
import {
  academyNowIso,
  isUpcomingAcademyDateTime,
} from "@/lib/academy-webinars";
import type {
  AcademyRegistrationConfig,
  AcademyWebinar,
  CourseRegistrationState,
  WebinarRegistrationState,
} from "@/types/academy";

const DEFAULT_CLOSED_LABEL = "Registration has closed for this session.";
const DEFAULT_CLOSED_COURSE_LABEL = "Registration has closed for this course.";

export function isUpcomingSession(
  date: string,
  now = academyNowIso(),
): boolean {
  return isUpcomingAcademyDateTime(date, now);
}

export function resolveValidRegistrationDeadline(
  sessionStart: string,
  closesAt?: string,
): string | undefined {
  if (!closesAt) return undefined;
  const startMs = Date.parse(sessionStart);
  const closeMs = Date.parse(closesAt);
  if (!Number.isFinite(startMs) || !Number.isFinite(closeMs)) return undefined;
  return closeMs <= startMs ? closesAt : undefined;
}

type ResolveWebinarRegistrationOptions = {
  now?: string;
  defaultLabel?: string;
};

/**
 * Canonical webinar registration contract. UI surfaces and the form API use
 * this same state so deadline, external, and closed behavior cannot drift.
 */
export function resolveWebinarRegistrationState(
  webinar: AcademyWebinar,
  options: ResolveWebinarRegistrationOptions = {},
): WebinarRegistrationState {
  const configured = webinar.registration ?? { mode: "open" as const };
  const now = options.now ?? academyNowIso();
  const nowMs = Date.parse(now);
  const provider = configured.providerName?.trim();
  const providerLabel = provider || "an external platform";
  const validDeadline = resolveValidRegistrationDeadline(
    webinar.date,
    configured.closesAt,
  );
  const boundary =
    validDeadline ?? (configured.mode === "open" ? webinar.date : undefined);
  const boundaryMs = boundary ? Date.parse(boundary) : undefined;
  const boundaryPassed =
    boundaryMs !== undefined &&
    Number.isFinite(boundaryMs) &&
    Number.isFinite(nowMs) &&
    boundaryMs <= nowMs;

  if (configured.mode === "closed" || boundaryPassed) {
    return {
      mode: configured.mode,
      availability: "closed",
      compactLabel: "Registration closed",
      statusLine: configured.closedLabel?.trim() || DEFAULT_CLOSED_LABEL,
      action: { kind: "details", label: "View session details" },
    };
  }

  const nextBoundary =
    boundaryMs !== undefined &&
    Number.isFinite(boundaryMs) &&
    boundaryMs > nowMs
      ? boundary
      : undefined;

  if (configured.mode === "external") {
    if (!configured.url) {
      return {
        mode: configured.mode,
        availability: "closed",
        compactLabel: "Registration unavailable",
        statusLine: "The external registration link is currently unavailable.",
        action: { kind: "details", label: "View session details" },
      };
    }

    return {
      mode: configured.mode,
      availability: "available",
      compactLabel: provider
        ? `Registration via ${provider}`
        : "External registration",
      statusLine: validDeadline
        ? `Registration via ${providerLabel} · closes ${formatAcademyRegistrationDeadline(validDeadline)}.`
        : `Registration is handled on ${providerLabel}.`,
      action: {
        kind: "external",
        label:
          configured.label?.trim() ||
          (provider ? `Register on ${provider}` : "Continue to registration"),
        href: configured.url,
      },
      nextBoundary,
    };
  }

  if (configured.mode === "interest") {
    return {
      mode: configured.mode,
      availability: "available",
      compactLabel: "Interest open",
      statusLine: validDeadline
        ? `Interest open · closes ${formatAcademyRegistrationDeadline(validDeadline)}.`
        : "Expressions of interest are open.",
      action: {
        kind: "internal",
        label: configured.label?.trim() || "Register interest",
      },
      nextBoundary,
    };
  }

  return {
    mode: configured.mode,
    availability: "available",
    compactLabel: "Registration open",
    statusLine: validDeadline
      ? `Registration open · closes ${formatAcademyRegistrationDeadline(validDeadline)}.`
      : "Registration open · closes when the session begins.",
    action: {
      kind: "internal",
      label: configured.label?.trim() || options.defaultLabel || "Register now",
    },
    nextBoundary,
  };
}

export function resolveCourseRegistration(
  registration?: AcademyRegistrationConfig,
): AcademyRegistrationConfig {
  return registration ?? { mode: "interest" };
}

type ResolveCourseRegistrationOptions = {
  /** Interest-mode button fallback, so `content/academy.ts` still owns it. */
  defaultLabel?: string;
};

/**
 * Canonical course registration contract. Courses have no session date, so
 * unlike webinars there is no deadline arithmetic — only the configured mode
 * decides the panel copy and whether a button, external link, or plain message
 * renders. Keeping heading/body here stops the panel from claiming enrolment
 * "opens soon" while an external LMS link is already live.
 */
export function resolveCourseRegistrationState(
  registration: AcademyRegistrationConfig | undefined,
  options: ResolveCourseRegistrationOptions = {},
): CourseRegistrationState {
  const configured = resolveCourseRegistration(registration);
  const label = configured.label?.trim();
  const provider = configured.providerName?.trim();

  if (configured.mode === "closed") {
    return {
      mode: configured.mode,
      heading: "Registration closed",
      body: configured.closedLabel?.trim() || DEFAULT_CLOSED_COURSE_LABEL,
      action: { kind: "none" },
    };
  }

  if (configured.mode === "external") {
    const url = configured.url?.trim();
    if (!url) {
      return {
        mode: configured.mode,
        heading: "Learning link unavailable",
        body: "The learning link for this course is not available yet. Check back soon, or contact us about the next enrolment window.",
        action: { kind: "none" },
      };
    }

    const platform = provider || "the learning platform";
    return {
      mode: configured.mode,
      heading: provider ? `Learn on ${provider}` : "Learn on the platform",
      body: `Enrolment and course delivery continue on ${platform}. The course page opens in a new tab.`,
      action: {
        kind: "external",
        label: label || "Start learning",
        href: url,
      },
    };
  }

  if (configured.mode === "interest") {
    return {
      mode: configured.mode,
      heading: "Register your interest",
      body: "Enrolment is not open yet. Register your interest and we will notify you when this course becomes available.",
      action: {
        kind: "internal",
        label: label || options.defaultLabel || "Register interest",
      },
    };
  }

  return {
    mode: configured.mode,
    heading: "Registration open",
    body: "Registration for this course is currently open. Share your details and our team will confirm your place.",
    action: { kind: "internal", label: label || "Register now" },
  };
}
