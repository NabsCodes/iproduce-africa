import type { MetadataRoute } from "next";

export type SiteSocialLink = {
  label: string;
  platform: "facebook" | "instagram" | "youtube";
  href?: string;
};

export type SiteConfig = {
  name: string;
  description: string;
  siteUrl: string;
  keywords: readonly string[];
  email: string;
  phone: string;
  hours: string;
  socialLinks: readonly SiteSocialLink[];
};

export type SitemapRoute = {
  href: string;
  priority: number;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
};
