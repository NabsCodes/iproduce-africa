import { placeholderImages } from "@/lib/placeholder-images";
import type {
  AcademyContent,
  AcademyHomePreview,
  AcademyRegistrationContent,
} from "@/types/academy";

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
    searchPlaceholder: "Search webinars, courses, and articles…",
    searchLabel: "Search",
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
    announcement: {
      eyebrow: "Upcoming Live Sessions",
      message: "New sessions will be announced soon.",
      href: "/academy/webinars",
    },
  },
  tabs: [
    { label: "Overview", targetId: "overview" },
    { label: "Featured Event", targetId: "featured-event" },
    { label: "Webinars & Events", targetId: "webinars-events" },
    { label: "Evergreen courses", targetId: "courses" },
    { label: "Blog", targetId: "blog" },
  ],
  featuredEvent: {
    eyebrow: "Featured Event",
    sectionTitle: "Don't miss what's next",
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
    countLabel: "Browse the catalogue",
    viewMoreLabel: "Browse all webinars & events",
    total: 0,
    items: [],
    emptyState: {
      icon: "calendar",
      title: "Nothing scheduled right now",
      description:
        "We're lining up the next round of webinars and live sessions — check back soon.",
      ctaLabel: "Browse all webinars & events",
      ctaHref: "/academy/webinars",
    },
  },
  courses: {
    eyebrow: "Learning Opportunities",
    title: "Courses to Learn at your pace.",
    countLabel: "Browse the catalogue",
    viewMoreLabel: "Browse all courses",
    total: 0,
    items: [],
    emptyState: {
      icon: "graduation-cap",
      title: "No courses open right now",
      description:
        "New cohorts and programmes post here as soon as enrolment opens.",
      ctaLabel: "Browse all courses",
      ctaHref: "/academy/courses",
    },
  },
  blog: {
    eyebrow: "Blog",
    title: "Latest about AgriBusiness",
    countLabel: "Browse the catalogue",
    viewMoreLabel: "Browse all articles",
    total: 0,
    items: [],
    emptyState: {
      icon: "newspaper",
      title: "No articles published yet",
      description:
        "Fresh insights and analysis post here as soon as they're live.",
      ctaLabel: "Browse all articles",
      ctaHref: "/academy/blog",
    },
  },
  testimonials: {
    eyebrow: "Our Impact",
    title: "What our community says",
    description:
      "Farmers, traders and innovators on what iProduce changed for them.",
    items: [],
  },
  faqs: {
    eyebrow: "Frequently asked questions",
    description:
      "Everything about the academy, programmes and learning pathways — answered plainly.",
    categories: ["All", "Courses", "Webinars & Events", "Membership"] as const,
    items: [],
  },
} as const satisfies AcademyContent;

export const academyRegistrationContent = {
  dialog: {
    webinar: {
      title: "Register for this session",
      description:
        "Share your details to register. A confirmation may arrive in your inbox shortly.",
      buttonLabel: "Register now",
      submitLabel: "Complete registration",
      successTitle: "Registration received",
      successDescription:
        "Thanks for registering. We've received your details. A confirmation may arrive shortly, and our team will follow up if any next steps are needed.",
      successDoneLabel: "Done",
      fields: {
        fullName: "Full name",
        email: "Email address",
        phone: "Phone number",
        organisation: "Organisation (optional)",
      },
    },
    course: {
      title: "Register your interest",
      description:
        "Tell us you are interested in this course. A confirmation may arrive in your inbox shortly.",
      buttonLabel: "Register interest",
      submitLabel: "Send my interest",
      successTitle: "Interest received",
      successDescription:
        "Thanks for your interest. We've received your details. A confirmation may arrive shortly, and our team will follow up when enrolment opens.",
      successDoneLabel: "Done",
      fields: {
        fullName: "Full name",
        email: "Email address",
        phone: "Phone number",
        organisation: "Organisation (optional)",
      },
    },
  },
} as const satisfies AcademyRegistrationContent;

export const academyHomePreview = {
  opportunities: academyContent.opportunities.items.map((item) => ({
    icon: item.icon,
    title: item.title,
    description: item.description,
    href: item.anchor.startsWith("#") ? `/academy${item.anchor}` : item.anchor,
  })),
  spotlightEmptyState: {
    upcoming: {
      icon: "calendar",
      title: "Nothing scheduled right now",
      description:
        "New webinars and events post here the moment one's confirmed.",
      ctaLabel: "Browse all webinars & events",
      ctaHref: "/academy/webinars",
    },
    training: {
      icon: "graduation-cap",
      title: "No courses open right now",
      description:
        "New cohorts and programmes post here as soon as enrolment opens.",
      ctaLabel: "Browse all courses",
      ctaHref: "/academy/courses",
    },
  },
} as const satisfies AcademyHomePreview;
