"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/providers/language-provider";

const initialFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "Failed to submit the form.");
      }

      setFormData(initialFormData);
      setIsSubmitted(true);
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-amber-500/30 bg-neutral-900/70 p-8 sm:p-10 backdrop-blur-2xl shadow-[0_0_50px_-10px_rgba(240,188,25,0.15)]">
      <div className="flex items-center justify-between border-b border-amber-500/15 pb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t("sendMessageTitle")}
          </h2>
          <p className="mt-1 text-xs text-neutral-400">
            {language === "ne"
              ? "तलको फारम भर्नुहोस् र हाम्रो टोलीले तुरुन्तै जवाफ दिनेछ।"
              : "Fill out the form below and our lighting team will respond promptly."}
          </p>
        </div>
        <Sparkles className="size-6 text-amber-400" />
      </div>

      {isSubmitted ? (
        <div className="my-12 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-8 text-center backdrop-blur-xl">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-amber-500 text-neutral-950 font-bold mb-4">
            ✓
          </div>
          <h3 className="text-xl font-bold text-white">
            {t("inquiryReceived")}
          </h3>
          <p className="mt-2 text-xs text-neutral-300">
            {t("inquiryThankYou")}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-bold tracking-wider uppercase text-amber-400/90 mb-2"
              >
                {language === "ne" ? "पुरा नाम" : "Full Name"}
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder={language === "ne" ? "तपाईंको नाम" : "Your Name"}
                className="h-12 rounded-xl border-amber-500/20 bg-neutral-950/80 px-4 text-sm text-white placeholder:text-neutral-500 focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold tracking-wider uppercase text-amber-400/90 mb-2"
              >
                {language === "ne" ? "इमेल ठेगाना" : "Email Address"}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="h-12 rounded-xl border-amber-500/20 bg-neutral-950/80 px-4 text-sm text-white placeholder:text-neutral-500 focus:border-amber-500"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-xs font-bold tracking-wider uppercase text-amber-400/90 mb-2"
            >
              {language === "ne" ? "विषय" : "Subject"}
            </label>
            <Input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder={language === "ne" ? "उत्पादन कोड, थोक अर्डर, वा डिलरशिप सोधपुछ" : "Product code, wholesale order, or dealership inquiry"}
              className="h-12 rounded-xl border-amber-500/20 bg-neutral-950/80 px-4 text-sm text-white placeholder:text-neutral-500 focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs font-bold tracking-wider uppercase text-amber-400/90 mb-2"
            >
              {language === "ne" ? "सन्देश" : "Message"}
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={language === "ne" ? "तपाईंको प्रश्न वा विवरण लेख्नुहोस्..." : "Detail your lighting specifications, order volume, or questions..."}
              rows={5}
              className="rounded-xl border-amber-500/20 bg-neutral-950/80 p-4 text-sm text-white placeholder:text-neutral-500 focus:border-amber-500"
              required
            />
          </div>

          {errorMessage ? (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {errorMessage}
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-13 w-full bg-amber-500 font-extrabold uppercase tracking-wider text-neutral-950 hover:bg-amber-400 text-xs sm:text-sm rounded-full shadow-lg shadow-amber-500/25 transition-all duration-300 hover:shadow-amber-500/40 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Submitting..." : `${t("submit")} `}
            <Send className="ml-2 size-4" />
          </Button>
        </form>
      )}
    </div>
  );
}