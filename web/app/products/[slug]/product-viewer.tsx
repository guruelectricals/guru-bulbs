"use client";

import * as React from "react";
import Image from "next/image";
import { Lightbulb, ZoomIn, Check } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export type ProductVariant = {
  id: string;
  label: string;
  description: string;
  heroTone?: string;
  accentTone?: string;
  iconTone?: string;
  imageUrl?: string;
  imageFallback?: string;
};

type ProductViewerProps = {
  variants: ProductVariant[];
  imageUrl?: string;
  imageFallback?: string;
};

export function ProductViewer({
  variants,
  imageUrl,
  imageFallback = "💡",
}: ProductViewerProps) {
  const [selectedVariantId, setSelectedVariantId] = React.useState(
    variants[0]?.id ?? "",
  );
  const [isZoomed, setIsZoomed] = React.useState(false);
  const selectedVariant =
    variants.find((variant) => variant.id === selectedVariantId) ?? variants[0];

  const currentImage = selectedVariant?.imageUrl || imageUrl;

  return (
    <div className="space-y-6">
      <AspectRatio ratio={1.1}>
        <div className="relative h-full w-full overflow-hidden rounded-3xl border border-amber-500/25 bg-neutral-900/80 p-6 backdrop-blur-2xl shadow-[0_0_50px_-10px_rgba(240,188,25,0.15)] group">
          {/* Radial Warm Lighting Aura */}
          <div className="pointer-events-none absolute inset-0 bg-neutral-950" />

          <div className="relative flex h-full w-full items-center justify-center">
            {currentImage ? (
              <div
                className={cn(
                  "relative h-full w-full transition-transform duration-500 ease-out",
                  isZoomed && "scale-[1.5]",
                )}
              >
                <Image
                  src={currentImage}
                  alt="Product view"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                  priority
                />
              </div>
            ) : (
              <div
                className={cn(
                  "flex size-40 sm:size-48 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-[0_0_40px_rgba(240,188,25,0.25)] transition-transform duration-500",
                  isZoomed && "scale-[1.5]",
                )}
              >
                <span className="text-7xl drop-shadow-[0_0_20px_rgba(240,188,25,0.4)]">
                  {imageFallback}
                </span>
              </div>
            )}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="absolute right-4 bottom-4 border-amber-500/30 bg-neutral-950/80 text-xs font-bold text-amber-400 backdrop-blur-md hover:border-amber-400 hover:bg-neutral-900"
            aria-pressed={isZoomed}
            onClick={() => setIsZoomed((value) => !value)}
          >
            <ZoomIn className="mr-1.5 h-3.5 w-3.5" />
            {isZoomed ? "Reset view" : "Zoom view"}
          </Button>
        </div>
      </AspectRatio>

      {/* VARIANT SELECTOR */}
      {variants && variants.length > 0 && (
        <RadioGroup
          value={selectedVariantId}
          onValueChange={setSelectedVariantId}
          aria-label="Choose a product variant"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {variants.map((variant) => {
            const isSelected = variant.id === selectedVariantId;

            return (
              <label
                key={variant.id}
                htmlFor={`variant-${variant.id}`}
                className={cn(
                  "relative flex cursor-pointer items-center justify-between gap-3 rounded-2xl border p-4 transition-all duration-300 backdrop-blur-xl",
                  isSelected
                    ? "border-amber-400 bg-amber-500/15 shadow-[0_0_20px_rgba(240,188,25,0.15)]"
                    : "border-amber-500/20 bg-neutral-900/60 hover:border-amber-500/40 hover:bg-neutral-900",
                )}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem
                    value={variant.id}
                    id={`variant-${variant.id}`}
                    className="border-amber-500 text-amber-400"
                  />
                  <div>
                    <span
                      className={cn(
                        "block text-xs font-bold tracking-wide",
                        isSelected ? "text-amber-400" : "text-white",
                      )}
                    >
                      {variant.label}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-neutral-400">
                      {variant.description}
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <Check className="size-4 text-amber-400 shrink-0" />
                )}
              </label>
            );
          })}
        </RadioGroup>
      )}
    </div>
  );
}
