"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Lightbulb,
} from "lucide-react";

import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { SiteBranding } from "@/types/site-branding";
import { useSite } from "@/providers/site-provider";
import { useLanguage } from "@/providers/language-provider";
import { useVisitorCounter } from "@/hooks/use-visitor-counter";
import type { TranslationKey } from "@/lib/i18n";

export function Footer({ branding }: { branding?: SiteBranding } = {}) {
  const site = useSite();
  const { language, t } = useLanguage();
  const activeBranding = branding || site.branding;
  const visitorCount = useVisitorCounter();

  const phone = activeBranding.phone || "+977 9812345678";
  const email = activeBranding.email || "hello@gurubulbs.com";
  const address =
    activeBranding.address || "Sankhamul Road, New Baneshwor\nKathmandu, Nepal";

  const description =
    language === "ne"
      ? ((activeBranding as any).footerDescriptionNe || t("heroDescription"))
      : (activeBranding.footerDescription || t("heroDescription"));

  const currentYear = new Date().getFullYear();
  const rawCopyright = activeBranding.copyright?.trim();
  const copyrightText = rawCopyright
    ? rawCopyright.startsWith("©")
      ? rawCopyright
      : `© ${currentYear} ${rawCopyright}`
    : `© ${currentYear} ${activeBranding.companyName || "Guru Bulbs"}. ${t("allRightsReserved")}`;

  const getLocalizedHref = (href: string) => {
    if (language === "ne") {
      if (href.startsWith("/ne")) return href;
      const cleanHref = href.startsWith("/") ? href : `/${href}`;
      return `/ne${cleanHref === "/" ? "" : cleanHref}`;
    }
    return href.replace(/^\/ne/, "") || "/";
  };

  const quickLinks = [
    { href: "/products", labelKey: "products" as TranslationKey },
    { href: "/services", labelKey: "services" as TranslationKey },
    { href: "/about", labelKey: "aboutUs" as TranslationKey },
    { href: "/dealership", labelKey: "dealership" as TranslationKey },
    { href: "/price-list", labelKey: "viewPriceList" as TranslationKey },
  ];

  const resourceLinks = [
    { href: "/blog", labelKey: "blog" as TranslationKey },
    { href: "/videos", labelKey: "videos" as TranslationKey },
    { href: "/privacy-policy", labelKey: "privacyPolicyLink" as TranslationKey },
    { href: "/contact#faq", labelKey: "faqsLink" as TranslationKey },
    { href: "/contact", labelKey: "contactUs" as TranslationKey },
  ];

  return (
    <footer className="border-t border-amber-500/20 bg-neutral-950 text-neutral-100 px-4 sm:px-8 lg:px-6 xl:px-10">
      <div className="mx-auto max-w-[1440px] pt-14 pb-28 sm:pt-16 sm:pb-32">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* BRAND COLUMN */}
          <div className="space-y-4">
            <Link href={getLocalizedHref("/")} className="group flex items-center gap-1.5">
              {activeBranding.logoUrl ? (
                <Image
                  src={activeBranding.logoUrl}
                  alt={activeBranding.logoAlt || activeBranding.companyName}
                  width={100}
                  height={40}
                  className="size-10 object-contain drop-shadow-[0_0_14px_rgba(240,188,25,0.35)] transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <>
                  <Lightbulb className="size-8 shrink-0 text-amber-500 transition-colors group-hover:text-amber-400" strokeWidth={2.5} />
                  <span className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display transition-colors group-hover:text-white/90">
                    <span className="text-amber-500">{activeBranding.companyName.charAt(0)}</span>
                    {activeBranding.companyName.slice(1)}
                  </span>
                </>
              )}
            </Link>
            <p className="text-xs leading-relaxed text-neutral-400 whitespace-pre-line">
              {description}
            </p>

            {/* SOCIAL MEDIA LINKS */}
            <div className="pt-2 flex gap-2">
              <a
                href={activeBranding.facebook || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="border-amber-500/20 bg-neutral-900/60 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400 transition-all h-8 w-8 text-neutral-300"
                  title="Facebook"
                >
                  <FaFacebook className="h-3.5 w-3.5" />
                </Button>
              </a>
              <a
                href={activeBranding.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="border-amber-500/20 bg-neutral-900/60 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400 transition-all h-8 w-8 text-neutral-300"
                  title="Instagram"
                >
                  <FaInstagram className="h-3.5 w-3.5" />
                </Button>
              </a>
              <a
                href={activeBranding.tiktok || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="border-amber-500/20 bg-neutral-900/60 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400 transition-all h-8 w-8 text-neutral-300"
                  title="TikTok"
                >
                  <FaTiktok className="h-3.5 w-3.5" />
                </Button>
              </a>
              <a
                href={
                  activeBranding.whatsapp
                    ? `https://wa.me/${activeBranding.whatsapp.replace(/\D/g, "")}`
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="border-amber-500/20 bg-neutral-900/60 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400 transition-all h-8 w-8 text-neutral-300"
                  title="WhatsApp"
                >
                  <FaWhatsapp className="h-3.5 w-3.5" />
                </Button>
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-4 text-xs font-bold tracking-[0.18em] text-amber-400 uppercase">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.labelKey}>
                  <Link
                    href={getLocalizedHref(link.href)}
                    className="text-xs text-neutral-300 transition-all duration-200 hover:text-amber-400 hover:translate-x-1 inline-block"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="mb-4 text-xs font-bold tracking-[0.18em] text-amber-400 uppercase">
              {t("insightsResources")}
            </h3>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.labelKey}>
                  <Link
                    href={getLocalizedHref(link.href)}
                    className="text-xs text-neutral-300 transition-all duration-200 hover:text-amber-400 hover:translate-x-1 inline-block"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* GET IN TOUCH */}
          <div className="space-y-3">
            <h3 className="mb-4 text-xs font-bold tracking-[0.18em] text-amber-400 uppercase">
              {t("getInTouch")}
            </h3>

            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="flex items-start gap-3 group transition-all duration-200 hover:translate-x-1"
            >
              <Phone className="mt-0.5 size-4 flex-shrink-0 text-amber-400" />
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                  {t("phoneLabel")}
                </p>
                <p className="text-xs font-semibold text-neutral-200 group-hover:text-amber-400 transition-colors">
                  {phone}
                </p>
              </div>
            </a>

            <a
              href={`mailto:${email}`}
              className="flex items-start gap-3 group transition-all duration-200 hover:translate-x-1"
            >
              <Mail className="mt-0.5 size-4 flex-shrink-0 text-amber-400" />
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                  {t("emailLabel")}
                </p>
                <p className="text-xs font-semibold text-neutral-200 group-hover:text-amber-400 transition-colors">
                  {email}
                </p>
              </div>
            </a>

            <div className="flex items-start gap-3 group transition-all duration-200">
              <MapPin className="mt-0.5 size-4 flex-shrink-0 text-amber-400" />
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                  {t("addressLabel")}
                </p>
                <p className="text-xs font-semibold text-neutral-200 whitespace-pre-line">
                  {address}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mt-12 mb-6 bg-amber-500/10" />
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-xs text-neutral-500">
          <p className="text-center md:text-left">{copyrightText}</p>

          {/* VISITOR COUNTER */}
          <div className="flex items-center justify-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 justify-self-center shadow-[0_0_12px_rgba(245,158,11,0.15)] transition-all hover:border-amber-500/50">
            <span className="size-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
            <span className="font-bold tracking-wider uppercase text-amber-400 text-[11px]">
              {visitorCount !== null
                ? `${visitorCount.toLocaleString()} Visitors`
                : "Counting…"}
            </span>
          </div>


          <div className="hidden md:block" />
        </div>
      </div>
    </footer>
  );
}
