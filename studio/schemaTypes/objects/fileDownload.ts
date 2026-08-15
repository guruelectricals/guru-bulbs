import { defineField, defineType } from "sanity";

export const fileDownloadType = defineType({
  name: "fileDownload",
  title: "Product Download File",
  type: "object",

  fields: [

    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      description:
        "Name of the downloadable document.",
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(100),
    }),



    defineField({
      name: "documentType",
      title: "Document Type",
      type: "string",
      description:
        "Select the type of document.",
      options: {
        list: [
          {
            title: "Product Catalogue",
            value: "catalogue",
          },
          {
            title: "Datasheet",
            value: "datasheet",
          },
          {
            title: "Installation Manual",
            value: "installation-manual",
          },
          {
            title: "User Manual",
            value: "user-manual",
          },
          {
            title: "Warranty Document",
            value: "warranty",
          },
          {
            title: "Brochure",
            value: "brochure",
          },
          {
            title: "Certificate",
            value: "certificate",
          },
          {
            title: "Other",
            value: "other",
          },
        ],

        layout: "dropdown",
      },

      validation: (Rule) =>
        Rule.required(),
    }),




    defineField({
      name: "file",
      title: "Upload File",
      type: "file",
      description:
        "Upload PDF or supported document.",
      options: {
        accept:
          ".pdf,.doc,.docx",
      },

      validation: (Rule) =>
        Rule.required(),
    }),





    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description:
        "Controls the order of documents displayed.",
      initialValue: 1,

      validation: (Rule) =>
        Rule.required()
          .min(1),
    }),

  ],



  preview: {
  select: {
    title: "title",
    subtitle: "documentType",
  },

  prepare({ title, subtitle }) {
    return {
      title,
      subtitle: subtitle
        ? subtitle.replace("-", " ")
        : "Document",
    };
  },
},

});