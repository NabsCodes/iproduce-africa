"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { isValidPhoneNumber } from "react-phone-number-input";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { partnersPageContent } from "@/content/partners";

const OTHER = partnersPageContent.becomePartner.otherOptionValue;

const organisationShape = {
  organisationName: z.string().min(2, "Organisation name is required"),
  organisationType: z.string().min(1, "Pick an organisation type"),
  organisationTypeOther: z.string().optional(),
  country: z.string().min(1, "Pick a country"),
  countryOther: z.string().optional(),
  website: z.union([z.url("Use a valid URL"), z.literal("")]).optional(),
  organisationDescription: z
    .string()
    .min(10, "A short description helps us route your inquiry"),
};

const interestsShape = {
  partnershipInterests: z
    .array(z.string())
    .min(1, "Pick at least one area of interest"),
  partnershipInterestsOther: z.string().optional(),
  goals: z.string().min(20, "Tell us a bit about your goals"),
};

const contactShape = {
  fullName: z.string().min(2, "Please share your full name"),
  jobTitle: z.string().min(2, "Job title is required"),
  email: z.email("Use a valid email"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .refine((v) => isValidPhoneNumber(v), "Use a valid phone number"),
};

function organisationOtherRefine(
  data: {
    organisationType: string;
    organisationTypeOther?: string;
    country: string;
    countryOther?: string;
  },
  ctx: z.RefinementCtx,
) {
  if (
    data.organisationType === OTHER &&
    (!data.organisationTypeOther ||
      data.organisationTypeOther.trim().length < 2)
  ) {
    ctx.addIssue({
      code: "custom",
      path: ["organisationTypeOther"],
      message: "Please specify your organisation type",
    });
  }
  if (
    data.country === OTHER &&
    (!data.countryOther || data.countryOther.trim().length < 2)
  ) {
    ctx.addIssue({
      code: "custom",
      path: ["countryOther"],
      message: "Please specify your country",
    });
  }
}

function interestsOtherRefine(
  data: { partnershipInterests: string[]; partnershipInterestsOther?: string },
  ctx: z.RefinementCtx,
) {
  if (
    data.partnershipInterests.includes(OTHER) &&
    (!data.partnershipInterestsOther ||
      data.partnershipInterestsOther.trim().length < 2)
  ) {
    ctx.addIssue({
      code: "custom",
      path: ["partnershipInterestsOther"],
      message: "Please specify your other interest",
    });
  }
}

const organisationStepSchema = z
  .object(organisationShape)
  .superRefine(organisationOtherRefine);
const interestsStepSchema = z
  .object(interestsShape)
  .superRefine(interestsOtherRefine);
const contactStepSchema = z.object(contactShape);

const schema = z
  .object({ ...organisationShape, ...interestsShape, ...contactShape })
  .superRefine((data, ctx) => {
    organisationOtherRefine(data, ctx);
    interestsOtherRefine(data, ctx);
  });

type FormValues = z.infer<typeof schema>;

const stepKeys = ["organisation", "interests", "contact"] as const;
type StepKey = (typeof stepKeys)[number];

const stepSchemas: Record<StepKey, z.ZodTypeAny> = {
  organisation: organisationStepSchema,
  interests: interestsStepSchema,
  contact: contactStepSchema,
};

const stepFields: Record<StepKey, (keyof FormValues)[]> = {
  organisation: [
    "organisationName",
    "organisationType",
    "organisationTypeOther",
    "country",
    "countryOther",
    "website",
    "organisationDescription",
  ],
  interests: ["partnershipInterests", "partnershipInterestsOther", "goals"],
  contact: ["fullName", "jobTitle", "email", "phone"],
};

type BecomePartnerDialogProps = {
  children: React.ReactNode;
};

export function BecomePartnerDialog({ children }: BecomePartnerDialogProps) {
  const content = partnersPageContent.becomePartner;
  const countries = partnersPageContent.inquiry.form.options.countries;

  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      organisationName: "",
      organisationType: "",
      organisationTypeOther: "",
      country: "",
      countryOther: "",
      website: "",
      organisationDescription: "",
      partnershipInterests: [],
      partnershipInterestsOther: "",
      goals: "",
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
    },
  });

  const currentStep = stepKeys[stepIndex];
  const currentStepContent = contentStep(content, currentStep);
  const isLastStep = stepIndex === stepKeys.length - 1;
  const watchedValues = useWatch({ control: form.control });
  const isStepValid = stepSchemas[currentStep].safeParse(watchedValues).success;

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
    const valid = await form.trigger(stepFields[currentStep]);
    if (valid) setStepIndex((i) => Math.min(i + 1, stepKeys.length - 1));
  }

  function handleBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  async function onSubmit(_values: FormValues) {
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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-2rem)] gap-0 overflow-hidden p-0 sm:max-w-[640px]">
        {submitted ? (
          <SuccessPanel
            title={content.title}
            success={content.success}
            onDone={() => handleOpenChange(false)}
          />
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex max-h-[calc(100vh-2rem)] flex-col"
              noValidate
            >
              <div className="border-grey-200 border-b px-5 pt-5 pb-4 sm:px-7 sm:pt-6 sm:pb-5">
                <DialogTitle className="text-foreground pr-10 font-serif text-lg font-semibold sm:text-xl">
                  {content.title}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  {currentStepContent.description}
                </DialogDescription>
                <Stepper
                  stepIndex={stepIndex}
                  labels={[
                    content.steps.organisation.label,
                    content.steps.interests.label,
                    content.steps.contact.label,
                  ]}
                />
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
                <StepHeading
                  title={currentStepContent.title}
                  description={currentStepContent.description}
                />

                <div className="mt-6 flex flex-col gap-4 sm:gap-5">
                  {currentStep === "organisation" && (
                    <OrganisationStep
                      content={content.steps.organisation}
                      organisationTypes={content.organisationTypes}
                      countries={countries}
                    />
                  )}
                  {currentStep === "interests" && (
                    <InterestsStep
                      options={content.partnershipInterests}
                      goalsPlaceholder={
                        content.steps.interests.goalsPlaceholder
                      }
                      otherPlaceholder={
                        content.steps.interests.otherInterestPlaceholder
                      }
                    />
                  )}
                  {currentStep === "contact" && (
                    <ContactStep content={content.steps.contact} />
                  )}
                </div>
              </div>

              <DialogFooter
                stepIndex={stepIndex}
                totalSteps={stepKeys.length}
                isLastStep={isLastStep}
                isStepValid={isStepValid}
                isSubmitting={form.formState.isSubmitting}
                backLabel={content.backLabel}
                continueLabel={content.continueLabel}
                submitLabel={content.submitLabel}
                onBack={handleBack}
                onNext={handleNext}
              />
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function contentStep(
  content: typeof partnersPageContent.becomePartner,
  key: StepKey,
) {
  if (key === "organisation") return content.steps.organisation;
  if (key === "interests") return content.steps.interests;
  return content.steps.contact;
}

function Stepper({
  stepIndex,
  labels,
}: {
  stepIndex: number;
  labels: readonly string[];
}) {
  return (
    <ol
      className="mt-4 flex w-full items-center sm:mt-5"
      aria-label="Form steps"
    >
      {labels.map((label, index) => {
        const isCurrent = index === stepIndex;
        const isComplete = index < stepIndex;
        const isLast = index === labels.length - 1;

        return (
          <li
            key={label}
            className={cn(
              "flex items-center gap-2 sm:gap-3",
              !isLast && "flex-1",
            )}
          >
            <span
              aria-current={isCurrent ? "step" : undefined}
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors sm:size-7 sm:text-xs",
                isComplete && "bg-leaf-500 text-white",
                isCurrent && "bg-forest-900 text-white",
                !isCurrent &&
                  !isComplete &&
                  "border-grey-300 text-fg-subtle border bg-white",
              )}
            >
              {isComplete ? (
                <Check className="size-3.5" strokeWidth={3} aria-hidden />
              ) : (
                index + 1
              )}
            </span>
            <span
              className={cn(
                "hidden text-sm font-medium whitespace-nowrap transition-colors sm:inline",
                isCurrent ? "text-foreground" : "text-fg-subtle",
              )}
            >
              {label}
            </span>
            {!isLast ? (
              <span
                aria-hidden
                className={cn(
                  "h-px flex-1 transition-colors",
                  isComplete ? "bg-leaf-500" : "bg-grey-200",
                )}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

function StepHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <h3 className="text-foreground font-serif text-xl leading-snug font-semibold sm:text-2xl">
        {title}
      </h3>
      <p className="text-fg-muted text-sm leading-6">{description}</p>
    </div>
  );
}

function OrganisationStep({
  content,
  organisationTypes,
  countries,
}: {
  content: typeof partnersPageContent.becomePartner.steps.organisation;
  organisationTypes: typeof partnersPageContent.becomePartner.organisationTypes;
  countries: typeof partnersPageContent.inquiry.form.options.countries;
}) {
  const orgType = useWatch<FormValues>({ name: "organisationType" });
  const country = useWatch<FormValues>({ name: "country" });

  return (
    <>
      <PlainField
        name="organisationName"
        placeholder={content.placeholders.organisationName}
        autoComplete="organization"
      />
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <SelectField
          name="organisationType"
          placeholder={content.placeholders.organisationType}
          options={organisationTypes}
        />
        <SelectField
          name="country"
          placeholder={content.placeholders.country}
          options={countries}
        />
      </div>
      {orgType === OTHER ? (
        <PlainField
          name="organisationTypeOther"
          placeholder={content.placeholders.organisationTypeOther}
        />
      ) : null}
      {country === OTHER ? (
        <PlainField
          name="countryOther"
          placeholder={content.placeholders.countryOther}
        />
      ) : null}
      <PlainField
        name="website"
        type="url"
        placeholder={content.placeholders.website}
        autoComplete="url"
      />
      <TextareaField
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
}: {
  options: typeof partnersPageContent.becomePartner.partnershipInterests;
  goalsPlaceholder: string;
  otherPlaceholder: string;
}) {
  const { control } = useFormContextSafely<FormValues>();
  const interests = useWatch<FormValues>({ name: "partnershipInterests" }) as
    | string[]
    | undefined;
  const otherChecked = interests?.includes(OTHER) ?? false;

  return (
    <>
      <FormField
        control={control}
        name="partnershipInterests"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="sr-only">Partnership interests</FormLabel>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3">
              {options.map((option) => {
                const checked = field.value?.includes(option.value) ?? false;
                return (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-3 text-sm leading-5"
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(next) => {
                        const current = field.value ?? [];
                        field.onChange(
                          next
                            ? [...current, option.value]
                            : current.filter((v) => v !== option.value),
                        );
                      }}
                    />
                    <span className="text-foreground">{option.label}</span>
                  </label>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      {otherChecked ? (
        <PlainField
          name="partnershipInterestsOther"
          placeholder={otherPlaceholder}
        />
      ) : null}
      <TextareaField name="goals" placeholder={goalsPlaceholder} />
    </>
  );
}

function ContactStep({
  content,
}: {
  content: typeof partnersPageContent.becomePartner.steps.contact;
}) {
  return (
    <>
      <PlainField
        name="fullName"
        placeholder={content.placeholders.fullName}
        autoComplete="name"
      />
      <PlainField
        name="jobTitle"
        placeholder={content.placeholders.jobTitle}
        autoComplete="organization-title"
      />
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <PlainField
          name="email"
          type="email"
          placeholder={content.placeholders.email}
          autoComplete="email"
        />
        <PhoneField placeholder={content.placeholders.phone} />
      </div>
    </>
  );
}

function PlainField({
  name,
  placeholder,
  type,
  autoComplete,
}: {
  name: keyof FormValues;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}) {
  const { control } = useFormContextSafely<FormValues>();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="sr-only">{placeholder}</FormLabel>
          <FormControl>
            <Input
              {...field}
              value={(field.value as string | undefined) ?? ""}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function SelectField({
  name,
  placeholder,
  options,
}: {
  name: keyof FormValues;
  placeholder: string;
  options: readonly { value: string; label: string }[];
}) {
  const { control } = useFormContextSafely<FormValues>();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="sr-only">{placeholder}</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={(field.value as string | undefined) ?? ""}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function TextareaField({
  name,
  placeholder,
}: {
  name: keyof FormValues;
  placeholder: string;
}) {
  const { control } = useFormContextSafely<FormValues>();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="sr-only">{placeholder}</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              value={(field.value as string | undefined) ?? ""}
              placeholder={placeholder}
              rows={4}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function PhoneField({ placeholder }: { placeholder: string }) {
  const { control } = useFormContextSafely<FormValues>();
  return (
    <FormField
      control={control}
      name="phone"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className="sr-only">{placeholder}</FormLabel>
          <FormControl>
            <PhoneInput
              value={(field.value as string | undefined) || undefined}
              onChange={(v) => field.onChange(v ?? "")}
              onBlur={field.onBlur}
              name={field.name}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid ? "true" : "false"}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function DialogFooter({
  stepIndex,
  totalSteps,
  isLastStep,
  isStepValid,
  isSubmitting,
  backLabel,
  continueLabel,
  submitLabel,
  onBack,
  onNext,
}: {
  stepIndex: number;
  totalSteps: number;
  isLastStep: boolean;
  isStepValid: boolean;
  isSubmitting: boolean;
  backLabel: string;
  continueLabel: string;
  submitLabel: string;
  onBack: () => void;
  onNext: () => void;
}) {
  const isFirstStep = stepIndex === 0;

  const advanceClass = cn(
    "h-10 rounded-md px-4 text-sm transition-colors sm:px-5",
    isStepValid
      ? "bg-forest-900 text-white hover:bg-forest-800"
      : "bg-leaf-100 text-forest-800 hover:bg-leaf-200",
  );

  return (
    <div className="bg-subtle border-grey-200 grid grid-cols-3 items-center gap-3 border-t px-5 py-4 sm:px-7 sm:py-5">
      <div className="justify-self-start">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onBack}
          tabIndex={isFirstStep ? -1 : 0}
          aria-hidden={isFirstStep || undefined}
          className={cn(
            "h-10 rounded-md px-3 text-sm sm:px-4",
            isFirstStep && "pointer-events-none invisible",
          )}
        >
          <ArrowLeft className="size-4" />
          <span className="hidden sm:inline">{backLabel}</span>
        </Button>
      </div>

      <p className="text-fg-subtle justify-self-center text-center text-xs font-medium sm:text-sm">
        Step {stepIndex + 1} of {totalSteps}
      </p>

      <div className="justify-self-end">
        {isLastStep ? (
          <Button
            type="submit"
            variant="neutral"
            size="sm"
            disabled={isSubmitting}
            aria-disabled={!isStepValid || isSubmitting}
            className={advanceClass}
          >
            <span className="hidden sm:inline">
              {isSubmitting ? "Submitting…" : submitLabel}
            </span>
            <span className="sm:hidden">
              {isSubmitting ? "Submitting…" : "Submit"}
            </span>
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button
            type="button"
            variant="neutral"
            size="sm"
            onClick={onNext}
            aria-disabled={!isStepValid}
            className={advanceClass}
          >
            {continueLabel}
            <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

function SuccessPanel({
  title,
  success,
  onDone,
}: {
  title: string;
  success: typeof partnersPageContent.becomePartner.success;
  onDone: () => void;
}) {
  return (
    <div className="flex flex-col">
      <div className="border-grey-200 border-b px-5 pt-5 pb-4 sm:px-7 sm:pt-6 sm:pb-5">
        <DialogTitle className="text-foreground pr-10 font-serif text-lg font-semibold sm:text-xl">
          {title}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {success.description}
        </DialogDescription>
      </div>
      <div className="flex flex-col items-center px-5 py-8 text-center sm:px-7 sm:py-10">
        <span
          aria-hidden
          className="border-leaf-300 bg-leaf-100 text-leaf-700 flex size-20 items-center justify-center rounded-full border-2 border-dashed"
        >
          <Check className="size-8" strokeWidth={2.5} />
        </span>
        <h3 className="text-foreground mt-6 font-serif text-xl font-semibold sm:text-2xl">
          {success.title}
        </h3>
        <p className="text-fg-muted mt-3 max-w-sm text-sm leading-6 sm:text-base">
          {success.description}
        </p>
        <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            type="button"
            variant="neutral"
            size="sm"
            onClick={onDone}
            className="bg-forest-900 hover:bg-forest-800 h-10 rounded-md px-6 text-sm sm:px-8"
          >
            {success.doneLabel}
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-10 px-6 text-sm sm:px-8"
          >
            <Link href={success.secondaryHref} onClick={onDone}>
              {success.secondaryLabel}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function useFormContextSafely<T extends Record<string, unknown>>() {
  return useFormContext<T>();
}
