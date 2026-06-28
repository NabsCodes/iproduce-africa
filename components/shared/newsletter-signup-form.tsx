"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Send } from "lucide-react";

import { PublicFormSecurityFields } from "@/components/shared/public-form-security-fields";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePublicFormSubmit } from "@/hooks/use-public-form-submit";
import { asFormResolver } from "@/lib/forms/as-form-resolver";
import { withPublicFormSecurity } from "@/lib/forms/public-form-defaults";
import { cn } from "@/lib/utils";
import {
  newsletterClientSchema,
  newsletterDefaultValues,
  type NewsletterValues,
} from "@/schemas/newsletter";
import type { PublicFormEnvelope } from "@/schemas/public-form";

type NewsletterClientValues = NewsletterValues & PublicFormEnvelope;

export type NewsletterSignupCopy = {
  inputId: string;
  inputLabel: string;
  placeholder: string;
  submitLabel: string;
  successMessage: string;
  formAriaLabel?: string;
};

type NewsletterSignupFormProps = {
  copy: NewsletterSignupCopy;
  variant?: "footer" | "compact";
  sourcePath?: string;
  className?: string;
};

export function NewsletterSignupForm({
  copy,
  variant = "footer",
  sourcePath = "/",
  className,
}: NewsletterSignupFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const { isSubmitting, submitError, turnstileResetNonce, submit } =
    usePublicFormSubmit("/api/newsletter");

  const form = useForm<NewsletterClientValues>({
    resolver: asFormResolver<NewsletterClientValues>(newsletterClientSchema),
    defaultValues: withPublicFormSecurity(newsletterDefaultValues),
    mode: "onBlur",
  });

  async function onSubmit(values: NewsletterClientValues) {
    const result = await submit({
      ...values,
      sourcePath,
    });

    if (result.success) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <p
        role="status"
        aria-live="polite"
        className={cn(
          "text-fg-muted text-sm leading-6",
          variant === "footer" ? "mt-6" : "mt-5",
          className,
        )}
      >
        {copy.successMessage}
      </p>
    );
  }

  const isCompact = variant === "compact";

  return (
    <Form {...form}>
      <form
        className={cn(isCompact ? "mt-5" : "mt-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        aria-label={copy.formAriaLabel}
      >
        <Field
          orientation="horizontal"
          className={cn(
            "items-start gap-2",
            isCompact ? "gap-2" : "items-center gap-2.5",
            "*:data-[slot=field-label]:sr-only",
          )}
        >
          <FieldLabel htmlFor={copy.inputId}>{copy.inputLabel}</FieldLabel>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="min-w-0 flex-1 gap-1">
                <FormControl>
                  <Input
                    {...field}
                    id={copy.inputId}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    autoCapitalize="off"
                    spellCheck={false}
                    placeholder={copy.placeholder}
                    className={cn(
                      isCompact
                        ? "min-w-0 flex-1 bg-white"
                        : "text-grey-900 placeholder:text-grey-400 focus-visible:ring-tangerine-300/50 h-14 min-w-0 flex-1 border-0 bg-white px-5 text-[15px] focus-visible:border-0 focus-visible:ring-2 md:text-[15px]",
                    )}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="tangerine"
            size={isCompact ? "icon-sm" : undefined}
            disabled={isSubmitting}
            aria-label={copy.submitLabel}
            title={copy.submitLabel}
            className={cn(
              !isCompact &&
                "hover:shadow-tangerine-500/25 active:bg-tangerine-600 size-14 shrink-0 p-0 transition-all",
            )}
          >
            <Send className={isCompact ? "size-4" : "size-5"} aria-hidden />
          </Button>
        </Field>

        <PublicFormSecurityFields
          control={form.control}
          turnstileTokenName="turnstileToken"
          resetNonce={turnstileResetNonce}
          turnstileSize={isCompact ? "compact" : "normal"}
          className="mt-4"
        />

        {submitError ? (
          <p className="text-destructive mt-2 text-xs" role="alert">
            {submitError}
          </p>
        ) : null}
      </form>
    </Form>
  );
}
