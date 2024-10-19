"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./preloader";
import ShuffleHero from "./Heor";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  locale: string; // locale is directly part of the props, not within params
  translations: {
    heading: string;
    subheading: string;
    description: string;
    button: string;
  };
};

type GenerateMetadataProps = {
  params: {
    locale: string; // This is what generateMetadata expects
  };
};

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  try {
    const t = await getTranslations({ locale: params.locale });
    return {
      title: t("meta.home.title"),
      description: t("meta.home.description"),
    };
  } catch (error) {
    // Handle error, possibly return default metadata or trigger a 404
    notFound();
  }
}

export default function ClientLayout({ locale, translations }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  // Introduce delay for loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout); // Clean up the timeout if component unmounts
  }, []);

  return (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="wait">
        {/* Display preloader if isLoading is true */}
        {isLoading && <Preloader />}
      </AnimatePresence>
      {!isLoading && <ShuffleHero translations={translations} />}
    </div>
  );
}
