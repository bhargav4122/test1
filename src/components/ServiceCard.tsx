import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { type ServiceCategory } from '@/lib/services';

interface ServiceCardProps {
  service: ServiceCategory;
  imageUrl: string;
  stats?: {
    value: string;
    label: string;
  }[];
  features?: string[];
}

const statusColors = {
  active: "bg-green-500",
  pilot: "bg-orange-500",
  development: "bg-blue-500",
  upcoming: "bg-purple-500"
};

const statusLabels = {
  active: "✅ Active",
  pilot: "🚀 Pilot",
  development: "🧪 In Development",
  upcoming: "🔜 Upcoming"
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service, imageUrl, stats, features = [] }) => {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Dynamically get the icon component
  const IconComponent = (Icons as any)[service.icon.charAt(0).toUpperCase() + service.icon.slice(1)];

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
        className={`relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-gray-100 dark:border-gray-700 transition-all duration-300 ${
          expanded ? 'shadow-2xl transform -translate-y-2' : ''
        }`}
      >
        {/* Floating animation container */}
        <motion.div animate={floatAnimation} className="relative h-64 overflow-hidden">
  {imageUrl ? (
    <img
      src={imageUrl}
      alt={service.name}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
  ) : (
    <div className="w-full h-full bg-gradient-to-br from-bds-purple to-bds-accent flex items-center justify-center">
      <span className="text-white text-lg font-medium">No Image</span>
    </div>
  )}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 dark:to-gray-900/90" />
</motion.div>

        {/* Content Section */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-lg bg-gradient-to-br from-bds-purple to-bds-accent text-white"
              >
                {IconComponent && <IconComponent size={24} />}
              </motion.div>
              <h3 className="text-xl font-bold text-bds-blue dark:text-white">
                {service.name}
              </h3>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full text-white ${statusColors[service.status]}`}>
              {statusLabels[service.status]}
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
            {service.description}
          </p>

          {/* Stats Grid */}
          {stats && Array.isArray(stats) && stats.length > 0 && (
  <div className="grid grid-cols-3 gap-2 mb-5">
    {stats.map((stat, index) => (
      <motion.div
        key={`stat-${index}`}
        whileHover={{ scale: 1.05 }}
        className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-center"
      >
        <div className="text-2xl font-bold text-blue-500 dark:text-blue-400">
          {stat?.value || 'N/A'}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {stat?.label || 'No label'}
        </div>
      </motion.div>
    ))}
  </div>
)}

          {/* Features List */}
          {features.length > 0 && (
            <div className="space-y-2 mb-6">
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

          <button 
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-bds-purple hover:text-bds-accent transition-colors"
          >
            <span>{expanded ? 'Hide details' : 'View details'}</span>
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          

          {expanded && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-slide-down">
              <h4 className="font-semibold mb-2 text-bds-blue dark:text-white">Services Include:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {service.subServices.map((subService, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-xs text-white p-1 rounded-full bg-bds-purple">✓</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{subService}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

      
        </div>

     
      </motion.div>
    </motion.div>
  );
};

export default ServiceCard;