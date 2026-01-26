import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Filter, X } from 'lucide-react';
import SEO from '@/components/common/SEO';
import { allIndustries } from '../data/industriesData';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from '@/providers/ThemeProvider';
import HolographicCard from '../components/HolographicCard';
import Layout from "@/components/layout/Layout";
import ConsistentPageHeader from '@/components/layout/ConsistentPageHeader';
import { motion, AnimatePresence } from 'framer-motion';

// Optimized Image Component
const OptimizedIndustryImage = ({
  src,
  alt,
  className = "",
}: {
  src?: string;
  alt: string;
  className?: string;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Optimize images with responsive parameters
  const optimizedSrc = React.useMemo(() => {
    if (!src) return '/placeholder.svg';

    // Handle Cloudinary images
    if (src.includes('cloudinary.com')) {
      const width = isMobile ? 400 : 600;
      const quality = isMobile ? 'q_auto:eco' : 'q_auto:good';

      if (src.includes('/upload/')) {
        return src.replace('/upload/', `/upload/${quality},w_${width},f_auto,c_fill/`);
      }
    }

    // Optimize Unsplash images
    if (src.includes('unsplash.com')) {
      const url = new URL(src);
      url.searchParams.set('q', isMobile ? '60' : '70');
      url.searchParams.set('fit', 'crop');
      url.searchParams.set('w', isMobile ? '400' : '600');
      url.searchParams.set('h', isMobile ? '200' : '300');
      return url.toString();
    }

    // Handle placeholder images
    if (src.includes('placeholder.svg')) {
      return `data:image/svg+xml;base64,${btoa(`
        <svg width="${isMobile ? 400 : 600}" height="${isMobile ? 200 : 300}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#4f46e5;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad)"/>
          <text x="50%" y="50%" font-family="Arial" font-size="14" fill="white" text-anchor="middle" dy=".3em">${alt}</text>
        </svg>
      `)}`;
    }

    return src;
  }, [src, isMobile, alt]);

  return (
    <div className="relative h-48 w-full overflow-hidden">
      {/* Loading Skeleton */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse" />
      )}

      {/* Error Fallback */}
      {imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-white text-sm font-medium text-center px-2">{alt}</span>
        </div>
      )}

      {/* Optimized Image */}
      <img
        src={optimizedSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent dark:from-black/60" />
    </div>
  );
};

export default function Industries() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');


  const getCategories = () => {
    const categories = allIndustries.map(industry => {
      const categoryMap: { [key: string]: string } = {
        'it-cloud': 'Technology',
        'finance': 'Finance',
        'healthcare': 'Healthcare',
        'education': 'Education',
        'manufacturing': 'Manufacturing',
        'retail': 'Retail',
        'restaurants': 'Hospitality',
        'real-estate': 'Real Estate',
        'transport': 'Transport',
        'agriculture': 'Agriculture',
        'legal': 'Professional',
        'marketing': 'Marketing',
        'startups': 'Startups'
      };
      return categoryMap[industry.id] || 'Other';
    });

    return ['All', ...Array.from(new Set(categories))];
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setActiveCategory('All');
  };

  const getIndustryCategory = (industryId: string) => {
    const categoryMap: { [key: string]: string } = {
      'it-cloud': 'Technology', 'finance': 'Finance', 'healthcare': 'Healthcare',
      'education': 'Education', 'manufacturing': 'Manufacturing', 'retail': 'Retail',
      'restaurants': 'Hospitality', 'real-estate': 'Real Estate', 'transport': 'Transport',
      'agriculture': 'Agriculture', 'legal': 'Professional', 'marketing': 'Marketing',
      'startups': 'Startups'
    };
    return categoryMap[industryId] || 'Other';
  };

  const filteredIndustries = allIndustries
    .filter(industry => {
      const categoryMatch = activeCategory === 'All' || getIndustryCategory(industry.id) === activeCategory;
      const searchMatch = searchTerm === '' ||
        industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (industry.description && industry.description.toLowerCase().includes(searchTerm.toLowerCase()));
      return categoryMatch && searchMatch;
    });

  const categories = getCategories();

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
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <ConsistentPageHeader
        title="Explore Industries"
        description="Discover our tailored solutions for a wide range of industries. We bring specialized knowledge and proven methodologies to sectors that are shaping the future."
        categoryLabel="Our Industries"
        backgroundImage="https://res.cloudinary.com/dsf4d41i8/image/upload/v1753058194/bi1_resvzt.png"
      />

      <div className="min-h-screen py-5 md:py-10">

        {/* SEO Meta Tags */}
        {/* SEO Meta Tags */}
        <SEO
          title="Industries We Serve"
          description="We provide tailored business and data solutions for industries including Technology, Finance, Healthcare, Retail, Manufacturing, Education, and more."
          keywords="industry solutions, technology sector, finance industry, healthcare solutions, retail business, manufacturing data, education technology, industry expertise"
          url="https://businessanddatasolutions.com/industries"
          image="https://yourcompany.com/og-image-industries.png"
        />

        <div className="container mx-auto px-4 py-8 md:py-16 bg-white shadow-lg rounded-xl dark:bg-black dark:text-gray-100 min-h-screen">


          {/* Filter Section */}
          <motion.div
            className="mb-8 md:mb-12 rounded-xl dark:bg-black dark:text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <label htmlFor="industry-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Search Industries
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  <Input
                    id="industry-search"
                    type="text"
                    placeholder="Search by industry name or description..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="pl-10 pr-10 dark:text-white text-sm md:text-base"
                  />
                  {searchTerm && (
                    <button
                      onClick={handleClearSearch}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories Dropdown */}
              <div className="flex-1">
                <label htmlFor="industry-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Filter by Category
                </label>
                <Select value={activeCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger id="industry-category" className="dark:bg-gray-900 dark:text-gray-100 text-sm md:text-base">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700 max-h-60">
                    {categories.map(category => (
                      <SelectItem key={category} value={category} className="text-sm">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters Button */}
              <AnimatePresence>
                {(searchTerm || activeCategory !== 'All') && (
                  <motion.div
                    className="md:flex md:items-end"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <button
                      onClick={handleClearFilters}
                      className="text-sm flex items-center font-medium text-blue-500 hover:text-blue-700 h-10 transition-colors"
                    >
                      Clear all filters <X className="ml-1 h-3 w-3" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Results count */}
            <AnimatePresence>
              {(searchTerm || activeCategory !== 'All') && (
                <motion.div
                  className="mt-4 pt-4 border-t dark:border-gray-700 border-gray-200"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Showing {filteredIndustries.length} {filteredIndustries.length === 1 ? 'industry' : 'industries'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Industries Grid */}
          <div className="p-2 md:p-4">
            <AnimatePresence mode="wait">
              {filteredIndustries.length > 0 ? (
                <motion.div
                  key="industries-grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                >
                  {filteredIndustries.map((industry, index) => (
                    <motion.div
                      key={industry.id}
                      variants={itemVariants}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        to={`/industries/${industry.id}`}
                        className="group block h-full"
                      >
                        <HolographicCard className="h-full flex flex-col transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 rounded-xl overflow-hidden">
                          {/* Optimized Image */}
                          <OptimizedIndustryImage
                            src={industry.imageUrl}
                            alt={industry.name}
                          />

                          {/* Content */}
                          <div className="p-4 md:p-6 flex-1 flex flex-col">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                              {industry.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300 mb-3 md:mb-4 line-clamp-3 text-sm leading-relaxed">
                              {industry.description}
                            </p>
                            <div className="mt-auto flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors duration-300 font-medium text-sm">
                              Learn More
                              <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </div>
                          </div>
                        </HolographicCard>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center p-8 md:p-12 text-center border rounded-xl border-gray-200 dark:border-gray-700"
                >
                  <Filter className="h-8 w-8 md:h-12 md:w-12 text-gray-400 mb-3 md:mb-4" />
                  <h3 className="text-base md:text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No industries found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm md:text-base">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="text-sm flex items-center font-medium text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    Clear all filters <X className="ml-1 h-3 w-3" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact CTA */}
          <motion.div
            className="text-center mt-8 md:mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
              Can't find what you're looking for?{' '}
              <Link to="/contact" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                Contact us
              </Link>{' '}
              for custom solutions.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
