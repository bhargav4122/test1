import React, { useState, useEffect, useRef } from 'react';
import SEO from '@/components/common/SEO';
import {
  Globe, BarChart3, Users, Zap, Target, Check, Shield, Eye, Lightbulb,
  Rocket, Heart, Sparkles, Linkedin, Github, Mail, Star, Clock, TrendingUp,
  Brain, Code, Cloud, Database, ShieldCheck, TargetIcon, UsersIcon, Award,
  Calendar, MapPin, Compass, ArrowRight, Layers, Cpu, Workflow, ShieldIcon,
  PieChart, LineChart, Settings, Briefcase, Building, Server, Terminal,
  BarChart, TrendingUpIcon, DollarSign, UsersRound, Network, Bot,
  Gem, Target as TargetLucide, Sparkle, AwardIcon, Leaf, BookOpen,
  Search, Filter, ClockIcon, TrendingUp as TrendingUpLucide, HeartIcon,
  MessageCircle, Phone, MapPin as MapPinIcon, ExternalLink,
  ChevronRight, ChevronLeft, Play, Pause, Volume2, VolumeX, ChevronDown, History, Crown, Lock, Building2, Globe2
} from 'lucide-react';
import HolographicCard from '../components/HolographicCard';
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { TeamsButton } from "@/components/Careers/teambutton";
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/useWindowSize';
import OptimizedImage from '@/components/core/OptimizedImage';
import OptimizedVideo from '@/components/core/OptimizedVideo';
import CallToAction from '@/components/home/CallToAction';
import { teamMembers } from '@/data/teamMembers';

export default function TimelineSection({ milestones, theme })
export const milestones = [
  {
    year: "2023",
    title: "Ideation, research, and problem discovery",
    description:
      "The journey began with deep thinking around real-world business problems. Through independent consulting work, market observation, and hands-on experimentation, the foundation was laid for a company focused on practical, data-led decision making.",
    icon: Lightbulb,
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=600&q=80",
    color: "from-yellow-500 to-amber-500",
    achievements: [
      "Business and data problem research",
      "Early solution ideation",
      "Clear service vision defined"
    ]
  },
  {
    year: "2024",
    title: "Company formation and foundation building",
    description:
      "Business & Data Solutions was formally established. This phase focused on business setup, operational readiness, tooling decisions, and resource planning to support long-term, sustainable growth.",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    color: "from-blue-500 to-cyan-500",
    achievements: [
      "Company incorporated",
      "Core business structure established",
      "Initial tools, processes, and infrastructure set up"
    ]
  },
  {
    year: "2025",
    title: "Team formation and first successful deliveries",
    description:
      "A dedicated team was formed and the first end-to-end client projects were successfully delivered. Alongside client work, the company strengthened its digital presence and refined its service offerings based on real delivery experience.",
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
    color: "from-purple-500 to-pink-500",
    achievements: [
      "Core team assembled",
      "First client project delivered",
      "Multiple projects executed",
      "Digital presence and brand visibility established"
    ]
  },
  {
    year: "2026 NOW",
    title: "Building in-house intelligence and service expansion",
    description:
      "Currently focused on developing in-house AI-driven systems while continuing active client projects. The year is structured around service expansion, geographic growth, and introducing a Business-as-a-Service delivery model.",
    icon: Brain,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
    color: "from-emerald-500 to-green-500",
    achievements: [
      "In-house AI systems under development",
      "Business-as-a-Service model deployment (Q1)",
      "India market expansion with client onboarding (Q2)",
      "New service launch including taxation services (Q3)"
    ]
  },
  {
    year: "2027",
    title: "International expansion and advanced service offerings",
    description:
      "Planned expansion into the USA market with a focus on advanced, high-trust services. This phase emphasizes security, machine learning, and enterprise-grade solutions aligned with global standards.",
    icon: Globe2,
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80",
    color: "from-orange-500 to-red-500",
    achievements: [
      "USA market entry",
      "Cybersecurity services introduction",
      "Advanced machine learning solutions planned",
      "Enterprise-focused delivery model"
    ]
  }
];


// Use a reliable video URL - let's use a placeholder or different approach
const INTRO_VIDEO = {
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
// Premium Assets
const BACKGROUND_VIDEO = {
  desktop: {
    webm: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_webm:chromasubsampling:420,q_35,w_1920,ac_none/v1753041808/Google_Gemini_n4h8by.mp4",
    mp4: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_mp4,q_35,w_1920,ac_none/v1753041808/Google_Gemini_n4h8by.mp4",
    poster: "https://res.cloudinary.com/dsf4d41i8/image/upload/f_webp,q_35,w_1200/v1753041808/Google_Gemini_n4h8by.jpg"
  },
  mobile: {
    webm: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_webm:chromasubsampling:420,q_30,w_640,ac_none/v1753041808/Google_Gemini_n4h8by.mp4",
    mp4: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_mp4,q_30,w_640,ac_none/v1753041808/Google_Gemini_n4h8by.mp4",
    poster: "https://res.cloudinary.com/dsf4d41i8/image/upload/f_webp,q_30,w_400/v1753041808/Google_Gemini_n4h8by.jpg"
  }
};

const FOUNDER_IMAGE = {
  desktop: "https://res.cloudinary.com/dsf4d41i8/image/upload/v1769871838/creativefabrica-ai-image-editor-0-bot_3_rfwqzc.webp",
  mobile: "https://res.cloudinary.com/dsf4d41i8/image/upload/v1769871838/creativefabrica-ai-image-editor-0-bot_3_rfwqzc.webp"
};


// Values Data
const values = [
  {
    icon: Sparkle,
    title: "Innovation",
    description: "Exploring smarter ways to solve problems",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "Transparent, secure, and ethical in all we do",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Partnering with clients to deliver tangible results",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Setting the bar high, always exceeding expectations",
    color: "from-orange-500 to-red-500"
  }
];

// Approach Methodology
const approachSteps = [
  {
    step: "01",
    title: "Data-First Thinking",
    description: "Insights drive decisions",
    icon: Database
  },
  {
    step: "02",
    title: "Agile Execution",
    description: "Rapid, iterative delivery",
    icon: Workflow
  },
  {
    step: "03",
    title: "Tailored Solutions",
    description: "Customized to your business needs",
    icon: Settings
  },
  {
    step: "04",
    title: "Continuous Improvement",
    description: "Always learning, always optimizing",
    icon: TrendingUp
  }
];

// Client Impact Cases
const impactCases = [
  {
    metric: "30%",
    description: "Boosted operational efficiency for a retail client",
    icon: TrendingUpLucide,
    color: "from-blue-500 to-purple-500"
  },
  {
    metric: "25%",
    description: "Increased sales through predictive analytics",
    icon: DollarSign,
    color: "from-green-500 to-emerald-500"
  },
  {
    metric: "Fast",
    description: "Enabled data-driven strategies for startups to scale fast",
    icon: Rocket,
    color: "from-orange-500 to-red-500"
  }
];

// Future Roadmap
const roadmapItems = [
  "Expanding AI-driven analytics services",
  "Launching industry-specific automation solutions",
  "Achieving ISO 27001-aligned security standards and SOC 2 readiness",
  "Building a global network of data innovators"
];

// Testimonials
const testimonials = [
  {
    quote: "Working with Business and Data Solutions transformed the way we use data. Their insights are actionable and game-changing.",
    author: "Client A",
    role: "CTO, Tech Startup"
  },
  {
    quote: "Their team doesn't just provide solutions; they partner with you to drive growth.",
    author: "Client B",
    role: "Operations Director, Retail"
  }
];

// FAQ Items
const faqItems = [
  {
    question: "How do you customize solutions?",
    answer: "Every solution is tailored to your industry, goals, and data landscape. We conduct thorough discovery sessions to understand your unique needs."
  },
  {
    question: "Which industries do you serve?",
    answer: "We serve SMBs to enterprises across tech, retail, finance, and healthcare, with specialized solutions for each sector."
  },
  {
    question: "What makes your approach different?",
    answer: "We combine deep technical expertise with business acumen, ensuring solutions deliver both technical excellence and business value."
  }
];

// Interactive Intro Video Component
const IntroVideoPlayer = ({ theme, isMobile }: { theme: string, isMobile: boolean }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };




  return (
    <div className="relative rounded-3xl overflow-hidden group">
      <div className="aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={isMobile ? INTRO_VIDEO.mobile.poster : INTRO_VIDEO.desktop.poster}
          muted={isMuted}
          loop
          playsInline
        >
          <source src={isMobile ? INTRO_VIDEO.mobile.webm : INTRO_VIDEO.desktop.webm} type="video/webm" />
          <source src={isMobile ? INTRO_VIDEO.mobile.mp4 : INTRO_VIDEO.desktop.mp4} type="video/mp4" />
        </video>
      </div>

      {/* Video Controls */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 text-white" />
              ) : (
                <Play className="h-5 w-5 text-white" />
              )}
            </button>
            <button
              onClick={toggleMute}
              className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5 text-white" />
              ) : (
                <Volume2 className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
          <div className={cn(
            "px-4 py-2 rounded-full backdrop-blur-sm",
            theme === "dark" ? "bg-white/10" : "bg-black/10"
          )}>
            <span className="text-white font-medium">Watch our story</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Interactive History Component
const InteractiveHistory = ({ theme }: { theme: string }) => {
  const [activeYear, setActiveYear] = useState("2024");
  const activeMilestone = milestones.find(m => m.year === activeYear);

  return (
    <div className="relative">
      {/* History Track */}
      <div className="relative h-2 bg-gray-200 dark:bg-gray-800 rounded-full mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-20" />
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between">
          {milestones.map((milestone, index) => (
            <button
              key={milestone.year}
              onClick={() => setActiveYear(milestone.year)}
              className={cn(
                "relative w-8 h-8 rounded-full border-4 transition-all duration-300",
                activeYear === milestone.year
                  ? `bg-gradient-to-r ${milestone.color} scale-125 border-white dark:border-gray-900 shadow-lg`
                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:scale-110"
              )}
            >
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-semibold">
                {milestone.year}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Milestone Content */}
      {activeMilestone && (
        <motion.div
          key={activeYear}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "rounded-2xl p-8 border",
            theme === "dark"
              ? "bg-gray-900/40 border-gray-800"
              : "bg-white border-gray-200 shadow-xl"
          )}
        >
          <div className="flex items-start mb-6">
            <div className={`p-4 rounded-xl bg-gradient-to-r ${activeMilestone.color} mr-6`}>
              <activeMilestone.icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className={cn(
                "text-2xl font-bold mb-2",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                {activeMilestone.title}
              </h3>
              <p className={cn(
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              )}>
                {activeMilestone.description}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Interactive Data Visualization Component
const DataVisualization = ({ theme }: { theme: string }) => {
  const [activeMetric, setActiveMetric] = useState(0);

  const metrics = [
    { label: "Data Processed", value: "10M+", change: "+25%" },
    { label: "Client ROI", value: "3.2x", change: "+40%" },
    { label: "Time Saved", value: "15K+ hrs", change: "-60%" },
    { label: "Accuracy Rate", value: "99.8%", change: "+15%" }
  ];

  return (
    <div className={cn(
      "rounded-3xl p-8 border",
      theme === "dark"
        ? "bg-gray-900/40 border-gray-800"
        : "bg-white border-gray-200 shadow-xl"
    )}>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Metrics Selector */}
        <div className="md:w-1/3">
          <h3 className={cn(
            "text-xl font-bold mb-6",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>
            Impact Metrics
          </h3>
          <div className="space-y-3">
            {metrics.map((metric, index) => (
              <button
                key={index}
                onClick={() => setActiveMetric(index)}
                className={cn(
                  "w-full p-4 rounded-xl text-left transition-all",
                  activeMetric === index
                    ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800/50"
                )}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className={cn(
                    "text-lg font-semibold",
                    activeMetric === index
                      ? "text-blue-600 dark:text-blue-400"
                      : theme === "dark" ? "text-gray-300" : "text-gray-700"
                  )}>
                    {metric.label}
                  </span>
                  <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded-full",
                    metric.change.startsWith('+')
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  )}>
                    {metric.change}
                  </span>
                </div>
                <div className={cn(
                  "text-2xl font-bold",
                  activeMetric === index
                    ? "text-blue-600 dark:text-blue-400"
                    : theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  {metric.value}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Visualization Area */}
        <div className="md:w-2/3">
          <div className="h-64 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-gray-200 dark:border-gray-800 flex items-center justify-center">
            <div className="text-center">
              <BarChart className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <p className={cn(
                "text-lg mb-2",
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              )}>
                Real-time visualization of
              </p>
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {metrics[activeMetric].label}
              </p>
            </div>
          </div>
          <p className={cn(
            "text-sm mt-4 text-center",
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          )}>
            Interactive dashboard showing impact metrics and trends
          </p>
        </div>
      </div>
    </div>
  );
};


// Mobile Timeline Item Component
const MobileTimelineItem = ({ milestone, theme }: {
  milestone: typeof milestones[0];
  theme: string
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn(
      "rounded-2xl p-6 border",
      theme === "dark"
        ? "bg-gray-900/40 border-gray-800"
        : "bg-white border-gray-200 shadow-lg"
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${milestone.color} flex items-center justify-center mr-4`}>
            <milestone.icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className={cn(
              "text-xl font-bold",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              {milestone.year}
            </h4>
            <p className={cn(
              "text-sm",
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            )}>
              {milestone.title}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "p-2 rounded-full",
            theme === "dark" ? "bg-gray-800" : "bg-gray-100"
          )}
        >
          <ChevronDown className={cn(
            "h-5 w-5 transition-transform",
            isExpanded ? "rotate-180" : "",
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          )} />
        </button>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4"
        >
          <p className={cn(
            "text-base mb-4",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            {milestone.description}
          </p>

          <div className="mb-4">
            <img
              src={milestone.image}
              alt={milestone.title}
              className="w-full h-48 object-cover rounded-xl"
            />
          </div>

          <div>
            <h5 className={cn(
              "text-sm font-semibold mb-2 flex items-center",
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            )}>
              <AwardIcon className="w-4 h-4 text-blue-500 mr-2" />
              Key Achievements
            </h5>
            <ul className="space-y-2">
              {milestone.achievements.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="w-2 h-2 mt-2 rounded-full bg-blue-500 mr-3 flex-shrink-0" />
                  <span className={cn(
                    "text-sm",
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  )}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};

function About() {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(0);
  const [activeMember, setActiveMember] = React.useState<number | null>(0);
  const hoverTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (index: number) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setActiveMember(index);
    }, 120); // small delay = premium feel
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setActiveMember(null);
  };


  return (
    <>
      <SEO
        title="About Business and Data Solutions | Empowering Businesses with Data-Driven Decisions"
        description="Unlock insights. Drive growth. Transform your business with next-gen solutions. Discover our mission, values, team, and approach to data excellence."
        keywords="about BDS, business solutions, data-driven decisions, company mission, our team, business transformation, data analytics, digital innovation"
        url="https://www.businessanddatasolutions.com/about"
        image="https://res.cloudinary.com/dsf4d41i8/image/upload/f_webp,q_60,w_1200/v1755995499/BDS_Logo_-_Original_with_Transparent_Background_-_5000x5000_vb9jll.png"
      />

      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <OptimizedVideo
            sources={BACKGROUND_VIDEO}
            isMobile={isMobile}
            className="w-full h-full object-cover opacity-30 dark:opacity-20"
            autoPlay
            muted
            loop
          />
          <div className={cn(
            "absolute inset-0",

          )} />
        </div>

        <div className="container relative z-10 px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-8">
              <Sparkle className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Building the Intelligent Business
              </span>
            </div>

            <h1 className={cn(
              "text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500">
                Empowering Businesses with<br />
                Data-Driven Decisions
              </span>
            </h1>

            <p className={cn(
              "text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl mx-auto",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              Unlock insights. Drive growth. Transform your business with next-gen solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ConsultationButton
                variant="default"
                size="lg"
                className="px-8 py-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-xl"
              >
                Explore Our Solutions
              </ConsultationButton>

            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Intro / Tagline */}
      {/* 3 & 4. Mission & Vision - Combined Premium Section */}
      <section className="py-10 md:py-10 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center p-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "inline-block px-8 py-4 rounded-full border"
            )}
          >
            <p className={cn(
              "text-2xl md:text-3xl font-bold italic",
              theme === "dark" ? "text-gray-100" : "text-gray-800"
            )}>
              "Where Innovation Meets Intelligent Data – Turning Complexity into Clarity."
            </p>
          </motion.div>
        </div>

        {/* Background Decoration */}
        <div className="absolute inset-0 " />

        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-24"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-6">
              <Target className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Our Core Purpose
              </span>
            </div>
            <h2 className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-bold mb-6",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              Guiding <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Vision</span>,
              Driving <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Mission</span>
            </h2>
            <p className={cn(
              "text-lg md:text-xl max-w-3xl mx-auto",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              The dual pillars that define our commitment to excellence and innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={cn(
                "relative rounded-3xl p-8 md:p-12 border overflow-hidden group h-full",
                theme === "dark"
                  ? "bg-gradient-to-br from-gray-900/40 via-gray-900/20 to-blue-900/10 border-blue-800/30"
                  : "bg-gradient-to-br from-white via-blue-50/30 to-white border-blue-200 shadow-2xl hover:shadow-3xl transition-shadow duration-300"
              )}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Floating Elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

              <div className="relative z-10">
                {/* Header with Icon */}
                <div className="flex items-center mb-8">
                  <div className={cn(
                    "relative p-4 rounded-2xl mr-6 group-hover:scale-110 transition-transform duration-300",
                    theme === "dark"
                      ? "bg-gradient-to-br from-blue-900/40 to-cyan-900/40"
                      : "bg-gradient-to-br from-blue-100 to-cyan-100"
                  )}>
                    <Eye className="h-10 w-10 text-blue-500" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <h3 className={cn(
                      "text-2xl md:text-3xl font-bold mb-2",
                      theme === "dark" ? "text-white" : "text-gray-900"
                    )}>
                      Our Vision
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                  </div>
                </div>

                {/* Vision Statement */}
                <div className="relative">
                  <div className="absolute -left-6 top-0 text-5xl text-blue-500/20">"</div>
                  <p className={cn(
                    "text-xl md:text-2xl leading-relaxed italic pl-8 mb-8",
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  )}>
                    To be the trusted partner in business and data solutions, enabling smarter decisions and sustainable growth for every organization.
                  </p>
                </div>

                {/* Vision Highlights */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-3" />
                    <span className={cn(
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    )}>
                      Global trusted partner status
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-3" />
                    <span className={cn(
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    )}>
                      Enable smarter, data-driven decisions
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-3" />
                    <span className={cn(
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    )}>
                      Drive sustainable organizational growth
                    </span>
                  </div>
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/20 to-transparent transform rotate-45 -translate-y-24 translate-x-24" />
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={cn(
                "relative rounded-3xl p-8 md:p-12 border overflow-hidden group h-full",
                theme === "dark"
                  ? "bg-gradient-to-br from-gray-900/40 via-gray-900/20 to-purple-900/10 border-purple-800/30"
                  : "bg-gradient-to-br from-white via-purple-50/30 to-white border-purple-200 shadow-2xl hover:shadow-3xl transition-shadow duration-300"
              )}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Floating Elements */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

              <div className="relative z-10">
                {/* Header with Icon */}
                <div className="flex items-center mb-8">
                  <div className={cn(
                    "relative p-4 rounded-2xl mr-6 group-hover:scale-110 transition-transform duration-300",
                    theme === "dark"
                      ? "bg-gradient-to-br from-purple-900/40 to-pink-900/40"
                      : "bg-gradient-to-br from-purple-100 to-pink-100"
                  )}>
                    <Target className="h-10 w-10 text-purple-500" />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <h3 className={cn(
                      "text-2xl md:text-3xl font-bold mb-2",
                      theme === "dark" ? "text-white" : "text-gray-900"
                    )}>
                      Our Mission
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                  </div>
                </div>

                {/* Mission Statement */}
                <div className="relative">
                  <div className="absolute -left-6 top-0 text-5xl text-purple-500/20">"</div>
                  <p className={cn(
                    "text-xl md:text-2xl leading-relaxed italic pl-8 mb-8",
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  )}>
                    Deliver intelligent, scalable solutions that transform data into actionable insights, empowering businesses to thrive in a rapidly evolving world.
                  </p>
                </div>

                {/* Mission Highlights */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-3" />
                    <span className={cn(
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    )}>
                      Intelligent, scalable solution delivery
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-3" />
                    <span className={cn(
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    )}>
                      Transform data into actionable insights
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-3" />
                    <span className={cn(
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    )}>
                      Empower businesses to thrive in evolution
                    </span>
                  </div>
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 left-0 w-24 h-24 overflow-hidden">
                <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-transparent transform -rotate-45 -translate-y-24 -translate-x-24" />
              </div>
            </motion.div>
          </div>

          {/* Connecting Element */}
          <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                  <Sparkle className="h-6 w-6 text-purple-500" />
                </div>
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-ping opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Founder / CEO Message & 6. How It Started / Our Story */}
      <section className="py-2 md:py-3 px-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-purple-500/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <History className="w-5 h-5 text-blue-500 dark:text-blue-400" />
        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-24"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-6">
              <UsersRound className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Our Leadership & Journey
              </span>
            </div>
            <h2 className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-bold mb-6",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Vision</span>,
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Story</span>,
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">Journey</span>
            </h2>
            <p className={cn(
              "text-lg md:text-xl max-w-3xl mx-auto",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              Meet our visionary leader, discover our origin story, and witness our journey through data
            </p>
          </motion.div>

          {/* Interactive Three-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">

            {/* Column 1: CEO Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Floating CEO Card */}
              <div className={cn(
                "relative rounded-3xl p-8 border h-full backdrop-blur-sm transition-all duration-500 hover:scale-[1.02]",
                theme === "dark"
                  ? "bg-gradient-to-b from-gray-900/40 via-gray-900/20 to-gray-900/10 border-blue-800/30 hover:border-blue-500/50"
                  : "bg-gradient-to-b from-white/80 via-white/60 to-white/40 border-blue-200 shadow-2xl hover:shadow-3xl"
              )}>
                {/* CEO Image Floating Effect */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

                    {/* CEO Image */}
                    <div className={cn(
                      "relative w-24 h-24 rounded-full overflow-hidden border-4",
                      theme === "dark" ? "border-gray-800" : "border-white shadow-xl"
                    )}>
                      <OptimizedImage
                        src={isMobile ? FOUNDER_IMAGE.mobile : FOUNDER_IMAGE.desktop}
                        alt="Founder & CEO"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Status Badge */}
                      <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* CEO Content */}
                <div className="p-5 text-center">

                  <h3 className={cn(
                    "text-2xl font-bold mb-2",
                    theme === "dark" ? "text-white" : "text-gray-900"
                  )}>
                    Founder & CEO
                  </h3>
                  <p className={cn(
                    "text-sm mb-6",
                    theme === "dark" ? "text-blue-400" : "text-blue-600"
                  )}>
                    Bhargav Allu
                  </p>

                  {/* Quote */}
                  <div className="relative mb-8">
                    <div className="absolute -left-2 -top-4 text-4xl text-blue-500/30">"</div>
                    <blockquote className={cn(
                      "text-lg leading-relaxed italic pl-4",
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    )}>
                      At Business and Data Solutions, we believe data is the compass for tomorrow's success.
                    </blockquote>
                    <div className="absolute -right-2 -bottom-4 text-4xl text-blue-500/30 rotate-180">"</div>
                  </div>

                  {/* Full Message */}
                  <p className={cn(
                    "text-base leading-relaxed mb-6",
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  )}>
                    Our mission is to bridge technology and strategy, helping businesses navigate challenges and uncover opportunities. We're not just solving problems; we're shaping the future.
                  </p>


                </div>
              </div>
            </motion.div>

            {/* Column 2: Our Story */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative group"
            >
              {/* Story Card */}
              <div className={cn(
                "relative rounded-3xl p-8 border h-full backdrop-blur-sm overflow-hidden",
                theme === "dark"
                  ? "bg-gradient-to-b from-gray-900/40 via-gray-900/20 to-gray-900/10 border-purple-800/30 hover:border-purple-500/50"
                  : "bg-gradient-to-b from-white/80 via-white/60 to-white/40 border-purple-200 shadow-2xl hover:shadow-3xl"
              )}>
                {/* Story Icon */}
                <div className="absolute top-8 right-8">
                  <div className={cn(
                    "p-3 rounded-xl",
                    theme === "dark" ? "bg-purple-900/40" : "bg-purple-100"
                  )}>
                    <BookOpen className="h-8 w-8 text-purple-500" />
                  </div>
                </div>

                {/* Story Content */}
                <div>
                  <h3 className={cn(
                    "text-2xl font-bold mb-6",
                    theme === "dark" ? "text-white" : "text-gray-900"
                  )}>
                    Our Story
                  </h3>

                  {/* Story Narrative */}
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <span className="text-white font-bold">S</span>
                      </div>
                      <div className="pl-12">
                        <p className={cn(
                          "text-base leading-relaxed",
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        )}>
                          Founded with a passion for technology and business insight, we began as a small team committed to making data accessible and actionable.
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                        <span className="text-white font-bold">G</span>
                      </div>
                      <div className="pl-12">
                        <p className={cn(
                          "text-base leading-relaxed",
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        )}>
                          From humble beginnings, we're growing into a hub of innovation, pushing the boundaries of business intelligence and digital transformation.
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                        <span className="text-white font-bold">V</span>
                      </div>
                      <div className="pl-12">
                        <p className={cn(
                          "text-base leading-relaxed",
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        )}>
                          Our vision is to make advanced business technology accessible to companies of all sizes, creating exceptional value for every partner.
                        </p>
                      </div>
                    </div>
                  </div>




                </div>
              </div>
            </motion.div>

            {/* Column 3: Introductory Video */}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              {/* Interactive Video Card */}
              <div className={cn(
                "relative rounded-3xl overflow-hidden border h-full",
                theme === "dark"
                  ? "border-pink-800/30 hover:border-pink-500/50"
                  : "border-pink-200 shadow-2xl hover:shadow-3xl"
              )}>
                {/* Video Container */}
                <div className="aspect-video relative bg-black">
                  {/* Video with Native Controls */}
                  <video
                    className="w-full h-full object-cover rounded-t-3xl"
                    poster={isMobile ? INTRO_VIDEO.mobile.poster : INTRO_VIDEO.desktop.poster}
                    controls
                    controlsList="nodownload"
                    playsInline
                  >
                    <source src={isMobile ? INTRO_VIDEO.mobile.webm : INTRO_VIDEO.desktop.webm} type="video/webm" />
                    <source src={isMobile ? INTRO_VIDEO.mobile.mp4 : INTRO_VIDEO.desktop.mp4} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Custom Styled Controls Overlay (Optional - for better styling) */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

                  {/* Video Title Overlay */}
                  <div className="absolute top-4 left-4 right-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm">
                      <Play className="h-4 w-4 text-white" />
                      <span className="text-white text-sm font-medium">
                        Introductory Video
                      </span>
                    </div>
                  </div>
                </div>

                {/* Video Description */}
                <div className={cn(
                  "p-6",
                  theme === "dark" ? "bg-gray-900/40" : "bg-white"
                )}>
                  <div className="flex items-start mb-4">
                    <div className={cn(
                      "p-3 rounded-xl mr-4 flex-shrink-0",
                      theme === "dark" ? "bg-pink-900/40" : "bg-pink-100"
                    )}>
                      <Play className="h-6 w-6 text-pink-500" />
                    </div>
                    <div>
                      <h4 className={cn(
                        "text-xl font-bold mb-2",
                        theme === "dark" ? "text-white" : "text-gray-900"
                      )}>
                        Our Digital Transformation Journey
                      </h4>
                      <p className={cn(
                        "text-sm",
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      )}>
                        Watch how we transform data into decisions, connect businesses with insights,
                        and fuel growth in a digital-first world.
                      </p>
                    </div>
                  </div>

                  {/* Video Features */}
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                        <Target className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <div className={cn(
                          "text-sm font-semibold",
                          theme === "dark" ? "text-white" : "text-gray-900"
                        )}>
                          Data Insights
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Real examples
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <div className={cn(
                          "text-sm font-semibold",
                          theme === "dark" ? "text-white" : "text-gray-900"
                        )}>
                          Growth Stories
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Client success
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video Stats */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className={cn(
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        )}>
                          1:15 min
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Eye className="h-4 w-4 text-gray-400 mr-2" />
                        <span className={cn(
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        )}>

                        </span>
                      </div>
                      <button
                        onClick={() => {
                          const video = document.querySelector('.aspect-video video') as HTMLVideoElement;
                          if (video) {
                            if (video.paused) {
                              video.play();
                            } else {
                              video.pause();
                            }
                          }
                        }}
                        className="flex items-center text-sm text-pink-500 hover:text-pink-600"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Play Video
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>


          {/* Connecting Elements */}
          <div className="hidden lg:flex justify-center mt-12">

            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <UsersRound className="h-4 w-4 text-white" />
              </div>
              <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
                <Play className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

          {/* Mobile Connection Lines */}
          <div className="lg:hidden flex flex-col items-center mt-8 space-y-4">
            <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500 to-purple-500" />
            <div className="w-0.5 h-8 bg-gradient-to-b from-purple-500 to-pink-500" />
          </div>

          {/* Story Summary */}
          <div className={cn(
            "mt-8 p-6 rounded-2xl text-center",
            theme === "dark" ? "bg-gray-800/30" : "bg-purple-50/50"
          )}>
            <div className="flex items-center justify-center mb-3">
              <Sparkle className="h-5 w-5 text-purple-500 mr-2" />
              <h4 className={cn(
                "font-semibold",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                Our Philosophy
              </h4>
            </div>
            <p className={cn(
              "text-sm leading-relaxed",
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            )}>
              Every project is an opportunity to learn, grow, and deliver exceptional value to forward-thinking businesses.
            </p>
          </div>
        </div>

        {/* Video Progress Update Script */}
        <script dangerouslySetInnerHTML={{
          __html: `
      document.addEventListener('DOMContentLoaded', function() {
        const video = document.getElementById('storyVideo');
        const progressBar = document.getElementById('videoProgress');
        const currentTimeEl = document.getElementById('currentTime');
        const durationEl = document.getElementById('duration');
        
        if (video) {
          // Update duration when video loads
          video.addEventListener('loadedmetadata', function() {
            const duration = video.duration;
            const minutes = Math.floor(duration / 60);
            const seconds = Math.floor(duration % 60);
            durationEl.textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
          });
          
          // Update progress bar as video plays
          video.addEventListener('timeupdate', function() {
            if (progressBar) {
              const progress = (video.currentTime / video.duration) * 100;
              progressBar.style.width = progress + '%';
            }
            
            // Update current time
            if (currentTimeEl) {
              const minutes = Math.floor(video.currentTime / 60);
              const seconds = Math.floor(video.currentTime % 60);
              currentTimeEl.textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
            }
          });
          
          // Reset progress when video ends
          video.addEventListener('ended', function() {
            if (progressBar) {
              progressBar.style.width = '0%';
            }
            if (currentTimeEl) {
              currentTimeEl.textContent = '0:00';
            }
          });
        }
      });
    `
        }} />
      </section>


      {/* 8. Growth & Milestones */}

      <section className="py-16 px-4 md:px-6 relative overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.03] via-transparent to-purple-500/[0.03]" />

        {/* Premium Glow Effects */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        {/* Premium Metallic Border Effect */}
        <div className="hidden lg:block absolute inset-0 border-[16px] border-transparent rounded-3xl pointer-events-none">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 border border-white/20" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          {/* Premium Header with Glow Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14 relative"
          >
            {/* Premium Glow behind header */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl" />

            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm mb-4 relative">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Our Journey
              </span>
              {/* Premium sparkle */}
              <div className="absolute -top-1 -right-1">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
              </div>
            </div>

            <h2 className={cn(
              "text-4xl lg:text-5xl font-bold mb-4 relative",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              Our{" "}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 animate-pulse">
                  Evolution
                </span>
                {/* Premium underline effect */}
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full blur-sm" />
              </span>
            </h2>

            <p className={cn(
              "text-lg max-w-3xl mx-auto relative",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              A step-by-step evolution shaped by execution, learning, and impact.
              {/* Premium decorative line */}
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-purple-500/50 rounded-full" />
            </p>
          </motion.div>

          {/* Timeline Container with Premium Styling */}
          <div className="relative">
            {/* Desktop line - Premium version */}
            <div className="hidden md:block absolute left-0 right-0 top-10 h-1">
              <div className={cn(
                "h-1 mx-12 rounded-full bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20",
                theme === "dark" ? "" : ""
              )} />
              {/* Premium glow line */}
              <div className="absolute inset-0 mx-12 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full blur-sm opacity-30" />
            </div>

            {/* Premium decorative elements on timeline */}
            <div className="hidden md:block">
              <div className="absolute left-12 top-10 transform -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-sm" />
              <div className="absolute right-12 top-10 transform -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-sm" />
            </div>

            {/* Desktop nodes - Premium styling */}
            <div className="hidden md:flex justify-between px-12 relative z-10">
              {milestones.map((milestone, index) => {
                const isActive = activeIndex === index;
                const isCurrent = milestone.year.includes("NOW");

                return (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(isActive ? null : index)}
                    className="relative focus:outline-none group"
                  >
                    {/* Premium glow effect */}
                    <div className={cn(
                      "absolute inset-0 w-24 h-24 rounded-full blur-md transition-all duration-300",
                      isActive
                        ? "bg-gradient-to-r from-blue-500/30 to-cyan-500/30"
                        : "group-hover:bg-gradient-to-r from-blue-500/20 to-cyan-500/20"
                    )} />

                    <div className={cn(
                      "w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-300 relative",
                      isActive
                        ? "scale-110 shadow-2xl bg-gradient-to-br from-blue-500 to-cyan-500 border-white backdrop-blur-sm"
                        : theme === "dark"
                          ? "bg-gray-900/80 border-gray-800 backdrop-blur-sm group-hover:bg-gray-800/80 group-hover:border-blue-500/30"
                          : "bg-white/80 border-gray-200 backdrop-blur-sm group-hover:bg-white group-hover:border-blue-500/30"
                    )}>
                      {/* Premium shine effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />

                      <span className={cn(
                        "text-xl font-bold relative",
                        isActive || isCurrent ? "text-white" : "text-gray-700 dark:text-gray-300"
                      )}>
                        {milestone.year.replace("NOW", "").trim()}
                        {/* Premium glow on text */}
                        {isActive && <span className="absolute -inset-1 blur-sm bg-blue-500/20" />}
                      </span>

                      <milestone.icon className={cn(
                        "w-5 h-5 mt-1 relative",
                        isActive ? "text-white/90" : "text-blue-500"
                      )} />
                    </div>

                    {/* Premium current indicator */}
                    {isCurrent && (
                      <>
                        <span className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse border-2 border-white dark:border-gray-900" />
                        <span className="absolute -top-2 -right-2 w-4 h-4 bg-green-500/40 rounded-full animate-ping" />
                      </>
                    )}

                    {/* Premium tooltip effect */}
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className={cn(
                        "px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap",
                        theme === "dark"
                          ? "bg-gray-800 text-gray-200"
                          : "bg-gray-900 text-white"
                      )}>
                        {milestone.title}
                      </div>
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900 dark:bg-gray-800" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Expanded content - Premium styling */}
            <motion.div layout className="mt-16">
              {activeIndex !== null && (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "rounded-3xl border relative overflow-hidden",
                    theme === "dark"
                      ? "bg-gray-900/80 border-gray-800 backdrop-blur-sm"
                      : "bg-white/80 border-gray-200 backdrop-blur-sm"
                  )}
                >
                  {/* Premium background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />

                  {/* Premium shine border */}
                  <div className="absolute inset-0 rounded-3xl border border-white/10" />

                  <div className="relative p-8 md:p-10">
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                      {/* Image with premium frame */}
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl" />
                        <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                          <img
                            src={milestones[activeIndex].image}
                            alt={milestones[activeIndex].title}
                            className="w-full h-64 object-cover"
                          />
                          {/* Premium image overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                          {/* Premium image corner accent */}
                          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-500/50" />
                          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-purple-500/50" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative">
                        {/* Premium content accent */}
                        <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />

                        <div className="pl-6">
                          <h3 className={cn(
                            "text-2xl font-bold mb-3 flex items-center gap-3",
                            theme === "dark" ? "text-white" : "text-gray-900"
                          )}>
                            {milestones[activeIndex].title}
                            {/* Premium badge */}
                            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 rounded-full border border-blue-500/30">
                              Milestone
                            </span>
                          </h3>

                          <p className={cn(
                            "text-base mb-6 leading-relaxed",
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                          )}>
                            {milestones[activeIndex].description}
                          </p>

                          <div className="relative">
                            {/* Premium achievements header */}
                            <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                              <AwardIcon className="w-5 h-5 text-blue-500" />
                              <span className="text-sm font-bold uppercase tracking-wider text-gray-400">
                                Key Achievements
                              </span>
                              <div className="ml-auto">
                                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                              </div>
                            </div>

                            {/* Premium achievements list */}
                            <ul className="space-y-3 pl-2">
                              {milestones[activeIndex].achievements.map((item, i) => (
                                <li key={i} className="flex gap-3 group">
                                  {/* Premium bullet */}
                                  <div className="relative mt-2">
                                    <span className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                                    <span className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-ping opacity-30" />
                                  </div>
                                  <span className={cn(
                                    "text-sm group-hover:translate-x-2 transition-transform duration-300",
                                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                                  )}>
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Mobile - Enhanced with premium touches */}
            <div className="md:hidden mt-10 space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative">
                  {/* Premium mobile card glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-sm" />
                  <MobileTimelineItem
                    milestone={milestone}
                    theme={theme}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Future Vision Section - Premium Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 md:mt-16"
          >
            <div className={cn(
              "rounded-2xl md:rounded-3xl p-6 md:p-12 border text-center relative overflow-hidden",
              theme === "dark"
                ? "bg-gradient-to-br from-gray-900/80 to-purple-900/40 border-purple-800/30 backdrop-blur-sm"
                : "bg-gradient-to-br from-white/80 to-purple-50/80 border-purple-200/50 backdrop-blur-sm"
            )}>
              {/* Premium floating particles */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500/50 rounded-full animate-pulse" />
              <div className="absolute bottom-8 left-10 w-1 h-1 bg-purple-500/50 rounded-full animate-pulse" />
              <div className="absolute top-10 left-1/4 w-3 h-3 bg-cyan-500/30 rounded-full animate-pulse" />

              {/* Premium background pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />

              {/* Premium border glow */}
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-white/20" />
              <div className="absolute -inset-1 rounded-2xl md:rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl" />

              <div className="relative">
                <div className="inline-flex items-center gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6 md:mb-8 backdrop-blur-sm">
                  <Rocket className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
                  <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
                    How We Think About the Future
                  </span>
                  {/* Premium sparkle */}
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                </div>

                <h3 className={cn(
                  "text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 relative",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  What's Next for{" "}
                  <span className="relative">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                      Business & Data Solutions
                    </span>
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-sm" />
                  </span>
                  ?
                </h3>

                <p className={cn(
                  "text-base md:text-lg lg:text-xl leading-relaxed mb-6 md:mb-8 max-w-2xl md:max-w-3xl mx-auto relative",
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                )}>
                  We're continuously evolving our capabilities to bring cutting-edge solutions to businesses worldwide.
                  <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500/80 to-pink-500/80">
                    Our roadmap includes AI-driven analytics expansion, industry-specific automation, and global partnerships.
                  </span>
                </p>

                <ConsultationButton
                  variant="default"
                  size="lg"
                  className="relative px-6 md:px-8 py-4 md:py-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 text-base md:text-lg group overflow-hidden"
                >
                  {/* Button shine effect */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative">Explore Our Future Plans</span>
                  {/* Premium button icon */}
                  <ArrowRight className="relative w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </ConsultationButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. Premium Team Section - Floating Circular Profiles */}
      <section className="py-2 md:py-3 px-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.02] via-transparent to-purple-500/[0.02]" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20 md:mb-28"
          >
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-xl mb-8">
              <Users className="w-6 h-6 text-blue-500" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Leadership Team
              </span>
            </div>

            <h2 className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-bold mb-8",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              Meet Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500">
                Visionaries
              </span>
            </h2>

            <p className={cn(
              "text-lg md:text-xl max-w-3xl mx-auto",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              Learn more about our leadership team driving innovation and growth.
            </p>
          </motion.div>

          {/* Team Members */}
          <div className="flex flex-col md:flex-row items-start justify-center gap-16 md:gap-24 lg:gap-32 mb-20">
            {teamMembers.slice(0, 3).map((member, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex flex-col items-center">
                  {/* Profile Image */}
                  <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mb-6">
                    <div className={cn(
                      "absolute inset-0 rounded-full overflow-hidden border-4 transition-all duration-300 ease-out",
                      activeMember === index
                        ? "border-blue-400/30 shadow-xl shadow-blue-500/20"
                        : "border-white/20 shadow-lg"
                    )}>
                      <OptimizedImage
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>

                    {member.socialLinks?.linkedin && (
                      <a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 hover:rotate-12"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  {/* Name & Role */}
                  <div className="text-center">
                    <h3 className={cn(
                      "text-2xl md:text-3xl font-bold mb-2 transition-colors duration-300",
                      theme === "dark" ? "text-white" : "text-gray-900",
                      activeMember === index && "text-blue-400"
                    )}>
                      {member.name}
                    </h3>

                    <p className={cn(
                      "text-base font-medium px-4 py-2 rounded-full inline-block transition-all duration-300",
                      theme === "dark"
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-blue-50 text-blue-600",
                      activeMember === index && "scale-105 bg-blue-500/20"
                    )}>
                      {member.role.split(",")[0]}
                    </p>
                  </div>

                  {/* EXPANDABLE BIO */}
                  <div className="w-full flex justify-center">
                    <AnimatePresence>
                      {activeMember === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{
                            opacity: 1,
                            height: "auto",
                            marginTop: 24
                          }}
                          exit={{
                            opacity: 0,
                            height: 0,
                            marginTop: 0,
                            transition: { duration: 0.2 }
                          }}
                          transition={{
                            opacity: { duration: 0.3 },
                            height: { duration: 0.4, ease: "easeOut" },
                            marginTop: { duration: 0.3 }
                          }}
                          className="overflow-hidden"
                        >
                          <div className={cn(
                            "w-80 rounded-2xl p-6 text-center shadow-lg",
                            theme === "dark"
                              ? "bg-gray-900/95 border border-gray-800 backdrop-blur-sm"
                              : "bg-white/95 border border-gray-200 backdrop-blur-sm"
                          )}>
                            <h4 className={cn(
                              "text-lg font-bold mb-3",
                              theme === "dark" ? "text-white" : "text-gray-900"
                            )}>
                              About {member.name.split(" ")[0]}
                            </h4>

                            <p className={cn(
                              "text-sm mb-4 leading-relaxed",
                              theme === "dark" ? "text-gray-300" : "text-gray-600"
                            )}>
                              {member.bio}
                            </p>

                            {member.expertise && (
                              <div className="flex flex-wrap gap-2 justify-center">
                                {member.expertise.slice(0, 3).map((skill, i) => (
                                  <span
                                    key={i}
                                    className={cn(
                                      "px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 hover:scale-105",
                                      theme === "dark"
                                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    )}
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className={cn(
              "text-2xl md:text-3xl font-bold mb-4",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              Meet All Our Visionaries
            </h3>

            <p className={cn(
              "text-lg max-w-2xl mx-auto mb-8",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              Explore the minds shaping our strategy and solutions.
            </p>

            <TeamsButton
              variant="default"
              size="lg"
              className="px-8 py-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Explore Team
            </TeamsButton>
          </div>
        </div>
      </section>


      {/* 10. Culture & Values */}
      < section className="py-10 md:py-15 px-4" >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={cn(
              "text-3xl md:text-4xl font-bold mb-4",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              Our Culture & Values
            </h2>
            <p className={cn(
              "text-lg max-w-3xl mx-auto",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "rounded-2xl p-6 border text-center",
                  theme === "dark"
                    ? "bg-gray-900/40 border-gray-800"
                    : "bg-white border-gray-200 shadow-lg"
                )}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${value.color} flex items-center justify-center mx-auto mb-4`}>
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className={cn(
                  "text-xl font-bold mb-2",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  {value.title}
                </h3>
                <p className={cn(
                  "text-sm",
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                )}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section >

      {/* 11. Innovation & R&D */}
      {/*  <section className="py-10 md:py-15 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "rounded-3xl p-8 md:p-12 border",
              theme === "dark"
                ? "bg-gradient-to-br from-gray-900/40 to-gray-900/20 border-gray-800"
                : "bg-gradient-to-br from-white to-gray-50/50 border-gray-200 shadow-2xl"
            )}
          >
            <div className="flex items-center mb-8">
              <div className={cn(
                "p-4 rounded-2xl mr-6",
                theme === "dark" ? "bg-blue-900/40" : "bg-blue-100"
              )}>
                <Brain className="h-10 w-10 text-blue-500" />
              </div>
              <div>
                <h2 className={cn(
                  "text-3xl md:text-4xl font-bold mb-2",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  Innovation & R&D
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
              </div>
            </div>

            <p className={cn(
              "text-xl leading-relaxed mb-6 max-w-4xl",
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            )}>
              We invest in tomorrow. From AI and ML solutions to automation and predictive analytics, our R&D lab experiments with new technologies to keep our clients ahead of the curve.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                AI Research
              </span>
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
                ML Solutions
              </span>
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                Predictive Analytics
              </span>
              <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm">
                Automation
              </span>
            </div>
          </motion.div>
        </div>
      </section>
      */}
      {/* 12. Our Approach / Methodology */}
      <section className="py-10 md:py-15 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={cn(
              "text-3xl md:text-4xl font-bold mb-4",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              Our Approach
            </h2>
            <p className={cn(
              "text-lg max-w-3xl mx-auto",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              A systematic methodology for success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {approachSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "rounded-2xl p-6 border",
                  theme === "dark"
                    ? "bg-gray-900/40 border-gray-800"
                    : "bg-white border-gray-200 shadow-lg"
                )}
              >
                <div className="text-4xl font-bold text-blue-500 mb-4">{step.step}</div>
                <div className="flex items-center mb-4">
                  <step.icon className="h-6 w-6 text-blue-500 mr-3" />
                  <h3 className={cn(
                    "text-xl font-bold",
                    theme === "dark" ? "text-white" : "text-gray-900"
                  )}>
                    {step.title}
                  </h3>
                </div>
                <p className={cn(
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                )}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* 14. Partnerships & Ecosystem */}
      <section className="py-10 md:py-15 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "rounded-3xl p-8 md:p-12 border text-center",
              theme === "dark"
                ? "bg-gradient-to-br from-gray-900/40 to-gray-900/20 border-gray-800"
                : "bg-gradient-to-br from-white to-gray-50/50 border-gray-200 shadow-2xl"
            )}
          >
            <div className="flex items-center justify-center mb-8">
              <div className={cn(
                "p-4 rounded-2xl mr-6",
                theme === "dark" ? "bg-green-900/40" : "bg-green-100"
              )}>
                <UsersRound className="h-10 w-10 text-green-500" />
              </div>
              <div>
                <h2 className={cn(
                  "text-3xl md:text-4xl font-bold mb-2",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  Partnerships & Ecosystem
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto" />
              </div>
            </div>

            <p className={cn(
              "text-xl leading-relaxed mb-8 max-w-3xl mx-auto",
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            )}>
              Collaborating with global technology leaders, innovative startups, and industry experts to deliver comprehensive, future-ready solutions.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <div className="px-6 py-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                Technology Leaders
              </div>
              <div className="px-6 py-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                Innovative Startups
              </div>
              <div className="px-6 py-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                Industry Experts
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 15. Awards & Recognition */}
      <section className="py-10 md:py-15 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "rounded-3xl p-8 md:p-12 border",
              theme === "dark"
                ? "bg-gradient-to-br from-yellow-900/20 via-yellow-900/10 to-transparent border-yellow-800/30"
                : "bg-gradient-to-br from-yellow-50 via-yellow-50/50 to-white border-yellow-200 shadow-2xl"
            )}
          >
            <div className="flex items-center mb-8">
              <div className={cn(
                "p-4 rounded-2xl mr-6",
                theme === "dark" ? "bg-yellow-900/40" : "bg-yellow-100"
              )}>
                <Award className="h-10 w-10 text-yellow-500" />
              </div>
              <div>
                <h2 className={cn(
                  "text-3xl md:text-4xl font-bold mb-2",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  Awards & Recognition
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full" />
              </div>
            </div>

            <div className="mb-6">
              <h3 className={cn(
                "text-xl font-bold mb-3",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                Future-ready compliance:
              </h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className={cn(
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  )}>
                    Planning ISO 27001 alignment
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className={cn(
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  )}>
                    SOC 2 readiness
                  </span>
                </li>
              </ul>
            </div>

            <div className={cn(
              "p-4 rounded-xl",
              theme === "dark" ? "bg-gray-800/50" : "bg-gray-100"
            )}>
              <p className={cn(
                "text-lg font-semibold mb-2",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                Featured in "Top Emerging Data Solutions Startups"
              </p>
              <p className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              )}>
                We're building our processes to meet the highest industry standards for security, compliance, and trust.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 16. Sustainability & Responsibility */}
      {/*   <section className="py-10 md:py-15 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "rounded-3xl p-8 md:p-12 border",
              theme === "dark"
                ? "bg-gradient-to-br from-green-900/20 via-green-900/10 to-transparent border-green-800/30"
                : "bg-gradient-to-br from-green-50 via-green-50/50 to-white border-green-200 shadow-2xl"
            )}
          >
            <div className="flex items-center mb-8">
              <div className={cn(
                "p-4 rounded-2xl mr-6",
                theme === "dark" ? "bg-green-900/40" : "bg-green-100"
              )}>
                <Leaf className="h-10 w-10 text-green-500" />
              </div>
              <div>
                <h2 className={cn(
                  "text-3xl md:text-4xl font-bold mb-2",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  Sustainability & Responsibility
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
              </div>
            </div>

            <p className={cn(
              "text-xl leading-relaxed mb-6",
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            )}>
              We prioritize ethical data practices, energy-efficient operations, and sustainable business strategies — with a roadmap to align with global compliance standards.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={cn(
                "p-4 rounded-xl text-center",
                theme === "dark" ? "bg-gray-800/50" : "bg-white shadow"
              )}>
                <ShieldCheck className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h4 className={cn(
                  "font-semibold mb-1",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  Ethical Data Practices
                </h4>
              </div>
              <div className={cn(
                "p-4 rounded-xl text-center",
                theme === "dark" ? "bg-gray-800/50" : "bg-white shadow"
              )}>
                <Zap className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h4 className={cn(
                  "font-semibold mb-1",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  Energy Efficiency
                </h4>
              </div>
              <div className={cn(
                "p-4 rounded-xl text-center",
                theme === "dark" ? "bg-gray-800/50" : "bg-white shadow"
              )}>
                <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h4 className={cn(
                  "font-semibold mb-1",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  Global Compliance
                </h4>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
*/}
      {/* 17. Future Roadmap */}
      <section className="py-16 md:py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={cn(
              "text-3xl md:text-4xl font-bold mb-4",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              Future Roadmap
            </h2>
            <p className={cn(
              "text-lg max-w-3xl mx-auto",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              Our vision for the future of business intelligence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "rounded-2xl p-6 border",
                  theme === "dark"
                    ? "bg-gray-900/40 border-gray-800"
                    : "bg-white border-gray-200 shadow-lg"
                )}
              >
                <div className="flex items-start">
                  <div className="text-2xl font-bold text-blue-500 mr-4">{index + 1}</div>
                  <p className={cn(
                    "text-lg",
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  )}>
                    {item}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* 21. FAQs / How We Work */}
      <section className="py-16 md:py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={cn(
              "text-3xl md:text-4xl font-bold mb-4",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              Frequently Asked Questions
            </h2>
            <p className={cn(
              "text-lg",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              Common questions about how we work
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "rounded-2xl p-6 border",
                  theme === "dark"
                    ? "bg-gray-900/40 border-gray-800"
                    : "bg-white border-gray-200 shadow-lg"
                )}
              >
                <h3 className={cn(
                  "text-xl font-bold mb-3 flex items-center",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  <span className="text-blue-500 mr-3">Q:</span>
                  {faq.question}
                </h3>
                <p className={cn(
                  "pl-8",
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                )}>
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Final CTA */}
      <CallToAction pageType="about" />
    </>
  );
}

export default About;
