"use client";

import { useCallback, useState } from "react";

import {
  PUBLIC_FORM_VERIFICATION_ERROR,
  submitPublicForm,
} from "@/lib/forms/submit-public-form";
import {
  getTurnstileSiteKey,
  isTurnstileBypassedLocally,
} from "@/components/shared/turnstile-widget";

export function usePublicFormSubmit(endpoint: string) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileResetNonce, setTurnstileResetNonce] = useState(0);

  const bumpTurnstileReset = useCallback(() => {
    setTurnstileResetNonce((value) => value + 1);
  }, []);

  const submit = useCallback(
    async (body: Record<string, unknown>) => {
      const siteKey = getTurnstileSiteKey();
      const token =
        typeof body.turnstileToken === "string" ? body.turnstileToken : "";

      if (siteKey && !isTurnstileBypassedLocally() && !token) {
        setSubmitError(PUBLIC_FORM_VERIFICATION_ERROR);
        bumpTurnstileReset();
        return {
          success: false as const,
          error: PUBLIC_FORM_VERIFICATION_ERROR,
        };
      }

      setIsSubmitting(true);
      setSubmitError(null);

      const result = await submitPublicForm(endpoint, body);

      setIsSubmitting(false);

      if (!result.success) {
        setSubmitError(result.error);
        bumpTurnstileReset();
        return { success: false as const, error: result.error };
      }

      bumpTurnstileReset();
      return { success: true as const };
    },
    [bumpTurnstileReset, endpoint],
  );

  return {
    isSubmitting,
    submitError,
    turnstileResetNonce,
    bumpTurnstileReset,
    submit,
    clearSubmitError: () => setSubmitError(null),
  };
}
