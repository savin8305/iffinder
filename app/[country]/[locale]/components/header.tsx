import LocaleSwitcher from "./LocaleSwitcher";
import { SlideTabs } from "./Navbar";

export const Navbar = ({
  translations,
}: {
  translations: Record<string, string>;
}) => {
  return (
    <div className="bg-neutral-100 py-1 fixed w-full z-[99999]">
      <div className="flex justify-center items-center  mx-auto px-4">
        <SlideTabs translations={translations} />
        <LocaleSwitcher/>
      </div>
    </div>
  );
};
