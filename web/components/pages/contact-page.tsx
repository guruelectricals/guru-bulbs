"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import type { Settings } from "@/types/settings";
import { ContactForm } from "@/components/contact-form";
import { useLanguage } from "@/providers/language-provider";
import { CONTACT_FAQS } from "@/lib/constants";

const MAP_LAT = 27.6899;
const MAP_LNG = 85.3346;
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${MAP_LAT},${MAP_LNG}&z=16&output=embed`;

export function ContactPageClient({ settings }: { settings: Settings | null }) {
  const { language, t } = useLanguage();

  const email = settings?.email || "hello@gurubulbs.com";
  const phone = settings?.phone || "+977 9812345678";
  const secondaryPhone = settings?.secondaryPhone;
  const address =
    settings?.address || "Sankhamul Road, New Baneshwor, Kathmandu, Nepal";
  const businessHours =
    language === "ne"
      ? "आइत - शुक्र: बिहान ९:०० - साँझ ६:०० (शनिबार: बन्द)"
      : (settings?.businessHours || "Sun - Fri: 9:00 AM - 6:00 PM (Saturday: Closed)");

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* HERO SECTION */}
      <section className="relative border-b border-amber-500/15 bg-neutral-950 px-4 pt-28 pb-20 sm:px-6 sm:pt-36 lg:px-6 xl:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.25em] text-amber-400 uppercase backdrop-blur-md shadow-[0_0_20px_rgba(240,188,25,0.15)] mb-6">
            <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
            {t("contactBadge")}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.08]">
            {t("contactHeroTitlePrefix")}{" "}
            <span className="gold-gradient-text font-serif italic drop-shadow-[0_0_25px_rgba(240,188,25,0.3)]">
              {t("contactHeroTitleSuffix")}
            </span>
          </h1>
          <p className="mt-5 text-base text-neutral-300/90 sm:text-lg max-w-xl mx-auto leading-relaxed">
            {t("contactHeroDesc")}
          </p>
        </div>
      </section>

      {/* CONTACT INFO & FORM SECTION */}
      <section className="border-b border-amber-500/15 px-4 py-20 sm:px-6 lg:px-6 xl:px-10">
        <div className="mx-auto max-w-[1440px] space-y-16">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* CONTACT INFO COLUMN */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-amber-400 uppercase">
                  {t("reachOutDirect")}
                </span>
                <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
                  {t("contactInfoTitle")}
                </h2>
              </div>

              <div className="space-y-4">
                <a
                  href={`mailto:${email}`}
                  className="group flex gap-4 rounded-3xl border border-amber-500/20 bg-neutral-900/60 p-5 backdrop-blur-2xl transition-all duration-300 hover:border-amber-400 hover:bg-neutral-900 hover:-translate-y-1"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-[0_0_20px_rgba(240,188,25,0.15)] transition-all duration-300 group-hover:bg-amber-500 group-hover:text-neutral-950">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold tracking-wider uppercase text-neutral-400">
                      {t("emailUs")}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                      {email}
                    </p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      {language === "ne" ? "हामी २४ घण्टाभित्र जवाफ दिन्छौँ" : "We respond within 24 hours"}
                    </p>
                  </div>
                </a>

                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="group flex gap-4 rounded-3xl border border-amber-500/20 bg-neutral-900/60 p-5 backdrop-blur-2xl transition-all duration-300 hover:border-amber-400 hover:bg-neutral-900 hover:-translate-y-1"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-[0_0_20px_rgba(240,188,25,0.15)] transition-all duration-300 group-hover:bg-amber-500 group-hover:text-neutral-950">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold tracking-wider uppercase text-neutral-400">
                      {t("phoneSupport")}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                      {phone}
                    </p>
                    {secondaryPhone && (
                      <p className="mt-1 text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                        {secondaryPhone}
                      </p>
                    )}
                    <p className="text-[11px] text-neutral-400 mt-1">
                      {language === "ne" ? "आइत - शुक्र, बिहान ९:०० - साँझ ६:००" : "Sun - Fri, 9:00 AM - 6:00 PM NPT"}
                    </p>
                  </div>
                </a>

                <div className="group flex gap-4 rounded-3xl border border-amber-500/20 bg-neutral-900/60 p-5 backdrop-blur-2xl transition-all duration-300 hover:border-amber-400 hover:bg-neutral-900">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-[0_0_20px_rgba(240,188,25,0.15)] transition-all duration-300 group-hover:bg-amber-500 group-hover:text-neutral-950">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold tracking-wider uppercase text-neutral-400">
                      {t("headquarters")}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-white whitespace-pre-line">
                      {address}
                    </p>
                  </div>
                </div>

                <div className="group flex gap-4 rounded-3xl border border-amber-500/20 bg-neutral-900/60 p-5 backdrop-blur-2xl transition-all duration-300 hover:border-amber-400 hover:bg-neutral-900">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-[0_0_20px_rgba(240,188,25,0.15)] transition-all duration-300 group-hover:bg-amber-500 group-hover:text-neutral-950">
                    <Clock className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold tracking-wider uppercase text-neutral-400">
                      {t("showroomHours")}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-white whitespace-pre-line">
                      {businessHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FORM COLUMN */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>

          {/* FULL-WIDTH INTERACTIVE MAP BELOW FORM & DETAILS */}
          <div className="overflow-hidden rounded-3xl border border-amber-500/25 bg-neutral-900/70 backdrop-blur-2xl shadow-2xl space-y-3 p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <MapPin className="size-5 text-amber-400" />
              <h3 className="text-sm font-bold tracking-wider uppercase text-white">
                {t("findUsMap")}
              </h3>
            </div>
            <div className="relative w-full aspect-[21/9] min-h-[320px] overflow-hidden rounded-2xl border border-amber-500/15">
              <iframe
                title="Guru Bulbs Location"
                src={MAP_EMBED_SRC}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section
        id="faq"
        className="bg-neutral-950/80 px-4 py-20 sm:px-6 lg:px-6 xl:px-10"
      >
        <div className="mx-auto max-w-4xl">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-[11px] font-bold tracking-[0.2em] uppercase text-amber-400">
              {t("faqHelpCenter")}
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
              {t("faqTitle")}
            </h2>
            <p className="mt-2 text-xs text-neutral-400">
              {language === "ne"
                ? "एलईडी विशेषताहरू, वारेन्टी र व्यापार सम्बन्धी सोधिने प्रश्नहरू।"
                : "Quick answers regarding LED specs, warranties, and trade setups."}
            </p>
          </div>

          <Accordion
            defaultValue={["faq-0"]}
            className="overflow-hidden rounded-3xl border border-amber-500/20 bg-neutral-900/60 backdrop-blur-2xl"
          >
            {CONTACT_FAQS.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border-b border-amber-500/10 last:border-0"
              >
                <AccordionTrigger className="px-6 py-5 text-sm font-bold text-white hover:no-underline hover:text-amber-400 transition-colors">
                  {t(faq.qKey) || faq.defaultQ}
                </AccordionTrigger>
                <AccordionContent className="border-t border-amber-500/10 bg-neutral-950/60 px-6 pt-4 pb-5 text-xs leading-relaxed text-neutral-300">
                  {t(faq.aKey) || faq.defaultA}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
