import { siteConfig } from "@/content/site";

export const PUBLIC_FORM_VALIDATION_ERROR =
  "Please review your details and try again.";

export const PUBLIC_FORM_VERIFICATION_ERROR =
  "Please complete the verification step and try again.";

export const PUBLIC_FORM_DELIVERY_ERROR = `We couldn't send your message right now. Please try again or email us at ${siteConfig.email}.`;

export const PUBLIC_FORM_RATE_LIMIT_ERROR =
  "Too many submissions from this connection. Please wait a few minutes and try again.";

export type SubmitPublicFormResult =
  | { success: true }
  | { success: false; error: string; status: number };

export async function submitPublicForm(
  endpoint: string,
  body: Record<string, unknown>,
): Promise<SubmitPublicFormResult> {
  let response: Response;

  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return {
      success: false,
      error: PUBLIC_FORM_DELIVERY_ERROR,
      status: 0,
    };
  }

  const payload = (await response.json().catch(() => null)) as {
    success?: boolean;
    error?: string;
  } | null;

  if (response.ok && payload?.success) {
    return { success: true };
  }

  if (response.status === 429) {
    return {
      success: false,
      error:
        typeof payload?.error === "string" && payload.error.length > 0
          ? payload.error
          : PUBLIC_FORM_RATE_LIMIT_ERROR,
      status: 429,
    };
  }

  const error =
    typeof payload?.error === "string" && payload.error.length > 0
      ? payload.error
      : response.status === 400
        ? PUBLIC_FORM_VALIDATION_ERROR
        : PUBLIC_FORM_DELIVERY_ERROR;

  return {
    success: false,
    error,
    status: response.status,
  };
}
