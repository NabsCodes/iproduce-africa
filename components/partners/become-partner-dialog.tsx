"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CheckboxGroupFormField,
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
import { partnersPageContent } from "@/content/partners";
import {
  becomePartnerDefaultValues,
  becomePartnerSchema,
  becomePartnerStepFields,
  becomePartnerStepKeys,
  becomePartnerStepSchemas,
  type BecomePartnerValues,
} from "@/schemas/partners";

type BecomePartnerDialogProps = {
  children: ReactNode;
};

export function BecomePartnerDialog({ children }: BecomePartnerDialogProps) {
  const content = partnersPageContent.becomePartner;
  const countries = partnersPageContent.inquiry.form.options.countries;

  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const stepIndexRef = useRef(stepIndex);

  useEffect(() => {
    stepIndexRef.current = stepIndex;
  }, [stepIndex]);

  const lastStepIndex = becomePartnerStepKeys.length - 1;

  const form = useForm<BecomePartnerValues>({
    resolver: zodResolver(becomePartnerSchema),
    mode: "onBlur",
    defaultValues: {
      ...becomePartnerDefaultValues,
      partnershipInterests: [],
    },
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
    form.reset();
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

  async function onSubmit(_values: BecomePartnerValues) {
    if (stepIndexRef.current !== lastStepIndex) return;

    // TODO(partner-inquiry): wire to real submission endpoint.
    //   Currently simulates 800ms latency then surfaces the local success
    //   panel. When the backend ships:
    //     1. POST `_values` to /api/partnerships (or equivalent route).
    //     2. On non-2xx, call form.setError("root", { message }) and keep
    //        the dialog on the contact step.
    //     3. On success, optionally forward an id to the success panel for
    //        copy like "Reference #ABC123".
    //   Also wire an email transactional template (welcome + internal ping).
    await new Promise((resolve) => setTimeout(resolve, 800));
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
          {currentStep === "organisation" && (
            <OrganisationStep
              content={content.steps.organisation}
              organisationTypes={content.organisationTypes}
              countries={countries}
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
        </div>
      </MultiStepDialogShell>
    </Form>
  );
}

function OrganisationStep({
  content,
  organisationTypes,
  countries,
  otherOptionValue,
}: {
  content: typeof partnersPageContent.becomePartner.steps.organisation;
  organisationTypes: typeof partnersPageContent.becomePartner.organisationTypes;
  countries: typeof partnersPageContent.inquiry.form.options.countries;
  otherOptionValue: string;
}) {
  const { control } = useFormContext<BecomePartnerValues>();
  const orgType = useWatch({ control, name: "organisationType" });
  const country = useWatch({ control, name: "country" });

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
        <SelectFormField
          control={control}
          name="country"
          placeholder={content.placeholders.country}
          options={countries}
        />
      </div>
      {orgType === otherOptionValue ? (
        <TextFormField
          control={control}
          name="organisationTypeOther"
          placeholder={content.placeholders.organisationTypeOther}
        />
      ) : null}
      {country === otherOptionValue ? (
        <TextFormField
          control={control}
          name="countryOther"
          placeholder={content.placeholders.countryOther}
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
  const { control } = useFormContext<BecomePartnerValues>();
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
  const { control } = useFormContext<BecomePartnerValues>();

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
