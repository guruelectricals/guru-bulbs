import { defineArrayMember, defineType } from "sanity";

export const blockContentType = defineType({
  name: "blockContent",
  title: "Rich Text Content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",

      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],

      lists: [
        { title: "Bullet List", value: "bullet" },
        { title: "Numbered List", value: "number" },
      ],

      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],

        annotations: [
          {
            name: "link",
            type: "object",
            title: "External Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
              },
            ],
          },
        ],
      },
    }),
  ],
});