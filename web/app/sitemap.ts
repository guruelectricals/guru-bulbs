import type { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/fetch";
import { postsQuery, productsQuery } from "@/lib/queries";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

type SitemapEntry = {
  slug?: { current?: string } | string;
  _updatedAt?: string;
  publishedAt?: string;
};

const staticPages: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/products", changeFrequency: "daily", priority: 0.9 },
  { path: "/price-list", changeFrequency: "weekly", priority: 0.8 },
  { path: "/dealership", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", changeFrequency: "monthly", priority: 0.7 },
  { path: "/lighting-design", changeFrequency: "monthly", priority: 0.7 },
  { path: "/electrical-design", changeFrequency: "monthly", priority: 0.7 },
  { path: "/3d-design", changeFrequency: "monthly", priority: 0.7 },
  { path: "/videos", changeFrequency: "weekly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
];

function getSlug(value: SitemapEntry["slug"]) {
  return typeof value === "string" ? value : value?.current;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts] = await Promise.all([
    sanityFetch<SitemapEntry[]>(productsQuery).catch(() => []),
    sanityFetch<SitemapEntry[]>(postsQuery).catch(() => []),
  ]);
  const now = new Date();

  return [
    ...staticPages.map(({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...products.flatMap((product) => {
      const slug = getSlug(product.slug);
      return slug
        ? [
            {
              url: `${SITE_URL}/products/${slug}`,
              lastModified: product._updatedAt
                ? new Date(product._updatedAt)
                : now,
              changeFrequency: "weekly" as const,
              priority: 0.8,
            },
          ]
        : [];
    }),
    ...posts.flatMap((post) => {
      const slug = getSlug(post.slug);
      return slug
        ? [
            {
              url: `${SITE_URL}/blog/${slug}`,
              lastModified:
                post._updatedAt || post.publishedAt
                  ? new Date(post._updatedAt || post.publishedAt!)
                  : now,
              changeFrequency: "monthly" as const,
              priority: 0.7,
            },
          ]
        : [];
    }),
  ];
}
