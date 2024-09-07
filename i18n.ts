import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
export const locales = ["en", "fr", "nl", "de", "es"] as const;
export default getRequestConfig(async ({ locale }) => {
  console.log("i am working");
  
  if (!locales.includes(locale as any)) notFound(); // Ensure locales are properly handled
  console.log("i am working end");

  return {
    messages: (await import(`./app/[locale]/dictionaries/${locale}.json`)).default,
  };
});
