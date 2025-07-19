import React from 'react';
import { 
  Globe, BarChart3, Users, MessageCircle, Award, Zap, Target, Check, 
  Shield, ChevronRight, Eye, User, Lightbulb, Hammer, Briefcase, 
  TrendingUp, MapPin, Compass, ArrowRight 
} from 'lucide-react';
import HolographicCard from '../components/HolographicCard';
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { TeamsButton } from "@/components/Careers/teambutton";

const stats = [
  { number: '15+', label: 'Clients Worldwide', icon: Globe },
  { number: '05+', label: 'Years Experience', icon: Award },
  { number: '10+', label: 'Team Members', icon: Users },
  { number: '20+', label: 'Projects Delivered', icon: Target },
];

const values = [
  {
    icon: Globe,
    title: 'Global Perspective',
    description: 'Working with clients across industries and continents.',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Excellence',
    description: 'Making decisions based on solid data and analytics.',
  },
  {
    icon: Users,
    title: 'Client Partnership',
    description: 'Building long-term relationships with our clients.',
  },
  {
    icon: MessageCircle,
    title: 'Open Communication',
    description: 'Maintaining transparency in all our interactions.',
  },
];

const timeline = [
 {
    year: "2022",
    title: "Idea & Vision",
    description:
      "Sparked by a desire to solve real-world business challenges through technology and data — the concept took root.",
    icon: Lightbulb,
    image: "https://source.unsplash.com/600x400/?startup,light",
  },
  {
    year: "2023 Q1–Q3",
    title: "Groundwork & Freelance Delivery",
    description:
      "Focused on freelancing and building trust with clients while laying down the foundation for the company’s future direction.",
    icon: Hammer,
    image: "https://source.unsplash.com/600x400/?laptop,code",
  },
  {
    year: "2023 Q4",
    title: "Company Formation",
    description:
      "Formally established the business entity, set up operations, and started working with early partners and clients.",
    icon: Briefcase,
    image: "https://source.unsplash.com/600x400/?office,startup",
  },
  {
    year: "2024 Q1–Q2",
    title: "Service Launch",
    description:
      "Launched digital and data services with a lean model. Delivered successful outcomes for initial clients.",
    icon: Zap,
    image: "https://source.unsplash.com/600x400/?technology,services",
  },
  {
    year: "2024 Q3",
    title: "Momentum Building",
    description:
      "Continued development, improved internal systems, and deepened relationships with long-term clients.",
    icon: TrendingUp,
    image: "https://source.unsplash.com/600x400/?growth,business",
  },
  {
    year: "2025 Q1",
    title: "UK Launch (Small Scale)",
    description:
      "Entered the UK market and began working with clients. Building credibility with targeted, high-quality engagements.",
    icon: Globe,
    image: "https://source.unsplash.com/600x400/?uk,london,office",
  },
  {
    year: "2025 Q3",
    title: "India Launch & Talent Onboarding",
    description:
      "India operations kick off with strategic hiring and regional client acquisition. Team formation and office planning underway.",
    icon: Users,
    image: "https://source.unsplash.com/600x400/?india,team",
    badge: "NOW",
  },
  {
    year: "2025 Q4",
    title: "USA Launch Preparation",
    description:
      "Market research and initial planning for the US launch, targeted for November. Focused on understanding industry needs and regulations.",
    icon: MapPin,
    image: "https://source.unsplash.com/600x400/?usa,newyork,planning",
    badge: "Coming Soon",
  },
  {
    year: "2026 Q1",
    title: "UK Team Expansion",
    description:
      "Expanding the UK team to meet increasing demand and scale operations in the region.",
    icon: Compass,
    image: "https://source.unsplash.com/600x400/?team,uk",
    badge: "Coming Soon",
  },
];


function About() {
  const { theme } = useTheme();

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
      "container mx-auto min-h-screen flex flex-col overflow-x-hidden bg-white dark:bg-black",
      theme === "dark" ? "bg-gray-900" : "bg-white"
    )}>
      {/* Hero Section - Redesigned */}
      <section className="relative mb-20 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className={cn(
            "absolute inset-0 opacity-20",
            theme === "dark" ? "bg-gradient-to-br from-blue-900/30 via-blue-900/30 to-indigo-900/30" : "bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50"
          )}></div>
          <div className={cn(
            "absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
            theme === "dark" ? " from-gray-800 to-gray-900" : "bg-white"
          )}></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <span className={cn(
            "inline-block px-3 py-1 text-xs font-medium rounded-full mb-4",
            theme === "dark" ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-800"
          )}>
            About Our Company
          </span>
          <h1 className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>
            Pioneering the future of{' '}
            <span className={cn(
              "bg-clip-text text-transparent bg-gradient-to-r",
              theme === "dark" ? "from-blue-400 to-blue-500" : "from-blue-600 to-blue-600"
            )}>
              business innovation
            </span>
          </h1>
          <p className={cn(
            "text-lg md:text-xl max-w-3xl mx-auto",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            We empower organizations with cutting-edge technology solutions and data-driven insights to drive growth and competitive advantage.
          </p>
        </div>
      </section>

      {/* Stats Section - Redesigned */}
      <section className="mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <ThemedCard key={index} className="p-6 text-center group hover:scale-[1.02] transition-transform">
              <div className={cn(
                "h-16 w-16 mx-auto mb-4 rounded-full flex items-center justify-center",
                theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"
              )}>
                <stat.icon className="h-8 w-8" />
              </div>
              <div className={cn(
                "text-3xl md:text-4xl font-bold mb-2",
                theme === "dark" ? "gradient-text" : "text-gray-800"
              )}>{stat.number}</div>
              <div className={cn(
                "text-sm md:text-base",
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              )}>{stat.label}</div>
            </ThemedCard>
          ))}
        </div>
      </section>

      {/* Mission & Vision - Side by Side */}
      <section className="mb-20">
        <div className="grid md:grid-cols-2 gap-6">
          <ThemedCard className="p-6 md:p-8">
            <div className={cn(
              "h-12 w-12 rounded-lg mb-4 flex items-center justify-center",
              theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"
            )}>
              <Zap className="h-6 w-6" />
            </div>
            <h2 className={cn(
              "text-2xl md:text-3xl font-bold mb-4",
              theme === "dark" ? "text-white" : "text-gray-800"
            )}>Our Mission</h2>
            <p className={cn(
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              To empower organizations with data-driven insights and innovative solutions that drive
              growth, efficiency, and competitive advantage in an ever-evolving digital landscape.
            </p>
          </ThemedCard>

          <ThemedCard className="p-6 md:p-8">
            <div className={cn(
              "h-12 w-12 rounded-lg mb-4 flex items-center justify-center",
              theme === "dark" ? "bg-purple-900/30 text-purple-400" : "bg-purple-100 text-purple-600"
            )}>
              <Eye className="h-6 w-6" />
            </div>
            <h2 className={cn(
              "text-2xl md:text-3xl font-bold mb-4",
              theme === "dark" ? "text-white" : "text-gray-800"
            )}>Our Vision</h2>
            <p className={cn(
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              To be the world's most trusted partner in digital transformation — unlocking potential and
              progress for every organization we touch through innovation, integrity, and intelligence.
            </p>
          </ThemedCard>
        </div>
      </section>

      {/* Director's Message - Redesigned */}
      <section className="mb-20 dark:bg-black dark:text-gray-100">
               <div className="overflow-hidden dark:bg-black dark:text-gray-100">
            <div className="md:flex">
         <div className="md:w-1/3 p-8 flex flex-col justify-center items-center dark:bg-black dark:text-gray-100">
           <div className="text-center group">
             {/* Circular image container with fixed size and hover effect */}
             <div className="w-40 h-40 rounded-full overflow-hidden mb-4 transition-all duration-300 ease-in-out group-hover:scale-105 shadow-lg">
               {/* User image with proper sizing and zoom effect */}
               <img 
                 src="/profile/Bhargav.jpg"
                 alt="Allu - Director & Co-Founder"
                 className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
               />
             </div>

             <h3 className="text-xl font-bold text-white mb-1">Allu</h3>
             <p className={cn(
               "text-lg italic mb-6 text-center",
               theme === "dark" ? "text-white" : "text-gray-800"
             )}>Director & Co-Founder</p>
           </div>
         </div>
           
            <div className="p-8 justify-center items-center">
              <h2 className={cn(
                "text-2xl md:text-3xl font-bold mb-6",
                
              )}>A Message from Our Director</h2>
              <blockquote className={cn(
                "text-lg italic mb-6",
                
              )}>
                "At Business & Data Solutions, our mission goes beyond technology. We believe in building
                relationships, empowering people, and leaving a lasting impact. The world is evolving fast —
                we're here to make sure your business not only keeps up, but leads."
              </blockquote>
             
            </div>
          </div>
        </div>
      </section>

      {/* Story Section - Redesigned */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <ThemedCard className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                alt="Our Story"
                className="w-full h-auto rounded-lg"
              />
            </ThemedCard>
          </div>
          <div className="md:w-1/2">
            <h2 className={cn(
              "text-2xl md:text-3xl font-bold mb-6",
              theme === "dark" ? "text-white" : "text-gray-800"
            )}>Our Story</h2>
            <p className={cn(
              "mb-4",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              Founded in 2009, Business & Data Solutions emerged from a vision to help businesses
              harness the power of their data. What started as a small consulting firm has grown
              into a global leader in data analytics and business intelligence.
            </p>
            <p className={cn(
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              Today, we serve clients across various industries, from startups to Fortune 500
              companies, helping them transform their data into actionable insights and
              competitive advantages.
            </p>
            <Button
              variant={theme === "dark" ? "outline" : "default"}
              className="mt-6"
            >
              Learn more about our history
            </Button>
          </div>
        </div>
      </section>

    {/* Roadmap Timeline Section */}
<section className="mb-2">
 {/* Timeline Section */}
<div className="mb-20">
  <h2 className={cn(
    "text-2xl md:text-3xl font-bold text-center mb-12",
    theme === "dark" ? "gradient-text" : "text-primary"
  )}>
    Our Journey
  </h2>

  <div className="relative">
    {/* Vertical Timeline Line */}
    <div className={cn(
      "absolute left-1/2 transform -translate-x-1/2 h-full w-px",
      theme === "dark" ? "bg-blue-400/30" : "bg-primary/30"
    )} />

    <div className="space-y-16">
      {timeline.map((event, index) => {
        const isLeft = index % 2 === 0;
        const Icon = event.icon;

        return (
          <div 
            key={index}
            className={`relative flex ${isLeft ? "justify-start" : "justify-end"}`}
          >
            {/* Content Card - Using your HolographicCard in dark mode */}
            <div className={`w-full md:w-1/2 ${isLeft ? "md:pr-8" : "md:pl-8"}`}>
              {theme === 'dark' ? (
                <HolographicCard className="p-6 relative group hover:scale-[1.02] transition-transform">
                  {event.badge && (
                    <span className={cn(
                      "absolute -top-3 -right-3 text-xs font-semibold px-2 py-1 rounded-full z-10",
                      event.badge === "NOW" 
                        ? "bg-green-600 text-white animate-pulse" 
                        : "bg-yellow-500 text-white"
                    )}>
                      {event.badge}
                    </span>
                  )}
                  <div className="flex items-center mb-3">
                    <Icon className={cn(
                      "h-5 w-5 mr-2",
                      theme === "dark" ? "text-blue-400" : "text-primary"
                    )} />
                    <span className={cn(
                      "text-lg font-semibold",
                      theme === "dark" ? "text-blue-400" : "text-primary"
                    )}>
                      {event.year}
                    </span>
                  </div>
                  <h3 className={cn(
                    "text-xl font-bold mb-2",
                    theme === "dark" ? "text-white" : "text-gray-800"
                  )}>
                    {event.title}
                  </h3>
                  <p className={cn(
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  )}>
                    {event.description}
                  </p>
                </HolographicCard>
              ) : (
                <div className={cn(
                  "p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-all relative",
                  theme === 'light' ? 'border-gray-200' : 'border-gray-800'
                )}>
                  {event.badge && (
                    <span className={cn(
                      "absolute -top-3 -right-3 text-xs font-semibold px-2 py-1 rounded-full",
                      event.badge === "NOW" 
                        ? "bg-green-600 text-white" 
                        : "bg-yellow-500 text-white"
                    )}>
                      {event.badge}
                    </span>
                  )}
                  <div className="flex items-center mb-3">
                    <Icon className="h-5 w-5 mr-2 text-primary" />
                    <span className="text-lg font-semibold text-primary">
                      {event.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    {event.title}
                  </h3>
                  <p className="text-gray-600">
                    {event.description}
                  </p>
                </div>
              )}
            </div>

            {/* Timeline Dot */}
            <div className={cn(
              "hidden md:flex absolute top-6 left-1/2 transform -translate-x-1/2 h-4 w-4 rounded-full z-10",
              theme === "dark" ? "bg-blue-400" : "bg-primary"
            )}></div>
          </div>
        );
      })}
    </div>
  </div>
</div>
</section>

      {/* Values Section - Redesigned */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className={cn(
            "text-2xl md:text-3xl font-bold mb-4",
            theme === "dark" ? "text-white" : "text-gray-800"
          )}>Our Core Values</h2>
          <p className={cn(
            "max-w-2xl mx-auto",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            These principles guide everything we do, from client interactions to internal decision-making.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <ThemedCard key={index} className="p-6 group hover:-translate-y-2 transition-transform">
              <div className={cn(
                "h-12 w-12 rounded-lg mb-4 flex items-center justify-center",
                theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"
              )}>
                <value.icon className="h-6 w-6" />
              </div>
              <h3 className={cn(
                "text-xl font-bold mb-3",
                theme === "dark" ? "text-white" : "text-gray-800"
              )}>{value.title}</h3>
              <p className={cn(
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              )}>{value.description}</p>
            </ThemedCard>
          ))}
        </div>
      </section>

      {/* Why Choose Us - Redesigned */}
      <section className="mb-20 dark:bg-black dark:text-gray-100"> 
        <div className="p-8 md:p-12 dark:bg-black dark:text-gray-100" >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className={cn(
                "h-16 w-16 rounded-xl flex items-center justify-center flex-shrink-0",
                theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"
              )}>
                <Shield className="h-8 w-8" />
              </div>
              <div>
                <h2 className={cn(
                  "text-2xl md:text-3xl font-bold mb-6",
                  theme === "dark" ? "text-white" : "text-gray-800"
                )}>Why Choose Us?</h2>
                <div className="grid gap-4">
                  {[
                    "Industry-leading expertise in data, AI, and digital transformation.",
                    "Personalized solutions tailored to your business challenges.",
                    "Transparent processes with measurable outcomes.",
                    "Dedicated client success teams and 24/7 support.",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start">
                      <div className={cn(
                        "h-5 w-5 rounded-full flex-shrink-0 mt-1 flex items-center justify-center",
                        theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"
                      )}>
                        <Check className="h-3 w-3" />
                      </div>
                      <span className={cn(
                        "ml-3",
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      )}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned */}
      <section className="mb-20">
        <div className={cn(
          "rounded-2xl p-8 md:p-12 overflow-hidden relative",
          theme === "dark" 
            ? "bg-gradient-to-br from-blue-900/80" 
            : "bg-gradient-to-br from-blue-50 via-blue-50"
        )}>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className={cn(
              "text-2xl md:text-3xl font-bold mb-6",
              theme === "dark" ? "text-white" : "text-gray-800"
            )}>
              Ready to Transform Your Business?
            </h2>
            <p className={cn(
              "text-lg mb-8 max-w-3xl mx-auto",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              Schedule a free consultation with our experts or join our team to help businesses grow.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <ConsultationButton 
                className={cn(
                  "px-8 py-3 rounded-lg font-medium transition-all",
                  theme === "dark" 
                    ? "bg-white text-blue-900 hover:bg-gray-100 hover:shadow-lg" 
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                )}
              />
              <TeamsButton 
                className={cn(
                  "px-8 py-3 rounded-lg font-medium transition-all",
                  theme === "dark" 
                    ? "bg-transparent border border-white text-white hover:bg-white/10" 
                    : "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50"
                )}
              />
            </div>
            
            <div className={cn(
              "flex flex-wrap justify-center gap-6 text-sm mt-8",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              {['Innovative work environment', 'Professional growth opportunities', 'Global impact projects'].map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <Check className={cn(
                    "h-4 w-4 mr-2",
                    theme === "dark" ? "text-blue-400" : "text-blue-600"
                  )} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;