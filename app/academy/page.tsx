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
import type { ContentCardTone } from "@/types/content";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";
import type {
  AcademyArticleCategory,
  AcademyCourseLevel,
  AcademyScheduledType,
} from "@/types/academy";

export const metadata = createPageMetadata(pageSeo.academy);

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

export default function AcademyPage() {
  const scheduled = academyContent.scheduled;
  const courses = academyContent.courses;
  const blog = academyContent.blog;
  const testimonials = academyContent.testimonials;
  const faqs = academyContent.faqs;

  return (
    <>
      <AcademyHeroSection />
      <AcademyTabsSection />

      <FeaturedEventSection />

      <LearningOpportunitiesSection />

      <TargetParticipantsSection />

      <LearningListingSection
        id="webinars-events"
        eyebrow={scheduled.eyebrow}
        title={scheduled.title}
        columns={4}
        items={scheduled.items.map((item) => ({
          href: `/academy/webinars/${item.slug}`,
          image: item.image,
          category: item.type,
          categoryTone: scheduledTypeToneMap[item.type],
          meta: formatScheduledDate(item.date),
          title: item.title,
          description: item.description,
        }))}
        viewMoreLabel={scheduled.viewMoreLabel}
        viewMoreHref="/academy/webinars"
        countLabel={scheduled.countLabel}
      />

      <LearningListingSection
        id="courses"
        eyebrow={courses.eyebrow}
        title={courses.title}
        columns={3}
        items={courses.items.map((item) => ({
          href: `/academy/courses/${item.slug}`,
          image: item.image,
          category: item.level,
          categoryTone: courseLevelToneMap[item.level],
          meta: item.duration,
          title: item.title,
          description: item.description,
        }))}
        viewMoreLabel={courses.viewMoreLabel}
        viewMoreHref="/academy/courses"
        countLabel={courses.countLabel}
      />

      <LearningListingSection
        id="blog"
        eyebrow={blog.eyebrow}
        title={blog.title}
        columns={3}
        items={blog.items.map((item) => ({
          href: `/academy/blog/${item.slug}`,
          image: item.image,
          category: item.category,
          categoryTone: articleCategoryToneMap[item.category],
          meta: item.readTime.toUpperCase(),
          title: item.title,
          description: item.description,
        }))}
        viewMoreLabel={blog.viewMoreLabel}
        viewMoreHref="/academy/blog"
        countLabel={blog.countLabel}
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
