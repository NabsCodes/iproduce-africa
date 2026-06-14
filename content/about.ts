import type { PageHeroContent } from "@/types/content";

export const aboutPageContent = {
  hero: {
    eyebrow: "We are iProduce Africa",
    title: "Building Africa's Most Connected Agribusiness Ecosystem.",
    description:
      "We empower agripreneurs with the tools, partnerships, knowledge, and market access needed to build sustainable and profitable agricultural businesses.",
  },
} as const satisfies { hero: PageHeroContent };
