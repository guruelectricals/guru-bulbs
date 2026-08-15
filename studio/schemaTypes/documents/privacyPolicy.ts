import { defineField, defineType } from "sanity";

export const privacyPolicyType = defineType({
  name: "privacyPolicy",
  title: "Privacy Policy",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
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
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated Date",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
    }),
    defineField({
      name: "introText",
      title: "Introduction Overview",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "content",
      title: "Policy Content",
      type: "blockContent",
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "lastUpdated",
    },
    prepare({ title, date }) {
      return {
        title: title || "Privacy Policy",
        subtitle: date ? `Last updated: ${date}` : "Sanity CMS Document",
      };
    },
  },
});
