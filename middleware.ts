import { NextResponse, NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { defaultLocale, localePrefix, locales, pathnames } from "@/constants/config";

// Function to fetch user location based on IP address using ipapi.co
async function fetchUserLocation(ip: string) {
  try {
    console.log(`Fetching location data for IP: ${ip}`);
    // Using IPAPI's free endpoint to fetch location based on IP
    const res = await fetch(`https://ipapi.co/${ip}/json/`);

    if (!res.ok) throw new Error(`Failed to fetch location data for IP: ${ip}`);

    const data = await res.json();
    console.log("Location data received:", data);

    return {
      country: data.country_code?.toLowerCase() || "us", // Default to 'us' if country_code is unavailable
      language: data.languages?.split(",")[0] || "en",   // Default to 'en' if no language detected
    };
  } catch (error) {
    console.error("Error fetching user location:", error);
    // If there's an error (e.g., API failure), default to US and English
    return { country: "us", language: "en" };
  }
}

// Combine custom middleware with `next-intl` middleware
export async function middleware(req: NextRequest) {
  // Fetch the user's IP address (using a default for localhost)
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1"; // Default to localhost IP
  console.log("Detected IP:", ip);

  // Fetch the user's location based on the IP address
  const userLocation = await fetchUserLocation(ip);
  const { country, language: ipLanguage } = userLocation;
  console.log(`User's country: ${country}, IP-based language: ${ipLanguage}`);

  // Get the browser's preferred language from the 'accept-language' header
  const browserLanguage = req.headers.get("accept-language")?.split(",")[0]?.trim() || "";
  console.log("Detected browser language:", browserLanguage);

  // Final language: prioritize browser language, fallback to IP-based language
  const finalLanguage = browserLanguage || ipLanguage || defaultLocale;

  // Use next-intl middleware to handle locale prefixing and redirect accordingly
  const intlMiddleware = createMiddleware({
    defaultLocale,
    locales,
    pathnames,
    localePrefix,
  });

  // Handle locale-based routing (via next-intl)
  const intlResponse = intlMiddleware(req);
  if (intlResponse) {
    return intlResponse;
  }

  // If the next-intl middleware doesn't respond, proceed with language-based redirection
  const url = new URL(req.url);
  const newUrl = new URL(`/${finalLanguage}`, url.origin);
  console.log(`Redirecting to: ${newUrl}`);

  // Redirect to the localized URL
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Apply middleware for these paths
    "/",
    "/(nl|en|fr|de|es|ta)/:path*", // Adjust based on your supported locales
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
