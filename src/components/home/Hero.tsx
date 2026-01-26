import { useState, useEffect, useRef, useCallback, memo, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Building, Factory, Store, Heart, Users, Zap, Shield, Cloud, Cpu, DollarSign, Search, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

// Memoized icon components to prevent re-renders
const MemoizedIcons = {
  Rocket: memo(Rocket),
  Building: memo(Building),
  Factory: memo(Factory),
  Store: memo(Store),
  Heart: memo(Heart),
  Users: memo(Users),
  Zap: memo(Zap),
  Shield: memo(Shield),
  Cloud: memo(Cloud),
  Cpu: memo(Cpu),
  DollarSign: memo(DollarSign),
  Search: memo(Search),
  BarChart3: memo(BarChart3),
  ArrowRight: memo(ArrowRight),
};

// Static data outside component to prevent recreation
const FEATURES = [
  { icon: "Rocket", text: "Growth Expansion" },
  { icon: "Cpu", text: "Process Automation" },
  { icon: "Shield", text: "Enterprise Security" },
  { icon: "Cloud", text: "Data Storage" },
  { icon: "Heart", text: "Customer Satisfaction" },
  { icon: "Search", text: "Market Research" },
  { icon: "BarChart3", text: "Product Analytics" },
  { icon: "DollarSign", text: "Cost Optimization" },
];

const INDUSTRIES = [
  { icon: "Building", text: "All Industries" },
  { icon: "Factory", text: "All Sectors" },
  { icon: "Store", text: "All Business Types" },
];

const BAR_HEIGHTS = [45, 65, 55, 80, 60, 75, 50];
const FLOATING_CARDS = [
  { top: "-bottom-6", right: "-right-10", icon: "Rocket", value: "3.5x", label: "Growth", color: "text-green-500", delay: 1 },
  { top: "-top-4", left: "-left-4", icon: "Users", value: "94%", label: "Satisfied", color: "text-blue-500", delay: 1.2 },
  { top: "top-10", right: "-right-4", icon: "Zap", value: "82%", label: "Efficient", color: "text-purple-500", delay: 1.4 },
];


// Animation variants - defined outside component
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const floatingAnimation = {
  y: [0, -20, 0],
  rotateX: [-2, 2, -2],
  rotateY: [-3, 3, -3]
};

const floatingTransition = {
  duration: 6,
  repeat: Infinity,
  ease: "easeInOut"
};

// Memoized sub-components
const FeatureGridItem = memo(({ icon, text }: { icon: string; text: string }) => {
  const IconComponent = MemoizedIcons[icon as keyof typeof MemoizedIcons];
  return (
    <div className="flex items-center space-x-2 p-3 rounded-lg bg-primary/5">
      <IconComponent className="h-4 w-4 text-primary" />
      <span className="text-sm">{text}</span>
    </div>
  );
});

const IndustryItem = memo(({ icon, text }: { icon: string; text: string }) => {
  const IconComponent = MemoizedIcons[icon as keyof typeof MemoizedIcons];
  return (
    <div className="flex items-center space-x-2">
      <IconComponent className="h-4 w-4 text-primary" />
      <span>{text}</span>
    </div>
  );
});

const BarChart = memo(({ heights }: { heights: number[] }) => (
  <div className="w-full h-full flex items-end justify-between">
    {heights.map((height, index) => (
      <motion.div
        key={index}
        className="w-6 bg-primary/80 rounded-t-sm"
        initial={{ height: 0 }}
        animate={{ height: `${height}%` }}
        transition={{
          duration: 1,
          delay: index * 0.1,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 1
        }}
      />
    ))}
  </div>
));

const FloatingCard = memo(({ card }: { card: typeof FLOATING_CARDS[0] }) => {
  const IconComponent = MemoizedIcons[card.icon as keyof typeof MemoizedIcons];
  return (
    <motion.div 
      className={`animate-float absolute ${card.top} ${card.left || ''} ${card.right || ''} bg-white dark:bg-gray-800 shadow-xl rounded-lg p-3 w-24 h-24 flex items-center justify-center z-10 border border-white/20 dark:border-white/5 backdrop-blur-md`}
      initial={{ y: 20, opacity: 0, rotate: 5 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ delay: card.delay, duration: 0.8 }}
    >
      <div className="text-center">
        <IconComponent className={`h-4 w-4 ${card.color} mx-auto mb-1`} />
        <div className={`font-bold text-md ${card.color}`}>{card.value}</div>
        <div className="text-[10px] text-gray-500 dark:text-gray-400">{card.label}</div>
      </div>
    </motion.div>
  );
});

const ProgressBar = memo(({ 
  label, 
  value, 
  color, 
  initialWidth, 
  animateWidth, 
  delay 
}: { 
  label: string;
  value: string;
  color: string;
  initialWidth: string;
  animateWidth: string;
  delay: number;
}) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
      <span className={`text-sm font-bold ${color}`}>{value}</span>
    </div>
    <motion.div 
      className={`h-4 ${color.replace('text', 'bg')}/20 rounded-full overflow-hidden`}
      initial={{ width: initialWidth }}
      animate={{ width: animateWidth }}
      transition={{ duration: 2, delay, repeat: Infinity, repeatType: "reverse" }}
    >
      <div className={`h-full ${color.replace('text', 'bg')}/70 rounded-full`}></div>
    </motion.div>
  </div>
));

function Hero(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
 

  // Memoized mobile detection
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    checkMobile();
    window.addEventListener('resize', checkMobile);

   

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [checkMobile]);

 

  const progressBars = useMemo(() => [
    { label: "Revenue Growth", value: "+64%", color: "text-green-500", initial: "30%", animate: "100%", delay: 0.5 },
    { label: "Customer Satisfaction", value: "94%", color: "text-blue-500", initial: "50%", animate: "70%", delay: 0.7 },
    { label: "Market Expansion", value: "+35%", color: "text-purple-500", initial: "70%", animate: "40%", delay: 0.9 },
    { label: "Operational Efficiency", value: "+82%", color: "text-orange-500", initial: "40%", animate: "90%", delay: 1.1 },
  ], []);

  return (
    <div className="relative overflow-hidden">
     
     

      {/* Simplified background effects */}
      <div
        className="absolute top-0 left-0 -z-10 h-full w-full bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50"
        aria-hidden="true"
      />
      
      {/* Reduced blur radius for better performance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[60px] -z-10" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 md:pt-1 md:pb-32">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left content section */}
          <motion.div 
            className="col-span-1 lg:col-span-6 space-y-6" // Reduced spacing
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="flex items-center">
              <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary inline-flex items-center">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary mr-2 animate-pulse"></span>
                Your Complete Business Growth Partner
              </div>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants} 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance"
            >
              Transform your business into a <span className="text-gradient-primary">growth powerhouse</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants} 
              className="text-lg md:text-xl text-muted-foreground max-w-xl"
            >
              From startups to enterprises across every sector - we provide end-to-end solutions that drive expansion, automation, security, and customer excellence.
            </motion.p>
            
            <motion.div variants={itemVariants} className="pt-4">
              <div className="grid grid-cols-2 gap-3 text-sm"> 
                {FEATURES.map((feature, index) => (
                  <FeatureGridItem key={index} icon={feature.icon} text={feature.text} />
                ))}
              </div>
            </motion.div>

          

          </motion.div>
          
          {/* Right visualization section - Optimized animations */}
          <motion.div 
            className="col-span-1 lg:col-span-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }} // Reduced delay
          >
            <motion.div 
              className="relative"
              animate={floatingAnimation}
              transition={floatingTransition}
            >
              {/* Reduced gradient orbs */}
              <div className="absolute top-10 right-0 w-48 h-48 rounded-full bg-primary/20 filter blur-2xl opacity-20" />
              <div className="absolute bottom-10 left-0 w-32 h-32 rounded-full bg-blue-500/15 filter blur-xl opacity-15" />
              
              <div className="w-full aspect-[4/3] flex items-center justify-center relative">
                {/* Main Dashboard */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/20 p-6 shadow-xl backdrop-blur-sm border border-white/10" // Reduced padding and effects
                  initial={{ rotateY: 15, rotateX: -10 }} // Reduced initial rotation
                  animate={{ rotateY: 0, rotateX: 0 }}
                  transition={{ duration: 1, type: "spring", damping: 20 }} // Faster animation
                >
                  <div className="relative w-full h-full">
                    <div className="glass h-full w-full rounded-xl p-4 flex items-center justify-center bg-white/80 dark:bg-black/50 backdrop-blur-md">
                      <div className="w-full h-full rounded-lg overflow-hidden flex flex-col">
                        {/* Window Controls */}
                        <div className="h-6 bg-gray-100 dark:bg-gray-800 flex items-center px-3 justify-between"> {/* Reduced height */}
                          <div className="flex space-x-1"> {/* Reduced spacing */}
                            <div className="h-2 w-2 rounded-full bg-red-400"></div>
                            <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                            <div className="h-2 w-2 rounded-full bg-green-400"></div>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Business Dashboard</div>
                        </div>

                        {/* Dashboard Content */}
                        <div className="flex-1 p-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                          <div className="space-y-4"> {/* Reduced spacing */}
                            {progressBars.map((bar, index) => (
                              <ProgressBar key={index} {...bar} />
                            ))}

                            {/* Simplified Chart */}
                            <motion.div 
                              className="mt-4 h-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg overflow-hidden p-2"
                              initial={{ y: 10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 1.2, duration: 0.4 }} // Faster animation
                            >
                              <BarChart heights={BAR_HEIGHTS} />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating Cards */}
                {FLOATING_CARDS.map((card, index) => (
                  <FloatingCard key={index} card={card} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default memo(Hero);