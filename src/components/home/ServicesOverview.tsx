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
import { serviceDetails } from "@/data/serviceDetails";

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
    title: "Cloud & Data Engineering",
    description: "We design, build, and manage your data and cloud infrastructure so your teams can focus on using data, not fixing it. Our services cover data pipelines, migration, optimization, and scalable cloud setups for reliable, secure operations."
  },
  {
    id: "business-intelligence",
    icon: "BarChart3",
    title: "Business Intelligence (BI)",
    description: "Turn raw data into business-driving intelligence. Our BI solutions deliver interactive dashboards, advanced analytics, and data models that empower faster, smarter decision-making."
  },
  {
    id: "digital-transformation",
    icon: "MonitorSmartphone",
    title: "Digital Transformation",
    description: "Accelerate growth with technology that evolves with your business. From modern websites to connected CRM and ERP systems, we help you reimagine your operations through automation, cloud adoption, and data-driven strategies."
  },
  {
    id: "business-consulting",
    icon: "Briefcase",
    title: "Business Consulting",
    description: "Align your strategy, technology, and operations for lasting success. Our experts help you streamline workflows, improve financial performance, and create digital strategies that scale with your business."
  },
  {
    id: "market-research",
    icon: "LineChart",
    title: "Market Research & Analytics",
    description: "Stay ahead with intelligence that drives market advantage. We deliver comprehensive competitor analysis, consumer insights, and trend forecasting to refine positioning and identify new opportunities."
  },
  {
    id: "consumer-voice",
    icon: "Mic2",
    title: "Consumer Voice Analytics",
    description: "Understand what your audience truly thinks. Using advanced AI and NLP, we analyze sentiment, feedback, and brand perception across multiple channels—helping you inspire loyalty and improve engagement."
  }
  /*,
  {
    id: "ai-automation",
    icon: "Bot",
    title: "AI & Automation",
    description: "Advanced AI automation services to streamline business processes"
  },
  {
    id: "aI-&-machine-Learning",
    icon: "BrainCog",
    title: "AI & Machine Learning",
    description: "Our Artificial Intelligence and Machine Learning services help organizations harness the power of advanced algorithms and data-driven insights."
  },
  {
    id: "cybersecurity",
    icon: "ShieldCheck",
    title: "Cybersecurity & Compliance",
    description: "Protect your business with enterprise-grade security—from threat detection and IAM to GDPR and ISO compliance solutions."
  }*/
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

      {/* Technology Logos Strip */}
      {(() => {
        const details = serviceDetails[service.id as keyof typeof serviceDetails];
        const technologies = details?.technologies?.slice(0, 5);

        if (!technologies || technologies.length === 0) return null;

        return (
          <div className="flex items-center gap-3 mt-5 mb-1 px-1">
            {technologies.map((tech, idx) => (
              tech.logo && (
                <div key={idx} className="relative group/tech">
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="w-5 h-5 object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-125"
                  />
                  {/* Tooltip on hover */}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover/tech:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                    {tech.name}
                  </span>
                </div>
              )
            ))}
          </div>
        );
      })()}
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