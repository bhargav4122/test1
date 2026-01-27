import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Users, LineChart, AlertCircle, Loader2, Check, Sparkles } from "lucide-react";
import SEO from "@/components/common/SEO";
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { PersonalInfo } from "@/components/consultation/PersonalInfo";
import { CompanyInfo } from "@/components/consultation/CompanyInfo";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { submitConsultationForm } from "@/firebase";
import { useNavigate } from 'react-router-dom';
import CallToAction from "@/components/home/CallToAction";

const industries = [
  "Retail", "Healthcare", "Finance", "Technology", "Manufacturing",
  "Agriculture", "Construction", "Education", "Hospitality", "Insurance",
  "Energy", "Transportation", "Real Estate", "Media & Entertainment", "Telecommunications"
];

const services = [
  "Core Data", "Cloud Solutions", "Business Intelligence", "Digital Transformation",
  "Mobile Development", "Web Development", "Software Development", "Data Analytics",
  "Business Consulting", "Market Research", "Competitor Analysis", "Consumer Insights",
  "Workforce Solutions", "Artificial Intelligence & Machine Learning", "DevOps & Cloud Automation",
  "AI Automation", "Cybersecurity", "IOT Solutions", "Booking & Taxation"
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
    additionalInfo: ""
  });

  const handleInputChange = useCallback((field: keyof ConsultationForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const validateForm = useCallback(() => {
    const requiredFields: (keyof ConsultationForm)[] = [
      "firstName", "lastName", "email", "phone", "company"
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




  const handleSubmitAndSchedule = useCallback(async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // First, save the form data to Firebase
      const { success, message } = await submitConsultationForm(formData);

      if (success) {
        toast({
          title: "Form submitted!",
          description: "Now please select your preferred date and time.",
        });

        // Create Cal.com URL with pre-filled data
        const calUrl = new URL('https://cal.com/bhargav4122/free-consultation');

        // Add pre-filled data as URL parameters
        calUrl.searchParams.set('name', `${formData.firstName} ${formData.lastName}`);
        calUrl.searchParams.set('email', formData.email);
        calUrl.searchParams.set('phone', formData.phone);
        calUrl.searchParams.set('location', 'In-person');

        // Put structured info in description (info field), leave notes empty
        const info = [
          `Company: ${formData.company}`,
          `Phone: ${formData.phone}`,
          `Industry: ${formData.industry.join(', ')}`,
          `Services: ${formData.services.join(', ')}`
        ].join('\n');

        // This is a hidden field Cal.com supports
        calUrl.searchParams.set('notes', ""); // leave empty for user input
        calUrl.searchParams.set('metadata[info]', info); // store your structured info


        // Open Cal.com scheduler in a new tab with pre-filled data
        //window.open(calUrl.toString(), '_blank');

        window.location.href = calUrl.toString();

        // Reset form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          industry: [],
          services: [],
          additionalInfo: ""
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
    <div className={cn(
      "min-h-screen pt-16 relative overflow-hidden",
      theme === "dark" ? "bg-black-900" : "bg-gray-50"
    )}>
      {/* SEO Meta Tags */}
      <SEO
        title="Free Consultation - Book Your Session"
        description="Book a free 30-minute consultation with our business and data solutions experts. Get personalized advice on data services, digital transformation, and business growth strategies."
        keywords="free consultation, business consultation, data solutions consultation, digital transformation advice, business growth strategy, expert consultation"
        url="https://businessanddatasolutions.com/consultation"
        image="https://yourcompany.com/og-image-consultation.png"
      />


      <section className="py-20 relative">
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
              Schedule your free consultation today and discover how our Business and Data Solutions can transform your business.
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
                ? "bg-gray-800/50 border-gray-700 backdrop-blur-md"
                : "bg-white/90 backdrop-blur-md",
              "transition-all duration-300 group"
            )}>
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

                <div className="mt-8">
                  <Badge variant={theme === "dark" ? "default" : "secondary"} className="mb-4 gap-1.5 backdrop-blur-sm">
                    <AlertCircle className="h-4 w-4" />
                    48-hour notice required for all bookings
                  </Badge>

                  <Button
                    className="w-full hover:scale-[1.02] transition-transform shadow-lg hover:shadow-primary/30"
                    size="lg"
                    onClick={handleSubmitAndSchedule}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Submit & Schedule Consultation
                      </>
                    )}
                  </Button>

                  <p className={cn(
                    "text-sm mt-4 text-center",
                    theme === "dark" ? "text-gray-400" : "text-muted-foreground"
                  )}>
                    By clicking this button, your information will be saved and you'll be redirected to schedule your consultation.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Benefits section remains the same */}

          {/* Benefits Section */}
          <section className="mt-20">
            <h2
              className={cn(
                "text-3xl md:text-4xl font-bold text-center mb-12",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}
            >
              Why Book a Consultation?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, idx) => (
                <Card
                  key={idx}
                  className={cn(
                    "rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border backdrop-blur-sm",
                    theme === "dark"
                      ? "bg-gray-800/50 border-gray-700"
                      : "bg-white border-gray-200"
                  )}
                >
                  <CardHeader>
                    <div
                      className={cn(
                        "h-12 w-12 flex items-center justify-center rounded-full mb-4",
                        theme === "dark" ? "bg-primary/20" : "bg-primary/10"
                      )}
                    >
                      <benefit.icon
                        className={cn(
                          "h-6 w-6",
                          theme === "dark" ? "text-primary" : "text-primary"
                        )}
                      />
                    </div>
                    <CardTitle
                      className={cn(
                        "text-xl font-semibold",
                        theme === "dark" ? "text-white" : "text-gray-900"
                      )}
                    >
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription
                      className={cn(
                        "text-base",
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      )}
                    >
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

        </div>
      </section>
      <CallToAction
        pageType="contact"
        title="Still have questions?"
        description="Read our success stories or explore our services in more detail if you're not ready to book yet."
      />
    </div>
  );
};

export default Consultation;
