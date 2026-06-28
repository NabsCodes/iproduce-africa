import { Section, Text } from "@react-email/components";

import {
  emailColors,
  emailInternalClasses,
  emailSansFamily,
} from "@/lib/email/styles";

export function EmailQuoteBlock({
  label,
  children,
}: {
  label: string;
  children: string;
}) {
  return (
    <Section
      style={{ marginBottom: "16px" }}
      className={emailInternalClasses.quote}
    >
      <Text style={styles.label}>{label}</Text>
      <Section style={styles.box} className={emailInternalClasses.quoteBox}>
        <Text style={styles.text}>{children}</Text>
      </Section>
    </Section>
  );
}

const styles = {
  label: {
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
  box: {
    backgroundColor: emailColors.fieldBg,
    border: `1px solid ${emailColors.border}`,
    padding: "11px 12px",
    borderRadius: "4px",
  },
  text: {
    margin: "0",
    color: emailColors.title,
    fontSize: "13px",
    lineHeight: "1.55",
    fontFamily: emailSansFamily,
    whiteSpace: "pre-line" as const,
  },
};
