import { NewsletterNotificationTemplate } from "@/lib/email/templates/newsletter-confirm";
import { formatSubmittedAt } from "@/lib/email/format-submitted-at";

const submittedAt = new Date("2026-06-24T10:00:00.000Z");

export default function NewsletterNotificationPreview() {
  return (
    <NewsletterNotificationTemplate
      email="reader@example.com"
      submittedLabel={formatSubmittedAt(submittedAt)}
      sourcePath="/academy/blog/example"
    />
  );
}
