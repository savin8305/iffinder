"use client";

import clsx from "clsx";
import { useRouter, usePathname, useParams } from "next/navigation"; // Correct imports
import { ChangeEvent, ReactNode, useTransition } from "react";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;

    startTransition(() => {
      // Ensure params.country and params.locale are strings
      const country = Array.isArray(params.country)
        ? params.country[0]
        : params.country;
      const locale = Array.isArray(params.locale)
        ? params.locale[0]
        : params.locale;

      // Construct new path using country and locale as strings
      const newPathname = `/${country}/${nextLocale}${pathname.substring(
        pathname.indexOf(locale) + locale.length
      )}`;

      // Update the route using router.replace() without passing a `locale` option
      router.replace(newPathname);
    });
  }

  return (
    <label
      className={clsx(
        "relative text-gray-400",
        isPending && "transition-opacity pt-36 [&:disabled]:opacity-30"
      )}
    >
      <p className="sr-only">{label}</p>
      <select
        className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
    </label>
  );
}
