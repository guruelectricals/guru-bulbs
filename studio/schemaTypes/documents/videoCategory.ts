import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons/Tag'
export default defineType({
  name: 'videoCategory',
  title: 'Video Categories',
  type: 'document',
  icon: TagIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
})