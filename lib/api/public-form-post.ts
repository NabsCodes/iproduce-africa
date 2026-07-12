import { NextResponse } from "next/server";
import type { z } from "zod";

import { readTrimmedEnv } from "@/lib/email/send";
import {
  PUBLIC_FORM_DELIVERY_ERROR,
  PUBLIC_FORM_RATE_LIMIT_ERROR,
  PUBLIC_FORM_VALIDATION_ERROR,
  PUBLIC_FORM_VERIFICATION_ERROR,
  PUBLIC_FORM_VERIFICATION_UNAVAILABLE_ERROR,
} from "@/lib/forms/submit-public-form";
import {
  checkPublicFormRateLimit,
  getClientIp,
  type PublicFormRateLimitRoute,
} from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { PUBLIC_FORM_HONEYPOT_FIELD } from "@/schemas/public-form";

type HandlePublicFormPostOptions<T extends z.ZodTypeAny> = {
  request: Request;
  schema: T;
  toEmailEnv: string;
  rateLimitRoute: PublicFormRateLimitRoute;
  handler: (data: z.infer<T>) => Promise<void>;
};

function logPublicFormConfigIssue(message: string) {
  console.error(`Public form configuration issue: ${message}`);
}

/**
 * Internal `Error` messages a route handler can throw to get the same
 * client-facing validation response (`PUBLIC_FORM_VALIDATION_ERROR`, 400) —
 * distinct messages stay useful in server logs without inventing new
 * client-visible error strings for each one.
 */
const VALIDATION_ERROR_MESSAGES = new Set([
  "session_not_found",
  "registration_closed",
  "registration_external",
]);

export async function handlePublicFormPost<T extends z.ZodTypeAny>({
  request,
  schema,
  toEmailEnv,
  rateLimitRoute,
  handler,
}: HandlePublicFormPostOptions<T>) {
  try {
    const rateLimitResult = await checkPublicFormRateLimit(
      rateLimitRoute,
      request,
    );

    if ("misconfigured" in rateLimitResult) {
      logPublicFormConfigIssue(
        "UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are required when VERCEL_ENV=production.",
      );

      return NextResponse.json(
        { error: PUBLIC_FORM_DELIVERY_ERROR },
        { status: 503 },
      );
    }

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: PUBLIC_FORM_RATE_LIMIT_ERROR },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimitResult.retryAfterSeconds),
          },
        },
      );
    }

    const body = await request.json().catch(() => null);

    if (
      body &&
      typeof body === "object" &&
      PUBLIC_FORM_HONEYPOT_FIELD in body
    ) {
      const honeypot = String(
        (body as Record<string, unknown>)[PUBLIC_FORM_HONEYPOT_FIELD] ?? "",
      ).trim();
      if (honeypot.length > 0) {
        return NextResponse.json({ success: true });
      }
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: PUBLIC_FORM_VALIDATION_ERROR },
        { status: 400 },
      );
    }

    const data = parsed.data as z.infer<T> & {
      turnstileToken?: string;
    };

    const verification = await verifyTurnstileToken({
      token: data.turnstileToken ?? "",
      ip: getClientIp(request) ?? undefined,
    });

    if (!verification.success) {
      const isConfigIssue = verification.reason === "not_configured";
      const isServiceUnavailable =
        isConfigIssue || verification.reason === "verification_failed";

      if (isConfigIssue) {
        logPublicFormConfigIssue(
          "NEXT_PUBLIC_TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY must both be set outside local development.",
        );
      }

      if (verification.reason === "verification_failed") {
        console.error("Turnstile verification service is unavailable.");
      }

      return NextResponse.json(
        {
          error: isServiceUnavailable
            ? PUBLIC_FORM_VERIFICATION_UNAVAILABLE_ERROR
            : PUBLIC_FORM_VERIFICATION_ERROR,
        },
        { status: isServiceUnavailable ? 503 : 400 },
      );
    }

    const missingEmailEnv = [
      readTrimmedEnv("RESEND_API_KEY") ? null : "RESEND_API_KEY",
      readTrimmedEnv("EMAIL_FROM") ? null : "EMAIL_FROM",
      readTrimmedEnv(toEmailEnv) ? null : toEmailEnv,
    ].filter((name): name is string => Boolean(name));

    if (missingEmailEnv.length > 0) {
      logPublicFormConfigIssue(
        `Missing email environment variable(s): ${missingEmailEnv.join(", ")}.`,
      );

      return NextResponse.json(
        { error: PUBLIC_FORM_DELIVERY_ERROR },
        { status: 503 },
      );
    }

    await handler(parsed.data);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (
      error instanceof Error &&
      VALIDATION_ERROR_MESSAGES.has(error.message)
    ) {
      return NextResponse.json(
        { error: PUBLIC_FORM_VALIDATION_ERROR },
        { status: 400 },
      );
    }

    console.error("Public form submission failed:", error);
    return NextResponse.json(
      { error: PUBLIC_FORM_DELIVERY_ERROR },
      { status: 500 },
    );
  }
}
