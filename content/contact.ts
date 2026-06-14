import type { PageHeroContent } from "@/types/content";

export const contactPageContent = {
  hero: {
    eyebrow: "Contact",
    title: "Let's build Africa's agribusiness future together",
    description:
      "Tell us whether you want to join the community, explore the Academy, or discuss an institutional partnership. Our team will guide you to the right next step.",
  },
} as const satisfies { hero: PageHeroContent };
