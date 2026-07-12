import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
} from "@react-email/components";
import type { ReactNode } from "react";

import { EmailInternalFooter } from "@/lib/email/components/email-internal-footer";
import { EmailInternalMasthead } from "@/lib/email/components/email-internal-masthead";
import { EmailSubscriberFooter } from "@/lib/email/components/email-subscriber-footer";
import { EmailSubscriberMasthead } from "@/lib/email/components/email-subscriber-masthead";
import {
  emailInternalMobileStyles,
  emailLayout,
  emailSubscriberMobileStyles,
  PREVIEW_PADDING,
} from "@/lib/email/styles";

type EmailShellProps = {
  preview: string;
  eyebrow: string;
  audience: "internal" | "subscriber";
  disclaimer?: string;
  children: ReactNode;
};

export function EmailShell({
  preview,
  eyebrow,
  audience,
  disclaimer,
  children,
}: EmailShellProps) {
  const isInternal = audience === "internal";

  return (
    <Html lang="en">
      <Head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- email clients require the font link in <Head>, not a Next.js page */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {!isInternal ? (
          <style>{emailSubscriberMobileStyles}</style>
        ) : (
          <style>{emailInternalMobileStyles}</style>
        )}
      </Head>
      <Preview>
        {preview}
        {PREVIEW_PADDING}
      </Preview>
      <Body style={emailLayout.canvas}>
        <Container style={emailLayout.card}>
          {isInternal ? (
            <EmailInternalMasthead eyebrow={eyebrow} />
          ) : (
            <EmailSubscriberMasthead eyebrow={eyebrow} />
          )}
          {children}
          {isInternal ? (
            <EmailInternalFooter disclaimer={disclaimer} />
          ) : (
            <EmailSubscriberFooter />
          )}
        </Container>
      </Body>
    </Html>
  );
}

export function EmailBody({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "subscriber" | "internal";
}) {
  const style =
    variant === "subscriber"
      ? emailLayout.subscriberBody
      : variant === "internal"
        ? emailLayout.internalBody
        : emailLayout.body;

  const className =
    variant === "subscriber"
      ? "email-body"
      : variant === "internal"
        ? "email-internal-body"
        : undefined;

  return (
    <Section className={className} style={style}>
      {children}
    </Section>
  );
}
