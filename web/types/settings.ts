import type {
  SanityImage,
  SocialLink,
} from "./common";

export interface Settings {
  _id: string;
  companyName: string;
  tagline?: string;
  companyDescription?: string;
  websiteUrl?: string;
  logo?: SanityImage;
  favicon?: SanityImage;
  phone?: string;
  secondaryPhone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  googleMapsUrl?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;

  businessHours?: string;
  heroBadge?: string;
  heroBadgeNe?: string;
  heroTitlePrefix?: string;
  heroTitlePrefixNe?: string;
  heroTitleSuffix?: string;
  heroTitleSuffixNe?: string;
  heroDescription?: string;
  heroDescriptionNe?: string;
  heroImage?: SanityImage;
  heroProductImage?: SanityImage;
  footerDescription?: string;
  footerDescriptionNe?: string;
  aboutDescription?: string;
  copyright?: string;
  cookieConsentTitle?: string;
  cookieConsentDescription?: string;
  essentialCookiesLabel?: string;
  acceptAllCookiesLabel?: string;
  privacyPolicyUrl?: string;
  socialLinks?: SocialLink[];
}