import { groq } from "next-sanity";
import { sanityFetch } from "@/lib/fetch";

// =====================================================
// SETTINGS
// =====================================================

export const settingsQuery = groq`
  *[_type == "settings"][0]
`;

// =====================================================
// CATEGORIES
// =====================================================

export const categoriesQuery = groq`
  *[
    _type == "category" &&
    isActive == true
  ]
  | order(displayOrder asc) {
    _id,
    title,
    slug,
    code,
    shortDescription,
    image
  }
`;

// =====================================================
// PRODUCT CARD FIELDS
// =====================================================

const productCardFields = groq`
  _id,
  _updatedAt,
  title,
  productCode,
  slug,
  mainImage,
  shortDescription,
  status,
  featured,
  isActive,

  category->{
    title,
    slug
  },

  variants[]{
    k6500,
    k4000,
    k3000,
    wattage
  },

  "startingPrice": (variants[defined(price)] | order(price asc))[0].price,
  "wattage": variants[0].wattage
`;

// =====================================================
// FEATURED PRODUCTS
// =====================================================

export const featuredProductsQuery = groq`
  *[
    _type == "product" &&
    (
      featured == true ||
      status == "featured"
    )
  ]
  | order(displayOrder asc) {
    ${productCardFields}
  }
`;

// =====================================================
// ALL PRODUCTS
// =====================================================

export const productsQuery = groq`
  *[
    _type == "product"
  ]
  | order(displayOrder asc) {
    ${productCardFields}
  }
`;

// =====================================================
// PRODUCT BY SLUG
// =====================================================

export const productBySlugQuery = groq`
  *[
    _type == "product" &&
    slug.current == $slug
  ][0] {
    _id,
    title,
    productCode,
    slug,

    category->{
      _id,
      title,
      slug
    },

    featured,
    status,
    isActive,
    displayOrder,

    shortDescription,
    description,

    mainImage,
    gallery,

    variants[]{
      _key,
      name,
      modelNumber,
      wattage,
      holder,
      k6500,
      k4000,
      k3000,
      qtyPerCtn,
      displayOrder
    },

    applications,
    highlights,

    technicalSpecifications[]{
      _key,
      "key": label,
      value,
      unit
    },

    features,
    certifications,

    warranty,
    warrantyTerms,

    faqs[]{
      _key,
      question,
      answer
    },

    relatedProducts[]->{
      _id,
      title,
      slug,
      mainImage,
      shortDescription,
      variants[]{
        k6500,
        k4000,
        k3000
      }
    },

    seo
  }
`;

// =====================================================
// PRODUCTS BY CATEGORY
// =====================================================

export const productsByCategoryQuery = groq`
  *[
    _type == "product" &&
    category->slug.current == $categorySlug
  ]
  | order(displayOrder asc) {
    ${productCardFields}
  }
`;

// =====================================================
// SEARCH PRODUCTS
// =====================================================

export const searchProductsQuery = groq`
  *[
    _type == "product" &&
    title match $searchTerm
  ] {
    ${productCardFields}
  }
`;

// =====================================================
// PAGINATED PRODUCTS
// =====================================================

export const paginatedProductsQuery = groq`
  *[
    _type == "product"
  ]
  | order(displayOrder asc)
  [$start...$end] {
    ${productCardFields}
  }
`;

// =====================================================
// PRIVACY POLICY
// =====================================================

export const privacyPolicyQuery = groq`
  *[_type == "privacyPolicy"][0] {
    _id,
    title,
    slug,
    lastUpdated,
    introText,
    content
  }
`;

// =====================================================
// POSTS
// =====================================================

export const postsQuery = groq`
  *[_type == "post"]
  | order(publishedAt desc) {
    _id,
    _updatedAt,
    title,
    slug,
    publishedAt,
    excerpt,
    readTime,
    featured,
    mainImage,
    categories,
    author->{
      name,
      role,
      image
    }
  }
`;

export const postBySlugQuery = groq`
  *[
    _type == "post" &&
    slug.current == $slug
  ][0] {
    _id,
    _updatedAt,
    title,
    slug,
    publishedAt,
    excerpt,
    readTime,
    featured,
    mainImage,
    categories,
    body,
    seo,
    author->{
      name,
      role,
      bio,
      image
    }
  }
`;

// =====================================================
// TESTIMONIALS
// =====================================================

export const testimonialsQuery = groq`
  *[
    _type == "testimonial" &&
    isActive == true
  ]
  | order(displayOrder asc) {
    _id,
    name,
    initials,
    role,
    roleNe,
    quote,
    quoteNe,
    rating,
    avatar
  }
`;

// =====================================================
// VIDEOS
// =====================================================

export const videosQuery = groq`
  *[
    _type == "video" &&
    published == true
  ]
  | order(displayOrder asc) {
    _id,
    title,
    slug,
    description,
    featured,
    videoSource,
    tiktokUrl,
    videoFile{
      asset->{
        _id,
        url
      }
    },

    thumbnail{
      asset->{
        _id,
        url
      },
      alt
    },

    category->{
      title,
      slug
    }
  }
`;

// =====================================================
// TYPES
// =====================================================

export type SanityTestimonial = {
  _id: string;
  name: string;
  initials?: string;
  role: string;
  roleNe?: string;
  quote: string;
  quoteNe?: string;
  rating?: number;
  avatar?: any;
};

export type SanityCategory = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  code: string | null;
  shortDescription: string | null;
  image: any;
};

export type SanityProduct = {
  _id: string;

  title: string;

  productCode?: string;

  slug: {
    current: string;
  };

  mainImage?: any;

  shortDescription?: string | null;

  status?: string;

  featured?: boolean;

  isActive?: boolean;

  displayOrder?: number;

  category?: {
    title: string;
    slug: {
      current: string;
    };
  };

  startingPrice?: number | null;

  wattage?: string | null;
};

// =====================================================
// DATA FETCHING
// =====================================================

export function extractStartingPrice(product: any): number | undefined {
  if (
    typeof product?.startingPrice === "number" &&
    !isNaN(product.startingPrice) &&
    product.startingPrice > 0
  ) {
    return product.startingPrice;
  }
  if (
    !product?.variants ||
    !Array.isArray(product.variants) ||
    product.variants.length === 0
  ) {
    return undefined;
  }
  const prices = product.variants
    .flatMap((v: any) => [v?.k6500, v?.k4000, v?.k3000])
    .map((priceVal: any) => {
      if (typeof priceVal === "number")
        return isNaN(priceVal) ? null : priceVal;
      if (typeof priceVal === "string") {
        const cleaned = priceVal.replace(/[^0-9.]/g, "");
        const num = parseFloat(cleaned);
        return isNaN(num) ? null : num;
      }
      return null;
    })
    .filter((priceVal: any): priceVal is number => priceVal !== null);

  return prices.length > 0 ? Math.min(...prices) : undefined;
}

export async function getCategories() {
  return sanityFetch<SanityCategory[]>(categoriesQuery);
}

export async function getFeaturedProducts() {
  const products = await sanityFetch<SanityProduct[]>(featuredProductsQuery);
  return products.map((p) => {
    const computedPrice = extractStartingPrice(p);
    return {
      ...p,
      startingPrice: computedPrice ?? p.startingPrice,
      price: computedPrice ?? p.startingPrice,
    };
  });
}

export async function getProducts() {
  const products = await sanityFetch<SanityProduct[]>(productsQuery);
  return products.map((p) => {
    const computedPrice = extractStartingPrice(p);
    return {
      ...p,
      startingPrice: computedPrice ?? p.startingPrice,
      price: computedPrice ?? p.startingPrice,
    };
  });
}
