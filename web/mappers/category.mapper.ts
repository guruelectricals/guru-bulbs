import { urlFor } from "@/lib/image";

import type { Category } from "@/types/category";
import type { CategoryDTO } from "@/types/dto/category.dto";

export function toCategoryDTO(category: Category): CategoryDTO {
  return {
    id: category._id,

    title: category.title,

    slug: category.slug.current,

    description: category.description,

    imageUrl: category.image
      ? urlFor(category.image as any).url()
      : undefined,

    displayOrder: category.displayOrder,
  };
}