import { Section, Text } from "@react-email/components";

import {
  emailColors,
  emailFontFamily,
  emailSansFamily,
  emailSubscriberClasses,
} from "@/lib/email/styles";

export function EmailHighlightCard({
  label,
  value,
  variant = "default",
}: {
  label: string;
  value: string;
  variant?: "default" | "subscriber";
}) {
  const useMobileClass = variant === "subscriber";

  return (
    <Section style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text
        className={
          useMobileClass ? emailSubscriberClasses.highlightValue : undefined
        }
        style={styles.value}
      >
        {value}
      </Text>
    </Section>
  );
}

const styles = {
  card: {
    margin: "0 0 24px",
    padding: "16px 18px",
    backgroundColor: emailColors.highlightBg,
    border: `1px solid ${emailColors.highlightBorder}`,
    borderRadius: "4px",
  },
  label: {
    margin: "0 0 6px",
    color: emailColors.muted,
    fontSize: "10px",
    fontWeight: "600",
    fontFamily: emailSansFamily,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
  },
  value: {
    margin: "0",
    color: emailColors.title,
    fontSize: "18px",
    fontWeight: "600",
    fontFamily: emailFontFamily,
    lineHeight: "1.35",
    wordBreak: "break-word" as const,
  },
};
