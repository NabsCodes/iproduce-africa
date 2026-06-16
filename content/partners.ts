import type { PageActionContent, PageHeroContent } from "@/types/content";

export type Partner = {
  id: string;
  name: string;
  logo: string;
  href?: string;
};

export const partnersList: Partner[] = [
  {
    id: "icreate-africa",
    name: "iCreate Africa",
    logo: "/images/partners/icreate-africa.webp",
  },
  {
    id: "islamic-development-bank",
    name: "Islamic Development Bank",
    logo: "/images/partners/islamic-development-bank.webp",
  },
  {
    id: "nicert",
    name: "NICERT",
    logo: "/images/partners/nicert.webp",
  },
];

export const partnersPageContent = {
  hero: {
    eyebrow: "Partnerships",
    eyebrowTone: "tangerine",
    title: "Create lasting agricultural impact with us",
    description:
      "Work with iProduce Africa to co-design programmes, strengthen value chains, expand market access, and support agribusiness growth across the continent.",
  },
  partner: {
    id: "partner",
    eyebrow: "Partner with us",
    title:
      "Start a partnership conversation before the full partner flow is live",
    description:
      "If your organisation wants to collaborate with iProduce Africa, reach out with a short overview of your goals, audience, and the kind of support or partnership model you have in mind.",
    highlights: [
      "We can explore programmes, ecosystem collaborations, market-access initiatives, training, and sponsorship-aligned opportunities.",
      "Detailed partner pathways and future submission flows will be published in a later phase.",
      "For now, email us directly or use the contact page so the conversation starts in one clear place.",
    ],
    primaryCtaLabel: "Email us to partner",
    primaryEmailSubject: "Partnership inquiry",
    secondaryCtaLabel: "Open contact page",
  },
} as const satisfies { hero: PageHeroContent; partner: PageActionContent };
