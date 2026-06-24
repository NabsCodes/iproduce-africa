"use client";

import { useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { AcademyRegistrationTarget } from "@/components/academy/registration/academy-registration-provider";
import { PhoneFormField, TextFormField } from "@/components/shared/form-fields";
import { MultiStepDialogFooter } from "@/components/shared/multi-step-dialog/footer";
import { MultiStepDialogHeading } from "@/components/shared/multi-step-dialog/heading";
import { MultiStepDialogShell } from "@/components/shared/multi-step-dialog/shell";
import { Form } from "@/components/ui/form";
import { academyRegistrationContent } from "@/content/academy";
import { useDialogFormLifecycle } from "@/hooks/use-dialog-form-lifecycle";
import {
  academyRegistrationDefaultValues,
  academyRegistrationSchema,
  academyRegistrationSubmitSchema,
  type AcademyRegistrationValues,
} from "@/schemas/academy-registration";

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

  const form = useForm<AcademyRegistrationValues>({
    resolver: zodResolver(academyRegistrationSchema),
    defaultValues: academyRegistrationDefaultValues,
    mode: "onBlur",
  });

  const resetForm = useCallback(() => {
    form.reset(academyRegistrationDefaultValues);
  }, [form]);

  const { submitted, handleOpenChange, runSubmission } =
    useDialogFormLifecycle(resetForm);

  const watchedValues = useWatch({ control: form.control });
  const isValid = academyRegistrationSchema.safeParse(watchedValues).success;

  async function onSubmit(values: AcademyRegistrationValues) {
    if (!target) return;

    const payload = academyRegistrationSubmitSchema.parse({
      ...values,
      kind: target.kind,
      slug: target.slug,
    });

    // TODO(academy-registration): POST payload to API — resolve title server-side from kind + slug.
    void payload;

    await runSubmission(async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
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
            isSubmitting={form.formState.isSubmitting}
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
        </div>
      </MultiStepDialogShell>
    </Form>
  );
}
