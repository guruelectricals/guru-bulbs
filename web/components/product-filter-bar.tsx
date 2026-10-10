"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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

const chipClass = (active: boolean) =>
  cn(
    "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
    active
      ? "border-amber-500 bg-amber-500 text-neutral-950"
      : "border-amber-500/20 bg-neutral-900/60 text-neutral-300 hover:border-amber-400 hover:text-amber-400",
  );

export function ProductFilterBar({
  sanityCategories = [],
}: {
  sanityCategories?: { slug: string; title: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language, t } = useLanguage();
  const ne = language === "ne";

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
    const query = params.toString();
    router.push(query ? `${basePath}?${query}` : basePath, { scroll: false });
  };

  // Search as you type (debounced) so results update without pressing Enter.
  React.useEffect(() => {
    const trimmed = searchQuery.trim();
    if (trimmed === currentSearch) return;
    const timer = window.setTimeout(() => updateParam("q", trimmed || null), 400);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam("q", searchQuery.trim() || null);
  };

  const resetAllFilters = () => {
    setSearchQuery("");
    router.push(getLocalizedHref("/products"), { scroll: false });
  };

  const categoryOptions = [
    { value: "all", label: ne ? "सबै उत्पादनहरू" : "All Products" },
    ...sanityCategories.map((category) => ({
      value: category.slug,
      label: t(category.title as TranslationKey) || category.title,
    })),
  ];

  const wattageOptions = [
    { value: "all", label: ne ? "सबै" : "Any" },
    { value: "under-10w", label: ne ? "१०W भन्दा कम" : "Under 10W" },
    { value: "10w-20w", label: "10W – 20W" },
    { value: "over-20w", label: ne ? "२०W भन्दा बढी" : "Over 20W" },
  ];

  const statusOptions = [
    { value: "all", label: ne ? "सबै" : "Any" },
    { value: "bestSeller", label: t("bestSeller") },
    { value: "new", label: t("newArrival") },
    { value: "featured", label: t("featured") },
  ];

  const sortOptions = [
    { value: "default", label: ne ? "विशेष क्रम" : "Featured" },
    { value: "price-asc", label: ne ? "मूल्य: कम देखि बढी" : "Price: Low to High" },
    { value: "price-desc", label: ne ? "मूल्य: बढी देखि कम" : "Price: High to Low" },
    { value: "rating", label: ne ? "उच्च मूल्याङ्कन" : "Highest Rated" },
  ];

  const panelFiltersCount = [
    currentWattage !== "all",
    currentStatus !== "all",
    currentStock,
  ].filter(Boolean).length;

  const labelOf = (options: { value: string; label: string }[], value: string) =>
    options.find((option) => option.value === value)?.label || value;

  const activeChips = [
    currentSearch && {
      key: "q",
      label: `“${currentSearch}”`,
      onRemove: () => {
        setSearchQuery("");
        updateParam("q", null);
      },
    },
    currentCategory !== "all" && {
      key: "type",
      label: labelOf(categoryOptions, currentCategory),
      onRemove: () => updateParam("type", null),
    },
    currentWattage !== "all" && {
      key: "wattage",
      label: labelOf(wattageOptions, currentWattage),
      onRemove: () => updateParam("wattage", null),
    },
    currentStatus !== "all" && {
      key: "status",
      label: labelOf(statusOptions, currentStatus),
      onRemove: () => updateParam("status", null),
    },
    currentStock && {
      key: "stock",
      label: ne ? "स्टकमा" : "In stock",
      onRemove: () => updateParam("stock", null),
    },
  ].filter(Boolean) as { key: string; label: string; onRemove: () => void }[];

  const optionGroup = (
    label: string,
    options: { value: string; label: string }[],
    current: string,
    param: string,
  ) => (
    <fieldset className="space-y-2">
      <legend className="mb-2 text-xs font-bold tracking-wider text-neutral-400 uppercase">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => updateParam(param, option.value)}
            className={cn(chipClass(current === option.value), "h-8 px-3 text-xs")}
            aria-pressed={current === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        {/* SEARCH */}
        <form
          role="search"
          onSubmit={handleSearchSubmit}
          className="relative min-w-0 flex-1 md:max-w-md"
        >
          <label htmlFor="product-search" className="sr-only">
            {ne ? "उत्पादनहरू खोज्नुहोस्" : "Search products"}
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-neutral-400"
            aria-hidden="true"
          />
          <Input
            id="product-search"
            type="search"
            enterKeyHint="search"
            placeholder={ne ? "नाम वा कोडले खोज्नुहोस्..." : "Search by name or code..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 w-full rounded-full border-amber-500/20 bg-neutral-900/60 pr-10 pl-11 text-sm text-white placeholder:text-neutral-500 focus-visible:border-amber-400 focus-visible:ring-2 focus-visible:ring-amber-400/40 [&::-webkit-search-cancel-button]:hidden"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                updateParam("q", null);
              }}
              className="absolute top-1/2 right-2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-amber-500/10 hover:text-amber-400"
              aria-label={ne ? "खोज हटाउनुहोस्" : "Clear search"}
            >
              <X className="size-4" />
            </button>
          )}
        </form>

        <div className="flex gap-2 md:ml-auto">
          {/* SORT */}
          <Select
            items={sortOptions}
            value={currentSort}
            onValueChange={(val) => updateParam("sort", val as string)}
          >
            <SelectTrigger
              aria-label={ne ? "क्रमबद्ध गर्नुहोस्" : "Sort products"}
              className="h-11 min-w-0 flex-1 rounded-full border-amber-500/20 bg-neutral-900/60 px-4 text-sm font-semibold text-neutral-200 md:w-52 md:flex-none"
            >
              <span className="text-neutral-500">{ne ? "क्रम:" : "Sort:"}</span>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-amber-500/20 bg-neutral-900 text-neutral-200">
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* MORE FILTERS */}
          <Popover>
            <PopoverTrigger
              className={cn(
                "inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                panelFiltersCount > 0
                  ? "border-amber-500 bg-amber-500/10 text-amber-400"
                  : "border-amber-500/20 bg-neutral-900/60 text-neutral-200 hover:border-amber-400 hover:text-amber-400",
              )}
              aria-label={
                ne
                  ? `थप फिल्टरहरू${panelFiltersCount ? ` (${panelFiltersCount} सक्रिय)` : ""}`
                  : `More filters${panelFiltersCount ? ` (${panelFiltersCount} active)` : ""}`
              }
            >
              <SlidersHorizontal className="size-4" aria-hidden="true" />
              <span>{ne ? "फिल्टर" : "Filters"}</span>
              {panelFiltersCount > 0 && (
                <span
                  className="flex size-5 items-center justify-center rounded-full bg-amber-500 text-[11px] font-extrabold text-neutral-950"
                  aria-hidden="true"
                >
                  {panelFiltersCount}
                </span>
              )}
            </PopoverTrigger>
            <PopoverContent
              align="end"
              side="bottom"
              sideOffset={8}
              className="max-h-[calc(100dvh-8rem)] w-[calc(100vw-2rem)] max-w-sm space-y-5 overflow-y-auto overscroll-contain rounded-2xl border-amber-500/20 bg-neutral-950 p-5 text-neutral-100 shadow-2xl shadow-black/40"
            >
              <PopoverHeader className="flex flex-row items-center justify-between border-b border-amber-500/15 pb-3">
                <PopoverTitle className="text-sm font-bold text-white">
                  {ne ? "थप फिल्टरहरू" : "More filters"}
                </PopoverTitle>
                {panelFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      const params = new URLSearchParams(searchParams.toString());
                      ["wattage", "status", "stock"].forEach((key) => params.delete(key));
                      const query = params.toString();
                      const basePath = getLocalizedHref("/products");
                      router.push(query ? `${basePath}?${query}` : basePath, { scroll: false });
                    }}
                    className="text-xs font-semibold text-amber-400 underline-offset-4 hover:underline"
                  >
                    {ne ? "रिसेट" : "Reset"}
                  </button>
                )}
              </PopoverHeader>

              {optionGroup(ne ? "पावर / वाटेज" : "Wattage", wattageOptions, currentWattage, "wattage")}
              {optionGroup(ne ? "ब्याज" : "Badge", statusOptions, currentStatus, "status")}

              <label
                htmlFor="filter-in-stock"
                className="flex cursor-pointer items-center justify-between gap-4 border-t border-amber-500/15 pt-4"
              >
                <span className="text-sm font-semibold text-neutral-200">
                  {ne ? "स्टक भएका मात्र देखाउनुहोस्" : "Show in-stock items only"}
                </span>
                <Switch
                  id="filter-in-stock"
                  checked={currentStock}
                  onCheckedChange={(checked) => updateParam("stock", checked ? "true" : null)}
                />
              </label>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* CATEGORY CHIPS — scroll horizontally on small screens */}
      <div
        role="group"
        aria-label={ne ? "वर्ग" : "Category"}
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {categoryOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => updateParam("type", option.value)}
            className={chipClass(currentCategory === option.value)}
            aria-pressed={currentCategory === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* ACTIVE FILTERS */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2" aria-live="polite">
          <span className="text-xs font-semibold text-neutral-500">
            {ne ? "सक्रिय:" : "Active:"}
          </span>
          {activeChips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={chip.onRemove}
              className="inline-flex h-7 items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 pr-2 pl-3 text-xs font-semibold text-amber-400 transition-colors hover:border-amber-400"
              aria-label={ne ? `${chip.label} हटाउनुहोस्` : `Remove filter: ${chip.label}`}
            >
              {chip.label}
              <X className="size-3.5" aria-hidden="true" />
            </button>
          ))}
          <button
            type="button"
            onClick={resetAllFilters}
            className="ml-1 text-xs font-semibold text-neutral-400 underline-offset-4 hover:text-amber-400 hover:underline"
          >
            {ne ? "सबै हटाउनुहोस्" : "Clear all"}
          </button>
        </div>
      )}
    </div>
  );
}
