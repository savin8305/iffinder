import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CountryCode, countryNames, defaultLocale } from "@/constants/config";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Navbar } from "./components/header";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });


export async function generateMetadata({
  params: { country, locale },
}: {
  params: { country: CountryCode; locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const countryName = countryNames[country] || "Country"; // Fallback if the ISO isn't found

  return {
    title: `${t("meta.home.title")} - ${countryName}`, // Append country name
    description: `${t("meta.home.description")} (${countryName})`, // Append country name
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
  const supportedLocales = ["en", "fr", "nl", "de", "es", "hi", "ta"];

  const t = await getTranslations({ locale });

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
        <Footer locale={locale} />
      </body>
    </html>
  );
}
