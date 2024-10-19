"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavbarData } from "../types/constant";

interface NavItem {
  title: string;
  link?: string;
  image?: string;
  alt?: string;
  icon?: string;
  textcolor?: string;
  description?: string;
}
interface AboutDataProps {
  navData: NavbarData;
}
const AboutLayout: React.FC<AboutDataProps> = ({ navData }) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const aboutData = navData?.navbar[0]?.data;
  const navLeftData = aboutData?.navleftdata || [];
  const navRightData = aboutData?.navrightdata || [];
  const scrollDown = useCallback(() => {
    setCurrentIndex((prev) =>
      prev < navLeftData.length - 2 ? prev + 1 : prev
    );
  }, [navLeftData]);
  const scrollUp = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      const isScrollingDown = e.deltaY > 0;
      isScrollingDown ? scrollDown() : scrollUp();
    },
    [scrollDown, scrollUp]
  );
  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener("wheel", handleWheel);
    }
    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, [handleWheel]);
  const bgColors = [
    "bg-[#f6ffef]",
    "bg-[#f4f4ff]",
    "bg-blue-200",
    "bg-yellow-200",
  ];
  return (
    <div className="flex w-full lg:border-none lg:pb-6 mx-auto max-w-screen-2xl flex-col lg:flex-row items-center justify-center lg:rounded-xl h-full">
      <div className="grid grid-cols-2 h-[80%]  sm:grid-cols-3 lg:grid-cols-4 w-full lg:w-[70.5vw]">
        {navRightData.map((item: NavItem, index: number) => (
          <div
            key={index}
            className="border-2 p-2 rounded-3xl lg:rounded-none lg:p-0 lg:border-none flex flex-col justify-start items-center lg:mt-4"
          >
            <a href='#'>
              <Image
                src={item.image || "/path/to/fallback-image.jpg"} // Add a fallback image if `item.image` is undefined
                alt={item.alt || "Fallback alt text"} // Provide a fallback alt text if `item.alt` is undefined
                className="rounded-xl cursor-pointer w-44 h-32 lg:w-56 lg:h-56 object-cover transform lg:hover:scale-80 transition-transform duration-200"
                width={224}
                height={224}
                loading="lazy"
              />
              <p className="mt-2 flex items-center justify-center space-x-2 text-center font-poppins invert-0 hover:text-[#483d78] hover:font-bold font-normal text-xs sm:text-sm md:text-base transform lg:hover:scale-80 transition-transform duration-300">
                <span>{item.title}</span>
              </p>
            </a>
          </div>
        ))}
      </div>
      <div className="hidden lg:flex ml-2 w-2 h-72 border-l border-gray-300"></div>
      {/* desktop view */}
      <div className="w-full lg:w-[20vw] h-32 ml-4 lg:h-auto hidden lg:flex flex-col justify-between mt-4 lg:mt-0">
        {navLeftData
          .slice(currentIndex, currentIndex + 2)
          .map((item: NavItem, index: number) => (
            <Link key={index} href="#">
              <div
                className={`hidden lg:flex border-t-2 h-[6.5rem] lg:border-none lg:hover:scale-80 transition-transform duration-200 items-center lg:p-4 lg:rounded-3xl lg:mb-2 ${
                  bgColors[index % bgColors.length]
                }`}
              >
                <div
                  className={`h-12 w-12 mr-4 flex justify-center items-center text-2xl ${item.textcolor}`}
                >
                  <Image
                    src={item.icon || "/path/to/fallback-image.jpg"} // Add a fallback image if `item.image` is undefined
                    alt={item.title}
                    className="rounded-xl cursor-pointer h-8 w-8 object-cover transform lg:hover:scale-80 transition-transform duration-200"
                    width={24}
                    height={24}
                    priority={index < 4}
                    loading={index < 4 ? "eager" : "lazy"}
                  />
                </div>
                <div>
                  <h3 className="text-sm sm:text-md text-black font-semibold mb-0">
                    {item.title}
                  </h3>
                  <p className="text-xs hidden lg:flex font-regular text-black line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        {/* Scroll Buttons */}
        <div className="hidden lg:flex w-full bg-gray-800 justify-center">
          {currentIndex > 0 && (
            <button
              onClick={scrollUp}
              className="absolute text-3xl invert-0 lg:top-[5%] top-[55%] rounded-full"
            ></button>
          )}
        </div>
        <div className="bottom-4 hidden lg:flex w-full justify-center text-3xl">
          {currentIndex < navLeftData.length - 2 && (
            <button
              onClick={scrollDown}
              className="absolute bg-transparent invert-0 flex justify-center items-center"
            ></button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutLayout;
