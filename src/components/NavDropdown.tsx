import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ExternalLink, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils"; // Add this import
import { motion, AnimatePresence } from 'framer-motion';


// Define interfaces based on your navigationData structure
interface DropdownItem {
  title: string;
  path: string;
  description?: string;
  isNew?: boolean;
  isComingSoon?: boolean;
  icon?: LucideIcon;
  stage?: 'active' | 'upcoming' | 'development' | 'pilot' ;
  releaseDate?: string;
  type?: 'separator';
  label?: string;
   imageUrl?: string;
  stats?: {
    value: string;
    label: string;
  }[];
  features?: string[];
  subServices?: string[];
}

interface NavDropdownProps {
  title: string;
  items: DropdownItem[];
}

// Helper functions (adapt colors if needed or remove if not used)
const getQuarterColor = (releaseDate: string) => {
  if (releaseDate.includes('Q2')) return 'bg-emerald-500/20 text-emerald-400';
  if (releaseDate.includes('Q3')) return 'bg-amber-500/20 text-amber-400';
  if (releaseDate.includes('Q4')) return 'bg-purple-500/20 text-purple-400';
  return 'bg-blue-500/20 text-blue-400';
};

// Update the getStageColor function
const getStageColor = (stage?: string) => {
  if (stage === 'development') return 'bg-emerald-900/30 border-emerald-500/30';
   if (stage === 'pilot') return 'bg-blue-900/30 border-blue-500/30';
   if (stage === 'upcoming') return 'bg-amber-900/30 border-amber-500/30';
  return 'border-border'; // Use theme variable
};


export default function NavDropdown({ title, items }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownContentRef = useRef<HTMLDivElement>(null);
    
  // Group items by stage for Services
  const groupedItems = items.reduce((acc, item) => {
    if (item.type === 'separator') return acc;
    const stage = item.stage || 'active';
    if (!acc[stage]) acc[stage] = [];
    acc[stage].push(item);
    return acc;
  }, {} as Record<string, DropdownItem[]>);
    
  // Group industries by category for Industries
  const industryCategories = title === 'Industries' ? {
    'Technology & Digital': items.filter(item =>
      item.path && ['it-cloud', 'digital-marketing'].includes(item.path.split('/').pop() || '')
    ),
    'Finance & Professional': items.filter(item =>
      item.path && ['finance', 'legal'].includes(item.path.split('/').pop() || '')
    ),
    'Healthcare & Education': items.filter(item =>
      item.path && ['healthcare', 'education'].includes(item.path.split('/').pop() || '')
    ),
    'Manufacturing & Industry': items.filter(item =>
      item.path && ['manufacturing', 'agriculture', 'logistics', 'transport'].includes(item.path.split('/').pop() || '')
    ),
    'Retail & Hospitality': items.filter(item =>
      item.path && ['retail', 'restaurants', 'hotels', 'pubs', 'pizza-shops'].includes(item.path.split('/').pop() || '')
    ),
    'Business Services': items.filter(item =>
      item.path && ['startups', 'marketing'].includes(item.path.split('/').pop() || '')
    ),
  } : {};


  

  // --- Effects (Adapted from Reference) ---

  useEffect(() => {
    if (isOpen && window.innerWidth < 768) { // md breakpoint
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleCloseOthers = (e: CustomEvent) => {
        if (e.detail.currentDropdown !== title) setIsOpen(false);
    };
    
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
            setIsOpen(false);
        }
    };
    
    const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape'){
            setIsOpen(false);
        }
    };

    document.addEventListener('closeOtherDropdowns', handleCloseOthers as EventListener);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
        document.removeEventListener('closeOtherDropdowns', handleCloseOthers as EventListener);
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
    };
  }, [title]);

  const openDropdown = () => {
    const event = new CustomEvent('closeOtherDropdowns', 
      { detail: { currentDropdown: title },
      });
    document.dispatchEvent(event);
    setIsOpen(true);
  };
  
  const getDropdownPosition = () => {
    if (!buttonRef.current) return {};
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const dropdownWidth = Math.min(1000, window.innerWidth - 40);
    const viewportWidth = window.innerWidth;
    const buttonCenter = buttonRect.left + buttonRect.width / 2;
    const idealLeft = buttonCenter - dropdownWidth / 2;
    const left = Math.max(20, Math.min(idealLeft, viewportWidth - dropdownWidth - 20));

    const maxHeight = Math.min(800, window.innerHeight - buttonRect.bottom - 20);

    return {
      left: `${left}px`,
      width: `${dropdownWidth}px`,
      position: 'fixed' as const,
      top: `${buttonRect.bottom + 8}px`,
      maxHeight: `${maxHeight}px`,
      overflowY: 'auto' as const,
    };
  };

  // Prevent scrolling from bubbling up to the page
  const handleDropdownScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (dropdownContentRef.current) {
      e.stopPropagation();
    }
  };
const { theme } = useTheme();
  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center">
        <Link
          to={
            title === 'Services'
              ? '/services'
              : title === 'Industries'
              ? '/industries'
              : '#'
          }
          className={cn(
    "py-2 px-3 transition-colors duration-300",
    theme === "dark" 
      ? "text-gray-300 hover:text-white" 
      : "text-gray-900 hover:text-primary"
  )}
        >
          {title}
        </Link>
        <button
          ref={buttonRef}
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
            } else {
              openDropdown();
            }
          }}
        
        
          className={`flex items-center transition-colors duration-300 py-2 pl-1 pr-3 rounded-lg
            ${isOpen ? theme === "dark"
      ? "bg-white/10 text-white"
      : "bg-primary/10 text-primary"
    : theme === "light"
      ? "text-gray-300 hover:text-white hover:bg-white/5"
      : "text-gray-700 hover:text-primary hover:bg-primary/5"}`}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>


<AnimatePresence>

      {isOpen && (
       <motion.div
          ref={dropdownContentRef}
          style={getDropdownPosition()}

          initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}

          className="bg-gray-900/95 rounded-lg shadow-xl border border-gray-800 backdrop-blur-lg animate-slide-up z-50"
          onWheel={handleDropdownScroll}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Optional close button on small screens */}
          {window.innerWidth < 768 && (
            <div className="flex justify-end p-2">
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close dropdown"
                className="text-gray-400 hover:text-gray-300"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {title === 'Industries' ? (
            // Industries Dropdown Layout
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(industryCategories).map(([category, categoryItems]) => (
                  <div key={category} className="space-y-2">
                    <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                      {category}
                    </h3>
                    <div className="space-y-1">
                      {categoryItems.map((item, index) => (
                        <IndustryItem
                          key={index}
                          item={item}
                          onClick={() => setIsOpen(false)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <Link
                  to="/industries"
                  className="flex items-center justify-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  View All Industries
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ) : (
          
           // Update the Services Dropdown Layout section in the return statement
           // Services Dropdown Layout
            <div className="p-4 grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="col-span-2 mb-1">
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Active Services
                  </h3>
                  
                </div>
                {groupedItems['active']?.map((item, index) => (
                  <DropdownItem key={index} item={item} onClick={() => setIsOpen(false)} />
                  
                ))}
                
              </div>
              <div className="col-span-12 md:col-span-4 border-t md:border-t-0 md:border-l border-gray-800 pt-4 md:pt-0 md:pl-4">
                <div className="mb-4">
                  <h3 className="text-xs font-medium text-emerald-400 uppercase tracking-wider mb-2">
                  Development Pipeline
                  </h3>
                  <div className="space-y-2">
                    {groupedItems['development']?.map((item, index) => (
                      <DropdownItem
                        key={index}
                        item={item}
                        onClick={() => setIsOpen(false)}
                        compact
                        stageColor={getStageColor('development')}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-xs font-medium text-emerald-400 uppercase tracking-wider mb-2">
                  Pilot
                  </h3>
                  <div className="space-y-2">
                    {groupedItems['pilot']?.map((item, index) => (
                      <DropdownItem
                        key={index}
                        item={item}
                        onClick={() => setIsOpen(false)}
                        compact
                        stageColor={getStageColor('pilot')}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xs font-medium text-amber-400 uppercase tracking-wider mb-2">
                    Coming Soon
                  </h3>
                  <div className="space-y-2">
                    {groupedItems['upcoming']?.map((item, index) => (
                      <DropdownItem
                        key={index}
                        item={item}
                        onClick={() => setIsOpen(false)}
                        compact
                        stageColor={getStageColor('upcoming')}
                      />
                    ))}
                  </div>
                </div>
              </div>
               <div className="mt-4 pt-4 border-t border-gray-800">
                <Link
                  to="/services"
                  className="flex items-center justify-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  View All Services
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}
       </motion.div>
      )}

      </AnimatePresence>
    </div>
  );
}

interface DropdownItemProps {
  item: DropdownItem;
  onClick: () => void;
  compact?: boolean;
  stageColor?: string;
}

function IndustryItem({ item, onClick }: { item: DropdownItem; onClick: () => void }) {
  const Icon = item.icon;
  return (
    <Link to={item.path} className="block" onClick={onClick}>
      <div className="p-2 rounded-lg transition-all duration-300 hover:bg-gray-800 group border border-gray-800 hover:border-blue-500/50">
        <div className="flex items-center space-x-2">
          {Icon && <Icon className="h-4 w-4 text-blue-400" aria-hidden="true" />}
          <div>
            <h3 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors mt-0.5">
                {item.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function DropdownItem({ item, onClick, compact = false, stageColor = '' }: DropdownItemProps) {
  const Icon = item.icon;

  if (compact) {
    return (
      <Link to={item.path} className="block" onClick={onClick}>
        <div
          className={`p-2 rounded-lg transition-all duration-300 hover:bg-gray-800 group border border-gray-800 hover:border-blue-500/50 ${stageColor}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {Icon && <Icon className="h-4 w-4 text-blue-400" aria-hidden="true" />}
              <div>
                <h3 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
            {item.releaseDate && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getQuarterColor(item.releaseDate)}`}>
                {item.releaseDate}
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={item.path} className="block" onClick={onClick}>
      <div className="p-3 rounded-lg transition-all duration-300 hover:bg-gray-800 group border border-gray-800 hover:border-blue-500/50">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-2">
            {Icon && <Icon className="h-4 w-4 text-blue-400" aria-hidden="true" />}
            <h3 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
              {item.title}
              {item.isNew && (
                <span className="ml-2 px-1.5 py-0.5 text-xs bg-blue-500 text-white rounded-full">
                  New
                </span>
              )}
            </h3>
          </div>
          {item.releaseDate && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getQuarterColor(item.releaseDate)}`}>
              {item.releaseDate}
            </span>
          )}
        </div>
        {item.description && (
          <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
}