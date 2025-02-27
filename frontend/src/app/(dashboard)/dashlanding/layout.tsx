import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import DashNav from "@/components/DashNav";
import SideNavMain from "@/components/SideNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "rfnd.us",
  description: "stablecoin powered vat-refund system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative w-full h-screen bg-white text-black overflow-hidden`}
      >
        <DashNav />
        <SideNavMain />
        {children}
      </body>
    </html>
  );
}
