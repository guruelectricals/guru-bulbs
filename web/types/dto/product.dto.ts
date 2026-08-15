export interface ProductVariantDTO {
  name?: string;
  modelNumber?: string;
  wattage: string;
  holder?: string;
  colorTemperature?: string;
  price?: number;
  k6500?: string;
  k4000?: string;
  k3000?: string;
  qtyPerCtn?: string;
  displayOrder?: number;
}

export interface ProductImageDTO {
  imageUrl?: string;
  imageAlt?: string;
}

export interface ProductSpecificationDTO {
  key: string;
  value: string;
}

export interface ProductFAQDTO {
  question: string;
  answer: unknown;
}

export interface RelatedProductDTO {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  imageAlt?: string;
  shortDescription?: string;
  startingPrice?: number;
}

export interface ProductDTO {
  // ==========================================
  // GENERAL
  // ==========================================

  id: string;

  title: string;

  productCode: string;

  slug: string;

  shortDescription?: string;

  description?: unknown;

  category?: {
    title: string;
    slug: string;
  };

  // ==========================================
  // IMAGES
  // ==========================================

  imageUrl?: string;

  imageAlt?: string;

  gallery?: ProductImageDTO[];

  // ==========================================
  // PRICE & VARIANTS
  // ==========================================

  startingPrice?: number;

  variants?: ProductVariantDTO[];

  // ==========================================
  // PRODUCT INFORMATION
  // ==========================================

  highlights?: string[];

  features?: string[];

  // ==========================================
  // TECHNICAL SPECIFICATIONS
  // ==========================================

  technicalSpecifications?: ProductSpecificationDTO[];

  // ==========================================
  // CERTIFICATIONS
  // ==========================================

  certifications?: string[];

  // ==========================================
  // WARRANTY
  // ==========================================

  warranty?: string;

  warrantyTerms?: string;

  // ==========================================
  // FAQ
  // ==========================================

  faqs?: ProductFAQDTO[];

  // ==========================================
  // RELATED PRODUCTS
  // ==========================================

  relatedProducts?: RelatedProductDTO[];
}
