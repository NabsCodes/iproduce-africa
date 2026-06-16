"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/content/site";

export function NewsletterForm() {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <Field
        orientation="horizontal"
        className="mt-6 items-center gap-2.5 *:data-[slot=field-label]:sr-only"
      >
        <FieldLabel htmlFor="footer-newsletter-email">Email address</FieldLabel>
        <Input
          id="footer-newsletter-email"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          autoCapitalize="off"
          spellCheck={false}
          placeholder={siteConfig.footer.newsletter.placeholder}
          className="text-grey-900 placeholder:text-grey-400 focus-visible:ring-tangerine-300/50 h-14 min-w-0 flex-1 border-0 bg-white px-5 text-[15px] focus-visible:border-0 focus-visible:ring-2 md:text-[15px] dark:bg-white"
        />
        <Button
          type="submit"
          variant="tangerine"
          aria-label={siteConfig.footer.newsletter.submitLabel}
          className="hover:shadow-tangerine-500/25 active:bg-tangerine-600 size-14 shrink-0 p-0 transition-all"
        >
          <Send className="size-5" aria-hidden />
        </Button>
      </Field>
    </form>
  );
}
