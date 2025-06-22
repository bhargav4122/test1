'use client';
import React from 'react';
import { motion } from 'framer-motion';

type CardContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardContainer = ({ children, className }: CardContainerProps) => {
  return (
    <div className={className}>
      <motion.div
        whileHover="hover"
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

type CardBodyProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardBody = ({ children, className }: CardBodyProps) => {
  return (
    <motion.div
      variants={{
        hover: {
          scale: 1.03,
          boxShadow: '0px 10px 30px -5px rgba(0, 0, 0, 0.3)',
        },
      }}
      className={`relative rounded-xl transition-all ${className}`}
    >
      {children}
    </motion.div>
  );
};

type CardItemProps = {
  as?: keyof JSX.IntrinsicElements;
  translateZ?: number | string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export const CardItem = ({
  as = 'div',
  translateZ = 0,
  children,
  className = '',
  ...props
}: CardItemProps) => {
  const Component = as;
  
  return (
    <motion.div
      style={{
        zIndex: typeof translateZ === 'number' ? translateZ : 0,
      }}
      variants={{
        hover: {
          y: -5,
        },
      }}
      className={className}
    >
      <Component {...props}>{children}</Component>
    </motion.div>
  );
};