import { NextResponse } from "next/server";

// Function to fetch user location based on IP address using ipapi.co
async function fetchUserLocation(ip: string) {
  try {
    console.log(`Fetching location data for IP: ${ip}`);
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    
    if (!res.ok) throw new Error("Failed to fetch location data");
    
    const data = await res.json();
    console.log("Location data received:", data);
    
    return {
      country: data.country_code?.toLowerCase() || "us", // Fallback to 'us' if country_code is unavailable
      language: data.languages?.split(",")[0] || "en",   // Fallback to 'en' if no language is detected
    };
  } catch (error) {
    console.error("Error fetching user location:", error);
    return { country: "us", language: "en" }; // Fallback to US and English
  }
}

const defaultLocales: Record<string, string> = {
  in: "en", // Default language for India is English
  us: "en", // Default language for US is English
  ca: "en", // Default language for Canada is English
  fr: "fr", // Default language for France is French
  de: "de", // Default language for Germany is German
};

export async function middleware(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "http://localhost:3000/"; // Fallback to localhost
  console.log("myip",ip);
  
  const browserLanguage = req.headers.get("accept-language")?.split(",")[0] || "en";

  console.log(`Detected IP: ${ip}`);
  console.log(`Detected browser language: ${browserLanguage}`);

  const userLocation = await fetchUserLocation(ip);
  const { country, language } = userLocation;

  console.log(`User's country: ${country}, language: ${language}`);

  const finalLanguage = browserLanguage || defaultLocales[country] || "en";
  const newUrl = new URL(`/${country}/${finalLanguage}`, req.url);

  console.log(`Redirecting to: ${newUrl}`);

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/"], // Middleware applies to the root route
};
