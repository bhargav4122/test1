import React, { useEffect, useCallback, lazy, Suspense } from "react";
import { Helmet } from 'react-helmet-async';

// Lazy load heavy components
const Features = lazy(() => import("@/components/home/Features"));
const Statistics = lazy(() => import("@/components/home/Statistics"));
const HowItWorks = lazy(() => import("@/components/home/HowItWorks"));
const CallToAction = lazy(() => import("@/components/home/CallToAction"));
const AnimatedBackground = lazy(() => import("@/components/home/AnimatedBackground"));
const ServicesOverview = lazy(() => import('@/components/home/ServicesOverview'));
const IndustrySection = lazy(() => import('@/components/home/IndustrySection'));
const Why = lazy(() => import('@/components/home/Why'));
const AnimatedTestimonialsDemo = lazy(() => import('@/components/home/animated-testimonials-demo'));
const WhatWeDoSection = lazy(() => import('@/components/home/WhatWeDoSection'));
const About = lazy(() => import('@/components/home/About'));

// Custom hook for media queries
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = React.useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

const useIsMobile = () => useMediaQuery('(max-width: 768px)');
const useIsDesktop = () => useMediaQuery('(min-width: 769px)');

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
    <div className="animate-pulse text-lg">Loading...</div>
  </div>
);

const Index = () => {
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();

  // Optimized scroll animation with throttling
  const animateOnScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
      const position = element.getBoundingClientRect();
      if (position.top < windowHeight * 0.85 && position.bottom >= 0) {
        element.classList.add('animate-fade-in');
      }
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          animateOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial animation check
    animateOnScroll();
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [animateOnScroll]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-white dark:bg-black">
      {/* SEO Meta Tags - Preload critical resources */}
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
        
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </Helmet>

      {/* Full-page glass overlay */}
      <div 
        className="fixed inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-sm -z-10"
        aria-hidden="true"
      />
      
      <Suspense fallback={<LoadingFallback />}>
        <main className="relative">
          <WhatWeDoSection />
          <Statistics />
          <About />
          <Why />
          
          {/* Show these sections only on desktop */}
          {isDesktop && (
            <>
              <ServicesOverview />
              <IndustrySection />
              <HowItWorks />
            </>
          )}
          
          <CallToAction />
        </main>
      </Suspense>
    </div>
  );
};

export default React.memo(Index);
