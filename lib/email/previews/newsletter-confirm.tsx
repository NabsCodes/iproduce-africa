import { NewsletterConfirmTemplate } from "@/lib/email/templates/newsletter-confirm";

export default function NewsletterConfirmPreview() {
  return <NewsletterConfirmTemplate email="reader@example.com" />;
}
