import { Link, Section, Text } from "@react-email/components";

import {
  emailColors,
  emailInternalClasses,
  emailSansFamily,
} from "@/lib/email/styles";

export type EmailDetailField = {
  label: string;
  value: string;
  href?: string;
};

export function EmailDetailSection({
  title,
  fields,
}: {
  title: string;
  fields: EmailDetailField[];
}) {
  return (
    <Section
      style={styles.section}
      className={emailInternalClasses.detailSection}
    >
      <Text style={styles.sectionTitle}>{title}</Text>
      <Section style={styles.card} className={emailInternalClasses.detailCard}>
        {fields.map((field, index) => (
          <Section
            key={field.label}
            style={{
              ...styles.row,
              ...(index < fields.length - 1 ? styles.rowBorder : {}),
            }}
            className={emailInternalClasses.detailRow}
          >
            <Text style={styles.label}>{field.label}</Text>
            {field.href ? (
              <Link href={field.href} style={styles.valueLink}>
                {field.value}
              </Link>
            ) : (
              <Text style={styles.value}>{field.value}</Text>
            )}
          </Section>
        ))}
      </Section>
    </Section>
  );
}

const styles = {
  section: {
    marginBottom: "16px",
  },
  sectionTitle: {
    margin: "0 0 8px",
    paddingLeft: "8px",
    borderLeft: `2px solid ${emailColors.mastheadAccent}`,
    color: emailColors.title,
    fontSize: "10px",
    fontWeight: "600",
    fontFamily: emailSansFamily,
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    lineHeight: "1.3",
  },
  card: {
    backgroundColor: emailColors.fieldBg,
    border: `1px solid ${emailColors.border}`,
    borderRadius: "4px",
    overflow: "hidden" as const,
  },
  row: {
    padding: "9px 12px",
  },
  rowBorder: {
    borderBottom: `1px solid ${emailColors.border}`,
  },
  label: {
    margin: "0 0 2px",
    color: emailColors.muted,
    fontSize: "10px",
    fontWeight: "600",
    fontFamily: emailSansFamily,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    lineHeight: "1.3",
  },
  value: {
    margin: "0",
    color: emailColors.title,
    fontSize: "13px",
    fontWeight: "500",
    fontFamily: emailSansFamily,
    lineHeight: "1.45",
    wordBreak: "break-word" as const,
  },
  valueLink: {
    color: emailColors.link,
    fontSize: "13px",
    fontWeight: "500",
    fontFamily: emailSansFamily,
    lineHeight: "1.45",
    textDecoration: "underline",
    wordBreak: "break-word" as const,
  },
};
