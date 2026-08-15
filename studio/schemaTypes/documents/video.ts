import {defineType, defineField} from 'sanity'
import {VideoIcon} from '@sanity/icons/Video'

export default defineType({
  name: 'video',
  title: 'Videos',
  type: 'document',
  icon: VideoIcon,

  groups: [
    {
      name: 'general',
      title: 'General',
      default: true,
    },
    {
      name: 'media',
      title: 'Media',
    },
    {
      name: 'display',
      title: 'Display',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],

  fields: [
 
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'general',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      group: 'general',
    }),

    defineField({
      name: 'category',
      title: 'Video Category',
      type: 'reference',
      to: [{type: 'videoCategory'}],
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'featured',
      title: 'Featured Video',
      type: 'boolean',
      group: 'general',
      initialValue: false,
    }),

    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      group: 'general',
      initialValue: true,
    }),

 
    defineField({
      name: 'videoSource',
      title: 'Video Source',
      type: 'string',
      group: 'media',
      initialValue: 'tiktok',
      options: {
        list: [
          {
            title: 'TikTok',
            value: 'tiktok',
          },
          {
            title: 'Upload Video',
            value: 'upload',
          },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'tiktokUrl',
      title: 'TikTok URL',
      type: 'url',
      group: 'media',
      description: 'Paste the TikTok video URL here.',
    }),

    defineField({
      name: 'videoFile',
      title: 'Upload Video',
      type: 'file',
      group: 'media',
      options: {
        accept: 'video/*',
      },
    }),

    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),


    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      group: 'display',
      initialValue: 1,
    }),

   
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],

  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [
        {
          field: 'displayOrder',
          direction: 'asc',
        },
      ],
    },
    {
      title: 'Newest',
      name: 'newest',
      by: [
        {
          field: '_createdAt',
          direction: 'desc',
        },
      ],
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
      category: 'category.title',
      featured: 'featured',
    },

    prepare({title, media, category, featured}) {
      return {
        title,
        media,
        subtitle: `${category || 'No Category'}${featured ? ' • Featured' : ''}`,
      }
    },
  },
})