import React, { memo, useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Cloud, BarChart3, Megaphone, Users, Briefcase, Cpu } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Memoized icon components with proper typing
const MemoizedIcons = {
  Cloud: memo(Cloud),
  BarChart3: memo(BarChart3),
  Megaphone: memo(Megaphone),
  Users: memo(Users),
  Briefcase: memo(Briefcase),
  Cpu: memo(Cpu),
  ArrowRight: memo(ArrowRight),
  Calendar: memo(Calendar),
} as const;

// Constants outside component to prevent recreation
const INDUSTRIES = [
  { icon: "Cloud", text: "All Industries" },
  { icon: "BarChart3", text: "All Sectors" },
  { icon: "Users", text: "All Business Types" },
] as const;

const BACKGROUND_VIDEO_SOURCES = {
  desktop: {
    webm: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_webm,q_auto:good,w_1920/v1753041808/Google_Gemini_n4h8by.mp4",
    mp4: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_mp4,q_auto:good,w_1920/v1753041808/Google_Gemini_n4h8by.mp4"
  },
  mobile: {
    webm: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_webm,q_auto:eco,w_640/v1753041808/Google_Gemini_n4h8by.mp4",
    mp4: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_mp4,q_auto:eco,w_640/v1753041808/Google_Gemini_n4h8by.mp4"
  },
  fallback: "https://res.cloudinary.com/dsf4d41i8/video/upload/v1753041808/Google_Gemini_n4h8by.mp4"
} as const;

const STORY_VIDEO_SOURCES = {
  desktop: {
    webm: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_webm,q_auto:good,w_1280/v1764231049/Untitled_Video_-_Made_With_Clipchamp_1_uwghpv.mp4",
    mp4: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_mp4,q_auto:good,w_1280/v1764231049/Untitled_Video_-_Made_With_Clipchamp_1_uwghpv.mp4"
  },
  mobile: {
    webm: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_webm,q_auto:eco,w_640/v1764231049/Untitled_Video_-_Made_With_Clipchamp_1_uwghpv.mp4",
    mp4: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_mp4,q_auto:eco,w_640/v1764231049/Untitled_Video_-_Made_With_Clipchamp_1_uwghpv.mp4"
  },
  fallback: "https://res.cloudinary.com/dsf4d41i8/video/upload/v1764231049/Untitled_Video_-_Made_With_Clipchamp_1_uwghpv.mp4"
} as const;

// Animation variants outside component
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

// Optimized IndustryItem with proper typing
interface IndustryItemProps {
  icon: keyof typeof MemoizedIcons;
  text: string;
}

const IndustryItem = memo(({ icon, text }: IndustryItemProps) => {
  const IconComponent = MemoizedIcons[icon];
  return (
    <div className="flex items-center space-x-2">
      <IconComponent className="h-4 w-4 text-primary" />
      <span>{text}</span>
    </div>
  );
});

IndustryItem.displayName = 'IndustryItem';

// Custom hook for mobile detection
const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    
    let ticking = false;
    const handleResize = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          checkMobile();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

// Custom hook for video loading
const useVideoLoad = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 3) {
      setVideoLoaded(true);
    }
  }, []);

  return { videoRef, videoLoaded, handleVideoLoad };
};

function WhatWeDoSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: '50px 0px'
  });

  const isMobile = useMobileDetection();
  const { videoRef: backgroundVideoRef, videoLoaded: backgroundVideoLoaded, handleVideoLoad: handleBackgroundVideoLoad } = useVideoLoad();
  const navigate = useNavigate();

  // Memoized navigation handlers
  const handleServicesClick = useCallback(() => {
    navigate('/services');
  }, [navigate]);

  const handleConsultationClick = useCallback(() => {
    navigate('/consultation');
  }, [navigate]);

  // Memoized video sources
  const currentBackgroundVideoSources = isMobile ? BACKGROUND_VIDEO_SOURCES.mobile : BACKGROUND_VIDEO_SOURCES.desktop;
  const currentStoryVideoSources = isMobile ? STORY_VIDEO_SOURCES.mobile : STORY_VIDEO_SOURCES.desktop;

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background Video - Optimized with preload="none" for lazy loading */}
      <video
        ref={backgroundVideoRef}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
          backgroundVideoLoaded ? 'opacity-15' : 'opacity-0'
        }`}
        style={{
          filter: 'brightness(1.1) contrast(1.1)',
          transform: 'translateZ(0)'
        }}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="https://res.cloudinary.com/dsf4d41i8/image/upload/w_50,q_auto,f_auto/v1753041808/Google_Gemini_n4h8by.jpg"
        onLoadedData={handleBackgroundVideoLoad}
      >
        <source src={currentBackgroundVideoSources.webm} type="video/webm" />
        <source src={currentBackgroundVideoSources.mp4} type="video/mp4" />
        <source src={BACKGROUND_VIDEO_SOURCES.fallback} type="video/mp4" />
      </video>

      {/* Background effects */}
      <div
        className="absolute top-0 left-0 -z-10 h-full w-full bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-40"
        aria-hidden="true"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div variants={itemVariants} className="flex items-center pt-20">
          <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary inline-flex items-center">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary mr-2 animate-pulse"></span>
            One Partner for All Your Technology & Business Needs
          </div>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Left: Content Section */}
          <div className="md:w-1/2 relative rounded-2xl overflow-hidden">
            {/* Enhanced background */}
            <div className="absolute inset-0 bg-gradient-to-br backdrop-blur-sm" />
            
            {/* Content */}
            <motion.div 
              ref={ref}
              className="relative z-10 p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Your End-to-End Tech Partner for the <span className="text-primary">Digital World</span>
              </h2>

              <div className="space-y-4 mb-8">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Business & Data Solutions drives digital and data-led transformation with end-to-end services across data management, 
                  cloud deployment, advanced analytics, digital marketing, consumer insights, and market research.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  We help you automate processes, build scalable systems, and turn complex data into actionable intelligence for smarter decisions and meaningful customer connections.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  All as your single trusted partner from strategy to optimisation.
                </p>
              </div>

              {/* Key Points Grid */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {INDUSTRIES.map((industry, index) => (
                  <IndustryItem key={index} icon={industry.icon} text={industry.text} />
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Video Section */}
          <div className="md:w-1/2">
            <motion.div 
              className="overflow-hidden rounded-2xl shadow-2xl relative z-10"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full rounded-xl border-2 border-primary/20 focus:ring-2 focus:outline-none transition-all group hover:scale-[1.02] cursor-pointer bg-black">
                <div className="relative aspect-video">
                  {/* Story Video with lazy loading */}
                  <video
                    className="w-full h-full object-cover rounded-xl"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    controlsList="nodownload noremoteplayback"
                  >
                    <source src={currentStoryVideoSources.webm} type="video/webm" />
                    <source src={currentStoryVideoSources.mp4} type="video/mp4" />
                    <source src={STORY_VIDEO_SOURCES.fallback} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-5 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <Button 
                  onClick={handleServicesClick}
                  className="rounded-full px-6 py-3 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                >
                  Explore Our Services
                  <MemoizedIcons.ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button 
                  onClick={handleConsultationClick}
                  variant="outline"
                  className="rounded-full px-6 py-3 border-primary text-primary hover:bg-primary/10"
                >
                  <MemoizedIcons.Calendar className="mr-2 h-4 w-4" />
                  Book Free 30-Min Consultation
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(WhatWeDoSection);
