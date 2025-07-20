"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  Database,
  LineChart,
  Cpu,
  Shield,
  ArrowRight,
  CheckCircle,
  Clock,
  Zap,
  ArrowDown
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HowItWorks() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const steps = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Data Collection",
      description:
        "Connect and collect data from all your business sources with enterprise-grade security.",
      features: ["Multi-source integration", "Real-time sync", "Secure protocols"],
      gradient: "from-blue-500 to-indigo-600",
      duration: "1-2 weeks"
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "AI Processing",
      description:
        "Advanced algorithms process data to uncover actionable insights and patterns.",
      features: ["Machine learning", "Pattern recognition", "Automated analysis"],
      gradient: "from-violet-500 to-purple-600",
      duration: "2-3 weeks"
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Visualization",
      description: "Transform complex data into intuitive, interactive dashboards.",
      features: ["Interactive charts", "Custom views", "Real-time updates"],
      gradient: "from-emerald-500 to-green-600",
      duration: "1-2 weeks"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Deployment",
      description: "Enterprise-ready deployment with continuous monitoring and security.",
      features: ["Enterprise security", "Compliance ready", "24/7 monitoring"],
      gradient: "from-orange-500 to-red-600",
      duration: "1 week"
    }
  ];

  return (
    <section
      id="how-it-works"
      className="section relative overflow-hidden flex flex-col overflow-x-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px] md:blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-violet-500/5 blur-[60px] md:blur-[80px]" />
      </div>

      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <div className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            Our Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            How we <span className="text-primary">transform</span> your business
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A streamlined process that converts your data into actionable intelligence in 5-8 weeks.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Tilt
              key={index}
              tiltMaxAngleX={6}
              tiltMaxAngleY={6}
              glareEnable={true}
              glareMaxOpacity={0.08}
              glareColor="#ffffff"
              glarePosition="all"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: index * 0.2,
                  duration: 0.6,
                  ease: [0.215, 0.61, 0.355, 1]
                }}
                className="relative group p-6 rounded-2xl backdrop-blur-lg border border-white/10 bg-white/10 dark:bg-white/5 shadow-lg hover:shadow-2xl transition-all"
              >
                {/* Step badge */}
                <div className="relative w-14 h-14 mb-6 rounded-xl bg-gradient-to-br p-4 shadow-lg flex items-center justify-center text-white text-xl font-bold"
                  style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
                >
                  <div className={`bg-gradient-to-br ${step.gradient} absolute inset-0 rounded-xl`} />
                  <div className="relative z-10">{step.icon}</div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-background border-2 border-primary rounded-full flex items-center justify-center text-xs font-bold text-primary shadow-md">
                    {index + 1}
                  </div>
                </div>

                {/* Step content */}
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary mb-3">
                    <Clock className="h-3 w-3" />
                    {step.duration}
                  </div>

                  <h3 className="text-lg md:text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="space-y-2">
                    {step.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs md:text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>

       

        
      </div>
    </section>
  );
}
