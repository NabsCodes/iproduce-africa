import { Resend } from "resend";

import { readTrimmedEnv } from "@/lib/env";

export type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  from?: string;
};

export type SendEmailResult =
  | { sent: true }
  | { sent: false; reason: "not_configured" };

function resolveFrom(override?: string): string | undefined {
  if (override) {
    const trimmed = override.trim();
    if (trimmed.length > 0) return trimmed;
  }

  return readTrimmedEnv("EMAIL_FROM");
}

export function isEmailDeliveryConfigured(): boolean {
  return Boolean(readTrimmedEnv("RESEND_API_KEY") && resolveFrom());
}

export async function sendEmail(
  input: SendEmailInput,
): Promise<SendEmailResult> {
  const apiKey = readTrimmedEnv("RESEND_API_KEY");
  const from = resolveFrom(input.from);

  if (!apiKey || !from) {
    return { sent: false, reason: "not_configured" };
  }

  const resend = new Resend(apiKey);
  const response = await resend.emails.send({
    from,
    to: [input.to],
    subject: input.subject,
    html: input.html,
    ...(input.text !== undefined ? { text: input.text } : {}),
    ...(input.replyTo !== undefined ? { replyTo: input.replyTo } : {}),
  });

  if (response.error) {
    const status = response.error.statusCode ?? "unknown";
    const body = response.error.message.trim();
    const snippet = body.length > 500 ? `${body.slice(0, 500)}…` : body;
    throw new Error(
      `Email delivery failed (status ${status}): ${snippet || "<no response body>"}`,
    );
  }

  return { sent: true };
}

export async function sendEmailQuietly(input: SendEmailInput): Promise<void> {
  try {
    await sendEmail(input);
  } catch (error) {
    console.error(
      `Receipt email to ${input.to} failed (admin notification already sent):`,
      error,
    );
  }
}
