import React from 'react';
import { 
  Globe, BarChart3, Users, MessageCircle, Award, Zap, Target, Check, 
  Shield, ChevronRight, Eye, User, Lightbulb, Hammer, Briefcase, 
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
    title: 'Agile Innovation',
    description: 'Moving fast to deliver cutting-edge solutions tailored to your needs.',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Approach',
    description: 'Building decisions on solid analytics and measurable results.',
  },
  {
    icon: Users,
    title: 'Collaborative Partnership',
    description: 'Working alongside you as an extension of your team.',
  },
  {
    icon: Sparkles,
    title: 'Fresh Perspective',
    description: 'Bringing innovative ideas unconstrained by legacy thinking.',
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
      <section className="relative mb-20 pt-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className={cn(
            "absolute inset-0 opacity-20",
            theme === "dark" ? "bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-indigo-900/30" : "bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50"
          )}></div>
          <div className={cn(
            "absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
            theme === "dark" ? "bg-gradient-to-b from-gray-800 to-gray-900" : "bg-white"
          )}></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <span className={cn(
            "inline-block px-3 py-1 text-xs font-medium rounded-full mb-4",
            theme === "dark" ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-800"
          )}>
            Our Startup Story
          </span>
          <h1 className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>
            Building the future of{' '}
            <span className={cn(
              "bg-clip-text text-transparent bg-gradient-to-r",
              theme === "dark" ? "from-blue-400 to-purple-500" : "from-blue-600 to-purple-600"
            )}>
              business solutions
            </span>
          </h1>
          <p className={cn(
            "text-lg md:text-xl max-w-3xl mx-auto",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            We're a dynamic startup helping businesses leverage technology and data to drive growth and innovation. 
            Fresh perspectives, agile approaches, and dedicated partnerships define how we work.
          </p>
        </div>
      </section>

      {/* Stats Section - Updated for Startup */}
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

      {/* Mission & Vision - Updated for Startup */}
      <section className="mb-20">
        <div className="grid md:grid-cols-2 gap-6">
          <ThemedCard className="p-6 md:p-8">
            <div className={cn(
              "h-12 w-12 rounded-lg mb-4 flex items-center justify-center",
              theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"
            )}>
              <Rocket className="h-6 w-6" />
            </div>
            <h2 className={cn(
              "text-2xl md:text-3xl font-bold mb-4",
              theme === "dark" ? "text-white" : "text-gray-800"
            )}>Our Mission</h2>
            <p className={cn(
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              To empower businesses with accessible, innovative technology solutions that drive meaningful growth 
              and create competitive advantages in today's fast-paced digital world.
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
              To become the go-to partner for businesses seeking agile, modern solutions — known for our 
              innovative approach, collaborative spirit, and commitment to client success.
            </p>
          </ThemedCard>
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
                "At Business & Data Solutions, we believe that great things start with a bold idea and passionate people. 
                As a startup, we bring fresh energy, flexible approaches, and a genuine commitment to our partners' success. 
                We're not just service providers; we're builders, innovators, and your dedicated partners in growth."
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
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                alt="Our Startup Journey"
                className="w-full h-auto rounded-lg"
              />
            </ThemedCard>
          </div>
          <div className="md:w-1/2">
            <h2 className={cn(
              "text-2xl md:text-3xl font-bold mb-6",
              theme === "dark" ? "text-white" : "text-gray-800"
            )}>Our Startup Journey</h2>
            <p className={cn(
              "mb-4",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              Founded in 2022, Business & Data Solutions began with a simple yet powerful vision: to make advanced 
              business technology accessible to companies of all sizes. What started as a passionate idea has grown 
              into a dynamic startup making real impact.
            </p>
            <p className={cn(
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              We're proud to work with forward-thinking businesses who value innovation and partnership. 
              Every project is an opportunity to learn, grow, and deliver exceptional value.
            </p>
            <Button
              variant={theme === "dark" ? "outline" : "default"}
              className="mt-6"
            >
              Learn more about our approach
            </Button>
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
        <ThemedCard className="p-8 md:p-12">
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
                )}>Why Partner With Us?</h2>
                <div className="grid gap-4">
                  {[
                    "Industry-leading expertise in data, AI, and digital transformation.",
                    "Personalized solutions tailored to your business challenges.",
                    "Agile approaches that adapt to your unique needs",
                    "Fresh perspectives and innovative thinking",
                    "Direct access to founders and decision-makers",
                    "Flexible solutions without corporate bureaucracy",
                    "Genuine partnership and collaborative spirit",
                    "Cutting-edge technologies and modern methodologies",
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
        </ThemedCard>
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
