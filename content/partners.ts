import type { PageHeroContent } from "@/types/content";

export const partnersPageContent = {
  hero: {
    eyebrow: "Partnerships",
    title: "Create lasting agricultural impact with us",
    description:
      "Work with iProduce Africa to co-design programmes, strengthen value chains, expand market access, and support agribusiness growth across the continent.",
  },
} as const satisfies { hero: PageHeroContent };
