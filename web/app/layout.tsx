import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteProvider } from "@/providers/site-provider";
import { LanguageProvider } from "@/providers/language-provider";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getInitialSiteData } from "@/lib/site-data";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const serifFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const outfitFont = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Guru Bulbs - Premium Lighting Solutions",
  description:
    "Discover high-quality lighting solutions for your home and business",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { branding, categoryItems } = await getInitialSiteData();

  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${serifFont.variable} ${outfitFont.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <LanguageProvider>
          <SiteProvider branding={branding} categoryItems={categoryItems}>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              disableTransitionOnChange
            >
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <CookieBanner />
                <WhatsAppButton />
              </div>
            </ThemeProvider>
          </SiteProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
