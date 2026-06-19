"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { isValidPhoneNumber } from "react-phone-number-input";

import { Button } from "@/components/ui/button";
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
import type { PartnerInquiryFormContent } from "@/types/partners";

function buildInquirySchema(otherValue: string) {
  return z
    .object({
      fullName: z.string().min(2, "Please share your full name"),
      organisation: z.string().min(2, "Organisation is required"),
      role: z.string().min(1, "Pick a role"),
      roleOther: z.string().optional(),
      country: z.string().min(2, "Pick your country"),
      countryOther: z.string().optional(),
      sector: z.string().min(1, "Pick a sector"),
      sectorOther: z.string().optional(),
      email: z.email("Use a valid email"),
      phone: z
        .string()
        .min(1, "Phone is required")
        .refine((v) => isValidPhoneNumber(v), "Use a valid phone number"),
      areaOfInterest: z.string().min(1, "Pick an area of interest"),
      areaOfInterestOther: z.string().optional(),
      reason: z.string().min(10, "A short reason helps us route your inquiry"),
    })
    .superRefine((data, ctx) => {
      const needsOther: [keyof typeof data, keyof typeof data, string][] = [
        ["role", "roleOther", "Please specify your role"],
        ["country", "countryOther", "Please specify your country"],
        ["sector", "sectorOther", "Please specify your sector"],
        [
          "areaOfInterest",
          "areaOfInterestOther",
          "Please specify your area of interest",
        ],
      ];
      for (const [parent, child, message] of needsOther) {
        if (data[parent] === otherValue) {
          const value = data[child];
          if (typeof value !== "string" || value.trim().length < 2) {
            ctx.addIssue({ code: "custom", path: [child], message });
          }
        }
      }
    });
}

type InquiryValues = z.infer<ReturnType<typeof buildInquirySchema>>;

type InquiryFormProps = {
  content: PartnerInquiryFormContent;
};

export function InquiryForm({ content }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const OTHER = content.otherOptionValue;

  const form = useForm<InquiryValues>({
    resolver: zodResolver(buildInquirySchema(OTHER)),
    defaultValues: {
      fullName: "",
      organisation: "",
      role: "",
      roleOther: "",
      country: "",
      countryOther: "",
      sector: "",
      sectorOther: "",
      email: "",
      phone: "",
      areaOfInterest: "",
      areaOfInterestOther: "",
      reason: "",
    },
    mode: "onBlur",
  });

  const watchedRole = useWatch({ control: form.control, name: "role" });
  const watchedCountry = useWatch({ control: form.control, name: "country" });
  const watchedSector = useWatch({ control: form.control, name: "sector" });
  const watchedAreaOfInterest = useWatch({
    control: form.control,
    name: "areaOfInterest",
  });

  async function onSubmit(_values: InquiryValues) {
    // TODO(partner-inquiry): wire to real submission endpoint.
    //   Same backend route the BecomePartnerDialog will eventually call.
    //   On non-2xx response, use form.setError("root", { message }) and
    //   keep the form mounted. On success, optionally surface a reference id.
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
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">
                  {content.placeholders.fullName}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={content.placeholders.fullName}
                    autoComplete="name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            <FormField
              control={form.control}
              name="organisation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">
                    {content.placeholders.organisation}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={content.placeholders.organisation}
                      autoComplete="organization"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">
                    {content.placeholders.role}
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={content.placeholders.role} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {content.options.roles.map((option) => (
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
          </div>

          {watchedRole === OTHER ? (
            <FormField
              control={form.control}
              name="roleOther"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">
                    {content.placeholders.roleOther}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder={content.placeholders.roleOther}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">
                    {content.placeholders.country}
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={content.placeholders.country}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {content.options.countries.map((option) => (
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
            <FormField
              control={form.control}
              name="sector"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">
                    {content.placeholders.sector}
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={content.placeholders.sector}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {content.options.sectors.map((option) => (
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
          </div>

          {watchedCountry === OTHER ? (
            <FormField
              control={form.control}
              name="countryOther"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">
                    {content.placeholders.countryOther}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder={content.placeholders.countryOther}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}

          {watchedSector === OTHER ? (
            <FormField
              control={form.control}
              name="sectorOther"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">
                    {content.placeholders.sectorOther}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder={content.placeholders.sectorOther}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">
                    {content.placeholders.email}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder={content.placeholders.email}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="sr-only">
                    {content.placeholders.phone}
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      value={field.value || undefined}
                      onChange={(v) => field.onChange(v ?? "")}
                      onBlur={field.onBlur}
                      name={field.name}
                      placeholder={content.placeholders.phone}
                      aria-invalid={fieldState.invalid ? "true" : "false"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="areaOfInterest"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">
                  {content.placeholders.areaOfInterest}
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={content.placeholders.areaOfInterest}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {content.options.areasOfInterest.map((option) => (
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

          {watchedAreaOfInterest === OTHER ? (
            <FormField
              control={form.control}
              name="areaOfInterestOther"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">
                    {content.placeholders.areaOfInterestOther}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder={content.placeholders.areaOfInterestOther}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}

          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">
                  {content.placeholders.reason}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={content.placeholders.reason}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="neutral"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="bg-forest-900 hover:bg-forest-800 mt-2 h-12 w-full rounded-md text-base"
          >
            {form.formState.isSubmitting ? "Submitting…" : content.submitLabel}
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
