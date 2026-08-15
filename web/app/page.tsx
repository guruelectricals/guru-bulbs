import { getCategories, getFeaturedProducts, testimonialsQuery, type SanityTestimonial } from "@/lib/queries";
import { getSettings } from "@/services/settings.service";
import { sanityFetch } from "@/lib/fetch";
import { HomePage } from "@/components/pages/home-page";

export const revalidate = 60;

export default async function Home() {
  const [categories, featuredProducts, testimonials, settings] = await Promise.all([
    getCategories().catch(() => []),
    getFeaturedProducts().catch(() => []),
    sanityFetch<SanityTestimonial[]>(testimonialsQuery).catch(() => []),
    getSettings().catch(() => null),
  ]);

  const categoriesByCode = [...categories].sort((first, second) => {
    if (!first.code && !second.code) return 0;
    if (!first.code) return 1;
    if (!second.code) return -1;

    return first.code.localeCompare(second.code, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });

  return (
    <HomePage
      categoriesByCode={categoriesByCode}
      featuredProducts={featuredProducts}
      testimonials={testimonials}
      heroSettings={settings}
    />
  );
}
