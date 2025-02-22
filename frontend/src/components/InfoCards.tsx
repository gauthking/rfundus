"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const infoCards = [
  {
    title: "For Customers",
    content: "Get VAT refunds in your local currency with minimal fees.",
  },
  {
    title: "For Merchants",
    content: "Simplify VAT refunds, ensuring customer satisfaction worldwide.",
  },
  {
    title: "Blockchain-Powered",
    content: "Secure and fast refunds using stablecoins like USDT/USDC.",
  },
  {
    title: "Global Coverage",
    content: "Cross-border shopping with instant local refunds.",
  },
  {
    title: "No Paperwork",
    content: "Scan, submit, and get your refund within minutes.",
  },
];

export default function InfoCards() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === infoCards.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative top-[72px]  h-40 w-full rounded-lg  bg-green-50 p-4 shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className=" w-full h-full flex flex-col text-center justify-center gap-2"
        >
          <h3 className="text-xl font-bold text-green-600">
            {infoCards[currentIndex].title}
          </h3>
          <p className="text-gray-700 text-sm md:text-base">
            {infoCards[currentIndex].content}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
