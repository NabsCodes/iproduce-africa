export const emailColors = {
  canvas: "#f0efec",
  card: "#ffffff",
  masthead: "#0f1e02",
  mastheadAccent: "#ed7a3b",
  mastheadMuted: "#c8e39a",
  mastheadText: "#ffffff",
  title: "#0f1e02",
  body: "#43413e",
  muted: "#6f6c66",
  subtle: "#8a8780",
  border: "#e4e3df",
  fieldBg: "#f8f8f7",
  quoteBg: "#f4fae9",
  quoteBorder: "#548330",
  highlightBorder: "#dce8de",
  highlightBg: "#f4fae9",
  accent: "#548330",
  accentContrast: "#ffffff",
  link: "#43612a",
  footerBg: "#eef2ec",
  stepNumber: "#548330",
} as const;

export const emailFontFamily =
  "'Fraunces', Georgia, 'Times New Roman', Times, serif";

export const emailSansFamily =
  "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

export const emailLayout = {
  canvas: {
    margin: "0",
    padding: "32px 16px",
    backgroundColor: emailColors.canvas,
    fontFamily: emailSansFamily,
  },
  card: {
    maxWidth: "560px",
    width: "100%",
    margin: "0 auto",
    backgroundColor: emailColors.card,
    borderRadius: "4px",
    overflow: "hidden" as const,
    border: `1px solid ${emailColors.border}`,
  },
  body: {
    padding: "32px 28px 36px",
    backgroundColor: emailColors.card,
  },
  subscriberBody: {
    padding: "28px 22px 32px",
    backgroundColor: emailColors.card,
  },
  internalBody: {
    padding: "20px 18px 24px",
    backgroundColor: emailColors.card,
  },
} as const;

export const emailType = {
  display: {
    margin: "0 0 12px",
    color: emailColors.title,
    fontSize: "30px",
    fontWeight: "600",
    fontFamily: emailFontFamily,
    letterSpacing: "-0.03em",
    lineHeight: "1.12",
  },
  lead: {
    margin: "0 0 28px",
    color: emailColors.body,
    fontSize: "16px",
    lineHeight: "1.65",
    fontFamily: emailSansFamily,
  },
  sectionTitle: {
    margin: "0 0 14px",
    color: emailColors.title,
    fontSize: "13px",
    fontWeight: "600",
    fontFamily: emailSansFamily,
    letterSpacing: "0.04em",
    textTransform: "uppercase" as const,
  },
} as const;

export const emailInternalType = {
  display: {
    margin: "0 0 6px",
    color: emailColors.title,
    fontSize: "20px",
    fontWeight: "600",
    fontFamily: emailFontFamily,
    letterSpacing: "-0.02em",
    lineHeight: "1.22",
  },
  lead: {
    margin: "0 0 16px",
    color: emailColors.body,
    fontSize: "13px",
    lineHeight: "1.5",
    fontFamily: emailSansFamily,
  },
} as const;

export const emailInternalClasses = {
  body: "email-internal-body",
  display: "email-internal-display",
  lead: "email-internal-lead",
  logo: "email-internal-logo",
  logoBand: "email-internal-logo-band",
  opsBand: "email-internal-ops-band",
  detailSection: "email-internal-detail-section",
  detailCard: "email-internal-detail-card",
  detailRow: "email-internal-detail-row",
  quote: "email-internal-quote",
  quoteBox: "email-internal-quote-box",
} as const;

export const emailInternalMobileStyles = `
  @media only screen and (max-width: 480px) {
    .email-internal-logo-band { padding: 16px 18px 14px !important; }
    .email-internal-ops-band { padding: 9px 16px 10px !important; }
    .email-internal-body { padding: 18px 16px 22px !important; }
    .email-internal-display { font-size: 18px !important; line-height: 1.28 !important; }
    .email-internal-lead { font-size: 13px !important; margin-bottom: 14px !important; }
    .email-internal-logo { width: 136px !important; height: auto !important; }
    .email-internal-detail-section { margin-bottom: 14px !important; }
    .email-internal-detail-row { padding: 8px 10px !important; }
    .email-internal-quote { margin-bottom: 14px !important; }
    .email-internal-quote-box { padding: 10px !important; }
  }
`;

export const emailSubscriberType = {
  display: {
    margin: "0 0 10px",
    color: emailColors.title,
    fontSize: "26px",
    fontWeight: "600",
    fontFamily: emailFontFamily,
    letterSpacing: "-0.03em",
    lineHeight: "1.18",
  },
  lead: {
    margin: "0 0 24px",
    color: emailColors.body,
    fontSize: "15px",
    lineHeight: "1.6",
    fontFamily: emailSansFamily,
  },
  muted: {
    margin: "0 0 24px",
    color: emailColors.subtle,
    fontSize: "13px",
    lineHeight: "1.5",
    fontFamily: emailSansFamily,
  },
} as const;

export const emailSubscriberClasses = {
  body: "email-body",
  display: "email-display",
  lead: "email-lead",
  highlightValue: "email-highlight-value",
  cta: "email-cta",
} as const;

export const emailSubscriberMobileStyles = `
  @media only screen and (max-width: 480px) {
    .email-body { padding: 24px 18px 28px !important; }
    .email-display { font-size: 24px !important; line-height: 1.22 !important; }
    .email-lead { font-size: 15px !important; margin-bottom: 20px !important; }
    .email-highlight-value { font-size: 17px !important; line-height: 1.35 !important; }
    .email-cta {
      display: block !important;
      width: 100% !important;
      max-width: 100% !important;
      text-align: center !important;
      box-sizing: border-box !important;
      padding: 14px 18px !important;
    }
    .email-logo { width: 152px !important; height: auto !important; }
  }
`;

// Use a simple non-breaking space character to pad the preview text.
// This improves email client compatibility and avoids invisible Unicode issues.
export const PREVIEW_PADDING = "\u00A0".repeat(80);
