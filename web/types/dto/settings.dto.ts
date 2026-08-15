
export interface SettingsDTO {
  companyName: string;
  tagline?: string;
  companyDescription?: string;
  websiteUrl?: string;
  logoUrl?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  googleMapsUrl?: string;
  businessHours?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  secondaryPhone?: string;
  footerDescription?: string;
  copyright?: string;
  cookieConsentTitle?: string;
  cookieConsentDescription?: string;
  essentialCookiesLabel?: string;
  acceptAllCookiesLabel?: string;
  privacyPolicyUrl?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
}