import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Users, Layers, Award, TrendingUp } from "lucide-react";

export default function Statistics() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const statistics = [
    {
      icon: <Users className="h-5 w-5" />,
      value: 5000,
      label: "Active Users",
      suffix: "+",
      duration: 2000
    },
    {
      icon: <Layers className="h-5 w-5" />,
      value: 50,
      label: "Terabytes Processed",
      suffix: "TB",
      duration: 2500
    },
    {
      icon: <Award className="h-5 w-5" />,
      value: 99.9,
      label: "Uptime SLA",
      suffix: "%",
      duration: 3000
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      value: 40,
      label: "Performance Increase",
      suffix: "%",
      duration: 2800
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section 
      className="py-10 bg-white dark:bg-black"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {statistics.map((stat, index) => (
            <StatCard 
              key={index} 
              icon={stat.icon} 
              value={stat.value} 
              label={stat.label} 
              suffix={stat.suffix} 
              duration={stat.duration} 
              isVisible={inView} 
              delay={index * 100}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  duration: number;
  isVisible: boolean;
  delay: number;
}

const StatCard = ({ icon, value, label, suffix, duration, isVisible, delay }: StatCardProps) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = value;
    
    if (!isVisible) return;
    
    const timer = setTimeout(() => {
      const incrementTime = Math.min(duration / end, 50);
      
      const counter = setInterval(() => {
        start += 1;
        const progress = Math.min(start / end, 1);
        setCount(Math.floor(progress * end));
        
        if (start >= end) clearInterval(counter);
      }, incrementTime);
      
      return () => clearInterval(counter);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [isVisible, value, duration, delay]);

  return (
    <motion.div 
      className="p-6 text-center bg-white/30 dark:bg-black/30 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md backdrop-blur-sm transition-all"
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: delay * 0.001, duration: 0.6 }}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto">
        {icon}
      </div>
      <div className="flex items-center justify-center text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        <span>{count}</span>
        <span className="text-primary ml-1">{suffix}</span>
      </div>
      <p className="mt-2 text-gray-600 dark:text-gray-400">{label}</p>
    </motion.div>
  );
};