import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Globe, BarChart3, Users, MessageCircle, Award, Zap, Target, Check,
  Shield, ChevronRight, Eye, User, Lightbulb, Hammer, Briefcase, ChartBarIcon, CogIcon, HandshakeIcon,
  TrendingUp, MapPin, Compass, ArrowRight, Rocket, Heart, Sparkles, ChevronLeft, ChevronRight as RightIcon,
  ScrollText
} from 'lucide-react';
import HolographicCard from '../components/HolographicCard';
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { TeamsButton } from "@/components/Careers/teambutton";
import { useInView } from 'react-intersection-observer';

// ==================== OPTIMIZED MEDIA SOURCES ====================

// Director Image - Converted to WebP format
const DIRECTOR_IMAGE = {
  desktop: "https://res.cloudinary.com/dsf4d41i8/image/upload/f_webp,q_60,w_400/v1753057496/Bhargav_va98sz.jpg",
  mobile: "https://res.cloudinary.com/dsf4d41i8/image/upload/f_webp,q_50,w_200/v1753057496/Bhargav_va98sz.jpg",
  fallback: "https://res.cloudinary.com/dsf4d41i8/image/upload/f_jpg,q_60,w_400/v1753057496/Bhargav_va98sz.jpg"
};

// Background Video - Optimized for performance
const BACKGROUND_VIDEO = {
  desktop: {
    webm: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_webm:chromasubsampling:420,q_30,w_1280,ac_none/v1753041808/Google_Gemini_n4h8by.mp4",
    mp4: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_mp4,q_30,w_1280,ac_none/v1753041808/Google_Gemini_n4h8by.mp4",
    poster: "https://res.cloudinary.com/dsf4d41i8/image/upload/f_webp,q_30,w_800/v1753041808/Google_Gemini_n4h8by.jpg"
  },
  mobile: {
    webm: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_webm:chromasubsampling:420,q_25,w_640,ac_none/v1753041808/Google_Gemini_n4h8by.mp4",
    mp4: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_mp4,q_25,w_640,ac_none/v1753041808/Google_Gemini_n4h8by.mp4",
    poster: "https://res.cloudinary.com/dsf4d41i8/image/upload/f_webp,q_25,w_400/v1753041808/Google_Gemini_n4h8by.jpg"
  }
};

// Story Video - Optimized with audio for controls
const STORY_VIDEO = {
  desktop: {
    webm: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_webm:chromasubsampling:420,q_35,w_960/v1763800003/Final1_fusbec.mp4",
    mp4: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_mp4,q_35,w_960/v1763800003/Final1_fusbec.mp4",
    poster: "https://res.cloudinary.com/dsf4d41i8/image/upload/f_webp,q_30,w_600/v1763800003/Final1_fusbec.jpg"
  },
  mobile: {
    webm: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_webm:chromasubsampling:420,q_25,w_480/v1763800003/Final1_fusbec.mp4",
    mp4: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_mp4,q_25,w_480/v1763800003/Final1_fusbec.mp4",
    poster: "https://res.cloudinary.com/dsf4d41i8/image/upload/f_webp,q_25,w_300/v1763800003/Final1_fusbec.jpg"
  }
};

// Unsplash images - Added WebP format and size optimization
const UNSPLASH_IMAGES = {
  journey: {
    desktop: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    mobile: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=60",
    alt: "Our Startup Journey"
  }
};

const stats = [
  { number: '10+', label: 'Projects Completed', icon: Target },
  { number: '05+', label: 'Industries Served', icon: Globe },
  { number: '10+', label: 'Team Members', icon: Users },
  { number: '100%', label: 'Client Focused', icon: Heart },
];

const values = [
  {
    icon: Rocket,
    title: 'Innovation with Purpose',
    description: 'Moving fast to deliver cutting-edge technology that creates real business impact.',
  },
  {
    icon: BarChart3,
    title: 'Clarity Over Complexity',
    description: 'Building solutions that simplify your operations, not complicate them',
  },
  {
    icon: Users,
    title: 'Partnership with Integrity',
    description: 'Working alongside you as an extension of your team with honest, transparent collaboration.',
  },
  {
    icon: Sparkles,
    title: 'Results That Matter',
    description: 'Basing our decisions on solid analytics to deliver measurable outcomes, not just outputs.',
  },
];

const timeline = [
  {
    year: "2022",
    title: "Idea & Vision",
    description: "The spark of an idea: to help businesses harness data and technology in more accessible ways.",
    icon: Lightbulb,
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=600&q=60",
  },
  {
    year: "2023",
    title: "Foundation Building",
    description: "Working with early clients, refining our approach, and building our service framework.",
    icon: Hammer,
    image: "https://images.unsplash.com/photo-1522252234503-e356532cafd5?auto=format&fit=crop&w=600&q=60",
  },
  {
    year: "2024 Q1",
    title: "Official Launch",
    description: "Formally established the company with a clear vision for modern business solutions.",
    icon: Rocket,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=60",
  },
  {
    year: "2024 Q2-Q3",
    title: "Service Refinement",
    description: "Launched and refined our core services based on client feedback and market needs.",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=60",
  },
  {
    year: "2024 Q4",
    title: "Building Momentum",
    description: "Growing our client base and developing deeper partnerships with forward-thinking businesses.",
    icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=60",
  },
  {
    year: "2025 Q1",
    title: "UK Market Planning",
    description: "Currently laying the groundwork for UK operations with market research and strategy development.",
    icon: MapPin,
    image: "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=600&q=60",
    badge: "",
  },
  {
    year: "2025 Q2-Q3",
    title: "UK Operations Start",
    description: "Planning to begin UK client engagements and establish our presence in the market.",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1512850183-6d8b49e3298e?auto=format&fit=crop&w=600&q=60",
    badge: "",
  },
  {
    year: "2025 Q4",
    title: "Team Expansion",
    description: "Growing our team to better serve our expanding client base and international ambitions.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=600&q=60",
    badge: "NOW",
  },
  {
    year: "2026",
    title: "Next Chapter",
    description: "Exploring new markets and opportunities for growth based on our UK experience.",
    icon: Compass,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=60",
    badge: "PLANNED",
  },
  {
    year: "2026 Q1",
    title: "India Operations Start",
    description: "Launching India operations with strategic hiring and local market focus.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1516562309708-05f3b2b2c238?auto=format&fit=crop&w=600&q=60",
    badge: "Coming Soon",
  },
  {
    year: "2026 Q4",
    title: "USA Market Planning",
    description: "Laying the groundwork for US expansion with market research and strategy development.",
    icon: MapPin,
    image: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?auto=format&fit=crop&w=600&q=60",
    badge: "Coming Soon",
  },
  {
    year: "2027 Q1",
    title: "Team Growth Phase",
    description: "Expanding our team to better serve our growing international client base.",
    icon: Compass,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=60",
    badge: "Coming Soon",
  },
];

// Scrollable Text Component
const ScrollableText = ({
  children,
  className = '',
  maxHeight = '200px',
  showScrollHint = true
}: {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
  showScrollHint?: boolean;
}) => {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <div
        className={cn(
          "overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent",
          "hover:scrollbar-thumb-blue-400 transition-colors",
          className
        )}
        style={{ maxHeight }}
        onScroll={() => setShowHint(false)}
      >
        {children}
      </div>

    </div>
  );
};

// Horizontal Scrollable Cards Component
const HorizontalScrollable = ({
  children,
  className = '',
  showScrollHint = true
}: {
  children: React.ReactNode;
  className?: string;
  showScrollHint?: boolean;
}) => {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <div
        className={cn(
          "flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent",
          "hover:scrollbar-thumb-blue-400 transition-colors",
          className
        )}
        onScroll={() => setShowHint(false)}
      >
        {children}
      </div>
      {showScrollHint && showScrollHint && (
        <div className="absolute top-2 right-2 flex items-center space-x-1 animate-pulse">
          <ScrollText className="h-3 w-3 text-blue-500 rotate-90" />
          <span className="text-xs text-blue-500">Scroll</span>
        </div>
      )}
    </div>
  );
};

// Mobile Timeline Component
const MobileTimeline = ({ timeline, theme }: { timeline: any[], theme: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % timeline.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + timeline.length) % timeline.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentEvent = timeline[currentIndex];
  const Icon = currentEvent.icon;

  return (
    <div className="md:hidden">
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className={cn(
            "absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full",
            theme === "dark"
              ? "bg-gray-800 text-white hover:bg-gray-700"
              : "bg-white text-gray-800 hover:bg-gray-100 shadow-lg"
          )}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={nextSlide}
          className={cn(
            "absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full",
            theme === "dark"
              ? "bg-gray-800 text-white hover:bg-gray-700"
              : "bg-white text-gray-800 hover:bg-gray-100 shadow-lg"
          )}
        >
          <RightIcon className="h-5 w-5" />
        </button>

        {/* Timeline Card */}
        <div className={cn(
          "p-6 rounded-xl border transition-all duration-300",
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200 shadow-sm"
        )}>
          {currentEvent.badge && (
            <span className={cn(
              "inline-block text-xs font-semibold px-2 py-1 rounded-full mb-3",
              currentEvent.badge === "NOW"
                ? "bg-green-600 text-white animate-pulse"
                : currentEvent.badge === "PLANNED"
                  ? "bg-blue-500 text-white"
                  : "bg-yellow-500 text-white"
            )}>
              {currentEvent.badge}
            </span>
          )}

          <div className="flex items-center mb-3">
            <Icon className={cn(
              "h-5 w-5 mr-2",
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            )} />
            <span className={cn(
              "text-lg font-semibold",
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            )}>
              {currentEvent.year}
            </span>
          </div>

          <h3 className={cn(
            "text-xl font-bold mb-2",
            theme === "dark" ? "text-white" : "text-gray-800"
          )}>
            {currentEvent.title}
          </h3>

          <ScrollableText
            maxHeight="120px"
            showScrollHint={false}
          >
            <p className={cn(
              "text-sm leading-relaxed pr-2",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              {currentEvent.description}
            </p>
          </ScrollableText>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {timeline.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentIndex
                  ? theme === "dark" ? "bg-blue-400" : "bg-blue-600"
                  : theme === "dark" ? "bg-gray-600" : "bg-gray-300"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Optimized Video Component with Lazy Loading
const OptimizedVideo = ({ 
  sources, 
  isMobile, 
  controls = false, 
  autoPlay = true,
  muted = true,
  loop = true,
  className = "",
  title = ""
}: {
  sources: typeof BACKGROUND_VIDEO | typeof STORY_VIDEO;
  isMobile: boolean;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
  title?: string;
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px',
  });

  const source = isMobile ? sources.mobile : sources.desktop;

  return (
    <div ref={ref} className="relative">
      {inView && (
        <video
          ref={videoRef}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            videoLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline
          controls={controls}
          preload="metadata"
          loading="lazy"
          poster={source.poster}
          title={title}
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src={source.webm} type="video/webm" />
          <source src={source.mp4} type="video/mp4" />
        </video>
      )}
      {!videoLoaded && inView && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 animate-pulse" />
      )}
    </div>
  );
};

// Optimized Image Component
const OptimizedImage = ({
  src,
  alt,
  className = "",
  isMobile,
  sizes = "(max-width: 768px) 100vw, 50vw"
}: {
  src: string;
  alt: string;
  className?: string;
  isMobile: boolean;
  sizes?: string;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden">
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          imageLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        loading="lazy"
        decoding="async"
        sizes={sizes}
        onLoad={() => setImageLoaded(true)}
      />
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 animate-pulse" />
      )}
    </div>
  );
};

function About() {
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Add preconnect for Cloudinary
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://res.cloudinary.com';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const ThemedCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
    return theme === 'dark' ? (
      <HolographicCard className={className}>{children}</HolographicCard>
    ) : (
      <div className={cn(
        "rounded-xl border bg-card shadow-sm transition-all hover:shadow-md",
        theme === 'light' ? 'border-gray-200' : 'border-gray-800',
        className
      )}>
        {children}
      </div>
    );
  };

  return (
    <div className={cn(
      "w-full min-h-screen flex flex-col",
    )}>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>About Business and Data Solutions | About BDS | Our Story & Mission</title>
        <meta
          name="description"
          content="Learn about Business and Data Solutions - our mission, values, growth journey, and commitment to delivering innovative business transformation services since 2022."
        />
        <meta
          name="keywords"
          content="about BDS, business solutions company, our mission, company values, growth journey, business transformation, data services, digital innovation"
        />
        <link rel="canonical" href="https://www.businessanddatasolutions.com/about" />
        <meta property="og:title" content="About Business and Data Solutions | Our Story & Mission" />
        <meta
          property="og:description"
          content="Learn about Business and Data Solutions - our mission, values, and commitment to delivering innovative business transformation services."
        />
        <meta property="og:url" content="https://www.businessanddatasolutions.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://res.cloudinary.com/dsf4d41i8/image/upload/f_webp,q_60,w_1200/v1755995499/BDS_Logo_-_Original_with_Transparent_Background_-_5000x5000_vb9jll.png" />
      </Helmet>

      {/* Hero Section - Full Screen with Video */}
     <section className="relative min-h-screen flex flex-col md:pt-0 mb-6 md:mb-8 overflow-hidden">
  {/* SIMPLE Background Video - No State, No Infinite Loop */}
  <div className="absolute inset-0 z-0">
    <video
      className="w-full h-full object-cover opacity-30"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      loading="lazy"
      poster={
        isMobile 
          ? "https://res.cloudinary.com/dsf4d41i8/image/upload/f_webp,q_25,w_400/v1753041808/Google_Gemini_n4h8by.jpg"
          : "https://res.cloudinary.com/dsf4d41i8/image/upload/f_webp,q_30,w_800/v1753041808/Google_Gemini_n4h8by.jpg"
      }
    >
      <source 
        src={
          isMobile
            ? "https://res.cloudinary.com/dsf4d41i8/video/upload/f_webm:chromasubsampling:420,q_25,w_640,ac_none/v1753041808/Google_Gemini_n4h8by.mp4"
            : "https://res.cloudinary.com/dsf4d41i8/video/upload/f_webm:chromasubsampling:420,q_30,w_1280,ac_none/v1753041808/Google_Gemini_n4h8by.mp4"
        } 
        type="video/webm" 
      />
      <source 
        src={
          isMobile
            ? "https://res.cloudinary.com/dsf4d41i8/video/upload/f_mp4,q_25,w_640,ac_none/v1753041808/Google_Gemini_n4h8by.mp4"
            : "https://res.cloudinary.com/dsf4d41i8/video/upload/f_mp4,q_30,w_1280,ac_none/v1753041808/Google_Gemini_n4h8by.mp4"
        } 
        type="video/mp4" 
      />
    </video>
  </div>

  {/* Overlay */}
  <div className={cn(
    "absolute inset-0 z-10",
    theme === "dark" ? "bg-black/40" : "bg-white/20"
  )} />

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto pt-24">
          <div className="text-center py-4 mb-6 ">
            <span className={cn(
              "inline-block px-4 py-2 text-sm font-semibold rounded-full tracking-wide mb-6",
              theme === "dark"
                ? "bg-blue-900/30 text-blue-300 border border-blue-800/50"
                : "bg-blue-100 text-blue-700 border border-blue-200"
            )}>
              About BDS
            </span>

            <h1 className={cn(
              "text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-8",
              theme === "dark" ? "text-white" : "text"
            )}>
              <span className={cn(
                "bg-clip-text text-transparent bg-gradient-to-r",
                theme === "dark"
                  ? "from-blue-400 via-purple-400 to-indigo-400"
                  : "from-blue-600 via-purple-600 to-indigo-600"
              )}>
                Who We Are
              </span>
            </h1>

            <div className="mx-auto max-w-3xl">
              <ScrollableText maxHeight="200px" className="mx-auto">
                <p className={cn(
                  "text-lg md:text-xl lg:text-2xl leading-relaxed",
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                )}>
                  <strong className={theme === "dark" ? "text-blue-400" : "text-blue-600"}>Business & Data Solutions (BDS) </strong>
                  is a forward-thinking transformation partner. We combine data intelligence, digital technology, and strategic consulting to help organizations unlock growth and build resilience.
                </p>
              </ScrollableText>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left">
              {/* Left Card */}
              <div className={cn(
                "rounded-2xl border p-8 group transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                theme === "dark"
                  ? "bg-gray-900/80 border-gray-800 hover:border-blue-500/30 backdrop-blur-sm"
                  : "bg-white/90 border-gray-200 hover:border-blue-200 backdrop-blur-sm"
              )}>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 mb-6">
                  <div className={cn(
                    "h-14 w-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors",
                    theme === "dark" ? "bg-blue-900/20 text-blue-400 group-hover:bg-blue-900/30" : "bg-blue-50 text-blue-600 group-hover:bg-blue-100"
                  )}>
                    <ChartBarIcon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="text-center md:text-left">
                    <span className={cn(
                      "inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-3",
                      theme === "dark"
                        ? "bg-blue-950 text-blue-300"
                        : "bg-blue-50 text-blue-700"
                    )}>
                      What We Do
                    </span>
                    <h3 className={cn(
                      "text-xl font-bold",
                      theme === "dark" ? "text-white" : "text-gray-900"
                    )}>
                      Empowering Businesses Through Data, Technology & Intelligent Innovation
                    </h3>
                  </div>
                </div>

                <p className={cn(
                  "text-base leading-relaxed text-center md:text-left",
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                )}>
                  We provide end-to-end solutions that enable smarter decisions and seamless digital experiences. From data analytics and AI to cloud solutions and market research, we deliver impact that lasts.
                </p>
              </div>

              {/* Right Card */}
              <div className={cn(
                "rounded-2xl border p-8 group transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                theme === "dark"
                  ? "bg-gray-900/80 border-gray-800 hover:border-purple-500/30 backdrop-blur-sm"
                  : "bg-white/90 border-gray-200 hover:border-purple-200 backdrop-blur-sm"
              )}>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 mb-6">
                  <div className={cn(
                    "h-14 w-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors",
                    theme === "dark" ? "bg-purple-900/20 text-purple-400 group-hover:bg-purple-900/30" : "bg-purple-50 text-purple-600 group-hover:bg-purple-100"
                  )}>
                    <HandshakeIcon className="h-7 w-7" />
                  </div>
                  <div className="text-center md:text-left">
                    <span className={cn(
                      "inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-3",
                      theme === "dark"
                        ? "bg-purple-950 text-purple-300"
                        : "bg-purple-50 text-purple-700"
                    )}>
                      Our Identity
                    </span>
                    <h3 className={cn(
                      "text-xl font-bold",
                      theme === "dark" ? "text-white" : "text-gray-900"
                    )}>
                      Strategic Partnership
                    </h3>
                  </div>
                </div>

                <p className={cn(
                  "text-base leading-relaxed text-center md:text-left",
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                )}>
                  We are innovators and problem-solvers. Our identity is shaped by agility, transparency, and results. We don't just implement technology; we help your business evolve with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-12 md:mb-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

          {/* Mission */}
          <div className={cn(
            "rounded-xl md:rounded-2xl p-6 md:p-8 border h-full",
            theme === "dark"
              ? "bg-blue-900/20 border-blue-800/30"
              : "bg-blue-50 border-blue-200"
          )}>
            <div className="flex items-center mb-4">
              <div className={cn(
                "p-2 md:p-3 rounded-lg md:rounded-xl mr-3 md:mr-4",
                theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"
              )}>
                <Rocket className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
              </div>
              <h3 className={cn(
                "text-xl md:text-2xl font-bold",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                Our Mission
              </h3>
            </div>
            <ScrollableText maxHeight="120px">
              <p className={cn(
                "text-sm md:text-base leading-relaxed text-justify pr-2",
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              )}>
                Our mission is to empower organizations to grow sustainably through intelligent technology, data-driven strategies, and future-proof digital solutions.
                We aim to simplify the digital journey for every business by delivering measurable value, operational excellence, and solutions that create lasting impact.
              </p>
            </ScrollableText>
          </div>

          {/* Vision */}
          <div className={cn(
            "rounded-xl md:rounded-2xl p-6 md:p-8 border h-full",
            theme === "dark"
              ? "bg-purple-900/20 border-purple-800/30"
              : "bg-purple-50 border-purple-200"
          )}>
            <div className="flex items-center mb-4">
              <div className={cn(
                "p-2 md:p-3 rounded-lg md:rounded-xl mr-3 md:mr-4",
                theme === "dark" ? "bg-purple-900/30" : "bg-purple-100"
              )}>
                <Eye className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
              </div>
              <h3 className={cn(
                "text-xl md:text-2xl font-bold",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                Our Vision
              </h3>
            </div>
            <ScrollableText maxHeight="120px">
              <p className={cn(
                "text-sm md:text-base leading-relaxed text-justify pr-2",
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              )}>
                Our vision is to become a global leader in business transformation—helping organizations of all sizes harness the power of technology and data.
                We aspire to create a world where every business, regardless of industry or scale, can innovate confidently, adapt quickly, and thrive in a fast-changing digital landscape.
              </p>
            </ScrollableText>
          </div>
        </div>
      </section>

      {/* Stats Section - Mobile Optimized */}
      <section className="mb-12 md:mb-20 px-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "p-4 md:p-6 text-center rounded-lg border",
                theme === "dark"
                  ? "bg-black border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              )}
            >
              <div className={cn(
                "h-12 w-12 md:h-16 md:w-16 mx-auto mb-3 md:mb-4 rounded-full flex items-center justify-center",
                theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"
              )}>
                <stat.icon className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <div className={cn(
                "text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2",
                theme === "dark" ? "gradient-text" : "text-gray-800"
              )}>{stat.number}</div>
              <div className={cn(
                "text-xs md:text-sm lg:text-base",
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              )}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Director's Message - Mobile Optimized */}
      <section className="mb-16 md:mb-20 px-4 dark:bg-black dark:text-gray-100">
        <div className="overflow-hidden dark:bg-black dark:text-gray-100">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col justify-center items-center dark:bg-black dark:text-gray-100">
              <div className="text-center group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-4 transition-all duration-300 ease-in-out group-hover:scale-105 shadow-lg">
                  <OptimizedImage
                    src={isMobile ? DIRECTOR_IMAGE.mobile : DIRECTOR_IMAGE.desktop}
                    alt="Bhargav Allu - Director & Co-Founder"
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    isMobile={isMobile}
                  />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-1">Bhargav Allu</h3>
                <p className="text-sm md:text-base text-gray-500">Director & Co-Founder</p>
              </div>
            </div>
            <div className="w-full md:w-2/3 p-6 md:p-8">
              <h2 className={cn(
                "text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6",
                theme === "dark" ? "text-white" : "text-gray-800"
              )}>A Message from Our Director</h2>
              <ScrollableText maxHeight="200px">
                <blockquote className={cn(
                  "text-base md:text-lg italic mb-4 md:mb-6 pl-3 md:pl-4 border-l-4 pr-2",
                  theme === "dark" ? "border-blue-400 text-gray-300" : "border-blue-600 text-gray-600"
                )}>
                  "At Business & Data Solutions, we believe in partnerships built on trust, innovation, and real outcomes.
                  We're builders and innovators at heart, bringing a fresh, energetic approach to every challenge.
                  We know every business is unique, and our job is to bring the right mix of strategy, technology, and insight to drive your measurable transformation."
                </blockquote>
              </ScrollableText>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section - Mobile Optimized */}
      <section className="mb-16 md:mb-20 px-4">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
          <div className="w-full md:w-1/2">
            <ThemedCard className="overflow-hidden">
              <div className={cn(
                "w-full rounded-lg border p-4 md:p-6",
                theme === "dark"
                  ? "bg-black border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              )}>
                <div className="relative aspect-video">
                  <OptimizedVideo
                    sources={STORY_VIDEO}
                    isMobile={isMobile}
                    controls={true}
                    autoPlay={true}
                    muted={true}
                    loop={true}
                    className="w-full h-full object-cover rounded-lg"
                    title="Our Story - Business & Data Solutions Journey"
                  />
                </div>
              </div>
            </ThemedCard>
          </div>

          <div className="w-full md:w-1/2 relative rounded-xl md:rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              <OptimizedImage
                src={isMobile ? UNSPLASH_IMAGES.journey.mobile : UNSPLASH_IMAGES.journey.desktop}
                alt="Our Startup Journey"
                className="w-full h-full object-cover"
                isMobile={isMobile}
              />
              <div className={cn(
                "absolute inset-0",
                theme === "dark" ? "bg-black/60" : "bg-white/80"
              )} />
            </div>

            <div className="relative z-10 p-6 md:p-8">
              <h2 className={cn(
                "text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6",
                theme === "dark" ? "text-white" : "text-gray-800"
              )}>Our Startup Journey</h2>

              <span className={cn(
                "inline-block px-3 py-1 text-xs font-semibold rounded-full tracking-wide mb-4 md:mb-6",
                theme === "dark"
                  ? "bg-blue-900/30 text-blue-300 border border-blue-800/50"
                  : "bg-blue-100 text-blue-700 border border-blue-200"
              )}>
                Built to Solve the Challenges Modern Businesses Face
              </span>

              <ScrollableText maxHeight="250px">
                <p className={cn(
                  "text-sm md:text-base lg:text-lg leading-relaxed pr-2",
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                )}>
                  <br />
                  We began in 2022 with a simple belief: every business deserves clarity, not complexity.
                  We saw that companies were struggling with scattered systems, traditional processes, and fast-changing digital demands.
                  Business & Data Solutions was founded to bridge that gap.
                  Our vision is to make advanced business technology accessible to companies of all sizes.
                  From a passionate idea, we've grown into a dynamic startup dedicated to helping our clients gain clarity, adopt modern tools,
                  and transform their operations with confidence.
                  We're proud to work with forward-thinking businesses who value a true partnership.
                  Every project is an opportunity to learn, grow, and deliver the exceptional value your company deserves.
                </p>
              </ScrollableText>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Timeline Section - Mobile Optimized */}
      <section className="mb-16 md:mb-20 px-4">
        <div className="mb-12 md:mb-20">
          <h2 className={cn(
            "text-xl md:text-2xl lg:text-3xl font-bold text-center mb-8 md:mb-12",
            theme === "dark" ? "gradient-text" : "text-primary"
          )}>
            Our Growth Journey
          </h2>

          {/* Mobile Timeline */}
          <MobileTimeline timeline={timeline} theme={theme} />

          {/* Desktop Timeline (Hidden on mobile) */}
          <div className="hidden md:block relative">
            <div className={cn(
              "absolute left-1/2 transform -translate-x-1/2 h-full w-px",
              theme === "dark" ? "bg-blue-400/30" : "bg-primary/30"
            )} />

            <div className="space-y-16">
              {timeline.map((event, index) => {
                const isLeft = index % 2 === 0;
                const Icon = event.icon;

                return (
                  <div
                    key={index}
                    className={`relative flex ${isLeft ? "justify-start" : "justify-end"}`}
                  >
                    <div className={`w-full md:w-1/2 ${isLeft ? "md:pr-8" : "md:pl-8"}`}>
                      {theme === 'dark' ? (
                        <HolographicCard className="p-6 relative group hover:scale-[1.02] transition-transform">
                          {event.badge && (
                            <span className={cn(
                              "absolute -top-3 -right-3 text-xs font-semibold px-2 py-1 rounded-full z-10",
                              event.badge === "NOW"
                                ? "bg-green-600 text-white animate-pulse"
                                : "bg-yellow-500 text-white"
                            )}>
                              {event.badge}
                            </span>
                          )}
                          <div className="flex items-center mb-3">
                            <Icon className={cn(
                              "h-5 w-5 mr-2",
                              theme === "dark" ? "text-blue-400" : "text-primary"
                            )} />
                            <span className={cn(
                              "text-lg font-semibold",
                              theme === "dark" ? "text-blue-400" : "text-primary"
                            )}>
                              {event.year}
                            </span>
                          </div>
                          <h3 className={cn(
                            "text-xl font-bold mb-2",
                            theme === "dark" ? "text-white" : "text-gray-800"
                          )}>
                            {event.title}
                          </h3>
                          <ScrollableText maxHeight="100px" showScrollHint={false}>
                            <p className={cn(
                              "pr-2",
                              theme === "dark" ? "text-gray-300" : "text-gray-600"
                            )}>
                              {event.description}
                            </p>
                          </ScrollableText>
                        </HolographicCard>
                      ) : (
                        <div className={cn(
                          "p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-all relative",
                          theme === 'light' ? 'border-gray-200' : 'border-gray-800'
                        )}>
                          {event.badge && (
                            <span className={cn(
                              "absolute -top-3 -right-3 text-xs font-semibold px-2 py-1 rounded-full",
                              event.badge === "NOW"
                                ? "bg-green-600 text-white"
                                : "bg-yellow-500 text-white"
                            )}>
                              {event.badge}
                            </span>
                          )}
                          <div className="flex items-center mb-3">
                            <Icon className="h-5 w-5 mr-2 text-primary" />
                            <span className="text-lg font-semibold text-primary">
                              {event.year}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 text-gray-800">
                            {event.title}
                          </h3>
                          <ScrollableText maxHeight="100px" showScrollHint={false}>
                            <p className="text-gray-600 pr-2">
                              {event.description}
                            </p>
                          </ScrollableText>
                        </div>
                      )}
                    </div>

                    <div className={cn(
                      "hidden md:flex absolute top-6 left-1/2 transform -translate-x-1/2 h-4 w-4 rounded-full z-10",
                      theme === "dark" ? "bg-blue-400" : "bg-primary"
                    )}></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Mobile Optimized */}
      <section className="mb-16 md:mb-20 px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className={cn(
            "text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4",
            theme === "dark" ? "text-white" : "text-gray-800"
          )}>Our Startup Values</h2>
          <p className={cn(
            "text-sm md:text-base max-w-2xl mx-auto",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            These principles guide our approach and define how we work with every partner.
          </p>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="md:hidden">
          <HorizontalScrollable>
            {values.map((value, index) => (
              <div key={index} className="min-w-[280px] flex-shrink-0">
                <ThemedCard className="p-4 md:p-6 group transition-transform h-full">
                  <div className={cn(
                    "h-10 w-10 md:h-12 md:w-12 rounded-lg mb-3 flex items-center justify-center",
                    theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"
                  )}>
                    <value.icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <h3 className={cn(
                    "text-lg md:text-xl font-bold mb-2",
                    theme === "dark" ? "text-white" : "text-gray-800"
                  )}>{value.title}</h3>
                  <ScrollableText maxHeight="120px" showScrollHint={false}>
                    <p className={cn(
                      "text-sm md:text-base",
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    )}>{value.description}</p>
                  </ScrollableText>
                </ThemedCard>
              </div>
            ))}
          </HorizontalScrollable>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {values.map((value, index) => (
            <ThemedCard key={index} className="p-4 md:p-6 group transition-transform">
              <div className={cn(
                "h-10 w-10 md:h-12 md:w-12 rounded-lg mb-3 md:mb-4 flex items-center justify-center",
                theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"
              )}>
                <value.icon className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <h3 className={cn(
                "text-lg md:text-xl font-bold mb-2 md:mb-3",
                theme === "dark" ? "text-white" : "text-gray-800"
              )}>{value.title}</h3>
              <p className={cn(
                "text-sm md:text-base",
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              )}>{value.description}</p>
            </ThemedCard>
          ))}
        </div>
      </section>

      {/* Why Choose Us - Mobile Optimized */}
      <section className="mb-16 md:mb-20 px-4">
        <div className="p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
              <div className={cn(
                "h-12 w-12 md:h-16 md:w-16 rounded-lg flex items-center justify-center flex-shrink-0",
                theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"
              )}>
                <Sparkles className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <div className="flex-1">
                <h2 className={cn(
                  "text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6",
                  theme === "dark" ? "text-white" : "text-gray-800"
                )}>Why BDS?</h2>
                <ScrollableText maxHeight="250px">
                  <div className="grid gap-3 md:gap-4 pr-2">
                    {[
                      "Innovation First — AI, automation, cloud, next-gen technologies.",
                      "Enterprise Security — End-to-end protection for data and systems.",
                      "Rapid Results — Fast implementation and real-time impact.",
                      "A Single Tech Partner — Everything you need under one trusted partner.",
                      "Dedicated client success teams and 24/7 support."
                    ].map((item, i) => (
                      <div key={i} className="flex items-start">
                        <div className={cn(
                          "h-4 w-4 md:h-5 md:w-5 rounded-full flex-shrink-0 mt-1 flex items-center justify-center",
                          theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"
                        )}>
                          <Check className="h-2 w-2 md:h-3 md:w-3" />
                        </div>
                        <span className={cn(
                          "ml-2 md:ml-3 text-sm md:text-base",
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        )}>{item}</span>
                      </div>
                    ))}
                  </div>
                </ScrollableText>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section - Mobile Optimized */}
      <section className="mb-16 md:mb-20 px-4">
        <div className={cn(
          "rounded-xl md:rounded-2xl p-6 md:p-12 overflow-hidden relative",
          theme === "dark"
            ? "bg-gradient-to-br from-blue-900/80 via-purple-800/80 to-indigo-900/80"
            : "bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50"
        )}>
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"></div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className={cn(
              "text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6",
              theme === "dark" ? "text-white" : "text-gray-800"
            )}>
              Ready to Build Something Amazing Together?
            </h2>
            <ScrollableText maxHeight="100px" showScrollHint={false}>
              <p className={cn(
                "text-sm md:text-lg mb-6 md:mb-8 max-w-3xl mx-auto px-2",
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              )}>
                Join us on our journey. Whether you're looking for innovative solutions or want to help shape the future with us.
              </p>
            </ScrollableText>

            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <ConsultationButton
                className={cn(
                  "w-full sm:w-auto h-auto whitespace-normal px-4 py-3 md:px-8 md:py-3 text-sm md:text-base rounded-lg font-medium transition-all",
                  theme === "dark"
                    ? "bg-white text-blue-900 hover:bg-gray-100 hover:shadow-lg"
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                )}
              />
              <TeamsButton
                className={cn(
                  "w-full sm:w-auto h-auto px-6 py-3 md:px-8 md:py-3 text-sm md:text-base rounded-lg font-medium transition-all",
                  theme === "dark"
                    ? "bg-transparent border border-white text-white hover:bg-white/10"
                    : "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50"
                )}
              />
            </div>

            <div className={cn(
              "flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm mt-6 md:mt-8",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              {['Innovative projects', 'Growth opportunities', 'Make real impact', 'Flexible environment'].map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <Check className={cn(
                    "h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2",
                    theme === "dark" ? "text-blue-400" : "text-blue-600"
                  )} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;
