import { formatAcademyRegistrationDeadline } from "@/lib/academy-dates";
import {
  academyNowIso,
  isUpcomingAcademyDateTime,
} from "@/lib/academy-webinars";
import type {
  AcademyRegistrationConfig,
  AcademyWebinar,
  WebinarRegistrationState,
} from "@/types/academy";

const DEFAULT_CLOSED_LABEL = "Registration has closed for this session.";

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
