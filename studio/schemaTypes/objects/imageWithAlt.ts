import {defineField, defineType} from 'sanity'

export const imageWithAltType = defineType({
  name: 'imageWithAlt',
  title: 'Image with Alt Text',
  type: 'object',

  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: false,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description:
        'Describe the image for accessibility and SEO.',
      validation: (Rule) => Rule.required().max(150),
    }),
  ],

  preview: {
    select: {
      title: 'alt',
      media: 'image',
    },
    prepare({title, media}) {
      return {
        title: title || 'Image',
        subtitle: 'Image with Alt Text',
        media,
      }
    },
  },
})