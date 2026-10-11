"use client";

import Link from "next/link";
import { ArrowRight, Tag, Info, FileText, CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PriceListTable,
  type PriceListProduct,
} from "@/components/price-list-table";
import { useLanguage } from "@/providers/language-provider";

export function PriceListPageClient({ products }: { products: PriceListProduct[] }) {
  const { language, t } = useLanguage();

  const getLocalizedHref = (href: string) => {
    if (language === "ne") {
      if (href.startsWith("/ne")) return href;
      const cleanHref = href.startsWith("/") ? href : `/${href}`;
      return `/ne${cleanHref === "/" ? "" : cleanHref}`;
    }
    return href.replace(/^\/ne/, "") || "/";
  };

  const tiers = [
    {
      tier: language === "ne" ? "तह १: मानक MSRP" : "Tier 1: Standard MSRP",
      badge: language === "ne" ? "खुद्रा" : "Retail",
      badgeCls: "bg-neutral-800 text-neutral-300",
      title: language === "ne" ? "व्यक्तिगत खुद्रा मूल्य" : "Individual Retail",
      desc: language === "ne" ? "सबै स्थानीय कर र २ वर्षको वारेन्टीसहितको खुद्रा मूल्य।" : "Standard consumer pricing inclusive of all local taxes and 2-year warranty coverage.",
      borderCls: "border-amber-500/20",
      bgCls: "bg-neutral-900/60",
    },
    {
      tier: language === "ne" ? "तह २: व्यापार साझेदार" : "Tier 2: Trade Partner",
      badge: "~25% Off MSRP",
      badgeCls: "bg-amber-500/20 text-amber-400 border border-amber-500/40",
      title: language === "ne" ? "अधिकृत डिलर दर" : "Authorized Dealer",
      desc: language === "ne" ? "दर्ता भएका विद्युतीय बिक्रेता र क्षेत्रीय वितरकहरूका लागि विशेष नाफा दर।" : "Special margins reserved for registered electrical retailers and regional distributors.",
      borderCls: "border-amber-500/30",
      bgCls: "bg-neutral-900/80 shadow-lg shadow-amber-500/10",
    },
    {
      tier: language === "ne" ? "तह ३: थोक आपूर्ति" : "Tier 3: Volume Supply",
      badge: "~35% Off MSRP",
      badgeCls: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40",
      title: language === "ne" ? "थोक १००+ एकाइ दर" : "Bulk 100+ Units",
      desc: language === "ne" ? "ठेकेदार, होटेल र आयोजनाहरूका लागि सोझै फ्याक्ट्री आपूर्ति दर।" : "Direct factory supply rates for contractors, hotels, and municipal lighting projects.",
      borderCls: "border-amber-500/20",
      bgCls: "bg-neutral-900/60",
    },
  ];

  const commercialTerms = [
    {
      title: language === "ne" ? "तत्काल सट्टा वारेन्टी" : "Immediate Replacement Warranty",
      body: language === "ne" ? "२ वर्षको वारेन्टी अवधिभित्र बिग्रिएको कुनै पनि उत्पादन देशभरका अधिकृत गुरु बल्ब डिलरहरूमा तत्काल साट्न सकिन्छ।" : "Any product failing within the 2-year warranty period qualifies for instant over-the-counter replacement at authorized Guru Bulbs dealers nationwide.",
    },
    {
      title: language === "ne" ? "भ्याट समावेश र पारदर्शी" : "VAT-Inclusive & Transparent",
      body: language === "ne" ? "हाम्रो आधिकारिक मूल्य दर सूचीमा उल्लेखित सबै मूल्यहरूमा भ्याट समावेश छ।" : "All prices listed in our official rate schedule include VAT with official Government tax invoices supplied to all trade partners.",
    },
    {
      title: language === "ne" ? "देशभरि द्रुत ढुवानी" : "Nationwide Express Logistics",
      body: language === "ne" ? "रु २५,००० भन्दा बढीका अर्डरहरूमा पोखरा, विराटनगर, नारायणगढ र बुटवलका लागि विशेष ढुवानी छुट उपलब्ध छ।" : "Orders over रु 25,000 qualify for subsidized freight to Pokhara, Biratnagar, Narayangarh, and Butwal.",
    },
  ];

  return (
    <main className="relative min-h-screen bg-neutral-950 text-neutral-100 pt-28 pb-16 sm:pt-32 px-4 sm:px-6 lg:px-6 xl:px-10 overflow-hidden">
      {/* Glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[700px] rounded-full bg-amber-500/8 blur-[160px]" />

      <div className="relative mx-auto max-w-[1440px] space-y-14">
        {/* HERO */}
        <div className="mx-auto max-w-3xl text-center space-y-5 pt-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-bold tracking-[0.2em] text-amber-400 uppercase backdrop-blur-md">
            <Tag className="size-3.5" />
            {language === "ne" ? "आधिकारिक २०२६ मूल्य दर सूची" : "Official 2026 Rate Schedule"}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            {language === "ne" ? "उत्पादन " : "Product "}
            <span className="gold-gradient-text">
              {language === "ne" ? "मूल्य सूची तथा दर पत्र" : "Pricing & Rate Card"}
            </span>
          </h1>
          <p className="text-sm leading-relaxed text-neutral-300 sm:text-base max-w-2xl mx-auto">
            {language === "ne"
              ? "गुरु बल्बका प्रमाणित एलईडी उत्पादनहरूका लागि पारदर्शी खुद्रा मूल्य, अधिकृत डिलर नाफा दर, र थोक अर्डर दर सूची।"
              : "Transparent retail pricing, verified authorized dealer margins, and bulk volume contract rates for certified Guru Bulbs LED products."}
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href={getLocalizedHref("/contact")}
              className={buttonVariants({ variant: "brand", size: "cta-lg" })}
            >
              <FileText className="size-4" />
              {language === "ne" ? "आधिकारिक PDF दर पत्र अनुरोध गर्नुहोस्" : "Request Official PDF Quotation"}
            </Link>
          </div>
        </div>

        {/* TIER CARDS */}
        <div className="grid gap-6 sm:grid-cols-3">
          {tiers.map((item) => (
            <div
              key={item.tier}
              className={`rounded-3xl border ${item.borderCls} ${item.bgCls} p-6 backdrop-blur-xl space-y-2`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-neutral-400">
                  {item.tier}
                </span>
                <Badge className={`text-[10px] ${item.badgeCls}`}>
                  {item.badge}
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* DYNAMIC TABLE */}
        <PriceListTable products={products} />

        {/* COMMERCIAL TERMS */}
        <div className="rounded-[32px] border border-amber-500/25 bg-neutral-900/70 p-8 sm:p-10 backdrop-blur-2xl space-y-6">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-400">
            <Info className="size-4" />{" "}
            {language === "ne" ? "व्यावसायिक सर्तहरू र वारेन्टी ग्यारेन्टी" : "Commercial Terms & Warranty Guarantees"}
          </div>
          <div className="grid gap-6 sm:grid-cols-3 text-xs text-neutral-300 leading-relaxed">
            {commercialTerms.map((item) => (
              <div key={item.title} className="space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-white">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  {item.title}
                </div>
                <p className="text-neutral-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-[32px] border border-amber-500/30 bg-neutral-900 p-8 sm:p-10 text-center space-y-4 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t("customQuoteTitle")}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto">
            {t("customQuoteDesc")}
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href={getLocalizedHref("/contact")}
              className={buttonVariants({ variant: "brand", size: "cta-lg" })}
            >
              {t("contactSalesTeam")} <ArrowRight className="size-4" />
            </Link>
            <Link
              href={getLocalizedHref("/dealership")}
              className={buttonVariants({ variant: "brandOutline", size: "cta-lg" })}
            >
              {t("registerAsDealer")}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
