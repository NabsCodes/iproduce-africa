import type { MetadataRoute } from "next";

export type SiteSocialLink = {
  label: string;
  platform: "facebook" | "instagram" | "linkedin" | "youtube";
  href?: string;
};

export type SiteLinkItem = {
  label: string;
  href?: string;
};

export type SiteFooterLinkGroup = {
  title: string;
  links: readonly SiteLinkItem[];
};

export type SiteFooterConfig = {
  description: string;
  linkGroups: readonly SiteFooterLinkGroup[];
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    submitLabel: string;
    submittingLabel: string;
    successMessage: string;
    repeatSubmissionMessage: string;
    subscribeAgainLabel: string;
    resubscribePrompt: string;
    resubscribeLabel: string;
    resubscribeHref: string;
  };
  legalLinks: readonly SiteLinkItem[];
};

/**
 * The standalone iProduce LMS. Defined once so the header and mobile menu
 * never repeat the URL, and the canonical subdomain swap is a one-line change.
 */
export type SiteLearningPlatformConfig = {
  label: string;
  href: string;
  /** Accessible name that communicates destination and new-tab behavior. */
  accessibleLabel: string;
};

export type SiteConfig = {
  name: string;
  description: string;
  siteUrl: string;
  keywords: readonly string[];
  email: string;
  phone: string;
  hours: string;
  address: string;
  learningPlatform: SiteLearningPlatformConfig;
  socialLinks: readonly SiteSocialLink[];
  footer: SiteFooterConfig;
};

export type SitemapRoute = {
  href: string;
  priority: number;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
};
