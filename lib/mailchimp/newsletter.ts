import "server-only";

import { createHash } from "node:crypto";

import { readTrimmedEnv } from "@/lib/env";

const MAILCHIMP_REQUEST_TIMEOUT_MS = 8_000;
const WEBSITE_NEWSLETTER_TAG = "Website newsletter";

type MailchimpConfig = {
  apiKey: string;
  serverPrefix: string;
  audienceId: string;
};

type MailchimpMember = {
  status: string;
};

type MailchimpNewsletterDependencies = {
  config?: MailchimpConfig;
  fetch?: typeof fetch;
  logger?: Pick<Console, "error">;
  timeoutMs?: number;
};

export type MailchimpNewsletterResult = {
  memberStatus: string;
  tagApplied: boolean;
};

class MailchimpNewsletterError extends Error {
  constructor(operation: string, status?: number) {
    super(
      status
        ? `mailchimp_${operation}_failed_status_${status}`
        : `mailchimp_${operation}_failed`,
    );
    this.name = "MailchimpNewsletterError";
  }
}

export function normalizeMailchimpEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function createMailchimpSubscriberHash(email: string): string {
  return createHash("md5").update(normalizeMailchimpEmail(email)).digest("hex");
}

export function resolveMailchimpConfig(
  values: Partial<MailchimpConfig> = {},
): MailchimpConfig {
  const apiKey = values.apiKey?.trim() || readTrimmedEnv("MAILCHIMP_API_KEY");
  const serverPrefix =
    values.serverPrefix?.trim().toLowerCase() ||
    readTrimmedEnv("MAILCHIMP_SERVER_PREFIX")?.toLowerCase();
  const audienceId =
    values.audienceId?.trim() || readTrimmedEnv("MAILCHIMP_AUDIENCE_ID");

  if (!apiKey || !serverPrefix || !audienceId) {
    throw new MailchimpNewsletterError("configuration");
  }

  if (!/^us\d+$/.test(serverPrefix)) {
    throw new MailchimpNewsletterError("server_prefix");
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(audienceId)) {
    throw new MailchimpNewsletterError("audience_id");
  }

  return { apiKey, serverPrefix, audienceId };
}

function isRetryableStatus(status: number): boolean {
  return status === 408 || status === 429 || status >= 500;
}

async function mailchimpRequest({
  config,
  fetchImpl,
  operation,
  path,
  init,
  timeoutMs,
  allowNotFound = false,
  expectJson = false,
  retryOnce = false,
}: {
  config: MailchimpConfig;
  fetchImpl: typeof fetch;
  operation: string;
  path: string;
  init?: RequestInit;
  timeoutMs: number;
  allowNotFound?: boolean;
  expectJson?: boolean;
  retryOnce?: boolean;
}): Promise<{ found: boolean; body?: unknown }> {
  const maximumAttempts = retryOnce ? 2 : 1;

  for (let attempt = 1; attempt <= maximumAttempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetchImpl(
        `https://${config.serverPrefix}.api.mailchimp.com/3.0${path}`,
        {
          ...init,
          headers: {
            Authorization: `Basic ${Buffer.from(`iproduce-africa:${config.apiKey}`).toString("base64")}`,
            "Content-Type": "application/json",
            ...init?.headers,
          },
          signal: controller.signal,
        },
      );

      if (allowNotFound && response.status === 404) {
        return { found: false };
      }

      if (!response.ok) {
        if (attempt < maximumAttempts && isRetryableStatus(response.status)) {
          continue;
        }

        throw new MailchimpNewsletterError(operation, response.status);
      }

      if (!expectJson) {
        return { found: true };
      }

      const bodyText = await response.text();
      if (!bodyText) {
        throw new MailchimpNewsletterError(`${operation}_response`);
      }

      try {
        return { found: true, body: JSON.parse(bodyText) as unknown };
      } catch {
        throw new MailchimpNewsletterError(`${operation}_response`);
      }
    } catch (error) {
      if (error instanceof MailchimpNewsletterError) {
        throw error;
      }

      if (attempt >= maximumAttempts) {
        throw new MailchimpNewsletterError(operation);
      }
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new MailchimpNewsletterError(operation);
}

function parseMember(body: unknown): MailchimpMember {
  if (
    !body ||
    typeof body !== "object" ||
    !("status" in body) ||
    typeof body.status !== "string" ||
    body.status.length === 0
  ) {
    throw new MailchimpNewsletterError("member_response");
  }

  return { status: body.status };
}

async function applyWebsiteNewsletterTag({
  config,
  fetchImpl,
  subscriberHash,
  timeoutMs,
}: {
  config: MailchimpConfig;
  fetchImpl: typeof fetch;
  subscriberHash: string;
  timeoutMs: number;
}): Promise<void> {
  await mailchimpRequest({
    config,
    fetchImpl,
    operation: "tag_member",
    path: `/lists/${config.audienceId}/members/${subscriberHash}/tags`,
    init: {
      method: "POST",
      body: JSON.stringify({
        tags: [{ name: WEBSITE_NEWSLETTER_TAG, status: "active" }],
      }),
    },
    timeoutMs,
    retryOnce: true,
  });
}

export async function subscribeNewsletterEmail(
  email: string,
  dependencies: MailchimpNewsletterDependencies = {},
): Promise<MailchimpNewsletterResult> {
  const config = dependencies.config ?? resolveMailchimpConfig();
  const fetchImpl = dependencies.fetch ?? globalThis.fetch;
  const logger = dependencies.logger ?? console;
  const timeoutMs = dependencies.timeoutMs ?? MAILCHIMP_REQUEST_TIMEOUT_MS;
  const normalizedEmail = normalizeMailchimpEmail(email);
  const subscriberHash = createMailchimpSubscriberHash(normalizedEmail);
  const memberPath = `/lists/${config.audienceId}/members/${subscriberHash}`;

  const lookup = await mailchimpRequest({
    config,
    fetchImpl,
    operation: "get_member",
    path: memberPath,
    timeoutMs,
    allowNotFound: true,
    expectJson: true,
  });

  let memberStatus: string;

  if (!lookup.found) {
    const created = await mailchimpRequest({
      config,
      fetchImpl,
      operation: "create_member",
      path: memberPath,
      init: {
        method: "PUT",
        body: JSON.stringify({
          email_address: normalizedEmail,
          status_if_new: "pending",
        }),
      },
      timeoutMs,
      expectJson: true,
    });

    memberStatus = parseMember(created.body).status;
  } else {
    memberStatus = parseMember(lookup.body).status;
    // Preserve every existing consent state. In particular, Mailchimp requires
    // self-unsubscribed contacts to rejoin through its hosted signup form; the
    // public success UI offers that route without exposing the member's status.
  }

  if (memberStatus === "cleaned") {
    logger.error(
      "Mailchimp newsletter submission needs manual review because the contact is marked as cleaned.",
    );
    return { memberStatus, tagApplied: false };
  }

  try {
    await applyWebsiteNewsletterTag({
      config,
      fetchImpl,
      subscriberHash,
      timeoutMs,
    });
    return { memberStatus, tagApplied: true };
  } catch (error) {
    logger.error(
      "Mailchimp newsletter tag assignment failed; manual repair may be required.",
      error,
    );
    return { memberStatus, tagApplied: false };
  }
}
