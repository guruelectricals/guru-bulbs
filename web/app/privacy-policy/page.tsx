import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Cookie,
  Eye,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { sanityFetch } from "@/lib/fetch";
import { privacyPolicyQuery } from "@/lib/queries";
import { PortableText } from "@portabletext/react";

export const metadata: Metadata = {
  title: "Privacy Policy | Guru Bulbs",
  description:
    "Learn how Guru Bulbs collects, uses, and protects your personal data and cookie preferences.",
};

export default async function PrivacyPolicyPage() {
  const policyData = await sanityFetch<any>(privacyPolicyQuery).catch(
    () => null,
  );

  const title = policyData?.title || "Privacy & Data Protection Policy";
  const lastUpdated = policyData?.lastUpdated || "2026-01-15";
  const introText =
    policyData?.introText ||
    "At Guru Bulbs, we are committed to safeguarding your privacy while providing high-performance, certified LED lighting solutions. This policy outlines how we handle cookies, visitor data, and your rights.";

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 pt-28 pb-16 sm:pt-32 px-4 sm:px-6 lg:px-6 xl:px-10 overflow-hidden">
      {/* GLOWING AMBER RADIAL BACKGROUND AURA */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl space-y-10">
        {/* BREADCRUMB & BACK LINK */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="size-4" /> Back to Home
        </Link>

        {/* HERO HEADER */}
        <div className="space-y-4 border-b border-amber-500/15 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-extrabold text-amber-400 uppercase tracking-widest">
            <ShieldCheck className="size-3.5" /> Official Policy
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl text-white tracking-tight">
            {title}
          </h1>
          <p className="text-xs font-semibold text-neutral-400">
            Last Updated: <span className="text-amber-400">{lastUpdated}</span>
          </p>
          <p className="text-sm leading-relaxed text-neutral-300 max-w-3xl">
            {introText}
          </p>
        </div>

        {/* CMS PORTABLE TEXT OR STRUCTURED SECTIONS */}
        {policyData?.content ? (
          <div className="prose prose-invert prose-amber max-w-none space-y-6 text-sm text-neutral-300 leading-relaxed">
            <PortableText value={policyData.content} />
          </div>
        ) : (
          <div className="space-y-8">
            {/* SECTION 1: ESSENTIAL COOKIES */}
            <div className="rounded-3xl border border-amber-500/25 bg-neutral-900/60 p-6 md:p-8 backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <Cookie className="size-6 shrink-0" />
                <h2 className="text-lg font-extrabold uppercase tracking-wide text-white">
                  1. Essential Cookie & Preference Storage
                </h2>
              </div>
              <p className="text-xs leading-relaxed text-neutral-300">
                Essential cookies are strictly required to operate the Guru
                Bulbs catalog. They store your active filter selections
                (category, wattage range, in-stock status), color temperature
                preferences (Warm White vs Daylight), and cookie consent
                preferences (`guru_bulbs_cookie_consent`).
              </p>
              <div className="grid gap-3 sm:grid-cols-2 pt-2">
                <div className="flex items-start gap-2 text-xs text-neutral-300">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Category &amp; Wattage Filter Retention</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-neutral-300">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>1-Year Cookie Consent Expiry</span>
                </div>
              </div>
            </div>

            {/* SECTION 2: ANALYTICS & PERFORMANCE */}
            <div className="rounded-3xl border border-amber-500/25 bg-neutral-900/60 p-6 md:p-8 backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <Eye className="size-6 shrink-0" />
                <h2 className="text-lg font-extrabold uppercase tracking-wide text-white">
                  2. Analytics &amp; Catalog Performance Data
                </h2>
              </div>
              <p className="text-xs leading-relaxed text-neutral-300">
                When you opt into performance cookies, we collect aggregated,
                non-personally identifiable metrics such as most-viewed LED bulb
                models, search terms typed into our filter bar, and dealership
                inquiry conversion rates. This allows us to manufacture and
                stock the exact lighting products requested by users.
              </p>
            </div>

            {/* SECTION 3: DATA SECURITY & CONTACT */}
            <div className="rounded-3xl border border-amber-500/25 bg-neutral-900/60 p-6 md:p-8 backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <Lock className="size-6 shrink-0" />
                <h2 className="text-lg font-extrabold uppercase tracking-wide text-white">
                  3. Data Security &amp; Contacting Us
                </h2>
              </div>
              <p className="text-xs leading-relaxed text-neutral-300">
                We employ SSL/TLS encryption across all forms and API endpoints.
                We do not sell or trade your personal data to third parties. If
                you have questions regarding your data rights or cookie
                settings, please contact our support team.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-amber-500 px-5 py-2.5 text-xs font-extrabold text-neutral-950 hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
                >
                  Contact Data Privacy Officer
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
