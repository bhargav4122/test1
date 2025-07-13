import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Users, LineChart, AlertCircle, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { PersonalInfo } from "@/components/consultation/PersonalInfo";
import { CompanyInfo } from "@/components/consultation/CompanyInfo";
import { SchedulingInfo } from "@/components/consultation/SchedulingInfo";
import { format } from "date-fns";
import { HelmetProvider } from 'react-helmet-async';
import Navbar from "@/components/Navbar";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { submitConsultationForm } from "@/firebase";

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

const AnimatedBackground = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.1 }}
      transition={{ duration: 2 }}
      className="fixed inset-0 overflow-hidden pointer-events-none"
    >
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </motion.div>
  );
};

const AnimatedCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.25 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

const Consultation = () => {
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

  // Memoized handler to prevent unnecessary re-renders
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
      
      // Reset form
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
      <Navbar />
      <div className={cn(
        "min-h-screen pt-16",
        theme === "dark" ? "bg-gray-900" : "bg-white"
      )}>
        <section className={cn(
          "py-20 relative overflow-hidden",
          theme === "dark" ? "bg-gray-800" : "bg-accent"
        )}>
          <AnimatedBackground />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className={cn(
                "text-4xl md:text-5xl font-bold mb-6",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                Book Your <span className="text-primary">Free</span> Consultation
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
                Transform your business with expert guidance from our data solutions specialists.
              </motion.p>
            </motion.div>

            <AnimatedCard>
              <div className={cn(
                "max-w-4xl mx-auto rounded-lg shadow-lg p-8 mb-12 border",
                theme === "dark" 
                  ? "bg-gray-700 border-gray-600 hover-glow" 
                  : "bg-white hover:shadow-xl transition-shadow",
                "transition-all duration-300"
              )}>
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
                  theme === "dark" ? "bg-gray-600" : ""
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
                  <Badge variant={theme === "dark" ? "default" : "secondary"} className="mb-4">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    48-hour notice required for all bookings
                  </Badge>
                  <Button 
                    className="w-full hover:scale-[1.02] transition-transform" 
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
                      "Book Consultation"
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
            </AnimatedCard>

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
                    "h-full border hover:shadow-lg transition-shadow",
                    theme === "dark" ? "bg-gray-700 border-gray-600" : ""
                  )}>
                    <CardHeader>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <benefit.icon className={cn(
                          "h-12 w-12 mb-4",
                          theme === "dark" ? "text-blue-400" : "text-primary"
                        )} />
                      </motion.div>
                      <CardTitle className={cn(
                        theme === "dark" ? "text-white" : ""
                      )}>
                        {benefit.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
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
          </div>
        </section>
      </div>
    </HelmetProvider>
  );
};

export default Consultation;