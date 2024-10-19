import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavbarData } from "../types/constant";

type SupportItem = {
  title: string;
  image: string;
  bgPic: string; // Corrected property name
};
interface VideoLayoutGridProps{
  navData: NavbarData;
}
const VideoGrid: React.FC<VideoLayoutGridProps> = ({navData}) => {
  const videoData = navData?.navbar[5]?.data;
  const videoDataItem = videoData?.videoDataItem || [];

  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
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

 

  const shouldShowArrows = videoDataItem.length > 5;

  const chunkItems = (arr: SupportItem[], size: number): SupportItem[][] =>
    arr.length
      ? [arr.slice(0, size), ...chunkItems(arr.slice(size), size)]
      : [];

  const paginatedItems = chunkItems(videoDataItem, 5);
  return (
    <div className="relative flex flex-row items-center mx-auto max-w-screen-2xl justify-center lg:p-2 w-full">
      <div
        className={`hidden lg:flex  overflow-x-auto py-2 ${
          shouldShowArrows ? "scroll-smooth" : ""
        } [scrollbar-width:none] gap-6`}
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        {videoDataItem.map((item, index) => (
          <div key={index} className="flex cursor-grab flex-col space-y-4">
            <Link href="#">
              <div
                className="relative flex-shrink-0 cursor-grab w-80 h-48 bg-[#f2f2f2] rounded-3xl  flex flex-col justify-center items-center"
               
              >
                <div className="relative w-full h-full flex justify-center items-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={96}
                    height={96}
                    className="object-cover h-full w-full rounded-xl"
                  />
                </div>
              </div>
              <p className="relative font-poppins text-center mt-4 invert-0 font-normal hover:text-[#483d78] hover:font-semibold text-base">
                {item.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
      {/* mobile view */}

      <div className="relative p-1 h-screen  flex lg:hidden flex-col items-center">
        <div
          className="w-full h-[50%] py-2 overflow-x-scroll scroll-smooth [scrollbar-width:none]"
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
                    <div className="relative w-32 bg-white rounded-xl border-[1px] h-16 flex justify-center items-center">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={96}
                        height={96}
                        className="object-contain h-16 w-32"
                      />
                    </div>
                    <p className="relative font-poppins text-center mt-4 invert-0 font-medium hover:text-[#483d78] hover:font-bold text-16">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* bottom arrow and items */}
        {shouldShowArrows && (
          <div className="flex h-[5%] justify-center  w-full ">
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
        <div className="h-[50%] w-full">
          <div className="h-full pb-40 overflow-y-auto w-full">
            {videoDataItem.map((item, index) => (
              <div key={index} className="flex flex-col space-y-4">
                <Link
                 href="#"
                  className="flex felx-row justify-between items-center border-t-[1px]  p-4"
                >
                  <div className="flex flex-row space-x-3">
                    <div className="h-full w-6 flex items-center">
                      <Image
                        className="h-6 w-6"
                        width={10}
                        height={10}
                        src={item.bgPic}
                        alt={item.title}
                      />
                    </div>
                    <p className="text-base">{item.title}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default VideoGrid;