import * as React from "react";
import type { Metadata } from "next";
import { type PriceListProduct } from "@/components/price-list-table";
import { sanityFetch } from "@/lib/fetch";
import { groq } from "next-sanity";
import { constructMetadata } from "@/lib/seo";
import { PriceListPageClient } from "@/components/pages/price-list-page";

export const revalidate = 60;

export const metadata: Metadata = constructMetadata({
  title: "Official 2026 Wholesale & Dealer Rate Card",
  description:
    "Explore transparent retail, authorized dealer, and bulk volume rates for certified Guru Bulbs LED lighting products across Nepal.",
  canonical: "https://guruelectricals.com.np/price-list",
});

// Dedicated price-list query – fetches all variant columns from Sanity
const priceListQuery = groq`
  *[_type == "product"] | order(category->displayOrder asc, displayOrder asc) {
    _id,
    title,
    productCode,
    slug,
    warranty,
    category->{
      _id,
      title,
      slug,
      code,
      displayOrder
    },
    variants[] | order(displayOrder asc) {
      _key,
      name,
      wattage,
      modelNumber,
      holder,
      k6500,
      k4000,
      k3000,
      qtyPerCtn,
      price,
      displayOrder
    }
  }
`;

export default async function PriceListPage() {
  const rawProducts = await sanityFetch<any[]>(priceListQuery).catch(() => []);

  const products: PriceListProduct[] = rawProducts.map((p) => ({
    _id: p._id,
    slug: p.slug?.current ?? p.slug ?? "#",
    title: p.title ?? "Guru Bulbs LED Product",
    productCode: p.productCode ?? "",
    categoryTitle: p.category?.title ?? "LED Lighting",
    categorySlug: p.category?.slug?.current ?? "led-lighting",
    categoryCode: p.category?.code ?? "",
    categoryDisplayOrder: p.category?.displayOrder ?? 99,
    warranty: p.warranty ?? "",
    variants: Array.isArray(p.variants)
      ? p.variants.map((v: any) => ({
          key: v._key ?? "",
          name: v.name ?? "",
          wattage: v.wattage ?? "",
          modelNumber: v.modelNumber ?? "",
          holder: v.holder ?? "",
          k6500: v.k6500 ?? "",
          k4000: v.k4000 ?? "",
          k3000: v.k3000 ?? "",
          qtyPerCtn: v.qtyPerCtn ?? "",
          price: v.price ?? null,
        }))
      : [],
  }));

  return <PriceListPageClient products={products} />;
}
