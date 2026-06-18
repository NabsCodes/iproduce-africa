"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

type AcademyHeroSearchFormProps = {
  placeholder: string;
  label: string;
};

export function AcademyHeroSearchForm({
  placeholder,
  label,
}: AcademyHeroSearchFormProps) {
  const fieldId = useId();
  const feedbackId = `${fieldId}-feedback`;
  const timeoutRef = useRef<number | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = String(formData.get("query") ?? "").trim();

    if (!query) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setStatus("success");
    }, 500);
  }

  return (
    <form
      role="search"
      aria-label="Search the Academy"
      className="mt-8 w-full"
      aria-describedby={status === "idle" ? undefined : feedbackId}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Field className="min-w-0 flex-1">
          <FieldLabel htmlFor={fieldId} className="sr-only">
            {placeholder}
          </FieldLabel>
          <Input
            id={fieldId}
            type="search"
            name="query"
            placeholder={placeholder}
            autoComplete="off"
            enterKeyHint="search"
            className="border-input placeholder:text-fg-subtle h-14 px-5 text-base shadow-sm md:text-base"
          />
        </Field>
        <Button
          type="submit"
          variant="neutral"
          size="lg"
          disabled={status === "loading"}
          className="bg-forest-900 hover:bg-forest-800/90 h-14 shrink-0 px-8"
        >
          {status === "loading" ? <Spinner className="size-4" /> : null}
          {status === "loading" ? "Searching" : label}
        </Button>
      </div>
      {status !== "idle" ? (
        <p
          id={feedbackId}
          role={status === "error" ? "alert" : "status"}
          className="text-fg-muted mt-3 text-sm leading-5"
        >
          {status === "error"
            ? "Enter a keyword to search the Academy."
            : status === "success"
              ? "Use the sections below to browse Academy topics."
              : "Checking the static Academy collection..."}
        </p>
      ) : null}
    </form>
  );
}
