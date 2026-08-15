import type {
  Slug,
  ImageWithAlt,
  Specification,
  ProductVariant,
  FAQ,
  RelatedProduct,
} from "./common";

export interface Product {
  _id: string;

  title: string;

  productCode?: string;

  slug: Slug;

  category?: {
    title: string;
    slug: Slug;
  };

  shortDescription?: string;

  description?: unknown;

  mainImage?: ImageWithAlt;

  gallery?: ImageWithAlt[];

  startingPrice?: number;

  variants?: ProductVariant[];

  applications?: string[];

  highlights?: string[];
  technicalSpecifications?: Specification[];

  features?: string[];
  certifications?: string[];

  warranty?: string;

  warrantyTerms?: string;

  usageInstructions?: unknown;

  faqs?: FAQ[];

  relatedProducts?: RelatedProduct[];
}
