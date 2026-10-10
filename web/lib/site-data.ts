import { getCategories } from "@/lib/queries";
import { urlFor } from "@/lib/image";
import { getSettings } from "@/services/settings.service";
import type { SiteBranding } from "@/types/site-branding";

export type NavCategoryItem = {
  href: string;
  label: string;
  code?: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type InitialSiteData = {
  branding: SiteBranding;
  categoryItems: NavCategoryItem[];
};

export async function getInitialSiteData(): Promise<InitialSiteData> {
  const categoryItemsPromise = getCategories()
    .then((categories) =>
      categories.map((category) => ({
        href: `/products?type=${category.slug.current}`,
        label: category.title,
        code: category.code || undefined,
        description: category.shortDescription || "Explore lighting options.",
        imageUrl: category.image
          ? urlFor(category.image as any).url()
          : undefined,
        imageAlt: category.image?.alt,
      }))
    )
    .catch(() => []);

  const brandingPromise = getSettings()
    .then((settings) => {
      return {
        companyName: settings?.companyName || "Guru Bulbs",
        logoUrl: settings?.logo
          ? urlFor(settings?.logo as any).url()
          : undefined,
        logoAlt: (settings?.logo as { alt?: string } | undefined)?.alt,
        phone: settings?.phone,
        email: settings?.email,
        address: settings?.address,
        facebook: settings?.facebook,
        instagram: settings?.instagram,
        tiktok: settings?.tiktok,
        whatsapp: settings?.whatsapp,
        copyright: settings?.copyright,
        footerDescription: settings?.footerDescription,
        footerDescriptionNe: settings?.footerDescriptionNe,
        cookieConsentTitle: settings?.cookieConsentTitle,
        cookieConsentDescription: settings?.cookieConsentDescription,
        essentialCookiesLabel: settings?.essentialCookiesLabel,
        acceptAllCookiesLabel: settings?.acceptAllCookiesLabel,
        privacyPolicyUrl: settings?.privacyPolicyUrl,
      };
    })
    .catch(() => ({ companyName: "Guru Bulbs" }));

  const [categoryItems, branding] = await Promise.all([
    categoryItemsPromise,
    brandingPromise,
  ]);

  return {
    categoryItems,
    branding,
  };
}
