import { urlFor } from "@/lib/image";

import type { Settings } from "@/types/settings";
import type { SettingsDTO } from "@/types/dto/settings.dto";

export function toSettingsDTO(settings: Settings): SettingsDTO {
  return {
    companyName: settings.companyName,
    tagline: settings.tagline,
    companyDescription: settings.companyDescription,
    websiteUrl: settings.websiteUrl,
    logoUrl: settings.logo ? urlFor(settings.logo as any).url() : undefined,
    email: settings.email,
    phone: settings.phone,
    whatsapp: settings.whatsapp,
    address: settings.address,
    googleMapsUrl: settings.googleMapsUrl,
    businessHours: settings.businessHours,
    facebook: settings.facebook,
    instagram: settings.instagram,
    tiktok: settings.tiktok,
    secondaryPhone: settings.secondaryPhone,
    footerDescription: settings.footerDescription,
    copyright: settings.copyright,
    cookieConsentTitle: settings.cookieConsentTitle,
    cookieConsentDescription: settings.cookieConsentDescription,
    essentialCookiesLabel: settings.essentialCookiesLabel,
    acceptAllCookiesLabel: settings.acceptAllCookiesLabel,
    privacyPolicyUrl: settings.privacyPolicyUrl,
    socialLinks: settings.socialLinks,
  };
}