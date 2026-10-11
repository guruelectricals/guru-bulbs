"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShoppingCart,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/providers/language-provider";
import {
  toDevanagariNumerals,
  translateContent,
  type TranslationKey,
} from "@/lib/i18n";

import type { ProductVariantDTO } from "@/types/dto/product.dto";

type GalleryImage = {
  imageUrl?: string;
  imageAlt?: string;
};

type TechnicalSpecification = {
  key: string;
  value: string;
};

type FAQ = {
  question: string;
  answer: unknown;
};

type RelatedProduct = {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  imageAlt?: string;
  shortDescription?: string;
  startingPrice?: number;
};

export type DetailProduct = {
  id?: string;
  slug: string;
  title: string;
  productCode: string;
  category?: {
    title: string;
    slug: string;
  };
  shortDescription?: string;
  description?: unknown;
  imageUrl?: string;
  imageAlt?: string;
  gallery?: GalleryImage[];
  startingPrice?: number;
  variants?: ProductVariantDTO[];
  highlights?: string[];
  features?: string[];
  technicalSpecifications?: TechnicalSpecification[];
  certifications?: string[];
  warranty?: string;
  warrantyTerms?: string;
  faqs?: FAQ[];
  relatedProducts?: RelatedProduct[];
};

function formatPrice(price?: number, language?: string) {
  if (price === undefined || price === null || Number.isNaN(price)) {
    return "—";
  }
  const formatted = new Intl.NumberFormat("en-IN").format(price);
  return language === "ne"
    ? `रु. ${toDevanagariNumerals(formatted)}`
    : `Rs. ${formatted}`;
}

export function ProductDetailPageClient({
  targetProduct,
}: {
  targetProduct: DetailProduct;
}) {
  const { language, t } = useLanguage();

  const categoryName = targetProduct.category?.title || "LED Lighting";
  const categoryNameTranslated =
    t(categoryName as TranslationKey) || categoryName;

  const getLocalizedHref = (href: string) => {
    if (language === "ne") {
      if (href.startsWith("/ne")) return href;
      const cleanHref = href.startsWith("/") ? href : `/${href}`;
      return `/ne${cleanHref === "/" ? "" : cleanHref}`;
    }
    return href.replace(/^\/ne/, "") || "/";
  };

  const variants = targetProduct.variants || [];

  const has6500K = variants.some((v) => v.k6500 && v.k6500 !== "—" && v.k6500.trim() !== "");
  const has4000K = variants.some((v) => v.k4000 && v.k4000 !== "—" && v.k4000.trim() !== "");
  const has3000K = variants.some((v) => v.k3000 && v.k3000 !== "—" && v.k3000.trim() !== "");

  const gallery = [
    ...(targetProduct.imageUrl
      ? [
        {
          imageUrl: targetProduct.imageUrl,
          imageAlt: targetProduct.imageAlt || targetProduct.title,
        },
      ]
      : []),
    ...(targetProduct.gallery || []),
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* =====================================================
          FULL-BLEED HERO WITH PRODUCT IMAGE BACKGROUND
      ===================================================== */}

      <section className="relative flex min-h-[65vh] items-end overflow-hidden">
        {/* Background product image */}
        {targetProduct.imageUrl && (
          <Image
            src={targetProduct.imageUrl}
            alt={targetProduct.imageAlt || targetProduct.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        )}

        {/* Theme-aware gradient overlays for crisp readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/55 via-background/15 to-transparent dark:from-black/75 dark:via-black/35 dark:to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent dark:from-black/60 dark:via-transparent dark:to-transparent" />

        {/* Amber accent glow at base */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-36 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-7 flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
            <Link
              href={getLocalizedHref("/products")}
              className="transition-colors hover:text-amber-600 dark:hover:text-amber-400"
            >
              {t("products")}
            </Link>
            <span>/</span>
            <Link
              href={getLocalizedHref(
                `/products?type=${targetProduct.category?.slug || ""}`,
              )}
              className="transition-colors hover:text-amber-600 dark:hover:text-amber-400"
            >
              {categoryNameTranslated}
            </Link>
            <span>/</span>
            <span className="text-foreground">{targetProduct.title}</span>
          </nav>

          {/* Badges */}
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-amber-400 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-black shadow-sm">
              Certified LED
            </span>

            <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-700 backdrop-blur-sm dark:border-[#f0bc19]/60 dark:bg-[#f0bc19]/15 dark:text-[#f0bc19]">
              {categoryNameTranslated}
            </span>

            {targetProduct.warranty && (
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 backdrop-blur-sm dark:border-emerald-400/40 dark:bg-emerald-400/15 dark:text-emerald-300">
                {targetProduct.warranty}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-foreground drop-shadow-[0_1px_8px_rgba(255,253,248,0.9)] dark:text-white dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-6xl">
            {translateContent(targetProduct.title, language)}
          </h1>




        </div>
      </section>

      {/* =====================================================
          PRODUCT DETAILS — IMAGE GALLERY + PRODUCT INFO
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* IMAGE GALLERY */}
          <div>
            <div className="overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                {gallery[0]?.imageUrl ? (
                  <Image
                    src={gallery[0].imageUrl}
                    alt={gallery[0].imageAlt || targetProduct.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-7xl">
                    💡
                  </div>
                )}
              </div>
            </div>

            {/* Gallery thumbnails */}
            {gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2">
                {gallery.slice(0, 5).map((image, index) => (
                  <div
                    key={`${image.imageUrl}-${index}`}
                    className="relative aspect-square overflow-hidden rounded-md border border-border bg-card p-1"
                  >
                    {image.imageUrl && (
                      <Image
                        src={image.imageUrl}
                        alt={
                          image.imageAlt ||
                          `${targetProduct.title} ${index + 1}`
                        }
                        fill
                        sizes="100px"
                        className="object-contain"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PRODUCT INFORMATION */}
          <div className="space-y-5">
            {/* Overview card */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                Product Overview
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-foreground">
                {targetProduct.title}
              </h2>
              {targetProduct.shortDescription && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {targetProduct.shortDescription}
                </p>
              )}
            </div>

            {/* Starting Price */}
            {targetProduct.startingPrice !== undefined &&
              !Number.isNaN(targetProduct.startingPrice) && (
                <div className="rounded-xl border border-primary/30 bg-primary/10 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">
                    Starting Price
                  </p>
                  <div className="mt-1 text-3xl font-extrabold text-primary">
                    {formatPrice(targetProduct.startingPrice, language)}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Prices may vary depending on variant and quantity.
                  </p>
                </div>
              )}

            {/* Highlights */}
            {targetProduct.highlights && targetProduct.highlights.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {targetProduct.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 rounded-lg border border-border bg-card p-3 text-xs font-medium text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-amber-500" />
                    <span>{translateContent(highlight, language)}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Warranty */}
            {targetProduct.warranty && (
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 size-5 text-amber-500" />
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {targetProduct.warranty} Warranty
                    </p>
                    {targetProduct.warrantyTerms && (
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {targetProduct.warrantyTerms}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={getLocalizedHref("/contact")}
                className={buttonVariants({ variant: "brand", size: "cta", className: "w-full sm:flex-1" })}
              >
                <ShoppingCart className="size-4" />
                Enquire
              </Link>
              <Link
                href={getLocalizedHref("/products")}
                className={buttonVariants({ variant: "brandOutline", size: "cta", className: "w-full sm:flex-1" })}
              >
                <ArrowLeft className="size-4" />
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VARIANTS & PRICING
      ===================================================== */}

      {variants.length > 0 && (
        <section className="bg-muted/30 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              Product Variants
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-foreground">
              Variants &amp; Pricing
            </h2>

            <div className="mt-5 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="bg-muted text-xs font-bold uppercase tracking-wider text-primary">
                  <tr>
                    <th className="px-5 py-4">NAME</th>
                    <th className="px-5 py-4">WATT</th>
                    <th className="px-5 py-4">MODEL</th>
                    <th className="px-5 py-4">HOLDER</th>
                    {has6500K && <th className="px-5 py-4">6500K</th>}
                    {has4000K && <th className="px-5 py-4">4000K</th>}
                    {has3000K && <th className="px-5 py-4">3000K</th>}
                    <th className="px-5 py-4">QTY/CTN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {variants.map((variant, index) => (
                    <tr
                      key={`${variant.modelNumber}-${index}`}
                      className="transition-colors hover:bg-muted/50"
                    >
                      <td className="px-5 py-4 font-semibold text-foreground">
                        {variant.name || "—"}
                      </td>
                      <td className="px-5 py-4 font-semibold text-foreground">
                        {variant.wattage || "—"}
                      </td>
                      <td className="px-5 py-4 font-semibold text-foreground">
                        {variant.modelNumber || "—"}
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">
                        {variant.holder || "—"}
                      </td>
                      {has6500K && (
                        <td className="px-5 py-4 font-extrabold text-primary">
                          {variant.k6500 || "—"}
                        </td>
                      )}
                      {has4000K && (
                        <td className="px-5 py-4 font-extrabold text-primary">
                          {variant.k4000 || "—"}
                        </td>
                      )}
                      {has3000K && (
                        <td className="px-5 py-4 font-extrabold text-primary">
                          {variant.k3000 || "—"}
                        </td>
                      )}
                      <td className="px-5 py-4 text-muted-foreground">
                        {variant.qtyPerCtn || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          TECHNICAL SPECIFICATIONS
      ===================================================== */}

      {targetProduct.technicalSpecifications &&
        targetProduct.technicalSpecifications.length > 0 && (
          <section className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                Technical Details
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-foreground">
                Technical Specifications
              </h2>

              <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-border/60">
                    {targetProduct.technicalSpecifications.map((spec, index) => (
                      <tr
                        key={`${spec.key}-${index}`}
                        className="transition-colors hover:bg-muted/40 even:bg-muted/20"
                      >
                        <td className="w-1/3 px-6 py-3.5 font-medium text-muted-foreground">
                          {spec.key}
                        </td>
                        <td className="px-6 py-3.5 font-semibold text-foreground">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

      {/* =====================================================
          KEY FEATURES
      ===================================================== */}

      {targetProduct.features && targetProduct.features.length > 0 && (
        <section className="bg-muted/30 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              Features
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-foreground">
              Key Features
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {targetProduct.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-sm"
                >
                  <CheckCircle2 className="size-5 shrink-0 text-amber-500" />
                  <span className="text-sm font-medium text-foreground">
                    {translateContent(feature, language)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          CERTIFICATIONS
      ===================================================== */}

      {targetProduct.certifications &&
        targetProduct.certifications.length > 0 && (
          <section className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                Quality Certifications
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-foreground">
                Certifications
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">
                {targetProduct.certifications.map((certification, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-bold text-foreground"
                  >
                    {certification}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

      {/* =====================================================
          FAQ
      ===================================================== */}

      {targetProduct.faqs && targetProduct.faqs.length > 0 && (
        <section className="bg-muted/30 py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                Customer Questions
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-foreground">
                Usage &amp; FAQs
              </h2>
            </div>

            <div className="mt-6 space-y-3">
              {targetProduct.faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-xl border border-border bg-card p-4"
                >
                  <summary className="cursor-pointer list-none pr-6 text-sm font-bold text-foreground">
                    {faq.question}
                  </summary>
                  <div className="mt-3 border-t border-border pt-3 text-sm leading-6 text-muted-foreground">
                    {typeof faq.answer === "string" ? (
                      faq.answer
                    ) : (
                      <PortableTextContent value={faq.answer} />
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          RELATED PRODUCTS
      ===================================================== */}

      {targetProduct.relatedProducts &&
        targetProduct.relatedProducts.length > 0 && (
          <section className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">
                    More Products
                  </p>
                  <h2 className="mt-1 text-2xl font-extrabold text-foreground">
                    More {categoryNameTranslated} Products
                  </h2>
                </div>
                <Link
                  href={getLocalizedHref("/products")}
                  className="hidden items-center gap-1 text-xs font-bold text-primary sm:flex"
                >
                  View All
                  <ArrowRight className="size-4" />
                </Link>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {targetProduct.relatedProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={getLocalizedHref(`/products/${product.slug}`)}
                    className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:border-primary"
                  >
                    <div className="relative aspect-[4/3] bg-muted">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.imageAlt || product.title}
                          fill
                          sizes="400px"
                          className="object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-5xl">
                          💡
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-foreground group-hover:text-primary">
                        {product.title}
                      </h3>
                      {product.shortDescription && (
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                          {product.shortDescription}
                        </p>
                      )}
                      {typeof product.startingPrice === "number" &&
                        !Number.isNaN(product.startingPrice) &&
                        product.startingPrice > 0 && (
                          <p className="mt-3 font-extrabold text-primary">
                            From {formatPrice(product.startingPrice, language)}
                          </p>
                        )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="border-t border-border bg-muted/30 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <div>
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <Zap className="size-5 text-primary" />
              <h2 className="text-xl font-extrabold text-foreground">
                Need the right lighting solution?
              </h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Contact Guru Bulbs for product information, availability and
              wholesale pricing.
            </p>
          </div>
          <Link
            href={getLocalizedHref("/contact")}
            className={buttonVariants({ variant: "brand", size: "cta" })}
          >
            Contact Us
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

/**
 * Portable Text renderer — kept separate so the main component stays clean.
 */
function PortableTextContent({ value }: { value: unknown }) {
  const blocks = Array.isArray(value) ? value : [];
  return (
    <div className="space-y-3">
      {blocks.map((block: any, index) => {
        if (!block || block._type !== "block") return null;
        const text =
          block.children?.map((child: any) => child.text).join("") || "";
        return <p key={block._key || index}>{text}</p>;
      })}
    </div>
  );
}
