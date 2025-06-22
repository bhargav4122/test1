import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard3D from './ServiceCard3D';
import { Database, Cloud, Brain, Shield, LineChart, Users } from 'lucide-react';

const services = [
  {
    title: 'Data Analytics',
    description: 'Transform raw data into actionable insights with advanced analytics and visualization tools.',
    icon: Database,
    stats: [
      { value: '99.9%', label: 'Accuracy' },
      { value: '50TB+', label: 'Processed' }
    ],
    technologies: ['BigQuery', 'Tableau', 'Python'],
    gradientColors: ['from-blue-500', 'via-cyan-500', 'to-blue-700']
  },
  {
    title: 'Cloud Solutions',
    description: 'Scalable and secure cloud infrastructure designed for modern enterprises.',
    icon: Cloud,
    stats: [
      { value: '99.99%', label: 'Uptime' },
      { value: '40%', label: 'Cost Saved' }
    ],
    technologies: ['AWS', 'Azure', 'GCP'],
    gradientColors: ['from-indigo-500', 'via-purple-500', 'to-indigo-700']
  },
  {
    title: 'AI & Machine Learning',
    description: 'Cutting-edge AI solutions to automate and optimize business processes.',
    icon: Brain,
    stats: [
      { value: '85%', label: 'Accuracy' },
      { value: '3x', label: 'Faster' }
    ],
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI'],
    gradientColors: ['from-green-500', 'via-emerald-500', 'to-green-700']
  },
  {
    title: 'Cybersecurity',
    description: 'Comprehensive security solutions to protect your digital assets.',
    icon: Shield,
    stats: [
      { value: '100%', label: 'Protection' },
      { value: '0', label: 'Breaches' }
    ],
    technologies: ['Encryption', 'Firewall', 'IAM'],
    gradientColors: ['from-red-500', 'via-rose-500', 'to-red-700']
  },
  {
    title: 'Business Intelligence',
    description: 'Strategic insights and reporting for data-driven decision making.',
    icon: LineChart,
    stats: [
      { value: '45%', label: 'Growth' },
      { value: '2x', label: 'ROI' }
    ],
    technologies: ['Power BI', 'Looker', 'Sisense'],
    gradientColors: ['from-amber-500', 'via-orange-500', 'to-amber-700']
  },
  {
    title: 'Workforce Solutions',
    description: 'Optimize workforce management and enhance productivity.',
    icon: Users,
    stats: [
      { value: '30%', label: 'Efficiency' },
      { value: '25%', label: 'Retention' }
    ],
    technologies: ['HR Tech', 'Analytics', 'AI'],
    gradientColors: ['from-purple-500', 'via-violet-500', 'to-purple-700']
  }
];

export default function ServiceShowcase() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 opacity-50" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Our Premium Services
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Discover our comprehensive suite of business solutions designed to transform your organization
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard3D
              key={index}
              {...service}
            />
          ))}
        </div>
      </div>
    </section>
  );
}