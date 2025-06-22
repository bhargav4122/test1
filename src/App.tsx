import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Search, Menu, X, Building2, Mail, Phone, MapPin, ChevronRight, Wrench, Zap, Brain, Shield, Cloud, Database, Cpu, Home } from 'lucide-react';
import { servicesDropdown, industriesDropdown } from './data/navigationData';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ChatBot from "@/components/ChatBot";
import Index from "./pages/Index";
import ServicesOverview from "./pages/ServicesOverview";
import Service from "./pages/Service";
import ServiceDetail from "./pages/ServiceDetail";
import Industries from "./pages/Industries";
import IndustryPage from './pages/IndustryPage';
import NotFound from "./pages/NotFound";
import ParticleBackground from "./components/ParticleBackground";
//import CustomCursor from "./components/CustomCursor";
import FloatingShapes from "./components/FloatingShapes";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Team from "./pages/Team";
import Contact from "./pages/Contact";


import Consultation from "./pages/Consultation";
import serviceCategories from "@/data/serviceCategories";
import { serviceDetails } from "@/data/serviceDetails";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import Preloader from "@/components/Preloader/Preloader";
import CoreDataCloudPage from './pages/services/Active/core-data-cloud/CoreDataCloudPage';



import BDSCanvas from "./pages/BDSCanvas";
import SparklesPreview from '@/components/sparkles-demo';

import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import CookieConsent from "@/components/CookieConsent";

const queryClient = new QueryClient();

const ServiceRedirect = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const serviceId = path.split('/service/')[1];
  
  console.log(`Redirecting from old URL pattern: ${path} to new URL pattern: /service-detail/${serviceId}`);
  
  return <Navigate to={`/service-detail/${serviceId}`} replace />;
};

const getAllServiceIds = () => {
  const categoryIds = serviceCategories.map(category => category.id);
  const detailIds = Object.keys(serviceDetails);
  return [...new Set([...categoryIds, ...detailIds])];
};

const AppContent = () => {
  const allServiceIds = getAllServiceIds();
  
  console.log("All available service IDs:", allServiceIds);
  
  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col bg-white text-black dark:bg-[#0f172a] dark:text-white transition-colors duration-300">
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <TooltipProvider>
              <ParticleBackground />
              <FloatingShapes />
             {/* <CustomCursor />*/}
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/services" element={<ServicesOverview />} />
                  <Route path="/service" element={<ServicesOverview />} />
                  <Route path="/service/:serviceId" element={<ServiceRedirect />} />
                  <Route path="/service-detail/:serviceId" element={<ServiceDetail />} />
                  <Route path="/industries" element={<Industries />} />
                  <Route path="/industries/:industryId" element={<IndustryPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/consultation" element={<Consultation />} />

                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/cookies" element={<Cookies />} />
                  <Route path="*" element={<NotFound />} />
                  
                
                    <Route path="/bdscanvas" element={<BDSCanvas />} />        

                </Routes>
                <Footer />
              </BrowserRouter>
                <CookieConsent />
              <ChatBot />
            </TooltipProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </div>
    </HelmetProvider>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading completion after 3 seconds
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
       <AnimatePresence mode='wait'>
        {isLoading ? (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
            <SparklesPreview />
          </div>
        ) : (
          <AppContent />
        )}
      </AnimatePresence>
    </>
  );
}