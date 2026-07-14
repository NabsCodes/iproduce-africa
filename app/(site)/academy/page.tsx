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
import { pageSeo } from "@/content/seo";
import {
  formatAcademyCardMetaDate,
  resolveAcademyDateLabel,
} from "@/lib/academy-dates";
import {
  academyNowIso,
  academyWebinarDisplayState,
  selectPromotableWebinars,
} from "@/lib/academy-webinars";
import { createPageMetadata } from "@/lib/metadata";
import {
  articleToHubShape,
  fetchArticlesListing,
} from "@/lib/sanity/fetch/articles";
import { fetchCoursesListing } from "@/lib/sanity/fetch/courses";
import { fetchFaqs } from "@/lib/sanity/fetch/faqs";
import { fetchTestimonials } from "@/lib/sanity/fetch/testimonials";
import { fetchWebinarsListing } from "@/lib/sanity/fetch/webinars";
import type {
  AcademyArticleCategory,
  AcademyCourseLevel,
  AcademyScheduledType,
} from "@/types/academy";
import type { ContentCardTone } from "@/types/content";

export const metadata = createPageMetadata(pageSeo.academy);
// Promotion is time-driven, so this route must refresh without a CMS webhook.
export const revalidate = 300;

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

export default async function AcademyPage() {
  const scheduled = academyContent.scheduled;
  const courses = academyContent.courses;
  const blog = academyContent.blog;
  const testimonialsShell = academyContent.testimonials;
  const faqsShell = academyContent.faqs;

  // Single listing fetch per catalogue — hub bands + total-count labels both
  // derive from the same result instead of a second, overlapping request.
  const [allWebinars, allCourses, allArticles, testimonials, faqs] =
    await Promise.all([
      fetchWebinarsListing(),
      fetchCoursesListing(),
      fetchArticlesListing(),
      fetchTestimonials("academy"),
      fetchFaqs("academy"),
    ]);

  const now = academyNowIso();
  const promotableWebinars = selectPromotableWebinars(allWebinars, { now });
  const promotedWebinar = promotableWebinars[0] ?? null;
  const promotedState = promotedWebinar
    ? academyWebinarDisplayState(promotedWebinar, now)
    : null;
  const hubWebinars = promotableWebinars.slice(0, HUB_WEBINARS_LIMIT);
  // No cap — the hub has always shown every course (matches the prior
  // static `academyHubCourses`, which mapped the full catalogue unsliced).
  const hubCourses = allCourses;
  const hubArticles = allArticles
    .slice(0, HUB_BLOG_LIMIT)
    .map(articleToHubShape);

  const { eyebrow, sectionTitle, category, registerLabel } =
    academyContent.featuredEvent;
  const featuredEvent = promotedWebinar
    ? {
        slug: promotedWebinar.slug,
        eyebrow,
        sectionTitle,
        category,
        registerLabel,
        format: promotedWebinar.format ?? "Event",
        title: promotedWebinar.title,
        description: promotedWebinar.description,
        image: promotedWebinar.image,
        imageAlt: promotedWebinar.imageAlt ?? promotedWebinar.title,
        date: promotedWebinar.date,
        dateLabel: resolveAcademyDateLabel(
          promotedWebinar.date,
          promotedWebinar.dateLabel,
        ),
        location: promotedWebinar.location ?? "",
        speakers: promotedWebinar.speakers ?? "",
      }
    : null;

  return (
    <>
      <AcademyHeroSection
        nextLive={promotedWebinar}
        isHappening={promotedState === "happening"}
      />
      <AcademyTabsSection
        tabs={academyContent.tabs.filter(
          (tab) => promotedWebinar || tab.targetId !== "featured-event",
        )}
      />

      {featuredEvent && promotedWebinar ? (
        <FeaturedEventSection
          key={promotedWebinar.slug}
          featured={featuredEvent}
          webinar={promotedWebinar}
          initialDisplayState={promotedState ?? "upcoming"}
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
          meta:
            academyWebinarDisplayState(item, now) === "happening"
              ? "HAPPENING NOW"
              : formatAcademyCardMetaDate(item.date),
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

      {testimonials.length > 0 ? (
        <TestimonialsSection
          eyebrow={testimonialsShell.eyebrow}
          title={testimonialsShell.title}
          description={testimonialsShell.description}
          items={testimonials}
        />
      ) : null}

      {faqs.length > 0 ? (
        <FaqSection content={{ ...faqsShell, items: faqs }} />
      ) : null}

      <CtaSection overlapNext={false} />
    </>
  );
}
