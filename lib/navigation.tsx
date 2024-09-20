"use client"
import { usePathname, useRouter } from "next/navigation"; // Import from 'next/navigation', not '@/lib/navigation'

export default function NavigateButton() {
  const router = useRouter();
  const pathname = usePathname();

  function handleNavigate() {
    const [countryCode, localeCode, ...rest] = pathname.split("/").filter(Boolean);
    const newPage = "about"; 
    const newPath = `/${countryCode}/${localeCode}/${newPage}`;

    router.push(newPath); // Navigate to the new path
  }

  return (
    <button onClick={handleNavigate}>
      Go to About Page
    </button>
  );
}
