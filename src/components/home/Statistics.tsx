import React, { useState, useEffect, useCallback, memo, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Users, Layers, Award, TrendingUp } from "lucide-react";

// Memoized icon components
const MemoizedIcons = {
  Users: memo(Users),
  Layers: memo(Layers),
  Award: memo(Award),
  TrendingUp: memo(TrendingUp),
};

// Static statistics data
const STATISTICS_DATA = [
  {
    icon: "Users",
    value: 10,
    label: "Active Clients",
    suffix: "+",
    duration: 1500 // Reduced duration
  },
  {
    icon: "Layers",
    value: 5,
    label: "Terabytes Processed",
    suffix: "TB",
    duration: 1800
  },
  {
    icon: "Award",
    value: 99.9,
    label: "Uptime SLA",
    suffix: "%",
    duration: 2000
  },
  {
    icon: "TrendingUp",
    value: 35,
    label: "Performance Increase",
    suffix: "%",
    duration: 1900
  }
] as const;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // Reduced stagger
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 }, // Reduced y movement
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4 // Faster animation
    }
  }
};

// Optimized counter hook
const useCounter = (target: number, duration: number, shouldAnimate: boolean, delay: number) => {
  const [count, setCount] = useState(0);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    if (!shouldAnimate) {
      setCount(0);
      return;
    }

    const startAnimation = () => {
      const startTime = performance.now();
      startTimeRef.current = startTime;

      const animate = (currentTime: number) => {
        if (!startTimeRef.current) return;

        const elapsed = currentTime - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smoother animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(easeOutQuart * target);

        setCount(currentValue);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    const timer = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target, duration, shouldAnimate, delay]);

  return count;
};

// Memoized StatCard component
const StatCard = memo(({ 
  icon, 
  value, 
  label, 
  suffix, 
  duration, 
  isVisible, 
  delay 
}: {
  icon: string;
  value: number;
  label: string;
  suffix: string;
  duration: number;
  isVisible: boolean;
  delay: number;
}) => {
  const count = useCounter(value, duration, isVisible, delay);
  const IconComponent = MemoizedIcons[icon as keyof typeof MemoizedIcons];

  return (
    <motion.div 
      className="p-4 text-center bg-white/30 dark:bg-black/30 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md backdrop-blur-sm transition-all"
      variants={itemVariants}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto">
        <IconComponent className="h-4 w-4" />
      </div>
      <div className="flex items-center justify-center text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
        <span>{count}</span>
        <span className="text-primary ml-1">{suffix}</span>
      </div>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{label}</p>
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';

function Statistics() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05, // Lower threshold for earlier trigger
    rootMargin: '50px 0px', // Trigger 50px before element enters viewport
  });

  return (
    <section 
      className="py-8" // Reduced padding
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-4" // Reduced gap
        >
          {STATISTICS_DATA.map((stat, index) => (
            <StatCard 
              key={`${stat.label}-${index}`}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              duration={stat.duration}
              isVisible={inView}
              delay={index * 50} // Reduced delay between items
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Statistics);
