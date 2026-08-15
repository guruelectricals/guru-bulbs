"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Calendar,
  Sparkles,
  User,
  Tag,
} from "lucide-react";
import { useLanguage } from "@/providers/language-provider";

export function BlogPageClient({ posts }: { posts: any[] }) {
  const { language, t } = useLanguage();

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const regularPosts = featuredPost
    ? posts.filter((p) => p.slug !== featuredPost.slug)
    : posts;

  const categories = Array.from(new Set(posts.map((p) => p.category))).filter(Boolean);

  const getLocalizedHref = (href: string) => {
    if (language === "ne") {
      if (href.startsWith("/ne")) return href;
      const cleanHref = href.startsWith("/") ? href : `/${href}`;
      return `/ne${cleanHref === "/" ? "" : cleanHref}`;
    }
    return href.replace(/^\/ne/, "") || "/";
  };

  return (
    <main className="relative min-h-screen bg-neutral-950 text-neutral-100 pt-28 pb-16 sm:pt-32 px-4 sm:px-6 lg:px-6 xl:px-10 overflow-hidden">
      {/* GLOWING AMBER RADIAL BACKGROUND AURA */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full bg-amber-500/10 blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1440px] space-y-12">
        {/* HERO SECTION */}
        <div className="mx-auto max-w-3xl text-center space-y-4 pt-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-bold tracking-[0.2em] text-amber-400 uppercase backdrop-blur-md">
            <BookOpen className="size-3.5 text-amber-400" />
            {t("blogBadge")}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            {t("blogTitlePrefix")}
            <span className="gold-gradient-text">{t("blogTitleHighlight")}</span>
            {t("blogTitleSuffix")}
          </h1>
          <p className="text-sm leading-relaxed text-neutral-300 sm:text-base max-w-2xl mx-auto">
            {t("blogDesc")}
          </p>
        </div>

        {/* CATEGORY FILTER PILLS */}
        {categories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="rounded-full bg-amber-500/20 border border-amber-500/40 px-4 py-1.5 text-xs font-bold text-amber-400 cursor-pointer">
              All
            </span>
            {categories.map((cat, idx) => (
              <span key={idx} className="rounded-full bg-neutral-900 border border-amber-500/20 px-4 py-1.5 text-xs font-medium text-neutral-400 hover:border-amber-500/40 hover:text-amber-400 cursor-pointer transition-colors">
                {cat as React.ReactNode}
              </span>
            ))}
          </div>
        )}

        {/* FEATURED ARTICLE HERO CARD */}
        {featuredPost && (
          <div className="group relative overflow-hidden rounded-[32px] border border-amber-500/30 bg-neutral-900/60 p-6 md:p-8 backdrop-blur-2xl shadow-[0_15px_50px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-amber-400/60">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="relative aspect-[16/9] lg:aspect-auto lg:h-full lg:col-span-6 overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-neutral-900 to-neutral-950">
                {featuredPost.imageUrl ? (
                  <Image
                    src={featuredPost.imageUrl}
                    alt={featuredPost.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full min-h-[240px] items-center justify-center bg-neutral-900 text-amber-400">
                    <Sparkles className="size-16 opacity-40" />
                  </div>
                )}
              </div>

              <div className="space-y-4 lg:col-span-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {posts.length > 1 && (
                      <span className="rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-0.5 text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">
                        ★ {t("featuredInsight")}
                      </span>
                    )}
                    <span className="rounded-full bg-neutral-800 px-3 py-0.5 text-[10px] font-bold text-neutral-300">
                      {featuredPost.category}
                    </span>
                  </div>

                  <h2 className="text-2xl font-extrabold sm:text-3xl text-white group-hover:text-amber-400 transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-amber-500/15 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs text-neutral-400">
                    <User className="size-3.5 text-amber-400" />
                    <span className="font-semibold text-neutral-200">
                      {featuredPost.authorName}
                    </span>
                    <span>·</span>
                    <Clock className="size-3.5 text-neutral-400" />
                    <span>{featuredPost.readTime}</span>
                  </div>

                  <Link
                    href={getLocalizedHref(`/blog/${featuredPost.slug}`)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-4 py-2 text-xs font-extrabold text-neutral-950 hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
                  >
                    {t("readArticle")} <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ARTICLES GRID */}
        {regularPosts.length > 0 ? (
          <div className="space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-wider text-amber-400">
              {t("latestPublications")}
            </h3>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post, idx) => (
                <article
                  key={idx}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-amber-500/20 bg-neutral-900/60 p-5 backdrop-blur-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-amber-500/10"
                >
                  <div className="space-y-4">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-amber-500/15 bg-neutral-950">
                      {post.imageUrl ? (
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-neutral-900 text-amber-400">
                          <Tag className="size-10 opacity-30" />
                        </div>
                      )}
                      <span className="absolute top-3 left-3 rounded-full bg-neutral-950/90 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-400 backdrop-blur-md">
                        {post.category}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-[11px] font-medium text-neutral-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3 text-amber-400" />
                          {post.publishedAt}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-3 text-amber-400" />
                          {post.readTime}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h4>

                      <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-amber-500/15 flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-300">
                      {post.authorName}
                    </span>
                    <Link
                      href={getLocalizedHref(`/blog/${post.slug}`)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      {t("readMore")} <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          posts.length === 1 && (
            <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-amber-500/20 bg-neutral-900/60 p-12 text-center backdrop-blur-xl shadow-lg shadow-amber-500/5">
              <BookOpen className="mb-4 size-12 text-amber-500/40" />
              <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                More articles coming soon
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-400">
                We are currently writing more technical guides and lighting insights. Check back later for new publications.
              </p>
            </div>
          )
        )}
      </div>
    </main>
  );
}
