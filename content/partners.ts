import type { PartnersPageContent } from "@/types/partners";

export type Partner = {
  id: string;
  name: string;
  logo: string;
  href?: string;
};

export const partnersList: Partner[] = [
  {
    id: "icreate-africa",
    name: "iCreate Africa",
    logo: "/images/partners/icreate-africa.webp",
  },
  {
    id: "islamic-development-bank",
    name: "Islamic Development Bank",
    logo: "/images/partners/islamic-development-bank.webp",
  },
  {
    id: "nicert",
    name: "NICERT",
    logo: "/images/partners/nicert.webp",
  },
];

// 12-cell logo grid for the partner voices section — repeats the available
// logos in a deliberate rotation so the grid reads as 'many partners' without
// inventing logos we don't have yet.
const voicesLogoOrder: string[] = [
  "islamic-development-bank",
  "icreate-africa",
  "nicert",
  "nicert",
  "islamic-development-bank",
  "icreate-africa",
  "icreate-africa",
  "nicert",
  "islamic-development-bank",
  "islamic-development-bank",
  "icreate-africa",
  "nicert",
];

const voicesLogos = voicesLogoOrder.map((id, index) => {
  const partner = partnersList.find((p) => p.id === id);
  if (!partner) {
    throw new Error(`Unknown partner id in voicesLogoOrder: ${id}`);
  }
  return {
    id: `${id}-${index}`,
    name: partner.name,
    logo: partner.logo,
  };
});

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
      "We collaborate with organisations, institutions, and ecosystem leaders to create opportunities, build capacity, and strengthen agribusiness across Africa.",
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
    stat: {
      label: "Sustainable development",
      value: "10+ Industry Collaborations",
    },
  },
  whyPartner: {
    eyebrow: "Trusted Partnerships",
    title: "Why Organizations Choose to Partner With Us",
    description:
      "iProduce Africa serves as a platform that connects stakeholders across the agricultural ecosystem. Through partnerships, we help create meaningful impact by fostering collaboration, knowledge exchange, innovation, and industry growth.",
    items: [
      {
        icon: "globe",
        title: "Pan-African Reach",
        description:
          "Connect with stakeholders across African markets and value chains.",
        tone: "solid",
      },
      {
        icon: "graduation-cap",
        title: "Capacity Building",
        description:
          "Support programmes that empower youth, women, and agribusiness entrepreneurs.",
      },
      {
        icon: "network",
        title: "Industry Network",
        description:
          "Engage with professionals and organisations shaping agribusiness across Africa.",
      },
      {
        icon: "lightbulb",
        title: "Knowledge Exchange",
        description:
          "Promote learning through shared expertise, research, and industry insights.",
      },
      {
        icon: "bike",
        title: "Innovation Focus",
        description:
          "Advance technology adoption and future-ready agribusiness solutions.",
      },
      {
        icon: "sprout",
        title: "Sustainable Impact",
        description:
          "Create measurable outcomes that strengthen communities and agricultural ecosystems.",
      },
    ],
  },
  impact: {
    eyebrow: "Our Impact",
    title: "Partnership Impact",
    description:
      "Our trainings, network and alliances are organised around high-opportunity value chains — with more being added.",
    items: [
      { label: "Participants Trained", value: 5000, accent: "+" },
      { label: "Countries Reached", value: 20, accent: "+" },
      { label: "Events Hosted", value: 100, accent: "+" },
      { label: "Active Community Members", value: 500, accent: "+" },
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
      {
        quote:
          "Working with iProduce gave our programme reach into communities we had never been able to support directly. The trust they've built across the continent is hard to replicate.",
        name: "Hauwa Bello",
        role: "Programme Lead, Sahara Foundation",
      },
      {
        quote:
          "A rare partner that brings both depth on the ground and discipline in how they measure outcomes. Our co-designed cohort exceeded every target we set.",
        name: "Dr. Tunde Adeyemi",
        role: "Director of Research, AgriFutures Africa",
      },
    ],
    logos: voicesLogos,
  },
  opportunities: {
    eyebrow: "Partnership Opportunities",
    title: "Ways We Can Work Together",
    description:
      "Every partnership is unique. Whether you're looking to support a programme, sponsor an event, or co-create initiatives, we'll work with you to identify the right collaboration approach.",
    items: [
      {
        icon: "graduation-cap",
        title: "Training & Capacity Building",
        description:
          "Support workshops, mentorship programmes, and professional development initiatives that empower agricultural stakeholders.",
      },
      {
        icon: "coins",
        title: "Sponsorship Opportunities",
        description:
          "Support programmes and events that create measurable impact across the agricultural ecosystem.",
      },
      {
        icon: "network",
        title: "Events & Industry Engagement",
        description:
          "Collaborate on conferences, forums, networking events, and knowledge-sharing opportunities.",
      },
      {
        icon: "search",
        title: "Research & Knowledge Sharing",
        description:
          "Partner on industry insights, publications, thought leadership, and collaborative research projects.",
      },
      {
        icon: "handshake",
        title: "Strategic Partnerships",
        description:
          "Work together on initiatives that strengthen agricultural value chains, innovation, and market access.",
      },
      {
        icon: "users",
        title: "Community Development Initiatives",
        description:
          "Support programmes that improve livelihoods, encourage entrepreneurship, and foster agricultural growth.",
      },
    ],
  },
  inquiry: {
    id: "partnership-enquiry",
    eyebrow: "Become a Partner",
    title: "Ready to partner with iproduce?",
    description:
      "Interested in collaborating with iProduce Africa? Tell us about your organization and partnership goals, and a member of our team will be in touch.",
    checklist: [
      "Co-develop programmes & initiatives",
      "Free to apply — no card required",
      "Open to individuals and organisations",
      "Reviewed within 5 working days",
      "Community invite sent on approval",
    ],
    form: {
      title: "Partnership Enquiry Form",
      note: "All fields are required. Takes about two minutes.",
      submitLabel: "Submit Inquiry",
      consentText:
        "By making inquiry you agree to receive community updates and event invitations by email.",
      successTitle: "Thanks — we've received your inquiry.",
      successDescription:
        "A member of our team will be in touch within 5 working days.",
      placeholders: {
        fullName: "Full name",
        organisation: "Organisation",
        role: "Role",
        country: "Country",
        sector: "Sector",
        email: "Email",
        phone: "Phone",
        areaOfInterest: "Area of Interest",
        reason: "Why do you want to join?",
      },
      options: {
        roles: [
          { value: "founder-ceo", label: "Founder / CEO" },
          { value: "programme-lead", label: "Programme Lead" },
          { value: "investment-partner", label: "Investment Partner" },
          { value: "researcher", label: "Researcher" },
          { value: "operations-lead", label: "Operations Lead" },
          { value: "other", label: "Other" },
        ],
        countries: [
          { value: "NG", label: "Nigeria" },
          { value: "GH", label: "Ghana" },
          { value: "KE", label: "Kenya" },
          { value: "SN", label: "Senegal" },
          { value: "CI", label: "Côte d'Ivoire" },
          { value: "RW", label: "Rwanda" },
          { value: "UG", label: "Uganda" },
          { value: "TZ", label: "Tanzania" },
          { value: "ET", label: "Ethiopia" },
          { value: "EG", label: "Egypt" },
          { value: "MA", label: "Morocco" },
          { value: "ZA", label: "South Africa" },
          { value: "CM", label: "Cameroon" },
          { value: "BJ", label: "Benin" },
          { value: "TG", label: "Togo" },
          { value: "other", label: "Other" },
        ],
        sectors: [
          { value: "agribusiness", label: "Agribusiness" },
          { value: "finance", label: "Finance" },
          { value: "education", label: "Education" },
          { value: "government", label: "Government" },
          { value: "ngo", label: "NGO / Development" },
          { value: "media", label: "Media" },
          { value: "technology", label: "Technology" },
          { value: "other", label: "Other" },
        ],
        areasOfInterest: [
          { value: "training", label: "Training & Capacity Building" },
          { value: "sponsorship", label: "Sponsorship Opportunities" },
          { value: "events", label: "Events & Industry Engagement" },
          { value: "research", label: "Research & Knowledge Sharing" },
          { value: "strategic", label: "Strategic Partnerships" },
          { value: "community", label: "Community Development" },
        ],
      },
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
          "We aim to review every enquiry within 5 working days. You'll get an email confirming receipt immediately, and a follow-up from a member of our partnerships team once the initial review is complete.",
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
    ctaLabel: "Partner with us",
    ctaHref: "#partnership-enquiry",
  },
} as const satisfies PartnersPageContent;
