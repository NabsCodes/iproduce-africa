"use client";

import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm, useFormContext, useWatch } from "react-hook-form";

import { BecomePartnerReviewStep } from "@/components/partners/become-partner-review-step";
import {
  CheckboxGroupFormField,
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
import {
  countryComboboxCopy,
  countryComboboxGroups,
} from "@/content/countries";
import { partnersPageContent } from "@/content/partners";
import { usePublicFormSubmit } from "@/hooks/use-public-form-submit";
import { asFormResolver } from "@/lib/forms/as-form-resolver";
import { withPublicFormSecurity } from "@/lib/forms/public-form-defaults";
import {
  becomePartnerClientSchema,
  becomePartnerDefaultValues,
  becomePartnerStepFields,
  becomePartnerStepKeys,
  becomePartnerStepSchemas,
  type BecomePartnerValues,
} from "@/schemas/partners";
import type { PublicFormEnvelope } from "@/schemas/public-form";

type BecomePartnerClientValues = BecomePartnerValues & PublicFormEnvelope;

type BecomePartnerDialogProps = {
  children: ReactNode;
};

export function BecomePartnerDialog({ children }: BecomePartnerDialogProps) {
  const content = partnersPageContent.becomePartner;

  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const stepIndexRef = useRef(stepIndex);
  const {
    isSubmitting,
    submitError,
    turnstileResetNonce,
    bumpTurnstileReset,
    submit,
  } = usePublicFormSubmit("/api/partners/become-partner", {
    successToast: content.success.title,
  });

  useEffect(() => {
    stepIndexRef.current = stepIndex;
  }, [stepIndex]);

  const lastStepIndex = becomePartnerStepKeys.length - 1;

  const form = useForm<BecomePartnerClientValues>({
    resolver: asFormResolver<BecomePartnerClientValues>(
      becomePartnerClientSchema,
    ),
    mode: "onBlur",
    defaultValues: withPublicFormSecurity({
      ...becomePartnerDefaultValues,
      partnershipInterests: [],
    }),
  });

  const currentStep = becomePartnerStepKeys[stepIndex];
  const currentStepContent = content.steps[currentStep];
  const isLastStep = stepIndex === lastStepIndex;
  const watchedValues = useWatch({ control: form.control });
  const isStepValid =
    becomePartnerStepSchemas[currentStep].safeParse(watchedValues).success;

  const steps: MultiStepDialogStep[] = becomePartnerStepKeys.map((key) => ({
    id: key,
    label: content.steps[key].label,
  }));

  function reset() {
    setStepIndex(0);
    setSubmitted(false);
    form.reset(
      withPublicFormSecurity({
        ...becomePartnerDefaultValues,
        partnershipInterests: [],
      }),
    );
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      window.setTimeout(reset, 200);
    }
  }

  async function handleNext() {
    const step = becomePartnerStepKeys[stepIndexRef.current];
    const valid = await form.trigger(becomePartnerStepFields[step]);
    if (valid) {
      setStepIndex((index) => Math.min(index + 1, lastStepIndex));
    }
  }

  function handleBack() {
    setStepIndex((index) => Math.max(index - 1, 0));
  }

  async function onSubmit(values: BecomePartnerClientValues) {
    if (stepIndexRef.current !== lastStepIndex) return;

    const result = await submit(values);
    if (!result.success) {
      form.setError("root", {
        message: result.error ?? "Something went wrong. Please try again.",
      });
      return;
    }

    setSubmitted(true);
  }

  function handleConfirmSubmit() {
    if (stepIndexRef.current !== lastStepIndex) return;
    void form.handleSubmit(onSubmit)();
  }

  function handleFormKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key !== "Enter") return;

    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.tagName === "TEXTAREA") return;

    event.preventDefault();

    if (stepIndexRef.current === lastStepIndex) {
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
        trigger={children}
        title={content.title}
        description={currentStepContent.description}
        steps={steps}
        stepIndex={stepIndex}
        submitted={submitted}
        success={content.success}
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
          {currentStep === "organisation" && (
            <OrganisationStep
              content={content.steps.organisation}
              organisationTypes={content.organisationTypes}
              otherOptionValue={content.otherOptionValue}
            />
          )}
          {currentStep === "interests" && (
            <InterestsStep
              options={content.partnershipInterests}
              goalsPlaceholder={content.steps.interests.goalsPlaceholder}
              otherPlaceholder={
                content.steps.interests.otherInterestPlaceholder
              }
              otherOptionValue={content.otherOptionValue}
            />
          )}
          {currentStep === "contact" && (
            <ContactStep content={content.steps.contact} />
          )}
          {currentStep === "review" && (
            <>
              <BecomePartnerReviewStep
                reviewFields={content.steps.review.reviewFields}
                goalsLabel={content.steps.review.goalsLabel}
                defaultBadge={content.steps.review.defaultBadge}
                organisationTypes={content.organisationTypes}
                partnershipInterests={content.partnershipInterests}
                otherOptionValue={content.otherOptionValue}
              />
              <PublicFormSecurityFields
                control={form.control}
                turnstileTokenName="turnstileToken"
                resetNonce={turnstileResetNonce}
                turnstileSize="compact"
                onTurnstileRetry={bumpTurnstileReset}
              />
              {submitError || form.formState.errors.root ? (
                <p className="text-destructive text-sm" role="alert">
                  {submitError ?? form.formState.errors.root?.message}
                </p>
              ) : null}
            </>
          )}
        </div>
      </MultiStepDialogShell>
    </Form>
  );
}

function OrganisationStep({
  content,
  organisationTypes,
  otherOptionValue,
}: {
  content: typeof partnersPageContent.becomePartner.steps.organisation;
  organisationTypes: typeof partnersPageContent.becomePartner.organisationTypes;
  otherOptionValue: string;
}) {
  const { control } = useFormContext<BecomePartnerClientValues>();
  const orgType = useWatch({ control, name: "organisationType" });

  return (
    <>
      <TextFormField
        control={control}
        name="organisationName"
        placeholder={content.placeholders.organisationName}
        autoComplete="organization"
      />
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <SelectFormField
          control={control}
          name="organisationType"
          placeholder={content.placeholders.organisationType}
          options={organisationTypes}
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
      {orgType === otherOptionValue ? (
        <TextFormField
          control={control}
          name="organisationTypeOther"
          placeholder={content.placeholders.organisationTypeOther}
        />
      ) : null}
      <TextFormField
        control={control}
        name="website"
        type="url"
        placeholder={content.placeholders.website}
        autoComplete="url"
      />
      <TextareaFormField
        control={control}
        name="organisationDescription"
        placeholder={content.placeholders.description}
      />
    </>
  );
}

function InterestsStep({
  options,
  goalsPlaceholder,
  otherPlaceholder,
  otherOptionValue,
}: {
  options: typeof partnersPageContent.becomePartner.partnershipInterests;
  goalsPlaceholder: string;
  otherPlaceholder: string;
  otherOptionValue: string;
}) {
  const { control } = useFormContext<BecomePartnerClientValues>();
  const interests = useWatch({ control, name: "partnershipInterests" });
  const otherChecked = interests.includes(otherOptionValue);

  return (
    <>
      <CheckboxGroupFormField
        control={control}
        name="partnershipInterests"
        label="Partnership interests"
        options={options}
      />
      {otherChecked ? (
        <TextFormField
          control={control}
          name="partnershipInterestsOther"
          placeholder={otherPlaceholder}
        />
      ) : null}
      <TextareaFormField
        control={control}
        name="goals"
        placeholder={goalsPlaceholder}
      />
    </>
  );
}

function ContactStep({
  content,
}: {
  content: typeof partnersPageContent.becomePartner.steps.contact;
}) {
  const { control } = useFormContext<BecomePartnerClientValues>();

  return (
    <>
      <TextFormField
        control={control}
        name="fullName"
        placeholder={content.placeholders.fullName}
        autoComplete="name"
      />
      <TextFormField
        control={control}
        name="jobTitle"
        placeholder={content.placeholders.jobTitle}
        autoComplete="organization-title"
      />
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
