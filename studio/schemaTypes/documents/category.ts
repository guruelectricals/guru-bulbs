import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Categories",
  type: "document",

  groups: [
    {
      name: "general",
      title: "General",
      default: true,
    },
    {
      name: "image",
      title: "Image",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],


  fields: [
  
    defineField({
      name: "title",
      title: "Category Name",
      type: "string",
      group: "general",
      description:
        "Enter the category name.",
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(100),
    }),


    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "general",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required(),
    }),


    defineField({
      name: "code",
      title: "Category Code",
      type: "string",
      group: "general",
      description:
        "Example: ELEC, FURN, ACC",
      validation: (Rule) =>
        Rule.max(10),
    }),


    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      group: "general",
      description:
        "Short category introduction.",
      validation: (Rule) =>
        Rule.max(150),
    }),


    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      group: "general",
      description:
        "Controls category display priority.",
      initialValue: 1,
      validation: (Rule) =>
        Rule.required().min(1),
    }),


    defineField({
      name: "featured",
      title: "Featured Category",
      type: "boolean",
      group: "general",
      initialValue: false,
    }),


    defineField({
      name: "isActive",
      title: "Active Category",
      type: "boolean",
      group: "general",
      initialValue: true,
    }),

    defineField({
      name: "image",
      title: "Category Image",
      type: "image",
      group: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
        },
      ],
    }),


    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),

  ],



  preview: {

    select: {
      title: "title",
      subtitle: "slug.current",
      media: "image",
    },

  },


  orderings: [

    {
      title: "Display Order",
      name: "displayOrderAsc",

      by: [
        {
          field: "displayOrder",
          direction: "asc",
        },
      ],
    },

  ],

});
