// Refactored WhatWeDoSection with optimized media loading
import React, { memo, useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Cloud, BarChart3, Megaphone, Users, Briefcase, Cpu, CheckCircle, LineChart, BrainCog, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";

const MemoizedIcons = {
  Cloud: memo(Cloud),
  BarChart3: memo(BarChart3),
  Megaphone: memo(Megaphone),
  Users: memo(Users),
  Briefcase: memo(Briefcase),
  Cpu: memo(Cpu),
  ArrowRight: memo(ArrowRight),
  Calendar: memo(Calendar),
  CheckCircle: memo(CheckCircle),
  LineChart: memo(LineChart),
  BrainCog: memo(BrainCog)
};

// Constants outside component to prevent recreation
const INDUSTRIES = [
  { icon: "Cloud", text: "All Industries" },
  { icon: "BarChart3", text: "All Sectors" },
  { icon: "Users", text: "All Business Types" },
] as const;

// ==================== FIXED: Image/Video Format Issues ====================

// ✅ ISSUE #1: Background video poster is JPG, should be WebP
const BACKGROUND_VIDEO_SOURCES = {
  desktop: {
    webm: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_webm:chromasubsampling:420,q_30,w_1280,ac_none/v1753041808/Google_Gemini_n4h8by.mp4",
    mp4: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_mp4,q_30,w_1280,ac_none/v1753041808/Google_Gemini_n4h8by.mp4"
  },
  mobile: {
    webm: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_webm:chromasubsampling:420,q_25,w_640,ac_none/v1753041808/Google_Gemini_n4h8by.mp4",
    mp4: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_mp4,q_25,w_640,ac_none/v1753041808/Google_Gemini_n4h8by.mp4"
  },
  // ✅ FIXED: Changed from JPG to WebP with proper optimization
  poster: {
    desktop: "https://res.cloudinary.com/dsf4d41i8/image/upload/f_webp,q_30,w_800/v1753041808/Google_Gemini_n4h8by.jpg",
    mobile: "https://res.cloudinary.com/dsf4d41i8/image/upload/f_webp,q_25,w_400/v1753041808/Google_Gemini_n4h8by.jpg"
  }
};

// ✅ ISSUE #2: Story video poster has incorrect format parameters
const STORY_VIDEO_SOURCES = {
  desktop: {
    webm: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_webm:chromasubsampling:420,q_35,w_960/v1764231049/Untitled_Video_-_Made_With_Clipchamp_1_uwghpv.mp4",
    mp4: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_mp4,q_35,w_960/v1764231049/Untitled_Video_-_Made_With_Clipchamp_1_uwghpv.mp4"
  },
  mobile: {
    webm: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_webm:chromasubsampling:420,q_25,w_480/v1764231049/Untitled_Video_-_Made_With_Clipchamp_1_uwghpv.mp4",
    mp4: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_mp4,q_25,w_480/v1764231049/Untitled_Video_-_Made_With_Clipchamp_1_uwghpv.mp4"
  },
  // ✅ FIXED: Changed from f_auto to f_webp for better compression
  poster: {
    desktop: "https://res.cloudinary.com/dsf4d41i8/image/upload/f_webp,q_30,w_600/v1763800003/Final1_fusbec.jpg",
    mobile: "https://res.cloudinary.com/dsf4d41i8/image/upload/f_webp,q_25,w_300/v1763800003/Final1_fusbec.jpg"
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" as const } }
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
      <span className="text-gray-600 dark:text-gray-300">{text}</span>
    </div>
  );
});
IndustryItem.displayName = 'IndustryItem';

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return isMobile;
};

const useVideoLoad = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const handleVideoLoad = useCallback(() => setVideoLoaded(true), []);
  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 3) setVideoLoaded(true);
  }, []);
  return { videoRef, videoLoaded, handleVideoLoad };
};

function WhatWeDoSection() {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [storyVideoInView, setStoryVideoInView] = useState(false);
  const { ref: storyVideoRef } = useInView({
    triggerOnce: true,
    rootMargin: '200px',
    onChange: (inView) => setStoryVideoInView(inView)
  });

  const isMobile = useMobileDetection();
  const navigate = useNavigate();

  const { theme } = useTheme();
  const { videoRef: backgroundVideoRef, videoLoaded: bgLoaded, handleVideoLoad: handleBG } = useVideoLoad();
  const [storyVideoLoaded, setStoryVideoLoaded] = useState(false);

  const handleServicesClick = () => navigate("/services");
  const handleConsultClick = () => navigate("/about");

  const bgVid = isMobile ? BACKGROUND_VIDEO_SOURCES.mobile : BACKGROUND_VIDEO_SOURCES.desktop;
  const bgPoster = isMobile ? BACKGROUND_VIDEO_SOURCES.poster.mobile : BACKGROUND_VIDEO_SOURCES.poster.desktop;
  const storyVid = isMobile ? STORY_VIDEO_SOURCES.mobile : STORY_VIDEO_SOURCES.desktop;
  const storyPoster = isMobile ? STORY_VIDEO_SOURCES.poster.mobile : STORY_VIDEO_SOURCES.poster.desktop;

  const handleFeatureClick = useCallback((serviceId: string) => {
    navigate(`/service-detail/${serviceId}`);
  }, [navigate]);

  const FEATURES = [
    {
      icon: "Cloud",
      title: "Cloud & Data Engineering",
      text: "Deploy scalable, secure cloud solutions.",
      serviceId: "core-data-cloud",
      id: "core-data-cloud",
    },
    {
      icon: "Briefcase",
      title: "Business Consulting",
      text: "A single partner from strategy to execution.",
      serviceId: "business-consulting"
    },
    {
      icon: "Megaphone",
      title: "Digital Transformation & Marketing",
      text: "Grow visibility & acquire more customers.",
      serviceId: "digital-transformation"
    },
    {
      icon: "BarChart3",
      title: "Business Intelligence",
      text: "Turn data into smart business decisions.",
      serviceId: "business-intelligence"
    },

    {
      icon: "Users",
      title: "Consumer Voice Insights",
      text: "Understand what your customers really want.",
      serviceId: "consumer-voice"
    },
    {
      icon: "LineChart",
      title: "Market Research & Analytics",
      text: "In-depth competitor studies, consumer behavior insights, and trend forecasting to help position your brand ahead of the curve.",
      serviceId: "market-research"
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* ✅ FIXED: Background with image-first strategy */}
      <div className="absolute top-0 left-0 w-full h-full">


        {/* Video loads after delay */}
        {inView && (
          <video
            ref={backgroundVideoRef}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${bgLoaded ? "opacity-20" : "opacity-0"}`}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            loading="lazy"
            onLoadedData={handleBG}
            style={{ display: bgLoaded ? 'block' : 'none' }}
          >
            <source src={bgVid.webm} type="video/webm" />
            <source src={bgVid.mp4} type="video/mp4" />
          </video>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 pt-10">

        {/* Badge - SEO Optimized */}
        <motion.div className="mb-4 pt-10">
          <div className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary inline-flex items-center">
            <span className="h-2 w-2 bg-primary rounded-full mr-2 animate-pulse" />
            Your End-to-End Tech Partner for the Digital World
          </div>
        </motion.div>

        {/* SEO Optimized Main Heading - Gradient Mask Reveal */}
        <div className="relative">
          <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-gray-900 dark:text-white leading-tight text-primary pb-4">
            Powering the Future of Business with Intelligent Technology
          </h1>

          <motion.div
            initial={{ width: "100%" }}
            animate={inView ? { width: "0%" } : {}}
            transition={{
              duration: 1,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-white dark:from-black via-transparent to-transparent"
            style={{
              mixBlendMode: "difference"
            }}
          />
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Content - Left side on desktop */}
          <div className="lg:w-1/2 w-full">
            <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
              {/* Updated Content with Consumer Insights */}
              <div className="mb-6">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{ willChange: "transform" }}

                  className="text-gray-900 dark:text-gray-300 leading-relaxed"
                >
                  We help businesses design smarter operations, turn data into clear insights, and build scalable digital systems for confident decisions and sustainable growth.
                </motion.p>
              </div>

              {/* Bullet Features - Clean without borders/background */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {FEATURES.map((f, idx) => {
                  const Icon = MemoizedIcons[f.icon as keyof typeof MemoizedIcons];
                  return (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-start space-x-3 p-4 rounded-xl cursor-pointer group transition-all duration-200 border border-transparent hover:border-primary/20"
                      onClick={() => handleFeatureClick(f.serviceId)}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => e.key === 'Enter' && handleFeatureClick(f.serviceId)}
                      aria-label={`Navigate to ${f.title} service`}
                    >
                      <div className="relative">
                        <Icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-200 flex items-center justify-between">
                          <span className="truncate">{f.title}</span>
                          <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-200 transform -translate-x-2 group-hover:translate-x-0" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Industries Section */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8"
              >
                Trusted by businesses across industries and growth stages

              </motion.div>
            </motion.div>
          </div>

          {/* Video - Right side on desktop with CTAs below */}
          <div className="lg:w-1/2 w-full flex flex-col items-center justify-center">
            <motion.div
              ref={storyVideoRef}
              className="overflow-hidden rounded-2xl shadow-2xl bg-black w-full max-w-4xl mx-auto relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-video w-full">
                {/* ✅ OPTIMIZED: Story video loads only when in view */}
                {storyVideoInView && (
                  <>
                    <video
                      className={`w-full h-full object-cover rounded-lg transition-opacity duration-500 ${storyVideoLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      loading="lazy"
                      poster={storyPoster}
                      title="Business Data Solutions - Digital Transformation Services"
                      onLoadedData={() => setStoryVideoLoaded(true)}
                    >
                      <source src={storyVid.webm} type="video/webm" />
                      <source src={storyVid.mp4} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* Loading skeleton */}
                    {!storyVideoLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 animate-pulse rounded-lg flex items-center justify-center">
                        <div className="text-gray-500 dark:text-gray-400">Loading video...</div>
                      </div>
                    )}
                  </>
                )}


              </div>
            </motion.div>

            {/* CTAs positioned under the video */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-8 w-full max-w-2xl mx-auto px-4 sm:px-0">
              <Button
                onClick={handleServicesClick}
                className="rounded-full px-6 py-3 flex-1 text-sm sm:text-base font-semibold whitespace-nowrap bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              >
                Explore Services <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                onClick={() => navigate('/use-cases')}
                variant="outline"
                className="rounded-full px-6 py-3 flex-1 text-sm sm:text-base font-semibold whitespace-nowrap bg-blue-50/50 dark:bg-blue-900/20 backdrop-blur-sm border-2 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:border-blue-400 dark:hover:border-blue-600 shadow-md transition-all duration-300"
              >
                View Use Cases <Rocket className="ml-2 h-4 w-4" />
              </Button>

              <Button
                onClick={handleConsultClick}
                variant="outline"
                className="rounded-full px-6 py-3 flex-1 text-sm sm:text-base font-semibold whitespace-nowrap bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 border-2 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:border-purple-400 dark:hover:border-purple-600 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Learn About Us <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(WhatWeDoSection);