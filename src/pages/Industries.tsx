import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Filter, X } from 'lucide-react';

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

export default function Industries() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { theme } = useTheme();

  const getCategories = () => {
    const categories = allIndustries.map(industry => {
      if (industry.id === 'it-cloud') return 'Technology';
      if (industry.id === 'finance') return 'Finance';
      if (industry.id === 'healthcare') return 'Healthcare';
      if (industry.id === 'education') return 'Education';
      if (industry.id === 'manufacturing') return 'Manufacturing';
      if (industry.id === 'retail') return 'Retail';
      if (industry.id === 'restaurants') return 'Hospitality';
      if (industry.id === 'real-estate') return 'Real Estate';
      if (industry.id === 'transport') return 'Transport';
      if (industry.id === 'agriculture') return 'Agriculture';
      if (industry.id === 'legal') return 'Professional';
      if (industry.id === 'marketing') return 'Marketing';
      if (industry.id === 'startups') return 'Startups';
      return 'Other';
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

  return (
    <div className="min-h-screen py-5 md:py-10">
   
      <div className="container mx-auto px-4 py-16 bg-white shadow-lg rounded-xl dark:bg-black dark:text-gray-100 min-h-screen">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4 text-gray-900 dark:text-white">
            Explore Industries
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Discover our tailored solutions for a wide range of industries.
          </p>
        </div>

        {/* Filter Section - Now at the top */}
        <div className="mb-12 rounded-xl dark:bg-black dark:text-gray-100">
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
                  className="pl-10 pr-10 dark:text-white"
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
                <SelectTrigger id="industry-category" className="dark:bg-gray-900  dark:text-gray-100">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters Button - Only shown when filters are active */}
            {(searchTerm || activeCategory !== 'All') && (
              <div className="md:flex md:items-end">
                <button
                  onClick={handleClearFilters}
                  className="text-sm flex items-center font-medium text-blue-500 hover:text-blue-700 h-10"
                >
                  Clear all filters <X className="ml-1 h-3 w-3" />
                </button>
              </div>
            )}
          </div>

          {/* Results count - shown only when filters are active */}
          {(searchTerm || activeCategory !== 'All') && (
            <div className="mt-4 pt-4 border-t dark:border-gray-700 border-gray-200">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Showing {filteredIndustries.length} {filteredIndustries.length === 1 ? 'industry' : 'industries'}
              </span>
            </div>
          )}
        </div>

     {/* Industries Grid */}
<div className="p-4 md:p-8">
  {filteredIndustries.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredIndustries.map((industry) => (
        <Link
          to={`/industries/${industry.id}`}
          key={industry.id}
          className="group block h-full"
        >
          <HolographicCard className="h-full flex flex-col transition-all duration-300 hover:transform hover:scale-[1.02] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg rounded-xl overflow-hidden">
            {/* Image Container */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={industry.imageUrl || `/placeholder.svg`}
                alt={industry.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent dark:from-black/50" />
            </div>
            
            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {industry.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300 mb-4 line-clamp-3">
                {industry.description}
              </p>
              <div className="mt-auto flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors duration-300 font-medium">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </HolographicCard>
        </Link>
      ))}
    </div>

          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center border rounded-xl border-gray-200 dark:border-gray-700">
              <Filter className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No industries found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
              <button
                onClick={handleClearFilters}
                className="text-sm flex items-center font-medium text-blue-500 hover:text-blue-700"
              >
                Clear all filters <X className="ml-1 h-3 w-3" />
              </button>
            </div>
          )}
        </div>
        
        {/* Contact CTA */}
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Can't find what you're looking for? <Link to="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact us</Link> for custom solutions.
          </p>
        </div>
      </div>
      
    </div>
  );
}