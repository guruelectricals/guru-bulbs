import { defineField, defineType } from "sanity";

export const seoType = defineType({

  name: "seo",
  title: "SEO Settings",
  type: "object",


  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description:
        "Title displayed in Google search results (50-60 characters recommended).",
      validation: (Rule) =>
        Rule.max(60),
    }),



    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 4,
      description:
        "Short description displayed in search engine results (150-160 characters recommended).",
      validation: (Rule) =>
        Rule.max(160),
    }),




    defineField({
      name: "keywords",
      title: "SEO Keywords",
      type: "array",
      description:
        "Important search keywords related to this page.",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        layout: "tags",
      },
    }),





    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description:
        "Preferred URL used by search engines.",
      validation: (Rule) =>
        Rule.uri({
          scheme: [
            "http",
            "https",
          ],
        }),
    }),



    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description:
        "Image displayed when sharing on Facebook, LinkedIn, etc.",
      options: {
        hotspot: true,
      },

      fields: [

        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description:
            "Describe the image for accessibility.",
        },

      ],
    }),


    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      initialValue: false,
      description:
        "Prevent search engines from showing this page in results.",
    }),



    defineField({
      name: "noFollow",
      title: "No Follow",
      type: "boolean",
      initialValue: false,
      description:
        "Prevent search engines from following links on this page.",
    }),


  ],

});