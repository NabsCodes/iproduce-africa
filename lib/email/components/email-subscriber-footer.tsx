import { Link, Section, Text } from "@react-email/components";

import { siteConfig } from "@/content/site";
import { emailColors, emailSansFamily } from "@/lib/email/styles";

const exploreLinks = [
  { label: "Academy", href: `${siteConfig.siteUrl}/academy` },
  { label: "Community", href: `${siteConfig.siteUrl}/community` },
  { label: "Partners", href: `${siteConfig.siteUrl}/partners` },
] as const;

export function EmailSubscriberFooter() {
  const year = new Date().getFullYear();
  const siteHost = siteConfig.siteUrl.replace(/^https?:\/\//, "");

  return (
    <Section style={styles.footer} align="center">
      <Text style={styles.links}>
        {exploreLinks.map((item, index) => (
          <span key={item.href}>
            {index > 0 ? " · " : null}
            <Link href={item.href} style={styles.link}>
              {item.label}
            </Link>
          </span>
        ))}
      </Text>
      <Text style={styles.siteLine}>
        <Link href={siteConfig.siteUrl} style={styles.siteLink}>
          {siteHost}
        </Link>
      </Text>
      <Text style={styles.copyright}>
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
    color: emailColors.mastheadText,
    fontSize: "14px",
    fontFamily: emailSansFamily,
    lineHeight: "1.6",
    textAlign: "center" as const,
  },
  link: {
    color: emailColors.mastheadText,
    textDecoration: "underline",
    fontWeight: "500",
  },
  siteLine: {
    margin: "0 auto 8px",
    textAlign: "center" as const,
  },
  siteLink: {
    color: "rgba(255,255,255,0.85)",
    fontSize: "13px",
    fontFamily: emailSansFamily,
    textDecoration: "none",
  },
  copyright: {
    margin: "0 auto",
    color: "rgba(255,255,255,0.55)",
    fontSize: "11px",
    fontFamily: emailSansFamily,
    lineHeight: "1.5",
    textAlign: "center" as const,
  },
};
