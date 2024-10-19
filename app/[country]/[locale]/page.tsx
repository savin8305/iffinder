import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import React from "react";


const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";
const locales = ["en", "fr", "nl", "de", "es", "hi", "ta"] as const;

type Props = {
  params: { locale: string };
};

const page = async ({ params: { locale } }: Props) => {
  // Set default locale if not in supported list
  if (!locales.includes(locale as any)) {
    locale = "en"; // Fallback to English
  }
  let heroData;
  try {
    // Fetch hero data based on locale
    const heroRes = await fetch(`${apiUrl}${locale}/hero.json`);
    if (!heroRes.ok) {
      throw new Error(`Failed to fetch hero data for locale: ${locale}`);
    }
    heroData = await heroRes.json();
    console.log(`Hero data for locale ${locale}:`, heroData?.home[0]?.homeSeoData);
  } catch (error) {
    console.error(`Error fetching hero data for locale ${locale}:`, error);
    // Fallback to English if API request fails
    const fallbackRes = await fetch(`${apiUrl}fr/hero.json`);
    heroData = await fallbackRes.json();
  }

  // Set the locale for the request
  unstable_setRequestLocale(locale);

  // Fetch translations based on the locale
  const t = await getTranslations({ locale });

  return (
    <div className="flex flex-col justify-center  h-screen items-center">
      {/* You can use heroData and translations (t) here */}
      <h1>{t(`${heroData?.home[0]?.homeSeoData?.title}`)}</h1>
    </div>
  );
};

export default page;
