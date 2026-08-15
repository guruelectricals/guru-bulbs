import { sanityFetch } from "@/lib/fetch";

import {
  productsQuery,
  featuredProductsQuery,
  productBySlugQuery,
  productsByCategoryQuery,
  searchProductsQuery,
} from "@/lib/queries";

import { toProductDTO } from "@/mappers/product.mapper";

import type { Product } from "@/types/product";
import type { ProductDTO } from "@/types/dto/product.dto";


export async function getProducts(): Promise<ProductDTO[]> {
  const products = await sanityFetch<Product[]>(productsQuery);

  return products.map(toProductDTO);
}


export async function getFeaturedProducts(): Promise<ProductDTO[]> {
  const products = await sanityFetch<Product[]>(featuredProductsQuery);

  return products.map(toProductDTO);
}

/**
 * Get product by slug
 */
export async function getProductBySlug(
  slug: string
): Promise<ProductDTO | null> {
  const product = await sanityFetch<Product | null>(
    productBySlugQuery,
    { slug }
  );

  if (!product) {
    return null;
  }

  return toProductDTO(product);
}


export async function getProductsByCategory(
  categorySlug: string
): Promise<ProductDTO[]> {
  const products = await sanityFetch<Product[]>(
    productsByCategoryQuery,
    { categorySlug }
  );

  return products.map(toProductDTO);
}


export async function searchProducts(
  searchTerm: string
): Promise<ProductDTO[]> {
  const products = await sanityFetch<Product[]>(
    searchProductsQuery,
    {
      searchTerm: `*${searchTerm}*`,
    }
  );

  return products.map(toProductDTO);
}