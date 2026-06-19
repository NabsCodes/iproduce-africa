"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { MembershipApplicationReviewStep } from "@/components/community/membership-application-review-step";
import {
  PhoneFormField,
  SelectFormField,
  TextareaFormField,
  TextFormField,
} from "@/components/shared/form-fields";
import { MultiStepDialogFooter } from "@/components/shared/multi-step-dialog/footer";
import { MultiStepDialogHeading } from "@/components/shared/multi-step-dialog/heading";
import { MultiStepDialogShell } from "@/components/shared/multi-step-dialog/shell";
import type { MultiStepDialogStep } from "@/components/shared/multi-step-dialog/stepper";
import { Form } from "@/components/ui/form";
import { communityPageContent } from "@/content/community";
import {
  membershipApplicationDialogDefaultValues,
  membershipApplicationDialogSchema,
  membershipApplicationDialogStepFields,
  membershipApplicationDialogStepKeys,
  membershipApplicationDialogStepSchemas,
  type MembershipApplicationDialogValues,
} from "@/schemas/community";

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
  const countries = application.form.options.countries;
  const sectors = application.form.options.sectors;

  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [successDescription, setSuccessDescription] = useState("");
  const stepIndexRef = useRef(stepIndex);

  useEffect(() => {
    stepIndexRef.current = stepIndex;
  }, [stepIndex]);

  const form = useForm<MembershipApplicationDialogValues>({
    resolver: zodResolver(membershipApplicationDialogSchema),
    mode: "onBlur",
    defaultValues: membershipApplicationDialogDefaultValues,
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
    form.reset();
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

  async function onSubmit(values: MembershipApplicationDialogValues) {
    if (stepIndexRef.current !== reviewStepIndex) return;

    // TODO(member-application): wire to real submission endpoint.
    const firstName = values.fullName.trim().split(/\s+/)[0] ?? "there";
    setSuccessDescription(
      content.success.descriptionTemplate.replace("{firstName}", firstName),
    );
    await new Promise((resolve) => setTimeout(resolve, 800));
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
            isSubmitting={form.formState.isSubmitting}
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
            <AboutStep
              content={content.steps.about}
              countries={countries}
              otherOptionValue={content.otherOptionValue}
            />
          ) : null}
          {currentStep === "work" ? (
            <WorkStep
              content={content.steps.work}
              sectors={sectors}
              otherOptionValue={content.otherOptionValue}
            />
          ) : null}
          {currentStep === "review" ? (
            <MembershipApplicationReviewStep
              reviewFields={content.steps.review.reviewFields}
              whyJoinLabel={content.steps.review.whyJoinLabel}
              defaultBadge={content.steps.review.defaultBadge}
              countries={countries}
              sectors={sectors}
              otherOptionValue={content.otherOptionValue}
            />
          ) : null}
        </div>
      </MultiStepDialogShell>
    </Form>
  );
}

function AboutStep({
  content,
  countries,
  otherOptionValue,
}: {
  content: typeof communityPageContent.application.dialog.steps.about;
  countries: typeof communityPageContent.application.form.options.countries;
  otherOptionValue: string;
}) {
  const { control } = useFormContext<MembershipApplicationDialogValues>();
  const country = useWatch({ control, name: "country" });

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <TextFormField
          control={control}
          name="fullName"
          placeholder={content.placeholders.fullName}
          autoComplete="name"
        />
        <SelectFormField
          control={control}
          name="country"
          placeholder={content.placeholders.country}
          options={countries}
        />
      </div>
      {country === otherOptionValue ? (
        <TextFormField
          control={control}
          name="countryOther"
          placeholder={content.placeholders.countryOther}
        />
      ) : null}
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
  const { control } = useFormContext<MembershipApplicationDialogValues>();
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
