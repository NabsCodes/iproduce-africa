import type { MetadataRoute } from "next";
import { blogContent } from "@/content/blog";
import { sitemapRoutes } from "@/content/seo";
import { getSiteUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const baseRoutes = sitemapRoutes.map((route) => ({
    url: `${siteUrl}${route.href}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogIndex = {
    url: `${siteUrl}/academy/blog`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  };

  const trackListings = ["/academy/webinars", "/academy/courses"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  );

  const blogArticles = blogContent.articles.map((article) => ({
    url: `${siteUrl}/academy/blog/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...baseRoutes, ...trackListings, blogIndex, ...blogArticles];
}
