import { Img, Section, Text } from "@react-email/components";

import { siteConfig } from "@/content/site";
import { EMAIL_LOGO_SUBSCRIBER, getEmailLogoUrl } from "@/lib/email/assets";
import { emailColors, emailSansFamily } from "@/lib/email/styles";

export function EmailSubscriberMasthead({ eyebrow }: { eyebrow: string }) {
  return (
    <>
      <Section style={styles.logoBand} align="center">
        <Img
          src={getEmailLogoUrl()}
          alt={siteConfig.name}
          width={String(EMAIL_LOGO_SUBSCRIBER.width)}
          height={String(EMAIL_LOGO_SUBSCRIBER.height)}
          className="email-logo"
          style={{ display: "block", margin: "0 auto" }}
        />
      </Section>
      <Section
        className="email-masthead-hero"
        style={styles.heroBand}
        align="center"
      >
        <Text className="email-masthead-eyebrow" style={styles.eyebrow}>
          {eyebrow}
        </Text>
      </Section>
    </>
  );
}

const styles = {
  logoBand: {
    backgroundColor: emailColors.card,
    padding: "20px 22px 18px",
    textAlign: "center" as const,
    borderBottom: `1px solid ${emailColors.border}`,
  },
  heroBand: {
    backgroundColor: emailColors.masthead,
    padding: "12px 22px 14px",
    textAlign: "center" as const,
  },
  eyebrow: {
    margin: "0",
    color: emailColors.mastheadMuted,
    fontSize: "11px",
    fontWeight: "600",
    fontFamily: emailSansFamily,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    lineHeight: "1.4",
  },
};
