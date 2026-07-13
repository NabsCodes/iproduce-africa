import type { SchemaTypeDefinition } from "sanity";

import { bodyImage } from "@/sanity/schemaTypes/blocks/body-image";
import { callout } from "@/sanity/schemaTypes/blocks/callout";
import { codeBlock } from "@/sanity/schemaTypes/blocks/code-block";
import { table } from "@/sanity/schemaTypes/blocks/table";
import { aboutPage } from "@/sanity/schemaTypes/documents/about-page";
import { academyArticle } from "@/sanity/schemaTypes/documents/academy-article";
import { academyCourse } from "@/sanity/schemaTypes/documents/academy-course";
import { academyWebinar } from "@/sanity/schemaTypes/documents/academy-webinar";
import { author } from "@/sanity/schemaTypes/documents/author";
import { faq } from "@/sanity/schemaTypes/documents/faq";
import { homePage } from "@/sanity/schemaTypes/documents/home-page";
import { legalPage } from "@/sanity/schemaTypes/documents/legal-page";
import { memberStory } from "@/sanity/schemaTypes/documents/member-story";
import { partner } from "@/sanity/schemaTypes/documents/partner";
import { siteSettings } from "@/sanity/schemaTypes/documents/site-settings";
import { teamMember } from "@/sanity/schemaTypes/documents/team-member";
import { testimonial } from "@/sanity/schemaTypes/documents/testimonial";
import { fixedImageTextSlot } from "@/sanity/schemaTypes/objects/fixed-image-text-slot";
import { imageWithAlt } from "@/sanity/schemaTypes/objects/image-with-alt";
import { legalSection } from "@/sanity/schemaTypes/objects/legal-section";
import { legalTable } from "@/sanity/schemaTypes/objects/legal-table";
import { legalTableRow } from "@/sanity/schemaTypes/objects/legal-table-row";
import { orderedStep } from "@/sanity/schemaTypes/objects/ordered-step";
import { registrationConfig } from "@/sanity/schemaTypes/objects/registration-config";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  siteSettings,
  legalPage,
  homePage,
  aboutPage,
  author,
  academyArticle,
  academyWebinar,
  academyCourse,
  testimonial,
  faq,
  partner,
  teamMember,
  memberStory,
  // Objects
  imageWithAlt,
  fixedImageTextSlot,
  legalSection,
  legalTable,
  legalTableRow,
  registrationConfig,
  orderedStep,
  // Blocks
  callout,
  table,
  codeBlock,
  bodyImage,
];
