import { placeholderImages } from "@/lib/placeholder-images";
import type { CommunityHeroContent, PageActionContent } from "@/types/content";

export const communityPageContent = {
  hero: {
    eyebrow: "Membership",
    eyebrowTone: "tangerine",
    title: {
      lead: "Join our ",
      accent: "Agribusiness community",
    },
    description:
      "Become part of a network of farmers, agripreneurs, investors, innovators, processors, traders and ecosystem leaders shaping the future of agriculture across Africa.",
    primaryCta: {
      label: "Join our Community",
      href: "/community#join",
    },
    secondaryCta: {
      label: "Explore Member Benefits",
      href: "/community#join",
    },
    membersLabel: "Members across 20+ African countries",
    members: [
      {
        name: "Community member",
        initials: "AM",
        image: placeholderImages.communityMembers.one,
      },
      {
        name: "Community member",
        initials: "BK",
        image: placeholderImages.communityMembers.two,
      },
      {
        name: "Community member",
        initials: "CD",
        image: placeholderImages.communityMembers.three,
      },
    ],
    orbit: {
      rings: [
        {
          radius: 160,
          duration: 34,
          reverse: true,
          items: [
            {
              label: "Exporters",
              icon: "package",
              tone: "tangerine",
              angle: 258,
            },
            {
              label: "Investors",
              icon: "trending-up",
              tone: "tangerine",
              angle: 12,
            },
          ],
        },
        {
          radius: 230,
          duration: 46,
          items: [
            { label: "Farmers", icon: "sprout", tone: "leaf", angle: 270 },
            {
              label: "Logistics",
              icon: "truck",
              tone: "tangerine",
              angle: 322,
            },
            {
              label: "Women in Agric",
              icon: "user-round",
              tone: "leaf",
              angle: 108,
            },
            { label: "Processors", icon: "factory", tone: "leaf", angle: 168 },
            {
              label: "Youth Agripreneurs",
              icon: "lightbulb",
              tone: "leaf",
              angle: 222,
            },
          ],
        },
      ],
    },
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
} as const satisfies {
  hero: CommunityHeroContent;
  join: PageActionContent;
};
