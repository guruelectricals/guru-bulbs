"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Lightbulb,
  Phone,
  ChevronDown,
  Tag,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SiteBranding } from "@/types/site-branding";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useSite } from "@/providers/site-provider";
import { useLanguage } from "@/providers/language-provider";
import type { TranslationKey } from "@/lib/i18n";
import { NAV_LINKS, RESOURCES_MENU, SERVICES_MENU, LANGUAGE_OPTIONS } from "@/lib/constants";

type NavigationCategory = {
  href: string;
  label: string;
  code?: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
};

export function Navbar({
  categoryItems,
  branding,
}: {
  categoryItems?: NavigationCategory[];
  branding?: SiteBranding;
} = {}) {
  const site = useSite();
  const { language, setLanguage, t } = useLanguage();
  const activeBranding = branding || site.branding;
  const activeCategoryItems =
    categoryItems && categoryItems.length > 0
      ? categoryItems
      : site.categoryItems;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 8);

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  useEffect(() => setIsMounted(true), []);

  const getLocalizedHref = (href: string) => {
    if (language === "ne") {
      if (href.startsWith("/ne")) return href;
      const cleanHref = href.startsWith("/") ? href : `/${href}`;
      return `/ne${cleanHref === "/" ? "" : cleanHref}`;
    }
    return href.replace(/^\/ne/, "") || "/";
  };

  const categories = activeCategoryItems;
  const categoryColumns = [categories.slice(0, 4), categories.slice(4)];
  const brandingToUse = activeBranding;
  const phone = brandingToUse.phone || "+977 9812345678";

  return (
    <nav className="site-navbar fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-8 lg:px-6 xl:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div
          className={cn(
            "navbar-shell flex h-16 items-center justify-between rounded-2xl border px-4 shadow-lg backdrop-blur-xl transition-all duration-300 sm:px-5",
            isScrolled || isMobileMenuOpen
              ? "bg-neutral-950/95 border-amber-500/25 shadow-black/40"
              : "bg-neutral-950/80 border-amber-500/15 shadow-black/20",
          )}
        >
          <Link
            href={getLocalizedHref("/")}
            className="group flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-transform hover:scale-[1.02]"
          >
            {brandingToUse.logoUrl ? (
              <Image
                src={brandingToUse.logoUrl}
                alt={brandingToUse.logoAlt || brandingToUse.companyName}
                width={100}
                height={40}
                priority
                className="size-10 object-contain drop-shadow-[0_0_14px_rgba(240,188,25,0.35)] transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <>
                <Lightbulb className="size-7 shrink-0 text-amber-500 transition-colors group-hover:text-amber-400" strokeWidth={2.5} />
                <span className="max-w-32 truncate tracking-tight text-white font-display font-black sm:max-w-none text-2xl sm:text-[26px] transition-colors group-hover:text-white/90">
                  <span className="text-amber-500">{brandingToUse.companyName.charAt(0)}</span>
                  {brandingToUse.companyName.slice(1)}
                </span>
              </>
            )}
          </Link>

          {/* FLOATING PILL NAV CONTAINER */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              if (link.labelKey === "products") {
                return (
                  <div
                    key={link.labelKey}
                    className="relative group py-2"
                    onMouseEnter={() => setIsProductsOpen(true)}
                    onMouseLeave={() => setIsProductsOpen(false)}
                  >
                    <button
                      onClick={() => setIsProductsOpen(!isProductsOpen)}
                      className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase text-neutral-300 transition-all duration-200 hover:text-amber-400 hover:bg-amber-500/10"
                    >
                      {t("products")}
                      <ChevronDown
                        className={`h-3.5 w-3.5 text-amber-400 transition-transform duration-200 ${
                          isProductsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={cn(
                        "absolute left-1/2 -translate-x-1/2 top-full pt-1.5 w-[540px] z-50 transition-all duration-200",
                        isProductsOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2 pointer-events-none",
                      )}
                    >
                      <div className="overflow-hidden rounded-3xl border border-amber-500/25 bg-neutral-950/95 p-4 shadow-2xl shadow-black/90 backdrop-blur-2xl">
                        <div className="px-3 pb-3 border-b border-amber-500/15 mb-3 flex items-center justify-between">
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400">
                            {t("lightCollections")}
                          </span>
                          <Link
                            href={getLocalizedHref("/products")}
                            onClick={() => setIsProductsOpen(false)}
                            className="text-xs font-bold text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1"
                          >
                            {t("browseAll")}{" "}
                            <ChevronDown className="size-3 -rotate-90" />
                          </Link>
                        </div>
                        {categories.length > 0 ? (
                          <div className="grid grid-cols-2 gap-2">
                            {categoryColumns.map((column, columnIndex) => (
                              <div key={columnIndex} className="space-y-1">
                                {column.map((category) => (
                                  <Link
                                    key={category.href}
                                    href={getLocalizedHref(category.href)}
                                    onClick={() => setIsProductsOpen(false)}
                                    className="group/item flex items-center gap-3 rounded-2xl p-2.5 transition-all duration-150 hover:bg-amber-500/10 hover:border-amber-500/30 border border-transparent"
                                  >
                                    <span className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                                      {category.imageUrl ? (
                                        <Image
                                          src={category.imageUrl}
                                          alt={category.label}
                                          fill
                                          sizes="36px"
                                          className="object-cover transition-transform duration-300 group-hover/item:scale-110"
                                        />
                                      ) : (
                                        <Tag className="size-4" />
                                      )}
                                    </span>
                                    <span className="min-w-0 flex-1">
                                      <span className="block text-xs font-bold text-neutral-100 transition-colors group-hover/item:text-amber-400 truncate">
                                        {t(category.label as TranslationKey) || category.label}
                                      </span>
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-3">
                            {[1, 2].map((col) => (
                              <div key={col} className="space-y-2">
                                {[1, 2, 3].map((i) => (
                                  <div
                                    key={i}
                                    className="flex items-center gap-3 rounded-2xl p-2.5 bg-neutral-900/50 animate-pulse"
                                  >
                                    <div className="size-9 rounded-xl bg-neutral-800 shrink-0" />
                                    <div className="h-3 w-28 rounded bg-neutral-800" />
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="mt-3 pt-3 border-t border-amber-500/15 flex items-center justify-between px-2 text-xs">
                          <Link
                            href={getLocalizedHref("/price-list")}
                            onClick={() => setIsProductsOpen(false)}
                            className="font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5"
                          >
                            <Tag className="size-3.5" /> {t("viewOfficialPriceList")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              if (link.labelKey === "resources") {
                return (
                  <div
                    key={link.labelKey}
                    className="relative group py-2"
                    onMouseEnter={() => setIsResourcesOpen(true)}
                    onMouseLeave={() => setIsResourcesOpen(false)}
                  >
                    <button
                      onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                      className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase text-neutral-300 transition-all duration-200 hover:text-amber-400 hover:bg-amber-500/10"
                    >
                      {t("resources")}
                      <ChevronDown
                        className={`h-3.5 w-3.5 text-amber-400 transition-transform duration-200 ${
                          isResourcesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={cn(
                        "absolute left-0 top-full pt-1.5 w-48 z-50 transition-all duration-200",
                        isResourcesOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2 pointer-events-none",
                      )}
                    >
                      <div className="overflow-hidden rounded-2xl border border-amber-500/25 bg-neutral-950/95 p-1.5 shadow-2xl backdrop-blur-2xl space-y-1">
                        {RESOURCES_MENU.map((item) => (
                          <Link
                            key={item.href}
                            href={getLocalizedHref(item.href)}
                            onClick={() => setIsResourcesOpen(false)}
                            className="block px-3.5 py-2 text-xs font-semibold text-neutral-300 transition-all duration-150 hover:bg-amber-500/10 hover:text-amber-400 rounded-xl"
                          >
                            {t(item.labelKey)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={link.labelKey}
                  href={getLocalizedHref(link.href)}
                  className="rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase text-neutral-300 transition-all duration-200 hover:text-amber-400 hover:bg-amber-500/10"
                >
                  {t(link.labelKey)}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div
              className="relative py-2"
              onMouseEnter={() => setIsLanguageOpen(true)}
              onMouseLeave={() => setIsLanguageOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex h-9 items-center gap-1.5 rounded-full border border-amber-500/20 bg-neutral-900/60 px-3 text-xs font-semibold text-neutral-200 shadow-md transition-all duration-200 hover:border-amber-400/60 hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-expanded={isLanguageOpen}
                aria-haspopup="menu"
              >
                <span className="sm:hidden">
                  {language === "en" ? "EN" : "ने"}
                </span>
                <span className="hidden sm:inline">
                  {language === "en" ? "English" : "नेपाली"}
                </span>
                <ChevronDown
                  className={cn(
                    "size-3.5 text-amber-400 transition-transform duration-200",
                    isLanguageOpen && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </button>
              <div
                className={cn(
                  "absolute right-0 top-full z-50 w-32 pt-1.5 transition-all duration-200",
                  isLanguageOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0 pointer-events-none",
                )}
                role="menu"
              >
                <div className="space-y-1 overflow-hidden rounded-2xl border border-amber-500/25 bg-neutral-950/95 p-1.5 shadow-2xl backdrop-blur-2xl">
                  {LANGUAGE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setLanguage(option.value as "en" | "ne");
                        setIsLanguageOpen(false);
                      }}
                      className={cn(
                        "block w-full rounded-xl px-3.5 py-2 text-left text-xs font-semibold transition-all duration-150 hover:bg-amber-500/10 hover:text-amber-400",
                        language === option.value
                          ? "bg-amber-500/10 text-amber-400"
                          : "text-neutral-300",
                      )}
                      role="menuitem"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="inline-flex size-9 items-center justify-center rounded-full border border-amber-500/20 bg-neutral-900/60 text-amber-400 shadow-md transition-all duration-200 hover:border-amber-400/60 hover:bg-neutral-900/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label={
                isMounted && resolvedTheme === "dark"
                  ? t("switchLight")
                  : t("switchDark")
              }
              title={
                isMounted && resolvedTheme === "dark"
                  ? t("switchLight")
                  : t("switchDark")
              }
            >
              {isMounted && resolvedTheme === "light" ? (
                <Moon className="size-4" aria-hidden="true" />
              ) : (
                <Sun className="size-4" aria-hidden="true" />
              )}
            </button>

            <Link
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="hidden xl:inline-flex items-center gap-2 rounded-full bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-neutral-950 shadow-md shadow-amber-500/20"
            >
              <div className="flex size-5 items-center justify-center rounded-full text-neutral-950">
                <Phone className="size-3" />
              </div>
              <span>{phone}</span>
            </Link>

            {/* mobile view  */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "xl:hidden h-9 w-9",
                )}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex h-dvh w-72 flex-col overflow-y-auto bg-gray-50 sm:w-80"
              >
                <div className="mt-8 flex min-h-0 flex-1 flex-col gap-2 pb-6">
                  {NAV_LINKS.map((link) => {
                    if (link.labelKey === "products") {
                      return (
                        <div key={link.labelKey}>
                          <button
                            onClick={() =>
                              setIsMobileProductsOpen(!isMobileProductsOpen)
                            }
                            className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-[15px] font-medium text-white/85 transition-colors duration-200 hover:bg-amber-50 hover:text-amber-500"
                          >
                            {t("products")}
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-300 ${
                                isMobileProductsOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {isMobileProductsOpen && (
                            <div className="pl-4 mt-2 space-y-1">
                              {categories.map((category) => (
                                <SheetClose
                                  key={category.href}
                                  nativeButton={false}
                                  render={
                                    <Link
                                      href={getLocalizedHref(category.href)}
                                      className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-white/70 transition-colors hover:bg-amber-50 hover:text-amber-500"
                                    />
                                  }
                                >
                                  <span className="relative flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md border border-amber-500/30 bg-amber-500/10 text-amber-500">
                                    {category.imageUrl ? (
                                      <Image
                                        src={category.imageUrl}
                                        alt=""
                                        fill
                                        sizes="28px"
                                        className="object-cover"
                                      />
                                    ) : (
                                      <Tag className="size-3.5" />
                                    )}
                                  </span>
                                  {t(category.label as TranslationKey) || category.label}
                                </SheetClose>
                              ))}
                              <SheetClose
                                nativeButton={false}
                                render={
                                  <Link
                                    href={getLocalizedHref("/products")}
                                    className="block px-4 py-2 text-sm font-medium text-amber-600 hover:text-amber-700 rounded-lg transition-colors duration-200"
                                  />
                                }
                              >
                                {t("browseAllProducts")}
                              </SheetClose>
                              <SheetClose
                                nativeButton={false}
                                render={
                                  <Link
                                    href={getLocalizedHref("/price-list")}
                                    className="mt-2 mr-4 ml-4 flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-amber-600"
                                  />
                                }
                              >
                                <Tag className="size-3.5 text-amber-300" />
                                {t("viewPriceList")}
                              </SheetClose>
                            </div>
                          )}
                        </div>
                      );
                    }

                    if (link.labelKey === "resources") {
                      return (
                        <div key={link.labelKey}>
                          <button
                            onClick={() =>
                              setIsMobileResourcesOpen(!isMobileResourcesOpen)
                            }
                            className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-[15px] font-medium text-white/85 transition-colors duration-200 hover:bg-amber-50 hover:text-amber-500"
                          >
                            {t("resources")}
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-300 ${
                                isMobileResourcesOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {isMobileResourcesOpen && (
                            <div className="pl-4 mt-2 space-y-1">
                              {RESOURCES_MENU.map((item) => (
                                <SheetClose
                                  key={item.href}
                                  nativeButton={false}
                                  render={
                                    <Link
                                      href={getLocalizedHref(item.href)}
                                      className="block px-4 py-2 text-sm text-white/70 hover:bg-amber-50 hover:text-amber-500 rounded-lg transition-colors duration-200"
                                    />
                                  }
                                >
                                  {t(item.labelKey)}
                                </SheetClose>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }
                    return (
                      <SheetClose
                        key={link.labelKey}
                        nativeButton={false}
                        render={
                          <Link
                            href={getLocalizedHref(link.href)}
                            className="block rounded-lg px-4 py-2.5 text-[15px] font-medium text-white/85 transition-colors duration-200 hover:bg-amber-50 hover:text-amber-500"
                          />
                        }
                      >
                        {t(link.labelKey)}
                      </SheetClose>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
