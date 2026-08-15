export interface Slug {
  current: string;
}

export interface ImageAsset {
  _ref: string;
}

export interface SanityImage {
  asset: ImageAsset;
}

export interface ImageWithAlt {
  image: SanityImage;
  alt?: string;
}


export interface Specification {
  key: string;
  value: string;
}

export interface ProductVariant {
  name?: string;
  modelNumber?: string;
  wattage: string;
  holder?: string;
  k6500?: string;
  k4000?: string;
  k3000?: string;
  qtyPerCtn?: string;
  displayOrder?: number;
}

export interface FAQ {
  question: string;
  answer: unknown;
}


export interface RelatedProduct {
  _id: string;
  title: string;
  slug: Slug;
  mainImage?: ImageWithAlt;
  shortDescription?: string;
  startingPrice?: number;
}

export interface SocialLink {
  platform: string;
  url: string;
}