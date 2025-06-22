"use client";
import { HeroParallax } from "@/components/ui/hero-parallax";

export default function HomePage() {
  return <HeroParallax products={products} />;
}

// You can also import products from hero-parallax if you prefer:
// import { products } from "@/components/ui/hero-parallax";
export const products = [
  {
    title: "Web Development",
    description: "Custom web applications built with modern frameworks",
    thumbnail: "/images/services/web-dev.jpg",
  },
  // ... rest of your products
];