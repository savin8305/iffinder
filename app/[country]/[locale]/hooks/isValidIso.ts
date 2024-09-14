import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

// Register the English locale
countries.registerLocale(en);

// Function to check if the input is a valid ISO country code (2-letter or 3-letter)
const isValidISOCode = (code: string): boolean => {
  // Convert the input to uppercase to ensure case-insensitive comparison
  const upperCode = code.toUpperCase();

  // Get lists of valid ISO alpha-2 (2-letter) and alpha-3 (3-letter) country codes
  const validAlpha2Codes = Object.keys(countries.getAlpha2Codes());
  const validAlpha3Codes = Object.keys(countries.getAlpha3Codes());

  // Check if the input code is either a valid 2-letter or 3-letter ISO code
  return validAlpha2Codes.includes(upperCode) || validAlpha3Codes.includes(upperCode);
};

export default isValidISOCode;
