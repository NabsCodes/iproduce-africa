import { isUpcomingSession } from "@/lib/academy-registration";
import { placeholderImages } from "@/lib/placeholder-images";
import { getBlogHubPreviewItems, blogContent } from "@/content/blog";
import { academyHubCourses, coursesContent } from "@/content/courses";
import {
  academyFeaturedEvent,
  academyHubScheduledWebinars,
  webinarsContent,
  webinarsToHubScheduledItems,
} from "@/content/webinars";
import type {
  AcademyArticleCategory,
  AcademyContent,
  AcademyHomePreview,
  AcademyPreviewTone,
  AcademyRegistrationContent,
} from "@/types/academy";

const HOME_SPOTLIGHT_LIMIT = 4;
const HUB_WEBINAR_HIGHLIGHT_COUNT = academyHubScheduledWebinars.length;
const HUB_COURSE_HIGHLIGHT_COUNT = academyHubCourses.length;
const HUB_BLOG_HIGHLIGHT_COUNT = 3;

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
    nextLive: {
      label: "AfriAgri Leadership Forum · Aug 2026",
      date: "2026-08-12T09:00:00Z",
      href: "/academy/webinars/afriagri-leadership-forum-2026",
    },
  },
  tabs: [
    { label: "Overview", targetId: "overview" },
    { label: "Webinars & Events", targetId: "webinars-events" },
    { label: "Evergreen courses", targetId: "courses" },
    { label: "Blog", targetId: "blog" },
  ],
  featuredEvent: academyFeaturedEvent,
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
    countLabel: `${HUB_WEBINAR_HIGHLIGHT_COUNT} highlighted · ${webinarsContent.webinars.length} in the full catalogue`,
    viewMoreLabel: "Browse all webinars & events",
    total: webinarsContent.webinars.length,
    items: webinarsToHubScheduledItems(academyHubScheduledWebinars),
  },
  courses: {
    eyebrow: "Learning Opportunities",
    title: "Courses to Learn at your pace.",
    countLabel: `${HUB_COURSE_HIGHLIGHT_COUNT} highlighted · ${coursesContent.courses.length} in the full catalogue`,
    viewMoreLabel: "Browse all courses",
    total: coursesContent.courses.length,
    items: academyHubCourses,
  },
  blog: {
    eyebrow: "Blog",
    title: "Latest about AgriBusiness",
    countLabel: `${HUB_BLOG_HIGHLIGHT_COUNT} highlighted · ${blogContent.articles.length} in the full catalogue`,
    viewMoreLabel: "Browse all articles",
    total: blogContent.articles.length,
    items: getBlogHubPreviewItems(HUB_BLOG_HIGHLIGHT_COUNT),
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

export const academyRegistrationContent = {
  dialog: {
    webinar: {
      title: "Register for this session",
      description:
        "Share your details to register. You will receive a confirmation email shortly.",
      buttonLabel: "Register now",
      submitLabel: "Complete registration",
      successTitle: "Registration sent",
      successDescription:
        "Thanks for registering. We received your details and sent a confirmation to your email. Our team will follow up if any next steps are needed.",
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
        "Tell us you are interested in this course. You will receive a confirmation email shortly.",
      buttonLabel: "Register interest",
      submitLabel: "Send my interest",
      successTitle: "Interest registered",
      successDescription:
        "Thanks for your interest. We received your details and sent a confirmation to your email. Our team will follow up when enrolment opens.",
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
  spotlight: {
    upcoming: [...academyContent.scheduled.items]
      .filter((event) => isUpcomingSession(event.date))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, HOME_SPOTLIGHT_LIMIT)
      .map((event) => ({
        key: event.slug,
        href: `/academy/webinars/${event.slug}`,
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
        href: `/academy/courses/${course.slug}`,
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
