import { Text } from "@react-email/components";

import { partnersPageContent } from "@/content/partners";
import { EmailActionButton } from "@/lib/email/components/email-action-button";
import { EmailDetailSection } from "@/lib/email/components/email-detail-section";
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
import type {
  MembershipApplicationDialogValues,
  MembershipApplicationValues,
} from "@/schemas/community";

type CommunityApplicationValues =
  | MembershipApplicationValues
  | MembershipApplicationDialogValues;

export type CommunityApplicationEmailInput = CommunityApplicationValues & {
  source: "page" | "dialog";
  submittedAt: Date;
  sourcePath: string;
};

export type CommunityEmailBundle = {
  subject: string;
  html: string;
  text: string;
};

const options = partnersPageContent.inquiry.form.options;

function getSourceLabel(source: "page" | "dialog"): string {
  return source === "page" ? "Community page form" : "Membership dialog";
}

export function CommunityApplicationNotificationTemplate({
  input,
  submittedLabel,
}: {
  input: CommunityApplicationEmailInput;
  submittedLabel: string;
}) {
  const hasRole = "role" in input;

  return (
    <EmailShell
      preview={`New community application from ${input.fullName}`}
      eyebrow="Community application"
      audience="internal"
      disclaimer="Internal notification · Do not forward externally"
    >
      <EmailBody variant="internal">
        <Text
          className={emailInternalClasses.display}
          style={emailInternalType.display}
        >
          Community application
        </Text>
        <Text
          className={emailInternalClasses.lead}
          style={emailInternalType.lead}
        >
          {input.fullName} from {input.organisation} applied via the{" "}
          {getSourceLabel(input.source).toLowerCase()}.
        </Text>

        <EmailDetailSection
          title="Applicant"
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
          title="Profile"
          fields={[
            ...(hasRole
              ? [
                  {
                    label: "Role",
                    value: resolveOptionLabel(
                      options.roles,
                      (input as MembershipApplicationValues).role,
                      (input as MembershipApplicationValues).roleOther,
                    ),
                  },
                ]
              : []),
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
            { label: "Form source", value: getSourceLabel(input.source) },
            { label: "Received", value: submittedLabel },
            {
              label: "Source page",
              value: input.sourcePath,
            },
          ]}
        />

        <EmailQuoteBlock label="Why they want to join">
          {input.reason}
        </EmailQuoteBlock>
      </EmailBody>
    </EmailShell>
  );
}

export function CommunityApplicationReceiptTemplate({
  fullName,
}: {
  fullName: string;
}) {
  return (
    <EmailShell
      preview="Your community application was received."
      eyebrow="Application received"
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
          We received your community membership application. Our team will
          review it and be in touch.
        </Text>

        <EmailActionButton
          href={`${getEmailSiteUrl()}/community`}
          label="Explore the community"
          variant="subscriber"
        />

        <EmailSignOff variant="subscriber" />
      </EmailBody>
    </EmailShell>
  );
}

export async function buildCommunityApplicationNotificationEmail(
  input: CommunityApplicationEmailInput,
): Promise<CommunityEmailBundle> {
  const submittedLabel = formatSubmittedAt(input.submittedAt);
  const template = (
    <CommunityApplicationNotificationTemplate
      input={input}
      submittedLabel={submittedLabel}
    />
  );
  const { html, text } = await renderEmailTemplate(template);

  return {
    subject: `Community application: ${input.fullName} · ${input.organisation}`,
    html,
    text,
  };
}

export async function buildCommunityApplicationReceiptEmail(
  input: CommunityApplicationValues,
): Promise<CommunityEmailBundle> {
  const template = (
    <CommunityApplicationReceiptTemplate fullName={input.fullName} />
  );
  const { html, text } = await renderEmailTemplate(template);

  return {
    subject: "Community application received — iProduce Africa",
    html,
    text,
  };
}
