//fix the code and make it work for small and large screens text content was hidding for small screen at what we offer section make it device friendly

import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import SEO from '@/components/common/SEO';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ArrowUpRight,
  type LucideIcon
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { servicesDropdown } from "@/data/navigationData";
import { serviceDetails } from "@/data/serviceDetails";
import OptimizedImage from "@/components/core/OptimizedImage";
import { useTheme } from '@/providers/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { DropdownItem } from '@/types/navigation';
import Layout from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import ConsistentPageHeader from '@/components/layout/ConsistentPageHeader';
import {
  FadeUp,
  SlideInLeft,
  SlideInRight,
  StaggerContainer,
  StaggerItem
} from '@/components/motion/MotionWrapper';

// Lazy load heavy components
const CallToAction = lazy(() => import("@/components/home/CallToAction"));

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


// Detailed Service Section (BDS Style)
const DetailedServiceSection = React.memo(({
  service,
  index,
  theme
}: {
  service: DropdownItem;
  index: number;
  theme: string;
}) => {
  const serviceId = service.path.split('/').pop() || '';
  const detailedData = (serviceDetails as any)[serviceId];

  const getIconComponent = useCallback((icon: any) => {
    if (!icon) return Icons.Activity;
    // If it's a string (icon name), look it up in the Icons object
    if (typeof icon === 'string') {
      const iconName = icon.charAt(0).toUpperCase() + icon.slice(1);
      return (Icons as any)[iconName] || Icons.Activity;
    }
    // If it's already a component/function/object, return it directly
    return icon;
  }, []);

  const IconComponent = getIconComponent(service.icon);
  const isEven = index % 2 === 0;

  // Features from detailed data subservices or benefits
  const features = useMemo(() => {
    if (detailedData?.subServices) {
      return detailedData.subServices
        .map((ss: any) => ss?.title?.replace(/^[0-9️⃣\s]+/, '') || '')
        .filter(Boolean);
    }
    if (detailedData?.benefits) {
      return detailedData.benefits
        .slice(0, 6)
        .map((b: any) =>
          typeof b === 'string'
            ? b.replace(/^[\w\s🚀📈🛠️🔐⚡🤖💰🔒🌐📊🔍🔄📱🔗🛡️📉]+/, '').trim()
            : String(b || '')
        )
        .filter(Boolean);
    }
    return [service.description2 || service.description || ''];
  }, [detailedData, service]);

  return (
    <div className="py-5 md:py-10 lg:py-15 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className={`flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>

        {/* Content Side */}
        <div className={`w-full ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          {isEven ? (
            <SlideInLeft className="space-y-4 md:space-y-6">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center mb-4 md:mb-6">
                <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 text-white ${statusColors[service.stage] || 'bg-gray-500'}`}>
                  {statusLabels[service.stage] || service.stage}
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 leading-tight">
                  {service.title}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
                {detailedData?.subtitle || service.description}
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-4">
                {service.servicePageContent || service.description2}
              </p>
              <div className="pt-4">
                <Link to={`/service-detail/${serviceId}`}>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold group"
                  >
                   
                  
                  </motion.button>
                </Link>
              </div>
            </SlideInLeft>
          ) : (
            <SlideInRight className="space-y-4 md:space-y-6">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center mb-4 md:mb-6">
                <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 text-white ${statusColors[service.stage] || 'bg-gray-500'}`}>
                  {statusLabels[service.stage] || service.stage}
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 leading-tight">
                  {service.title}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
                {detailedData?.subtitle || service.description}
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-4">
                {service.servicePageContent || service.description2}
              </p>
              <div className="pt-4">
                <Link to={`/service-detail/${serviceId}`}>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold group"
                  >
                    <span>Explore Service</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </Link>
              </div>
            </SlideInRight>
          )}
        </div>

        {/* Features/Image Side */}
        <div className={`w-full ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl group border border-gray-100 dark:border-gray-800">
            <div className="aspect-[4/3]">
              <OptimizedImage
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />

            {/* What We Offer Section - Fixed for Mobile */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 bg-gradient-to-t from-gray-900/95 via-gray-900/80 to-transparent backdrop-blur-sm">
              <h4 className="text-white font-bold mb-3 md:mb-4 flex items-center gap-2 text-base md:text-lg">
                <CheckCircle className="text-blue-400" size={18} />
                What We Offer
              </h4>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 md:gap-3">
                {features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                    <span className="text-white/90 text-xs xs:text-sm font-medium leading-tight md:leading-normal line-clamp-2">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

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
  <div className="md:hidden relative px-4">
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={(e) => {
        e.stopPropagation();
        setShowMobileMenu(!showMobileMenu);
      }}
      className={`w-full flex justify-between items-center px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl text-sm font-bold ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
        } border-2 border-gray-100 dark:border-gray-700 shadow-lg`}
    >
      <span className="flex items-center gap-2">
        {tabs.find(t => t.id === activeTab)?.shortLabel}
      </span>
      <ChevronDown className={`transition-transform duration-300 ${showMobileMenu ? 'rotate-180' : ''}`} size={18} />
    </motion.button>

    <AnimatePresence>
      {showMobileMenu && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute z-50 w-full left-0 mt-2 rounded-xl md:rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700"
        >
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} py-1 md:py-2`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as ServiceStatus);
                  setShowMobileMenu(false);
                }}
                className={`w-full text-left px-4 py-3 md:px-6 md:py-4 transition-colors text-sm font-medium ${activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : theme === 'dark'
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-blue-50 text-gray-700'
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
  <div className="hidden md:flex flex-wrap gap-2 md:gap-3 justify-center mt-2 md:mt-1 mb-6 md:mb-1 px-2">
    {tabs.map((tab) => (
      <motion.button
        key={tab.id}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveTab(tab.id as ServiceStatus)}
        className={`px-4 py-2 md:px-6 md:py-3 rounded-full transition-all text-xs md:text-sm font-bold border ${activeTab === tab.id
          ? 'bg-blue-600 border-blue-600 text-white shadow-lg md:shadow-xl shadow-blue-500/20'
          : `${theme === 'dark'
            ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-blue-500'
            : 'bg-white border-gray-100 text-gray-700 hover:border-blue-500 shadow-sm md:shadow-md'
          }`
          }`}
      >
        {tab.label}
      </motion.button>
    ))}
  </div>
));

const ServicesOverview: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<ServiceStatus>('all');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const filteredServices = useMemo(() => {
    if (activeTab === 'all') return servicesDropdown;
    return servicesDropdown.filter(service => service.stage === activeTab);
  }, [activeTab]);

  const tabs = useMemo(() => [
    { id: 'all', label: '🌟 All Services', shortLabel: '🌟 All' },
    { id: 'active', label: '✅ Active', shortLabel: '✅ Active' },
    { id: 'pilot', label: '🚀 Pilots', shortLabel: '🚀 Pilots' },
    { id: 'development', label: '🧪 In Dev', shortLabel: '🧪 Dev' },
    { id: 'upcoming', label: '🔜 Upcoming', shortLabel: '🔜 Upcoming' },
  ], []);

  useEffect(() => {
    const handleClickOutside = () => {
      if (showMobileMenu) setShowMobileMenu(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMobileMenu]);

  return (
    <>
      <SEO
        title="Our Services"
        description="Explore our high-performance business and data services."
      />

      <ConsistentPageHeader
        title="Solutions for the Modern Enterprise"
        description="We combine deep industry expertise with cutting-edge technology to deliver measurable business outcomes."
        categoryLabel="Our Services"
        backgroundImage="https://res.cloudinary.com/dsf4d41i8/image/upload/v1753058194/bi1_resvzt.png"
      />

      <main className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8">

        {/* Centered Navigation */}
        <DesktopTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} />
        <MobileDropdown
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showMobileMenu={showMobileMenu}
          setShowMobileMenu={setShowMobileMenu}
          theme={theme}
        />

        {/* Alternating Services List */}
        <div className="mt-2 md:mt-2 mb-2 md:mb-2">
          <AnimatePresence mode="wait">
            {filteredServices.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 md:py-32"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <Icons.Search className="text-gray-400" size={24} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-500 dark:text-gray-400 mb-2">
                  No services found in this category
                </h3>
                <p className="text-gray-400 text-sm md:text-base">Please explore our other categories or check back later.</p>
              </motion.div>
            ) : (
              <div key={activeTab}>
                {filteredServices.map((service, index) => (
                  <DetailedServiceSection
                    key={service.path}
                    service={service}
                    index={index}
                    theme={theme}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Use Cases Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            "mb-16 md:mb-4 p-6 md:p-8 lg:p-12 rounded-2xl md:rounded-[2rem] border relative overflow-hidden group",
            theme === 'dark'
              ? "bg-gray-900/40 border-gray-800"
              : "bg-blue-50/50 border-blue-100"
          )}
        >
          <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Icons.Monitor size={120} className="hidden xs:block" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="max-w-2xl">
              <h3 className={cn(
                "text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4",
                theme === 'dark' ? "text-white" : "text-gray-900"
              )}>
                Strategic Implementation
              </h3>
              <p className={cn(
                "text-base md:text-lg mb-4 md:mb-6",
                theme === 'dark' ? "text-gray-200" : "text-gray-800"
              )}>
                Don't just take our word for it. See how we've applied these services to solve high-stakes challenges for global enterprises, startups, and public sector organizations.
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-blue-500" size={16} />
                  <span className="text-xs md:text-sm font-medium">Proven Results</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-blue-500" size={16} />
                  <span className="text-xs md:text-sm font-medium">Cross-Industry Expertise</span>
                </div>
              </div>
            </div>
            <Link
              to="/use-cases"
              className="px-6 py-3 md:px-8 md:py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25 whitespace-nowrap text-sm md:text-base"
            >
              Explore Solutions
            </Link>
          </div>
        </motion.div>

        {/* CTA Section */}
        <FadeUp className="mb-10 md:mb-12">
          <Suspense fallback={<div className="h-48 md:h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl md:rounded-3xl" />}>
            <CallToAction
              title="Ready to Transform Your Business?"
              description="Join hundreds of organizations that trust us with their critical data and digital strategies. Get started with a free consultation today."
            />
          </Suspense>
        </FadeUp>

        {/* Help Link */}
        <div className="text-center mb-12 md:mb-15">
          <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg">
            Looking for something specific?{' '}
            <Link to="/contact" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">
              Let's talk custom solutions
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default React.memo(ServicesOverview);
