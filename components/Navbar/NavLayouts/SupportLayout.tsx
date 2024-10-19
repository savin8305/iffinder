import React, { useEffect, useRef, useState } from "react";
// import bgPick from "../../../../public/assets/nav_support/BgMapImage.png";
import Link from "next/link";
import { NavbarData } from "../types/constant";

type SupportItem = {
  title: string;
  link: string;
  image: string;
};

interface SupportGridProps {
  navData: NavbarData;
}

const SupportGrid: React.FC<SupportGridProps> = ({ navData }) => {
  // Extracting support items and ensuring it's an array
  const supportData = navData?.navbar[3]?.data;
  const supportItems = Array.isArray(supportData?.supportItem) ? supportData.supportItem : [];
  const mobileItem = supportData?.SupportMobile || { mobileFirst: "", mobileSecond: "" };

  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    console.log("i am in support comp", supportItems); // Logging the support items
    checkScrollability();
  }, []);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.clientWidth,
        behavior: "smooth",
      });
      checkScrollability();
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.clientWidth,
        behavior: "smooth",
      });
      checkScrollability();
    }
  };

  // Determine whether arrows should be shown based on item count
  const shouldShowArrows = supportItems.length > 4;

  // Function to chunk items into groups of 4
  const chunkItems = (arr: SupportItem[], size: number): SupportItem[][] =>
    arr.length ? [arr.slice(0, size), ...chunkItems(arr.slice(size), size)] : [];

  const paginatedItems = chunkItems(supportItems, 4);

  return (
    <div className="relative flex flex-row items-center mx-auto max-w-screen-2xl justify-center lg:p-2 w-full">
      {/* desktop view */}
      {shouldShowArrows && (
        <button
          className="h-12 w-20 z-20 rounded-full flex items-center justify-center disabled:opacity-50"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
        </button>
      )}
      <div
        className={`hidden lg:flex overflow-x-auto py-8 ${
          shouldShowArrows ? "scroll-smooth" : ""
        } [scrollbar-width:none] gap-8`}
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        {supportItems.map((item, index) => (
          <Link key={index} className="flex flex-col space-y-4" href="#">
            <div
              className="flex-shrink-0 w-72 h-40 rounded-3xl p-4 flex flex-col justify-center items-center bg-cover bg-center"
              // style={{ backgroundImage: `url(${bgPick.src})` }}
            >
             
            </div>

            <p className="relative font-poppins text-center mt-4 invert-0 font-normal hover:text-[#483d78] hover:font-semibold text-base">
              {item.title}
            </p>
          </Link>
        ))}
      </div>
      {shouldShowArrows && (
        <button
          className="h-12 w-20 z-20 rounded-full flex items-center justify-center disabled:opacity-50"
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
        </button>
      )}
      {/* mobile view */}

      <div className="relative p-1 h-screen  flex lg:hidden flex-col items-center">
        <div
          className="w-full h-[45%] py-2 overflow-x-scroll scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="flex flex-row gap-2">
            {paginatedItems.map((group, groupIndex) => (
              <div
                key={`slide-${groupIndex}`}
                className="min-w-full p-1 grid grid-cols-2 grid-rows-2 gap-4"
              >
                {group.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="relative w-40 h-36 border-[1px] bg-white rounded-xl  flex flex-col justify-start items-center p-2"
                   
                  >
                    <div className="relative w-32 bg-white rounded-xl border-[1px] h-16 flex justify-center items-center"></div>
                    <p className="relative font-poppins text-center mt-4 invert-0 font-medium hover:text-[#483d78] hover:font-bold text-16">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {shouldShowArrows && (
          <div className="flex h-[5%] justify-center w-full ">
            <button
              className="h-12 w-12 rounded-full flex items-start justify-center disabled:opacity-50"
              onClick={scrollLeft}
              disabled={!canScrollLeft}
            >
            </button>
            <button
              className="h-12 w-12 rounded-full flex items-start justify-center disabled:opacity-50"
              onClick={scrollRight}
              disabled={!canScrollRight}
            >
            </button>
          </div>
        )}
        <div className="flex lg:hidden h-[50%] flex-col w-full mt-4">
          <p className="invert-0 pl-4 text-lg font-poppins font-medium">
            Give us a Call:
          </p>
          <div className="flex justify-between items-center border-b-2 h-28 flex-row pt-6">
            <p
              className="invert-0 text-lg flex flex-row gap-2 items-center"
              style={{
                backgroundImage:
                  "url('https://i.pinimg.com/236x/76/c8/c0/76c8c0172ba662b6fb6d0c095c1158fe.jpg')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                padding: "5px 10px",
              }}
            >
              {mobileItem.mobileFirst}
            </p>
            <div className="w-1 h-20 border-l-2"></div>
            <p
              className="invert-0 text-lg flex flex-row gap-2 items-center"
              style={{
                backgroundImage:
                  "url('https://i.pinimg.com/236x/76/c8/c0/76c8c0172ba662b6fb6d0c095c1158fe.jpg')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                padding: "5px 10px",
              }}
            >
              {mobileItem.mobileSecond}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportGrid;