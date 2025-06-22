import React from 'react';
import { Globe, BarChart3, Users, MessageCircle, Award, Zap, Target, Check, Shield, ChevronRight } from 'lucide-react';
import HolographicCard from '../components/HolographicCard';
import CTASection from '../components/CTASection';
import Navbar from "@/components/Navbar";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


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
    year: '2009',
    title: 'Company Founded',
    description: 'Started with a vision to revolutionize data analytics.',
  },
  {
    year: '2012',
    title: 'Global Expansion',
    description: 'Opened offices in Europe and Asia.',
  },
  {
    year: '2015',
    title: 'AI Integration',
    description: 'Launched our first AI-powered analytics platform.',
  },
  {
    year: '2018',
    title: 'Quantum Computing',
    description: 'Pioneered quantum computing solutions.',
  },
  {
    year: '2021',
    title: 'Digital Transformation',
    description: 'Helped 100+ enterprises go digital.',
  },
  {
    year: '2024',
    title: 'Future Forward',
    description: 'Leading the way in next-gen technology.',
  },
];

function About() {
  const { theme } = useTheme();

  // Wrapper component that conditionally applies HolographicCard
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
      "container mx-auto px-4 py-16 min-h-screen",
      theme === "dark" ? "bg-gray-900" : "bg-white"
    )}>
      <Navbar />
      
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className={cn(
          "text-4xl md:text-5xl font-bold mb-4",
          theme === "dark" ? "gradient-text" : "text-primary"
        )}>About Us</h1>
        <p className={cn(
          "text-lg md:text-xl max-w-3xl mx-auto",
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        )}>
          Pioneering the future of business through innovative technology solutions
          and data-driven insights.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {stats.map((stat, index) => (
          <ThemedCard key={index} className="p-6 text-center">
            <stat.icon className={cn(
              "h-8 w-8 mx-auto mb-4",
              theme === "dark" ? "text-blue-400" : "text-primary"
            )} />
            <div className={cn(
              "text-3xl md:text-4xl font-bold mb-2",
              theme === "dark" ? "gradient-text" : "text-gray-800"
            )}>{stat.number}</div>
            <div className={cn(
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>{stat.label}</div>
          </ThemedCard>
        ))}
      </div>

      {/* Story Section */}
      <ThemedCard className="mb-20 overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
              alt="Our Story"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-6 md:p-8 lg:p-12">
            <h2 className={cn(
              "text-2xl md:text-3xl font-bold mb-6",
              theme === "dark" ? "gradient-text" : "text-primary"
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
          </div>
        </div>
      </ThemedCard>

      {/* Timeline Section */}
      <div className="mb-20">
        <h2 className={cn(
          "text-2xl md:text-3xl font-bold text-center mb-12",
          theme === "dark" ? "gradient-text" : "text-primary"
        )}>Our Journey</h2>
        <div className="relative">
          {/* Timeline Line */}
          <div className={cn(
            "absolute left-1/2 transform -translate-x-1/2 h-full w-px",
            theme === "dark" ? "bg-blue-400/30" : "bg-primary/30"
          )} />
          
          {/* Timeline Events */}
          <div className="space-y-8 md:space-y-12">
            {timeline.map((event, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}>
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'} text-center md:text-left mb-4 md:mb-0`}>
                  <ThemedCard className="p-4 md:p-6 inline-block w-full">
                    <div className={cn(
                      "text-xl md:text-2xl font-bold mb-2",
                      theme === "dark" ? "gradient-text" : "text-primary"
                    )}>{event.year}</div>
                    <h3 className={cn(
                      "text-lg md:text-xl font-bold mb-2",
                      theme === "dark" ? "text-white" : "text-gray-800"
                    )}>{event.title}</h3>
                    <p className={cn(
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    )}>{event.description}</p>
                  </ThemedCard>
                </div>
                <div className="relative flex-shrink-0">
                  <div className={cn(
                    "w-3 h-3 md:w-4 md:h-4 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                    theme === "dark" ? "bg-blue-400" : "bg-primary"
                  )} />
                </div>
                <div className="w-full md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-20">
        <h2 className={cn(
          "text-2xl md:text-3xl font-bold text-center mb-12",
          theme === "dark" ? "gradient-text" : "text-primary"
        )}>Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <ThemedCard key={index} className="p-6 text-center">
              <value.icon className={cn(
                "h-10 w-10 md:h-12 md:w-12 mx-auto mb-4",
                theme === "dark" ? "text-blue-400" : "text-primary"
              )} />
              <h3 className={cn(
                "text-lg md:text-xl font-bold mb-3",
                theme === "dark" ? "text-white" : "text-gray-800"
              )}>{value.title}</h3>
              <p className={cn(
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              )}>{value.description}</p>
            </ThemedCard>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <ThemedCard className="text-center p-8 md:p-12 mb-20">
        <Zap className={cn(
          "h-10 w-10 md:h-12 md:w-12 mx-auto mb-6",
          theme === "dark" ? "text-blue-400" : "text-primary"
        )} />
        <h2 className={cn(
          "text-2xl md:text-3xl font-bold mb-6",
          theme === "dark" ? "gradient-text" : "text-primary"
        )}>Our Mission</h2>
        <p className={cn(
          "text-lg md:text-xl max-w-3xl mx-auto",
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        )}>
          To empower organizations with data-driven insights and innovative solutions that drive
          growth, efficiency, and competitive advantage in an ever-evolving digital landscape.
        </p>
      </ThemedCard>

  {/* CTA Section */}
<div className={cn(
  "rounded-2xl p-8 md:p-12 my-12",
  theme === "dark" 
    ? "bg-gradient-to-br from-purple-900/80 via-purple-800/80 to-blue-900/80 backdrop-blur-sm" 
    : "bg-white border border-gray-200 shadow-lg"
)}>
  <div className="max-w-4xl mx-auto text-center">
    <h2 className={cn(
      "text-2xl md:text-3xl font-bold mb-4",
      theme === "dark" ? "text-white" : "text-gray-800"
    )}>
      Join Our Journey of Innovation
    </h2>
    <p className={cn(
      "text-lg mb-8 max-w-3xl mx-auto",
      theme === "dark" ? "text-gray-300" : "text-gray-600"
    )}>
      Be part of our mission to transform businesses through cutting-edge technology solutions.
    </p>
    
    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
      <Button className={cn(
        "transition-all duration-200",
        theme === "dark" 
          ? "bg-white text-purple-900 hover:bg-gray-100 hover:shadow-lg hover:shadow-purple-500/20" 
          : "bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30"
      )}>
        Join Our Team
      </Button>
      <Button variant="outline" className={cn(
        "transition-all duration-200",
        theme === "dark" 
          ? "bg-transparent border-2 border-white text-white hover:bg-white/10 hover:shadow-lg hover:shadow-white/10" 
          : "bg-transparent border-2 border-primary text-primary hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/10"
      )}>
        Learn More
      </Button>
    </div>
    
    <div className={cn(
      "flex flex-wrap justify-center gap-4 text-sm",
      theme === "dark" ? "text-gray-300" : "text-gray-600"
    )}>
      {['Innovative work environment', 'Professional growth opportunities', 'Global impact projects'].map((benefit, index) => (
        <div key={index} className="flex items-center">
          <Check className={cn(
            "h-4 w-4 mr-2",
            theme === "dark" ? "text-blue-400" : "text-primary"
          )} />
          <span>{benefit}</span>
        </div>
      ))}
    </div>
  </div>
</div>
      
    </div>
  );
}

export default About;