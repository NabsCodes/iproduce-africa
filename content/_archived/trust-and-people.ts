/**
 * Pre-Sanity testimonials, FAQs, partners, people, and member-story seed
 * snapshots (Phase 2 trust content).
 * Runtime must not import this file — migration scripts only.
 */
import { aboutPeople as archivedAboutPeople } from "@/content/_archived/about-people";
import { placeholderImages } from "@/lib/placeholder-images";
import type { MemberStoryItem } from "@/types/community";
import type { FaqItem, TestimonialItem } from "@/types/content";
import type { Partner, PartnerVoice } from "@/types/partners";

export const archivedHomeTestimonials = [
  {
    id: "home-aissatou-diallo",
    quote:
      "iProduce connected us to two new buyers in three months — the platform pays for itself.",
    name: "Aïssatou Diallo",
    role: "Cooperative Lead · Senegal",
    image: placeholderImages.testimonials.aissatou,
    initials: "AD",
  },
  {
    id: "home-kofi-mensah",
    quote:
      "From the academy to the community, everything we need to grow sits in one ecosystem.",
    name: "Kofi Mensah",
    role: "Exporter · Ghana",
    initials: "KM",
  },
  {
    id: "home-zainab-a",
    quote:
      "The bootcamp gave me my first export client. I came for the training and left with a market.",
    name: "Zainab A.",
    role: "Shea processor · Kano · Cohort 2",
    initials: "ZA",
  },
  {
    id: "home-tendai-mukamuri",
    quote:
      "The partner network opened doors we'd been knocking on for years. Real introductions, not cold leads.",
    name: "Tendai Mukamuri",
    role: "Agritech Founder · Zimbabwe",
    initials: "TM",
  },
  {
    id: "home-fatou-ndiaye",
    quote:
      "Weekly webinars keep our team current on policy and AfCFTA changes — it's become part of our planning cycle.",
    name: "Fatou Ndiaye",
    role: "Operations Lead · Senegal",
    initials: "FN",
  },
  {
    id: "home-samuel-okoye",
    quote:
      "We joined for the market access and stayed for the community. The peer learning is unmatched.",
    name: "Samuel Okoye",
    role: "Cassava Processor · Nigeria",
    initials: "SO",
  },
] as const satisfies readonly TestimonialItem[];

export const archivedAcademyTestimonials = [
  {
    id: "academy-aissatou-diallo",
    quote:
      "iProduce connected our co-op to two new buyers in 3 months — the platform pays for itself.",
    name: "Aïssatou Diallo",
    role: "Cooperative Lead · Senegal",
    image: placeholderImages.testimonials.aissatou,
    initials: "AD",
  },
  {
    id: "academy-kofi-mensah",
    quote:
      "From the academy to the marketplace, everything we need to grow sits in one ecosystem.",
    name: "Kofi Mensah",
    role: "Exporter · Ghana",
    initials: "KM",
  },
  {
    id: "academy-zainab-a",
    quote:
      "The bootcamp gave me my first export client. I came for the training and left with a market.",
    name: "Zainab A.",
    role: "Shea processor · Kano · Cohort 2",
    initials: "ZA",
  },
] as const satisfies readonly TestimonialItem[];

export const archivedPartnerVoices = [
  {
    id: "partner-voice-musa-fajuyi",
    quote:
      "iProduce Africa's strong network and commitment to innovation make them an ideal partner for organisations seeking measurable impact in agriculture.",
    name: "Musa Fajuyi",
    role: "Partnerships Director, DGT Ltd",
  },
  {
    id: "partner-voice-hauwa-bello",
    quote:
      "Working with iProduce gave our programme reach into communities we had never been able to support directly. The trust they've built across the continent is hard to replicate.",
    name: "Hauwa Bello",
    role: "Programme Lead, Sahara Foundation",
  },
  {
    id: "partner-voice-tunde-adeyemi",
    quote:
      "A rare partner that brings both depth on the ground and discipline in how they measure outcomes. Our co-designed cohort exceeded every target we set.",
    name: "Dr. Tunde Adeyemi",
    role: "Director of Research, AgriFutures Africa",
  },
] as const satisfies readonly PartnerVoice[];

export const archivedHomeFaqs = [
  {
    question: "What is iProduce Africa?",
    answer:
      "iProduce Africa is an agribusiness ecosystem connecting farmers, processors, traders, investors and innovators across the continent — with learning, networking and market-access tools in one place.",
    category: "Platform",
  },
  {
    question: "Who is the platform for?",
    answer:
      "Farmers, processors, traders, investors, researchers, agripreneurs, and women in agriculture — anyone building across the continent.",
    category: "Platform",
  },
  {
    question: "Is it free to join?",
    answer:
      "Basic community membership is free. Premium programmes and Academy courses may have separate pricing, which will be stated on each programme page.",
    category: "Membership",
  },
  {
    question: "Which countries do you operate in?",
    answer:
      "Our digital programmes and community are built for participants across Africa, with physical activities announced by location.",
    category: "Platform",
  },
  {
    question: "How do I become a partner?",
    answer:
      "Partners collaborate through co-designed programmes, market access initiatives, capacity building, and thought leadership. Visit our Partners page to start a conversation.",
    category: "Partners",
  },
] as const satisfies readonly FaqItem[];

export const archivedAcademyFaqs = [
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
] as const satisfies readonly FaqItem[];

export const archivedCommunityFaqs = [
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
] as const satisfies readonly FaqItem[];

export const archivedPartnersFaqs = [
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
] as const satisfies readonly FaqItem[];

export const archivedPartnersList: Partner[] = [
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
    id: "the-cfg-advisory",
    name: "The CFG Advisory",
    logo: "/images/partners/the-cfg-advisory.webp",
    href: "https://thecfgadvisory.com/",
    order: 5,
  },
  {
    id: "flowdiary",
    name: "Flowdiary",
    logo: "/images/partners/flowdiary.png",
    href: "https://flowdiary.com.ng/",
    order: 6,
  },
];

export { archivedAboutPeople };

export const archivedMemberStories = [
  {
    id: "tunde",
    result: "Launched his farm and now supplies three local retailers.",
    challenge: "Had a poultry idea but no industry contacts or guidance.",
    withIProduce:
      "Joined youth channels, attended two Academy webinars, found a mentor.",
    name: "Tunde",
    initials: "TD",
    role: "Young Agripreneur",
    country: "Nigeria",
  },
  {
    id: "ngozi",
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
  {
    id: "kofi",
    result: "Now moves produce across three West African countries.",
    challenge: "Wanted to trade beyond his region but lacked trusted contacts.",
    withIProduce:
      "Connected with members in two new markets through community events.",
    name: "Kofi",
    initials: "KM",
    role: "Trader",
    country: "Ghana",
  },
  {
    id: "fatima",
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
] as const satisfies readonly MemberStoryItem[];
