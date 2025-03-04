import { Manrope } from "next/font/google";
import Image from "next/image";
import logo from "../../../public/assets/images/temp_log.png";
import Link from "next/link";
import GridBg from "@/components/GridBg";

const manrope = Manrope({ subsets: ["latin"] });

export default function Page() {
  return (
    <div
      className={`relative w-full h-screen bg-white text-black overflow-hidden ${manrope.className}`}
    >
      <header className="absolute top-0 left-0 right-0 z-10 p-3">
        <nav className="flex justify-between items-center max-w-8xl mx-auto p-2">
          <div className="flex items-center">
            <div className="w-14 h-14 md:w-20 md:h-20">
              <Image src={logo} alt="logo"></Image>
            </div>
            <span className="text-lg md:text-2xl font-bold">RFND.US</span>
          </div>
          <ul className="flex space-x-6 mx-6">
            <li>
              <a href="#" className="hover:text-gray-300">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <div className="absolute top-[44%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <h1 className="text-4xl md:text-4xl lg:text-7xl font-bold mb-8 mx-auto">
          Global VAT Refunds. Faster, Simpler, Smarter
        </h1>
        <h2 className="text-sm md:text-xl mb-10">
          Quick and compliant refunds with stablecoins—globally trusted, locally
          delivered
        </h2>
        <Link href={"/onboard"}>
          <button className="bg-black text-white font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition duration-300 text-xs md:text-lg">
            Start App
          </button>
        </Link>
      </div>
      <GridBg />
    </div>
  );
}
