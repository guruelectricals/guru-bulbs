"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  X,
  Star,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Pencil,
} from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import type { TranslationKey } from "@/lib/i18n";
import type { SanityTestimonial } from "@/lib/queries";

type ReviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newReview: SanityTestimonial) => void;
};

export function ReviewModal({ isOpen, onClose, onSuccess }: ReviewModalProps) {
  const { language, t } = useLanguage();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("Customer");
  const [quote, setQuote] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Suggested roles
  const suggestions =
    language === "ne"
      ? ["ग्राहक", "ठेकेदार", "डिलर", "इलेक्ट्रिसियन", "घरधनी", "आर्किटेक्ट"]
      : [
          "Customer",
          "Contractor",
          "Retail Dealer",
          "Electrician",
          "Homeowner",
          "Architect",
        ];

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedRole = role.trim();
    const trimmedQuote = quote.trim();

    if (!trimmedName || trimmedName.length < 2) {
      setError(
        language === "ne"
          ? "कृपया आफ्नो पूरा नाम लेख्नुहोस् (कम्तिमा २ अक्षर)।"
          : "Please provide your full name (at least 2 characters)."
      );
      return;
    }

    if (!trimmedRole) {
      setError(
        language === "ne"
          ? "कृपया आफ्नो भूमिका वा पद छनोट गर्नुहोस्।"
          : "Please specify your role or customer title."
      );
      return;
    }

    if (!trimmedQuote || trimmedQuote.length < 5) {
      setError(
        language === "ne"
          ? "कृपया कम्तिमा ५ अक्षरको समीक्षा लेख्नुहोस्।"
          : "Please write a review with at least 5 characters."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          role: trimmedRole,
          quote: trimmedQuote,
          rating,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit review");
      }

      setIsSuccess(true);
      if (data.review) {
        onSuccess(data.review);
      }

      setTimeout(() => {
        setIsSuccess(false);
        setName("");
        setQuote("");
        setRole("Customer");
        setRating(5);
        onClose();
      }, 1500);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : t("reviewErrorMessage" as TranslationKey);
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingLabel = (stars: number) => {
    if (language === "ne") {
      switch (stars) {
        case 5:
          return "उत्कृष्ट (५/५)";
        case 4:
          return "धेरै राम्रो (४/५)";
        case 3:
          return "राम्रो (३/५)";
        case 2:
          return "ठिकै (२/५)";
        default:
          return "सुधार आवश्यक (१/५)";
      }
    }
    switch (stars) {
      case 5:
        return "Excellent (5/5)";
      case 4:
        return "Very Good (4/5)";
      case 3:
        return "Good (3/5)";
      case 2:
        return "Fair (2/5)";
      default:
        return "Needs Improvement (1/5)";
    }
  };

  const currentStars = hoverRating ?? rating;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={() => !isSubmitting && onClose()}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg rounded-3xl border border-amber-500/25 bg-neutral-900/95 p-6 sm:p-8 text-neutral-100 shadow-2xl backdrop-blur-2xl ring-1 ring-amber-500/20 z-10 transition-all animate-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Sparkles className="size-3 text-amber-400" />
              {t("reviewsBadge" as TranslationKey)}
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              {t("reviewModalTitle" as TranslationKey)}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              {t("reviewModalSubtitle" as TranslationKey)}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close dialog"
            className="rounded-full p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors shrink-0 disabled:opacity-50"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Success Message Banner */}
        {isSuccess ? (
          <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center space-y-3 animate-in fade-in duration-300">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="size-6" />
            </div>
            <h4 className="text-base font-bold text-white">
              {t("reviewSuccessMessage" as TranslationKey)}
            </h4>
            <p className="text-xs text-neutral-300">
              {language === "ne"
                ? "तपाईंको समीक्षा प्रत्यक्ष रूपमा साइटमा थपियो।"
                : "Your review is now live in the showcase."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs sm:text-sm text-rose-300">
                <AlertCircle className="size-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Rating Stars Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
                {t("ratingLabel" as TranslationKey)}
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 bg-neutral-950/60 border border-neutral-800 p-2 rounded-2xl">
                  {[1, 2, 3, 4, 5].map((starVal) => {
                    const isFilled = starVal <= currentStars;
                    return (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => setRating(starVal)}
                        onMouseEnter={() => setHoverRating(starVal)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 rounded-lg hover:scale-110 active:scale-95 transition-transform focus:outline-none"
                      >
                        <Star
                          className={`size-6 sm:size-7 transition-colors ${
                            isFilled
                              ? "fill-amber-400 text-amber-400"
                              : "text-neutral-600 hover:text-neutral-500"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <span className="text-xs font-semibold text-amber-400/90">
                  {getRatingLabel(currentStars)}
                </span>
              </div>
            </div>

            {/* Name Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="review-name"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-300"
              >
                {t("nameLabel" as TranslationKey)}{" "}
                <span className="text-amber-400">*</span>
              </label>
              <input
                id="review-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={
                  language === "ne" ? "उदा: राम गौले" : "e.g. Ram Gaule"
                }
                maxLength={60}
                className="w-full rounded-xl border border-neutral-700/60 bg-neutral-950/70 px-4 py-2.5 text-sm text-white placeholder-neutral-500 transition-colors focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
              />
            </div>

            {/* Role / Context Input + Quick Suggestions */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="review-role"
                  className="block text-xs font-bold uppercase tracking-wider text-neutral-300"
                >
                  {t("roleLabel" as TranslationKey)}{" "}
                  <span className="text-amber-400">*</span>
                </label>
              </div>
              <input
                id="review-role"
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder={
                  language === "ne" ? "उदा: ग्राहक / ठेकेदार" : "e.g. Customer, Contractor, Dealer"
                }
                maxLength={60}
                className="w-full rounded-xl border border-neutral-700/60 bg-neutral-950/70 px-4 py-2.5 text-sm text-white placeholder-neutral-500 transition-colors focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
              />
              {/* Quick suggestion chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {suggestions.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => setRole(sug)}
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all border ${
                      role === sug
                        ? "border-amber-400/60 bg-amber-500/20 text-amber-300"
                        : "border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                    }`}
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* Review Quote Textarea */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="review-quote"
                  className="block text-xs font-bold uppercase tracking-wider text-neutral-300"
                >
                  {t("quoteLabel" as TranslationKey)}{" "}
                  <span className="text-amber-400">*</span>
                </label>
                <span className="text-[11px] text-neutral-500 font-mono">
                  {quote.length}/400
                </span>
              </div>
              <textarea
                id="review-quote"
                required
                rows={3}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder={
                  language === "ne"
                    ? "गुरु बल्ब्सको उज्यालो, टिकाउपन, ऊर्जा बचत वा सेवा कस्तो लाग्यो?"
                    : "Describe the lighting brightness, build quality, energy savings, or service..."
                }
                maxLength={400}
                className="w-full resize-none rounded-xl border border-neutral-700/60 bg-neutral-950/70 p-3.5 text-sm text-white placeholder-neutral-500 transition-colors focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800/80">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="rounded-full border border-neutral-700/60 px-5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors disabled:opacity-50"
              >
                {language === "ne" ? "रद्द गर्नुहोस्" : "Cancel"}
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-2.5 text-xs sm:text-sm font-bold text-neutral-950 shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-400 hover:shadow-amber-400/35 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin text-neutral-950" />
                    <span>{t("submittingReview" as TranslationKey)}</span>
                  </>
                ) : (
                  <>
                    <Pencil className="size-3.5 text-neutral-950" />
                    <span>{t("submitReview" as TranslationKey)}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
