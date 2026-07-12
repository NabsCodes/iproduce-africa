import type { MetadataRoute } from "next";

import { sitemapRoutes } from "@/content/seo";
import { getSiteUrl } from "@/lib/metadata";
import { fetchArticleSitemapEntries } from "@/lib/sanity/fetch/articles";
import { fetchCourseSlugs } from "@/lib/sanity/fetch/courses";
import { fetchWebinarSlugs } from "@/lib/sanity/fetch/webinars";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  // Narrow projections/slug fetchers only — the sitemap doesn't need full
  // article bodies, images, or registration data, just slugs (+ publishedAt
  // for articles' per-item lastModified).
  const [articles, webinarSlugs, courseSlugs] = await Promise.all([
    fetchArticleSitemapEntries(),
    fetchWebinarSlugs(),
    fetchCourseSlugs(),
  ]);

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

  const listingRoutes = ["/academy/webinars", "/academy/courses"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  );

  const blogArticles = articles.map((article) => ({
    url: `${siteUrl}/academy/blog/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const webinarPages = webinarSlugs.map((slug) => ({
    url: `${siteUrl}/academy/webinars/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const coursePages = courseSlugs.map((slug) => ({
    url: `${siteUrl}/academy/courses/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...baseRoutes,
    ...listingRoutes,
    blogIndex,
    ...blogArticles,
    ...webinarPages,
    ...coursePages,
  ];
}
