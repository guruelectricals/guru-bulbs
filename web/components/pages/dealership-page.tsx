"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Award,
  ShieldCheck,
  Zap,
  BarChart3,
  Users,
  Truck,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { DealershipApplicationForm } from "@/components/dealership-application-form";
import { useLanguage } from "@/providers/language-provider";

export function DealershipPageClient() {
  const { language, t } = useLanguage();

  const getLocalizedHref = (href: string) => {
    if (language === "ne") {
      if (href.startsWith("/ne")) return href;
      const cleanHref = href.startsWith("/") ? href : `/${href}`;
      return `/ne${cleanHref === "/" ? "" : cleanHref}`;
    }
    return href.replace(/^\/ne/, "") || "/";
  };

  const dealerBenefits = [
    {
      icon: BarChart3,
      title: language === "ne" ? "उच्च खुद्रा फाइदा (Margin)" : "High Retail Margins",
      metric: language === "ne" ? "विशेष थोक दरहरू" : "Exclusive Wholesale Tiers",
      desc: language === "ne" ? "वितरकको नाफा बढाउन विशेष व्यावसायिक मार्जिन र त्रैमासिक भोल्युम रिबेटहरू।" : "Structured profit margins and quarterly volume rebates engineered to maximize distributor returns.",
    },
    {
      icon: Users,
      title: language === "ne" ? "मार्केटिङ र पसल सहयोग" : "Marketing & POS Support",
      metric: language === "ne" ? "ब्रान्डेड डिस्प्ले बोर्डहरू" : "Branded In-Store Displays",
      desc: language === "ne" ? "पसलका लागि ब्रान्डेड डिस्प्ले, एक्रिलिक लाइट टेस्टिङ स्ट्यान्ड र डिजिटल सामग्रीहरू।" : "Receive customized point-of-sale store displays, acrylic light testing stands, and digital assets.",
    },
    {
      icon: ShieldCheck,
      title: language === "ne" ? "२-वर्षे वारेन्टी सुरक्षा" : "2-Year Warranty Protection",
      metric: language === "ne" ? "सजिलो सट्टा सुविधा" : "Hassle-Free Replacement",
      desc: language === "ne" ? "ग्राहक सन्तुष्टिका लागि काउन्टरबाटै सोझै सामान साट्ने सरल प्रक्रिया।" : "Direct over-the-counter warranty replacement procedures to keep your customers satisfied.",
    },
    {
      icon: Zap,
      title: language === "ne" ? "प्रमाणित गुणस्तरीय उत्पादन" : "Certified Product Quality",
      metric: language === "ne" ? "CE र ISO प्रमाणित" : "CE, ISO & RoHS Certified",
      desc: language === "ne" ? "भोल्टेज उतारचढाव रोक्ने प्रविधिसहितका उच्च ल्युमेन एलईडी बल्ब र प्यानलहरू।" : "Access Nepal's complete catalog of surge-protected, high lumen LED bulbs, panels, and floodlights.",
    },
    {
      icon: Truck,
      title: language === "ne" ? "द्रुत डेलिभरी सञ्जाल" : "Rapid Dispatch Network",
      metric: language === "ne" ? "देशभरि आपूर्ति सञ्जाल" : "Nationwide Supply Chain",
      desc: language === "ne" ? "काठमाडौँ उपत्यका र मुख्य क्षेत्रीय केन्द्रहरूमा नियमित र भरपर्दो आपूर्ति।" : "Dependable dispatch routines across Kathmandu Valley and regional distribution hubs.",
    },
    {
      icon: Award,
      title: language === "ne" ? "समर्पित खाता प्रबन्धक" : "Dedicated Account Lead",
      metric: language === "ne" ? "प्रत्यक्ष सम्पर्क व्यक्ति" : "Direct Manager Contact",
      desc: language === "ne" ? "प्राथमिकताका आधारमा अर्डर र ढुवानी समन्वयका लागि व्यक्तिगत एकाउन्ट म्यानेजर।" : "Personal account manager for priority stock orders, custom quotes, and logistical coordination.",
    },
  ];

  const onboardingSteps = [
    {
      step: "01",
      title: language === "ne" ? "फारम बुझाउनुहोस्" : "Submit Inquiry",
      desc: language === "ne" ? "व्यवसाय दर्ता र स्थान विवरणसहित व्यापार आवेदन भर्नुहोस्।" : "Fill out the trade application with your business registration & location details.",
    },
    {
      step: "02",
      title: language === "ne" ? "खाता प्रमाणीकरण" : "Account Verification",
      desc: language === "ne" ? "हाम्रो बिक्री प्रतिनिधिले तपाईंको क्षेत्र र थोक मूल्य दर पुष्टि गर्नेछ।" : "Our sales executive reviews your territory and confirms wholesale pricing tiers.",
    },
    {
      step: "03",
      title: language === "ne" ? "प्रारम्भिक स्टक अर्डर" : "Initial Stock Order",
      desc: language === "ne" ? "पसलका लागि सुरुवाती सामान र मार्केटिङ सामग्री छनौट गर्नुहोस्।" : "Select your opening inventory mix with starter marketing displays and POS collateral.",
    },
    {
      step: "04",
      title: language === "ne" ? "आधिकारिक साझेदार" : "Official Partner Status",
      desc: language === "ne" ? "अधिकृत डिलर प्रमाण-पत्र प्राप्त गरी हाम्रो आधिकारिक सूचीमा जोडिनुहोस्।" : "Receive your Authorized Dealer Certificate and gain listing on our location finder.",
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Hero Section */}
      <section className="relative border-b border-amber-500/15 bg-neutral-950 px-4 pt-28 pb-20 sm:px-8 sm:pt-36 lg:px-6 xl:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.25em] text-amber-400 uppercase backdrop-blur-md shadow-[0_0_20px_rgba(240,188,25,0.15)] mb-6">
            <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
            {t("dealerProgramBadge")}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.08]">
            {t("partnerWithTitle")}{" "}
            <span className="gold-gradient-text font-serif italic drop-shadow-[0_0_25px_rgba(240,188,25,0.3)]">
              Guru Bulbs
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-300/90 sm:text-lg leading-relaxed font-normal tracking-wide">
            {t("dealerHeroDesc")}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#dealership-application">
              <Button
                size="lg"
                className="h-13 bg-amber-500 px-8 text-xs sm:text-sm font-bold tracking-wider uppercase text-neutral-950 rounded-full shadow-lg shadow-amber-500/25 transition-all duration-300 hover:bg-amber-400 hover:shadow-amber-500/40 hover:scale-[1.03]"
              >
                {t("dealershipEnquiry")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href={getLocalizedHref("/price-list")}>
              <Button
                size="lg"
                variant="outline"
                className="h-13 border-amber-500/30 bg-neutral-900/60 px-8 text-xs sm:text-sm font-bold tracking-wider uppercase text-neutral-200 rounded-full backdrop-blur-md hover:border-amber-500/60 hover:text-amber-400"
              >
                {t("viewWholesaleCat")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="border-b border-amber-500/15 px-4 py-20 sm:px-8 lg:px-6 xl:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-[11px] font-bold tracking-[0.2em] uppercase text-amber-400">
              {t("partnerAdvantages")}
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-5xl">
              {t("whyDealersChooseUs")}
            </h2>
            <p className="mt-3 text-sm text-neutral-400">
              {t("dealerAdvantagesDesc")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {dealerBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="group relative flex flex-col justify-between rounded-3xl border border-amber-500/20 bg-neutral-900/60 p-7 sm:p-8 backdrop-blur-2xl transition-all duration-400 hover:border-amber-400 hover:bg-neutral-900 hover:shadow-[0_10px_40px_-10px_rgba(240,188,25,0.25)] hover:-translate-y-2"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex size-12 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-[0_0_20px_rgba(240,188,25,0.15)] transition-all duration-300 group-hover:bg-amber-500 group-hover:text-neutral-950 group-hover:scale-110">
                        <Icon className="size-6" strokeWidth={2} />
                      </div>
                      <span className="rounded-full border border-amber-500/30 bg-neutral-950/80 px-3 py-1 text-[11px] font-extrabold tracking-widest text-amber-400 font-mono">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-amber-400">
                      {benefit.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-neutral-400">
                      {benefit.desc}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-amber-500/10 pt-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[11px] font-bold text-amber-400">
                      <CheckCircle2 className="size-3.5 text-amber-400" />
                      {benefit.metric}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Onboarding Timeline Section */}
      <section className="border-b border-amber-500/15 px-4 py-20 sm:px-8 lg:px-6 xl:px-10 bg-neutral-950/80">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-[11px] font-bold tracking-[0.2em] uppercase text-amber-400">
              {t("simpleOnboarding")}
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-5xl">
              {t("howToBecomeDealer")}
            </h2>
            <p className="mt-3 text-sm text-neutral-400">
              {t("onboardingDesc")}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {onboardingSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative rounded-3xl border border-amber-500/20 bg-neutral-900/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-amber-500/40 hover:bg-neutral-900/80"
              >
                <span className="text-3xl font-black text-amber-500/30 font-mono">
                  {step.step}
                </span>
                <h3 className="mt-3 text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="dealership-application"
        className="border-b border-amber-500/15 px-4 py-20 sm:px-8 lg:px-6 xl:px-10"
      >
        <div className="mx-auto max-w-4xl">
          <DealershipApplicationForm />
        </div>
      </section>

      {/* B2B Contact Section */}
      <section className="px-4 py-20 sm:px-8 lg:px-6 xl:px-10">
        <div className="mx-auto max-w-4xl rounded-3xl border border-amber-500/30 bg-neutral-900/70 p-8 sm:p-12 backdrop-blur-2xl text-center shadow-[0_0_50px_-10px_rgba(240,188,25,0.15)]">
          <h2 className="text-3xl font-extrabold text-white mb-2">
            {t("speakB2bExec")}
          </h2>
          <p className="text-xs text-neutral-400 mb-10">
            {t("speakB2bDesc")}
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Phone, label: language === "ne" ? "प्रत्यक्ष फोन" : "Direct Phone", value: "+977 9812345678" },
              {
                icon: Mail,
                label: language === "ne" ? "थोक इमेल" : "B2B Email",
                value: "dealers@gurubulbs.com",
              },
              {
                icon: MapPin,
                label: language === "ne" ? "मुख्य कार्यालय" : "Headquarters",
                value: "Sankhamul Road, New Baneshwor",
              },
            ].map((contact, idx) => {
              const Icon = contact.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-amber-500/20 bg-neutral-950/80 p-6 text-center transition-all duration-300 hover:border-amber-400"
                >
                  <div className="flex justify-center mb-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-amber-400/80 mb-1">
                    {contact.label}
                  </p>
                  <p className="text-xs font-bold text-white">
                    {contact.value}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <Link href="#dealership-application">
              <Button
                size="lg"
                className="h-13 bg-amber-500 px-8 text-xs font-bold tracking-wider uppercase text-neutral-950 rounded-full shadow-lg shadow-amber-500/25 transition-all duration-300 hover:bg-amber-400 hover:shadow-amber-500/40 hover:scale-[1.03]"
              >
                {t("startApplication")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
