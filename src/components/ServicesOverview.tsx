import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Cloud,
  BarChart3,
  MonitorSmartphone,
  Code,
  Briefcase,
  LineChart,
  Mic2,
  BrainCog,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";






const services = [
  {
     id: "core-data-cloud",
    icon: <Cloud className="h-6 w-6" />,
    title: "Data & Cloud Services",
    description: "End-to-end data management, migration, cleansing, ETL pipelines, and scalable cloud infrastructure for secure and efficient operations."
  },
  {
     id: "bi-digital-transformation",
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
  /*}  id: 4,
    icon: <Code className="h-6 w-6" />,
    title: "Custom App Development",
    description: "Tailored software solutions—web/mobile apps, ERP tools, APIs—built with scalability and performance at the core."
  },*/
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
    id: "ai",
    icon: <BrainCog className="h-6 w-6" />,
    title: "AI & Automation",
    description: "From predictive analytics to intelligent automation, we deploy AI tools and custom ML models to streamline and optimize operations."
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

  //const handleServiceClick = (id) => {
  //  navigate(`/services/${id}`);
  //};
  const handleServiceClick = (serviceId: string) => {
    navigate(`/service-detail/${serviceId}`);
  };


  return (
    <section
      id="services"
      className="section-padding bg-gradient-to-b from-white to-muted/50 dark:from-slate-950 dark:to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary mb-4">
            Our Services
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
            We Turn Your Data Into Growth
          </h2>
          <p className="text-lg text-muted-foreground">
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
              className="group bg-white/30 dark:bg-slate-900/30 border border-primary/10 hover:border-primary/50 rounded-2xl p-6 shadow-md hover:shadow-xl backdrop-blur-md transition-all cursor-pointer"
              onClick={() => handleServiceClick(service.id)}
            >
              <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
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
            className="rounded-full px-8 py-6 text-base bg-gradient-to-r from-primary/80 to-primary hover:from-primary hover:to-primary/80 shadow-lg shadow-primary/20 transition-all duration-300"
          >
            View all services <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}