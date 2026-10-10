"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import {
  Menu,
  X,
  Lightbulb,
  Phone,
  ChevronDown,
  ChevronRight,
  Tag,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
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
import {
  NAV_LINKS,
  RESOURCES_MENU,
  SERVICES_MENU,
  LANGUAGE_OPTIONS,
} from "@/lib/constants";

type NavigationCategory = {
  href: string;
  label: string;
  code?: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
};

type DesktopMenu = "products" | "services" | "resources" | "language" | null;

const navItemClass = (active: boolean) =>
  cn(
    "flex items-center gap-1 rounded-full px-3 py-1.5 text-[13px] font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
    active
      ? "bg-amber-500/10 text-amber-400"
      : "text-neutral-300 hover:bg-amber-500/10 hover:text-amber-400",
  );

const menuItemClass = (active: boolean) =>
  cn(
    "flex items-center justify-between rounded-xl px-3 py-2 text-[13px] font-semibold transition-colors duration-150",
    active
      ? "bg-amber-500/10 text-amber-400"
      : "text-neutral-300 hover:bg-amber-500/10 hover:text-amber-400",
  );

const mobileItemClass = (active: boolean) =>
  cn(
    "flex w-full items-center justify-between rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors duration-200",
    active
      ? "bg-amber-500/10 text-amber-400"
      : "text-white/85 hover:bg-amber-500/10 hover:text-amber-400",
  );

const mobileSubItemClass = (active: boolean) =>
  cn(
    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-200",
    active
      ? "font-semibold text-amber-400"
      : "text-white/70 hover:bg-amber-500/10 hover:text-amber-400",
  );

function NavDropdown({
  label,
  active,
  open,
  onOpenChange,
  align = "left",
  panelClassName,
  children,
}: {
  label: ReactNode;
  active: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  align?: "left" | "center" | "right";
  panelClassName?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
    >
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        className={navItemClass(active || open)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {label}
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      <div
        className={cn(
          "absolute top-full z-50 pt-3 transition-all duration-200",
          align === "center" && "left-1/2 -translate-x-1/2",
          align === "left" && "left-0",
          align === "right" && "right-0",
          open
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-1 opacity-0",
        )}
      >
        <div
          className={cn(
            "overflow-hidden rounded-2xl border border-amber-500/20 bg-neutral-950/95 shadow-2xl shadow-black/40 backdrop-blur-2xl",
            panelClassName,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function Navbar({
  categoryItems,
  branding,
}: {
  categoryItems?: NavigationCategory[];
  branding?: SiteBranding;
} = {}) {
  const site = useSite();
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const activeBranding = branding || site.branding;
  const activeCategoryItems =
    categoryItems && categoryItems.length > 0
      ? categoryItems
      : site.categoryItems;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<
    "products" | "services" | "resources" | null
  >(null);
  const [openMenu, setOpenMenu] = useState<DesktopMenu>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 8);

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    setOpenMenu(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const getLocalizedHref = (href: string) => {
    if (language === "ne") {
      if (href.startsWith("/ne")) return href;
      const cleanHref = href.startsWith("/") ? href : `/${href}`;
      return `/ne${cleanHref === "/" ? "" : cleanHref}`;
    }
    return href.replace(/^\/ne/, "") || "/";
  };

  const currentPath = (pathname || "/").replace(/^\/ne(?=\/|$)/, "") || "/";
  const isActive = (href: string) =>
    href === "/"
      ? currentPath === "/"
      : currentPath === href || currentPath.startsWith(`${href}/`);
  const isAnyActive = (hrefs: readonly string[]) => hrefs.some(isActive);

  const menuToggle = (menu: Exclude<DesktopMenu, null>) => (open: boolean) =>
    setOpenMenu(open ? menu : null);
  const closeMenu = () => setOpenMenu(null);

  const categories = activeCategoryItems;
  const brandingToUse = activeBranding;
  const phone = brandingToUse.phone || "+977 9812345678";
  const telHref = `tel:${phone.replace(/\s+/g, "")}`;
  const isDark = isMounted && resolvedTheme === "dark";
  const servicesHrefs = [
    "/services",
    ...SERVICES_MENU.map((item) => item.href),
  ];
  const resourcesHrefs = RESOURCES_MENU.map((item) => item.href);
  const productsHrefs = ["/products", "/price-list"];

  const brand = (
    <Link
      href={getLocalizedHref("/")}
      className="group flex shrink-0 items-center gap-2 whitespace-nowrap"
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
          <span className="flex size-9 items-center justify-center rounded-xl bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/25">
            <Lightbulb className="size-5" strokeWidth={2.5} />
          </span>
          <span className="max-w-32 truncate font-display text-xl font-black tracking-tight text-white sm:max-w-none sm:text-[22px]">
            {brandingToUse.companyName}
          </span>
        </>
      )}
    </Link>
  );

  return (
    <nav className="site-navbar fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 xl:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div
          className={cn(
            "navbar-shell flex h-16 items-center justify-between gap-4 rounded-2xl border px-3 shadow-lg backdrop-blur-xl transition-all duration-300 sm:px-4",
            isScrolled || isMobileMenuOpen
              ? "bg-neutral-950/95 border-amber-500/25 shadow-black/40"
              : "bg-neutral-950/80 border-amber-500/15 shadow-black/20",
          )}
        >
          {brand}

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => {
              if (link.labelKey === "products") {
                return (
                  <NavDropdown
                    key={link.labelKey}
                    label={t("products")}
                    active={isAnyActive(productsHrefs)}
                    open={openMenu === "products"}
                    onOpenChange={menuToggle("products")}
                    align="center"
                    panelClassName="w-[560px]"
                  >
                    <div className="flex items-center justify-between border-b border-amber-500/15 px-5 py-3">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400">
                        {t("lightCollections")}
                      </span>
                      <Link
                        href={getLocalizedHref("/products")}
                        onClick={closeMenu}
                        className="flex items-center gap-1 text-xs font-bold text-neutral-400 transition-colors hover:text-amber-400"
                      >
                        {t("browseAll")}
                        <ChevronRight className="size-3.5" />
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-1 p-3">
                      {categories.length > 0
                        ? categories.map((category) => (
                            <Link
                              key={category.href}
                              href={getLocalizedHref(category.href)}
                              onClick={closeMenu}
                              className="group/item flex items-center gap-3 rounded-xl p-2 transition-colors duration-150 hover:bg-amber-500/10"
                            >
                              <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-400">
                                {category.imageUrl ? (
                                  <Image
                                    src={category.imageUrl}
                                    alt={category.label}
                                    fill
                                    sizes="40px"
                                    className="object-cover transition-transform duration-300 group-hover/item:scale-110"
                                  />
                                ) : (
                                  <Tag className="size-4" />
                                )}
                              </span>
                              <span className="truncate text-[13px] font-semibold text-neutral-100 transition-colors group-hover/item:text-amber-400">
                                {t(category.label as TranslationKey) ||
                                  category.label}
                              </span>
                            </Link>
                          ))
                        : Array.from({ length: 6 }, (_, i) => (
                            <div
                              key={i}
                              className="flex animate-pulse items-center gap-3 rounded-xl p-2"
                            >
                              <div className="size-10 shrink-0 rounded-lg bg-neutral-800" />
                              <div className="h-3 w-28 rounded bg-neutral-800" />
                            </div>
                          ))}
                    </div>
                    <Link
                      href={getLocalizedHref("/price-list")}
                      onClick={closeMenu}
                      className="flex items-center justify-between border-t border-amber-500/15 bg-amber-500/10 px-5 py-3 text-xs font-bold text-amber-400 transition-colors hover:text-amber-300"
                    >
                      <span className="flex items-center gap-2">
                        <Tag className="size-3.5" />
                        {t("viewOfficialPriceList")}
                      </span>
                      <ChevronRight className="size-3.5" />
                    </Link>
                  </NavDropdown>
                );
              }

              if (link.labelKey === "services") {
                return (
                  <NavDropdown
                    key={link.labelKey}
                    label={t("services")}
                    active={isAnyActive(servicesHrefs)}
                    open={openMenu === "services"}
                    onOpenChange={menuToggle("services")}
                    panelClassName="w-56 space-y-0.5 p-1.5"
                  >
                    {SERVICES_MENU.map((item) => (
                      <Link
                        key={item.href}
                        href={getLocalizedHref(item.href)}
                        onClick={closeMenu}
                        className={menuItemClass(isActive(item.href))}
                      >
                        {t(item.labelKey)}
                      </Link>
                    ))}
                    <Link
                      href={getLocalizedHref("/services")}
                      onClick={closeMenu}
                      className={cn(
                        menuItemClass(isActive("/services")),
                        "border-t border-amber-500/15",
                      )}
                    >
                      {t("allServices")}
                      <ChevronRight className="size-3.5" />
                    </Link>
                  </NavDropdown>
                );
              }

              if (link.labelKey === "resources") {
                return (
                  <NavDropdown
                    key={link.labelKey}
                    label={t("resources")}
                    active={isAnyActive(resourcesHrefs)}
                    open={openMenu === "resources"}
                    onOpenChange={menuToggle("resources")}
                    panelClassName="w-44 space-y-0.5 p-1.5"
                  >
                    {RESOURCES_MENU.map((item) => (
                      <Link
                        key={item.href}
                        href={getLocalizedHref(item.href)}
                        onClick={closeMenu}
                        className={menuItemClass(isActive(item.href))}
                      >
                        {t(item.labelKey)}
                      </Link>
                    ))}
                  </NavDropdown>
                );
              }

              return (
                <Link
                  key={link.labelKey}
                  href={getLocalizedHref(link.href)}
                  className={navItemClass(isActive(link.href))}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {t(link.labelKey)}
                </Link>
              );
            })}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setOpenMenu("language")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                type="button"
                onClick={() =>
                  setOpenMenu(openMenu === "language" ? null : "language")
                }
                className="flex h-9 items-center gap-1 rounded-full px-3 text-[13px] font-semibold text-neutral-300 transition-colors hover:bg-amber-500/10 hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-expanded={openMenu === "language"}
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
                    "size-3.5 transition-transform duration-200",
                    openMenu === "language" && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </button>
              <div
                className={cn(
                  "absolute right-0 top-full z-50 w-32 pt-3 transition-all duration-200",
                  openMenu === "language"
                    ? "visible translate-y-0 opacity-100"
                    : "pointer-events-none invisible -translate-y-1 opacity-0",
                )}
                role="menu"
              >
                <div className="space-y-0.5 overflow-hidden rounded-2xl border border-amber-500/20 bg-neutral-950/95 p-1.5 shadow-2xl shadow-black/40 backdrop-blur-2xl">
                  {LANGUAGE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setLanguage(option.value as "en" | "ne");
                        setOpenMenu(null);
                      }}
                      className={cn(
                        menuItemClass(language === option.value),
                        "w-full",
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
              className="inline-flex size-9 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-amber-500/10 hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label={isDark ? t("switchLight") : t("switchDark")}
              title={isDark ? t("switchLight") : t("switchDark")}
            >
              {isMounted && resolvedTheme === "light" ? (
                <Moon className="size-4" aria-hidden="true" />
              ) : (
                <Sun className="size-4" aria-hidden="true" />
              )}
            </button>

            <Link
              href={telHref}
              className={buttonVariants({
                variant: "brand",
                size: "cta-sm",
                className: "ml-1 hidden xl:inline-flex",
              })}
            >
              <Phone className="size-3.5" />
              <span>{phone}</span>
            </Link>

            {/* MOBILE NAVIGATION */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger
                className="inline-flex size-9 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-amber-500/10 hover:text-amber-400 lg:hidden"
                aria-label="Open menu"
              >
                {isMobileMenuOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </SheetTrigger>
              <SheetContent
                side="left"
                className="flex h-dvh w-[19rem] flex-col gap-0 bg-gray-50 sm:w-80"
              >
                <div className="flex h-16 shrink-0 items-center border-b border-amber-500/15 px-5">
                  {brand}
                </div>

                <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
                  {NAV_LINKS.map((link) => {
                    const section =
                      link.labelKey === "products" ||
                      link.labelKey === "services" ||
                      link.labelKey === "resources"
                        ? link.labelKey
                        : null;

                    if (!section) {
                      return (
                        <SheetClose
                          key={link.labelKey}
                          nativeButton={false}
                          render={
                            <Link
                              href={getLocalizedHref(link.href)}
                              className={mobileItemClass(isActive(link.href))}
                              aria-current={
                                isActive(link.href) ? "page" : undefined
                              }
                            />
                          }
                        >
                          {t(link.labelKey)}
                        </SheetClose>
                      );
                    }

                    const isOpen = openMobileSection === section;
                    const sectionActive =
                      section === "products"
                        ? isAnyActive(productsHrefs)
                        : section === "services"
                          ? isAnyActive(servicesHrefs)
                          : isAnyActive(resourcesHrefs);

                    return (
                      <div key={link.labelKey}>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMobileSection(isOpen ? null : section)
                          }
                          className={mobileItemClass(sectionActive)}
                          aria-expanded={isOpen}
                        >
                          {t(link.labelKey)}
                          <ChevronDown
                            className={cn(
                              "size-4 transition-transform duration-300",
                              isOpen && "rotate-180",
                            )}
                          />
                        </button>

                        {isOpen && section === "products" && (
                          <div className="mt-1 ml-4 space-y-0.5 border-l border-amber-500/20 pl-3">
                            {categories.map((category) => (
                              <SheetClose
                                key={category.href}
                                nativeButton={false}
                                render={
                                  <Link
                                    href={getLocalizedHref(category.href)}
                                    className={mobileSubItemClass(false)}
                                  />
                                }
                              >
                                <span className="relative flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md border border-amber-500/30 bg-amber-500/10 text-amber-400">
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
                                {t(category.label as TranslationKey) ||
                                  category.label}
                              </SheetClose>
                            ))}
                            <SheetClose
                              nativeButton={false}
                              render={
                                <Link
                                  href={getLocalizedHref("/products")}
                                  className={cn(
                                    mobileSubItemClass(isActive("/products")),
                                    "font-semibold text-amber-400",
                                  )}
                                />
                              }
                            >
                              {t("browseAllProducts")}
                              <ChevronRight className="size-3.5" />
                            </SheetClose>
                            <SheetClose
                              nativeButton={false}
                              render={
                                <Link
                                  href={getLocalizedHref("/price-list")}
                                  className={cn(
                                    mobileSubItemClass(isActive("/price-list")),
                                    "font-semibold text-amber-400",
                                  )}
                                />
                              }
                            >
                              <Tag className="size-3.5" />
                              {t("viewPriceList")}
                            </SheetClose>
                          </div>
                        )}

                        {isOpen && section !== "products" && (
                          <div className="mt-1 ml-4 space-y-0.5 border-l border-amber-500/20 pl-3">
                            {(section === "services"
                              ? [
                                  ...SERVICES_MENU,
                                  {
                                    href: "/services",
                                    labelKey: "allServices" as TranslationKey,
                                  },
                                ]
                              : RESOURCES_MENU
                            ).map((item) => (
                              <SheetClose
                                key={item.href}
                                nativeButton={false}
                                render={
                                  <Link
                                    href={getLocalizedHref(item.href)}
                                    className={mobileSubItemClass(
                                      isActive(item.href),
                                    )}
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
                  })}
                </div>

                <div className="shrink-0 border-t border-amber-500/15 p-4">
                  <a
                    href={telHref}
                    className={buttonVariants({
                      variant: "brand",
                      size: "cta",
                      className: "w-full",
                    })}
                  >
                    <Phone className="size-4" />
                    {phone}
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
