import { Pathnames } from "next-intl/navigation";

export const locales = ["en", "fr", "nl", "de", "es"] as const; // Add more supported languages
export const defaultLocale = "en"; // Default language

export const pathnames = {
  "/": "/",
  "/pathnames": {
    en: "/pathnames",
    fr: "/chemins",
    nl: "/padnamen",
    de: "/pfadnamen",
    es: "/nombresdepistas",
  },
} satisfies Pathnames<typeof locales>;

export const localePrefix = undefined;
export type AppPathnames = keyof typeof pathnames;
