import type { SchemaTypeDefinition } from "sanity";

import { bodyImage } from "@/sanity/schemaTypes/blocks/body-image";
import { callout } from "@/sanity/schemaTypes/blocks/callout";
import { codeBlock } from "@/sanity/schemaTypes/blocks/code-block";
import { table } from "@/sanity/schemaTypes/blocks/table";
import { academyArticle } from "@/sanity/schemaTypes/documents/academy-article";
import { academyCourse } from "@/sanity/schemaTypes/documents/academy-course";
import { academyWebinar } from "@/sanity/schemaTypes/documents/academy-webinar";
import { author } from "@/sanity/schemaTypes/documents/author";
import { faq } from "@/sanity/schemaTypes/documents/faq";
import { memberStory } from "@/sanity/schemaTypes/documents/member-story";
import { partner } from "@/sanity/schemaTypes/documents/partner";
import { teamMember } from "@/sanity/schemaTypes/documents/team-member";
import { testimonial } from "@/sanity/schemaTypes/documents/testimonial";
import { orderedStep } from "@/sanity/schemaTypes/objects/ordered-step";
import { registrationConfig } from "@/sanity/schemaTypes/objects/registration-config";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
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
  registrationConfig,
  orderedStep,
  // Blocks
  callout,
  table,
  codeBlock,
  bodyImage,
];
