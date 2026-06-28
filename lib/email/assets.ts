export const EMAIL_LOGO_SOURCE = {
  width: 320,
  height: 142,
} as const;

function logoHeightForWidth(width: number): number {
  return Math.round(
    (EMAIL_LOGO_SOURCE.height / EMAIL_LOGO_SOURCE.width) * width,
  );
}

export const EMAIL_LOGO_SUBSCRIBER = {
  width: 176,
  height: logoHeightForWidth(176),
} as const;

export const EMAIL_LOGO_INTERNAL = {
  width: 148,
  height: logoHeightForWidth(148),
} as const;

export const EMAIL_LOGO_DISPLAY = EMAIL_LOGO_SUBSCRIBER;

export function getEmailLogoUrl(): string {
  const base =
    process.env.EMAIL_ASSETS_BASE_URL?.trim() ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, "")}`
      : "");

  return base
    ? `${base.replace(/\/$/, "")}/brand/email-logo.png`
    : "/static/email-logo.png";
}
