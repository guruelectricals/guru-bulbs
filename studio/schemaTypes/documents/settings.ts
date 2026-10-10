import { defineField, defineType } from "sanity";

export const settingsType = defineType({
  name: "settings",
  title: "Website Settings",
  type: "document",

  groups: [
    {
      name: "general",
      title: "General",
      default: true,
    },
    {
      name: "homepage",
      title: "Homepage",
    },
    {
      name: "contact",
      title: "Contact",
    },
    {
      name: "social",
      title: "Social Media",
    },
    {
      name: "business",
      title: "Business",
    },
    {
      name: "footer",
      title: "Footer",
    },
    {
      name: "cookies",
      title: "Cookie Consent",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],


  fields: [


    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      group: "general",
      description:
        "Official company name.",
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(100),
    }),


    defineField({
      name: "tagline",
      title: "Company Tagline",
      type: "string",
      group: "general",
      description:
        "Short slogan displayed on website.",
    }),


    defineField({
      name: "companyDescription",
      title: "Company Description",
      type: "text",
      rows: 5,
      group: "general",
      description:
        "Main company introduction.",
    }),

    defineField({
      name: "heroBadge",
      title: "Homepage Hero Badge",
      type: "string",
      group: "homepage",
      description: "Small badge text above the hero heading.",
    }),
    defineField({
      name: "heroBadgeNe",
      title: "Homepage Hero Badge (Nepali)",
      type: "string",
      group: "homepage",
    }),
    defineField({
      name: "heroTitlePrefix",
      title: "Homepage Hero Title Prefix",
      type: "string",
      group: "homepage",
      description: "First part of the hero heading.",
    }),
    defineField({
      name: "heroTitlePrefixNe",
      title: "Homepage Hero Title Prefix (Nepali)",
      type: "string",
      group: "homepage",
    }),
    defineField({
      name: "heroTitleSuffix",
      title: "Homepage Hero Title Suffix",
      type: "string",
      group: "homepage",
      description: "Second part of the hero heading.",
    }),
    defineField({
      name: "heroTitleSuffixNe",
      title: "Homepage Hero Title Suffix (Nepali)",
      type: "string",
      group: "homepage",
    }),
    defineField({
      name: "heroDescription",
      title: "Homepage Hero Description",
      type: "text",
      rows: 3,
      group: "homepage",
      description: "Paragraph below the hero heading.",
    }),
    defineField({
      name: "heroDescriptionNe",
      title: "Homepage Hero Description (Nepali)",
      type: "text",
      rows: 3,
      group: "homepage",
    }),
    defineField({
      name: "heroImage",
      title: "Homepage Hero Image",
      type: "image",
      group: "homepage",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
        },
      ],
    }),

    defineField({
      name: "heroProductImage",
      title: "Homepage Hero Product Image",
      type: "image",
      group: "homepage",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
        },
      ],
    }),

    defineField({
      name: "websiteUrl",
      title: "Website URL",
      type: "url",
      group: "general",
      description:
        "Official website address.",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),



    defineField({
      name: "logo",
      title: "Company Logo",
      type: "image",
      group: "general",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
        },
      ],
    }),



    defineField({
      name: "favicon",
      title: "Website Favicon",
      type: "image",
      group: "general",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
        },
      ],
    }),

    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      group: "contact",
      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: "secondaryPhone",
      title: "Secondary Phone Number",
      type: "string",
      group: "contact",
    }),


    defineField({
      name: "whatsapp",
      title: "WhatsApp Number",
      type: "string",
      group: "contact",
    }),


    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      group: "contact",
      validation: (Rule) =>
        Rule.required().email(),
    }),


    defineField({
      name: "address",
      title: "Office Address",
      type: "text",
      rows: 3,
      group: "contact",
    }),


    defineField({
      name: "googleMapsUrl",
      title: "Google Maps URL",
      type: "url",
      group: "contact",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),

    defineField({
      name: "facebook",
      title: "Facebook URL",
      type: "url",
      group: "social",
    }),


    defineField({
      name: "instagram",
      title: "Instagram URL",
      type: "url",
      group: "social",
    }),


    defineField({
      name: "tiktok",
      title: "TikTok URL",
      type: "url",
      group: "social",
    }),





    defineField({
      name: "businessHours",
      title: "Business Hours",
      type: "text",
      rows: 3,
      group: "business",
      description:
        "Example: Monday-Friday 9AM-5PM",
    }),


    defineField({
      name: "companyProfile",
      title: "Company Profile PDF",
      type: "file",
      group: "business",
      options: {
        accept: ".pdf",
      },
    }),


    defineField({
      name: "productCatalogue",
      title: "Product Catalogue PDF",
      type: "file",
      group: "business",
      options: {
        accept: ".pdf",
      },
    }),


    defineField({
      name: "footerDescription",
      title: "Footer Description",
      type: "text",
      rows: 3,
      group: "footer",
    }),

    defineField({
      name: "footerDescriptionNe",
      title: "Footer Description (Nepali)",
      type: "text",
      rows: 3,
      group: "footer",
    }),

    defineField({
      name: "aboutDescription",
      title: "About Us Description",
      type: "array",
      of: [{ type: "block" }],
   }),


    defineField({
      name: "copyright",
      title: "Copyright Text",
      type: "string",
      group: "footer",
      description:
        "Example: © 2026 Company Name. All rights reserved.",
    }),


    defineField({
      name: "cookieConsentTitle",
      title: "Cookie Banner Title",
      type: "string",
      group: "cookies",
      description: "Example: We Value Your Privacy & Lighting Experience",
    }),

    defineField({
      name: "cookieConsentDescription",
      title: "Cookie Banner Description",
      type: "text",
      rows: 3,
      group: "cookies",
      description: "Example: We use essential cookies to keep our catalog running smoothly and optional analytics cookies to improve your lighting browsing experience.",
    }),

    defineField({
      name: "essentialCookiesLabel",
      title: "Essential Cookies Button Label",
      type: "string",
      group: "cookies",
      description: "Default: Essential Only",
    }),

    defineField({
      name: "acceptAllCookiesLabel",
      title: "Accept All Cookies Button Label",
      type: "string",
      group: "cookies",
      description: "Default: Accept All",
    }),

    defineField({
      name: "privacyPolicyUrl",
      title: "Privacy Policy URL",
      type: "string",
      group: "cookies",
      description: "Link to privacy policy page (e.g. /privacy-policy)",
    }),

    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seo",
      group: "seo",
    }),
  ],


  preview: {
    prepare() {
      return {
        title: "Website Settings",
      };
    },
  },

});