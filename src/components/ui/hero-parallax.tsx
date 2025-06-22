"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
// Removed: import { CardBody, CardContainer, CardItem } from "./3d-card";

interface Product {
  title: string;
  description: string;
  thumbnail: string;
}

interface HeroParallaxProps {
  products: Product[];
}

export const HeroParallax = ({ products }: HeroParallaxProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // New: Parallax transforms for product rows
  const productRow1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const productRow2Y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      {/* Background with parallax effect */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/30" />
        <img
          src="/images/backgrounds/tech-pattern.jpg"
          alt="Background pattern"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
        <motion.div style={{ y: textY, opacity }} className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Our Products & Services
          </h2>
          <p className="max-w-2xl text-lg text-gray-300">
            Discover our innovative solutions that drive business transformation
          </p>
        </motion.div>

        {/* Product Cards with Parallax effect */}
        <div className="space-y-16">
          {/* Row 1: Moves up faster */}
          <motion.div style={{ y: productRow1Y }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-lg transition-all duration-300 hover:shadow-primary/30">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-48 w-full object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
                <p className="text-gray-300 text-sm">{product.description}</p>
              </div>
            ))}
          </motion.div>

          {/* Row 2: Moves down slower */}
          <motion.div style={{ y: productRow2Y }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(3, 6).map((product, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-lg transition-all duration-300 hover:shadow-primary/30">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-48 w-full object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
                <p className="text-gray-300 text-sm">{product.description}</p>
              </div>
            ))}
          </motion.div>

          {/* Add more rows as needed, adjusting the slice and parallax effect */}
        </div>
      </div>
    </div>
  );
};

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}

export const products = [
  {
    title: "Web Development",
    description: "Custom web applications built with modern frameworks like React, Next.js, and Node.js",
    thumbnail: "/images/services/web-dev.jpg",
  },
  {
    title: "Mobile Apps",
    description: "Cross-platform mobile applications for iOS and Android using React Native and Flutter",
    thumbnail: "/images/services/mobile-apps.jpg",
  },
  {
    title: "Cloud Solutions",
    description: "Scalable and secure cloud infrastructure and services on AWS, Azure, and GCP.",
    thumbnail: "/images/services/cloud-solutions.jpg",
  },
  {
    title: "AI & Machine Learning",
    description: "Intelligent solutions leveraging AI, ML, and data science for automation and insights.",
    thumbnail: "/images/services/ai-ml.jpg",
  },
  {
    title: "UI/UX Design",
    description: "Creating intuitive and engaging user interfaces with a focus on user experience.",
    thumbnail: "/images/services/ui-ux.jpg",
  },
  {
    title: "Cybersecurity",
    description: "Robust security measures and strategies to protect your digital assets and data.",
    thumbnail: "/images/services/cybersecurity.jpg",
  },
  // ... (add more products if you have them, ensure you have at least 6 for the two rows)
];