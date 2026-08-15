"use client";

import * as React from "react";
import type { SiteBranding } from "@/types/site-branding";
import type { NavCategoryItem } from "@/lib/site-data";

export type SiteContextType = {
  branding: SiteBranding;
  categoryItems: NavCategoryItem[];
};

const defaultBranding: SiteBranding = {
  companyName: "Guru Bulbs",
};

const SiteContext = React.createContext<SiteContextType>({
  branding: defaultBranding,
  categoryItems: [],
});

export function SiteProvider({
  branding,
  categoryItems,
  children,
}: {
  branding: SiteBranding;
  categoryItems: NavCategoryItem[];
  children: React.ReactNode;
}) {
  const value = React.useMemo(
    () => ({ branding, categoryItems }),
    [branding, categoryItems]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = React.useContext(SiteContext);
  if (!context) {
    throw new Error("useSite must be used within a SiteProvider");
  }
  return context;
}
