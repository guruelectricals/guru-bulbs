"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/providers/language-provider";
import type { TranslationKey } from "@/lib/i18n";

const initialFormData = {
  businessName: "",
  owner: "",
  phone: "",
  email: "",
  address: "",
  pan: "",
  website: "",
  businessDuration: "",
  currentProducts: "",
  interests: [] as string[],
  territory: "",
  businessDescription: "",
};

const productInterests = [
  { key: "LED Bulbs" as TranslationKey, labelEn: "LED Bulbs", labelNe: "एलईडी बल्बहरू" },
  { key: "Surface Panel Lights" as TranslationKey, labelEn: "Panel Lights", labelNe: "प्यानल लाइटहरू" },
  { key: "Flood Lights" as TranslationKey, labelEn: "Flood Lights", labelNe: "फ्लड लाइटहरू" },
  { key: "Outdoor Lights" as TranslationKey, labelEn: "Outdoor Lights", labelNe: "आउटडोर लाइटहरू" },
  { key: "Rechargeable LED Lights" as TranslationKey, labelEn: "Rechargeable", labelNe: "रिचार्जएबल लाइट" },
  { key: "LED Tubelights" as TranslationKey, labelEn: "Tubelights", labelNe: "ट्युबलाइटहरू" },
  { key: "Special Lights" as TranslationKey, labelEn: "Specialty Lighting", labelNe: "विशेष लाइटिङ" },
  { key: "All Products" as TranslationKey, labelEn: "All Products", labelNe: "सबै उत्पादनहरू" },
];

const fieldClassName =
  "h-11 rounded-xl border-amber-500/20 bg-neutral-950/80 px-4 text-sm text-white placeholder:text-neutral-500 focus:border-amber-500";

export function DealershipApplicationForm() {
  const { language, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState(initialFormData);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/dealership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "Failed to submit the dealership application.");
      }

      setFormData(initialFormData);
      setSubmitted(true);
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleInterestChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = event.target;
    setFormData((prev) => {
      const interests = prev.interests.includes(value)
        ? prev.interests.filter((item) => item !== value)
        : [...prev.interests, value];
      return { ...prev, interests };
    });
  }

  return (
    <div className="rounded-3xl border border-amber-500/30 bg-neutral-900/70 p-6 shadow-[0_0_50px_-10px_rgba(240,188,25,0.15)] sm:p-10 backdrop-blur-2xl">
      <div className="border-b border-amber-500/15 pb-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
          {t("tradeAppTitle")}
        </p>
        <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
          {t("dealershipFormTitle")}
        </h2>
        <p className="mt-2 text-sm text-neutral-400">
          {t("dealershipFormDesc")}
        </p>
      </div>

      {submitted ? (
        <div className="my-10 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-8 text-center backdrop-blur-xl">
          <CheckCircle2 className="mx-auto size-10 text-amber-400" />
          <h3 className="mt-4 text-xl font-bold text-white">
            {t("appReceived")}
          </h3>
          <p className="mt-2 text-sm text-neutral-300">
            {t("appThankYou")}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          <fieldset>
            <legend className="text-sm font-bold text-white">
              {t("step1BizInfo")}
            </legend>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <Field label={t("bizName")} required>
                <Input
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder={language === "ne" ? "तपाईंको व्यवसाय / पसलको नाम" : "Your business / shop name"}
                  className={fieldClassName}
                  required
                />
              </Field>
              <Field label={t("bizOwner")} required>
                <Input
                  name="owner"
                  value={formData.owner}
                  onChange={handleChange}
                  placeholder={language === "ne" ? "सञ्चालकको पुरा नाम" : "Full name of the owner"}
                  className={fieldClassName}
                  required
                />
              </Field>
              <Field label={t("contactNumber")} required>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="98XXXXXXXX"
                  className={fieldClassName}
                  required
                />
              </Field>
              <Field label={language === "ne" ? "इमेल ठेगाना" : "Email Address"} required>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="you@example.com"
                  className={fieldClassName}
                  required
                />
              </Field>
              <Field label={t("companyAddress")} required className="sm:col-span-2">
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder={language === "ne" ? "शहर, जिल्ला, प्रदेश" : "City, District, Province"}
                  className={fieldClassName}
                  required
                />
              </Field>
              <Field label={t("panNumber")}>
                <Input
                  name="pan"
                  value={formData.pan}
                  onChange={handleChange}
                  placeholder="e.g. 123456789"
                  className={fieldClassName}
                />
              </Field>
              <Field label={t("websiteSocial")}>
                <Input
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder={language === "ne" ? "फेसबुक पेज, वेबसाइट, इत्यादि (वैकल्पिक)" : "Facebook page, website, etc. (optional)"}
                  className={fieldClassName}
                />
              </Field>
            </div>
          </fieldset>

          <fieldset className="border-t border-amber-500/15 pt-8">
            <legend className="text-sm font-bold text-white">
              {t("step2BizDetails")}
            </legend>
            <div className="mt-4 space-y-5">
              <Field label={t("durationLabel")} required>
                <select
                  name="businessDuration"
                  value={formData.businessDuration}
                  onChange={handleChange}
                  className={`${fieldClassName} w-full`}
                  required
                >
                  <option value="" disabled>
                    {language === "ne" ? "अवधि छनौट गर्नुहोस्" : "Select duration"}
                  </option>
                  <option>{language === "ne" ? "१ वर्षभन्दा कम" : "Less than 1 year"}</option>
                  <option>{language === "ne" ? "१–३ वर्ष" : "1–3 years"}</option>
                  <option>{language === "ne" ? "३–५ वर्ष" : "3–5 years"}</option>
                  <option>{language === "ne" ? "५ वर्षभन्दा बढी" : "More than 5 years"}</option>
                </select>
              </Field>
              <Field label={t("productsCurrentLabel")} required>
                <Textarea
                  name="currentProducts"
                  value={formData.currentProducts}
                  onChange={handleChange}
                  placeholder={language === "ne" ? "उदाहरण: एलईडी बल्ब, विद्युतीय सामान, घरायसी उपकरण..." : "e.g. LED bulbs, electrical items, home appliances..."}
                  className="min-h-24 rounded-xl border-amber-500/20 bg-neutral-950/80 p-4 text-sm text-white placeholder:text-neutral-500 focus:border-amber-500"
                  required
                />
              </Field>
              <div>
                <p className="text-xs font-bold text-neutral-200">
                  {t("interestedProductsLabel")}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {productInterests.map((product) => (
                    <label
                      key={product.labelEn}
                      className="flex items-center gap-2 rounded-lg border border-amber-500/15 bg-neutral-950/60 px-3 py-2 text-xs text-neutral-300"
                    >
                      <input
                        type="checkbox"
                        name="interests"
                        value={product.labelEn}
                        checked={formData.interests.includes(product.labelEn)}
                        onChange={handleInterestChange}
                        className="accent-amber-500"
                      />
                      {language === "ne" ? product.labelNe : product.labelEn}
                    </label>
                  ))}
                </div>
              </div>
              <Field label={t("preferredTerritory")}>
                <Input
                  name="territory"
                  value={formData.territory}
                  onChange={handleChange}
                  placeholder={language === "ne" ? "उदाहरण: काठमाडौँ उपत्यका, पोखरा, चितवन..." : "e.g. Kathmandu Valley, Pokhara, Chitwan..."}
                  className={fieldClassName}
                />
              </Field>
            </div>
          </fieldset>

          <fieldset className="border-t border-amber-500/15 pt-8">
            <legend className="text-sm font-bold text-white">
              {t("step3AddInfo")}
            </legend>
            <div className="mt-4">
              <Field label={t("tellUsBiz")}>
                <Textarea
                  name="businessDescription"
                  value={formData.businessDescription}
                  onChange={handleChange}
                  placeholder={language === "ne" ? "तपाईंको व्यवसायको छोटो विवरण, आउटलेटहरूको संख्या, मासिक बिक्री परिमाण, आदि।" : "Brief description of your business, number of outlets, monthly sales volume, etc."}
                  className="min-h-32 rounded-xl border-amber-500/20 bg-neutral-950/80 p-4 text-sm text-white placeholder:text-neutral-500 focus:border-amber-500"
                />
              </Field>
            </div>
          </fieldset>

          <div className="flex flex-col-reverse gap-4 border-t border-amber-500/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-neutral-400">
              {t("requiredFieldsNote")}
            </p>
            {errorMessage ? (
              <p className="text-sm text-red-300">{errorMessage}</p>
            ) : null}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 rounded-full bg-amber-500 px-6 text-xs font-extrabold uppercase tracking-wider text-neutral-950 hover:bg-amber-400 shadow-lg shadow-amber-500/25 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : t("submit")} <Send className="ml-2 size-4" />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  required = false,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className || ""}`}>
      <span className="mb-2 block text-xs font-bold text-neutral-200">
        {label}
        {required && <span className="ml-1 text-amber-400">*</span>}
      </span>
      {children}
    </label>
  );
}
