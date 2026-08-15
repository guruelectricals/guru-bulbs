import {defineField, defineType} from 'sanity'

export const specificationType = defineType({
  name: 'specification',
  title: 'Specification',
  type: 'object',

  fields: [
    defineField({
      name: 'label',
      title: 'Specification',
      type: 'string',
      description: 'Specification name (e.g. Power Factor, Beam Angle, CRI).',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),

    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'Specification value.',
      validation: (Rule) => Rule.required().max(150),
    }),

    defineField({
      name: 'unit',
      title: 'Unit',
      type: 'string',
      description: 'Optional unit (e.g. W, V, mm, lm).',
      validation: (Rule) => Rule.max(30),
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Controls the display order.',
      initialValue: 0,
      validation: (Rule) => Rule.required().integer().min(0),
    }),
  ],

  preview: {
    select: {
      title: 'label',
      value: 'value',
      unit: 'unit',
    },
    prepare({title, value, unit}) {
      return {
        title,
        subtitle: [value, unit].filter(Boolean).join(' '),
      }
    },
  },
})