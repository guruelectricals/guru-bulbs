"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";
import type { TranslationKey } from "@/lib/i18n";

export function ProductFilterBar({
  sanityCategories = [],
}: {
  sanityCategories?: { slug: string; title: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language, t } = useLanguage();

  const currentCategory = searchParams.get("type") || "all";
  const currentSearch = searchParams.get("q") || "";
  const currentWattage = searchParams.get("wattage") || "all";
  const currentStatus = searchParams.get("status") || "all";
  const currentSort = searchParams.get("sort") || "default";
  const currentStock = searchParams.get("stock") === "true";

  const [searchQuery, setSearchQuery] = React.useState(currentSearch);

  React.useEffect(() => {
    setSearchQuery(currentSearch);
  }, [currentSearch]);

  const getLocalizedHref = (href: string) => {
    if (language === "ne") {
      if (href.startsWith("/ne")) return href;
      const cleanHref = href.startsWith("/") ? href : `/${href}`;
      return `/ne${cleanHref === "/" ? "" : cleanHref}`;
    }
    return href.replace(/^\/ne/, "") || "/";
  };

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all" && value !== "default" && value !== "false") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const basePath = getLocalizedHref("/products");
    router.push(`${basePath}?${params.toString()}`, { scroll: false });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam("q", searchQuery.trim() || null);
  };

  const resetAllFilters = () => {
    setSearchQuery("");
    router.push(getLocalizedHref("/products"), { scroll: false });
  };

  const activeFiltersCount = [
    currentCategory !== "all",
    currentWattage !== "all",
    currentStatus !== "all",
    currentSort !== "default",
    currentStock,
  ].filter(Boolean).length;

  const rawCategoryTitle =
    currentCategory === "all"
      ? (language === "ne" ? "सबै उत्पादनहरू" : "All Products")
      : sanityCategories.find((c) => c.slug === currentCategory)?.title || "All Products";

  const currentCategoryTitle = t(rawCategoryTitle as TranslationKey) || rawCategoryTitle;

  return (
    <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      {/* SEARCH INPUT */}
      <form onSubmit={handleSearchSubmit} className="relative min-w-0 flex-1 sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-neutral-400" />
        <Input
          type="text"
          placeholder={language === "ne" ? "उत्पादनहरू खोज्नुहोस्..." : "Search products..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-10 w-full rounded-full border-amber-500/20 bg-neutral-900/80 pl-8 pr-7 text-xs text-white placeholder:text-neutral-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 backdrop-blur-xl"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              updateParam("q", null);
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
          >
            <X className="size-3.5" />
          </button>
        )}
      </form>

      {/* UNIFIED FILTERS DRAWER */}
      <Popover>
        <PopoverTrigger
          className={cn(
            "inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full border px-4 text-xs font-bold transition-all duration-300 backdrop-blur-xl cursor-pointer sm:w-auto sm:shrink-0",
            activeFiltersCount > 0
              ? "border-amber-400 bg-amber-500/20 text-amber-400 shadow-md shadow-amber-500/15"
              : "border-amber-500/20 bg-neutral-900/80 text-neutral-300 hover:border-amber-400 hover:text-amber-400",
          )}
        >
          <SlidersHorizontal className="size-3.5 text-amber-400" />
          <span>{language === "ne" ? "फिल्टरहरू" : "Filters"}</span>
          {activeFiltersCount === 0 ? (
            <span className="text-neutral-500">· {currentCategoryTitle}</span>
          ) : (
            <span className="flex size-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-extrabold text-neutral-950">
              {activeFiltersCount}
            </span>
          )}
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={8}
          className="w-[calc(100vw-2rem)] max-w-80 rounded-3xl border-amber-500/30 bg-neutral-950/95 p-5 text-neutral-100 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl space-y-4"
        >
          <PopoverHeader className="flex flex-row items-center justify-between pb-2 border-b border-amber-500/15">
            <PopoverTitle className="text-xs font-bold uppercase tracking-widest text-amber-400">
              {language === "ne" ? "फिल्टर र क्रमबद्ध गर्नुहोस्" : "Filter & Sort Catalogue"}
            </PopoverTitle>
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-bold text-amber-400 transition-colors hover:bg-amber-500/20 hover:text-amber-300"
              >
                {language === "ne" ? "हटाउनुहोस्" : "Clear"}
              </button>
            )}
          </PopoverHeader>

          {/* CATEGORY FILTER */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              {language === "ne" ? "वर्ग (Category)" : "Category"}
            </label>
            <Select
              value={currentCategory}
              onValueChange={(val) => updateParam("type", val)}
            >
              <SelectTrigger className="h-10 w-full rounded-xl border-amber-500/20 bg-neutral-900 text-xs font-semibold text-neutral-200">
                <SelectValue placeholder={language === "ne" ? "सबै उत्पादनहरू" : "All Products"} />
              </SelectTrigger>
              <SelectContent className="border-amber-500/20 bg-neutral-900 text-neutral-200">
                <SelectItem value="all">{language === "ne" ? "सबै उत्पादनहरू" : "All Products"}</SelectItem>
                {sanityCategories.map((category) => (
                  <SelectItem key={category.slug} value={category.slug}>
                    {t(category.title as TranslationKey) || category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* WATTAGE FILTER */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              {language === "ne" ? "पावर / वाटेज" : "Power / Wattage"}
            </label>
            <Select
              value={currentWattage}
              onValueChange={(val) => updateParam("wattage", val)}
            >
              <SelectTrigger className="h-10 w-full rounded-xl border-amber-500/20 bg-neutral-900 text-xs font-semibold text-neutral-200">
                <SelectValue placeholder={language === "ne" ? "सबै वाटेज" : "All Wattages"} />
              </SelectTrigger>
              <SelectContent className="border-amber-500/20 bg-neutral-900 text-neutral-200">
                <SelectItem value="all">{language === "ne" ? "सबै वाटेज" : "All Wattages"}</SelectItem>
                <SelectItem value="under-10w">{language === "ne" ? "१०W भन्दा कम (≤9W)" : "Under 10W (≤9W)"}</SelectItem>
                <SelectItem value="10w-20w">10W – 20W</SelectItem>
                <SelectItem value="over-20w">{language === "ne" ? "२०W भन्दा बढी (≥50W)" : "Over 20W (≥50W)"}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* STATUS BADGE FILTER */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              {language === "ne" ? "ब्याज स्थिति" : "Badge Status"}
            </label>
            <Select
              value={currentStatus}
              onValueChange={(val) => updateParam("status", val)}
            >
              <SelectTrigger className="h-10 w-full rounded-xl border-amber-500/20 bg-neutral-900 text-xs font-semibold text-neutral-200">
                <SelectValue placeholder={language === "ne" ? "सबै ब्याजहरू" : "All Badges"} />
              </SelectTrigger>
              <SelectContent className="border-amber-500/20 bg-neutral-900 text-neutral-200">
                <SelectItem value="all">{language === "ne" ? "सबै ब्याजहरू" : "All Badges"}</SelectItem>
                <SelectItem value="bestSeller">{t("bestSeller")}</SelectItem>
                <SelectItem value="new">{t("newArrival")}</SelectItem>
                <SelectItem value="featured">{t("featured")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* SORT BY */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              {language === "ne" ? "क्रमबद्धता" : "Sort Order"}
            </label>
            <Select
              value={currentSort}
              onValueChange={(val) => updateParam("sort", val)}
            >
              <SelectTrigger className="h-10 w-full rounded-xl border-amber-500/20 bg-neutral-900 text-xs font-semibold text-neutral-200">
                <SelectValue placeholder={language === "ne" ? "विशेष क्रम" : "Featured Sort"} />
              </SelectTrigger>
              <SelectContent className="border-amber-500/20 bg-neutral-900 text-neutral-200">
                <SelectItem value="default">{language === "ne" ? "विशेष क्रम" : "Featured Sort"}</SelectItem>
                <SelectItem value="price-asc">{language === "ne" ? "मूल्य: कम देखि बढी" : "Price: Low to High"}</SelectItem>
                <SelectItem value="price-desc">{language === "ne" ? "मूल्य: बढी देखि कम" : "Price: High to Low"}</SelectItem>
                <SelectItem value="rating">{language === "ne" ? "उच्च मूल्याङ्कन" : "Highest Rated"}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* IN STOCK TOGGLE */}
          <div className="pt-2 border-t border-amber-500/15 flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-300">
              {language === "ne" ? "स्टक भएका मात्र" : "In Stock Items Only"}
            </span>
            <button
              type="button"
              onClick={() => updateParam("stock", currentStock ? "false" : "true")}
              className={cn(
                "flex h-6 w-11 items-center rounded-full p-1 transition-colors duration-300",
                currentStock ? "bg-amber-500" : "bg-neutral-800",
              )}
            >
              <div
                className={cn(
                  "size-4 rounded-full bg-neutral-950 transition-transform duration-300",
                  currentStock ? "translate-x-5" : "translate-x-0",
                )}
              />
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}