import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { servicesDropdown } from "@/data/navigationData";
import { useTheme } from '@/providers/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { DropdownItem } from '@/types/navigation';
import CallToAction from "@/components/home/CallToAction";

type ServiceStatus = 'all' | 'active' | 'pilot' | 'development' | 'upcoming';

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

// Optimized image placeholder component
const OptimizedImage = ({ 
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

  // Optimize Cloudinary images with responsive parameters
  const optimizedSrc = useMemo(() => {
    if (!src) return null;
    
    if (src.includes('cloudinary.com')) {
      // Add Cloudinary optimization parameters
      const isMobile = window.innerWidth < 768;
      const width = isMobile ? 400 : 600;
      const quality = isMobile ? 'q_auto:eco' : 'q_auto:good';
      
      if (src.includes('/upload/')) {
        return src.replace('/upload/', `/upload/${quality},w_${width},f_auto/`);
      }
    }
    
    // Optimize Unsplash images
    if (src.includes('unsplash.com')) {
      const url = new URL(src);
      url.searchParams.set('q', '70');
      url.searchParams.set('fit', 'crop');
      url.searchParams.set('w', '600');
      return url.toString();
    }
    
    return src;
  }, [src]);

  if (!optimizedSrc || imageError) {
    return fallback || (
      <div className={`w-full h-full bg-gradient-to-br from-bds-purple to-bds-accent flex items-center justify-center ${className}`}>
        <span className="text-white text-sm font-medium">No Image</span>
      </div>
    );
  }

  return (
    <>
      {!imageLoaded && (
        <div className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`} />
      )}
      <img
        src={optimizedSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-500 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
    </>
  );
};

const getFilteredServices = (status: ServiceStatus) => {
  if (status === 'all') return servicesDropdown;
  return servicesDropdown.filter(service => service.stage === status);
};

const ServicesOverview: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<ServiceStatus>('all');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Memoize filtered services to prevent unnecessary recalculations
  const filteredServices = useMemo(() => 
    getFilteredServices(activeTab), 
    [activeTab]
  );

  const tabs = useMemo(() => [
    { id: 'all', label: '🌟 All Services', shortLabel: '🌟 All' },
    { id: 'active', label: '✅ Active Services', shortLabel: '✅ Active' },
    { id: 'pilot', label: '🚀 Pilot Services', shortLabel: '🚀 Pilot' },
    { id: 'development', label: '🧪 In Development', shortLabel: '🧪 Dev' },
    { id: 'upcoming', label: '🔜 Upcoming Services', shortLabel: '🔜 Upcoming' },
  ], []);

  const floatAnimation = {
    y: [0, -5, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  const getIconComponent = (icon: string | LucideIcon | undefined) => {
    if (!icon) return null;
    if (typeof icon === 'function') return icon;
    if (typeof icon === 'string') {
      const iconName = icon.charAt(0).toUpperCase() + icon.slice(1);
      return Icons[iconName as keyof typeof Icons] || null;
    }
    return null;
  };

  // Close mobile menu when clicking outside
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
      <main className="container mx-auto px-4 sm:px-6 py-6 md:py-8 max-w-6xl">
        <section className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold gradient-text mb-3 md:mb-4 dark:text-white text-gray-900">
            Explore Our Services
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-lg max-w-2xl mx-auto">
            Empowering your business with cutting-edge solutions tailored to your needs.
          </p>
        </section>

        {/* Service Tabs */}
        <div className="mb-4 md:mb-6">
          {/* Desktop Tabs */}
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
          
          {/* Mobile Dropdown */}
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
                {filteredServices.map((service: DropdownItem) => {
                  const serviceId = service.path.split('/').pop() || '';
                  const IconComponent = getIconComponent(service.icon);
                  
                  return (
                    <motion.div
                      key={service.path}
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
                        >
                          <motion.div 
                            animate={floatAnimation} 
                            className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                          >
                            <OptimizedImage
                              src={service.image}
                              alt={service.title}
                              className="group-hover:scale-105"
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
                              {service.description}
                            </p>
                      
                            {service.stats && service.stats.length > 0 && (
                              <div className="grid grid-cols-3 gap-1 md:gap-2">
                                {service.stats.slice(0, 3).map((stat, index) => (
                                  <motion.div
                                    key={`stat-${index}`}
                                    whileHover={{ scale: 1.05 }}
                                    className="p-1.5 md:p-2 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-center"
                                  >
                                    <div className="text-sm md:text-lg font-bold text-blue-500 dark:text-blue-400">
                                      {stat.value}
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-300 truncate">
                                      {isMobile ? stat.label.split(' ')[0] : stat.label}
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
                            <Link
                              to={`/service-detail/${serviceId}`}
                              className="flex items-center gap-1 md:gap-2 text-bds-purple hover:text-bds-accent transition-colors text-xs md:text-sm justify-end font-medium"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>Learn more</span>
                              <ArrowUpRight size={isMobile ? 14 : 16} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <CallToAction />
        
        <div className="text-center mt-6 md:mt-8">
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">
            Can't find what you're looking for?{' '}
            <Link 
              to="/contact" 
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
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

export default ServicesOverview;
