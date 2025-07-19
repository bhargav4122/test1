import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Users, LineChart, AlertCircle, Loader2, ChevronRight, Check, Sparkles } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { PersonalInfo } from "@/components/consultation/PersonalInfo";
import { CompanyInfo } from "@/components/consultation/CompanyInfo";
import { SchedulingInfo } from "@/components/consultation/SchedulingInfo";
import { format } from "date-fns";
import { HelmetProvider } from 'react-helmet-async';
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { submitConsultationForm } from "@/firebase";

import{ConsultationButton} from "@/components/consultation/ConsultationButton";
import { useNavigate } from 'react-router-dom';

const industries = [
  "Retail",
  "Healthcare",
  "Finance",
  "Technology",
  "Manufacturing",
  "Agriculture",
  "Construction",
  "Education",
  "Hospitality",
  "Insurance",
  "Energy",
  "Transportation",
  "Real Estate",
  "Media & Entertainment",
  "Telecommunications"
];

const services = [
  "Core Data",
  "Cloud Solutions",
  "Business Intelligence",
  "Digital Transformation",
  "Mobile Development",
  "Web Development",
  "Software Development",
  "Data Analytics",
  "Business Consulting",
  "Market Research",
  "Competitor Analysis",
  "Consumer Insights",
  "Workforce Solutions",
  "Artificial Intelligence & Machine Learning",
  "DevOps & Cloud Automation",
  "AI Automation",
  "Cybersecurity",
  "IOT Solutions",
  "Booking & Taxation" 
];

const timeSlots = [
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM"
];

interface ConsultationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  industry: string[];
  services: string[];
  additionalInfo: string;
  date: Date | undefined;
  timeSlot: string;
}

const benefits = [
  {
    icon: Clock,
    title: "45-Minute Deep Dive",
    description: "Comprehensive analysis of your current data infrastructure and business needs."
  },
  {
    icon: Users,
    title: "Expert Consultation",
    description: "Direct access to our senior consultants with years of industry experience."
  },
  {
    icon: LineChart,
    title: "Actionable Insights",
    description: "Receive a tailored roadmap for implementing data-driven solutions."
  }
];

const FloatingShapes = () => {
  const shapes = [
    { id: 1, size: 'w-16 h-16', color: 'bg-blue-500/20', top: 'top-1/4', left: 'left-1/5', animation: 'animate-float-1' },
    { id: 2, size: 'w-24 h-24', color: 'bg-purple-500/20', top: 'top-1/3', left: 'left-3/4', animation: 'animate-float-2' },
    { id: 3, size: 'w-20 h-20', color: 'bg-pink-500/20', top: 'top-3/4', left: 'left-1/3', animation: 'animate-float-3' },
    { id: 4, size: 'w-12 h-12', color: 'bg-teal-500/20', top: 'top-2/5', left: 'left-4/5', animation: 'animate-float-4' },
    { id: 5, size: 'w-28 h-28', color: 'bg-indigo-500/20', top: 'top-3/5', left: 'left-1/10', animation: 'animate-float-5' },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute ${shape.size} ${shape.color} ${shape.top} ${shape.left} rounded-full filter blur-xl ${shape.animation}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: shape.id * 0.3 }}
        />
      ))}
    </div>
  );
};

const GridPattern = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20">
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark opacity-10 dark:opacity-5" />
    </div>
  );
};

const AnimatedGradient = () => {
  return (
    <motion.div 
      className="fixed inset-0 overflow-hidden pointer-events-none -z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.15 }}
      transition={{ duration: 2 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient-shift" />
    </motion.div>
  );
};

const ParticleBackground = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speedX: number, speedY: number}>>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2
        });
      }
      setParticles(newParticles);
    };

    generateParticles();

    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.speedX) % 100,
        y: (p.y + p.speedY) % 100
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-40">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        />
      ))}
    </div>
  );
};

const Consultation = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ConsultationForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    industry: [],
    services: [],
    additionalInfo: "",
    date: undefined,
    timeSlot: ""
  });

  const handleInputChange = useCallback((field: keyof ConsultationForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const validateForm = useCallback(() => {
    const requiredFields: (keyof ConsultationForm)[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "company",
      "date",
      "timeSlot"
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please fill in all required fields: ${missingFields.join(", ")}`,
        variant: "destructive"
      });
      return false;
    }

    if (formData.industry.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please select at least one industry",
        variant: "destructive"
      });
      return false;
    }

    if (formData.services.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please select at least one service",
        variant: "destructive"
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return false;
    }

    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return false;
    }

    return true;
  }, [formData, toast]);

  const handleBooking = useCallback(async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const { success, message } = await submitConsultationForm({
        ...formData,
        date: formData.date ? format(formData.date, 'yyyy-MM-dd') : '',
      });

      if (success) {
        toast({
          title: "Success!",
          description: message || "Your consultation has been scheduled.",
        });
        
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          industry: [],
          services: [],
          additionalInfo: "",
          date: undefined,
          timeSlot: ""
        });
      } else {
        toast({
          title: "Error",
          description: message || "Please check your information and try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, toast, validateForm]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Book a Free Consultation | DataSolutions</title>
        <meta 
          name="description" 
          content="Transform your business with a free 45-minute consultation from our data solutions experts." 
        />
      </Helmet>
    
      <div className={cn(
        "min-h-screen pt-16 relative overflow-hidden",
        theme === "dark" ? " to-gray-800" : ""
      )}>
        {/* Background Effects */}
        <AnimatedGradient />
        <GridPattern />
        <FloatingShapes />
        <ParticleBackground />
        
        <section className={cn(
          "py-20 relative",
          theme === "dark" ? " from-gray-800/80 to-gray-900/80" : ""
        )}>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center mb-6"
              >
                <Badge variant="outline" className="px-4 py-1.5 text-sm backdrop-blur-sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Free 30-Minute Consultation
                </Badge>
              </motion.div>
              
              <h1 className={cn(
                "text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r",
                theme === "dark" ? "from-blue-400 to-purple-500" : "from-primary to-blue-600",
                "leading-tight"
              )}>
                Unlock Your <br />Business Potential
              </h1>
              
              <motion.p 
                className={cn(
                  "text-xl max-w-2xl mx-auto",
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Schedule your free consultation today and discover how our data solutions can transform your business.
              </motion.p>
              
            
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="w-full"
            >
              <div className={cn(
                "max-w-4xl mx-auto rounded-2xl shadow-2xl p-8 mb-12 border relative overflow-hidden",
                theme === "dark" 
                  ? "bg-gray-800/50 border-gray-700 backdrop-blur-md hover:shadow-primary/20" 
                  : "bg-white/90 backdrop-blur-md hover:shadow-xl",
                "transition-all duration-300 group"
              )}>
                {/* Decorative elements */}
                <div className={cn(
                  "absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl",
                  theme === "dark" ? "bg-primary" : "bg-blue-400",
                  "transition-all duration-1000 group-hover:opacity-30 animate-pulse-slow"
                )}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center",
                      theme === "dark" ? "bg-primary/20" : "bg-primary/10"
                    )}>
                      <Check className={cn(
                        "h-5 w-5",
                        theme === "dark" ? "text-primary" : "text-primary"
                      )} />
                    </div>
                    <h2 className={cn(
                      "text-2xl font-bold",
                      theme === "dark" ? "text-white" : "text-gray-900"
                    )}>
                      Consultation Request Form
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <PersonalInfo 
                      formData={formData} 
                      handleInputChange={handleInputChange} 
                      theme={theme}
                    />
                    <CompanyInfo 
                      formData={formData}
                      handleInputChange={handleInputChange}
                      industries={industries}
                      services={services}
                      theme={theme}
                    />
                  </div>

                  <Separator className={cn(
                    "my-8",
                    theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                  )} />

                  <div className="grid grid-cols-1 gap-8 mb-8">
                    <SchedulingInfo
                      formData={formData}
                      handleInputChange={handleInputChange}
                      timeSlots={timeSlots}
                      theme={theme}
                    />
                  </div>

                  <div className="mt-8">
                    <Badge variant={theme === "dark" ? "default" : "secondary"} className="mb-4 gap-1.5 backdrop-blur-sm">
                      <AlertCircle className="h-4 w-4" />
                      48-hour notice required for all bookings
                    </Badge>
                    <Button 
                      className="w-full hover:scale-[1.02] transition-transform shadow-lg hover:shadow-primary/30" 
                      size="lg"
                      onClick={handleBooking}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Booking...
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Book Consultation
                        </>
                      )}
                    </Button>
                    <p className={cn(
                      "text-sm mt-4 text-center",
                      theme === "dark" ? "text-gray-400" : "text-muted-foreground"
                    )}>
                      By booking a consultation, you agree to our scheduling policies and data privacy terms.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="mb-20 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className={cn(
                "text-2xl font-semibold mb-4",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                Why Choose Our Consultation?
              </h3>
              <p className={cn(
                "max-w-2xl mx-auto",
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              )}>
                Our experts provide tailored solutions to help your business thrive in the data-driven economy.
              </p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-3 gap-8 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ y: -5 }}
                >
                  <Card className={cn(
                    "h-full border hover:shadow-lg transition-shadow group overflow-hidden backdrop-blur-sm",
                    theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/90",
                    "relative"
                  )}>
                    {/* Card accent */}
                    <div className={cn(
                      "absolute top-0 left-0 h-full w-1",
                      theme === "dark" ? "bg-primary" : "bg-primary"
                    )}></div>
                    
                    <CardHeader className="relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          "h-14 w-14 rounded-lg mb-4 flex items-center justify-center",
                          theme === "dark" ? "bg-primary/20" : "bg-primary/10"
                        )}
                      >
                        <benefit.icon className={cn(
                          "h-6 w-6",
                          theme === "dark" ? "text-primary" : "text-primary"
                        )} />
                      </motion.div>
                      <CardTitle className={cn(
                        theme === "dark" ? "text-white" : ""
                      )}>
                        {benefit.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <CardDescription className={cn(
                        theme === "dark" ? "text-gray-300" : ""
                      )}>
                        {benefit.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

         <motion.div
  className={cn(
    "rounded-2xl p-8 text-center relative overflow-hidden",
    theme === "dark" ? "bg-gray-800/50 border border-gray-700" : "bg-white/90 border",
    "backdrop-blur-sm"
  )}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6 }}
>
  <div className={cn(
    "absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-10 blur-3xl",
    theme === "dark" ? "bg-purple-500" : "bg-blue-400",
    "animate-pulse-slow"
  )}></div>
  
  <div className="relative z-10">
    <h3 className={cn(
      "text-2xl font-bold mb-4",
      theme === "dark" ? "text-white" : "text-gray-900"
    )}>
      Ready to Transform Your Business?
    </h3>
    <p className={cn(
      "max-w-2xl mx-auto mb-6",
      theme === "dark" ? "text-gray-400" : "text-gray-600"
    )}>
      Don't miss this opportunity to get expert advice tailored to your specific needs.
    </p>
    <Button 
      size="lg" 
      className="hover:scale-[1.02] transition-transform shadow-lg hover:shadow-primary/30"
      onClick={() => navigate('/consultation')}
    >
      Book Your Free Consultation Now
    </Button>
  </div>
</motion.div>
          </div>
        </section>
      </div>
    </HelmetProvider>
  );
};

export default Consultation;