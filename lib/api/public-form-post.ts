import { NextResponse } from "next/server";
import type { z } from "zod";

import { isEmailDeliveryConfigured, readTrimmedEnv } from "@/lib/email/send";
import {
  PUBLIC_FORM_DELIVERY_ERROR,
  PUBLIC_FORM_RATE_LIMIT_ERROR,
  PUBLIC_FORM_VALIDATION_ERROR,
  PUBLIC_FORM_VERIFICATION_ERROR,
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

      return NextResponse.json(
        {
          error: isConfigIssue
            ? PUBLIC_FORM_DELIVERY_ERROR
            : PUBLIC_FORM_VERIFICATION_ERROR,
        },
        { status: isConfigIssue ? 503 : 400 },
      );
    }

    if (!isEmailDeliveryConfigured() || !readTrimmedEnv(toEmailEnv)) {
      return NextResponse.json(
        { error: PUBLIC_FORM_DELIVERY_ERROR },
        { status: 503 },
      );
    }

    await handler(parsed.data);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "session_not_found") {
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
