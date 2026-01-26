import React, { memo, useCallback, useMemo, lazy, Suspense } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import {
  Database,
  LineChart,
  Cpu,
  Shield,
  CheckCircle,
  Clock,
} from "lucide-react";

// Lazy load heavy dependencies
const Tilt = lazy(() => import("react-parallax-tilt"));

// Memoized icon components
const MemoizedIcons = {
  Database: memo(Database),
  LineChart: memo(LineChart),
  Cpu: memo(Cpu),
  Shield: memo(Shield),
  CheckCircle: memo(CheckCircle),
  Clock: memo(Clock),
};

// Static steps data
const STEPS_DATA = [
  {
    icon: "Database",
    title: "Data Collection",
    description: "Connect and collect data from all your business sources with enterprise-grade security.",
    features: ["Multi-source integration", "Real-time sync", "Secure protocols"],
    gradient: "from-blue-500 to-indigo-600",
    duration: "1-2 weeks"
  },
  {
    icon: "Cpu",
    title: "AI Processing",
    description: "Advanced algorithms process data to uncover actionable insights and patterns.",
    features: ["Machine learning", "Pattern recognition", "Automated analysis"],
    gradient: "from-violet-500 to-purple-600",
    duration: "2-3 weeks"
  },
  {
    icon: "LineChart",
    title: "Visualization",
    description: "Transform complex data into intuitive, interactive dashboards.",
    features: ["Interactive charts", "Custom views", "Real-time updates"],
    gradient: "from-emerald-500 to-green-600",
    duration: "1-2 weeks"
  },
  {
    icon: "Shield",
    title: "Deployment",
    description: "Enterprise-ready deployment with continuous monitoring and security.",
    features: ["Enterprise security", "Compliance ready", "24/7 monitoring"],
    gradient: "from-orange-500 to-red-600",
    duration: "1 week"
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

// Loading fallback for Tilt
const TiltFallback = ({ children }: { children: React.ReactNode }) => (
  <div className="relative group p-6 rounded-2xl backdrop-blur-lg border border-white/10 bg-white/10 dark:bg-white/5 shadow-lg">
    {children}
  </div>
);

// Memoized Step Card component
const StepCard = memo(({ 
  step, 
  index 
}: { 
  step: typeof STEPS_DATA[0];
  index: number;
}) => {
  const IconComponent = MemoizedIcons[step.icon as keyof typeof MemoizedIcons];
  const CheckCircleIcon = MemoizedIcons.CheckCircle;
  const ClockIcon = MemoizedIcons.Clock;

  const cardContent = (
    <motion.div
      variants={itemVariants}
      className="relative group p-5 rounded-xl backdrop-blur-sm border border-white/10 bg-white/10 dark:bg-white/5 shadow-md hover:shadow-lg transition-all"
      whileHover={{ 
        y: -2,
        transition: { duration: 0.2 }
      }}
    >
      {/* Step badge */}
      <div className="relative w-12 h-12 mb-4 rounded-lg bg-gradient-to-br p-3 shadow-md flex items-center justify-center text-white">
        <div className={`bg-gradient-to-br ${step.gradient} absolute inset-0 rounded-lg`} />
        <IconComponent className="h-5 w-5 relative z-10" />
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-white dark:bg-background border border-primary rounded-full flex items-center justify-center text-xs font-bold text-primary shadow-sm">
          {index + 1}
        </div>
      </div>

      {/* Step content */}
      <div>
        <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary mb-2">
          <ClockIcon className="h-3 w-3" />
          {step.duration}
        </div>

        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
          {step.description}
        </p>

        <div className="space-y-1.5">
          {step.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-1.5 text-xs">
              <CheckCircleIcon className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
              <span className="leading-tight">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <Suspense fallback={<TiltFallback>{cardContent}</TiltFallback>}>
      <Tilt
        tiltMaxAngleX={3}
        tiltMaxAngleY={3}
        glareEnable={false} // Disabled for performance
        transitionSpeed={1000}
        scale={1.02}
      >
        {cardContent}
      </Tilt>
    </Suspense>
  );
});

StepCard.displayName = 'StepCard';

function HowItWorks() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: '50px 0px'
  });

  // Memoized steps grid
  const stepsGrid = useMemo(() => (
    <motion.div 
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {STEPS_DATA.map((step, index) => (
        <StepCard 
          key={step.title}
          step={step}
          index={index}
        />
      ))}
    </motion.div>
  ), [inView]);

  return (
    <section id="how-it-works" className="py-12 relative">
      {/* Simplified background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] rounded-full bg-primary/3 blur-[40px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[150px] h-[150px] rounded-full bg-violet-500/3 blur-[30px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            Our Process
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-4 sm:text-4xl">
            How we <span className="text-primary">transform</span> your business
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto sm:text-lg">
            A streamlined process that converts your data into actionable intelligence in 5-8 weeks.
          </p>
        </motion.div>

        {/* Cards */}
        {stepsGrid}
      </div>
    </section>
  );
}

export default memo(HowItWorks);