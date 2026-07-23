/**
 * Shared newsletter response copy for the footer and Academy Blog sidebar.
 *
 * The hosted form URL is intentionally public. Mailchimp requires people who
 * unsubscribed themselves to rejoin through its hosted form so their renewed
 * consent is recorded correctly.
 */
export const newsletterSignupSharedCopy = {
  successMessage:
    "Thanks. If you haven't confirmed yet, check your inbox for the confirmation email.",
  repeatSubmissionMessage:
    "We already received this email during this session. If you haven't confirmed yet, check your inbox for the confirmation email.",
  subscribeAgainLabel: "Subscribe with another email",
  resubscribePrompt: "Previously unsubscribed?",
  resubscribeLabel: "Rejoin the mailing list",
  resubscribeHref:
    "https://iproduceafrica.us20.list-manage.com/subscribe?u=0e70589ee38792a841684b616&id=d2c6348b31",
} as const;
