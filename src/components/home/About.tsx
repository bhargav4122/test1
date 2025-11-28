import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Globe, BarChart3, Users, MessageCircle, Award, Zap, Target, Check, 
  Shield, ChevronRight, Eye, User, Lightbulb, Hammer, Briefcase, ChartBarIcon,CogIcon,HandshakeIcon,
  TrendingUp, MapPin, Compass, ArrowRight, Rocket, Heart, Sparkles 
} from 'lucide-react';
import HolographicCard from '@/components/HolographicCard';
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";




function About() {
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState<boolean>(false);


  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

 


  const ThemedCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
    return theme === 'dark' ? (
      <HolographicCard className={className}>{children}</HolographicCard>
    ) : (
      <div className={cn(
        "rounded-xl border bg-card shadow-sm transition-all hover:shadow-md",
        theme === 'light' ? 'border-gray-200' : 'border-gray-800',
        className
      )}>
        {children}
      </div>
    );
  };

  return (
    <div className={cn(
      "container mx-auto  flex flex-col overflow-x-hidden bg-white dark:bg-black",
      theme === "dark" ? "bg-gray-900" : "bg-white"
    )}>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>About Business and Data Solutions | About BDS | Our Story & Mission</title>
        <meta 
          name="description" 
          content="Learn about Business and Data Solutions - our mission, values, growth journey, and commitment to delivering innovative business transformation services since 2022." 
        />
        <meta 
          name="keywords" 
          content="about BDS, business solutions company, our mission, company values, growth journey, business transformation, data services, digital innovation" 
        />
        <link rel="canonical" href="https://www.businessanddatasolutions.com/about" />
        <meta property="og:title" content="About Business and Data Solutions | Our Story & Mission" />
        <meta 
          property="og:description" 
          content="Learn about Business and Data Solutions - our mission, values, and commitment to delivering innovative business transformation services." 
        />
        <meta property="og:url" content="https://www.businessanddatasolutions.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://res.cloudinary.com/dsf4d41i8/image/upload/v1755995499/BDS_Logo_-_Original_with_Transparent_Background_-_5000x5000_vb9jll.png" />
      </Helmet>

      {/* Hero Section - Updated for Startup */}
      <section className="relative  lg:pt-2 overflow-hidden">
   
      
        {/* Background Gradient - Full Width */}
        <div className="absolute inset-0 -z-10">
          <div className={cn(
            "absolute inset-0 opacity-20",
            theme === "dark" 
              ? "bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-indigo-900/30" 
              : "bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50"
          )}></div>
          <div className={cn(
            "absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
            theme === "dark" ? "bg-gradient-to-b from-gray-900 to-gray-800" : "bg-white"
          )}></div>
        </div>

        {/* Full Width Container */}
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-5 mb-6">
              <span className={cn(
                "inline-block px-4 py-2 text-sm font-semibold rounded-full tracking-wide",
                theme === "dark"
                  ? "bg-blue-900/30 text-blue-300 border border-blue-800/50"
                  : "bg-blue-100 text-blue-700 border border-blue-200"
              )}>
                About BDS
              </span>

              <div className="text-center mb-8">
                <h1 className={cn(
                  "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  <span className={cn(
                    "bg-clip-text text-transparent bg-gradient-to-r",
                    theme === "dark"
                      ? "from-blue-400 to-purple-100"
                      : "from-blue-400 to-blue-400"
                  )}>
                    Who We Are
                  </span>
                </h1>
                <div className="text-center pt-2">
                  <p className={cn(
                    "text-lg md:text-xl leading-relaxed max-w-4xl mx-auto",
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  )}>
                    <strong className={theme === "dark" ? "text-blue-400" : "text-blue-600"}>Business & Data Solutions (BDS) </strong>, 
                    is a modern transformation and technology partner helping organizations grow smarter and compete stronger.
                     We combine data, cloud, AI, automation, digital marketing, and strategic consulting to solve real business challenges and drive measurable results.
                      Our mission is simple turn complexity into clarity and empower businesses with future-ready solutions that deliver long-term success.
                     </p>
                </div>
              </div>
            </div>

            {/* Main Content Block - Reduced Text Size */}
            <div className="s">
              <section className="pt">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Card */}
                  <div className={cn(
                    "w-full rounded-lg border focus:ring-2 focus:outline-none transition-all p-2 group hover:scale-[1.02] cursor-pointer",
                    theme === "dark" 
                      ? "bg-black border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500" 
                      : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  )}>
                    <div className="flex items-start gap-4 mb-6">
                      <div className={cn(
                        "h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                        theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"
                      )}>
                        <ChartBarIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <span className={cn(
                          "inline-block px-3 py-1 text-xs font-semibold rounded-full tracking-wide mb-2",
                          theme === "dark"
                            ? "bg-blue-900/30 text-blue-300 border border-blue-800/50"
                            : "bg-blue-100 text-blue-700 border border-blue-200"
                        )}>
                          What We Do
                        </span>
                        <p className={cn(
                          "text-lg font-semibold text-left",
                          theme === "dark" ? "text-gray-200" : "text-gray-800"
                        )}>
                          <span className={cn(
                            "bg-clip-text text-transparent bg-gradient-to-r",
                            theme === "dark"
                              ? "from-blue-400 to-blue-500"
                              : "from-blue-500 to-blue-600"
                          )}>
                            Empowering Businesses Through Data, Technology & Intelligent Innovation
                          </span>
                        </p>
                      </div>
                    </div>
                    
                    <p className={cn(
                      "text-base text-left",
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    )}>
                      We provide end-to-end solutions that enable smarter decisions, optimized operations, and seamless digital experiences. Our offerings span data analytics, AI and automation, cloud solutions, digital marketing, consumer insights, market research, strategy, and business consulting.
                       Whether you need to modernize systems, enhance customer engagement, or scale your operations, we deliver solutions built for impact and long-term value.
                    </p>
                  </div>

                  {/* Right Card */}
                  <div className={cn(
                    "w-full rounded-lg border focus:ring-2 focus:outline-none transition-all p-2 group hover:scale-[1.02] cursor-pointer",
                    theme === "dark" 
                      ? "bg-black border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500" 
                      : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  )}>
                    <div className="flex items-start gap-4 mb-6">
                      <div className={cn(
                        "h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                        theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"
                      )}>
                        <HandshakeIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <span className={cn(
                          "inline-block px-3 py-1 text-xs font-semibold rounded-full tracking-wide mb-2",
                          theme === "dark"
                            ? "bg-blue-900/30 text-blue-300 border border-blue-800/50"
                            : "bg-blue-100 text-blue-700 border border-blue-200"
                        )}>
                          Our Identity
                        </span>
                        <p className={cn(
                          "text-lg font-semibold text-left",
                          theme === "dark" ? "text-gray-200" : "text-gray-800"
                        )}>
                          <span className={cn(
                            "bg-clip-text text-transparent bg-gradient-to-r",
                            theme === "dark"
                              ? "from-blue-400 to-blue-500"
                              : "from-blue-500 to-blue-600"
                          )}>
                            A Strategic Partner for Your Digital Evolution
                          </span>
                        </p>
                      </div>
                    </div>
                    
                    <p className={cn(
                      "text-base text-left",
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    )}>
                    We are innovators, problem-solvers, and transformation partners. At our core, we believe in combining technology with human insight to create meaningful change. Our identity is shaped by agility, collaboration, transparency, and a strong commitment to measurable results.
                     We don’t just implement solutions — we help businesses evolve with confidence.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
