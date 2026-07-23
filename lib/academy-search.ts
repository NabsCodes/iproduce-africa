import { courseToCardItem } from "@/content/courses";
import { webinarToCardItem } from "@/content/webinars";
import type { AcademyCourseDetail, AcademyWebinar } from "@/types/academy";
import type { BlogArticle } from "@/types/blog";
import type { ContentCardTone } from "@/types/content";

export type AcademySearchResultKind = "webinar" | "course" | "article";

export type AcademySearchResult = {
  kind: AcademySearchResultKind;
  slug: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  category: string;
  categoryTone: ContentCardTone;
  meta?: string;
};

function matches(haystack: string, query: string) {
  return haystack.toLowerCase().includes(query.toLowerCase());
}

export type AcademySearchCatalogues = {
  webinars: readonly AcademyWebinar[];
  courses: readonly AcademyCourseDetail[];
  articles: readonly BlogArticle[];
};

export function searchAcademy(
  rawQuery: string,
  catalogues: AcademySearchCatalogues,
): AcademySearchResult[] {
  const query = rawQuery.trim();
  if (!query) return [];

  const results: AcademySearchResult[] = [];

  for (const webinar of catalogues.webinars) {
    const haystack = [
      webinar.title,
      webinar.description,
      webinar.excerpt,
      webinar.category.name,
      webinar.location ?? "",
      webinar.speakers ?? "",
    ].join(" ");

    if (!matches(haystack, query)) continue;

    const card = webinarToCardItem(webinar);

    results.push({
      kind: "webinar",
      slug: webinar.slug,
      title: webinar.title,
      description: webinar.excerpt,
      href: card.href,
      image: card.image,
      imageAlt: card.imageAlt ?? webinar.title,
      category: card.category,
      categoryTone: card.categoryTone,
      meta: card.meta,
    });
  }

  for (const course of catalogues.courses) {
    const haystack = [
      course.title,
      course.description,
      course.excerpt,
      course.level,
      course.duration,
      ...course.modules,
    ].join(" ");

    if (!matches(haystack, query)) continue;

    const card = courseToCardItem(course);

    results.push({
      kind: "course",
      slug: course.slug,
      title: course.title,
      description: course.excerpt,
      href: card.href,
      image: card.image,
      imageAlt: card.imageAlt ?? course.title,
      category: card.category,
      categoryTone: card.categoryTone,
      meta: card.meta,
    });
  }

  for (const article of catalogues.articles) {
    const haystack = [
      article.title,
      article.excerpt,
      article.category.name,
    ].join(" ");

    if (!matches(haystack, query)) continue;

    results.push({
      kind: "article",
      slug: article.slug,
      title: article.title,
      description: article.excerpt,
      href: `/academy/blog/${article.slug}`,
      image: article.cardImage,
      imageAlt: article.cardImageAlt,
      category: article.category.name.toUpperCase(),
      categoryTone: article.category.tone,
      meta: `${article.readTimeMinutes} MIN READ`,
    });
  }

  return results;
}
