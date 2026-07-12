import { Link, Section, Text } from "@react-email/components";

import { siteConfig } from "@/content/site";
import { getEmailSiteUrl } from "@/lib/email/site-url";
import { emailColors, emailSansFamily } from "@/lib/email/styles";

export function EmailSubscriberFooter() {
  const year = new Date().getFullYear();
  const siteUrl = getEmailSiteUrl();
  const siteHost = siteUrl.replace(/^https?:\/\//, "");
  const exploreLinks = [
    { label: "Academy", href: `${siteUrl}/academy` },
    { label: "Community", href: `${siteUrl}/community` },
    { label: "Partners", href: `${siteUrl}/partners` },
  ] as const;

  return (
    <Section className="email-footer" style={styles.footer} align="center">
      <Text className="email-footer-links" style={styles.links}>
        {exploreLinks.map((item, index) => (
          <span key={item.href}>
            {index > 0 ? " · " : null}
            <Link
              href={item.href}
              className="email-footer-link"
              style={styles.link}
            >
              {item.label}
            </Link>
          </span>
        ))}
      </Text>
      <Text style={styles.siteLine}>
        <Link
          href={siteUrl}
          className="email-footer-site"
          style={styles.siteLink}
        >
          {siteHost}
        </Link>
      </Text>
      <Text className="email-footer-copy" style={styles.copyright}>
        © {year} {siteConfig.name}. All rights reserved.
      </Text>
    </Section>
  );
}

const styles = {
  footer: {
    backgroundColor: emailColors.masthead,
    padding: "20px 22px 22px",
    textAlign: "center" as const,
    borderTop: `1px solid rgba(255,255,255,0.08)`,
  },
  links: {
    margin: "0 auto 12px",
    color: emailColors.footerText,
    fontSize: "14px",
    fontFamily: emailSansFamily,
    lineHeight: "1.6",
    textAlign: "center" as const,
  },
  link: {
    color: emailColors.footerText,
    textDecoration: "underline",
    fontWeight: "500",
  },
  siteLine: {
    margin: "0 auto 8px",
    textAlign: "center" as const,
  },
  siteLink: {
    color: emailColors.footerSite,
    fontSize: "13px",
    fontFamily: emailSansFamily,
    textDecoration: "none",
  },
  copyright: {
    margin: "0 auto",
    color: emailColors.footerCopy,
    fontSize: "11px",
    fontFamily: emailSansFamily,
    lineHeight: "1.5",
    textAlign: "center" as const,
  },
};
