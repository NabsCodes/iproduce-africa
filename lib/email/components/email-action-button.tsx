import { Button, Section } from "@react-email/components";

import {
  emailColors,
  emailSansFamily,
  emailSubscriberClasses,
} from "@/lib/email/styles";

export function EmailActionButton({
  href,
  label,
  variant = "default",
}: {
  href: string;
  label: string;
  variant?: "default" | "subscriber" | "internal";
}) {
  const buttonStyle =
    variant === "internal"
      ? styles.internalButton
      : variant === "subscriber"
        ? styles.button
        : styles.button;

  return (
    <Section style={{ marginTop: "4px", marginBottom: "12px" }}>
      <Button
        href={href}
        className={
          variant === "internal" ? undefined : emailSubscriberClasses.cta
        }
        style={buttonStyle}
      >
        {label}
      </Button>
    </Section>
  );
}

const styles = {
  button: {
    backgroundColor: emailColors.accent,
    color: emailColors.accentContrast,
    padding: "13px 22px",
    borderRadius: "4px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: emailSansFamily,
    display: "inline-block",
  },
  internalButton: {
    backgroundColor: emailColors.card,
    color: emailColors.link,
    padding: "10px 16px",
    borderRadius: "4px",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: "600",
    fontFamily: emailSansFamily,
    display: "inline-block",
    border: `1px solid ${emailColors.border}`,
  },
};
