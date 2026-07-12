/**
 * Shared by `lib/sanity/fetch/testimonials.ts` and
 * `lib/sanity/fetch/member-stories.ts` — both have an optional Studio
 * `initials` field with a required text-avatar fallback derived from
 * `name` when blank.
 */

/** First + last word initials (e.g. "Aïssatou Diallo" → "AD"); single-word
 * names fall back to their first two letters. */
export function initialsFromName(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}
