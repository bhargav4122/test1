import { motion } from 'framer-motion';
import React, { useEffect, useCallback, lazy, Suspense } from "react";
import SEO from '@/components/common/SEO';

// Lazy load heavy components
const Statistics = lazy(() => import("@/components/home/Statistics"));
const HowItWorks = lazy(() => import("@/components/home/HowItWorks"));
const CallToAction = lazy(() => import("@/components/home/CallToAction"));
const ServicesOverview = lazy(() => import('@/components/home/ServicesOverview'));
const IndustrySection = lazy(() => import('@/components/home/IndustrySection'));
const Why = lazy(() => import('@/components/home/Why'));
const TestimonialSection = lazy(() => import('@/components/home/TestimonialSection'));
import { Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatWeDoSection from '@/components/home/WhatWeDoSection';
const About = lazy(() => import('@/components/home/About'));
import Layout from "@/components/layout/Layout";
import { useIsDesktop } from "@/hooks/useWindowSize";
import { cn } from "@/lib/utils";


// Premium Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-[400px] w-full flex flex-col items-center justify-center space-y-4">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-gray-500 dark:text-gray-400 font-medium animate-pulse"
    >
      Loading experience...
    </motion.p>
  </div>
);

const Index = () => {
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observerOption = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOption);

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (

    <>
      <SEO
        title="Business and Data Solutions"
        description="Comprehensive business solutions: Data & Cloud services, BI & Digital Transformation, Business Consulting, Market Research, Workforce Solutions, and Training & Development."
        keywords="business solutions, data services, cloud infrastructure, BI solutions, digital transformation, business consulting, market research, workforce solutions, training development, data analytics, digital marketing"
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BusinessSolutions",
            "name": "Business and Data Solutions",
            "url": "https://www.businessanddatasolutions.com/",
            "logo": "https://res.cloudinary.com/dsf4d41i8/image/upload/v1755995499/BDS_Logo_-_Original_with_Transparent_Background_-_5000x5000_vb9jll.png",
            "sameAs": [
              "https://www.linkedin.com/company/business-and-data-solutions",
              "https://twitter.com/bds_solutions"
            ],
            "description": "Comprehensive business solutions: Data & Cloud services, BI & Digital Transformation, Business Consulting, Market Research, and more.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "GB"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer support",
              "email": "contact@businessanddatasolutions.com"
            }
          })}
        </script>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </SEO>

      {/* Full-page glass overlay */}
      <div
        className="fixed inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-sm -z-10"
        aria-hidden="true"
      />

      <Suspense fallback={<LoadingFallback />}>
        <main className="relative">
          <WhatWeDoSection />
          <Statistics />

          {/* Core sections - responsive layout managed within components */}
          <ServicesOverview />
          <IndustrySection />
          <Why />
          {/* Use Cases Feature Banner */}
          <section className="py-12 px-4">
            <div className={cn(
              "max-w-6xl mx-auto rounded-[2rem] p-8 md:p-12 border overflow-hidden relative group",
              "bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
            )}>
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Rocket size={200} />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl">
                  <h3 className="text-2xl md:text-4xl font-bold mb-4">See how we solve complex challenges</h3>
                  <p className="text-blue-100 text-lg">From AI automation to global cloud migrations, explore our strategic implementation success stories.</p>
                </div>
                <Link
                  to="/use-cases"
                  className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:shadow-2xl transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  View Case Studies
                </Link>
              </div>
            </div>
          </section>

          <TestimonialSection />
          <CallToAction pageType="home" />
        </main>
      </Suspense>
    </>
  );
};

export default React.memo(Index);