import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "fr", "nl", "de", "es", "hi", "ta"] as const;

export default getRequestConfig(async ({ locale }) => {
  console.log("Guard is working...");

  // Define the base URL for your API
  const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";

  // If the locale isn't in the allowed list, default to English
  if (!locales.includes(locale as any)) {
    locale = "en"; // Fallback to English
  }

  try {
    // Fetch data from multiple APIs in parallel
    const [navbarRes, heroRes, footerRes] = await Promise.all([
      fetch(`${apiUrl}${locale}/navbar.json`),
      fetch(`${apiUrl}${locale}/hero.json`),
      fetch(`${apiUrl}${locale}/footer.json`)
    ]);

    // Check if all responses are successful
    if (!navbarRes.ok || !heroRes.ok || !footerRes.ok) {
      throw new Error(`Failed to fetch some or all resources for locale: ${locale}`);
    }

    // Parse the responses into JSON
    const [navbarData, heroData, footerData] = await Promise.all([
      navbarRes.json(),
      heroRes.json(),
      footerRes.json()
    ]);

    // Log the fetched data
    console.log(`Navbar for locale ${locale}:`, navbarData);
    console.log(`Hero for locale ${locale}:`, heroData);
    console.log(`Footer for locale ${locale}:`, footerData);

    // Return the messages together as a single object
    return {
      messages: {
        navbar: navbarData,
        hero: heroData,
        footer: footerData,
      },
    };
  } catch (error) {
    console.error(`Error fetching messages for locale ${locale}:`, error);

    // Fallback to English if something goes wrong
    const [navbarFallback, heroFallback, footerFallback] = await Promise.all([
      fetch(`${apiUrl}en/navbar.json`).then(res => res.json()),
      fetch(`${apiUrl}en/hero.json`).then(res => res.json()),
      fetch(`${apiUrl}en/footer.json`).then(res => res.json())
    ]);

    // Log fallback data
    console.log(`Fallback navbar for locale en:`, navbarFallback);
    console.log(`Fallback hero for locale en:`, heroFallback);
    console.log(`Fallback footer for locale en:`, footerFallback);

    // Return fallback messages
    return {
      messages: {
        navbar: navbarFallback,
        hero: heroFallback,
        footer: footerFallback,
      },
    };
  }
});
