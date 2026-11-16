
import type { Metadata } from "next";
import { Geist, Geist_Mono, Marcellus, Pinyon_Script } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Brand fonts, chosen to match the business card.
const marcellus = Marcellus({
  variable: "--font-marcellus",
  weight: "400",
  subsets: ["latin"],
});

const pinyonScript = Pinyon_Script({
  variable: "--font-pinyon",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Evelyn Rush Solutions | Professional Cleaning Services",
  description:
    "Discover Evelyn Rush Solutions through Rush Connect. Explore cleaning services, learn about the business, and get in touch with inquiries.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${marcellus.variable} ${pinyonScript.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
