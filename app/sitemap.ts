import type { MetadataRoute } from "next";
import { blogContent } from "@/content/blog";
import { coursesContent } from "@/content/courses";
import { webinarsContent } from "@/content/webinars";
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

  const listingRoutes = ["/academy/webinars", "/academy/courses"].map(
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

  const webinarPages = webinarsContent.webinars.map((webinar) => ({
    url: `${siteUrl}/academy/webinars/${webinar.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const coursePages = coursesContent.courses.map((course) => ({
    url: `${siteUrl}/academy/courses/${course.slug}`,
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
