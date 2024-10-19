"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

interface Country {
  name: string;
  language: string;
  flag: string;
  code: string;
}

const CountryLayout: React.FC = () => {
  const [isFlagOpen, setIsFlagOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(16);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    name: "India",
    language: "हिंदी",
    flag: "https://flagcdn.com/in.svg", // Default flag URL for India
    code: "in",
  });

  const router = useRouter();
  const pathname = usePathname() || "";

  const countries: Country[] = [
    { name: "Saudi Arabia", language: "العربية", flag: "https://flagcdn.com/sa.svg", code: "sa" },
    { name: "Egypt", language: "العربية", flag: "https://flagcdn.com/eg.svg", code: "eg" },
    { name: "Bangladesh", language: "বাংলা", flag: "https://flagcdn.com/bd.svg", code: "bd" },
    { name: "Brazil", language: "Português", flag: "https://flagcdn.com/br.svg", code: "br" },
    { name: "United States", language: "English", flag: "https://flagcdn.com/us.svg", code: "us" },
    { name: "Canada", language: "English, Français", flag: "https://flagcdn.com/ca.svg", code: "ca" },
    { name: "Germany", language: "Deutsch", flag: "https://flagcdn.com/de.svg", code: "de" },
    { name: "France", language: "Français", flag: "https://flagcdn.com/fr.svg", code: "fr" },
    { name: "Spain", language: "Español", flag: "https://flagcdn.com/es.svg", code: "es" },
    { name: "Italy", language: "Italiano", flag: "https://flagcdn.com/it.svg", code: "it" },
    { name: "Russia", language: "Русский", flag: "https://flagcdn.com/ru.svg", code: "ru" },
    { name: "China", language: "中文", flag: "https://flagcdn.com/cn.svg", code: "cn" },
    { name: "India", language: "हिन्दी", flag: "https://flagcdn.com/in.svg", code: "in" },
    { name: "Japan", language: "日本語", flag: "https://flagcdn.com/jp.svg", code: "jp" },
    { name: "South Korea", language: "한국어", flag: "https://flagcdn.com/kr.svg", code: "kr" },
    { name: "Mexico", language: "Español", flag: "https://flagcdn.com/mx.svg", code: "mx" },
    { name: "Argentina", language: "Español", flag: "https://flagcdn.com/ar.svg", code: "ar" },
    { name: "Nigeria", language: "English", flag: "https://flagcdn.com/ng.svg", code: "ng" },
    { name: "South Africa", language: "English, Afrikaans", flag: "https://flagcdn.com/za.svg", code: "za" },
    { name: "Turkey", language: "Türkçe", flag: "https://flagcdn.com/tr.svg", code: "tr" },
    { name: "Vietnam", language: "Tiếng Việt", flag: "https://flagcdn.com/vn.svg", code: "vn" },
    { name: "Thailand", language: "ไทย", flag: "https://flagcdn.com/th.svg", code: "th" },
    { name: "Colombia", language: "Español", flag: "https://flagcdn.com/co.svg", code: "co" },
    { name: "Philippines", language: "Filipino, English", flag: "https://flagcdn.com/ph.svg", code: "ph" },
  ];


  // Filter countries by search term
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle flag dropdown visibility
  const handleFlagOpen = () => {
    setIsFlagOpen(!isFlagOpen);
  };

  // Function to handle country selection
  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsFlagOpen(false);
    setSearchTerm("");

    // Extract the current path without the country code
    const currentPath = pathname.split("/").slice(2).join("/") || "";

    // Update the route to include the new country code
    router.push(`/${country.code}/${currentPath}`);
  };

  // Automatically update the country based on URL
  useEffect(() => {
    if (pathname) {
      const countryCode = pathname.split("/")[1]?.toLowerCase();
      if (countryCode) {
        const countryData = countries.find(
          (country) => country.code.toLowerCase() === countryCode
        );

        if (countryData) {
          setSelectedCountry({
            name: countryData.name,
            language: countryData.language,
            flag: countryData.flag,
            code: countryData.code,
          });
        }
      }
    }
  }, [pathname, countries]);

  // Close flag dropdown when clicking outside
  const countryRef = useRef<HTMLDivElement | null>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      countryRef.current &&
      !countryRef.current.contains(event.target as Node)
    ) {
      setIsFlagOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 9);
  };

  return (
    <div ref={countryRef} className="relative inline-block text-left">
      <div className="flex justify-center items-center space-x-4">
        <button
          type="button"
          className="inline-flex w-full rounded-md text-sm font-medium invert-0 focus:outline-none"
          aria-expanded={isFlagOpen}
          aria-haspopup="true"
          onClick={handleFlagOpen}
        >
          <div className="h-[1.25rem] w-[1.25rem] flex items-center rounded-full justify-center overflow-hidden">
            <Image
              width={100}
              height={100}
              src={selectedCountry.flag}
              alt={`${selectedCountry.name} flag`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex ml-2 font-light flex-col space-y-0">
            <p className="font-poppins invert-0 hidden lg:flex text-16 m-0 p-0 leading-tight">
              {selectedCountry.code.toUpperCase()}
            </p>
            <p className="flex lg:hidden font-poppins invert-0 text-xs m-0 p-0 leading-tight">
              {selectedCountry.name}
            </p>
            <p className="flex lg:hidden font-poppins invert-0 text-sm m-0 p-0 leading-tight">
              {selectedCountry.language}
            </p>
          </div>
        </button>
      </div>
      {isFlagOpen && (
        <div
          className="absolute right-[-6.5rem] mt-2 w-64 bg-white rounded-2xl shadow-lg border border-gray-300 ring-1 ring-black ring-opacity-5"
          aria-orientation="vertical"
        >
          <div className="relative p-4">
            <input
              type="text"
              className="w-full font-poppins text-14 px-2 py-1 pl-2 border rounded-full focus:outline-none focus:ring"
              placeholder="Country or Language..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="max-h-60 grid grid-cols-2 overflow-y-auto scrollbar-custom">
            {filteredCountries.slice(0, visibleCount).map((country, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-0 text-sm invert-0 flex items-center"
                onClick={() => handleCountrySelect(country)}
              >
                <p className="px-1 w-24 hover:bg-gray-200 hover:rounded-3xl">
                  {country.language}
                </p>
              </button>
            ))}
            {visibleCount < filteredCountries.length && (
              <p
                className="text-[#dc0e2a] cursor-pointer pl-4 p-2"
                onClick={handleShowMore}
              >
                more...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryLayout;
