import { getEmailSiteUrl } from "@/lib/email/site-url";

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

function normalizeBase(url: string): string {
  return url.replace(/\/$/, "");
}

export function getEmailLogoUrl(): string {
  const explicitBase = process.env.EMAIL_ASSETS_BASE_URL?.trim();
  if (explicitBase) {
    return `${normalizeBase(explicitBase)}/brand/email-logo.png`;
  }

  const hasRuntimeOrigin =
    Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim()) ||
    Boolean(process.env.VERCEL_URL) ||
    Boolean(process.env.VERCEL_PROJECT_PRODUCTION_URL);

  if (!hasRuntimeOrigin) {
    // `pnpm email:dev` serves lib/email/previews/static/email-logo.png at this path.
    return "/static/email-logo.png";
  }

  return `${getEmailSiteUrl()}/brand/email-logo.png`;
}
