import { placeholderImages } from "@/lib/placeholder-images";

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
      "We connect you with helpful resources, services and opportunities to start or grow your agribusiness.",
    image: "/images/home/hero-image.webp",
    imageAlt: "Smiling agripreneur harvesting tomatoes in a greenhouse",
    primaryCta: {
      label: "Join our community",
      href: "/community#join",
    },
    secondaryCta: {
      label: "Partner with us",
      href: "/partners#partnership-enquiry",
    },
    stats: [
      { value: "2,400", suffix: "+", label: "Agripreneurs" },
      { value: "100", suffix: "+", label: "Partner Orgs" },
      { value: "100", suffix: "%", label: "Training success" },
    ],
  },
  about: {
    eyebrow: "What we do",
    title: "Integrating African Agripreneurs to the World Agro-ecosystem",
    image: placeholderImages.whatWeDo,
    imageAlt: "Farmers harvesting crops together",
  },
  journeys: [
    {
      audience: "For agripreneurs & individuals",
      title: "Grow Your Agribusiness",
      description:
        "Access the training, mentorship, resources, and community you need to build a thriving agribusiness in Africa and beyond.",
      items: [
        "Advisory & 1-on-1 coaching",
        "Resource centre & learning hub",
        "Community peer network",
        "Grant & funding alerts",
        "Structured training programmes",
        "Market and partner introductions",
      ],
      href: "/community#join",
      cta: "Join our community",
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
  valueChains: [
    {
      title: "Livestock & Poultry",
      description:
        "Breeding, feed, animal health and market access for livestock and poultry producers.",
      image: "/images/home/livestock.webp",
    },
    {
      title: "Cotton & Garment",
      description:
        "From field to fabric — integrating cotton growers into regional textile and fashion supply chains.",
      image: "/images/home/cotton-garment.webp",
    },
    {
      title: "Crops & Grains",
      description:
        "Staple and cash crops — better inputs, higher yields and reliable market access.",
      image: "/images/home/crops-grains.webp",
    },
    {
      title: "Horticulture",
      description:
        "Fruits, vegetables and high-value produce, from greenhouse to fresh market.",
      image: "/images/home/horticulture.webp",
    },
    {
      title: "Aquaculture & Fisheries",
      description:
        "Sustainable fish farming and value addition across inland and coastal communities.",
      image: "/images/home/aquaculture.webp",
    },
  ],
  testimonials: [
    {
      quote:
        "iProduce connected us to two new buyers in three months — the platform pays for itself.",
      name: "Aïssatou Diallo",
      role: "Cooperative Lead · Senegal",
      image: placeholderImages.testimonials.aissatou,
      initials: "AD",
    },
    {
      quote:
        "From the academy to the community, everything we need to grow sits in one ecosystem.",
      name: "Kofi Mensah",
      role: "Exporter · Ghana",

      initials: "KM",
    },
    {
      quote:
        "The bootcamp gave me my first export client. I came for the training and left with a market.",
      name: "Zainab A.",
      role: "Shea processor · Kano · Cohort 2",

      initials: "ZA",
    },
    {
      quote:
        "The partner network opened doors we'd been knocking on for years. Real introductions, not cold leads.",
      name: "Tendai Mukamuri",
      role: "Agritech Founder · Zimbabwe",

      initials: "TM",
    },
    {
      quote:
        "Weekly webinars keep our team current on policy and AfCFTA changes — it's become part of our planning cycle.",
      name: "Fatou Ndiaye",
      role: "Operations Lead · Senegal",

      initials: "FN",
    },
    {
      quote:
        "We joined for the market access and stayed for the community. The peer learning is unmatched.",
      name: "Samuel Okoye",
      role: "Cassava Processor · Nigeria",

      initials: "SO",
    },
  ],
  faqCategories: ["All", "Platform", "Membership", "Partners"],
  faqs: [
    {
      question: "What is iProduce Africa?",
      answer:
        "iProduce Africa is an agribusiness ecosystem connecting farmers, processors, traders, investors and innovators across the continent — with learning, networking and market-access tools in one place.",
      category: "Platform",
    },
    {
      question: "Who is the platform for?",
      answer:
        "Farmers, processors, traders, investors, researchers and agripreneurs — anyone building in African agriculture.",
      category: "Platform",
    },
    {
      question: "Is it free to join?",
      answer:
        "Basic community membership is free. Premium programmes and Academy courses may have separate pricing, which will be stated on each programme page.",
      category: "Membership",
    },
    {
      question: "Which countries do you operate in?",
      answer:
        "Our digital programmes and community are built for participants across Africa, with physical activities announced by location.",
      category: "Platform",
    },
    {
      question: "How do I become a partner?",
      answer:
        "Partners collaborate through co-designed programmes, market access initiatives, capacity building, and thought leadership. Visit our Partners page to start a conversation.",
      category: "Partners",
    },
  ],
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
