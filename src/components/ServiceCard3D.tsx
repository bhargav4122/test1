import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  imageUrl: string;
  stats?: {
    value: string;
    label: string;
  }[];
  features?: string[];
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  imageUrl,
  stats,
  features = []
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // For floating animation
  const floatAnimation = {
    y: [0, -5, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="group relative"
    >
      <motion.div
        ref={cardRef}
        className="relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-gray-100 dark:border-gray-700 transition-all duration-300"
      >
        {/* Floating animation container */}
        <motion.div 
          animate={floatAnimation}
          className="relative h-64 overflow-hidden"
        >
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 dark:to-gray-900/90" />
        </motion.div>

        {/* Content Section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center"
              >
                <Icon className="h-6 w-6 text-blue-500" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {description}
          </p>

          {/* Stats Grid */}
          {stats && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-center"
                >
                  <div className="text-2xl font-bold text-blue-500">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Features List */}
          {features.length > 0 && (
            <div className="space-y-2">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center text-gray-600 dark:text-gray-300"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-blue-500 mr-3"
                  />
                  {feature}
                </motion.div>
              ))}
            </div>
          )}

      
        </div>

        {/* Hover Effect */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"
        />
      </motion.div>
    </motion.div>
  );
}