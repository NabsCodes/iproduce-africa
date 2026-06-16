import { placeholderImages } from "@/lib/placeholder-images";

export type AcademyEventCategory = "event" | "training";

export type AcademyEvent = {
  date: string;
  title: string;
  meta: string;
  tag: string;
  category: AcademyEventCategory;
  href: string;
};

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
      href: "/partners#partner",
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
  academyHighlights: [
    {
      icon: "graduation-cap",
      title: "Webinars",
      description:
        "Live expert-led sessions on agribusiness trends and opportunities.",
      href: "/academy/webinars",
    },
    {
      icon: "lightbulb",
      title: "Courses",
      description:
        "Structured learning programmes designed for practical impact.",
      href: "/academy/courses",
    },
    {
      icon: "users",
      title: "Events",
      description: "Workshops, conferences and networking engagements.",
      href: "/academy/events",
    },
    {
      icon: "trending-up",
      title: "Insights",
      description:
        "Articles, industry updates and thought-leadership content.",
      href: "/academy/insights",
    },
  ],
  pillars: [
    {
      title: "Agritech & Smart Agriculture",
      description:
        "End-to-end coaching on agritech to help agripreneurs scale sustainably. Precision tools and digital innovation for modern farms.",
      icon: "sprout",
    },
    {
      title: "Training & Capacity",
      description:
        "Structured programmes, workshops, and e-learning resources built for the modern African agricultural entrepreneur.",
      icon: "graduation-cap",
    },
    {
      title: "Market & Trade Linkages",
      description:
        "Direct access to intra-African and global markets through our network of buyers, exporters, and trade partners.",
      icon: "globe",
    },
    {
      title: "Agribusiness Leadership",
      description:
        "Strategic collaboration with NGOs, funders, investors, and institutions driving agricultural development across Africa.",
      icon: "handshake",
    },
    {
      title: "Women in Agriculture",
      description: "Backing women-led enterprises across the value chain.",
      icon: "user-round",
    },
    {
      title: "Youth Development",
      description:
        "Bringing the next generation of African farmers and agripreneurs into modern, digitally-enabled agribusiness.",
      icon: "users",
    },
  ],
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
      href: "/partners#partner",
      cta: "Become a partner",
      tone: "dark",
    },
  ],
  valueChains: [
    {
      title: "Livestock",
      description:
        "Cattle, poultry, aquaculture — building resilient protein value chains across the continent.",
      image: placeholderImages.valueChains.livestock,
    },
    {
      title: "Cotton & Garment",
      description:
        "From field to fabric — integrating cotton growers into regional textile and fashion supply chains.",
      image: placeholderImages.valueChains.cotton,
    },
    {
      title: "Fruits & Vegetables",
      description:
        "Reducing post-harvest losses and connecting produce to urban, export, and processing markets.",
      image: placeholderImages.valueChains.fruits,
    },
    {
      title: "Essential Oils",
      description:
        "Unlocking Africa's aromatic plant heritage for high-value cosmetic, pharma, and wellness markets.",
      image: placeholderImages.valueChains.oils,
    },
    {
      title: "Horticulture",
      description:
        "High-value greenhouse and floriculture production for domestic and export markets.",
      image: placeholderImages.valueChains.horticulture,
    },
  ],
  academyEvents: [
    {
      date: "2026-06-18",
      title: "Climate-smart irrigation 101",
      meta: "Webinar · Online · Free",
      tag: "Webinar",
      category: "event",
      href: "/academy#webinars",
    },
    {
      date: "2026-06-24",
      title: "Post-harvest handling for vegetables",
      meta: "Training · Kano · Members",
      tag: "Workshop",
      category: "training",
      href: "/academy#training",
    },
    {
      date: "2026-07-02",
      title: "Exporting under AfCFTA — AMA",
      meta: "Live Q&A · Online · Free",
      tag: "Event",
      category: "event",
      href: "/academy#webinars",
    },
    {
      date: "2026-07-10",
      title: "Cold-chain logistics for produce",
      meta: "Training · Lagos · Members",
      tag: "Workshop",
      category: "training",
      href: "/academy#training",
    },
    {
      date: "2026-07-18",
      title: "Pitching to agri-investors",
      meta: "Webinar · Online · Free",
      tag: "Webinar",
      category: "event",
      href: "/academy#webinars",
    },
    {
      date: "2026-07-25",
      title: "Cocoa fermentation & quality",
      meta: "Training · Akure · Members",
      tag: "Workshop",
      category: "training",
      href: "/academy#training",
    },
  ] satisfies readonly AcademyEvent[],
  testimonials: [
    {
      quote:
        "iProduce connected us to two new buyers in three months — the platform pays for itself.",
      name: "Aïssatou Diallo",
      role: "Cooperative Lead · Senegal",
      image: placeholderImages.testimonials.aissatou,
      initials: null,
    },
    {
      quote:
        "From the academy to the community, everything we need to grow sits in one ecosystem.",
      name: "Kofi Mensah",
      role: "Exporter · Ghana",
      image: null,
      initials: "KM",
    },
    {
      quote:
        "The bootcamp gave me my first export client. I came for the training and left with a market.",
      name: "Zainab A.",
      role: "Shea processor · Kano · Cohort 2",
      image: null,
      initials: "ZA",
    },
    {
      quote:
        "The partner network opened doors we'd been knocking on for years. Real introductions, not cold leads.",
      name: "Tendai Mukamuri",
      role: "Agritech Founder · Zimbabwe",
      image: null,
      initials: "TM",
    },
    {
      quote:
        "Weekly webinars keep our team current on policy and AfCFTA changes — it's become part of our planning cycle.",
      name: "Fatou Ndiaye",
      role: "Operations Lead · Senegal",
      image: null,
      initials: "FN",
    },
    {
      quote:
        "We joined for the market access and stayed for the community. The peer learning is unmatched.",
      name: "Samuel Okoye",
      role: "Cassava Processor · Nigeria",
      image: null,
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
  articles: [
    {
      category: "INNOVATION",
      title: "From pilot to profit: three agritech success stories to watch",
      meta: "May 19, 2026 · 8 min read",
      image: placeholderImages.news.one,
      href: "/academy#insights",
    },
    {
      category: "TRADE",
      title: "AfCFTA in practice: what agro-exporters learned in year three",
      meta: "May 28, 2026 · 6 min read",
      image: placeholderImages.news.two,
      href: "/academy#insights",
    },
    {
      category: "SMART AGRICULTURE",
      title: "How smart sensors are cutting water use by 40% on Kenyan farms",
      meta: "May 12, 2026 · 5 min read",
      image: placeholderImages.news.three,
      href: "/academy#insights",
    },
  ],
} as const;

export type HomeFaqCategory = (typeof homeContent.faqCategories)[number];

export type HomeFaq = {
  question: string;
  answer: string;
  category: Exclude<HomeFaqCategory, "All">;
};
