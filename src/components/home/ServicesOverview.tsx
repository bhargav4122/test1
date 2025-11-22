import React from "react";
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
  ArrowRight,
  Bot
} from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: "core-data-cloud",
    icon: <Cloud className="h-6 w-6" />,
    title: "Data & Cloud Services",
    description: "End-to-end data management, migration, cleansing, ETL pipelines, and scalable cloud infrastructure for secure and efficient operations."
  },
  {
    id: "business-intelligence",
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Business Intelligence (BI)",
    description: "Power BI dashboards, KPI tools, data modeling, and real-time analytics that empower better business decisions through actionable insights."
  },
  {
    id: "digital-transformation",
    icon: <MonitorSmartphone className="h-6 w-6" />,
    title: "Digital Transformation",
    description: "From modern websites to integrated CRM/ERP systems, we help digitize your business journey for improved efficiency and growth."
  },
  {
    id: "business-consulting",
    icon: <Briefcase className="h-6 w-6" />,
    title: "Business Consulting",
    description: "Strategic planning, financial modeling, operational efficiency, and digital alignment to drive business scaling and innovation."
  },
  {
    id: "market-research",
    icon: <LineChart className="h-6 w-6" />,
    title: "Market Research & Analytics",
    description: "In-depth competitor studies, consumer behavior insights, and trend forecasting to help position your brand ahead of the curve."
  },
  {
    id: "consumer-voice",
    icon: <Mic2 className="h-6 w-6" />,
    title: "Consumer Voice Analytics",
    description: "AI-driven sentiment analysis, feedback mining, and brand perception tools to understand your customers across every channel."
  },
   {
    id: "ai-automation",
    icon: <Bot   className="h-6 w-6" />,
    title: "AI & Automation",
    description: "Advanced AI automation services to streamline business processes"
  },
  {
    id: "aI-&-machine-Learning",
    icon: <BrainCog className="h-6 w-6" />,
    title: "AI & Machine Learning",
    description: "Our Artificial Intelligence and Machine Learning services help organizations harness the power of advanced algorithms and data-driven insights."
  },
  {
    id: "cybersecurity",
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Cybersecurity & Compliance",
    description: "Protect your business with enterprise-grade security—from threat detection and IAM to GDPR and ISO compliance solutions."
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

export default function ServicesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const navigate = useNavigate();

  const handleServiceClick = (serviceId: string) => {
    navigate(`/service-detail/${serviceId}`);
  };

  return (
    <section
      id="services"
      className="p-10"
    >
      {/* Glass overlay for the section */}
      <div className="fixed inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-sm -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary mb-4">
            Our Services
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 text-gray-900 dark:text-white">
            We Turn Your Data Into Growth
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover how our full-stack services—from AI to cybersecurity—help you scale faster, work smarter, and stay secure in a data-driven world.
          </p>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="group bg-white/80 dark:bg-black/80 border border-gray-200 dark:border-gray-800 hover:border-primary/50 rounded-2xl p-6 shadow-sm hover:shadow-md backdrop-blur-sm transition-all cursor-pointer"
              onClick={() => handleServiceClick(service.id)}
            >
              <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
              <div className="mt-4">
                <Button variant="ghost" className="p-0 h-auto flex items-center text-primary hover:text-primary hover:bg-transparent">
                  Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <Button 
            onClick={() => navigate('/services')}
            className="rounded-full px-8 py-6 text-base bg-gradient-to-r from-primary/80 to-primary hover:from-primary hover:to-primary/80 shadow-lg shadow-primary/20 transition-all duration-300 text-white"
          >
            View all services <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
