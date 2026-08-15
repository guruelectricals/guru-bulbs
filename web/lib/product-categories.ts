export const PRODUCT_CATEGORIES = [
  {
    slug: "led-bulbs",
    title: "LED Bulbs",
    description: "Everyday, energy-efficient light for every room.",
  },
  {
    slug: "surface-panel-lights",
    title: "Surface Panel Lights",
    description: "Sleek, even lighting for modern ceilings and walls.",
  },
  {
    slug: "conceal-panel-lights",
    title: "Conceal Panel Lights",
    description: "Clean recessed lighting with a seamless finish.",
  },
  {
    slug: "rechargeable-led-lights",
    title: "Rechargeable LED Lights",
    description: "Reliable portable light when you need it most.",
  },
  {
    slug: "led-tubelights",
    title: "LED Tubelights",
    description: "Bright, efficient illumination for everyday spaces.",
  },
  {
    slug: "outdoor-lights",
    title: "Outdoor Lights",
    description: "Durable lighting designed for exterior spaces.",
  },
  {
    slug: "profile-light-accessories",
    title: "Profile Light Accessories",
    description: "Essential fittings and finishes for profile lighting.",
  },
  {
    slug: "special-lights",
    title: "Special Lights",
    description: "Distinctive solutions for specialised lighting needs.",
  },
] as const;

export type ProductCategorySlug = (typeof PRODUCT_CATEGORIES)[number]["slug"];

export function getProductCategory(slug: string) {
  return PRODUCT_CATEGORIES.find((category) => category.slug === slug);
}
