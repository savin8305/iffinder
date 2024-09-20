import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import React from "react";
import ClientLayout from "./components/ClientLayout";
import Product from "./components/product";

type Props = {
  params: { locale: string };
};

const page = async ({ params: { locale } }: Props) => {
  // Await the result of getTranslationsa
  const t = await getTranslations({ locale });

  // Set the locale for the request
  unstable_setRequestLocale(locale);

  return (
    <div className="flex flex-col h-full items-center">
      <ClientLayout
        locale={locale}
        translations={{
          heading: t("shuffleHero.heading"),
          subheading: t("shuffleHero.subheading"),
          description: t("shuffleHero.description"),
          button: t("shuffleHero.button"),
        }}
      />
      <div className="mt-32 flex flex-row gap-8">
        <Product id={"productOne"} locale={locale} />
        <Product id={"productTwo"} locale={locale} />
      </div>
    </div>
  );
};

export default page;
