import { useTranslations } from "next-intl";
import Product from "@/app/[country]/[locale]/components/product";

type Props = {
  params: { locale: string }; // Ensure locale comes from params
};

export default function Home({ params: { locale } }: Props) {
  return (
    <div>
      {" "}
      <Product id={"productTwo"} locale={locale} />
    </div>
  );
}
