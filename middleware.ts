import { NextResponse, NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import {
  defaultLocale,
  localePrefix,
  locales,
  pathnames,
} from "@/constants/config";

// Function to fetch user location based on IP address using ipapi.co
async function fetchUserLocation() {
  try {
    console.log(`Fetching location data for IP:`);
    // Using IPAPI's free endpoint to fetch location based on IP
    const res = await fetch(`https://ipapi.co/json/`);

    if (!res.ok) throw new Error(`Failed to fetch location data for IP: `);

    const data = await res.json();
    console.log("Location data received:", data);

    return {
      country: data.country_code?.toLowerCase() || "us", // Default to 'us' if country_code is unavailable
      language: data.languages?.split(",")[0] || "en", // Default to 'en' if no language detected
    };
  } catch (error) {
    console.error("Error fetching user location:", error);
    // If there's an error (e.g., API failure), default to US and English
    return { country: "us", language: "en" };
  }
}

export async function middleware(req: NextRequest) {
  // Check if user is on the root URL
  const { pathname } = req.nextUrl;
  
  if (pathname === "/") {
    // Fetch the user's location based on the IP address
    const userLocation = await fetchUserLocation();
    const { country, language: ipLanguage } = userLocation;
    console.log(`User's country: ${country}, IP-based language: ${ipLanguage}`);

    // Get the browser's preferred language from the 'accept-language' header
    const browserLanguage =
      req.headers.get("accept-language")?.split(",")[0]?.trim() || "";
    console.log("Detected browser language:", browserLanguage);

    // Final language: prioritize browser language, fallback to IP-based language
    const finalLanguage = browserLanguage || ipLanguage || defaultLocale;
    console.log("finalLanguage", finalLanguage);

    // Construct the new URL with country and language code
    const url = req.nextUrl.clone();
    url.pathname = `/${country}/${finalLanguage}`;
    
    console.log(`Redirecting to: ${url}`);
    
    // Redirect to the constructed URL with country and language code
    return NextResponse.redirect(url);
  }

  // Proceed with next-intl middleware for locale handling in other paths
  const intlMiddleware = createMiddleware({
    defaultLocale,
    locales,
    pathnames,
    localePrefix,
  });

  const intlResponse = intlMiddleware(req);
  if (intlResponse) {
    return intlResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/(nl|en|fr|de|es|ta)/:path*"], // Adjust based on your supported locales
};
