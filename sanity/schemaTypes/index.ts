import type { SchemaTypeDefinition } from "sanity";
import { author } from "@/sanity/schemaTypes/documents/author";
import { academyArticle } from "@/sanity/schemaTypes/documents/academy-article";
import { academyWebinar } from "@/sanity/schemaTypes/documents/academy-webinar";
import { academyCourse } from "@/sanity/schemaTypes/documents/academy-course";
import { registrationConfig } from "@/sanity/schemaTypes/objects/registration-config";
import { orderedStep } from "@/sanity/schemaTypes/objects/ordered-step";
import { callout } from "@/sanity/schemaTypes/blocks/callout";
import { table } from "@/sanity/schemaTypes/blocks/table";
import { codeBlock } from "@/sanity/schemaTypes/blocks/code-block";
import { bodyImage } from "@/sanity/schemaTypes/blocks/body-image";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  author,
  academyArticle,
  academyWebinar,
  academyCourse,
  // Objects
  registrationConfig,
  orderedStep,
  // Blocks
  callout,
  table,
  codeBlock,
  bodyImage,
];
