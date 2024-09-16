import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { defaultLocale } from "@/constants/config";
import Product from "./components/product";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Navbar } from "./components/header";
import MainLayout from "./components/main-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your App Title",
  description: "Description of your app",
};

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "nl" }];
}

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<Props>) {
  const supportedLocales = ["en", "fr", "nl", "de", "es", "hi", "ta"];

  // Fetch translations for navbar
  const t = await getTranslations({ locale });

  const generateHreflangLinks = () => {
    const hreflangLinks = supportedLocales.map((locale) => {
      const url = `/${locale}`;
      return <link key={locale} rel="alternate" hrefLang={locale} href={url} />;
    });

    hreflangLinks.push(
      <link
        key="x-default"
        rel="alternate"
        hrefLang="x-default"
        href={`/${defaultLocale}`}
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
        <MainLayout children={children} locale={locale} />
      </body>
    </html>
  );
}
