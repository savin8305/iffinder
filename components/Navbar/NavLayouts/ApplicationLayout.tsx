import { useEffect, useState } from "react";
const HandBurgerBox = dynamic(() => import("../../Icons/HandBurgerBox"), { ssr: false });
const LunchBox = dynamic(() => import("../../Icons/LunchBox"), { ssr: false });
const PaperBlank = dynamic(() => import("../../Icons/PaperBlank"), { ssr: false });
const PaperBowl = dynamic(() => import("../../Icons/PaperBowl"), { ssr: false });
const PaperCup = dynamic(() => import("../../Icons/PaperCup"), { ssr: false });
const PaperCupWithLid = dynamic(() => import("../../Icons/PaperCupWithLid"), { ssr: false });
const PaperCupWithSleeve = dynamic(() => import("../../Icons/PaperCupWithSleeve"), { ssr: false });
const PaperCutlery = dynamic(() => import("../../Icons/PaperCutlery"), { ssr: false });
const PaperPlate = dynamic(() => import("../../Icons/PaperPlate"), { ssr: false });
const PaperRoll = dynamic(() => import("../../Icons/PaperRoll"), { ssr: false });
const PaperStraw = dynamic(() => import("../../Icons/PaperStraw"), { ssr: false });
const PopcornTub = dynamic(() => import("../../Icons/PopcornTub"), { ssr: false });
const PositionAwareButton = dynamic(() => import("../../ui/PositionAwareButton"), { ssr: false });
import { Button } from "../../ui/button";
import dynamic from "next/dynamic";
import { NavbarData } from "../types/constant";
interface Product {
  id: string;
  name: string;
  description: string;
}

const componentList = [
  PaperCutlery,
  PaperCupWithSleeve,
  PaperCupWithLid,
  PaperCup,
  PopcornTub,
  LunchBox,
  PaperStraw,
  PaperRoll,
  PaperPlate,
  PaperBowl,
  PaperBlank,
  HandBurgerBox,
];
interface ApplicationLayoutProps{
  navData:NavbarData;
}
export default function ApplicationLayout({navData}:ApplicationLayoutProps) {
  const applicationData =navData?.navbar[2].data?.applications;
  useEffect(()=>{
   console.log("i am inside applciation alyout",applicationData);
   
  })
  const [activeProduct, setActiveProduct] = useState<Product>(
    applicationData[0]
  );
  return (
    <div className="flex flex-col md:flex-row w-full h-full p-4">
      <div className="relative md:w-[70%] grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 mb-4 md:mb-0 md:mr-4">
        {applicationData.map((product, index) => {
          const IconComponent = componentList[index];
          return (
            <div
              key={product.id}
              className="flex flex-col items-center justify-center p-2 invert-0 cursor-pointer"
              onMouseEnter={() => setActiveProduct(product)}
            >
              <div className=" h-20 w-20 flex items-center justify-center">
                <IconComponent />
              </div>
              <span className="text-xs text-center invert-0">
                {product.name}
              </span>
            </div>
          );
        })}

        <div className="absolute bottom-4 right-4">
          <Button className="rounded-full flex items-center bg-primary text-primary-foreground hover:bg-white hover:text-black border border-black px-1 py-2 text-base font-regular group">
            <span className="flex-grow ml-2 text-center">View All</span>
            <span className="ml-2 bg-white rounded-full p-1 transition-colors duration-200 group-hover:bg-black">
            </span>
          </Button>
        </div>
      </div>

      <div className="md:w-[30%] border-l p-6 flex flex-col  relative">
        <div className="absolute inset-0 px-8  h-full w-full opacity-5 pointer-events-none">
          {(() => {
            const ActiveIconComponent =
              componentList[
                applicationData.findIndex((p) => p.id === activeProduct.id)
              ];
            return <ActiveIconComponent width={"100%"} />;
          })()}
        </div>
        <div className="relative w-full  z-10">
          <h2 className="w-full text-5xl font-semibold">
            <span className="text-[#9e9c9c]">
              {activeProduct?.name.trim().replace(/\s+\S+$/, "")}
            </span>{" "}
            <span className="text-[#dc0e2a]">
              {activeProduct?.name.trim().match(/\S+$/)}
            </span>
          </h2>
          <p className="pt-6 invert-0 mb-4">{activeProduct.description}</p>
        </div>
        <div className="absolute bottom-6 right-8 z-10">
          <PositionAwareButton text={"Explore More"} icon={true} />
        </div>
      </div>
    </div>
  );
}
