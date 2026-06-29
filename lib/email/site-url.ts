import { getSiteUrl } from "@/lib/metadata";

/** Absolute origin for links in sent mail (honours NEXT_PUBLIC_SITE_URL / Vercel). */
export function getEmailSiteUrl(): string {
  return getSiteUrl();
}
