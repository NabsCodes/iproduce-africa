/**
 * Single source of truth for `teamMember.socials[].platform` — shared by
 * the Studio schema (`sanity/schemaTypes/documents/team-member.ts`, for
 * authoring-time `options.list`) and the fetch layer
 * (`lib/sanity/fetch/team-members.ts`, for defensive filtering), same
 * reasoning as `lib/sanity/faq-categories.ts`: Studio's `options.list` only
 * constrains authoring, not a direct API write.
 */

export const SOCIAL_PLATFORM_OPTIONS = [
  { title: "LinkedIn", value: "linkedin" },
  { title: "Facebook", value: "facebook" },
  { title: "X", value: "x" },
  { title: "Instagram", value: "instagram" },
  { title: "Telegram", value: "telegram" },
  { title: "Website", value: "website" },
  { title: "Email", value: "email" },
  { title: "Phone", value: "phone" },
];

export const KNOWN_SOCIAL_PLATFORMS: readonly string[] =
  SOCIAL_PLATFORM_OPTIONS.map((option) => option.value);

/** Platforms whose `value` is an external link — everything except
 * `email`/`phone`. */
const URL_PLATFORMS = new Set(
  KNOWN_SOCIAL_PLATFORMS.filter(
    (platform) => platform !== "email" && platform !== "phone",
  ),
);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d][\d\s()-]{5,}$/;

/**
 * Shared by the schema's per-field `Rule.custom` (authoring-time) and the
 * fetch layer (defensive, since Studio validation can be bypassed by a
 * direct API write). `PersonSocialLinks` renders link-type socials through
 * `next/link`'s `<Link>`, which treats any href without a `http(s)://`
 * scheme as an internal route — a bare domain like `linkedin.com/person`
 * would silently become a same-origin path instead of an external link.
 */
export function isValidSocialValue(platform: string, value: string): boolean {
  if (platform === "email") return EMAIL_PATTERN.test(value);
  if (platform === "phone") return PHONE_PATTERN.test(value);
  if (URL_PLATFORMS.has(platform)) {
    try {
      const url = new URL(value);
      return (
        (url.protocol === "http:" || url.protocol === "https:") &&
        url.hostname.length > 0
      );
    } catch {
      return false;
    }
  }
  return false;
}
