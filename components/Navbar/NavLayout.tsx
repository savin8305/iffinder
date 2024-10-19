import NavbarDemo from "./Navbar";
import { NavbarData } from "./types/constant";

async function fetchNavData(): Promise<NavbarData | null> {
  try {
    const res = await fetch(
      "https://jsondatafromhostingertosheet.nesscoindustries.com/en/navbar.json",
      {
        cache: "no-store", // Ensures no caching, always fetch fresh data
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    const res = await fetch(
      "https://jsondatafromhostingertosheet.nesscoindustries.com/en/navbar (m).json",
      {
        cache: "no-store", // Ensures no caching for the fallback as well
      }
    );
    const data = await res.json();
    return data;
  }
}

export default async function NavLayout() {
  const navData = await fetchNavData();
  return (
    <>
      <NavbarDemo navData={navData} />
    </>
  );
}
