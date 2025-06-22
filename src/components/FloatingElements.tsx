import React from 'react';
import { motion } from 'framer-motion';

const FloatingShape = ({ 
  position, 
  color, 
  shape = 'sphere',
  delay = 0 
}: { 
  position: { x: string; y: string }; 
  color: string; 
  shape?: string;
  delay?: number;
}) => {
  const renderShape = () => {
    const baseClasses = "absolute w-16 h-16 opacity-30 blur-sm";
    
    switch (shape) {
      case 'box':
        return (
          <div 
            className={`${baseClasses} rounded-lg`}
            style={{ backgroundColor: color }}
          />
        );
      case 'torus':
        return (
          <div 
            className={`${baseClasses} rounded-full border-8`}
            style={{ borderColor: color }}
          />
        );
      default:
        return (
          <div 
            className={`${baseClasses} rounded-full`}
            style={{ backgroundColor: color }}
          />
        );
    }
  };

  return (
    <motion.div
      className="absolute"
      style={{
        left: position.x,
        top: position.y,
      }}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    >
      {renderShape()}
    </motion.div>
  );
};

export const FloatingElements = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <FloatingShape 
        position={{ x: '10%', y: '20%' }} 
        color="#06b6d4" 
        shape="sphere" 
        delay={0}
      />
      <FloatingShape 
        position={{ x: '80%', y: '70%' }} 
        color="#3b82f6" 
        shape="box" 
        delay={1}
      />
      <FloatingShape 
        position={{ x: '20%', y: '80%' }} 
        color="#8b5cf6" 
        shape="torus" 
        delay={2}
      />
      <FloatingShape 
        position={{ x: '70%', y: '30%' }} 
        color="#06b6d4" 
        shape="sphere" 
        delay={3}
      />
      <FloatingShape 
        position={{ x: '90%', y: '10%' }} 
        color="#3b82f6" 
        shape="box" 
        delay={4}
      />
      <FloatingShape 
        position={{ x: '5%', y: '60%' }} 
        color="#8b5cf6" 
        shape="torus" 
        delay={5}
      />
    </div>
  );
};