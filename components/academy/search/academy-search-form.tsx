"use client";

import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type AcademySearchFormProps = {
  placeholder: string;
  label: string;
  defaultQuery?: string;
};

export function AcademySearchForm({
  placeholder,
  label,
  defaultQuery = "",
}: AcademySearchFormProps) {
  const router = useRouter();
  const fieldId = useId();
  const feedbackId = `${fieldId}-feedback`;
  const [query, setQuery] = useState(defaultQuery);
  const [status, setStatus] = useState<"idle" | "error">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = query.trim();

    if (!trimmed) {
      setStatus("error");
      return;
    }

    setStatus("idle");
    router.push(`/academy/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form
      role="search"
      aria-label="Search the Academy"
      className="w-full"
      aria-describedby={status === "error" ? feedbackId : undefined}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <Field className="min-w-0 flex-1">
          <FieldLabel htmlFor={fieldId} className="sr-only">
            {placeholder}
          </FieldLabel>
          <Input
            id={fieldId}
            type="search"
            name="query"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder={placeholder}
            autoComplete="off"
            enterKeyHint="search"
            className="border-default h-14 rounded-lg bg-white px-5 text-base md:text-base"
          />
        </Field>
        <Button
          variant="neutral"
          size="lg"
          className="bg-forest-900 hover:bg-forest-800/90 h-14 shrink-0 px-8"
        >
          {label}
        </Button>
      </div>
      {status === "error" ? (
        <p
          id={feedbackId}
          role="alert"
          className="text-fg-muted mt-3 text-sm leading-5"
        >
          Enter a keyword to search across the Academy.
        </p>
      ) : null}
    </form>
  );
}
