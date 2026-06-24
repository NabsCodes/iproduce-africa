import { academyContent } from "@/content/academy";
import type { AcademyTrackHeroContent } from "@/types/academy";
import type { CtaSectionContent } from "@/types/content";

export const coursesContent = {
  hero: {
    eyebrow: "Courses",
    title: "Learn at Your Own Pace",
    description:
      "Structured programmes that turn agricultural know-how into practical business skills — from foundations to financing and market access.",
  } satisfies AcademyTrackHeroContent,
  /** Cards link to the hub section until `/academy/courses/[slug]` ships. */
  items: academyContent.courses.items.map((course) => ({
    key: course.slug,
    href: "/academy#courses",
    image: course.image,
    category: course.level,
    categoryTone: "leaf" as const,
    meta: course.duration,
    title: course.title,
    description: course.description,
  })),
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
};

export const coursesListing = {
  hero: coursesContent.hero,
  items: coursesContent.items,
};
