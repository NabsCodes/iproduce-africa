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

export type SiteConfig = {
  name: string;
  description: string;
  siteUrl: string;
  keywords: readonly string[];
  email: string;
  phone: string;
  hours: string;
  address: string;
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
