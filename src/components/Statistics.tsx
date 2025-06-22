
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Users, Layers, Award, TrendingUp } from "lucide-react";

export default function Statistics() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const statistics = [
    {
      icon: <Users className="h-6 w-6" />,
      value: 5000,
      label: "Active Users",
      suffix: "+",
      duration: 2000
    },
    {
      icon: <Layers className="h-6 w-6" />,
      value: 50,
      label: "Terabytes Processed",
      suffix: "TB",
      duration: 2500
    },
    {
      icon: <Award className="h-6 w-6" />,
      value: 99.9,
      label: "Uptime SLA",
      suffix: "%",
      duration: 3000
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      value: 40,
      label: "Performance Increase",
      suffix: "%",
      duration: 2800
    }
  ];

  return (
    <section className="section-padding bg-muted/50">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
        </div>
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
    <div 
      className={`p-6 text-center bg-background rounded-xl shadow-sm border border-border/50 transform transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
        <div className="text-primary">{icon}</div>
      </div>
      <div className="flex items-center justify-center text-3xl md:text-4xl font-bold">
        <span>{count}</span>
        <span className="text-primary ml-1">{suffix}</span>
      </div>
      <p className="mt-2 text-muted-foreground">{label}</p>
    </div>
  );
};