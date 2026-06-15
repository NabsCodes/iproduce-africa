import type { PageActionContent, PageHeroContent } from "@/types/content";

export const communityPageContent = {
  hero: {
    eyebrow: "Community",
    title: "Join Africa's growing agribusiness community",
    description:
      "Connect with farmers, agripreneurs, investors, processors, traders, and ecosystem partners building the future of agriculture across Africa.",
  },
  join: {
    id: "join",
    eyebrow: "Join our community",
    title: "Register your interest before the full membership flow goes live",
    description:
      "We are shaping the next phase of the iProduce Africa community experience now. If you want to join early, send us a short note about who you are and how you want to participate.",
    highlights: [
      "The community is being built for farmers, agripreneurs, processors, traders, investors, and ecosystem enablers.",
      "Membership pathways, benefits, and onboarding details will be published in the next phase.",
      "For now, email us directly or use the contact page so we can capture your interest cleanly.",
    ],
    primaryCtaLabel: "Email us to join",
    primaryEmailSubject: "Community interest",
    secondaryCtaLabel: "Open contact page",
  },
} as const satisfies { hero: PageHeroContent; join: PageActionContent };
