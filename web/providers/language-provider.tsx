"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { translations, type Language, type TranslationKey } from "@/lib/i18n";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const detectLanguage = (): Language => {
      if (typeof window !== "undefined") {
        if (window.location.pathname === "/ne" || window.location.pathname.startsWith("/ne/")) {
          return "ne";
        }
        if (document.cookie.includes("app_language=ne")) {
          return "ne";
        }
      }
      return "en";
    };
    setLanguageState(detectLanguage());
  }, [pathname]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("app_language", lang);
      document.cookie = `app_language=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Storage fallback
    }

    const currentUrl = typeof window !== "undefined" ? window.location.pathname : pathname;
    let newPathname = currentUrl;

    if (lang === "ne") {
      if (!currentUrl.startsWith("/ne")) {
        newPathname = `/ne${currentUrl === "/" ? "" : currentUrl}`;
      }
    } else {
      if (currentUrl.startsWith("/ne")) {
        newPathname = currentUrl.replace(/^\/ne/, "") || "/";
      }
    }

    if (newPathname !== currentUrl) {
      router.push(newPathname);
    }
  };

  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
