import { NextResponse } from "next/server";
import type { z } from "zod";

import { isEmailDeliveryConfigured, readTrimmedEnv } from "@/lib/email/send";
import {
  PUBLIC_FORM_DELIVERY_ERROR,
  PUBLIC_FORM_VALIDATION_ERROR,
  PUBLIC_FORM_VERIFICATION_ERROR,
} from "@/lib/forms/submit-public-form";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { PUBLIC_FORM_HONEYPOT_FIELD } from "@/schemas/public-form";

export function getClientIp(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  return request.headers.get("x-real-ip")?.trim() || undefined;
}

type HandlePublicFormPostOptions<T extends z.ZodTypeAny> = {
  request: Request;
  schema: T;
  toEmailEnv: string;
  handler: (data: z.infer<T>) => Promise<void>;
};

export async function handlePublicFormPost<T extends z.ZodTypeAny>({
  request,
  schema,
  toEmailEnv,
  handler,
}: HandlePublicFormPostOptions<T>) {
  try {
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
      ip: getClientIp(request),
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
