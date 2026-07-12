import { placeholderImages } from "@/lib/placeholder-images";
import type {
  AcademyCourse,
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

const courseDetails: AcademyCourseDetail[] = [
  {
    level: "BEGINNER",
    duration: "6 WEEKS",
    title: "Foundations of Agribusiness",
    description:
      "How agricultural value chains work, from inputs to market, across six guided weeks.",
    image: placeholderImages.academySpotlight.microphone,
    slug: "foundations-of-agribusiness",
    excerpt:
      "How agricultural value chains work, from inputs to market, across six guided weeks.",
    body: [
      "Build a clear picture of how produce moves from farm to buyer — and where margin is created or lost along the way.",
      "Each week focuses on a practical theme: planning, production basics, quality, simple finance, and first sales conversations.",
    ],
    modules: [
      "Value chain fundamentals",
      "Farm planning essentials",
      "Quality and post-harvest basics",
      "Introduction to farm finance",
      "Finding your first buyers",
      "Capstone action plan",
    ],
    registration: { mode: "interest" },
  },
  {
    level: "INTERMEDIATE",
    duration: "8 WEEKS",
    title: "Financing Your Agribusiness",
    description:
      "Funding options, grants and investor readiness for growing agricultural enterprises.",
    image: placeholderImages.academySpotlight.workshop,
    slug: "financing-your-agribusiness",
    excerpt:
      "Funding options, grants and investor readiness for growing agricultural enterprises.",
    body: [
      "Understand which financing instruments fit different farm and agribusiness stages — from working capital to growth capital.",
      "Learn how to prepare simple records, pitch materials, and milestones investors and lenders expect to see.",
    ],
    modules: [
      "Financing landscape overview",
      "Grants and development finance",
      "Debt and working capital",
      "Investor readiness basics",
      "Building a funding narrative",
      "Due diligence checklist",
      "Negotiation and next steps",
      "Portfolio review clinic",
    ],
    registration: { mode: "interest" },
  },
  {
    level: "INTERMEDIATE",
    duration: "5 WEEKS",
    title: "Market Access & Trade",
    description:
      "Reaching buyers, meeting standards and trading across African borders with confidence.",
    image: placeholderImages.academySpotlight.market,
    slug: "market-access-and-trade",
    excerpt:
      "Reaching buyers, meeting standards and trading across African borders with confidence.",
    body: [
      "Map buyer requirements, documentation, and quality signals that unlock better prices and repeat orders.",
      "Explore intra-African trade opportunities with practical steps for standards, logistics, and partnership building.",
    ],
    modules: [
      "Buyer discovery",
      "Standards and compliance basics",
      "Contracts and documentation",
      "Logistics for market access",
      "Go-to-market plan",
    ],
    registration: { mode: "interest" },
  },
];

export const coursesContent = {
  hero: {
    eyebrow: "Courses",
    title: "Learn at Your Own Pace",
    description:
      "Structured programmes that turn agricultural know-how into practical business skills — from foundations to financing and market access.",
  } satisfies AcademyListingHeroContent,
  featuredSlug: courseDetails[0].slug,
  courses: courseDetails,
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

export const academyHubCourses: AcademyCourse[] = courseDetails.map(
  ({ level, duration, title, description, image, slug }) => ({
    level,
    duration,
    title,
    description,
    image,
    slug,
  }),
);

export function getCourse(slug: string): AcademyCourseDetail | undefined {
  return coursesContent.courses.find((course) => course.slug === slug);
}

export function courseToRelatedItem(
  course: AcademyCourseDetail,
): AcademyRelatedItem {
  const card = courseToCardItem(course);
  return {
    key: card.key,
    href: card.href,
    image: card.image,
    category: card.category,
    categoryTone: card.categoryTone,
    meta: card.meta,
    title: card.title,
    description: card.description,
  };
}

export function getRelatedCourses(excludeSlug: string, limit = 3) {
  return coursesContent.courses
    .filter((course) => course.slug !== excludeSlug)
    .slice(0, limit)
    .map(courseToRelatedItem);
}

export function courseToCardItem(course: AcademyCourseDetail) {
  return {
    key: course.slug,
    href: `/academy/courses/${course.slug}`,
    image: course.image,
    imageAlt: course.title,
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
  items: coursesContent.courses.map(courseToCardItem),
  filterEmptyState: {
    icon: "graduation-cap",
    title: "No courses at this level yet",
    description:
      "Try another level or browse everything currently in the catalogue.",
    ctaLabel: "View all courses",
    ctaHref: "/academy/courses",
  },
} as const;
