import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';

interface IndustryShowcase3DProps {
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

export default function IndustryShowcase3D({
  title,
  description,
  icon: Icon,
  imageUrl,
  stats,
  features = []
}: IndustryShowcase3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setRotation({ x: rotateX, y: rotateY });
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    setRotation({ x: 0, y: 0 });
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="group"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-gray-100 dark:border-gray-700 transition-all duration-300"
      >
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 dark:to-gray-900/90" />
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Icon className="h-6 w-6 text-blue-500" />
              </div>
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
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-3" />
                  {feature}
                </motion.div>
              ))}
            </div>
          )}

          {/* Interactive Elements */}
          <motion.div
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="p-2 rounded-full bg-blue-500 text-white">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </motion.div>

          {/* Hover Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
        </div>
      </div>
    </motion.div>
  );
}