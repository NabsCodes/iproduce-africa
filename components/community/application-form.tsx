"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import {
  ComboboxFormField,
  PhoneFormField,
  SelectFormField,
  TextareaFormField,
  TextFormField,
} from "@/components/shared/form-fields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  countryComboboxCopy,
  countryComboboxGroups,
} from "@/content/countries";
import {
  membershipApplicationDefaultValues,
  membershipApplicationSchema,
  type MembershipApplicationValues,
} from "@/schemas/community";
import type { MembershipApplicationFormContent } from "@/types/community";

type MembershipApplicationFormProps = {
  content: MembershipApplicationFormContent;
};

export function MembershipApplicationForm({
  content,
}: MembershipApplicationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const otherValue = content.otherOptionValue;

  const form = useForm<MembershipApplicationValues>({
    resolver: zodResolver(membershipApplicationSchema),
    defaultValues: membershipApplicationDefaultValues,
    mode: "onBlur",
  });

  const watchedRole = useWatch({ control: form.control, name: "role" });
  const watchedSector = useWatch({ control: form.control, name: "sector" });

  async function onSubmit(_values: MembershipApplicationValues) {
    // TODO(member-application): wire to real submission endpoint.
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
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

          <TextareaFormField
            control={form.control}
            name="reason"
            placeholder={content.placeholders.reason}
          />

          <Button
            type="submit"
            variant="green"
            size="lg"
            fullWidth
            disabled={form.formState.isSubmitting}
            className="mt-2"
          >
            {form.formState.isSubmitting
              ? "Submitting..."
              : content.submitLabel}
            <ArrowRight className="size-4" />
          </Button>

          <p className="text-fg-subtle text-center text-xs leading-5">
            {content.consentText}
          </p>
        </form>
      </Form>
    </div>
  );
}
