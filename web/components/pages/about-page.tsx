"use client";

import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Cpu,
  Flame,
  BadgeCheck,
  Factory,
  ArrowRight,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/providers/language-provider";

export function AboutPageClient({ settings }: { settings: any }) {
  const { language, t } = useLanguage();

  const companyName = settings?.companyName || "Guru Bulbs";
  const phone = settings?.phone || "+977 9812345678";
  const email = settings?.email || "hello@gurubulbs.com";
  const address =
    settings?.address || "Sankhamul Road, New Baneshwor, Kathmandu";

  const companyDesc =
    language === "ne"
      ? (settings?.footerDescriptionNe || t("heroDescription"))
      : (settings?.footerDescription || t("heroDescription"));

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 pt-28 pb-16 sm:pt-32 px-4 sm:px-6 lg:px-6 xl:px-10 overflow-hidden">
      {/* GLOWING AMBER RADIAL BACKGROUND AURA */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[700px] rounded-full bg-amber-500/10 blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1440px] space-y-16">
        {/* HERO SECTION */}
        <div className="mx-auto max-w-3xl text-center space-y-5 pt-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-bold tracking-[0.2em] text-amber-400 uppercase backdrop-blur-md">
            <Sparkles className="size-3.5 text-amber-400" />
            {t("aboutBadge")}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            {t("aboutTitlePrefix")}{" "}
            <span className="gold-gradient-text">{companyName}</span>
          </h1>
          <p className="text-base leading-relaxed text-neutral-300 sm:text-lg max-w-2xl mx-auto">
            {companyDesc}
          </p>
        </div>

        {/* METRICS STATS GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-amber-500/25 bg-neutral-900/60 p-6 backdrop-blur-xl text-center space-y-2 shadow-xl hover:border-amber-400/50 transition-all">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 gold-gradient-text">
              {t("aboutStat1Val")}
            </div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-neutral-300">
              {t("aboutStat1Title")}
            </p>
            <p className="text-[11px] text-neutral-400">
              {t("aboutStat1Desc")}
            </p>
          </div>

          <div className="rounded-3xl border border-amber-500/25 bg-neutral-900/60 p-6 backdrop-blur-xl text-center space-y-2 shadow-xl hover:border-amber-400/50 transition-all">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 gold-gradient-text">
              {t("aboutStat2Val")}
            </div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-neutral-300">
              {t("aboutStat2Title")}
            </p>
            <p className="text-[11px] text-neutral-400">
              {t("aboutStat2Desc")}
            </p>
          </div>

          <div className="rounded-3xl border border-amber-500/25 bg-neutral-900/60 p-6 backdrop-blur-xl text-center space-y-2 shadow-xl hover:border-amber-400/50 transition-all">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 gold-gradient-text">
              {t("aboutStat3Val")}
            </div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-neutral-300">
              {t("aboutStat3Title")}
            </p>
            <p className="text-[11px] text-neutral-400">
              {t("aboutStat3Desc")}
            </p>
          </div>

          <div className="rounded-3xl border border-amber-500/25 bg-neutral-900/60 p-6 backdrop-blur-xl text-center space-y-2 shadow-xl hover:border-amber-400/50 transition-all">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 gold-gradient-text">
              {t("aboutStat4Val")}
            </div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-neutral-300">
              {t("aboutStat4Title")}
            </p>
            <p className="text-[11px] text-neutral-400">
              {t("aboutStat4Desc")}
            </p>
          </div>
        </div>

        {/* OUR STORY CARD */}
        <div className="rounded-[32px] border border-amber-500/30 bg-neutral-900/70 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold text-amber-400 uppercase tracking-widest">
            <ShieldCheck className="size-4" /> {t("storyBadge")}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t("storyTitle")}
          </h2>
          <div className="grid gap-6 lg:grid-cols-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
            <p>
              {companyName} {t("aboutStoryParagraph1")}
            </p>
            <p>
              {t("aboutStoryParagraph2")}
            </p>
          </div>

          {/* DYNAMIC CMS CONTACT BAR */}
          <div className="pt-6 border-t border-amber-500/15 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 text-xs text-neutral-300">
              <Phone className="size-4 text-amber-400 shrink-0" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-neutral-300">
              <Mail className="size-4 text-amber-400 shrink-0" />
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-neutral-300">
              <MapPin className="size-4 text-amber-400 shrink-0" />
              <span className="truncate">{address}</span>
            </div>
          </div>
        </div>

        {/* OUR CORE PRINCIPLES */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t("pillarsTitle")}
            </h2>
            <p className="text-xs text-neutral-400">
              {t("pillarsDesc")}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-amber-500/20 bg-neutral-900/60 p-6 backdrop-blur-xl space-y-3 transition-all hover:border-amber-400/50 hover:-translate-y-1">
              <div className="size-12 flex items-center justify-center rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <Cpu className="size-6" />
              </div>
              <h3 className="text-base font-bold text-white">
                {t("pillar1Title")}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {t("pillar1Desc")}
              </p>
            </div>

            <div className="rounded-3xl border border-amber-500/20 bg-neutral-900/60 p-6 backdrop-blur-xl space-y-3 transition-all hover:border-amber-400/50 hover:-translate-y-1">
              <div className="size-12 flex items-center justify-center rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <Flame className="size-6" />
              </div>
              <h3 className="text-base font-bold text-white">
                {t("pillar2Title")}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {t("pillar2Desc")}
              </p>
            </div>

            <div className="rounded-3xl border border-amber-500/20 bg-neutral-900/60 p-6 backdrop-blur-xl space-y-3 transition-all hover:border-amber-400/50 hover:-translate-y-1">
              <div className="size-12 flex items-center justify-center rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <BadgeCheck className="size-6" />
              </div>
              <h3 className="text-base font-bold text-white">
                {t("pillar3Title")}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {t("pillar3Desc")}
              </p>
            </div>

            <div className="rounded-3xl border border-amber-500/20 bg-neutral-900/60 p-6 backdrop-blur-xl space-y-3 transition-all hover:border-amber-400/50 hover:-translate-y-1">
              <div className="size-12 flex items-center justify-center rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <Factory className="size-6" />
              </div>
              <h3 className="text-base font-bold text-white">
                {t("pillar4Title")}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {t("pillar4Desc")}
              </p>
            </div>
          </div>
        </div>

        {/* CTA BANNER */}
        <div className="rounded-[32px] border border-amber-500/30 bg-neutral-900 p-8 sm:p-12 text-center space-y-5 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            {t("aboutCtaTitle")}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto">
            {t("aboutCtaDesc")}
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/products"
              className={buttonVariants({ variant: "brand", size: "cta-lg" })}
            >
              {t("viewAllProducts")} <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/dealership"
              className={buttonVariants({ variant: "brandOutline", size: "cta-lg" })}
            >
              {t("becomeDealer")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
