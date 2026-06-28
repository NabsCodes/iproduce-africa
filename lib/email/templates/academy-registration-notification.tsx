import { Text } from "@react-email/components";

import { siteConfig } from "@/content/site";
import { EmailActionButton } from "@/lib/email/components/email-action-button";
import { EmailDetailSection } from "@/lib/email/components/email-detail-section";
import { EmailHighlightCard } from "@/lib/email/components/email-highlight-card";
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
import type { AcademyRegistrationSubmitPayload } from "@/schemas/academy-registration";

export type AcademyRegistrationEmailInput = AcademyRegistrationSubmitPayload & {
  sessionTitle: string;
  submittedAt: Date;
  sourcePath: string;
};

export type AcademyEmailBundle = {
  subject: string;
  html: string;
  text: string;
};

function getKindLabel(kind: "webinar" | "course"): string {
  return kind === "webinar" ? "Webinar / event" : "Course";
}

export function AcademyRegistrationNotificationTemplate({
  input,
  submittedLabel,
}: {
  input: AcademyRegistrationEmailInput;
  submittedLabel: string;
}) {
  return (
    <EmailShell
      preview={`New academy registration for ${input.sessionTitle}`}
      eyebrow="Academy registration"
      audience="internal"
      disclaimer="Internal notification · Do not forward externally"
    >
      <EmailBody variant="internal">
        <Text
          className={emailInternalClasses.display}
          style={emailInternalType.display}
        >
          New academy registration
        </Text>
        <Text
          className={emailInternalClasses.lead}
          style={emailInternalType.lead}
        >
          {input.fullName} registered for an Academy session.
        </Text>

        <EmailDetailSection
          title="Registrant"
          fields={[
            { label: "Session", value: input.sessionTitle },
            { label: "Name", value: input.fullName },
            {
              label: "Email",
              value: input.email,
              href: `mailto:${input.email}`,
            },
            { label: "Phone", value: input.phone },
            {
              label: "Organisation",
              value: input.organisation?.trim() || "Not provided",
            },
            { label: "Type", value: getKindLabel(input.kind) },
            { label: "Received", value: submittedLabel },
            { label: "Source page", value: input.sourcePath },
          ]}
        />
      </EmailBody>
    </EmailShell>
  );
}

export function AcademyRegistrationReceiptTemplate({
  input,
}: {
  input: AcademyRegistrationEmailInput;
}) {
  const actionLabel =
    input.kind === "webinar" ? "registration" : "interest registration";

  return (
    <EmailShell
      preview={`Your ${actionLabel} for ${input.sessionTitle} was received.`}
      eyebrow="Registration received"
      audience="subscriber"
    >
      <EmailBody variant="subscriber">
        <Text
          className={emailSubscriberClasses.display}
          style={emailSubscriberType.display}
        >
          You&apos;re registered.
        </Text>
        <Text
          className={emailSubscriberClasses.lead}
          style={emailSubscriberType.lead}
        >
          Your {actionLabel} is confirmed. We will share any updates about this
          session if needed.
        </Text>

        <EmailHighlightCard
          label="Session"
          value={input.sessionTitle}
          variant="subscriber"
        />

        <EmailActionButton
          href={`${siteConfig.siteUrl}${input.sourcePath}`}
          label="View session details"
          variant="subscriber"
        />

        <EmailSignOff variant="subscriber" />
      </EmailBody>
    </EmailShell>
  );
}

export async function buildAcademyRegistrationNotificationEmail(
  input: AcademyRegistrationEmailInput,
): Promise<AcademyEmailBundle> {
  const submittedLabel = formatSubmittedAt(input.submittedAt);
  const template = (
    <AcademyRegistrationNotificationTemplate
      input={input}
      submittedLabel={submittedLabel}
    />
  );
  const { html, text } = await renderEmailTemplate(template);

  return {
    subject: `Academy registration: ${input.fullName} · ${input.sessionTitle}`,
    html,
    text,
  };
}

export async function buildAcademyRegistrationReceiptEmail(
  input: AcademyRegistrationEmailInput,
): Promise<AcademyEmailBundle> {
  const template = <AcademyRegistrationReceiptTemplate input={input} />;
  const { html, text } = await renderEmailTemplate(template);

  return {
    subject: `Registration received — ${input.sessionTitle}`,
    html,
    text,
  };
}
