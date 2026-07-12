import { readTrimmedEnv, sendEmail, sendEmailQuietly } from "@/lib/email/send";
import {
  buildBecomePartnerNotificationEmail,
  buildBecomePartnerReceiptEmail,
} from "@/lib/email/templates/become-partner-notification";
import {
  buildPartnerInquiryNotificationEmail,
  buildPartnerInquiryReceiptEmail,
} from "@/lib/email/templates/partner-inquiry-notification";
import type {
  BecomePartnerValues,
  PartnerInquiryValues,
} from "@/schemas/partners";

export type FormEmailResult =
  | { sent: true }
  | { sent: false; reason: "not_configured" };

async function sendDualEmails({
  toEnv,
  replyTo,
  notification,
  receiptTo,
  receipt,
}: {
  toEnv: string;
  replyTo: string;
  notification: { subject: string; html: string; text: string };
  receiptTo: string;
  receipt: { subject: string; html: string; text: string };
}): Promise<FormEmailResult> {
  const to = readTrimmedEnv(toEnv);
  if (!to) return { sent: false, reason: "not_configured" };

  const notificationResult = await sendEmail({
    to,
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
    replyTo,
  });

  if (!notificationResult.sent) return notificationResult;

  await sendEmailQuietly({
    to: receiptTo,
    subject: receipt.subject,
    html: receipt.html,
    text: receipt.text,
  });

  return { sent: true };
}

export async function sendPartnerInquiryEmails(
  input: PartnerInquiryValues & { submittedAt: Date; sourcePath: string },
): Promise<FormEmailResult> {
  const notification = await buildPartnerInquiryNotificationEmail(input);
  const receipt = await buildPartnerInquiryReceiptEmail(input);

  return sendDualEmails({
    toEnv: "PARTNERS_TO_EMAIL",
    replyTo: input.email,
    notification,
    receiptTo: input.email,
    receipt,
  });
}

export async function sendBecomePartnerEmails(
  input: BecomePartnerValues & { submittedAt: Date; sourcePath: string },
): Promise<FormEmailResult> {
  const notification = await buildBecomePartnerNotificationEmail(input);
  const receipt = await buildBecomePartnerReceiptEmail(input);

  return sendDualEmails({
    toEnv: "PARTNERS_TO_EMAIL",
    replyTo: input.email,
    notification,
    receiptTo: input.email,
    receipt,
  });
}
