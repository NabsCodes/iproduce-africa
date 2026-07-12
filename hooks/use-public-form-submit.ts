"use client";

import { useCallback, useRef, useState } from "react";

import {
  getTurnstileSiteKey,
  isTurnstileBypassedLocally,
  isTurnstileRequiredInProduction,
} from "@/components/shared/turnstile-widget";
import { reinforceFormSuccess } from "@/lib/forms/form-success-toast";
import {
  PUBLIC_FORM_VERIFICATION_ERROR,
  PUBLIC_FORM_VERIFICATION_UNAVAILABLE_ERROR,
  submitPublicForm,
} from "@/lib/forms/submit-public-form";

type UsePublicFormSubmitOptions = {
  successToast?: string;
};

type PublicFormSubmitResult =
  | { success: true }
  | { success: false; error: string };

export function usePublicFormSubmit(
  endpoint: string,
  options?: UsePublicFormSubmitOptions,
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileResetNonce, setTurnstileResetNonce] = useState(0);
  const inFlightSubmitRef = useRef<Promise<PublicFormSubmitResult> | null>(
    null,
  );

  const bumpTurnstileReset = useCallback(() => {
    setTurnstileResetNonce((value) => value + 1);
  }, []);

  const submit = useCallback(
    async (body: Record<string, unknown>) => {
      if (inFlightSubmitRef.current) {
        return inFlightSubmitRef.current;
      }

      const siteKey = getTurnstileSiteKey();
      const token =
        typeof body.turnstileToken === "string" ? body.turnstileToken : "";

      if (isTurnstileRequiredInProduction()) {
        setSubmitError(PUBLIC_FORM_VERIFICATION_UNAVAILABLE_ERROR);
        return {
          success: false as const,
          error: PUBLIC_FORM_VERIFICATION_UNAVAILABLE_ERROR,
        };
      }

      if (siteKey && !isTurnstileBypassedLocally() && !token) {
        setSubmitError(PUBLIC_FORM_VERIFICATION_ERROR);
        bumpTurnstileReset();
        return {
          success: false as const,
          error: PUBLIC_FORM_VERIFICATION_ERROR,
        };
      }

      const request = (async (): Promise<PublicFormSubmitResult> => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
          const result = await submitPublicForm(endpoint, body);

          if (!result.success) {
            setSubmitError(result.error);
            bumpTurnstileReset();
            return { success: false as const, error: result.error };
          }

          if (options?.successToast) {
            reinforceFormSuccess(options.successToast);
          }

          bumpTurnstileReset();
          return { success: true as const };
        } finally {
          setIsSubmitting(false);
          inFlightSubmitRef.current = null;
        }
      })();

      inFlightSubmitRef.current = request;
      return request;
    },
    [bumpTurnstileReset, endpoint, options],
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
