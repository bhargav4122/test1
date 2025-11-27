import React, { memo, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ArrowRight, Building2, Heart, GraduationCap, Factory, ShoppingCart, 
  Utensils, Home, Truck, Wheat, Scale, Megaphone 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Memoized icon components
const MemoizedIcons = {
  ArrowRight: memo(ArrowRight),
  Building2: memo(Building2),
  Heart: memo(Heart),
  GraduationCap: memo(GraduationCap),
  Factory: memo(Factory),
  ShoppingCart: memo(ShoppingCart),
  Utensils: memo(Utensils),
  Home: memo(Home),
  Truck: memo(Truck),
  Wheat: memo(Wheat),
  Scale: memo(Scale),
  Megaphone: memo(Megaphone),
};

// Static industries data
const INDUSTRIES_DATA = [
  {
    id: "it-cloud",
    icon: "Building2",
    title: "IT & Cloud",
    description: "Cutting-edge technology solutions for modern businesses",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    id: "finance",
    icon: "Scale",
    title: "Financial Services",
    description: "Digital solutions for banking and financial institutions",
    gradient: "from-emerald-500 to-green-600"
  },
  {
    id: "healthcare",
    icon: "Heart",
    title: "Healthcare",
    description: "Digital transformation for healthcare providers",
    gradient: "from-red-500 to-pink-600"
  },
  {
    id: "education",
    icon: "GraduationCap",
    title: "Education",
    description: "Digital solutions for modern education",
    gradient: "from-purple-500 to-violet-600"
  },
  {
    id: "manufacturing",
    icon: "Factory",
    title: "Manufacturing",
    description: "Smart manufacturing solutions for Industry 4.0",
    gradient: "from-orange-500 to-red-600"
  },
  {
    id: "retail",
    icon: "ShoppingCart",
    title: "Retail & E-Commerce",
    description: "Digital solutions for modern retail experiences",
    gradient: "from-teal-500 to-cyan-600"
  },
  {
    id: "restaurants",
    icon: "Utensils",
    title: "Restaurants",
    description: "Digital solutions for the food service industry",
    gradient: "from-yellow-500 to-orange-600"
  },
  {
    id: "real-estate",
    icon: "Home",
    title: "Real Estate",
    description: "Digital solutions for property management",
    gradient: "from-indigo-500 to-blue-600"
  },
  {
    id: "transport",
    icon: "Truck",
    title: "Transport & Logistics",
    description: "Digital solutions for transportation and logistics",
    gradient: "from-gray-500 to-slate-600"
  },
  {
    id: "agriculture",
    icon: "Wheat",
    title: "Agriculture",
    description: "Digital solutions for modern farming",
    gradient: "from-lime-500 to-green-600"
  },
  {
    id: "legal",
    icon: "Scale",
    title: "Professional Services",
    description: "Digital solutions for legal and professional services",
    gradient: "from-slate-500 to-gray-600"
  },
  {
    id: "marketing",
    icon: "Megaphone",
    title: "Marketing & Creative",
    description: "Digital solutions for marketing and creative agencies",
    gradient: "from-pink-500 to-rose-600"
  }
] as const;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06 // Reduced stagger for faster loading
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 }, // Reduced y movement
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      duration: 0.4, // Faster animation
      ease: "easeOut" // Simpler easing
    }
  }
};

// Memoized Industry Card component
const IndustryCard = memo(({ 
  industry, 
  onClick 
}: { 
  industry: typeof INDUSTRIES_DATA[0];
  onClick: (id: string) => void;
}) => {
  const IconComponent = MemoizedIcons[industry.icon as keyof typeof MemoizedIcons];
  
  return (
    <motion.div
      variants={itemVariants}
      className="group relative cursor-pointer"
      onClick={() => onClick(industry.id)}
      whileHover={{ 
        y: -2, // Reduced hover movement
        transition: { duration: 0.2 }
      }}
    >
      {/* Simplified gradient background */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-200 -z-10`}></div>
      
      <div className="relative overflow-hidden rounded-xl bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 dark:border-white/10 p-5 h-full transition-all duration-200 group-hover:bg-white/10">
        <div className={`rounded-lg p-2 bg-gradient-to-br ${industry.gradient} mb-3 inline-block text-white`}>
          <IconComponent className="h-5 w-5" />
        </div>
        <h3 className="text-base font-semibold mb-2 line-clamp-2">{industry.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{industry.description}</p>
        <div className="mt-auto">
          <span className="flex items-center text-primary text-sm hover:text-primary/80 transition-colors">
            Learn more <MemoizedIcons.ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </motion.div>
  );
});

IndustryCard.displayName = 'IndustryCard';

function IndustrySection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05, // Lower threshold for earlier trigger
    rootMargin: '50px 0px'
  });
  
  const navigate = useNavigate();

  // Memoized click handlers
  const handleIndustryClick = useCallback((industryId: string) => {
    navigate(`/industries/${industryId}`);
  }, [navigate]);

  const handleViewAllClick = useCallback(() => {
    navigate('/industries');
  }, [navigate]);

  // Memoized industries grid
  const industriesGrid = useMemo(() => (
    <motion.div 
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" // Reduced gap
    >
      {INDUSTRIES_DATA.map((industry) => (
        <IndustryCard 
          key={industry.id}
          industry={industry}
          onClick={handleIndustryClick}
        />
      ))}
    </motion.div>
  ), [inView, handleIndustryClick]);

  return (
    <section className="py-12"> {/* Reduced padding */}
      {/* Simplified background elements with reduced blur */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-violet-500/3 blur-[60px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-emerald-500/3 blur-[60px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12"> {/* Reduced margin */}
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-3">
            Industries We Serve
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Transforming <span className="text-primary">Every Industry</span>
          </h2>
          <p className="text-base text-muted-foreground"> {/* Smaller text */}
            We deliver industry-specific solutions across diverse sectors, helping businesses modernize and thrive in the digital age.
          </p>
        </div>

        {industriesGrid}
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.3 }} // Reduced delay and duration
          className="mt-12 text-center" // Reduced margin
        >
          <Button 
            onClick={handleViewAllClick}
            className="rounded-full px-6 py-4 text-sm bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-md shadow-primary/20 transition-all duration-200"
          >
            View all industries <MemoizedIcons.ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(IndustrySection);
