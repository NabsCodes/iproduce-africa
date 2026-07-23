import { sendEmail, sendEmailQuietly } from "@/lib/email/send";
import {
  buildContactNotificationEmail,
  buildContactReceiptEmail,
} from "@/lib/email/templates/contact-notification";
import { readTrimmedEnv } from "@/lib/env";
import type { ContactFormValues } from "@/schemas/contact";

export type SendContactEmailsInput = ContactFormValues & {
  submittedAt: Date;
  sourcePath: string;
};

export type FormEmailResult =
  | { sent: true }
  | { sent: false; reason: "not_configured" };

export async function sendContactEmails(
  input: SendContactEmailsInput,
): Promise<FormEmailResult> {
  const to = readTrimmedEnv("CONTACT_TO_EMAIL");
  if (!to) return { sent: false, reason: "not_configured" };

  const notification = await buildContactNotificationEmail(input);
  const notificationResult = await sendEmail({
    to,
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
    replyTo: input.email,
  });

  if (!notificationResult.sent) return notificationResult;

  const receipt = await buildContactReceiptEmail(input);
  await sendEmailQuietly({
    to: input.email,
    subject: receipt.subject,
    html: receipt.html,
    text: receipt.text,
  });

  return { sent: true };
}
