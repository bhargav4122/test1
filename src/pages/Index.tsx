import React, { useEffect } from "react";
import Hero from "@/components/home/Hero";
import Hero1 from "@/components/about/Hero";
import Features from "@/components/home/Features";
import Statistics from "@/components/home/Statistics";
import HowItWorks from "@/components/home/HowItWorks";
import CallToAction from "@/components/home/CallToAction";
import AnimatedBackground from "@/components/home/AnimatedBackground";
import ServicesOverview from '@/components/home/ServicesOverview';
import IndustrySection from '@/components/home/IndustrySection';
import Why from '@/components/home/Why';
import AnimatedTestimonialsDemo from '@/components/home/animated-testimonials-demo';
import "../index.css";

const Index = () => {
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if(position.top < window.innerHeight && position.bottom >= 0) {
          element.classList.add('animate-fade-in');
        }
      });
    };
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-white dark:bg-black">
      {/* Full-page glass overlay */}
      <div className="fixed inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-sm -z-10"></div>
      
      <AnimatedBackground />
      
      <main className="relative">
        <Hero />
        <Statistics />
        <ServicesOverview />
        <IndustrySection />
       {/* <Features />*/}
        <Why />
        <Hero1/>
        <HowItWorks />
         {/* Full-page glass overlay 
         <AnimatedTestimonialsDemo /> */}
        <CallToAction />
      </main>
    </div>
  );
};

export default Index;
