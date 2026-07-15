import { homeContent } from "@/content/home";
import { OTHER_OPTION_VALUE } from "@/schemas/constants";
import type { ContactPageContent } from "@/types/contact";

const mapQuery = encodeURIComponent("3, Baltic Crescent Maitama, Abuja");

export const contactPageContent = {
  hero: {
    eyebrow: "Let's connect",
    title: "Contact",
    description:
      "We're always happy to hear from you! Reach out to our team for inquiries, partnerships, or support in advancing modern and sustainable agriculture.",
    image: {
      src: "/images/contact/contact-hero.webp",
      alt: "iProduce Africa support representative wearing a headset",
    },
    socialLinks: [
      { label: "WhatsApp", platform: "whatsapp", href: undefined },
      { label: "Instagram", platform: "instagram", href: undefined },
      { label: "LinkedIn", platform: "linkedin", href: undefined },
      { label: "Telegram", platform: "telegram", href: undefined },
    ],
  },
  reachOut: {
    title: "Reach out",
    availabilityIntro:
      "Reach out to our team through any of these channels. We're available",
    secondaryPhone: "+234 703 783 6030",
  },
  form: {
    title: "Contact Form",
    description:
      "Complete the form and a member of our team will get back to you as soon as possible.",
    otherOptionValue: OTHER_OPTION_VALUE,
    placeholders: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      subject: "Subject",
      subjectOther: "Tell us what this is about",
      message: "Message",
    },
    options: {
      subjects: [
        { value: "general", label: "General inquiry" },
        { value: "partnership", label: "Partnership opportunities" },
        { value: "community", label: "Community & membership" },
        { value: "academy", label: "Academy & training" },
        { value: "support", label: "Support" },
        { value: "media", label: "Media & press" },
        { value: OTHER_OPTION_VALUE, label: "Other" },
      ],
    },
    submitLabel: "Send Message",
    successTitle: "Message received",
    successDescription:
      "Thanks for reaching out. We've received your message and will get back to you soon, usually within one business day. A confirmation may arrive in your inbox shortly.",
    sendAnotherLabel: "Send another message",
  },
  map: {
    hubTitle: "iProduce AgriBusiness Hub",
    embedUrl: `https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`,
    viewLargerUrl: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
  },
  faqs: {
    eyebrow: "Frequently asked questions",
    title: "Questions, answered.",
    description:
      "Everything about the platform, membership and partnerships — answered plainly.",
    categories: homeContent.faqCategories,
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
        href: "/partners#partnership-enquiry",
        variant: "green",
        icon: "handshake",
      },
    ],
  },
} as const satisfies ContactPageContent;
