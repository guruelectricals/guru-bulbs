import { notFound } from "next/navigation";

import { ProductDetailPageClient } from "@/components/pages/product-detail-page";
import { sanityFetch } from "@/lib/fetch";
import { productBySlugQuery } from "@/lib/queries";
import { toProductDTO } from "@/mappers/product.mapper";
import type { Product } from "@/types/product";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await sanityFetch<Product | null>(productBySlugQuery, {
    slug,
  }).catch(() => null);

  return {
    title: `${product?.title || "LED Light"} | Guru Bulbs`,
    description:
      product?.shortDescription ||
      "Guru Bulbs certified LED lighting product.",
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await sanityFetch<Product | null>(productBySlugQuery, {
    slug,
  }).catch(() => null);

  if (!product) {
    notFound();
  }

  return <ProductDetailPageClient targetProduct={toProductDTO(product)} />;
}
