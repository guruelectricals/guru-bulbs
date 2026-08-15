"use client";

import * as React from "react";
import Link from "next/link";
import {
  Cookie,
  ShieldCheck,
  X,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSite } from "@/providers/site-provider";

const CONSENT_KEY = "guru_bulbs_cookie_consent";

export type CookieBannerProps = {
  title?: string;
  description?: string;
  essentialLabel?: string;
  acceptAllLabel?: string;
  privacyPolicyUrl?: string;
};

export function CookieBanner({
  title,
  description,
  essentialLabel,
  acceptAllLabel,
  privacyPolicyUrl,
}: CookieBannerProps = {}) {
  const site = useSite();
  const activeTitle =
    title ||
    site.branding.cookieConsentTitle ||
    "We Value Your Privacy & Lighting Experience";
  const activeDescription =
    description ||
    site.branding.cookieConsentDescription ||
    "We use essential cookies to keep our catalog running smoothly and optional analytics cookies to optimize your browsing performance.";
  const activeEssentialLabel =
    essentialLabel || site.branding.essentialCookiesLabel || "Essential Only";
  const activeAcceptAllLabel =
    acceptAllLabel ||
    site.branding.acceptAllCookiesLabel ||
    "Accept All Cookies";
  const activePrivacyPolicyUrl =
    privacyPolicyUrl || site.branding.privacyPolicyUrl || "/privacy-policy";
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);
  const [analyticsConsent, setAnalyticsConsent] = React.useState(true);

  React.useEffect(() => {
    setMounted(true);
    try {
      const savedChoice = localStorage.getItem(CONSENT_KEY);
      if (!savedChoice) {
        // Delay 1s for a luxurious smooth entrance after page load
        const timer = setTimeout(() => setVisible(true), 1000);
        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback
    }
  }, []);

  const saveConsent = async (type: "all" | "essential") => {
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ type, timestamp: new Date().toISOString() }),
      );
      // Set standard browser cookie (365 days expiry)
      document.cookie = `${CONSENT_KEY}=${type}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Ignores local storage blocking
    }

    setVisible(false);

    // Send anonymized consent log to backend API
    try {
      await fetch("/api/cookie-consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consent: type }),
      });
    } catch {
      // Silent error fallback
    }
  };

  if (!mounted || !visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-6 sm:max-w-md animate-in fade-in slide-in-from-bottom-8 duration-500">
      {/* GLOWING AMBER HALO BACKGROUND */}

      {/* CONTAINER */}
      <div className="relative overflow-hidden rounded-[28px] border border-amber-500/30 bg-neutral-950/95 p-5 shadow-[0_15px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl text-neutral-100">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl border border-amber-500/40 bg-amber-500/15 text-amber-400 shadow-[0_0_15px_rgba(240,188,25,0.2)]">
              <Cookie className="size-4" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                {activeTitle}
              </h4>
              <p className="text-[11px] font-medium text-neutral-400">
                Cookie & Privacy Consent
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => saveConsent("essential")}
            className="text-neutral-500 hover:text-neutral-300 transition-colors p-1 rounded-full"
            aria-label="Dismiss banner"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-3 text-xs leading-relaxed text-neutral-300">
          {activeDescription}{" "}
          {activePrivacyPolicyUrl && (
            <Link
              href={activePrivacyPolicyUrl}
              className="text-amber-400 underline underline-offset-2 hover:text-amber-300 font-semibold"
            >
              Privacy Policy
            </Link>
          )}
        </p>

        {/* EXPANDABLE DETAILS */}
        {showDetails && (
          <div className="mt-3 pt-3 border-t border-amber-500/15 space-y-2.5 animate-in fade-in duration-300">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-3.5 text-emerald-400" />
                <span className="font-bold text-neutral-200">
                  Strictly Essential Cookies
                </span>
              </div>
              <span className="text-[10px] font-extrabold uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                Always Active
              </span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <div className="flex items-center gap-2">
                <Cookie className="size-3.5 text-amber-400" />
                <span className="font-bold text-neutral-200">
                  Performance & Analytics
                </span>
              </div>
              <button
                type="button"
                onClick={() => setAnalyticsConsent(!analyticsConsent)}
                className={cn(
                  "flex h-5 w-9 items-center rounded-full p-0.5 transition-colors duration-300",
                  analyticsConsent ? "bg-amber-500" : "bg-neutral-800",
                )}
              >
                <div
                  className={cn(
                    "size-4 rounded-full bg-neutral-950 transition-transform duration-300",
                    analyticsConsent ? "translate-x-4" : "translate-x-0",
                  )}
                />
              </button>
            </div>
          </div>
        )}

        {/* CONTROLS */}
        <div className="mt-4 flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => saveConsent("essential")}
              className="h-10 rounded-2xl border-amber-500/30 bg-neutral-900/80 text-xs font-bold text-neutral-200 hover:border-amber-400 hover:text-white"
            >
              {activeEssentialLabel}
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() =>
                saveConsent(analyticsConsent ? "all" : "essential")
              }
              className="h-10 rounded-2xl bg-amber-500 text-xs font-extrabold text-neutral-950 hover:bg-amber-400 shadow-lg shadow-amber-500/25"
            >
              <Check className="size-3.5 mr-1" />
              {activeAcceptAllLabel}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center justify-center gap-1 text-[11px] font-semibold text-neutral-400 hover:text-amber-400 transition-colors pt-1"
          >
            <span>
              {showDetails
                ? "Hide Cookie Preferences"
                : "Customize Preferences"}
            </span>
            {showDetails ? (
              <ChevronUp className="size-3" />
            ) : (
              <ChevronDown className="size-3" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
