import { Text } from "@react-email/components";

import { contactPageContent } from "@/content/contact";
import { EmailActionButton } from "@/lib/email/components/email-action-button";
import { EmailDetailSection } from "@/lib/email/components/email-detail-section";
import { EmailHighlightCard } from "@/lib/email/components/email-highlight-card";
import { EmailQuoteBlock } from "@/lib/email/components/email-quote-block";
import { EmailBody, EmailShell } from "@/lib/email/components/email-shell";
import { EmailSignOff } from "@/lib/email/components/email-sign-off";
import { formatSubmittedAt } from "@/lib/email/format-submitted-at";
import { renderEmailTemplate } from "@/lib/email/render";
import {
  emailInternalClasses,
  emailInternalType,
  emailSubscriberClasses,
  emailSubscriberType,
} from "@/lib/email/styles";
import { OTHER_OPTION_VALUE } from "@/schemas/constants";
import type { ContactFormValues } from "@/schemas/contact";

export type ContactNotificationEmailInput = ContactFormValues & {
  submittedAt: Date;
  sourcePath: string;
};

export type ContactEmailBundle = {
  subject: string;
  html: string;
  text: string;
};

function getSubjectLabel(subject: string, subjectOther?: string): string {
  if (subject === OTHER_OPTION_VALUE && subjectOther?.trim()) {
    return subjectOther.trim();
  }

  const match = contactPageContent.form.options.subjects.find(
    (item) => item.value === subject,
  );
  return match?.label ?? subject;
}

export function ContactNotificationTemplate({
  input,
  subjectLabel,
  submittedLabel,
  messagePreview,
}: {
  input: ContactNotificationEmailInput;
  subjectLabel: string;
  submittedLabel: string;
  messagePreview: string;
}) {
  const fullName = `${input.firstName} ${input.lastName}`.trim();

  return (
    <EmailShell
      preview={messagePreview}
      eyebrow="Contact enquiry"
      audience="internal"
      disclaimer="Internal notification · Do not forward externally"
    >
      <EmailBody variant="internal">
        <Text
          className={emailInternalClasses.display}
          style={emailInternalType.display}
        >
          New message from {fullName}
        </Text>
        <Text
          className={emailInternalClasses.lead}
          style={emailInternalType.lead}
        >
          Someone reached out through the contact form.
        </Text>

        <EmailDetailSection
          title="Sender"
          fields={[
            { label: "Name", value: fullName },
            {
              label: "Email",
              value: input.email,
              href: `mailto:${input.email}`,
            },
            { label: "Subject", value: subjectLabel },
            { label: "Received", value: submittedLabel },
            { label: "Source page", value: input.sourcePath },
          ]}
        />

        <EmailQuoteBlock label="Their message">{input.message}</EmailQuoteBlock>

        <EmailActionButton
          href={`mailto:${input.email}`}
          label="Reply by email"
          variant="internal"
        />
      </EmailBody>
    </EmailShell>
  );
}

export function ContactReceiptTemplate({
  firstName,
  subjectLabel,
}: {
  firstName: string;
  subjectLabel: string;
}) {
  return (
    <EmailShell
      preview="Thanks for contacting iProduce Africa. We received your message."
      eyebrow="Message received"
      audience="subscriber"
    >
      <EmailBody variant="subscriber">
        <Text
          className={emailSubscriberClasses.display}
          style={emailSubscriberType.display}
        >
          Thanks, {firstName}.
        </Text>
        <Text
          className={emailSubscriberClasses.lead}
          style={emailSubscriberType.lead}
        >
          We received your message about {subjectLabel}. We will be in touch.
        </Text>

        <EmailHighlightCard
          label="Your enquiry"
          value={subjectLabel}
          variant="subscriber"
        />

        <EmailSignOff variant="subscriber" />
      </EmailBody>
    </EmailShell>
  );
}

export async function buildContactNotificationEmail(
  input: ContactNotificationEmailInput,
): Promise<ContactEmailBundle> {
  const subjectLabel = getSubjectLabel(input.subject, input.subjectOther);
  const fullName = `${input.firstName} ${input.lastName}`.trim();
  const submittedLabel = formatSubmittedAt(input.submittedAt);
  const rawMessage = input.message.trim().replace(/\s+/g, " ");
  const messagePreview =
    rawMessage.slice(0, 90) + (rawMessage.length > 90 ? "…" : "");

  const template = (
    <ContactNotificationTemplate
      input={input}
      subjectLabel={subjectLabel}
      submittedLabel={submittedLabel}
      messagePreview={messagePreview}
    />
  );

  const { html, text } = await renderEmailTemplate(template);

  return {
    subject: `New contact: ${fullName} · ${subjectLabel}`,
    html,
    text,
  };
}

export async function buildContactReceiptEmail(
  input: ContactFormValues,
): Promise<ContactEmailBundle> {
  const subjectLabel = getSubjectLabel(input.subject, input.subjectOther);

  const template = (
    <ContactReceiptTemplate
      firstName={input.firstName}
      subjectLabel={subjectLabel}
    />
  );

  const { html, text } = await renderEmailTemplate(template);

  return {
    subject: "We received your message — iProduce Africa",
    html,
    text,
  };
}
