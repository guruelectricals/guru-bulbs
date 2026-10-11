"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Zap, PackageX } from "lucide-react";
import { PriceTag } from "@/components/price-tag";
import { ProductFilterBar } from "@/components/product-filter-bar";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";
import { toDevanagariNumerals, translateContent, type TranslationKey } from "@/lib/i18n";

type DisplayProduct = {
  slug: string;
  title: string;
  productCode: string;
  categorySlug: string;
  categoryTitle: string;
  price: number | string;
  originalPrice?: number | string;
  discountLabel?: string;
  inStock: boolean;
  wattage?: string;
  status?: string;
  rating: number;
  reviews: number;
  imageUrl?: string;
  imageFallback: string;
  shortDescription: string;
  highlights: string[];
};

export function ProductsPageClient({
  visibleProducts,
  allProductsCount,
  selectedCategoryTitle,
  sanityCategories,
}: {
  visibleProducts: DisplayProduct[];
  allProductsCount: number;
  selectedCategoryTitle?: string;
  sanityCategories?: { slug: string; title: string }[];
}) {
  const { language, t } = useLanguage();

  const getLocalizedHref = (href: string) => {
    if (language === "ne") {
      if (href.startsWith("/ne")) return href;
      const cleanHref = href.startsWith("/") ? href : `/${href}`;
      return `/ne${cleanHref === "/" ? "" : cleanHref}`;
    }
    return href.replace(/^\/ne/, "") || "/";
  };

  const getStatusBadge = (status?: string) => {
    if (status === "bestSeller") {
      return {
        label: t("bestSeller"),
        className: "bg-amber-500 text-neutral-950 font-extrabold",
      };
    }
    if (status === "new") {
      return {
        label: t("newArrival"),
        className: "bg-emerald-500 text-neutral-950 font-extrabold",
      };
    }
    if (status === "featured") {
      return {
        label: t("featured"),
        className:
          "bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold",
      };
    }
    return null;
  };

  const categoryNameTranslated = selectedCategoryTitle
    ? (t(selectedCategoryTitle as TranslationKey) || selectedCategoryTitle)
    : (language === "ne" ? "सबै प्रकाश उत्पादनहरू" : "All Lighting Solutions");

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* HERO SECTION */}
      <section className="relative border-b border-amber-500/15 bg-neutral-950 px-4 pt-28 pb-12 sm:px-6 sm:pt-32 lg:px-6 xl:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.25em] text-amber-400 uppercase backdrop-blur-md shadow-[0_0_20px_rgba(240,188,25,0.15)] mb-4">
            <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
            {t("productsHeroBadge")}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.08]">
            {language === "ne" ? "हाम्रो लाइटिङ " : "Our Lighting "}
            <span className="gold-gradient-text font-serif italic drop-shadow-[0_0_25px_rgba(240,188,25,0.3)]">
              {language === "ne" ? "सङ्कलन" : "Collection"}
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-neutral-300/90 sm:text-lg leading-relaxed font-normal tracking-wide">
            {t("categoriesDescription")}
          </p>
        </div>
      </section>

      {/* INTERACTIVE FILTER BAR */}
      <section className="border-b border-amber-500/15 bg-neutral-950/90 px-4 py-6 sm:px-6 lg:px-6 xl:px-10">
        <div className="mx-auto max-w-[1440px]">
          <ProductFilterBar sanityCategories={sanityCategories} />
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="px-4 py-16 sm:px-6 lg:px-6 xl:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-amber-500/10 pb-6 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {categoryNameTranslated}
              </h2>
              <p className="mt-1 text-xs text-neutral-400">
                {language === "ne"
                  ? `कुल ${allProductsCount} मध्ये ${visibleProducts.length} प्रमाणित एलईडी मोडलहरू देखाइदै।`
                  : `Showing ${visibleProducts.length} of ${allProductsCount} certified LED lighting models.`}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
              <ShieldCheck className="size-4 text-amber-400" />
              <span>{language === "ne" ? "२-वर्षे सोझै सट्टा वारेन्टी समावेश" : "2-Year Replacement Warranty Included"}</span>
            </div>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProducts.map((product) => {
                const badge = getStatusBadge(product.status);
                const itemCatName = t(product.categoryTitle as TranslationKey) || product.categoryTitle;

                return (
                  <div
                    key={product.slug}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-amber-500/20 bg-neutral-900/60 p-6 backdrop-blur-2xl transition-all duration-400 hover:border-amber-400 hover:bg-neutral-900 hover:shadow-[0_10px_40px_-10px_rgba(240,188,25,0.2)] hover:-translate-y-1.5"
                  >
                    <div>
                      {/* TOP BADGE BAR */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div>
                          {badge ? (
                            <span
                              className={cn(
                                "rounded-full px-3 py-1 text-[10px] uppercase tracking-wider",
                                badge.className,
                              )}
                            >
                              {badge.label}
                            </span>
                          ) : (
                            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                              {language === "ne" ? "प्रमाणित एलईडी" : "Certified LED"}
                            </span>
                          )}
                        </div>

                        {/* LIVE STOCK INDICATOR */}
                        <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 backdrop-blur-md">
                          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {product.inStock ? t("inStock") : t("preOrder")}
                        </div>
                      </div>

                      {/* PRODUCT IMAGE CONTAINER */}
                      <div className="relative mb-5 flex h-52 items-center justify-center overflow-hidden rounded-2xl border border-amber-500/15 bg-neutral-950/80 shadow-inner group-hover:border-amber-500/40">
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-108"
                          />
                        ) : (
                          <span className="text-6xl drop-shadow-[0_0_15px_rgba(240,188,25,0.25)] transition-transform duration-500 group-hover:scale-110">
                            {product.imageFallback}
                          </span>
                        )}

                        {/* WATTAGE CAPSULE ON IMAGE */}
                        {product.wattage && (
                          <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1 rounded-full border border-amber-500/40 bg-neutral-950/90 px-3 py-1 text-[11px] font-extrabold text-amber-400 backdrop-blur-md shadow-md">
                            <Zap className="size-3 text-amber-400" />
                            <span>{language === "ne" ? toDevanagariNumerals(product.wattage) : product.wattage}</span>
                          </div>
                        )}
                      </div>

                      {/* CATEGORY META */}
                      <div className="flex items-center justify-between text-[11px] font-bold mb-2">
                        <span className="tracking-wider uppercase text-amber-400/90">
                          {itemCatName}
                        </span>
                      </div>

                      {/* TITLE */}
                      <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-amber-400">
                        {translateContent(product.title, language)}
                      </h3>

                      {/* DESCRIPTION */}
                      <p className="mt-2 text-xs leading-relaxed text-neutral-400 line-clamp-2">
                        {translateContent(product.shortDescription, language)}
                      </p>

                      {/* HIGHLIGHT PILLS */}
                      {product.highlights && product.highlights.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {product.highlights.slice(0, 3).map((item, idx) => (
                            <span
                              key={idx}
                              className="rounded-md border border-amber-500/15 bg-neutral-950/60 px-2 py-0.5 text-[10px] font-semibold text-neutral-300"
                            >
                              {translateContent(item, language)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* PRICE & FOOTER BAR */}
                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-amber-500/15">
                      <PriceTag
                        price={product.price}
                        originalPrice={product.originalPrice}
                        discountLabel={product.discountLabel}
                      />

                      <Link
                        href={getLocalizedHref(`/products/${product.slug}`)}
                        className={buttonVariants({
                          variant: "brandOutline",
                          size: "cta-sm",
                          className: "group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-neutral-950",
                        })}
                      >
                        {t("details")} <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* EMPTY FILTER STATE */
            <div className="rounded-3xl border border-amber-500/20 bg-neutral-900/40 p-12 text-center backdrop-blur-2xl">
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-400 mb-4">
                <PackageX className="size-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {language === "ne" ? "तपाईंको खोज अनुसार कुनै उत्पादन फेला परेन" : "No products match your filters"}
              </h3>
              <p className="mt-2 text-xs text-neutral-400 max-w-md mx-auto">
                {language === "ne"
                  ? "खोजेका शब्दहरू परिवर्तन गर्नुहोस् वा फिल्टरहरू हटाउनुहोस्।"
                  : "Try adjusting your search keywords, clearing wattage constraints, or selecting \"All Products\"."}
              </p>
              <div className="mt-6">
                <Link
                  href={getLocalizedHref("/products")}
                  className={buttonVariants({ variant: "brand", size: "cta" })}
                >
                  {language === "ne" ? "सबै फिल्टरहरू हटाउनुहोस्" : "Clear All Filters"}
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
