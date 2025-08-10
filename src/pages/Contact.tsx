import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, Globe, Clock, Calendar, CheckCircle, 
  Users, Building, BrainCircuit, Database, Cloud, Brain, Zap, 
  Shield, Bot, Briefcase, Cpu, Target, Code, X 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { submitContactForm } from "@/firebase"; // Update path as needed
import EmailValidation from '@/components/EmailValidation';

// Services List
const ALL_SERVICES = [
  { value: 'data-analytics', label: 'Data Analytics & BI', icon: Database },
  { value: 'cloud-services', label: 'Cloud Infrastructure', icon: Cloud },
  { value: 'ai-ml', label: 'AI & Machine Learning', icon: Brain },
  { value: 'digital-transform', label: 'Digital Transformation', icon: Zap },
  { value: 'cybersecurity', label: 'Cybersecurity', icon: Shield },
  { value: 'automation', label: 'Process Automation', icon: Bot },
  { value: 'consulting', label: 'Business Consulting', icon: Briefcase },
  { value: 'erp-crm', label: 'ERP & CRM Solutions', icon: Building },
  { value: 'iot', label: 'IoT Solutions', icon: Cpu },
  { value: 'blockchain', label: 'Blockchain', icon: Database },
  { value: 'devops', label: 'DevOps & CI/CD', icon: Target },
  { value: 'app-dev', label: 'Application Development', icon: Code }
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  services: string[];
  message: string;
  country: string;
}

const ContactForm = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    services: [],
    message: '',
    country: 'US'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(true); // Assume valid by default when empty

  const validatePhoneNumber = (phone: string, country: string): boolean => {
    if (!phone) return true; // Empty is considered valid
    
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    
    switch (country) {
      case 'US':
        // US numbers should be 10 digits
        return /^\d{10}$/.test(digitsOnly);
      case 'GB':
        // UK numbers should start with 0 or +44 (converted to 0) and be 10-11 digits total
        return /^(0\d{9,10})$/.test(digitsOnly);
      case 'IN':
        // Indian numbers should be 10 digits starting with 6-9
        return /^[6-9]\d{9}$/.test(digitsOnly);
      default:
        return true;
    }
  };

  const getPhonePlaceholder = (): string => {
    switch (formData.country) {
      case 'US': return 'e.g. 5551234567';
      case 'GB': return 'e.g. 07400 123456';
      case 'IN': return 'e.g. 9876543210';
      default: return 'Your phone number';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value as 'US' | 'GB' | 'IN';
    setFormData(prev => ({
      ...prev,
      country: newCountry,
      phone: '' // Reset phone when country changes
    }));
    setPhoneValid(true); // Reset validation
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      phone: value
    }));
    setPhoneValid(validatePhoneNumber(value, formData.country));
  };

  const toggleService = (serviceValue: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceValue)
        ? prev.services.filter(s => s !== serviceValue)
        : [...prev.services, serviceValue]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.businessName || !formData.message) {
      setDialogMessage('Please fill in all required fields');
      setIsSuccess(false);
      setShowDialog(true);
      setIsSubmitting(false);
      return;
    }

    // Email validation
    if (!emailValid) {
      setDialogMessage('Please enter a valid email address');
      setIsSuccess(false);
      setShowDialog(true);
      setIsSubmitting(false);
      return;
    }

    // Phone validation (only if phone is provided)
    if (formData.phone && !phoneValid) {
      setDialogMessage('Please enter a valid phone number');
      setIsSuccess(false);
      setShowDialog(true);
      setIsSubmitting(false);
      return;
    }

    try {
      const submissionData = {
        ...formData,
        timestamp: Date.now(),
        metadata: {
          userAgent: navigator.userAgent.substring(0, 120),
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          page: window.location.pathname,
          referrer: document.referrer || 'direct'
        }
      };

      const { success, message } = await submitContactForm(submissionData);
      setDialogMessage(message || 'Thank you!');
      setIsSuccess(success);
    
      if (success) {
        setDialogMessage('Thank you for your interest! We will get back to you soon.');
        setIsSuccess(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          businessName: '',
          services: [],
          message: '',
          country: 'US'
        });
      } else {
        setDialogMessage('There was an error submitting your form. Please try again.');
        setIsSuccess(false);
      }
    } catch (error) {
      setDialogMessage('An unexpected error occurred. Please try again later.');
      setIsSuccess(false);
    } finally {
      setShowDialog(true);
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className={cn(
      "min-h-screen",
      theme === "dark" ? "bg-black-900" : "bg-black-50"
    )}>
      {/* Success/Error Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              "relative p-6 rounded-2xl shadow-xl max-w-md w-full",
              theme === "dark" ? "bg-gray-800" : "bg-white",
              isSuccess ? "border-green-500 border-2" : "border-red-500 border-2"
            )}
          >
            <button
              onClick={() => setShowDialog(false)}
              className="absolute top-4 right-4 p-1 rounded-full"
            >
              <X className={theme === "dark" ? "text-gray-300" : "text-gray-600"} />
            </button>
            <div className="text-center">
              {isSuccess ? (
                <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
              ) : (
                <X className="h-16 w-16 mx-auto text-red-500 mb-4" />
              )}
              <h3 className={cn(
                "text-xl font-bold mb-2",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                {isSuccess ? 'Success!' : 'Error'}
              </h3>
              <p className={cn(
                "mb-6",
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              )}>
                {dialogMessage}
              </p>
              <button
                onClick={() => setShowDialog(false)}
                className={cn(
                  "px-6 py-2 rounded-lg font-medium",
                  isSuccess 
                    ? "bg-green-500 hover:bg-green-600 text-white" 
                    : "bg-red-500 hover:bg-red-600 text-white"
                )}
              >
                OK
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 pt-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={cn(
                "text-4xl md:text-5xl font-bold mb-6",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}
            >
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={cn(
                "text-xl max-w-3xl mx-auto",
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              )}
            >
              Let's discuss how we can help your business grow with our solutions.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={cn(
          "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
          theme === "dark" ? "" : "bg-white",
          "rounded-3xl shadow-xl",
          theme === "dark" ? "" : "border-gray-200",
          "mb-20"
        )}
      >
        <motion.h2 
          variants={itemVariants}
          className={cn(
            "text-3xl font-bold mb-8 text-center",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}
        >
          Contact Our Team
        </motion.h2>

        <form onSubmit={handleSubmit}>
          <motion.div variants={containerVariants} className="space-y-8">
            {/* Basic Information */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={cn(
                  "block text-sm font-medium mb-2",
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                )}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all",
                    theme === "dark" 
                      ? "bg-black border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500" 
                      : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  )}
                  placeholder="Your name"
                />
              </div>
              <div>
  <label className={cn(
    "block text-sm font-medium mb-2",
    theme === "dark" ? "text-gray-300" : "text-gray-700"
  )}>Email *</label>
  <input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleInputChange}
    className={cn(
      "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all",
      theme === "dark" 
        ? "bg-black border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500" 
        : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
    )}
    placeholder="your.email@example.com"
  />
  <EmailValidation 
    email={formData.email} 
    onValid={(isValid) => setEmailValid(isValid)} 
  />
</div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={cn(
                  "block text-sm font-medium mb-2",
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                )}>Business Name *</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all",
                    theme === "dark" 
                      ? "bg-black border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500" 
                      : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  )}
                  placeholder="Your company name"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className={cn(
                    "block text-sm font-medium mb-2",
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  )}>Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleCountryChange}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all",
                      theme === "dark" 
                        ? "bg-black border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500" 
                        : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    )}
                  >
                    <option value="US">US</option>
                    <option value="GB">UK</option>
                    <option value="IN">India</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className={cn(
                    "block text-sm font-medium mb-2",
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  )}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder={getPhonePlaceholder()}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all",
                      theme === "dark" 
                        ? "bg-black border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500" 
                        : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500",
                      !phoneValid && formData.phone ? "border-red-500" : ""
                    )}
                  />
                  {!phoneValid && formData.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {formData.country === "GB" && "UK numbers should start with 0 or +44 (e.g., 07400 123456)"}
                      {formData.country === "IN" && "Indian numbers should be 10 digits starting with 6-9"}
                      {formData.country === "US" && "US numbers should be 10 digits (e.g., 5551234567)"}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Services Selection */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className={cn(
                "text-lg font-medium",
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              )}>Services You're Interested In</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {ALL_SERVICES.map(service => {
                  const Icon = service.icon;
                  return (
                    <motion.button
                      key={service.value}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => toggleService(service.value)}
                      className={cn(
                        "p-4 rounded-xl border transition-all duration-300 flex flex-col items-center text-center",
                        formData.services.includes(service.value)
                          ? "border-blue-500 bg-blue-500/10 shadow-md"
                          : theme === "dark" 
                            ? "border-gray-700 hover:border-blue-500 hover:bg-gray-700/50" 
                            : "border-gray-200 hover:border-blue-500 hover:bg-gray-50"
                      )}
                    >
                      <Icon className={cn(
                        "h-8 w-8 mb-3",
                        theme === "dark" ? "text-blue-400" : "text-blue-500"
                      )} />
                      <span className="text-sm font-medium">{service.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Message */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className={cn(
                "block text-sm font-medium",
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              )}>How Can We Help You? *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border focus:ring-2 focus:outline-none transition-all min-h-[150px]",
                  theme === "dark" 
                    ? "bg-black border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500" 
                    : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                )}
                placeholder="Tell us about your project or inquiry..."
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div 
              variants={itemVariants}
              className="flex justify-center pt-6"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "px-8 py-3 rounded-xl font-medium transition-all duration-300",
                  "bg-gradient-to-r from-blue-600 to-blue-500 text-white",
                  "shadow-lg hover:shadow-xl hover:shadow-blue-500/20",
                  "flex items-center space-x-2",
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                )}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        </form>
      </motion.div>

      {/* Contact Info Section */}
      <div className={cn(
        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16",
        theme === "dark" ? "text-gray-300" : "text-gray-700"
      )}>
        <h2 className="text-3xl font-bold text-center mb-12">Other Ways to Connect</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className={cn(
              "p-8 rounded-2xl text-center transition-all",
              theme === "dark" ? "bg-gray-800/50" : "bg-white",
              "shadow-lg border",
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            )}
          >
            <Mail className="h-12 w-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="mb-4">For general inquiries</p>
            <a href="mailto:contact@yourcompany.com" className="text-blue-500 hover:underline">
            Info@businessanddatasolutions.com
            </a>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className={cn(
              "p-8 rounded-2xl text-center transition-all",
              theme === "dark" ? "bg-gray-800/50" : "bg-white",
              "shadow-lg border",
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            )}
          >
            <Phone className="h-12 w-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="mb-4">Mon-Fri, 9am-5pm EST</p>
            <a href="tel:+1234567890" className="text-blue-500 hover:underline">
              +44 (023) 456-7890
            </a>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className={cn(
              "p-8 rounded-2xl text-center transition-all",
              theme === "dark" ? "bg-gray-800/50" : "bg-white",
              "shadow-lg border",
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            )}
          >
            <MapPin className="h-12 w-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p className="mb-4">Our headquarters</p>
            <address className="not-italic">
             London<br />
              Newham, E7 8LS
            </address>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
