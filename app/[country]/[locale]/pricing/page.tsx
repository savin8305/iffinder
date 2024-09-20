import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CountryCode, countryNames } from "@/constants/config";

export async function generateMetadata({
  params: { country, locale },
}: {
  params: { country: CountryCode; locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const countryName = countryNames[country] || "Country"; // Fallback if the ISO isn't found

  return {
    title: `${t("meta.pricing.title")} - ${countryName}`, // Append country name
    description: `${t("meta.pricing.description")} (${countryName})`, // Append country name
  };
}

// Pricing component
export default function PricingPage() {
  return (
    <div>
      
    </div>
  );
}
