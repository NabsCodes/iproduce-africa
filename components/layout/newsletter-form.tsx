"use client";

import { NewsletterSignupForm } from "@/components/shared/newsletter-signup-form";
import { siteConfig } from "@/content/site";

export function NewsletterForm() {
  const copy = siteConfig.footer.newsletter;

  return (
    <NewsletterSignupForm
      variant="footer"
      copy={{
        inputId: "footer-newsletter-email",
        inputLabel: "Email address",
        placeholder: copy.placeholder,
        submitLabel: copy.submitLabel,
        submittingLabel: copy.submittingLabel,
        successMessage: copy.successMessage,
        repeatSubmissionMessage: copy.repeatSubmissionMessage,
        subscribeAgainLabel: copy.subscribeAgainLabel,
        resubscribePrompt: copy.resubscribePrompt,
        resubscribeLabel: copy.resubscribeLabel,
        resubscribeHref: copy.resubscribeHref,
      }}
    />
  );
}
