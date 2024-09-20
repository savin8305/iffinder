"use client";
import { useEffect, useState } from "react";

import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import ClientLayout from "./ClientLayout";
import Product from "./product";

type Props = {
  params: { locale: string }; // Ensure locale comes from params
  messages: object; // Add messages prop for translations
};

export default async function Home({ params: { locale }, messages }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const t = getTranslations({ locale });
  unstable_setRequestLocale(locale);
  // Simulate preloader loading state
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="">
      <ClientLayout
        locale={locale}
        translations={{
          heading: (await t)("shuffleHero.heading"),
          subheading: (await t)("shuffleHero.subheading"),
          description: (await t)("shuffleHero.description"),
          button: (await t)("shuffleHero.button"),
        }}
      />
      <div className="mt-32 flex felx-row gap-8">
        <Product id={"productOne"} locale={locale} />
        <Product id={"productTwo"} locale={locale} />
      </div>
    </div>
  );
}
