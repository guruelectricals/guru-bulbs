import { sanityFetch } from "@/lib/fetch";
import { categoriesQuery } from "@/lib/queries";

import type { Category } from "@/types/category";


export async function getCategories(): Promise<Category[]> {

  return await sanityFetch<Category[]>(
    categoriesQuery
  );

}