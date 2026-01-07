// Refactored WhatWeDoSection with improved mobile layout, shorter content, bullet points, and clear value props
// NOTE: Replace your existing WhatWeDoSection component with this updated version

import React, { memo, useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Cloud, BarChart3, Megaphone, Users, Briefcase, Cpu, CheckCircle, LineChart, BrainCog } from "lucide-react";
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
};

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
  const isMobile = useMobileDetection();
  const navigate = useNavigate();

  const { theme } = useTheme();
  const { videoRef: backgroundVideoRef, videoLoaded: bgLoaded, handleVideoLoad: handleBG } = useVideoLoad();

  const handleServicesClick = () => navigate("/services");
  const handleConsultClick = () => navigate("/consultation");

  const bgVid = isMobile ? BACKGROUND_VIDEO_SOURCES.mobile : BACKGROUND_VIDEO_SOURCES.desktop;
  const storyVid = isMobile ? STORY_VIDEO_SOURCES.mobile : STORY_VIDEO_SOURCES.desktop;

  const handleFeatureClick = useCallback((serviceId: string) => {
    navigate(`/service-detail/${serviceId}`);
  }, [navigate]);

  const FEATURES = [
    {
      icon: "Cloud",
      title: "Data & Cloud Services",
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
      icon: "BarChart3",
      title: "Business Intelligence",
      text: "Turn data into smart business decisions.",
      serviceId: "business-intelligence"
    },
    {
      icon: "Megaphone",
      title: "Digital Transformation & Marketing",
      text: "Grow visibility & acquire more customers.",
      serviceId: "digital-transformation"
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

  // Cloudinary video URLs with optimizations
  const videoSources = {
    desktop: {
      webm: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_webm,q_auto:good,w_1920/v1753041808/Google_Gemini_n4h8by.mp4",
      mp4: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_mp4,q_auto:good,w_1920/v1753041808/Google_Gemini_n4h8by.mp4"
    },
    mobile: {
      webm: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_webm,q_auto:eco,w_640/v1753041808/Google_Gemini_n4h8by.mp4",
      mp4: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_mp4,q_auto:eco,w_640/v1753041808/Google_Gemini_n4h8by.mp4"
    },
    fallback: "https://res.cloudinary.com/dsf4d41i8/video/upload/v1753041808/Google_Gemini_n4h8by.mp4"
  };

  // Story video sources (16MB video optimization)
  const storyVideoSources = {
    desktop: {
      webm: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_webm,q_auto:good,w_1280/v1763800003/Final1_fusbec.mp4",
      mp4: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_mp4,q_auto:good,w_1280/v1763800003/Final1_fusbec.mp4"
    },
    mobile: {
      webm: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_webm,q_auto:eco,w_640/v1763800003/Final1_fusbec.mp4",
      mp4: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_mp4,q_auto:eco,w_640/v1763800003/Final1_fusbec.mp4"
    },
    fallback: "https://res.cloudinary.com/dsf4d41i8/video/upload/v1763800003/Final1_fusbec.mp4"
  };



  return (
    <section className="py-16 relative overflow-hidden">
      <video
        ref={backgroundVideoRef}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${bgLoaded ? "opacity-20" : "opacity-0"}`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://res.cloudinary.com/dsf4d41i8/image/upload/f_auto,q_auto/v1753041808/Google_Gemini_n4h8by.jpg"
        onLoadedData={handleBG}
      >
        <source src={bgVid.webm} type="video/webm" />
        <source src={bgVid.mp4} type="video/mp4" />
      </video>

      <div className="max-w-7xl mx-auto px-4 relative z-10 pt-10">
        {/* Badge - SEO Optimized */}
        <motion.div className="mb-4">
          <div className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary inline-flex items-center">
            <span className="h-2 w-2 bg-primary rounded-full mr-2 animate-pulse" />
            Your End-to-End Tech Partner for the Digital World
          </div>
        </motion.div>
        {/* SEO Optimized Main Heading */}
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
          Everything a Modern Business Needs<br /> — Delivered Under One Roof.
        </h1>
        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Content - Left side on desktop */}
          <div className="lg:w-1/2 w-full">
            <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>


              {/* Updated Content with Consumer Insights */}
              <div className="mb-6">
                <h2 className="text-xl lg:text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">

                </h2>
                <p className="text- text-gray-600 dark:text-gray-300 leading-relaxed">
                  <strong> We partner with businesses of all sizes and industries to solve real-world challenges and drive sustainable growth.</strong><br /><br />
                  By combining business consulting, data intelligence, digital innovation, and market insights, we design practical,
                  scalable solutions tailored to your goals, industry, and stage of growth — not one-size-fits-all services.<br /><br />
                  <strong> Whether you’re a startup, SME, or growing enterprise, we adapt our approach to help you operate smarter, connect better with customers, and make confident, data-driven decisions.
                  </strong>,
                </p>
              </div>

              {/* Bullet Features - Clean without borders/background */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {FEATURES.map((f, idx) => {
                  const Icon = MemoizedIcons[f.icon as keyof typeof MemoizedIcons]; // Type assertion added
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
                        <div className="absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
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
                {INDUSTRIES.map((industry, index) => (
                  <IndustryItem key={index} icon={industry.icon} text={industry.text} />
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Video - Right side on desktop with CTAs below */}
          <div className="lg:w-1/2 w-full flex flex-col items-center justify-center">
            <motion.div
              className="overflow-hidden rounded-2xl shadow-2xl bg-black w-full max-w-4xl mx-auto relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-video w-full">
                <video
                  key={storyVid.mp4}
                  className="w-full h-full object-cover rounded-lg"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="https://res.cloudinary.com/dsf4d41i8/image/upload/w_50,q_auto,f_auto/v1763800003/Final1_fusbec.jpg"
                  title="Business Data Solutions - Digital Transformation Services"
                >
                  <source src={storyVid.webm} type="video/webm" />
                  <source src={storyVid.mp4} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Gradient overlay with pointer-events: none */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl pointer-events-none"
                ></div>
              </div>
            </motion.div>

            {/* CTAs positioned under the video */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center">
              <Button onClick={handleServicesClick} className="rounded-full px-8 py-3 bg-primary text-white w-full sm:w-auto text-lg font-semibold">
                Explore Services <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button onClick={handleConsultClick} variant="outline" className="rounded-full px-8 py-3 border-primary text-primary w-full sm:w-auto text-lg font-semibold">
                <Calendar className="mr-2 h-4 w-4" /> Book Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}

export default memo(WhatWeDoSection);
