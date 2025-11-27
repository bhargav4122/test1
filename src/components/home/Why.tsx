import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, Shield, Brain } from 'lucide-react';

// Memoized icon components
const MemoizedIcons = {
  Zap: memo(Zap),
  Shield: memo(Shield),
  Brain: memo(Brain),
};

// Static features data
const FEATURES_DATA = [
  {
    icon: "Brain",
    title: "Innovation First",
    description: "AI-driven, automated, and cloud-powered solutions that push your business ahead of the competition.",
    color: "text-blue-400 dark:text-blue-300"
  },
  {
    icon: "Shield",
    title: "Enterprise Security",
    description: "Military-grade protection ensuring your data, operations, and digital assets remain fully secure.",
    color: "text-blue-400 dark:text-blue-300"
  },
  {
    icon: "Zap",
    title: "Rapid Results",
    description: "Fast implementation, seamless integration, and accelerated go-to-market for measurable business impact.",
    color: "text-blue-400 dark:text-blue-300"
  }
] as const;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

// Memoized Feature Card component
const FeatureCard = memo(({ 
  feature 
}: { 
  feature: typeof FEATURES_DATA[0];
}) => {
  const IconComponent = MemoizedIcons[feature.icon as keyof typeof MemoizedIcons];
  
  return (
    <motion.div
      variants={itemVariants}
      className="p-6 group bg-white shadow-md rounded-xl dark:bg-black border border-gray-200 dark:border-gray-800 dark:text-gray-100"
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <IconComponent className={`h-10 w-10 mb-4 ${feature.color}`} />
      <h3 className="text-lg font-bold text-gray-900 mb-3 dark:text-gray-100">
        {feature.title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
});

FeatureCard.displayName = 'FeatureCard';

function Why() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: '50px 0px'
  });

  // Memoized features grid
  const featuresGrid = useMemo(() => (
    <motion.div 
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {FEATURES_DATA.map((feature, index) => (
        <FeatureCard 
          key={feature.title}
          feature={feature}
        />
      ))}
    </motion.div>
  ), [inView]);

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Why Choose Us
      </h2>
      {featuresGrid}
    </section>
  );
}

export default memo(Why);
