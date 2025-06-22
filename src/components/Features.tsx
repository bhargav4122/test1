
import React, { useState, useEffect } from "react";
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

  return (
    <section id="features" className="section-padding bg-muted/50">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            Our Solutions
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Comprehensive data solutions for modern businesses
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform provides everything you need to transform raw data into strategic business advantages.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`premium-card transform transition-all duration-700 ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <div className="text-primary">{feature.icon}</div>
              </div>
              <h3 className="text-l font-semibold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}