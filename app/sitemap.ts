import type { MetadataRoute } from "next";
import { sitemapRoutes } from "@/content/seo";
import { getSiteUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return sitemapRoutes.map((route) => ({
    url: `${siteUrl}${route.href}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
