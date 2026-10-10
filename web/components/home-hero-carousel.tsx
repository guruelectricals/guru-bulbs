"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type HeroSlide = {
  key: string;
  imageUrl: string;
  imageAlt: string;
};

const AUTOPLAY_MS = 6000;

export function HomeHeroCarousel({
  slides,
  badge,
  titlePrefix,
  titleSuffix,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  slides: HeroSlide[];
  badge: string;
  titlePrefix: string;
  titleSuffix: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  // Auto-advance through the featured product images.
  // Auto-advance; the timer restarts whenever the slide changes, so using the
  // arrows gives the visitor a full interval before the next automatic slide.
  useEffect(() => {
    if (count < 2) return;

    const timer = window.setTimeout(
      () => setIndex((current) => (current + 1) % count),
      AUTOPLAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [count, index]);

  const step = (delta: number) =>
    setIndex((current) => (current + delta + count) % count);

  const arrowClass =
    "absolute top-1/2 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md transition-colors hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0bc19]";

  if (count === 0) return null;

  return (
    <section
      className="relative flex flex-1 items-center overflow-hidden bg-neutral-950 px-4 pt-24 pb-10 sm:px-8 sm:pt-28 lg:px-6 xl:px-10"
      aria-roledescription="carousel"
      aria-label={badge}
    >
      {/* BACKGROUND: current product photo under one even theme tint (no gradients) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {slides.map((slide, slideIndex) => (
          <Image
            key={slide.key}
            src={slide.imageUrl}
            alt=""
            fill
            sizes="100vw"
            className={cn(
              "scale-105 object-cover blur-[2px] transition-opacity duration-1000 ease-out",
              slideIndex === index ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-0 bg-background/55 dark:bg-black/75" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-10 md:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div className="text-center md:text-left">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-[10px] font-bold tracking-[0.18em] text-amber-400 uppercase sm:mb-5 sm:px-4 sm:py-1.5 sm:text-[11px]">
            <span className="size-1.5 rounded-full bg-amber-400" />
            {badge}
          </div>

          <h1 className="text-[2.5rem] leading-[1.05] font-bold tracking-tight text-balance text-white sm:text-5xl lg:text-[4.25rem]">
            {titlePrefix}{" "}
            <span className="gold-gradient-text font-serif font-medium tracking-normal italic">
              {titleSuffix}
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-400 sm:mt-5 sm:text-base sm:leading-[1.8] md:mx-0 lg:text-lg">
            {description}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4 md:justify-start">
            <Link
              href={primaryHref}
              className={buttonVariants({
                variant: "brand",
                size: "cta-lg",
                className: "w-full sm:w-auto",
              })}
            >
              {primaryLabel}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href={secondaryHref}
              className={buttonVariants({
                variant: "brandOutline",
                size: "cta-lg",
                className: "w-full sm:w-auto",
              })}
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>

        {/* Featured product image card */}
        <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-3xl border border-amber-500/15 bg-neutral-900 shadow-xl shadow-black/10 md:max-w-[min(560px,calc((100svh-18rem)*4/3))]">
          {slides.map((slide, slideIndex) => (
            <Image
              key={slide.key}
              src={slide.imageUrl}
              alt={slide.imageAlt}
              fill
              priority={slideIndex === 0}
              sizes="(min-width: 768px) 560px, 100vw"
              className={cn(
                "object-cover transition-opacity duration-700 ease-out",
                slideIndex === index
                  ? "opacity-100"
                  : "pointer-events-none opacity-0",
              )}
              aria-hidden={slideIndex !== index}
            />
          ))}

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                className={cn(arrowClass, "left-3")}
                aria-label="Previous slide"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className={cn(arrowClass, "right-3")}
                aria-label="Next slide"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
