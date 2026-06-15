import type { PageHeroContent } from "@/types/content";

export const academyPageContent = {
  hero: {
    eyebrow: "The Academy — Learn, Innovate, Grow",
    eyebrowTone: "tangerine",
    title:
      "Learn, Innovate & Grow through Africa's leading agribusiness academy.",
    description:
      "Explore expert-led webinars, practical courses, industry insights, and networking opportunities designed to prepare Africa's next generation of agribusiness leaders.",
  },
} as const satisfies { hero: PageHeroContent };
