// ServiceDetail.tsx - Responsive Fixed Version
import React, { useState, useEffect, useMemo, useCallback } from "react";
import SEO from '@/components/common/SEO';
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  FileCode,
  Code,
  Check,
  Calendar,
  XCircle,
  BarChart,
  Database,
  CheckCircle,
  Cpu,
  Timer,
  ChevronDown,
  ChevronUp,
  FileText,
  Globe,
  Zap,
  Shield,
  TrendingUp,
  Target,
  Users,
  BarChart3,
  Rocket,
  type LucideIcon
} from "lucide-react";
import BlogCard from "@/components/Blog/BlogCard"; // Import BlogCard
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card.tsx";
import { Progress } from "@/components/ui/progress";
import { serviceDetails } from "@/data/serviceDetails";
import { serviceIndustriesDetailed } from "@/data/navigationData";
import { servicesDropdown } from "@/data/navigationData";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { IndustryDetail } from "@/types/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import ConsistentPageHeader from "@/components/layout/ConsistentPageHeader";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/MotionWrapper";
import CallToAction from "@/components/home/CallToAction";

// --- Type Definitions ---
interface ServiceMeta {
  title: string;
  description: string;
  keywords: string[];
  slug: string;
  canonical: string;
  ogImage?: string;
  ogDescription?: string;
}

interface ServiceDetailsData {
  meta?: ServiceMeta;
  title?: string;
  subtitle?: string;
  overview?: string;
  description?: string;
  benefits?: string[];
  image?: string;
  technologies?: any[];
  projects?: any;
  blogPosts?: any[];
  workflow?: any[];
  subServices?: any[];
  faq?: { question: string; answer: string }[];
  testimonials?: any[];
  useCases?: {
    title: string;
    industry: string;
    challenge: string;
    solution?: string;
    outcome?: string;
    impact?: string[];
    image?: string;
  }[];
  cta?: any;
}

// Memoized constants
const defaultWorkflow = Object.freeze([
  { title: "Initial Consultation", description: "Understand needs.", icon: Clock },
  { title: "Assessment & Planning", description: "Develop action plan.", icon: FileCode },
  { title: "Implementation", description: "Execute the plan.", icon: Check },
  { title: "Evaluation & Optimization", description: "Review and refine.", icon: BarChart }
]);

// Optimized Image Component - No external dependencies
const OptimizedImage = React.memo(({
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

  // Optimize initial render state for isMobile
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const resizeHandler = () => checkMobile();
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  const optimizedSrc = useMemo(() => {
    if (!src) return null;

    if (src.includes('cloudinary.com')) {
      const width = isMobile ? 400 : 800;
      const quality = isMobile ? 'q_auto:low' : 'q_auto:good';

      if (src.includes('/upload/')) {
        return src.replace('/upload/', `/upload/${quality},w_${width},f_auto/`);
      }
    }

    return src;
  }, [src, isMobile]);

  const handleImageLoad = useCallback(() => setImageLoaded(true), []);
  const handleImageError = useCallback(() => setImageError(true), []);

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
      {!imageLoaded && (
        <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 animate-pulse rounded-lg ${className}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        </div>
      )}

      <img
        src={optimizedSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-300 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } ${className}`}
        loading="lazy"
        decoding="async"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
});

// Sub-service card component - Fixed responsive issues
const SubServiceCard = React.memo(({
  subService,
  isExpanded,
  onToggle
}: {
  subService: any;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}) => {
  const hasDetails = !!(subService.features || subService.testimonial);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 border border-border overflow-hidden hover:border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium leading-tight line-clamp-2">
            {subService.title}
          </CardTitle>
          <CardDescription className="text-sm line-clamp-2 min-h-[40px]">
            {subService.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0 pb-4 flex-grow flex flex-col overflow-hidden">
          {subService.features && subService.features.length > 0 && (
            <div className="mt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-2 text-muted-foreground">
                Key Features
              </h4>
              <ul className="space-y-1.5">
                {subService.features.slice(0, 3).map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-3 w-3 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-xs leading-relaxed line-clamp-2">{feature}</span>
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
                className="overflow-hidden mt-2"
              >
                {subService.features && subService.features.length > 3 && (
                  <div className="mt-3">
                    <ul className="space-y-1.5">
                      {subService.features.slice(3).map((feature: string, idx: number) => (
                        <li key={idx + 3} className="flex items-start">
                          <Check className="h-3 w-3 text-primary mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-xs leading-relaxed line-clamp-2">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        {hasDetails && (
          <CardFooter className="pt-0 mt-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggle(subService.id)}
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
});

const generateServiceSchema = (service: ServiceDetailsData, serviceId: string) => {
  if (!service) return null;

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.overview,
    "provider": {
      "@type": "Organization",
      "name": "Business and Data Solutions Ltd.",
      "url": "https://bdsolutions.com"
    },
    "areaServed": "Global",
    "serviceType": service.subServices?.map((sub: any) => sub.title),
    "offers": {
      "@type": "Offer",
      "description": "Custom enterprise solutions"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://bdsolutions.com/services/${serviceId}`
    }
  };

  if (service.faq && service.faq.length > 0) {
    schema.mainEntity = service.faq.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }));
  }

  return schema;
};

const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [details, setDetails] = useState<ServiceDetailsData | null>(null);
  const [industries, setIndustries] = useState<Record<string, IndustryDetail[]> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndustryCategory, setSelectedIndustryCategory] = useState<string>("current");
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [expandedSubServiceCards, setExpandedSubServiceCards] = useState<Set<string>>(new Set());
  const [expandedFAQ, setExpandedFAQ] = useState<Set<number>>(new Set());

  // SEO Effect - Update meta tags


  // Data Fetching Effect - Optimized
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      if (!serviceId) {
        setError("No service ID provided.");
        setIsLoading(false);
        navigate("/services");
        return;
      }

      try {
        await new Promise(resolve => setTimeout(resolve, 100));

        let fetchedDetails = serviceDetails[serviceId] as ServiceDetailsData | undefined;
        if (!fetchedDetails) {
          const navItem = servicesDropdown.find(item => item.path.includes(`/${serviceId}`));
          if (navItem) {
            fetchedDetails = {
              title: navItem.title,
              overview: navItem.description || `Detailed information about our ${navItem.title} service.`,
            };
          }
        }

        const fetchedIndustries = serviceIndustriesDetailed[serviceId as keyof typeof serviceIndustriesDetailed];

        if (fetchedDetails) {
          setDetails(fetchedDetails);
          setIndustries(fetchedIndustries || null);

          if (fetchedIndustries?.current?.length > 0) {
            setSelectedIndustryCategory("current");
            setSelectedIndustry(fetchedIndustries.current[0].name);
          }

          // Fetch and filter relevant blog posts
          try {
            // dynamic import to avoid SSR issues if any, and circular deps
            const { fetchBlogPosts } = await import("@/firebase/blogService");
            const allPosts = await fetchBlogPosts();

            // Relevance scoring
            const keywords = new Set([
              ...(fetchedDetails.meta?.keywords || []),
              ...(fetchedDetails.title?.toLowerCase().split(" ") || []),
              serviceId.replace(/-/g, " ")
            ].map(k => k.toLowerCase()));

            const scoredPosts = allPosts.map((post: any) => {
              let score = 0;
              const postText = `${post.title} ${post.category} ${post.tags?.join(" ")}`.toLowerCase();

              keywords.forEach(kw => {
                if (kw.length > 3 && postText.includes(kw)) {
                  score += 1;
                }
              });

              return { ...post, score };
            });

            // Sort by score (desc) then date (desc)
            const relevant = scoredPosts
              .filter((p: any) => p.score > 0)
              .sort((a: any, b: any) => b.score - a.score || new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 3);

            // If no relevant posts, fallback to latest 3
            const finalPosts = relevant.length > 0
              ? relevant
              : allPosts.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

            // Update details with dynamic blog posts (if we found any real ones)
            if (finalPosts.length > 0) {
              setDetails(prev => prev ? ({ ...prev, blogPosts: finalPosts }) : prev);
            }

          } catch (blogErr) {
            console.warn("Failed to fetch dynamic blog posts, falling back to static data", blogErr);
          }

        } else {
          setError(`Details not found for service: ${serviceId}`);
        }
      } catch (err) {
        setError("Failed to load service details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [serviceId, navigate]);

  // Memoized helper functions
  const handleToggleSubServiceExpand = useCallback((id: string): void => {
    setExpandedSubServiceCards(prev => {
      const newExpanded = new Set(prev);
      newExpanded.has(id) ? newExpanded.delete(id) : newExpanded.add(id);
      return newExpanded;
    });
  }, []);

  const handleToggleFAQ = useCallback((index: number): void => {
    setExpandedFAQ(prev => {
      const newExpanded = new Set(prev);
      newExpanded.has(index) ? newExpanded.delete(index) : newExpanded.add(index);
      return newExpanded;
    });
  }, []);

  const displayTitle = useMemo(() => {
    if (details?.title) return details.title;
    if (serviceId) return serviceId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return "Service Detail";
  }, [details, serviceId]);

  const handleIndustryCategoryChange = useCallback((category: string): void => {
    setSelectedIndustryCategory(category);
    const categoryData = industries?.[category as keyof typeof industries];
    if (categoryData && categoryData.length > 0) {
      setSelectedIndustry(categoryData[0].name);
    } else {
      setSelectedIndustry(null);
    }
  }, [industries]);

  const industryData = useMemo(() => {
    if (!industries || !selectedIndustryCategory || !selectedIndustry) return null;
    const categoryIndustries = industries[selectedIndustryCategory as keyof typeof industries];
    if (!categoryIndustries || !Array.isArray(categoryIndustries)) return null;
    return categoryIndustries.find(ind => ind.name === selectedIndustry) || null;
  }, [industries, selectedIndustryCategory, selectedIndustry]);

  // Memoized sections
  const benefitsSection = useMemo(() => {
    if (!details?.benefits?.length) return null;

    return (
      <div className="mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Value Proposition</Badge>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Key Benefits & Outcomes</h3>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {details.benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-3xl bg-white dark:bg-white/5 border border-border shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Check className="h-6 w-6" />
              </div>
              <p className="text-lg font-medium leading-relaxed line-clamp-3">{benefit}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }, [details?.benefits]);

  const subServicesSection = useMemo(() => {
    if (!details?.subServices?.length) return null;

    return (
      <section className="py-16 bg-muted/20 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Core Components</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto px-4">
              Comprehensive and scalable modules designed to build your ideal solution framework.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {details.subServices.map((subService: any, index: number) => (
              <SubServiceCard
                key={subService.id}
                subService={subService}
                isExpanded={expandedSubServiceCards.has(subService.id)}
                onToggle={handleToggleSubServiceExpand}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }, [details?.subServices, expandedSubServiceCards, handleToggleSubServiceExpand]);

  const faqSection = useMemo(() => {
    if (!details?.faq?.length) return null;

    return (
      <section className="py-12 bg-muted/10 overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center px-4">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 px-4">
            {details.faq.map((faq: any, index: number) => {
              const isExpanded = expandedFAQ.has(index);
              return (
                <Card key={index} className="border border-border overflow-hidden">
                  <CardHeader
                    className="pb-3 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleToggleFAQ(index)}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium line-clamp-2 pr-8">
                        {faq.question}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 flex-shrink-0"
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardContent className="pt-0">
                          <p className="text-muted-foreground leading-relaxed break-words">
                            {faq.answer}
                          </p>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    );
  }, [details?.faq, expandedFAQ, handleToggleFAQ]);

  const blogSection = useMemo(() => {
    if (!details?.blogPosts?.length) return null;

    return (
      <section className="py-16 bg-background overflow-hidden border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-3 py-1">
                Latest Insights
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Related Articles & Thinking
              </h2>
            </div>
            <Button variant="outline" onClick={() => navigate('/blog')}>
              View All Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {details.blogPosts.map((post: any, index: number) => {
              // Ensure we have necessary props for BlogCard, providing fallbacks
              const normalizedPost = {
                id: post.id || `temp-${index}`,
                title: post.title,
                excerpt: post.excerpt,
                image: post.image,
                category: post.category || "Insight",
                date: post.date || "Recently Updated",
                readTime: post.readTime || "5 min read",
                ...post
              };

              return (
                <div key={index} className="h-full border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-card">
                  {/* Reuse BlogCard but wrapping in a div for layout control if needed */}
                  <BlogCard post={normalizedPost} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }, [details?.blogPosts, navigate]);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col dark:bg-black border dark:text-gray-100">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading service details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex flex-col dark:bg-black border dark:text-gray-100">
        <main className="flex-grow flex items-center justify-center py-16 px-4">
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
              <Button onClick={() => navigate("/services")} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="min-h-screen flex flex-col dark:bg-black border dark:text-gray-100">
        <main className="flex-grow flex items-center justify-center py-16 px-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold mb-4">Service Details Unavailable</h1>
            <Button onClick={() => navigate("/services")} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={details.meta?.title || details.title || 'Service Detail'}
        description={details.meta?.description || details.overview?.substring(0, 160) || ''}
        keywords={details.meta?.keywords?.join(', ')}
        url={details.meta?.canonical || window.location.href}
        image={details.image}
      >
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateServiceSchema(details, serviceId || ''))
          }}
        />
      </SEO>

      <ConsistentPageHeader
        title={displayTitle}
        description={details.subtitle || details.overview?.split('.')[0] + '.' || ""}
        backgroundImage={details.image}
        categoryLabel="Service Details"
        backLink="/services"
        backLinkLabel="Back to Services Overview"
      />

      <main className="flex-grow relative overflow-hidden">
        {/* Dynamic Background Design Elements */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_70%)]" />
          <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse hidden lg:block" />
          <div className="absolute top-[60%] -left-40 w-[700px] h-[700px] bg-purple-500/8 rounded-full blur-[150px] hidden lg:block" />

          {/* Floating background icons for visual texture */}
          <div className="absolute top-40 left-[15%] opacity-[0.03] rotate-12 hidden lg:block">
            <Globe size={150} />
          </div>
          <div className="absolute top-[80%] right-[10%] opacity-[0.02] -rotate-12 hidden lg:block">
            <Zap size={200} />
          </div>
          <div className="absolute top-[40%] left-[5%] opacity-[0.015] rotate-45 hidden lg:block">
            <Shield size={180} />
          </div>
        </div>

        <section className="py-12 md:py-16 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeUp>
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-3 py-1">
                  Service Overview
                </Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8 tracking-tighter leading-tight">
                  Solving Complex <br className="hidden md:block" />
                  Challenges with <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">Intelligence</span>
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  {details.description ? (
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 break-words">
                      {details.description}
                    </p>
                  ) : (
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 break-words">
                      {details.overview}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 mt-8">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border text-sm font-medium">
                    <Rocket className="w-4 h-4 text-primary" /> Scalable
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border text-sm font-medium">
                    <Shield className="w-4 h-4 text-primary" /> Secure
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border text-sm font-medium">
                    <Zap className="w-4 h-4 text-primary" /> Performant
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.2} className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-2xl rounded-full opacity-50 hidden md:block" />
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-border shadow-2xl">
                  {details.image ? (
                    <OptimizedImage
                      src={details.image}
                      alt={displayTitle}
                      className="transition-transform duration-700 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Database className="w-16 h-16 text-primary/40" />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-6 -right-6 bg-background p-6 rounded-3xl border border-border shadow-2xl hidden md:block max-w-[280px]">
                  <div className="flex items-center gap-4 p-4 bg-primary/[0.03] dark:bg-primary/[0.05] rounded-2xl border border-primary/10">
                    <div className="p-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-bold text-base block">Enterprise Ready</span>
                      <p className="text-xs text-muted-foreground font-medium">Verified Architecture</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Benefits Section Rendered in Full Width / New Row */}
            {benefitsSection}
          </div>
        </section>

        {/* --- Stats / Impact Section --- */}
        <section className="pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-3xl p-4 md:p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 text-blue-600">
                  <TrendingUp size={20} className="md:w-6 md:h-6" />
                </div>
                <div className="text-xl md:text-3xl font-black mb-1">45%</div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Efficiency Gain</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-3xl p-4 md:p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-8 h-8 md:w-12 md:h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 text-purple-600">
                  <Shield size={20} className="md:w-6 md:h-6" />
                </div>
                <div className="text-xl md:text-3xl font-black mb-1">99.9%</div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Uptime Record</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-3xl p-4 md:p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-8 h-8 md:w-12 md:h-12 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 text-green-600">
                  <Target size={20} className="md:w-6 md:h-6" />
                </div>
                <div className="text-xl md:text-3xl font-black mb-1">2.4x</div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">ROI Multiplier</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-3xl p-4 md:p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-8 h-8 md:w-12 md:h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 text-orange-600">
                  <Users size={20} className="md:w-6 md:h-6" />
                </div>
                <div className="text-xl md:text-3xl font-black mb-1">500+</div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Success Deployments</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- Use Cases Section --- */}
        {details.useCases && details.useCases.length > 0 && (
          <section className="py-16 bg-muted/30 relative overflow-hidden">
            {/* Background watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-bold text-gray-200/20 dark:text-white/5 pointer-events-none select-none uppercase tracking-tighter -z-10 hidden md:block">
              Results
            </div>
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="max-w-2xl">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Solutions in Action</h2>
                  <p className="text-lg text-muted-foreground break-words">
                    See how we've helped organizations transform their operations and achieve measurable results.
                  </p>
                </div>
                <Button variant="outline" className="hidden md:flex rounded-full px-6" onClick={() => navigate('/use-cases')}>
                  View All Success Stories <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {details.useCases.map((useCase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full border border-border overflow-hidden hover:shadow-xl transition-all duration-300 group">
                      <div className="grid grid-cols-1 md:grid-cols-5 h-full">
                        <div className="md:col-span-2 relative overflow-hidden bg-muted">
                          {useCase.image ? (
                            <OptimizedImage
                              src={useCase.image}
                              alt={useCase.title}
                              className="transition-transform duration-500 group-hover:scale-110 h-48 md:h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-48 md:h-full flex items-center justify-center">
                              <FileCode className="w-12 h-12 text-primary/20" />
                            </div>
                          )}
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-primary/90 backdrop-blur-sm text-xs">{useCase.industry}</Badge>
                          </div>
                        </div>
                        <div className="md:col-span-3 p-6 md:p-8 flex flex-col">
                          <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
                            {useCase.title}
                          </h3>

                          <div className="space-y-4 mb-6 flex-grow">
                            <div>
                              <h4 className="text-xs font-bold uppercase text-primary/70 mb-1">The Challenge</h4>
                              <p className="text-sm text-foreground/80 line-clamp-3 leading-relaxed break-words">
                                {useCase.challenge}
                              </p>
                            </div>

                            {useCase.impact && (
                              <div>
                                <h4 className="text-xs font-bold uppercase text-primary/70 mb-2">Key Outcomes</h4>
                                <ul className="space-y-2">
                                  {useCase.impact.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                      <div className="h-4 w-4 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5">
                                        <Check className="h-2.5 w-2.5 text-green-600" />
                                      </div>
                                      <span className="break-words">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          <Button variant="link" className="p-0 h-auto w-fit text-sm font-semibold hover:text-primary" onClick={() => navigate('/use-cases')}>
                            Read Full Details <ArrowRight className="ml-2 h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* --- Section 3: Core Components --- */}
        {subServicesSection}

        {/* --- Blog / Insights Section --- */}
        {blogSection}

        {/* --- Section 4: FAQ Section --- */}
        {faqSection}

        {/* --- Section 5: Technologies We Use --- */}
        {details.technologies && details.technologies.length > 0 && (
          <section className="py-12 overflow-hidden">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 px-4">Technologies We Use</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {details.technologies.map((tech, index) => (
                  <Card key={index} className="border border-border hover:shadow-md transition-shadow h-full">
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        {tech.logo && (
                          <div className="w-8 h-8 flex-shrink-0">
                            <img
                              src={tech.logo}
                              alt={`${tech.name} logo`}
                              className="w-full h-full object-contain"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <CardTitle className="text-lg line-clamp-1">{tech.name}</CardTitle>
                      </div>

                      {tech.category && (
                        <Badge variant="secondary" className="w-fit text-xs">
                          {tech.category}
                          {tech.icon && <tech.icon className="w-4 h-4 mr-2" />}
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <CardDescription className="line-clamp-3">{tech.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* --- Section 6: Testimonials --- */}
        {details.testimonials && details.testimonials.length > 0 && (
          <section className="py-12 bg-muted/20 overflow-hidden">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center px-4">
                Client Success Stories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                {details.testimonials.map((testimonial, index) => (
                  <Card key={index} className="border border-border h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <p className="text-lg italic mb-4 line-clamp-4">"{testimonial.quote}"</p>
                          <div className="border-t pt-4">
                            <p className="font-semibold line-clamp-1">{testimonial.author}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1">{testimonial.metrics}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section 6: Our Work & Projects */}
        {details.projects && (details.projects.completed || details.projects.ongoing || details.projects.upcoming) && (
          <section className="py-12 border-t border-border overflow-hidden">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Our Work & Projects</h2>

              <Tabs defaultValue={details.projects.completed?.length ? "completed" : (details.projects.ongoing?.length ? "ongoing" : "upcoming")} className="w-full">
                <TabsList className="mb-6 grid w-full grid-cols-1 sm:grid-cols-3 gap-2">
                  {details.projects.completed && details.projects.completed.length > 0 && (
                    <TabsTrigger value="completed" className="truncate">
                      <Check className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">Completed ({details.projects.completed.length})</span>
                    </TabsTrigger>
                  )}
                  {details.projects.ongoing && details.projects.ongoing.length > 0 && (
                    <TabsTrigger value="ongoing" className="truncate">
                      <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">Ongoing ({details.projects.ongoing.length})</span>
                    </TabsTrigger>
                  )}
                  {details.projects.upcoming && details.projects.upcoming.length > 0 && (
                    <TabsTrigger value="upcoming" className="truncate">
                      <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">Upcoming ({details.projects.upcoming.length})</span>
                    </TabsTrigger>
                  )}
                </TabsList>

                {/* Completed Projects */}
                {details.projects.completed && (
                  <TabsContent value="completed" className="space-y-6">
                    {details.projects.completed.map((project, index) => (
                      <Card key={index} className="overflow-hidden border border-border">
                        <div className="flex flex-col md:flex-row">
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
                          <div className="p-4 md:p-6 flex-1">
                            <CardTitle className="mb-2 line-clamp-2">{project.title}</CardTitle>
                            <CardDescription className="mb-4 line-clamp-2">{project.description}</CardDescription>

                            <div className="space-y-4">
                              {project.challenge && (
                                <div>
                                  <h4 className="font-medium mb-1">Challenge</h4>
                                  <p className="text-sm line-clamp-3">{project.challenge}</p>
                                </div>
                              )}
                              {project.solution?.length > 0 && (
                                <div>
                                  <h4 className="font-medium mb-1">Our Solution</h4>
                                  <ul className="space-y-1 list-disc pl-5 text-sm">
                                    {project.solution.map((item, i) => (
                                      <li key={i} className="line-clamp-2">{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {project.outcomes?.length > 0 && (
                                <div>
                                  <h4 className="font-medium mb-1">Outcomes</h4>
                                  <ul className="space-y-1 list-disc pl-5 text-sm">
                                    {project.outcomes.map((item, i) => (
                                      <li key={i} className="line-clamp-2">{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {project.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                  {project.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                                  ))}
                                </div>
                              )}
                            </div>
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
                      <Card key={index} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row">
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
                          <div className="flex-1 p-4 md:p-6">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                              <div className="flex-1">
                                <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                                <CardDescription className="mt-1 line-clamp-2">{project.description}</CardDescription>
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
                                        <div className={`p-2 rounded-lg ${phase.completed ? 'bg-green-500/10 text-green-500' :
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
                                        <div className="flex-1 min-w-0">
                                          <div className="flex justify-between items-start gap-2">
                                            <h5 className="font-medium line-clamp-1">{phase.name}</h5>
                                            {phase.date && (
                                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                {phase.date}
                                              </span>
                                            )}
                                          </div>
                                          {phase.description && (
                                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
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
                                                indicatorClassName={
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

                            <div className="space-y-6">
                              {project.challenge && (
                                <div>
                                  <h4 className="font-medium mb-2 flex items-center gap-2">
                                    <FileCode className="h-5 w-5 text-primary" />
                                    Challenge
                                  </h4>
                                  <p className="text-sm pl-7 line-clamp-3">{project.challenge}</p>
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
                                        className="text-sm relative before:absolute before:left-[-18px] before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary line-clamp-2"
                                      >
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>

                            {project.tags?.length > 0 && (
                              <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-border/50">
                                {project.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="outline"
                                    className="flex items-center gap-1.5 hover:bg-primary/5 text-xs"
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
                      <Card key={index} className="border border-border">
                        <CardHeader>
                          <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                            <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                            {project.startDate && (
                              <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-700 whitespace-nowrap text-xs">
                                Est. Start: {project.startDate}
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {project.tags?.map((tag, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
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
          <section className="py-16 md:py-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10 hidden md:block" />
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight px-4">Industry Applications</h2>
                <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-6" />
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto px-4 break-words">
                  Tailored implementations across various sectors, addressing unique operational challenges.
                </p>
              </div>

              <Tabs
                defaultValue={selectedIndustryCategory}
                value={selectedIndustryCategory}
                onValueChange={handleIndustryCategoryChange}
                className="w-full"
              >
                <div className="mb-8 overflow-x-auto pb-2 px-4">
                  <TabsList className="mb-2 h-auto p-1 bg-muted/70 w-full min-w-max">
                    {industries.current && industries.current.length > 0 && (
                      <TabsTrigger value="current" className="px-4 py-2 text-sm whitespace-nowrap">
                        Current Industries
                      </TabsTrigger>
                    )}
                    {industries.potential && industries.potential.length > 0 && (
                      <TabsTrigger value="potential" className="px-4 py-2 text-sm whitespace-nowrap">
                        Potential Industries
                      </TabsTrigger>
                    )}
                    {industries.future && industries.future.length > 0 && (
                      <TabsTrigger value="future" className="px-4 py-2 text-sm whitespace-nowrap">
                        Future Industries
                      </TabsTrigger>
                    )}
                  </TabsList>

                  {selectedIndustryCategory &&
                    industries[selectedIndustryCategory as keyof typeof industries] && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {(industries[selectedIndustryCategory as keyof typeof industries] as IndustryDetail[]).map((industry, index) => (
                          <Button
                            key={index}
                            variant={selectedIndustry === industry.name ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedIndustry(industry.name)}
                            className={cn("rounded-full text-xs md:text-sm whitespace-nowrap",
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

                <div className="border border-border rounded-lg p-4 md:p-6 shadow-sm min-h-[200px] mx-4">
                  {industryData ? (
                    <div className="space-y-6 overflow-hidden">
                      <h3 className="text-xl font-bold mb-2 line-clamp-1">{selectedIndustry}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {industryData.challenges && industryData.challenges.length > 0 && (
                          <div className="overflow-hidden">
                            <h4 className="font-semibold text-lg mb-2 text-primary/80">Challenges</h4>
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                              {industryData.challenges.map((challenge, idx) => (
                                <li key={idx} className="line-clamp-3">{challenge}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {industryData.solutions && industryData.solutions.length > 0 && (
                          <div className="overflow-hidden">
                            <h4 className="font-semibold text-lg mb-2 text-primary/80">Our Solutions</h4>
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                              {industryData.solutions.map((solution, idx) => (
                                <li key={idx} className="line-clamp-3">{solution}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {industryData.caseStudy && (
                          <div className="md:col-span-2 overflow-hidden">
                            <h4 className="font-semibold text-lg mb-2 text-primary/80">Case Study / Example</h4>
                            <p className="text-muted-foreground text-sm italic line-clamp-4">"{industryData.caseStudy}"</p>
                          </div>
                        )}
                        {industryData.futureOutlook && (
                          <div className="md:col-span-2 overflow-hidden">
                            <h4 className="font-semibold text-lg mb-2 text-primary/80">Future Outlook</h4>
                            <p className="text-muted-foreground text-sm line-clamp-4">{industryData.futureOutlook}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 flex flex-col items-center justify-center h-full">
                      <BarChart className="w-12 h-12 text-muted-foreground mb-4" aria-hidden="true" />
                      <p className="text-muted-foreground px-4">
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
          <section className="py-16 md:py-20 bg-muted/30 overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight px-4">Knowledge Base</h2>
                <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-6" />
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto px-4 break-words">
                  Stay updated with the latest trends and architectural best practices in {displayTitle}.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {details.blogPosts.map((post, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="h-full"
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
                        <CardTitle className="text-lg leading-snug line-clamp-2 min-h-[56px]">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <CardDescription className="text-sm line-clamp-3 leading-relaxed min-h-[60px]">
                          {post.excerpt}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="pt-0 mt-auto">
                        <Button
                          variant="link"
                          className="w-full justify-start px-0 text-primary text-sm"
                          onClick={() => {
                            if (post.id) {
                              navigate(`/blog/${post.id}`);
                            } else if (post.slug) {
                              navigate(`/blog/${post.slug}`);
                            } else {
                              // Fallback to general blog page
                              navigate('/blog');
                            }
                          }}
                        >
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

        {/* --- Section 9: Enhanced Call to Action --- */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className={cn(
              "rounded-3xl md:rounded-[3rem] p-8 md:p-20 overflow-hidden relative group",
              "bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white shadow-2xl shadow-blue-500/40"
            )}>
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-1000 rotate-12 hidden md:block">
                <Rocket size={400} />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
                <FadeUp>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest mb-8">
                    Start Your Transformation
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-8 leading-tight px-4">
                    Ready to Scale with <br className="hidden md:block" />
                    {displayTitle}?
                  </h2>
                  <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed text-blue-50 px-4 break-words">
                    Partner with our engineering experts to deploy scalable, secure, and intelligent solutions tailored for your business growth.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full max-w-md sm:max-w-none sm:w-auto px-4">
                    <ConsultationButton className="text-base md:text-lg px-6 md:px-10 py-4 md:py-7 rounded-xl md:rounded-2xl shadow-2xl hover:scale-105 transition-transform bg-white text-blue-600 hover:bg-gray-50 border-0" />
                    <Button
                      onClick={() => navigate('/contact')}
                      variant="outline"
                      className="text-base md:text-lg px-6 md:px-10 py-4 md:py-7 rounded-xl md:rounded-2xl border-white/30 bg-transparent text-white hover:bg-white/10 backdrop-blur-sm"
                    >
                      Contact Team
                    </Button>
                  </div>

                  <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-sm font-medium opacity-80 px-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="md:w-5 md:h-5" /> Architecture Review
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="md:w-5 md:h-5" /> ROI Analysis
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="md:w-5 md:h-5" /> 24/7 Technical Support
                    </div>
                  </div>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ServiceDetail;
