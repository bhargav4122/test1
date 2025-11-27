import React, { memo, useMemo, useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Zap, Shield, Brain, ArrowRight, Target, Users, TrendingUp, Rocket, Cpu, Cloud, Heart, Search, BarChart3, DollarSign, Building, Factory, Store, Database, Lock, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";

// Memoized icon components with all required icons
const MemoizedIcons = {
  Zap: memo(Zap),
  Shield: memo(Shield),
  Brain: memo(Brain),
  ArrowRight: memo(ArrowRight),
  Target: memo(Target),
  Users: memo(Users),
  TrendingUp: memo(TrendingUp),
  Rocket: memo(Rocket),
  Cpu: memo(Cpu),
  Cloud: memo(Cloud),
  Heart: memo(Heart),
  Search: memo(Search),
  BarChart3: memo(BarChart3),
  DollarSign: memo(DollarSign),
  Building: memo(Building),
  Factory: memo(Factory),
  Store: memo(Store),
  Database: memo(Database),
  Lock: memo(Lock),
  PieChart: memo(PieChart),
} as const;

// Static data outside component to prevent recreation
const FEATURES_DATA = [
  {
    icon: "Brain",
    title: "AI-Powered Insights",
    description: "Leverage cutting-edge AI to uncover patterns, predict trends, and make data-driven decisions.",
    color: "text-blue-400",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    icon: "Shield",
    title: "Enterprise Security",
    description: "Bank-level security with end-to-end encryption and real-time threat monitoring.",
    color: "text-green-400",
    gradient: "from-emerald-500 to-green-600"
  },
  {
    icon: "Zap",
    title: "Rapid Implementation",
    description: "Go from concept to production in weeks with measurable ROI from day one.",
    color: "text-yellow-400",
    gradient: "from-orange-500 to-red-600"
  }
] as const;

const BUSINESS_METRICS = [
  { label: "Data Processing", value: 85, color: "from-cyan-500 to-blue-600" },
  { label: "System Uptime", value: 99, color: "from-green-500 to-emerald-600" },
  { label: "Cost Reduction", value: 65, color: "from-purple-500 to-indigo-600" },
  { label: "Automation", value: 78, color: "from-orange-500 to-red-600" },
  { label: "Data Accuracy", value: 92, color: "from-blue-500 to-cyan-600" },
  { label: "Efficiency", value: 88, color: "from-indigo-500 to-purple-600" },
] as const;

const FLOATING_CARDS = [
  { top: "top-8", right: "right-6", icon: "Rocket", value: "2.8x", label: "Faster", color: "text-green-500", delay: 1 },
  { top: "top-2", left: "left-6", icon: "DollarSign", value: "45%", label: "Savings", color: "text-blue-500", delay: 1.2 },
  { top: "bottom-8", right: "right-6", icon: "TrendingUp", value: "99.9%", label: "Uptime", color: "text-purple-500", delay: 1.4 },
] as const;

const SUCCESS_STATS = [
   { icon: "Database", value: "5TB+", label: "Data Managed", description: "For our clients" },
  { icon: "Cpu", value: "99%", label: "Uptime", description: "Reliable service" },
  { icon: "Cpu", value: "24/7", label: "Monitoring", description: "Real-time optimization" },
] as const;

// Animation variants outside component
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4 }
  }
};

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Memoized sub-components with proper typing
interface FeatureCardProps {
  feature: typeof FEATURES_DATA[0];
  index: number;
}

const FeatureCard = memo(({ feature, index }: FeatureCardProps) => {
  const IconComponent = MemoizedIcons[feature.icon];
  return (
    <motion.div
      variants={itemVariants}
      className="group p-4 rounded-xl bg-white/70 dark:bg-black/70 backdrop-blur-sm  border-white/20 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="flex items-start space-x-4">
       
         <IconComponent className="h-5 w-5" />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">
            {feature.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
});
FeatureCard.displayName = 'FeatureCard';

interface StatCardProps {
  stat: typeof SUCCESS_STATS[0];
}

const StatCard = memo(({ stat }: StatCardProps) => {
  const IconComponent = MemoizedIcons[stat.icon];
  return (
    <motion.div 
      className="text-center p-3 rounded-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <IconComponent className="h-6 w-6 text-primary mx-auto mb-2" />
      <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{stat.label}</div>
      <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">{stat.description}</div>
    </motion.div>
  );
});
StatCard.displayName = 'StatCard';

interface FloatingCardProps {
  card: typeof FLOATING_CARDS[0];
}

const FloatingCard = memo(({ card }: FloatingCardProps) => {
  const IconComponent = MemoizedIcons[card.icon];
  return (
    <motion.div 
      className={`absolute ${card.top} ${card.left || ''} ${card.right || ''} bg-white/90 dark:bg-gray-800/90 shadow-xl rounded-lg p-3 w-20 h-20 flex items-center justify-center z-10 border border-white/20 backdrop-blur-md`}
      initial={{ y: 20, opacity: 0, rotate: 5 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ delay: card.delay, duration: 0.8 }}
      whileHover={{ scale: 1.05, y: -3 }}
    >
      <div className="text-center">
        <IconComponent className={`h-4 w-4 ${card.color} mx-auto mb-1`} />
        <div className={`font-bold text-sm ${card.color}`}>{card.value}</div>
        <div className="text-[10px] text-gray-600 dark:text-gray-400 font-medium">{card.label}</div>
      </div>
    </motion.div>
  );
});
FloatingCard.displayName = 'FloatingCard';

interface MetricBarProps {
  metric: typeof BUSINESS_METRICS[0];
  index: number;
}

const MetricBar = memo(({ metric, index }: MetricBarProps) => (
  <div className="flex items-center justify-between py-1">
    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 w-20 truncate">
      {metric.label}
    </span>
    <div className="flex-1 max-w-24 mx-2">
      <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${metric.color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${metric.value}%` }}
          transition={{ duration: 1.2, delay: index * 0.1 + 0.3 }}
        />
      </div>
    </div>
    <span className="text-xs font-bold text-gray-900 dark:text-white w-6 text-right">
      {metric.value}%
    </span>
  </div>
));
MetricBar.displayName = 'MetricBar';

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

function Why() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: '50px 0px'
  });

  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useMobileDetection();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden pt-5">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover opacity-10"
          style={{
            filter: 'brightness(1.1) contrast(1.1) saturate(1.2)',
            transform: 'translateZ(0)'
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/videos/Google Gemini.mp4" type="video/mp4" />
        </video>

        {/* Background gradients */}
        <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent opacity-70" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[60px] -z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary inline-flex items-center">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary mr-1.5 animate-pulse"></span>
              Trusted by Industry Leaders
            </div>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            Why Companies <span className="text-gradient-primary">Choose Us</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Enterprise-grade data solutions with AI-driven insights that transform how you do business.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Animated Dashboard */}
          <motion.div 
            className="relative"
            animate={floatingAnimation}
          >
            <motion.div 
              className="relative"
              initial={{ rotateY: 10, rotateX: -5 }}
              animate={{ rotateY: 0, rotateX: 0 }}
              transition={{ duration: 1.2, type: "spring", damping: 20 }}
            >
              <div className="w-full aspect-[4/3] flex items-center justify-center relative">
                {/* Main Dashboard Card */}
                <motion.div 
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 p-4 shadow-xl backdrop-blur-sm border border-white/10"
                >
                  <div className="relative w-full h-full">
                    <div className="h-full w-full rounded-lg p-4 flex items-center justify-center bg-white/80 dark:bg-black/50 backdrop-blur-md">
                      <div className="w-full h-full rounded-lg overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700">
                        {/* Dashboard Header */}
                        <div className="h-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center px-3 justify-between border-b border-gray-200 dark:border-gray-700">
                          <div className="flex items-center space-x-1.5">
                            <div className="h-2 w-2 rounded-full bg-red-400"></div>
                            <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                            <div className="h-2 w-2 rounded-full bg-green-400"></div>
                          </div>
                          <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">Performance Dashboard</div>
                          <div className="text-[10px] text-gray-500 dark:text-gray-400">Live</div>
                        </div>

                        {/* Dashboard Content */}
                        <div className="flex-1 p-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                          {/* Key Metrics Overview */}
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="text-center p-3 rounded-lg bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
                              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400 mx-auto mb-1" />
                              <div className="text-lg font-bold text-green-700 dark:text-green-300">+42%</div>
                              <div className="text-[10px] text-green-600 dark:text-green-400 font-medium">Growth</div>
                            </div>
                            <div className="text-center p-3 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800">
                              <Target className="h-4 w-4 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
                              <div className="text-lg font-bold text-blue-700 dark:text-blue-300">94%</div>
                              <div className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">Accuracy</div>
                            </div>
                          </div>
                          
                          {/* Performance Metrics */}
                          <div className="space-y-2">
                            <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Performance Metrics</h4>
                            {BUSINESS_METRICS.map((metric, index) => (
                              <MetricBar key={index} metric={metric} index={index} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating Elements */}
                <FloatingCard card={FLOATING_CARDS[0]} />
                <FloatingCard card={FLOATING_CARDS[1]} />
                <FloatingCard card={FLOATING_CARDS[2]} />
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content Section */}
          <motion.div 
            ref={ref}
            className="space-y-6"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Features Grid */}
            <div className="space-y-1">
              {FEATURES_DATA.map((feature, index) => (
                <FeatureCard key={feature.title} feature={feature} index={index} />
              ))}
            </div>

            {/* Success Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-3"
              variants={containerVariants}
            >
              {SUCCESS_STATS.map((stat, index) => (
                <StatCard key={index} stat={stat} />
              ))}
            </motion.div>

            
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(Why);
