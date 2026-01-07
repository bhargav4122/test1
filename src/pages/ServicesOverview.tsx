import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { servicesDropdown } from "@/data/navigationData";
import { useTheme } from '@/providers/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { DropdownItem } from '@/types/navigation';

// Lazy load heavy components
const CallToAction = lazy(() => import("@/components/home/CallToAction"));

type ServiceStatus = 'all' | 'active' | 'pilot' | 'development' | 'upcoming';

// Memoize static data
const statusColors = {
  all: "bg-gray-500",
  active: "bg-green-500",
  pilot: "bg-orange-500",
  development: "bg-blue-500",
  upcoming: "bg-purple-500"
};

const statusLabels = {
  all: "All Services",
  active: "Active",
  pilot: "Pilot",
  development: "In Development",
  upcoming: "Upcoming"
};

// Optimized image component with intersection observer
const OptimizedImage = React.memo(({ 
  src, 
  alt, 
  className = "",
  fallback = null 
}: { 
  src?: string; 
  alt: string; 
  className?: string;
  fallback?: React.ReactNode;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const imageRef = React.useRef<HTMLImageElement>(null);

  // Optimize Cloudinary images with responsive parameters
  const optimizedSrc = useMemo(() => {
    if (!src) return null;
    
    if (src.includes('cloudinary.com')) {
      // Add Cloudinary optimization parameters - more aggressive optimization
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const width = isMobile ? 300 : 500; // Reduced from 400/600
      const quality = 'q_auto:eco'; // Always use eco for better performance
      
      if (src.includes('/upload/')) {
        return src.replace('/upload/', `/upload/${quality},w_${width},f_auto,dpr_auto/`);
      }
    }
    
    // Optimize Unsplash images
    if (src.includes('unsplash.com')) {
      const url = new URL(src);
      url.searchParams.set('q', '60'); // Reduced quality
      url.searchParams.set('fit', 'crop');
      url.searchParams.set('w', '500'); // Reduced size
      return url.toString();
    }
    
    return src;
  }, [src]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!imageRef.current || !optimizedSrc) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '50px', // Start loading 50px before element comes into view
        threshold: 0.1 
      }
    );

    observer.observe(imageRef.current);
    return () => observer.disconnect();
  }, [optimizedSrc]);

  if (!optimizedSrc || imageError) {
    return fallback || (
      <div 
        className={`w-full h-full bg-gradient-to-br from-bds-purple to-bds-accent flex items-center justify-center ${className}`}
        ref={imageRef}
      >
        <span className="text-white text-sm font-medium">No Image</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full" ref={imageRef}>
      {!imageLoaded && (
        <div 
          className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}
        />
      )}
      {isInView && (
        <img
          src={optimizedSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

// Memoized service card component to prevent unnecessary re-renders
const ServiceCard = React.memo(({ 
  service, 
  isMobile,
  theme 
}: { 
  service: DropdownItem; 
  isMobile: boolean;
  theme: string;
}) => {
  const serviceId = service.path.split('/').pop() || '';
  
  const getIconComponent = useCallback((icon: string | LucideIcon | undefined) => {
    if (!icon) return null;
    if (typeof icon === 'function') return icon;
    if (typeof icon === 'string') {
      const iconName = icon.charAt(0).toUpperCase() + icon.slice(1);
      return Icons[iconName as keyof typeof Icons] || null;
    }
    return null;
  }, []);

  const IconComponent = getIconComponent(service.icon);
  
  const floatAnimation = {
    y: [0, -5, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -2 }}
      className="group flex flex-col h-full"
    >
      <div className={`relative rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm dark:shadow-md dark:shadow-gray-700/50 border border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col h-full hover:shadow-md`}>
        {/* Image Section */}
        <Link 
          to={`/service-detail/${serviceId}`} 
          className="block flex-shrink-0"
          onClick={(e) => e.stopPropagation()}
          prefetch="intent" // Add prefetch for better navigation performance
        >
          <motion.div 
            animate={floatAnimation} 
            className="relative aspect-[4/3] overflow-hidden cursor-pointer"
          >
            <OptimizedImage
              src={service.image}
              alt={service.title}
              className="group-hover:scale-105 transition-transform duration-300"
              fallback={
                <div className="w-full h-full bg-gradient-to-br from-bds-purple to-bds-accent flex items-center justify-center">
                  {IconComponent && React.createElement(IconComponent, { 
                    size: 32, 
                    className: "text-white opacity-80" 
                  })}
                </div>
              }
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 dark:to-gray-900/80" />
          </motion.div>
        </Link>

        {/* Content Section */}
        <div className="p-4 md:p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
              {IconComponent && (
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="flex-shrink-0 p-1.5 md:p-2 rounded-lg bg-gradient-to-br from-bds-purple to-bds-accent text-white"
                >
                  {React.createElement(IconComponent, { size: isMobile ? 16 : 20 })}
                </motion.div>
              )}
              <h3 className="text-base md:text-lg font-bold text-gray-800 dark:text-white truncate">
                {service.title}
              </h3>
            </div>
            {service.stage && (
              <span className={`text-xs px-2 py-1 rounded-full text-white flex-shrink-0 ${
                statusColors[service.stage] || 'bg-gray-500'
              }`}>
                {isMobile ? statusLabels[service.stage]?.charAt(0) : statusLabels[service.stage] || service.stage}
              </span>
            )}
          </div>

          <div className="flex-grow mb-3 md:mb-4">
            <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm line-clamp-3 mb-3 md:mb-4 leading-relaxed">
              {service.description2 ? service.description2 : service.description}
            </p>
          </div>

          <div className="mt-auto pt-2 border-gray-200 dark:border-gray-700">
            <Link
              to={`/service-detail/${serviceId}`}
              className="flex items-center gap-1 md:gap-2 text-bds-purple hover:text-bds-accent transition-colors text-xs md:text-sm justify-end font-medium"
              onClick={(e) => e.stopPropagation()}
              prefetch="intent"
            >
              <span>Learn more</span>
              <ArrowUpRight size={isMobile ? 14 : 16} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';

// Mobile dropdown component
const MobileDropdown = React.memo(({ 
  tabs, 
  activeTab, 
  setActiveTab, 
  showMobileMenu, 
  setShowMobileMenu, 
  theme 
}: {
  tabs: Array<{ id: string; label: string; shortLabel: string }>;
  activeTab: ServiceStatus;
  setActiveTab: (tab: ServiceStatus) => void;
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
  theme: string;
}) => (
  <div className="md:hidden relative">
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={(e) => {
        e.stopPropagation();
        setShowMobileMenu(!showMobileMenu);
      }}
      className={`w-full flex justify-between items-center px-4 py-3 rounded-lg text-sm font-medium ${
        theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
      } border border-gray-200 dark:border-gray-700 shadow-sm`}
    >
      <span>{tabs.find(t => t.id === activeTab)?.shortLabel}</span>
      <ChevronDown className={`transition-transform duration-200 ${showMobileMenu ? 'rotate-180' : ''}`} size={16} />
    </motion.button>
    
    <AnimatePresence>
      {showMobileMenu && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute z-50 w-full mt-1 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          <div className={`${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } rounded-lg py-1`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as ServiceStatus);
                  setShowMobileMenu(false);
                }}
                className={`w-full text-left px-4 py-3 transition-colors text-sm ${
                  activeTab === tab.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    : theme === 'dark'
                      ? 'hover:bg-gray-700 text-gray-300'
                      : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
));

MobileDropdown.displayName = 'MobileDropdown';

// Desktop tabs component
const DesktopTabs = React.memo(({ 
  tabs, 
  activeTab, 
  setActiveTab, 
  theme 
}: {
  tabs: Array<{ id: string; label: string; shortLabel: string }>;
  activeTab: ServiceStatus;
  setActiveTab: (tab: ServiceStatus) => void;
  theme: string;
}) => (
  <div className="hidden md:flex flex-wrap gap-2 justify-center">
    {tabs.map((tab) => (
      <motion.button
        key={tab.id}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setActiveTab(tab.id as ServiceStatus)}
        className={`px-3 py-2 rounded-lg transition-all text-sm font-medium ${
          activeTab === tab.id
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 shadow-md'
            : `${
                theme === 'dark' 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-200 dark:border-gray-700`
        }`}
      >
        {tab.label}
      </motion.button>
    ))}
  </div>
));

DesktopTabs.displayName = 'DesktopTabs';

const getFilteredServices = (status: ServiceStatus) => {
  if (status === 'all') return servicesDropdown;
  return servicesDropdown.filter(service => service.stage === status);
};

const ServicesOverview: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<ServiceStatus>('all');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Throttled resize handler
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 100); // Throttle resize events
    };
    
    checkMobile();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Memoize filtered services to prevent unnecessary recalculations
  const filteredServices = useMemo(() => 
    getFilteredServices(activeTab), 
    [activeTab]
  );

  // Memoize tabs configuration
  const tabs = useMemo(() => [
    { id: 'all', label: '🌟 All Services', shortLabel: '🌟 All' },
    { id: 'active', label: '✅ Active Services', shortLabel: '✅ Active' },
    { id: 'pilot', label: '🚀 Pilot Services', shortLabel: '🚀 Pilot' },
    { id: 'development', label: '🧪 In Development', shortLabel: '🧪 Dev' },
    { id: 'upcoming', label: '🔜 Upcoming Services', shortLabel: '🔜 Upcoming' },
  ], []);

  // Close mobile menu when clicking outside - optimized with useCallback
  useEffect(() => {
    const handleClickOutside = () => {
      if (showMobileMenu) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMobileMenu]);

  return (
    <div className="min-h-screen py-8 md:py-10">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Our Services | Business and Data Solutions - Complete Service Portfolio</title>
        <meta 
          name="description" 
          content="Explore our comprehensive business services: Data & Cloud solutions, BI & Digital Transformation, Business Consulting, Market Research, and Workforce Development services." 
        />
        <meta 
          name="keywords" 
          content="business services, data solutions, cloud services, BI solutions, digital transformation, business consulting, market research, workforce development, data analytics, digital marketing" 
        />
        <link rel="canonical" href="https://www.businessanddatasolutions.com/services" />
        <meta property="og:title" content="Our Services | Business and Data Solutions - Complete Service Portfolio" />
        <meta 
          property="og:description" 
          content="Explore our comprehensive business services: Data & Cloud solutions, BI & Digital Transformation, Business Consulting, and more." 
        />
        <meta property="og:url" content="https://www.businessanddatasolutions.com/services" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://res.cloudinary.com/dsf4d41i8/image/upload/v1753058194/bi1_resvzt.png" />
      </Helmet>

      <main className="container mx-auto px-4 sm:px-6 py-6 md:py-8 max-w-6xl">
        <section className="text-center pt-10 mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold gradient-text mb-3 md:mb-4 dark:text-white text-gray-900">
            Explore Our Services
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-lg max-w-2xl mx-auto">
            Empowering your business with cutting-edge solutions tailored to your needs.
          </p>
        </section>

        {/* Service Tabs */}
        <div className="mb-4 md:mb-6">
          <DesktopTabs 
            tabs={tabs} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            theme={theme} 
          />
          
          <MobileDropdown 
            tabs={tabs} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            showMobileMenu={showMobileMenu} 
            setShowMobileMenu={setShowMobileMenu} 
            theme={theme} 
          />
        </div>
        
        {/* Services Grid */}
        <div className="mb-6 md:mb-8">
          <AnimatePresence mode="wait">
            {filteredServices.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 md:py-16"
              >
                <h3 className="text-lg md:text-xl font-medium text-gray-500 dark:text-gray-400 mb-2">
                  No services found in this category
                </h3>
                <p className="text-gray-400 dark:text-gray-500 text-sm">
                  Check back later for new services
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={`services-${activeTab}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
              >
                {filteredServices.map((service: DropdownItem) => (
                  <ServiceCard 
                    key={service.path} 
                    service={service} 
                    isMobile={isMobile} 
                    theme={theme} 
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Lazy loaded CTA with suspense fallback */}
        <Suspense fallback={<div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />}>
          <CallToAction />
        </Suspense>
        
        <div className="text-center mt-6 md:mt-8">
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">
            Can't find what you're looking for?{' '}
            <Link 
              to="/contact" 
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              prefetch="intent"
            >
              Contact us
            </Link>{' '}
            for custom solutions.
          </p>
        </div>
      </main>
    </div>
  );
};

export default React.memo(ServicesOverview);
