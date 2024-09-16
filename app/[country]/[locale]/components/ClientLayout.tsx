"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./preloader";
import ShuffleHero from "./Heor";

type Props = {
  locale: string;
  translations: {
    heading: string;
    subheading: string;
    description: string;
    button: string;
  };
};

export default function ClientLayout({ locale, translations }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  // Introduce delay for loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout); // Clean up the timeout if component unmounts
  }, []);

  return (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="wait">
        {/* Display preloader if isLoading is true */}
        {isLoading && <Preloader />}
      </AnimatePresence>

      {/* Display actual content when not loading */}
      {!isLoading && (
        <ShuffleHero
          translations={translations}
        />
      )}
    </div>
  );
}
