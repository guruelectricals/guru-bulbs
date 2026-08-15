import { defineField, defineType } from "sanity";

export const productVariantType = defineType({
  name: "productVariant",
  title: "Product Variant",
  type: "object",

  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Name of the product variant",
    }),

    defineField({
      name: "modelNumber",
      title: "Model Number",
      type: "string",
      description: "Product model number shown in the variant table.",
    }),

    defineField({
      name: "wattage",
      title: "Wattage",
      type: "string",
      description: "Example: 7W, 9W, 12W.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "holder",
      title: "Holder",
      type: "string",
      description: "Example: B22, E27.",
    }),

    defineField({
      name: "k6500",
      title: "6500K",
      type: "string",
    }),

    defineField({
      name: "k4000",
      title: "4000K",
      type: "string",
    }),

    defineField({
      name: "k3000",
      title: "3000K",
      type: "string",
    }),

    defineField({
      name: "qtyPerCtn",
      title: "QTY/CTN",
      type: "string",
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "number",
      description: "Price of this specific variant.",
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      initialValue: 0,
      description: "Controls the order of variants in the table.",
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],

  preview: {
    select: {
      name: "name",
      modelNumber: "modelNumber",
      wattage: "wattage",
      holder: "holder",
      qtyPerCtn: "qtyPerCtn",
      price: "price",
    },

    prepare({
      name,
      modelNumber,
      wattage,
      holder,
      qtyPerCtn,
      price,
    }) {
      return {
        title: name || modelNumber || wattage || "Product Variant",

        subtitle: [
          wattage,
          holder,
          qtyPerCtn ? `QTY/CTN: ${qtyPerCtn}` : null,
          price !== undefined ? `Rs. ${price}` : null,
        ]
          .filter(Boolean)
          .join(" • "),
      };
    },
  },
});