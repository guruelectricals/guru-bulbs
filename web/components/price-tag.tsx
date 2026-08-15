"use client";

import { cn } from "@/lib/utils";
import { Tag } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { toDevanagariNumerals } from "@/lib/i18n";

export function PriceTag({
  price,
  originalPrice,
  discountLabel,
  className,
}: {
  price: string | number;
  originalPrice?: string | number;
  discountLabel?: string;
  className?: string;
}) {
  const { language } = useLanguage();

  const formatVal = (val: string | number) => {
    if (typeof val === "number") {
      const formattedNum = new Intl.NumberFormat("en-IN").format(val);
      return language === "ne"
        ? `रु. ${toDevanagariNumerals(formattedNum)}`
        : `Rs. ${formattedNum}`;
    }
    let str = String(val).trim();
    if (language === "ne") {
      str = str.replace(/^Rs\.?\s*/i, "रु. ");
      return toDevanagariNumerals(str);
    }
    return str.replace(/^रु\.?\s*/i, "Rs. ");
  };

  let formattedPrice = formatVal(price);
  let formattedOriginalPrice =
    originalPrice !== undefined && originalPrice !== null
      ? formatVal(originalPrice)
      : undefined;

  let formattedDiscount = discountLabel;

  if (language === "ne" && formattedDiscount) {
    formattedDiscount = toDevanagariNumerals(formattedDiscount).replace(/OFF/i, "छुट");
  }

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-neutral-950/90 px-3.5 py-1.5 backdrop-blur-md shadow-[0_0_15px_rgba(240,188,25,0.12)]">
        <Tag className="size-3.5 text-amber-400 shrink-0" />
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-extrabold tracking-tight text-amber-400">
            {formattedPrice}
          </span>
          {formattedOriginalPrice && (
            <span className="text-[11px] font-medium text-neutral-500 line-through">
              {formattedOriginalPrice}
            </span>
          )}
        </div>
      </div>
      {formattedDiscount && (
        <span className="rounded-full bg-amber-500/20 border border-amber-500/40 px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider text-amber-400 uppercase">
          {formattedDiscount}
        </span>
      )}
    </div>
  );
}
