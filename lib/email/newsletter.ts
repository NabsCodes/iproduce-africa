import { readTrimmedEnv, sendEmail, sendEmailQuietly } from "@/lib/email/send";
import {
  buildNewsletterConfirmEmail,
  buildNewsletterNotificationEmail,
} from "@/lib/email/templates/newsletter-confirm";
import type { NewsletterValues } from "@/schemas/newsletter";

export type SendNewsletterEmailsInput = NewsletterValues & {
  submittedAt: Date;
  sourcePath: string;
};

export type FormEmailResult =
  | { sent: true }
  | { sent: false; reason: "not_configured" };

export async function sendNewsletterEmails(
  input: SendNewsletterEmailsInput,
): Promise<FormEmailResult> {
  const to = readTrimmedEnv("NEWSLETTER_TO_EMAIL");
  if (!to) return { sent: false, reason: "not_configured" };

  const notification = await buildNewsletterNotificationEmail(input);
  const notificationResult = await sendEmail({
    to,
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
    replyTo: input.email,
  });

  if (!notificationResult.sent) return notificationResult;

  const receipt = await buildNewsletterConfirmEmail(input);
  await sendEmailQuietly({
    to: input.email,
    subject: receipt.subject,
    html: receipt.html,
    text: receipt.text,
  });

  return { sent: true };
}
