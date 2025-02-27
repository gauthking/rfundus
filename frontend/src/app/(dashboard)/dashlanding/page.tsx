import { Manrope } from "next/font/google";
import GridBg from "@/components/GridBg";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export default function Page() {
  return (
    <div
      className={`relative w-full h-screen bg-white text-black overflow-hidden ${manrope.className}`}
    >
      {/* <GridBg /> */}
    </div>
  );
}
