import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
export const locales = ["en", "fr", "nl", "de", "es"] as const;
export default getRequestConfig(async ({ locale }) => {
  console.log("Guard is working...");

  // If the locale isn't in the allowed list, return default English messages
  if (!locales.includes(locale as any)) {
    return {
      messages: (await import(`./app/[country]/[locale]/dictionaries/en.json`)).default,
    };
  }

  // If locale exists, return the localized messages
  return {
    messages: (await import(`./app/[country]/[locale]/dictionaries/${locale}.json`)).default,
  };
});
