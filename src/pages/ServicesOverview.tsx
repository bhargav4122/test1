import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
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
  
  const tabs = [
    { id: 'all', label: '🌟 All Services' },
    { id: 'active', label: '✅ Active Services' },
    { id: 'pilot', label: '🚀 Pilot Services' },
    { id: 'development', label: '🧪 In Development' },
    { id: 'upcoming', label: '🔜 Upcoming Services' },
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
    <div className="min-h-screen py-20">
      <main className="container mx-auto px-4 py-12 max-w-6xl padding">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4 dark:text-white text-gray-900">
            Explore Our Services
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Empowering your business with cutting-edge solutions tailored to your needs.
          </p>
        </section>

        {/* Service Tabs */}
        <div className="max-w-4xl mx-auto mb-8 overflow-x-auto">
          <div className="flex space-x-2 md:space-x-4 min-w-max p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ServiceStatus)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple from-bds-purple to-bds-accent text shadow-md'
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
        </div>
        
        <div className="mb-12">
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400">
                No services found in this category
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      className={`relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-gray-100 dark:border-gray-700 transition-all duration-300 flex flex-col h-full ${
                        isExpanded ? 'shadow-2xl transform -translate-y-2' : ''
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
                            <span className="text-white text-lg font-medium">No Image</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 dark:to-gray-900/90" />
                      </motion.div>

                      {/* Content Section */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            {IconComponent && (
                              <motion.div 
                                whileHover={{ scale: 1.1 }}
                                className="p-2 rounded-lg bg-gradient-to-br from-bds-purple to-bds-accent text-white"
                              >
                                {React.createElement(IconComponent, { size: 24 })}
                              </motion.div>
                            )}
                            <h3 className="text-xl font-bold text-bds-blue dark:text-white">
                              {service.title}
                            </h3>
                          </div>
                          {service.stage && (
                            <span className={`text-xs px-3 py-1 rounded-full text-white ${
                              statusColors[service.stage] || 'bg-gray-500'
                            }`}>
                              {statusLabels[service.stage] || service.stage}
                            </span>
                          )}
                        </div>

                        <div className="flex-grow">
                          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">
                            {service.description}
                          </p>
                      
                          {service.stats && service.stats.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 mb-4">
                              {service.stats.map((stat, index) => (
                                <motion.div
                                  key={`stat-${index}`}
                                  whileHover={{ scale: 1.05 }}
                                  className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-center"
                                >
                                  <div className="text-lg font-bold text-blue-500 dark:text-blue-400">
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
                            <div className="mb-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                              <h4 className="font-semibold mb-2 text-bds-blue dark:text-white">
                                Services Include:
                              </h4>
                              <ul className="grid grid-cols-1 gap-2">
                                {service.subService.map((subService, index) => (
                                  <li key={index} className="flex items-center gap-2">
                                    <span className="text-xs text-white p-1 rounded-full bg-bds-purple">✓</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                      {subService}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="flex justify-between items-center pt-2">
                            <button
                              onClick={() => toggleServiceExpansion(service.path)}
                              className="flex items-center gap-2 text-bds-purple hover:text-bds-accent transition-colors"
                            >
                              <span>{isExpanded ? 'Hide details' : 'View details'}</span>
                              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                            
                            <Link
                              to={`/service-detail/${serviceId}`}
                              className="flex items-center gap-2 text-bds-purple hover:text-bds-accent transition-colors"
                            >
                              <span>Learn more</span>
                              <ArrowUpRight size={16} />
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