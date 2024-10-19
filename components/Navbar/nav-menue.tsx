"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export const Menu = ({ children }: { children: React.ReactNode }) => {
  const [active, setActive] = useState<string | null>(null);
  const [position, setPosition] = useState({ left: 500, width: 0, opacity: 0 });

  return (
    <nav
      onMouseLeave={() => {
        setActive(null);
        setPosition({ left: 400, width: 0, opacity: 0 });
      }}
      className="mx-auto px-4 flex w-fit rounded-full border-1"
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement, {
          setActive,
          active,
          setPosition,
        })
      )}
      <Cursor position={position} />
    </nav>
  );
};

 const MenuItem = ({
  setActive,
  active,
  item,
  link,
  setPosition,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  link?: string;

  setPosition: (position: {
    left: number;
    width: number;
    opacity: number;
  }) => void;
  children?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const handleMouseEnter = () => {
      if (!ref?.current) return;

      const { width } = ref.current.getBoundingClientRect();

      setPosition({
        left: ref.current.offsetLeft,
        width,
        opacity: 1,
      });

      setActive(item);
    };

    const element = ref.current;
    element.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [ref, setActive, setPosition, item]);
  const pathname = usePathname() || "";
  const componentCode = pathname.split("/")[2]?.toLowerCase();
  const componentCodeourCompany = pathname.split("/")[3]?.toLowerCase();

  return (
    <div ref={ref} className="z-10 cursor-pointer px-3 font-poppins">
      <a
        className="invert-0 text-base font-light"
        href={`/${link}`}
      >
        {item}
      </a>
      {active === item && (
        <motion.div className="absolute  top-[calc(100%_-_1.0rem)] left-0 pt-4">
          <motion.div
            transition={{ duration: 0.3 }}
            layoutId="active"
            className={`${
              ["knowledge-center", "clientele"].includes(
                componentCode
              ) || ["our-company"].includes(componentCodeourCompany)
                ? "bg-[#222222]"
                : "bg-white"
            } dark:bg-black overflow-hidden border border-black/[0.2]  shadow-xl`}
          >
            <motion.div layout className="w-screen mx-auto h-full px-12">
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

const Cursor = ({
  position,
}: {
  position: { left: number; width: number; opacity: number };
}) => {
  const pathname = usePathname() || "";
  const componentCodeourCompany = pathname.split("/")[3]?.toLowerCase();
  const componentCode = pathname.split("/")[2]?.toLowerCase();
  return (
    <motion.div
      animate={{
        left: position.left,
        width: position.width,
        opacity: position.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 1000,
        damping: 50,
      }}
      className={`${
        ["knowledge-center", "clientele", "ourcompany"].includes(
          componentCode
        ) || ["ourcompany"].includes(componentCodeourCompany)
          ? "bg-[#525252]"
          : "bg-[#eaeaea]"
      } absolute z-0 h-6 rounded-full md:h-6`}
    />
  );
};
export default MenuItem;