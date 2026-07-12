import { Text } from "@react-email/components";

import { partnersPageContent } from "@/content/partners";
import { EmailActionButton } from "@/lib/email/components/email-action-button";
import { EmailDetailSection } from "@/lib/email/components/email-detail-section";
import { EmailHighlightCard } from "@/lib/email/components/email-highlight-card";
import { EmailQuoteBlock } from "@/lib/email/components/email-quote-block";
import { EmailBody, EmailShell } from "@/lib/email/components/email-shell";
import { EmailSignOff } from "@/lib/email/components/email-sign-off";
import { formatSubmittedAt } from "@/lib/email/format-submitted-at";
import { renderEmailTemplate } from "@/lib/email/render";
import {
  resolveCountryLabel,
  resolveOptionLabel,
  resolveOptionLabels,
} from "@/lib/email/resolve-label";
import { getEmailSiteUrl } from "@/lib/email/site-url";
import {
  emailInternalClasses,
  emailInternalType,
  emailSubscriberClasses,
  emailSubscriberType,
} from "@/lib/email/styles";
import type { BecomePartnerValues } from "@/schemas/partners";

export type BecomePartnerEmailInput = BecomePartnerValues & {
  submittedAt: Date;
  sourcePath: string;
};

export type BecomePartnerEmailBundle = {
  subject: string;
  html: string;
  text: string;
};

export function BecomePartnerNotificationTemplate({
  input,
  submittedLabel,
}: {
  input: BecomePartnerEmailInput;
  submittedLabel: string;
}) {
  const inquiryOptions = partnersPageContent.inquiry.form.options;

  return (
    <EmailShell
      preview={`New become-a-partner application from ${input.organisationName}`}
      eyebrow="Become a partner"
      audience="internal"
      disclaimer="Internal notification · Do not forward externally"
    >
      <EmailBody variant="internal">
        <Text
          className={emailInternalClasses.display}
          style={emailInternalType.display}
        >
          Partner application
        </Text>
        <Text
          className={emailInternalClasses.lead}
          style={emailInternalType.lead}
        >
          {input.fullName} submitted an application for {input.organisationName}
          .
        </Text>

        <EmailDetailSection
          title="Organisation"
          fields={[
            { label: "Name", value: input.organisationName },
            {
              label: "Type",
              value: resolveOptionLabel(
                partnersPageContent.becomePartner.organisationTypes,
                input.organisationType,
                input.organisationTypeOther,
              ),
            },
            {
              label: "Country",
              value: resolveCountryLabel(
                inquiryOptions.countries,
                input.country,
              ),
            },
            {
              label: "Website",
              value: input.website?.trim() || "Not provided",
              ...(input.website?.trim() ? { href: input.website.trim() } : {}),
            },
          ]}
        />

        <EmailDetailSection
          title="Primary contact"
          fields={[
            { label: "Name", value: input.fullName },
            { label: "Job title", value: input.jobTitle },
            {
              label: "Email",
              value: input.email,
              href: `mailto:${input.email}`,
            },
            { label: "Phone", value: input.phone },
            {
              label: "Interests",
              value: resolveOptionLabels(
                partnersPageContent.becomePartner.partnershipInterests,
                input.partnershipInterests,
                input.partnershipInterestsOther,
              ),
            },
            { label: "Received", value: submittedLabel },
            { label: "Source", value: input.sourcePath },
          ]}
        />

        <EmailQuoteBlock label="About the organisation">
          {input.organisationDescription}
        </EmailQuoteBlock>

        <EmailQuoteBlock label="Partnership goals">
          {input.goals}
        </EmailQuoteBlock>
      </EmailBody>
    </EmailShell>
  );
}

export function BecomePartnerReceiptTemplate({
  fullName,
  organisationName,
}: {
  fullName: string;
  organisationName: string;
}) {
  return (
    <EmailShell
      preview={`Your partnership inquiry for ${organisationName} was received.`}
      eyebrow="Application received"
      audience="subscriber"
    >
      <EmailBody variant="subscriber">
        <Text
          className={emailSubscriberClasses.display}
          style={emailSubscriberType.display}
        >
          Application received.
        </Text>
        <Text
          className={emailSubscriberClasses.lead}
          style={emailSubscriberType.lead}
        >
          Thanks, {fullName}. We received your partnership application and our
          team will review it.
        </Text>

        <EmailHighlightCard
          label="Organisation"
          value={organisationName}
          variant="subscriber"
        />

        <EmailActionButton
          href={`${getEmailSiteUrl()}/partners`}
          label="Learn about partnerships"
          variant="subscriber"
        />

        <EmailSignOff variant="subscriber" />
      </EmailBody>
    </EmailShell>
  );
}

export async function buildBecomePartnerNotificationEmail(
  input: BecomePartnerEmailInput,
): Promise<BecomePartnerEmailBundle> {
  const submittedLabel = formatSubmittedAt(input.submittedAt);
  const template = (
    <BecomePartnerNotificationTemplate
      input={input}
      submittedLabel={submittedLabel}
    />
  );
  const { html, text } = await renderEmailTemplate(template);

  return {
    subject: `Become a partner: ${input.organisationName} · ${input.fullName}`,
    html,
    text,
  };
}

export async function buildBecomePartnerReceiptEmail(
  input: BecomePartnerValues,
): Promise<BecomePartnerEmailBundle> {
  const template = (
    <BecomePartnerReceiptTemplate
      fullName={input.fullName}
      organisationName={input.organisationName}
    />
  );
  const { html, text } = await renderEmailTemplate(template);

  return {
    subject: "Partnership inquiry received — iProduce Africa",
    html,
    text,
  };
}
