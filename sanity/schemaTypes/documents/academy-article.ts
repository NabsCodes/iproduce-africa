import { defineArrayMember, defineField, defineType } from "sanity";
import { createSlugIsUnique } from "@/sanity/schemaTypes/shared/slug-validator";

// Matches content/blog.ts BLOG_CATEGORIES (8 canonical values).
const BLOG_CATEGORIES = [
  "Innovation",
  "Trade",
  "Smart Agriculture",
  "Agribusiness",
  "Policy",
  "Market Insights",
  "Sustainability",
  "Community",
];

export const academyArticle = defineType({
  name: "academyArticle",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: createSlugIsUnique("academyArticle"),
      },
      validation: (Rule) => Rule.required(),
      description:
        "Treat as append-only once published — editing the slug after first publish breaks existing links.",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: BLOG_CATEGORIES },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTimeMinutes",
      title: "Read time (minutes)",
      type: "number",
      description:
        "Optional override. Leave blank to auto-calculate from the body word count.",
      validation: (Rule) => Rule.positive().integer(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cardImage",
      title: "Card image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      description: "Optional — falls back to the card image when omitted.",
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          // Numbered lists are intentionally unsupported — the dedicated
          // `orderedStep` object below is the only path to ordered content,
          // since it carries a {title, body} shape native numbered list
          // items can't represent.
          marks: {
            // Decorators/annotations off for v1: the fetch-side PT adapter
            // doesn't render marks yet, so don't let editors apply
            // formatting that would silently vanish on the public site.
            decorators: [],
            annotations: [],
          },
        }),
        defineArrayMember({ type: "callout" }),
        defineArrayMember({ type: "table" }),
        defineArrayMember({ type: "codeBlock" }),
        defineArrayMember({ type: "bodyImage" }),
        defineArrayMember({ type: "orderedStep" }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "cardImage" },
  },
});
