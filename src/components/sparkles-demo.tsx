"use client";
import React, { useState, useEffect } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion } from "framer-motion";

export default function SparklesPreview() {
  const [showText, setShowText] = useState(true);
  const words = ["Welcome to BDS", "Future", "Loading"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const wordTimer = setInterval(() => {
      setCurrentWordIndex((prev) => (prev < words.length - 1 ? prev + 1 : prev));
    }, 2500);

    return () => clearInterval(wordTimer);
  }, []);

  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-20 text-center"
      >
       <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-white mb-4 font-[Viga]">
      BDS
</h1>
        <p className="md:text-xl text-sm lg:text-2xl font-bold text-white mb-8">
          Business & Data Solutions
        </p>
        {showText && (
          <motion.div
            key={currentWordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-white text-xl md:text-3xl font-medium"
          >
            {words[currentWordIndex]}
          </motion.div>
        )}
      </motion.div>

      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
