import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { defaultLocale } from "@/constants/config";
import Product from "./components/product";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import MainLayout from "./components/main-layout";
import Header from "./components/header";

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
  const supportedLocales = ["en", "fr", "nl", "de", "es", "ta"];
  // Function to generate dynamic hreflang links
  const generateHreflangLinks = () => {
    const hreflangLinks = supportedLocales.map((locale) => {
      const url = `/${locale}`; // Adjust based on your routing structure
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

  const t = await getTranslations({ locale });
  return (
    <html lang={locale}>
      <head>{generateHreflangLinks()}</head>
      <body className={`${inter.className} h-full`}>
        <div className="bg-red-400">hellow workd---</div>
        <div className="flex-1 text-white text-base font-bold">
          {t("title")}
        </div>
        <Header locale={locale} />
        {children}
        <Product id={"productOne"} locale={locale} />
        <Product id={"productTwo"} locale={locale} />
      </body>
    </html>
  );
}
