"use client";

import { useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";

import type { AcademyRegistrationTarget } from "@/components/academy/registration/academy-registration-provider";
import { PhoneFormField, TextFormField } from "@/components/shared/form-fields";
import { MultiStepDialogFooter } from "@/components/shared/multi-step-dialog/footer";
import { MultiStepDialogHeading } from "@/components/shared/multi-step-dialog/heading";
import { MultiStepDialogShell } from "@/components/shared/multi-step-dialog/shell";
import { PublicFormSecurityFields } from "@/components/shared/public-form-security-fields";
import { Form } from "@/components/ui/form";
import { academyRegistrationContent } from "@/content/academy";
import { useDialogFormLifecycle } from "@/hooks/use-dialog-form-lifecycle";
import { usePublicFormSubmit } from "@/hooks/use-public-form-submit";
import { asFormResolver } from "@/lib/forms/as-form-resolver";
import { withPublicFormSecurity } from "@/lib/forms/public-form-defaults";
import {
  academyRegistrationClientSchema,
  academyRegistrationDefaultValues,
  academyRegistrationSchema,
  type AcademyRegistrationValues,
} from "@/schemas/academy-registration";
import type { PublicFormEnvelope } from "@/schemas/public-form";

type AcademyRegistrationClientValues = AcademyRegistrationValues &
  PublicFormEnvelope;

type AcademyRegistrationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  target: AcademyRegistrationTarget | null;
};

export function AcademyRegistrationDialog({
  open,
  onOpenChange,
  target,
}: AcademyRegistrationDialogProps) {
  const copy = target ? academyRegistrationContent.dialog[target.kind] : null;
  const { isSubmitting, submitError, turnstileResetNonce, submit } =
    usePublicFormSubmit("/api/academy/register", {
      successToast: copy?.successTitle,
    });

  const form = useForm<AcademyRegistrationClientValues>({
    resolver: asFormResolver<AcademyRegistrationClientValues>(
      academyRegistrationClientSchema,
    ),
    defaultValues: withPublicFormSecurity(academyRegistrationDefaultValues),
    mode: "onBlur",
  });

  const resetForm = useCallback(() => {
    form.reset(withPublicFormSecurity(academyRegistrationDefaultValues));
  }, [form]);

  const { submitted, handleOpenChange, runSubmission } =
    useDialogFormLifecycle(resetForm);

  const watchedValues = useWatch({ control: form.control });
  const isValid = academyRegistrationSchema.safeParse(watchedValues).success;

  async function onSubmit(values: AcademyRegistrationClientValues) {
    if (!target || !copy) return;

    await runSubmission(async () => {
      const result = await submit({
        ...values,
        kind: target.kind,
        slug: target.slug,
      });

      if (!result.success) {
        form.setError("root", {
          message: result.error ?? "Something went wrong. Please try again.",
        });
        throw new Error("submission_failed");
      }
    });
  }

  function handleConfirmSubmit() {
    void form.handleSubmit(onSubmit)();
  }

  if (!target || !copy) return null;

  return (
    <Form {...form}>
      <MultiStepDialogShell
        open={open}
        onOpenChange={(nextOpen) => handleOpenChange(nextOpen, onOpenChange)}
        title={copy.title}
        description={copy.description}
        steps={[]}
        stepIndex={0}
        submitted={submitted}
        success={{
          title: copy.successTitle,
          description: copy.successDescription,
          doneLabel: copy.successDoneLabel,
        }}
        onSuccessDone={() => handleOpenChange(false, onOpenChange)}
        formProps={{
          onSubmit: (event) => event.preventDefault(),
          noValidate: true,
        }}
        footer={
          <MultiStepDialogFooter
            singleStep
            stepIndex={0}
            totalSteps={1}
            isLastStep
            isStepValid={isValid}
            isSubmitting={isSubmitting}
            backLabel="Back"
            continueLabel="Continue"
            submitLabel={copy.submitLabel}
            onBack={() => {}}
            onNext={() => {}}
            onSubmit={handleConfirmSubmit}
          />
        }
      >
        <MultiStepDialogHeading
          title={target.title}
          description={copy.description}
        />

        <div className="mt-6 flex flex-col gap-4 sm:gap-5">
          <TextFormField
            control={form.control}
            name="fullName"
            placeholder={copy.fields.fullName}
            autoComplete="name"
          />
          <TextFormField
            control={form.control}
            name="email"
            placeholder={copy.fields.email}
            type="email"
            autoComplete="email"
          />
          <PhoneFormField
            control={form.control}
            name="phone"
            placeholder={copy.fields.phone}
          />
          <TextFormField
            control={form.control}
            name="organisation"
            placeholder={copy.fields.organisation}
            autoComplete="organization"
          />

          <PublicFormSecurityFields
            control={form.control}
            resetNonce={turnstileResetNonce}
            turnstileSize="compact"
          />

          {submitError || form.formState.errors.root ? (
            <p className="text-destructive text-sm" role="alert">
              {submitError ?? form.formState.errors.root?.message}
            </p>
          ) : null}
        </div>
      </MultiStepDialogShell>
    </Form>
  );
}
