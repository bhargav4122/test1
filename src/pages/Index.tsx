import React, { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Statistics from "@/components/Statistics";
import HowItWorks from "@/components/HowItWorks";
import CallToAction from "@/components/CallToAction";
import AnimatedBackground from "@/components/AnimatedBackground";
import ServicesOverview from '@/components/ServicesOverview';
import IndustrySection from '@/components/IndustrySection';
import Why from '@/components/Why';
import AnimatedTestimonialsDemo  from '@/components/animated-testimonials-demo';



const Index = () => {
//  const [showInitialAnimation, setShowInitialAnimation] = useState(true);
 // const [isLoading, setIsLoading] = useState(true);

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

  /*useEffect(() => {
    // Set a minimum load time of 2 seconds to ensure animation plays properly
    const minLoadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(minLoadTimer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // After minimum load time, show animation for 5 seconds
      const animationTimer = setTimeout(() => {
        setShowInitialAnimation(false);
      }, 2000);

      return () => clearTimeout(animationTimer);
    }
  }, [isLoading]);*/

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <AnimatedBackground />
          <main>
          <Hero />
          <Statistics />
           {/*<ServiceSections />*/}
          <ServicesOverview />
          <IndustrySection />
          <Features />
          <Why />
          <HowItWorks />
           {/*<Testimonials />*/}
          <AnimatedTestimonialsDemo />
          <CallToAction />
        
      </main>
     
    </div>
  );
};

export default Index;