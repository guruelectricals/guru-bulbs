import { defineField, defineType } from 'sanity';

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonials & Reviews',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'initials',
      title: 'Initials Avatar',
      type: 'string',
      description: '2-letter initials if no photo is provided (e.g. AR, DK, NR)',
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'role',
      title: 'Role / Context (English)',
      type: 'string',
      description: 'Example: Retail Dealer, Pokhara | Electrical Contractor, Kathmandu',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roleNe',
      title: 'Role / Context (Nepali)',
      type: 'string',
      description: 'Example: खुदरा डिलर, पोखरा | विद्युतीय ठेकेदार, काठमाडौँ',
    }),
    defineField({
      name: 'quote',
      title: 'Review Quote (English)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: 'quoteNe',
      title: 'Review Quote (Nepali)',
      type: 'text',
      rows: 3,
      description: 'Optional Nepali translation of the review',
    }),
    defineField({
      name: 'rating',
      title: 'Rating (Stars)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'avatar',
      title: 'Customer Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Active Status',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle on to display this testimonial on the homepage',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'avatar',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
  ],
});
