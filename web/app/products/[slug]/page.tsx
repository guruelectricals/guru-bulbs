import { notFound } from "next/navigation";

import { ProductDetailPageClient } from "@/components/pages/product-detail-page";
import { sanityFetch } from "@/lib/fetch";
import { productBySlugQuery } from "@/lib/queries";
import { toProductDTO } from "@/mappers/product.mapper";
import type { Product } from "@/types/product";
import { constructMetadata, SITE_URL } from "@/lib/seo";
import { urlFor } from "@/lib/image";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await sanityFetch<Product | null>(productBySlugQuery, {
    slug,
  }).catch(() => null);

  if (!product) {
    return constructMetadata({ title: "Product Not Found", noIndex: true });
  }

  return constructMetadata({
    title: product.title,
    description:
      product.shortDescription || "Guru Bulbs certified LED lighting product.",
    image: product.mainImage?.image
      ? urlFor(product.mainImage.image).url()
      : undefined,
    canonical: `${SITE_URL}/products/${slug}`,
  });
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await sanityFetch<Product | null>(productBySlugQuery, {
    slug,
  }).catch(() => null);

  if (!product) {
    notFound();
  }

  const productDto = toProductDTO(product);
  const productUrl = `${SITE_URL}/products/${slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productDto.title,
    description: productDto.shortDescription,
    sku: productDto.productCode,
    url: productUrl,
    ...(productDto.imageUrl ? { image: productDto.imageUrl } : {}),
    ...(productDto.startingPrice
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "NPR",
            price: productDto.startingPrice,
            url: productUrl,
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <ProductDetailPageClient targetProduct={productDto} />
    </>
  );
}
