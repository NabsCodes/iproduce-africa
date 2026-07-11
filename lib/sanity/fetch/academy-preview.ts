import { fetchHubArticles } from "@/lib/sanity/fetch/articles";
import { fetchHubCourses } from "@/lib/sanity/fetch/courses";
import { fetchHubScheduledWebinars } from "@/lib/sanity/fetch/webinars";
import type {
  AcademyArticle,
  AcademyArticleCategory,
  AcademyCourse,
  AcademyHomeCard,
  AcademyHomePreview,
  AcademyPreviewTone,
  AcademyWebinar,
} from "@/types/academy";

const HOME_SPOTLIGHT_LIMIT = 4;
const HOME_BLOG_LIMIT = 3;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
});

function formatShortDate(iso: string) {
  return dateFormatter.format(new Date(iso)).toUpperCase();
}

const articleToneByCategory: Record<
  AcademyArticleCategory,
  AcademyPreviewTone
> = {
  INNOVATION: "forest",
  TRADE: "tangerine",
  "SMART AGRICULTURE": "leaf",
};

function webinarToHomeCard(webinar: AcademyWebinar): AcademyHomeCard {
  return {
    key: webinar.slug,
    href: `/academy/webinars/${webinar.slug}`,
    image: webinar.image,
    imageAlt: webinar.imageAlt,
    category: webinar.type,
    meta: formatShortDate(webinar.date),
    title: webinar.title,
    description: webinar.description,
  };
}

function courseToHomeCard(course: AcademyCourse): AcademyHomeCard {
  return {
    key: course.slug,
    href: `/academy/courses/${course.slug}`,
    image: course.image,
    imageAlt: course.imageAlt,
    category: course.level,
    meta: course.duration,
    title: course.title,
    description: course.description,
  };
}

function articleToHomeCard(article: AcademyArticle): AcademyHomeCard {
  return {
    key: article.slug,
    href: `/academy/blog/${article.slug}`,
    image: article.image,
    imageAlt: article.imageAlt,
    category: article.category,
    categoryTone: articleToneByCategory[article.category],
    meta: article.readTime.toUpperCase(),
    title: article.title,
    description: article.description,
  };
}

/**
 * Composes the catalogue-derived slices of `AcademyHomePreview` from Sanity —
 * `opportunities` and `spotlightEmptyState` stay code-owned in
 * `content/academy.ts` and are merged in by the caller (`app/page.tsx`).
 * Reuses the already-tested hub fetch functions from the webinars/courses/
 * articles fetch modules — no new GROQ queries, only the display-shape
 * mapping is new here.
 */
export async function fetchHomeAcademyPreview(): Promise<
  Pick<AcademyHomePreview, "spotlight" | "blog">
> {
  const [upcomingWebinars, courses, articles] = await Promise.all([
    fetchHubScheduledWebinars(HOME_SPOTLIGHT_LIMIT),
    fetchHubCourses(HOME_SPOTLIGHT_LIMIT),
    fetchHubArticles(HOME_BLOG_LIMIT),
  ]);

  return {
    spotlight: {
      upcoming: upcomingWebinars.map(webinarToHomeCard),
      training: courses.map(courseToHomeCard),
    },
    blog: articles.map(articleToHomeCard),
  };
}
