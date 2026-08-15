import type { TranslationKey } from "./i18n";

export type NavItem = {
  href: string;
  labelKey: TranslationKey;
  defaultLabel: string;
  hasDropdown?: boolean;
};

export const NAV_LINKS: readonly NavItem[] = [
  { href: "/", labelKey: "home", defaultLabel: "Home" },
  { href: "/products", labelKey: "products", defaultLabel: "Products", hasDropdown: true },
  { href: "/dealership", labelKey: "dealership", defaultLabel: "Dealership" },
  { href: "/services", labelKey: "services", defaultLabel: "Services" },
  { href: "/resources", labelKey: "resources", defaultLabel: "Resources", hasDropdown: true },
  { href: "/about", labelKey: "about", defaultLabel: "About" },
  { href: "/contact", labelKey: "contact", defaultLabel: "Contact" },
] as const;

export const RESOURCES_MENU: readonly NavItem[] = [
  { href: "/blog", labelKey: "blog", defaultLabel: "Blog" },
  { href: "/videos", labelKey: "videos", defaultLabel: "Videos" },
] as const;

export const SERVICES_MENU: readonly NavItem[] = [
  { href: "/electrical-design", labelKey: "electricalDesign", defaultLabel: "Electrical Design" },
  { href: "/lighting-design", labelKey: "lightingDesign", defaultLabel: "Lighting Design" },
  { href: "/3d-design", labelKey: "threeDDesign", defaultLabel: "3D Design" },
] as const;

export const LANGUAGE_OPTIONS = [
  { value: "en", label: "English", shortLabel: "EN" },
  { value: "ne", label: "नेपाली", shortLabel: "ने" },
] as const;

export const API_SUCCESS_MESSAGES = {
  SETTINGS_FETCHED: "Settings fetched successfully",
  CATEGORIES_FETCHED: "Categories fetched successfully",
  PRODUCTS_FETCHED: "Products fetched successfully",
  PRODUCT_FETCHED: "Product fetched successfully",
  SEARCH_COMPLETED: "Search completed successfully",
} as const;

export const API_ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal server error",
  SETTINGS_FETCH_FAILED: "Failed to fetch settings",
  CATEGORIES_FETCH_FAILED: "Failed to fetch categories",
  PRODUCTS_FETCH_FAILED: "Failed to fetch products",
  PRODUCT_NOT_FOUND: "Product not found",
  INVALID_REQUEST: "Invalid request",
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100,
} as const;

export const API_VERSION = "v1";

export type FAQItem = {
  qKey: TranslationKey;
  aKey: TranslationKey;
  defaultQ: string;
  defaultA: string;
};

export const CONTACT_FAQS: readonly FAQItem[] = [
  {
    qKey: "faq1Q",
    aKey: "faq1A",
    defaultQ: "What is the lifespan of your LED bulbs?",
    defaultA: "Our LED bulbs typically last 25,000 to 50,000 hours, depending on use and installation conditions.",
  },
  {
    qKey: "faq2Q",
    aKey: "faq2A",
    defaultQ: "Are your smart bulbs compatible with Alexa and Google Home?",
    defaultA: "Yes. Our smart bulbs work with Amazon Alexa and Google Home after they are connected to your Wi-Fi network.",
  },
  {
    qKey: "faq3Q",
    aKey: "faq3A",
    defaultQ: "Do you offer bulk wholesale discounts?",
    defaultA: "Yes! We offer tiered wholesale pricing for electrical contractors, trade dealers, and commercial projects.",
  },
  {
    qKey: "faq4Q",
    aKey: "faq4A",
    defaultQ: "What warranty do you provide?",
    defaultA: "All our products include a 2-year direct replacement warranty covering manufacturing defects and performance issues.",
  },
  {
    qKey: "faq5Q",
    aKey: "faq5A",
    defaultQ: "How do I choose the right color temperature?",
    defaultA: "Warm white (2700K-3000K) creates cozy residential ambiance, while cool white/daylight (5000K-6500K) is ideal for task lighting and offices.",
  },
] as const;

export type BenefitItem = {
  iconName: "Zap" | "TimerReset" | "ShieldCheck";
  titleKey: TranslationKey;
  metricKey: TranslationKey;
  descKey: TranslationKey;
};

export const HOME_BENEFITS: readonly BenefitItem[] = [
  {
    iconName: "Zap",
    titleKey: "energyEfficiencyTitle",
    metricKey: "energyEfficiencyMetric",
    descKey: "energyEfficiencyDesc",
  },
  {
    iconName: "TimerReset",
    titleKey: "builtToEndureTitle",
    metricKey: "builtToEndureMetric",
    descKey: "builtToEndureDesc",
  },
  {
    iconName: "ShieldCheck",
    titleKey: "guaranteedSupportTitle",
    metricKey: "guaranteedSupportMetric",
    descKey: "guaranteedSupportDesc",
  },
] as const;

export type PromiseItem = {
  iconName: "Zap" | "ShieldCheck" | "Gem" | "Lightbulb" | "Award" | "Truck" | "Headphones";
  titleKey: TranslationKey;
  descKey: TranslationKey;
};

export const PRODUCT_PROMISES: readonly PromiseItem[] = [
  {
    iconName: "Zap",
    titleKey: "energySavingTitle",
    descKey: "energySavingDesc",
  },
  {
    iconName: "ShieldCheck",
    titleKey: "longLifeTitle",
    descKey: "longLifeDesc",
  },
  {
    iconName: "Gem",
    titleKey: "premiumQualityTitle",
    descKey: "premiumQualityDesc",
  },
  {
    iconName: "Lightbulb",
    titleKey: "wideRangeTitle",
    descKey: "wideRangeDesc",
  },
  {
    iconName: "Award",
    titleKey: "madeInNepalTitle",
    descKey: "madeInNepalDesc",
  },
] as const;

export const SERVICE_PROMISES: readonly PromiseItem[] = [
  {
    iconName: "Truck",
    titleKey: "fastDeliveryTitle",
    descKey: "fastDeliveryDesc",
  },
  {
    iconName: "ShieldCheck",
    titleKey: "warrantyTitle",
    descKey: "warrantyDesc",
  },
  {
    iconName: "Headphones",
    titleKey: "supportTitle",
    descKey: "supportDesc",
  },
] as const;