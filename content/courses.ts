import type {
  AcademyCourseDetail,
  AcademyListingHeroContent,
  AcademyRelatedItem,
} from "@/types/academy";
import type { ContentCardTone, CtaSectionContent } from "@/types/content";

const toneByLevel: Record<AcademyCourseDetail["level"], ContentCardTone> = {
  BEGINNER: "tangerine",
  INTERMEDIATE: "tangerine",
  ADVANCED: "forest",
};

export const COURSE_LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;

export type CourseFilterLevel = (typeof COURSE_LEVELS)[number];

const levelLabel: Record<AcademyCourseDetail["level"], CourseFilterLevel> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

/** Code-owned listing chrome. Catalogue items live in Sanity. */
export const coursesContent = {
  hero: {
    eyebrow: "Courses",
    title: "Learn at Your Own Pace",
    description:
      "Structured programmes that turn agricultural know-how into practical business skills — from foundations to financing and market access.",
  } satisfies AcademyListingHeroContent,
  /** Code-owned featured pointer; resolve against Sanity documents. */
  featuredSlug: "foundations-of-agribusiness",
  cta: {
    eyebrow: "Be part of the future",
    title: "Let's Build the Future of Agriculture Together",
    description:
      "Join a growing network of organisations committed to innovation, capacity building, and sustainable growth across Africa.",
    ctas: [
      {
        label: "Partner with us",
        href: "/partners#partnership-enquiry",
        variant: "green",
        icon: "handshake",
      },
    ],
  } satisfies CtaSectionContent,
  relatedSection: {
    eyebrow: "Build your skills",
    title: "Continue learning",
    description:
      "Explore structured programmes that complement what you've started here — from foundations to financing and market access.",
    viewAllLabel: "Browse all courses",
    viewAllHref: "/academy/courses",
  },
};

export function courseToRelatedItem(
  course: AcademyCourseDetail,
): AcademyRelatedItem {
  const card = courseToCardItem(course);
  return {
    key: card.key,
    href: card.href,
    image: card.image,
    imageAlt: card.imageAlt,
    category: card.category,
    categoryTone: card.categoryTone,
    meta: card.meta,
    title: card.title,
    description: card.description,
  };
}

export function courseToCardItem(course: AcademyCourseDetail) {
  return {
    key: course.slug,
    href: `/academy/courses/${course.slug}`,
    image: course.image,
    imageAlt: course.imageAlt,
    category: levelLabel[course.level],
    categoryTone: toneByLevel[course.level],
    meta: course.duration,
    title: course.title,
    description: course.description,
    filterLevel: levelLabel[course.level],
  };
}

export const coursesListing = {
  hero: coursesContent.hero,
  featuredSlug: coursesContent.featuredSlug,
  filterLevels: COURSE_LEVELS,
  filterEmptyState: {
    icon: "graduation-cap",
    title: "Nothing matches this filter",
    description:
      "Try another level or browse the full course catalogue for open programmes.",
    ctaLabel: "View all courses",
    ctaHref: "/academy/courses",
  },
} as const;
