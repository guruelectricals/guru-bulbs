import * as React from "react";
import type { Metadata } from "next";
import { sanityFetch } from "@/lib/fetch";
import { postsQuery } from "@/lib/queries";
import { urlFor } from "@/lib/image";
import { constructMetadata } from "@/lib/seo";
import { BlogPageClient } from "@/components/pages/blog-page";

export const revalidate = 60;

export const metadata: Metadata = constructMetadata({
  title: "Lighting Insights & LED Technical Guides",
  description:
    "Explore expert articles, energy efficiency calculators, smart bulb automation guides, and architectural lighting trends by Guru Bulbs engineers.",
  canonical: "https://gurubulbs.com/blog",
});

export default async function BlogPage() {
  const rawPosts = await sanityFetch<any[]>(postsQuery).catch(() => []);

  const posts = rawPosts.map((p) => ({
    slug: p.slug?.current || p.slug || "#",
    title: p.title || "Guru Bulbs Technical Guide",
    excerpt:
      p.excerpt ||
      "Discover precision engineering, energy saving benchmarks, and ambient lighting design tips.",
    publishedAt: p.publishedAt
      ? new Date(p.publishedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Jan 2026",
    readTime: p.readTime || "5 min read",
    featured: Boolean(p.featured),
    category: p.categories?.[0] || "Lighting Tips",
    authorName: p.author?.name || "Guru Bulbs Engineer",
    authorRole: p.author?.role || "Technical Team",
    imageUrl: p.mainImage ? urlFor(p.mainImage as any).url() : undefined,
  }));

  return <BlogPageClient posts={posts} />;
}
