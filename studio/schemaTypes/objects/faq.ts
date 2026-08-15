import { defineField, defineType } from "sanity";

export const faqType = defineType({
  name: "faq",
  title: "FAQ",
  type: "object",

  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      description: "Frequently asked question.",
      validation: (Rule) =>
        Rule.required().max(200),
    }),

    defineField({
      name: "answer",
      title: "Answer",
      type: "blockContent",
      description: "Answer displayed to customers.",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "question",
    },
  },
});