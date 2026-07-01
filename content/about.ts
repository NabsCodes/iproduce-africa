import { getAboutPeopleByGroup } from "@/content/about-people";
import { placeholderImages } from "@/lib/placeholder-images";
import type { AboutPageContent } from "@/types/about";

export const aboutPageContent = {
  hero: {
    eyebrow: "we are iPRODUCE AFRICA",
    eyebrowTone: "tangerine",
    title: {
      lineOne: {
        lead: "Building ",
        accent: "Africa's Most",
      },
      lineTwo: "Connected Agribusiness",
      lineThree: "Ecosystem.",
    },
    description:
      "iProduce Africa is creating a digital ecosystem that empowers agripreneurs — with strong support for women in agriculture — through tools, partnerships, knowledge, and market access.",
    orbit: {
      url: "iproduce.africa",
      summaryLabel: "Learning, trade and partnership pathways",
      rings: [
        {
          radius: 165,
          duration: 36,
          items: [
            { icon: "users", tone: "leaf", angle: 274 },
            { icon: "globe", tone: "tangerine", angle: 82 },
          ],
        },
        {
          radius: 231,
          duration: 44,
          reverse: true,
          items: [
            { icon: "handshake", tone: "tangerine", angle: 322 },
            { icon: "user-round", tone: "leaf", angle: 168 },
          ],
          dots: [{ tone: "tangerine", angle: 78 }],
        },
        {
          radius: 299,
          duration: 52,
          items: [
            { icon: "graduation-cap", tone: "leaf", angle: 213 },
            { icon: "sprout", tone: "leaf", angle: 312 },
          ],
          dots: [{ tone: "leaf", angle: 22 }],
        },
      ],
    },
  },
  story: {
    eyebrow: "Our Story",
    title: "From one webinar to a pan-African hub.",
    paragraphs: [
      "We started with a simple observation: agriculture was changing faster than the people in it could keep up. What began with early webinars is growing into a hub for training, evergreen courses and a developing member network.",
      "The world is moving to smart, technology-led agriculture — and Africa will not be left behind. iProduce is where that future is taught, connected and traded.",
    ],
    image: placeholderImages.about.story,
    videoAriaLabel: "Intro video coming soon",
    primaryCta: {
      label: "Join our community",
      href: "/community#membership-application",
      action: "membership-dialog",
    },
    secondaryCta: { label: "Explore the Academy", href: "/academy" },
  },
  missionVisionObjective: {
    mission: {
      eyebrow: "Our Mission",
      body: "To build an integrated Digital African Agri-business Ecosystem.",
    },
    vision: {
      eyebrow: "Our Vision",
      body: "A prosperous, food-secure Africa where every agri-business — from smallholder farmer to global exporter — thrives through seamless digital connectivity, data-driven insights, and inclusive market access.",
    },
    objective: {
      eyebrow: "Our Objective",
      body: "Seamless digital connectivity. One interoperable platform linking production, logistics, finance, and trade.",
    },
  },
  impactStats: {
    eyebrow: "Our Impact",
    title: "Proof Points Behind the Platform",
    description:
      "Our work is organised around the practical support agripreneurs need before growth metrics are published.",
    items: [
      {
        label: "Learning & capacity",
        description:
          "Programmes, webinars and evergreen resources built for practical agribusiness growth.",
      },
      {
        label: "Community access",
        description:
          "A member pathway for agripreneurs, operators and ecosystem builders to connect.",
      },
      {
        label: "Market connections",
        description:
          "A platform direction centred on opportunities, buyers, partners and support pathways.",
      },
      {
        label: "Strategic collaboration",
        description:
          "Partnership conversations shaped around capacity building and ecosystem impact.",
      },
    ],
  },
  journey: {
    eyebrow: "Our Journey",
    title: "How we've gone thus far over the years",
    focusPanelLabel: "What we focused on",
    milestones: [
      {
        year: "2021",
        title: "The Idea",
        description:
          "Founded in Lagos with a simple belief: Africa's agribusiness actors needed a shared digital home — a place to learn, connect, and grow together.",
        leftImage: placeholderImages.about.journey.idea,
        focusPoints: [
          "Small founding team",
          "First online sessions",
          "Early community conversations",
        ],
      },
      {
        year: "2022",
        title: "First Cohort",
        description:
          "Launched our inaugural training cohort across several African markets. The response confirmed the need was real and urgent.",
        leftImage: placeholderImages.about.journey.cohort,
        focusPoints: [
          "Inaugural training programmes",
          "Cross-border participation",
          "Strong early demand",
        ],
      },
      {
        year: "2023",
        title: "Ecosystem Expansion",
        description:
          "Opened institutional partnerships with universities, development agencies, and agricultural bodies across West and East Africa.",
        leftImage: placeholderImages.about.journey.expansion,
        focusPoints: [
          "Institutional partnerships",
          "Regional ecosystem reach",
          "Growing member community",
        ],
      },
      {
        year: "2024",
        title: "Platform Launch",
        description:
          "Released the full iProduce platform — integrating learning, networking, and partner services into one connected ecosystem.",
        leftImage: placeholderImages.about.journey.platform,
        focusPoints: [
          "Learning and networking together",
          "Partner services integrated",
          "One connected platform",
        ],
      },
      {
        year: "2026",
        title: "Continent-Wide",
        description:
          "Today, a growing community across the continent is building agribusiness futures through iProduce Africa.",
        leftImage: placeholderImages.about.journey.continent,
        focusPoints: [
          "Pan-African community",
          "Programmes at scale",
          "Long-term partnerships",
        ],
      },
    ],
  },
  team: {
    eyebrow: "Our People",
    title: "Meet the Team",
    description:
      "Our team brings together expertise in agribusiness, partnerships, innovation, and ecosystem development to create opportunities that strengthen agriculture across Africa.",
    viewProfileLabel: "View profile",
    members: getAboutPeopleByGroup("team"),
  },
  advisors: {
    eyebrow: "Strategic Advisors",
    title: "Guided by Industry Experience",
    description:
      "Our Advisory Board comprises experienced leaders, practitioners, and experts who provide strategic guidance, industry insights, and valuable perspectives to support our long-term vision.",
    readMoreLabel: "Read more",
    members: getAboutPeopleByGroup("advisor"),
  },
} as const satisfies AboutPageContent;
