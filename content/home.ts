/**
 * Static MVP content. Keep this file presentation-agnostic so each collection
 * can later map to a Sanity document or object without rewriting the sections.
 */
export const homeContent = {
  hero: {
    eyebrow: "Africa's Agribusiness Ecosystem Platform",
    eyebrowTone: "leaf",
    title: "Unlocking Local and Global Agribusiness Opportunities",
    description:
      "We connect agripreneurs across Africa with resources, services, and opportunities to grow — with dedicated pathways for women in agriculture.",
    image: "/images/home/hero-image.webp",
    imageAlt: "Woman agripreneur harvesting fresh produce in a greenhouse",
    primaryCta: {
      label: "Join our community",
      href: "/community#membership-application",
      action: "membership-dialog",
    },
    proofPoints: [
      {
        label: "Practical learning",
        description:
          "Training, webinars and resources for real agribusiness work.",
      },
      {
        label: "Market access",
        description:
          "Connections to opportunities, buyers and support pathways.",
      },
      {
        label: "Community support",
        description:
          "A peer network for agripreneurs and ecosystem builders, with strong representation of women in agriculture.",
      },
    ],
  },
  about: {
    eyebrow: "What we do",
    title: "Integrating African Agripreneurs to the World Agro-ecosystem",
    videoAriaLabel: "Play the iProduce Africa intro video",
  },
  journeys: [
    {
      audience: "For agripreneurs & women in agriculture",
      title: "Grow Your Agribusiness",
      description:
        "Access training, mentorship, and a peer community built for founders and operators ready to scale.",
      items: [
        "Advisory & 1-on-1 coaching",
        "Resource centre & learning hub",
        "Community peer network",
        "Grant & funding alerts",
        "Structured training programmes",
        "Market and partner introductions",
      ],
      href: "/community#membership-application",
      cta: "Join our community",
      action: "membership-dialog",
      tone: "light",
    },
    {
      audience: "For organisations & partners",
      title: "Drive Agricultural Impact at Scale",
      description:
        "Partner with us to co-create programmes, deploy funding, and expand your footprint across Africa's agribusiness landscape.",
      items: [
        "Co-develop programmes & initiatives",
        "Funding & grant facilitation",
        "Market expansion opportunities",
        "Agribusiness talent pipeline",
        "Strategic ecosystem partnerships",
        "Impact measurement & reporting",
      ],
      href: "/partners#partnership-enquiry",
      cta: "Become a partner",
      tone: "dark",
    },
  ],
  whyJoinUs: {
    eyebrow: "Why join us",
    title: "Exclusive services to grow your agribusiness",
    description:
      "Advisory, training, intelligence, and connections in one membership — including practical support for women in agriculture.",
  },
  faqCategories: ["All", "Platform", "Membership", "Partners"],
  stayConnected: {
    eyebrow: "Stay connected",
    title: "Join the Conversation",
    description:
      "Follow iProduce Africa for agribusiness insights, event highlights, training opportunities, and community stories.",
    platforms: ["instagram", "facebook", "youtube"],
  },
} as const;

export type HomeFaqCategory = (typeof homeContent.faqCategories)[number];

export type HomeFaq = {
  question: string;
  answer: string;
  category: Exclude<HomeFaqCategory, "All">;
};
