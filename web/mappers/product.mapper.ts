import { urlFor } from "@/lib/image";

import type { Product } from "@/types/product";
import type { ProductDTO } from "@/types/dto/product.dto";

export function toProductDTO(product: Product): ProductDTO {
  return {
    id: product._id,

    // ==========================================
    // GENERAL
    // ==========================================

    title: product.title,

    productCode: product.productCode || "GB-LED",

    slug: product.slug.current,

    shortDescription: product.shortDescription,

    description: product.description,

    category: product.category
      ? {
          title: product.category.title,
          slug: product.category.slug.current,
        }
      : undefined,

    // ==========================================
    // MAIN IMAGE
    // ==========================================

    imageUrl: product.mainImage?.image
      ? urlFor(product.mainImage.image as any).url()
      : undefined,

    imageAlt: product.mainImage?.alt,

    // ==========================================
    // GALLERY
    // ==========================================

    gallery: product.gallery?.map((image) => ({
      imageUrl: image.image
        ? urlFor(image.image as any).url()
        : undefined,

      imageAlt: image.alt,
    })),

    // ==========================================
    // VARIANTS & PRICING
    // ==========================================

    variants: product.variants,

    startingPrice: (() => {
      if (!product.variants || product.variants.length === 0) {
        return typeof product.startingPrice === "number" && !isNaN(product.startingPrice)
          ? product.startingPrice
          : undefined;
      }
      const prices = product.variants
        .flatMap((v) => [v.k6500, v.k4000, v.k3000])
        .map((p) => {
          if (typeof p === "number") return isNaN(p) ? null : p;
          if (typeof p === "string") {
            const cleaned = p.replace(/[^0-9.]/g, "");
            const num = parseFloat(cleaned);
            return isNaN(num) ? null : num;
          }
          return null;
        })
        .filter((p): p is number => p !== null);

      if (prices.length > 0) {
        return Math.min(...prices);
      }
      return typeof product.startingPrice === "number" && !isNaN(product.startingPrice)
        ? product.startingPrice
        : undefined;
    })(),

    // ==========================================
    // PRODUCT DETAILS
    // ==========================================



    highlights: product.highlights,

    // ==========================================
    // TECHNICAL SPECIFICATIONS
    // ==========================================

    technicalSpecifications:
      product.technicalSpecifications,

    // ==========================================
    // KEY FEATURES
    // ==========================================

    features: product.features,

    // ==========================================
    // CERTIFICATIONS & WARRANTY
    // ==========================================

    certifications: product.certifications,

    warranty: product.warranty,

    warrantyTerms: product.warrantyTerms,

    // ==========================================
    // USAGE & FAQ
    // ==========================================


    faqs: product.faqs,

    // ==========================================
    // RELATED PRODUCTS
    // ==========================================

    relatedProducts: product.relatedProducts?.map((relatedProduct: any) => {
      const prices = (relatedProduct.variants || [])
        .flatMap((v: any) => [v.k6500, v.k4000, v.k3000])
        .map((p: any) => {
          if (typeof p === "number") return isNaN(p) ? null : p;
          if (typeof p === "string") {
            const cleaned = p.replace(/[^0-9.]/g, "");
            const num = parseFloat(cleaned);
            return isNaN(num) ? null : num;
          }
          return null;
        })
        .filter((p: any): p is number => p !== null);

      const startingPrice =
        prices.length > 0
          ? Math.min(...prices)
          : typeof relatedProduct.startingPrice === "number" && !isNaN(relatedProduct.startingPrice)
          ? relatedProduct.startingPrice
          : undefined;

      return {
        id: relatedProduct._id,
        title: relatedProduct.title,
        slug: relatedProduct.slug.current,
        imageUrl: relatedProduct.mainImage?.image
          ? urlFor(relatedProduct.mainImage.image as any).url()
          : undefined,
        imageAlt: relatedProduct.mainImage?.alt,
        shortDescription: relatedProduct.shortDescription,
        startingPrice,
      };
    }),
  };
}
