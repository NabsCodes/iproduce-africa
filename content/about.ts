import { placeholderImages } from "@/lib/placeholder-images";
import type { AboutPageContent } from "@/types/about";

const portrait = placeholderImages.about.portrait;

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
      "iProduce Africa is creating a digital ecosystem that empowers agripreneurs with the tools, partnerships, knowledge, and market access needed to build sustainable and profitable agricultural businesses.",
    orbit: {
      url: "iproduce.africa",
      statsLabel: "2,400+ members · 12 countries",
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
      "We started with a simple observation: agriculture was changing faster than the people in it could keep up. Our first webinars trained a handful of young agripreneurs; today the hub spans trainings, evergreen courses and a member network across 12 countries.",
      "The world is moving to smart, technology-led agriculture — and Africa will not be left behind. iProduce is where that future is taught, connected and traded.",
    ],
    image: placeholderImages.about.story,
    primaryCta: { label: "Join our community", href: "/community#join" },
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
    title: "Numbers That Tell the Story",
    description:
      "Our trainings, network and alliances are organised around high-opportunity value chains — with more being added.",
    items: [
      { label: "Members served", value: 2400, accent: "+" },
      { label: "Sessions delivered", value: 80, accent: "+" },
      { label: "Partner organisations", value: 45, accent: "+" },
      { label: "Client satisfaction rate", value: 96, accent: "%" },
    ],
  },
  journey: {
    eyebrow: "Our Journey",
    title: "How we've gone thus far over the years",
    milestones: [
      {
        year: "2021",
        title: "The Idea",
        description:
          "Founded in Lagos with a simple belief: Africa's agribusiness actors needed a shared digital home — a place to learn, connect, and grow together.",
        leftImage: placeholderImages.about.journey.idea,
        stats: [
          { label: "Founding team", value: "3" },
          { label: "Pilot webinars", value: "4" },
          { label: "Early attendees", value: "120" },
        ],
      },
      {
        year: "2022",
        title: "First Cohort",
        description:
          "Launched our inaugural training cohort with 120 participants across 8 countries. The response confirmed the need was real and urgent.",
        leftImage: placeholderImages.about.journey.cohort,
        stats: [
          { label: "Participants", value: "120" },
          { label: "Countries", value: "8" },
          { label: "Programmes", value: "4" },
        ],
      },
      {
        year: "2023",
        title: "Ecosystem Expansion",
        description:
          "Opened institutional partnerships with 30+ universities, development agencies, and agricultural bodies across West and East Africa.",
        leftImage: placeholderImages.about.journey.expansion,
        stats: [
          { label: "Partners", value: "30+" },
          { label: "Countries", value: "12" },
          { label: "Members", value: "5,200" },
        ],
      },
      {
        year: "2024",
        title: "Platform Launch",
        description:
          "Released the full iProduce platform — integrating learning, networking, and partner services into one connected ecosystem.",
        leftImage: placeholderImages.about.journey.platform,
        stats: [
          { label: "Members", value: "6,400" },
          { label: "Countries", value: "18" },
          { label: "Courses live", value: "26" },
        ],
      },
      {
        year: "2026",
        title: "Continent-Wide",
        description:
          "Today, over 12,000 members in 47 countries are growing their agribusiness futures through iProduce Africa.",
        leftImage: placeholderImages.about.journey.continent,
        stats: [
          { label: "Members", value: "12,000" },
          { label: "Countries", value: "47" },
          { label: "Partners", value: "30+" },
        ],
      },
    ],
  },
  team: {
    eyebrow: "Our People",
    title: "Meet the Team",
    description:
      "Our team brings together expertise in agribusiness, partnerships, innovation, and ecosystem development to create opportunities that strengthen agriculture across Africa.",
    members: [
      {
        name: "Adaeze Okonkwo",
        role: "Founder & CEO",
        bio: "Adaeze leads the strategic vision and growth of iProduce Africa, working with stakeholders across the agricultural ecosystem.",
        photo: portrait,
        socials: {
          linkedin: "https://www.linkedin.com/in/adaze-okonkwo-36213616/",
          facebook: "https://www.facebook.com/adaze.okonkwo",
        },
      },
      {
        name: "Kwame Mensah",
        role: "Co-founder & COO",
        bio: "Kwame leads operations and partnerships, working with stakeholders across the agricultural ecosystem to scale impact.",
        photo: portrait,
        socials: {},
      },
      {
        name: "Tunde Adeyemi",
        role: "Head of Community & Partnerships",
        bio: "Tunde nurtures the member network and forges new partnerships across the continent's agribusiness ecosystem.",
        photo: portrait,
        socials: {},
      },
      {
        name: "Aissatou Diallo",
        role: "Head of Programmes",
        bio: "Aissatou designs the learning and training programmes that power iProduce Africa's member network.",
        photo: portrait,
        socials: {},
      },
      {
        name: "Lerato Modise",
        role: "Head of Partnerships",
        bio: "Lerato builds and maintains strategic partnerships with institutions across the African continent.",
        photo: portrait,
        socials: {},
      },
    ],
  },
  advisors: {
    eyebrow: "Strategic Advisors",
    title: "Guided by Industry Experience",
    description:
      "Our Advisory Board comprises experienced leaders, practitioners, and experts who provide strategic guidance, industry insights, and valuable perspectives to support our long-term vision.",
    members: [
      {
        name: "Adaeze Okonkwo",
        role: "Founder & CEO",
        bio: "Adaeze leads the strategic vision and growth of iProduce Africa, working with stakeholders across the agricultural ecosystem.",
        photo: portrait,
      },
      {
        name: "Kwame Mensah",
        role: "Co-founder & COO",
        bio: "Kwame leads operations and partnerships, working with stakeholders across the agricultural ecosystem to scale impact.",
        photo: portrait,
      },
      {
        name: "Tunde Adeyemi",
        role: "Head of Community & Partnerships",
        bio: "Tunde nurtures the member network and forges new partnerships across the continent's agribusiness ecosystem.",
        photo: portrait,
      },
      {
        name: "Aissatou Diallo",
        role: "Head of Programmes",
        bio: "Aissatou designs the learning and training programmes that power iProduce Africa's member network.",
        photo: portrait,
      },
    ],
  },
} as const satisfies AboutPageContent;
