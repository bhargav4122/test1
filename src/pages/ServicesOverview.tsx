import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { servicesDropdown } from "@/data/navigationData";
import { useTheme } from '@/providers/ThemeProvider';
import { motion } from 'framer-motion';
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

const getFilteredServices = (status: ServiceStatus) => {
  if (status === 'all') return servicesDropdown;
  return servicesDropdown.filter(service => service.stage === status);
};

const ServicesOverview: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<ServiceStatus>('all');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const tabs = [
    { id: 'all', label: '🌟 All Services', shortLabel: '🌟 All' },
    { id: 'active', label: '✅ Active Services', shortLabel: '✅ Active' },
    { id: 'pilot', label: '🚀 Pilot Services', shortLabel: '🚀 Pilot' },
    { id: 'development', label: '🧪 In Development', shortLabel: '🧪 Dev' },
    { id: 'upcoming', label: '🔜 Upcoming Services', shortLabel: '🔜 Upcoming' },
  ];
  
  const filteredServices = getFilteredServices(activeTab);

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

  return (
    <div className="min-h-screen py-10 md:pt-10">
      <main className="container mx-auto px-4 sm:px-6 py-8 md:py-12 max-w-6xl">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4 dark:text-white text-gray-900">
            Explore Our Services
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
            Empowering your business with cutting-edge solutions tailored to your needs.
          </p>
        </section>

        {/* Service Tabs */}
        <div className="mb-6 md:mb-8">
          <div className="hidden md:flex justify-center gap-2 text-bold">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ServiceStatus)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-300 text-gray-900 shadow-md'
                    : `${
                        theme === 'dark' 
                          ? 'bg-gray text-gray-300 hover:bg-gray-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      } border border-gray-200 dark:border-gray-700`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="md:hidden relative">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className={`w-full flex justify-between items-center px-4 py-3 rounded-lg ${
                theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
              } border border-gray-200 dark:border-gray-700`}
            >
              <span>{tabs.find(t => t.id === activeTab)?.shortLabel}</span>
              <ChevronDown className={`transition-transform ${showMobileMenu ? 'rotate-180' : ''}`} size={18} />
            </button>
            
            {showMobileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full mt-1 rounded-lg shadow-lg overflow-hidden"
              >
                <div className={`${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                } border border-gray-200 dark:border-gray-700 rounded-lg`}>
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as ServiceStatus);
                        setShowMobileMenu(false);
                      }}
                      className={`w-full text-left px-4 py-3 transition-colors ${
                        activeTab === tab.id
                          ? 'bg-bds-purple text-white'
                          : theme === 'dark'
                            ? 'hover:bg-gray-700 text-gray-300'
                            : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        <div className="mb-8 md:mb-12">
          {filteredServices.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <h3 className="text-lg md:text-xl font-medium text-gray-500 dark:text-gray-400">
                No services found in this category
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredServices.map((service: DropdownItem) => {
                const serviceId = service.path.split('/').pop() || '';
                const IconComponent = getIconComponent(service.icon);
                
                return (
                  <motion.div
                    key={service.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="group flex flex-col h-full"
                  >
                    <div className={`relative rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm dark:shadow-md dark:shadow-gray-700/50 border border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col h-full hover:shadow-md hover:-translate-y-1`}>
                      {/* Image Section */}
                      <Link to={`/service-detail/${serviceId}`} className="block flex-shrink-0">
                        <motion.div 
                          animate={floatAnimation} 
                          className="relative aspect-[5/3] overflow-hidden cursor-pointer"
                        >
                          {service.image ? (
                            <img
                              src={service.image}
                              alt={service.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-bds-purple to-bds-accent flex items-center justify-center">
                              <span className="text-white text-sm md:text-lg font-medium">No Image</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 dark:to-gray-900/90" />
                        </motion.div>
                      </Link>

                      {/* Content Section */}
                      <div className="p-5 flex flex-col flex-grow dark:bg-black border dark:text-gray-100">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            {IconComponent && (
                              <motion.div 
                                whileHover={{ scale: 1.1 }}
                                className="p-2"
                              >
                                {React.createElement(IconComponent, { size: 20 })}
                              </motion.div>
                            )}
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                              {service.title}
                            </h3>
                          </div>
                          {service.stage && (
                            <span className={`text-xs px-2 py-1 rounded-full text-white ${
                              statusColors[service.stage] || 'bg-gray-500'
                            }`}>
                              {statusLabels[service.stage] || service.stage}
                            </span>
                          )}
                        </div>

                        <div className="flex-grow mb-4">
                          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                            {service.description}
                          </p>
                      
                          {service.stats && service.stats.length > 0 && (
                            <div className="grid grid-cols-3 gap-2">
                              {service.stats.map((stat, index) => (
                                <motion.div
                                  key={`stat-${index}`}
                                  whileHover={{ scale: 1.05 }}
                                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-center"
                                >
                                  <div className="text-lg font-bold text-blue-500 dark:text-blue-400">
                                    {stat.value}
                                  </div>
                                  <div className="text-xs text-gray-600 dark:text-gray-300">
                                    {stat.label}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
                          <Link
                            to={`/service-detail/${serviceId}`}
                            className="flex items-center text-bds-purple hover:text-bds-accent transition-colors text-sm justify-center"
                          >
                            <span className=' p-5'>Learn more</span>
                            <Icons.ArrowRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
        
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Can't find what you're looking for?{' '}
            <Link to="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
              Contact us
            </Link>{' '}
            for custom solutions.
          </p>
        </div>
      </main>
      <CallToAction />
    </div>
  );
};

export default ServicesOverview;