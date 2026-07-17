import { siteConfig } from "@/content/site";
import { getSiteUrl } from "@/lib/metadata";
import type { AcademyCourseDetail } from "@/types/academy";
import type { BlogArticle } from "@/types/blog";

function absoluteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, `${getSiteUrl()}/`).toString();
}

const publisher = {
  "@type": "Organization",
  name: siteConfig.name,
  url: absoluteUrl("/"),
};

export function createBlogPostingStructuredData(article: BlogArticle) {
  const image = article.seo?.image ?? article.heroImage ?? article.cardImage;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.seo?.title ?? article.title,
    description: article.seo?.description ?? article.excerpt,
    image: [absoluteUrl(image)],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
    },
    publisher,
    mainEntityOfPage: absoluteUrl(`/academy/blog/${article.slug}`),
  };
}

export function createCourseStructuredData(course: AcademyCourseDetail) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.seo?.title ?? course.title,
    description: course.seo?.description ?? course.excerpt,
    provider: publisher,
    url: absoluteUrl(`/academy/courses/${course.slug}`),
  };
}

export function createCourseListStructuredData(
  courses: readonly AcademyCourseDetail[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: courses.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/academy/courses/${course.slug}`),
      item: {
        "@type": "Course",
        name: course.seo?.title ?? course.title,
        description: course.seo?.description ?? course.excerpt,
        provider: publisher,
      },
    })),
  };
}
