import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import ShuffleHero from "./Heor";

type Props = {
  params: { locale: string }; // Ensure locale comes from params
};
export default async function Home({ params: { locale } }: Props) {
  const t = await getTranslations({ locale });
  unstable_setRequestLocale(locale);
  return (
    <>
      <ShuffleHero
        translations={{
          heading: t("shuffleHero.heading"),
          subheading: t("shuffleHero.subheading"),
          description: t("shuffleHero.description"),
          button: t("shuffleHero.button"),
        }}
      />
    </>
  );
}
