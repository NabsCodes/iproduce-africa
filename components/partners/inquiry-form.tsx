"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";

import { PublicFormSecurityFields } from "@/components/shared/public-form-security-fields";
import { FormSubmitButton } from "@/components/shared/form-submit-button";
import {
  ComboboxFormField,
  PhoneFormField,
  SelectFormField,
  TextareaFormField,
  TextFormField,
} from "@/components/shared/form-fields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { usePublicFormSubmit } from "@/hooks/use-public-form-submit";
import { asFormResolver } from "@/lib/forms/as-form-resolver";
import { withPublicFormSecurity } from "@/lib/forms/public-form-defaults";
import {
  countryComboboxCopy,
  countryComboboxGroups,
} from "@/content/countries";
import {
  partnerInquiryClientSchema,
  partnerInquiryDefaultValues,
  type PartnerInquiryValues,
} from "@/schemas/partners";
import type { PublicFormEnvelope } from "@/schemas/public-form";
import type { PartnerInquiryFormContent } from "@/types/partners";

type PartnerInquiryClientValues = PartnerInquiryValues & PublicFormEnvelope;

type InquiryFormProps = {
  content: PartnerInquiryFormContent;
};

export function InquiryForm({ content }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const otherValue = content.otherOptionValue;
  const {
    isSubmitting,
    submitError,
    turnstileResetNonce,
    bumpTurnstileReset,
    submit,
  } = usePublicFormSubmit("/api/partners/inquiry", {
    successToast: content.successTitle,
  });

  const form = useForm<PartnerInquiryClientValues>({
    resolver: asFormResolver<PartnerInquiryClientValues>(
      partnerInquiryClientSchema,
    ),
    defaultValues: withPublicFormSecurity(partnerInquiryDefaultValues),
    mode: "onBlur",
  });

  const watchedRole = useWatch({ control: form.control, name: "role" });
  const watchedSector = useWatch({ control: form.control, name: "sector" });
  const watchedAreaOfInterest = useWatch({
    control: form.control,
    name: "areaOfInterest",
  });

  async function onSubmit(values: PartnerInquiryClientValues) {
    const result = await submit(values);
    if (result.success) {
      setSubmitted(true);
    }
  }

  function handleSendAnother() {
    form.reset(withPublicFormSecurity(partnerInquiryDefaultValues));
    bumpTurnstileReset();
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border-default flex flex-col items-start gap-4 rounded-xl border bg-white p-7 sm:p-9"
      >
        <span className="bg-leaf-subtle text-leaf-700 flex size-12 items-center justify-center rounded-full">
          <CheckCircle2 className="size-6" aria-hidden />
        </span>
        <div className="flex flex-col gap-2">
          <h3 className="text-foreground font-serif text-xl font-semibold sm:text-2xl">
            {content.successTitle}
          </h3>
          <p className="text-fg-muted text-base leading-7">
            {content.successDescription}
          </p>
        </div>
        <Button
          type="button"
          variant="link"
          onClick={handleSendAnother}
          className="text-leaf-700 h-auto p-0 text-sm font-semibold"
        >
          {content.sendAnotherLabel}
        </Button>
      </div>
    );
  }

  return (
    <div className="border-default elevation-2 rounded-xl bg-white p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-foreground font-serif text-xl font-semibold sm:text-2xl">
          {content.title}
        </h3>
        <p className="text-fg-muted text-sm">{content.note}</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 flex flex-col gap-5 sm:mt-7"
          noValidate
        >
          <TextFormField
            control={form.control}
            name="fullName"
            placeholder={content.placeholders.fullName}
            autoComplete="name"
          />

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            <TextFormField
              control={form.control}
              name="organisation"
              placeholder={content.placeholders.organisation}
              autoComplete="organization"
            />
            <SelectFormField
              control={form.control}
              name="role"
              placeholder={content.placeholders.role}
              options={content.options.roles}
            />
          </div>

          {watchedRole === otherValue ? (
            <TextFormField
              control={form.control}
              name="roleOther"
              placeholder={content.placeholders.roleOther}
            />
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            <ComboboxFormField
              control={form.control}
              name="country"
              placeholder={content.placeholders.country}
              groups={countryComboboxGroups}
              searchPlaceholder={countryComboboxCopy.searchPlaceholder}
              emptyMessage={countryComboboxCopy.emptyMessage}
              emptyHint={countryComboboxCopy.emptyHint}
            />
            <SelectFormField
              control={form.control}
              name="sector"
              placeholder={content.placeholders.sector}
              options={content.options.sectors}
            />
          </div>

          {watchedSector === otherValue ? (
            <TextFormField
              control={form.control}
              name="sectorOther"
              placeholder={content.placeholders.sectorOther}
            />
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            <TextFormField
              control={form.control}
              name="email"
              type="email"
              placeholder={content.placeholders.email}
              autoComplete="email"
            />
            <PhoneFormField
              control={form.control}
              name="phone"
              placeholder={content.placeholders.phone}
            />
          </div>

          <SelectFormField
            control={form.control}
            name="areaOfInterest"
            placeholder={content.placeholders.areaOfInterest}
            options={content.options.areasOfInterest}
          />

          {watchedAreaOfInterest === otherValue ? (
            <TextFormField
              control={form.control}
              name="areaOfInterestOther"
              placeholder={content.placeholders.areaOfInterestOther}
            />
          ) : null}

          <TextareaFormField
            control={form.control}
            name="reason"
            placeholder={content.placeholders.reason}
          />

          <PublicFormSecurityFields
            control={form.control}
            turnstileTokenName="turnstileToken"
            resetNonce={turnstileResetNonce}
            onTurnstileRetry={bumpTurnstileReset}
          />

          {submitError ? (
            <p className="text-destructive text-sm" role="alert">
              {submitError}
            </p>
          ) : null}

          <FormSubmitButton
            isSubmitting={isSubmitting}
            label={content.submitLabel}
            showArrow
            variant="neutral"
            size="lg"
            className="bg-forest-900 hover:bg-forest-800 mt-2 h-12 w-full rounded-md text-base"
          />

          <p className="text-fg-subtle text-center text-xs leading-5">
            {content.consentText}
          </p>
        </form>
      </Form>
    </div>
  );
}
