import { OTHER_OPTION_VALUE } from "@/schemas/constants";
import { partnersPageContent } from "@/content/partners";
import { placeholderImages } from "@/lib/placeholder-images";
import type { CommunityPageContent } from "@/types/community";

const inquiryOptions = partnersPageContent.inquiry.form.options;

export const communityPageContent = {
  hero: {
    eyebrow: "Membership",
    eyebrowTone: "tangerine",
    title: {
      lead: "Join our ",
      accent: "Agribusiness community.",
    },
    description:
      "Become part of a network of farmers, agripreneurs, investors, and ecosystem leaders shaping agriculture across Africa — including a growing community of women in agriculture.",
    primaryCta: {
      label: "Join our Community",
      href: "/community#membership-application",
      action: "membership-dialog",
    },
    secondaryCta: {
      label: "Explore Member Benefits",
      href: "/community#member-benefits",
    },
    membersLabel: "Agripreneurs, operators and ecosystem builders",
    members: [
      {
        name: "Community member",
        initials: "AM",
        image: placeholderImages.communityMembers.one,
      },
      {
        name: "Community member",
        initials: "BK",
        image: placeholderImages.communityMembers.two,
      },
      {
        name: "Community member",
        initials: "CD",
        image: placeholderImages.communityMembers.three,
      },
    ],
    orbit: {
      rings: [
        {
          radius: 160,
          duration: 34,
          reverse: true,
          items: [
            {
              label: "Exporters",
              icon: "package",
              tone: "tangerine",
              angle: 258,
            },
            {
              label: "Investors",
              icon: "trending-up",
              tone: "tangerine",
              angle: 12,
            },
          ],
        },
        {
          radius: 230,
          duration: 46,
          items: [
            { label: "Farmers", icon: "sprout", tone: "leaf", angle: 270 },
            {
              label: "Logistics",
              icon: "truck",
              tone: "tangerine",
              angle: 322,
            },
            {
              label: "Women in Agriculture",
              icon: "user-round",
              tone: "leaf",
              angle: 108,
            },
            { label: "Processors", icon: "factory", tone: "leaf", angle: 168 },
            {
              label: "Youth Agripreneurs",
              icon: "lightbulb",
              tone: "leaf",
              angle: 222,
            },
          ],
        },
      ],
    },
  },
  whyJoin: {
    eyebrow: "Why join",
    title: "The Academy teaches. Membership connects.",
    description:
      "Belonging, access, networking and opportunity — everything that happens beyond the classroom.",
    items: [
      {
        icon: "sprout",
        tone: "leaf",
        title: "Idea for startups",
        description:
          "Exclusive access to webinars, events and Academy programmes before anyone else.",
      },
      {
        icon: "handshake",
        tone: "tangerine",
        title: "Build valuable connections",
        description:
          "Connect with agribusiness stakeholders across the continent — by sector and country.",
      },
      {
        icon: "lightbulb",
        tone: "leaf",
        title: "Discover new opportunities",
        description:
          "Explore collaborations, market opportunities and industry initiatives as they open.",
      },
      {
        icon: "mail",
        tone: "tangerine",
        title: "Stay informed",
        description:
          "Receive industry updates, event invitations and insights straight to your inbox.",
      },
      {
        icon: "globe",
        tone: "leaf",
        title: "Expand your network",
        description:
          "Join a growing Pan-African agribusiness ecosystem built for AfCFTA-era trade.",
      },
      {
        icon: "trending-up",
        tone: "tangerine",
        title: "Increase your visibility",
        description:
          "Showcase your expertise and your organisation within the community.",
      },
    ],
  },
  applyBannerPrimary: {
    title: "It only takes two minutes",
    subtitle:
      "Start your application and join Africa's agribusiness community.",
    ctas: [
      {
        label: "Join our Community",
        href: "/community#membership-application",
        variant: "green",
        action: "membership-dialog",
      },
      {
        label: "Explore Member Benefits",
        href: "/community#member-benefits",
        variant: "green-outline",
      },
    ],
  },
  threeSteps: {
    title: "Three steps from application to alliance",
    steps: [
      {
        label: "Step 1",
        title: "Join",
        description:
          "Complete your membership application — it takes about two minutes.",
      },
      {
        label: "Step 2",
        title: "Connect",
        description:
          "Gain access to community opportunities and networking activities across Africa.",
      },
      {
        label: "Step 3",
        title: "Collaborate",
        description:
          "Build partnerships, alliances and business relationships that cross borders.",
      },
    ],
  },
  whoShouldJoin: {
    eyebrow: "Designed for",
    title: "Who should join?",
    description:
      "The community is built for every link in the agricultural value chain.",
    items: [
      {
        icon: "sprout",
        title: "Farmers",
        description: "Smallholder to commercial",
      },
      {
        icon: "tree-pine",
        title: "Input Suppliers",
        description: "Seeds, equipment & agro-inputs",
      },
      {
        icon: "factory",
        title: "Processors",
        description: "Value addition & manufacturing",
      },
      {
        icon: "truck",
        title: "Logistics Providers",
        description: "Storage, haulage & cold chain",
      },
      {
        icon: "store",
        title: "Traders & Retailers",
        description: "Local & cross-border trade",
      },
      {
        icon: "coins",
        title: "Investors",
        description: "Funds, banks & angels",
      },
      {
        icon: "user-round",
        title: "Women in Agriculture",
        description: "Founders, operators & leaders",
      },
      {
        icon: "lightbulb",
        title: "Youth Agripreneurs",
        description: "The next generation",
      },
      {
        icon: "globe",
        title: "Agribusiness Organisations",
        description: "Co-ops, NGOs & associations",
      },
    ],
  },
  memberBenefits: {
    eyebrow: "Member benefits",
    title: "What membership unlocks",
    items: [
      {
        icon: "graduation-cap",
        tone: "leaf",
        title: "Academy access",
        description:
          "Courses, webinars, events and resources — your learning home base.",
      },
      {
        icon: "users",
        tone: "tangerine",
        title: "Community access",
        description: "Join networking initiatives and member-only discussions.",
      },
      {
        icon: "handshake",
        tone: "leaf",
        title: "Business connections",
        description:
          "Meet potential collaborators in your sector across Africa.",
      },
      {
        icon: "trending-up",
        tone: "tangerine",
        title: "Industry opportunities",
        description:
          "Discover trade and ecosystem opportunities as they emerge.",
      },
      {
        icon: "clock",
        tone: "leaf",
        title: "Event invitations",
        description: "Priority access to programmes and networking events.",
      },
      {
        icon: "send",
        tone: "tangerine",
        title: "Updates & insights",
        description:
          "Regular industry communications, curated for your sector.",
      },
    ],
  },
  applyBannerSecondary: {
    title: "Ready to unlock every benefit?",
    subtitle: "Become a member and tap into the full iProduce network.",
    ctas: [
      {
        label: "Join our Community",
        href: "/community#membership-application",
        variant: "green",
        action: "membership-dialog",
      },
    ],
  },
  preview: {
    eyebrow: "Community preview",
    title: "Connect with Africa's agribusiness ecosystem",
    description:
      "Inside the community, members share opportunities, announce events and find the people they need — then take deals forward together.",
    chat: {
      title: "iProduce Africa · Community",
      membersOnlineLabel: "Member discussions",
      pinnedBanner: "Opportunity board · This week",
      messages: [
        {
          id: "ngozi",
          senderName: "Ngozi",
          senderRole: "Processor, Nigeria",
          senderTone: "leaf",
          initials: "NO",
          text: "Looking for shea suppliers who can support steady monthly volume — any members in Ghana or Burkina Faso?",
          align: "left",
          bubbleTone: "grey",
        },
        {
          id: "kwame",
          senderName: "Kwame",
          senderRole: "Farmer co-op, Ghana",
          senderTone: "tangerine",
          initials: "KA",
          text: "We can cover that volume. Sending you a connection request.",
          align: "right",
          bubbleTone: "green",
        },
        {
          id: "events",
          senderName: "iProduce Africa",
          senderRole: "Events",
          senderTone: "leaf",
          initials: "IP",
          text: "Webinar Thursday: Exporting under AfCFTA — members get priority seats. RSVP is open.",
          align: "left",
          bubbleTone: "grey",
        },
      ],
    },
    features: [
      {
        icon: "message-square",
        title: "Community discussions",
        description: "Sector channels where members exchange knowledge daily.",
      },
      {
        icon: "megaphone",
        title: "Event announcements",
        description: "Be first to hear about webinars, trainings and meetups.",
      },
      {
        icon: "lightbulb",
        title: "Opportunity sharing",
        description:
          "Supply requests, partnerships and market openings, posted by members.",
      },
    ],
    channels: [
      {
        id: "telegram",
        label: "Telegram",
        status: "live",
        // TODO(telegram): wire live channel URL
        href: undefined,
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        status: "coming-soon",
      },
      {
        id: "circle",
        label: "Circle",
        status: "coming-soon",
      },
    ],
  },
  memberStories: {
    eyebrow: "Member stories",
    title: "What members build here",
    items: [
      // PLACEHOLDER — replace with real member story
      {
        result: "Launched his farm and now supplies three local retailers.",
        challenge: "Had a poultry idea but no industry contacts or guidance.",
        withIProduce:
          "Joined youth channels, attended two Academy webinars, found a mentor.",
        name: "Tunde",
        initials: "TD",
        role: "Young Agripreneur",
        country: "Nigeria",
      },
      // PLACEHOLDER — replace with real member story
      {
        result: "Secured a steady cross-border supply partnership in Ghana.",
        challenge:
          "Unreliable raw-material supply was stalling her shea butter line.",
        withIProduce:
          "Posted her need on the opportunity board and met verified suppliers.",
        name: "Ngozi",
        initials: "NO",
        role: "Processor",
        country: "Nigeria",
      },
      // PLACEHOLDER — replace with real member story
      {
        result: "Now moves produce across three West African countries.",
        challenge:
          "Wanted to trade beyond his region but lacked trusted contacts.",
        withIProduce:
          "Connected with members in two new markets through community events.",
        name: "Kofi",
        initials: "KM",
        role: "Trader",
        country: "Ghana",
      },
      // PLACEHOLDER — replace with real member story
      {
        result: "Won her first export client and grew her team to twelve.",
        challenge:
          "Ran a strong essential-oils business that nobody outside her city knew.",
        withIProduce:
          "Showcased her work and joined women-in-agriculture programmes.",
        name: "Fatima",
        initials: "FD",
        role: "Agripreneur · Shea processing",
        country: "Senegal",
      },
    ],
  },
  application: {
    id: "membership-application",
    eyebrow: "Become a member",
    title: "Ready to join the ecosystem?",
    description:
      "Tell us a little about yourself and what you do. Applications are reviewed by our team, and you'll hear back within five working days.",
    checklist: [
      "Co-develop programmes & initiatives",
      "Free to apply — no card required",
      "Open to individuals and organisations",
      "Reviewed within 5 working days",
      "Community invite sent on approval",
    ],
    form: {
      title: "Membership application",
      note: "All fields are required. Takes about two minutes.",
      submitLabel: "Join our Community",
      consentText:
        "By applying you agree to receive community updates and event invitations by email.",
      successTitle: "Application sent",
      successDescription:
        "Thanks for applying to join the iProduce community. Our team will review your application and follow up within five working days.",
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
        reason: "Why do you want to join?",
      },
      options: {
        roles: inquiryOptions.roles,
        countries: inquiryOptions.countries,
        sectors: inquiryOptions.sectors,
      },
    },
    dialog: {
      title: "Membership application",
      continueLabel: "Continue",
      backLabel: "Back",
      submitLabel: "Apply for Membership",
      otherOptionValue: OTHER_OPTION_VALUE,
      steps: {
        about: {
          label: "About you",
          title: "First, about you",
          description: "So we know who's joining and how to reach you.",
          placeholders: {
            fullName: "Full name",
            country: "Country",
            email: "Email",
            phone: "Phone",
          },
        },
        work: {
          label: "Your work",
          title: "Now, your work",
          description:
            "This helps us connect you with the right people and opportunities.",
          placeholders: {
            organisation: "Organisation",
            sector: "Sector",
            sectorOther: "Specify sector",
            reason: "Why do you want to join?",
          },
        },
        review: {
          label: "Review",
          title: "Review your application",
          description:
            "Check everything looks right before sending it to our team.",
          whyJoinLabel: "Why join",
          defaultBadge: "Agripreneur",
          reviewFields: [
            { key: "fullName", label: "Full name" },
            { key: "country", label: "Country" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            { key: "organisation", label: "Organisation" },
            { key: "sector", label: "Sector" },
          ],
        },
      },
      success: {
        title: "Application received",
        descriptionTemplate:
          "Thanks, {firstName}. Your application is with our team — here's what happens next.",
        doneLabel: "Done",
        secondaryLabel: "Explore the Academy",
        secondaryHref: "/academy",
        nextSteps: [
          {
            title: "Confirmation email — now",
            description:
              "A receipt of your application lands in your inbox right away.",
          },
          {
            title: "Review — within 5 working days",
            description:
              "Our team reviews your application and may reach out with a question.",
          },
          {
            title: "Welcome & community invite",
            description:
              "On approval, you'll receive your welcome pack and an invite to the member community.",
          },
        ],
      },
    },
  },
  faqs: {
    eyebrow: "Frequently asked questions",
    title: "Questions, answered.",
    description:
      "Everything about joining, approval and the community — answered plainly.",
    categories: ["All", "Platform", "Membership", "Partners"] as const,
    items: [
      {
        question: "Who can join?",
        answer:
          "Anyone working in or supporting African agribusiness — farmers, processors, traders, investors, youth agripreneurs, women in agriculture, and ecosystem organisations. If you contribute to the value chain, you belong here.",
        category: "Membership",
      },
      {
        question: "Is membership free?",
        answer:
          "Yes. Applying and joining the community is free. Some Academy programmes or sponsored events may have separate pricing, which is always stated clearly on the programme page.",
        category: "Membership",
      },
      {
        question: "How long does approval take?",
        answer:
          "Applications are reviewed within five working days. Once approved, you'll receive a community invite by email with next steps for joining channels and events.",
        category: "Membership",
      },
      {
        question: "Can organisations join?",
        answer:
          "Yes. Both individuals and organisations can apply. Use the organisation field to tell us about your company, co-op, or association so we can route you to the right sector channels.",
        category: "Platform",
      },
      {
        question: "How do I access networking opportunities?",
        answer:
          "After approval, you'll get access to member channels, the opportunity board, and event invitations. Active members connect through sector discussions, webinars, and community meetups across Africa.",
        category: "Partners",
      },
    ],
  },
  cta: {
    eyebrow: "Be part of the future",
    title: "Join the Future of African Agribusiness",
    descriptionLead:
      "Connect, learn and grow with a community committed to transforming agriculture across Africa.",
    description:
      "Join free, connect across borders, and turn conversations into alliances.",
    ctas: [
      {
        label: "Join our community",
        href: "/community#membership-application",
        variant: "green",
        icon: "users",
        action: "membership-dialog",
      },
      {
        label: "Partner with us",
        href: "/partners",
        variant: "tangerine",
        icon: "handshake",
      },
    ],
  },
} as const satisfies CommunityPageContent;
