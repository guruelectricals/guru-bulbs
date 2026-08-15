import { defineField, defineType } from 'sanity';

export const cctMatrixRowType = defineType({
  name: 'cctMatrixRow',
  title: 'CCT & Rate Matrix Row',
  type: 'object',
  fields: [
    defineField({
      name: 'wattage',
      title: 'Wattage Rating',
      type: 'string',
      description: 'Example: 6W, 9W, 12W, 18W, 24W',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'modelCode',
      title: 'Model SKU Code',
      type: 'string',
      description: 'Example: GB-B211, GB-CPL-12W',
    }),
    defineField({
      name: 'price6500k',
      title: '6500K Price (Cool Daylight)',
      type: 'number',
      description: 'Price for 6500K Daylight variant (NRS)',
    }),
    defineField({
      name: 'price4000k',
      title: '4000K Price (Neutral White)',
      type: 'number',
      description: 'Price for 4000K Neutral White variant (NRS)',
    }),
    defineField({
      name: 'price3000k',
      title: '3000K Price (Warm White)',
      type: 'number',
      description: 'Price for 3000K Warm White variant (NRS)',
    }),
    defineField({
      name: 'qtyPerCarton',
      title: 'Master Carton Packing Qty (PCS/CTN)',
      type: 'number',
      description: 'Number of pieces per master carton box (e.g. 60, 20)',
    }),
  ],
  preview: {
    select: {
      wattage: 'wattage',
      modelCode: 'modelCode',
      p6500: 'price6500k',
    },
    prepare({ wattage, modelCode, p6500 }) {
      return {
        title: `${wattage || 'Variant'} (${modelCode || 'SKU'})`,
        subtitle: p6500 ? `6500K Rate: रु ${p6500}` : 'Custom Rate Row',
      };
    },
  },
});
