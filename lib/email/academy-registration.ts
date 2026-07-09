import {
  resolveCourseRegistration,
  resolveWebinarRegistration,
} from "@/lib/academy-registration";
import { readTrimmedEnv, sendEmail, sendEmailQuietly } from "@/lib/email/send";
import {
  buildAcademyRegistrationNotificationEmail,
  buildAcademyRegistrationReceiptEmail,
} from "@/lib/email/templates/academy-registration-notification";
import { fetchCourseBySlug } from "@/lib/sanity/fetch/courses";
import { fetchWebinarBySlug } from "@/lib/sanity/fetch/webinars";
import type { AcademyRegistrationSubmitPayload } from "@/schemas/academy-registration";

export type SendAcademyRegistrationEmailsInput =
  AcademyRegistrationSubmitPayload & {
    sessionTitle: string;
    submittedAt: Date;
    sourcePath: string;
  };

export type FormEmailResult =
  | { sent: true }
  | { sent: false; reason: "not_configured" };

export type AcademySessionLookup =
  | { status: "not_found" }
  | { status: "closed"; title: string }
  | { status: "external"; title: string }
  | { status: "open"; title: string };

/**
 * Resolves title + registration status in one Sanity fetch — reuses the
 * already-tested `resolveWebinarRegistration`/`resolveCourseRegistration`
 * from `lib/academy-registration.ts` (the same functions the UI uses to
 * decide whether to show a register button) so the "closed, or open but
 * the date has already passed" rule lives in exactly one place.
 *
 * `external` mode means the session is registered elsewhere (per
 * docs/sanity-academy-spec.md: "UI links out; API not used") — this API
 * must reject it too, not just rely on the UI never showing an internal
 * register button for it.
 */
export async function resolveAcademySession(
  kind: "webinar" | "course",
  slug: string,
): Promise<AcademySessionLookup> {
  if (kind === "webinar") {
    const webinar = await fetchWebinarBySlug(slug);
    if (!webinar) return { status: "not_found" };
    const registration = resolveWebinarRegistration(webinar);
    if (registration.mode === "closed") {
      return { status: "closed", title: webinar.title };
    }
    if (registration.mode === "external") {
      return { status: "external", title: webinar.title };
    }
    return { status: "open", title: webinar.title };
  }

  const course = await fetchCourseBySlug(slug);
  if (!course) return { status: "not_found" };
  const registration = resolveCourseRegistration(course.registration);
  if (registration.mode === "closed") {
    return { status: "closed", title: course.title };
  }
  if (registration.mode === "external") {
    return { status: "external", title: course.title };
  }
  return { status: "open", title: course.title };
}

export async function sendAcademyRegistrationEmails(
  input: SendAcademyRegistrationEmailsInput,
): Promise<FormEmailResult> {
  const to = readTrimmedEnv("ACADEMY_TO_EMAIL");
  if (!to) return { sent: false, reason: "not_configured" };

  const notification = await buildAcademyRegistrationNotificationEmail(input);
  const notificationResult = await sendEmail({
    to,
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
    replyTo: input.email,
  });

  if (!notificationResult.sent) return notificationResult;

  const receipt = await buildAcademyRegistrationReceiptEmail(input);
  await sendEmailQuietly({
    to: input.email,
    subject: receipt.subject,
    html: receipt.html,
    text: receipt.text,
  });

  return { sent: true };
}
