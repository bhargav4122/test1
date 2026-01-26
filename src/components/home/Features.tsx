import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Database, LineChart, BrainCircuit, Server, Layers, Shield } from "lucide-react";

export default function Features() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Data Integration",
      description: "Seamlessly connect and unify data from multiple sources for comprehensive insights."
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Predictive Analytics",
      description: "Forecast trends and opportunities with advanced statistical models and machine learning."
    },
    {
      icon: <BrainCircuit className="h-6 w-6" />,
      title: "AI-Powered Insights",
      description: "Leverage artificial intelligence to discover patterns and anomalies in your data."
    },
    {
      icon: <Server className="h-6 w-6" />,
      title: "Scalable Infrastructure",
      description: "Enterprise-grade cloud infrastructure that grows with your business needs."
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Custom Dashboards",
      description: "Create intuitive visualizations that make complex data accessible to everyone."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Data Security",
      description: "Bank-level encryption and compliance measures to protect your sensitive information."
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
      id="features" 
      className="p-10 relative"
    >
      {/* Glass overlay for the section */}
      <div className="fixed inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-sm -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            Our Solutions
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-gray-900 dark:text-white">
            Comprehensive data solutions for modern businesses
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Our platform provides everything you need to transform raw data into strategic business advantages.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/80 dark:bg-black/80 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md backdrop-blur-sm transition-all"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <div className="text-primary">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}