import { Text } from "@react-email/components";

import { getEmailSiteUrl } from "@/lib/email/site-url";
import { EmailActionButton } from "@/lib/email/components/email-action-button";
import { EmailDetailSection } from "@/lib/email/components/email-detail-section";
import { EmailSignOff } from "@/lib/email/components/email-sign-off";
import { EmailBody, EmailShell } from "@/lib/email/components/email-shell";
import { formatSubmittedAt } from "@/lib/email/format-submitted-at";
import { renderEmailTemplate } from "@/lib/email/render";
import {
  emailInternalClasses,
  emailInternalType,
  emailSubscriberClasses,
  emailSubscriberType,
} from "@/lib/email/styles";
import type { NewsletterValues } from "@/schemas/newsletter";

export type NewsletterNotificationEmailInput = NewsletterValues & {
  submittedAt: Date;
  sourcePath: string;
};

export type NewsletterEmailBundle = {
  subject: string;
  html: string;
  text: string;
};

export function NewsletterNotificationTemplate({
  email,
  submittedLabel,
  sourcePath,
}: {
  email: string;
  submittedLabel: string;
  sourcePath: string;
}) {
  return (
    <EmailShell
      preview={`New newsletter subscriber: ${email}`}
      eyebrow="Newsletter"
      audience="internal"
      disclaimer="Internal notification · Subscriber record until a list tool is connected"
    >
      <EmailBody variant="internal">
        <Text
          className={emailInternalClasses.display}
          style={emailInternalType.display}
        >
          New subscriber
        </Text>
        <Text
          className={emailInternalClasses.lead}
          style={emailInternalType.lead}
        >
          Someone joined the iProduce Africa mailing list.
        </Text>

        <EmailDetailSection
          title="Subscriber"
          fields={[
            {
              label: "Email",
              value: email,
              href: `mailto:${email}`,
            },
            { label: "Subscribed", value: submittedLabel },
            { label: "Source page", value: sourcePath },
          ]}
        />
      </EmailBody>
    </EmailShell>
  );
}

export function NewsletterConfirmTemplate({ email }: { email: string }) {
  return (
    <EmailShell
      preview="You are subscribed to iProduce Africa updates."
      eyebrow="Newsletter"
      audience="subscriber"
    >
      <EmailBody variant="subscriber">
        <Text
          className={emailSubscriberClasses.display}
          style={emailSubscriberType.display}
        >
          Welcome to the ecosystem.
        </Text>
        <Text
          className={emailSubscriberClasses.lead}
          style={emailSubscriberType.lead}
        >
          Thanks for subscribing. We will send Academy trainings, events, and
          ecosystem news that matter to African agripreneurs.
        </Text>

        <Text style={emailSubscriberType.muted}>{email}</Text>

        <EmailActionButton
          href={`${getEmailSiteUrl()}/academy`}
          label="Explore the Academy"
          variant="subscriber"
        />

        <EmailSignOff variant="subscriber" />
      </EmailBody>
    </EmailShell>
  );
}

export async function buildNewsletterNotificationEmail(
  input: NewsletterNotificationEmailInput,
): Promise<NewsletterEmailBundle> {
  const submittedLabel = formatSubmittedAt(input.submittedAt);
  const template = (
    <NewsletterNotificationTemplate
      email={input.email}
      submittedLabel={submittedLabel}
      sourcePath={input.sourcePath}
    />
  );
  const { html, text } = await renderEmailTemplate(template);

  return {
    subject: `Newsletter subscriber: ${input.email}`,
    html,
    text,
  };
}

export async function buildNewsletterConfirmEmail(
  input: NewsletterValues,
): Promise<NewsletterEmailBundle> {
  const template = <NewsletterConfirmTemplate email={input.email} />;
  const { html, text } = await renderEmailTemplate(template);

  return {
    subject: "You are subscribed — iProduce Africa",
    html,
    text,
  };
}
