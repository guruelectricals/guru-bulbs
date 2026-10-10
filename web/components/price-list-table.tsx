"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/providers/language-provider";
import { type TranslationKey } from "@/lib/i18n";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProductVariantRow = {
  key: string;
  name: string;
  wattage: string;
  modelNumber: string;
  holder: string;
  k6500: string;
  k4000: string;
  k3000: string;
  qtyPerCtn: string;
  price: number | null;
};

export type PriceListProduct = {
  _id: string;
  slug: string;
  title: string;
  productCode: string;
  categoryTitle: string;
  categorySlug: string;
  categoryCode?: string;
  categoryDisplayOrder?: number;
  warranty?: string;
  variants: ProductVariantRow[];

  // legacy fields (kept for backwards compat, unused in new table)
  inStock?: boolean;
  wattage?: string;
  imageUrl?: string;
};

// ─── Column definition ────────────────────────────────────────────────────────

type ColKey = "wattage" | "modelNumber" | "holder" | "k6500" | "k4000" | "k3000" | "qtyPerCtn" | "price";

const ALL_COLUMNS: { key: ColKey; label: string; labelNe: string; align: "left" | "right" }[] = [
  { key: "wattage",     label: "WATT",      labelNe: "वाट",       align: "left"  },
  { key: "modelNumber", label: "MODEL",     labelNe: "मोडेल",     align: "left"  },
  { key: "holder",      label: "HOLDER",    labelNe: "होल्डर",    align: "left"  },
  { key: "k6500",       label: "6500K",     labelNe: "६५००K",     align: "right" },
  { key: "k4000",       label: "4000K",     labelNe: "४०००K",     align: "right" },
  { key: "k3000",       label: "3000K",     labelNe: "३०००K",     align: "right" },
  { key: "qtyPerCtn",   label: "QTY/CTN",  labelNe: "CTN/बक्सा", align: "right" },
  { key: "price",       label: "MRP (NPR)", labelNe: "MRP (NPR)", align: "right" },
];

/** Detect which columns have at least one non-empty value across the given variants */
function detectColumns(variants: ProductVariantRow[]): ColKey[] {
  return ALL_COLUMNS
    .filter(({ key }) =>
      variants.some((v) => {
        const val = v[key];
        return val !== null && val !== undefined && String(val).trim() !== "";
      })
    )
    .map(({ key }) => key);
}

function fmt(val: string | number | null | undefined): string {
  if (val === null || val === undefined || String(val).trim() === "") return "—";
  return String(val);
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PriceListTable({ products }: { products: PriceListProduct[] }) {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  // ── Derived category list ─────────────────────────────────────────────────
  const categories = React.useMemo(() => {
    const seen = new Map<string, { title: string; code: string; order: number }>();
    products.forEach((p) => {
      if (!seen.has(p.categorySlug)) {
        seen.set(p.categorySlug, {
          title: p.categoryTitle,
          code: p.categoryCode ?? "",
          order: p.categoryDisplayOrder ?? 99,
        });
      }
    });
    return Array.from(seen.entries()).sort((a, b) => a[1].order - b[1].order);
  }, [products]);

  // ── Filtered products ─────────────────────────────────────────────────────
  const filteredProducts = React.useMemo(() => {
    const q = searchQuery.toLowerCase();
    return products.filter((p) => {
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.categoryTitle.toLowerCase().includes(q) ||
        p.variants.some(
          (v) =>
            v.wattage.toLowerCase().includes(q) ||
            v.modelNumber.toLowerCase().includes(q) ||
            v.holder.toLowerCase().includes(q)
        );
      const matchesCat =
        selectedCategory === "all" || p.categorySlug === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [products, searchQuery, selectedCategory]);

  // ── Group by category ─────────────────────────────────────────────────────
  const grouped = React.useMemo(() => {
    const map = new Map<
      string,
      { slug: string; title: string; code: string; products: PriceListProduct[] }
    >();
    filteredProducts.forEach((p) => {
      if (!map.has(p.categorySlug)) {
        map.set(p.categorySlug, {
          slug: p.categorySlug,
          title: p.categoryTitle,
          code: p.categoryCode ?? "",
          products: [],
        });
      }
      map.get(p.categorySlug)!.products.push(p);
    });
    return Array.from(map.values());
  }, [filteredProducts]);

  return (
    <div className="space-y-6">
      {/* SEARCH + CATEGORY FILTER */}
      <div className="rounded-3xl border border-amber-500/20 bg-neutral-900/80 backdrop-blur-xl overflow-hidden">
        {/* Search */}
        <div className="p-4 border-b border-amber-500/10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-amber-400 pointer-events-none" />
            <input
              type="text"
              placeholder={
                language === "ne"
                  ? "नाम, वाटेज वा वर्ग अनुसार खोज्नुहोस्..."
                  : "Search by product name, wattage or category…"
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 text-sm bg-neutral-950/60 border border-amber-500/25 text-white rounded-2xl placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="px-4 py-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
              selectedCategory === "all"
                ? "bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20"
                : "bg-neutral-950/60 border border-amber-500/20 text-neutral-300 hover:border-amber-400 hover:text-amber-400"
            }`}
          >
            {language === "ne" ? "सबै" : "All"} ({products.length})
          </button>
          {categories.map(([slug, info]) => {
            const label = t(info.title as TranslationKey) || info.title;
            return (
              <button
                key={slug}
                type="button"
                onClick={() => setSelectedCategory(slug)}
                className={`rounded-full px-3 py-1 text-xs font-bold transition-all capitalize ${
                  selectedCategory === slug
                    ? "bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20"
                    : "bg-neutral-950/80 border border-amber-500/20 text-neutral-300 hover:border-amber-400"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* GROUPED TABLES */}
      {grouped.length === 0 ? (
        <div className="rounded-3xl border border-amber-500/20 bg-neutral-900/60 p-12 text-center space-y-3">
          <Tag className="mx-auto size-10 text-amber-400/40" />
          <p className="text-sm font-bold text-neutral-300">
            {language === "ne"
              ? "तपाईंको खोजी अनुसार कुनै उत्पादन फेला परेन"
              : "No products match your filters"}
          </p>
          <Button
            variant="brandOutline"
            size="cta-sm"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
          >
            {language === "ne" ? "फिल्टर हटाउनुहोस्" : "Clear Filters"}
          </Button>
        </div>
      ) : (
        grouped.map((group) => (
          <CategorySection
            key={group.slug}
            group={group}
            language={language}
          />
        ))
      )}
    </div>
  );
}

// ─── Per-category section ─────────────────────────────────────────────────────

function CategorySection({
  group,
  language,
}: {
  group: { slug: string; title: string; code: string; products: PriceListProduct[] };
  language: string;
}) {
  return (
    <div className="space-y-5">
      {/* Category Section Title */}
      <div className="flex items-center gap-3 pt-4 pb-1">
        {group.code && (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-neutral-950 text-sm font-black shadow-md shadow-amber-500/20">
            {group.code.charAt(0).toUpperCase()}
          </span>
        )}
        <h2 className="text-xl font-extrabold tracking-tight text-white">
          {group.title}
        </h2>
      </div>

      {/* Standalone Product Tables */}
      <div className="space-y-6">
        {group.products.map((product) => (
          <ProductTable
            key={product._id}
            product={product}
            language={language}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Standalone per-product table card ────────────────────────────────────────

function ProductTable({
  product,
  language,
}: {
  product: PriceListProduct;
  language: string;
}) {
  const variants = product.variants ?? [];
  const cols = React.useMemo(() => detectColumns(variants), [variants]);
  const colDefs = ALL_COLUMNS.filter((c) => cols.includes(c.key));

  return (
    <div className="overflow-hidden rounded-2xl border border-amber-500/30 bg-neutral-900/90 shadow-xl backdrop-blur-xl transition-all hover:border-amber-500/50">
      {/* Table Header: product name + warranty badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-3.5 bg-neutral-950/90 border-b border-amber-500/20">
        <h3 className="text-sm font-extrabold text-white tracking-tight">
          {product.title}
        </h3>
        {product.warranty && (
          <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-[11px] font-bold text-amber-400">
            {product.warranty}
          </span>
        )}
      </div>

      {variants.length === 0 ? (
        <div className="px-6 py-4 text-xs text-neutral-500 italic">
          {language === "ne" ? "कुनै भ्यारिएन्ट उपलब्ध छैन" : "No variants available"}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-950 border-b border-amber-500/20 text-[11px] font-black uppercase tracking-wider text-amber-400">
                {colDefs.map((col) => (
                  <th
                    key={col.key}
                    className={`px-5 py-3 ${col.align === "right" ? "text-right" : "text-left"}`}
                  >
                    {language === "ne" ? col.labelNe : col.label}
                  </th>
                ))}
                <th className="px-5 py-3 text-right text-[11px] font-black uppercase tracking-wider text-amber-400">
                  {language === "ne" ? "विवरण" : "Details"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-[13px]">
              {variants.map((v, i) => (
                <tr
                  key={v.key || i}
                  className="hover:bg-amber-500/10 transition-colors duration-150"
                >
                  {colDefs.map((col) => (
                    <td
                      key={col.key}
                      className={`px-5 py-3 ${col.align === "right" ? "text-right" : ""} ${
                        col.key === "wattage"
                          ? "font-extrabold text-white"
                          : col.key === "price"
                          ? "font-extrabold text-amber-400 text-sm"
                          : col.key === "k6500" || col.key === "k4000" || col.key === "k3000"
                          ? "font-bold text-neutral-100"
                          : "text-neutral-300 font-semibold"
                      }`}
                    >
                      {col.key === "price"
                        ? v.price != null
                          ? new Intl.NumberFormat("en-IN").format(v.price)
                          : "—"
                        : fmt(v[col.key])}
                    </td>
                  ))}
                  <td className="px-5 py-3 text-right">
                    <Link href={`/products/${product.slug}`}>
                      <button
                        type="button"
                        className="rounded-full border border-amber-500/40 bg-neutral-950 px-3.5 py-1 text-[11px] font-bold text-neutral-200 hover:border-amber-400 hover:text-amber-400 transition-all shadow-sm"
                      >
                        {language === "ne" ? "विवरण" : "Specs"}
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
