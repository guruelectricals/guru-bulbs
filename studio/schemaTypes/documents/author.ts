import { defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Blog Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Author Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Title / Role",
      type: "string",
      description: "Example: Senior Lighting Engineer",
    }),
    defineField({
      name: "image",
      title: "Avatar Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "bio",
      title: "Author Bio",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image.image",
    },
  },
});
