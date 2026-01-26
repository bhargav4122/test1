import React, { useState, useEffect, useRef } from 'react';
import SEO from '@/components/common/SEO';
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
import { motion } from 'framer-motion';
import Layout from "@/components/layout/Layout";
import ConsistentPageHeader from '@/components/layout/ConsistentPageHeader';
import { useIsMobile } from '@/hooks/useWindowSize';
import OptimizedImage from '@/components/core/OptimizedImage';
import OptimizedVideo from '@/components/core/OptimizedVideo';
import CallToAction from '@/components/home/CallToAction';

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
    title: "The Vision",
    description: "Business & Data Solutions was born from a simple belief: every enterprise deserves clarity, not complexity. We set out to bridge the gap between traditional processes and digital intelligence.",
    icon: Lightbulb,
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    color: "from-blue-500 to-cyan-500"
  },
  {
    year: "2023",
    title: "Global Foundations",
    description: "We established our core service frameworks, working with early adopters in the tech and finance sectors to refine our AI-driven approach to data transformation.",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1522252234503-e356532cafd5?auto=format&fit=crop&w=800&q=80",
    color: "from-indigo-500 to-blue-500"
  },
  {
    year: "2024 Q1",
    title: "Official Scale",
    description: "Transitioning from a specialized consultancy to a full-service digital transformation house. We doubled our engineering team and launched our proprietary implementation methodology.",
    icon: Rocket,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    color: "from-purple-500 to-indigo-500"
  },
  {
    year: "2024 Q4",
    title: "UK Market Entry",
    description: "Successfully laid the groundwork for our London-based operations, specializing in cross-border data compliance and international cloud migrations.",
    icon: MapPin,
    image: "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=800&q=80",
    color: "from-blue-600 to-indigo-700",
    badge: "NOW"
  },
  {
    year: "2025 Q2",
    title: "India Tech Hub",
    description: "Expanding our delivery capabilities with a dedicated center of excellence in India, focusing on AI research and 24/7 global support operations.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1516562309708-05f3b2b2c238?auto=format&fit=crop&w=800&q=80",
    color: "from-orange-500 to-red-500",
    badge: "PLANNED"
  },
  {
    year: "2026",
    title: "North America Expansion",
    description: "Bringing our unique blend of strategic consulting and technological excellence to the US market, completing our vision of a truly global transformation partner.",
    icon: Compass,
    image: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?auto=format&fit=crop&w=800&q=80",
    color: "from-cyan-500 to-blue-600",
    badge: "VISION"
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


function About() {
  const { theme } = useTheme();
  const isMobile = useIsMobile();

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
    <>
      {/* SEO Meta Tags */}
      {/* SEO Meta Tags */}
      <SEO
        title="About Business and Data Solutions | About BDS"
        description="Learn about Business and Data Solutions - our mission, values, growth journey, and commitment to delivering innovative business transformation services since 2022."
        keywords="about BDS, business solutions company, our mission, company values, growth journey, business transformation, data services, digital innovation"
        url="https://www.businessanddatasolutions.com/about"
        image="https://res.cloudinary.com/dsf4d41i8/image/upload/f_webp,q_60,w_1200/v1755995499/BDS_Logo_-_Original_with_Transparent_Background_-_5000x5000_vb9jll.png"
      />

      {/* New Redesigned Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
        {/* Dynamic Background video layer */}
        <div className="absolute inset-0 z-0 h-full w-full">
          <OptimizedVideo
            sources={BACKGROUND_VIDEO}
            isMobile={isMobile}
            className="h-full w-full object-cover opacity-30 dark:opacity-20"
          />
          <div className={cn(
            "absolute inset-0 z-10 bg-gradient-to-b",
            theme === "dark"
              ? "from-black/80 via-black/50 to-black"
              : "from-white/90 via-white/60 to-white"
          )} />
        </div>

        <div className="container relative z-20 px-4 mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-500 backdrop-blur-md mb-6"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Global Transformation Partner</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={cn(
                "text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}
            >
              We Are <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500">
                BDS
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={cn(
                "max-w-3xl mx-auto text-lg md:text-xl md:leading-relaxed",
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              )}
            >
              Business & Data Solutions (BDS) helps organizations unlock growth and build resilience through intelligence, digital technology, and strategic consulting.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 max-w-6xl mx-auto">
            {/* Left Card: Core Value Prop */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={cn(
                "relative overflow-hidden rounded-[2rem] p-8 md:p-12 border backdrop-blur-xl group",
                theme === "dark"
                  ? "bg-gray-900/40 border-white/10 hover:bg-gray-900/60"
                  : "bg-white/60 border-white/40 hover:bg-white/80 shadow-xl shadow-blue-900/5"
              )}
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <ChartBarIcon className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/30">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className={cn(
                  "text-2xl font-bold mb-4",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  Empowering Innovation
                </h3>
                <p className={cn(
                  "leading-relaxed",
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                )}>
                  We provide end-to-end solutions enabling smarter decisions and seamless digital experiences. From data analytics and AI to cloud solutions, we deliver impact that lasts.
                </p>
              </div>
            </motion.div>

            {/* Right Card: Strategic Partnership */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className={cn(
                "relative overflow-hidden rounded-[2rem] p-8 md:p-12 border backdrop-blur-xl group",
                theme === "dark"
                  ? "bg-gray-900/40 border-white/10 hover:bg-gray-900/60"
                  : "bg-white/60 border-white/40 hover:bg-white/80 shadow-xl shadow-purple-900/5"
              )}
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <HandshakeIcon className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-purple-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-500/30">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className={cn(
                  "text-2xl font-bold mb-4",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  Strategic Partnership
                </h3>
                <p className={cn(
                  "leading-relaxed",
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                )}>
                  Our identity is shaped by agility, transparency, and results. We don't just implement technology; we help your business evolve with confidence through a true partnership model.
                </p>
              </div>
            </motion.div>
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
                    title="Our Story"
                  />
                </div>
              </div>
            </ThemedCard>
          </div>

          <div className="w-full md:w-1/2 relative rounded-xl md:rounded-2xl overflow-hidden min-h-[400px] flex items-center">
            <div className="absolute inset-0">
              <OptimizedImage
                src={isMobile ? UNSPLASH_IMAGES.journey.mobile : UNSPLASH_IMAGES.journey.desktop}
                alt="Our Startup Journey"
                className="w-full h-full object-cover"
              />
              <div className={cn(
                "absolute inset-0",
                theme === "dark" ? "bg-black/75" : "bg-white/90"
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
                  theme === "dark" ? "text-gray-100" : "text-gray-800"
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

      {/* Roadmap Timeline Section - High Impact Growth Journey */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-blue-500/[0.02] dark:bg-blue-400/[0.02] blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-blue-500 font-bold uppercase tracking-widest text-xs"
            >
              The Evolution of BDS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(
                "text-3xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 tracking-tight",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}
            >
              Our Growth Journey
            </motion.h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full" />
          </div>

          {/* Desktop Vertical Alternate Timeline */}
          <div className="hidden md:block relative">
            {/* Center Line with Gradient */}
            <div className={cn(
              "absolute left-1/2 transform -translate-x-1/2 h-full w-0.5",
              theme === "dark" ? "bg-gradient-to-b from-blue-500/0 via-blue-500/40 to-blue-500/0" : "bg-gradient-to-b from-blue-600/0 via-blue-600/20 to-blue-600/0"
            )} />

            <div className="space-y-32">
              {timeline.map((event, index) => {
                const isLeft = index % 2 === 0;
                const Icon = event.icon;

                return (
                  <div key={index} className="relative flex items-center justify-center">
                    {/* Centered Year Marker */}
                    <div className={cn(
                      "absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center z-10",
                    )}>
                      <div className={cn(
                        "w-12 h-12 rounded-full border-4 flex items-center justify-center shadow-xl transition-all duration-500",
                        theme === "dark"
                          ? "bg-gray-900 border-gray-800 text-blue-400"
                          : "bg-white border-blue-50 text-blue-600"
                      )}>
                        <Icon size={20} />
                      </div>
                    </div>

                    <div className={cn(
                      "w-full flex items-center gap-20",
                      isLeft ? "flex-row" : "flex-row-reverse"
                    )}>
                      {/* Content Side */}
                      <div className="w-1/2">
                        <motion.div
                          initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={cn(
                            "relative p-8 rounded-[2.5rem] border group hover:shadow-2xl transition-all duration-500",
                            theme === 'dark'
                              ? "bg-gray-900/40 border-gray-800 hover:border-blue-500/30"
                              : "bg-white border-gray-100 hover:border-blue-100 shadow-xl shadow-blue-500/5"
                          )}
                        >
                          {event.badge && (
                            <span className={cn(
                              "absolute -top-3 left-8 px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-white shadow-lg",
                              event.badge === "NOW" ? "bg-green-600 animate-pulse" : "bg-blue-600"
                            )}>
                              {event.badge}
                            </span>
                          )}

                          <div className="flex items-center justify-between mb-4">
                            <span className="text-4xl font-black text-blue-500/20">{event.year}</span>
                            <div className={cn("px-4 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-500")}>
                              {event.title}
                            </div>
                          </div>

                          <p className={cn(
                            "text-lg leading-relaxed mb-6",
                            theme === "dark" ? "text-gray-100" : "text-gray-800"
                          )}>
                            {event.description}
                          </p>

                          <div className="h-48 w-full rounded-2xl overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500">
                            <OptimizedImage
                              src={event.image}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </motion.div>
                      </div>

                      {/* Ghost Side (Empty space or decorative element) */}
                      <div className="w-1/2 pointer-events-none">
                        <div className="opacity-10 dark:opacity-5 flex justify-center">
                          <Icon size={120} className="scale-150 rotate-12" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile High-Impact Slider */}
          <div className="md:hidden space-y-8">
            {timeline.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(
                  "p-6 rounded-[2rem] border relative",
                  theme === 'dark' ? "bg-gray-900/60 border-gray-800" : "bg-white border-gray-100 shadow-xl shadow-blue-500/5"
                )}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
                    <event.icon size={24} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">{event.year}</span>
                    <h3 className={cn("font-bold text-xl", theme === 'dark' ? "text-white" : "text-gray-900")}>{event.title}</h3>
                  </div>
                </div>

                <p className={cn("text-base mb-6 leading-relaxed", theme === 'dark' ? "text-gray-200" : "text-gray-700")}>
                  {event.description}
                </p>

                <div className="h-40 rounded-2xl overflow-hidden">
                  <OptimizedImage src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
              </motion.div>
            ))}
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
            theme === "dark" ? "text-gray-200" : "text-gray-700"
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
                      theme === "dark" ? "text-gray-200" : "text-gray-700"
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
                theme === "dark" ? "text-gray-200" : "text-gray-700"
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
                          theme === "dark" ? "text-gray-200" : "text-gray-700"
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
      <CallToAction pageType="about" />
    </>
  );
}

export default About;
