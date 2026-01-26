import React, { memo } from "react";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles, MessageCircle, Calendar, ArrowUpRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Define page types and their corresponding CTAs
export type PageType =
  | 'home'
  | 'about'
  | 'services'
  | 'industries'
  | 'contact'
  | 'solutions'

  | 'careers'
  | 'testimonials'
  | 'default';

interface CTALink {
  label: string;
  href: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  icon?: React.ReactNode;
}

interface PageCTAConfig {
  primary?: CTALink;
  secondary?: CTALink;
}

const PAGE_CTA_CONFIG: Record<PageType, PageCTAConfig> = {
  home: {
    primary: {
      label: "Start Your Transformation",
      href: "/contact",
      variant: "default",
      icon: <ArrowRight className="ml-2 h-4 w-4" />
    },
    secondary: {
      label: "Explore Services",
      href: "/services",
      variant: "outline"
    }
  },
  about: {
    primary: {
      label: "Work With Us",
      href: "/contact",
      variant: "default",
      icon: <ArrowRight className="ml-2 h-4 w-4" />
    },
    secondary: {
      label: "Our Services",
      href: "/services",
      variant: "ghost"
    }
  },
  services: {
    primary: {
      label: "Book a Consultation",
      href: "/contact",
      variant: "default",
      icon: <Calendar className="ml-2 h-4 w-4" />
    },
    secondary: {
      label: "View Success Stories",
      href: "/testimonials",
      variant: "outline"
    }
  },
  industries: {
    primary: {
      label: "Get Industry Solutions",
      href: "/contact",
      variant: "default",
      icon: <ArrowRight className="ml-2 h-4 w-4" />
    },
    secondary: {
      label: "View Services",
      href: "/services",
      variant: "outline"
    }
  },
  contact: {
    primary: {
      label: "View Services",
      href: "/services",
      variant: "default",
      icon: <ArrowRight className="ml-2 h-4 w-4" />
    },
    secondary: {
      label: "Read Our Story",
      href: "/about",
      variant: "outline"
    }
  },
  solutions: {
    primary: {
      label: "Request a Demo",
      href: "/contact",
      variant: "default",
      icon: <ArrowRight className="ml-2 h-4 w-4" />
    },
    secondary: {
      label: "View Case Studies",
      href: "/testimonials",
      variant: "outline"
    }
  },

  careers: {
    primary: {
      label: "View Openings",
      href: "/careers#openings",
      variant: "default",
      icon: <ArrowRight className="ml-2 h-4 w-4" />
    },
    secondary: {
      label: "Company Culture",
      href: "/about",
      variant: "outline"
    }
  },
  testimonials: {
    primary: {
      label: "Become a Partner",
      href: "/contact",
      variant: "default",
      icon: <Sparkles className="ml-2 h-4 w-4" />
    },
    secondary: {
      label: "Our process",
      href: "/about",
      variant: "outline"
    }
  },
  default: {
    primary: {
      label: "Get Started",
      href: "/contact",
      variant: "default",
      icon: <ArrowRight className="ml-2 h-4 w-4" />
    },
    secondary: {
      label: "Learn More",
      href: "/about",
      variant: "outline"
    }
  }
};

// Premium Copy Messages
const PAGE_MESSAGES: Record<PageType, { title: string; subtitle: string; description?: string }> = {
  home: {
    title: "Ready to Accelerate Your Growth?",
    subtitle: "Innovation Awaits",
    description: "Join forward-thinking companies that are leveraging our data and technology solutions to redefine their future."
  },
  about: {
    title: "Let's Build Something Extraordinary",
    subtitle: "Partnership First",
    description: "Our team is ready to bring your vision to life with strategic insight and technical excellence."
  },
  services: {
    title: "Transform Your Business Today",
    subtitle: "Expert Solutions",
    description: "From cloud infrastructure to advanced analytics, we have the expertise to solve your most complex challenges."
  },
  industries: {
    title: "Tailored for Your Industry",
    subtitle: "Specialized Impact",
    description: "Discover how our deep industry knowledge delivers solutions that truly understand your market."
  },
  contact: {
    title: "Explore Our Expertise",
    subtitle: "While You Wait",
    description: "Detailed service breakdowns and success stories are just a click away."
  },
  solutions: {
    title: "See Results in Action",
    subtitle: "Proven Success",
    description: "Don't just take our word for it—see how we've driven measurable value for our partners."
  },
  insights: {
    title: "Stay Ahead of the Curve",
    subtitle: "Knowledge is Power",
    description: "Get the latest industry trends, tech insights, and strategic advice delivered to you."
  },
  careers: {
    title: "Shape the Future With Us",
    subtitle: "Join the Team",
    description: "We're looking for passionate innovators ready to make a real impact."
  },
  testimonials: {
    title: "Ready to Write Your Success Story?",
    subtitle: "Join Our Partners",
    description: "Experience the difference of working with a team that is as invested in your success as you are."
  },
  default: {
    title: "Take the Next Step",
    subtitle: "Let's Connect",
    description: "Your digital transformation journey starts with a conversation."
  }
};

interface SimpleCTAProps {
  pageType?: PageType;
  title?: string;
  description?: string;
  primaryCTA?: CTALink;
  secondaryCTA?: CTALink;
  className?: string;
  compact?: boolean;
}

function SimpleCTA({
  pageType = 'default',
  title,
  description,
  primaryCTA,
  secondaryCTA,
  className,
  compact = false
}: SimpleCTAProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  const pageConfig = PAGE_CTA_CONFIG[pageType] || PAGE_CTA_CONFIG.default;
  const pageMessage = PAGE_MESSAGES[pageType] || PAGE_MESSAGES.default;

  const primary = primaryCTA || pageConfig.primary;
  const secondary = secondaryCTA || pageConfig.secondary;
  const finalTitle = title || pageMessage.title;
  const finalSubtitle = pageMessage.subtitle;
  const finalDescription = description || pageMessage.description;

  return (
    <section
      ref={ref}
      id="cta"
      className={cn("py-10 md:py-5 px-4 relative overflow-hidden", className)}
    >
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 dark:opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn(
            "relative rounded-[3rem] overflow-hidden",
            "bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl",
            "border border-white/20 dark:border-white/10",
            "shadow-2xl shadow-blue-900/10 dark:shadow-black/50",
            compact ? "p-8 md:p-12" : "p-10 md:p-20 text-center"
          )}
        >
          {/* Inner Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

          <div className={cn(
            "flex flex-col items-center",
            compact ? "md:flex-row md:justify-between md:text-left gap-8" : "gap-8"
          )}>

            <div className={cn("space-y-6 max-w-3xl", compact ? "" : "mx-auto")}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                <span className={cn(
                  "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase",
                  "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-800"
                )}>
                  <Sparkles className="w-4 h-4" />
                  {finalSubtitle}
                </span>
              </motion.div>

              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-200 dark:to-white"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                {finalTitle}
              </motion.h2>

              {finalDescription && (
                <motion.p
                  className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  {finalDescription}
                </motion.p>
              )}
            </div>

            <motion.div
              className={cn(
                "flex flex-col sm:flex-row gap-4 w-full sm:w-auto",
                compact ? "justify-start" : "justify-center"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              {primary && (
                <Button
                  size="lg"
                  className="rounded-full px-8 py-7 text-lg shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all hover:scale-105"
                  asChild
                >
                  <Link to={primary.href}>
                    {primary.label}
                    {primary.icon}
                  </Link>
                </Button>
              )}

              {secondary && (
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 py-7 text-lg border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-105"
                  asChild
                >
                  <Link to={secondary.href}>
                    {secondary.label}
                    {secondary.icon}
                  </Link>
                </Button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Minimal CTA export remains for potential small use-cases, but can be ignored for the main premium look
export function MinimalCTA({ pageType, className }: { pageType: PageType; className?: string }) {
  const pageConfig = PAGE_CTA_CONFIG[pageType] || PAGE_CTA_CONFIG.default;
  const primary = pageConfig.primary;
  const secondary = pageConfig.secondary;

  if (!primary && !secondary) return null;

  return (
    <div className={cn("flex flex-wrap justify-center gap-4 py-8", className)}>
      {primary && (
        <Button variant={primary.variant || "default"} asChild>
          <Link to={primary.href} className="flex items-center">
            {primary.label}
            {primary.icon}
          </Link>
        </Button>
      )}
      {secondary && (
        <Button variant={secondary.variant || "outline"} asChild>
          <Link to={secondary.href} className="flex items-center">
            {secondary.label}
            {secondary.icon}
          </Link>
        </Button>
      )}
    </div>
  );
}

export default memo(SimpleCTA);