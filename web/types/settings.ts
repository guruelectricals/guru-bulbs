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
  addressNe?: string;
  contactInfoBadge?: string;
  contactInfoBadgeNe?: string;
  contactInfoTitle?: string;
  contactInfoTitleNe?: string;
  emailLabel?: string;
  emailLabelNe?: string;
  emailSubtext?: string;
  emailSubtextNe?: string;
  phoneLabel?: string;
  phoneLabelNe?: string;
  phoneSubtext?: string;
  phoneSubtextNe?: string;
  locationLabel?: string;
  locationLabelNe?: string;
  storeOpenLabel?: string;
  storeOpenLabelNe?: string;
  googleMapsUrl?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;

  businessHours?: string;
  businessHoursNe?: string;
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