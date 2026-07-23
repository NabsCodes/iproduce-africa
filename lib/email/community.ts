import { sendEmail, sendEmailQuietly } from "@/lib/email/send";
import {
  buildCommunityApplicationNotificationEmail,
  buildCommunityApplicationReceiptEmail,
  type CommunityApplicationEmailInput,
} from "@/lib/email/templates/community-application-notification";
import { readTrimmedEnv } from "@/lib/env";

export type FormEmailResult =
  | { sent: true }
  | { sent: false; reason: "not_configured" };

export async function sendCommunityApplicationEmails(
  input: CommunityApplicationEmailInput,
): Promise<FormEmailResult> {
  const to = readTrimmedEnv("COMMUNITY_TO_EMAIL");
  if (!to) return { sent: false, reason: "not_configured" };

  const notification = await buildCommunityApplicationNotificationEmail(input);
  const notificationResult = await sendEmail({
    to,
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
    replyTo: input.email,
  });

  if (!notificationResult.sent) return notificationResult;

  const receipt = await buildCommunityApplicationReceiptEmail(input);
  await sendEmailQuietly({
    to: input.email,
    subject: receipt.subject,
    html: receipt.html,
    text: receipt.text,
  });

  return { sent: true };
}
