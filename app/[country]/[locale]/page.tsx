"use client";
import { useEffect, useState } from "react";
import Preloader from "./components/preloader";
import { AnimatePresence } from "framer-motion";
import { IntlProvider } from 'next-intl'; // Ensure intl provider is used for translation
import ShuffleHero from "./components/Heor";

type Props = {
  params: { locale: string }; // Ensure locale comes from params
  messages: object; // Add messages prop for translations
};

export default function Home({ params: { locale }, messages }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate preloader loading state
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <IntlProvider locale={locale}> {/* Wrap with IntlProvider */}
      <div className="flex flex-row gap-10">
        <AnimatePresence mode="wait">
          {isLoading && <Preloader />}
        </AnimatePresence>
       
      </div>
    </IntlProvider>
  );
}
