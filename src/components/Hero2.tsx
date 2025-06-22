// src/components/Hero.tsx (or src/sections/Hero.tsx)
import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles"; // Assuming styles.ts is in src/
import BDSCanvas from "./canvas/BDSCanvas"; // Adjusted import path

const Hero2: React.FC = () => {
  const bdsPrimaryColor = "#00AFFF"; // BDS Blue

  return (
    <section className={`relative w-full h-screen mx-auto bg-[#0a0f1f]`}> {/* Dark background */}
      <div
        className={`absolute inset-0 top-[100px] sm:top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div
            className='w-5 h-5 rounded-full'
            style={{ backgroundColor: bdsPrimaryColor }}
          />
          <div
            className='w-1 sm:h-80 h-40'
            style={{ background: `linear-gradient(to bottom, ${bdsPrimaryColor}, transparent)` }}
          />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            BDS: <span style={{ color: bdsPrimaryColor }}>Business</span> &
            <br className='sm:block hidden' />
            <span style={{ color: bdsPrimaryColor }}>Data</span> Solutions
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            Empowering your decisions with <br className='sm:block hidden' />
            intelligent insights and transformative technology.
          </p>
        </div>
      </div>

      <BDSCanvas />

      {/* Scroll down indicator */}
      <div className='absolute xs:bottom-10 bottom-16 w-full flex justify-center items-center'>
        <a href='#about'> {/* This should ideally link to an actual section ID on your page */}
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-gray-600 flex justify-center items-start p-2 hover:border-gray-400 transition-colors'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-gray-400 mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero2;