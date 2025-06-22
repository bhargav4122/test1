// src/pages/services/core-data-cloud/CoreDataCloudPage.tsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Keep useNavigate if Back button is needed
import {
  ArrowLeft, ArrowRight, Clock, FileCode, Check, Calendar, XCircle, BarChart,
  Database, Server, Cloud, Code, FileText, Settings, Layers, Grid2X2,
  Users, Briefcase, CheckCircle, Cpu, Timer, ChevronDown, ChevronUp, type LucideIcon
} from "lucide-react"; // Keep all needed icons
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar"; // Adjust path if needed
import Footer from "@/components/Footer"; // Adjust path if needed
import { cn } from "@/lib/utils";
// Removed useToast as we are not showing loading/error toasts dynamically per page load
// import { useToast } from "@/hooks/use-toast";
// Removed ServiceWorkflow import as it was commented out
// import { PhaseTimeline, Timeline } from "@/components/PhaseTimeline"; // Assuming these exist
import { motion, AnimatePresence } from "framer-motion";

// --- Import Static Data for this Service ---
import { coreDataCloudData } from './data';
import { coreDataCloudComponents } from './components';
import { coreDataCloudProjects } from './projects';
import { coreDataCloudIndustries } from './industries';

// --- Import Shared Types (Adjust path as needed) ---
import { IndustryDetail, SubService, Project, Technology, BlogPost, WorkflowStep } from "@/types/navigation";


// --- Default/Fallback Data (Keep if needed) ---
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
const CoreDataCloudPage: React.FC = () => {
  // --- Hooks ---
  const navigate = useNavigate(); // Keep if Back button is used
  // const { toast } = useToast(); // Removed

  // --- State Variables (Keep state for UI interactions) ---
  const [workflowSteps] = useState<WorkflowStep[]>(coreDataCloudData.workflow || defaultWorkflow);
  const [subServices] = useState<SubService[]>(coreDataCloudComponents || []);
  const [industries] = useState(coreDataCloudIndustries || null); // Use the imported data directly

  // Initialize state based on imported industry data
  const getInitialIndustryCategory = () => {
      if (industries?.current?.length) return "current";
      if (industries?.potential?.length) return "potential";
      if (industries?.future?.length) return "future";
      return "current"; // Default fallback
  }
  const getInitialIndustry = (category: string) => {
      if (!industries) return null;
      const categoryData = industries[category as keyof typeof industries];
      return categoryData?.[0]?.name || null;
  }

  const initialCategory = getInitialIndustryCategory();
  const [selectedIndustryCategory, setSelectedIndustryCategory] = useState<string>(initialCategory);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(getInitialIndustry(initialCategory));

  const [expandedSubServiceCards, setExpandedSubServiceCards] = useState<Set<string>>(new Set());

  // --- Data is now static, no useEffect needed for fetching ---
  // --- Set document title directly ---
  React.useEffect(() => {
    document.title = `${coreDataCloudData.title || 'Core Data & Cloud'} - BDS`;
  }, []);


  // --- Helper Functions (Keep and adapt slightly) ---

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

  // Use title directly from imported data
  const displayTitle = coreDataCloudData.title || "Core Data & Cloud Solutions";

  const getSelectedIndustryData = (): IndustryDetail | null => {
    if (!industries || !selectedIndustryCategory || !selectedIndustry) return null;
    const categoryIndustries = industries[selectedIndustryCategory as keyof typeof industries];
    if (!categoryIndustries || !Array.isArray(categoryIndustries)) return null;
    return categoryIndustries.find(ind => ind.name === selectedIndustry) || null;
  };
   // Assign result to variable *after* function definition
  const industryData = getSelectedIndustryData();

  const handleIndustryCategoryChange = (category: string): void => {
    setSelectedIndustryCategory(category);
    const categoryData = industries?.[category as keyof typeof industries];
    if (categoryData?.length > 0) {
      setSelectedIndustry(categoryData[0].name);
    } else {
      setSelectedIndustry(null);
    }
  };

  const getIconComponent = (icon: LucideIcon | string | undefined): LucideIcon | null => {
      if (!icon) return Database; // Default Icon
      if (typeof icon === 'string') {
          const mappedIcon = iconMapping[icon.toLowerCase()];
          if (mappedIcon) {
              return mappedIcon;
          }
          console.warn(`Icon string "${icon}" not found in mapping.`);
          return Database; // Fallback if string mapping fails
      }
      // Check if it's a valid Lucide icon component (basic check)
      if (typeof icon === 'function' && icon.displayName?.includes('LucideIcon')) {
          return icon;
      }
      // If it's likely a component but not confirmed Lucide, try using it
      if (typeof icon === 'function') {
        return icon as LucideIcon; // Cast, assuming it's compatible
      }

      console.warn(`Invalid icon type provided: ${typeof icon}`);
      return Database; // Final fallback
  };


  // --- No Loading/Error states needed as data is static ---

  // ===========================
  // === Main Component Return ===
  // ===========================
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20 md:pt-32">

        {/* --- Section 1: Header --- */}
        <section className="bg-gradient-to-b from-background to-background/50 py-8 md:py-12">
          <div className="container mx-auto px-4 max-w-5xl">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/services")} // Or specific parent page
                  className="mb-4 pl-0 hover:pl-2 transition-all text-muted-foreground hover:text-primary"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Services Overview
                </Button>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{displayTitle}</h1>
                 {coreDataCloudData.subtitle && (
                   <p className="mt-2 text-xl text-primary/90">{coreDataCloudData.subtitle}</p>
                 )}
                {coreDataCloudData.description && ( // Use description or overview
                  <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
                    {coreDataCloudData.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 2: Service Overview & Benefits --- */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
             <h2 className="text-2xl md:text-3xl font-bold mb-8">Service Overview</h2>
             <div className="prose dark:prose-invert max-w-none">
               {coreDataCloudData.overview ? (
                 <p className="text-lg text-muted-foreground">{coreDataCloudData.overview}</p>
               ) : (
                 <p className="text-lg text-muted-foreground italic">Detailed overview not available.</p>
               )}
               <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                 <div>
                   {coreDataCloudData.benefits && coreDataCloudData.benefits.length > 0 && (
                     <>
                       <h3 className="text-xl font-semibold mb-4">Key Benefits</h3>
                       <ul className="space-y-2 list-none pl-0">
                         {coreDataCloudData.benefits.map((benefit, index) => (
                           <li key={index} className="flex items-start">
                             {/* Simple check or adjust based on benefit format */}
                             <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                             <span>{benefit}</span>
                           </li>
                         ))}
                       </ul>
                     </>
                   )}
                 </div>
                 <div>
                   {coreDataCloudData.image && (
                     <img
                       src={coreDataCloudData.image}
                       alt={displayTitle}
                       className="rounded-lg w-full h-auto object-cover shadow-md border border-border"
                     />
                   )}
                 </div>
               </div>
             </div>
          </div>
        </section>

         {/* --- Section 3: Service Components (Sub-services) --- */}
         {subServices.length > 0 && (
          <section className="py-12 bg-muted/30 border-t border-b border-border">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="text-center mb-10">
                 {/* Customize title for this service */}
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Core Data and Cloud Services Offerings</h2>
                 <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Explore the key components of our scalable data and cloud solutions.
                 </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subServices.map((subService) => {
                  const IconComponent = getIconComponent(subService.icon);
                  const isExpanded = expandedSubServiceCards.has(subService.id);
                  // Simplified check for details
                  const hasDetails = !!(subService.specializations || subService.technologies?.length > 0 || subService.testimonial);

                  return (
                    <Card key={subService.id} className="flex flex-col bg-background hover:shadow-lg transition-shadow duration-300 border border-border overflow-hidden hover:border-primary/20">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3 mb-2">
                           {IconComponent && <div className="p-2 rounded-lg bg-primary/10 text-primary"><IconComponent className="h-5 w-5" /></div>}
                          <CardTitle className="text-lg font-medium">{subService.title}</CardTitle>
                        </div>
                        <CardDescription className="text-sm">{subService.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 pb-4 flex-grow flex flex-col">
                         {Array.isArray(subService.features) && subService.features.length > 0 && (
                            <div className="mt-2">
                            <h4 className="text-xs font-semibold uppercase tracking-wider mb-2 text-muted-foreground">Features Include:</h4>
                            <ul className="space-y-1.5 list-none pl-0">
                                {subService.features.map((feature: string, idx: number) => (
                                <li key={idx} className="flex items-start">
                                    <Check className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-sm">{feature}</span>
                                </li>
                                ))}
                            </ul>
                            </div>
                         )}
                        <AnimatePresence initial={false}>
                          {isExpanded && hasDetails && (
                            <motion.div
                              key={`${subService.id}-details`}
                              initial="collapsed" animate="open" exit="collapsed"
                              variants={{
                                open: { opacity: 1, height: 'auto', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid hsl(var(--border))' },
                                collapsed: { opacity: 0, height: 0, marginTop: 0, paddingTop: 0, borderTop: '0px solid hsl(var(--border))' }
                              }}
                              transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                              className="overflow-hidden space-y-4" // Added space-y-4
                            >
                              {subService.specializations && typeof subService.specializations === 'object' && Object.keys(subService.specializations).length > 0 && (
                                <div>
                                  <h4 className="text-xs font-semibold uppercase tracking-wider mb-2 text-muted-foreground">Specializations:</h4>
                                  <div className="space-y-2.5">
                                    {Object.entries(subService.specializations).map(([specialization, items]) => (
                                      Array.isArray(items) && items.length > 0 && (
                                        <div key={specialization}>
                                          <h5 className="text-xs font-medium mb-1.5">{specialization}:</h5>
                                          <div className="flex flex-wrap gap-1.5">
                                            {items.map((item: string, idx: number) => (
                                              <Badge key={idx} variant="secondary" className="text-xs px-1.5 py-0.5 font-normal">{item}</Badge>
                                            ))}
                                          </div>
                                        </div>
                                      )
                                    ))}
                                  </div>
                                </div>
                              )}
                              {Array.isArray(subService.technologies) && subService.technologies.length > 0 && (
                                <div >
                                  <h4 className="text-xs font-semibold uppercase tracking-wider mb-2 text-muted-foreground">Technologies:</h4>
                                  <div className="flex flex-wrap gap-1.5">
                                    {subService.technologies.map((tech: string, idx: number) => (
                                      <Badge key={idx} variant="outline" className="text-xs px-1.5 py-0.5 font-normal border-primary/30 bg-primary/5 text-primary/90">{tech}</Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                               {subService.testimonial && (
                                <div>
                                    <h4 className="text-xs font-semibold uppercase tracking-wider mb-2 text-muted-foreground">Client Highlight:</h4>
                                    <p className="text-sm italic text-muted-foreground">{subService.testimonial}</p>
                                </div>
                               )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                      {hasDetails && (
                        <CardFooter className="pt-2 pb-4 border-t border-border mt-auto">
                          <Button variant="ghost" size="sm" className="w-full justify-center text-sm text-primary hover:bg-primary/5 data-[state=open]:text-primary/80"
                            onClick={() => handleToggleSubServiceExpand(subService.id)}
                            aria-expanded={isExpanded} data-state={isExpanded ? 'open' : 'closed'}
                          >
                            {isExpanded ? 'Show Less' : 'Learn More'}
                            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="ml-1.5">
                              <ChevronDown className="h-4 w-4" />
                            </motion.div>
                          </Button>
                        </CardFooter>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        )}
        {/* --- End Section 3 --- */}


        {/* --- Section 4: Service Workflow (Optional) --- */}
        {/* Keep this section if workflow data exists and is desired */}
        {workflowSteps.length > 0 && (
           <section className="py-12 bg-background">
             <div className="container mx-auto px-4 max-w-5xl">
               <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Process</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {workflowSteps.map((step, index) => {
                    const Icon = step.icon || BarChart; // Fallback icon
                    return (
                        <div key={index} className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-lg border border-border/50">
                            <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                                <Icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                    )
                 })}
               </div>
             </div>
           </section>
        )}


        {/* --- Section 5: Technologies We Use --- */}
        {coreDataCloudData.technologies && coreDataCloudData.technologies.length > 0 && (
          <section className="py-12 bg-muted/30">
             <div className="container mx-auto px-4 max-w-5xl">
               <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Key Technologies</h2>
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                 {coreDataCloudData.technologies.map((tech, index) => (
                   <Card key={index} className="border border-border bg-background hover:shadow-md transition-shadow text-center">
                     <CardHeader className="p-4 pb-2">
                       <CardTitle className="text-base flex flex-col items-center gap-2">
                            {tech.icon && <span className="text-2xl">{tech.icon}</span>} {/* Display icon if available */}
                           {tech.name}
                       </CardTitle>
                     </CardHeader>
                     <CardContent className="p-4 pt-0">
                       <CardDescription className="text-xs">{tech.description}</CardDescription>
                     </CardContent>
                   </Card>
                 ))}
               </div>
             </div>
          </section>
        )}

        {/* --- Section: Key Features / Components (Using coreDataCloudData.services) --- */}
        {coreDataCloudData.services && coreDataCloudData.services.length > 0 && (
          <section className="py-12 bg-background">
             <div className="container mx-auto px-4 max-w-5xl">
               <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">What We Offer</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {coreDataCloudData.services.map((feature, index) => (
                   <div key={index} className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow duration-200 flex items-start gap-4">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0"/>
                    <div>
                        <h3 className="text-md font-medium mb-1">{feature}</h3>
                        {/* <p className="text-sm text-muted-foreground">Tailored solutions focused on {feature.toLowerCase()} to meet specific business needs.</p> */}
                    </div>
                   </div>
                 ))}
               </div>
             </div>
          </section>
        )}

        {/* --- Section 6: Our Work & Projects --- */}
        {/* Use coreDataCloudProjects directly */}
        {(coreDataCloudProjects.completed?.length > 0 || coreDataCloudProjects.ongoing?.length > 0 || coreDataCloudProjects.upcoming?.length > 0) && (
          <section className="py-12 bg-muted/30 border-t border-border">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Work & Projects</h2>

              <Tabs defaultValue={coreDataCloudProjects.completed?.length ? "completed" : (coreDataCloudProjects.ongoing?.length ? "ongoing" : "upcoming")} className="w-full">
                <TabsList className="mb-6 grid w-full grid-cols-3">
                  {/* Conditional rendering based on imported project data */}
                  {coreDataCloudProjects.completed?.length > 0 && (
                    <TabsTrigger value="completed">
                      <Check className="h-4 w-4 mr-2" /> Completed ({coreDataCloudProjects.completed.length})
                    </TabsTrigger>
                  )}
                  {coreDataCloudProjects.ongoing?.length > 0 && (
                    <TabsTrigger value="ongoing">
                      <Clock className="h-4 w-4 mr-2" /> Ongoing ({coreDataCloudProjects.ongoing.length})
                    </TabsTrigger>
                  )}
                   {coreDataCloudProjects.upcoming?.length > 0 && (
                    <TabsTrigger value="upcoming">
                      <Calendar className="h-4 w-4 mr-2" /> Upcoming ({coreDataCloudProjects.upcoming.length})
                    </TabsTrigger>
                  )}
                </TabsList>

                {/* Completed Projects */}
                 {coreDataCloudProjects.completed?.length > 0 && (
                  <TabsContent value="completed" className="space-y-6">
                    {coreDataCloudProjects.completed.map((project, index) => (
                      <Card key={index} className="overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                         <div className="md:flex">
                           {project.image && (
                            <div className="md:w-1/3 flex-shrink-0 bg-muted">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="h-48 md:h-full w-full object-cover"
                              />
                            </div>
                          )}
                           <div className={`p-6 flex-1 ${project.image ? 'md:w-2/3' : ''}`}>
                             <CardTitle className="mb-2">{project.title}</CardTitle>
                             {project.client && <p className="text-sm text-muted-foreground mb-1">Client: {project.client}</p>}
                             <CardDescription className="mb-4">{project.description}</CardDescription>

                             <div className="space-y-4 mt-4">
                               {project.challenge && (
                                <div>
                                  <h4 className="font-medium mb-1 text-sm uppercase tracking-wider text-muted-foreground">Challenge</h4>
                                  <p className="text-sm">{project.challenge}</p>
                                </div>
                              )}
                               {project.solution?.length > 0 && (
                                <div>
                                  <h4 className="font-medium mb-1 text-sm uppercase tracking-wider text-muted-foreground">Our Solution</h4>
                                  <ul className="space-y-1 list-disc pl-5 text-sm">
                                    {project.solution.map((item, i) => (
                                      <li key={i}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                               {project.outcomes?.length > 0 && (
                                <div>
                                  <h4 className="font-medium mb-1 text-sm uppercase tracking-wider text-muted-foreground">Outcomes</h4>
                                  <ul className="space-y-1 list-disc pl-5 text-sm">
                                    {project.outcomes.map((item, i) => (
                                      <li key={i}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                             </div>

                              {project.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-border/50">
                                  {project.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                  ))}
                                </div>
                              )}
                           </div>
                         </div>
                       </Card>
                    ))}
                  </TabsContent>
                )}


                {/* Ongoing Projects */}
                 {coreDataCloudProjects.ongoing?.length > 0 && (
                     <TabsContent value="ongoing" className="space-y-6">
                         {coreDataCloudProjects.ongoing.map((project, index) => (
                             <Card key={index} className="bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                 {/* Reuse the detailed ongoing project card structure */}
                                 {/* ... (Copy the structure from the original component, replacing details.projects... with coreDataCloudProjects...) ... */}
                                  <div className="flex flex-col md:flex-row">
                                    {/* Image Section (Optional) */}
                                    {project.image && (
                                        <div className="md:w-[30%] flex-shrink-0 bg-muted">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-48 md:h-full object-cover"
                                        />
                                        </div>
                                    )}

                                    {/* Content Section */}
                                    <div className={`flex-1 p-6 ${project.image ? 'md:w-[70%]' : ''}`}>
                                        {/* Header Section */}
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                                        <div>
                                            <CardTitle>{project.title}</CardTitle>
                                            {project.client && <p className="text-sm text-muted-foreground mt-1">Client: {project.client}</p>}
                                            <CardDescription className="mt-1">{project.description}</CardDescription>
                                        </div>
                                        {(project.progress || project.timeline?.currentProgress) && (
                                            <div className="w-full md:w-48 mt-4 md:mt-0 flex-shrink-0">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>Progress</span>
                                                <span>{project.timeline?.currentProgress ?? project.progress}%</span>
                                            </div>
                                            <Progress
                                                value={project.timeline?.currentProgress ?? project.progress ?? 0}
                                                className="h-2"
                                            />
                                            </div>
                                        )}
                                        </div>

                                        {/* Timeline Section */}
                                        {project.timeline?.phases?.length && (
                                            <div className="mb-6">
                                                <h4 className="font-medium mb-4 flex items-center gap-2 text-base">
                                                <Timer className="h-5 w-5 text-primary" />
                                                Project Timeline
                                                </h4>
                                                {/* Choose one timeline style */}
                                                {/* Style 1: Grid */}
                                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                                   {project.timeline.phases.map((phase, idx) => (
                                                     <div key={idx} className="relative p-4 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/30 transition-colors">
                                                       <div className="flex items-start gap-3">
                                                          <div className={`p-1.5 rounded-full mr-2 mt-1 ${
                                                             phase.completed ? 'bg-green-500' : phase.current ? 'bg-primary ring-2 ring-primary/50 ring-offset-2 ring-offset-background' : 'bg-muted-foreground/50'
                                                          }`}>
                                                             {phase.completed ? <Check className="h-3 w-3 text-white"/> : phase.current ? <Clock className="h-3 w-3 text-primary-foreground"/> : <Calendar className="h-3 w-3 text-muted-foreground"/>}
                                                          </div>
                                                         <div className="flex-1">
                                                            <h5 className="font-medium text-sm">{phase.name}</h5>
                                                            {phase.description && <p className="text-xs text-muted-foreground mt-1">{phase.description}</p>}
                                                            {phase.date && <p className="text-xs text-muted-foreground mt-1">{phase.date}</p>}
                                                            {/* Optional Phase Progress */}
                                                            {/* {phase.progress && <Progress value={phase.progress} className="h-1 mt-2" />} */}
                                                         </div>
                                                       </div>
                                                     </div>
                                                   ))}
                                                </div>
                                                 {/* Style 2: Linear (uncomment if preferred) */}
                                                 {/* <ol className="relative border-l border-border/50 ml-2">
                                                    {project.timeline.phases.map((phase, idx) => (
                                                      <li key={idx} className="mb-6 ml-6">
                                                         <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-4 ring-background ${
                                                            phase.completed ? 'bg-green-500' : phase.current ? 'bg-primary' : 'bg-muted-foreground/50'
                                                         }`}>
                                                            {phase.completed ? <Check className="w-3 h-3 text-white" /> : phase.current ? <Clock className="w-3 h-3 text-primary-foreground"/> : <Calendar className="w-3 h-3 text-muted-foreground"/>}
                                                         </span>
                                                         <h5 className="flex items-center mb-1 text-base font-semibold">{phase.name} {phase.date && <span className="bg-primary/10 text-primary text-xs font-medium mr-2 px-2.5 py-0.5 rounded ml-3">{phase.date}</span>}</h5>
                                                         {phase.description && <p className="text-sm font-normal text-muted-foreground">{phase.description}</p>}
                                                         {phase.progress && <Progress value={phase.progress} className="h-1 mt-2" />}
                                                      </li>
                                                   ))}
                                                 </ol> */}
                                            </div>
                                        )}


                                        {/* Content Details Section */}
                                        <div className="space-y-6">
                                            {project.challenge && (
                                                <div>
                                                <h4 className="font-medium mb-2 flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
                                                    <FileCode className="h-4 w-4" />
                                                    Challenge
                                                </h4>
                                                <p className="text-sm pl-6">{project.challenge}</p>
                                                </div>
                                            )}

                                            {project.solution?.length > 0 && (
                                                <div>
                                                <h4 className="font-medium mb-2 flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
                                                    <CheckCircle className="h-4 w-4" />
                                                    Our Solution / Approach
                                                </h4>
                                                <ul className="space-y-2 pl-6 text-sm list-disc">
                                                    {project.solution.map((item, i) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                                </div>
                                            )}
                                            {/* Expected Outcomes for Ongoing */}
                                            {project.outcomes?.length > 0 && (
                                                <div>
                                                <h4 className="font-medium mb-2 flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
                                                     <BarChart className="h-4 w-4" /> {/* Using BarChart for expected */}
                                                    Expected Outcomes
                                                </h4>
                                                <ul className="space-y-2 pl-6 text-sm list-disc">
                                                    {project.outcomes.map((item, i) => (
                                                        <li key={i}>{item}</li>
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
                                                    className="flex items-center gap-1.5 hover:bg-primary/5 text-xs"
                                                >
                                                    {/* <Cpu className="h-3.5 w-3.5 text-muted-foreground" /> */}
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
                 {coreDataCloudProjects.upcoming?.length > 0 && (
                   <TabsContent value="upcoming" className="space-y-6">
                     {coreDataCloudProjects.upcoming.map((project, index) => (
                       <Card key={index} className="border border-border bg-card shadow-sm">
                         <CardHeader>
                           <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                             <CardTitle>{project.title}</CardTitle>
                             {project.startDate && (
                               <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700 whitespace-nowrap mt-2 sm:mt-0 text-xs">
                                 Est. Start: {project.startDate}
                               </Badge>
                             )}
                           </div>
                           <CardDescription className="mt-2">{project.description}</CardDescription>
                         </CardHeader>
                         <CardContent className="space-y-4">
                           {project.challenge && (
                               <div>
                                   <h4 className="font-medium mb-1 text-sm uppercase tracking-wider text-muted-foreground">Anticipated Challenge</h4>
                                   <p className="text-sm">{project.challenge}</p>
                               </div>
                           )}
                           {project.solution?.length > 0 && ( // Planned Solution
                               <div>
                                   <h4 className="font-medium mb-1 text-sm uppercase tracking-wider text-muted-foreground">Planned Approach</h4>
                                   <ul className="space-y-1 list-disc pl-5 text-sm">
                                       {project.solution.map((item, i) => (
                                           <li key={i}>{item}</li>
                                       ))}
                                   </ul>
                               </div>
                           )}
                           {project.tags?.length > 0 && (
                             <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                               {project.tags.map((tag, idx) => (
                                 <Badge key={idx} variant="secondary">{tag}</Badge>
                               ))}
                             </div>
                           )}
                         </CardContent>
                       </Card>
                     ))}
                   </TabsContent>
                 )}
              </Tabs>
            </div>
          </section>
        )}

        {/* --- Section 7: Industry Applications --- */}
        {/* Use coreDataCloudIndustries directly */}
         {industries && (industries.current?.length > 0 || industries.potential?.length > 0 || industries.future?.length > 0) && (
            <section className="py-12 bg-background">
              <div className="container mx-auto px-4 max-w-5xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Industry Applications</h2>

                <Tabs
                  value={selectedIndustryCategory}
                  onValueChange={handleIndustryCategoryChange}
                  className="w-full"
                >
                  <div className="mb-8 overflow-x-auto pb-2">
                    <TabsList className="mb-2 h-auto p-1 bg-muted/70 w-full sm:w-auto inline-flex">
                       {industries.current?.length > 0 && (
                        <TabsTrigger value="current" className="px-4 py-2 text-sm flex-1 sm:flex-initial">
                          Current Focus
                        </TabsTrigger>
                      )}
                       {industries.potential?.length > 0 && (
                        <TabsTrigger value="potential" className="px-4 py-2 text-sm flex-1 sm:flex-initial">
                          Potential Growth
                        </TabsTrigger>
                      )}
                       {industries.future?.length > 0 && (
                        <TabsTrigger value="future" className="px-4 py-2 text-sm flex-1 sm:flex-initial">
                          Future Opportunities
                        </TabsTrigger>
                      )}
                    </TabsList>

                    {/* Industry Buttons */}
                    {selectedIndustryCategory && industries[selectedIndustryCategory as keyof typeof industries] && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {(industries[selectedIndustryCategory as keyof typeof industries] as IndustryDetail[]).map((industry, index) => (
                          <Button
                            key={index}
                            variant={selectedIndustry === industry.name ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedIndustry(industry.name)}
                            className={cn("rounded-full text-xs md:text-sm transition-colors duration-200",
                              selectedIndustry === industry.name && "shadow-md", // Add shadow to selected
                              selectedIndustry !== industry.name && "text-muted-foreground hover:bg-accent hover:text-accent-foreground", // Style non-selected
                              // Optional category-specific colors
                              selectedIndustry === industry.name && selectedIndustryCategory === "current" && "bg-green-600 hover:bg-green-700 text-white",
                              selectedIndustry === industry.name && selectedIndustryCategory === "potential" && "bg-blue-600 hover:bg-blue-700 text-white",
                              selectedIndustry === industry.name && selectedIndustryCategory === "future" && "bg-orange-600 hover:bg-orange-700 text-white",
                            )}
                          >
                            {industry.name}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Industry Details Card */}
                   <AnimatePresence mode="wait">
                     <motion.div
                        key={selectedIndustry || 'placeholder'} // Change key on selection change
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                     >
                        <Card className="bg-card border border-border shadow-sm min-h-[300px] flex flex-col">
                        <CardContent className="p-6 flex-grow">
                            {industryData ? (
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold">{industryData.name}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {industryData.challenges && industryData.challenges.length > 0 && (
                                    <div>
                                    <h4 className="font-semibold text-base mb-2 text-primary/90">Challenges</h4>
                                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                                        {industryData.challenges.map((challenge, idx) => (<li key={idx}>{challenge}</li>))}
                                    </ul>
                                    </div>
                                )}
                                {industryData.solutions && industryData.solutions.length > 0 && (
                                    <div>
                                    <h4 className="font-semibold text-base mb-2 text-primary/90">Our Solutions</h4>
                                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                                        {industryData.solutions.map((solution, idx) => (<li key={idx}>{solution}</li>))}
                                    </ul>
                                    </div>
                                )}
                                {industryData.caseStudy && (
                                     // Make case study span full width if it's the only item in its row
                                    <div className={cn("md:col-span-1", (!industryData.challenges || !industryData.solutions || industryData.challenges.length === 0 || industryData.solutions.length === 0) && "md:col-span-2")}>
                                    <h4 className="font-semibold text-base mb-2 text-primary/90">Case Study / Example</h4>
                                    <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground text-sm">
                                        "{industryData.caseStudy}"
                                    </blockquote>
                                    </div>
                                )}
                                {industryData.futureOutlook && (
                                    <div className="md:col-span-2 pt-4 border-t border-border/50">
                                        <h4 className="font-semibold text-base mb-2 text-primary/90">Future Outlook</h4>
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
                        </CardContent>
                        </Card>
                    </motion.div>
                  </AnimatePresence>
                </Tabs>
              </div>
            </section>
          )}

        {/* --- Section 8: Insights & Resources --- */}
        {/* Use coreDataCloudData.blogPosts directly */}
        {coreDataCloudData.blogPosts && coreDataCloudData.blogPosts.length > 0 && (
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Insights & Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coreDataCloudData.blogPosts.map((post, index) => (
                  <Card key={index} className="overflow-hidden flex flex-col border border-border bg-card hover:shadow-lg transition-shadow">
                    {post.image && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader className="flex-grow pb-2"> {/* Reduced padding bottom */}
                      <CardTitle className="text-lg leading-snug">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow pt-0"> {/* Removed top padding */}
                      <CardDescription className="text-sm line-clamp-3">{post.excerpt}</CardDescription>
                    </CardContent>
                    <CardFooter className="p-4 pt-2 border-t border-border"> {/* Adjusted padding */}
                     {/* Link to actual blog post if available */}
                      <Button variant="link" asChild className="w-full justify-start px-0 text-primary font-semibold">
                       <Link to="/blog"> {/* Update this link path */}
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
               <div className="text-center mt-10">
                    <Button asChild variant="outline">
                        <Link to="/blog"> {/* Update this link path */}
                            View All Insights
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
          </section>
        )}

        {/* --- Section 9: Call to Action --- */}
        <section className="py-16 bg-gradient-to-t from-primary/10 to-background border-t border-border">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Scale Your Data & Cloud Infrastructure?</h2>
              <p className="mb-8 text-muted-foreground">
                Let's discuss how our {displayTitle} can empower your business. Schedule a free consultation with our experts today.
              </p>
              {/* Update link/action for CTA */}
              <Button size="lg" asChild className="rounded-full px-8 py-3 h-auto">
                <Link to="/contact">
                    Schedule a Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CoreDataCloudPage; // Export the specific page component