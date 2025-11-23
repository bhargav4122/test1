// Ensure this file is named ServiceDetail.tsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  FileCode,
  Check,
  Calendar,
  XCircle,
  BarChart,
  Database,
  Server,
  Cloud,
  Code,
  FileText,
  Settings,
  Layers,
  Grid2X2,
  Users,
  Briefcase,
  CheckCircle,
  Cpu,
  Timer,
  ChevronDown, // Make sure these are imported
  ChevronUp,   // Make sure these are imported
  type LucideIcon
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
//import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

import {Card,CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card.tsx";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { serviceDetails } from "@/data/serviceDetails";
import { serviceIndustriesDetailed } from "@/data/navigationData";
import { servicesDropdown } from "@/data/navigationData";
// Removed unused import: import { serviceCategories } from "@/data/serviceCategories";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
// import ServiceWorkflow from "@/components/ServiceWorkflow"; // Uncomment if used
import { IndustryDetail, TeamMember, ServicesSectionProps } from "@/types/navigation";
import { PhaseTimeline, Timeline } from "@/components/PhaseTimeline"; // Assuming these exist
import { motion, AnimatePresence } from "framer-motion";


// --- Type Definitions (Ensure these match your actual data structures) ---
interface Technology {
  name: string;
  description: string;
  icon?: string; // Based on usage in Section 5
}

interface ProjectPhase {
  name: string;
  date?: string;
  description?: string;
  completed?: boolean;
  current?: boolean;
  progress?: number;
}

interface ProjectTimeline {
  phases: ProjectPhase[];
  currentProgress?: number;
}
interface Project {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  progress?: number; // Fallback if timeline.currentProgress missing
  startDate?: string;
  challenge?: string;
  solution?: string[];
  outcomes?: string[];
  timeline?: ProjectTimeline; // Added based on usage
}


interface BlogPost {
  title: string;
  excerpt: string;
  image?: string;
}

interface WorkflowStep {
  title: string;
  description: string;
  icon?: LucideIcon;
}




export interface SubService {
  id: string;
  title: string;
  description: string;
  icon?: LucideIcon | string; // Allow string for simple icon names if mapped, or direct LucideIcon
  features?: string[];
  specializations?: Record<string, string[]>;
  
}

interface ServiceDetailsData {
  title?: string;
  overview?: string;
  benefits?: string[];
  image?: string;
  technologies?: Technology[];
  projects?: {
    completed?: Project[];
    ongoing?: Project[];
    upcoming?: Project[];
  };
  blogPosts?: BlogPost[];
  services?: string[]; // Used in Key Features section
  icon?: LucideIcon;
  workflow?: WorkflowStep[];
  subservice?: SubService[]; // Array of sub-service objects

keyFeatures?: string[]; 
}
// --- End Type Definitions ---


const defaultWorkflow: WorkflowStep[] = [
  { title: "Initial Consultation", description: "Understand needs.", icon: Clock },
  { title: "Assessment & Planning", description: "Develop action plan.", icon: FileCode },
  { title: "Implementation", description: "Execute the plan.", icon: Check },
  { title: "Evaluation & Optimization", description: "Review and refine.", icon: BarChart }
];

const iconMapping: Record<string, LucideIcon> = {
  database: Database, server: Server, cloud: Cloud, code: Code,
  file: FileText, settings: Settings, layers: Layers, grid: Grid2X2
};

// ===========================
// === Component Definition ===
// ===========================
const ServiceDetail: React.FC = () => {
  // --- Hooks ---
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // --- State Variables ---
  const [details, setDetails] = useState<ServiceDetailsData | null>(null);
  const [industries, setIndustries] = useState<Record<string, IndustryDetail[]> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>(defaultWorkflow);

  const [currentSubServices, setCurrentSubServices] = useState<SubService[]>([]); // For the sub-services section

  const [subServices, setSubServices] = useState<SubService[]>([]);
  const [selectedIndustryCategory, setSelectedIndustryCategory] = useState<string>("current");
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  // const [activeSubService, setActiveSubService] = useState<string | null>(null); // Keep if used elsewhere

  // State for tracking expanded sub-service cards
  const [expandedSubServiceCards, setExpandedSubServiceCards] = useState<Set<string>>(new Set());

  // --- Data Fetching Effect ---
  useEffect(() => {
    // console.log(`Fetching data for service ID: ${serviceId}`);
    setIsLoading(true);
    setError(null);
    setDetails(null);
    setIndustries(null);
    setSelectedIndustry(null);
    setSubServices([]);
    // setActiveSubService(null); // Reset if needed
    setExpandedSubServiceCards(new Set()); // Reset expanded cards

    if (!serviceId) {
      setError("No service ID provided.");
      setIsLoading(false);
      navigate("/services");
      return; // Exit effect early
    }

    // Fetch main service details (ensure type casting is safe)
    let fetchedDetails = serviceDetails[serviceId] as ServiceDetailsData | undefined;
    if (!fetchedDetails) {
      const navItem = servicesDropdown.find(item => item.path.includes(`/${serviceId}`));
      if (navItem) {
        fetchedDetails = {
          title: navItem.title,
          overview: navItem.description || `Detailed information about our ${navItem.title} service.`,
          icon: navItem.icon as LucideIcon | undefined
        };
      }
    }

    // Fetch industry details (ensure type casting is safe)
    const fetchedIndustries = serviceIndustriesDetailed[serviceId as keyof typeof serviceIndustriesDetailed];

    
    // Process fetched data
    if (fetchedDetails) {
      setWorkflowSteps(fetchedDetails.workflow || defaultWorkflow);
      setDetails(fetchedDetails);
      document.title = `${fetchedDetails.title || serviceId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - BDS`;
       toast({ title: `Loaded: ${fetchedDetails.title || serviceId}`, description: "Displaying service details." }); // Optional toast

      if (fetchedIndustries) {
        setIndustries(fetchedIndustries);
        // Set initial industry selection logic (keep existing)
        if (fetchedIndustries.current?.length > 0) {
          setSelectedIndustryCategory("current");
          setSelectedIndustry(fetchedIndustries.current[0].name);
        } else if (fetchedIndustries.potential?.length > 0) {
          setSelectedIndustryCategory("potential");
          setSelectedIndustry(fetchedIndustries.potential[0].name);
        } else if (fetchedIndustries.future?.length > 0) {
          setSelectedIndustryCategory("future");
          setSelectedIndustry(fetchedIndustries.future[0].name);
        } else {
            setSelectedIndustry(null); // Handle case with no industries
        }
      } else {
        setIndustries(null); // Ensure industries is null if not fetched
      }

      setIsLoading(false);
    } else {
      setError(`Details not found for service: ${serviceId}`);
      // toast({ title: "Service Not Found", description: `Could not find details for service ID: ${serviceId}`, variant: "destructive" }); // Optional toast
      setIsLoading(false);
    }
  }, [serviceId, navigate, toast]); // End useEffect

  // --- Helper Functions ---

  // Function to toggle the expanded state for a sub-service card
  const handleToggleSubServiceExpand = (id: string): void => {
    setExpandedSubServiceCards((prevExpanded) => {
      const newExpanded = new Set(prevExpanded);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      return newExpanded;
    });
  };

  const getDisplayTitle = (): string => {
    if (details?.title) return details.title;
    if (serviceId) return serviceId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return "Service Detail";
  };
  // Assign result to variable *after* function definition
  const displayTitle = getDisplayTitle();

  const getSelectedIndustryData = (): IndustryDetail | null => {
    if (!industries || !selectedIndustryCategory || !selectedIndustry) return null;
    const categoryIndustries = industries[selectedIndustryCategory]; // Access directly
    if (!categoryIndustries || !Array.isArray(categoryIndustries)) return null;
    return categoryIndustries.find(ind => ind.name === selectedIndustry) || null;
  };
   // Assign result to variable *after* function definition
  const industryData = getSelectedIndustryData();

  const handleIndustryCategoryChange = (category: string): void => {
    setSelectedIndustryCategory(category);
    const categoryData = industries?.[category]; // Use optional chaining
    if (categoryData?.length > 0) { // Check length after confirming existence
      setSelectedIndustry(categoryData[0].name);
    } else {
      setSelectedIndustry(null);
    }
  };

  const getIconComponent = (icon: LucideIcon | string | undefined): LucideIcon => {
    if (!icon) return Database;
    if (typeof icon === 'string') {
      return iconMapping[icon.toLowerCase()] ;
    }
    return icon;
  };

  // --- Conditional Returns for Loading/Error/No Data ---

  if (isLoading) {
    return ( // Ensure TSX is valid here
      <div className="min-h-screen flex flex-col dark:bg-black border dark:text-gray-100">
      
        <div className="flex-1 flex items-center justify-center">Loading service details...</div>
      
      </div>
    ); // Semicolon added for clarity, though often optional here
  }

  if (error) {
    return ( // Ensure TSX is valid here
      <div className="min-h-screen flex flex-col dark:bg-black border dark:text-gray-100 ">
      
        <main className="flex-grow flex items-center justify-center py-16">
          <Card className="w-full max-w-lg mx-auto border-destructive bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <XCircle /> Error Loading Service
              </CardTitle>
              <CardDescription className="text-destructive/90">
                {error}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                The requested service ID <code className="bg-muted px-1 rounded">'{serviceId}'</code> could not be found or loaded. Please check the ID or try navigating back.
              </p>
              <Button onClick={() => navigate("/services")} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
              </Button>
            </CardContent>
          </Card>
        </main>
      
      </div>
    ); // Semicolon added for clarity
  }

  if (!details) {
    return ( // Ensure TSX is valid here
      <div className="min-h-screen flex flex-col dark:bg-black border dark:text-gray-100">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-16">
          <div className="text-center max-w-md px-4">
            <h1 className="text-2xl font-bold mb-4">Service Details Unavailable</h1>
            <p className="text-muted-foreground mb-6">We couldn't find the details for the service ID: <code className="bg-muted px-1 rounded">{serviceId ?? 'N/A'}</code>.</p>
            <Button onClick={() => navigate("/services")} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    ); // Semicolon added for clarity
  }



// Simple version for immediate fix
// Improved Optimized Image Component
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // More aggressive image optimization
  const optimizedSrc = React.useMemo(() => {
    if (!src) return null;
    
    if (src.includes('cloudinary.com')) {
      const width = isMobile ? 400 : 800;
      const quality = isMobile ? 'q_auto:low' : 'q_auto:good'; // Lower quality for faster load
      
      if (src.includes('/upload/')) {
        // Add more aggressive optimization parameters
        return src.replace('/upload/', `/upload/${quality},w_${width},f_auto,c_fill,g_auto/`);
      }
    }
    
    // Optimize Unsplash images more aggressively
    if (src.includes('unsplash.com')) {
      const url = new URL(src);
      url.searchParams.set('q', isMobile ? '50' : '70'); // Lower quality for faster load
      url.searchParams.set('fit', 'crop');
      url.searchParams.set('w', isMobile ? '400' : '800');
      url.searchParams.set('h', isMobile ? '300' : '500');
      url.searchParams.set('dpr', '1'); // Reduce DPR for faster loading
      return url.toString();
    }
    
    return src;
  }, [src, isMobile]);

  // Preload image to reduce flickering
  useEffect(() => {
    if (!optimizedSrc) return;

    const img = new Image();
    img.src = optimizedSrc;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
  }, [optimizedSrc]);

  if (!optimizedSrc || imageError) {
    return fallback || (
      <div className={`w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center ${className}`}>
        <div className="text-center">
          <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-gray-500 dark:text-gray-400 text-sm">No Image</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Improved Loading Skeleton - Matches your theme */}
      {!imageLoaded && (
        <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 animate-pulse rounded-lg ${className}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        </div>
      )}
      
      {/* Optimized Image */}
      <img
        src={optimizedSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-500 ${
          imageLoaded 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-105'
        } ${className}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
    </div>
  );
};

  // ===========================
  // === Main Component Return ===  (This is where the error likely pointed)
  // ===========================
  return (
    <div className="min-h-screen flex flex-col">
   

      <main className="flex-grow pt-20 md:pt-20">

        {/* --- Section 1: Header --- */}
        <section className="bg-gradient-to-b  py-8 md:py-2">
          <div className="container mx-auto px-4 max-w-5xl">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/services")}
                  className="mb-4 pl-0 hover:pl-2 transition-all text-muted-foreground hover:text-primary"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Services Overview
                </Button>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{displayTitle}</h1>
                {details.overview && (
                  <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                    {details.overview.split('.')[0]}.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

       {/* --- Section 2: Service Overview & Benefits --- */}
<section className="py-8">
  <div className="container mx-auto px-4 max-w-5xl">
    <h2 className="text-2xl md:text-3xl font-bold mb-6">Service Overview</h2>
    <div className="prose dark:prose-invert max-w-none">
      {details.overview ? (
        <p className="text-lg text-muted-foreground leading-relaxed">{details.overview}</p>
      ) : (
        <p className="text-lg text-muted-foreground italic">Detailed overview coming soon.</p>
      )}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div>
          {details.benefits && details.benefits.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-4">Key Benefits</h3>
              <ul className="space-y-3">
                {details.benefits.map((benefit, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start bg-white dark:bg-gray-800 p-3 rounded-lg border border-border"
                  >
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="flex justify-center lg:justify-end">
          {details.image && (
            <div className="relative w-full max-w-md">
              <OptimizedImage
                src={details.image}
                alt={displayTitle}
                className="rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow"
                fallback={
                  <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-medium">Service Image</span>
                  </div>
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</section>



       {/* --- Section 3: Core Components --- */}
{details.subServices && details.subServices.length > 0 && (
  <section className="py-12 bg-muted/20">
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Core Components</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Comprehensive solutions tailored to your specific needs
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {details.subServices.map((subService, index) => {
          const isExpanded = expandedSubServiceCards.has(subService.id);
          const hasDetails = !!(subService.features || subService.testimonial);

          return (
            <motion.div
              key={subService.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 border border-border overflow-hidden hover:border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium leading-tight">
                    {subService.title}
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {subService.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0 pb-4 flex-grow flex flex-col">
                  {subService.features && subService.features.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-xs font-semibold uppercase tracking-wider mb-2 text-muted-foreground">
                        Key Features
                      </h4>
                      <ul className="space-y-1.5">
                        {subService.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <Check className="h-3 w-3 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-xs leading-relaxed">{feature}</span>
                          </li>
                        ))}
                        {subService.features.length > 3 && !isExpanded && (
                          <li className="text-xs text-muted-foreground pl-5">
                            +{subService.features.length - 3} more features
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                  
                  <AnimatePresence initial={false}>
                    {isExpanded && hasDetails && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        {subService.features && subService.features.length > 3 && (
                          <div className="mt-3">
                            <ul className="space-y-1.5">
                              {subService.features.slice(3).map((feature, idx) => (
                                <li key={idx + 3} className="flex items-start">
                                  <Check className="h-3 w-3 text-primary mt-0.5 mr-2 flex-shrink-0" />
                                  <span className="text-xs leading-relaxed">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {subService.testimonial && (
                          <div className="mt-4 bg-muted/30 p-3 rounded-lg border border-border">
                            <p className="text-xs italic text-muted-foreground">"{subService.testimonial}"</p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
                
                {hasDetails && (
                  <CardFooter className="pt-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleSubServiceExpand(subService.id)}
                      className="w-full text-xs"
                    >
                      {isExpanded ? (
                        <>Show Less <ChevronUp className="ml-1 h-3 w-3" /></>
                      ) : (
                        <>Show More <ChevronDown className="ml-1 h-3 w-3" /></>
                      )}
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
)}



        {/* --- Section 5: Technologies We Use --- */}
        {details.technologies && details.technologies.length > 0 && (
          <section className="py-12">
             <div className="container mx-auto px-4 max-w-5xl">
               <h2 className="text-2xl md:text-3xl font-bold mb-8">Technologies We Use</h2>
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                 {details.technologies.map((tech, index) => (
                   <Card key={index} className="border border-border   hover:shadow-md transition-shadow">
                     <CardHeader className="p-4">
                       <CardTitle className="text-lg">{tech.icon} {tech.name}</CardTitle>
                     </CardHeader>
                     <CardContent className="p-4 pt-0">
                       <CardDescription>{tech.description}</CardDescription>
                     </CardContent>
                   </Card>
                 ))}
               </div>
             </div>
          </section>
        )}

        {/* --- Section: Key Features / Components (Using details.services) --- */}
        {details.services && details.services.length > 0 && (
          <section className="py-12 bg-muted/30">
             <div className="container mx-auto px-4 max-w-5xl">
               <h2 className="text-2xl md:text-3xl font-bold mb-8">Key Features / Components</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {details.services.map((feature, index) => (
                   <div key={index} className="  p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow duration-200">
                     <h3 className="text-lg font-medium mb-2">{feature}</h3>
                     <p className="text-sm text-muted-foreground">Tailored solutions focused on {feature.toLowerCase()} to meet specific business needs.</p>
                   </div>
                 ))}
               </div>
             </div>
          </section>
        )}

 {/* Section 6: Our Work & Projects */}
        
        {details.projects && (details.projects.completed || details.projects.ongoing || details.projects.upcoming) && (
           <section className="py-12   border-t border-border">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Our Work & Projects</h2>

              <Tabs defaultValue={details.projects.completed?.length ? "completed" : (details.projects.ongoing?.length ? "ongoing" : "upcoming")} className="w-full">
                <TabsList className="mb-6 grid w-full grid-cols-3">
                  {details.projects.completed && details.projects.completed.length > 0 && (
                    <TabsTrigger value="completed">
                      <Check className="h-4 w-4 mr-2" /> Completed ({details.projects.completed.length})
                    </TabsTrigger>
                  )}
                  {details.projects.ongoing && details.projects.ongoing.length > 0 && (
                    <TabsTrigger value="ongoing">
                      <Clock className="h-4 w-4 mr-2" /> Ongoing ({details.projects.ongoing.length})
                    </TabsTrigger>
                  )}
                  {details.projects.upcoming && details.projects.upcoming.length > 0 && (
                    <TabsTrigger value="upcoming">
                      <Calendar className="h-4 w-4 mr-2" /> Upcoming ({details.projects.upcoming.length})
                    </TabsTrigger>
                  )}
                </TabsList>


                  {/* Completed Projects */}
                {details.projects.completed && (
                  <TabsContent value="completed" className="space-y-6">
                    {details.projects.completed.map((project, index) => (
                      <Card key={index} className="overflow-hidden border border-border  ">
                        <div className="md:flex">
                         {project.image && (
  <div className="md:w-1/3 flex-shrink-0">
    <OptimizedImage
      src={project.image}
      alt={project.title}
      className="h-48 md:h-full w-full object-cover"
      fallback={
        <div className="h-48 md:h-full w-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400 text-sm">Project Image</span>
        </div>
      }
    />
  </div>
)}
                          <div className="p-6 flex-1">
                            <CardTitle className="mb-2">{project.title}</CardTitle>
                            <CardDescription className="mb-4">{project.description}</CardDescription>
                            

                            <CardContent className="p-0 space-y-4">
                      {project.challenge && (
                        <div>
                          <h4 className="font-medium mb-1">Challenge</h4>
                          <p className="text-sm">{project.challenge}</p>
                        </div>
                      )}
                      {project.solution?.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-1">Our Solution</h4>
                          <ul className="space-y-1 list-disc pl-5 text-sm">
                            {project.solution.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {project.outcomes?.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-1">Outcomes</h4>
                          <ul className="space-y-1 list-disc pl-5 text-sm">
                            {project.outcomes.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {project.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>


                          </div>
                        </div>
                      </Card>
                    ))}
                  </TabsContent>
                )}


{/* Ongoing Projects */}
{details.projects.ongoing && (
  <TabsContent value="ongoing" className="space-y-6">
    {details.projects.ongoing.map((project, index) => (
      <Card key={index} className="  overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col md:flex-row">
          {/* Image Section (30%) */}
        {project.image && (
  <div className="md:w-[30%] flex-shrink-0">
    <OptimizedImage
      src={project.image}
      alt={project.title}
      className="w-full h-48 md:h-full object-cover"
      fallback={
        <div className="w-full h-48 md:h-full bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
          <Code className="h-8 w-8 text-primary/40" />
        </div>
      }
    />
  </div>
)}

          {/* Content Section (70%) */}
          <div className="flex-1 p-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
              <div>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="mt-1">{project.description}</CardDescription>
              </div>
              {(project.progress || project.timeline?.currentProgress) && (
                <div className="md:w-48">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{project.timeline?.currentProgress || project.progress}%</span>
                  </div>
                  <Progress 
                    value={project.timeline?.currentProgress || project.progress || 0} 
                    className="h-2" 
                  />
                </div>
              )}
            </div>

            {/* Timeline Section */}
            {project.timeline?.phases?.length && (
              <div className="mb-6">
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Timer className="h-5 w-5 text-primary" />
                  Project Timeline
                </h4>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {project.timeline.phases.map((phase, idx) => (
                    <div 
                      key={idx}
                      className="relative p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          phase.completed ? 'bg-green-500/10 text-green-500' :
                          phase.current ? 'bg-primary/10 text-primary' :
                          'bg-muted/50 text-muted-foreground'
                        }`}>
                          {phase.completed ? (
                            <Check className="h-5 w-5" />
                          ) : phase.current ? (
                            <Clock className="h-5 w-5" />
                          ) : (
                            <Calendar className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start gap-2">
                            <h5 className="font-medium">{phase.name}</h5>
                            {phase.date && (
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {phase.date}
                              </span>
                            )}
                          </div>
                          {phase.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {phase.description}
                            </p>
                          )}
                          {phase.progress && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Phase Progress</span>
                                <span>{phase.progress}%</span>
                              </div>
                              <Progress 
                                value={phase.progress} 
                                className="h-1.5" 
                                indicatorColor={
                                  phase.completed ? 'bg-green-500' :
                                  phase.current ? 'bg-primary' : 'bg-muted-foreground'
                                }
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content Section */}
            <div className="space-y-6">
              {project.challenge && (
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <FileCode className="h-5 w-5 text-primary" />
                    Challenge
                  </h4>
                  <p className="text-sm pl-7">{project.challenge}</p>
                </div>
              )}

              {project.solution?.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Our Solution
                  </h4>
                  <ul className="space-y-2 pl-7">
                    {project.solution.map((item, i) => (
                      <li 
                        key={i}
                        className="text-sm relative before:absolute before:left-[-18px] before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Tags Section */}
            {project.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-border/50">
                {project.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline"
                    className="flex items-center gap-1.5 hover:bg-primary/5"
                  >
                    <Cpu className="h-3.5 w-3.5 text-muted-foreground" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    ))}
  </TabsContent>
)}

  {/* Upcoming Projects */}
                
                {details.projects.upcoming && (
                  <TabsContent value="upcoming" className="space-y-6">
                    {details.projects.upcoming.map((project, index) => (
                      <Card key={index} className="border border-border  ">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle>{project.title}</CardTitle>
                            {project.startDate && (
                              <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-700 whitespace-nowrap">
                                Est. Start: {project.startDate}
                              </Badge>
                            )}
                          </div>
                          <CardDescription>{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {project.tags?.map((tag, idx) => (
                              <Badge key={idx} variant="secondary">{tag}</Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                )}
              </Tabs>
            </div>
          </section>
        )}

{/* Section 7: Industry Applications */}
        
        {industries && Object.keys(industries).length > 0 && (
          <section className="py-12  ">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Industry Applications</h2>

              <Tabs
                defaultValue={selectedIndustryCategory}
                value={selectedIndustryCategory}
                onValueChange={handleIndustryCategoryChange}
                className="w-full"
              >
                <div className="mb-8 overflow-x-auto pb-2">
                  <TabsList className="mb-2 h-auto p-1 bg-muted/70">
                    {industries.current && industries.current.length > 0 && (
                      <TabsTrigger value="current" className="px-4 py-2 text-sm">
                        Current Industries
                      </TabsTrigger>
                    )}
                    {industries.potential && industries.potential.length > 0 && (
                      <TabsTrigger value="potential" className="px-4 py-2 text-sm">
                        Potential Industries
                      </TabsTrigger>
                    )}
                    {industries.future && industries.future.length > 0 && (
                      <TabsTrigger value="future" className="px-4 py-2 text-sm">
                        Future Industries
                      </TabsTrigger>
                    )}
                  </TabsList>

    {/* Industry Buttons - Placed below TabsList */}
                  
                  {selectedIndustryCategory && 
                   industries[selectedIndustryCategory as keyof typeof industries] && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {(industries[selectedIndustryCategory as keyof typeof industries] as IndustryDetail[]).map((industry, index) => (
                        <Button
                          key={index}
                          variant={selectedIndustry === industry.name ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedIndustry(industry.name)}
                          className={cn("rounded-full text-xs md:text-sm",
                            selectedIndustry === industry.name && selectedIndustryCategory === "current" && "bg-green-600 hover:bg-green-700",
                            selectedIndustry === industry.name && selectedIndustryCategory === "potential" && "bg-blue-600 hover:bg-blue-700",
                            selectedIndustry === industry.name && selectedIndustryCategory === "future" && "bg-orange-600 hover:bg-orange-700",
                          )}
                        >
                          {industry.name}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

  {/* Industry Details Card */}
                
                <div className="  border border-border rounded-lg p-6 shadow-sm min-h-[200px]">
                  {industryData ? (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold mb-2">{selectedIndustry}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {industryData.challenges && industryData.challenges.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-lg mb-2 text-primary/80">Challenges</h4>
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                              {industryData.challenges.map((challenge, idx) => (<li key={idx}>{challenge}</li>))}
                            </ul>
                          </div>
                        )}
                        {industryData.solutions && industryData.solutions.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-lg mb-2 text-primary/80">Our Solutions</h4>
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                              {industryData.solutions.map((solution, idx) => (<li key={idx}>{solution}</li>))}
                            </ul>
                          </div>
                        )}
                        {industryData.caseStudy && (
                          <div>
                            <h4 className="font-semibold text-lg mb-2 text-primary/80">Case Study / Example</h4>
                            <p className="text-muted-foreground text-sm italic">"{industryData.caseStudy}"</p>
                          </div>
                        )}
                        {industryData.futureOutlook && (
                          <div>
                            <h4 className="font-semibold text-lg mb-2 text-primary/80">Future Outlook</h4>
                            <p className="text-muted-foreground text-sm">{industryData.futureOutlook}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 flex flex-col items-center justify-center h-full">
                      <BarChart className="w-12 h-12 text-muted-foreground mb-4" aria-hidden="true" />
                      <p className="text-muted-foreground">
                        {selectedIndustry ? `Details for ${selectedIndustry} coming soon.` : `Select an industry above to view specific applications.`}
                      </p>
                    </div>
                  )}
                </div>
              </Tabs>
            </div>
          </section>
        )}

 
        
     {/* Section 8: Insights & Resources */}
{details.blogPosts && details.blogPosts.length > 0 && (
  <section className="py-12">
    <div className="container mx-auto px-4 max-w-5xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Insights & Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {details.blogPosts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300 bg-card border-border">
              {post.image && (
                <div className="h-48 overflow-hidden">
                  <OptimizedImage
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    fallback={
                      <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                      </div>
                    }
                  />
                </div>
              )}
              <CardHeader className="flex-grow pb-4">
                <CardTitle className="text-lg leading-snug line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </CardDescription>
              </CardContent>
              <CardFooter className="pt-0 mt-auto">
                <Button variant="link" className="w-full justify-start px-0 text-primary text-sm">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)}

  



 {/* Section 9: Call to Action */}
        
         <section className="py-5 from-primary/10 to-background border-border">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to leverage {displayTitle}?</h2>
              <p className="mb-8 text-muted-foreground">
                Our experts are ready to discuss how this service can address your specific business challenges and drive results.
              </p>
              <Button 
  size="lg" 
  className="rounded-full px-8 py-3 h-auto"
  onClick={() => navigate('/consultation')}
>
  Schedule a Free Consultation
  <ArrowRight className="ml-2 h-5 w-5" />
</Button>
            </div>
          </div>
        </section>
      </main>

    
    </div>
  );
};

export default ServiceDetail;
