import { countryOptions } from "@/content/countries";
import { OTHER_OPTION_VALUE } from "@/schemas/constants";
import type { PartnersPageContent } from "@/types/partners";

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
  voices: {
    eyebrow: "Trusted by many",
    title: "Hear From Our Valuable Partners",
    items: [],
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
    items: [],
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
