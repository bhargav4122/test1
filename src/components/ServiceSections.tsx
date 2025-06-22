import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, ServerCog, FileText, GraduationCap, Users, Mic, Search, Briefcase, Code, MonitorSmartphone, Database, BrainCircuit, Cloud, BarChart4, Shield, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ServiceSections = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

 
    const services = [
  {
    id: "core-data-cloud",
    icon: <Database className="h-8 w-8" />,
    title: "Data & Cloud Services",
    description: "Reliable data storage, cloud infrastructure, integration, and backup for your growing business.",
  
  },

  {
    id: "bi-digital-transformation",
    icon: <MonitorSmartphone className="h-8 w-8" />,
    title: "Digital Transformation Services",
    description: "Modernize your web presence, automate processes, and integrate CRM/ERP systems.",
    gradient: "from-purple-500 to-fuchsia-600",
    shadowColor: "shadow-purple-500/20"
  },
  {
    id: "custom-software-development",
    icon: <Code className="h-8 w-8" />,
    title: "Custom Software & App Development",
    description: "Develop scalable web/mobile apps, SaaS platforms, and cloud-native products tailored to your needs.",
    gradient: "from-amber-500 to-yellow-600",
    shadowColor: "shadow-amber-500/20"
  },
  {
    id: "business-consulting",
    icon: <Briefcase className="h-8 w-8" />,
    title: "Business Consulting Services",
    description: "Strategic planning, revenue modeling, and performance optimization for sustainable growth.",
    gradient: "from-rose-500 to-pink-600",
    shadowColor: "shadow-rose-500/20"
  },
  {
    id: "market-research",
    icon: <Search className="h-8 w-8" />,
    title: "Market Research & Trend Analysis",
    description: "Understand competitors, customer behavior, and market trends through advanced research methods.",
    gradient: "from-teal-500 to-cyan-600",
    shadowColor: "shadow-teal-500/20"
  },
  {
    id: "consumer-voice",
    icon: <Mic className="h-8 w-8" />,
    title: "Consumer Voice & Sentiment Analytics",
    description: "Capture feedback, run sentiment analysis, and improve customer experience across channels.",
    gradient: "from-red-500 to-orange-600",
    shadowColor: "shadow-red-500/20"
  },
  {
    id: "employee-solutions",
    icon: <Users className="h-8 w-8" />,
    title: "Workforce Intelligence & Employee Experience",
    description: "Optimize resource planning, retention strategies, and performance monitoring.",
    gradient: "from-lime-500 to-green-600",
    shadowColor: "shadow-lime-500/20"
  },
  
  {
    id: "devops",
    icon: <ServerCog className="h-8 w-8" />,
    title: "DevOps & Cloud Automation",
    description: "Automate infrastructure, CI/CD pipelines, and cloud provisioning with modern DevOps tools.",
    gradient: "from-sky-500 to-blue-600",
    shadowColor: "shadow-sky-500/20"
  },
  {
    id: "ai",
    icon: <BrainCircuit className="h-8 w-8" />,
    title: "AI, ML & Intelligent Automation",
    description: "Deploy AI solutions like predictive models, chatbots, and intelligent document processing.",
    gradient: "from-violet-500 to-purple-600",
    shadowColor: "shadow-violet-500/20"
  },
  {
    id: "cybersecurity",
    icon: <Shield className="h-8 w-8" />,
    title: "Cybersecurity & Compliance Services",
    description: "Protect your business with cloud security, IAM, threat monitoring, and GDPR compliance.",
    gradient: "from-stone-500 to-neutral-600",
    shadowColor: "shadow-stone-500/20"
  },
  {
    id: "bookkeeping",
    icon: <FileText className="h-8 w-8" />,
    title: "Bookkeeping & Taxation Services",
    description: "Manage finances, reporting, payroll, and taxes with UK HMRC-compliant solutions.",
    gradient: "from-zinc-500 to-slate-600",
    shadowColor: "shadow-zinc-500/20"
  }
];

  

  const handleServiceClick = (serviceId: string) => {
    navigate(`/service-detail/${serviceId}`);
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            Our Services
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Comprehensive <span className="text-primary">Business Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From data analytics to cloud solutions, we provide the technology services your business needs to thrive in the digital age.
          </p>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="group relative cursor-pointer"
              onClick={() => handleServiceClick(service.id)}
            >
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10`}></div>
              <div className="relative overflow-hidden rounded-3xl bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/20 dark:border-white/10 p-8 h-full transition-all duration-300 group-hover:translate-y-[-5px] group-hover:shadow-xl">
                <div className={`rounded-2xl p-5 bg-gradient-to-br ${service.gradient} ${service.shadowColor} mb-6 inline-block text-white`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <div className="mt-auto">
                  <Button variant="ghost" className="p-0 h-auto flex items-center text-primary hover:text-primary hover:bg-transparent">
                    Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
                    <div className="mt-4">
                      <Button variant="ghost" className="p-0 h-auto flex items-center text-white hover:text-white hover:bg-transparent">
                        Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
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
};

export default ServiceSections;