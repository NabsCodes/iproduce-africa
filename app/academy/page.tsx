import { AcademyHeroSection } from "@/components/academy/hub/academy-hero-section";
import { AcademyTabsSection } from "@/components/academy/hub/academy-tabs-section";
import { FeaturedEventSection } from "@/components/academy/hub/featured-event-section";
import { LearningListingSection } from "@/components/academy/hub/learning-listing-section";
import { LearningOpportunitiesSection } from "@/components/academy/hub/learning-opportunities-section";
import { TargetParticipantsSection } from "@/components/academy/hub/target-participants-section";
import { CtaSection } from "@/components/shared/cta-section";
import { FaqSection } from "@/components/shared/faq-section";
import { TestimonialsSection } from "@/components/shared/testimonials-section";
import { academyContent } from "@/content/academy";
import { webinarsContent } from "@/content/webinars";
import type { ContentCardTone } from "@/types/content";
import { pageSeo } from "@/content/seo";
import { isUpcomingSession } from "@/lib/academy-registration";
import { createPageMetadata } from "@/lib/metadata";
import {
  articleToHubShape,
  fetchArticlesListing,
} from "@/lib/sanity/fetch/articles";
import { fetchCoursesListing } from "@/lib/sanity/fetch/courses";
import {
  fetchFeaturedWebinar,
  fetchWebinarsListing,
} from "@/lib/sanity/fetch/webinars";
import type {
  AcademyArticleCategory,
  AcademyCourseLevel,
  AcademyScheduledType,
} from "@/types/academy";

export const metadata = createPageMetadata(pageSeo.academy);
export const revalidate = 3600;

const HUB_WEBINARS_LIMIT = 4;
const HUB_BLOG_LIMIT = 3;

const scheduledTypeToneMap: Record<AcademyScheduledType, ContentCardTone> = {
  WEBINAR: "tangerine",
  TRAINING: "tangerine",
  "LIVE Q&A": "leaf",
  EVENT: "tangerine",
};

const courseLevelToneMap: Record<AcademyCourseLevel, ContentCardTone> = {
  BEGINNER: "tangerine",
  INTERMEDIATE: "tangerine",
  ADVANCED: "forest",
};

const articleCategoryToneMap: Record<AcademyArticleCategory, ContentCardTone> =
  {
    INNOVATION: "forest",
    TRADE: "tangerine",
    "SMART AGRICULTURE": "leaf",
  };

const scheduledDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
});

function formatScheduledDate(iso: string) {
  return scheduledDateFormatter.format(new Date(iso)).toUpperCase();
}

export default async function AcademyPage() {
  const scheduled = academyContent.scheduled;
  const courses = academyContent.courses;
  const blog = academyContent.blog;
  const testimonials = academyContent.testimonials;
  const faqs = academyContent.faqs;

  // Single listing fetch per catalogue — hub bands + total-count labels both
  // derive from the same result instead of a second, overlapping request.
  const [allWebinars, allCourses, allArticles, featuredWebinar] =
    await Promise.all([
      fetchWebinarsListing(),
      fetchCoursesListing(),
      fetchArticlesListing(),
      fetchFeaturedWebinar(webinarsContent.featuredSlug),
    ]);

  const hubWebinars = allWebinars
    .filter((webinar) => isUpcomingSession(webinar.date))
    .slice(0, HUB_WEBINARS_LIMIT);
  // No cap — the hub has always shown every course (matches the prior
  // static `academyHubCourses`, which mapped the full catalogue unsliced).
  const hubCourses = allCourses;
  const hubArticles = allArticles
    .slice(0, HUB_BLOG_LIMIT)
    .map(articleToHubShape);

  const { eyebrow, sectionTitle, category, registerLabel } =
    academyContent.featuredEvent;
  const featuredEvent = featuredWebinar
    ? {
        slug: featuredWebinar.slug,
        eyebrow,
        sectionTitle,
        category,
        registerLabel,
        format: featuredWebinar.format ?? "Event",
        title: featuredWebinar.title,
        description: featuredWebinar.description,
        image: featuredWebinar.image,
        imageAlt: featuredWebinar.imageAlt ?? featuredWebinar.title,
        date: featuredWebinar.date,
        dateLabel: featuredWebinar.dateLabel ?? "",
        location: featuredWebinar.location ?? "",
        speakers: featuredWebinar.speakers ?? "",
      }
    : null;

  return (
    <>
      <AcademyHeroSection />
      <AcademyTabsSection />

      {featuredEvent && featuredWebinar ? (
        <FeaturedEventSection
          featured={featuredEvent}
          webinar={featuredWebinar}
        />
      ) : null}

      <LearningOpportunitiesSection />

      <TargetParticipantsSection />

      <LearningListingSection
        id="webinars-events"
        eyebrow={scheduled.eyebrow}
        title={scheduled.title}
        columns={4}
        items={hubWebinars.map((item) => ({
          href: `/academy/webinars/${item.slug}`,
          image: item.image,
          imageAlt: item.imageAlt,
          category: item.type,
          categoryTone: scheduledTypeToneMap[item.type],
          meta: formatScheduledDate(item.date),
          title: item.title,
          description: item.description,
        }))}
        viewMoreLabel={scheduled.viewMoreLabel}
        viewMoreHref="/academy/webinars"
        countLabel={`${hubWebinars.length} highlighted · ${allWebinars.length} in the full catalogue`}
        emptyState={scheduled.emptyState}
      />

      <LearningListingSection
        id="courses"
        eyebrow={courses.eyebrow}
        title={courses.title}
        columns={3}
        items={hubCourses.map((item) => ({
          href: `/academy/courses/${item.slug}`,
          image: item.image,
          imageAlt: item.imageAlt,
          category: item.level,
          categoryTone: courseLevelToneMap[item.level],
          meta: item.duration,
          title: item.title,
          description: item.description,
        }))}
        viewMoreLabel={courses.viewMoreLabel}
        viewMoreHref="/academy/courses"
        countLabel={`${hubCourses.length} highlighted · ${allCourses.length} in the full catalogue`}
        emptyState={courses.emptyState}
      />

      <LearningListingSection
        id="blog"
        eyebrow={blog.eyebrow}
        title={blog.title}
        columns={3}
        items={hubArticles.map((item) => ({
          href: `/academy/blog/${item.slug}`,
          image: item.image,
          imageAlt: item.imageAlt,
          category: item.category,
          categoryTone: articleCategoryToneMap[item.category],
          meta: item.readTime.toUpperCase(),
          title: item.title,
          description: item.description,
        }))}
        viewMoreLabel={blog.viewMoreLabel}
        viewMoreHref="/academy/blog"
        countLabel={`${hubArticles.length} highlighted · ${allArticles.length} in the full catalogue`}
        emptyState={blog.emptyState}
      />

      <TestimonialsSection
        eyebrow={testimonials.eyebrow}
        title={testimonials.title}
        description={testimonials.description}
        items={testimonials.items}
      />

      <FaqSection content={faqs} />

      <CtaSection overlapNext={false} />
    </>
  );
}
