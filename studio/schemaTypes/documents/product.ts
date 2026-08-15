import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Products",
  type: "document",

  groups: [
    {
      name: "general",
      title: "General",
      default: true,
    },
    {
      name: "images",
      title: "Images",
    },
    {
      name: "pricing",
      title: "Variants & Pricing",
    },
    {
      name: "details",
      title: "Product Details",
    },
    {
      name: "specifications",
      title: "Technical Specifications",
    },
    {
      name: "features",
      title: "Key Features",
    },
    {
      name: "certifications",
      title: "Certifications & Warranty",
    },
    {
      name: "usage",
      title: "Usage & FAQs",
    },
    {
      name: "related",
      title: "Related Products",
    },
  ],

  fields: [
    // =========================================================
    // GENERAL
    // =========================================================

    defineField({
      name: "title",
      title: "Product Name",
      type: "string",
      group: "general",
      description:
        "Product name displayed on the website.",
      validation: (Rule) =>
        Rule.required().min(2).max(120),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      group: "general",
      description:
        "Select the category this product belongs to.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "general",
      description:
        "Used to create the product page URL.",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      group: "general",
      description:
        "Short description displayed near the product name.",
      validation: (Rule) =>
        Rule.required().max(300),
    }),

    defineField({
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      group: "general",
      initialValue: false,
      description: "Display this product in featured sections.",
    }),

    defineField({
      name: "status",
      title: "Product Status",
      type: "string",
      group: "general",
      initialValue: "standard",
      options: {
        layout: "radio",
        list: [
          { title: "New", value: "new" },
          { title: "Featured", value: "featured" },
          { title: "Best Seller", value: "bestSeller" },
          { title: "Standard", value: "standard" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Product Description",
      type: "blockContent",
      group: "general",
      description:
        "Detailed description of the product.",
      validation: (Rule) => Rule.required(),
    }),

    // =========================================================
    // IMAGES
    // =========================================================

    defineField({
      name: "mainImage",
      title: "Main Product Image",
      type: "imageWithAlt",
      group: "images",
      description:
        "Main product image displayed on the product page.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "gallery",
      title: "Product Gallery",
      type: "array",
      group: "images",
      description:
        "Additional images displayed in the product gallery.",
      of: [
        {
          type: "imageWithAlt",
        },
      ],
    }),

    // =========================================================
    // VARIANTS & PRICING
    // =========================================================

    defineField({
      name: "variants",
      title: "Product Variants",
      type: "array",
      group: "pricing",
      description:
        "Add different wattages, models, holders, color temperatures and prices.",
      of: [
        {
          type: "productVariant",
        },
      ],
    }),

    // =========================================================
    // PRODUCT DETAILS
    // =========================================================

    defineField({
      name: "applications",
      title: "Applications",
      type: "array",
      group: "details",
      description:
        "Where this product can be used. Example: Home, Office, Hotel, Shop.",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        layout: "tags",
      },
    }),

    defineField({
      name: "highlights",
      title: "Product Highlights",
      type: "array",
      group: "details",
      description:
        "Short product highlights shown on the product page.",
      of: [
        {
          type: "string",
        },
      ],
      validation: (Rule) =>
        Rule.max(12),
    }),

    // =========================================================
    // TECHNICAL SPECIFICATIONS
    // =========================================================

    defineField({
      name: "technicalSpecifications",
      title: "Technical Specifications",
      type: "array",
      group: "specifications",
      description:
        "Technical specifications displayed in the specification table.",
      of: [
        {
          type: "specification",
        },
      ],
    }),

    // =========================================================
    // KEY FEATURES
    // =========================================================

    defineField({
      name: "features",
      title: "Key Features",
      type: "array",
      group: "features",
      description:
        "Features displayed in the Key Features section.",
      of: [
        {
          type: "string",
        },
      ],
      validation: (Rule) =>
        Rule.max(20),
    }),

    // =========================================================
    // CERTIFICATIONS & WARRANTY
    // =========================================================

    defineField({
      name: "certifications",
      title: "Quality Certifications",
      type: "array",
      group: "certifications",
      description:
        "Certifications displayed on the product page. Example: CE, RoHS.",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        layout: "tags",
      },
    }),

    defineField({
      name: "warranty",
      title: "Warranty Period",
      type: "string",
      group: "certifications",
      description:
        "Example: 2 Years Manufacturer Warranty.",
      validation: (Rule) =>
        Rule.max(100),
    }),

    defineField({
      name: "warrantyTerms",
      title: "Warranty Terms",
      type: "text",
      rows: 4,
      group: "certifications",
      description:
        "Additional warranty information.",
      validation: (Rule) =>
        Rule.max(1000),
    }),

    // =========================================================
    // USAGE & FAQ
    // =========================================================

    defineField({
      name: "usageInstructions",
      title: "Usage Information",
      type: "blockContent",
      group: "usage",
      description:
        "Usage information displayed in the Usage & FAQs section.",
    }),

    defineField({
      name: "faqs",
      title: "Frequently Asked Questions",
      type: "array",
      group: "usage",
      description:
        "Questions and answers displayed in the FAQ section.",
      of: [
        {
          type: "faq",
        },
      ],
    }),

    // =========================================================
    // RELATED PRODUCTS
    // =========================================================

    defineField({
      name: "relatedProducts",
      title: "More Products",
      type: "array",
      group: "related",
      description:
        "Products displayed in the More Products section.",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "product",
            },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.max(6),
    }),
  ],

  // =========================================================
  // PREVIEW
  // =========================================================

  preview: {
    select: {
      title: "title",
      category: "category.title",
      media: "mainImage.image",
    },

    prepare({
      title,
      category,
      media,
    }) {
      return {
        title,
        subtitle: category || "Product",
        media,
      };
    },
  },
});