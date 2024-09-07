import { useTranslations } from "next-intl";
import Product from "@/app/[locale]/components/product";

type Props = {
  params: { locale: string }; // Ensure locale comes from params
};

export default function Home({ params: { locale } }: Props) {
  const t = useTranslations(); // Should be wrapped inside IntlProvider

  return (
    <div>
      <h1 className="text-white mt-5 text-xl font-medium tracking-tight mb-5">
        {t("products.catalog")}
      </h1>
      <div className="flex h-fit gap-6">
        <Product id={"productOne"} locale={locale} />
        <Product id={"productTwo"} locale={locale} />
      </div>
    </div>
  );
}
