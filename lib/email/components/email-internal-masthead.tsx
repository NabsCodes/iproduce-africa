import { Img, Section, Text } from "@react-email/components";

import { siteConfig } from "@/content/site";
import { EMAIL_LOGO_INTERNAL, getEmailLogoUrl } from "@/lib/email/assets";
import {
  emailColors,
  emailInternalClasses,
  emailSansFamily,
} from "@/lib/email/styles";

export function EmailInternalMasthead({ eyebrow }: { eyebrow: string }) {
  return (
    <>
      <Section
        style={styles.logoBand}
        align="center"
        className={emailInternalClasses.logoBand}
      >
        <Img
          src={getEmailLogoUrl()}
          alt={siteConfig.name}
          width={String(EMAIL_LOGO_INTERNAL.width)}
          height={String(EMAIL_LOGO_INTERNAL.height)}
          className={emailInternalClasses.logo}
          style={{ display: "block", margin: "0 auto" }}
        />
      </Section>
      <Section
        style={styles.opsBand}
        align="left"
        className={emailInternalClasses.opsBand}
      >
        <Text style={styles.eyebrow}>{eyebrow}</Text>
      </Section>
    </>
  );
}

const styles = {
  logoBand: {
    backgroundColor: emailColors.card,
    padding: "18px 20px 16px",
    textAlign: "center" as const,
    borderBottom: `1px solid ${emailColors.border}`,
  },
  opsBand: {
    backgroundColor: emailColors.fieldBg,
    borderBottom: `1px solid ${emailColors.border}`,
    padding: "10px 18px 11px",
  },
  eyebrow: {
    margin: "0",
    paddingLeft: "10px",
    borderLeft: `2px solid ${emailColors.mastheadAccent}`,
    color: emailColors.muted,
    fontSize: "11px",
    fontWeight: "600",
    fontFamily: emailSansFamily,
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    lineHeight: "1.35",
  },
};
