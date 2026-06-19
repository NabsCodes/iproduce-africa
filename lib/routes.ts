export function isInternalRoute(href: string) {
  return (
    href.startsWith("/") &&
    !href.startsWith("//") &&
    !href.startsWith("mailto:") &&
    !href.startsWith("tel:")
  );
}

export const COMMUNITY_MEMBERSHIP_HASH = "#membership-application";
export const COMMUNITY_MEMBERSHIP_HREF = `/community${COMMUNITY_MEMBERSHIP_HASH}`;

export function isCommunityMembershipHref(href: string) {
  return (
    href === COMMUNITY_MEMBERSHIP_HREF || href === COMMUNITY_MEMBERSHIP_HASH
  );
}
