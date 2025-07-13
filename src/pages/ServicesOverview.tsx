import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, ChevronUp, Menu } from 'lucide-react';
import * as Icons from 'lucide-react';
import { servicesDropdown } from "@/data/navigationData";
import { useTheme } from '@/providers/ThemeProvider';
import { motion } from 'framer-motion';
import { DropdownItem } from '@/types/navigation';
import CallToAction from "@/components/CallToAction";

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
  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({});
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const tabs = [
    { id: 'all', label: '🌟 All Services', shortLabel: '🌟 All' },
    { id: 'active', label: '✅ Active Services', shortLabel: '✅ Active' },
    { id: 'pilot', label: '🚀 Pilot Services', shortLabel: '🚀 Pilot' },
    { id: 'development', label: '🧪 In Development', shortLabel: '🧪 Dev' },
    { id: 'upcoming', label: '🔜 Upcoming Services', shortLabel: '🔜 Upcoming' },
  ];
  
  const filteredServices = getFilteredServices(activeTab);

  const toggleServiceExpansion = (serviceId: string) => {
    setExpandedServices(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

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
    <div className="min-h-screen py-10 md:py-20">
      <main className="container mx-auto px-4 sm:px-6 py-8 md:py-12 max-w-6xl">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4 dark:text-white text-gray-900">
            Explore Our Services
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
            Empowering your business with cutting-edge solutions tailored to your needs.
          </p>
        </section>

        {/* Service Tabs - Mobile friendly version */}
        <div className="mb-6 md:mb-8">
          {/* Desktop Tabs (hidden on mobile) */}
          <div className="hidden md:flex space-x-2 md:space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ServiceStatus)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-200 text-gray-900 shadow-md'
                    : `${
                        theme === 'dark' 
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      } border border-gray-200 dark:border-gray-700`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Mobile Dropdown (shown on mobile) */}
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
        
        {/* Rest of the component remains the same */}
        <div className="mb-8 md:mb-12">
          {filteredServices.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <h3 className="text-lg md:text-xl font-medium text-gray-500 dark:text-gray-400">
                No services found in this category
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredServices.map((service: DropdownItem) => {
                const serviceId = service.path.split('/').pop() || '';
                const isExpanded = expandedServices[service.path] || false;
                const IconComponent = getIconComponent(service.icon);
                
                return (
                  <motion.div
                    key={service.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="group"
                  >
                    <motion.div
                      className={`relative rounded-xl md:rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm md:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-gray-100 dark:border-gray-700 transition-all duration-300 flex flex-col h-full ${
                        isExpanded ? 'shadow-lg md:shadow-2xl transform -translate-y-1 md:-translate-y-2' : ''
                      }`}
                    >
                      {/* Image Section */}
                      <motion.div 
                        animate={floatAnimation} 
                        className="relative aspect-[4/3] overflow-hidden"
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

                      {/* Content Section */}
                      <div className="p-4 md:p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-3 md:mb-4">
                          <div className="flex items-center gap-2 md:gap-3">
                            {IconComponent && (
                              <motion.div 
                                whileHover={{ scale: 1.1 }}
                                className="p-1 md:p-2 rounded-lg bg-gradient-to-br from-bds-purple to-bds-accent text-white"
                              >
                                {React.createElement(IconComponent, { size: 20 })}
                              </motion.div>
                            )}
                            <h3 className="text-lg md:text-xl font-bold text-bds-blue dark:text-white">
                              {service.title}
                            </h3>
                          </div>
                          {service.stage && (
                            <span className={`text-xs px-2 md:px-3 py-1 rounded-full text-white ${
                              statusColors[service.stage] || 'bg-gray-500'
                            }`}>
                              {statusLabels[service.stage] || service.stage}
                            </span>
                          )}
                        </div>

                        <div className="flex-grow">
                          <p className="text-gray-600 dark:text-gray-300 mb-3 md:mb-4 text-xs md:text-sm line-clamp-3">
                            {service.description}
                          </p>
                      
                          {service.stats && service.stats.length > 0 && (
                            <div className="grid grid-cols-3 gap-1 md:gap-2 mb-3 md:mb-4">
                              {service.stats.map((stat, index) => (
                                <motion.div
                                  key={`stat-${index}`}
                                  whileHover={{ scale: 1.05 }}
                                  className="p-1 md:p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-center"
                                >
                                  <div className="text-base md:text-lg font-bold text-blue-500 dark:text-blue-400">
                                    {stat.value}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {stat.label}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="mt-auto">
                          {isExpanded && service.subService && (
                            <div className="mb-3 md:mb-4 pt-3 md:pt-4 border-t border-gray-200 dark:border-gray-700">
                              <h4 className="font-semibold mb-1 md:mb-2 text-bds-blue dark:text-white text-sm md:text-base">
                                Services Include:
                              </h4>
                              <ul className="grid grid-cols-1 gap-1 md:gap-2">
                                {service.subService.map((subService, index) => (
                                  <li key={index} className="flex items-center gap-2">
                                    <span className="text-xs text-white p-0.5 md:p-1 rounded-full bg-bds-purple">✓</span>
                                    <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                                      {subService}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="flex justify-between items-center pt-1 md:pt-2">
                            <button
                              onClick={() => toggleServiceExpansion(service.path)}
                              className="flex items-center gap-1 md:gap-2 text-bds-purple hover:text-bds-accent transition-colors text-xs md:text-sm"
                            >
                              <span>{isExpanded ? 'Hide details' : 'View details'}</span>
                              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                            
                            <Link
                              to={`/service-detail/${serviceId}`}
                              className="flex items-center gap-1 md:gap-2 text-bds-purple hover:text-bds-accent transition-colors text-xs md:text-sm"
                            >
                              <span>Learn more</span>
                              <ArrowUpRight size={14} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
        
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">
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