import type { PartnersPageContent } from "@/types/partners";
import { countryOptions } from "@/content/countries";
import { OTHER_OPTION_VALUE } from "@/schemas/constants";

export type Partner = {
  id: string;
  name: string;
  logo: string;
  href?: string;
  /** Lower numbers surface first in marquee + voices grid (CMS `order`). */
  order?: number;
};

export const partnersList: Partner[] = [
  {
    id: "islamic-development-bank",
    name: "Islamic Development Bank",
    logo: "/images/partners/islamic-development-bank.webp",
    href: "https://www.isdb.org/",
    order: 1,
  },
  {
    id: "wima",
    name: "Women in Mechanized Agriculture Association (WIMA)",
    logo: "/images/partners/wima.webp",
    href: "https://wimanigeria.com/",
    order: 2,
  },
  {
    id: "icreate-africa",
    name: "iCreate Africa",
    logo: "/images/partners/icreate-africa.webp",
    href: "https://icreateafrica.com/",
    order: 3,
  },
  {
    id: "nicert",
    name: "NICERT",
    logo: "/images/partners/nicert.webp",
    href: "https://nicert.net/",
    order: 4,
  },
  {
    id: "jaiz-bank",
    name: "Jaiz Bank",
    logo: "/images/partners/jaiz-bank.webp",
    href: "https://jaizbankplc.com/",
    order: 5,
  },
  {
    id: "the-cfg-advisory",
    name: "The CFG Advisory",
    logo: "/images/partners/the-cfg-advisory.webp",
    href: "https://thecfgadvisory.com/",
    order: 6,
  },
  {
    id: "flowdiary",
    name: "Flowdiary",
    logo: "/images/partners/flowdiary.png",
    href: "https://flowdiary.com.ng/",
    order: 7,
  },
];

export const partnersPageContent = {
  hero: {
    eyebrow: "Partner with us",
    eyebrowTone: "tangerine",
    title: {
      lead: "Partner With Us to",
      accentOne: "Transform",
      middle: "Africa's Agribusiness",
      accentTwo: "Future",
    },
    description:
      "We collaborate with organisations, institutions, and ecosystem leaders to create opportunities, build capacity, and strengthen agribusiness across Africa — from development finance and banking to mechanisation, advisory, and skills.",
    primaryCta: {
      label: "Become a Partner",
      href: "#partnership-enquiry",
    },
    secondaryCta: {
      label: "Speak With Our Team",
      href: "/contact",
    },
    map: {
      base: "/images/partners/africa-map.webp",
      baseAlt:
        "Agripreneur giving a thumbs-up while holding fresh produce, masked inside an Africa silhouette",
      backdrop: "/svgs/north-map.svg",
      madagascar: "/svgs/madagascar.svg",
    },
    badge: {
      label: "Partnership pathway",
      value: "For organisations, sponsors and institutions",
    },
  },
  whyPartner: {
    eyebrow: "Why iProduce",
    title: "Why organizations partner with us",
    description:
      "iProduce Africa connects banks, institutions, advisory firms, and sector leaders with agripreneurs who need training, market access, and finance. Partnering here means visibility across a growing ecosystem — not a one-off sponsorship slot.",
    items: [
      {
        icon: "globe",
        title: "Pan-African Reach",
        description:
          "Reach agripreneurs, SMEs, and sector actors across Nigerian and wider African value chains through one platform.",
      },
      {
        icon: "graduation-cap",
        title: "Capacity Building",
        description:
          "Co-deliver training, mentorship, and export-readiness programmes with measurable participant outcomes.",
      },
      {
        icon: "network",
        title: "Industry Network",
        description:
          "Connect with banks, development institutions, advisory firms, and producer associations in one ecosystem.",
      },
      {
        icon: "lightbulb",
        title: "Knowledge Exchange",
        description:
          "Share research, insights, and practical expertise with an audience already engaged in agribusiness growth.",
      },
      {
        icon: "bike",
        title: "Innovation Focus",
        description:
          "Pilot climate-smart tools, digital channels, and new models alongside implementation partners in the field.",
      },
      {
        icon: "sprout",
        title: "Sustainable Impact",
        description:
          "Align programmes with livelihoods, gender inclusion, and long-term value-chain resilience.",
      },
    ],
  },
  impact: {
    eyebrow: "Our Impact",
    title: "Partnership Focus",
    description:
      "Partnerships are shaped around practical collaboration areas while verified impact metrics are still being formalised.",
    items: [
      {
        label: "Capacity building",
        description:
          "Co-created programmes, workshops and learning initiatives for agribusiness actors.",
      },
      {
        label: "Market access",
        description:
          "Collaboration around trade readiness, buyer access and ecosystem introductions.",
      },
      {
        label: "Events & convening",
        description:
          "Industry sessions, forums and community moments that bring stakeholders together.",
      },
      {
        label: "Knowledge exchange",
        description:
          "Research, insights and practical expertise shared through partner-led initiatives.",
      },
    ],
  },
  spotlight: {
    eyebrow: "Partner spotlight",
    title: "Partnerships in practice",
    description:
      "Organisations we work with today — who they are, what they bring, and how they fit the iProduce ecosystem.",
    readMoreLabel: "Read more",
    viewStoryLabel: "View story",
    websiteLabel: "View website",
    showMoreLabel: "Show more partners",
    items: [
      {
        id: "wima",
        name: "Women in Mechanized Agriculture (WIMA)",
        descriptor: "Mechanisation · Women in agriculture",
        description:
          "Nigeria's first women-led agricultural mechanisation association, training women as mechanised service providers across ploughing, harvesting, threshing, and irrigation.",
        story: [
          "Founded in 2019, Women in Mechanized Agriculture (WIMA) is Nigeria's first women-led agricultural mechanisation association. The organisation trains women as mechanised service providers — covering ploughing, harvesting, threshing, drying, irrigation, and crop spraying — and has grown from six members at inception to thousands of women operators across multiple states.",
          "WIMA works through cooperatives, solar-powered mechanisation hubs, and partnerships with development programmes to expand access to climate-smart tools for smallholder farmers. Its long-term goal is to reach one million women farmers with affordable mechanisation services by 2030.",
        ],
        image: "/images/partners/wima.webp",
        imageAlt: "Women in Mechanized Agriculture Association logo",
        imageVariant: "logo",
        website: "https://wimanigeria.com/",
        order: 1,
      },
      {
        id: "islamic-development-bank",
        name: "Islamic Development Bank (IsDB)",
        descriptor: "Development finance · Multilateral",
        description:
          "A multilateral development bank that funded the launch of iProduce Africa through Inara Foundation to strengthen SME export capacity and agri-entrepreneur training in Nigeria.",
        story: [
          "The Islamic Development Bank (IsDB) is a multilateral development institution focused on economic and social progress in member countries. Public launch reporting confirms IsDB funding for iProduce Africa, the digital agribusiness hub created by Inara Foundation and formally launched in Abuja in August 2021.",
          "Through that support, IsDB backs iProduce Africa's work to train agripreneurs and SMEs on export readiness, market linkages, and access to finance — including non-interest funding — as part of Nigeria's broader economic diversification agenda.",
        ],
        image: "/images/partners/islamic-development-bank.webp",
        imageAlt: "Islamic Development Bank logo",
        imageVariant: "logo",
        website: "https://www.isdb.org/",
        order: 2,
      },
      {
        id: "jaiz-bank",
        name: "Jaiz Bank",
        descriptor: "Non-interest banking · Nigeria",
        description:
          "Nigeria's pioneer full-fledged Islamic bank, with agribusiness finance products and over ₦75 billion deployed across the agricultural value chain in its first decade.",
        story: [
          "Jaiz Bank Plc is Nigeria's first full-fledged non-interest bank. Its agribusiness portfolio includes Jaiz Agro Finance through Shariah-compliant contracts such as Salam, Murabaha, and Ijarah — supporting rice mills, SME agribusiness, and wider value-chain financing.",
          "Public reporting places Jaiz among the leading banks financing Nigeria's rice value chain. iProduce Africa's ecosystem work on export readiness and non-interest finance for agripreneurs aligns with the bank's long-standing focus on ethical, asset-backed agricultural financing.",
        ],
        image: "/images/partners/jaiz-bank.webp",
        imageAlt: "Jaiz Bank logo",
        imageVariant: "logo",
        website: "https://jaizbankplc.com/",
        order: 3,
      },
      {
        id: "the-cfg-advisory",
        name: "The CFG Advisory",
        descriptor: "Investment banking · Agribusiness advisory",
        description:
          "A Nigerian boutique investment bank offering structured trade finance, project finance, loan syndication, and advisory services with agribusiness among its core sectors.",
        story: [
          "The CFG Advisory is a boutique investment banking and financial advisory firm headquartered in Nigeria. Its corporate finance practice covers structured trade finance, project finance, loan syndication, venture capital, and private equity — with agribusiness listed explicitly among its sector focus areas.",
          "The firm advises emerging corporates on capital raising, transaction structuring, and investor facilitation. That advisory depth supports agripreneurs and agribusiness actors in the iProduce ecosystem who need structured finance and institutional guidance as they scale.",
        ],
        image: "/images/partners/the-cfg-advisory.webp",
        imageAlt: "The CFG Advisory logo",
        imageVariant: "logo",
        website: "https://thecfgadvisory.com/",
        order: 4,
      },
    ],
  },
  voices: {
    eyebrow: "Trusted by many",
    title: "Hear From Our Valuable Partners",
    items: [
      {
        quote:
          "iProduce Africa's strong network and commitment to innovation make them an ideal partner for organisations seeking measurable impact in agriculture.",
        name: "Musa Fajuyi",
        role: "Partnerships Director, DGT Ltd",
      },
      // PLACEHOLDER — replace with a real partner quote
      {
        quote:
          "Working with iProduce gave our programme reach into communities we had never been able to support directly. The trust they've built across the continent is hard to replicate.",
        name: "Hauwa Bello",
        role: "Programme Lead, Sahara Foundation",
      },
      // PLACEHOLDER — replace with a real partner quote
      {
        quote:
          "A rare partner that brings both depth on the ground and discipline in how they measure outcomes. Our co-designed cohort exceeded every target we set.",
        name: "Dr. Tunde Adeyemi",
        role: "Director of Research, AgriFutures Africa",
      },
    ],
  },
  opportunities: {
    eyebrow: "Partnership opportunities",
    title: "Ways we can work together",
    description:
      "Every partnership starts differently. Tell us what you want to co-create — programmes, events, research, sponsorship, or strategic collaboration — and we'll shape the fit together.",
    items: [
      {
        icon: "graduation-cap",
        title: "Training & Capacity Building",
        description:
          "Co-design Academy workshops, cohort programmes, and mentorship tracks for agripreneurs and producer groups.",
      },
      {
        icon: "coins",
        title: "Sponsorship Opportunities",
        description:
          "Fund events, competitions, or community programmes with clear brand presence and participant access.",
      },
      {
        icon: "network",
        title: "Events & Industry Engagement",
        description:
          "Host or co-host forums, webinars, and convenings that bring your audience into the iProduce network.",
      },
      {
        icon: "search",
        title: "Research & Knowledge Sharing",
        description:
          "Publish joint insights, case studies, or policy briefs drawn from shared programme work.",
      },
      {
        icon: "handshake",
        title: "Strategic Partnerships",
        description:
          "Build multi-year initiatives around finance, mechanisation, market access, or export readiness.",
      },
      {
        icon: "users",
        title: "Community Development Initiatives",
        description:
          "Support livelihood and entrepreneurship programmes tied to women, youth, or rural producer communities.",
      },
    ],
  },
  inquiry: {
    id: "partnership-enquiry",
    eyebrow: "Become a Partner",
    title: "Ready to partner with iProduce?",
    description:
      "Interested in collaborating with iProduce Africa? Tell us about your organization and partnership goals, and a member of our team will be in touch.",
    checklist: [
      "Co-develop programmes & initiatives",
      "Free to apply — no card required",
      "Open to individuals and organisations",
      "Reviewed within 5 working days",
      "Partnership follow-up within one week of approval",
    ],
    form: {
      title: "Partnership Enquiry Form",
      note: "All fields are required. Takes about two minutes.",
      submitLabel: "Submit Inquiry",
      consentText:
        "By submitting this inquiry you agree to receive partnership updates and event invitations by email.",
      successTitle: "Inquiry sent",
      successDescription:
        "Thanks for your interest in partnering with iProduce Africa. Our partnerships team will review your inquiry and follow up within five working days.",
      sendAnotherLabel: "Send another inquiry",
      otherOptionValue: OTHER_OPTION_VALUE,
      placeholders: {
        fullName: "Full name",
        organisation: "Organisation",
        role: "Role",
        roleOther: "Specify role",
        country: "Country",
        sector: "Sector",
        sectorOther: "Specify sector",
        email: "Email",
        phone: "Phone",
        areaOfInterest: "Area of Interest",
        areaOfInterestOther: "Specify area of interest",
        reason: "Why do you want to partner with us?",
      },
      options: {
        roles: [
          { value: "founder-ceo", label: "Founder / CEO" },
          { value: "programme-lead", label: "Programme Lead" },
          { value: "investment-partner", label: "Investment Partner" },
          { value: "researcher", label: "Researcher" },
          { value: "operations-lead", label: "Operations Lead" },
          { value: OTHER_OPTION_VALUE, label: "Other" },
        ],
        countries: countryOptions,
        sectors: [
          { value: "agribusiness", label: "Agribusiness" },
          { value: "finance", label: "Finance" },
          { value: "education", label: "Education" },
          { value: "government", label: "Government" },
          { value: "ngo", label: "NGO / Development" },
          { value: "media", label: "Media" },
          { value: "technology", label: "Technology" },
          { value: OTHER_OPTION_VALUE, label: "Other" },
        ],
        areasOfInterest: [
          { value: "training", label: "Training & Capacity Building" },
          { value: "sponsorship", label: "Sponsorship Opportunities" },
          { value: "events", label: "Events & Industry Engagement" },
          { value: "research", label: "Research & Knowledge Sharing" },
          { value: "strategic", label: "Strategic Partnerships" },
          { value: "community", label: "Community Development" },
          { value: OTHER_OPTION_VALUE, label: "Other" },
        ],
      },
    },
  },
  becomePartner: {
    title: "Become a Partner",
    triggerLabel: "Become a Partner",
    continueLabel: "Continue",
    backLabel: "Back",
    submitLabel: "Submit Partnership Inquiry",
    otherOptionValue: OTHER_OPTION_VALUE,
    steps: {
      organisation: {
        label: "About Organisation",
        title: "Tell Us About Your Organisation",
        description:
          "Help us understand who you are and the type of organisation you represent.",
        placeholders: {
          organisationName: "Organisation Name",
          organisationType: "Organisation Type",
          organisationTypeOther: "Specify organisation type",
          country: "Country of Operation",
          website: "Organisation Website (optional)",
          description:
            "Briefly describe your organisation, mission, and areas of focus.",
        },
      },
      interests: {
        label: "Partnership Interests",
        title: "How Would You Like to Collaborate?",
        description:
          "Select the areas that best align with your partnership interests.",
        goalsPlaceholder:
          "Tell us what your organisation hopes to achieve through a partnership with iProduce Africa.",
        otherInterestPlaceholder: "Specify other partnership interest",
      },
      contact: {
        label: "Contact",
        title: "How Do We Contact You?",
        description:
          "Please provide a point of contact so we can continue the conversation.",
        placeholders: {
          fullName: "Full Name",
          jobTitle: "Job Title",
          email: "Email Address",
          phone: "Phone",
        },
      },
      review: {
        label: "Review",
        title: "Review your inquiry",
        description:
          "Check everything looks right before sending it to our partnerships team.",
        defaultBadge: "Partner inquiry",
        goalsLabel: "Partnership goals",
        reviewFields: [
          { key: "organisationName", label: "Organisation" },
          { key: "organisationType", label: "Organisation type" },
          { key: "country", label: "Country of operation" },
          { key: "fullName", label: "Contact name" },
          { key: "jobTitle", label: "Job title" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
        ],
      },
    },
    organisationTypes: [
      { value: "for-profit", label: "For-Profit Company" },
      { value: "ngo", label: "NGO / Non-profit" },
      { value: "government", label: "Government / Public Sector" },
      { value: "academic", label: "Academic / Research Institution" },
      { value: "foundation", label: "Foundation" },
      { value: "investor", label: "Investor / VC" },
      { value: "media", label: "Media" },
      { value: OTHER_OPTION_VALUE, label: "Other" },
    ],
    partnershipInterests: [
      { value: "event-sponsorship", label: "Event Sponsorship" },
      { value: "training", label: "Training & Capacity Building" },
      { value: "strategic", label: "Strategic Collaboration" },
      { value: "knowledge", label: "Knowledge Partnership" },
      { value: "innovation", label: "Innovation & Technology" },
      { value: "market-access", label: "Market Access & Trade" },
      { value: "research", label: "Research & Insights" },
      { value: "youth-women", label: "Youth & Women Empowerment" },
      { value: OTHER_OPTION_VALUE, label: "Other" },
    ],
    success: {
      title: "Partnership Inquiry Submitted 🎉",
      description:
        "Thank you for your interest in partnering with iProduce Africa. Our team will review your submission and reach out to discuss potential opportunities for collaboration.",
      doneLabel: "Done",
      secondaryLabel: "Explore Academy",
      secondaryHref: "/academy",
    },
  },
  faqs: {
    eyebrow: "Frequently asked questions",
    description:
      "Everything about partnering with iProduce Africa — answered plainly.",
    categories: ["All", "Partnership", "Sponsorship", "Process"] as const,
    items: [
      {
        question: "What kinds of partnerships does iProduce Africa offer?",
        answer:
          "We collaborate on training and capacity building, sponsored events, joint research, strategic market-access initiatives, and community development programmes. The Partnership Enquiry Form below lets you indicate the area that fits your organisation best.",
        category: "Partnership",
      },
      {
        question: "Is there a fee to become a partner?",
        answer:
          "No. Starting a partnership conversation is free. Specific co-developed programmes may have shared costs depending on scope, which are agreed on a per-engagement basis after the initial conversation.",
        category: "Partnership",
      },
      {
        question: "Do you partner with individuals as well as organisations?",
        answer:
          "Yes. We work with founders, researchers, programme leads, and investment partners as individuals as well as with established institutions. The enquiry form covers both pathways.",
        category: "Partnership",
      },
      {
        question: "Can my organisation sponsor a specific programme or event?",
        answer:
          "Sponsorship is one of our most active partnership formats. Choose 'Sponsorship Opportunities' on the enquiry form, share which programme or event line you'd like to support, and our team will follow up within 5 working days.",
        category: "Sponsorship",
      },
      {
        question: "How long does the review take after I submit the form?",
        answer:
          "We aim to review every enquiry within 5 working days. You should receive an email confirming receipt shortly, and a follow-up from a member of our partnerships team once the initial review is complete.",
        category: "Process",
      },
      {
        question: "Do you collaborate with partners outside Africa?",
        answer:
          "Yes — many of our partners are international organisations, development agencies, and investment funds working with the African agricultural sector. The enquiry form's country selector includes options beyond Africa.",
        category: "Partnership",
      },
    ],
  },
  cta: {
    eyebrow: "Be part of the future",
    title: "Let's Build the Future of Agriculture Together",
    description:
      "Join a growing network of organisations committed to innovation, capacity building, and sustainable growth across Africa.",
    ctas: [
      {
        label: "Partner with us",
        href: "#partnership-enquiry",
        variant: "green",
        icon: "handshake",
      },
    ],
  },
} as const satisfies PartnersPageContent;
