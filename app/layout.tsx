import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your App Title",
  description: "Description of your app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Your App Title</title>
      </head>
      <body className={`${inter.className} h-full`}>
        {children} {/* Renders all pages */}
      </body>
    </html>
  );
}
