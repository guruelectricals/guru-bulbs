import type { Metadata } from "next";
import { sanityFetch } from "@/lib/fetch";
import { getCategories, productsQuery, extractStartingPrice } from "@/lib/queries";
import { urlFor } from "@/lib/image";
import { constructMetadata } from "@/lib/seo";
import { ProductsPageClient } from "@/components/pages/products-page";

export const revalidate = 60;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const categorySlug =
    typeof resolvedParams.type === "string" ? resolvedParams.type : undefined;

  let categoryTitle: string | undefined;
  let categoryDesc: string | undefined;

  if (categorySlug && categorySlug !== "all") {
    const categories = await getCategories().catch(() => []);
    const matched = categories.find((c) => c.slug?.current === categorySlug);
    if (matched) {
      categoryTitle = matched.title;
      categoryDesc = matched.shortDescription || undefined;
    }
  }

  return constructMetadata({
    title: categoryTitle
      ? `${categoryTitle} Catalogue`
      : "Certified LED Lighting Catalogue",
    description:
      categoryDesc ||
      "Discover our complete range of high-efficiency, certified LED lighting solutions engineered for longevity and warmth.",
    canonical: `https://gurubulbs.com/products${categorySlug ? `?type=${categorySlug}` : ""}`,
  });
}

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

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{
    type?: string | string[];
    q?: string | string[];
    wattage?: string | string[];
    status?: string | string[];
    sort?: string | string[];
    stock?: string | string[];
  }>;
}) {
  const resolvedParams = await searchParams;
  const selectedType =
    typeof resolvedParams.type === "string" && resolvedParams.type !== "all"
      ? resolvedParams.type
      : undefined;

  const qQuery =
    typeof resolvedParams.q === "string"
      ? resolvedParams.q.trim().toLowerCase()
      : "";
  const wattageFilter =
    typeof resolvedParams.wattage === "string" ? resolvedParams.wattage : "all";
  const statusFilter =
    typeof resolvedParams.status === "string" ? resolvedParams.status : "all";
  const sortFilter =
    typeof resolvedParams.sort === "string" ? resolvedParams.sort : "default";
  const stockOnly = resolvedParams.stock === "true";

  const [rawSanityProducts, sanityCategories] = await Promise.all([
    sanityFetch<any[]>(productsQuery).catch(() => []),
    getCategories().catch(() => []),
  ]);

  const selectedCategoryTitle = selectedType
    ? sanityCategories.find((c) => c.slug?.current === selectedType)?.title
    : undefined;

  const fetchedProducts: DisplayProduct[] = rawSanityProducts.map((p) => {
    const slugStr = p.slug?.current || p.slug || "";
    return {
      slug: slugStr,
      title: p.title || "LED Light",
      productCode: p.productCode || "GB-LED",
      categorySlug: p.category?.slug?.current || "",
      categoryTitle: p.category?.title || "LED Bulbs",
      price: extractStartingPrice(p) ?? p.startingPrice ?? p.price ?? 0,
      originalPrice: p.originalPrice,
      discountLabel: p.discountLabel,
      inStock: p.inStock ?? true,
      wattage: p.wattage || "",
      status: p.status || "standard",
      rating: 4.8,
      reviews: 120,
      imageUrl: p.mainImage
        ? (() => {
            try {
              return urlFor(p.mainImage as any).url();
            } catch {
              return undefined;
            }
          })()
        : undefined,
      imageFallback: "💡",
      shortDescription:
        p.shortDescription || "High performance LED lighting solution.",
      highlights: p.features || [
        "2-Year Warranty",
        "Energy Efficient",
        "High Lumen",
      ],
    };
  });

  const allProductsList = fetchedProducts;

  // APPLY MULTI-CRITERIA FILTERS
  let visibleProducts = allProductsList.filter((product) => {
    // Category filter: compare directly against Sanity's category slug
    if (selectedType && product.categorySlug !== selectedType) {
      return false;
    }
    if (qQuery) {
      const matchTitle = product.title.toLowerCase().includes(qQuery);
      const matchCode = product.productCode.toLowerCase().includes(qQuery);
      const matchDesc = product.shortDescription.toLowerCase().includes(qQuery);
      if (!matchTitle && !matchCode && !matchDesc) return false;
    }
    if (wattageFilter !== "all") {
      const wattNum = parseInt(product.wattage?.replace(/\D/g, "") || "0", 10);
      if (wattageFilter === "under-10w" && wattNum > 9) return false;
      if (wattageFilter === "10w-20w" && (wattNum < 10 || wattNum > 20))
        return false;
      if (wattageFilter === "over-20w" && wattNum < 21) return false;
    }
    if (statusFilter !== "all" && product.status !== statusFilter) {
      return false;
    }
    if (stockOnly && !product.inStock) {
      return false;
    }
    return true;
  });

  // APPLY SORTING
  if (sortFilter === "price-asc") {
    visibleProducts.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortFilter === "price-desc") {
    visibleProducts.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sortFilter === "rating") {
    visibleProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <ProductsPageClient
      visibleProducts={visibleProducts}
      allProductsCount={allProductsList.length}
      selectedCategoryTitle={selectedCategoryTitle}
      sanityCategories={sanityCategories.map((c) => ({
        slug: c.slug?.current || "",
        title: c.title,
      }))}
    />
  );
}
