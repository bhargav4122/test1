import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Search, Filter, X, TrendingUp, BarChart3, Shield, Zap,
  ChevronRight, Sparkles, Globe, Target, Award, Clock, Users, Star,
  Building, Cpu, DollarSign, Heart, GraduationCap, Factory, ShoppingBag,
  Home, Truck, Trees, Scale, Megaphone, Rocket, SlidersHorizontal,
  Check, ChevronDown, Grid, List, XCircle, Menu, ChevronLeft
} from 'lucide-react';
import SEO from '@/components/common/SEO';
import { allIndustries } from '../data/industriesData';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HolographicCard from '../components/HolographicCard';
import ConsistentPageHeader from '@/components/layout/ConsistentPageHeader';
import { motion, AnimatePresence, useInView, PanInfo } from 'framer-motion';

// Optimized Image Component for Mobile & Desktop
const PremiumIndustryImage = ({
  src,
  alt,
  industryName,
  industryId,
  isMobile = false
}: {
  src?: string;
  alt: string;
  industryName: string;
  industryId: string;
  isMobile?: boolean;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isMobile) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 15;
    const y = ((e.clientY - top) / height - 0.5) * 15;

    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const getOptimizedImage = (imageSrc: string) => {
    if (!imageSrc) return '';

    if (imageSrc.includes('cloudinary.com')) {
      const width = isMobile ? 400 : 600;
      const height = isMobile ? 200 : 300;
      return imageSrc.replace(
        '/upload/',
        `/upload/q_auto:best,w_${width},h_${height},c_fill,g_auto,f_auto/`
      );
    }

    return imageSrc;
  };

  const optimizedSrc = getOptimizedImage(src || '');

  return (
    <div
      ref={containerRef}
      className={`relative ${isMobile ? 'h-40' : 'h-56 md:h-64'} w-full overflow-hidden rounded-t-xl group`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />

      {/* Main Image with Parallax (desktop only) */}
      {optimizedSrc && (
        <motion.img
          src={optimizedSrc}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'
            } ${!isMobile ? 'group-hover:scale-105' : ''}`}
          style={!isMobile ? {
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1.05)`,
          } : {}}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      )}

      {/* Loading Skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 animate-pulse" />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

      {/* Industry Badge */}
      <div className="absolute top-4 left-4 z-20">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-800 dark:text-gray-200">
          <TrendingUp className="w-3 h-3 mr-1" />
          {industryName.split(' ')[0]}
        </span>
      </div>

      {/* Industry Name */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <h3 className="text-lg md:text-xl font-bold text-white drop-shadow-lg line-clamp-2">
          {industryName}
        </h3>
      </div>
    </div>
  );
};

// Mobile Filter Sheet (Bottom Drawer)
const MobileFilterSheet = ({
  isOpen,
  onClose,
  categories,
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  onClearFilters
}: {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClearFilters: () => void;
}) => {
  const [searchInput, setSearchInput] = useState(searchTerm);
  const sheetRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.y > 100) {
      onClose();
    }
  };

  const handleApply = () => {
    onSearchChange(searchInput);
    onClose();
  };

  const handleReset = () => {
    setSearchInput('');
    onClearFilters();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />

          {/* Filter Sheet */}
          <motion.div
            ref={sheetRef}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-2xl shadow-2xl z-50 max-h-[85vh] overflow-hidden md:hidden"
          >
            {/* Drag Handle */}
            <div className="flex justify-center py-3">
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-6 pb-4 border-b dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Filter className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Filter Industries</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Refine your search</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Close filter"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-4 overflow-y-auto max-h-[calc(85vh-180px)]">
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search Industries
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Type industry name or keyword..."
                    className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                  {searchInput && (
                    <button
                      onClick={() => setSearchInput('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Filter by Category
                  </label>
                  <span className="text-xs text-gray-500">
                    {categories.length} categories
                  </span>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => onCategoryChange(category)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${activeCategory === category
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-700'
                          : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                    >
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {category}
                      </span>
                      {activeCategory === category && (
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Filters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Popular Industries
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Technology', 'Finance', 'Healthcare', 'Retail', 'Startups', 'Education'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        onCategoryChange(tag);
                        setSearchInput('');
                        onClose();
                      }}
                      className="px-3 py-1.5 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t dark:border-gray-700">
              <div className="flex gap-3">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="flex-1 py-3 rounded-xl"
                >
                  Clear All
                </Button>
                <Button
                  onClick={handleApply}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Mobile Filter Bar (Top Bar)
const MobileFilterBar = ({
  onFilterOpen,
  activeCategory,
  searchTerm,
  filteredCount,
  totalCount,
  onClearFilters
}: {
  onFilterOpen: () => void;
  activeCategory: string;
  searchTerm: string;
  filteredCount: number;
  totalCount: number;
  onClearFilters: () => void;
}) => {
  return (
    <div className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b dark:border-gray-700 py-3 px-4 md:hidden">
      <div className="flex items-center justify-between">
        {/* Filter button */}
        <button
          onClick={onFilterOpen}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Open filters"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="text-sm font-medium">Filter</span>
          {(activeCategory !== 'All' || searchTerm) && (
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          )}
        </button>

        {/* Results count */}
        <div className="text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {filteredCount} of {totalCount}
          </div>
        </div>

        {/* Clear button */}
        {(activeCategory !== 'All' || searchTerm) && (
          <button
            onClick={onClearFilters}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Clear all filters"
          >
            <XCircle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Active filters chips */}
      <AnimatePresence>
        {(activeCategory !== 'All' || searchTerm) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2 mt-3 pt-3 border-t dark:border-gray-700"
          >
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                Search: {searchTerm}
                <button
                  onClick={() => {/* Add clear search handler */ }}
                  aria-label="Remove search filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {activeCategory !== 'All' && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full">
                Category: {activeCategory}
                <button
                  onClick={() => {/* Add clear category handler */ }}
                  aria-label="Remove category filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Desktop Premium Filter (Original)
const DesktopPremiumFilter = ({
  categories,
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  onClearSearch,
  onClearFilters
}: {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onClearFilters: () => void;
}) => {
  return (
    <div className="hidden md:block space-y-6 mb-10">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search industries by name, keyword, or description..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 pr-12 h-14 text-base rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-sm"
          aria-label="Search industries"
        />
        {searchTerm && (
          <button
            onClick={onClearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
            aria-label="Clear search"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Categories Filter */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Browse by Category
          </h3>
          <AnimatePresence>
            {(activeCategory !== 'All' || searchTerm) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={onClearFilters}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Clear all filters
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Active Filters */}
      <AnimatePresence>
        {(activeCategory !== 'All' || searchTerm) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-4 border-t dark:border-gray-700"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Active filters:
              </span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                  Search: {searchTerm}
                  <button onClick={onClearSearch} aria-label="Remove search">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {activeCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full">
                  Category: {activeCategory}
                  <button onClick={() => onCategoryChange('All')} aria-label="Remove category">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main Component
export default function Industries() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Get categories
  const getCategories = useMemo(() => {
    const categories = allIndustries.map(industry => {
      const categoryMap: { [key: string]: string } = {
        'it-cloud': 'Technology & Cloud',
        'finance': 'Finance & Banking',
        'healthcare': 'Healthcare',
        'education': 'Education',
        'manufacturing': 'Manufacturing',
        'retail': 'Retail & E-commerce',
        'restaurants': 'Hospitality',
        'real-estate': 'Real Estate',
        'transport': 'Transport & Logistics',
        'agriculture': 'Agriculture',
        'legal': 'Professional Services',
        'marketing': 'Marketing & Media',
        'startups': 'Startups & SMBs'
      };
      return categoryMap[industry.id] || 'Other';
    });
    return ['All', ...Array.from(new Set(categories))];
  }, []);

  // Handlers
  const handleCategoryChange = useCallback((category: string) => {
    setIsLoading(true);
    setActiveCategory(category);
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setIsLoading(true);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchTerm('');
    setActiveCategory('All');
    setMobileFilterOpen(false);
  }, []);

  const getIndustryCategory = useCallback((industryId: string) => {
    const categoryMap: { [key: string]: string } = {
      'it-cloud': 'Technology & Cloud',
      'finance': 'Finance & Banking',
      'healthcare': 'Healthcare',
      'education': 'Education',
      'manufacturing': 'Manufacturing',
      'retail': 'Retail & E-commerce',
      'restaurants': 'Hospitality',
      'real-estate': 'Real Estate',
      'transport': 'Transport & Logistics',
      'agriculture': 'Agriculture',
      'legal': 'Professional Services',
      'marketing': 'Marketing & Media',
      'startups': 'Startups & SMBs'
    };
    return categoryMap[industryId] || 'Other';
  }, []);

  // Filter industries
  const filteredIndustries = useMemo(() => {
    setIsLoading(false);
    return allIndustries.filter(industry => {
      const categoryMatch = activeCategory === 'All' || getIndustryCategory(industry.id) === activeCategory;
      const searchMatch = debouncedSearchTerm === '' ||
        industry.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        (industry.description && industry.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, debouncedSearchTerm, getIndustryCategory]);

  return (
    <>
      <SEO
        title="Industry Solutions | Business & Data Solutions"
        description="Expert business and data solutions for all industries. Discover tailored solutions with premium features."
        keywords="industry solutions, business solutions, data analytics, industry expertise"
        url="/industries"
      />

      <ConsistentPageHeader
        title="Industry Solutions"
        description="Premium solutions for every industry. Discover tailored business and data solutions with cutting-edge technology."
        categoryLabel="Our Industries"
        backgroundImage="https://res.cloudinary.com/dsf4d41i8/image/upload/v1753058194/bi1_resvzt.png"
        ctaText="Get Custom Solutions"
        ctaLink="/contact"
        premium
      />

      {/* Mobile Filter Bar */}
      <MobileFilterBar
        onFilterOpen={() => setMobileFilterOpen(true)}
        activeCategory={activeCategory}
        searchTerm={searchTerm}
        filteredCount={filteredIndustries.length}
        totalCount={allIndustries.length}
        onClearFilters={handleClearFilters}
      />

      {/* Mobile Filter Sheet */}
      <MobileFilterSheet
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        categories={getCategories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onClearFilters={handleClearFilters}
      />

      <div className="min-h-screen py-4 md:py-8">
        <div className="container mx-auto px-4">
          {/* Desktop Filters */}
          <DesktopPremiumFilter
            categories={getCategories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onClearSearch={handleClearSearch}
            onClearFilters={handleClearFilters}
          />

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                Industry Solutions
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {filteredIndustries.length} of {allIndustries.length} industries
              </p>
            </div>

            {/* Mobile View Toggle */}
            <div className="md:hidden">
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid'
                      ? 'bg-white dark:bg-gray-700 shadow-sm'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list'
                      ? 'bg-white dark:bg-gray-700 shadow-sm'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-3 border-gray-300 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin" />
            </div>
          )}

          {/* Industries Grid/List */}
          {!isLoading && filteredIndustries.length > 0 && (
            <div ref={containerRef}>
              {/* Mobile List View */}
              {viewMode === 'list' && (
                <div className="space-y-3 md:hidden">
                  {filteredIndustries.map((industry) => (
                    <Link
                      key={industry.id}
                      to={`/industries/${industry.id}`}
                      className="block bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden active:scale-[0.98] transition-transform"
                    >
                      <div className="flex">
                        {/* Image Section */}
                        <div className="w-1/3 relative">
                          <PremiumIndustryImage
                            src={industry.imageUrl}
                            alt={industry.name}
                            industryName={industry.name}
                            industryId={industry.id}
                            isMobile={true}
                          />
                        </div>

                        {/* Content Section */}
                        <div className="w-2/3 p-4">
                          <div className="mb-2">
                            <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                              {getIndustryCategory(industry.id)}
                            </span>
                          </div>

                          <h3 className="font-bold text-gray-900 dark:text-white mb-1.5 line-clamp-1">
                            {industry.name}
                          </h3>

                          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                            {industry.description}
                          </p>

                          <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                            View Details
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Grid View (Mobile & Desktop) */}
              {(viewMode === 'grid' || window.innerWidth >= 768) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                >
                  {filteredIndustries.map((industry) => (
                    <motion.div
                      key={industry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        to={`/industries/${industry.id}`}
                        className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-2xl"
                      >
                        <HolographicCard className="h-full flex flex-col transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 rounded-2xl overflow-hidden">
                          {/* Premium Image */}
                          <PremiumIndustryImage
                            src={industry.imageUrl}
                            alt={industry.name}
                            industryName={industry.name}
                            industryId={industry.id}
                          />

                          {/* Content */}
                          <div className="p-4 md:p-6 flex-1 flex flex-col">
                            <div className="mb-3">
                              <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                                {getIndustryCategory(industry.id)}
                              </span>
                            </div>

                            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                              {industry.name}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300 mb-4 line-clamp-3 text-sm leading-relaxed flex-1">
                              {industry.description}
                            </p>

                            <div className="mt-auto flex items-center justify-between">
                              <span className="inline-flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 font-semibold text-sm transition-colors">
                                Learn More
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 hidden md:inline">
                                Premium Solution
                              </span>
                            </div>
                          </div>
                        </HolographicCard>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          )}

          {/* No Results */}
          {!isLoading && filteredIndustries.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No industries found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Try adjusting your filters or search terms to find what you're looking for.
              </p>
              <Button
                onClick={handleClearFilters}
                variant="outline"
                className="mx-auto"
              >
                Clear All Filters
              </Button>
            </motion.div>
          )}

          {/* Premium CTA */}
          <motion.div
            className="mt-12 pt-8 border-t dark:border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Premium Solutions
                </span>
                <Sparkles className="w-5 h-5 text-yellow-500" />
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Need Custom Industry Solutions?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We specialize in creating tailored solutions for unique business challenges across all industries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                  <Link to="/contact" className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Request Custom Solution
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-xl">
                  <Link to="/case-studies" className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    View Case Studies
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Floating Filter Button */}
      <button
        onClick={() => setMobileFilterOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl flex items-center justify-center md:hidden z-40"
        aria-label="Open filters"
      >
        <Filter className="w-6 h-6 text-white" />
        {(activeCategory !== 'All' || searchTerm) && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-white animate-pulse" />
        )}
      </button>
    </>
  );
}
