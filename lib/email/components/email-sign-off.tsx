import { Section, Text } from "@react-email/components";

import { siteConfig } from "@/content/site";
import {
  emailColors,
  emailFontFamily,
  emailSansFamily,
} from "@/lib/email/styles";

export function EmailSignOff({
  variant = "default",
}: {
  variant?: "default" | "subscriber";
}) {
  const isSubscriber = variant === "subscriber";

  return (
    <Section
      style={
        isSubscriber
          ? {
              marginTop: "4px",
              paddingTop: "20px",
              borderTop: `1px solid ${emailColors.border}`,
            }
          : { marginTop: "8px", paddingTop: "8px" }
      }
    >
      <Text style={styles.line}>Warm regards,</Text>
      <Text style={styles.team}>The {siteConfig.name} team</Text>
    </Section>
  );
}

const styles = {
  line: {
    margin: "0 0 4px",
    color: emailColors.body,
    fontSize: "15px",
    lineHeight: "1.6",
    fontFamily: emailSansFamily,
  },
  team: {
    margin: "0",
    color: emailColors.title,
    fontSize: "16px",
    fontWeight: "600",
    fontFamily: emailFontFamily,
    lineHeight: "1.4",
  },
};
