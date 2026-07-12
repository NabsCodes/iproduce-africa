"use client";

import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { useForm, useFormContext, useWatch } from "react-hook-form";

import { MembershipApplicationReviewStep } from "@/components/community/membership-application-review-step";
import {
  ComboboxFormField,
  PhoneFormField,
  SelectFormField,
  TextareaFormField,
  TextFormField,
} from "@/components/shared/form-fields";
import { MultiStepDialogFooter } from "@/components/shared/multi-step-dialog/footer";
import { MultiStepDialogHeading } from "@/components/shared/multi-step-dialog/heading";
import { MultiStepDialogShell } from "@/components/shared/multi-step-dialog/shell";
import type { MultiStepDialogStep } from "@/components/shared/multi-step-dialog/stepper";
import { PublicFormSecurityFields } from "@/components/shared/public-form-security-fields";
import { Form } from "@/components/ui/form";
import { communityPageContent } from "@/content/community";
import {
  countryComboboxCopy,
  countryComboboxGroups,
} from "@/content/countries";
import { usePublicFormSubmit } from "@/hooks/use-public-form-submit";
import { asFormResolver } from "@/lib/forms/as-form-resolver";
import { withPublicFormSecurity } from "@/lib/forms/public-form-defaults";
import {
  communityDialogApplicationClientSchema,
  membershipApplicationDialogDefaultValues,
  membershipApplicationDialogSchema,
  membershipApplicationDialogStepFields,
  membershipApplicationDialogStepKeys,
  membershipApplicationDialogStepSchemas,
  type MembershipApplicationDialogValues,
} from "@/schemas/community";
import type { PublicFormEnvelope } from "@/schemas/public-form";

type CommunityDialogClientValues = MembershipApplicationDialogValues &
  PublicFormEnvelope & { source: "dialog" };

const reviewStepIndex = membershipApplicationDialogStepKeys.length - 1;

type MembershipApplicationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MembershipApplicationDialog({
  open,
  onOpenChange,
}: MembershipApplicationDialogProps) {
  const application = communityPageContent.application;
  const content = application.dialog;
  const sectors = application.form.options.sectors;

  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [successDescription, setSuccessDescription] = useState("");
  const stepIndexRef = useRef(stepIndex);
  const {
    isSubmitting,
    submitError,
    turnstileResetNonce,
    bumpTurnstileReset,
    submit,
  } = usePublicFormSubmit("/api/community/application", {
    successToast: content.success.title,
  });

  useEffect(() => {
    stepIndexRef.current = stepIndex;
  }, [stepIndex]);

  const form = useForm<CommunityDialogClientValues>({
    resolver: asFormResolver<CommunityDialogClientValues>(
      communityDialogApplicationClientSchema,
    ),
    mode: "onBlur",
    defaultValues: withPublicFormSecurity({
      ...membershipApplicationDialogDefaultValues,
      source: "dialog" as const,
    }),
  });

  const currentStep = membershipApplicationDialogStepKeys[stepIndex];
  const currentStepContent = content.steps[currentStep];
  const isLastStep = stepIndex === reviewStepIndex;
  const watchedValues = useWatch({ control: form.control });
  const isStepValid =
    currentStep === "review"
      ? membershipApplicationDialogSchema.safeParse(watchedValues).success
      : membershipApplicationDialogStepSchemas[currentStep].safeParse(
          watchedValues,
        ).success;

  const steps: MultiStepDialogStep[] = membershipApplicationDialogStepKeys.map(
    (key) => ({
      id: key,
      label: content.steps[key].label,
    }),
  );

  function reset() {
    setStepIndex(0);
    setSubmitted(false);
    setSuccessDescription("");
    form.reset(
      withPublicFormSecurity({
        ...membershipApplicationDialogDefaultValues,
        source: "dialog" as const,
      }),
    );
  }

  function handleOpenChange(next: boolean) {
    onOpenChange(next);
    // Preserve a half-filled application when closed manually; only clear it
    // once the visitor has actually submitted.
    if (!next && submitted) {
      window.setTimeout(reset, 200);
    }
  }

  async function handleNext() {
    if (stepIndexRef.current === reviewStepIndex) return;

    const step = membershipApplicationDialogStepKeys[stepIndexRef.current];
    const valid = await form.trigger(
      membershipApplicationDialogStepFields[step],
    );
    if (valid) {
      setStepIndex((index) => Math.min(index + 1, reviewStepIndex));
    }
  }

  function handleBack() {
    setStepIndex((index) => Math.max(index - 1, 0));
  }

  async function onSubmit(values: CommunityDialogClientValues) {
    if (stepIndexRef.current !== reviewStepIndex) return;

    const result = await submit({ ...values, source: "dialog" });
    if (!result.success) {
      form.setError("root", {
        message: result.error ?? "Something went wrong. Please try again.",
      });
      return;
    }

    const firstName = values.fullName.trim().split(/\s+/)[0] ?? "there";
    setSuccessDescription(
      content.success.descriptionTemplate.replace("{firstName}", firstName),
    );
    setSubmitted(true);
  }

  function handleConfirmSubmit() {
    if (stepIndexRef.current !== reviewStepIndex) return;
    void form.handleSubmit(onSubmit)();
  }

  function handleFormKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key !== "Enter") return;

    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.tagName === "TEXTAREA") return;

    event.preventDefault();

    if (stepIndexRef.current === reviewStepIndex) {
      handleConfirmSubmit();
      return;
    }

    void handleNext();
  }

  return (
    <Form {...form}>
      <MultiStepDialogShell
        open={open}
        onOpenChange={handleOpenChange}
        title={content.title}
        description={currentStepContent.description}
        steps={steps}
        stepIndex={stepIndex}
        submitted={submitted}
        success={{
          title: content.success.title,
          description: successDescription,
          doneLabel: content.success.doneLabel,
          secondaryLabel: content.success.secondaryLabel,
          secondaryHref: content.success.secondaryHref,
          nextSteps: content.success.nextSteps,
        }}
        onSuccessDone={() => handleOpenChange(false)}
        formProps={{
          onSubmit: (event) => event.preventDefault(),
          onKeyDown: handleFormKeyDown,
          noValidate: true,
        }}
        footer={
          <MultiStepDialogFooter
            stepIndex={stepIndex}
            totalSteps={steps.length}
            isLastStep={isLastStep}
            isStepValid={isStepValid}
            isSubmitting={isSubmitting}
            backLabel={content.backLabel}
            continueLabel={content.continueLabel}
            submitLabel={content.submitLabel}
            onBack={handleBack}
            onNext={() => void handleNext()}
            onSubmit={handleConfirmSubmit}
          />
        }
      >
        <MultiStepDialogHeading
          title={currentStepContent.title}
          description={currentStepContent.description}
        />

        <div className="mt-6 flex flex-col gap-4 sm:gap-5">
          {currentStep === "about" ? (
            <AboutStep content={content.steps.about} />
          ) : null}
          {currentStep === "work" ? (
            <WorkStep
              content={content.steps.work}
              sectors={sectors}
              otherOptionValue={content.otherOptionValue}
            />
          ) : null}
          {currentStep === "review" ? (
            <>
              <MembershipApplicationReviewStep
                reviewFields={content.steps.review.reviewFields}
                whyJoinLabel={content.steps.review.whyJoinLabel}
                sectors={sectors}
                otherOptionValue={content.otherOptionValue}
              />
              <PublicFormSecurityFields
                control={form.control}
                turnstileTokenName="turnstileToken"
                resetNonce={turnstileResetNonce}
                turnstileSize="normal"
                onTurnstileRetry={bumpTurnstileReset}
              />
              {submitError || form.formState.errors.root ? (
                <p className="text-destructive text-sm" role="alert">
                  {submitError ?? form.formState.errors.root?.message}
                </p>
              ) : null}
            </>
          ) : null}
        </div>
      </MultiStepDialogShell>
    </Form>
  );
}

function AboutStep({
  content,
}: {
  content: typeof communityPageContent.application.dialog.steps.about;
}) {
  const { control } = useFormContext<CommunityDialogClientValues>();

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <TextFormField
          control={control}
          name="fullName"
          placeholder={content.placeholders.fullName}
          autoComplete="name"
        />
        <ComboboxFormField
          control={control}
          name="country"
          placeholder={content.placeholders.country}
          groups={countryComboboxGroups}
          searchPlaceholder={countryComboboxCopy.searchPlaceholder}
          emptyMessage={countryComboboxCopy.emptyMessage}
          emptyHint={countryComboboxCopy.emptyHint}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <TextFormField
          control={control}
          name="email"
          type="email"
          placeholder={content.placeholders.email}
          autoComplete="email"
        />
        <PhoneFormField
          control={control}
          name="phone"
          placeholder={content.placeholders.phone}
        />
      </div>
    </>
  );
}

function WorkStep({
  content,
  sectors,
  otherOptionValue,
}: {
  content: typeof communityPageContent.application.dialog.steps.work;
  sectors: typeof communityPageContent.application.form.options.sectors;
  otherOptionValue: string;
}) {
  const { control } = useFormContext<CommunityDialogClientValues>();
  const sector = useWatch({ control, name: "sector" });

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <TextFormField
          control={control}
          name="organisation"
          placeholder={content.placeholders.organisation}
          autoComplete="organization"
        />
        <SelectFormField
          control={control}
          name="sector"
          placeholder={content.placeholders.sector}
          options={sectors}
        />
      </div>
      {sector === otherOptionValue ? (
        <TextFormField
          control={control}
          name="sectorOther"
          placeholder={content.placeholders.sectorOther}
        />
      ) : null}
      <TextareaFormField
        control={control}
        name="reason"
        placeholder={content.placeholders.reason}
      />
    </>
  );
}
