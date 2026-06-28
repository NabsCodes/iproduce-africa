import { getCourse } from "@/content/courses";
import { getWebinar } from "@/content/webinars";
import { readTrimmedEnv, sendEmail } from "@/lib/email/send";
import {
  buildAcademyRegistrationNotificationEmail,
  buildAcademyRegistrationReceiptEmail,
} from "@/lib/email/templates/academy-registration-notification";
import type { AcademyRegistrationSubmitPayload } from "@/schemas/academy-registration";

export type SendAcademyRegistrationEmailsInput =
  AcademyRegistrationSubmitPayload & {
    submittedAt: Date;
    sourcePath: string;
  };

export type FormEmailResult =
  | { sent: true }
  | { sent: false; reason: "not_configured" | "session_not_found" };

export function resolveAcademySessionTitle(
  kind: "webinar" | "course",
  slug: string,
): string | undefined {
  if (kind === "webinar") {
    return getWebinar(slug)?.title;
  }

  return getCourse(slug)?.title;
}

export async function sendAcademyRegistrationEmails(
  input: SendAcademyRegistrationEmailsInput,
): Promise<FormEmailResult> {
  const to = readTrimmedEnv("ACADEMY_TO_EMAIL");
  if (!to) return { sent: false, reason: "not_configured" };

  const sessionTitle = resolveAcademySessionTitle(input.kind, input.slug);
  if (!sessionTitle) return { sent: false, reason: "session_not_found" };

  const payload = { ...input, sessionTitle };

  const notification = await buildAcademyRegistrationNotificationEmail(payload);
  const notificationResult = await sendEmail({
    to,
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
    replyTo: input.email,
  });

  if (!notificationResult.sent) return notificationResult;

  const receipt = await buildAcademyRegistrationReceiptEmail(payload);
  return sendEmail({
    to: input.email,
    subject: receipt.subject,
    html: receipt.html,
    text: receipt.text,
  });
}
