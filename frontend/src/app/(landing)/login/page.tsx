"use client";
import React, { useState } from "react";
import AuthCustomer from "@/components/AuthCustomer";
import AuthMerchant from "@/components/AuthMerchant";
import { Manrope } from "next/font/google";
import { Grid, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import InfoCards from "@/components/InfoCards";
import logo from "../../../../public/assets/images/temp_log.png";

const manrope = Manrope({ subsets: ["latin"] });

function Scene() {
  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Grid
        renderOrder={-1}
        position={[0, 0, 0]}
        infiniteGrid
        cellSize={1}
        cellThickness={0.5}
        sectionSize={3}
        sectionThickness={1}
        sectionColor="#16ba86"
        cellColor="#21d8a7"
        fadeDistance={50}
      />
    </>
  );
}

export default function Page() {
  const [type, setType] = useState<String | null>("customer");

  return (
    <main
      className={`relative w-full h-screen overflow-scroll bg-white text-black ${manrope.className}`}
    >
      <section className="absolute z-10 w-[85%] md:w-[50%] top-[54%] md:top-[44%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col lg:flex-row justify-between items-center shadow-lg shadow-green-500/15 rounded-xl">
        <section className="rounded-xl w-full lg:w-[55%] border-[1px] p-3 flex flex-col items-center bg-white py-5">
          <h1 className="font-bold text-lg md:text-xl text-gray-600">
            welcome to the portal.
          </h1>

          <div className="mx-2 w-full flex justify-between items-center rounded-xl bg-gray-50 mt-3 p-1">
            <p
              onClick={() => setType("customer")}
              className={`font-mono w-full flex items-center justify-center text-sm bg-gray-100 p-2 rounded-l-xl cursor-pointer ${
                type === "customer" ? "bg-green-500/15" : ""
              }`}
            >
              customer login
            </p>
            <p
              onClick={() => setType("merchant")}
              className={`font-mono w-full flex items-center justify-center text-sm bg-gray-100 p-2 rounded-r-xl cursor-pointer ${
                type === "merchant" ? "bg-green-500/15" : ""
              }`}
            >
              merchant login
            </p>
          </div>

          {type === "customer" ? (
            <AuthCustomer />
          ) : type === "merchant" ? (
            <AuthMerchant />
          ) : (
            ""
          )}
        </section>

        <section className="flex flex-col justify-between h-full w-full lg:w-[45%]">
          <div className="w-24 h-24 relative top-12 md:w-44 md:h-44 mx-auto">
            <Image src={logo} alt="logo" />
          </div>
          <InfoCards />
        </section>
      </section>

      <Canvas
        shadows
        camera={{ position: [30, 30, 30], fov: 50 }}
        className="absolute inset-0"
      >
        <Scene />
      </Canvas>
    </main>
  );
}
