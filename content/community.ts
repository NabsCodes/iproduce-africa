import type { PageHeroContent } from "@/types/content";

export const communityPageContent = {
  hero: {
    eyebrow: "Community",
    title: "Join Africa's growing agribusiness community",
    description:
      "Connect with farmers, agripreneurs, investors, processors, traders, and ecosystem partners building the future of agriculture across Africa.",
  },
} as const satisfies { hero: PageHeroContent };
