import { placeholderImages } from "@/lib/placeholder-images";
import type {
  AcademyArticleCategory,
  AcademyContent,
  AcademyHomePreview,
  AcademyPreviewTone,
} from "@/types/academy";

const HOME_SPOTLIGHT_LIMIT = 4;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
});

const articleToneByCategory: Record<
  AcademyArticleCategory,
  AcademyPreviewTone
> = {
  INNOVATION: "forest",
  TRADE: "tangerine",
  "SMART AGRICULTURE": "leaf",
};

function formatShortDate(iso: string) {
  return dateFormatter.format(new Date(iso)).toUpperCase();
}

export const academyContent = {
  hero: {
    eyebrow: "The Academy — Knowledge & Events Hub",
    eyebrowTone: "tangerine",
    title: {
      lead: "Learn, ",
      accent: "Innovate & Grow",
      trail: "\nthrough Africa's leading\nagribusiness academy.",
    },
    description:
      "Explore expert-led webinars, practical courses, industry insights, and networking opportunities designed to prepare Africa's next generation of agribusiness leaders.",
    searchPlaceholder: "Search trainings, webinars, courses…",
    searchLabel: "Search",
    searchCategories: [
      { label: "Webinars (events)", value: "webinars" },
      { label: "Training programmes", value: "training" },
      { label: "Evergreen courses", value: "courses" },
      { label: "Blog", value: "blog" },
    ],
    trustLabel:
      "Practical learning for agripreneurs and professionals across Africa",
    members: [
      {
        name: "Academy learner",
        initials: "AL",
        image: placeholderImages.communityMembers.one,
      },
      {
        name: "Academy learner",
        initials: "BK",
        image: placeholderImages.communityMembers.two,
      },
      {
        name: "Academy learner",
        initials: "CM",
        image: placeholderImages.communityMembers.three,
      },
    ],
    image: "/images/academy/academy-hero.webp",
    imageAlt: "Agripreneur tending crops on a farm",
    nextLive: {
      label: "AfriAgri Leadership Forum · Aug 2026",
      date: "2026-08-12T09:00:00Z",
      href: "#featured-event",
    },
  },
  tabs: [
    { label: "Overview", targetId: "overview" },
    { label: "Webinars & Events", targetId: "webinars-events" },
    { label: "Evergreen courses", targetId: "courses" },
    { label: "Blog", targetId: "blog" },
  ],
  featuredEvent: {
    eyebrow: "Featured Event",
    sectionTitle: "Don't miss what's next",
    category: "Agribusiness Development",
    format: "Hybrid · Virtual + Lagos",
    title: "AfriAgri Leadership Forum 2026",
    description:
      "A high-level gathering of African agribusiness leaders, policymakers, investors and development partners shaping the continent's agricultural transformation agenda.",
    image: placeholderImages.academySpotlight.presentation,
    imageAlt: "Audience seated at an agribusiness conference",
    date: "2026-08-12T09:00:00Z",
    dateLabel: "August 12–14, 2026 · 9:00 AM – 4:00 PM WAT",
    location: "Landmark Centre, Lagos · Livestream available",
    speakers:
      "Speakers: Dr. Amina Bello, Kofi Mensah, Aïssatou Diallo + 6 more",
    registerHref: "#featured-event",
    registerLabel: "Register Now",
  },
  opportunities: {
    eyebrow: "Learning Opportunities",
    title: "Learning Designed for Real-World Impact",
    items: [
      {
        icon: "graduation-cap",
        title: "Webinars",
        description:
          "Live expert-led sessions on agribusiness trends and opportunities.",
        anchor: "#webinars-events",
      },
      {
        icon: "lightbulb",
        title: "Courses",
        description:
          "Structured learning programmes designed for practical impact.",
        anchor: "#courses",
      },
      {
        icon: "users",
        title: "Events",
        description: "Workshops, conferences and networking engagements.",
        anchor: "#webinars-events",
      },
      {
        icon: "newspaper",
        title: "Blog",
        description:
          "Articles, industry updates and thought-leadership content.",
        anchor: "#blog",
      },
    ],
  },
  participants: {
    eyebrow: "Target Participants",
    title: "Who can benefit from the Academy?",
    description:
      "The introductory courses are aimed at those who want to start farming for commercial (and even personal purposes), alongside those who need to improve their basic knowledge on farming.",
    items: [
      {
        icon: "rocket",
        title: "Startups",
        description: "Agri businesses starting out.",
      },
      {
        icon: "sprout",
        title: "Farmers",
        description: "Smallholder to commercial.",
      },
      {
        icon: "package",
        title: "Input Suppliers",
        description: "Seeds, equipment & agro-inputs.",
      },
      {
        icon: "truck",
        title: "Logistics Providers",
        description: "Storage, haulage & cold chain.",
      },
      {
        icon: "ship",
        title: "Exporters",
        description: "Local & cross-border trade.",
      },
      {
        icon: "landmark",
        title: "Investors",
        description: "Funds, banks & angels.",
      },
      {
        icon: "heart-handshake",
        title: "Women in Agriculture",
        description: "Founders & operators.",
      },
      {
        icon: "sparkles",
        title: "Youth Agripreneurs",
        description: "The next generation.",
      },
      {
        icon: "building",
        title: "Agribusiness Organisations",
        description: "Co-ops, NGOs & associations.",
      },
    ],
  },
  scheduled: {
    eyebrow: "Learning Opportunities",
    title: "Webinars & Events",
    countLabel:
      "Showing 4 of 26 upcoming webinars & events — more load right here",
    viewMoreLabel: "View More",
    total: 26,
    items: [
      {
        type: "WEBINAR",
        date: "2026-06-18",
        title: "Scaling Smallholder Farms with Data",
        description:
          "How farm records and precision tools help small farms lift yields and win buyers.",
        image: placeholderImages.academySpotlight.microphone,
        slug: "placeholder-slug-webinar-1",
      },
      {
        type: "TRAINING",
        date: "2026-06-24",
        title: "Post-Harvest Handling Essentials",
        description:
          "Cut losses and protect quality with practical storage, packaging and cold-chain methods.",
        image: placeholderImages.academySpotlight.workshop,
        slug: "placeholder-slug-training-1",
      },
      {
        type: "LIVE Q&A",
        date: "2026-07-02",
        title: "Ask an Agronomist: Soil Health",
        description:
          "A live session on soil testing, fertility and regenerative practices — bring your questions.",
        image: placeholderImages.academySpotlight.presentation,
        slug: "placeholder-slug-liveqa-1",
      },
      {
        type: "WEBINAR",
        date: "2026-07-09",
        title: "Building an Export-Ready Business",
        description:
          "Standards, certification and the paperwork behind successful cross-border trade.",
        image: placeholderImages.academySpotlight.market,
        slug: "placeholder-slug-webinar-2",
      },
    ],
  },
  courses: {
    eyebrow: "Learning Opportunities",
    title: "Courses to Learn at your pace.",
    countLabel: "Showing 3 of 18 courses — more load right here",
    viewMoreLabel: "View More",
    total: 18,
    items: [
      {
        level: "BEGINNER",
        duration: "6 WEEKS",
        title: "Foundations of Agribusiness",
        description:
          "How agricultural value chains work, from inputs to market, across six guided weeks.",
        image: placeholderImages.academySpotlight.microphone,
        slug: "placeholder-slug-course-1",
      },
      {
        level: "INTERMEDIATE",
        duration: "8 WEEKS",
        title: "Financing Your Agribusiness",
        description:
          "Funding options, grants and investor readiness for growing agricultural enterprises.",
        image: placeholderImages.academySpotlight.workshop,
        slug: "placeholder-slug-course-2",
      },
      {
        level: "INTERMEDIATE",
        duration: "5 WEEKS",
        title: "Market Access & Trade",
        description:
          "Reaching buyers, meeting standards and trading across African borders with confidence.",
        image: placeholderImages.academySpotlight.market,
        slug: "placeholder-slug-course-3",
      },
    ],
  },
  blog: {
    eyebrow: "Blog",
    title: "Latest about AgriBusiness",
    countLabel: "Showing 3 of 10 articles — more on the blog",
    viewMoreLabel: "View More",
    total: 10,
    items: [
      {
        category: "INNOVATION",
        readTime: "5 min read",
        title: "How AgriTech Is Reshaping African Farms",
        description:
          "From mobile advisory to precision sensors — the tools changing how the continent farms.",
        image: placeholderImages.news.one,
        slug: "agritech-reshaping-african-farms",
      },
      {
        category: "TRADE",
        readTime: "4 min read",
        title: "Unlocking Intra-African Trade",
        description:
          "What the AfCFTA means for producers and traders moving goods across borders.",
        image: placeholderImages.news.two,
        slug: "unlocking-intra-african-trade",
      },
      {
        category: "SMART AGRICULTURE",
        readTime: "6 min read",
        title: "Climate-Smart Practices That Pay Off",
        description:
          "Low-cost techniques that build resilience while improving farm profitability.",
        image: placeholderImages.news.three,
        slug: "climate-smart-practices-that-pay-off",
      },
    ],
  },
  testimonials: {
    eyebrow: "Our Impact",
    title: "What our community says",
    description:
      "Farmers, traders and innovators on what iProduce changed for them.",
    items: [
      {
        quote:
          "iProduce connected our co-op to two new buyers in 3 months — the platform pays for itself.",
        name: "Aïssatou Diallo",
        role: "Cooperative Lead · Senegal",
        image: placeholderImages.testimonials.aissatou,
        initials: "AD",
      },
      {
        quote:
          "From the academy to the marketplace, everything we need to grow sits in one ecosystem.",
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
    ],
  },
  faqs: {
    eyebrow: "Frequently asked questions",
    description:
      "Everything about the academy, programmes and learning pathways — answered plainly.",
    categories: ["All", "Courses", "Webinars & Events", "Membership"] as const,
    items: [
      {
        question: "How do I enrol in a course?",
        answer:
          "Browse the courses section, pick one that matches your interest, and follow the enrolment button. Free courses unlock immediately; paid programmes route you through a brief intake step before you start.",
        category: "Courses",
      },
      {
        question: "Are the courses free?",
        answer:
          "Most introductory courses and webinars are free for members. Advanced or cohort-based programmes may carry a fee, which is disclosed clearly on the course page before you commit.",
        category: "Courses",
      },
      {
        question: "Do I get a certificate when I complete a course?",
        answer:
          "Yes. Completing all modules and assessments in a course earns you a digital certificate of completion that you can share on LinkedIn and other professional surfaces.",
        category: "Courses",
      },
      {
        question: "How do I attend a live webinar or event?",
        answer:
          "Register on the event page and you'll receive a calendar invite plus a join link by email an hour before the session. Most webinars are also recorded and added to the on-demand library afterwards.",
        category: "Webinars & Events",
      },
      {
        question: "Can I propose a topic or speak at a future event?",
        answer:
          "Absolutely. Use the Contact page to reach the academy team with a short pitch covering the topic, audience, and any supporting materials — we curate community-led sessions across the year.",
        category: "Webinars & Events",
      },
      {
        question: "Is academy membership free?",
        answer:
          "Joining the iProduce community is free and unlocks the academy. Specific paid courses or sponsored cohorts are billed separately and clearly labelled on the course listing.",
        category: "Membership",
      },
    ],
  },
} as const satisfies AcademyContent;

export const academyHomePreview = {
  opportunities: academyContent.opportunities.items.map((item) => ({
    icon: item.icon,
    title: item.title,
    description: item.description,
    href: `/academy${item.anchor}`,
  })),
  spotlight: {
    upcoming: [...academyContent.scheduled.items]
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, HOME_SPOTLIGHT_LIMIT)
      .map((event) => ({
        key: event.slug,
        href: "/academy#webinars-events",
        image: event.image,
        category: event.type,
        meta: formatShortDate(event.date),
        title: event.title,
        description: event.description,
      })),
    training: academyContent.courses.items
      .slice(0, HOME_SPOTLIGHT_LIMIT)
      .map((course) => ({
        key: course.slug,
        href: "/academy#courses",
        image: course.image,
        category: course.level,
        meta: course.duration,
        title: course.title,
        description: course.description,
      })),
  },
  blog: academyContent.blog.items.map((article) => ({
    key: article.slug,
    href: `/academy/blog/${article.slug}`,
    image: article.image,
    category: article.category,
    categoryTone: articleToneByCategory[article.category],
    meta: article.readTime.toUpperCase(),
    title: article.title,
    description: article.description,
  })),
} as const satisfies AcademyHomePreview;

/**
 * Course preview projection for the blog detail's "Continue Learning" section.
 * Academy stays the canonical owner of course data — blog content modules
 * never re-declare or duplicate course fields. Mirrors the
 * `academyHomePreview` pattern.
 *
 * Cards link to `/academy#courses` until course detail routes ship.
 */
export const academyBlogRelatedCourses = academyContent.courses.items
  .slice(0, 3)
  .map((course) => ({
    slug: course.slug,
    title: course.title,
    description: course.description,
    image: course.image,
    level: course.level,
    duration: course.duration,
    href: "/academy#courses",
  }));
