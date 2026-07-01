import type {
  AboutPersonSocial,
  AboutPersonSocialPlatform,
} from "@/types/about";

const linkPlatformOrder: readonly AboutPersonSocialPlatform[] = [
  "linkedin",
  "facebook",
  "x",
  "instagram",
  "telegram",
  "website",
];

export function getAboutPersonSocialHref(social: AboutPersonSocial): string {
  switch (social.platform) {
    case "email":
      return `mailto:${social.value}`;
    case "phone":
      return `tel:${social.value.replace(/\s/g, "")}`;
    default:
      return social.value;
  }
}

export function getAboutPersonSocialAriaLabel(
  social: AboutPersonSocial,
  personName: string,
): string {
  if (social.label) {
    return social.label;
  }

  switch (social.platform) {
    case "linkedin":
      return `${personName} on LinkedIn`;
    case "facebook":
      return `${personName} on Facebook`;
    case "x":
      return `${personName} on X`;
    case "instagram":
      return `${personName} on Instagram`;
    case "telegram":
      return `${personName} on Telegram`;
    case "website":
      return `${personName} website`;
    case "email":
      return `Email ${personName} at ${social.value}`;
    case "phone":
      return `Call ${personName} at ${social.value}`;
    default:
      return `${personName} contact`;
  }
}

export function getAboutPersonLinkSocials(
  socials: readonly AboutPersonSocial[] | undefined,
): AboutPersonSocial[] {
  if (!socials?.length) {
    return [];
  }

  return socials.filter(
    (social) => social.platform !== "email" && social.platform !== "phone",
  );
}

export function sortAboutPersonLinkSocials(
  socials: readonly AboutPersonSocial[],
): AboutPersonSocial[] {
  return [...socials].sort(
    (left, right) =>
      linkPlatformOrder.indexOf(left.platform) -
      linkPlatformOrder.indexOf(right.platform),
  );
}

/** Link socials for cards — email/phone excluded; capped by priority (default 2). */
export function getAboutPersonCardSocials(
  socials: readonly AboutPersonSocial[] | undefined,
  { limit = 2 }: { limit?: number } = {},
): AboutPersonSocial[] {
  return sortAboutPersonLinkSocials(getAboutPersonLinkSocials(socials)).slice(
    0,
    limit,
  );
}
