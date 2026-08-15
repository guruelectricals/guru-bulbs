import * as React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Tag,
  BookOpen,
} from "lucide-react";
import { sanityFetch } from "@/lib/fetch";
import { postBySlugQuery, postsQuery } from "@/lib/queries";
import { urlFor } from "@/lib/image";
import { constructMetadata } from "@/lib/seo";
import { PortableText } from "@portabletext/react";
import { ShareButtons } from "@/components/share-buttons";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<any>(postBySlugQuery, { slug }).catch(
    () => null,
  );

  if (!post) {
    return constructMetadata({ title: "Article Not Found", noIndex: true });
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage as any).url()
    : undefined;

  return constructMetadata({
    title: post.title,
    description:
      post.excerpt ||
      `Read ${post.title} on Guru Bulbs lighting insights blog.`,
    image: imageUrl,
    canonical: `https://gurubulbs.com/blog/${slug}`,
    type: "article",
    publishedAt: post.publishedAt,
    authors: post.author?.name ? [post.author.name] : undefined,
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await sanityFetch<any>(postBySlugQuery, { slug }).catch(
    () => null,
  );

  if (!post) {
    notFound();
  }

  const allPosts = await sanityFetch<any[]>(postsQuery).catch(() => []);
  const relatedPosts = allPosts
    .filter((p) => (p.slug?.current || p.slug) !== slug)
    .slice(0, 3);

  const coverImageUrl = post.mainImage
    ? urlFor(post.mainImage as any).url()
    : undefined;
  const authorAvatarUrl = post.author?.image
    ? urlFor(post.author.image as any).url()
    : undefined;
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Jan 2026";

  return (
    <article className="relative min-h-screen bg-neutral-950 text-neutral-100 pt-28 pb-16 sm:pt-32 px-4 sm:px-6 lg:px-6 xl:px-10 overflow-hidden">
      {/* GLOWING AMBER BACKGROUND AURA */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full bg-amber-500/10 blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl space-y-10">
        {/* BACK NAVIGATION */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="size-4" /> Back to All Articles
        </Link>

        {/* HERO HEADER */}
        <header className="space-y-6 border-b border-amber-500/15 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            {post.categories?.map((cat: string, i: number) => (
              <span
                key={i}
                className="rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-amber-400"
              >
                {cat}
              </span>
            ))}
            {post.readTime && (
              <span className="flex items-center gap-1 rounded-full bg-neutral-900 border border-white/10 px-3 py-0.5 text-[11px] font-semibold text-neutral-300">
                <Clock className="size-3 text-amber-400" />
                {post.readTime}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* AUTHOR & TIMESTAMP BAR */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3">
              <div className="relative size-11 overflow-hidden rounded-full border border-amber-500/40 bg-neutral-900 shrink-0">
                {authorAvatarUrl ? (
                  <Image
                    src={authorAvatarUrl}
                    alt={post.author?.name || "Author"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-amber-400">
                    <User className="size-5" />
                  </div>
                )}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {post.author?.name || "Guru Bulbs Engineer"}
                </h4>
                <p className="text-xs text-neutral-400">
                  {post.author?.role || "Technical Lighting Team"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
              <Calendar className="size-4 text-amber-400" />
              <span>Published {formattedDate}</span>
            </div>
          </div>
        </header>

        {/* COVER IMAGE */}
        {coverImageUrl && (
          <div className="relative aspect-[16/9] overflow-hidden rounded-[32px] border border-amber-500/25 bg-neutral-900 shadow-2xl">
            <Image
              src={coverImageUrl}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
          </div>
        )}

        {/* ARTICLE EXCERPT HIGHLIGHT */}
        {post.excerpt && (
          <div className="rounded-2xl border-l-4 border-amber-500 bg-amber-500/10 p-5 text-sm font-semibold italic leading-relaxed text-amber-200 backdrop-blur-md">
            "{post.excerpt}"
          </div>
        )}

        {/* ARTICLE BODY (PORTABLE TEXT OR FALLBACK) */}
        <div className="prose prose-invert prose-amber max-w-none space-y-6 text-sm sm:text-base text-neutral-200 leading-relaxed">
          {post.body ? (
            <PortableText value={post.body} />
          ) : (
            <div className="space-y-4">
              <p>
                At Guru Bulbs, our engineering process centers around high lumen
                efficacy, thermal dissipation, and long-term voltage protection.
                Certified LED lighting provides up to 85% energy savings
                compared to conventional incandescent bulbs while delivering
                Flicker-Free eye comfort.
              </p>
              <p>
                Whether selecting surface-mounted ceiling panels for residential
                halls, concealed false-ceiling downlights, or lithium-powered
                emergency inverter bulbs, ensuring proper color temperature
                (3000K Warm White vs 6500K Cool Daylight) is essential to
                creating ambient harmony.
              </p>
            </div>
          )}
        </div>

        {/* INTERACTIVE SOCIAL SHARE BUTTONS */}
        <ShareButtons title={post.title} />

        {/* AUTHOR BIO BOX */}
        {post.author && (
          <div className="rounded-3xl border border-amber-500/25 bg-neutral-900/80 p-6 backdrop-blur-xl flex flex-col sm:flex-row items-center gap-5">
            <div className="relative size-16 overflow-hidden rounded-full border border-amber-500/40 bg-neutral-950 shrink-0">
              {authorAvatarUrl ? (
                <Image
                  src={authorAvatarUrl}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-amber-400">
                  <User className="size-8" />
                </div>
              )}
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-amber-400">
                Written by {post.author.name}
              </h4>
              <p className="text-xs font-semibold text-neutral-300">
                {post.author.role || "Senior Technical Contributor"}
              </p>
              {post.author.bio && (
                <p className="text-xs text-neutral-400 leading-relaxed pt-1">
                  {post.author.bio}
                </p>
              )}
            </div>
          </div>
        )}

        {/* RELATED ARTICLES */}
        {relatedPosts.length > 0 && (
          <div className="pt-10 border-t border-amber-500/15 space-y-6">
            <div className="flex items-center gap-2">
              <BookOpen className="size-5 text-amber-400" />
              <h3 className="text-lg font-bold uppercase tracking-wider text-white">
                More Lighting Insights
              </h3>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {relatedPosts.map((rel, i) => {
                const relImg = rel.mainImage
                  ? urlFor(rel.mainImage as any).url()
                  : undefined;
                const relSlug = rel.slug?.current || rel.slug || "#";
                return (
                  <Link
                    key={i}
                    href={`/blog/${relSlug}`}
                    className="group rounded-2xl border border-amber-500/20 bg-neutral-900/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/50"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-neutral-950 mb-3">
                      {relImg ? (
                        <Image
                          src={relImg}
                          alt={rel.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-amber-400/40">
                          <Tag className="size-8" />
                        </div>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
