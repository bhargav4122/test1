import React, { memo, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Cloud,
  BarChart3,
  MonitorSmartphone,
  Briefcase,
  LineChart,
  Mic2,
  BrainCog,
  ShieldCheck,
  Bot,
  ArrowRight
} from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

// Memoized icon components
const MemoizedIcons = {
  Cloud: memo(Cloud),
  BarChart3: memo(BarChart3),
  MonitorSmartphone: memo(MonitorSmartphone),
  Briefcase: memo(Briefcase),
  LineChart: memo(LineChart),
  Mic2: memo(Mic2),
  BrainCog: memo(BrainCog),
  ShieldCheck: memo(ShieldCheck),
  Bot: memo(Bot),
  ArrowRight: memo(ArrowRight),
};

// Static services data
const SERVICES_DATA = [
  {
    id: "core-data-cloud",
    icon: "Cloud",
    title: "Data & Cloud Services",
    description: "End-to-end data management, migration, cleansing, ETL pipelines, and scalable cloud infrastructure for secure and efficient operations."
  },
  {
    id: "business-intelligence",
    icon: "BarChart3",
    title: "Business Intelligence (BI)",
    description: "Power BI dashboards, KPI tools, data modeling, and real-time analytics that empower better business decisions through actionable insights."
  },
  {
    id: "digital-transformation",
    icon: "MonitorSmartphone",
    title: "Digital Transformation",
    description: "From modern websites to integrated CRM/ERP systems, we help digitize your business journey for improved efficiency and growth."
  },
  {
    id: "business-consulting",
    icon: "Briefcase",
    title: "Business Consulting",
    description: "Strategic planning, financial modeling, operational efficiency, and digital alignment to drive business scaling and innovation."
  },
  {
    id: "market-research",
    icon: "LineChart",
    title: "Market Research & Analytics",
    description: "In-depth competitor studies, consumer behavior insights, and trend forecasting to help position your brand ahead of the curve."
  },
  {
    id: "consumer-voice",
    icon: "Mic2",
    title: "Consumer Voice Analytics",
    description: "AI-driven sentiment analysis, feedback mining, and brand perception tools to understand your customers across every channel."
  },
  {
    id: "ai-automation",
    icon: "Bot",
    title: "AI & Automation",
    description: "Advanced AI automation services to streamline business processes"
  },
  {
    id: "ai-machine-learning",
    icon: "BrainCog",
    title: "AI & Machine Learning",
    description: "Our Artificial Intelligence and Machine Learning services help organizations harness the power of advanced algorithms and data-driven insights."
  },
  {
    id: "cybersecurity",
    icon: "ShieldCheck",
    title: "Cybersecurity & Compliance",
    description: "Protect your business with enterprise-grade security—from threat detection and IAM to GDPR and ISO compliance solutions."
  }
] as const;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08 // Reduced stagger for faster loading
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 }, // Reduced y movement
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, // Faster animation
      ease: "easeOut"
    }
  }
};

// Memoized Service Card component
const ServiceCard = memo(({ 
  service, 
  onClick 
}: { 
  service: typeof SERVICES_DATA[0];
  onClick: (id: string) => void;
}) => {
  const IconComponent = MemoizedIcons[service.icon as keyof typeof MemoizedIcons];
  
  return (
    <motion.div
      variants={itemVariants}
      className="group bg-white/80 dark:bg-black/80 border border-gray-200 dark:border-gray-800 hover:border-primary/50 rounded-xl p-5 shadow-sm hover:shadow-md backdrop-blur-sm transition-all cursor-pointer"
      onClick={() => onClick(service.id)}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
    >
      <div className="w-12 h-12 mb-3 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
        <IconComponent className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2">
        {service.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
        {service.description}
      </p>
      <div className="mt-3">
        <Button 
          variant="ghost" 
          className="p-0 h-auto flex items-center text-primary hover:text-primary/80 hover:bg-transparent text-sm"
          asChild
        >
          <span>
            Learn more <MemoizedIcons.ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
          </span>
        </Button>
      </div>
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';

function ServicesSection() {
  const { ref, inView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.05, // Lower threshold for earlier trigger
    rootMargin: '50px 0px' // Trigger earlier
  });
  
  const navigate = useNavigate();

  // Memoized click handler
  const handleServiceClick = useCallback((serviceId: string) => {
    navigate(`/service-detail/${serviceId}`);
  }, [navigate]);

  const handleViewAllClick = useCallback(() => {
    navigate('/services');
  }, [navigate]);

  // Memoized services grid
  const servicesGrid = useMemo(() => (
    <motion.div 
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" // Reduced gap
    >
      {SERVICES_DATA.map((service) => (
        <ServiceCard 
          key={service.id}
          service={service}
          onClick={handleServiceClick}
        />
      ))}
    </motion.div>
  ), [inView, handleServiceClick]);

  return (
    <section
      id="services"
      className="py-12" // Reduced padding
    >
      {/* Removed fixed glass overlay - causes performance issues */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12"> {/* Reduced margin */}
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-3">
            Our Services
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-gray-900 dark:text-white">
            We Turn Your Data Into Growth
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Discover how our full-stack services—from AI to cybersecurity—help you scale faster, work smarter, and stay secure in a data-driven world.
          </p>
        </div>

        {servicesGrid}
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.4 }} // Reduced delay and duration
          className="mt-12 text-center" // Reduced margin
        >
          <Button 
            onClick={handleViewAllClick}
            className="rounded-full px-6 py-4 text-sm bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-md shadow-primary/20 transition-all duration-200 text-white"
          >
            View all services <MemoizedIcons.ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(ServicesSection);
