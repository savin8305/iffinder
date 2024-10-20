import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CountryCode, countryNames, defaultLocale } from "@/constants/config";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Navbar } from "./components/header";

const inter = Inter({ subsets: ["latin"] });

const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";
const locales = ["en", "fr", "nl", "de", "es", "hi", "ta"] as const;

export async function generateMetadata({
  params: { country, locale },
}: {
  params: { country: CountryCode; locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const countryName = countryNames[country] || "Country"; // Fallback if the ISO isn't found

  let heroData;
  try {
    // Fetch hero data based on the locale
    const heroRes = await fetch(`${apiUrl}${locale}/hero.json`);
    if (!heroRes.ok) {
      throw new Error(`Failed to fetch hero data for locale: ${locale}`);
    }
    heroData = await heroRes.json();
    console.log(`Hero data for locale ${locale}:`, heroData);
  } catch (error) {
    console.error(`Error fetching hero data for locale ${locale}:`, error);
    // Fallback to English if API request fails
    const fallbackRes = await fetch(`${apiUrl}en/hero.json`);
    heroData = await fallbackRes.json();
  }

  // Use heroData to populate metadata with a fallback if data is missing
  const metaTitle = heroData?.home?.[0]?.homeSeoData?.title || t("meta.home.title");
  const metaDescription = heroData?.home?.[0]?.homeSeoData?.description || t("meta.home.description");

  return {
    title: `${metaTitle} - ${countryName}`, // Append country name
    description: `${metaDescription} (${countryName})`, // Append country name
  };
}

export async function generateStaticParams() {
  return [
    { country: "in", locale: "en" },
    { country: "in", locale: "nl" },
    // Add more combinations as needed
  ];
}

type Props = {
  children: React.ReactNode;
  params: { country: CountryCode; locale: string };
};

export default async function RootLayout({
  children,
  params: { country, locale },
}: Readonly<Props>) {
  // If the locale isn't in the allowed list, default to English
  if (!locales.includes(locale as any)) {
    locale = "en"; // Fallback to English
  }

  let heroData;
  try {
    // Fetch hero data based on the locale
    const heroRes = await fetch(`${apiUrl}${locale}/hero.json`);
    if (!heroRes.ok) {
      throw new Error(`Failed to fetch hero data for locale: ${locale}`);
    }
    heroData = await heroRes.json();
    console.log(`Hero data for locale ${locale}:`, heroData);
  } catch (error) {
    console.error(`Error fetching hero data for locale ${locale}:`, error);
    // Fallback to English if API request fails
    const fallbackRes = await fetch(`${apiUrl}en/hero.json`);
    heroData = await fallbackRes.json();
  }
  const supportedLocales = ["en", "fr", "nl", "de", "es", "hi", "ta"];
  const generateHreflangLinks = () => {
    const hreflangLinks = supportedLocales.map((locale) => {
      const url = `/${country}/${locale}`; // Include country in URL
      return <link key={locale} rel="alternate" hrefLang={locale} href={url} />;
    });

    hreflangLinks.push(
      <link
        key="x-default"
        rel="alternate"
        hrefLang="x-default"
        href={`/${country}/${defaultLocale}`} // Include country in default URL
      />
    );

    return hreflangLinks;
  };

  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale });
  return (
    <html lang={locale}>
      <head>{generateHreflangLinks()}</head>
      <body className={`${inter.className} h-full`}>
        <Navbar
          translations={{
            home: t("navbar.home"),
            pricing: t("navbar.pricing"),
            features: t("navbar.features"),
            docs: t("navbar.docs"),
            blog: t("navbar.blog"),
          }}
        />
      
        {children}
      </body>
    </html>
  );
}
