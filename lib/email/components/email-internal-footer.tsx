import { Link, Section, Text } from "@react-email/components";

import { siteConfig } from "@/content/site";
import { getEmailSiteUrl } from "@/lib/email/site-url";
import { emailColors, emailSansFamily } from "@/lib/email/styles";

export function EmailInternalFooter({ disclaimer }: { disclaimer?: string }) {
  const year = new Date().getFullYear();
  const siteUrl = getEmailSiteUrl();
  const siteHost = siteUrl.replace(/^https?:\/\//, "");

  return (
    <Section
      className="email-internal-footer"
      style={styles.footer}
      align="center"
    >
      <Text className="email-internal-footer-line" style={styles.line}>
        {siteConfig.name} ·{" "}
        <Link
          href={siteUrl}
          className="email-internal-footer-link"
          style={styles.link}
        >
          {siteHost}
        </Link>
      </Text>
      <Text className="email-internal-footer-copy" style={styles.copyright}>
        © {year} {siteConfig.name}. Internal use only.
      </Text>
      {disclaimer ? (
        <Text
          className="email-internal-footer-disclaimer"
          style={styles.disclaimer}
        >
          {disclaimer}
        </Text>
      ) : null}
    </Section>
  );
}

const styles = {
  footer: {
    backgroundColor: emailColors.fieldBg,
    borderTop: `1px solid ${emailColors.border}`,
    padding: "12px 18px 14px",
    textAlign: "center" as const,
  },
  line: {
    margin: "0 0 4px",
    color: emailColors.muted,
    fontSize: "12px",
    fontFamily: emailSansFamily,
    lineHeight: "1.5",
  },
  copyright: {
    margin: "0",
    color: emailColors.subtle,
    fontSize: "11px",
    fontFamily: emailSansFamily,
    lineHeight: "1.5",
  },
  disclaimer: {
    margin: "12px 0 0",
    color: emailColors.muted,
    fontSize: "11px",
    fontFamily: emailSansFamily,
    lineHeight: "1.5",
  },
  link: {
    color: emailColors.link,
    textDecoration: "none",
  },
};
