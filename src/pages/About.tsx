import React from 'react';
import { 
  Globe, BarChart3, Users, MessageCircle, Award, Zap, Target, Check, 
  Shield, ChevronRight, Eye, User, Lightbulb, Hammer, Briefcase, ChartBarIcon,CogIcon,HandshakeIcon,
  TrendingUp, MapPin, Compass, ArrowRight, Rocket, Heart, Sparkles 
} from 'lucide-react';
import HolographicCard from '../components/HolographicCard';
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { TeamsButton } from "@/components/Careers/teambutton";




const stats = [
  { number: '15+', label: 'Projects Completed', icon: Target },
  { number: '05+', label: 'Industries Served', icon: Globe },
  { number: '10+', label: 'Team Members', icon: Users },
  { number: '100%', label: 'Client Focused', icon: Heart },
];

const values = [
  {
    icon: Rocket,
    title: 'Innovation with Purpose',
    description: 'Moving fast to deliver cutting-edge technology that creates real business impact.',
  },
  {
    icon: BarChart3,
    title: 'Clarity Over Complexity',
    description: 'Building solutions that simplify your operations, not complicate them',
  },
  {
    icon: Users,
    title: 'Partnership with Integrity',
    description: 'Working alongside you as an extension of your team with honest, transparent collaboration.',
  },
  {
    icon: Sparkles,
    title: 'Results That Matter',
    description: 'Basing our decisions on solid analytics to deliver measurable outcomes, not just outputs.',
  },
];

const timeline = [
  {
    year: "2022",
    title: "Idea & Vision",
    description: "The spark of an idea: to help businesses harness data and technology in more accessible ways.",
    icon: Lightbulb,
    image: "https://source.unsplash.com/600x400/?startup,light",
  },
  {
    year: "2023",
    title: "Foundation Building",
    description: "Working with early clients, refining our approach, and building our service framework.",
    icon: Hammer,
    image: "https://source.unsplash.com/600x400/?laptop,code",
  },
  {
    year: "2024 Q1",
    title: "Official Launch",
    description: "Formally established the company with a clear vision for modern business solutions.",
    icon: Rocket,
    image: "https://source.unsplash.com/600x400/?office,startup",
  },
  {
    year: "2024 Q2-Q3",
    title: "Service Refinement",
    description: "Launched and refined our core services based on client feedback and market needs.",
    icon: Zap,
    image: "https://source.unsplash.com/600x400/?technology,services",
  },
  {
    year: "2024 Q4",
    title: "Building Momentum",
    description: "Growing our client base and developing deeper partnerships with forward-thinking businesses.",
    icon: TrendingUp,
    image: "https://source.unsplash.com/600x400/?growth,business",
  },
  {
    year: "2025 Q1",
    title: "UK Market Planning",
    description: "Currently laying the groundwork for UK operations with market research and strategy development.",
    icon: MapPin,
    image: "https://source.unsplash.com/600x400/?uk,london,planning",
    badge: "",
  },
  {
    year: "2025 Q2-Q3",
    title: "UK Operations Start",
    description: "Planning to begin UK client engagements and establish our presence in the market.",
    icon: Globe,
    image: "https://source.unsplash.com/600x400/?uk,office",
    badge: "",
  },
  {
    year: "2025 Q4",
    title: "Team Expansion",
    description: "Growing our team to better serve our expanding client base and international ambitions.",
    icon: Users,
    image: "https://source.unsplash.com/600x400/?team,growth",
    badge: "NOW",
  },
  {
    year: "2026",
    title: "Next Chapter",
    description: "Exploring new markets and opportunities for growth based on our UK experience.",
    icon: Compass,
    image: "https://source.unsplash.com/600x400/?future,horizon",
    badge: "PLANNED",
  },
  {
    year: "2026 Q1",
    title: "India Operations Start",
    description: "Launching India operations with strategic hiring and local market focus.",
    icon: Users,
    image: "https://source.unsplash.com/600x400/?india,team",
    badge: "Coming Soon",
  },
  {
    year: "2026 Q4",
    title: "USA Market Planning",
    description: "Laying the groundwork for US expansion with market research and strategy development.",
    icon: MapPin,
    image: "https://source.unsplash.com/600x400/?usa,newyork,planning",
    badge: "Coming Soon",
  },
  {
    year: "2027 Q1",
    title: "Team Growth Phase",
    description: "Expanding our team to better serve our growing international client base.",
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
      {/* Hero Section - Updated for Startup */}
    
   <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
        style={{
          filter: 'brightness(1.1) contrast(1.1) saturate(1.2)',
          transform: 'translateZ(0)'
        }}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="https://res.cloudinary.com/dsf4d41i8/video/upload/v1753041808/Google_Gemini_n4h8by.mp4" type="video/mp4" />
      </video>
    <section className="relative py-10 lg:pt-24 overflow-hidden">
      
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
          <div className="text-center pt-5">
          <p className={cn(
            "text-lg md:text-xl leading-relaxed max-w-4xl mx-auto",
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          )}>
              <strong className={theme === "dark" ? "text-blue-400" : "text-blue-600"}>Business & Data Solutions (BDS) </strong>, 
           is a modern business transformation and technology solutions company helping organizations grow smarter, faster, and stronger.
           We provide end-to-end services across data, cloud, AI, automation, digital marketing, consumer insights, strategy, and business consulting delivering measurable results that fuel long-term success.
          </p>
        </div>
      </div>
    </div>

      {/* Main Heading */}
      

      {/* Main Content Block - Reduced Text Size */}
      <div className="space-y-8">
        {/* Main Description - Reduced Size */}
       

<section className="pt">
  <div className="grid md:grid-cols-2 gap-6">
    {/* Left Card */}
    <div className={cn(
      "w-full rounded-lg border focus:ring-2 focus:outline-none transition-all p-6 group hover:scale-[1.02] cursor-pointer",
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
        We help companies evolve with clarity, confidence, and modern digital capabilities.
        At Business & Data Solutions, we combine data intelligence, advanced technology, and human insight to solve real business challenges and build long-term growth.
      </p>
    </div>

    {/* Right Card */}
    <div className={cn(
      "w-full rounded-lg border focus:ring-2 focus:outline-none transition-all p-6 group hover:scale-[1.02] cursor-pointer",
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
        Business & Data Solutions delivers end-to-end solutions across data, cloud, automation, AI, digital marketing, and business intelligence — enabling organizations to operate smarter, scale faster, and achieve measurable impact.
      </p>
    </div>
  </div>
</section>
              </div>
            </div>
  </div>
</section>





      {/* Mission & Vision - Updated for Startup */}
      <section className="">
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Mission */}
          <div className={cn(
            "rounded-2xl p-8 border h-full",
            theme === "dark" 
              ? "bg-blue-900/20 border-blue-800/30" 
              : "bg-blue-50 border-blue-200"
          )}>
            <div className="flex items-center mb-4">
              <div className={cn(
                "p-3 rounded-xl mr-4",
                theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"
              )}>
                <Rocket className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className={cn(
                "text-2xl font-bold",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                Our Mission
              </h3>
            </div>
            <p className={cn(
              "leading-relaxed text-justify",
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            )}>
              To simplify, accelerate, and elevate the digital evolution of every business we serve.
              We empower organizations with clarity, modern technology, and actionable insights to drive sustainable growth.
            </p>
          </div>
          

         
            {/* Vision */}
          <div className={cn(
            "rounded-2xl p-8 border h-full",
            theme === "dark" 
              ? "bg-purple-900/20 border-purple-800/30" 
              : "bg-purple-50 border-purple-200"
          )}>
            <div className="flex items-center mb-4">
              <div className={cn(
                "p-3 rounded-xl mr-4",
                theme === "dark" ? "bg-purple-900/30" : "bg-purple-100"
              )}>
                <Eye className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className={cn(
                "text-2xl font-bold",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                Our Vision
              </h3>
            </div>
            <p className={cn(
              "leading-relaxed text-justify",
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            )}>
             To create a world where every business regardless of size can leverage intelligent technology, powerful insights,
              and digital innovation to unlock opportunity, resilience, and long-term success.
          
            </p>

          </div>
        </div>
      </section>


      {/* Stats Section - Updated for Startup */}
   <section className="mb-5 pt-5">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
    {stats.map((stat, index) => (
      <div 
        key={index} 
        className={cn(
          "p-6 text-center group hover:scale-[1.02] transition-transform rounded-lg border focus:ring-2 focus:outline-none",
          theme === "dark" 
            ? "bg-black border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500" 
            : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
        )}
      >
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
      </div>
    ))}
  </div>
</section>


      {/* Director's Message - Updated for Startup */}
   <section className="mb-20 dark:bg-black dark:text-gray-100">
               <div className="overflow-hidden dark:bg-black dark:text-gray-100">
            <div className="md:flex">
         <div className="md:w-1/3 p-8 flex flex-col justify-center items-center dark:bg-black dark:text-gray-100">
          
           <div className="text-center group">
                 {/* Circular image container with fixed size and hover effect */}
             <div className="w-40 h-40 rounded-full overflow-hidden mb-4 transition-all duration-300 ease-in-out group-hover:scale-105 shadow-lg">
               {/* User image with proper sizing and zoom effect */}
               <img 
                 src="https://res.cloudinary.com/dsf4d41i8/image/upload/v1753057496/Bhargav_va98sz.jpg"
                 alt="Allu - Director & Co-Founder"
                 className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
               />
             </div>


                <h3 className="text-xl font-bold mb-1">Bhargav Allu</h3>
                <p className="-100">Director & Co-Founder</p>
              </div>
            </div>
            <div className="md:w-2/3 p-8">
              <h2 className={cn(
                "text-2xl md:text-3xl font-bold mb-6",
                theme === "dark" ? "text-white" : "text-gray-800"
              )}>A Message from Our Director</h2>
              <blockquote className={cn(
                "text-lg italic mb-6 pl-4 border-l-4",
                theme === "dark" ? "border-blue-400 text-gray-300" : "border-blue-600 text-gray-600"
              )}>
                “At Business & Data Solutions, we believe in partnerships built on trust, innovation, and real outcomes.
                 We're builders and innovators at heart, bringing a fresh, energetic approach to every challenge.
                 We know every business is unique, and our job is to bring the right mix of strategy, technology, and insight to drive your measurable transformation.”
              </blockquote>
              
              
              </div>
            </div>
          </div>
       
      </section>

      {/* Story Section - Updated for Startup */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <ThemedCard className="overflow-hidden">
            
 <div className={cn(
      "w-full rounded-lg border focus:ring-2 focus:outline-none transition-all p-6 group hover:scale-[1.02] cursor-pointer",
      theme === "dark" 
        ? "bg-black border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500" 
        : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
    )}>
             
            <div className="relative aspect-video">
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted
                loop
                onContextMenu={(e) => e.preventDefault()} // Disable right-click
                controlsList='false'
                poster="/images/video-poster.jpg" // Add a poster frame for better UX
              >
                <source src="https://res.cloudinary.com/dsf4d41i8/video/upload/v1763800003/Final1_fusbec.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              </div>
              </div>
            </ThemedCard>
          </div>

          <div className="md:w-1/2 relative rounded-2xl overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
      alt="Our Startup Journey"
      className="w-full h-full object-cover"
    />
    {/* Overlay for better text readability */}
    <div className={cn(
      "absolute inset-0",
      theme === "dark" ? "bg-black/60" : "bg-white/80"
    )} />
  </div>

  {/* Content */}
  <div className="relative z-10 p-8">
    <h2 className={cn(
      "text-2xl md:text-3xl font-bold mb-6",
      theme === "dark" ? "text-white" : "text-gray-800"
    )}>Our Startup Journey</h2>

    <span className={cn(
      "inline-block px-4 py-2 text-sm font-semibold rounded-full tracking-wide mb-6",
      theme === "dark"
        ? "bg-blue-900/30 text-blue-300 border border-blue-800/50"
        : "bg-blue-100 text-blue-700 border border-blue-200"
    )}>
      Built to Solve the Challenges Modern Businesses Face
    </span>

    <p className={cn(
      "text-lg leading-relaxed",
      theme === "dark" ? "text-gray-200" : "text-gray-700"
    )}>
      <br/>
      We began in 2022 with a simple belief: every business deserves clarity, not complexity.
      We saw that companies were struggling with scattered systems, traditional processes, and fast-changing digital demands.
      Business & Data Solutions was founded to bridge that gap.
      Our vision is to make advanced business technology accessible to companies of all sizes.
      From a passionate idea, we've grown into a dynamic startup dedicated to helping our clients gain clarity, adopt modern tools,
      and transform their operations with confidence.
      We're proud to work with forward-thinking businesses who value a true partnership.
      Every project is an opportunity to learn, grow, and deliver the exceptional value your company deserves.
    </p>
  </div>
</div>
        </div>
      </section>

      {/* Roadmap Timeline Section */}
      <section className="mb-2">
        <div className="mb-20">
          <h2 className={cn(
            "text-2xl md:text-3xl font-bold text-center mb-12",
            theme === "dark" ? "gradient-text" : "text-primary"
          )}>
            Our Growth Journey
          </h2>

          <div className="relative">
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

      {/* Values Section - Updated for Startup */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className={cn(
            "text-2xl md:text-3xl font-bold mb-4",
            theme === "dark" ? "text-white" : "text-gray-800"
          )}>Our Startup Values</h2>
          <p className={cn(
            "max-w-2xl mx-auto",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            These principles guide our approach and define how we work with every partner.
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



      {/* Why Choose Us - Updated for Startup */}
      <section className="mb-20">
        <div className="p-8 md:p-1">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className={cn(
                "h-16 w-16 rounded-xl flex items-center justify-center flex-shrink-0",
                theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"
              )}>
                <Sparkles className="h-8 w-8" />
              </div>
              <div>
                <h2 className={cn(
                  "text-2xl md:text-3xl font-bold mb-6",
                  theme === "dark" ? "text-white" : "text-gray-800"
                )}>Why  BDS?</h2>
                <div className="grid gap-4">
                  {[
                    "Innovation First — AI, automation, cloud, next-gen technologies.",
                    "Enterprise Security — End-to-end protection for data and systems.",
                    "Rapid Results — Fast implementation and real-time impact.",
                    "A Single Tech Partner — Everything you need under one trusted partner.",
                    "Dedicated client success teams and 24/7 support."
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
             

      {/* CTA Section - Updated for Startup */}
      <section className="mb-20">
        <div className={cn(
          "rounded-2xl p-8 md:p-12 overflow-hidden relative",
          theme === "dark" 
            ? "bg-gradient-to-br from-blue-900/80 via-purple-800/80 to-indigo-900/80" 
            : "bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50"
        )}>
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"></div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className={cn(
              "text-2xl md:text-3xl font-bold mb-6",
              theme === "dark" ? "text-white" : "text-gray-800"
            )}>
              Ready to Build Something Amazing Together?
            </h2>
            <p className={cn(
              "text-lg mb-8 max-w-3xl mx-auto",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              Join us on our journey. Whether you're looking for innovative solutions or want to help shape the future with us.
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
              {['Innovative projects', 'Growth opportunities', 'Make real impact', 'Flexible environment'].map((benefit, index) => (
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
