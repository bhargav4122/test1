
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Search, Filter, X } from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

export default function Industryy() {
  const { industryId } = useParams<{ industryId: string }>();
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();

  const getCategories = () => {
    const categories = allIndustries.map(industry => {
      // Extract category from industry ID
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
    
    return ['all', ...Array.from(new Set(categories.map(c => c.toLowerCase())))];
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategory('all');
  };

  const getCategoryDisplay = (cat: string) => {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  // Filter industries by both category and search term
  const filteredIndustries = allIndustries.filter(industry => {
    // Category filtering
    const categoryMatch = category === 'all' || 
      (industry.id.includes(category.toLowerCase()) || 
       getCategories().some(cat => cat === category && industry.id.includes(cat)));
    
    // Search term filtering
    const searchMatch = searchTerm === '' || 
      industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (industry.description && industry.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return categoryMatch && searchMatch;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-24 max-w-6xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold gradient-text mb-4">Explore Industries</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Discover our expertise across various sectors and industries.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="col-span-1">
            <div className="rounded-xl p-6 border shadow-sm 
                          bg-gray-50 border-gray-200 
                          dark:bg-gray-800/90 dark:border-gray-700">
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Industry Categories
              </h4>
              
              {/* Search Input */}
              <div className="mb-6 space-y-2">
                <label htmlFor="industry-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  <Input
                    id="industry-search"
                    type="text"
                    placeholder="Search industries..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="pl-10 pr-10 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
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
              
              {/* Categories Selection */}
              <div className="space-y-2">
                <label htmlFor="industry-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <Select value={category} onValueChange={handleCategoryChange}>
                  <SelectTrigger id="industry-category" className="dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100">
                    <SelectValue placeholder="Select a category">
                      {getCategoryDisplay(category)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    {getCategories().map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {getCategoryDisplay(cat)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Active Filters */}
              {(searchTerm || category !== 'all') && (
                <div className="mt-6 pt-4 border-t dark:border-gray-700 border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {filteredIndustries.length} {filteredIndustries.length === 1 ? 'industry' : 'industries'} found
                    </span>
                    <button
                      onClick={handleClearFilters}
                      className="text-sm flex items-center font-medium text-blue-500 hover:text-blue-700"
                    >
                      Clear filters <X className="ml-1 h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            {filteredIndustries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredIndustries.map((industry) => (
                  <Link
                    to={`/industries/${industry.id}`}
                    key={industry.id}
                    className="group"
                  >
                    <div className="relative border rounded-xl overflow-hidden h-full transition-all duration-300
                                  border-gray-200 bg-white hover:border-blue-500/50 hover:bg-blue-50/50
                                  dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-blue-500/30 dark:hover:bg-gray-700/50">
                      {/* Image */}
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={industry.imageUrl || `/placeholder.svg`} 
                          alt={industry.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 dark:to-gray-900/90" />
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 relative z-10">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                          {industry.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors duration-300 mb-4">
                          {industry.description}
                        </p>
                        <div className="flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors duration-300">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center border rounded-xl border-gray-200 dark:border-gray-700">
                <Filter className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No industries found</h3>
                <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
        
        <section className="text-center">
          <h2 className="text-3xl font-bold gradient-text mb-6">
            Ready to Transform Your Industry?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
            Contact us today to discuss your specific needs and challenges.
          </p>
          <button className="btn-future">
            Schedule a Consultation
          </button>
        </section>
      </main>
      
    </div>
  );
}