import type { MetadataRoute } from "next";

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  siteUrl: string;
  keywords: readonly string[];
  email: string;
  phone: string;
};

export type SitemapRoute = {
  href: string;
  priority: number;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
};
