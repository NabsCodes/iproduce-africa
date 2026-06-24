"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";

import {
  SelectFormField,
  TextareaFormField,
  TextFormField,
} from "@/components/shared/form-fields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  contactFormDefaultValues,
  contactFormSchema,
  type ContactFormValues,
} from "@/schemas/contact";
import type { ContactFormContent } from "@/types/contact";

type ContactFormProps = {
  content: ContactFormContent;
};

export function ContactForm({ content }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const otherValue = content.otherOptionValue;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: contactFormDefaultValues,
    mode: "onBlur",
  });

  const watchedSubject = useWatch({ control: form.control, name: "subject" });

  async function onSubmit(_values: ContactFormValues) {
    // TODO(contact-form): wire to real submission endpoint.
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
  }

  function handleSendAnother() {
    form.reset(contactFormDefaultValues);
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border-default elevation-2 flex flex-col items-start gap-4 rounded-xl border bg-white p-6 sm:p-8 lg:p-10"
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
        <p className="text-fg-muted text-sm leading-6">{content.description}</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 flex flex-col gap-5 sm:mt-7"
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            <TextFormField
              control={form.control}
              name="firstName"
              placeholder={content.placeholders.firstName}
              autoComplete="given-name"
              showLabel
            />
            <TextFormField
              control={form.control}
              name="lastName"
              placeholder={content.placeholders.lastName}
              autoComplete="family-name"
              showLabel
            />
          </div>

          <TextFormField
            control={form.control}
            name="email"
            type="email"
            placeholder={content.placeholders.email}
            autoComplete="email"
            showLabel
          />

          <SelectFormField
            control={form.control}
            name="subject"
            placeholder={content.placeholders.subject}
            options={content.options.subjects}
          />

          {watchedSubject === otherValue ? (
            <TextFormField
              control={form.control}
              name="subjectOther"
              placeholder={content.placeholders.subjectOther}
              showLabel
            />
          ) : null}

          <TextareaFormField
            control={form.control}
            name="message"
            placeholder={content.placeholders.message}
            showLabel
          />

          <Button
            type="submit"
            variant="neutral"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="bg-forest-900 hover:bg-forest-800 mt-2 h-12 w-full rounded-md text-base"
          >
            {form.formState.isSubmitting ? "Sending..." : content.submitLabel}
          </Button>
        </form>
      </Form>
    </div>
  );
}
