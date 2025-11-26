import React, { useEffect } from "react";
import { Helmet } from 'react-helmet-async';
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
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Business and Data Solutions | Complete Business Services Partner</title>
        <meta 
          name="description" 
          content="Comprehensive business solutions: Data & Cloud services, BI & Digital Transformation, Business Consulting, Market Research, Workforce Solutions, and Training & Development." 
        />
        <meta 
          name="keywords" 
          content="business solutions, data services, cloud infrastructure, BI solutions, digital transformation, business consulting, market research, workforce solutions, training development, data analytics, digital marketing" 
        />
        <link rel="canonical" href="https://www.businessanddatasolutions.com/" />
        <meta property="og:title" content="Business and Data Solutions | BDS | Complete Business Services Partner" />
        <meta 
          property="og:description" 
          content="Comprehensive business solutions: Data & Cloud services, BI & Digital Transformation, Business Consulting, Market Research, Consumer voice, Digital Marketing and more." 
        />
        <meta property="og:url" content="https://www.businessanddatasolutions.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://res.cloudinary.com/dsf4d41i8/image/upload/v1755995499/BDS_Logo_-_Original_with_Transparent_Background_-_5000x5000_vb9jll.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Business and Data Solutions | BDS | Complete Business Services Partner" />
        <meta 
          name="twitter:description" 
          content="Comprehensive business solutions: Data & Cloud services, BI & Digital Transformation, Business Consulting, Market Research, and more." 
        />
        <meta name="twitter:image" content="https://res.cloudinary.com/dsf4d41i8/image/upload/v1755995499/BDS_Logo_-_Original_with_Transparent_Background_-_5000x5000_vb9jll.png" />
      </Helmet>

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
