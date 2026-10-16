"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Download,
  Gem,
  Headphones,
  Lightbulb,
  Pencil,
  Quote,
  ShieldCheck,
  Star,
  TimerReset,
  Truck,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PriceTag } from "@/components/price-tag";
import { urlFor } from "@/lib/image";
import type { SanityTestimonial } from "@/lib/queries";
import type { Settings } from "@/types/settings";
import { useLanguage } from "@/providers/language-provider";
import {
  HOME_BENEFITS,
  PRODUCT_PROMISES,
  SERVICE_PROMISES,
} from "@/lib/constants";
import type { TranslationKey } from "@/lib/i18n";
import { HomeHeroCarousel, type HeroSlide } from "@/components/home-hero-carousel";
import { ReviewModal } from "@/components/review-modal";
import { cn } from "@/lib/utils";

const PRODUCTS_IMAGE = "/images/hero-products-ring-cutout.png";

const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  TimerReset,
  ShieldCheck,
  Gem,
  Lightbulb,
  Award,
  Truck,
  Headphones,
};

export function HomePage({
  categoriesByCode,
  featuredProducts,
  testimonials = [],
  heroSettings,
}: {
  categoriesByCode: any[];
  featuredProducts: any[];
  testimonials?: SanityTestimonial[];
  heroSettings?: Settings | null;
}) {
  const { language, t } = useLanguage();
  const [reviewsList, setReviewsList] = useState<SanityTestimonial[]>(testimonials);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const heroBadge =
    language === "ne"
      ? heroSettings?.heroBadgeNe || heroSettings?.heroBadge
      : heroSettings?.heroBadge;
  const heroTitlePrefix =
    language === "ne"
      ? heroSettings?.heroTitlePrefixNe || heroSettings?.heroTitlePrefix
      : heroSettings?.heroTitlePrefix;
  const heroTitleSuffix =
    language === "ne"
      ? heroSettings?.heroTitleSuffixNe || heroSettings?.heroTitleSuffix
      : heroSettings?.heroTitleSuffix;
  const heroDescription =
    language === "ne"
      ? heroSettings?.heroDescriptionNe || heroSettings?.heroDescription
      : heroSettings?.heroDescription;

  // Optional: point this at a Sanity-managed hero image if you add one to
  // Settings later. Falls back to a static local asset in the meantime.
  const heroImageUrl = (heroSettings as any)?.heroImage
    ? urlFor((heroSettings as any).heroImage)
      .width(1400)
      .height(1400)
      .url()
    : "/images/bulb.png";

  const heroDescriptionText = (
    heroDescription || t("heroDescription" as TranslationKey)
  ).replace(/([.,])([^\s])/g, "$1 $2");

  const heroSlides: HeroSlide[] = featuredProducts
    .filter((product) => product.mainImage?.image)
    .map((product) => ({
      key: product._id,
      imageUrl: urlFor(product.mainImage.image).width(1400).url(),
      imageAlt: product.mainImage.alt || product.title,
    }));

  if (heroSlides.length === 0) {
    heroSlides.push({
      key: "fallback",
      imageUrl: PRODUCTS_IMAGE,
      imageAlt:
        language === "ne"
          ? "गुरु एलईडी बल्ब र लाइटिङ उत्पादनहरूको संग्रह"
          : "Guru LED bulbs, panel lights and floodlight product lineup",
    });
  }

  const displayReviews =
    reviewsList && reviewsList.length > 0
      ? reviewsList.map((tItem) => ({
        name: tItem.name,
        initials: tItem.initials || tItem.name.slice(0, 2).toUpperCase(),
        context: language === "ne" ? tItem.roleNe || tItem.role : tItem.role,
        quote: language === "ne" ? tItem.quoteNe || tItem.quote : tItem.quote,
        rating: tItem.rating ?? 5,
      }))
      : [
        {
          name: "Anita R.",
          initials: "AR",
          context: t("review1Context" as TranslationKey),
          quote: t("review1Quote" as TranslationKey),
          rating: 5,
        },
        {
          name: "Deepak K.",
          initials: "DK",
          context: t("review2Context" as TranslationKey),
          quote: t("review2Quote" as TranslationKey),
          rating: 5,
        },
        {
          name: "Nishan Rana",
          initials: "NR",
          context: t("review3Context" as TranslationKey),
          quote: t("review3Quote" as TranslationKey),
          rating: 5,
        },
      ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* ─── HERO + PROMISES BAR ─── share the first screen from tablet up ── */}
      <div className="flex flex-col md:min-h-svh">

        {/* HERO — landing copy over a carousel of featured product images */}
        <HomeHeroCarousel
          slides={heroSlides}
          badge={heroBadge || t("heroBadge" as TranslationKey)}
          titlePrefix={heroTitlePrefix || t("heroTitlePrefix" as TranslationKey)}
          titleSuffix={heroTitleSuffix || t("heroTitleSuffix" as TranslationKey)}
          description={heroDescriptionText}
          primaryLabel={t("exploreCollection" as TranslationKey)}
          primaryHref={language === "ne" ? "/ne/products" : "/products"}
          secondaryLabel={t("contactUs" as TranslationKey)}
          secondaryHref={language === "ne" ? "/ne/contact" : "/contact"}
        />

        {/* PROMISES BAR */}
        <section className="shrink-0 border-y border-amber-500/15 bg-neutral-900/40 px-4 py-5 sm:px-8 lg:px-6 xl:px-10">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0 [&>*:last-child]:col-span-2 sm:[&>*:last-child]:col-span-1">
            {PRODUCT_PROMISES.map((promise, index) => {
              const Icon = ICON_MAP[promise.iconName] || Zap;
              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 px-1 sm:px-3 lg:px-5 ${index > 0 ? "lg:border-l lg:border-amber-500/15" : ""}`}
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400 sm:size-10">
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                  <div>
                    <p className="text-xs font-extrabold tracking-wider text-white uppercase">
                      {t(promise.titleKey)}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium text-neutral-400">
                      {t(promise.descKey)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
      {/* ─────────────────────────────────────────────────────────────────── */}

      {/* CATEGORIES SECTION */}
      {categoriesByCode && categoriesByCode.length > 0 && (
        <section
          className="relative border-b border-amber-500/15 bg-neutral-950 px-4 py-20 sm:px-8 sm:py-24 lg:px-6 xl:px-10"
          aria-labelledby="categories-title"
        >
          <div className="mx-auto max-w-[1440px]">
            <div className="mx-auto max-w-2xl text-center">
              <Badge
                variant="outline"
                className="border-amber-500/30 bg-amber-500/10 text-amber-400 font-bold tracking-[0.2em] uppercase px-3.5 py-1"
              >
                {t("exploreCollection" as TranslationKey)}
              </Badge>
              <h2
                id="categories-title"
                className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl"
              >
                {t("lightingForEverySpaceTitle" as TranslationKey)}
              </h2>
              <p className="mt-3 text-sm text-neutral-400 sm:text-base">
                {t("categoriesDescription" as TranslationKey)}
              </p>
              <Link
                href={language === "ne" ? "/ne/products" : "/products"}
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-amber-400 hover:text-amber-300 uppercase transition-colors"
              >
                {t("browseAllCategories" as TranslationKey)}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categoriesByCode.map((category, index) => (
                <Link
                  key={category._id}
                  href={
                    language === "ne"
                      ? `/ne/products?type=${category.slug?.current || category.slug}`
                      : `/products?type=${category.slug?.current || category.slug}`
                  }
                  className="group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 rounded-3xl"
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-amber-500/20 bg-neutral-900/60 p-3.5 backdrop-blur-2xl transition-all duration-400 hover:border-amber-400 hover:bg-neutral-900 hover:shadow-[0_10px_40px_-10px_rgba(240,188,25,0.25)] hover:-translate-y-2">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-900 border border-white/10">
                      {category.image ? (
                        <Image
                          src={urlFor(category.image)
                            .width(720)
                            .height(540)
                            .auto("format")
                            .url()}
                          alt={category.title}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-neutral-950 text-amber-500/40">
                          <Lightbulb className="size-10" />
                        </div>
                      )}
                      <span className="absolute top-3 right-3 rounded-full border border-amber-500/40 bg-neutral-950/85 px-2.5 py-0.5 text-[10px] font-extrabold tracking-widest text-amber-400 backdrop-blur-md shadow-md">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col justify-between px-2 pt-4 pb-2">
                      <h3 className="text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-amber-400">
                        {t(category.title as TranslationKey) || category.title}
                      </h3>

                      <div className="mt-4 flex items-center justify-between border-t border-amber-500/10 pt-3">
                        <span className="text-xs font-bold tracking-widest text-amber-400/90 uppercase transition-colors group-hover:text-amber-400">
                          {t("exploreCollection" as TranslationKey)}
                        </span>
                        <div className="flex size-7 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 transition-all duration-300 group-hover:bg-amber-500 group-hover:text-neutral-950 group-hover:scale-110">
                          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURED PRODUCTS SECTION */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section
          className="border-b border-amber-500/15 bg-neutral-950/60 px-4 py-20 sm:px-8 sm:py-24 lg:px-6 xl:px-10"
          aria-labelledby="bulbs-title"
        >
          <div className="mx-auto max-w-[1440px]">
            <div className="mx-auto max-w-2xl text-center">
              <Badge
                variant="outline"
                className="border-amber-500/30 bg-amber-500/10 text-amber-400 font-bold tracking-[0.2em] uppercase px-3.5 py-1"
              >
                {t("featuredBadge" as TranslationKey)}
              </Badge>
              <h2
                id="bulbs-title"
                className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl"
              >
                {t("featuredTitle" as TranslationKey)}
              </h2>
              <p className="mt-3 text-sm text-neutral-400 sm:text-base">
                {t("featuredDescription" as TranslationKey)}
              </p>
              <Link
                href={language === "ne" ? "/ne/products" : "/products"}
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-amber-400 hover:text-amber-300 uppercase transition-colors"
              >
                {t("viewAllProducts" as TranslationKey)}{" "}
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <Link
                  key={product._id}
                  href={
                    language === "ne"
                      ? `/ne/products/${product.slug?.current || product.slug}`
                      : `/products/${product.slug?.current || product.slug}`
                  }
                  className="group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 rounded-3xl"
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-amber-500/20 bg-neutral-900/60 p-3.5 backdrop-blur-2xl transition-all duration-400 hover:border-amber-400 hover:bg-neutral-900 hover:shadow-[0_10px_40px_-10px_rgba(240,188,25,0.25)] hover:-translate-y-2">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-900 border border-white/10">
                      {product.mainImage?.image ? (
                        <Image
                          src={urlFor(product.mainImage.image)
                            .width(720)
                            .height(540)
                            .url()}
                          alt={product.mainImage.alt || product.title}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center text-amber-500/30">
                          <Lightbulb className="size-12" />
                        </div>
                      )}

                      <span className="absolute top-3 left-3 rounded-full border border-amber-500/40 bg-neutral-950/85 px-3 py-1 text-[10px] font-extrabold tracking-widest text-amber-400 uppercase backdrop-blur-md shadow-md">
                        {product.status === "bestSeller"
                          ? t("bestSeller" as TranslationKey)
                          : product.status === "new"
                            ? t("newArrival" as TranslationKey)
                            : t("featured" as TranslationKey)}
                      </span>

                      <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-neutral-950/85 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 backdrop-blur-md">
                        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {t("inStock" as TranslationKey)}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col justify-between px-2 pt-4 pb-2">
                      <div>
                        <h3 className="mt-1 text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-amber-400">
                          {product.title}
                        </h3>
                        {product.shortDescription && (
                          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-neutral-400">
                            {product.shortDescription}
                          </p>
                        )}
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-amber-500/10 pt-3">
                        <PriceTag
                          price={
                            product.price != null
                              ? product.price
                              : t("contactUsPrice" as TranslationKey)
                          }
                        />
                        <div className="flex size-7 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 transition-all duration-300 group-hover:bg-amber-500 group-hover:text-neutral-950 group-hover:scale-110">
                          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY CHOOSE US */}
      <section
        className="border-b border-amber-500/15 bg-neutral-950 px-4 py-20 sm:px-8 sm:py-24 lg:px-6 xl:px-10"
        aria-labelledby="why-title"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-2xl text-center">
            <Badge
              variant="outline"
              className="border-amber-500/30 bg-amber-500/10 text-amber-400 font-bold tracking-[0.2em] uppercase px-3.5 py-1"
            >
              {t("whyBadge" as TranslationKey)}
            </Badge>
            <h2
              id="why-title"
              className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl"
            >
              {t("whyTitle" as TranslationKey)}
            </h2>
            <p className="mt-3 text-sm text-neutral-400 sm:text-base">
              {t("whyDescription" as TranslationKey)}
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {HOME_BENEFITS.map((benefit, index) => {
              const Icon = ICON_MAP[benefit.iconName] || Zap;
              return (
                <div
                  key={index}
                  className="group relative flex flex-col justify-between rounded-3xl border border-amber-500/20 bg-neutral-900/60 p-7 sm:p-8 backdrop-blur-2xl transition-all duration-400 hover:border-amber-400 hover:bg-neutral-900 hover:shadow-[0_10px_40px_-10px_rgba(240,188,25,0.25)] hover:-translate-y-2"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex size-12 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-[0_0_20px_rgba(240,188,25,0.15)] transition-all duration-300 group-hover:bg-amber-500 group-hover:text-neutral-950 group-hover:scale-110">
                        <Icon className="size-6" strokeWidth={2} />
                      </div>
                      <span className="rounded-full border border-amber-500/30 bg-neutral-950/80 px-3 py-1 text-[11px] font-extrabold tracking-widest text-amber-400 font-mono">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-amber-400">
                      {t(benefit.titleKey)}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-neutral-400">
                      {t(benefit.descKey)}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-amber-500/10 pt-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[11px] font-bold text-amber-400">
                      <span className="size-1.5 rounded-full bg-amber-400" />
                      {t(benefit.metricKey)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* REVIEWS HORIZONTAL MARQUEE */}
      <section
        className="border-b border-amber-500/15 bg-neutral-950/70 py-20 sm:py-24 overflow-hidden"
        aria-labelledby="reviews-title"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-6 xl:px-10 text-center">
          <Badge
            variant="outline"
            className="border-amber-500/30 bg-amber-500/10 text-amber-400 font-bold tracking-[0.2em] uppercase px-3.5 py-1"
          >
            {t("reviewsBadge" as TranslationKey)}
          </Badge>
          <h2
            id="reviews-title"
            className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            {t("reviewsTitle" as TranslationKey)}
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className="size-3.5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-neutral-300">
              {t("reviewsRatingText" as TranslationKey)}
            </span>
          </div>
        </div>

        <div className="review-marquee relative mt-12 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max gap-6 animate-marquee motion-reduce:animate-none">
            {[...displayReviews, ...displayReviews, ...displayReviews].map(
              (review, index) => (
                <Card
                  key={index}
                  className="w-[360px] sm:w-[400px] shrink-0 border border-amber-500/20 bg-neutral-900/60 p-6 backdrop-blur-2xl transition-all duration-300 hover:border-amber-400 hover:bg-neutral-900/90"
                >
                  <CardContent className="p-0 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "size-3.5",
                                i < (review.rating ?? 5)
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-neutral-600"
                              )}
                            />
                          ))}
                        </div>
                        <Quote className="size-5 text-amber-400/80" />
                      </div>
                      <p className="mt-4 text-xs sm:text-sm leading-relaxed text-neutral-300/90 font-normal">
                        "{review.quote}"
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-3.5 border-t border-amber-500/10 pt-4">
                      <Avatar className="size-9 border border-amber-500/30">
                        <AvatarFallback className="bg-amber-500/20 text-amber-400 text-xs font-bold">
                          {review.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <p className="text-xs font-bold text-white tracking-wide">
                          {review.name}
                        </p>
                        <p className="text-[11px] font-medium text-neutral-400">
                          {review.context}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </div>

        {/* WRITE A REVIEW CTA */}
        <div className="mt-12 flex flex-col items-center justify-center text-center space-y-3.5 px-4">
          <p className="text-sm sm:text-base font-medium text-neutral-300">
            {t("reviewsCtaQuestion" as TranslationKey)}
          </p>
          <button
            type="button"
            onClick={() => setIsReviewModalOpen(true)}
            className="group inline-flex items-center gap-2.5 rounded-full bg-amber-500 px-7 py-3 text-sm font-bold text-neutral-950 shadow-lg shadow-amber-500/20 transition-all duration-200 hover:bg-amber-400 hover:shadow-amber-400/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Pencil className="size-4 text-neutral-950 transition-transform group-hover:-rotate-12" />
            <span>{t("writeReview" as TranslationKey)}</span>
          </button>
        </div>
      </section>

      {/* B2B DEALERSHIP CTA BANNER */}
      <section className="relative overflow-hidden border-b border-amber-500/15 bg-neutral-950 px-4 py-20 sm:px-8 sm:py-24 lg:px-6 xl:px-10">
        <div className="pointer-events-none absolute inset-0 bg-neutral-950" />

        <div className="relative z-10 mx-auto max-w-[1440px] overflow-hidden rounded-3xl border border-amber-500/30 bg-neutral-900/70 p-8 sm:p-12 backdrop-blur-2xl shadow-[0_0_50px_-10px_rgba(240,188,25,0.15)]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1 text-[11px] font-bold tracking-[0.25em] text-amber-400 uppercase backdrop-blur-md">
                <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
                {language === "ne"
                  ? "गुरु बल्ब साझेदार"
                  : "Partner With Guru Bulbs"}
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
                {language === "ne"
                  ? "अधिकृत डिलर बन्न "
                  : "Interested in becoming an "}
                <span className="gold-gradient-text">
                  {language === "ne"
                    ? "इच्छुक हुनुहुन्छ?"
                    : "authorized dealer?"}
                </span>
              </h2>
              <p className="mt-3 text-sm text-neutral-300 sm:text-base leading-relaxed">
                {language === "ne"
                  ? "थोक क्याटलग दरहरू, प्राथमिकता स्टक र विशेष व्यापार सहयोग प्राप्त गर्नुहोस्।"
                  : "Access wholesale catalog rates, priority stock allocations, and dedicated trade support."}
              </p>
            </div>

            <Link
              href={language === "ne" ? "/ne/dealership" : "/dealership"}
              className={buttonVariants({ variant: "brand", size: "cta-lg", className: "shrink-0" })}
            >
              {language === "ne" ? "डिलरसीप सोधपुछ" : "Dealership Enquiry"}{" "}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* REVIEW SUBMISSION MODAL */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSuccess={(newReview) => {
          setReviewsList((prev) => [newReview, ...prev]);
        }}
      />
    </div>
  );
}
