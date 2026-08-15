import type {
  Slug,
  SanityImage,
} from "./common";

export interface Category {
  _id: string;

  title: string;

  slug: Slug;

  description?: string;

  image?: SanityImage;

  isActive?: boolean;

  displayOrder?: number;
}

