import type { Metadata } from "next";

export type ConstructMetadataParams = {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedAt?: string;
  authors?: string[];
};

export const SITE_NAME = "Guru Bulbs";
export const SITE_URL = "https://guruelectricals.com.np";
const DEFAULT_TITLE = "Guru Bulbs | Premium LED Lighting Solutions";
const DEFAULT_DESCRIPTION =
  "Nepal's trusted source for certified, high-efficiency LED bulbs, surface panels, conceal lights, tubelights, and emergency lighting.";

export function constructMetadata({
  title,
  description,
  image = "/og-image.png",
  canonical,
  noIndex = false,
  type = "website",
  publishedAt,
  authors,
}: ConstructMetadataParams = {}): Metadata {
  const metaTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const metaDescription = description || DEFAULT_DESCRIPTION;

  return {
    metadataBase: new URL(SITE_URL),
    title: metaTitle,
    description: metaDescription,
    keywords: [
      "LED Bulbs Nepal",
      "Guru Bulbs",
      "Emergency Inverter Lights",
      "Surface Panel Lights",
      "Conceal Lights",
      "LED Tubelights",
      "Energy Efficient Lighting",
      "Kathmandu Lighting Supplier",
    ],
    authors: authors
      ? authors.map((name) => ({ name }))
      : [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: false,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      siteName: SITE_NAME,
      type,
      ...(image ? { images: [{ url: image, alt: metaTitle }] } : {}),
      ...(publishedAt ? { publishedTime: publishedAt } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [image],
      creator: "@gurubulbs",
    },
    ...(canonical ? { alternates: { canonical } } : {}),
  };
}
