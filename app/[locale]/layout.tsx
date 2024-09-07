import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/app/[locale]/components/main-layout";
import { defaultLocale } from "@/constants/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your App Title",
  description: "Description of your app",
};

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<Props>) {
  const supportedLocales = ["en", "fr", "nl", "de", "es", "ta"]; // Your supported locales
  // Function to generate dynamic hreflang links
  const generateHreflangLinks = () => {
    const hreflangLinks = supportedLocales.map((locale) => {
      const url = `/${locale}`; // Adjust based on your routing structure
      return <link key={locale} rel="alternate" hrefLang={locale} href={url} />;
    });

    // Add x-default fallback (if required)
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

  return (
    <html lang={locale}>
      <head>{generateHreflangLinks()}</head>
      <body className={`${inter.className} h-full`}>
        <MainLayout locale={locale}>{children}</MainLayout>
      </body>
    </html>
  );
}
