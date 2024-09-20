import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import ClientLayout from "./ClientLayout";
import Product from "./product";

type Props = {
  children: React.ReactNode;
  locale: string;
};

export default async function MainLayout({ children, locale }: Props) {
  const t = await getTranslations({ locale });
  unstable_setRequestLocale(locale);

  return (
    <div className="flex flex-col h-full  items-center">
      <ClientLayout
        locale={locale}
        translations={{
          heading: t("shuffleHero.heading"),
          subheading: t("shuffleHero.subheading"),
          description: t("shuffleHero.description"),
          button: t("shuffleHero.button"),
        }}
      />
      <div className="mt-32 flex felx-row gap-8">
        <Product id={"productOne"} locale={locale} />
        <Product id={"productTwo"} locale={locale} />
      </div>
    </div>
  );
}
