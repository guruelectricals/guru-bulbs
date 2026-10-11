
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
  businessHours?: string;
  businessHoursNe?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  secondaryPhone?: string;
  footerDescription?: string;
  footerDescriptionNe?: string;
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