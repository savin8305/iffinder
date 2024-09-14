// import { NextResponse, NextRequest } from "next/server";

// // List of valid ISO country codes (ISO 3166-1 alpha-2)
// const validCountryISOs = ["us", "in", "fr", "nl", "de", "es", "ta"]; // Add more as needed
// const validLocales = ["en", "fr", "nl", "de", "es", "ta"]; // Supported locales
// const defaultLocale = "en"; // Fallback language

// // Function to fetch user location based on IP address using ipinfo.io
// async function fetchUserLocation() {
//   try {
//     const res = await fetch(`https://ipinfo.io/json`);
//     if (!res.ok) throw new Error("Failed to fetch location data for IP.");
//     const data = await res.json();
//     return {
//       country: data.country?.toLowerCase() || "us", // Default to 'us' if country is unavailable
//       language: "en", // Default to 'en' as ipinfo.io does not provide language info
//     };
//   } catch (error) {
//     console.error("Error fetching user location:", error);
//     return { country: "us", language: "en" }; // Default fallback
//   }
// }

// // Middleware logic to handle redirection and validation
// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const pathParts = pathname.split("/").filter(Boolean); // Split the path and remove empty parts

//   // Extract country ISO and language code from the path
//   const userCountryISO = pathParts[0]?.toLowerCase(); // First part is country
//   const userLanguage = pathParts[1]?.toLowerCase(); // Second part is language

//   // Check if the country and language are valid
//   const isCountryValid = validCountryISOs.includes(userCountryISO);
//   const isLanguageValid = validLocales.includes(userLanguage);

//   // If the country is invalid, redirect to the detected country
//   if (!isCountryValid) {
//     const userLocation = await fetchUserLocation(); // Fetch user's actual location based on IP
//     const detectedCountry = userLocation.country;
//     const detectedLanguage = userLanguage || defaultLocale; // Use existing or fallback language

//     // Construct new URL with detected country and preserve other parts
//     const url = req.nextUrl.clone();
//     url.pathname = `/${detectedCountry}/${detectedLanguage}/${pathParts.slice(2).join("/")}`;

//     return NextResponse.redirect(url); // Redirect to valid URL
//   }

//   // If the country and language are valid, proceed
//   if (isCountryValid && isLanguageValid) {
//     return NextResponse.next(); // No redirection needed
//   }

//   // If only the language is invalid, fallback to the default language
//   const validCountry = isCountryValid ? userCountryISO : validCountryISOs[0]; // Fallback country if needed
//   const validLanguage = isLanguageValid ? userLanguage : defaultLocale; // Fallback language if needed

//   // Construct a valid URL if redirection is required
//   const url = req.nextUrl.clone();
//   url.pathname = `/${validCountry}/${validLanguage}/${pathParts.slice(2).join("/")}`;

//   return NextResponse.redirect(url); // Redirect to the corrected URL
// }

// // Define the matcher for the middleware to run only on specific routes
// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|api).*)", // Exclude static assets, image optimization, favicon, and API routes
//   ],
// };
import { NextResponse, NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

// List of valid ISO country codes (ISO 3166-1 alpha-2)
const validCountryISOs = ["us", "in", "fr", "nl", "de", "es", "ta"]; // Add more as needed
const validLocales = ["en", "fr", "nl", "de", "es", "ta"]; // Supported locales
const defaultLocale = "en"; // Fallback language

// Function to fetch user location based on IP address using ipinfo.io
async function fetchUserLocation() {
  try {
    console.log("Fetching location data for IP...");
    const res = await fetch(`https://ipinfo.io/json`);

    if (!res.ok) throw new Error("Failed to fetch location data for IP.");

    const data = await res.json();
    console.log("Location data received:", data);

    return {
      country: data.country?.toLowerCase() || "us", // Default to 'us' if country is unavailable
      language: "en", // Default to 'en' as ipinfo.io does not provide language info
    };
  } catch (error) {
    console.error("Error fetching user location:", error);
    // Default to US and English if there's an error
    return { country: "us", language: "en" };
  }
}

// Function to get the browser language from the 'accept-language' header
function getBrowserLanguage(req: NextRequest) {
  const acceptLanguageHeader = req.headers.get("accept-language");
  if (!acceptLanguageHeader) return defaultLocale;

  // Extract the first preferred language from the 'accept-language' header
  const browserLanguage = acceptLanguageHeader.split(",")[0]?.split("-")[0]; // Just the language code
  console.log("Browser language detected:", browserLanguage);

  return validLocales.includes(browserLanguage) ? browserLanguage : defaultLocale;
}

// Middleware logic to handle redirection and validation
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("Current path:", pathname);

  const pathParts = pathname.split("/").filter(Boolean); // Get all parts of the path

  // Check if the path includes a country ISO code (e.g., /in/fr)
  const userCountryISO = pathParts[0]?.toLowerCase(); // First part is country
  const userLanguage = pathParts[1]?.toLowerCase(); // Second part is language

  console.log("User country ISO from URL:", userCountryISO);
  console.log("User language from URL:", userLanguage);

  // Check if the country and language are valid
  const isCountryValid = validCountryISOs.includes(userCountryISO);
  const isLanguageValid = validLocales.includes(userLanguage);

  // If the country and language are valid, proceed
  if (isCountryValid && isLanguageValid) {
    console.log("Valid country and language, proceeding...");
    return NextResponse.next(); // No redirection needed
  }

  // Fetch the user's actual location (country and language) based on IP
  const userLocation = await fetchUserLocation();
  const { country: detectedCountry } = userLocation;

  // Get browser's preferred language from accept-language header
  const browserLanguage = getBrowserLanguage(req);

  console.log("Detected user country:", detectedCountry);
  console.log("Browser language:", browserLanguage);

  // If the user is already on the correct URL, don't redirect
  if (userCountryISO === detectedCountry && userLanguage === browserLanguage) {
    console.log("User is already on the correct URL, proceeding...");
    return NextResponse.next(); // No redirection needed
  }

  // Construct the new valid URL using detected country and browser language
  const url = req.nextUrl.clone();
  url.pathname = `/${detectedCountry}/${browserLanguage}`;

  console.log("Redirecting to:", url);
  return NextResponse.redirect(url);
}

// Define the matcher for the middleware to run only on specific routes
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api).*)", // Exclude static assets, image optimization, favicon, and API routes
    
  ],
};

