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
} from "@/lib/email/resolve-label";
import { getEmailSiteUrl } from "@/lib/email/site-url";
import {
  emailInternalClasses,
  emailInternalType,
  emailSubscriberClasses,
  emailSubscriberType,
} from "@/lib/email/styles";
import type { PartnerInquiryValues } from "@/schemas/partners";

const options = partnersPageContent.inquiry.form.options;

export type PartnerInquiryEmailInput = PartnerInquiryValues & {
  submittedAt: Date;
  sourcePath: string;
};

export type PartnerEmailBundle = {
  subject: string;
  html: string;
  text: string;
};

export function PartnerInquiryNotificationTemplate({
  input,
  submittedLabel,
}: {
  input: PartnerInquiryEmailInput;
  submittedLabel: string;
}) {
  return (
    <EmailShell
      preview={`New partnership inquiry from ${input.fullName}`}
      eyebrow="Partnership inquiry"
      audience="internal"
      disclaimer="Internal notification · Do not forward externally"
    >
      <EmailBody variant="internal">
        <Text
          className={emailInternalClasses.display}
          style={emailInternalType.display}
        >
          Partnership inquiry
        </Text>
        <Text
          className={emailInternalClasses.lead}
          style={emailInternalType.lead}
        >
          {input.fullName} from {input.organisation} submitted an inquiry.
        </Text>

        <EmailDetailSection
          title="Contact"
          fields={[
            { label: "Name", value: input.fullName },
            {
              label: "Email",
              value: input.email,
              href: `mailto:${input.email}`,
            },
            { label: "Phone", value: input.phone },
            { label: "Organisation", value: input.organisation },
          ]}
        />

        <EmailDetailSection
          title="Context"
          fields={[
            {
              label: "Role",
              value: resolveOptionLabel(
                options.roles,
                input.role,
                input.roleOther,
              ),
            },
            {
              label: "Country",
              value: resolveCountryLabel(options.countries, input.country),
            },
            {
              label: "Sector",
              value: resolveOptionLabel(
                options.sectors,
                input.sector,
                input.sectorOther,
              ),
            },
            {
              label: "Area of interest",
              value: resolveOptionLabel(
                options.areasOfInterest,
                input.areaOfInterest,
                input.areaOfInterestOther,
              ),
            },
            { label: "Received", value: submittedLabel },
            { label: "Source page", value: input.sourcePath },
          ]}
        />

        <EmailQuoteBlock label="Why they want to partner">
          {input.reason}
        </EmailQuoteBlock>
      </EmailBody>
    </EmailShell>
  );
}

export function PartnerInquiryReceiptTemplate({
  fullName,
  organisation,
}: {
  fullName: string;
  organisation: string;
}) {
  return (
    <EmailShell
      preview="Your partnership inquiry was received."
      eyebrow="Inquiry received"
      audience="subscriber"
    >
      <EmailBody variant="subscriber">
        <Text
          className={emailSubscriberClasses.display}
          style={emailSubscriberType.display}
        >
          Thanks, {fullName}.
        </Text>
        <Text
          className={emailSubscriberClasses.lead}
          style={emailSubscriberType.lead}
        >
          We received your partnership inquiry. Our team will review it and be
          in touch.
        </Text>

        <EmailHighlightCard
          label="Organisation"
          value={organisation}
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

export async function buildPartnerInquiryNotificationEmail(
  input: PartnerInquiryEmailInput,
): Promise<PartnerEmailBundle> {
  const submittedLabel = formatSubmittedAt(input.submittedAt);
  const template = (
    <PartnerInquiryNotificationTemplate
      input={input}
      submittedLabel={submittedLabel}
    />
  );
  const { html, text } = await renderEmailTemplate(template);

  return {
    subject: `Partnership inquiry: ${input.fullName} · ${input.organisation}`,
    html,
    text,
  };
}

export async function buildPartnerInquiryReceiptEmail(
  input: PartnerInquiryValues,
): Promise<PartnerEmailBundle> {
  const template = (
    <PartnerInquiryReceiptTemplate
      fullName={input.fullName}
      organisation={input.organisation}
    />
  );
  const { html, text } = await renderEmailTemplate(template);

  return {
    subject: "Partnership inquiry received — iProduce Africa",
    html,
    text,
  };
}
