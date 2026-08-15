import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Post Title",
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
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "mainImage",
      title: "Cover Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "categories",
      title: "Tags / Categories",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Short Excerpt / Summary",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "body",
      title: "Article Content",
      type: "blockContent",
    }),
    defineField({
      name: "readTime",
      title: "Reading Time",
      type: "string",
      description: "Example: 5 min read",
    }),
    defineField({
      name: "featured",
      title: "Featured Article?",
      type: "boolean",
      description: "Highlight at the top of the blog page.",
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
      author: "author.name",
      media: "mainImage.image",
      date: "publishedAt",
    },
    prepare({ title, author, media, date }) {
      const formattedDate = date ? new Date(date).toLocaleDateString() : "";
      return {
        title: title || "Untitled Article",
        subtitle: `${author ? `By ${author} · ` : ""}${formattedDate}`,
        media,
      };
    },
  },
});
