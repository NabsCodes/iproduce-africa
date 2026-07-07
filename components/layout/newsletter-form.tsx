"use client";

import { usePathname } from "next/navigation";

import { NewsletterSignupForm } from "@/components/shared/newsletter-signup-form";
import { siteConfig } from "@/content/site";

export function NewsletterForm() {
  const copy = siteConfig.footer.newsletter;
  const pathname = usePathname();

  return (
    <NewsletterSignupForm
      variant="footer"
      sourcePath={pathname || "/"}
      copy={{
        inputId: "footer-newsletter-email",
        inputLabel: "Email address",
        placeholder: copy.placeholder,
        submitLabel: copy.submitLabel,
        submittingLabel: copy.submittingLabel,
        successMessage: copy.successMessage,
        subscribeAgainLabel: copy.subscribeAgainLabel,
      }}
    />
  );
}
